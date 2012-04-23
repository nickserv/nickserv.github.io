//main variables
var effect = "normal"; //change this to a different effect to bug test it on startup
var focused, last_panel, content_array = [];
var char_count = "", word_count = "", line_count = "", find_count = "";

//watchers
var watched_input, watched_find, watched_replace, watched_list_start, watched_repetitions, watched_cutoff, working_input;

//panel hiding settings
var all_panels = ["case_panel", "find_panel", "sort_panel", "list_panel", "other_panel", "misc_panel", "help_panel"];
var all_elements = ["titlebar", "toolbar", "case_panel", "find_panel", "sort_panel", "list_panel", "other_panel", "misc_panel", "help_panel"];
var hidden_elements = ["toolbar", "case_panel", "find_panel", "sort_panel", "list_panel", "other_panel", "misc_panel", "help_panel"];

function getHidden() {
	hidden_elements.length = 0;
	var counter = 0;
	for(var i=0; i<all_elements.length; i++) {
		var el = all_elements[i];
		if($("#"+el).is(":hidden")) {
			hidden_elements.push(el);
			counter++;
		}
	}
	setCookie("tt_hidden", hidden_elements.toString(), 365);
}

//collapse and expand all sections
function panel() {
	var panels = Array.prototype.slice.call(arguments);
	if(panels[0] == "init") {
		if(getCookie("tt_hidden")) {
			hidden_elements = getCookie("tt_hidden").split(",");
		}
		for(var i=0; i<hidden_elements.length; i++) {
			$("#"+hidden_elements[i]).hide();
		}
	}
	else {
		var displayMode = (panels[0] == "collapse" ? "none" : "");
		if(panels[1] == "all") {
			for(var i=0; i<all_panels.length; i++) {
				if(panels[0] == "expand") {
					$("#"+all_panels[i]).show();
				}
				if(panels[0] == "collapse") {
					$("#"+all_panels[i]).hide();
				}
			}
		}
		else
		{
			for(var i=1; i<panels.length; i++) {
				if(panels[0] == "expand") {
					$("#"+panels[i]).show();
				}
				if(panels[0] == "collapse") {
					$("#"+panels[i]).hide();
				}
			}
		}
		getHidden();
	}
}

//function openPanel(panel_name) {if(last_panel) {toggle(last_panel)}; toggle(panel_name); last_panel = panel_name;}

// ---SYSTEM FUNCTIONS---

function watcher(variable,element,watcherName) {
	if(variable != element) {
		variable = element;
		convert();
		//console.log(watcherName+"watcher activated");
	}
}
function watchInputs() { //input watcher
	if(watched_input != $("#text_before")) {
		convert();
		//console.log("main watcher activated");
	}
	watcher(watched_find,$("#find_text"),"find"); //buggy
	watcher(watched_replace,$("#replace_text"),"replace"); //buggy
	watcher(watched_list_start,$("#list_start"),"list_start"); //buggy
	watcher(watched_repetitions,$("#repetitions"),"repetitions"); //buggy
	watcher(watched_cutoff,$("#cutoff"),"cutoff"); //buggy
}
function outputToInput() {
	$("#text_before").val($("#text_after").val());
}
function update(change) {
	$("#text_after").val(change);
}
function toEffect(change) {
	effect = change;
	convert();
}
function selectAll(field) {
	field.focus();
	field.select();
}
function clear() {
	$("#text_before,#find_text,#replace_text").val("");
	$("#list_start").val("- ");
	$("#cutoff").val("3");
	$("#repetitions").val("1");
	$("#number_list").attr("checked", false);
}
function updateFocus(newFocus) {
	focused = newFocus;
}
function regainFocus() {
	focused.focus();
}
function toggleCheck(element) {
	if(element.checked == true) {
		element.checked = false;
	}
	else {
		element.checked=true;
	}
}

// ---EXTRA SCRIPTS---

//plus and minus buttons
function valueUp(variable) {
	variable.value = parseInt(variable.value)+1;
}
function valueDown(variable) {
	variable.value = parseInt(variable.value)-1;
	if(parseInt(variable.value)<0) {
		variable.value = "0";
	}
}

//numbers only
function numbersOnly(obj) {
	obj.value = obj.value.replace(/\D/, "");
}

