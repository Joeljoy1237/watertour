import mongoose, { Document, Schema } from 'mongoose';

interface ILocation extends Document {
    name: string;
    createdAt: Date;
}

const LocationSchema = new Schema<ILocation>({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

const Location = mongoose.models.Location || mongoose.model<ILocation>('Location', LocationSchema);

export default Location;