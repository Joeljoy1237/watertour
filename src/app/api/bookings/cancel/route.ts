import { NextResponse } from "next/server";
import { connectToDB } from "@/utils/database";
import Booking from "@/models/Booking";
import Houseboat from "@/models/Houseboat";

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

        // Update the houseboat's date booking status
        const houseboat = await Houseboat.findById(booking.houseboatId);
        if (houseboat) {
            if (booking.type === "Day Cruiser") {
                houseboat.dates.get(booking.date).dayCruiserBooked = false;
            } else {
                houseboat.dates.get(booking.date).nightStayBooked = false;
            }
            await houseboat.save();
        }

        booking.status = "cancelled";
        await booking.save();

        return NextResponse.json({ message: "Booking canceled successfully" }, { status: 200 });
    } catch (error) {
        console.error("Error canceling booking:", error);
        return NextResponse.json({ message: "Something went wrong" }, { status: 500 });
    }
}
