/* eslint-disable no-unused-vars */
"use strict";

module.exports = {
	up: (queryInterface, Sequelize) => {
		return queryInterface.bulkInsert(
			"Transactions",
			[
				{
					id: 1,
					purpose: "Rent",
					amount: "800.00",
					note: "Rent for May",
					UserId: 1,
					createdAt: new Date(),
					updatedAt: new Date(),
				},
				{
					id: 2,
					purpose: "Food",
					amount: "60.00",
					note: "Pizza Party",
					UserId: 1,
					createdAt: new Date(),
					updatedAt: new Date(),
				},
			],
			{}
		);
	},

	down: (queryInterface, Sequelize) => {
		return queryInterface.bulkDelete("Transactions", null, {});
	},
};
