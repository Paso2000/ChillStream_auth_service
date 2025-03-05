const express = require ("express");
const userRoutes = require ("./routes/userRoutes.js");
const profileRoutes = require ("./routes/profileRoutes.js");
const adminRoutes = require("./routes/adminRoutes")
const connectDB = require ("./db.js");
const cors = require("cors");

const app = express();

// Abilita CORS per consentire richieste dal frontend
app.use(cors());

// Middleware
app.use(express.json());


// Connecting DB
connectDB();

// Routes
app.use("/users", userRoutes);  //user routes
app.use("/users/:id/profiles",profileRoutes); //profile routes
app.use("/admins", adminRoutes); //admin routes

// Starting the server on port 8081
const PORT =  8081;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
