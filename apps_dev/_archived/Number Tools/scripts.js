var mode = "inspector"
var watched_input = "undefined"
var sort_array
var focused

var values
var average
var sum
var minimum
var maximum
var median
var mode
var range
var lcm
var gcf

/* var text_array = new Array()
var text_array_string */

function convert()
{
	watched_input = document.number_tools.input.value
	if(mode == "inspector")
	{
		sort_array = watched_input.split("\n")
		//sort_array = sort_array.parseInt()
		sort_array = sort_array.map(parseInt())
		sort_array = sort_array.sort()
		values = sort_array.length
		minimum = sort_array[0]
		maximum = sort_array[0]
		document.number_tools.output.value = "Values: "+values+"\nMinimum: "+minimum+"\nMaximum: "+maximum
	}
}

function watchInput()
{
	if(watched_input != document.number_tools.input.value)
		{convert();}
}

String.prototype.repeat = function(l){return new Array(l+1).join(this);}

function changeMode(change)
	{mode = change; convert();}
function selectAll(field)
	{field.focus(); field.select();}
function clear()
	{document.number_tools.input.value = "";}
function updateFocus(newFocus)
	{focused = newFocus;}
function regainFocus()
	{focused.focus();}

function checkIt(evt)
{
    evt = (evt) ? evt : window.event
    var charCode = (evt.which) ? evt.which : evt.keyCode
    if (charCode > 31 && (charCode < 48 || charCode > 57))
    {
        status = "This field accepts numbers only."
        return false
    }
    status = ""
    return true
}