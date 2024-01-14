class CategoryService {
    constructor(db) {
        this.db = db;
    }

    async addCategory(name, UserId) {
        return this.db.Category.create({ name, UserId });
    }

    async getCategories(UserId) {
        return this.db.Category.findAll({
            where: { UserId }
        });
    }

    async updateCategory(categoryId, updateData) {
        const category = await this.db.Category.findByPk(categoryId);
        if (!category) {
            return null;
        }

        return await category.update(updateData);
    }

    async deleteCategory(categoryId, UserId) {
        const category = await this.db.Category.findOne({
            where: { id: categoryId, UserId },
            include: [{
                model: this.db.Todo,
                as: 'todos',
            }]
        });

        if (!category) {
            return { status: 'not_found' };
        }

        if (category.todos && category.todos.length > 0) {
            return { status: 'has_todos' };
        }

        await category.destroy();
        return { status: 'deleted' };
    }
}

module.exports = CategoryService;