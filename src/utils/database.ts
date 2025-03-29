import mongoose from "mongoose";

let isConnected = false;

export const connectToDB = async () => {
  mongoose.set("strictQuery", true);
  if (isConnected) {
    console.log("==> Mongo Already connected");
    return;
  }

  try {
    console.log("==> Mongo Connecting...");
    await mongoose.connect(process.env.MONGODB_URL!, {
      dbName: "waterTour",
      writeConcern: { w: 'majority' },
    });
    isConnected = true;
    console.log("==> Mongo Successfully connected");
  } catch (error) {
    console.log('Connection error:', error);
  }
};
