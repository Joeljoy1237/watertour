import NextAuth, { NextAuthOptions, AdapterUser } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import CryptoJS from "crypto-js";
import User from "@/models/User"; // Adjust the path based on your User model location
import { connectToDB } from "@/utils/database"; // Adjust the path based on your DB connection utility

// Extend NextAuth Session, JWT, & AdapterUser Types
declare module "next-auth" {
    interface Session {
        user: {
            id: string;
            email: string;
            name: string;
            image?: string;
            phone?: string;
            isAdmin: boolean;
            isOwner: boolean;
        };
    }

    interface AdapterUser {
        isOwner: boolean;
    }
}

declare module "next-auth/jwt" {
    interface JWT {
        id: string;
        email: string;
        name: string;
        image?: string;
        phone?: string;
        isOwner: boolean;
        isAdmin?: boolean;
    }
}

// NextAuth Configuration
const authOptions: NextAuthOptions = {
    providers: [
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
                        throw new Error(JSON.stringify({ message: "User does not exist", desc: "Please check the email and try again" }));
                    }

                    if (!userExist.password) {
                        throw new Error(JSON.stringify({ message: "Password is missing", desc: "The password is not available for this user" }));
                    }

                    const bytes = CryptoJS.AES.decrypt(userExist.password, process.env.CRYPTO_SECRET_KEY!);
                    const decryptedData = bytes.toString(CryptoJS.enc.Utf8);

                    if (!decryptedData || decryptedData !== credentials.password) {
                        throw new Error(JSON.stringify({ message: "Email or Password is not correct", desc: "Please check your credentials and try again" }));
                    }

                    return userExist; // Return user object if authentication is successful
                } catch (err: unknown) {
                    if (err instanceof Error) {
                        console.error(err.message);
                        throw new Error(JSON.stringify({ message: "Internal Server Error", desc: "An unexpected error occurred. Please try again later." }));
                    }
                    console.error("An unknown error occurred");
                    throw new Error(JSON.stringify({ message: "Internal Server Error", desc: "An unexpected error occurred. Please try again later." }));
                }
            },
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
        async jwt({ token, user }) {
            if (user) {
                token.id = user.id;
                token.email = user.email ?? "";
                token.isOwner = (user as unknown as AdapterUser).isOwner;
                token.name = user.name ?? "";
                token.image = user.image ?? undefined;
            }
            return token;
        },
    },
    secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
