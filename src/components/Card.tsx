import React from "react";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faStar,
  faStarHalfAlt,
  faStar as faEmptyStar,
} from "@fortawesome/free-solid-svg-icons";
import Button from "@/components/Button";
import Link from "next/link";

interface CardProps {
  id: string;
  title: string;
  price: number;
  rating: number;
  imageUrl: string;
}

const Card: React.FC<CardProps> = ({ id, title, price, rating, imageUrl }) => {
  const renderStars = (rating: number) => {
    const totalStars = 5;
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating - fullStars >= 0.5;

    return Array.from({ length: totalStars }, (_, index) => {
      if (index < fullStars) {
        // Full star
        return (
          <FontAwesomeIcon
            id={id}
            key={index}
            icon={faStar}
            className="text-yellow-400 w-5 h-5"
          />
        );
      } else if (index === fullStars && hasHalfStar) {
        // Half star
        return (
          <FontAwesomeIcon
            id={id}
            key={index}
            icon={faStarHalfAlt}
            className="text-yellow-400 w-5 h-5"
          />
        );
      } else {
        // Empty star
        return (
          <FontAwesomeIcon
            id={id}
            key={index}
            icon={faEmptyStar}
            className="text-gray-300 w-5 h-5"
          />
        );
      }
    });
  };

  return (
    <div className="bg-white rounded-xl w-auto shadow-lg overflow-hidden transform hover:scale-105 transition duration-300">
      {/* Image Section */}
      <div className="relative w-full h-48 md:h-56">
        <Image src={imageUrl} alt={title} fill className="object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent"></div>
      </div>

      {/* Content Section */}
      <div className="p-5">
        <h3 className="text-black text-lg font-bold mb-2 truncate">{title}</h3>

        {/* Star Rating */}
        <div className="flex items-center mb-4">{renderStars(rating)}</div>

        {/* Price Section */}
        <div className="flex items-center justify-between">
          <span className="text-black text-xl font-semibold">
            {`₹${price.toLocaleString("en-IN")}`}
          </span>
          <Link href={`/book/${id}`}>
            <Button title="Book Now" />
          </Link>
        </div>
      </div>
    </div>
  );
};

const CardList: React.FC = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 p-5">
      <Card
        id="1"
        title="Serenity Cruise"
        price={1200}
        imageUrl="/test_boat.jpg"
        rating={3.5}
      />
      <Card
        id="2"
        title="Luxury Paradise"
        price={2200}
        imageUrl="/test_boat.jpg"
        rating={4.5}
      />
      <Card
        id="3"
        title="Dream Voyager"
        price={1500}
        imageUrl="/test_boat.jpg"
        rating={1.5}
      />
    </div>
  );
};

export default CardList;
