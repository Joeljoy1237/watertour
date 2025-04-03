"use client";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import ImageUpload from "@/components/dashboaord/ImageUploader";
import { FaPlus, FaEdit, FaTrash } from "react-icons/fa";
import { Toaster, toast } from 'react-hot-toast';
import { useLocationContext } from "@/components/LocationContext"; // Adjust the path if needed
// Amenities Selector Component
const AmenitiesSelector: React.FC<{ amenities: string[]; setAmenities: React.Dispatch<React.SetStateAction<string[]>> }> = ({ amenities, setAmenities }) => {
  
  const [newAmenity, setNewAmenity] = useState("");
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [editedAmenity, setEditedAmenity] = useState("");

  const addAmenity = () => {
    if (newAmenity.trim() && !amenities.includes(newAmenity)) {
      setAmenities([...amenities, newAmenity]);
      setNewAmenity("");
      toast.success("Amenity added successfully!"); // Success toast for adding amenity
    } else if (newAmenity.trim() === "") {
      toast.error("Amenity name cannot be empty!"); // Error toast if the input is empty
    } else {
      toast.error("This amenity already exists!"); // Error toast if amenity already exists
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
      toast.success("Amenity updated successfully!"); // Success toast for saving edited amenity
    } else {
      toast.error("Edited amenity cannot be empty!"); // Error toast if the edited amenity is empty
    }
  };

  const deleteAmenity = (index: number) => {
    const amenityToDelete = amenities[index];
    const updatedAmenities = amenities.filter((_, i) => i !== index);
    setAmenities(updatedAmenities);
    toast.success(`${amenityToDelete} deleted successfully!`); // Success toast for deleting amenity
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
      <Toaster /> {/* Toaster component to display the toast notifications */}
    </div>
  );
};
{/* food */}
const FoodSelector: React.FC<{ vegItems: string[]; setVegItems: React.Dispatch<React.SetStateAction<string[]>>; nonVegItems: string[]; setNonVegItems: React.Dispatch<React.SetStateAction<string[]>> }> = ({ vegItems, setVegItems, nonVegItems, setNonVegItems }) => {

  const [newItem, setNewItem] = useState("");
  const [isVeg, setIsVeg] = useState(true);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [editedItem, setEditedItem] = useState("");
  const [editedIsVeg, setEditedIsVeg] = useState(true);

  const addItem = () => {
    if (newItem.trim()) {
      if (isVeg) {
        setVegItems([...vegItems, newItem]);
      } else {
        setNonVegItems([...nonVegItems, newItem]);
      }
      setNewItem("");
      toast.success(`${newItem} added successfully!`); // Success toast for adding food
    } else {
      toast.error("Food name cannot be empty!"); // Error toast for empty input
    }
  };

  const startEditing = (index: number, isVegItem: boolean) => {
    setEditingIndex(index);
    setEditedIsVeg(isVegItem);
    setEditedItem(isVegItem ? vegItems[index] : nonVegItems[index]);
  };

  const saveEditedItem = () => {
    if (editedItem.trim()) {
      if (editedIsVeg) {
        const updatedVegItems = [...vegItems];
        updatedVegItems[editingIndex!] = editedItem;
        setVegItems(updatedVegItems);
      } else {
        const updatedNonVegItems = [...nonVegItems];
        updatedNonVegItems[editingIndex!] = editedItem;
        setNonVegItems(updatedNonVegItems);
      }
      cancelEditing();
      toast.success("Food item updated successfully!"); // Success toast for updating food item
    } else {
      toast.error("Edited food name cannot be empty!"); // Error toast for empty edit input
    }
  };

  const cancelEditing = () => {
    setEditingIndex(null);
    setEditedItem("");
    setEditedIsVeg(true);
  };

  const deleteItem = (index: number, isVegItem: boolean) => {
    if (isVegItem) {
      const itemToDelete = vegItems[index];
      setVegItems(vegItems.filter((_, i) => i !== index));
      toast.success(`${itemToDelete} deleted successfully!`); // Success toast for deleting food
    } else {
      const itemToDelete = nonVegItems[index];
      setNonVegItems(nonVegItems.filter((_, i) => i !== index));
      toast.success(`${itemToDelete} deleted successfully!`); // Success toast for deleting food
    }
  };

  return (
    <div className="border p-4 rounded-lg w-full">
      <details className="cursor-pointer">
        <summary className="font-light">Food</summary>
        <div className="mt-2">
          {[{ title: "Veg", items: vegItems, isVeg: true }, { title: "Non-Veg", items: nonVegItems, isVeg: false }].map(({ title, items, isVeg }) => (
            <div key={title}>
              <h3 className="font-medium mt-2">{title}</h3>
              {items.map((item, index) => (
                <div key={index} className="p-2 border rounded-md mb-2 flex justify-between">
                  <span>{item}</span>
                  <div className="flex space-x-2">
                    <button onClick={() => startEditing(index, isVeg)} className="text-blue-500">
                      <FaEdit />
                    </button>
                    <button onClick={() => deleteItem(index, isVeg)} className="text-red-500">
                      <FaTrash />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ))}
          {editingIndex === null ? (
            <div className="space-y-2">
              <div className="flex items-center border rounded-md p-2">
                <input
                  type="text"
                  value={newItem}
                  onChange={(e) => setNewItem(e.target.value)}
                  placeholder="Add food"
                  className="flex-grow outline-none"
                />
                <button onClick={addItem} className="ml-2 text-gray-600">
                  <FaPlus />
                </button>
              </div>
              <div className="flex items-center space-x-2">
                <label className="flex items-center">
                  <input
                    type="radio"
                    checked={isVeg}
                    onChange={() => setIsVeg(true)}
                    className="mr-1"
                  />
                  Veg
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    checked={!isVeg}
                    onChange={() => setIsVeg(false)}
                    className="mr-1"
                  />
                  Non-Veg
                </label>
              </div>
            </div>
          ) : (
            <div className="space-y-2">
              <div className="flex items-center border rounded-md p-2">
                <input
                  type="text"
                  value={editedItem}
                  onChange={(e) => setEditedItem(e.target.value)}
                  placeholder="Edit food"
                  className="flex-grow outline-none"
                />
                <button onClick={saveEditedItem} className="ml-2 text-green-600">
                  Save
                </button>
                <button onClick={cancelEditing} className="ml-2 text-gray-600">
                  Cancel
                </button>
              </div>
              <div className="flex items-center space-x-2">
                <label className="flex items-center">
                  <input
                    type="radio"
                    checked={editedIsVeg}
                    onChange={() => setEditedIsVeg(true)}
                    className="mr-1"
                  />
                  Veg
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    checked={!editedIsVeg}
                    onChange={() => setEditedIsVeg(false)}
                    className="mr-1"
                  />
                  Non-Veg
                </label>
              </div>
            </div>
          )}
        </div>
      </details>
      <Toaster /> {/* Toaster component to display toast notifications */}
    </div>
  );
};


{/* DateRangePicker */}

type DetailedDateRange = {
  pricePerDay: number;
  pricePerNight: number;
  extraPricePerBed: number;
  dayCruiser: boolean;
  nightStay: boolean;
};

type DateRangeProps = {
  dateRanges: Record<string, DetailedDateRange>;
  setDateRanges: React.Dispatch<React.SetStateAction<Record<string, DetailedDateRange>>>;
};

const DateRangeComponent: React.FC<DateRangeProps> = ({ dateRanges, setDateRanges }) => {
  const [newPricePerDay, setNewPricePerDay] = useState<number | null>(null);
  const [newPricePerNight, setNewPricePerNight] = useState<number | null>(null);
  const [newExtraPricePerBed, setNewExtraPricePerBed] = useState<number | null>(null);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  // Function to generate an array of dates between startDate and endDate
  const generateDateArray = (start: string, end: string) => {
    const startDateObj = new Date(start);
    const endDateObj = new Date(end);
    const dateArray: string[] = [];

    const currentDate = new Date(startDateObj);
    while (currentDate <= endDateObj) {
      dateArray.push(currentDate.toISOString().split("T")[0]); // Format as YYYY-MM-DD
      currentDate.setDate(currentDate.getDate() + 1);
    }

    return dateArray;
  };

  // Add a new date range
  const addDateRange = () => {
    if (
      startDate &&
      endDate &&
      newPricePerDay !== null && newPricePerDay >= 0 &&
      (newPricePerNight ?? 0) >= 0 && (newExtraPricePerBed ?? 0) >= 0
    ) {
      const dateArray = generateDateArray(startDate, endDate);

      const newRanges: Record<string, DetailedDateRange> = {};
      dateArray.forEach((date) => {
        newRanges[date] = {
          dayCruiser: true,
          nightStay: true,
          pricePerDay: newPricePerDay,
          pricePerNight: newPricePerNight ?? 0,
          extraPricePerBed: newExtraPricePerBed ?? 0,
        };
      });

      // Merge with existing dateRanges and sort by date
      const updatedRanges = Object.fromEntries(
        Object.entries({ ...dateRanges, ...newRanges }).sort(([a], [b]) => new Date(a).getTime() - new Date(b).getTime())
      );

      setDateRanges(updatedRanges);

      // Toast notification on successful addition
      toast.success("Date range added successfully!");

      // Reset form fields
      setStartDate("");
      setEndDate("");
      setNewPricePerDay(null);
      setNewPricePerNight(null);
      setNewExtraPricePerBed(null);
    } else {
      // Toast notification for invalid input
      toast.error("Please enter valid prices and date range.");
    }
  };

  // Function to delete a specific date range
  const deleteDateRange = (date: string) => {
    const updatedRanges = { ...dateRanges };
    delete updatedRanges[date];
    setDateRanges(updatedRanges);

    // Toast notification on successful deletion
    toast.success(`Date range for ${date} deleted!`);
  };

  return (
    <div className="border p-4 rounded-lg w-full">
      <Toaster /> {/* This renders the toast notifications */}

      <details className="cursor-pointer">
        <summary className="font-light">Date Pricing</summary>
        <div className="mt-2">
          {Object.entries(dateRanges).map(([date, range]) => (
            <div key={date} className="p-2 border rounded-md mb-2 flex justify-between">
              <div>
                <p><strong>Date:</strong> {date}</p>
                <p>Price per person Day: ₹{range.pricePerDay}</p>
                <p>Price per person Night: ₹{range.pricePerNight}</p>
                <p>Extra Price per Bed: ₹{range.extraPricePerBed}</p>
              </div>
              <div className="flex space-x-2">
                <button onClick={() => deleteDateRange(date)} className="text-red-500">
                  <FaTrash />
                </button>
              </div>
            </div>
          ))}

          <div className="space-y-4">
            <div className="flex space-x-4">
              <input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="p-2 border rounded w-full"
                placeholder="Select Start Date"
              />
              <input
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="p-2 border rounded w-full"
                placeholder="Select End Date"
              />
            </div>

            <div className="flex space-x-4">
              <input
                type="number"
                value={newPricePerDay ?? ""}
                onChange={(e) => setNewPricePerDay(Math.max(0, Number(e.target.value)))}
                placeholder="Price per Day"
                className="p-2 border rounded w-full"
              />
              <input
                type="number"
                value={newPricePerNight ?? ""}
                onChange={(e) => setNewPricePerNight(Math.max(0, Number(e.target.value)))}
                placeholder="Price per Night"
                className="p-2 border rounded w-full"
              />
              <input
                type="number"
                value={newExtraPricePerBed ?? ""}
                onChange={(e) => setNewExtraPricePerBed(Math.max(0, Number(e.target.value)))}
                placeholder="Extra Price per Bed"
                className="p-2 border rounded w-full"
              />
            </div>

            <button
              onClick={addDateRange}
              className="mt-4 bg-green-500 text-white py-2 px-4 rounded-full flex items-center space-x-2"
            >
              <span>Add</span>
              <FaPlus />
            </button>
          </div>
        </div>
      </details>
    </div>
  );
};


export default function BasicDetails() {
  interface ImageObject {
    url: string;
    name: string;
    alt: string;
  }

  interface UploadedImage {
    url: string;
  }

  interface DateRange {
    startDate: string;
    endDate: string;
    pricePerDay: number;
    pricePerNight: number;
    extraPricePerBed: number;
  }

  const router = useRouter();
  const { data: session } = useSession();
  const searchParams = new URLSearchParams(typeof window !== 'undefined' ? window.location.search : '');
  const isEditing = searchParams.get('editing') === 'true';
  const boatId = searchParams.get('boatId');

  const [amenities, setAmenities] = useState<string[]>([]);
  const [vegItems, setVegItems] = useState<string[]>([]);
  const [nonVegItems, setNonVegItems] = useState<string[]>([]);
  const [dateRanges, setDateRanges] = useState<Record<string, DetailedDateRange>>({});
  const [image, setImage] = useState<ImageObject[]>([]);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    location: "",
    beds: 1,
    maxPeople: 2,
    price: "",
  });

  // Define locations state
  const [locations, setLocations] = useState<Set<string>>(new Set());
  
  // Load locations from localStorage on component mount
  useEffect(() => {
    const savedLocations = JSON.parse(localStorage.getItem("locations") || "[]");
    setLocations(new Set(savedLocations));
  }, []);

  // Save locations to localStorage whenever the list changes
  useEffect(() => {
    localStorage.setItem("locations", JSON.stringify(Array.from(locations)));
  }, [locations]);

  // Load existing houseboat data when editing
  useEffect(() => {
    const loadHouseboatData = async () => {
      if (isEditing && boatId) {
        try {
          const response = await fetch(`/api/houseboat/${boatId}`);
          if (!response.ok) {
            throw new Error('Failed to fetch houseboat data');
          }
          
          const data = await response.json();
          if (data.error) {
            throw new Error(data.error);
          }

          setFormData({
            name: data.name || "",
            description: data.description || "",
            location: data.location || "",
            beds: data.beds || 1,
            maxPeople: data.maxPeople || 2,
            price: (data.price || "").toString(),
          });
          
          setAmenities(data.amenities || []);
          setVegItems(data.food?.veg || []);
          setNonVegItems(data.food?.nonVeg || []);
          setDateRanges(data.dates || {});
          
          // Convert image URLs to ImageObject array
          const imageObjects = (data.images || []).map((url: string) => ({
            url,
            name: data.name || "Houseboat",
            alt: `Image of ${data.name || "houseboat"}`
          }));
          setImage(imageObjects);
          
        } catch (error) {
          console.error("Error loading houseboat:", error);
          toast.error(error instanceof Error ? error.message : "Error loading houseboat data");
        }
      }
    };

    loadHouseboatData();
  }, [isEditing, boatId]);

  // Form validation function
  const validateForm = () => {
    if (!formData.name.trim()) {
      toast.error("Houseboat name is required!");
      return false;
    }
    if (!formData.description.trim()) {
      toast.error("Description is required!");
      return false;
    }
    if (!formData.location.trim()) {
      toast.error("Location is required!");
      return false;
    }
    if (!formData.maxPeople) {
      toast.error("Maximum capacity is required!");
      return false;
    }
    if (!formData.price.trim()) {
      toast.error("Base price is required!");
      return false;
    }
    if (image.length === 0) {
      toast.error("At least one image is required!");
      return false;
    }
    return true;
  };

  // Handle form submission
  const handleSubmit = () => {
    if (!validateForm()) return;

    const food = {
      veg: vegItems,
      nonVeg: nonVegItems,
    };

    const endpoint = isEditing ? "/api/houseboat/owner/update" : "/api/houseboat/owner/add";
    const payload = {
      userId: session?.user.id,
      ...(isEditing && { boatId }),
      ...formData,
      amenities,
      food,
      dateRanges,
      images: image.map((img) => img.url),
    };

    try {
      fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error(isEditing ? "Failed to update houseboat" : "Failed to add houseboat");
          }
          return response.json();
        })
        .then((data) => {
          // Add the location to the locations set
          setLocations((prevLocations) => {
            const newLocations = new Set(prevLocations);
            newLocations.add(formData.location);
            return newLocations;
          });

          toast.success(isEditing ? "Houseboat updated successfully!" : "Houseboat added successfully!");
          router.push("/dashboard/owner/houseboats");
        })
        .catch((error) => {
          console.error(isEditing ? "Error updating houseboat:" : "Error adding houseboat:", error);
          toast.error(isEditing ? "Failed to update houseboat!" : "Failed to add houseboat!");
        });
    } catch (error) {
      console.error("Error:", error);
      toast.error("An unexpected error occurred!");
    }
  };
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageUpdate = (images: UploadedImage[]) => {
    setImage(images.map(img => ({
      url: img.url,
      name: formData.name || "Houseboat",
      alt: `Image of ${formData.name || "houseboat"}`
    })));
  };

  return (
    <div className="flex">
      <Toaster /> {/* Add Toaster component for notifications */}
      <section className="bg-white mx-3 shadow-lg rounded-lg p-6 lg:flex flex-col w-1/2">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">{isEditing ? 'Edit' : 'Add'} Image</h1>
        <div className="flex items-center space-x-4">
          <ImageUpload image={image} setImage={handleImageUpdate} />
        </div>
      </section>

      <div className="max-w-3xl w-full bg-white shadow-lg rounded-lg p-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">{isEditing ? 'Edit' : 'Add'} Basic Details</h2>
        <div className="space-y-4">
          <input
            type="text"
            name="name"
            value={formData.name}
            placeholder="Houseboat Name"
            className="w-full p-3 border rounded"
            onChange={handleChange}
          />

          <textarea
            name="description"
            value={formData.description}
            placeholder="Description"
            className="w-full p-3 border rounded"
            onChange={handleChange}
          ></textarea>
          <input
            type="text"
            name="location"
            value={formData.location}
            placeholder="Location"
            className="w-full p-3 border rounded"
            onChange={handleChange}
          />

          <input
            type="number"
            id="capacity"
            min="0"
            value={formData.maxPeople}
            onInput={(e) => {
              const input = e.target as HTMLInputElement;
              if (Number(input.value) < 0) {
                input.value = "0";
              }
            }}
            name="maxPeople"
            placeholder="Total Capacity"
            className="w-full p-3 border rounded"
            onChange={handleChange}
          />

          <input
            type="number"
            id="numberInput"
            min="0"
            value={formData.beds}
            onInput={(e) => {
              const input = e.target as HTMLInputElement;
              if (Number(input.value) < 0) {
                input.value = "0";
              }
            }}
            name="beds"
            placeholder="No of beds"
            className="w-full p-3 border rounded"
            onChange={handleChange}
          />

          <input
            type="number"
            id="numberInput"
            min="0"
            value={formData.price}
            onInput={(e) => {
              const input = e.target as HTMLInputElement;
              if (Number(input.value) < 0) {
                input.value = "0";
              }
            }}
            name="price"
            placeholder="Base Price"
            className="w-full p-3 border rounded"
            onChange={handleChange}
          />

          {/* Amenities Selector Component */}
          <AmenitiesSelector amenities={amenities} setAmenities={setAmenities} />

          <FoodSelector
            vegItems={vegItems}
            setVegItems={setVegItems}
            nonVegItems={nonVegItems}
            setNonVegItems={setNonVegItems}
          />

          <DateRangeComponent dateRanges={dateRanges} setDateRanges={setDateRanges} />
        </div>

        <button
          onClick={() => handleSubmit()}
          className="mt-4 bg-primary text-white p-3 rounded w-full"
        >
          {isEditing ? 'Update' : 'Submit'}
        </button>
      </div>
    </div>
  );
}