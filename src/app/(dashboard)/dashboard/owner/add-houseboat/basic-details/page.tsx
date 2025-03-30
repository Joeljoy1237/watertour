"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import ImageUpload from "@/components/dashboaord/ImageUploader";
import { FaPlus, FaEdit, FaTrash } from "react-icons/fa";

// Amenities Selector Component
const AmenitiesSelector: React.FC<{ amenities: string[]; setAmenities: React.Dispatch<React.SetStateAction<string[]>> }> = ({ amenities, setAmenities }) => {
  
  const [newAmenity, setNewAmenity] = useState("");
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [editedAmenity, setEditedAmenity] = useState("");

  const addAmenity = () => {
    if (newAmenity.trim() && !amenities.includes(newAmenity)) {
      setAmenities([...amenities, newAmenity]);
      setNewAmenity("");
    }
  };

  const startEditing = (index: number) => {
    setEditingIndex(index);
    setEditedAmenity(amenities[index]);
  };

  const cancelEditing = () => {
    setEditingIndex(null);
    setEditedAmenity("");
  };

  const saveEditedAmenity = () => {
    if (editedAmenity.trim()) {
      const updatedAmenities = [...amenities];
      updatedAmenities[editingIndex!] = editedAmenity;
      setAmenities(updatedAmenities);
      cancelEditing();
    }
  };

  const deleteAmenity = (index: number) => {
    const updatedAmenities = amenities.filter((_, i) => i !== index);
    setAmenities(updatedAmenities);
  };

  return (
    <div className="border p-4 w-full rounded-lg ">
    <details className="cursor-pointer">
      <summary className="font-light">Amenities</summary>
      <div className="mt-2">
        {amenities.map((amenity, index) => (
          <div key={index} className="p-2 border rounded-md mb-2 flex justify-between">
            <span>{amenity}</span>
            <div className="flex space-x-2">
              <button onClick={() => startEditing(index)} className="text-blue-500">
                <FaEdit />
              </button>
              <button onClick={() => deleteAmenity(index)} className="text-red-500">
                <FaTrash />
              </button>
            </div>
          </div>
        ))}
        {editingIndex === null ? (
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
        ) : (
          <div className="flex items-center border rounded-md p-2">
            <input
              type="text"
              value={editedAmenity}
              onChange={(e) => setEditedAmenity(e.target.value)}
              placeholder="Edit amenity"
              className="flex-grow outline-none"
            />
            <button onClick={saveEditedAmenity} className="ml-2 text-green-600">
              Save
            </button>
            <button onClick={cancelEditing} className="ml-2 text-gray-600">
              Cancel
            </button>
          </div>
        )}
      </div>
    </details>
  </div>
);
};

{/* food and drinks */}

const FoodAndDrinksSelector: React.FC<{ items: string[]; setItems: React.Dispatch<React.SetStateAction<string[]>> }> = ({ items, setItems }) => {

  const [newItem, setNewItem] = useState("");
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [editedItem, setEditedItem] = useState("");

  const addItem = () => {
    if (newItem.trim() && !items.includes(newItem)) {
      setItems([...items, newItem]);
      setNewItem("");
    }
  };

  const startEditing = (index: number) => {
    setEditingIndex(index);
    setEditedItem(items[index]);
  };

  const cancelEditing = () => {
    setEditingIndex(null);
    setEditedItem("");
  };

  const saveEditedItem = () => {
    if (editedItem.trim()) {
      const updatedItems = [...items];
      updatedItems[editingIndex!] = editedItem;
      setItems(updatedItems);
      cancelEditing();
    }
  };

  const deleteItem = (index: number) => {
    const updatedItems = items.filter((_, i) => i !== index);
    setItems(updatedItems);
  };

  return (
    <div className="border p-4 rounded-lg w-full">
    <details className="cursor-pointer">
      <summary className="font-light">Food & Drinks</summary>
      <div className="mt-2">
        {items.map((item, index) => (
          <div key={index} className="p-2 border rounded-md mb-2 flex justify-between">
            <span>{item}</span>
            <div className="flex space-x-2">
              <button onClick={() => startEditing(index)} className="text-blue-500">
                <FaEdit />
              </button>
              <button onClick={() => deleteItem(index)} className="text-red-500">
                <FaTrash />
              </button>
            </div>
          </div>
        ))}
        {editingIndex === null ? (
          <div className="flex items-center border rounded-md p-2">
            <input
              type="text"
              value={newItem}
              onChange={(e) => setNewItem(e.target.value)}
              placeholder="Add food or drink"
              className="flex-grow outline-none"
            />
            <button onClick={addItem} className="ml-2 text-gray-600">
              <FaPlus />
            </button>
          </div>
        ) : (
          <div className="flex items-center border rounded-md p-2">
            <input
              type="text"
              value={editedItem}
              onChange={(e) => setEditedItem(e.target.value)}
              placeholder="Edit food or drink"
              className="flex-grow outline-none"
            />
            <button onClick={saveEditedItem} className="ml-2 text-green-600">
              Save
            </button>
            <button onClick={cancelEditing} className="ml-2 text-gray-600">
              Cancel
            </button>
          </div>
        )}
      </div>
    </details>
  </div>
);
};

export default function BasicDetails() {

  interface ImageObject {
    url: string;
    name: string;
  }

  const router = useRouter();
  const [amenities, setAmenities] = useState<string[]>([]);
  const [items, setItems] = useState<string[]>([]);
  const [image, setImage] = useState<ImageObject[]>([]);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    location: "",
    beds: 1,
    maxPeople: 2,
    price: "",
  });

  const handleSubmit=() => {
    try {
      fetch("/api/houseboat/owner/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId:"67e79ee42d346260ef4635cf",
          ...formData,
          amenities,
          items,
          images: image.map((img) => img.url),
        }),
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Failed to add houseboat");
          }
          return response.json();
        })
        .then((data) => {
          console.log("Houseboat added successfully:", data);
          router.push("/dashboard/owner/houseboats");
        })
        .catch((error) => {
          console.error("Error adding houseboat:", error);
        });
    } catch{
      
    }
  }

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
          <ImageUpload image={image} setImage={setImage} />
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
          <AmenitiesSelector amenities={amenities} setAmenities={setAmenities} />

          {/* Food & Drinks Selector Component */}
          <FoodAndDrinksSelector items={items} setItems={setItems} />

        </div>

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
  );
}
