import { NextRequest, NextResponse } from 'next/server';
import mongoose from 'mongoose';
import Location from '@/models/location'; // Ensure this model is correctly defined and imported

// MongoDB connection
const connectToDatabase = async () => {
  if (mongoose.connection.readyState === 0) {
    await mongoose.connect(process.env.MONGODB_URI || '', {});
  }
};

// GET handler for the API route
export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const query = searchParams.get('query');

  if (!query) {
    return NextResponse.json({ message: 'Invalid query parameter' }, { status: 400 });
  }

  try {
    await connectToDatabase();

    // Search for locations matching the input query
    const locations = await Location.find({
      name: { $regex: query, $options: 'i' }, // Case-insensitive search
    });

    return NextResponse.json(locations, { status: 200 });
  } catch (error) {
    console.error('Error fetching locations:', error);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}