const { Op } = require('sequelize');


class TodoService {
    constructor(db) {
        this.db = db;
    }

    async addTodo(name, description, CategoryId, UserId) {
        return this.db.Todo.create({
            name,
            description,
            CategoryId,
            StatusId: 1,
            UserId
        });
    }

    async getUserTodos(userId) {
        return this.db.Todo.findAll({
            where: { 
                UserId: userId,
                StatusId: { [Op.not]: 3 }
            },
            include: [
                { model: this.db.Category, as: 'Category' },
                { model: this.db.Status, as: 'Status' }
            ]
        });
    }

    async getAllUserTodos(userId) {
        return this.db.Todo.findAll({
            where: { UserId: userId },
            include: [
                { model: this.db.Category, as: 'Category' },
                { model: this.db.Status, as: 'Status' }
            ]
        });
    }

    async getDeletedTodos() {
        return this.db.Todo.findAll({
            where: {
                UserId: userId,
                StatusId: 3
            },
            include: [
                { model: this.db.Category, as: 'Category' },
                { model: this.db.Status, as: 'Status' }
            ]
        });
    }

    async updateTodoById(todoId, userId, updateData) {
        const todo = await this.db.Todo.findOne({
            where: { id: todoId, UserId: userId }
        });
        if (!todo) {
            return null;
        }
        return await todo.update(updateData);
    }

    async markTodoAsDeleted(todoId, userId) {
        const todo = await this.db.Todo.findOne({
            where: { id: todoId, UserId: userId }
        });
        if (!todo) {
            return null;
        }
        return await todo.update({ StatusId: 3 });
    }
}

module.exports = TodoService;