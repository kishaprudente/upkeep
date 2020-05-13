/* eslint-disable no-unused-vars */
"use strict";
const bcrypt = require("bcryptjs");

module.exports = {
	up: (queryInterface, Sequelize) => {
		return queryInterface.bulkInsert(
			"Users",
			[
				{
					firstName: "Kevin",
					lastName: "Wu",
					email: "kevin@test.com",
					password: bcrypt.hashSync("password", bcrypt.genSaltSync(10), null),
					createdAt: new Date(),
					updatedAt: new Date(),
				},
			],
			{}
		);
	},

	down: (queryInterface, Sequelize) => {
		return queryInterface.bulkDelete("Users", null, {});
	},
};
