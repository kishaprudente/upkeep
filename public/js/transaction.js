const dashB = new Dashboard();

$(document).ready(function () {
	const transactionForm = $("form.transaction");
	const amountInput = $("input#amount");
	const noteInput = $("textarea#note");
	const purposeDropdown = $(".dropdown-content");
	const purposeChoice = $("#active-purpose");
	const transactionList = $(".transactions-list");

	function renderPurposes() {
		const purposeArray = [
			"Rent",
			"Food",
			"Utilities",
			"Savings",
			"Personal",
			"Miscellaneous",
		];
		purposeArray.forEach((purposeTitle) => {
			const newPurposeDiv = $("<div>");
			newPurposeDiv.attr("class", "dropdown-item");
			const purpose = $("<p>");
			purpose.text(purposeTitle);
			newPurposeDiv.append(purpose);
			purposeDropdown.append(newPurposeDiv);
			const newHr = $("<hr>").attr("class", "dropdown-divider");
			purposeDropdown.append(newHr);
		});
	}

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

	// add function to get transaction
	async function renderTransactions() {
		transactionList.empty();
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

	async function renderInitialUnusedValue() {
		try {
			const userBudget = await dashB.getBudget();
			console.log("userbudget", userBudget);
			const { total } = userBudget[0];
			outerDonut.data.datasets[1].data[6] = total;
		} catch (err) {
			throw err;
		}
	}

	// set inner doughnut values
	// 0rent, 1food, 2utilities, 3savings, 4personal, 5misc, 6unused
	// get totals
	async function renderInnerDoughnutValues() {
		renderInitialUnusedValue();
		const totals = await dashB.addTotals();
		let index = 0;
		totals.forEach((value) => {
			outerDonut.data.datasets[1].data[index] = value;
			outerDonut.data.datasets[1].data[6] -= value;
			index++;
		});
		outerDonut.update();
	}

	function init() {
		renderInnerDoughnutValues();
		renderTransactions();
		renderPurposes();
	}

	init();
	transactionList.on("click", async (event) => {
		try {
			console.log(event.target);
			if (event.target.matches("button")) {
				var transactionId = $(event.target).parent().parent().attr("data-id");
				console.log(transactionId);
				await $.ajax({
					method: "DELETE",
					url: "/api/transactions/" + transactionId,
				});
				console.log("Transaction deleted");
				location.reload();
			}
		} catch (err) {
			throw err;
		}
	});

	$(".dropdown-content").on("click", (event) => {
		console.log(event.target);
		if (event.target.matches("p")) {
			purposeChoice.text(event.target.textContent);
		}
	});

	transactionForm.on("submit", async function (event) {
		event.preventDefault();
		const userid = await getUserId();
		console.log(userid);

		const transactionData = {
			purpose: purposeChoice.text().trim(),
			amount: amountInput.val().trim(),
			note: noteInput.val().trim(),
			UserId: userid,
		};
		console.log("TRANSACTION DATA", transactionData);
		const { purpose, amount, note, UserId } = transactionData;

		if (purpose === "Purpose" || !amount) {
			return;
		}
		addTransaction(purpose, amount, note, UserId);
		purposeChoice.text("Purpose");
		amountInput.val("");
		noteInput.val("");
		renderInnerDoughnutValues();
		renderTransactions();
	});
});
