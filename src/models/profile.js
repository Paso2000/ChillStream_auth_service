import mongoose from "mongoose";

const ProfileSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    profileImage: { type: String, required: true },
    nickname: { type: String, required: true }
});

export default mongoose.model("Profile", ProfileSchema);
