const Admin = require("../models/admin.js");

/**
 * Controller for managing Admin operations.
 * Provides CRUD functionalities: list, retrieve, create, update, and delete.
 */

/**
 * List all administrators.
 * @route GET /admins
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
exports.listAdmin = async (req, res) => {
    try {
        const users = await Admin.find();
        console.log("Users retrieved successfully");
        res.json(users);
    } catch (error) {
        console.error("Error retrieving users:", error);
        res.status(500).json({ message: "Error retrieving users" });
    }
};

/**
 * Retrieve a single admin by ID.
 * @route GET /admins/:adminId
 * @param {Object} req - Express request object (contains adminId in params)
 * @param {Object} res - Express response object
 */
exports.getAdmin = async (req, res) => {
    try {
        const admin = await Admin.findById(req.params.adminId);
        if (!admin) {
            console.warn("Admin not found:", req.params.adminId);
            return res.status(404).json({ message: "Admin not found" });
        }
        console.log(`Admin ${req.params.adminId} retrieved successfully`);
        res.json(admin);
    } catch (error) {
        console.error("Error retrieving admin:", error);
        res.status(500).json({ message: "Error retrieving admin" });
    }
};

/**
 * Create a new administrator.
 * @route POST /admins
 * @param {Object} req - Express request object (contains new admin data in body)
 * @param {Object} res - Express response object
 */
exports.createAdmin = async (req, res) => {
    try {
        const newAdmin = new Admin(req.body);
        await newAdmin.save();
        console.log(`Admin ${newAdmin._id} created successfully`);
        res.status(201).json(newAdmin);
    } catch (error) {
        console.error("Error creating admin:", error);
        res.status(400).json({ message: "Error creating admin" });
    }
};

/**
 * Update an existing administrator.
 * @route PUT /admins/:adminId
 * @param {Object} req - Express request object (contains updated admin data in body)
 * @param {Object} res - Express response object
 */
exports.updateAdmin = async (req, res) => {
    try {
        const updatedAdmin = await Admin.findByIdAndUpdate(
            req.params.adminId,
            req.body,
            { new: true } // Return the updated document
        );

        if (!updatedAdmin) {
            console.warn("Admin not found:", req.params.adminId);
            return res.status(404).json({ message: "Admin not found" });
        }

        console.log(`Admin ${req.params.adminId} updated successfully`);
        res.json(updatedAdmin);
    } catch (error) {
        console.error("Error updating admin:", error);
        res.status(400).json({ message: "Error updating admin" });
    }
};

/**
 * Delete an administrator.
 * @route DELETE /admins/:adminId
 * @param {Object} req - Express request object (contains adminId in params)
 * @param {Object} res - Express response object
 */
exports.deleteAdmin = async (req, res) => {
    try {
        const deletedAdmin = await Admin.findByIdAndDelete(req.params.adminId);
        if (!deletedAdmin) {
            console.warn("Admin not found:", req.params.adminId);
            return res.status(404).json({ message: "Admin not found" });
        }

        console.log(`Admin ${req.params.adminId} deleted`);
        res.json({ message: "Admin successfully deleted" });
    } catch (error) {
        console.error("Error deleting admin:", error);
        res.status(500).json({ message: "Error deleting admin" });
    }
};
