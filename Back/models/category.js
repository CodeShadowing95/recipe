const mongoose = require("mongoose");


const categorySchema = new mongoose.Schema({
    name: { type: String, required: true, unique: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'Membre', required: true }
});
module.exports = mongoose.model('Category', categorySchema);