"use client";
import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { FaIndianRupeeSign } from "react-icons/fa6";
import { FiCheckCircle, FiXCircle, FiUsers, FiCalendar, FiHome } from "react-icons/fi";
import io from "socket.io-client";

const socket = io("http://localhost:3001"); // Replace with your backend URL

type Booking = {
  updatedFields: unknown;
  bookingId: string;
  _id: string;
  name: string;
  date: string;
  guests: number;
  beds: number;
  houseboatId: { name: string };
  type: string;
  totalPrice: number;
  status: "pending" | "approved" | "cancelled";
};

const BookingCard: React.FC<{
  booking: Booking;
  onConfirmAction: (id: string, action: "approve" | "cancel") => void;
}> = ({ booking, onConfirmAction }) => (
  <div className="bg-white p-6 rounded-xl shadow-md flex flex-col md:flex-row justify-between items-center border-l-4 border-gray-300 hover:border-primary transition-all">
    <div className="text-gray-800 w-full md:w-auto space-y-2">
      <p className="font-semibold text-xl">{booking.houseboatId.name}</p>
      <p className="flex items-center gap-2 text-gray-600">
        <FiCalendar className="text-gray-500" /> Check-in: {booking.date}
      </p>
      <p className="flex items-center gap-2 text-gray-600">
        <FiUsers className="text-gray-500" /> People: {booking.guests}
      </p>
      <p className="flex items-center gap-2 text-gray-600">
        <FiHome className="text-gray-500" /> Beds: {booking.beds}
      </p>
      <p className="text-sm font-medium text-indigo-600">{booking.type}</p>
      <p className="flex items-center gap-2 text-gray-600">
        <FaIndianRupeeSign className="text-gray-500" /> Amount: {booking.totalPrice}
      </p>
      <span className={`px-3 py-1 inline-block text-sm font-semibold rounded-full mt-2 ${
          booking.status === "approved" ? "bg-green-100 text-green-600" :
          booking.status === "cancelled" ? "bg-red-100 text-red-600" :
          "bg-yellow-100 text-yellow-600"
        }`}>{booking.status.toUpperCase()}</span>
    </div>
    {booking.status === "pending" && (
      <div className="flex gap-3 mt-4 md:mt-0">
        <button
          onClick={() => onConfirmAction(booking._id, "approve")}
          className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 shadow-md transition-all"
        >
          <FiCheckCircle /> Approve
        </button>
        <button
          onClick={() => onConfirmAction(booking._id, "cancel")}
          className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 shadow-md transition-all"
        >
          <FiXCircle /> Cancel
        </button>
      </div>
    )}
  </div>
);

export default function ManageBookings() {
  const { data: session } = useSession();
  const [bookingList, setBookingList] = useState<Booking[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [confirmModal, setConfirmModal] = useState<{ id: string; action: "approve" | "cancel" } | null>(null);

  useEffect(() => {
    if (!session?.user.id) return;

    socket.emit("fetchBookings", { ownerId: session.user.id });

    socket.on("initialBookings", (bookings: Booking[]) => {
      setBookingList(bookings);
      setLoading(false);
    });

    socket.on("bookingUpdated", (updatedBooking: Booking) => {
      console.log(updatedBooking);
      setBookingList((prev) =>
        prev.map((b) =>
          b._id === updatedBooking.bookingId
            ? { ...b, ...(typeof updatedBooking.updatedFields === "object" && updatedBooking.updatedFields !== null ? updatedBooking.updatedFields : {}) }
            : b
        )
      );
      
    });

    return () => {
      socket.off("initialBookings");
      socket.off("bookingUpdated");
    };
  }, [session]);

  const handleConfirmAction = async () => {
    if (!confirmModal) return;
    const { id, action } = confirmModal;
    const endpoint = action === "approve" ? "/api/owner/approveBooking" : "/api/bookings/cancel";
    try {
      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({userId:session?.user.id, bookingId: id }),
      });
      if (!res.ok) throw new Error(`Failed to ${action} booking`);

      setConfirmModal(null);
    } catch (error) {
      toast.error(`Error ${action}ing booking`);
      console.error(`Error ${action}ing booking:`, error);
    }
  };

  return (
    <div className="min-h-screen p-6 bg-white rounded-xl shadow-md bg-opacity-30">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Manage Bookings</h1>
      {loading ? (
        <p className="text-gray-600">Loading bookings...</p>
      ) : bookingList.length === 0 ? (
        <p className="text-gray-600">No bookings available.</p>
      ) : (
        <div className="space-y-6">
          {bookingList.map((booking) => (
            <BookingCard
              key={booking._id}
              booking={booking}
              onConfirmAction={(id, action) => setConfirmModal({ id, action })}
            />
          ))}
        </div>
      )}
      {confirmModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg text-center">
            <p className="text-lg font-semibold">Are you sure you want to {confirmModal.action} this booking?</p>
            <div className="mt-4 flex justify-center gap-4">
              <button onClick={handleConfirmAction} className="bg-primary-500 text-white px-4 py-2 rounded">Confirm</button>
              <button onClick={() => setConfirmModal(null)} className="bg-gray-300 px-4 py-2 rounded">Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
