"use client";
import React, { useState } from "react";
import Image from "next/image";

const ContactUsForm: React.FC = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form Data Submitted:", formData);
    // You can send the form data to an API or handle the form submission as needed.
  };

  return (
    <div className="relative min-h-screen">
      {/* Full Background Image */}
      <div className="absolute top-0 left-0 w-full h-full">
        <Image
          src="/boat.jpg"
          alt="Boat Background"
          layout="fill"
          objectFit="cover"
          className=""
        />
      </div>

      {/* Right Side with Form */}
      <div className="relative flex items-center justify-center min-h-screen p-8">
        <div className="shadow-xl p-8 bg-white rounded-2xl w-full max-w-lg">
          <h2 className="text-3xl font-semibold text-center mb-8 text-[#5EBC67]">
            Contact Us
          </h2>
          <form onSubmit={handleSubmit} className="w-full">
            {/* Name Field */}
            <div className="mb-6">
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-600 mb-2"
              >
                Your Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter your name"
                className="w-full px-4 py-2 border-b border-gray-300 focus:outline-none focus:border-[#5EBC67] text-gray-600 placeholder-gray-400 transition-all duration-300 ease-in-out transform hover:scale-105 rounded-lg"
              />
            </div>

            {/* Email Field */}
            <div className="mb-6">
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-600 mb-2"
              >
                Your Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email"
                className="w-full px-4 py-2 border-b border-gray-300 focus:outline-none focus:border-[#5EBC67] text-gray-600 placeholder-gray-400 transition-all duration-300 ease-in-out transform hover:scale-105 rounded-lg"
              />
            </div>

            {/* Message Field */}
            <div className="mb-6">
              <label
                htmlFor="message"
                className="block text-sm font-medium text-gray-600 mb-2"
              >
                Your Message
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Enter your message"
                rows={4}
                className="w-full px-4 py-2 border-b border-gray-300 focus:outline-none focus:border-[#5EBC67] text-gray-600 placeholder-gray-400 transition-all duration-300 ease-in-out transform hover:scale-105 rounded-lg"
              ></textarea>
            </div>

            {/* Submit Button */}
            <div className="text-center">
              <button
                type="submit"
                className="bg-[#5EBC67] text-white px-8 py-3 rounded-full hover:bg-[#4A9453] transition-all duration-300 transform hover:scale-105 focus:outline-none"
              >
                Send Message
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ContactUsForm;
