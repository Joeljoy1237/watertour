import { NextRequest, NextResponse } from "next/server";
import { connectToDB } from "@/utils/database";
import Houseboat from "@/models/Houseboat";

export async function GET(req: NextRequest, context: { params: Promise<{ id: string }> }) {
    try {
        const { id } = await context.params;
        if (!id) {
            return NextResponse.json({ error: "Houseboat ID is required" }, { status: 400 });
        }

        await connectToDB();

        const houseboat = await Houseboat.findById(id);
        if (!houseboat) {
            return NextResponse.json({ error: "Houseboat not found" }, { status: 404 });
        }

        // Convert dates Map to a regular object for JSON serialization
        const houseboatObj = houseboat.toObject();
        if (houseboatObj.dates instanceof Map) {
            houseboatObj.dates = Object.fromEntries(houseboatObj.dates);
        }

        return NextResponse.json(houseboatObj);
    } catch (error) {
        console.error("Error fetching houseboat:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
