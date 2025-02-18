/**
 * @fileoverview Controller for handling profile-related operations.
 * This module provides functions for listing, retrieving, creating, updating, and deleting profiles.
 *
 * @module controllers/profileController
 */

const User = require("../models/user.js");
const Profile = require("../models/profile.js");

/**
 * Retrieves all profiles associated with a user.
 *
 * @async
 * @function listProfiles
 * @param {Object} req - Express request object containing `req.params.id` (userId).
 * @param {Object} res - Express response object.
 * @returns {JSON} List of user profiles or an error message.
 */
exports.listProfiles = async (req, res) => {
    try {
        const profiles = await Profile.find({ userId: req.params.id });
        res.json(profiles);
    } catch (error) {
        res.status(500).json({ message: "Error retrieving profiles" });
    }
};

/**
 * Retrieves a specific profile by ID.
 *
 * @async
 * @function getProfile
 * @param {Object} req - Express request object containing `req.params.profileId` and `req.params.id` (userId).
 * @param {Object} res - Express response object.
 * @returns {JSON} Profile object or an error message if not found.
 */
exports.getProfile = async (req, res) => {
    try {
        const profile = await Profile.findOne({ _id: req.params.profileId, userId: req.params.id });
        if (!profile) return res.status(404).json({ message: "Profile not found" });
        res.json(profile);
    } catch (error) {
        res.status(500).json({ message: "Error retrieving profile" });
    }
};

/**
 * Creates a new profile for a user.
 *
 * @async
 * @function createProfile
 * @param {Object} req - Express request object containing `req.body` (profileImage, nickname) and `req.params.id` (userId).
 * @param {Object} res - Express response object.
 * @returns {JSON} The newly created profile or an error message.
 */
exports.createProfile = async (req, res) => {
    try {
        const { profileImage, nickname } = req.body;
        const userId = req.params.id;

        const user = await User.findById(userId);
        if (!user) return res.status(404).json({ message: "User not found" });

        const newProfile = new Profile({ userId, profileImage, nickname });
        await newProfile.save();

        // Add the profile to the user's profile array
        user.profiles.push(newProfile._id);
        await user.save();

        res.status(201).json(newProfile);
    } catch (error) {
        res.status(400).json({ message: "Error creating profile" });
    }
};

/**
 * Updates an existing profile by ID.
 *
 * @async
 * @function updateProfile
 * @param {Object} req - Express request object containing `req.body` (profileImage, nickname) and `req.params.profileId`.
 * @param {Object} res - Express response object.
 * @returns {JSON} The updated profile or an error message.
 */
exports.updateProfile = async (req, res) => {
    try {
        const { profileImage, nickname } = req.body;

        const updatedProfile = await Profile.findByIdAndUpdate(
            req.params.profileId,
            { profileImage, nickname },
            { new: true } // Return the updated document
        );

        if (!updatedProfile) return res.status(404).json({ message: "Profile not found" });

        res.json(updatedProfile);
    } catch (error) {
        res.status(400).json({ message: "Error updating profile" });
    }
};

/**
 * Deletes a profile by ID.
 *
 * @async
 * @function deleteProfile
 * @param {Object} req - Express request object containing `req.params.profileId` and `req.params.id` (userId).
 * @param {Object} res - Express response object.
 * @returns {JSON} Success message or an error message.
 */
exports.deleteProfile = async (req, res) => {
    try {
        const profile = await Profile.findOneAndDelete({ _id: req.params.profileId, userId: req.params.id });
        if (!profile) return res.status(404).json({ message: "Profile not found" });

        // Remove the profile from the user's profile array
        await User.findByIdAndUpdate(req.params.id, { $pull: { profiles: req.params.profileId } });

        res.json({ message: "Profile successfully deleted" });
    } catch (error) {
        res.status(500).json({ message: "Error deleting profile" });
    }
};
