import React from "react";
import Image from "next/image";

const Card = () => {
  return (
    <div className="w-72 bg-white rounded-xl shadow-lg overflow-hidden duration-300 transform hover:scale-105">
      {/* Image Section with Light Gradient Overlay */}
      <div className="relative h-48">
        <Image
          src="/test_boat.jpg"
          alt="Houseboat"
          layout="fill"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900/20 via-gray-100/0 to-transparent"></div>
      </div>

      {/* Content Section */}
      <div className="p-5">
        <h3 className="text-black text-lg font-bold mb-2 truncate">
          Serenity Cruise
        </h3>

        {/* Star Rating */}
        <div className="flex items-center mb-4">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 16 16"
            className="w-5 h-5 text-yellow-400"
          >
            <path d="M3.612 15.443c-.396.198-.812-.149-.746-.592l.83-4.73-3.522-3.356c-.33-.314-.158-.888.283-.95l4.898-.696 2.11-4.287c.197-.398.73-.398.927 0l2.11 4.287 4.898.696c.441.062.613.636.283.95l-3.522 3.356.83 4.73c.066.443-.35.79-.746.592L8 13.187l-4.389 2.256z" />
          </svg>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 16 16"
            className="w-5 h-5 text-yellow-400"
          >
            <path d="M3.612 15.443c-.396.198-.812-.149-.746-.592l.83-4.73-3.522-3.356c-.33-.314-.158-.888.283-.95l4.898-.696 2.11-4.287c.197-.398.73-.398.927 0l2.11 4.287 4.898.696c.441.062.613.636.283.95l-3.522 3.356.83 4.73c.066.443-.35.79-.746.592L8 13.187l-4.389 2.256z" />
          </svg>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 16 16"
            className="w-5 h-5 text-yellow-400"
          >
            <path d="M3.612 15.443c-.396.198-.812-.149-.746-.592l.83-4.73-3.522-3.356c-.33-.314-.158-.888.283-.95l4.898-.696 2.11-4.287c.197-.398.73-.398.927 0l2.11 4.287 4.898.696c.441.062.613.636.283.95l-3.522 3.356.83 4.73c.066.443-.35.79-.746.592L8 13.187l-4.389 2.256z" />
          </svg>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 16 16"
            className="w-5 h-5 text-yellow-400"
          >
            <path d="M3.612 15.443c-.396.198-.812-.149-.746-.592l.83-4.73-3.522-3.356c-.33-.314-.158-.888.283-.95l4.898-.696 2.11-4.287c.197-.398.73-.398.927 0l2.11 4.287 4.898.696c.441.062.613.636.283.95l-3.522 3.356.83 4.73c.066.443-.35.79-.746.592L8 13.187l-4.389 2.256z" />
          </svg>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 16 16"
            className="w-5 h-5 text-gray-300"
          >
            <path d="M3.612 15.443c-.396.198-.812-.149-.746-.592l.83-4.73-3.522-3.356c-.33-.314-.158-.888.283-.95l4.898-.696 2.11-4.287c.197-.398.73-.398.927 0l2.11 4.287 4.898.696c.441.062.613.636.283.95l-3.522 3.356.83 4.73c.066.443-.35.79-.746.592L8 13.187l-4.389 2.256z" />
          </svg>
        </div>

        {/* Price Section */}
        <div className="flex items-center justify-between">
          <span className="text-black text-xl font-semibold">₹12,000</span>
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
    <div className="flex flex-wrap gap-16 justify-center p-5">
      <Card />
      <Card />
      <Card />
      <Card />
    </div>
  );
};

export default CardList;
