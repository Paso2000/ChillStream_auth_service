const User = require ("../models/user.js");
const Profile = require("../models/profile.js");

exports.listUsers = async (req, res) => {
    try {
        const user = await User.find({userId: req.params.id});
        res.json(user);
    } catch (error) {
        res.status(500).json({message: "Error retrieving user"});
    }
}

exports.getUser = async (req, res) => {
    try {
        const user = await User.findById(req.params.userId);
        if (!user) return res.status(404).json({message: "User not found"});
        res.json(user);
    } catch (error) {
        res.status(500).json({message: "Error retrieving user"});
    }
}

exports.createUser = async (req, res) => {
    try {
        const newUser = new User(req.body);
        await newUser.save();
        res.status(201).json(newUser);
    } catch (error) {
        res.status(400).json({ message: "Error creating user" });
    }
}

exports.updateUser = async (req, res) => {
    try{
        const updatedUser = await User.findByIdAndUpdate(
            req.params.userId,
            req.body,
            {new: true} // Return the updated document
             );

        if (!updatedUser) return res.status(404).json({message: "User not found"});
            res.json(updatedUser);
        } catch (error) {
        res.status(400).json({ message: "Error updating user" });
    }
}

exports.deleteUser = async (req, res) => {
    try {
        const deletedUser = await User.findByIdAndDelete(req.params.userId);
        if (!deletedUser) return res.status(404).json({message: "User not found"});

        // Delete all profiles associated with this user
        await Profile.deleteMany({userId: req.params.userId});

        res.json({message: "User successfully deleted"});
    } catch (error) {
        res.status(500).json({message: "Error deleting user"});
    }

}
