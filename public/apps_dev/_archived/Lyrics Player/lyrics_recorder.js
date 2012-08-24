// REMEMBER TO CLEAR ARRAYS
var count = -40
var counting = false
var timer
var timeArray = new Array

// secVar0 = 70;                     // The initial data, in seconds
// minVar = Math.floor(secVar0/60);  // The minutes
// secVar = secVar0 % 60;            // The balance of seconds

function startScripts()
{
	document.input.timerbox.value = count
	clearLog()
}
function startTimer()
{
	if(counting==false)
	{
		counting = true
		timer = setInterval("updateTimer()",100)
	}
}
function updateTimer()
{
	count = ++count
	document.input.timerbox.value = (count/10).toFixed(1)
}
function pauseTimer()
{
	if(counting==true)
	{
		counting = false
		clearInterval(timer)
	}
}
function resetTimer()
{
	pauseTimer()
	count = -40
	document.input.timerbox.value = "-4.0"
}

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
function clearLog()
{
	document.input.log.value = ""
}

// REMEMBER TO CLEAR ARRAYS
var lyrics
var new_lyrics
var lyricsArray = new Array()

function convert()
{
	lyrics = document.input.lyrics_before.value
	new_lyrics = lyrics
	new_lyrics = new_lyrics.replace(new RegExp(" ", "gi"),"\n")
	new_lyrics = new_lyrics.replace(new RegExp("\n\n", "gi"),"\n")
	new_lyrics = new_lyrics.replace(new RegExp("\n\n", "gi"),"\n")
	document.input.lyrics_after.value = new_lyrics
}

function writeArray()
{
	lyricsArray = document.input.lyrics_after.value.split(" ")
}