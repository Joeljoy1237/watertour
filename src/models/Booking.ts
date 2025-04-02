import mongoose, { Schema, Document } from "mongoose";

interface IBooking extends Document {
    houseboatId: mongoose.Types.ObjectId;
    userId: mongoose.Types.ObjectId;
    ownerId: mongoose.Types.ObjectId;
    date: string;
    type: "Day Cruiser" | "Night Stay";
    guests: number;
    beds: number;
    totalPrice: number;
    status: "pending" | "approved" | "rejected" | "cancelled";
    createdAt: Date;
    updatedAt: Date;
}

const BookingSchema = new Schema<IBooking>(
    {
        houseboatId: { type: Schema.Types.ObjectId, ref: "Houseboat", required: true },
        userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
        ownerId: { type: Schema.Types.ObjectId, ref: "User", required: true },
        date: { type: String, required: true },
        type: { type: String, enum: ["Day Cruiser", "Night Stay"], required: true },
        guests: { type: Number, required: true, min: 1 },
        beds: { type: Number, required: true, min: 1 },
        totalPrice: { type: Number, required: true, min: 0 },
        status: { type: String, enum: ["pending", "approved", "rejected", "cancelled"], default: "pending" },
    },
    { timestamps: true }
);

const Booking = mongoose.models.Booking || mongoose.model<IBooking>("Booking", BookingSchema);

export default Booking;
