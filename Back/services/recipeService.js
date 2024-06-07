const Recipe = require('../models/recipe');

async function getAllRecipes() {
    return await Recipe.find();
}

async function getRecipesByCategoryId(categoryId) {
    return await Recipe.find({ idCategory: categoryId })
    .populate("idMembre", "firstname lastname")
    .populate("idCategory", "name");
}

async function getRecipeById(recipeId) {
    return await Recipe.findById(recipeId);
}

async function createRecipe(recipeData) {
    return await Recipe.create(recipeData);
}

async function updateRecipe(recipeId, recipeData) {
    return await Recipe.findByIdAndUpdate(recipeId, recipeData, { new: true });
}

async function deleteRecipe(recipeId) {
    return await Recipe.findByIdAndDelete(recipeId);
}

module.exports = {
    getAllRecipes,
    getRecipesByCategoryId,
    getRecipeById,
    createRecipe,
    updateRecipe,
    deleteRecipe
};
