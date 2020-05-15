$(document).ready(function () {
	const transactionForm = $("form.transaction");
	const amountInput = $("input#amount");
	const noteInput = $("textarea#note");
	const purposeDropdown = $(".dropdown-content");
	const purposeChoice = $("#active-purpose");

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

	// add function to delete transaction

	renderPurposes();
	$(".dropdown-content").on("click", (event) => {
		console.log(event.target);
		if (event.target.matches("p")) {
			purposeChoice.text(event.target.textContent);
		}
	});
});
