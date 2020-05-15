// const Dashboard = require("./dashboard");
// eslint-disable-next-line no-unused-vars
const dash = new Dashboard();

Chart.defaults.global.responsive = true;
var total = 0;
var budget;
var outerDonut = new Chart(document.getElementById("doughnut-chart"), {
	type: "doughnut",
	data: {
		labels: [
			"Rent",
			"Food",
			"Utilities",
			"Savings",
			"Personal",
			"Miscellaneous",
			"Unused",
		],
		datasets: [
			{
				label: "$",
				backgroundColor: [
					"#85bb65",
					"#65bb70",
					"#65bb9b",
					"#65b0bb",
					"#6585bb",
					" #7065bb ",
					"#808080",
				],
				data: [0, 0, 0, 0, 0, 0, 5000],
			},
			{
				label: "$",
				backgroundColor: [
					"#85bb65",
					"#65bb70",
					"#65bb9b",
					"#65b0bb",
					"#6585bb",
					" #7065bb ",
					"#808080",
				],
				data: [0, 0, 0, 0, 0, 0, 5000],
			},
		],
	},
	options: {
		title: {
			display: false,
			text: "Monthly Budget",
			fontColor: "black",
		},
		legend: {
			labels: {
				// This more specific font property overrides the global property
				fontColor: "black",
				fontSize: 12,
				fontStyle: "bold",
				fontFamily: "sans-serif",
				boxWidth: 20,
			},
			position: "right",
		},
	},
});

