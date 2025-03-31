import { NextRequest, NextResponse } from "next/server";
import { connectToDB } from "@/utils/database";
import Houseboat from "@/models/Houseboat";

export async function GET(req: NextRequest, context: { params: Promise<{ id: string }> }) {
    const { id } = await context.params; // Correctly access params without awaiting

    await connectToDB();

    try {
        const houseboat = await Houseboat.findById(id);
        if (!houseboat) return NextResponse.json({ error: "Houseboat not found" }, { status: 404 });

        return NextResponse.json(houseboat, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
