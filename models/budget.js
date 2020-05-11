module.exports = function (sequelize, DataTypes) {
	const Budget = sequelize.define("Budget", {
		balance: {
			type: DataTypes.DECIMAL,
			allowNull: false,
			validate: {
				isNumeric: true,
			},
		},
		month: DataTypes.STRING,
	});

	Budget.associate = function (models) {
		Budget.hasMany(models.Transaction, {
			onDelete: "CASCADE",
		});
		Budget.belongsTo(models.User, {
			foreignKey: {
				allowNull: false,
			},
		});
	};

	return Budget;
};
