const mongoose = require("mongoose");

const membreSchema = mongoose.Schema({
  avatar: { type: String, default: 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png' },
  firstname: { type: String, required: true },
  lastname: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  registrationDate: { type: Date, default: new Date().toISOString() },
});

module.exports = mongoose.model('Membre', membreSchema);