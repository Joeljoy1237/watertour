import { NextResponse } from "next/server";
import { connectToDB } from "@/utils/database";
import Houseboat from "@/models/Houseboat";
import Booking from "@/models/Booking";
import Subscription from "@/models/Subscription";

export async function POST(req: Request) {
  try {
    const { houseboatId, userId, date, type, guests, beds: clientBeds, totalPrice } = await req.json();

    if (!houseboatId || !date || !type || guests < 1 || totalPrice < 1) {
      return NextResponse.json({ message: "Invalid booking details" }, { status: 400 });
    }

    await connectToDB();

    // Fetch the houseboat
    const houseboat = await Houseboat.findById(houseboatId);
    if (!houseboat) {
      return NextResponse.json({ message: "Houseboat not found" }, { status: 404 });
    }

    // Check if the selected date exists in the houseboat availability
    const availability = houseboat.dates.get(date);
    if (!availability || (!availability.dayCruiser && !availability.nightStay)) {
      return NextResponse.json({ message: "Selected date is fully booked" }, { status: 400 });
    }

    // If "Day Cruiser", set beds to max beds of the houseboat
    const beds = type === "Day Cruiser" ? houseboat.beds : clientBeds;

    // Check if a booking already exists for this houseboat, date, and type
    const existingBooking = await Booking.findOne({ houseboatId, date, type });

    if (existingBooking) {
      // Update existing booking
      existingBooking.guests = guests;
      existingBooking.beds = beds;
      existingBooking.totalPrice = totalPrice;
      existingBooking.status = "pending";
      await existingBooking.save();
      const boatOwnerId = houseboat.userId;
      // Update the houseboat's date booking status
      if (type === "Day Cruiser") {
        houseboat.dates.get(date).dayCruiserBooked = true;
      } else {
        houseboat.dates.get(date).nightStayBooked = true;
      }
      await houseboat.save();
      const subscription = await Subscription.find({ userId: boatOwnerId });
      const payload = {
        title: "🚤 New Booking!",
        body: "Someone just booked your houseboat!",
        url: "https://your-site.com/bookings",
        icon: "https://your-site.com/logo.png"
      }
      console.log("Subscription", subscription);
      // Send notification to the owner
      if (subscription) {
        subscription.forEach(async (sub) => {
          await fetch("http://localhost:3001/push/", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ subscription: sub, payload }),
          });
        })
        console.log("Notification send to owner");
      } else {
        console.log("Notification error", subscription);
      }

      return NextResponse.json({ message: "Booking updated successfully!" }, { status: 200 });
    } else {
      // Create a new booking
      const booking = new Booking({
        houseboatId,
        userId,
        ownerId: houseboat.userId,
        date,
        type,
        guests,
        beds,
        totalPrice,
        status: "pending",
      });

      await booking.save();

      // Update the houseboat's date booking status
      if (type === "Day Cruiser") {
        houseboat.dates.get(date).dayCruiserBooked = true;
      } else {
        houseboat.dates.get(date).nightStayBooked = true;
      }
      await houseboat.save();
    }

    return NextResponse.json({ message: "Booking request sent! Awaiting approval." }, { status: 201 });
  } catch (error: unknown) {
    console.error("Booking error:", error);
    return NextResponse.json({ message: "Something went wrong" }, { status: 500 });
  }
}
