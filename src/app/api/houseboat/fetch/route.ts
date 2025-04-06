import Houseboat from "@/models/Houseboat";
import { connectToDB } from "@/utils/database";

export const POST = async (req: Request) => {
    const { userId } = await req.json();
    connectToDB();

    try {
        let houseboats;
        if (userId) {
            houseboats = await Houseboat.find({ userId }).select("location name cutPrice price images _id rating");
        } else {
            houseboats = await Houseboat.find().sort({ createdAt: -1 });
        }

        // Convert price fields to numbers and format response
        const formattedHouseboats = houseboats.map(boat => ({
            ...boat.toObject(),
            cutPrice: Number(boat.cutPrice),
            price: Number(boat.price)
        }));

        return new Response(JSON.stringify(formattedHouseboats), { status: 201 });
    } catch (error) {
        console.log(error);
        return new Response("Failed to fetch houseboats", { status: 500 });
    }
};
