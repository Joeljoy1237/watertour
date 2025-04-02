import { NextResponse } from "next/server";
import { connectToDB } from "@/utils/database";
import Booking from "@/models/Booking";

export async function POST(req: Request) {
    try {
        const { userId, bookingId } = await req.json();

        if (!userId || !bookingId) {
            return NextResponse.json({ message: "Invalid request" }, { status: 400 });
        }

        await connectToDB();

        const booking = await Booking.findOne({ _id: bookingId, userId });

        if (!booking) {
            return NextResponse.json({ message: "Booking not found" }, { status: 404 });
        }

        if (booking.status !== "pending") {
            return NextResponse.json({ message: "Only pending bookings can be canceled" }, { status: 400 });
        }
        booking.status = "cancelled"
        booking.save();
        // await Booking.deleteOne({ _id: bookingId });

        return NextResponse.json({ message: "Booking canceled successfully" }, { status: 200 });
    } catch (error) {
        console.error("Error canceling booking:", error);
        return NextResponse.json({ message: "Something went wrong" }, { status: 500 });
    }
}
