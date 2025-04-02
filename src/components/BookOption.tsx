"use client";
import React, { useEffect, useState } from "react";
import io from "socket.io-client";
import CalendarAvailabilityPicker from "@/components/CalendarAvailabilityPicker";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import toast from "react-hot-toast";
import { useSession } from "next-auth/react";

interface AvailabilityData {
  dayCruiser: boolean;
  nightStay: boolean;
}

interface DatePricing {
  pricePerDay: number;
  pricePerNight: number;
  extraPricePerBed: number;
}

interface HouseboatData {
  _id: string;
  name: string;
  beds: number;
  maxPeople: number;
  price: number;
  dates: Record<string, AvailabilityData & DatePricing>;
}

interface HouseboatUpdate {
  houseboatId: string;
  updatedFields: Partial<
    HouseboatData & {
      dates: Record<string, Partial<AvailabilityData & DatePricing>>;
    }
  >;
}

const socket = io("http://localhost:3001"); // Update with actual socket server URL

const BookOption: React.FC<{ houseboatId: string }> = ({ houseboatId }) => {
  const {data:session} = useSession()
  const [houseboat, setHouseboat] = useState<HouseboatData | null>(null);
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedType, setSelectedType] = useState<"" | "Day Cruiser" | "Night Stay">("");
  const [guests, setGuests] = useState(1);
  const [beds, setBeds] = useState(1);
  const [totalPrice, setTotalPrice] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    socket.emit("getHouseboat", houseboatId);

    socket.on("houseboatData", (data: HouseboatData) => {
      setHouseboat(data);
    });

    socket.on("houseboatUpdated", (update: HouseboatUpdate) => {
  console.log("Received update:", update);

  if (update.houseboatId === houseboatId) {
    console.log("Processing update...");

    setHouseboat((prev) => {
      if (!prev) return prev;

      // Deep copy previous state
      const updatedHouseboat: HouseboatData = {
        ...prev,
        dates: { ...prev.dates },
      };

      // Apply updates properly
      Object.entries(update.updatedFields).forEach(([key, value]) => {
        if (key.startsWith("dates.")) {
          const [, date, field] = key.split(".");

          if (!updatedHouseboat.dates[date]) {
            updatedHouseboat.dates[date] = {
              dayCruiser: true,
              nightStay: true,
              pricePerDay: 0,
              pricePerNight: 0,
              extraPricePerBed: 0,
            };
          }

          // Apply the update only if the field exists in `AvailabilityData & DatePricing`
          if (field && value !== undefined) {
            updatedHouseboat.dates[date] = {
              ...updatedHouseboat.dates[date],
              [field]: value,
            };
          }
        } else {
          updatedHouseboat[key as keyof HouseboatData] = value as never;
        }
      });

      return updatedHouseboat;
    });

    toast.success("Houseboat details updated!");
  }
});


    return () => {
      socket.off("houseboatData");
      socket.off("houseboatUpdated");
    };
  }, [houseboatId]);
  const availableOptions = selectedDate && houseboat?.dates[selectedDate] 
    ? houseboat.dates[selectedDate] 
    : { dayCruiser: true, nightStay: true };

  const isFullyBooked = selectedDate && !availableOptions.dayCruiser && !availableOptions.nightStay;

  const calculatePrice = () => {
    if (!houseboat || !selectedDate || !selectedType) return;

    const dateData = houseboat.dates[selectedDate];
    if (!dateData) return;

    if (selectedType === "Day Cruiser") {
      setTotalPrice(guests * dateData.pricePerDay);
    } else if (selectedType === "Night Stay") {
      setTotalPrice(guests * dateData.pricePerNight + beds * dateData.extraPricePerBed);
    }
  };

  useEffect(() => {
    calculatePrice();
  }, [guests, beds, selectedType, selectedDate, houseboat]);

  const handleBooking = async () => {
    if (!session?.user) {
      toast.error("Login to continue!!");
      return;
}

    if (!selectedDate || !selectedType || isFullyBooked) {
      toast.error("Invalid booking details. Please select date and type.");
      return;
    }

    setIsLoading(true);
    toast.loading("Processing your booking...");

    try {
      const response = await fetch("/api/houseboat/book", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId:session?.user.id,
          houseboatId,
          date: selectedDate,
          type: selectedType,
          guests,
          beds: selectedType === "Night Stay" ? beds : 0,
          totalPrice,
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Booking failed. Try again.");
      }

      toast.dismiss();
      toast.success(result.message || "Booking confirmed!");
      setSelectedDate("");
      setSelectedType("");
      setGuests(1);
      setBeds(1);
      setTotalPrice(0);
    } catch (error: unknown) {
      toast.dismiss();
      toast.error(error instanceof Error ? error.message : "Something went wrong.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-white p-6 rounded-md shadow-md order-1 md:order-none md:w-1/3 md:sticky md:top-4">
      <h2 className="text-xl font-semibold mb-4 text-center text-primary-600">
        {houseboat ? "Book Your Stay" : <Skeleton width={200} />}
      </h2>

      {/* Skeleton Loader */}
      {!houseboat ? (
        <>
          <Skeleton height={250} className="rounded-md mb-4" />
          <Skeleton height={40} className="rounded-md mb-2" />
          <Skeleton height={40} className="rounded-md mb-2" />
          <Skeleton height={40} className="rounded-md mb-2" />
          <Skeleton height={40} className="rounded-md mb-2" />
          <Skeleton height={50} className="rounded-md mt-4" />
        </>
      ) : (
        <>
          {/* Calendar */}
          <div className="p-4 rounded-md">
            <CalendarAvailabilityPicker
              selectedDate={selectedDate}
              onSelectDate={setSelectedDate}
              availability={houseboat.dates}
            />
          </div>

          {/* Availability & Booking Type */}
          {selectedDate && (
            <div className="mt-4">
              <h3 className="text-lg font-semibold text-primary-600">Availability Options</h3>
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
                    onClick={() => setSelectedType("Day Cruiser")}
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
                    onClick={() => setSelectedType("Night Stay")}
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
              <h3 className="text-lg font-semibold text-primary-600">Guest Information</h3>
              <label className="block mt-2 text-gray-600">Number of Guests</label>
              <input
                type="number"
                min="1"
                max={houseboat.maxPeople}
                value={guests}
                onChange={(e) => setGuests(Math.min(houseboat.maxPeople, Number(e.target.value)))}
                className="w-full p-2 border rounded-lg"
              />
              {selectedType === "Night Stay" && (
                <>
                  <label className="block mt-2 text-gray-600">Number of Beds</label>
                  <input
                    type="number"
                    min="1"
                    max={houseboat.beds}
                    value={beds}
                    onChange={(e) => setBeds(Math.min(houseboat.beds, Number(e.target.value)))}
                    className="w-full p-2 border rounded-lg"
                  />
                </>
              )}
            </div>
          )}

          {/* Price Display */}
          {selectedType && <div className="mt-4 text-lg font-semibold text-gray-700">Total Price: ₹{totalPrice}</div>}

          {/* Book Now Button */}
          <button
            onClick={handleBooking}
            className={`w-full mt-6 bg-primary-600 hover:bg-primary-700 disabled:bg-slate-300 text-white py-3 rounded-lg transition duration-200`}
            disabled={!selectedDate || isFullyBooked || !selectedType || guests < 1}
          >
            Confirm Booking
          </button>
        </>
      )}
    </div>
  );
};

export default BookOption;
