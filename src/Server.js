import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import userRoutes from "./routes/userRoutes.js";
import connectDB from "./db.js";

dotenv.config();
const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Connessione al DB
connectDB();

// Routes
app.use("/", userRoutes);

// Avvio del server
const PORT =  8080;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
