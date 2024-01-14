module.exports = (sequelize, Sequelize) => {
	const Status = sequelize.define(
		'Status',
		{
			status: {
				type: Sequelize.DataTypes.STRING,

				allowNull: false,
			},
		},
		{
			timestamps: false,
		}
	);

	return Status;
};

