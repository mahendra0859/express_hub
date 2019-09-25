const mongoose = require("mongoose");
module.exports = mongoose.model("images", new mongoose.Schema({
    image: Buffer,
    contentType: String
}, { timestamps: true }));