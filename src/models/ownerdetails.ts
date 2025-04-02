import mongoose from "mongoose";

const OwnerDetailsSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  address: { type: String, required: true },
  city: { type: String, required: true },
  pincode: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  licenseNumber: { type: String, required: true },
  images: { type: [String], default: [] },
});

const OwnerDetails = mongoose.models.OwnerDetails || mongoose.model("OwnerDetails", OwnerDetailsSchema);

export default OwnerDetails;