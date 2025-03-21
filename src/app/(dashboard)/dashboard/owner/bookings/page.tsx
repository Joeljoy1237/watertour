"use client";
import React, { useState } from "react";
import { FiCheckCircle, FiXCircle } from "react-icons/fi";

const bookings = [
  {
    id: 1,
    guestName: "John Doe",
    checkIn: "2025-03-25",
    checkOut: "2025-03-30",
    people: 4,
    beds: 2,
    status: "pending",
  },
  {
    id: 2,
    guestName: "Jane Smith",
    checkIn: "2025-04-05",
    checkOut: "2025-04-10",
    people: 6,
    beds: 3,
    status: "approved",
  },
];

export default function ManageBookings() {
  const [bookingList, setBookingList] = useState(bookings);

  const handleApprove = (id: number) => {
    setBookingList(
      bookingList.map((booking) =>
        booking.id === id ? { ...booking, status: "approved" } : booking
      )
    );
  };

  const handleCancel = (id: number) => {
    setBookingList(
      bookingList.map((booking) =>
        booking.id === id ? { ...booking, status: "canceled" } : booking
      )
    );
  };

  return (
    <div className="min-h-screen p-6 bg-white">
      <h1 className="text-2xl font-semibold text-primary mb-4">
        Manage Bookings
      </h1>
      <div className="space-y-4">
        {bookingList.map((booking) => (
          <div
            key={booking.id}
            className="bg-white p-4 rounded-lg shadow-md flex flex-col md:flex-row justify-between items-center"
          >
            <div className="text-gray-700 w-full md:w-auto">
              <p className="font-medium">{booking.guestName}</p>
              <p className="text-sm">Check-in: {booking.checkIn}</p>
              <p className="text-sm">Check-out: {booking.checkOut}</p>
              <p className="text-sm">
                People: {booking.people} | Beds: {booking.beds}
              </p>
              <p
                className={`text-sm font-semibold mt-1 ${
                  booking.status === "approved"
                    ? "text-green-600"
                    : booking.status === "canceled"
                    ? "text-red-600"
                    : "text-yellow-600"
                }`}
              >
                {booking.status.toUpperCase()}
              </p>
            </div>
            {booking.status === "pending" && (
              <div className="flex gap-3 mt-4 md:mt-0">
                <button
                  onClick={() => handleApprove(booking.id)}
                  className="bg-green-500 text-white px-4 py-2 rounded-lg flex items-center gap-2"
                >
                  <FiCheckCircle /> Approve
                </button>
                <button
                  onClick={() => handleCancel(booking.id)}
                  className="bg-red-500 text-white px-4 py-2 rounded-lg flex items-center gap-2"
                >
                  <FiXCircle /> Cancel
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
