"use client";
import React, { useState } from "react";
import CommentSection from "@/components/CommentSection";
import HouseboatCarousel from "@/components/HouseboatCarousel";
import CalendarAvailabilityPicker from "@/components/CalendarAvailabilityPicker";

// Define an Availability interface
interface Availability {
  dayCruiser: boolean;
  nightStay: boolean;
}

const HouseboatDetails: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedType, setSelectedType] = useState("");

  // Sample availability data for specific dates.
  const sampleAvailability: Record<string, Availability> = {
    "2025-03-12": { dayCruiser: true, nightStay: false },
    "2025-03-13": { dayCruiser: false, nightStay: true },
    "2025-03-14": { dayCruiser: false, nightStay: false },
  };

  // Determine available options for the selected date.
  const availableOptions = sampleAvailability[selectedDate] ?? {
    dayCruiser: true,
    nightStay: true,
  };
  const isFullyBooked =
    selectedDate && !availableOptions.dayCruiser && !availableOptions.nightStay;

  const handleBooking = () => {
    if (!selectedDate || !selectedType || isFullyBooked) return;
    alert(`Booking confirmed on ${selectedDate} for ${selectedType}`);
    setSelectedDate("");
    setSelectedType("");
  };

  return (
    <div className="min-h-screen py-16 bg-background text-gray-900">
      {/* Hero Section: Carousel */}
      <div className="w-3/4 mx-auto">
        <HouseboatCarousel />
      </div>

      {/* Heading Section */}
      <div className="max-w-7xl mx-auto mt-8 text-center">
        <h1 className="text-4xl md:text-5xl font-bold text-primary">
          Luxury Houseboat Stay
        </h1>
        <p className="mt-4 text-lg text-gray-700 max-w-2xl mx-auto">
          Experience the tranquility of Keralas backwaters with our premium
          houseboat. Enjoy stunning views, fully furnished rooms, and authentic
          Kerala cuisine prepared by expert chefs. Perfect for couples,
          families, and group getaways.
        </p>
      </div>

      {/* Main Content Grid */}
      <div className="max-w-7xl mx-auto px-11 mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Left Column: Content Details */}
        <div className="md:col-span-2 space-y-8">
          {/* About This Houseboat */}
          <div className="bg-white p-6 rounded-xl shadow-md">
            <h2 className="text-2xl font-semibold text-primary mb-4">
              About This Houseboat
            </h2>
            <p className="text-gray-700">
              Our houseboat offers a unique blend of modern luxury and
              traditional charm. Set against the serene backdrop of Keralas
              backwaters, every room is fully furnished with state-of-the-art
              amenities designed for comfort and convenience. Enjoy spacious
              living areas, private cabins, and panoramic views that promise an
              unforgettable escape.
            </p>
          </div>

          {/* Dining Experience */}
          <div className="bg-white p-6 rounded-xl shadow-md">
            <h2 className="text-2xl font-semibold text-primary mb-4">
              Dining Experience
            </h2>
            <p className="text-gray-700">
              Savor the best of Kerala cuisine with our in-house dining
              experience. Our chefs use locally sourced ingredients to prepare
              authentic dishes that capture the essence of regional flavors,
              ensuring every meal is a delightful celebration of taste.
            </p>
          </div>

          {/* Food Menu Section */}
          <div className="bg-white p-6 rounded-xl shadow-md">
            <h2 className="text-2xl font-semibold text-primary mb-4">
              Houseboat Food Menu
            </h2>
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-800">
                  Breakfast
                </h3>
                <ul className="list-disc list-inside text-gray-600">
                  <li>Idiyappam with Egg Curry</li>
                  <li>Puttu with Kadala Curry</li>
                  <li>Masala Dosa with Sambar</li>
                  <li>Fresh Fruits &amp; Juice</li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-800">Lunch</h3>
                <ul className="list-disc list-inside text-gray-600">
                  <li>Kerala Rice with Sambar &amp; Avial</li>
                  <li>Karimeen Pollichathu (Pearl Spot Fish)</li>
                  <li>Prawn Fry &amp; Chicken Roast</li>
                  <li>Papadam &amp; Payasam (Dessert)</li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-800">Dinner</h3>
                <ul className="list-disc list-inside text-gray-600">
                  <li>Appam with Chicken Stew</li>
                  <li>Chapati with Fish Curry</li>
                  <li>Vegetable Thoran</li>
                  <li>Banana Fritters &amp; Tea</li>
                </ul>
              </div>
            </div>
          </div>

          <CommentSection />
        </div>

        {/* Right Column: Booking Section */}
        <div className="bg-white p-6 rounded-xl shadow-md sticky top-4">
          <h2 className="text-xl font-semibold mb-4 text-primary">
            Book Your Stay
          </h2>
          {/* Custom Calendar Date Picker */}
          <div className="mb-4">
            <label className="block text-gray-600 mb-2">Select Date</label>
            <CalendarAvailabilityPicker
              selectedDate={selectedDate}
              onSelectDate={setSelectedDate}
              sampleAvailability={sampleAvailability}
            />
          </div>
          {/* Booking Options */}
          {selectedDate && (
            <div className="mb-4">
              <label className="block text-gray-600 mb-2">
                Available Options
              </label>
              {isFullyBooked ? (
                <p className="text-red-500 font-semibold">Fully Booked</p>
              ) : (
                <div className="space-y-2">
                  <label className="flex items-center gap-2">
                    <input
                      type="radio"
                      name="bookingType"
                      value="Day Cruiser"
                      checked={selectedType === "Day Cruiser"}
                      disabled={!availableOptions.dayCruiser}
                      onChange={(e) => setSelectedType(e.target.value)}
                    />
                    <span>Day Cruiser</span>
                  </label>
                  <label className="flex items-center gap-2">
                    <input
                      type="radio"
                      name="bookingType"
                      value="Night Stay"
                      checked={selectedType === "Night Stay"}
                      disabled={!availableOptions.nightStay}
                      onChange={(e) => setSelectedType(e.target.value)}
                    />
                    <span>Night Stay</span>
                  </label>
                </div>
              )}
            </div>
          )}
          <button
            onClick={handleBooking}
            className="w-full bg-primary hover:bg-green-700 text-white py-3 rounded-lg transition duration-200"
            disabled={!selectedDate || isFullyBooked || !selectedType}
          >
            Book Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default HouseboatDetails;
