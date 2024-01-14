var express = require('express');
var jsend = require('jsend');
var router = express.Router();
var db = require("../models");
const isAuth = require('../middleware/middleware');
const CategoryService = require('../services/CategoryService');
const categoryService = new CategoryService(db);
router.use(jsend.middleware);



//Add new categories
router.post('/', isAuth, async (req, res) => {
    try {
        const { name } = req.body;
        const UserId = req.user.id;
        if (!name) {
            return res.status(400).jsend.fail({ message: "Category name is required" });
        }
        const newCategory = await categoryService.addCategory(name, UserId);
        res.jsend.success({ message: 'Category added successfully', category: newCategory });
    } catch (error) {
        console.error(error);
        res.status(500).jsend.error({
            message: 'An error occurred while adding the category',
            error: error.message
        });
    }
});

// Get all categories for the logged-in user
router.get('/', isAuth, async (req, res) => {
    try {
        const UserId = req.user.id;
        const categories = await categoryService.getCategories(UserId);
        res.jsend.success({ categories });
    } catch (error) {
        console.error(error);
        res.status(500).jsend.error({
            message: 'An error occurred while fetching categories',
            error: error.message
        });
    }
});

// Update a specific category
router.put('/:id', isAuth, async (req, res) => {
    const categoryId = req.params.id;
    const { name } = req.body;
    const UserId = req.user.id;
    try {
        if (!name) {
            return res.status(400).jsend.fail({ message: "Category name is required" });
        }
        const updatedCategory = await categoryService.updateCategory(categoryId, { name, UserId });
        if (!updatedCategory) {
            return res.status(404).jsend.fail({ message: 'Category not found or not updated' });
        }
        res.jsend.success({ message: 'Category updated successfully', category: updatedCategory });
    } catch (error) {
        console.error(error);
        res.status(500).jsend.error({
            message: 'An error occurred while updating the category',
            error: error.message
        });
    }
});

// Delete a specific category
router.delete('/:id', isAuth, async (req, res) => {
    const categoryId = req.params.id;
    const UserId = req.user.id;
    try {
        const result = await categoryService.deleteCategory(categoryId, UserId);
        if (result.status === 'not_found') {
            return res.status(404).jsend.fail({ message: 'Category not found' });
        }
        if (result.status === 'has_todos') {
            return res.status(400).jsend.fail({ message: 'Category cannot be deleted as it is assigned to todos' });
        }
        res.jsend.success({ message: 'Category deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).jsend.error({
            message: 'An error occurred while deleting the category',
            error: error.message
        });
    }
});

module.exports = router;