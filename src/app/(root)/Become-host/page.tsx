"use client";

import { useState } from "react";
import ImageUpload from "@/components/dashboaord/ImageUploader";
import { useRouter } from "next/navigation";

// Removed duplicate export default function Form


export default function BasicDetails() {
  const router = useRouter();
  const [image, setImage] = useState<{ url: string; name: string }[]>([]);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    address: "",
    city: "",
    pincode: "",
    email: "",
    phone: "",
    licenseNumber: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch("/api/houseboat/owner/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: "67e79ee42d346260ef4635cf",
          ...formData,
          images: image.map((img) => img.url),
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to add houseboat");
      }

      const data = await response.json();
      console.log("Houseboat added successfully:", data);
      router.push("/dashboard/owner/houseboats");
    } catch (error) {
      console.error("Error adding houseboat:", error);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="max-w-5xl my-3 mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-xl font-semibold mb-4">Fill the Details</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="firstName"
          placeholder="First Name"
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />
        <input
          type="text"
          name="lastName"
          placeholder="Last Name"
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />
        <input
          type="text"
          name="address"
          placeholder="Address"
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />
        <input
          type="text"
          name="city"
          placeholder="City / Town"
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />
        <input
          type="text"
          name="phone"
          placeholder="Phone number"
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />
        <input
          type="text"
          name="licenseNumber"
          placeholder="License Number"
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />
        <section className="bg-white mx-3 shadow-lg rounded-lg p-6 lg:flex flex-col w-1/2">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Upload any Govt. ID (Aadhar card, Driving Licence)</h1>
          <div className="flex items-center ">
            <ImageUpload image={image} setImage={setImage} />
          </div>
        </section>
        <button
          type="submit"
          className="w-full p-3 bg-green-500 text-white rounded"
        >
          Submit
        </button>
      </form>
    </div>
  );
}
