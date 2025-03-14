const express = require("express");
const router = express.Router();
const Message = require("../models/message");

// Route pour récupérer tous les logs
router.get("/", async (req, res) => {
    try {
        const logs = await Message.find();
        res.json(logs);
    } catch (error) {
        res.status(500).json({ error: "Erreur lors de la récupération des logs" });
    }
});

// Route pour ajouter un message
router.post("/", async (req, res) => {
    try {
        const newLog = new Message(req.body);
        await newLog.save();
        res.status(201).json(newLog);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Route pour supprimer un log
router.delete("/:id", async (req, res) => {
    try {
        const logId = req.params.id;
        const deletedLog = await Message.findOneAndDelete({ id: logId });
        if (!deletedLog) {
            return res.status(404).json({ message: "Log non trouvé" });
        }
        res.status(200).json({ message: "Log supprimé avec succès" });
    } catch (err) {
        res.status(500).json({ error: "Erreur lors de la suppression du log" });
    }
});

module.exports = router;