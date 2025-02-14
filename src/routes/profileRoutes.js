import express from "express";
import Profile from "../models/Profile.js";
import User from "../models/User.js";

const router = express.Router({ mergeParams: true });

// ✅ Ottenere tutti i profili di un utente
router.get("/", async (req, res) => {
    try {
        const profiles = await Profile.find({ userId: req.params.id });
        res.json(profiles);
    } catch (error) {
        res.status(500).json({ message: "Errore nel recupero profili" });
    }
});

// ✅ Creare un nuovo profilo per un utente
router.post("/", async (req, res) => {
    try {
        const { profileImage, nickname } = req.body;
        const userId = req.params.id;

        const user = await User.findById(userId);
        if (!user) return res.status(404).json({ message: "Utente non trovato" });

        const newProfile = new Profile({ userId, profileImage, nickname });
        await newProfile.save();

        // ✅ Aggiungere il profilo all'array di profili dell'utente
        user.profiles.push(newProfile._id);
        await user.save();

        res.status(201).json(newProfile);
    } catch (error) {
        res.status(400).json({ message: "Errore nella creazione profilo" });
    }
});

// ✅ Ottenere un singolo profilo di un utente
router.get("/:profileId", async (req, res) => {
    try {
        const profile = await Profile.findOne({ _id: req.params.profileId, userId: req.params.id });
        if (!profile) return res.status(404).json({ message: "Profilo non trovato" });
        res.json(profile);
    } catch (error) {
        res.status(500).json({ message: "Errore nel recupero profilo" });
    }
});

router.put("/:profileId", async (req, res) => {
    try {
        const {
            profileImage,
            nickname
        } = req.body;
        const updatedProfile = await Profile.findByIdAndUpdate(
            req.params.profileId,
            {
                profileImage,
                nickname}
        );
        if (!updatedProfile) return res.status(404).json({ message: "Utente non trovato" });
        res.json(updatedProfile);
    } catch (error) {
        res.status(400).json({ message: "Errore nell'aggiornamento utente" });
    }
});
// ✅ Eliminare un profilo di un utente
router.delete("/:profileId", async (req, res) => {
    try {
        const profile = await Profile.findOneAndDelete({ _id: req.params.profileId, userId: req.params.id });
        if (!profile) return res.status(404).json({ message: "Profilo non trovato" });

        // ✅ Rimuovere il profilo dall'array dell'utente
        await User.findByIdAndUpdate(req.params.id, { $pull: { profiles: req.params.profileId } });

        res.json({ message: "Profilo eliminato con successo" });
    } catch (error) {
        res.status(500).json({ message: "Errore nella cancellazione profilo" });
    }
});

export default router;
