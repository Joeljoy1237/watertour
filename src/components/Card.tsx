import React from "react";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar, faStarHalfAlt, faStar as faEmptyStar } from "@fortawesome/free-solid-svg-icons";
import Button from "@/components/Button";
import Link from "next/link";
import type { Houseboat } from "@/types/houseboat";

interface CardProps {
  houseboats: Houseboat[];
}

const Card = ({ houseboats }: CardProps) => {
  const renderStars = (rating: number) => {
    const totalStars = 5;
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating - fullStars >= 0.5;

    return Array.from({ length: totalStars }, (_, index) => {
      if (index < fullStars) {
        return <FontAwesomeIcon key={index} icon={faStar} className="text-yellow-400 w-5 h-5" />;
      } else if (index === fullStars && hasHalfStar) {
        return <FontAwesomeIcon key={index} icon={faStarHalfAlt} className="text-yellow-400 w-5 h-5" />;
      } else {
        return <FontAwesomeIcon key={index} icon={faEmptyStar} className="text-gray-300 w-5 h-5" />;
      }
    });
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-IN', {
      maximumFractionDigits: 0,
      minimumFractionDigits: 0,
    }).format(price);
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 p-5">
      {houseboats.map((boat) => (
        <Link key={boat._id} href={`/boat/${boat._id}`}>
          <div className="bg-white rounded-xl w-auto shadow-lg overflow-hidden transform hover:scale-105 transition duration-300">
            <div className="relative w-full  h-48 md:h-56">
              <Image src={boat.images[0] || "/boat.jpg"} alt={boat.name} fill={true} sizes="100" className="object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent"></div>
            </div>
            <div className="p-5">
              <h3 className="text-black text-lg font-bold mb-2 truncate">{boat.name}</h3>
              <div className="flex items-center mb-4">{renderStars(boat.rating)}</div>
              <div className="flex items-center justify-between">
                <div className="flex flex-col">
                  <span className="text-gray-500 line-through text-sm">₹{formatPrice(Number(boat.cutPrice))}</span>
                  <span className="text-black text-xl font-semibold">₹{formatPrice(Number(boat.price))}</span>
                </div>
                <Button title="Book Now" />
              </div>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default Card;