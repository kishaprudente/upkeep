module.exports = function (sequelize, DataTypes) {
	const Transaction = sequelize.define("Transaction", {
		purpose: DataTypes.STRING,
		amount: {
			type: DataTypes.DECIMAL,
			allowNull: false,
			validate: {
				isNumeric: true,
			},
		},
		note: DataTypes.TEXT,
	});

	Transaction.associate = function (models) {
		Transaction.belongsTo(models.Budget, {
			foreignKey: {
				allowNull: true,
			},
		});
		Transaction.belongsTo(models.User, {
			foreignKey: {
				allowNull: false,
			},
		});
	};

	return Transaction;
};
