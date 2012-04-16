function getUrlVars()
	{var map = {};var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m,key,value) {map[key] = value;});return map;}

var setup = true
if(decodeURIComponent(getUrlVars()["urls"])!="undefined")
	{setup = false}

if(setup==true) //adds scripting abilities to link creation page if a link is not already defined
{
	var url_list
	var link
	var title
	var watched_title
	var watched_urls
	var base_url = "http://thenickperson.com/apps/mtb/index.html"
	var link_reg = /((http|https|ftp|ftps)\:\/\/)?[a-zA-Z0-9\-\.]+\.[a-zA-Z]{2,3}(\/\S*)?/gi
	
	function selectAll(field)
		{field.focus(); field.select();}
	
	function createLink()
	{
		url_list = $("#urls").val().toString()
		url_list = url_list.match(link_reg)
		if(url_list!=null)
		{
			link = base_url+"?urls=["+url_list.join("][")+"]"
			$("#preview").show()
			var linked_list = ""
			for(var i=0; i<url_list.length; i++)
			{
				linked_list = linked_list+"<a href='"+url_list[i]+"' target='_blank'>"+url_list[i]+"</a><br>"
			}
			$("#preview").html(linked_list)
			console.log(linked_list)
		}
		else
		{
			link = base_url
			$("#preview").hide()
		}
		title = $("#title").val()
		if(title=="") {title="Untitled Bookmark"}		
		$("#link").html(title)
		$("#link").attr("href", link)
	}
	
	function watchInput() //input watcher
	{
		createLink()
		/*if(watched_title != $("#title").val())
			{createLink(); watched_title = $("#title").val();}
		if(watched_urls != $("#title").val())
			{createLink(); watched_urls = $("#title").val();}*/
	}
	$(document).ready(function() {
		setInterval('watchInput()',10)
		$('#title').focus(); 
	})
}

if(setup==false) //loads link
{
	//extracts urls
	urls = decodeURIComponent(getUrlVars()["urls"])
	urls = urls.substring(1, urls.length-1)
	urls = urls.split("][")
	//load all but first page
	for (i=1;i<urls.length;i++)
		{var windows = window.open(urls[i])}
	//popup blocker test
	//var testWindow = window.open()
	if(windows)
		{var popups = true}
	else
		{var popups = false}
	//load first page
	if(popups==true) {window.location = urls[0]}
	if(popups==false) {$("body").html("<div id='error'>A popup blocker is preventing your links from opening.<br><br>Please either turn it off or allow this site in your popup blocker.</div>")}
}
