const dashFunction = new Dashboard();
const saveBtn = $("button#saveButton");
const $rentValue = $("#rentValue");
const $foodValue = $("#foodValue");
const $utilitiesValue = $("#utilitiesValue");
const $savingsValue = $("#savingsValue");
const $personalValue = $("#personalValue");
const $miscellValue = $("#miscellValue");
const $budgetValue = $("#budgetValue");

async function renderOuterDonutValues() {
	const budgets = await dashFunction.getBudget();
	console.log("BUDGET", budgets);
	// let index = 0;
	budgets.forEach((budget) => {
		const rentR = budget.rent / 100;
		const rentP = Math.round((rentR + Number.EPSILON) * 100) / 100;
		const rent = Math.round(rentP * budget.total);

		const foodR = budget.food / 100;
		const foodP = Math.round((foodR + Number.EPSILON) * 100) / 100;
		const food = Math.round(foodP * budget.total);

		const utilsR = budget.utilities / 100;
		const utilsP = Math.round((utilsR + Number.EPSILON) * 100) / 100;
		const utils = Math.round(utilsP * budget.total);

		const savingsR = budget.savings / 100;
		const savingsP = Math.round((savingsR + Number.EPSILON) * 100) / 100;
		const savings = Math.round(savingsP * budget.total);

		const personalR = budget.personal / 100;
		const personalP = Math.round((personalR + Number.EPSILON) * 100) / 100;
		const personal = Math.round(personalP * budget.total);

		const miscR = budget.miscellaneous / 100;
		const miscP = Math.round((miscR + Number.EPSILON) * 100) / 100;
		const misc = Math.round(miscP * budget.total);

		outerDonut.data.datasets[0].data[
			outerDonut.data.datasets[0].data.length - 1
		] = budget.total;
		outerDonut.data.datasets[0].data[0] = rent;
		outerDonut.data.datasets[0].data[6] -= rent;
		outerDonut.data.datasets[0].data[1] = food;
		outerDonut.data.datasets[0].data[6] -= food;
		outerDonut.data.datasets[0].data[2] = utils;
		outerDonut.data.datasets[0].data[6] -= utils;
		outerDonut.data.datasets[0].data[3] = savings;
		outerDonut.data.datasets[0].data[6] -= savings;
		outerDonut.data.datasets[0].data[4] = personal;
		outerDonut.data.datasets[0].data[6] -= personal;
		outerDonut.data.datasets[0].data[5] = misc;
		outerDonut.data.datasets[0].data[6] -= misc;
	});
	outerDonut.update();
}

renderOuterDonutValues();

async function editBudget(
	total,
	rent,
	food,
	utils,
	savings,
	personal,
	misc,
	UserId
) {
	try {
		const updateBudget = await $.ajax({
			method: "PUT",
			url: "/api/budgets/" + UserId,
			data: {
				total: total,
				rent: rent,
				food: food,
				utilities: utils,
				savings: savings,
				personal: personal,
				miscellaneous: misc,
				UserId: UserId,
			},
		});
		console.log("UPDATED BUDGET", updateBudget);
		console.log("updated budget!");
		// location.reload();
	} catch (err) {
		console.log(err);
	}
}

saveBtn.on("click", async function (event) {
	event.preventDefault();
	const userid = await dashFunction.getUserId();
	console.log(userid);

	const budgetData = {
		total: parseInt($budgetValue[0].innerHTML),
		rent: parseInt($rentValue[0].innerHTML),
		food: parseInt($foodValue[0].innerHTML),
		utilities: parseInt($utilitiesValue[0].innerHTML),
		savings: parseInt($savingsValue[0].innerHTML),
		personal: parseInt($personalValue[0].innerHTML),
		miscellaneous: parseInt($miscellValue[0].innerHTML),
		UserId: userid,
	};
	console.log("BUDGET DATA HEREE", budgetData);

	const {
		total,
		rent,
		food,
		utilities,
		savings,
		personal,
		miscellaneous,
		UserId,
	} = budgetData;

	await editBudget(
		total,
		rent,
		food,
		utilities,
		savings,
		personal,
		miscellaneous,
		UserId
	);
	renderOuterDonutValues();
});
