/**
 * @fileoverview This module defines the routes for user-related operations.
 * It provides endpoints for listing, creating, retrieving, updating, and deleting users.
 * The routes are handled by the `userController` methods.
 *
 * @module routes/userRoutes
 */

const express = require("express");
const router = express.Router();
const controller = require("../controller/userController.js");

/**
 * Route serving user operations.
 *
 * @name /users
 * @route {GET} / - Retrieves a list of all users.
 * @route {POST} / - Creates a new user.
 */
router.route("/")
    .get(controller.listUsers)  // Fetch all users
    .post(controller.createUser); // Create a new user

/**
 * Route serving specific user operations.
 *
 * @name /users/:userId
 * @route {GET} /:userId - Retrieves a user by ID.
 * @route {PUT} /:userId - Updates a user by ID.
 * @route {DELETE} /:userId - Deletes a user by ID.
 *
 * @param {string} userId - The unique identifier of the user.
 */
router.route("/:userId")
    .get(controller.getUser)    // Fetch a single user by ID
    .put(controller.updateUser) // Update user details by ID
    .delete(controller.deleteUser); // Remove a user by ID

module.exports = router;

