import mongoose from "mongoose";

const CommentSchema = new mongoose.Schema(
    {
        boatId: { type: mongoose.Schema.Types.ObjectId, ref: "Boat" },
        name: { type: String, required: true },
        rating: { type: Number, require: true },
        comment: { type: String, required: true },

    },
    { timestamps: true }
);

// Ensure the model is only created once
const Comment = mongoose.models.Comment || mongoose.model("Comment", CommentSchema);

export default Comment;