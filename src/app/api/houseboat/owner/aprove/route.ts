import { NextResponse } from "next/server";
import { connectToDB } from "@/utils/database";
import Houseboat from "@/models/Houseboat";
import Booking from "@/models/Booking";

export async function POST(req: Request) {
  try {
    const { houseboatId, date, type, guests, beds: clientBeds, totalPrice } = await req.json();

    if (!houseboatId || !date || !type || guests < 1 || totalPrice < 1) {
      return NextResponse.json({ message: "Invalid booking details" }, { status: 400 });
    }

    await connectToDB();

    const houseboat = await Houseboat.findById(houseboatId);
    if (!houseboat) {
      return NextResponse.json({ message: "Houseboat not found" }, { status: 404 });
    }

    const availability = houseboat.dates?.[date];
    if (!availability || (!availability.dayCruiser && !availability.nightStay)) {
      return NextResponse.json({ message: "Selected date is fully booked" }, { status: 400 });
    }

    // If type is "Day Cruiser", automatically set beds to max available beds
    const beds = type === "Day Cruiser" ? houseboat.beds : clientBeds;

    // Create a new booking
    const booking = new Booking({
      houseboatId,
      date,
      type,
      guests,
      beds,
      totalPrice,
    });

    await booking.save();

    // Update availability in houseboat
    if (type === "Day Cruiser") {
      houseboat.dates[date].dayCruiser = false;
    } else if (type === "Night Stay") {
      houseboat.dates[date].nightStay = false;
    }
    await houseboat.save();

    return NextResponse.json({ message: "Booking successful!" }, { status: 201 });
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("Booking error:", error.message);
    } else {
      console.error("Booking error:", error);
    }
    console.error("Booking error:", error);
    return NextResponse.json({ message: "Something went wrong" }, { status: 500 });
  }
}
