const gear = $("#sideSetting");
const trans = $("#sideTransaction");
const dropdown =$("#dropdown")
trans.click(function (){
	$("#modalTransaction").toggleClass("is-active");
});
gear.click(function () {
	$("#modalCard").toggleClass("is-active");
});
dropdown.click(function (event){
	event.stopPropagation();
	$("#dropdown").toggleClass("is-active");
});
