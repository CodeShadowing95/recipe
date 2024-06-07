const Category = require('../models/category');

async function getAllCategories() {
    return await Category.find();
}

async function getCategoryById(id) {
    return await Category.findById(id);
}

async function createCategory(categoryData) {
    return await Category.create(categoryData);
}

async function updateCategory(id, categoryData) {
    return await Category.findByIdAndUpdate(id, categoryData, { new: true });
}

async function deleteCategory(id) {
    return await Category.findByIdAndDelete(id);
}

module.exports = {
    getAllCategories,
    getCategoryById,
    createCategory,
    updateCategory,
    deleteCategory
};
