import Houseboat from "@/models/Houseboat";
import { connectToDB } from "@/utils/database";

export const POST = async (req: Request) => {
    try {
        const { userId, boatId, name, description, location, beds, maxPeople, price, drinks, dateRanges, amenities, food, images } = await req.json();

        await connectToDB();

        // Convert dateRanges into a proper Map before saving
        const formattedDates = new Map(Object.entries(dateRanges || {}));

        const updatedHouseboat = await Houseboat.findOneAndUpdate(
            { _id: boatId, userId }, // Ensure the user owns the houseboat
            {
                name,
                description,
                location,
                beds,
                maxPeople,
                price,
                amenities,
                drinks,
                dates: formattedDates,
                food,
                images,
            },
            { new: true } // Return the updated document
        );

        if (!updatedHouseboat) {
            return new Response(JSON.stringify({ message: "Houseboat not found or unauthorized" }), { status: 404 });
        }

        return new Response(JSON.stringify({ message: "Updated Successfully", houseboat: updatedHouseboat }), { status: 200 });
    } catch (error) {
        console.error("Error updating houseboat:", error);
        return new Response(JSON.stringify({ message: "Failed to update houseboat" }), { status: 500 });
    }
}; 