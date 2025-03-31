"use client";

import { useState } from "react";

export default function Form() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    address: "",
    city: "",
    pincode: "",
    email: "",
    phone: "",
    licenseNumber: "",
    govtId: null as string | null, // Store the uploaded file URL
  });

  const [image, setImage] = useState<string | null>(null); // State for ImageUpload component

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!image) {
      console.error("No file uploaded.");
      return;
    }

    // Add the uploaded image URL to the form data
    const finalFormData = { ...formData, govtId: image };

    // Submit the form data to your backend or handle it as needed
    console.log("Final Form Data:", finalFormData);
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
        <label className="block text-base mt-4">Upload any Govt. ID (Aadhar card, Driving Licence)</label>
        <input
          type="file"
          onChange={async (e) => {
            const file = e.target.files?.[0];
            if (file) {
              const formData = new FormData();
              formData.append("file", file);

              try {
            const response = await fetch("/api/uploadthing", {
              method: "POST",
              body: formData,
            });

            if (response.ok) {
              const data = await response.json();
              setFormData((prev) => ({ ...prev, govtId: data.fileUrl }));
              console.log("File uploaded successfully:", data.fileUrl);
            } else {
              console.error("File upload failed.");
            }
              } catch (error) {
            console.error("Error uploading file:", error);
              }
            }
          }}
          className="w-full p-2 border rounded"
        />
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
