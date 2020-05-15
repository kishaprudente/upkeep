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
	});

	// add function to get transaction
	async function renderTransactions() {
		const allTransactions = await dashB.getTransactions();
		console.log("ALL TRANS", allTransactions);
		allTransactions.forEach((transaction) => {
			const transContainer = $("<div>");
			transContainer.addClass("card");
			transContainer.attr("data-id", transaction.id);
			

			const transCardHeader = $("<header>");
			transCardHeader.addClass("card-header");
			transCardHeader.addClass(transaction.purpose);
			const transTitle = $("<p>");
			transTitle.addClass("card-header-title");
			transTitle.attr("id", "titleCard");
			var numberWithCommas = (transaction.amount).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
			transTitle.text(transaction.purpose + ": $" + numberWithCommas);

			// const transAmount = $("<p>");
			// transAmount.addClass("subtitle");
			// transAmount.attr("")
			// transAmount.text("$" + transaction.amount);

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
			// transCardHeader.append(transAmount);
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

	renderPurposes();
	$(".dropdown-content").on("click", (event) => {
		console.log(event.target);
		if (event.target.matches("p")) {
			purposeChoice.text(event.target.textContent);
		}
	});
});
