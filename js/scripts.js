$(document).ready(function() {
	$(".tooltip-link").tooltip();
	$('#projects-nav').scrollspy();
});

if($(".email").length){
	// variables, which will be replaced
	var at = / AT /;
	var dot = / DOT /g;

	// function, which replaces pre-made class
	$(".email a").each(function () {
		var address = "mailto:" + $(this).data("email").replace(at, '@').replace(dot, '.');
		$(this).attr("href",address);
	});
	$(".email").show();
};
