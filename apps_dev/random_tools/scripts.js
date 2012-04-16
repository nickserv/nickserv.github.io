// system scripts

var display_speed = 200
var mode
var mode_last
var options_display = false
var nothing = ""
var minimum = 1
var maximum = 10

function display(results)
{
	if($("#results").is(":visible"))
	{
		$("#results").fadeOut(display_speed,function() {$("#results").html(results)})
		$("#results").show()
		$("#results").fadeIn(display_speed)
		/*
		if() //this is for shit that needs to fade in or out when you're switching modes
		{
			$("#options").fadeOut(display_speed,function() {})
			$("#options").show()
			$("#options").fadeIn(display_speed)
		}
		*/
	}
	else
	{
		$("#list_options").hide()
		$("#number_options").hide()
		$("#welcome").fadeOut(display_speed)
		$("#results").html(results)
		$("#results").fadeIn(display_speed)
		$("#options").fadeIn(display_speed)
	}
	if(mode=="number") {$("#number_options").fadeIn(display_speed)} else {$("#number_options").fadeOut(display_speed)}
	if(mode=="from_list"||mode=="sort_list") {$("#list_options").fadeIn(display_speed)} else {$("#list_options").fadeOut(display_speed)}
}
function reload()
{
	switch(mode)
	{
		case "die": {die(); break;}
		case "coin": {coin(); break;}
		case "card": {card(); break;}
		case "number": {number(); break;}
		case "from_list": {from_list(); break;}
		case "sort_list": {sort_list(); break;}
	}
}


function switchMode(mode_new)
{
	mode_last = mode
	mode = mode_new
}

$("#results").live("click", function() {reload()})

$(function($) {
	
	// active mode
	
	var lastActive
	$(".buttons a").click(function() {
		$(this).toggleClass("active")
		if(lastActive!=undefined){lastActive.toggleClass("active")}
		lastActive=$(this)
	})
	
	// list thing
	
	if($("#list_options textarea").val()) {} else {$("#list_options textarea").val("chocolate\nvanilla\nstrawberry")}
	
	// preloader
	
	/*
	var to_preload = ["images/coin_heads.png","images/coin_tails.png"]
	for(var i=1;i<=6;i++) {to_preload.push("images/die_"+i+".png")}
	for(var i=1;i<=13;i++) {to_preload.push("images/cards/c"+i+".png")}
	for(var i=1;i<=13;i++) {to_preload.push("images/cards/d"+i+".png")}
	for(var i=1;i<=13;i++) {to_preload.push("images/cards/h"+i+".png")}
	for(var i=1;i<=13;i++) {to_preload.push("images/cards/s"+i+".png")}
	to_preload.push("images/cards/jb.png")
	to_preload.push("images/cards/jr.png")
	console.log(to_preload.join('","'))
	*/
	var to_preload = ["images/coin_heads.png","images/coin_tails.png","images/die_1.png","images/die_2.png","images/die_3.png","images/die_4.png","images/die_5.png","images/die_6.png","images/cards/c1.png","images/cards/c2.png","images/cards/c3.png","images/cards/c4.png","images/cards/c5.png","images/cards/c6.png","images/cards/c7.png","images/cards/c8.png","images/cards/c9.png","images/cards/c10.png","images/cards/c11.png","images/cards/c12.png","images/cards/c13.png","images/cards/d1.png","images/cards/d2.png","images/cards/d3.png","images/cards/d4.png","images/cards/d5.png","images/cards/d6.png","images/cards/d7.png","images/cards/d8.png","images/cards/d9.png","images/cards/d10.png","images/cards/d11.png","images/cards/d12.png","images/cards/d13.png","images/cards/h1.png","images/cards/h2.png","images/cards/h3.png","images/cards/h4.png","images/cards/h5.png","images/cards/h6.png","images/cards/h7.png","images/cards/h8.png","images/cards/h9.png","images/cards/h10.png","images/cards/h11.png","images/cards/h12.png","images/cards/h13.png","images/cards/s1.png","images/cards/s2.png","images/cards/s3.png","images/cards/s4.png","images/cards/s5.png","images/cards/s6.png","images/cards/s7.png","images/cards/s8.png","images/cards/s9.png","images/cards/s10.png","images/cards/s11.png","images/cards/s12.png","images/cards/s13.png","images/cards/jb.png","images/cards/jr.png"]
	
	var preload_html = ""
	var preload_size = to_preload.length
	for(var i=0;i<preload_size;i++)
		{preload_html = preload_html + "<img src='"+to_preload.shift()+"'>"}
	 	$("#preloader").hide()
	 	$("#preloader").html(preload_html)
})

