"use client";
import React, { useState } from "react";
import { FaMapMarkerAlt } from "react-icons/fa"; // Importing location icon
import Button from "@/components/Button"; // Ensure Button component exists and is correctly imported

const SearchBar: React.FC = () => {
  const [location, setLocation] = useState("");
  interface SearchResult {
    id: string;
    houseboat: string;
    location: string;
    date: string;
    status: string;
  }

  const [results, setResults] = useState<SearchResult[]>([]); // State to store search results
  const [loading, setLoading] = useState(false); // State to handle loading

  const handleSearch = async () => {
    if (!location) {
      alert("Please enter a location.");
      return;
    }

    setLoading(true);

    try {
      // Fetch search results from the backend API
      const response = await fetch(`/api/bookings/search?location=${encodeURIComponent(location)}`);
      const data = await response.json();
      setResults(data); // Update results state with the fetched data
    } catch (error) {
      console.error("Error fetching search results:", error);
      alert("Failed to fetch search results. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center w-full mx-6 p-4 bg-white shadow-lg rounded-lg">
      {/* Location Input */}
      <div className="flex items-center border max-w-xl w-full border-gray-300 rounded-md mb-4">
        <FaMapMarkerAlt className="text-gray-400 ml-3 mr-3" />
        <input
          type="text"
          placeholder="Where are you going?"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          className="w-full p-3 focus:outline-none focus:ring-2 focus:ring-primary-500 rounded-md"
        />
        {/* Search Button */}
        <div className="flex items-center ml-3">
          <Button
            onClick={handleSearch}
            title={loading ? "Searching..." : "Search"}
            className="px-6 py-3 bg-primary-500 text-white rounded-md hover:bg-primary-600 focus:outline-none"
            disabled={loading}
          />
        </div>
      </div>

      {/* Search Results */}
      <div className="w-full max-w-4xl">
        {results.length > 0 ? (
          <div className="grid gap-4">
            {results.map((result) => (
              <div
                key={result.id}
                className="bg-white p-4 rounded-xl shadow-md flex items-center gap-4"
              >
                <div>
                  <h3 className="text-lg font-bold">{result.houseboat}</h3>
                  <p className="text-sm text-gray-600">{result.location}</p>
                  <p className="text-sm text-gray-600">Date: {result.date}</p>
                  <p className="text-sm text-gray-600">Status: {result.status}</p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          !loading && <p className="text-gray-500">No results found.</p>
        )}
      </div>
    </div>
  );
};

export default SearchBar;