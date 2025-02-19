// components/BookingCard.tsx
import React from "react";
import Image from "next/image";
import Link from "next/link";

interface Booking {
  id: string;
  title: string;
  date: string;
  imageUrl: string;
}

interface BookingCardProps {
  booking: Booking;
}

const BookingCard: React.FC<BookingCardProps> = ({ booking }) => {
  return (
    <div className="bg-white rounded-lg shadow overflow-hidden">
      <div className="relative w-full h-48">
        <Image
          src={booking.imageUrl}
          alt={booking.title}
          layout="fill"
          objectFit="cover"
        />
      </div>
      <div className="p-4">
        <h3 className="text-lg font-semibold">{booking.title}</h3>
        <p className="text-gray-600">Date: {booking.date}</p>
        <Link href={`/dashboard/bookings/${booking.id}`}>
          <span className="text-primary hover:underline mt-2 inline-block">
            View Details
          </span>
        </Link>
      </div>
    </div>
  );
};

export default BookingCard;
