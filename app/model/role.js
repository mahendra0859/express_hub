const mongoose = require("mongoose");
module.exports = mongoose.model("roles", new mongoose.Schema({
    role: { type: String, enum: ["ADMIN", "SUPERVISOR", "USER"], required: true, unique: true },
}));