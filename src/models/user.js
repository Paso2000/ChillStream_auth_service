import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    name: { type: String, required: true },
    surname: { type: String, required: true },
    isAdmin:{type: Boolean,required: true},
    password: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    date_of_birth: { type: String, required: true },
    paymentMethod: { type: String, required: true },
    profiles: [{ type: String }]
});

export default mongoose.model("User", UserSchema);

