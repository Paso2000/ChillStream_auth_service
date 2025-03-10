const User = require("../models/user");
const bcrypt = require("bcryptjs");

exports.canUserLogIn = async (req, res) => {
    try {
        const { email, password } = req.body;
        // Trova l'utente nel database
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ message: "Invalid credentials" });
        }

        // Confronta la password inserita con l'hash salvato
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: "Invalid credentials" });
        }
        res.status(200).json(user );
    } catch (error) {
        res.status(500).json({ message: "Error logging in", error
        });
    }
};