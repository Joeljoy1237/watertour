import mongoose from "mongoose";

const HouseboatSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        name: { type: String, required: true },
        description: { type: String, required: true },
        location: { type: String, required: true },
        beds: { type: Number, required: true }, // Changed to Number
        maxPeople: { type: Number, required: true }, // Changed to Number
        price: { type: Number, required: true }, // Changed to Number
        rating: { type: Number, default: 3 },
        dates: {
            type: Map,
            of: new mongoose.Schema({
                price: Number,
                available: Boolean,
                dayCruiser: Boolean,
                nightStay: Boolean,
                pricePerDay: Number,
                pricePerNight: Number,
                extraPricePerBed: Number,
            }),
            default: {},
        },
        amenities: { type: [String], required: true },
        food: {
            veg: { type: [String], required: true }, // Fixed 'require' to 'required'
            nonVeg: { type: [String], required: true }, // Fixed 'require' to 'required'
        },
        images: { type: [String], required: true },
        isAvailable: { type: Boolean, default: true },
        isVerified: { type: Boolean, default: false },
        updatedAt: { type: Date, default: Date.now },
    },
    { timestamps: true }
);

// Ensure the model is only created once
const Houseboat = mongoose.models.Houseboat || mongoose.model("Houseboat", HouseboatSchema);

export default Houseboat;
