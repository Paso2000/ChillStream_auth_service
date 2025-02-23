const express = require("express");
const router = express.Router();
const controller = require("../controller/adminController.js");

/**
 * Admin Routes
 * Defines API endpoints for managing admin users.
 */

/**
 * @route GET /admins
 * @description Fetch all administrators
 * @route POST /admins
 * @description Create a new administrator
 */
router.route("/")
    .get(controller.listAdmin)  // Fetch all admins
    .post(controller.createAdmin); // Create a new admin

/**
 * @route GET /admins/:adminId
 * @description Retrieve an admin by ID
 * @route PUT /admins/:adminId
 * @description Update an admin by ID
 * @route DELETE /admins/:adminId
 * @description Delete an admin by ID
 */
router.route("/:adminId")
    .get(controller.getAdmin)    // Fetch a single admin by ID
    .put(controller.updateAdmin) // Update admin details by ID
    .delete(controller.deleteAdmin); // Remove an admin by ID

module.exports = router;
