const express = require ("express");
const userRoutes = require ("./routes/userRoutes.js");
const profileRoutes = require ("./routes/profileRoutes.js");
const connectDB = require ("./db.js");

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
