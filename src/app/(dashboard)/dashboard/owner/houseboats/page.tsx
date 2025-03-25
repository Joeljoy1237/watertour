"use client";
import React, { useState } from "react";
import Image from "next/image";
import { FiEdit, FiTrash, FiPlus } from "react-icons/fi";
import Link from "next/link";

interface Houseboat {
  id: number;
  name: string;
  location: string;
  price: string;
  image: string;
}

export default function MyHouseboats() {
  const [houseboats, setHouseboats] = useState<Houseboat[]>([
    {
      id: 1,
      name: "Ocean Pearl",
      location: "Alleppey, Kerala",
      price: "₹15,000 per night",
      image: "/test_boat.jpg",
    },
    {
      id: 2,
      name: "River Breeze",
      location: "Kumarakom, Kerala",
      price: "₹12,000 per night",
      image: "/boat.jpg",
    },
    {
      id: 3,
      name: "Bidhun Breeze",
      location: "Kayamkulam, Kerala",
      price: "₹9,000 per night",
      image: "/boat3.jpg",
    },
  ]);

  return (
    <div className="min-h-screen p-6">
      <div className="max-w-6xl mx-auto">
        {/* Page Title & Add Button */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-semibold text-primary">My Houseboats</h1>
          <Link href={"/dashboard/owner/add-houseboat/basic-details"}>
          <button className="bg-primary text-white px-4 py-2 rounded-lg flex items-center gap-2 shadow-md hover:bg-green-700 transition">
            <FiPlus /> Add New
            </button>
            </Link>
        </div>

        {/* Houseboat List */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {houseboats.map((boat) => (
            <div
              key={boat.id}
              className="bg-white shadow-lg rounded-xl overflow-hidden"
            >
              <Image
                src={boat.image}
                width={400}
                height={250}
                alt={boat.name}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h2 className="text-xl font-semibold text-gray-900">
                  {boat.name}
                </h2>
                <p className="text-gray-600">{boat.location}</p>
                <p className="text-primary font-medium mt-2">{boat.price}</p>
                <div className="mt-4 flex justify-between">
                  <button className="bg-gray-200 px-3 py-1 rounded-lg flex items-center gap-2 text-gray-700 hover:bg-gray-300 transition">
                    <FiEdit /> Edit
                  </button>
                  <button className="bg-red-500 text-white px-3 py-1 rounded-lg flex items-center gap-2 hover:bg-red-600 transition">
                    <FiTrash /> Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
