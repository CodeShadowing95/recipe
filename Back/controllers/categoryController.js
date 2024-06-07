const categoryService = require('../services/categoryService');

async function getAllCategories(req, res) {
    try {
        const categories = await categoryService.getAllCategories();
        res.json(categories);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

async function getCategoryById(req, res) {
    const categoryId = req.params.id;
    try {
        const category = await categoryService.getCategoryById(categoryId);
        if (!category) {
            res.status(404).json({ error: 'Category not found' });
            return;
        }
        res.json(category);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

async function createCategory(req, res) {
    const categoryData = req.body;
    try {
        const newCategory = await categoryService.createCategory(categoryData);
        res.status(201).json(newCategory);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

async function updateCategory(req, res) {
    const categoryId = req.params.id;
    const categoryData = req.body;
    try {
        const updatedCategory = await categoryService.updateCategory(categoryId, categoryData);
        res.json(updatedCategory);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

async function deleteCategory(req, res) {
    const categoryId = req.params.id;
    try {
        await categoryService.deleteCategory(categoryId);
        res.json({ message: 'Category deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

module.exports = {
    getAllCategories,
    getCategoryById,
    createCategory,
    updateCategory,
    deleteCategory
};
