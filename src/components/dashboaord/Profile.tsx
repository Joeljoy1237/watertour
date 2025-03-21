"use client";
import Image from "next/image";
import React, { useState } from "react";
import { FiEdit, FiCamera } from "react-icons/fi";
import ProfileForm from "./ProfileForm";

export default function ProfilePage() {
  const [isEditing, setIsEditing] = useState(false);
  const [user, setUser] = useState({
    name: "Joel Mathew",
    email: "joel@example.com",
    phone: "+91 9876543210",
    location: "Punnapra, Kerala",
    bio: "Boat enthusiast | Tech lover | Houseboat owner",
    profilePic: "/boat.jpg", // Replace with actual image URL
  });

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="max-w-3xl w-full bg-white shadow-xl rounded-2xl p-8 text-gray-900">
        {/* Profile Header */}
        <div className="flex flex-col items-center">
          <div className="relative">
            <Image
              src={user.profilePic}
              width={150}
              height={150}
              alt="Profile"
              className="w-32 h-32 object-cover rounded-full border-4 border-primary shadow-lg"
            />
            <button className="absolute bottom-1 right-1 bg-primary p-2 rounded-full shadow-md hover:bg-green-700 transition">
              <FiCamera className="text-white text-lg" />
            </button>
          </div>
          <h2 className="text-2xl font-semibold mt-4 text-primary">
            {user.name}
          </h2>
          <p className="text-gray-600">{user.bio}</p>
        </div>

        {/* Profile Details */}
        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-4 bg-gray-100 rounded-xl shadow-md">
            <p className="text-sm text-gray-500">Email</p>
            <p className="text-lg font-medium">{user.email}</p>
          </div>
          <div className="p-4 bg-gray-100 rounded-xl shadow-md">
            <p className="text-sm text-gray-500">Phone</p>
            <p className="text-lg font-medium">{user.phone}</p>
          </div>
          <div className="p-4 bg-gray-100 rounded-xl shadow-md">
            <p className="text-sm text-gray-500">Location</p>
            <p className="text-lg font-medium">{user.location}</p>
          </div>
        </div>

        {/* Edit Profile Button */}
        <div className="flex justify-center mt-6">
          <button
            onClick={() => setIsEditing(true)}
            className="bg-primary px-6 py-2 flex items-center gap-2 rounded-full text-lg text-white shadow-md hover:bg-green-700 transition"
          >
            <FiEdit className="text-white" />
            Edit Profile
          </button>
        </div>
      </div>

      {isEditing && (
        <ProfileForm
          user={user}
          setUser={setUser}
          onClose={() => setIsEditing(false)}
        />
      )}
    </div>
  );
}
