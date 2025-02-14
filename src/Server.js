import express from "express";
import userRoutes from "./routes/userRoutes.js";
import profileRoutes from "./routes/profileRoutes.js";
import connectDB from "./db.js";

const app = express();

// Middleware
app.use(express.json());


// Connecting DB
connectDB();

// Routes
app.use("/users", userRoutes);
app.use("/users/:id/profiles",profileRoutes);

// Starting the server on port 8081
const PORT =  8081;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
