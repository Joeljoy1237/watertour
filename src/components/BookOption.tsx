"use client";
import React, { useEffect, useState } from "react";
import CalendarAvailabilityPicker from "@/components/CalendarAvailabilityPicker";
interface AvalibilityProps {
    maxCapacity: number;
    totalBeds: number;
    sampleAvailability: Record<string, { dayCruiser: boolean; nightStay: boolean }>;
    pricePerGuestDay: number;
    pricePerGuestNight: number;
    pricePerBedNight: number;
}

const BookOption: React.FC<AvalibilityProps> = ({sampleAvailability, maxCapacity, totalBeds,pricePerGuestDay,pricePerGuestNight,pricePerBedNight }) => {

    const [selectedDate, setSelectedDate] = useState("");
    const [selectedType, setSelectedType] = useState("");
    const [guests, setGuests] = useState(1);
    const [beds, setBeds] = useState(1);
    const [totalPrice, setTotalPrice] = useState(0);
  
  useEffect(() => {
    calculatePrice();
},[guests,beds,selectedType,selectedDate])
    
      // Availability Checking
      const availableOptions = sampleAvailability[selectedDate] ?? {
        dayCruiser: true,
        nightStay: true,
      };
      const isFullyBooked =
        selectedDate && !availableOptions.dayCruiser && !availableOptions.nightStay;
    


      const calculatePrice = () => {
        if (selectedType === "Day Cruiser") {
          setTotalPrice(guests * pricePerGuestDay);
        } else if (selectedType === "Night Stay") {
          setTotalPrice(guests * pricePerGuestNight + beds * pricePerBedNight);
        } else {
          // setTotalPrice(0);
        }
      };



      // Booking Confirmation
      const handleBooking = () => {
        if (!selectedDate || !selectedType || isFullyBooked) return;
        alert(
          `Booking confirmed on ${selectedDate} for ${selectedType} with ${guests} guest(s) ` +
            (selectedType === "Night Stay" ? `and ${beds} bed(s). Total Price: ₹${totalPrice}` : `. Total Price: ₹${totalPrice}`)
        );
        setSelectedDate("");
        setSelectedType("");
        setGuests(1);
        setBeds(1);
        setTotalPrice(0);
      };

  return (
    <div className="bg-white p-6 rounded-md shadow-md order-1 md:order-none md:w-1/3 md:sticky md:top-4">
          <h2 className="text-xl font-semibold mb-4 text-primary-600">
            Book Your Stay
          </h2>

          {/* Calendar */}
          <div className="p-4 rounded-md">
            <CalendarAvailabilityPicker
              selectedDate={selectedDate}
              onSelectDate={setSelectedDate}
              sampleAvailability={sampleAvailability}
            />
          </div>

          {/* Availability & Booking Type */}
          {selectedDate && (
            <div className="mt-4">
              <h3 className="text-lg font-semibold text-primary-600">
                Availability Options
              </h3>
              {isFullyBooked ? (
                <p className="text-red-500 font-semibold mt-2">Fully Booked</p>
              ) : (
                <div className="mt-2">
                  <button
                    className={`w-full text-left px-4 py-3 border rounded-lg ${
                      availableOptions.dayCruiser
                        ? "border-primary-600 text-primary-600 hover:bg-blue-100"
                        : "border-gray-300 text-gray-400 cursor-not-allowed"
                    }`}
                    disabled={!availableOptions.dayCruiser}
                    onClick={() => {
                      setSelectedType("Day Cruiser");
                    }}
                  >
                    🚤 Day Cruiser
                  </button>
                  <button
                    className={`w-full mt-2 text-left px-4 py-3 border rounded-lg ${
                      availableOptions.nightStay
                        ? "border-primary-600 text-primary-600 hover:bg-blue-100"
                        : "border-gray-300 text-gray-400 cursor-not-allowed"
                    }`}
                    disabled={!availableOptions.nightStay}
                    onClick={() => {
                      setSelectedType("Night Stay");

                    }}
                  >
                    🌙 Night Stay
                  </button>
                </div>
              )}
            </div>
          )}

          {/* Guest & Bed Selection */}
          {selectedType && (
            <div className="mt-4">
              <h3 className="text-lg font-semibold text-primary-600">
                Guest Information
              </h3>
              <label className="block mt-2 text-gray-600">
                Number of Guests
              </label>
              <input
                type="number"
                min="1"
                max={maxCapacity}
                value={guests}
                onChange={(e) => {
                  setGuests(()=>Number(e.target.value)>maxCapacity?maxCapacity:Number(e.target.value));
                  
                }}
                className="w-full p-2 border rounded-lg"
              />
              {selectedType === "Night Stay" && (
                <>
                  <label className="block mt-2 text-gray-600">
                    Number of Beds
                  </label>
                  <input
                    type="number"
                    min="1"
                    max={totalBeds}
                    value={beds}
                    onChange={(e) => {
                      setBeds(()=>Number(e.target.value)>totalBeds?totalBeds:Number(e.target.value));
                      
                    }}
                    className="w-full p-2 border rounded-lg"
                  />
                </>
              )}
            </div>
          )}

          {/* Price Display */}
          {selectedType && (
            <div className="mt-4 text-lg font-semibold text-gray-700">
              Total Price: ₹{totalPrice}
            </div>
          )}

          {/* Book Now Button */}
          <button
            onClick={handleBooking}
            className="w-full mt-6 bg-primary-600 hover:bg-primary-700 text-white py-3 rounded-lg transition duration-200"
            disabled={
              !selectedDate || isFullyBooked || !selectedType || guests < 1
            }
          >
            Confirm Booking
          </button>
        </div>
  )
}

export default BookOption