// app/dashboard/bookings/page.tsx
import React from "react";
import BookingCard from "@/components/BookingCard";

export default function BookingsPage() {
  // Sample data for bookings
  const bookings = [
    {
      id: "BK001",
      title: "Serenity Cruise",
      date: "2023-10-20",
      imageUrl: "/test_boat.jpg",
    },
    // Add more bookings as needed...
  ];

  return (
    <div>
      <h1 className="text-2xl font-semibold mb-6">My Bookings</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {bookings.map((booking) => (
          <BookingCard key={booking.id} booking={booking} />
        ))}
      </div>
    </div>
  );
}
