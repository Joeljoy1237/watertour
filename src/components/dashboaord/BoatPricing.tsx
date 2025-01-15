"use client";

import React, { useState, useEffect } from "react";
import flatpickr from "flatpickr";
import "flatpickr/dist/themes/material_blue.css"; // Optional: theme for styling
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendar } from "@fortawesome/free-solid-svg-icons";

const BoatPricingPage: React.FC = () => {
  const [regularPrice, setRegularPrice] = useState<number>(0);
  const [seasonalPrice, setSeasonalPrice] = useState<number>(0);
  const [seasonalPrices, setSeasonalPrices] = useState<
    { start: string; end: string }[]
  >([]);
  const [publicHolidays, setPublicHolidays] = useState<string[]>([]); // To store custom holidays

  const [isSundaySelected, setIsSundaySelected] = useState(false);
  const [isSaturdaySelected, setIsSaturdaySelected] = useState(false);
  const [isHolidaySelected, setIsHolidaySelected] = useState(false);

  // Initialize flatpickr for the date range picker
  useEffect(() => {
    flatpickr("#datepicker-range", {
      mode: "range",
      dateFormat: "Y-m-d",
      onChange: ([start, end]) => {
        if (start && end) {
          setSeasonalPrices((prev) => [
            ...prev,
            {
              start: start.toISOString().split("T")[0],
              end: end.toISOString().split("T")[0],
            },
          ]);
          // Reset the calendar after selecting
          const datePicker = document.getElementById(
            "datepicker-range"
          ) as HTMLInputElement;
          if (datePicker) {
            datePicker.value = ""; // Reset the calendar input value
          }
        }
      },
    });
  }, []);

  const handleRegularPriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRegularPrice(Number(e.target.value));
  };

  const handleSeasonalPriceChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setSeasonalPrice(Number(e.target.value));
  };

  const handleRemoveSeasonalPrice = (index: number) => {
    setSeasonalPrices(seasonalPrices.filter((_, i) => i !== index));
  };

  const handleAddPublicHoliday = (e: React.ChangeEvent<HTMLInputElement>) => {
    const holidayDate = e.target.value;
    if (holidayDate && !publicHolidays.includes(holidayDate)) {
      setPublicHolidays((prev) => [...prev, holidayDate]);
    }
  };

  const handleAddSelectedDays = () => {
    // Add all Sundays in the year
    if (isSundaySelected) {
      const sundays = getAllSundaysInYear();
      sundays.forEach((sunday) => {
        setSeasonalPrices((prev) => [...prev, { start: sunday, end: sunday }]);
      });
    }

    // Add all Saturdays in the year
    if (isSaturdaySelected) {
      const saturdays = getAllSaturdaysInYear();
      saturdays.forEach((saturday) => {
        setSeasonalPrices((prev) => [
          ...prev,
          { start: saturday, end: saturday },
        ]);
      });
    }

    // Add all public holidays
    if (isHolidaySelected && publicHolidays.length > 0) {
      publicHolidays.forEach((holiday) => {
        setSeasonalPrices((prev) => [
          ...prev,
          { start: holiday, end: holiday },
        ]);
      });
    }
  };

  const getAllSundaysInYear = () => {
    const sundays: string[] = [];
    const date = new Date();
    const year = date.getFullYear();

    // Set date to first Sunday of the year
    const firstDay = new Date(year, 0, 1);
    const firstSunday = firstDay.getDate() + ((7 - firstDay.getDay()) % 7);

    // Generate all Sundays for the current year
    for (let i = firstSunday; i <= 31; i += 7) {
      const sunday = new Date(year, 0, i);
      sundays.push(sunday.toISOString().split("T")[0]);
    }

    return sundays;
  };

  const getAllSaturdaysInYear = () => {
    const saturdays: string[] = [];
    const date = new Date();
    const year = date.getFullYear();

    // Set date to first Saturday of the year
    const firstDay = new Date(year, 0, 1);
    const firstSaturday = firstDay.getDate() + ((6 - firstDay.getDay()) % 7);

    // Generate all Saturdays for the current year
    for (let i = firstSaturday; i <= 31; i += 7) {
      const saturday = new Date(year, 0, i);
      saturdays.push(saturday.toISOString().split("T")[0]);
    }

    return saturdays;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Regular Price:", regularPrice);
    console.log("Seasonal Price:", seasonalPrice);
    console.log("Seasonal Prices:", seasonalPrices);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-6">
      <div className="w-full max-w-lg bg-white rounded-xl shadow-xl p-8">
        <div className="text-center mb-6">
          <h2 className="text-3xl font-semibold text-center text-primary mt-4">
            Add Prices for Boat Booking
          </h2>
        </div>
        <form onSubmit={handleSubmit}>
          {/* Regular Price Input */}
          <div className="mb-6">
            <label
              htmlFor="regularPrice"
              className="block text-lg text-gray-700 font-medium mb-2"
            >
              Regular Price (per day)
            </label>
            <input
              id="regularPrice"
              type="number"
              value={regularPrice}
              onChange={handleRegularPriceChange}
              className="w-full p-3 border border-gray-300 rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter regular price"
              required
            />
          </div>

          {/* Seasonal Price Input */}
          <div className="mb-6">
            <label
              htmlFor="seasonalPrice"
              className="block text-lg text-gray-700 font-medium mb-2"
            >
              Seasonal Price (per day)
            </label>
            <input
              id="seasonalPrice"
              type="number"
              value={seasonalPrice}
              onChange={handleSeasonalPriceChange}
              className="w-full p-3 border border-gray-300 rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter seasonal price"
              required
            />
          </div>

          {/* Seasonal Price Date Picker */}
          <div
            id="seasonal-price-picker"
            className="flex flex-col mb-6 space-y-4"
          >
            <label className="block text-lg text-gray-700 font-medium">
              Seasonal Prices (select date range)
            </label>
            <div className="relative w-full">
              <input
                id="datepicker-range"
                type="text"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-3 pl-10"
                placeholder="Select date range"
                readOnly
              />
              <FontAwesomeIcon
                icon={faCalendar}
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500"
              />
            </div>

            {/* Display Selected Seasonal Date Ranges */}
            {seasonalPrices.length > 0 && (
              <div className="mt-4 space-y-2">
                {seasonalPrices.map((range, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between"
                  >
                    <span className="text-gray-700">
                      {range.start} to {range.end}
                    </span>
                    <button
                      type="button"
                      onClick={() => handleRemoveSeasonalPrice(index)}
                      className="text-red-500 hover:text-red-700"
                    >
                      Remove
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Checkboxes for Special Days */}
          <div className="mb-6">
            <label className="block text-lg text-gray-700 font-medium mb-2">
              Select Special Seasonal Days:
            </label>
            <div className="flex flex-col space-y-2">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="sunday"
                  checked={isSundaySelected}
                  onChange={() => setIsSundaySelected((prev) => !prev)}
                />
                <label htmlFor="sunday" className="ml-2 text-gray-700">
                  All Sundays
                </label>
              </div>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="saturday"
                  checked={isSaturdaySelected}
                  onChange={() => setIsSaturdaySelected((prev) => !prev)}
                />
                <label htmlFor="saturday" className="ml-2 text-gray-700">
                  All Saturdays
                </label>
              </div>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="holiday"
                  checked={isHolidaySelected}
                  onChange={() => setIsHolidaySelected((prev) => !prev)}
                />
                <label htmlFor="holiday" className="ml-2 text-gray-700">
                  Public Holidays
                </label>
              </div>
            </div>
            {isHolidaySelected && (
              <div className="mt-4">
                <label className="block text-gray-700">
                  Add Public Holidays:
                </label>
                <input
                  type="date"
                  onChange={handleAddPublicHoliday}
                  className="w-full p-3 border border-gray-300 rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            )}
          </div>

          <button
            type="button"
            onClick={handleAddSelectedDays}
            className="w-full bg-blue-500 text-white text-sm font-medium rounded-lg px-6 py-3 hover:bg-blue-600"
          >
            Add Seasonal Days
          </button>

          <button
            type="submit"
            className="w-full bg-primary text-white text-sm font-medium rounded-lg px-6 py-3 hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 transition duration-300 ease-in-out mt-6"
          >
            Save Prices
          </button>
        </form>
      </div>
    </div>
  );
};

export default BoatPricingPage;
