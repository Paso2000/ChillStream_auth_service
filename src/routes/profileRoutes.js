import express from "express";
import Profile from "../models/Profile.js";

const router = express.Router();

// ✅ Ottenere tutti i profili
router.get("/", async (req, res) => {
    try {
        const profiles = await Profile.find().populate("userId");
        res.json(profiles);
    } catch (error) {
        res.status(500).json({ message: "Errore nel recupero profili" });
    }
});

// ✅ Ottenere un singolo profilo per ID
router.get("/:id", async (req, res) => {
    try {
        const profile = await Profile.findById(req.params.id).populate("userId");
        if (!profile) return res.status(404).json({ message: "Profilo non trovato" });
        res.json(profile);
    } catch (error) {
        res.status(500).json({ message: "Errore nel recupero profilo" });
    }
});

// ✅ Creare un nuovo profilo
router.post("/", async (req, res) => {
    try {
        const { userId, profileImage, nickname } = req.body;
        const newProfile = new Profile({ userId, profileImage, nickname });
        await newProfile.save();
        res.status(201).json(newProfile);
    } catch (error) {
        res.status(400).json({ message: "Errore nella creazione profilo" });
    }
});

// ✅ Aggiornare un profilo per ID
router.put("/:id", async (req, res) => {
    try {
        const { profileImage, nickname } = req.body;
        const updatedProfile = await Profile.findByIdAndUpdate(
            req.params.id,
            { profileImage, nickname },
            { new: true, runValidators: true }
        );
        if (!updatedProfile) return res.status(404).json({ message: "Profilo non trovato" });
        res.json(updatedProfile);
    } catch (error) {
        res.status(400).json({ message: "Errore nell'aggiornamento profilo" });
    }
});

// ✅ Eliminare un profilo per ID
router.delete("/:id", async (req, res) => {
    try {
        const deletedProfile = await Profile.findByIdAndDelete(req.params.id);
        if (!deletedProfile) return res.status(404).json({ message: "Profilo non trovato" });
        res.json({ message: "Profilo eliminato con successo" });
    } catch (error) {
        res.status(500).json({ message: "Errore nella cancellazione profilo" });
    }
});

export default router;
