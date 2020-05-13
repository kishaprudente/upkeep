$(document).ready(function () {
	const transactionForm = $("form.transaction");
	const purposeInput = $("input#purpose");
	const amountInput = $("input#amount");
	const noteInput = $("textarea#note");

	async function getUserId() {
		try {
			const thisUser = await $.get("/api/user_data");
			console.log("USER ", thisUser);
			console.log("USER ID: ", thisUser.id);
			return thisUser.id;
		} catch (err) {
			throw err;
		}
	}

	async function addTransaction(purpose, amount, note, UserID) {
		try {
			const newTransaction = await $.post("/api/transactions", {
				purpose: purpose,
				amount: amount,
				note: note,
				UserId: UserID,
			});
			console.log(newTransaction);
			// go back to dashboard
			console.log("transaction added");
		} catch (err) {
			console.log(err);
		}
	}

	transactionForm.on("submit", async function (event) {
		event.preventDefault();
		const userid = await getUserId();
		console.log(userid);

		const transactionData = {
			purpose: purposeInput.val().trim(),
			amount: amountInput.val().trim(),
			note: noteInput.val().trim(),
			UserId: userid,
		};
		console.log("TRANSACTION DATA", transactionData);
		const { purpose, amount, note, UserId } = transactionData;

		if (!purpose || !amount) {
			return;
		}
		addTransaction(purpose, amount, note, UserId);
		purposeInput.val("");
		amountInput.val("");
		noteInput.val("");
	});

	// add function to update transaction

	// add function to delete transaction
});
