import express from "express";
import User from "../models/user.js";

const router = express.Router();

// Ottenere tutti gli utenti
router.get("/", async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);

    } catch (error) {
        res.status(500).json({ message: "Errore nel recupero utenti" });
    }
});

// Creare un nuovo utente
router.post("/", async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const newUser = new User({ name, email, password });
        await newUser.save();
        res.status(201).json(newUser);
    } catch (error) {
        res.status(400).json({ message: "Errore nella creazione utente" });
    }
});

export default router;
