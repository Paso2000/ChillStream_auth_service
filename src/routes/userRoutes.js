import express from "express";
import User from "../models/user.js";
import mongoose from "mongoose";
import Profile from "../models/profile.js";

const router = express.Router();

router.get("/", async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (error) {
        res.status(500).json({ message: "Errore nel recupero utenti" });
    }
});

router.get("/:id", async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) return res.status(404).json({ message: "Utente non trovato" });
        res.json(user);
    } catch (error) {
        res.status(500).json({ message: "Errore nel recupero utente" });
    }
});

router.post("/", async (req, res) => {
    try {
        const { name,
            surname,
            isAdmin,
            password,
            email,
            date_of_birth,
            paymentMethod} = req.body;
        const newUser = new User({
            name,
            surname,
            isAdmin,
            password,
            email,
            date_of_birth,
            paymentMethod,
            profiles: []
             });
        await newUser.save();
        //aggiunge il primo profilo
        res.status(201).json(newUser);
    } catch (error) {
        res.status(400).json({ message: "Errore nella creazione utente" });
    }
});

router.put("/:id", async (req, res) => {
    try {
        const { name,surname,
            isAdmin,
            password,
            email,
            date_of_birth,
            paymentMethod,
            profiles} = req.body;
        const updatedUser = await User.findByIdAndUpdate(
            req.params.id,
            {
                name,
                surname,
                isAdmin,
                password,
                email,
                date_of_birth,
                paymentMethod,
                profiles}

        );
        if (!updatedUser) return res.status(404).json({ message: "Utente non trovato" });
        res.json(updatedUser);
    } catch (error) {
        res.status(400).json({ message: "Errore nell'aggiornamento utente" });
    }
});

router.delete("/:id", async (req, res) => {
    try {
        const deletedUser = await User.findByIdAndDelete(req.params.id);
        if (!deletedUser) return res.status(404).json({ message: "Utente non trovato" });
        await Profile.deleteMany({ userId: req.params.id });
        res.json({ message: "Utente eliminato con successo" });
    } catch (error) {
        res.status(500).json({ message: "Errore nella cancellazione utente" });
    }
});

export default router;
