module.exports = function (sequelize, DataTypes) {
	var Budget = sequelize.define("Budget", {
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
	};

	return Budget;
};
