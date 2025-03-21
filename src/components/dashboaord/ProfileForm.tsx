"use client";
import React, { useState } from "react";

interface UserProfile {
  name: string;
  email: string;
  phone: string;
  location: string;
  bio: string;
  profilePic: string;
}

interface ProfileFormProps {
  user: UserProfile;
  setUser: (user: UserProfile) => void;
  onClose: () => void;
}

export default function ProfileForm({
  user,
  setUser,
  onClose,
}: ProfileFormProps) {
  const [formData, setFormData] = useState<UserProfile>(user);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    setUser(formData);
    onClose();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-xl w-96">
        <h2 className="text-xl font-semibold text-primary mb-4">
          Edit Profile
        </h2>

        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          className="w-full p-2 mb-3 border rounded focus:ring-primary focus:ring-2"
          placeholder="Full Name"
        />
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          className="w-full p-2 mb-3 border rounded focus:ring-primary focus:ring-2"
          placeholder="Email"
        />
        <input
          type="text"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          className="w-full p-2 mb-3 border rounded focus:ring-primary focus:ring-2"
          placeholder="Phone Number"
        />
        <input
          type="text"
          name="location"
          value={formData.location}
          onChange={handleChange}
          className="w-full p-2 mb-3 border rounded focus:ring-primary focus:ring-2"
          placeholder="Location"
        />
        <textarea
          name="bio"
          value={formData.bio}
          onChange={handleChange}
          className="w-full p-2 mb-3 border rounded focus:ring-primary focus:ring-2"
          placeholder="Bio"
          rows={3}
        ></textarea>

        <div className="flex justify-between mt-4">
          <button onClick={onClose} className="px-4 py-2 bg-gray-300 rounded">
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="px-4 py-2 bg-primary text-white rounded hover:bg-green-700 transition"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}
