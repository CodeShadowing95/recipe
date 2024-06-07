const mongoose = require("mongoose");

const recipeSchema = mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  picture: { type: String, required: true },
  creationDate: { type: Date, default: new Date().toISOString() },
  idCategory: { type: mongoose.Schema.Types.ObjectId, ref: 'Category', required: true },
  idMembre: {   type: mongoose.Schema.Types.ObjectId, ref: 'Membre', required: true  }
});

module.exports = mongoose.model('Recipe', recipeSchema);

 
