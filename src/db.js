import mongoose from "mongoose";

const connectDB = async () => {
    try {
        await mongoose.connect("mongodb://chillStream_auth_service_db:27017/auth_db", {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log("MongoDB Connected");
    } catch (error) {
        console.error("MongoDB connection error:", error);
        process.exit(1);
    }
};

export default connectDB;
