const mongoose = require("mongoose"), hash = require("bcrypt").hash;
module.exports = mongoose.model("users", new mongoose.Schema({
    username: { type: String, trim: true, lowercase: true, unique: true, required: true },
    password: { type: String, trim: true, required: true },
    role: { type: mongoose.Schema.Types.ObjectId, ref: "roles", required: true },
    notes: [{ type: mongoose.Schema.Types.ObjectId, ref: "notes" }]
}, { timestamps: true }).pre("save", function (next) {
    let user = this;
    hash(user.password, 10, (err, hash) => {
        if (err) next(err)
        else {
            user.password = hash;
            next();
        }
    });
}));