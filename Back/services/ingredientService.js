const Ingredient = require('../models/ingredient');
const IngredientRecipe = require('../models/ingredientRecipe');

async function getAllIngredients() {
    return await Ingredient.find();
}

async function getIngredientById(id) {
    return await Ingredient.findById(id);
}

async function createIngredient(name) {
    return await Ingredient.create({ name });
}

async function updateIngredient(id, name) {
    return await Ingredient.findByIdAndUpdate(id, { name }, { new: true });
}

async function deleteIngredient(id) {
    await IngredientRecipe.deleteMany({ idIngredient: id }); // Supprime d'abord les entrées correspondantes dans la table d'association
    return await Ingredient.findByIdAndDelete(id);
}

// async function addIngredientToRecipe(recipeId, ingredientId, unit, quantity) {
//     return await IngredientRecipe.create({
//         idRecipe: recipeId,
//         idIngredient: ingredientId,
//         unit: unit,
//         quantity: quantity
//     });
// }
async function addIngredientToRecipe(recipeId, ingredientId, unit, quantity) {
    // Vérifiez si l'ingrédient est déjà associé à la recette
    const existingIngredient = await IngredientRecipe.findOne({ idRecipe: recipeId, idIngredient: ingredientId });

    if (existingIngredient) {
        throw new Error('Cet ingrédient est déjà associé à la recette.');
    }

    // Créez une nouvelle entrée dans la table IngredientRecipe
    const newIngredient = new IngredientRecipe({
        idRecipe: recipeId,
        idIngredient: ingredientId,
        unit: unit,
        quantity: quantity
    });

  // Enregistrez la nouvelle entrée dans la base de données
  await newIngredient.save();

  return newIngredient;
}

async function getIngredientsByRecipe(recipeId) {
    return await IngredientRecipe.find({ idRecipe: recipeId })
    .populate('idIngredient', 'name');
}


module.exports = {
    getAllIngredients,
    getIngredientById,
    createIngredient,
    updateIngredient,
    deleteIngredient,
    addIngredientToRecipe,
    getIngredientsByRecipe
};
