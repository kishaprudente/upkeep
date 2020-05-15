const dashB = new Dashboard();

$(document).ready(function () {
	const transactionForm = $("form.transaction");
	const purposeInput = $("input#purpose");
	const amountInput = $("input#amount");
	const noteInput = $("textarea#note");
	const transactionList = $(".transactions-list");

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

	// add function to get transaction
	async function renderTransactions() {
		const allTransactions = await dashB.getTransactions();
		console.log("ALL TRANS", allTransactions);
		allTransactions.forEach((transaction) => {
			const transContainer = $("<div>");
			transContainer.addClass("card");
			transContainer.attr("data-id", transaction.id);

			const transCardHeader = $("<div>");
			transCardHeader.addClass("card-header");
			const transTitle = $("<p>");
			transTitle.addClass("card-header-title");
			transTitle.text(transaction.purpose);

			const transAmount = $("<p>");
			transAmount.addClass("subtitle");
			transAmount.text("$" + transaction.amount);

			const transCardContent = $("<div>");
			transCardContent.addClass("card-content");
			const transNote = $("<div>");
			transNote.addClass("content");
			transNote.text(transaction.note);

			const transFooter = $("<footer>");
			transFooter.addClass("card-footer");
			const deleteTransBtn = $("<button>");
			deleteTransBtn.attr("id", "delete-transaction");
			deleteTransBtn.addClass("card-footer-item");
			deleteTransBtn.text("Delete");

			transCardHeader.append(transTitle);
			transCardHeader.append(transAmount);
			transCardContent.append(transNote);
			transFooter.append(deleteTransBtn);
			transContainer.append(transCardHeader);
			transContainer.append(transCardContent);
			transContainer.append(transFooter);
			transactionList.append(transContainer);
		});
	}
	renderTransactions();

	// add function to delete transaction
});
