import { NextRequest, NextResponse } from "next/server";
import { connectToDB } from "@/utils/database";
import Comment from "@/models/Comment";
import { getServerSession } from "next-auth";
import Houseboat from "@/models/Houseboat";

export async function POST(req: NextRequest) {

    const session = await getServerSession();
    if (!session) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { boatId, comment, rating } = await req.json();

    if (!comment || !rating || !boatId) {
        return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    await connectToDB();

    try {
        const newComment = new Comment({
            name: session.user?.name || "Anonymous",
            comment: comment,
            boatId,
            rating,
            date: new Date().toISOString().split("T")[0],
            location: "Unknown",
        });

        await newComment.save();

        const houseboat = await Houseboat.findById(boatId).select("rateCount rating");

        // Ensure rateCount and rating are numbers
        const currentRateCount = houseboat.rateCount || 0; // Default to 0 if undefined
        const currentRating = houseboat.rating || 0; // Default to 0 if undefined

        // Increment the rate count
        houseboat.rateCount = currentRateCount + 1;

        // Calculate new average rating
        houseboat.rating = (currentRating + rating) / houseboat.rateCount;

        await houseboat.save(); // Ensure to await the save operation

        return NextResponse.json(newComment, { status: 201 });
    } catch (error) {
        console.log(error);
        return NextResponse.json({ error: "Failed to save comment" }, { status: 500 });
    }
}
