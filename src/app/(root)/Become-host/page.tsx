"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import ImageUpload from "@/components/dashboaord/ImageUploader";
import { FaPlus, FaEdit, FaTrash } from "react-icons/fa";
import DateRange from "@/components/DateRange";

export default function BecomeHost() {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    location: "",
    beds: 0,
    price: 0,
    extraPersonPrice: 0,
  });
  const [image, setImage] = useState<string | null>(null);
  const router = useRouter();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    const formDataWithImage = { ...formData, image };
    const response = await fetch("/api/houseboat", {
      method: "POST",
      headers: {
    },
      body: JSON.stringify(formDataWithImage),
    });
    if (response.ok) {
      router.push("/dashboard/owner");
    } else {
      console.error("Failed to submit form");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
     
      <div className="max-w-3xl w-full bg-white shadow-lg rounded-lg p-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Details</h2>
        <div className="space-y-4">
        <textarea
            name="description"
            placeholder="Address"
            className="w-full p-3 border rounded"
            onChange={handleChange}
          ></textarea>
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
            id="numberInput"
            min="0"
            onInput={(e) => {
              const input = e.target as HTMLInputElement;
              if (Number(input.value) < 0) {
                input.value = "0";
              }
            }}
            name="beds"
            placeholder="Capacity"
            className="w-full p-3 border rounded"
            onChange={handleChange}
          />
          <input
            type="number"
            id="numberInput"
            min="0"
            onInput={(e) => {
              const input = e.target as HTMLInputElement;
              if (Number(input.value) < 0) {
                input.value = "0";
              }
            }}
            name="extraPersonPrice"
            placeholder="Extra Person Price"
            className="w-full p-3 border rounded"
            onChange={handleChange}
          />
          <input
            type="number"
            id="numberInput"
            min="0"
            onInput={(e) => {
              const input = e.target as HTMLInputElement;
              if (Number(input.value) < 0) {
                input.value = "0";
              }
            }}
            name="price"
            placeholder="Price"
            className="w-full p-3 border rounded"
            onChange={handleChange}
          />

         
        <button
          onClick={() =>
            handleSubmit()
          }
          className="mt-4 bg-primary text-white p-3 rounded w-full"
        >
          Submit
        </button>
      </div>
    </div>
  </div>
  );
}
