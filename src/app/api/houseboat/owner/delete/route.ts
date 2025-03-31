import Houseboat from "@/models/Houseboat";
import { connectToDB } from "@/utils/database";

export const POST = async (req: Request) => {
    try {
        const { userId, boatId } = await req.json();

        await connectToDB(); // Ensure the DB connection is established

        const deletedBoat = await Houseboat.findOneAndDelete({ userId, _id: boatId });

        if (!deletedBoat) {
            return new Response(JSON.stringify({ message: "Houseboat not found or already deleted" }), { status: 404 });
        }

        return new Response(JSON.stringify({ message: "Houseboat deleted successfully" }), { status: 200 });
    } catch (error) {
        console.error("Error deleting houseboat:", error);
        return new Response(JSON.stringify({ message: "Failed to delete houseboat" }), { status: 500 });
    }
};
