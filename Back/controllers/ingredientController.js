const ingredientService = require('../services/ingredientService');

async function getAllIngredients(req, res) {
    try {
        const ingredients = await ingredientService.getAllIngredients();
        res.json(ingredients);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

async function getIngredientById(req, res) {
    const ingredientId = req.params.id;
    try {
        const ingredient = await ingredientService.getIngredientById(ingredientId);
        if (!ingredient) {
            res.status(404).json({ error: 'Ingredient not found' });
            return;
        }
        res.json(ingredient);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

async function createIngredient(req, res) {
    const { name } = req.body;
    try {
        const newIngredient = await ingredientService.createIngredient(name);
        res.status(201).json(newIngredient);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

async function updateIngredient(req, res) {
    const ingredientId = req.params.id;
    const { name } = req.body;
    try {
        const updatedIngredient = await ingredientService.updateIngredient(ingredientId, name);
        res.json(updatedIngredient);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

async function deleteIngredient(req, res) {
    const ingredientId = req.params.id;
    try {
        await ingredientService.deleteIngredient(ingredientId);
        res.json({ message: 'Ingredient deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}
async function addIngredientToRecipe(req, res) {
    const { recipeId, ingredientId, unit, quantity } = req.body;
    
    try {
        const result = await ingredientService.addIngredientToRecipe(recipeId, ingredientId, unit, quantity);
        res.status(201).json(result);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

async function getIngredientsByRecipeId(req, res) {
    const recipeId = req.params.recipeId;
    try {
        const ingredients = await ingredientService.getIngredientsByRecipe(recipeId);
        res.json(ingredients);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}




module.exports = {
    getAllIngredients,
    getIngredientById,
    createIngredient,
    updateIngredient,
    deleteIngredient,
    addIngredientToRecipe,
    getIngredientsByRecipeId
};
