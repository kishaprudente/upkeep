module.exports = function (sequelize, DataTypes) {
	const Budget = sequelize.define("Budget", {
		total: {
			type: DataTypes.DECIMAL,
			allowNull: false,
			validate: {
				isNumeric: true,
			},
		},
		rent: {
			type: DataTypes.DECIMAL,
			allowNull: true,
			validate: {
				isNumeric: true,
			},
		},
		food: {
			type: DataTypes.DECIMAL,
			allowNull: true,
			validate: {
				isNumeric: true,
			},
		},
		utilities: {
			type: DataTypes.DECIMAL,
			allowNull: true,
			validate: {
				isNumeric: true,
			},
		},
		savings: {
			type: DataTypes.DECIMAL,
			allowNull: true,
			validate: {
				isNumeric: true,
			},
		},
		personal: {
			type: DataTypes.DECIMAL,
			allowNull: true,
			validate: {
				isNumeric: true,
			},
		},
		miscellaneous: {
			type: DataTypes.DECIMAL,
			allowNull: true,
			validate: {
				isNumeric: true,
			},
		},
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
