function shortcutCheck(e) {
	var evtobj = window.event? event : e;
	var unicode = evtobj.charCode? evtobj.charCode : evtobj.keyCode;
	var key = String.fromCharCode(unicode).toLowerCase();

	var shortcut_pages = new Array("index.html","apps.html");
	var shortcut_keys = new Array("h","a");

	for(var i=0; i<shortcut_pages.length; i++) {
		if(key==i+1 || key==shortcut_keys[i]) {
			window.location = shortcut_pages[i];
		};
	};
};

document.onkeypress = shortcutCheck;
