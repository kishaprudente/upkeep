/* eslint-disable no-unused-vars */
"use strict";

module.exports = {
	up: (queryInterface, Sequelize) => {
		return queryInterface.bulkInsert(
			"Transactions",
			[
				{
					purpose: "Rent",
					amount: "800.00",
					note: "Rent for May",
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
