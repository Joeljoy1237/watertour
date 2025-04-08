"use client";
import React, { useState } from "react";
import Image from "next/image";
import toast, { Toaster } from "react-hot-toast";

const ContactUsForm: React.FC = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Basic validation
    if (!formData.name || !formData.email || !formData.message) {
      toast.error("Please fill in all fields.");
      return;
    }

    try {
      setIsSubmitting(true);
      const response = await fetch("/api/contactus", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        toast.success("Failed to submit the form.");
        throw new Error(errorData.message || "Failed to submit the form.");
      }

      toast.success("Message sent successfully!");
      setFormData({ name: "", email: "", message: "" });
    } catch (err: unknown) {
      if (err instanceof Error) {
        toast.error(err.message || "Something went wrong.");
      } else {
        toast.error("Something went wrong.");
      }
      console.error("Submission error:", err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="relative min-h-screen">
      {/* Full Background Image */}
      <div className="absolute top-0 left-0 w-full h-full">
        <Image src="/boat.jpg" alt="Boat Background" fill className="" />
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
                disabled={isSubmitting}
                className={`${
                  isSubmitting
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-primary hover:bg-primary-700"
                } text-white px-8 py-3 rounded-full transition-all duration-200 transform hover:scale-105 focus:outline-none`}
              >
                {isSubmitting ? "Sending..." : "Send Message"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ContactUsForm;
