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
        beds: { type: String, require: true },
        maxPeople: { type: String, required: true },
        price: { type: String, required: true },
        rating: { type: Number, default: 3.5 },
        dates: [{
            date: { type: Date },
            dayCruiser: { type: Boolean, default: true },
            nightStay: { type: Boolean, default: true },
            pricePerDay: { type: Number },
            pricePerNight: { type: Number },
            extraPricePerBed: { type: Number },
        }],
        amenities: { type: [String], required: true },
        food: {
            veg: { type: [String], require: true },
            nonVeg: { type: [String], require: true }
        },
        images: { type: [String], required: true },
        isAvailable: { type: Boolean, default: true },
        isVerified: { type: Boolean, default: false },
        updatedAt: { type: Date, default: Date.now },


    },
    { timestamps: true }
);

// Ensure the model is only created once
const User = mongoose.models.Houseboat || mongoose.model("Houseboat", HouseboatSchema);

export default User;