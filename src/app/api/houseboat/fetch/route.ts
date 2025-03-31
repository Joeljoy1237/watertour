import Houseboat from "@/models/Houseboat";
import { connectToDB } from "@/utils/database";

export const POST = async (req: Request) => {
    const { userId } = await req.json();
    console.log(userId);
    connectToDB();

    try {
        let houseboats;
        if (userId) {
            houseboats = await Houseboat.find({ userId }).select("location name price images _id");
        } else {
            houseboats = await Houseboat.find().sort({ createdAt: -1 }).select("location name price rating images _id");
        }

        console.log(houseboats);
        return new Response(JSON.stringify(houseboats), { status: 201 });
    } catch (error) {
        console.log(error);
        return new Response("Failed to fetch houseboats", { status: 500 });
    }
};
