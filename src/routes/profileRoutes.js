/**
 * @fileoverview This module defines the routes for profile-related operations.
 * It provides endpoints for listing, creating, retrieving, updating, and deleting user profiles.
 * The routes are handled by the `profileController` methods.
 *
 * @module routes/profileRoutes
 */

const express = require("express");
const controller = require("../controller/profileController");

const router = express.Router({ mergeParams: true });

/**
 * Route serving profile operations.
 *
 * @name /users/:userId/profiles
 * @route {GET} / - Retrieves all profiles associated with a user.
 * @route {POST} / - Creates a new profile for a user.
 *
 * @param {string} userId - The unique identifier of the user.
 */
router.route("/")
    .get(controller.listProfiles)  // Fetch all profiles for a user
    .post(controller.createProfile); // Create a new profile for a user

/**
 * Route serving specific profile operations.
 *
 * @name /users/:userId/profiles/:profileId
 * @route {GET} /:profileId - Retrieves a profile by ID.
 * @route {PUT} /:profileId - Updates a profile by ID.
 * @route {DELETE} /:profileId - Deletes a profile by ID.
 *
 * @param {string} userId - The unique identifier of the user.
 * @param {string} profileId - The unique identifier of the profile.
 */
router.route("/:profileId")
    .get(controller.getProfile)    // Fetch a specific profile by ID
    .put(controller.updateProfile) // Update profile details by ID
    .delete(controller.deleteProfile); // Remove a profile by ID

module.exports = router;

