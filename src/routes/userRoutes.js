import express from "express";
import User from "../models/user.js";
import Profile from "../models/profile.js";

const router = express.Router();

/**
 * @route   GET /users
 * @desc    Retrieve all users
 * @access  Public
 */
router.get("/", async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (error) {
        res.status(500).json({ message: "Error retrieving users" });
    }
});

/**
 * @route   GET /users/:userId
 * @desc    Retrieve a single user by ID
 * @access  Public
 */
router.get("/:userId", async (req, res) => {
    try {
        const user = await User.findById(req.params.userId);
        if (!user) return res.status(404).json({ message: "User not found" });
        res.json(user);
    } catch (error) {
        res.status(500).json({ message: "Error retrieving user" });
    }
});

/**
 * @route   POST /users
 * @desc    Create a new user
 * @access  Public
 */
router.post("/", async (req, res) => {
    try {
        const {
            name,
            surname,
            isAdmin,
            password,
            email,
            date_of_birth,
            paymentMethod
        } = req.body;

        const newUser = new User({
            name,
            surname,
            isAdmin,
            password,
            email,
            date_of_birth,
            paymentMethod,
            profiles: [] // Ensure profiles is an empty array initially
        });

        await newUser.save();
        res.status(201).json(newUser);
    } catch (error) {
        res.status(400).json({ message: "Error creating user" });
    }
});

/**
 * @route   PUT /users/:userId
 * @desc    Update an existing user by ID
 * @access  Public
 */
router.put("/:userId", async (req, res) => {
    try {
        const {
            name,
            surname,
            isAdmin,
            password,
            email,
            date_of_birth,
            paymentMethod,
            profiles
        } = req.body;

        const updatedUser = await User.findByIdAndUpdate(
            req.params.userId,
            { name, surname, isAdmin, password, email, date_of_birth, paymentMethod, profiles },
            { new: true } // Return the updated document
        );

        if (!updatedUser) return res.status(404).json({ message: "User not found" });

        res.json(updatedUser);
    } catch (error) {
        res.status(400).json({ message: "Error updating user" });
    }
});

/**
 * @route   DELETE /users/:userId
 * @desc    Delete a user and their associated profiles
 * @access  Public
 */
router.delete("/:userId", async (req, res) => {
    try {
        const deletedUser = await User.findByIdAndDelete(req.params.userId);
        if (!deletedUser) return res.status(404).json({ message: "User not found" });

        // Delete all profiles associated with this user
        await Profile.deleteMany({ userId: req.params.userId });

        res.json({ message: "User successfully deleted" });
    } catch (error) {
        res.status(500).json({ message: "Error deleting user" });
    }
});

export default router;

