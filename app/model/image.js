const mongoose = require("mongoose");
module.exports = mongoose.model("images", new mongoose.Schema({
    image: Buffer,
    name: String,
    // image: String,
    contentType: String
}, { timestamps: true }).pre("save", function (next) {
    this.name = `data:${this.contentType};base64,${new Buffer.from(this.image).toString('base64')}`;
    next();
}));