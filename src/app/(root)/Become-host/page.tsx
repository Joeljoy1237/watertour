"use client";

import { useState } from "react";
import ImageUpload from "@/components/dashboaord/ImageUploader";
import { useRouter } from "next/navigation";

export default function BasicDetails() {
  const router = useRouter();
  const [image, setImage] = useState<{ url: string; name: string }[]>([]);
  const [error, setError] = useState<string>("");
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
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    // Validate all required fields
    const requiredFields = ["firstName", "lastName", "address", "city", "pincode", "email", "phone", "licenseNumber"];
    const missingFields = requiredFields.filter(field => !formData[field as keyof typeof formData]);
    
    if (missingFields.length > 0) {
      setError(`Please fill in all required fields: ${missingFields.join(", ")}`);
      setLoading(false);
      return;
    }

    // Validate email format
  if (!/\S+@\S+\.\S+/.test(formData.email)) {
    setError("Please enter a valid email address");
    setLoading(false);
    return;
  }

    if (image.length === 0) {
      setError("Please upload a government ID");
      setLoading(false);
      return;
    }

    try {
      const response = await fetch("/api/houseboat/owner/addowner", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          images: image.map((img) => img.url),
        }),
      });
    
      const data = await response.json();
    
      if (!response.ok) {
        throw new Error(data.message || "Failed to submit form");
      }
    
      console.log("Redirecting to:", data.redirectUrl);
      router.push(data.redirectUrl); // Use the redirect URL from the backend
    } catch (error) {
      console.error("Error in form submission:", error);
      setError(error instanceof Error ? error.message : "Failed to submit form");
    } finally{
      router.push("dashboard/owner");
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  return (
    <div className="max-w-5xl my-3 mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-xl font-semibold mb-4">Fill the Details</h2>
      {error && (
        <div className="mb-4 p-3 bg-red-100 text-red-700 rounded">
          {error}
        </div>
      )}
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="firstName"
          placeholder="First Name *"
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />
        <input
          type="text"
          name="lastName"
          placeholder="Last Name *"
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />
        <input
          type="text"
          name="address"
          placeholder="Address *"
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />
        <input
          type="text"
          name="city"
          placeholder="City / Town *"
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />
        <input
          type="text"
          name="pincode"
          placeholder="Pincode *"
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email *"
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />
        <input
          type="text"
          name="phone"
          placeholder="Phone number *"
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />
        <input
          type="text"
          name="licenseNumber"
          placeholder="License Number *"
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />
        <section className="bg-white mx-3 shadow-lg rounded-lg p-6 lg:flex flex-col w-1/2">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Upload any Govt. ID (Aadhar card, Driving Licence) *</h1>
          <div className="flex items-center ">
            <ImageUpload image={image} setImage={setImage} />
          </div>
        </section>
        <button
          type="submit"
          className="w-full p-3 bg-green-500 text-white rounded hover:bg-green-600 transition-colors"
          >
          {loading ? "Submitting..." : "Submit"}
        </button>
      </form>
    </div>
  );
}
