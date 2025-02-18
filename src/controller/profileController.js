const User = require ("../models/user.js");
const Profile = require("../models/profile.js");

exports.listProfiles = async (req, res) => {
        try {
            const profile = await Profile.find({userId: req.params.id});
            res.json(profile);
        } catch (error) {
            res.status(500).json({message: "Error retrieving user"});
        }

}

exports.getProfile = async (req, res) => {
    try {
        const profile = await Profile.findOne({_id: req.params.profileId, userId: req.params.id});
        if (!profile) return res.status(404).json({message: "Profile not found"});
        res.json(profile);
    } catch (error) {
        res.status(500).json({message: "Error retrieving profile"});
    }
}

exports.createProfile = async (req, res) => {
    try {
        const {profileImage, nickname} = req.body;
        const userId = req.params.id;

        const user = await User.findById(userId);
        if (!user) return res.status(404).json({message: "User not found"});

        const newProfile = new Profile({userId, profileImage, nickname});
        await newProfile.save();

        //Add the profile to the user's profile array
        user.profiles.push(newProfile._id);
        await user.save();

        res.status(201).json(newProfile);
    } catch (error) {
        res.status(400).json({message: "Error creating profile"});
    }
}

exports.updateProfile = async (req, res) => {
    try {
        const {profileImage, nickname} = req.body;

        const updatedProfile = await Profile.findByIdAndUpdate(
            req.params.profileId,
            {profileImage, nickname},
            {new: true} // Return the updated document
        );

        if (!updatedProfile) return res.status(404).json({message: "Profile not found"});

        res.json(updatedProfile);
    } catch (error) {
        res.status(400).json({message: "Error updating profile"});
    }
}

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

}
