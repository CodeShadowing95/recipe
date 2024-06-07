const recipeService = require('../services/recipeService');

async function getAllRecipes(req, res) {
    try {
        const recipes = await recipeService.getAllRecipes();
        res.json(recipes);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

async function getRecipesByCategoryId(req, res) {
    const categoryId = req.params.categoryId;
    try {
        const recipes = await recipeService.getRecipesByCategoryId(categoryId);
        res.json(recipes);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

async function getRecipeById(req, res) {
    const recipeId = req.params.id;
    try {
        const recipe = await recipeService.getRecipeById(recipeId);
        if (!recipe) {
            res.status(404).json({ error: 'Recipe not found' });
            return;
        }
        res.json(recipe);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

async function createRecipe(req, res) {
    const recipeData = req.body;
    try {
        const newRecipe = await recipeService.createRecipe(recipeData);
        res.status(201).json(newRecipe);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

async function updateRecipe(req, res) {
    const recipeId = req.params.id;
    const recipeData = req.body;
    try {
        const updatedRecipe = await recipeService.updateRecipe(recipeId, recipeData);
        res.json(updatedRecipe);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

async function deleteRecipe(req, res) {
    const recipeId = req.params.id;
    try {
        await recipeService.deleteRecipe(recipeId);
        res.json({ message: 'Recipe deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

module.exports = {
    getAllRecipes,
    getRecipesByCategoryId,
    getRecipeById,
    createRecipe,
    updateRecipe,
    deleteRecipe
};
