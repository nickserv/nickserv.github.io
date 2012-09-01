var keyword
var query_text
var mode
var watched_query
var start_text = "Type a URL to visit that location."

function watchQuery()
{
	if(document.zip.query.value!="")
		{document.getElementById("inspector").innerHTML = "<i>Go to </i>"+document.zip.query.value}
	else
		{document.getElementById("inspector").innerHTML = start_text}
}

function zip()
{
	if(document.zip.query.value.indexOf("http://")==0 || document.zip.query.value.indexOf("https://")==0)
		{window.location = document.zip.query.value}
	else
		{window.location = "http://"+document.zip.query.value}
}