//USER INTERFACE
$(function(){
	//initialization
	$(".effects a:not(#help_panel)").click(function() {
		$(this).click();
	});
	setInterval(function() {watchInputs();}, 300);
	setInterval(function() {getHidden();}, 1000);
	updateFocus($("#text_before"));
	regainFocus();
	$(".effect[data-effect='normal']").click();
	panel("init");
	$("#text_before").focus();

	//start daemon scripts
	$("body").keypress(watchInputs());
	$("a").focus(regainFocus());
	$("#text_before").focus(updateFocus($("#text_before")));
	$("#text_after").focus(updateFocus($("#text_after")));
	$("#text_after").click(function() {
		selectAll($("#text_after"));
	});
	$("img:not([alt])").attr("alt","");

	//effect switching
	$(".effect").click(function() {
		var new_effect = $(this).attr("data-effect");
		toEffect(new_effect);
		$(".effect").removeClass("active");
		$(this).addClass("active");
	});

	//panel toggling
	$(".panel_title").click(function() {
		var to_toggle = $(this).attr("data-toggle");
		$("#"+to_toggle).slideToggle();

		if($(this).find(".right").hasClass("icon-plus-sign")) {
			$(this).find(".right").removeClass("icon-plus-sign");
			$(this).find(".right").addClass("icon-minus-sign");
		}
		else if($(this).find(".right").hasClass("icon-minus-sign")) {
			$(this).find(".right").removeClass("icon-minus-sign");
			$(this).find(".right").addClass("icon-plus-sign");
		}
	});

	//toolbar
	$("#toolbar_button").click(function() {
		$("#toolbar").slideToggle();
	});
	$("#toolbar_close").click(function() {
		$("#toolbar").slideUp();
	});
	$("#toolbar_collapse_button").click(function() {
		panel("collapse","all");
	});
	$("#toolbar_expand_button").click(function() {
		panel("expand","all");
	});
	$("#toolbar_titlebar_toggle").click(function() {
		$("titlebar").toggle();
	});

	//more click events
	$("#outputToInput").click(function() {
		outputToInput();
	});
	$("#clear").click(function() {
		clear();
	});
	$("#clear").focus(function() {
		$('#text_before').focus();
	});
	$(".effect#find").click(function() {
		$("#find_text").focus();
	});
	$(".effect#replace").click(function() {
		$("#replace_text").focus();
	});
	$("#regexp_toggle").click(function() {
		watchInputs();
	});
	$("#regexp_toggle").focus(function() {
		if(effect!='replace') {
			toEffect('find');
			$(".effect[data-effect='find']").click();
		}
	});
	$("#regexp_toggle_label").click(function() {
		watchInputs();toggleCheck($('#regexp_toggle'));
	});
	$("#regexp_toggle_label").focus(function() {
		if(effect!='replace') {
			toEffect('find');
		};
		$(".effect[data-effect='find']").click();
	});
	$("#number_list").click(function() {
		watchInputs();
		selectAll($('#list_start'));
	});
	$("#number_list").focus(function() {
		toggleEffect('list');
		$(".effect[data-effect='list']").click();
	});
	$("#number_list_label").click(function() {
		toggleCheck($('#number_list'));
		toEffect('list');
		$(".effect[data-effect='list']").click();
		selectAll($('#list_start'));
		watchInputs();
	});
	$("#cutoff").focus(function() {
		toEffect('remove_list');
		$(".effect[data-effect='remove_list']").click();
		selectAll($('#cutoff'));
	});
	$("#cutoff").blur(function() {
		if($('#cutoff').val()=='') {
			$('#cutoff').val(3);
		};
	});
	$("#cutoff").keyup(function() {
		numbersOnly(this);
	});
	$("#cutoff_up").click(function() {
		valueUp($('#cutoff'));
		toEffect('remove_list');
		$(".effect[data-effect='remove_list']").click();
		selectAll($('#cutoff'));
	});
	$("#cutoff_down").click(function() {
		valueDown($('#cutoff'));
		toEffect('remove_list');
		$(".effect[data-effect='remove_list']").click();
		selectAll($('#cutoff'));
	});
	$("#repetitions").focus(function() {
		toEffect('repeat');
		$(".effect[data-effect='repeat']").click();
		selectAll($('#repetitions'));
	});
	$("#repetitions").blur(function() {
		if($('#repetitions').val()=='') {
			$('#repetitions').val(1);
		};
	});
	$("#repetitions").keyup(function() {
		numbersOnly(this);
	});
	$("#repetitions_up").click(function() {
		valueUp($('#repetitions'));
		toEffect('repeat');
		$(".effect[data-effect='repeat']").click();
		selectAll($('#repetitions'));
	});
	$("#repetitions_down").click(function() {
		valueDown($('#repetitions'));
		toEffect('repeat');
		$(".effect[data-effect='repeat']").click();
		selectAll($('#repetitions'));
	});

	$("#find_text").focus(function() {
		if(effect!='replace') {
			toEffect('find');
			$(".effect[data-effect='replace']").click();
		}
	});
	$("#replace_text").focus(function() {
		toEffect('replace');
		$(".effect[data-effect='replace']").click();
	});
	$(".effect[data-effect='list']").focus(function() {
		selectAll($('#list_start'));
	});
	$("#list_start").focus(function() {
		toEffect('list');
		$(".effect[data-effect='list']").click();
		selectAll($('#list_start'));
	});
	$(".effect[data-effect='remove_list']").focus(function() {
		selectAll($('#cutoff'));
	});
	$(".effect[data-effect='repeat']").focus(function() {
		selectAll($('#repetitions'));
	});
});
