import React from "react";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faStar,
  faStarHalfAlt,
  faStar as faEmptyStar,
} from "@fortawesome/free-solid-svg-icons";

interface CardProps {
  id: string;
  title: string;
  price: number;
  rating: number;
  imageUrl: string;
}

const Card = (props: CardProps) => {
  const renderStars = (rating: number) => {
    const stars = [];
    for (let i = 0; i < 5; i++) {
      if (rating >= i + 1) {
        // Full star
        stars.push(
          <FontAwesomeIcon
            key={i}
            icon={faStar}
            className="text-yellow-400 w-5 h-5"
          />
        );
      } else if (rating > i && rating < i + 1) {
        // Half star
        stars.push(
          <FontAwesomeIcon
            key={i}
            icon={faStarHalfAlt}
            className="text-yellow-400 w-5 h-5"
          />
        );
      } else {
        // Empty star
        stars.push(
          <FontAwesomeIcon
            key={i}
            icon={faEmptyStar}
            className="text-gray-300 w-5 h-5"
          />
        );
      }
    }
    return stars;
  };

  return (
    <div className="w-72 bg-white rounded-xl shadow-lg overflow-hidden duration-300 transform hover:scale-105">
      {/* Image Section with Light Gradient Overlay */}
      <div className="relative h-48">
        <Image
          src={props.imageUrl}
          alt="Houseboat"
          fill={true}
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900/20 via-gray-100/0 to-transparent"></div>
      </div>

      {/* Content Section */}
      <div className="p-5">
        <h3 className="text-black text-lg font-bold mb-2 truncate">
          {props.title}
        </h3>

        {/* Star Rating */}
        <div className="flex items-center mb-4">
          {renderStars(props.rating)}
        </div>

        {/* Price Section */}
        <div className="flex items-center justify-between">
          <span className="text-black text-xl font-semibold">{`₹${props.price.toLocaleString(
            "en-IN" 
          )}`}</span>
          <button className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-[#4A9453] transition">
            Book Now
          </button>
        </div>
      </div>
    </div>
  );
};

const CardList = () => {
  return (
    <div className="flex flex-wrap gap-8 justify-center p-5">
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
        rating={2.5}
      />
    </div>
  );
};

export default CardList;
