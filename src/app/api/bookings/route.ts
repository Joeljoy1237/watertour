import { NextResponse } from "next/server";
import { connectToDB } from "@/utils/database";
import Booking from "@/models/Booking";

export async function POST(req: Request) {
    try {
        const { userId } = await req.json();
        if (!userId) {
            return NextResponse.json({ message: "User ID is required" }, { status: 400 });
        }

        await connectToDB();

        const bookings = await Booking.find({ userId }).sort({ createdAt: -1 }).populate("houseboatId", "name location images");
        console.log("askdlaskjdlkasjdlak");

        return NextResponse.json(
            bookings.map((b) => ({
                _id: b._id,
                houseboat: {
                    name: b.houseboatId.name,
                    location: b.houseboatId.location,
                    image: b.houseboatId.images,
                },
                date: b.date,
                status: b.status,
                guests: b.guests,
                beds: b.beds,
                type: b.type,
                totalPrice: b.totalPrice,
            })),
            { status: 200 }

        );
    } catch (error) {
        console.error("Error fetching bookings:", error);
        return NextResponse.json({ message: "Something went wrong" }, { status: 500 });
    }
}
