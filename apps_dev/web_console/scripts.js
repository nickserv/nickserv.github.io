var delimiter = "\n>"
var intro_text = "Welcome to web console."
function consoleScroll() {$('#console').scrollTop($('#console')[0].scrollHeight);}
function print(data)
{
	$('#console').val($('#console').val()+"\n"+data+delimiter)
	consoleScroll()
}
function sendInput()
{
	$('#console').val($('#console').val()+$("#input").val())
	$("#input").val("")
	consoleScroll()
}

/*
$('#txtMultiLine').scrollTop($('#txtMultiLine')[0].scrollHeight)
*/

$(document).ready(function() {
	print(intro_text)
	$("#input").focus()
})
