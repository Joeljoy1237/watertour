
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
            A Luxuary Houseboat in Alleppey offers a peaceful escape into the scenic backwaters of Kerala. Ideal for couples and small families, this houseboat provides a relaxing stay with comfortable amenities and beautiful surroundings.
            <br />
            With two upper decks, the front deck is perfect for sitting and sightseeing, while the back deck offers a great space for sunbathing. These open areas allow uninterrupted views of the calm waters and lush greenery, creating a serene experience.
            <br />
            The houseboat features a well-furnished bedroom, a private bathroom with a bathtub, and a dining area with a TV. A music system adds to the ambiance and air conditioning is available.
            <br />
            Safety and convenience are prioritized, making this houseboat a great choice for a romantic getaway or a peaceful retreat. Freshly prepared Kerala cuisine enhances the experience, allowing guests to enjoy traditional flavors while gliding through the backwaters.
            <br /><br />
            Book a stay today and enjoy the beauty of Alleppey's waterways for an unforgettable journey.
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
          {/* Tour Package House Rules */}
          <div className="bg-white p-6 rounded-md shadow-md">
    <h2 className="text-2xl font-semibold text-primary-600">
       Tour Package House Rules
    </h2>
          <ul className="text-gray-700 mt-2 ml-5 list-disc">
            <li>Check in Time: 12 noon and Checkout 09.00 AM next day.</li>
            <li>Houseboats are for exclusive usage and not shared.</li>
            <li>Houseboats are accompanied by navigator and cook.</li>
            <li>Meal plan - Starts with Lunch and ends with Breakfast (Typical Kerala Cuisine, if you require any other cuisine inform 
              us at least 5 days in advance)</li>
            <li>The Houseboat will anchor by 5:30 PM for the night stay and will retain the cruise the very next morning at 08:00 AM. 
            There is no cruising in the lake allowed in the evening hours or late night.</li>
            <li>You can use A/C anytime required in PREMIUM / LUXURY Houseboats.</li>
            <li>Swimming in the backwater is strictly prohibited.</li>
            <li>Do not cause noise disturbance to the villagers during night halt.</li>
            <li>The Food and beverage service on the houseboat is only up to 10:30 PM.</li>
            <li>Guests are not permitted to remain or sleep outside the rooms after 10:30 PM.</li>
            <li>Boat will be halted for one hour during lunch break.</li>
            <li>The distance we cover is about 20-30 kms and the place of the night halt will be decided by the captain according to 
            the weather and climate</li>
          </ul> 
</div>
          {/* Comment Section */}
          <CommentSection />
        </div>
      </main>
    </div>
  );
};

export default HouseboatDetails;
