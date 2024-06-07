const express = require('express');
const router = express.Router();
const ingredientController = require('../controllers/ingredientController');
const ingredientService = require('../services/ingredientService');


router.get('/', ingredientController.getAllIngredients);
router.get('/:id', ingredientController.getIngredientById);
router.post('/', ingredientController.createIngredient);
router.put('/:id', ingredientController.updateIngredient);
router.delete('/:id', ingredientController.deleteIngredient);
// Route pour ajouter un ingrédient à une recette
// router.post('/:recipeId/ingredients/:ingredientId', ingredientController.addIngredientToRecipe);
router.post('/recipe', ingredientController.addIngredientToRecipe);
router.get('/recipe/:recipeId', ingredientController.getIngredientsByRecipeId);


module.exports = router;
