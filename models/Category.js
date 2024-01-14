module.exports = (sequelize, Sequelize) => {
	const Category = sequelize.define(
		'Category',
		{
			name: {
				type: Sequelize.DataTypes.STRING,

				allowNull: false,
			},
		},
		{
			timestamps: false,
		}
	);
	Category.associate = function (models) {
		Category.belongsTo(models.User, { foreignKey: { allowNull: false } });
		Category.hasMany(models.Todo, { as: 'todos', foreignKey: 'CategoryId' });
	};
	return Category;
};

