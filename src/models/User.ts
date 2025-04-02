import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
    {
        name: { type: String, required: true },
        email: { type: String, required: true, unique: true },
        password: { type: String, required: false, select: false }, // Select false to hide password by default
        image: { type: String }, // Field for storing user profile image URL
        phoneNumber: { type: String }, // Field for storing user's phone number
        isOwner: { type: Boolean, default: false },
        revenue: { type: Number, default: 0 },
        isAdmin: { type: Boolean, default: false },
    },
    { timestamps: true }
);

// Ensure the model is only created once
const User = mongoose.models.User || mongoose.model("User", UserSchema);

export default User;