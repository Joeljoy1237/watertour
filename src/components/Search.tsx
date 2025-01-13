import { useRouter } from "next/navigation";
import React, { useState } from "react";

interface SearchBarProps {
  onSearch?: (searchTerm: string, searchDate: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = () => {
  const router = useRouter();

  const getCurrentDate = (): string => {
    const today = new Date();
    const day = String(today.getDate()).padStart(2, "0");
    const month = String(today.getMonth() + 1).padStart(2, "0");
    const year = today.getFullYear();

    return `${year}-${month}-${day}`;
  };

  const [searchTerm, setSearchTerm] = useState("");
  const [searchDate, setSearchDate] = useState(getCurrentDate);

  const handleSearch = () => {
    router.push(
      `/search?term=${encodeURIComponent(searchTerm)}&date=${searchDate}`
    );
  };

  return (
    <div className="container m-4 mx-auto lg:gap-2 flex justify-center rounded-md w-3/4 shadow-lg bg-white h-auto p-6">
      {/* Search Name Input */}
      <div className="flex-1">
        <h2 className="font-semibold">location</h2>
        <input
          type="text"
          placeholder="Search by name"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className=" px-9 py-3 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#5EBC67] focus:border-[#5EBC67] placeholder-gray-400"
        />
      </div>

      {/* Search Date Input */}
      <div className="flex-1">
        <h2>Date</h2>
        <input
          type="date"
          value={searchDate}
          onChange={(e) => setSearchDate(e.target.value)}
          className=" px-9 py-3 border w-full border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#5EBC67] focus:border-[#5EBC67] text-gray-600"
        />
      </div>

      {/* Input person */}
      <div className="flex-1">
        <h2 className="font-semibold">Person</h2>
        <input
          type="text"
          placeholder="Search by name"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className=" px-9 py-3 border w-full border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#5EBC67] focus:border-[#5EBC67] placeholder-gray-400"
        />
      </div>

      {/* Search Button */}
      <button
        onClick={handleSearch}
        className="bg-[#5EBC67] text-white mt-6  px-6 py-3 rounded-md shadow-md hover:bg-[#4A9453] transition-all duration-300 focus:outline-none">
        Search
      </button>
    </div>
  );
};

export default SearchBar;
