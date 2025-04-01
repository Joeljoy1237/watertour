import React, { useEffect, useState } from "react";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar, faStarHalfAlt, faStar as faEmptyStar } from "@fortawesome/free-solid-svg-icons";
import Button from "@/components/Button";
import Link from "next/link";

interface CardProps {
  id: string;
  title: string;
  price: number;
  rating: number;
  imageUrl: string;
}

const Card: React.FC<CardProps> = ({ id, title, price, rating, imageUrl }) => {
  const renderStars = (rating: number) => {
    const totalStars = 5;
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating - fullStars >= 0.5;

    return Array.from({ length: totalStars }, (_, index) => {
      if (index < fullStars) {
        return <FontAwesomeIcon key={index} icon={faStar} className="text-yellow-400 w-5 h-5" />;
      } else if (index === fullStars && hasHalfStar) {
        return <FontAwesomeIcon key={index} icon={faStarHalfAlt} className="text-yellow-400 w-5 h-5" />;
      } else {
        return <FontAwesomeIcon key={index} icon={faEmptyStar} className="text-gray-300 w-5 h-5" />;
      }
    });
  };

  return (
    <Link href={`/boat/${id}`}>
    <div className="bg-white rounded-xl w-auto shadow-lg overflow-hidden transform hover:scale-105 transition duration-300">
      <div className="relative w-full h-48 md:h-56">
        <Image src={imageUrl || "/boat.jpg"} alt={title} fill={true} className="object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent"></div>
      </div>
      <div className="p-5">
        <h3 className="text-black text-lg font-bold mb-2 truncate">{title}</h3>
        <div className="flex items-center mb-4">{renderStars(rating)}</div>
        <div className="flex items-center justify-between">
          <span className="text-black text-xl font-semibold">₹{price.toLocaleString("en-IN")}</span>
          
            <Button title="Book Now" />
          
        </div>
      </div>
    </div>
    </Link>
  );
};

interface Houseboat {
  images: string[];
  price: number;
  _id: string;
  title: string;
  name: string;
  rating: number;
}

const SkeletonCard: React.FC = () => (
  <div className="bg-gray-200 animate-pulse rounded-xl w-auto h-80 shadow-lg overflow-hidden">
    <div className="w-full h-48 bg-gray-300"></div>
    <div className="p-5">
      <div className="h-6 bg-gray-300 rounded w-3/4 mb-2"></div>
      <div className="h-4 bg-gray-300 rounded w-1/2 mb-4"></div>
      <div className="h-8 bg-gray-300 rounded w-full"></div>
    </div>
  </div>
);

const CardList: React.FC = () => {
  const [houseboats, setHouseboats] = useState<Houseboat[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchHouseboats = async () => {
      try {
        const response = await fetch("/api/houseboat/fetch", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({}),
        });
        if (!response.ok) {
          throw new Error("Failed to fetch houseboats");
        }
        const data = await response.json();
        setHouseboats(data);
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    };
    fetchHouseboats();
  }, []);

  if (loading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 p-5">
        {[...Array(3)].map((_, index) => (
          <SkeletonCard key={index} />
        ))}
      </div>
    );
  }

  if (error) return <p className="text-center text-red-500">Error: {error}</p>;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 p-5">
      {houseboats.map((boat) => (
        <Card key={boat._id} id={boat._id} title={boat.name} price={boat.price} imageUrl={boat.images[0]} rating={boat.rating} />
      ))}
    </div>
  );
};

export default CardList;

export { Card };