/*
function preload(arrayOfImages) {
    $(arrayOfImages).each(function(){
        $('<img/>')[0].src = this;
        // Alternatively you could use:
        // (new Image()).src = this;
    });
}
*/

// mode scripts

function die()
{
	switchMode("die")
	var roll = Math.floor(Math.random()*6+1)
	display("<img src='images/die_"+roll+".png' alt='"+roll+"' height='100' id='number'></img>")
}
function coin()
{
	switchMode("coin")
	var roll = Math.floor(Math.random()*2+1)
	if(roll==1) {display("<img src='images/coin_heads.png' alt='heads' height='100' id='text'></img>")}
	if(roll==2) {display("<img src='images/coin_tails.png' alt='tails' height='100' id='text'></img>")}
}
function card()
{
	switchMode("card")
	var roll = Math.floor(Math.random()*54+1)
	if(roll>=1 && roll<=13) {display("<img src='images/cards/d"+roll+".png' alt='"+roll+" of diamonds' height='100' id='text'></img>")}
	if(roll>=14 && roll<=26) {display("<img src='images/cards/h"+(roll-13)+".png' alt='"+(roll-13)+" of hearts' height='100' id='text'></img>")}
	if(roll>=27 && roll<=39) {display("<img src='images/cards/s"+(roll-26)+".png' alt='"+(roll-26)+" of spades' height='100' id='text'></img>")}
	if(roll>=40 && roll<=52) {display("<img src='images/cards/c"+(roll-39)+".png' alt='"+(roll-39)+" of clubs' height='100' id='text'></img>")}
	if(roll==53) {display("<img src='images/cards/jb.png' alt='black joker' height='100' id='text'></img>")}
	if(roll==54) {display("<img src='images/cards/jr.png' alt='red joker' height='100' id='text'></img>")}
}
function number() //BUGGY
{
	switchMode("number");
	if(parseInt($("#minimum").val()) && parseInt($("#maximum").val()))
	{
		mininum = parseInt($("#minimum").val())
		maximum = parseInt($("#maximum").val())
	}
	else
	{
		minimum = 1
		maximum = 10
	}
	var roll = Math.floor(Math.random()*maximum+minimum)
	display("<span id='number'>"+roll+"</span><br><span id='info'>from "+minimum+" to "+maximum+" </span>")
	
}
function from_list()
{
	var result
	if($("#list_options textarea").val())
		{result = $("#list_options textarea").val()}
	else
		{result = "list is empty"}
	switchMode("from_list")
	var text_array = new Array()
	text_array = result.split("\n")
	text_array = text_array.sort(function() {return 0.5 - Math.random()})
	result = text_array[0]
	/*
	var quantity = 2
	for(var i=0;i<quantity;i++)
	{
		result = result+"<br>"+text_array[i+1]
	}
	*/
	display("<span id='text'>"+result+"</span>")
}
function sort_list()
{
	var result
	if($("#list_options textarea").val())
		{result = $("#list_options textarea").val()}
	else
		{result = "list is empty"}
	switchMode("sort_list")
	var text_array = new Array()
	text_array = result.split("\n")
	text_array = text_array.sort(function() {return 0.5 - Math.random()})
	result = text_array.join("</li><li>")
	display("<span id='list'><ul><li>"+result+"</li></ul></span>")
}