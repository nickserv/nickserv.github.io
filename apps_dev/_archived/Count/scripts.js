function showTime()
{
	var time = new Date()
	var pm
	var display
	if(time.getHours()>=12)
		{pm=true; display=time.getHours()-12}
	if else(time.getHours()==0)
		{pm=false; display=12}
	else
		{pm=false; display=time.getHours()}
	display = display+":"+time.getMinutes()+":"+time.getSeconds()
	if(pm) {display = display+" PM"}
	else {display = display+" AM"}
	alert(display)
	document.getElementById("time").innerHTML.value = display
}

//script from http://java-scripts.net

//INITIAL VARIABLES
var ms = 0
var state = 0
var precision = 3

//TIME FORMATTING
function formatOutput(time)
{
	time=time/1000
	time=time.toFixed(precision)
	if(time<60) {return time}
	else if(time%60>=10) {return Math.floor(time/60)+":"+(time%60).toFixed(precision)}
	else {return Math.floor(time/60)+":0"+(time%60).toFixed(precision)}
}

//STOPWATCH
function swToggle() //pauses and unpauses timer
{
	if (state == 0)
	{
		state = 1
		if(ms==0) {swLogClear()}
		then = new Date()
		then.setTime(then.getTime() - ms)
	}
	else
	{
		state = 0
		now = new Date()
		ms = now.getTime() - then.getTime()
		document.stopwatch.counter.value = formatOutput(ms)
	}
}
function swReset() //stops timer
{
	state = 0
	ms = 0
	document.stopwatch.counter.value = formatOutput(ms)
	document.getElementById("toggle_icon").src="icons/play_long.png"
}
function swDisplay() //main function
{
	setTimeout("swDisplay()", 50)
	if (state == 1)
	{
		now = new Date()
		ms = now.getTime() - then.getTime()
		document.stopwatch.counter.value = formatOutput(ms)
	}
}

//STOPWATCH LOG
function swLogAdd()
{
	if(document.stopwatch.log.value!="")
		{document.stopwatch.log.value = document.stopwatch.log.value+"\n"+formatOutput(ms)}
	else
		{document.stopwatch.log.value = formatOutput(ms)}
}
function swLogClear()
{
	document.stopwatch.log.value = ""
}

//INTERFACE
function togglePlayIcon()
{
	if(state==0) {document.getElementById("toggle_icon").src="icons/pause.png"}
	else if(state==1) {document.getElementById("toggle_icon").src="icons/play_long.png"}
}

function toggleLog()
{
	var row = document.getElementById("log_row_1");
	if (row.style.display == '') row.style.display = 'none';
	else row.style.display = '';
	var row = document.getElementById("log_row_2");
	if (row.style.display == '') row.style.display = 'none';
	else row.style.display = '';
}