import Houseboat from "@/models/Houseboat";
import { connectToDB } from "@/utils/database"
// import mongoose from "mongoose";
export const POST = async (req: Request) => {
    const { userId, name, description, location, beds, maxPeople, price, drinks, dateRanges, amenities, food, images } = await req.json();

    await connectToDB();

    try {
        // Convert `dateRanges` into a proper Map before saving
        const formattedDates = new Map(Object.entries(dateRanges));

        const newHouseboat = new Houseboat({
            userId,
            name,
            description,
            location,
            beds,
            maxPeople,
            price,
            amenities,
            drinks,
            dates: formattedDates, // Convert object to Map
            food,
            images,
        });

        await newHouseboat.save();
        return new Response(JSON.stringify({ message: "Added Successfully" }), { status: 201 });
    } catch (error) {
        console.log(error);
        return new Response("Failed to create a new houseboat", { status: 500 });
    }
};
