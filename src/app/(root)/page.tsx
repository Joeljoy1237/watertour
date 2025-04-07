"use client";
import { useState, useEffect } from "react";
import GetStarted from "@/components/GetStarted";
import Card from "@/components/Card";
import { LocationProvider } from "@/components/LocationContext";
import SearchBar from "@/components/Search";
import type { Houseboat } from "@/types/houseboat";
 function SkeletonCard() {
  return (
    <div className="animate-pulse bg-gray-100 rounded-2xl shadow-md p-4 w-full max-w-sm mx-auto">
      <div className="h-40 bg-gray-300 rounded-xl mb-4" />
      <div className="h-4 bg-gray-300 rounded w-3/4 mb-2" />
      <div className="h-4 bg-gray-300 rounded w-1/2 mb-2" />
      <div className="h-4 bg-gray-300 rounded w-1/4" />
    </div>
  );
}




export default function Home() {
  const [houseboats, setHouseboats] = useState<Houseboat[]>([]);
  const [filteredHouseboats, setFilteredHouseboats] = useState<Houseboat[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Add search states
  const [location, setLocation] = useState("");
  const [searchDate, setSearchDate] = useState(new Date());
  const [person, setPerson] = useState(1);
  const [numBeds, setNumBeds] = useState(1);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 1000]);

  useEffect(() => {
    const fetchHouseboats = async () => {
      try {
        const response = await fetch("/api/houseboat/fetch", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({}),
        });
        if (!response.ok) {
          throw new Error("Failed to fetch houseboats");
        }
        const data = await response.json();
        console.log(data);
        setHouseboats(data);
        setFilteredHouseboats(data);
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    };
    fetchHouseboats();
  }, []);

  // Filter houseboats based on search criteria
  const filterHouseboats = () => {
    const filtered = houseboats.filter((houseboat) => {
      // Filter by location
      const locationMatch = houseboat.name.toLowerCase().includes(location.toLowerCase()) ||
                          houseboat.location.toLowerCase().includes(location.toLowerCase());
      
      // Filter by price range
      const priceMatch = Number(houseboat.price) >= priceRange[0] && Number(houseboat.price) <= priceRange[1];

      // Filter by beds
      const bedsMatch = houseboat.beds >= numBeds;

      // Filter by capacity
      const personMatch = houseboat.maxPeople >= person;

      return locationMatch && priceMatch && bedsMatch && personMatch;
    });

    setFilteredHouseboats(filtered);
  };

  // Apply filters whenever search criteria changes
  useEffect(() => {
    filterHouseboats();
  }, [location, searchDate, person, numBeds, priceRange]);

  return (
    <LocationProvider>
      <GetStarted />
      <SearchBar 
      location={location}
      setLocation={setLocation}
      searchDate={searchDate}
      setSearchDate={setSearchDate}
      person={person}
      setPerson={setPerson}
      numBeds={numBeds}
      setNumBeds={setNumBeds}
      priceRange={priceRange}
      setPriceRange={setPriceRange}
      />
      {filteredHouseboats.length === 0 && !loading && (
      <div className="">No houseboats found</div>
      )}
      <Card houseboats={filteredHouseboats} />
      
      {loading && (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 px-4 py-6">
        {[...Array(6)].map((_, i) => (
        <SkeletonCard key={i} />
        ))}
      </div>
      )}
      {error && <p>Error: {error}</p>}
    </LocationProvider>
  );
}
