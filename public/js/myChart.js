Chart.defaults.global.responsive = true;
new Chart(document.getElementById("doughnut-chart"), {
	type: "doughnut",
	data: {
		labels: ["Groceries", "Rent", "Utilities", "Allowance"],
		datasets: [
			{
				label: "Dollars",
				backgroundColor: [
					"#85bb65",
					"#65bb70",
					"#65bb9b",
					"#bb9b65",
					"#b0bb65",
				],
				data: [2478, 5267, 734, 784],
			},
		],
	},
	options: {
		responsive: true,
		title: {
			display: true,
			text: "Monthly Budget",
			fontColor: "white",
		},
		legend: {
			labels: {
				// This more specific font property overrides the global property
				fontColor: "white",
			},
		},
	},
});
