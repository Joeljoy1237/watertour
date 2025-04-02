"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import toast, { Toaster } from "react-hot-toast";
import { useSession } from "next-auth/react";

interface Booking {
  _id: string;
  houseboat: { name: string; location: string; image: string };
  date: string;
  status: "pending" | "approved" | "rejected" | "cancelled" | "confirmed";
  guests: number;
  beds: number;
  type: "Day Cruiser" | "Night Stay";
  totalPrice: number;
}

export default function BookingsPage() {
  const { data: session }= useSession();
  const [filter, setFilter] = useState("All");
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [cancelBookingId, setCancelBookingId] = useState<string | null>(null);

  useEffect(() => {
    const fetchBookings = async () => {
      if (!session?.user.id) return;
      try {
        const res = await fetch("/api/bookings", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ userId: session?.user.id }),
        });

        if (!res.ok) throw new Error("Failed to fetch bookings");

        const data = await res.json();
        setBookings(data);
      } catch (error) {
        toast.error("Error fetching bookings");
        console.error("Error fetching bookings:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, [session]);

  const handleCancelBooking = async () => {
    if (!cancelBookingId) return;
    try {
      const res = await fetch("/api/bookings/cancel", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId: session?.user.id, bookingId: cancelBookingId }),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || "Failed to cancel booking");
      }

      setBookings((prev) => prev.map((b) => b._id === cancelBookingId ? { ...b, status: "cancelled" } : b));
      toast.success("Booking canceled successfully");
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Something went wrong");
      console.error("Error cancelling booking:", error);
    } finally {
      setCancelBookingId(null);
    }
  };

  const filteredBookings =
    filter === "All" ? bookings : bookings.filter((b) => b.status === filter);

  return (
    <div className="min-h-screen bg-white p-6 flex flex-col items-center">
      <h1 className="text-3xl font-bold text-primary mb-6">My Bookings</h1>

      <div className="flex gap-4 mb-6">
        {["All", "pending", "approved", "rejected", "cancelled"].map((status) => (
          <button
            key={status}
            onClick={() => setFilter(status)}
            className={`px-4 py-2 rounded-lg shadow-md text-sm font-medium transition ${
              filter === status
                ? "bg-primary text-white"
                : "bg-white text-primary border border-primary"
            }`}
          >
            {status.charAt(0).toUpperCase() + status.slice(1)}
          </button>
        ))}
      </div>

      {loading ? (
        <div className="grid gap-6 w-full max-w-4xl">
          {[...Array(3)].map((_, index) => (
            <div key={index} className="bg-gray-200 p-4 rounded-xl shadow-md flex items-center gap-4 w-full animate-pulse">
              <div className="bg-gray-300 w-24 h-24 rounded-lg"></div>
              <div className="flex-1 space-y-2">
                <div className="h-4 bg-gray-300 rounded w-3/4"></div>
                <div className="h-3 bg-gray-300 rounded w-1/2"></div>
                <div className="h-3 bg-gray-300 rounded w-1/3"></div>
              </div>
            </div>
          ))}
        </div>
      ) : filteredBookings.length === 0 ? (
        <p>No bookings found.</p>
      ) : (
        <div className="grid gap-6 w-full max-w-4xl">
          {filteredBookings.map((booking) => (
            <div key={booking._id} className="bg-white p-4 rounded-xl shadow-md flex items-center gap-4 w-full">
              <Image src={booking.houseboat.image[0]} alt={booking.houseboat.name} width={50} height={50} className="rounded-lg w-24 h-full object-cover" />
              <div className="flex-1">
                <h2 className="text-xl font-semibold text-gray-900">{booking.houseboat.name}</h2>
                <p className="text-gray-600">{booking.houseboat.location}</p>
                <p className="text-sm text-gray-500">Date: {booking.date}</p>
                <p className="text-sm text-gray-500">
                  <strong>People:</strong> {booking.guests} | <strong>Beds:</strong> {booking.beds}
                </p>
                <p className="text-sm font-medium text-indigo-600">{booking.type}</p>
                <p className="text-sm font-bold text-gray-800 mt-1">Amount: ₹{booking.totalPrice.toLocaleString("en-IN")}</p>
                {booking.status === "pending" &&
               <span className={"inline-block px-3 py-1 mt-1 text-sm font-medium rounded-lg bg-yellow-500 text-white "}>
                {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
              </span>
               } 
              </div>
              {booking.status !== "pending" &&
                <span
                  className={`px-3 py-1 mt-1 text-sm font-medium rounded-lg ${booking.status === "confirmed"
                      ? "bg-green-100 text-green-700"
                      : booking.status === "rejected"
                      ? "bg-red-100 text-red-700"
                      : "bg-blue-100 text-gray-700"
                    }`}
                >
                  {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                </span>}
              {booking.status === "pending" && (
                <button
                  onClick={() => setCancelBookingId(booking._id)}
                  className="px-5 mr-4 py-2 text-sm text-white bg-red-600 rounded-lg hover:bg-red-700 transition-transform transform hover:scale-105"
                >
                  Cancel
                </button>
              )}
            </div>
          ))}
        </div>
      )}

      {cancelBookingId && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-lg font-bold">Confirm Cancellation</h2>
            <p>Are you sure you want to cancel this booking?</p>
            <div className="mt-4 flex justify-end gap-2">
              <button className="px-4 py-2 bg-gray-300 rounded" onClick={() => setCancelBookingId(null)}>No</button>
              <button className="px-4 py-2 bg-red-600 text-white rounded" onClick={handleCancelBooking}>Yes, Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}



      
            
         
