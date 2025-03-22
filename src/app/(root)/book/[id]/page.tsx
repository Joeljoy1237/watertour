
import HouseboatCarousel from "@/components/HouseboatCarousel";
import CommentSection from "@/components/CommentSection";

import BookOption from "@/components/BookOption";

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



  const amenities = [
    "Air Conditioning",
    "Dining Area",
    "WiFi",
    "Fishing Gear",
    "Safety Equipment",
    "Sun Deck",
  ];

  const maxCapacity = 10;
  const totalBeds = 5;


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
            <p className="text-gray-600 mt-4">
              <strong>Maximum Capacity:</strong> {maxCapacity} guests
            </p>
            <p className="text-gray-600">
              <strong>Total Beds:</strong> {totalBeds}
            </p>
          </div>

          {/* Comment Section */}
          <CommentSection />
        </div>
      </main>
    </div>
  );
};

export default HouseboatDetails;
