"use client";
import { useEffect, useRef, useState } from "react";
import HouseboatCarousel from "@/components/HouseboatCarousel";
import CommentSection from "@/components/CommentSection";
import BookOption from "@/components/BookOption";
import FoodMenu from "@/components/FoodMenu";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

interface HouseboatData {
  food: {
    veg: [string];
    nonVeg:[string]
  };
  _id: string;
  name: string;
  description: string;
  location: string;
  beds: string;
  maxPeople: string;
  price: string;
  rating: number;
  specialPrice: { date: string; price: number }[];
  sesonalPrice: { date: string; price: number }[];
  amenities: string[];
  items: string[];
  images: string[];
  isAvailable: boolean;
}

const HouseboatDetails = ({ params }: { params: Promise<{ id: string }> }) => {
  const [houseboat, setHouseboat] = useState<HouseboatData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const resolvedParams = useRef<string | null>(null);
  useEffect(() => {
    const fetchHouseboat = async () => {
      try {
        const { id } = await params;
        resolvedParams.current = id;
        const res = await fetch(`/api/houseboat/${id}`);
        if (!res.ok) throw new Error("Failed to fetch houseboat details");

        const data = await res.json()
          console.log(data)
        setHouseboat(data);
      } catch {
        setError("Error loading houseboat details.");
      } finally {
        setLoading(false);
      }
    };

    fetchHouseboat();
  }, [params]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 p-6">
        <Skeleton height={300} />
        <div className="max-w-7xl mx-auto p-6 flex flex-col-reverse md:flex-row-reverse gap-8 mt-6">
          <Skeleton height={400} className="md:w-1/3" />
          <div className="md:w-2/3 space-y-6">
            <Skeleton height={40} width={200} />
            <Skeleton count={3} />
            <Skeleton height={40} width={200} />
            <Skeleton count={3} />
            <Skeleton height={40} width={200} />
            <Skeleton count={3} />
            <Skeleton height={40} width={200} />
            <Skeleton count={3} />
          </div>
        </div>
      </div>
    );
  }

  if (error) return <p className="text-center text-red-500 mt-10">{error}</p>;

  return (
    <div className="min-h-screen bg-gray-100">
      <section className="relative w-full">
        <HouseboatCarousel images={(houseboat?.images || []).map((url) => ({ src: url, alt: `Image of ${houseboat?.name || "houseboat"}` }))} />
      </section>

      <main className="max-w-7xl mx-auto p-6 flex flex-col-reverse md:flex-row-reverse gap-8 mt-6">
        <BookOption houseboatId={houseboat!._id}
        />

        <div className="md:w-2/3 space-y-6">
          <div className="bg-white p-6 rounded-md shadow-md">
            <h2 className="text-2xl font-semibold text-primary-600">{houseboat?.name}</h2>
            <p className="text-gray-700 mt-2">{houseboat?.description}</p>
          </div>

          <div className="bg-white p-6 rounded-md shadow-md">
            <h3 className="text-xl font-semibold text-primary-600">Amenities & Facilities</h3>
            <ul className="grid grid-cols-2 gap-2 mt-2 text-gray-700">
              {houseboat?.amenities?.map((amenity, index) => (
                <li key={index} className="flex items-center gap-2">✅ {amenity}</li>
              ))}
            </ul>
          </div>

          <div className="bg-white p-6 rounded-md shadow-md">
            <h3 className="text-xl font-semibold text-primary-600">Occupancy</h3>
            
            <p className="text-gray-600 mt-4">
              <strong>Maximum occupancy:</strong> {houseboat?.maxPeople} Persons
            </p>
            <p className="text-gray-600 ">
              <strong>Minimum Bed:</strong> {houseboat?.beds} Beds
            </p>
            <p className="text-gray-600">
              <strong>base Price:</strong> {houseboat?.price}
            </p>
          </div>

          <div className="bg-white p-6 rounded-md shadow-md">
            <h3 className="text-xl font-semibold text-primary-600">Food</h3>
            <FoodMenu vegItems={houseboat!.food.veg} nonVegItems={houseboat!.food.nonVeg} /> 
          <CommentSection boatId={resolvedParams.current || ""} />

      
          </div>
          </div>
      </main>
    </div>
  );
};

export default HouseboatDetails;
