const mongoose = require ("mongoose");

/**
 * Profile Schema
 *
 * Represents a profile in the system.
 */
// Define the schema for a profile document in the database
const ProfileSchema = new mongoose.Schema({
    // The 'userId' field stores a reference to the associated User document.
    // It uses the ObjectId type and is required for every profile.
    // The 'ref' option establishes a relationship with the "User" model.
    // The 'default' value is an empty array, but this is redundant since 'required' should prevent it from being empty.
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
        default: []
    },

    // The 'profileImage' field stores the URL or path to the profile image as a string.
    // This field is required for every profile document.
    profileImage: {
        type: String,
        required: true
    },

    // The 'nickname' field stores the nickname for the profile, which is required.
    nickname: {
        type: String,
        required: true
    }
});

// Create and export the Profile model using the ProfileSchema.
module.exports = mongoose.models.Profile || mongoose.model("Profile", ProfileSchema);

