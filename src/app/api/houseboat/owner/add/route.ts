import Houseboat from "@/models/Houseboat";
import { connectToDB } from "@/utils/database"
import mongoose from "mongoose";

export const POST = async (req: Request) => {
    const { userId, name, description, location, beds, maxPeople, price, amenities, items, images } = await req.json();
    connectToDB();
    const newuserId = new mongoose.Types.ObjectId(userId);

    try {
        const newHouseboat = new Houseboat({
            userId: newuserId,
            name,
            description,
            location,
            beds,
            maxPeople,
            price,
            amenities,
            items,
            images
        });

        await newHouseboat.save();
        return new Response(JSON.stringify({ message: "Added Sucessfully" }), { status: 201 });
    } catch (error) {
        console.log(error)
        return new Response("Failed to create a new houseboat", { status: 500 });
    }

}