const db = require("../models");

module.exports = (app) => {
	// get all transactions
	app.get("/api/transactions", async (req, res) => {
		try {
			const query = {};
			if (req.query.user_id) {
				query.UserId = req.query.user_id;
			}
			const allTransactions = await db.Transaction.findAll({
				where: query,
				include: [db.User, db.Budget],
			});
			res.json(allTransactions);
		} catch (err) {
			throw new Error("Unable to get all transaction data.");
		}
	});
};
