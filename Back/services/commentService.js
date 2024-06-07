const Comment = require('../models/comment');

async function getAllComments() {
    return await Comment.find();
}

async function getCommentsByRecipeId(recipeId) {
    return await Comment.find({ idRecipe: recipeId })
    .populate('author', 'firstname lastname');
}

async function getCommentById(commentId) {
    return await Comment.findById(commentId);
}

async function createComment(commentData) {
    return await Comment.create(commentData);
}

async function updateComment(commentId, commentData) {
    return await Comment.findByIdAndUpdate(commentId, commentData, { new: true });
}

async function deleteComment(commentId) {
    return await Comment.findByIdAndDelete(commentId);
}

module.exports = {
    getAllComments,
    getCommentsByRecipeId,
    getCommentById,
    createComment,
    updateComment,
    deleteComment
};
