var i
var working_input
var total_array
var lyrics_array
var time_array
var number_held
var time_delay

function loader()
{
	var lyrics_copy = document.input.lyrics.value
	total_array = document.input.lyrics.value.split("\n")
	var initial_length = total_array.length
	for (i=0;i<initial_length;i++)
	{
		total_array[i] = "cheese"
	}
	document.input.log.value = total_array.join("\n")
}

function nextLine()
{
	document.input.log.value = document.input.log.value.substring(document.input.log.value.indexOf("\n")+1)
}

function playLog()
{
	number_held = time_array.length
	for (i=0;i<number_held;i++)
	{
		setTimeout(nextLine, time_array.shift()*1000+4000)
	}
}

function addLog()
{
	working_input = document.input.lyrics.value + "\n"
	total_array = new Array()
	lyrics_array = new Array()
	time_array = new Array()
	time_array.push(-3)
	time_array.push(-2)
	time_array.push(-1)
	number_held = working_input.split(new RegExp(": ", "gi")).length
	for (i=1;i<number_held;i++)
	{
		if(working_input.indexOf(": ")!=-1)
		{
			time_array.push((parseInt(working_input.substring(0,working_input.indexOf(": ")).replace(".",""))/10).toFixed(1))
			working_input = working_input.substring(working_input.indexOf(": ")+2)
		}
		if(working_input.indexOf("\n")!=-1)		
		{
			total_array.push(working_input.substring(0,working_input.indexOf("\n"))+"\n")
			working_input = working_input.substring(working_input.indexOf("\n")+1)
		}
	}
	document.input.log.value = "3\n2\n1\n" + total_array.join("")
	playLog()
}

function stopLog()
{
	document.input.log.value = ""
}

/*
function addLog()
{
	if(document.input.lyrics_after.value=="")
		{}
	else if(document.input.lyrics_after.value.indexOf("\n")!=-1)
		{
			document.input.log.value = document.input.log.value+(count/10).toFixed(1)+": "+document.input.lyrics_after.value.substring(0,+document.input.lyrics_after.value.indexOf("\n"))+"\n"
			document.input.lyrics_after.value = document.input.lyrics_after.value.slice(document.input.lyrics_after.value.indexOf("\n")+1)
		}
	else
		{
			document.input.log.value = document.input.log.value+(count/10).toFixed(1)+": "+document.input.lyrics_after.value+"\n"
			document.input.lyrics_after.value = ""
		}
}
*/