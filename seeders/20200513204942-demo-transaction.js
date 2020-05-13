/* eslint-disable no-unused-vars */
"use strict";

module.exports = {
	up: async (queryInterface, Sequelize) => {
		const [firstUser] = await queryInterface.sequelize.query(
			"SELECT id FROM Users"
		);
		const { id } = firstUser;
		return queryInterface.bulkInsert(
			"Transactions",
			[
				{
					purpose: "Rent",
					amount: "800.00",
					note: "Rent for May",
					UserId: id,
					createdAt: new Date(),
					updatedAt: new Date(),
				},
				{
					purpose: "Food",
					amount: "60.00",
					note: "Pizza Party",
					UserId: id,
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
