"use client";
import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar as solidStar } from "@fortawesome/free-solid-svg-icons";
import { faStar as regularStar } from "@fortawesome/free-regular-svg-icons";

interface Comment {
  id: number;
  name: string;
  text: string;
  rating: number;
  date: string;
  location?: string; // Optional location for display in review card
}

/* 
  The ReviewCard component renders an individual comment in a modern card design.
  It truncates the review text to a specified length and shows a "Read more" or "Show less"
  button if the text is long.
*/
const ReviewCard: React.FC<Comment> = ({
  name,
  location,
  rating,
  text,
  date,
}) => {
  const [expanded, setExpanded] = useState(false);
  const maxLength = 150;
  const shouldTruncate = text.length > maxLength;
  const displayedText =
    !expanded && shouldTruncate ? text.slice(0, maxLength) + "..." : text;

  return (
    <div className="bg-white p-6 shadow-lg rounded-lg">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-xl font-bold text-gray-800">{name}</h3>
          {location && <p className="text-sm text-gray-500">{location}</p>}
        </div>
        <div className="flex items-center">
          {[1, 2, 3, 4, 5].map((star) => (
            <FontAwesomeIcon
              key={star}
              icon={star <= rating ? solidStar : regularStar}
              className="text-[#2ca01c] text-lg mr-1"
            />
          ))}
        </div>
      </div>
      <div className="mt-4 text-gray-700">
        <p>{displayedText}</p>
        {shouldTruncate && (
          <button
            onClick={() => setExpanded(!expanded)}
            className="text-[#2ca01c] text-sm mt-2 focus:outline-none"
          >
            {expanded ? "Show less" : "Read more"}
          </button>
        )}
      </div>
      <p className="mt-2 text-sm text-gray-500">{date}</p>
    </div>
  );
};

const CommentSection: React.FC = () => {
  const [comment, setComment] = useState("");
  const [rating, setRating] = useState(0);

  // Dummy comments stored in the state.
  const [comments, setComments] = useState<Comment[]>([
    {
      id: 1,
      name: "Jane Doe",
      text: "Amazing experience! Loved every moment on the houseboat. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      rating: 5,
      date: "2023-09-12",
      location: "New York, USA",
    },
    {
      id: 2,
      name: "John Doe",
      text: "A unique getaway experience. The food was okay, but the views stole the show! Aenean commodo ligula eget dolor. Aenean massa.",
      rating: 4,
      date: "2023-08-28",
      location: "Los Angeles, USA",
    },
  ]);

  const handleSubmit = () => {
    if (!comment || rating === 0) {
      alert("Please provide both a comment and a rating.");
      return;
    }
    // Create a new comment object
    const newComment: Comment = {
      id: comments.length + 1,
      name: "Anonymous",
      text: comment,
      rating: rating,
      date: new Date().toISOString().split("T")[0],
      location: "Unknown",
    };

    // Add the new comment at the top of the list
    setComments([newComment, ...comments]);
    alert("Comment submitted!");
    setComment(""); // Clear the textarea
    setRating(0); // Reset the rating
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-6 mt-8">
      <h2 className="text-2xl font-bold text-[#2ca01c] mb-4">
        Leave a Comment
      </h2>

      {/* Star Rating Section */}
      <div className="flex items-center mb-4">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            type="button"
            onClick={() => setRating(star)}
            className="mr-2 focus:outline-none"
          >
            <FontAwesomeIcon
              icon={star <= rating ? solidStar : regularStar}
              className="text-[#2ca01c] text-xl"
            />
          </button>
        ))}
        <span className="ml-2 text-gray-600">{rating} / 5</span>
      </div>

      {/* Comment Input */}
      <textarea
        placeholder="Share your experience..."
        rows={5}
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-[#2ca01c] focus:border-transparent transition duration-200 mb-4"
      ></textarea>
      <button
        onClick={handleSubmit}
        className="w-full bg-[#2ca01c] hover:bg-green-700 text-white font-semibold py-3 rounded-lg transition duration-200"
      >
        Submit Comment
      </button>

      {/* Dummy Comments Display */}
      <div className="mt-8">
        <h3 className="text-xl font-semibold text-gray-800 mb-4">
          Recent Comments
        </h3>
        <div className="space-y-4">
          {comments.map((c) => (
            <ReviewCard
              key={c.id}
              id={c.id}
              name={c.name}
              text={c.text}
              rating={c.rating}
              date={c.date}
              location={c.location}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default CommentSection;
