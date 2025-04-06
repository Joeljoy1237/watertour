import Houseboat from "@/models/Houseboat";
import { connectToDB } from "@/utils/database"
// import mongoose from "mongoose";
export const POST = async (req: Request) => {
    const { userId, name, description, location, beds, maxPeople, price, cutPrice, drinks, dateRanges, amenities, food, images } = await req.json();

    // Validate required fields
    if (!userId || !name || !description || !location || !beds || !maxPeople || !price || !cutPrice || !amenities || !food || !images) {
        return new Response(JSON.stringify({ message: "Missing required fields" }), { status: 400 });
    }

    await connectToDB();

    try {
        // Convert `dateRanges` into a proper Map before saving
        const formattedDates = new Map(Object.entries(dateRanges || {}));

        // Convert price strings to numbers
        const numericPrice = Number(price);
        const numericCutPrice = Number(cutPrice);
        const numericBeds = Number(beds);
        const numericMaxPeople = Number(maxPeople);

        // Validate numeric values
        if (isNaN(numericPrice) || isNaN(numericCutPrice) || numericPrice <= 0 || numericCutPrice <= 0) {
            return new Response(JSON.stringify({ message: "Invalid price values" }), { status: 400 });
        }

        if (numericCutPrice <= numericPrice) {
            return new Response(JSON.stringify({ message: "Original price must be greater than discounted price" }), { status: 400 });
        }

        const newHouseboat = new Houseboat({
            userId,
            name,
            description,
            location,
            beds: numericBeds,
            maxPeople: numericMaxPeople,
            price: numericPrice,
            cutPrice: numericCutPrice,
            amenities,
            drinks,
            dates: formattedDates,
            food,
            images,
        });

        await newHouseboat.save();
        return new Response(JSON.stringify({ message: "Added Successfully" }), { status: 201 });
    } catch (error) {
        console.error("Error creating houseboat:", error);
        return new Response(JSON.stringify({ message: "Failed to create a new houseboat", error: error instanceof Error ? error.message : String(error) }), { status: 500 });
    }
};
