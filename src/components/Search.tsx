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

const SearchBar: React.FC = () => {
  const router = useRouter();

  // State variables
  const [location, setLocation] = useState("");
  const [searchDate, setSearchDate] = useState<Date | null>(new Date());
  const [person, setPerson] = useState(1);
  const [priceRange, setPriceRange] = useState<number[]>([0, 1000]);
  const [numBeds, setNumBeds] = useState(1);

  const handleSearch = () => {
    if (!location || !searchDate) {
      // You can add more comprehensive validation here
      alert("Please fill in all required fields.");
      return;
    }

    const query = {
      location,
      date: searchDate.toISOString().split("T")[0],
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
    <div className="container mx-auto p-6 bg-white shadow-lg rounded-lg">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Location Input */}
        <div className="flex items-center border border-gray-300 rounded-md px-3 py-2">
          <FaMapMarkerAlt className="text-gray-400 mr-2" />
          <input
            type="text"
            placeholder="Where are you going?"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="w-full focus:outline-none"
          />
        </div>

        {/* Date Input */}
        <div className="flex items-center border border-gray-300 rounded-md px-3 py-2">
          <FaCalendarAlt className="text-gray-400 mr-2" />
          <DatePicker
            selected={searchDate}
            onChange={(date: Date | null) => setSearchDate(date)}
            dateFormat="yyyy-MM-dd"
            minDate={new Date()}
            className="w-full focus:outline-none"
            placeholderText="Select a date"
          />
        </div>

        {/* Person Input */}
        <div className="flex items-center border border-gray-300 rounded-md px-3 py-2">
          <FaUserFriends className="text-gray-400 mr-2" />
          <input
            type="number"
            placeholder="Guests"
            value={person}
            onChange={(e) => setPerson(Math.max(1, Number(e.target.value)))}
            min="1"
            className="w-full focus:outline-none"
          />
        </div>

        {/* Number of Beds Input */}
        <div className="flex items-center border border-gray-300 rounded-md px-3 py-2">
          <FaBed className="text-gray-400 mr-2" />
          <input
            type="number"
            placeholder="Beds"
            value={numBeds}
            onChange={(e) => setNumBeds(Math.max(1, Number(e.target.value)))}
            min="1"
            className="w-full focus:outline-none"
          />
        </div>
      </div>

      {/* Price Range Slider */}
      <div className="mt-6">
        <label className="font-semibold mb-2 flex items-center">
          {/*<FaRupeeSign className="text-gray-400 mr-2" />*/}
          Price Range
        </label>
        <div className="px-2">
          <Slider
            range
            min={0}
            max={5000}
            step={50}
            value={priceRange}
            onChange={(values) => setPriceRange(values as number[])}
            styles={{
              track: { backgroundColor: "#5EBC67" },
              handle: { borderColor: "#5EBC67", backgroundColor: "#5EBC67" },
            }}
          />
          <div className="flex justify-between text-sm mt-2">
            <span>₹{priceRange[0]}</span>
            <span>₹{priceRange[1]}</span>
          </div>
        </div>
      </div>

      {/* Search Button */}
      <div className="flex justify-center mt-8">
        <Button onClick={handleSearch} title="Search" className="px-10" />
      </div>
    </div>
  );
};

export default SearchBar;
