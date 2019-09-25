const mongoose = require("mongoose");
module.exports = mongoose.model("notes", new mongoose.Schema({
    title: { type: String, trim: true, required: true },
    description: { type: String, trim: true, required: true },
    images: [{ type: mongoose.Schema.Types.ObjectId, ref: "images" }],
    flag: { type: String, enum: ["public", "private"], required: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "users" },
}));