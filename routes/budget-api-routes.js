const db = require("../models");

module.exports = (app) => {
	// get - /api/budgets -> getting all budgets
	app.get("/api/budgets", async (req, res) => {
		try {
			let query = {};
			if (req.query.user_id) {
				query.UserId = req.quer.user_id;
			}
			const allBudgets = await db.Budget.findAll({
				where: query,
				include: [db.User, db.Transaction],
			});
			res.json(allBudgets);
		} catch {
			throw new Error("Cannot get all budgets");
		}
	});

	// get - /api/budgets/:id -> getting a single budget
	app.get("/api/budgets/:id", async (req, res) => {
		try {
			const oneBudget = await db.Budget.findOne({
				where: {
					id: req.params.id,
				},
				include: [db.User, db.Transaction],
			});
			res.json(oneBudget);
		} catch {
			throw new Error("Cannot get the budget");
		}
	});

	// post - /api/budgets
	app.post("/api/budgets", async (req, res) => {
		try {
			const newBudget = await db.Budget.create(req.body);
			res.json(newBudget);
		} catch (err) {
			res.status(401).json(err);
		}
	});

	// delete - /api/budgets/:id
	app.delete("/api/budgets/:id", async (req, res) => {
		try {
			const deleteBudget = await db.Budget.destroy({
				where: {
					id: req.params.id,
				},
			});
			res.json(deleteBudget);
		} catch {
			throw new Error("Cannot delete this budget");
		}
	});

	// put - /api/budgets/:id
	app.put("/api/budgets/:id", async (req, res) => {
		try {
			const updatedBudget = {
				total: req.body.total,
				rent: req.body.rent,
				food: req.body.food,
				utilities: req.body.utilities,
				savings: req.body.savings,
				personal: req.body.personal,
				miscellaneous: req.body.miscellaneous,
				UserId: req.body.UserId,
			};
			console.log("DB UPDATED", updatedBudget);
			const updateBudget = await db.Budget.update(updatedBudget, {
				where: {
					id: req.body.UserId,
				},
			});
			res.json(updateBudget);
		} catch {
			throw new Error("Cannot update this budget at id:" + req.params.id);
		}
	});
};
