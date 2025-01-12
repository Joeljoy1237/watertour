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
    <div className="w-3/4 mx-auto p-6 mt-7 bg-white rounded-full shadow-lg flex items-center justify-between space-x-4">
      {/* Search Name Input */}
      <div className="flex-1">
        <input
          type="text"
          placeholder="Search by name"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full px-6 py-3 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-[#5EBC67] focus:border-[#5EBC67] placeholder-gray-400"
        />
      </div>

      {/* Search Date Input */}
      <div>
        <input
          type="date"
          value={searchDate}
          onChange={(e) => setSearchDate(e.target.value)}
          className="px-6 py-3 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-[#5EBC67] focus:border-[#5EBC67] text-gray-600"
        />
      </div>

      {/* Search Button */}
      <button
        onClick={handleSearch}
        className="bg-[#5EBC67] text-white px-8 py-3 rounded-full shadow-md hover:bg-[#4A9453] transition-all duration-300 focus:outline-none"
      >
        Search
      </button>
    </div>
  );
};

export default SearchBar;
