"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function BasicDetails() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    location: "",
    beds: 1,
    maxPeople: 2,
    price: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="max-w-3xl w-full bg-white shadow-lg rounded-lg p-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Basic Details</h2>
        <div className="space-y-4">
          <input
            type="text"
            name="name"
            placeholder="Houseboat Name"
            className="w-full p-3 border rounded"
            onChange={handleChange}
          />
          <textarea
            name="description"
            placeholder="Description"
            className="w-full p-3 border rounded"
            onChange={handleChange}
          ></textarea>
          <input
            type="text"
            name="location"
            placeholder="Location"
            className="w-full p-3 border rounded"
            onChange={handleChange}
          />
          <input
            type="number"
            name="beds"
            placeholder="Number of Beds"
            className="w-full p-3 border rounded"
            onChange={handleChange}
          />
          <input
            type="number"
            name="maxPeople"
            placeholder="Max People Allowed"
            className="w-full p-3 border rounded"
            onChange={handleChange}
          />
          <input
            type="text"
            name="price"
            placeholder="Base Price"
            className="w-full p-3 border rounded"
            onChange={handleChange}
          />
        </div>
        <button
          onClick={() =>
            router.push("/dashboard/owner/add-houseboat/image-upload")
          }
          className="mt-4 bg-primary text-white p-3 rounded w-full"
        >
          Next
        </button>
      </div>
    </div>
  );
}
