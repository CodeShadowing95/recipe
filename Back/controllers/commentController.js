const commentService = require('../services/commentService');

async function getAllComments(req, res) {
    try {
        const comments = await commentService.getAllComments();
        res.json(comments);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

async function getCommentsByRecipeId(req, res) {
    const recipeId = req.params.recipeId;
    try {
        const comments = await commentService.getCommentsByRecipeId(recipeId);
        res.json(comments);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

async function getCommentById(req, res) {
    const commentId = req.params.id;
    try {
        const comment = await commentService.getCommentById(commentId);
        res.json(comment);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

async function createComment(req, res) {
    const commentData = req.body;
    try {
        const newComment = await commentService.createComment(commentData);
        res.status(201).json(newComment);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

async function updateComment(req, res) {
    const commentId = req.params.id;
    const commentData = req.body;
    try {
        const updatedComment = await commentService.updateComment(commentId, commentData);
        res.json(updatedComment);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

async function deleteComment(req, res) {
    const commentId = req.params.id;
    try {
        await commentService.deleteComment(commentId);
        res.json({ message: 'Comment deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

module.exports = {
    getAllComments,
    getCommentsByRecipeId,
    getCommentById,
    createComment,
    updateComment,
    deleteComment
};
