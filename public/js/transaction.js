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
			console.log("NEWWWW", newTransaction);
			// go back to dashboard
			console.log("transaction added");
		} catch (err) {
			console.log(err);
		}
	}

	transactionForm.on("submit", async function (event) {
		event.preventDefault();
		const transactionData = {
			purpose: purposeInput.val().trim(),
			amount: amountInput.val().trim(),
			note: noteInput.val().trim(),
			UserId: await getUserId(),
		};
		console.log(transactionData);
		// console.log("USER");
		const { purpose, amount, note, UserId } = transactionData;

		if (!purpose || !amount) {
			return;
		}
		addTransaction(purpose, amount, note, UserId);
		purposeInput.val("");
		amountInput.val("");
		noteInput.val("");
	});
	// This file just does a GET request to figure out which user is logged in
	// and updates the HTML on the page
	$.get("/api/user_data").then(function (data) {
		$(".member-name").text(data.email);
	});
});
