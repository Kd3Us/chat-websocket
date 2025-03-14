const mongoose = require("mongoose");

const chatLogSchema = new mongoose.Schema({
    id: { type: String, required: [true, "L'ID est requis"] },
    name: { type: String, required: [true, "Le nom est requis"] },
    message: { type: String, required: [true, "Le message est requis"], minlength: 1 },
    date: { type: String, required: [true, "La date est requise"] },
    heure: { type: String, required: [true, "L'heure est requise"] },
});

module.exports = mongoose.model("Message", chatLogSchema)