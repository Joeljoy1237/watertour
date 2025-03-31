import Houseboat from "@/models/Houseboat";
import { connectToDB } from "@/utils/database"
// import mongoose from "mongoose";

export const DELETE = async (req: Request) => {
    const { userId, boatId } = await req.json();
    connectToDB();

    try {
        Houseboat.findOneAndDelete({ userId, _id: boatId })

        return new Response(JSON.stringify({ message: "Added Sucessfully" }), { status: 201 });
    } catch (error) {
        console.log(error)
        return new Response("Failed to create a new houseboat", { status: 500 });
    }

}