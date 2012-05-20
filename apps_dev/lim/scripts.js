var users = []
users.push("Dave");
users.push("HAL");
var current_user = 0;

$(document).bind("keyup keydown", function(e) {
	shifted = e.shiftKey;
});

function newMessage() {
	var message = $("#input-box").val();
	message = message.replace(/\n/g, "<br>");
	$("#chat").append("<div><div class='user'>butts</div><div class='message'>"+message+"</div></div>");
	$("#input-box").val("");
}

//when something is typed in the input box
$("#input-box").keyup(function(e) {
	//if it was return (without shift)
	if(e.keyCode == 13 && !shifted) {
		//if there is a message in the input box
		if($("#input-box").val != "") {
			//submit a new IM
			newMessage();
		}
		//if the input box is empty
		else {
			//switch active user
			switchUser();
		}
	};
});
