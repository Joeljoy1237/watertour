"use client";
import { useState } from "react";
import { useSession } from "next-auth/react";
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
    }
  };

  const cancelEditing = () => {
    setEditingIndex(null);
    setEditedItem("");
    setEditedIsVeg(true);
  };

  const deleteItem = (index: number, isVegItem: boolean) => {
    if (isVegItem) {
      setVegItems(vegItems.filter((_, i) => i !== index));
    } else {
      setNonVegItems(nonVegItems.filter((_, i) => i !== index));
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
    </div>
  );
};

{/*drinks */}
const DrinksSelector: React.FC<{ drinks: string[]; setDrinks: React.Dispatch<React.SetStateAction<string[]>> }> = ({ drinks, setDrinks }) => {

  const [newItem, setNewItem] = useState("");
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [editedItem, setEditedItem] = useState("");

  const addItem = () => {
    if (newItem.trim() && !drinks.includes(newItem)) {
      setDrinks([...drinks, newItem]);
      setNewItem("");
    }
  };

  const startEditing = (index: number) => {
    setEditingIndex(index);
    setEditedItem(drinks[index]);
  };

  const cancelEditing = () => {
    setEditingIndex(null);
    setEditedItem("");
  };

  const saveEditedItem = () => {
    if (editedItem.trim()) {
      const updatedItems = [...drinks];
      updatedItems[editingIndex!] = editedItem;
      setDrinks(updatedItems);
      cancelEditing();
    }
  };

  const deleteItem = (index: number) => {
    const updatedItems = drinks.filter((_, i) => i !== index);
    setDrinks(updatedItems);
  };

  return (
    <div className="border p-4 rounded-lg w-full">
    <details className="cursor-pointer">
      <summary className="font-light">Drinks</summary>
      <div className="mt-2">
        {drinks.map((drink, index) => (
          <div key={index} className="p-2 border rounded-md mb-2 flex justify-between">
            <span>{drink}</span>
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
              placeholder="Add drinks"
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

      // Reset form fields
      setStartDate("");
      setEndDate("");
      setNewPricePerDay(0);
      setNewPricePerNight(0);
      setNewExtraPricePerBed(0);
    } else {
      alert("Please enter valid prices and date range.");
    }
  };

  return (
    <div>
      <div className="border p-4 rounded-lg">
        <h2 className="text-l font-bold mb-4">Date Pricing</h2>
        <div>
          {Object.entries(dateRanges).map(([date, range]) => (
            <div key={date} className="p-4 border rounded-md mb-4 flex justify-between">
              <div>
                <p>
                  <strong>Date:</strong> {date}
                </p>
                <p>Price per person Day: ₹{range.pricePerDay}</p>
                <p>Price per person Night: ₹{range.pricePerNight}</p>
                <p>Extra Price per Bed: ₹{range.extraPricePerBed}</p>
              </div>
            </div>
          ))}

          <div className="space-y-4">
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
            <button
              onClick={addDateRange}
              className="mt-4 bg-green-500 text-white py-2 px-4 rounded-full flex items-center space-x-2"
            >
              <span>Add</span>
              <FaPlus />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};


export default function BasicDetails() {

  interface ImageObject {
    url: string;
    name: string;
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

  const [amenities, setAmenities] = useState<string[]>([]);
  const [vegItems, setVegItems] = useState<string[]>([]);
  const [nonVegItems, setNonVegItems] = useState<string[]>([]);
  const [drinks, setDrinks] = useState<string[]>([]);
  // const [programs, setPrograms] = useState<string[]>([]);    
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

  const handleSubmit = () => {

    const food = {
  veg:vegItems,nonVeg:nonVegItems
    }
    try {
      fetch("/api/houseboat/owner/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId:session?.user.id,
          ...formData,
          amenities,
          food,
          drinks,
          dateRanges,
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
            id="capacity"
            min="0"
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
            onInput={(e) => {
              const input = e.target as HTMLInputElement;
              if (Number(input.value) < 0) {
                input.value = "0";
              }
            }}
            name="price"
            placeholder="Day base Price"
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
            placeholder="Night base Price"
            className="w-full p-3 border rounded"
            onChange={handleChange}
          />
          {/* <input
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
            placeholder="Extra Person Price"
            className="w-full p-3 border rounded"
            onChange={handleChange}
          /> */}

          {/* Amenities Selector Component */}
          <AmenitiesSelector amenities={amenities} setAmenities={setAmenities} />

          <FoodSelector vegItems={vegItems} setVegItems={setVegItems} nonVegItems={nonVegItems} setNonVegItems={setNonVegItems} />
          {/* <FoodSelector items={items} setItems={setItems} /> */}
          {/*  Drinks Selector Component */}
          <DrinksSelector drinks={drinks} setDrinks={setDrinks} />
            {/* Special Program Selector Component */}
          {/* <SpecialPrograms programs={programs} setPrograms={setPrograms} /> */}

        {/* Date Range Picker Component */}
            
        <DateRangeComponent dateRanges={dateRanges} setDateRanges={setDateRanges} />
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
