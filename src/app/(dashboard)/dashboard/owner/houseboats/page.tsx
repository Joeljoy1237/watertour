"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { FiEdit, FiTrash, FiPlus } from "react-icons/fi";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

interface Houseboat {
  _id: string;
  name: string;
  location: string;
  price: string;
  images: string[];
}

export default function MyHouseboats() {
  const router = useRouter();
  const { data: session, status } = useSession();
  const [houseboats, setHouseboats] = useState<Houseboat[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    console.log(session?.user)
    const fetchHouseboats = async () => {
      if (status === "authenticated" && session?.user?.id) {
        try {
          const response = await fetch("/api/houseboat/fetch", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ userId:"67e79ee42d346260ef4635cf" }),
          });
          console.log(response)

          const data = await response.json();

          if (Array.isArray(data)) {
            setHouseboats(data);
          } else {
            console.error("Unexpected API response:", data);
            setHouseboats([]);
          }
        } catch (error) {
          console.error("Error fetching houseboats:", error);
          setError("Failed to fetch houseboats");
        } finally {
          setLoading(false);
        }
      }
    };

    fetchHouseboats();
  }, [status, session?.user]);

  return (
    <div className="min-h-screen p-6">
      <div className="max-w-6xl mx-auto">
        {/* Page Title & Add Button */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-semibold text-primary">My Houseboats</h1>
          <Link href="/dashboard/owner/add-houseboat/basic-details">
            <button className="bg-primary text-white px-4 py-2 rounded-lg flex items-center gap-2 shadow-md hover:bg-green-700 transition">
              <FiPlus /> Add New
            </button>
          </Link>
        </div>

        {/* Loading & Error States */}
        {loading && <p className="text-center text-gray-600">Loading houseboats...</p>}
        {error && <p className="text-center text-red-500">{error}</p>}

        {/* Houseboat List */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 ">
         {houseboats.length > 0 ? (
         houseboats.map((boat) => (
          <div key={boat._id} className="bg-white shadow-lg rounded-xl overflow-hidden transform hover:scale-105 transition duration-300 ">           
           <div className="relative group">
          <Image
            src={boat.images[0] || "/boat.jpg"}
            width={400}
            height={250}
            alt={boat.name}
            className="w-full h-48 object-cover"
          />
          <div className="absolute inset-0 bg-black bg-opacity-80 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 cursor-pointer">
            <span className="text-white text-lg font-medium">Preview</span>
          </div>
        </div>
        <div className="p-4">
          <h2 className="text-xl font-semibold text-gray-900">{boat.name}</h2>
          <p className="text-gray-600">{boat.location}</p>
          <p className="text-primary font-medium mt-2">₹{boat.price}</p>
          <div className="mt-4 flex justify-between">
            <button onClick={async () => await router.push("/dashboard/owner/add-houseboat/basic-details?editing=true")} className="bg-gray-200 px-3 py-1 rounded-lg flex items-center gap-2 text-gray-700 hover:bg-gray-300 transition">
              <FiEdit /> Edit
            </button>
            <button className="bg-red-500 text-white px-3 py-1 rounded-lg flex items-center gap-2 hover:bg-red-600 transition">
              <FiTrash /> Delete
            </button>
          </div>
        </div>
      </div>
  
            ))
          ) : (
            !loading && <p className="text-center text-gray-600">No houseboats found.</p>
          )}
        </div>
      </div>
    </div>
  );
}
