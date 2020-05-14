Chart.defaults.global.responsive = true;
var outerDonut = new Chart(document.getElementById("doughnut-chart"), {
	type: "doughnut",
	data: {
		labels: ["Rent", "Groceries", "Utilities", "Savings", "Unused"],
		datasets: [
			{
				label: "Dollars",
				backgroundColor: [
					"#85bb65",
					"#65bb70",
					"#65bb9b",
					"#bb9b65",
					"#808080",
				],
				data: [0, 0, 0, 0, 5000],
			},
			{
				label: "Dollars",
				backgroundColor: [
					"#85bb65",
					"#65bb70",
					"#65bb9b",
					"#bb9b65",
					"#808080",
				],
				data: [500, 500, 500, 500, 3000],
			},
		],
	},
	options: {
		responsive: true,
		title: {
			fontSize:30,
			display: true,
			text: "Monthly Budget",
			fontColor: "black",
		},
		legend: {
			labels: {
				fontSize:15,
				// This more specific font property overrides the global property
				fontColor: "black",
			},
		},
	},
});

var rangeSlider = function () {
	var slider = $(".range-slider"),
		range = $(".range-slider__range"),
		value = $(".range-slider__value");
	$saveButton = $("#saveButton");
	//--------------------RENT--------------------------------
	$rentSlider = $("#rentSlider");
	$rentValue = $("#rentValue");

	var rentValue = $rentSlider.attr("value");
	$rentValue.html(rentValue);

	outerDonut.data.datasets[0].data[0] = parseInt(rentValue);
	outerDonut.update();

	$rentSlider.on("input", function () {
		$rentValue.html($rentSlider.val());
		// outerDonut.data.datasets[0].data[0] = parseInt($rentSlider.val());
		// outerDonut.data.datasets[0].data[4] -= parseInt($rentSlider.val());
		// outerDonut.update();
	});

	//----------------------------------GROCIERIES---------------------------------
	$groceriesSlider = $("#groceriesSlider");
	$groceriesValue = $("#groceriesValue");

	var groceriesValue = $groceriesSlider.attr("value");
	$groceriesValue.html(groceriesValue);

	outerDonut.data.datasets[0].data[1] = parseInt(groceriesValue);
	outerDonut.update();

	$groceriesSlider.on("input", function () {
		$groceriesValue.html($groceriesSlider.val());
		// outerDonut.data.datasets[0].data[1] = parseInt($groceriesSlider.val());
		// outerDonut.data.datasets[0].data[4] -= outerDonut.data.datasets[0].data[4] -  parseInt($groceriesSlider.val());
		// outerDonut.update();
	});
	//----------------------------------UTILITIES---------------------------------
	$utilitiesSlider = $("#utilitiesSlider");
	$utilitiesValue = $("#utilitiesValue");

	var utilitiesValue = $utilitiesSlider.attr("value");
	$utilitiesValue.html(utilitiesValue);

	outerDonut.data.datasets[0].data[1] = parseInt(utilitiesValue);
	outerDonut.update();

	$utilitiesSlider.on("input", function () {
		$utilitiesValue.html($utilitiesSlider.val());
		// outerDonut.data.datasets[0].data[2] = parseInt($utilitiesSlider.val());
		// outerDonut.data.datasets[0].data[4] -= outerDonut.data.datasets[0].data[4] -  parseInt($groceriesSlider.val());
		// outerDonut.update();
	});

	//----------------------------------SAVINGS---------------------------------
	$savingsSlider = $("#savingsSlider");
	$savingsValue = $("#savingsValue");

	var savingsValue = $savingsSlider.attr("value");
	$savingsValue.html(savingsValue);

	outerDonut.data.datasets[0].data[1] = parseInt(savingsValue);
	outerDonut.update();

	$savingsSlider.on("input", function () {
		$savingsValue.html($savingsSlider.val());
		// outerDonut.data.datasets[0].data[3] = parseInt($savingsSlider.val());
		// outerDonut.data.datasets[0].data[4] -= outerDonut.data.datasets[0].data[4] -  parseInt($groceriesSlider.val());
		// outerDonut.update();
	});
	//--------------------------SAVE----------------------------------------
	$saveButton.click(function () {
		outerDonut.data.datasets[0].data[4] = 5000;
		console.log(outerDonut.data.datasets[0].data);
		//----------------RENT---------------------------
		outerDonut.data.datasets[0].data[0] = parseInt($rentSlider.val());
		outerDonut.data.datasets[0].data[4] -= parseInt($rentSlider.val());
		console.log(outerDonut.data.datasets[0].data);
		outerDonut.update();

		//----------------GROCIERIES
		outerDonut.data.datasets[0].data[1] = parseInt($groceriesSlider.val());
		outerDonut.data.datasets[0].data[4] -= parseInt($groceriesSlider.val());
		console.log(outerDonut.data.datasets[0].data);
		outerDonut.update();

		//------------------UTILITIES
		outerDonut.data.datasets[0].data[2] = parseInt($utilitiesSlider.val());
		outerDonut.data.datasets[0].data[4] -= parseInt($utilitiesSlider.val());
		outerDonut.update();

		//----------------SAVINGS------------------------------------------
		$savingsValue.html($savingsSlider.val());
		outerDonut.data.datasets[0].data[3] = parseInt($savingsSlider.val());
		outerDonut.data.datasets[0].data[4] -= parseInt($savingsSlider.val());
		outerDonut.update();

		console.log(outerDonut.data.datasets[0].data);

		$("#modalCard").toggleClass("is-active");
	});
};

rangeSlider();

$(document).ready(function () {
	async function displayTotalBudget() {
		try {
			await $.get("/api/budgets", function (data) {
				console.log(data);
				console.log(data[0].balance);
				outerDoughnut.options.title.text =
					"$" +
					data[0].balance.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
			});
		} catch (err) {
			throw new err();
		}
		console.log(outerDoughnut.options.title.text);
	}
	displayTotalBudget();
});
