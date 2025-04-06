"use client"
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import Button from "@/components/Button"; // Importing Button component
import {
  FaMapMarkerAlt,
  FaUserFriends,
  FaBed,
  FaCalendarAlt,
} from "react-icons/fa"; // Importing icons
import DatePicker from "react-datepicker"; // For date picker
import "react-datepicker/dist/react-datepicker.css"; // Date picker styles
import "rc-slider/assets/index.css"; // Slider styles
import Slider from "rc-slider"; // For price range slider
import { FaRupeeSign } from "react-icons/fa6";

interface SearchBarProps {
  location: string;
  setLocation: (location: string) => void;
  searchDate: Date;
  setSearchDate: (date: Date) => void;
  person: number;
  setPerson: (person: number) => void;
  numBeds: number;
  setNumBeds: (beds: number) => void;
  priceRange: [number, number];
  setPriceRange: (range: [number, number]) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({
  location,
  setLocation,
  searchDate,
  setSearchDate,
  person,
  setPerson,
  numBeds,
  setNumBeds,
  priceRange,
  setPriceRange
}) => {
  const router = useRouter();

  // State variables
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};

    if (!location.trim()) {
      newErrors.location = "Location is required";
    }

    if (!searchDate) {
      newErrors.date = "Date is required";
    } else if (searchDate < new Date(new Date().setHours(0, 0, 0, 0))) {
      newErrors.date = "Date cannot be in the past";
    }

    if (person < 1) {
      newErrors.person = "At least 1 guest is required";
    } else if (person > 10) {
      newErrors.person = "Maximum 10 guests allowed";
    }

    if (numBeds < 1) {
      newErrors.beds = "At least 1 bed is required";
    } else if (numBeds > 5) {
      newErrors.beds = "Maximum 5 beds allowed";
    }

    if (priceRange[0] < 0 || priceRange[1] > 5000) {
      newErrors.price = "Price range must be between ₹0 and ₹5000";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSearch = () => {
    if (!validateForm()) {
      return;
    }

    const query = {
      location,
      date: searchDate!.toISOString().split("T")[0],
      person,
      minPrice: priceRange[0],
      maxPrice: priceRange[1],
      numBeds,
    };

    const queryString = Object.entries(query)
      .map(
        ([key, value]) =>
          `${encodeURIComponent(key)}=${encodeURIComponent(value)}`
      )
      .join("&");

    router.push(`/search?${queryString}`);
  };

  return (
    <div className="container mx-auto -mt-48  z-10 p-6 bg-white backdrop-blur-sm shadow-lg rounded-lg">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 bg-opacity-50 gap-4">
        {/* Location Input */}
        <div className="flex flex-col">
          <div className="flex items-center border border-gray-300 rounded-md px-3 py-2 bg-white">
            <FaMapMarkerAlt className="text-gray-400 mr-2" />
            <input
              type="text"
              placeholder="Where are you going?"
              value={location}
              onChange={(e) => {
                setLocation(e.target.value);
                setErrors({ ...errors, location: "" });
              }}
              className={`w-full bg-white text-black placeholder-gray-500 focus:outline-none ${
                errors.location ? 'border-red-500' : ''
              }`}
            />
          </div>
          {errors.location && (
            <span className="text-red-500 text-xs mt-1">{errors.location}</span>
          )}
        </div>


        {/* Date Input */}
        <div className="flex flex-col">
          <div className={`flex items-center rounded-md px-3 py-2 bg-white ${errors.date ? 'border-red-500' : 'border-gray-300'}`}>
            <FaCalendarAlt className="text-gray-400 mr-2" />
            <DatePicker
              selected={searchDate}
              onChange={(date: Date | null) => {
                if (date) {
                  setSearchDate(date);
                }
                setErrors({ ...errors, date: "" });
              }}
              dateFormat="yyyy-MM-dd"
              minDate={new Date()}
              className="w-full bg-white text-black placeholder-gray-500 focus:outline-none"
              placeholderText="Select a date"
            />
          </div>
          {errors.date && (
            <span className="text-red-500 text-xs mt-1">{errors.date}</span>
          )}
        </div>


        {/* Person Input */}
        <div className="flex flex-col">
          <div className={`flex items-center rounded-md px-3 py-2 bg-white ${errors.person ? 'border-red-500' : 'border-gray-300'}`}>
            <FaUserFriends className="text-gray-400 mr-2" />
            <input
              type="number"
              placeholder="Guests"
              value={person}
              onChange={(e) => {
                setPerson(Math.max(1, Number(e.target.value)));
                setErrors({ ...errors, person: "" });
              }}
              min="1"
              max="10"
              className="w-full bg-white text-black placeholder-gray-500 focus:outline-none"
            />
          </div>
          {errors.person && (
            <span className="text-red-500 text-xs mt-1">{errors.person}</span>
          )}
        </div>


        {/* Number of Beds Input */}
        <div className="flex flex-col">
          <div className={`flex items-center rounded-md px-3 py-2 bg-white ${errors.beds ? 'border-red-500' : 'border-gray-300'}`}>
            <FaBed className="text-gray-400 mr-2" />
            <input
              type="number"
              placeholder="Beds"
              value={numBeds}
              onChange={(e) => {
                setNumBeds(Math.max(1, Number(e.target.value)));
                setErrors({ ...errors, beds: "" });
              }}
              min="1"
              max="5"
              className="w-full bg-white text-black placeholder-gray-500 focus:outline-none"
            />
          </div>
          {errors.beds && (
            <span className="text-red-500 text-xs mt-1">{errors.beds}</span>
          )}
        </div>
        </div>

      {/* Price Range Slider */}
      <div className="mt-4">
  <label className="font-semibold mb-2 flex items-center text-gray-700">
    <span className="text-black">Price Range</span>
  </label>

  <div className="px-4 py-3 bg-white rounded-xl shadow-md">
    
  <div className="flex justify-between text-sm font-medium text-gray-600">
      <span className="flex items-center">
        <FaRupeeSign className="text-black-200 mr-1" size={12} />
        {priceRange[0]}
      </span>
      <span className="flex items-center">
        <FaRupeeSign className="text-black-200 mr-1" size={12} />
        {priceRange[1]}
      </span>
    </div>

    <Slider
      range
      min={0}
      max={30000}
      step={500}
      value={priceRange}
      onChange={(values) => {
        setPriceRange(values as [number, number]);
        setErrors({ ...errors, price: "" });
      }}
      styles={{
        track: { backgroundColor: "#4ade80", height: 3 },
        handle: {
          borderColor: "#4ade80",
          backgroundColor: "#4ade80",
          height: 15,
          width: 15,
          
        },
        rail: { backgroundColor: "#e5e7eb", height: 4 },
      }}
    />

    {errors.price && (
      <span className="text-red-500 text-xs mt-2 block">{errors.price}</span>
    )}
  </div>
</div>



      
    </div>
  );
};

export default SearchBar;
