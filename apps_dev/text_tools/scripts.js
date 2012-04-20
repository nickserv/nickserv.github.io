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

$(function(){
//initialization
	$(".effects a:not(#help_panel)").click(function() {
		clicked(this);
	});
	setInterval(function() {watchInputs();}, 300);
	setInterval(function() {getHidden();}, 1000);
	updateFocus($("#text_before"));
	regainFocus();
	clicked($("#normal"));
	panel("init");

//start daemon scripts
	$("body").keypress(watchInputs());
	$("a").focus(regainFocus());
	$(".effect").click(function() {
		clicked($(this));
		toEffect($(this).attr("id"));
	});
	$(".panel").mousedown(function() {
		$(".case_panel").toggle();
	});
	$("#text_before").focus(updateFocus($("#text_before")));
	$("#text_before").ready($("#text_before").focus());
	$("#text_after").focus(updateFocus($("#text_after")));
	$("#text_after").click(function() {
		selectAll($("#text_after"));
	});
	$("img:not([alt])").attr("alt","");

//click events
	$("#outputToInput").click(function() {
		outputToInput();
	});
	$("#clear").click(function() {
		clear();
	});
	$("#clear").focus(function() {
		$('#text_before').focus();
	});
	$("#toolbar_button").click(function() {
		$('toolbar').toggle(); $('toolbar_button').toggle();
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
	$("#toolbar_close").click(function() {
		$("#toobar").toggle();
		$("#toolbar_button").toggle();
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
			clicked(find);
		}
	});
});

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

// ---CONVERSION FUNCTIONS---

function convert() {
	watched_input = $("#text_before").val();
	
	if($("find_text").val() != "") {
		if($("#regexp_toggle").attr("checked", false)) {
			find_count = (watched_input.split($("#find_text").val()).length-1);
			$("#find_counter").html(" ("+find_count+")");
		}
		else {
			find_count = (watched_input.split(new RegExp($("#find_text").val(), "gi")).length-1);
			$("#find_counter").html(" ("+find_count+")");
		}
	}
	else {
		$("#find_counter").html("");
	}
	
	switch(effect) {
		case "normal":
			update(watched_input);
			break;
		case "lowercase":
			update(watched_input.toLowerCase());
			break;
		case "uppercase":
			update(watched_input.toUpperCase());
			break;
		case "htmllower":
			htmlCase("lower");
			break;
		case "htmlupper":
			htmlCase("upper");
			break;
		case "titlecase":
			update(watched_input.toLowerCase().toTitleCase());
			break;
		case "find":
			if($("#regexp_toggle").attr("checked", false)) {
				$("#text_after").val(watched_input.replace($("#find_test").val(), $("#find_text").val().toUpperCase()));
			}
			else {
				$("#text_after").val(watched_input.replace(new RegExp($("#find_text").val(), "gi"), ("#find_text").val().toUpperCase()));
			}
			break;
		case "replace":
			if($("#regexp_toggle").attr("checked", false)) {
				$("#text_after").val(watched_input.replace($("#find_text").val(), $("#replace_text").val()));
			}
			else {
				$("#text_after").val(watched_input.replace(new RegExp($("#find_text").val(), "gi"), $("#replace_text").val()));
			}
			break;
		case "list":
			if($("#number_list").attr("checked")) {
				listNumbers();
			}
			else {
				$("#text_after").val($("#list_start").val() + watched_input.replace(new RegExp("\n","gi"),"\n" + $("#list_start").val()));
			}
			break;
		case "remove_list":
			var text_array = watched_input.split("\n");
			for (var i=0; i<text_array.length; i++) {
				text_array[i] = text_array[i].substring(watched_cutoff);
			}
			update(text_array.join("\n"));
			break;
		case "repeat":
			update(watched_input.repeat(parseInt($("#repetitions").text())));
			break;
		case "wordcount":
			char_count = watched_input.length;
			line_count = watched_input.split("\n");
			line_count = line_count.length;
			word_count = watched_input.split(" ");
			word_count = word_count.length + line_count - 1;
			if(watched_input == "") {
				word_count=0;
			}
			update("Characters: "+char_count+"\nWords: "+word_count+"\nLines: "+line_count);
			break;
		case "sortaz":
			var text_array = watched_input.split("\n");
			text_array = text_array.sort();
			update(text_array.join("\n"));
			break;
		case "sortza":
			var text_array = watched_input.split("\n");
			text_array = text_array.sort();
			text_array = text_array.reverse();
			update(text_array.join("\n"));
			break;
		case "sortreverse":
			var text_array = watched_input.split("\n");
			text_array = text_array.reverse();
			update(text_array.join("\n"));
			break;
		case "sortrandom":
			var text_array = watched_input.split("\n");
			text_array = text_array.sort(function() {
				return 0.5 - Math.random();
			});
			update(text_array.join("\n"));
			break;
		case "rot13":
			update(watched_input.replace(/[a-zA-Z]/g, function(c){
				return String.fromCharCode((c <= "Z" ? 90 : 122) >= (c = c.charCodeAt(0) + 13) ? c : c - 26);
			}));
			break;
		case "backwards":
			var backwards = "";
			for(var i = 0; i <= watched_input.length; i++) {
				backwards = watched_input.substring(i, i+1) + backwards;
			}
			update(backwards);
			break;
	}
	
	//output autoselect exclusion
	if(focused == $("#text_after") &&
		effect != "find" &&
		effect != "replace" &&
		effect != "list" &&
		effect != "remove_list" &&
		effect != "repeat") {
			selectAll($("#text_after"));
	}
}

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

//selected button stuff
function addClass(ele,clss) {
	if(!ele.className.match(new RegExp("\\b ?"+clss+"\\b"))) {
		ele.className += " "+clss;
	}
}
function removeClass(ele,clss) {
	ele.className = ele.className.replace(new RegExp("\\b ?"+clss+"\\b"),"");
}
var lastActive = null;
function clicked(clickedOn) {
	if(lastActive) {
		removeClass(lastActive, "active");
		addClass(clickedOn, "active");
		lastActive = clickedOn;
	}
}

//awesome html case changer by me :D
function htmlCase(html_case_mode) {
	working_input = watched_input;
	content_array = [];
	for (i = 1; i<watched_input.split(new RegExp("<", "gi")).length; i++) { //set the input into an array
		if(working_input.indexOf("<") != -1) {
			content_array.push(working_input.substring(0,working_input.indexOf("<"))+"<");
			working_input = working_input.substring(working_input.indexOf("<")+1);
		}
		if(working_input.indexOf(">") != -1) {
			content_array.push(working_input.substring(0,working_input.indexOf(">"))+">");
			working_input = working_input.substring(working_input.indexOf(">")+1);
		}
	}
	content_array.push(working_input);
	for (i = 1; i<content_array.length; i = i+2) { //change the case of html
		if(html_case_mode == "lower") {
			content_array[i] = content_array[i].toLowerCase();
		}
		if(html_case_mode == "upper") {
			content_array[i] = content_array[i].toUpperCase();
		}
	}
	update(content_array.join("")); //set this value as blank when not bug testing
}

//numbered lists
function listNumbers() {
	working_input = "";
	content_array = [];
	content_array = watched_input.split(new RegExp("\n", "gi"));
	var list_length = content_array.length;
	var num = 0;
	for (i=0; i<list_length; i++) { //act sequentially on all array items
		working_input = working_input + ++num + $("#list_start").val() + content_array.shift() + "\n";
	}
	update(working_input.slice(0,working_input.length-1));
}

/* 
 * To Title Case 2.0.1 – http://individed.com/code/to-title-case/
 * Copyright © 2008–2012 David Gouch. Licensed under the MIT License. 
 */

String.prototype.toTitleCase = function () {
	var smallWords = /^(a|an|and|as|at|but|by|en|for|if|in|of|on|or|the|to|vs?\.?|via)$/i;

	return this.replace(/([^\W_]+[^\s-]*) */g, function (match, p1, index, title) {
		if (index > 0 && index + p1.length !== title.length &&
			p1.search(smallWords) > -1 && title.charAt(index - 2) !== ":" && 
			title.charAt(index - 1).search(/[^\s-]/) < 0) {
			return match.toLowerCase();
		}

		if (p1.substr(1).search(/[A-Z]|\../) > -1) {
			return match;
		}

		return match.charAt(0).toUpperCase() + match.substr(1);
	});
};
