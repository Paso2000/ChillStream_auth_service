const express = require("express");
const http = require("http");
const cors = require("cors");

const userRoutes = require("./routes/userRoutes.js");
const profileRoutes = require("./routes/profileRoutes.js");
const adminRoutes = require("./routes/adminRoutes.js");
const connectDB = require("./db.js");
const { initializeSocket } = require("./socket.js"); // Import Socket.IO logic

const app = express();
const server = http.createServer(app); // Create HTTP server

// Enable CORS
app.use(cors());

// Middleware
app.use(express.json());

// Connecting DB
connectDB();

// Routes
app.use("/users", userRoutes);
app.use("/users/:id/profiles", profileRoutes);
app.use("/admins", adminRoutes);

// Initialize Socket.IO
initializeSocket(server);

// Start the server on port 8081
const PORT = 8081;
server.listen(PORT, () => console.log(` Server running on port ${PORT}`));
