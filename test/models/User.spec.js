// const { expect } = require("chai");
const {
	sequelize,
	dataTypes,
	checkModelName,
	// checkUniqueIndex,
	checkPropertyExists,
} = require("sequelize-test-helpers");
const UserModel = require("../../models/user");

describe("src/models/User", () => {
	const User = UserModel(sequelize, dataTypes);
	const user = new User();

	checkModelName(User)("User");
	describe("properties", () => {
		describe("should have properties 'firstName', 'lastName', 'email', 'password'", () => {
			const userData = ["firstName", "lastName", "email", "password"];
			// eslint-disable-next-line no-extra-semi
			userData.forEach(checkPropertyExists(user));
		});
	});
});
