import express from "express";
import Profile from "../models/Profile.js";
import User from "../models/User.js";

const router = express.Router({ mergeParams: true });

/**
 * @route   GET /users/:id/profiles
 * @desc    Retrieve all profiles of a user
 * @access  Public
 */
router.get("/", async (req, res) => {
    try {
        const profiles = await Profile.find({ userId: req.params.id });
        res.json(profiles);
    } catch (error) {
        res.status(500).json({ message: "Error retrieving profiles" });
    }
});

/**
 * @route   POST /users/:id/profiles
 * @desc    Create a new profile for a user
 * @access  Public
 */
router.post("/", async (req, res) => {
    try {
        const { profileImage, nickname } = req.body;
        const userId = req.params.id;

        const user = await User.findById(userId);
        if (!user) return res.status(404).json({ message: "User not found" });

        const newProfile = new Profile({ userId, profileImage, nickname });
        await newProfile.save();

        //Add the profile to the user's profile array
        user.profiles.push(newProfile._id);
        await user.save();

        res.status(201).json(newProfile);
    } catch (error) {
        res.status(400).json({ message: "Error creating profile" });
    }
});

/**
 * @route   GET /users/:id/profiles/:profileId
 * @desc    Retrieve a single profile of a user
 * @access  Public
 */
router.get("/:profileId", async (req, res) => {
    try {
        const profile = await Profile.findOne({ _id: req.params.profileId, userId: req.params.id });
        if (!profile) return res.status(404).json({ message: "Profile not found" });
        res.json(profile);
    } catch (error) {
        res.status(500).json({ message: "Error retrieving profile" });
    }
});

/**
 * @route   PUT /users/:id/profiles/:profileId
 * @desc    Update a user's profile
 * @access  Public
 */
router.put("/:profileId", async (req, res) => {
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
});

/**
 * @route   DELETE /users/:id/profiles/:profileId
 * @desc    Delete a user's profile
 * @access  Public
 */
router.delete("/:profileId", async (req, res) => {
    try {
        const profile = await Profile.findOneAndDelete({ _id: req.params.profileId, userId: req.params.id });
        if (!profile) return res.status(404).json({ message: "Profile not found" });

        // Remove the profile from the user's profile array
        await User.findByIdAndUpdate(req.params.id, { $pull: { profiles: req.params.profileId } });

        res.json({ message: "Profile successfully deleted" });
    } catch (error) {
        res.status(500).json({ message: "Error deleting profile" });
    }
});

export default router;
