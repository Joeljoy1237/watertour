import { NextRequest, NextResponse } from "next/server";
import mongoose from "mongoose";
import Booking from "@/models/Booking"; // Adjust the path as needed
import User from "@/models/User";

export async function POST(req: NextRequest) {
    try {
        const { userId, bookingId } = await req.json();

        if (!bookingId) {
            return NextResponse.json({ error: "Booking ID is required" }, { status: 400 });
        }

        // Connect to MongoDB (if not already connected)
        if (mongoose.connection.readyState !== 1) {
            await mongoose.connect(process.env.MONGODB_URI!);
        }

        // Find and update the booking status
        const updatedBooking = await Booking.findByIdAndUpdate(
            bookingId,
            { status: "approved", updatedAt: new Date() },
            { new: true }
        );
        const user = await User.findById({ _id: userId }).select("revenue");
        user.revenue = user.revenue + updatedBooking.totalPrice;
        user.save();
        if (!updatedBooking) {
            return NextResponse.json({ error: "Booking not found" }, { status: 404 });
        }
        return NextResponse.json(updatedBooking, { status: 200 });
    } catch (error) {
        console.error("Error approving booking:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
