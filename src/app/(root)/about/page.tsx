"use client";
import React from "react";
import Image from "next/image";

const AboutUsPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-100 py-20">
      {/* Section 1: Company Overview */}
      <div className="container mx-auto px-6 md:px-12 text-center">
        <h1 className="text-5xl font-semibold mb-6 text-[#5EBC67]">About Us</h1>
        <p className="text-xl text-gray-700 mb-10 md:mb-16 max-w-3xl mx-auto">
          We are a passionate team committed to delivering exceptional
          water-based tourism experiences. From scenic boat rides to thrilling
          water sports, we provide a variety of experiences tailored to meet
          every traveler&#39;s needs.
        </p>
      </div>

      {/* Section 2: Team/Company Image */}
      <div className="flex justify-center mb-16 md:mb-24">
        <div className="relative w-full max-w-2xl h-80 md:h-96 rounded-xl overflow-hidden shadow-2xl">
          <Image
            src="/path/to/your/team-image.jpg" // Update with your actual image path
            alt="Our Team"
            layout="fill"
            objectFit="cover"
            className="rounded-xl"
          />
        </div>
      </div>

      {/* Section 3: Our Values */}
      <div className="container mx-auto px-6 md:px-12 text-center mb-20">
        <h2 className="text-4xl font-semibold mb-6 text-[#5EBC67]">
          Our Values
        </h2>
        <p className="text-lg text-gray-700 mb-10 max-w-2xl mx-auto">
          Our company thrives on delivering personalized and unforgettable
          experiences to our customers. Our core values include:
        </p>
        <ul className="space-y-4 text-lg text-gray-600 max-w-3xl mx-auto">
          <li>1. Excellence in customer service</li>
          <li>2. Commitment to sustainability</li>
          <li>3. Passion for adventure and discovery</li>
          <li>4. Creating lasting memories for every traveler</li>
        </ul>
      </div>

      {/* Section 4: Mission Statement */}
      <div className="container mx-auto px-6 md:px-12 text-center mb-20">
        <h2 className="text-4xl font-semibold mb-6 text-[#5EBC67]">
          Our Mission
        </h2>
        <p className="text-lg text-gray-700 max-w-3xl mx-auto">
          To connect people with the wonders of the water world and provide
          unforgettable experiences, while prioritizing safety, sustainability,
          and customer satisfaction.
        </p>
      </div>

      {/* Section 5: Contact Us CTA */}
      <div className="container mx-auto px-6 md:px-12 text-center mb-20">
        <p className="text-lg text-gray-700 mb-6 max-w-2xl mx-auto">
          Ready to explore water tourism like never before? Let us help you plan
          your next adventure.
        </p>
        <a
          href="/contact"
          className="bg-[#5EBC67] text-white py-4 px-10 rounded-full shadow-md hover:bg-[#4A9453] transition-all duration-300 transform hover:scale-105"
        >
          Get in Touch
        </a>
      </div>
    </div>
  );
};

export default AboutUsPage;
