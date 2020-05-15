const gear = $("#mySidenav");
const plus = $("#mySide");
const dropdown =$("#dropdown");
const viewTransactions = $("#transactionSideButton")

plus.on('click touch', function (){
	$("#modalTransaction").toggleClass("is-active");
});
gear.on('click touch', function () {
	$("#modalCard").toggleClass("is-active");
});

viewTransactions.on('click touch', function () {
	$("body, html").animate({
        scrollTop: $(".transactions-list").offset().top
	}, 1000);
});


dropdown.click(function (event){
	event.stopPropagation();
	$("#dropdown").toggleClass("is-active");
});
