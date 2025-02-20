"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";

interface ProfileData {
  name: string;
  email: string;
  phone: string;
  address: string;
  profileImage: string;
}

const ProfileView: React.FC = () => {
  const [profile, setProfile] = useState<ProfileData | null>(null);

  useEffect(() => {
    // Simulated API call to fetch profile data
    const fetchProfileData = async () => {
      const data: ProfileData = {
        name: "John Doe",
        email: "john.doe@example.com",
        phone: "+91 123-456-7890",
        address: "123 Main St, Anytown, USA",
        profileImage: "/test_boat.jpg", // Replace with actual image URL
      };
      setProfile(data);
    };

    fetchProfileData();
  }, []);

  if (!profile) {
    return <p className="text-center text-gray-500">Loading profile...</p>;
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6 bg-white">
      <div className="w-full max-w-lg lg:max-w-2xl bg-white shadow-lg rounded-xl p-8 transition-all duration-300 hover:shadow-2xl">
        {/* Profile Image */}
        <div className="flex justify-center">
          <Image
            src={profile.profileImage}
            alt="Profile"
            width={160}
            height={160}
            className="w-32 h-32 lg:w-40 lg:h-40 rounded-full border-4 border-gray-300 shadow-sm"
          />
        </div>

        {/* Profile Details */}
        <div className="space-y-6 text-center mt-6">
          <div>
            <label className="block text-sm font-medium text-gray-500">
              Name
            </label>
            <p className="text-2xl font-semibold text-gray-900">
              {profile.name}
            </p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-500">
              Email
            </label>
            <p className="text-lg text-gray-800">{profile.email}</p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-500">
              Phone
            </label>
            <p className="text-lg text-gray-800">{profile.phone}</p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-500">
              Address
            </label>
            <p className="text-lg text-gray-800">{profile.address}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileView;
