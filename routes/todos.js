var express = require('express');
var jsend = require('jsend');
var router = express.Router();
var db = require("../models");
const isAuth = require('../middleware/middleware');
const TodoService = require('../services/ToDoService');
const todoService = new TodoService(db);
router.use(jsend.middleware);

/* Return all the logged in users todo's with the category associated with each todo and
status that is not the deleted status */
router.get('/', isAuth, async (req, res) => {
    try {
        const userId = req.user.id;
        const todos = await todoService.getUserTodos(userId);
        res.jsend.success({
            data: {
                statusCode: 200,
                result: todos
            }
        });
    } catch (error) {
        console.error(error);
        res.status(500).jsend.error({
            status: "error",
            result: error.message
        });
    }
});

// Return all the users todos including todos with a deleted status
router.get('/all', isAuth, async (req, res) => {
    try {
        const userId = req.user.id;
        const todos = await todoService.getAllUserTodos(userId);
        res.jsend.success({ todos });
    } catch (error) {
        console.error(error);
        res.status(500).jsend.error({
            message: 'An error occurred while fetching all todos',
            error: error.message
        });
    }
});

// Return all the todos with the deleted status
router.get('/deleted', isAuth, async (req, res) => {
    try {
        const userId = req.user.id;
        const deletedTodos = await todoService.getDeletedTodos(userId);
        res.jsend.success({ todos: deletedTodos });
    } catch (error) {
        console.error(error);
        res.status(500).jsend.error({
            message: 'An error occurred while fetching deleted todos',
            error: error.message
        });
    }
});

// Add a new todo with their category for the logged in user
router.post('/', isAuth, async (req, res) => {
    const { name, description, CategoryId, StatusId } = req.body;
    const UserId = req.user.id;
    try {
        const newTodo = await todoService.addTodo(name, description, CategoryId, UserId);
        res.jsend.success({ message: 'Todo added successfully', todo: newTodo });
    } catch (error) {
		console.error(error);
        res.status(500).jsend.error({
            message: 'An error occurred while adding the todo',
            error: error.message
        });
    }
});

// Change/update a specific todo for logged in user
router.put('/:id', isAuth, async (req, res) => {
    const todoId = req.params.id;
    const UserId = req.user.id;
    const updateData = req.body;
    try {
        const updatedTodo = await todoService.updateTodoById(todoId, UserId, updateData);
        if (!updatedTodo) {
            return res.status(404).jsend.fail({ message: 'Todo not found or not owned by user' });
        }
        res.jsend.success({ message: 'Todo updated successfully', todo: updatedTodo });
    } catch (error) {
        console.error(error);
        res.status(500).jsend.error({
            message: 'An error occurred while updating the todo',
            error: error.message
        });
    }
});

// Delete a specific todo if for the logged in user
router.delete('/:id', isAuth, async (req, res) => {
    const todoId = req.params.id;
    const UserId = req.user.id;
    try {
        const result = await todoService.markTodoAsDeleted(todoId, UserId);
        if (!result) {
            return res.status(404).jsend.fail({ message: 'Todo not found or not owned by user' });
        }
        res.jsend.success({ message: 'Todo marked as deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).jsend.error({
            message: 'An error occurred while marking the todo as deleted',
            error: error.message
        });
    }
});

module.exports = router;

