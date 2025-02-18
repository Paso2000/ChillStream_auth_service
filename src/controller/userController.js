/**
 * @fileoverview Controller for handling user-related operations.
 * This module provides functions for listing, retrieving, creating, updating, and deleting users.
 *
 * @module controllers/userController
 */

const User = require("../models/user.js");
const Profile = require("../models/profile.js");

/**
 * Retrieves all users.
 *
 * @async
 * @function listUsers
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @returns {JSON} List of users or an error message.
 */
exports.listUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (error) {
        res.status(500).json({ message: "Error retrieving users" });
    }
};

/**
 * Retrieves a specific user by ID.
 *
 * @async
 * @function getUser
 * @param {Object} req - Express request object containing `req.params.userId`.
 * @param {Object} res - Express response object.
 * @returns {JSON} User object or an error message if not found.
 */
exports.getUser = async (req, res) => {
    try {
        const user = await User.findById(req.params.userId);
        if (!user) return res.status(404).json({ message: "User not found" });
        res.json(user);
    } catch (error) {
        res.status(500).json({ message: "Error retrieving user" });
    }
};

/**
 * Creates a new user.
 *
 * @async
 * @function createUser
 * @param {Object} req - Express request object containing `req.body` with user data.
 * @param {Object} res - Express response object.
 * @returns {JSON} The newly created user or an error message.
 */
exports.createUser = async (req, res) => {
    try {
        const newUser = new User(req.body);
        await newUser.save();
        res.status(201).json(newUser);
    } catch (error) {
        res.status(400).json({ message: "Error creating user" });
    }
};

/**
 * Updates an existing user by ID.
 *
 * @async
 * @function updateUser
 * @param {Object} req - Express request object containing `req.body` with user data and `req.params.userId`.
 * @param {Object} res - Express response object.
 * @returns {JSON} The updated user or an error message.
 */
exports.updateUser = async (req, res) => {
    try {
        const updatedUser = await User.findByIdAndUpdate(
            req.params.userId,
            req.body,
            { new: true } // Return the updated document
        );

        if (!updatedUser) return res.status(404).json({ message: "User not found" });
        res.json(updatedUser);
    } catch (error) {
        res.status(400).json({ message: "Error updating user" });
    }
};

/**
 * Deletes a user by ID and removes all associated profiles.
 *
 * @async
 * @function deleteUser
 * @param {Object} req - Express request object containing `req.params.userId`.
 * @param {Object} res - Express response object.
 * @returns {JSON} Success message or an error message.
 */
exports.deleteUser = async (req, res) => {
    try {
        const deletedUser = await User.findByIdAndDelete(req.params.userId);
        if (!deletedUser) return res.status(404).json({ message: "User not found" });

        // Delete all profiles associated with this user
        await Profile.deleteMany({ userId: req.params.userId });

        res.json({ message: "User successfully deleted" });
    } catch (error) {
        res.status(500).json({ message: "Error deleting user" });
    }
};
