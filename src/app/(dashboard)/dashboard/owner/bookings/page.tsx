"use client";
import React, { useState } from "react";
import { FaIndianRupeeSign } from "react-icons/fa6";
import {
  FiCheckCircle,
  FiXCircle,
  FiUsers,
  FiCalendar,
  FiHome,
} from "react-icons/fi";

const bookings = [
  {
    id: 1,
    guestName: "John Doe",
    checkIn: "2025-03-25",
    people: 4,
    beds: 2,
    tourType: "Night Stay",
    amount: 12000, // In INR
    status: "pending",
  },
  {
    id: 2,
    guestName: "Jane Smith",
    checkIn: "2025-04-05",
    people: 6,
    beds: 3,
    tourType: "Day Cruise",
    amount: 9000, // In INR
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
    <div className="min-h-screen p-6 bg-white rounded-xl shadow-md bg-opacity-30">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Manage Bookings</h1>
      <div className="space-y-6">
        {bookingList.map((booking) => (
          <div
            key={booking.id}
            className="bg-white p-6 rounded-xl shadow-md flex flex-col md:flex-row justify-between items-center border-l-4 border-gray-300 hover:border-primary transition-all"
          >
            <div className="text-gray-800 w-full md:w-auto space-y-2">
              <p className="font-semibold text-xl">{booking.guestName}</p>
              <p className="flex items-center gap-2 text-gray-600">
                <FiCalendar className="text-gray-500" /> Check-in:{" "}
                {booking.checkIn}
              </p>
              <p className="flex items-center gap-2 text-gray-600">
                <FiUsers className="text-gray-500" /> People: {booking.people}
              </p>
              <p className="flex items-center gap-2 text-gray-600">
                <FiHome className="text-gray-500" /> Beds: {booking.beds}
              </p>
              <p className="text-sm font-medium text-indigo-600">
                {booking.tourType}
              </p>
              <p className="flex items-center gap-2 text-gray-600">
                <FaIndianRupeeSign className="text-gray-500" /> Amount: ₹
                {booking.amount.toLocaleString("en-IN")}
              </p>
              <span
                className={`px-3 py-1 inline-block text-sm font-semibold rounded-full mt-2 ${
                  booking.status === "approved"
                    ? "bg-green-100 text-green-600"
                    : booking.status === "canceled"
                      ? "bg-red-100 text-red-600"
                      : "bg-yellow-100 text-yellow-600"
                }`}
              >
                {booking.status.toUpperCase()}
              </span>
            </div>
            {booking.status === "pending" && (
              <div className="flex gap-3 mt-4 md:mt-0">
                <button
                  onClick={() => handleApprove(booking.id)}
                  className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 shadow-md transition-all"
                >
                  <FiCheckCircle /> Approve
                </button>
                <button
                  onClick={() => handleCancel(booking.id)}
                  className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 shadow-md transition-all"
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
