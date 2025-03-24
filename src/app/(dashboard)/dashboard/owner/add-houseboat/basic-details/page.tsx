"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import ImageUpload from "@/components/image-upload";
import { FaPlus } from "react-icons/fa";

// Amenities Selector Component
const AmenitiesSelector = () => {
  const [amenities, setAmenities] = useState<string[]>([]);
  const [newAmenity, setNewAmenity] = useState("");

  const addAmenity = () => {
    if (newAmenity.trim() && !amenities.includes(newAmenity)) {
      setAmenities([...amenities, newAmenity]);
      setNewAmenity("");
    }
  };

  return (
    <div className="border p-4 w-full rounded-lg ">
      <details className="cursor-pointer">
        <summary className="font-light">Amenities</summary>
        <div className="mt-2">
          {amenities.map((amenity, index) => (
            <div key={index} className="p-2 border rounded-md mb-2">
              {amenity}
            </div>
          ))}
          <div className="flex items-center border rounded-md p-2">
            <input
              type="text"
              value={newAmenity}
              onChange={(e) => setNewAmenity(e.target.value)}
              placeholder="Add amenity"
              className="flex-grow outline-none"
            />
            <button onClick={addAmenity} className="ml-2 text-gray-600">
              <FaPlus />
            </button>
          </div>
        </div>
      </details>
    </div>
  );
};

{/* food and drinks */}

const FoodAndDrinksSelector = () => {
  const [items, setItems] = useState<string[]>([]);
  const [newItem, setNewItem] = useState("");

  const addItem = () => {
    if (newItem.trim() && !items.includes(newItem)) {
      setItems([...items, newItem]);
      setNewItem("");
    }
  };

  return (
    <div className="border  p-4 rounded-lg w-full">
      <details className="cursor-pointer">
        <summary className="font-light">Food & Drinks</summary>
        <div className="mt-2">
          {items.map((item, index) => (
            <div key={index} className="p-2 border rounded-md mb-2">
              {item}
            </div>
          ))}
          <div className="flex items-center border rounded-md p-2">
            <input
              type="text"
              value={newItem}
              onChange={(e) => setNewItem(e.target.value)}
              placeholder="Add food or drink"
              className="flex-grow outline-none"
            />
            <button onClick={addItem} className="ml-2 text=-gray-600">
              <FaPlus />
            </button>
          </div>
        </div>
      </details>
    </div>
  );
};

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
    <div className="flex ">
      <section className="bg-white mx-3 shadow-lg rounded-lg p-6 lg:flex flex-col w-1/2">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">Add Image</h1>
        <div className="flex items-center space-x-4">
          <ImageUpload />
        </div>
      </section>

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
            placeholder="Capacity"
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

          {/* Amenities Selector Component */}
          <AmenitiesSelector />

          {/* Food & Drinks Selector Component */}
          <FoodAndDrinksSelector />

        </div>

        <button
          onClick={() =>
            router.push("/dashboard/owner/add-houseboat/more-details")
          }
          className="mt-4 bg-primary text-white p-3 rounded w-full"
        >
          Next
        </button>
      </div>
    </div>
  );
}
