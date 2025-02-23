const mongoose = require("mongoose");

/**
 * Admin Schema for MongoDB using Mongoose
 *
 * This schema defines the structure for storing administrator user data.
 * It ensures that each admin has a unique username, email, and password.
 */

const AdminSchema = new mongoose.Schema({
    /**
     * @property {String} username - The unique username of the admin.
     * @required Yes
     * @unique Yes
     */
    username: { type: String, required: true, unique: true },

    /**
     * @property {String} email - The unique email address of the admin.
     * @required Yes
     * @unique Yes
     */
    email: { type: String, required: true, unique: true },

    /**
     * @property {String} password - The admin's unique password (should be hashed before storing).
     * @required Yes
     * @unique Yes
     */
    password: { type: String, required: true, unique: true }
});

// Export the model, ensuring it doesn't get redefined in case of hot-reloading
module.exports = mongoose.models.Admin || mongoose.model("Admin", AdminSchema);
