"use client";
import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";



interface ImageType {
  src: string;
  alt: string;
}

export default function HouseboatCarousel({ images }: { images: ImageType[] }) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const totalSlides = images.length;
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  // Auto-slide function
  const startAutoSlide = () => {
    stopAutoSlide(); // Reset timer
    intervalRef.current = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % totalSlides);
    }, 5000);
  };

  // Stop auto-slide
  const stopAutoSlide = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
  };

  // Start auto-slide on mount
  useEffect(() => {
    startAutoSlide();
    return () => stopAutoSlide();
  }, []);

  // Manually change slide & reset timer
  const goToSlide = (index: number) => {
    stopAutoSlide();
    setCurrentSlide(index < 0 ? totalSlides - 1 : index % totalSlides);
    startAutoSlide();
  };

  return (
    <div className="relative w-full h-[500px] md:h-[600px] overflow-hidden">
      {/* Image Wrapper - Sliding Animation */}
      <div
        className="flex transition-transform duration-1000 ease-in-out"
        style={{ transform: `translateX(-${currentSlide * 100}%)` }}
      >
        {images.map((img, index) => (
          <div
            key={index}
            className="min-w-full relative h-[500px] md:h-[600px]"
          >
            <Image src={img.src} alt={img.alt} fill className="object-cover" />
          </div>
        ))}
      </div>

      {/* Navigation Dots */}
      <div className="absolute bottom-5 left-1/2 transform -translate-x-1/2 flex space-x-3">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-4 h-4 rounded-full transition ${
              index === currentSlide ? "bg-white scale-110" : "bg-gray-300"
            }`}
          />
        ))}
      </div>

      {/* Prev & Next Buttons */}
      <button
        onClick={() => goToSlide(currentSlide - 1)}
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 text-white p-3 rounded-full hover:bg-black transition"
      >
        ❮
      </button>
      <button
        onClick={() => goToSlide(currentSlide + 1)}
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 text-white p-3 rounded-full hover:bg-black transition"
      >
        ❯
      </button>
    </div>
  );
}
