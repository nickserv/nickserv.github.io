//VARIABLES
var ani_speed = 100
var time_ampm = false

//SYSTEM
function singleBinds()
{
	$("input:last").bind("keydown", "return", function()
		{$("#add").click()
	})
	$("input:last").bind("keyup", "backspace", function(){
		if($(this).val()=="")
		 {$(this).siblings(".delete").click()}
	}) //stop the stupid extra char delete thing
	$("input:last").bind("focus", function(){
		this.setSelectionRange(1000,1000)
	})
}
function startBinds()
{
	$(".delete").live("click",function(){deleteTask(this)})
	$("#add").click(function(){addTask()})
	$("#importer input[type=text]").bind("keydown", "return", function() {importerLoad()})
	$("#exporter input[type=text]").bind("keydown", "return", function() {exporterClose()})
	$(document).bind("keydown", "return", function() {$("#add").click()})
	//hack to leave a focused cursor at the end of the line
	$("input:last").attr("id","last")
	//document.getElementById("last").setSelectionRange(1000,1000)
	$("#last").removeAttr("id")
	//make the width of the add button purty
	//$("#add").width($("#tasks div").innerWidth())
	setInterval(function() {$("#clock").html(addTime(undefined,true))},1000)
	elapsed()
}
$(function(){loadList()}) //loads the list when the document is ready (start binds should be in loadList(), not here

//INTERFACE
function clearAll()
{
	if (confirm("Are you sure you want to reset Layout to default settings? This will delete all tasks and customizations."))
	{
		setCookie("task_log","",30)
		window.location.reload()
	}
}
function importer()
{
	if($("#importer").is(":visible"))
		{$("#importer").slideUp(ani_speed)}
	else
	{
		$("#importer").slideDown(ani_speed)
		$("#exporter").slideUp(ani_speed)
		$("#importer input[type=text]").focus()
		$("#importer input[type=text]").select()
	}
}
function importerLoad()
{
	setCookie("task_log",$("#importer input[type=text]").val(),30)
	$("#importer").slideUp(ani_speed)
	window.location.reload()
}
function exporter()
{
	if($("#exporter").is(":visible"))
		{$("#exporter").slideUp(ani_speed)}
	else
	{
		$("#exporter").slideDown(ani_speed)
		$("#importer").slideUp(ani_speed)
		saveList()
		$("#exporter input[type=text]").val(getCookie("task_log"))
		$("#exporter input[type=text]").focus()
		$("#exporter input[type=text]").select()
	}
}
function exporterClose()
	{$('#exporter').slideUp(ani_speed)}

//TASKS
function addTask(text,start)
{
	//compute stuff (compute this before the task is displayed to make the display more efficient)
	if(start==undefined) {start=addTime()} else {start=addTime(start)} //adds corresponding time to array if it is the argument
	//create string of HTML of next task
	var new_task = '<div><span class="start"></span> <input type="text" class="task"> <span class="elapsed"></span> <a class="delete">X</a></div>'
	//add task
	$("#tasks").append($(new_task).hide())
	//fill in data of the task
	$("#tasks div .start:last").html(start)
	if(text) {$("#tasks div input:last").val(text)}
	$("#tasks div input:last").focus()
	//show task in the GUI and wrap things up
	$("#tasks div:last").slideDown(ani_speed)
	singleBinds() //doesn't focus if last deleted
	if(!text) {elapsed();console.log("added task")}
}
function deleteTask(el)
{
	$("input:focus").parent().prev().children("input").focus() //SKIP HIDDEN ELEMENTS D:
	$(el).parent().slideUp(ani_speed,function() {$(this).remove()})
	elapsed()
	console.log("deleted task")
}

//COOKIES
function saveList()
{
	var all_tasks = ""
	for(var i=0; i<$("#tasks").children("div:visible").length; i++)
	{
		all_tasks += "||" + $("#tasks").children("div:visible").eq(i).children("input").val().replace(/\|/g,"") + "|" + $("#tasks").children("div:visible").eq(i).find(".time_numeric").html()
	}
	all_tasks = all_tasks.toString()
	setCookie("task_log",all_tasks,30)
	console.log("saved list: "+getCookie("task_log"))
	/*var all_tasks = ""
	all_tasks = $("#tasks div:gt(0)").html()
	setCookie("task_log",all_tasks,30)
	console.log(all_tasks)*/
}
function loadList()
{
	if(getCookie("task_log"))
	{
		var all_tasks = getCookie("task_log").split("||")
		for(var i=1; i<all_tasks.length; i++)
		{
			var temp = all_tasks[i].split("|")
			addTask(temp[0],temp[1])
		}
		console.log("loaded list: "+getCookie("task_log"))
	}
	else
		{$("#add").click()}
	startBinds()
}

//TIME
function addTime(set_time,clock)
{
	//get the time (either from now or a loaded)
	if(set_time==undefined)
		{var time = new Date()}
	else
		{var time = new Date(parseInt(set_time))}
	//determine am/pm if needed
	var ampm = ""
	if(time_ampm)
	{
		var pm
		if(time.getHours()>=12)
			{pm=true; var hours=time.getHours()-12}
		else if(time.getHours()==0)
			{pm=false; var hours=12}
		else
			{pm=false; var hours=time.getHours()}
		if(pm) {ampm="pm"} else {ampm="am"}
	}
	else
		{var hours = time.getHours()}
	//compute the display of the time
	if(time.getHours()<10) {var display = "&nbsp;"}
	else {var display = ""}
	display += time.getHours()+":"+zeroPad(time.getMinutes(),2)+"<span class='seconds'>:"+zeroPad(time.getSeconds(),2)+"</span>"
	if(!clock) {display += "<span class='time_numeric'>"+time.getTime()+"</span>"}
	return display
}
function elapsed()
{
	for(var i=0;i<$("#tasks").children("div:visible").length-1;i++)
	{
		var elapsed = timeDiff(parseInt($("#tasks").children("div:visible").eq(i+1).find(".time_numeric").html()),parseInt($("#tasks").children("div:visible").eq(i).find(".time_numeric").html()))
		$("#tasks").children("div:visible").eq(i).children(".elapsed").html(elapsed)
	}
}
function timeDiff(start_int,end_int)
{
	start = new Date(start_int)
	end = new Date(end_int)
	var diff = start.getTime() - end.getTime()
	
	var diff_days = Math.floor(diff/1000/60/60/24)
	diff -= diff_days*1000*60*60*24
	var diff_hours = Math.floor(diff/1000/60/60)
	diff -= diff_hours*1000*60*60
	var diff_mins = Math.floor(diff/1000/60)
	diff -= diff_mins*1000*60
	var diff_secs = Math.floor(diff/1000)
	
	var results = ""
	if(diff_secs)
	{results = '<span class="seconds">:'+zeroPad(diff_secs,2)+'</span>'+results
	results = zeroPad(diff_mins,2)+results
	if(diff_hours)
	{results = diff_hours+":"+results
	if(diff_days)
	{results = '<span class="date">'+diff_days+':</span>'+results}}}
	//return diff_days+"d"+diff_hours+"h"+diff_mins+"m"+diff_secs+"s"
	return results
}
function zeroPad(num,count)
{
	var numZeropad = num + ""
	while(numZeropad.length < count)
		{numZeropad = "0" + numZeropad}
	return numZeropad
}
