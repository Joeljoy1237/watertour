import NextAuth, { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CryptoJS from "crypto-js";
import User from "@/models/User"; // Adjust the path based on your User model location
import { connectToDB } from "@/utils/database"; // Adjust the path based on your DB connection utility
import Credentials from "next-auth/providers/credentials";
// Extend NextAuth Session & JWT Types
declare module "next-auth" {
    interface Session {
        user: {
            id: string;
            email: string;
            name: string;
            image: string; // Add image URL
            phone?: string; // Add phone number
            isAdmin: boolean;
            isOwner: boolean;
        };
    }
    interface User {
        given_name?: string;
        family_name?: string;
        isOwner: boolean;
        email: string;
        image?: string; // Add image URL
        picture?: string; // Add picture URL
    }
}

declare module "next-auth/jwt" {
    interface JWT {
        id: string;
        email: string;
        firstName: string;
        lastName: string;
        image?: string; // Add image URL
        phone?: string; // Add phone number
        isOwner: boolean;
        isAdmin?: boolean;
    }
}

// Function to fetch phone number from Google People API
async function fetchPhoneNumber(accessToken: string) {
    const response = await fetch('https://people.googleapis.com/v1/people/me?personFields=phoneNumbers', {
        headers: {
            Authorization: `Bearer ${accessToken}`,
        },
    });
    const data = await response.json();
    return data.phoneNumbers ? data.phoneNumbers[0].value : null; // Return the phone number if available
}

// NextAuth Configuration
const authOptions: NextAuthOptions = {
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
            authorization: {
                params: {
                    scope: "openid profile email phone",
                },
            },
        }),
        Credentials({
            credentials: {
              email: { label: "Email", type: "text" },
              password: { label: "Password", type: "password" },
            },
            async authorize(credentials) {
                await connectToDB();
            
                if (!credentials) {
                    throw new Error(JSON.stringify({ message: "Credentials not provided", desc: "Please provide both email and password" }));
                }
            
                try {
                    const userExist = await User.findOne({ email: credentials.email });
            
                    if (!userExist) {
                        console.log("User does not exist");
                        throw new Error(JSON.stringify({ message: "User does not exist", desc: "Please check the email and try again" }));
                    }
                    console.log(userExist);

                    // Check if the password exists before attempting to decrypt it
                    if (!userExist.password) {
                        throw new Error(JSON.stringify({ message: "Password is missing", desc: "The password is not available for this user" }));
                    }
            
                    const bytes = CryptoJS.AES.decrypt(userExist.password, process.env.CRYPTO_SECRET_KEY!);
            
                    // Check if decryption was successful
                    const decryptedData = bytes.toString(CryptoJS.enc.Utf8);
            
                    if (!decryptedData) {
                        console.log("Decryption failed or the password is incorrect");
                        throw new Error(JSON.stringify({ message: "Email or Password is not correct", desc: "Please check your credentials and try again" }));
                    }
            
                    const isMatch = decryptedData === credentials.password;
                    console.log(isMatch);
            
                    if (isMatch) {
                        console.log(userExist);
                        return userExist; // Return user object if authentication is successful
                    } else {
                        console.log("Email or Password is not correct");
                        throw new Error(JSON.stringify({ message: "Email or Password is not correct", desc: "Please check your credentials and try again" }));
                    }
                } catch (err: any) {
                    console.log(err);
                    throw new Error(JSON.stringify({ message: "Internal Server Error", desc: "An unexpected error occurred. Please try again later." }));
                }
            }
            ,
          }),
      
        

    ],
    callbacks: {
        async session({ session, token }) {
            const sessionUser = await User.findOne({ email: token.email });
            session.user = {
                id: sessionUser._id,
                email: token.email,
                name: token.name ?? "",
                image: token.image ?? "",
                phone: sessionUser.phone,
                isOwner: sessionUser.isOwner,
                isAdmin: token.isAdmin ?? false,
            };
            return session;
        },
        async jwt({ token, user, account }) {
            if (user) {
                token.id = user.id;
                token.email = user.email;
                token.isOwner = user.isOwner;
                token.nameame = user.name ?? "";
                token.image = user.image;

                // Fetch phone number if the provider is Google
                if (account!.provider === "google") {
                    const phoneNumber = await fetchPhoneNumber(account!.access_token!);
                    token.phoneNumber = phoneNumber; // Store phone number in token
                }
            }
            return token;
        },
        async signIn({ user, account }) {

            try {
                await connectToDB(); // Ensure DB connection
                const existingUser = await User.findOne({ email: user.email });

                if (!existingUser) {
                    let phoneNumber: string | null = null;
                    if (account!.provider === "google") {
                        phoneNumber = await fetchPhoneNumber(account!.access_token!);
                    }

                    const newUser = new User({
                        name: user.name,
                        email: user.email,
                        image: user.picture,
                        phoneNumber: phoneNumber,
                    });
                    await newUser.save();
                }
                return true; // Allow sign-in
            } catch (error) {
                console.error("Error during sign-in:", error);
                return false; // Prevent sign-in on error
            }
        },
    },
    secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };