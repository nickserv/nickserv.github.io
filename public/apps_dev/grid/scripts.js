/* DEFAULT SETTINGS
var turn = "red" //first player to go
var players = 2 //number of human players
var gravity = true //determines if pieces drop to bottom of available space when placed (boolean)
var line = 4 //length of the line needed to win
var rows = 6 //rows in grid
var cols = 7 //columns in grid
*/

var players, gravity, line, rows, cols
var game = false
var touchscreen = true

function submitSettings()
{
	players = parseInt($("#players").val())
	gravity = $("#gravity").prop("checked")
	line = parseInt($("#line").val())
	rows = parseInt($("#rows").val())
	cols = parseInt($("#cols").val())
	$("#settings button").html("new game")
	$("#title").hide()
	drawGrid()
}

var turn = "red"
var block_size = 60 //size of square blocks, in pixels
//game messages
var win_move = turn+" won"
//var lose_move = 
//var width = 
//var height = 
//more system variables
var last_row //holds the last row played in
var last_col //holds the last column played in

//read and write cell data (indexes start at cell 0,0 at the cell in the upper left corner)
function readCell(row,col)
	{return $("#grid tr:eq("+(row+1)+") td:eq("+col+")").attr("class")}
function writeCell(row,col)
	{$("#grid tr:eq("+(row+1)+") td:eq("+col+")").addClass(turn)}

//restart game
function restart()
{
	for(var row=0;row<rows;row++) {for(var col=0;col<cols;col++) {$("#grid tr:eq("+(row+1)+") td:eq("+col+")").removeClass("red blue")}}
	turn = "red"
}

function drawGrid() //ALLOW DYNAMIC RESIZING OF GRID ELEMENTS IN PIXELS WITH CSS
{
	var grid_content = ""
	//create top line of grid
	grid_content += "<tr id='top_line'>"
	for(var col=0; col<cols; col++)
		{grid_content += "<td></td>"}
	grid_content += "</tr>"
	//create rest of grid
	for(var row=0; row<rows; row++)
	{
		grid_content += "<tr>"
		for(var col=0; col<cols; col++)
			{grid_content += "<td></td>"}
		grid_content += "</tr>"
	}
	//draw grid
	$("#grid").html(grid_content)
	$("#grid td").css({"width":block_size+"px","height":block_size+"px","border-radius":block_size/2})
	//show or hide top row
	if(gravity)
		{$("#grid #top_line").show()}
	else
		{$("#grid #top_line").hide()}
	//keep grid square
	if($("#grid td").height()>$("#grid td").width()) {$("#grid td").height($("#grid td").width())}
	if($("#grid td").width()>$("#grid td").height()) {$("#grid td").width($("#grid td").height())}
	//start game
	initGame()
}

//undo move
function undo()
{
	$("#grid tr:eq("+(last_row+1)+") td:eq("+last_col+")").removeClass("red blue")
	if(turn=="red") {turn="blue"} else {turn="red"}
}

/*
//ai code
function cpuMove()
{
	var decision
	
	$("#grid td:eq("+decision+")").click()
}
*/

//checks to see if the game has been won
function winCheck()
{
	if(readAxis("hor")||readAxis("vert")||readAxis("diag1")||readAxis("diag2"))
		{alert(turn+" won!")}
	//check for pieces of the same color in both direction of all 4 axis
	//if pieces are found nearby, keep expanding until the proper number of pieces are found
	//if four in a row is completed, set game to won (check if the game was actually lost in a game with cpus)
}
function readAxis(axis)
{
	var working_row = last_row
	var working_col = last_col
	var dir = 1
	var length = 1
	while(true)
	{
		switch(axis)
		{
			case "hor":
				working_col += dir
			break
			case "vert":
				working_row += dir
			break
			case "diag1":
				working_col += dir
				working_row += dir
			break
			case "diag2":
				working_col += dir
				working_row -= dir
			break
		}
		if(readCell(working_row,working_col)==turn)
		{
			length++
			if(length>=line) {return true}
		}
		else if(dir==1)
		{
			dir = -1
			working_row = last_row
			working_col = last_col
		}
		else {return false}
	}
}

/*
$(document).ready(function() {
	var checkmousedown = false
	$("#settings input[type=text]").click(function() {$(this).select()})
	$("input[type=number]").keyup(function() {this.value = this.value.replace(/\D/, '')})
	$(document).mousedown(function() {checkmousedown=true})
	$(document).mouseup(function() {checkmousedown=false})
	$(document).mouseover(function() {if(checkmousedown==false) {touchscreen=false; alert("You are not using a touchscreen device.");}})
})
*/

function initGame() {$(document).ready(function() {
	//playing piece on top of hovered column (visuals only)
	if(gravity==true)
	{
		$("#grid td").hover(function() {
			$("#top_line td:eq("+$(this).index()+")").addClass(turn);
		}, function() {
			$("#top_line td:eq("+$(this).index()+")").removeClass("red blue");
		})
	}
	/*if(gravity==false)
	{
		$("#grid td").hover(function() {
			if($("td:hover").hasClass("")) {$("td:hover").css("background-color",turn);}
		}, function() {
			$("td:hover").css("background-color","");
		})
	}*/
	
	//a player's turn
	$("#grid td").click(function() {
		//playing piece is added to board in proper location, alert is shown if move is invalid
		if(gravity)
		{
			var working_row = rows-1
			while(readCell(working_row,$(this).index()))
				{working_row=working_row-1}
			if(working_row>=0)
				{writeCell(working_row,$(this).index(),turn);last_col=$(this).index();last_row=working_row;}
			else
				{return}
		}
		else
		{
			if($(this).attr("class")==undefined && $(this).parent().attr("id")!="top_line")
				{writeCell($(this).parent().index()-1,$(this).index(),turn);last_col=$(this).index();last_row=$(this).parent().index()-1;}
			else if($(this).parent().attr("id")=="top_line")
				{return}
			else
				{return}
		}
		//finish up the player's turn
		winCheck() //algorithm checks to see if the player has won
		if(turn=="red") {turn="blue"} else {turn="red"} //alternate players, setting appropriate css classes
		if(gravity==true) {$("#top_line td:eq("+$(this).index()+")").removeClass("red blue").addClass(turn)} //immediately shows the next player's piece in hover
	})
})}
