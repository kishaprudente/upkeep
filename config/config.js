require("dotenv").config();

module.exports = {
	development: {
		username: "root",
		password: process.env.DB_PASSWORD,
		database: "upkeep_db",
		host: "127.0.0.1",
		dialect: "mysql",
		port: 3306,
	},
	test: {
		username: "root",
		password: process.env.DB_PASSWORD,
		database: "upkeep_test_db",
		host: "127.0.0.1",
		dialect: "mysql",
	},
	production: {
		username: "root",
		password: null,
		database: "database_production",
		host: "127.0.0.1",
		dialect: "mysql",
	},
};
