// const { expect } = require("chai");
const {
	sequelize,
	dataTypes,
	checkModelName,
	// checkUniqueIndex,
	checkPropertyExists,
	// makeMockModels,
} = require("sequelize-test-helpers");
const TransactionModel = require("../../models/transaction");

describe("src/models/User", () => {
	const Transaction = TransactionModel(sequelize, dataTypes);
	const transaction = new Transaction();

	checkModelName(Transaction)("Transaction");
	describe("properties", () => {
		describe("should have properties 'purpose', 'amount' and 'note'", () => {
			const transactionData = ["purpose", "amount", "note"];
			// eslint-disable-next-line no-extra-semi
			transactionData.forEach(checkPropertyExists(transaction));
		});
	});

	// describe("associations", () => {
	// 	const mockModels = makeMockModels({ User });

	// 	const id = 1;
	// 	const data = {
	// 		firstName: "Foo",
	// 		lastName: "Bar",
	// 		email: "testo@fake.com",
	// 		password: "testo123",
	// 	};

	// 	const fakeUser = { id, ...data };

	// 	beforeEach(() => {
	// 		Transaction.associate({ fakeUser });
	// 	});

	// 	test("defined a belongsTo association with User", () => {
	// 		expect(Transaction.belongsTo).toHaveBeenCalledWith(fakeUser);
	// 	});
	// });
});