var rangeSlider = function () {
	$saveButton = $("#saveButton");
	const outerArray = outerDonut.data.datasets[0].data;

	$rentValue = $("#rentValue");
	$foodValue = $("#foodValue");
	$utilitiesValue = $("#utilitiesValue");
	$savingsValue = $("#savingsValue");
	$personalValue = $("#personalValue");
	$miscellValue = $("#miscellValue");
	valueArray = [
		$rentValue,
		$foodValue,
		$utilitiesValue,
		$savingsValue,
		$personalValue,
		$miscellValue,
	];
	//--------------------BUDGeT--------------------------------
	$budgetSlider = $("#budgetSlider");
	$budgetValue = $("#budgetValue");

	var budgetValue;
	// console.log(valueArray[0][0].id.slice(0, -5));
	$budgetSlider.slider({
		min: 0,
		max: 7000,
		step: 500,
		slide: function (ev, ui) {
			budgetValue = ui.value;
			budget = parseInt(budgetValue);
			$budgetValue.html(budgetValue);
		},
	});
	//--------------------RENT--------------------------------
	$rentSlider = $("#rentSlider");

	var rentValue;

	$rentSlider.slider({
		slide: function (ev, ui) {
			// total = total + ui.value;
			rentValue = ui.value;
			// total += rentValue;
			total = rentValue;
			for (let i = 0; i < valueArray.length; i++) {
				if (valueArray[i][0].id.slice(0, -5) != "rent") {
					total += parseInt(valueArray[i][0].textContent);
				}
			}
			// // console.log("total: " + total);
			if (total > 100) {
				return false;
			} else {
				$rentValue.html(rentValue);
			}
		},
	});

	//----------------------------------GROCIERIES---------------------------------
	$foodSlider = $("#foodSlider");

	var foodValue;

	$foodSlider.slider({
		slide: function (ev, ui) {
			foodValue = ui.value;
			total = foodValue;
			for (let i = 0; i < valueArray.length; i++) {
				if (valueArray[i][0].id.slice(0, -5) != "food") {
					total += parseInt(valueArray[i][0].textContent);
				}
			}
			if (total > 100) {
				return false;
			} else {
				$foodValue.html(foodValue);
			}
		},
	});
	//----------------------------------UTILITIES---------------------------------
	$utilitiesSlider = $("#utilitiesSlider");

	var utilitiesValue;

	$utilitiesSlider.slider({
		slide: function (ev, ui) {
			utilitiesValue = ui.value;
			total = utilitiesValue;
			for (let i = 0; i < valueArray.length; i++) {
				if (valueArray[i][0].id.slice(0, -5) != "utilities") {
					total += parseInt(valueArray[i][0].textContent);
				}
			}
			if (total > 100) {
				return false;
			} else {
				$utilitiesValue.html(utilitiesValue);
			}
		},
	});

	//----------------------------------SAVINGS---------------------------------
	$savingsSlider = $("#savingsSlider");

	var savingsValue;

	$savingsSlider.slider({
		slide: function (ev, ui) {
			savingsValue = ui.value;
			total = savingsValue;
			for (let i = 0; i < valueArray.length; i++) {
				if (valueArray[i][0].id.slice(0, -5) != "savings") {
					total += parseInt(valueArray[i][0].textContent);
				}
			}
			if (total > 100) {
				return false;
			} else {
				$savingsValue.html(savingsValue);
			}
		},
	});

	//----------------------------------Personal---------------------------------
	$personalSlider = $("#personalSlider");

	var personalValue;

	$personalSlider.slider({
		slide: function (ev, ui) {
			personalValue = ui.value;
			total = personalValue;
			for (let i = 0; i < valueArray.length; i++) {
				if (valueArray[i][0].id.slice(0, -5) != "personal") {
					total += parseInt(valueArray[i][0].textContent);
				}
			}
			if (total > 100) {
				return false;
			} else {
				$personalValue.html(personalValue);
			}
		},
	});

	//---------------------------------Miscellaneous---------------------------------
	$miscellSlider = $("#miscellSlider");

	var miscellValue;

	$miscellSlider.slider({
		slide: function (ev, ui) {
			miscellValue = ui.value;
			total = miscellValue;
			for (let i = 0; i < valueArray.length; i++) {
				if (valueArray[i][0].id.slice(0, -5) != "miscell") {
					total += parseInt(valueArray[i][0].textContent);
				}
			}
			if (total > 100) {
				return false;
			} else {
				$miscellValue.html(miscellValue);
			}
		},
	});

	//--------------------------SAVE----------------------------------------
	$saveButton.on("click touch", function () {
		// console.log("BUDGET IS: " + budget);
		outerDonut.data.datasets[0].data[outerArray.length - 1] = budget;
		// // console.log(outerDonut.data.datasets[0].data);

		//----------------Budget---------------------------
		outerDonut.data.datasets[0].data[outerArray.length - 1] = budget;
		outerDonut.update();

		//----------------RENT---------------------------
		var rentRaw = parseInt($rentValue[0].innerHTML) / 100;
		var rentPercent = Math.round((rentRaw + Number.EPSILON) * 100) / 100;
		var rentCost = Math.round(rentPercent * budget);
		// console.log(rentCost);
		outerDonut.data.datasets[0].data[0] = rentCost;
		outerDonut.data.datasets[0].data[outerArray.length - 1] -= rentCost;
		outerDonut.update();

		// //----------------FOOD
		var foodRaw = parseInt($foodValue[0].innerHTML) / 100;
		var foodPercent = Math.round((foodRaw + Number.EPSILON) * 100) / 100;
		var foodCost = Math.round(foodPercent * budget);
		// console.log(foodCost);
		outerDonut.data.datasets[0].data[1] = foodCost;
		outerDonut.data.datasets[0].data[outerArray.length - 1] -= foodCost;
		outerDonut.update();

		// //------------------UTILITIES
		var utilitiesRaw = parseInt($utilitiesValue[0].innerHTML) / 100;
		var utilitiesPercent =
			Math.round((utilitiesRaw + Number.EPSILON) * 100) / 100;
		var utilitiesCost = Math.round(utilitiesPercent * budget);
		// console.log(utilitiesCost);
		outerDonut.data.datasets[0].data[2] = utilitiesCost;
		outerDonut.data.datasets[0].data[outerArray.length - 1] -= utilitiesCost;
		outerDonut.update();

		// //----------------SAVINGS------------------------------------------
		var savingsRaw = parseInt($savingsValue[0].innerHTML) / 100;
		var savingsPercent = Math.round((savingsRaw + Number.EPSILON) * 100) / 100;
		var savingsCost = Math.round(savingsPercent * budget);
		// console.log(savingsCost);
		outerDonut.data.datasets[0].data[3] = savingsCost;
		outerDonut.data.datasets[0].data[outerArray.length - 1] -= savingsCost;
		outerDonut.update();

		//  //----------------PERSONAL------------------------------------------
		var personalRaw = parseInt($personalValue[0].innerHTML) / 100;
		var personalPercent =
			Math.round((personalRaw + Number.EPSILON) * 100) / 100;
		var personalCost = Math.round(personalPercent * budget);
		// console.log(personalCost);
		outerDonut.data.datasets[0].data[4] = personalCost;
		outerDonut.data.datasets[0].data[outerArray.length - 1] -= personalCost;
		outerDonut.update();

		//  //----------------MISCELLANOUS------------------------------------------
		var miscellRaw = parseInt($miscellValue[0].innerHTML) / 100;
		var miscellPercent = Math.round((miscellRaw + Number.EPSILON) * 100) / 100;
		var miscellCost = Math.round(miscellPercent * budget);
		// // console.log(miscellCost);
		outerDonut.data.datasets[0].data[5] = miscellCost;
		outerDonut.data.datasets[0].data[outerArray.length - 1] -= miscellCost;
		outerDonut.update();

		// console.log(outerDonut.data.datasets[0].data);

		$("#modalCard").removeClass("is-active");
	});

	$("#cancelButton").on("click touch", function () {
		$("#modalCard").removeClass("is-active");
	});

	$("#closeButton").on("click touch", function () {
		$("#modalCard").removeClass("is-active");
	});

	$("#closeTransaction").on("click touch", function () {
		$("#modalTransaction").removeClass("is-active");
	});

	$("#cancelTransaction").on("click touch", function () {
		$("#modalTransaction").removeClass("is-active");
	});

	$("#budget").on("click touch", function () {
		$("#modalTransaction").removeClass("is-active");
	});
};

rangeSlider();

$(document).ready(function () {
	async function displayTotalBudget() {
		try {
			await $.get("/api/budgets", function (data) {
				console.log(data);
				console.log(data[0].balance);
				outerDonut.options.title.text =
					"$" +
					data[0].balance.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
			});
		} catch (err) {
			throw new err();
		}
		console.log(outerDonut.options.title.text);
	}
	displayTotalBudget();
});
