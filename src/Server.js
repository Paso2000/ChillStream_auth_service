import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import userRoutes from "./routes/userRoutes.js";
import profileRoutes from "./routes/profileRoutes.js";
import connectDB from "./db.js";

dotenv.config();
const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Connessione al DB
connectDB();

// Routes
app.use("/users", userRoutes);
app.use("/users/:id/profiles",profileRoutes);

// Avvio del server
const PORT =  8081;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
