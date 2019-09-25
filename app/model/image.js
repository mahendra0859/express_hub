const mongoose = require("mongoose");
module.exports = mongoose.model("images", new mongoose.Schema({
    // image: Buffer,
    image: String,
    contentType: String
}, { timestamps: true }));