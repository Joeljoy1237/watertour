import express from "express";
import http from "http";
import { Server } from "socket.io";
import mongoose from "mongoose";
import Houseboat from "./models/Houseboat"; // Adjust the path if needed

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*", // Allow frontend to connect
    methods: ["GET", "POST"],
  },
});

// Connect to MongoDB
mongoose
  .connect("mongodb://localhost:27017/houseboatDB", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Socket.io logic
io.on("connection", (socket) => {
  console.log("Client connected:", socket.id);

  // Listen for price updates
  socket.on("updatePrice", async ({ houseboatId, newPrice }) => {
    try {
      const houseboat = await Houseboat.findByIdAndUpdate(
        houseboatId,
        { price: newPrice, updatedAt: Date.now() },
        { new: true }
      );

      if (houseboat) {
        io.emit("priceUpdated", { houseboatId, newPrice });
      }
    } catch (error) {
      console.error("Error updating price:", error);
    }
  });

  // Listen for date updates
  socket.on("updateDates", async ({ houseboatId, newDates }) => {
    try {
      const houseboat = await Houseboat.findByIdAndUpdate(
        houseboatId,
        { dates: newDates, updatedAt: Date.now() },
        { new: true }
      );

      if (houseboat) {
        io.emit("datesUpdated", { houseboatId, newDates });
      }
    } catch (error) {
      console.error("Error updating dates:", error);
    }
  });

  socket.on("disconnect", () => {
    console.log("Client disconnected:", socket.id);
  });
});

// Start the server
const PORT = 3001;
server.listen(PORT, () => {
  console.log(`Socket server running on http://localhost:${PORT}`);
});
