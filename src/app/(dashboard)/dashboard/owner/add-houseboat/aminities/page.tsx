"use client";
import React, { useState } from "react";
import {
  FaSwimmingPool,
  FaWifi,
  FaParking,
  FaUtensils,
  FaTv,
  FaSnowflake,
} from "react-icons/fa";

const amenitiesList = [
  { id: 1, name: "Wi-Fi", icon: <FaWifi /> },
  { id: 2, name: "Swimming Pool", icon: <FaSwimmingPool /> },
  { id: 3, name: "Parking", icon: <FaParking /> },
  { id: 4, name: "Restaurant", icon: <FaUtensils /> },
  { id: 5, name: "Television", icon: <FaTv /> },
  { id: 6, name: "Air Conditioning", icon: <FaSnowflake /> },
];

export default function AmenitiesSelection() {
  const [selectedAmenities, setSelectedAmenities] = useState<number[]>([]);

  const toggleAmenity = (id: number) => {
    setSelectedAmenities((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white p-6">
      <div className="w-full max-w-3xl bg-white shadow-lg rounded-xl p-6">
        <h2 className="text-2xl font-semibold text-primary mb-4">
          Select Amenities
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
          {amenitiesList.map((amenity) => (
            <button
              key={amenity.id}
              className={`flex items-center justify-center gap-2 p-4 border rounded-lg shadow-sm transition-colors 
                ${
                  selectedAmenities.includes(amenity.id)
                    ? "bg-primary text-white"
                    : "bg-gray-100 text-gray-700"
                }`}
              onClick={() => toggleAmenity(amenity.id)}
            >
              {amenity.icon}
              <span>{amenity.name}</span>
            </button>
          ))}
        </div>
        <div className="mt-6">
          <button className="w-full bg-primary text-white py-2 rounded-lg shadow hover:bg-opacity-80 transition">
            Save Selection
          </button>
        </div>
      </div>
    </div>
  );
}
