import { NextResponse } from "next/server";
import { connectToDB } from "@/utils/database";
import Booking from "@/models/Booking";
import User from "@/models/User";

export async function POST(req: Request) {
    const { userId } = await req.json();
    try {
        // Connect to the database
        await connectToDB();

        // Retrieve the user's revenue
        const user = await User.findById({ _id: userId }).select("revenue");
        console.log(user);
        // Check if user was foundc
        if (!user) {
            return NextResponse.json({ message: "User  not found" }, { status: 404 });
        }

        // Return the user's revenue
        return NextResponse.json({ revenue: user.revenue }, { status: 200 });

    } catch (error) {
        console.error("Error fetching user revenue:", error);
        return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
    }
}