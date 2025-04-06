"use client";
import { useState, useEffect } from "react";
import GetStarted from "@/components/GetStarted";
import Card from "@/components/Card";
import { LocationProvider } from "@/components/LocationContext";
import SearchBar from "@/components/Search";
import type { Houseboat } from "@/types/houseboat";

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
      <Card houseboats={filteredHouseboats} />
      
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
    </LocationProvider>
  );
}

