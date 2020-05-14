/* eslint-disable indent */
class Dashboard {
	async getUserId() {
		try {
			const thisUser = await $.get("/api/user_data");
			console.log("USER ", thisUser);
			console.log("USER ID: ", thisUser.id);
			return thisUser.id;
		} catch (err) {
			throw err;
		}
	}

	async getTransactions() {
		try {
			const user = await this.getUserId();
			const allTransactions = await $.get("/api/transactions/");
			const userTransactions = allTransactions.filter(
				(transaction) => transaction.UserId === user
			);
			console.log(userTransactions);
			return userTransactions;
		} catch {
			throw new Error("Cant get all transactions");
		}
	}

	// rent, food, utilities, savings, personal, miscellaneous
	async addTotals() {
		const transactions = await this.getTransactions();
		console.log(transactions);
		let rent = 0;
		let food = 0;
		let utils = 0;
		let savings = 0;
		let personal = 0;
		let misc = 0;
		console.log(rent);
		transactions.forEach((transaction) => {
			// eslint-disable-next-line default-case
			if (transaction.purpose === "Food") {
				food += parseInt(transaction.amount);
			}
			if (transaction.purpose === "Rent") {
				rent += parseInt(transaction.amount);
			}
			if (transaction.purpose === "Utilities") {
				utils += parseInt(transaction.amount);
			}
			if (transaction.purpose === "Savings") {
				savings += parseInt(transaction.amount);
			}
			if (transaction.purpose === "Personal") {
				personal += parseInt(transaction.amount);
			}
			if (transaction.purpose === "Miscellaneous") {
				misc += parseInt(transaction.amount);
			}
		});
		return [rent, food, utils, savings, personal, misc];
	}
}

// export default Dashboard;
