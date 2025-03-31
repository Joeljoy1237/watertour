"use client";
import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar as solidStar } from "@fortawesome/free-solid-svg-icons";
import { faStar as regularStar } from "@fortawesome/free-regular-svg-icons";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

interface Comment {
  _id: string;
  boatId: string;
  name: string;
  comment: string;
  rating: number;
  createdAt: string;
}

const ReviewCard: React.FC<Comment> = ({ name, rating, comment, createdAt }) => {
  return (
    <div className="bg-white p-6 shadow-lg rounded-lg">
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-bold text-gray-800">{name}</h3>
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
      <p className="mt-4 text-gray-700">{comment}</p>
      <p className="mt-2 text-sm text-gray-500">{new Date(createdAt).toLocaleDateString()}</p>
    </div>
  );
};

interface CommentSectionProps {
  boatId: string;
}

const CommentSection: React.FC<CommentSectionProps> = ({ boatId }) => {
  const { data: session, status } = useSession();
  const [comment, setComment] = useState("");
  const [rating, setRating] = useState(0);
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const res = await fetch("/api/comments/fetch", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ boatId }),
        });
        const data = await res.json();
        setComments(data);
      } catch (error) {
        console.error("Failed to load comments");
      } finally {
        setLoading(false);
      }
    };

    fetchComments();
  }, [boatId]);

  const handleSubmit = async () => {
    if (!comment || rating === 0) {
      alert("Please provide both a comment and a rating.");
      return;
    }
    if (!session) {
      alert("You must be logged in to submit a comment.");
      return;
    }

    try {
      const res = await fetch("/api/comments/new", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ boatId, comment, rating, name: session.user?.name }),
      });

      if (!res.ok) throw new Error("Failed to submit comment");

      const newComment = await res.json();
      setComments([newComment, ...comments]);
      setComment("");
      setRating(0);
    } catch (error) {
      console.error(error);
      alert("Failed to submit comment");
    }
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-6 mt-8">
      <h2 className="text-2xl font-bold text-[#2ca01c] mb-4">Leave a Comment</h2>

      {status === "loading" ? (
        <Skeleton height={40} width={200} />
      ) : session ? (
        <>
          <div className="flex items-center mb-4">
            {[1, 2, 3, 4, 5].map((star) => (
              <button key={star} type="button" onClick={() => setRating(star)} className="mr-2">
                <FontAwesomeIcon
                  icon={star <= rating ? solidStar : regularStar}
                  className="text-[#2ca01c] text-xl"
                />
              </button>
            ))}
            <span className="ml-2 text-gray-600">{rating} / 5</span>
          </div>

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
        </>
      ) : (
        <p className="text-gray-600">Please log in to leave a comment.</p>
      )}

      <div className="mt-8">
        <h3 className="text-xl font-semibold text-gray-800 mb-4">Recent Comments</h3>
        {loading ? (
          <>
            <Skeleton height={80} className="mb-4" />
            <Skeleton height={80} className="mb-4" />
          </>
        ) : comments.length > 0 ? (
          <div className="space-y-4">
            {comments.map((c) => (
              <ReviewCard key={c._id} {...c} />
            ))}
          </div>
        ) : (
          <p className="text-gray-600">No comments yet. Be the first to leave a review!</p>
        )}
      </div>
    </div>
  );
};

export default CommentSection;