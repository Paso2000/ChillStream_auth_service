import mongoose from "mongoose";

/**
 * Establishes a connection to the MongoDB database.
 *
 * This function connects to a MongoDB instance using Mongoose. It ensures that the connection
 * is properly established before the application starts. If the connection fails, the application
 * logs the error and exits with a non-zero status.
 */
const connectDB = async () => {
    try {
        await mongoose.connect("mongodb://chillStream_auth_service_db:27017/auth_db", {
            useNewUrlParser: true,       // Enables the new URL parser
            useUnifiedTopology: true,    // Uses the new Server Discover and Monitoring engine
        });

        console.log("MongoDB Connected Successfully");
    } catch (error) {
        console.error("MongoDB Connection Error:", error);
        process.exit(1); // Exit the process with failure
    }
};

export default connectDB;

