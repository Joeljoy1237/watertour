import { NextResponse } from "next/server";
import { connectToDB } from "@/utils/database";
import Comment from "@/models/Comment";

interface PostRequestBody {
    boatId: string;
}

interface CommentType {
    _id: string;
    text: string;
    createdAt: Date;
    updatedAt: Date;
}

export async function POST(req: Request): Promise<Response> {
    await connectToDB();

    const { boatId }: PostRequestBody = await req.json();
    try {
        const comments: CommentType[] = await Comment.find({ boatId }).sort({ createdAt: -1 }); // Fetch recent comments
        console.log(comments);
        return NextResponse.json(comments, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: "Failed to fetch comments" }, { status: 500 });
    }
}