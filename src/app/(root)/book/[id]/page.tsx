"use client";
import HouseboatCarousel from "@/components/HouseboatCarousel";
import CommentSection from "@/components/CommentSection";

import BookOption from "@/components/BookOption";
import FoodMenu from "@/components/FoodMenu";

const HouseboatDetails: React.FC = () => {

  const sampleAvailability: Record<
  string,
  { dayCruiser: boolean; nightStay: boolean }
> = {
  "2025-03-12": { dayCruiser: true, nightStay: false },
  "2025-03-13": { dayCruiser: false, nightStay: true },
};

  const pricePerGuestDay = 1500;
  const pricePerGuestNight = 2000;
  const pricePerBedNight = 500;

{/* Food Menu func */}
const vegItems = [
  {
    id: 1,
    name: 'Vegetable Stir Fry',
    description: 'Fresh vegetables sautéed in a light sauce',
    price: 12.99,
  },
  {
    id: 2,
    name: 'Mushroom Risotto',
    description: 'Creamy arborio rice with wild mushrooms',
    price: 14.99,
  },
];

const nonVegItems = [
  {
    id: 3,
    name: 'Grilled Salmon',
    description: 'Fresh salmon with lemon butter sauce',
    price: 18.99,
  },
  {
    id: 4,
    name: 'Chicken Parmesan',
    description: 'Breaded chicken topped with marinara and cheese',
    price: 16.99,
  },
];



  const amenities = [
    "Air Conditioning",
    "Dining Area",
    "WiFi",
    "Fishing Gear",
    "Safety Equipment",
    "Sun Deck",
  ];

  const maxCapacity = 20;
  const minCapacity = 2;
  const totalBeds = 5;
  const ExtraPersonCost = 500;


  return (
    <div className="min-h-screen bg-gray-100">
      <section className="relative w-full">
        <HouseboatCarousel />
      </section>

      <main className="max-w-7xl mx-auto p-6 flex flex-col-reverse md:flex-row-reverse gap-8 mt-6">
        {/* Booking Section */}
        <BookOption sampleAvailability={sampleAvailability} maxCapacity={maxCapacity} totalBeds={totalBeds} pricePerGuestDay={pricePerGuestDay} pricePerGuestNight={pricePerGuestNight} pricePerBedNight={ pricePerBedNight} />

        {/* Houseboat Info Section */}
        <div className="md:w-2/3 space-y-6">
          <div className="bg-white p-6 rounded-md shadow-md">
            <h2 className="text-2xl font-semibold text-primary-600">
              Luxury Houseboat Stay
            </h2>
            <p className="text-gray-700 mt-2">
              Enjoy a peaceful stay with scenic views, luxurious interiors, and
              top-tier service.
            </p>
          </div>

          {/* Amenities & Facilities */}
          <div className="bg-white p-6 rounded-md shadow-md">
            <h3 className="text-xl font-semibold text-primary-600">
              Amenities & Facilities
            </h3>
            <ul className="grid grid-cols-2 gap-2 mt-2 text-gray-700">
              {amenities.map((amenity, index) => (
                <li key={index} className="flex items-center gap-2">
                  ✅ {amenity}
                </li>
              ))}
            </ul>
          </div>
          
          {/* Occupancy */}
          <div className="bg-white p-6 rounded-md shadow-md">
            <h3 className="text-xl font-semibold text-primary-600">
            Occupancy</h3>
            <p className="text-gray-600 mt-4">
              <strong>Minimum occupancy:</strong> {minCapacity} Persons
            </p>
            <p className="text-gray-600 ">
              <strong>Maximum occupancy:</strong> {maxCapacity} Persons
            </p>
            <p className="text-gray-600">
              <strong>Extra Person cost:</strong> ₹{ExtraPersonCost} 
            </p>
          </div>
          {/* Food Menu */}
          <div className="bg-white p-6 rounded-md shadow-md">
            <FoodMenu vegItems={vegItems} nonVegItems={nonVegItems} />

           
          </div>   
          {/* Comment Section */}
          <CommentSection />
        </div>
      </main>
    </div>
  );
};

export default HouseboatDetails;
