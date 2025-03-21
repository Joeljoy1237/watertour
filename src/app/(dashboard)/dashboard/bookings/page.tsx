"use client";
import React, { useState } from "react";
import Image from "next/image";

const bookings = [
  {
    id: 1,
    houseboat: "Sunrise Cruiser",
    location: "Alleppey, Kerala",
    image: "/boat.jpg",
    date: "March 25, 2025",
    status: "Confirmed",
  },
  {
    id: 2,
    houseboat: "Golden Waves",
    location: "Kumarakom, Kerala",
    image: "/boat.jpg",
    date: "April 10, 2025",
    status: "Pending",
  },
  {
    id: 3,
    houseboat: "Blue Lagoon",
    location: "Kollam, Kerala",
    image: "/boat.jpg",
    date: "February 15, 2025",
    status: "Completed",
  },
  {
    id: 4,
    houseboat: "Blue Lagoon",
    location: "Kollam, Kerala",
    image: "/boat.jpg",
    date: "February 15, 2025",
    status: "Rejected",
  },
];

export default function BookingsPage() {
  const [filter, setFilter] = useState("All");

  const filteredBookings =
    filter === "All" ? bookings : bookings.filter((b) => b.status === filter);

  return (
    <div className="min-h-scree bg-white p-6 flex flex-col items-center">
      <h1 className="text-3xl font-bold text-primary mb-6">My Bookings</h1>

      {/* Filter Buttons */}
      <div className="flex gap-4 mb-6">
        {["All", "Confirmed", "Pending", "Completed", "Rejected"].map(
          (status) => (
            <button
              key={status}
              onClick={() => setFilter(status)}
              className={`px-4 py-2 rounded-lg shadow-lg text-sm font-medium transition ${
                filter === status
                  ? "bg-primary text-white"
                  : "bg-white text-primary border border-primary"
              }`}
            >
              {status}
            </button>
          )
        )}
      </div>

      {/* Booking List */}
      <div className="grid gap-6 w-full max-w-4xl">
        {filteredBookings.map((booking) => (
          <div
            key={booking.id}
            className="bg-white p-4 rounded-xl shadow-md flex items-center gap-4 w-full"
          >
            <Image
              src={booking.image}
              alt={booking.houseboat}
              width={100}
              height={100}
              className="rounded-lg w-24 h-24 object-cover"
            />
            <div className="flex-1">
              <h2 className="text-xl font-semibold text-gray-900">
                {booking.houseboat}
              </h2>
              <p className="text-gray-600">{booking.location}</p>
              <p className="text-sm text-gray-500">Date: {booking.date}</p>
            </div>
            <span
              className={`px-3 py-1 text-sm font-medium rounded-lg ${
                booking.status === "Confirmed"
                  ? "bg-green-100 text-green-700"
                  : booking.status === "Pending"
                  ? "bg-yellow-100 text-yellow-700"
                  : booking.status === "Rejected"
                  ? "bg-red-100 text-red-700"
                  : "bg-blue-100 text-blue-700"
              }`}
            >
              {booking.status}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
