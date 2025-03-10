const mongoose = require ("mongoose");

/**
 * User Schema
 *
 * Represents a user in the system, including personal information,
 * authentication details, and associated profiles.
 */
const UserSchema = new mongoose.Schema({
    name: { type: String, required: true },
    surname: { type: String, required: true },
    password: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    date_of_birth: { type: String, required: true },
    paymentMethod: { type: String, required: true },
    profiles: [{ type: mongoose.Schema.Types.ObjectId, ref: "Profile", default: [] }] // Stores profile IDs
}, { timestamps: true }); // Adds createdAt and updatedAt fields automatically

// Prevent model overwrite error in hot-reloading environments
module.exports = mongoose.models.User || mongoose.model("User", UserSchema);

