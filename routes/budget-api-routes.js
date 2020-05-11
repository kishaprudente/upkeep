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
        include: [db.User],
      });
      res.json(allBudgets);
    } catch {
      throw new Error("Oh no! Cannot get all the budgets :(");
    }
  });
  // get - /api/budgets/:id -> getting a single budget
  app.get("/api/budgets/:id", async (req, res) => {
    try {
      const oneBudget = await db.Budget.findOne({
        where: {
          id: req.params.id,
        },
        include: [db.User],
      });
      res.json(oneBudget);
    }
  });
  // post - /api/budgets
  // delete - /api/budgets/:id
  // put - /api/budgets/:id
};
