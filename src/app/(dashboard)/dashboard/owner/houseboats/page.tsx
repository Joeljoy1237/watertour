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
  cutPrice: string;
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
    const fetchHouseboats = async () => {
      if (status === "authenticated" && session?.user?.id) {
        try {
          const response = await fetch("/api/houseboat/fetch", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ userId: session.user.id }),
          });
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

  const handleDelete = async (boatId: string) => {
    if (!session?.user?.id) return;
    const confirmDelete = confirm("Are you sure you want to delete this houseboat?");
    if (!confirmDelete) return;

    try {
      const response = await fetch("/api/houseboat/owner/delete", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId: session.user.id, boatId }),
      });
      const result = await response.json();
      if (response.ok) {
        setHouseboats(houseboats.filter((boat) => boat._id !== boatId));
      } else {
        alert(result.message || "Failed to delete houseboat");
      }
    } catch (error) {
      console.error("Error deleting houseboat:", error);
      alert("An error occurred while deleting the houseboat");
    }
  };

  return (
    <div className="min-h-screen p-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-semibold text-primary">My Houseboats</h1>
          <Link href="/dashboard/owner/add-houseboat/basic-details">
            <button className="bg-primary text-white px-4 py-2 rounded flex items-center gap-2 shadow hover:bg-green-700 transition">
              <FiPlus /> Add New
            </button>
          </Link>
        </div>
        {loading && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {Array.from({ length: 6 }).map((_, index) => (
              <div key={index} className="bg-gray-300 animate-pulse h-60 rounded"></div>
            ))}
          </div>
        )}
        {error && <p className="text-center text-red-500">{error}</p>}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {!loading && houseboats.length > 0 ? (
            houseboats.map((boat) => (
              <div key={boat._id} className="bg-white shadow rounded overflow-hidden transform hover:scale-105 transition duration-300">
                <Link href={`/boat/${boat._id}`}>
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
                </Link>
                <div className="p-4">
                  <h2 className="text-xl font-semibold text-gray-900">{boat.name}</h2>
                  <p className="text-gray-600">{boat.location}</p>
                  <p className="text-gray-500 line-through">₹{boat.cutPrice}</p>
                  <p className="text-primary font-medium">₹{boat.price}</p>
                  <div className="mt-4 flex justify-between">
                    <button onClick={() => router.push(`/dashboard/owner/add-houseboat/basic-details?editing=true&boatId=${boat._id}`)} className="bg-gray-200 px-3 py-1 rounded flex items-center gap-2 text-gray-700 hover:bg-gray-300 transition">
                      <FiEdit /> Edit
                    </button>
                    <button onClick={() => handleDelete(boat._id)} className="bg-red-500 text-white px-3 py-1 rounded flex items-center gap-2 hover:bg-red-600 transition">
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
