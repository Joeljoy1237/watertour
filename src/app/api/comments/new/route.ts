import { NextRequest, NextResponse } from "next/server";
import { connectToDB } from "@/utils/database";
import Comment from "@/models/Comment";
import { getServerSession } from "next-auth";

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
        return NextResponse.json(newComment, { status: 201 });
    } catch (error) {
        console.log(error)
        return NextResponse.json({ error: "Failed to save comment" }, { status: 500 });
    }
}
