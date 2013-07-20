var effect = "normal" //change this to a different effect to bug test it on startup
var focused
var char_count = ""
var word_count = ""
var line_count = ""
var find_count = ""
var watched_input
var watched_find
var watched_replace
var watched_list_start
var watched_repetitions
var watched_cutoff
var watched_number_list_checkbox
var working_input
var content_array = new Array()

//update input if using bookmarklet
function getUrlVars()
  {var map = {};var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m,key,value) {map[key] = value;});return map;}
function setInput()
{
  if(decodeURIComponent(getUrlVars()["before"])!="undefined")
    {document.text_tools.text_before.value = decodeURIComponent(getUrlVars()["before"])}
}

//conversion function
function convert()
{
  watched_input = document.text_tools.text_before.value
  
  if(document.text_tools.find_text.value!="")
    {find_count = (watched_input.split(new RegExp(document.text_tools.find_text.value, "gi")).length-1); document.getElementById("find_counter").innerHTML = " ("+find_count+")";}
  else
    {document.getElementById("find_counter").innerHTML = "";}

  if(effect == "normal")
  {
    update(watched_input)
  }
  if(effect == "lowercase")
  {
    update(watched_input.toLowerCase())
  }
  if(effect == "uppercase")
  {
    update(watched_input.toUpperCase())
  }
  if(effect == "htmllower")
  {
    htmlCase("lower")   
  }
  if(effect == "htmlupper")
  {
    htmlCase("upper")
  }
//  if(effect == "sentencecase")
//  {
//    update(watched_input.toUpperCase())
//  }
  if(effect == "titlecase")
  {
    update(watched_input.toLowerCase().toTitleCase())
  }
//  if(effect == "reversecase")
//  {
//    update(watched_input.toUpperCase())
//  }
  if(effect == "find")
  {
    document.text_tools.text_after.value = watched_input.replace(new RegExp(document.text_tools.find_text.value, "gi"), document.text_tools.find_text.value.toUpperCase())
  }
  if(effect == "replace")
  {
    document.text_tools.text_after.value = watched_input.replace(new RegExp(document.text_tools.find_text.value, "gi"), document.text_tools.replace_text.value)
  }
  if(effect == "list")
  {
    if(document.text_tools.number_list.checked==true)
      {listNumbers()}
    else
      {document.text_tools.text_after.value = document.text_tools.list_start.value+watched_input.replace(new RegExp("\n", "gi"),"\n"+document.text_tools.list_start.value)}
  }
  if(effect == "remove_list")
  {
    text_array = watched_input.split("\n")
    for (i=0;i<text_array.length;i++)
    {
      text_array[i] = text_array[i].substring(watched_cutoff)
    }
    update(text_array.join("\n"))
  }
  if(effect == "repeat")
  {
    update(watched_input.repeat(parseInt(document.text_tools.repetitions.value)))
  }
/*  if(effect == "whitespace")
  {
    update(watched_input.replace(/\s+/g,''))
  }*/
  if(effect == "wordcount")
  {
    char_count = watched_input.length
    line_count = watched_input.split("\n")
    line_count = line_count.length
    word_count = watched_input.split(" ")
    word_count = word_count.length + line_count - 1
    if(watched_input=="") {word_count=0}
    update("Characters: "+char_count+"\nWords: "+word_count+"\nLines: "+line_count)
  }
  if(effect == "sortaz")
  {
    text_array = watched_input.split("\n")
    text_array = text_array.sort()
    update(text_array.join("\n"))
  }
  if(effect == "sortza")
  {
    text_array = watched_input.split("\n")
    text_array = text_array.sort()
    text_array = text_array.reverse()
    update(text_array.join("\n"))
  }
  if(effect == "sortreverse")
  {
    text_array = watched_input.split("\n")
    text_array = text_array.reverse()
    update(text_array.join("\n"))
  }
  if(effect == "sortrandom")
  {
    text_array = watched_input.split("\n")
    text_array = text_array.sort(function() {return 0.5 - Math.random()})
    update(text_array.join("\n"))
  }
  if(effect == "rot13")
  {
    update(watched_input.replace(/[a-zA-Z]/g, function(c){return String.fromCharCode((c <= "Z" ? 90 : 122) >= (c = c.charCodeAt(0) + 13) ? c : c - 26)}))
  }
  if(effect == "backwards")
  {
    var backwards = "";
    for (i = 0; i <= watched_input.length; i++)
    backwards = watched_input.substring(i, i+1) + backwards
    update(backwards)
  }
  
  //output autoselect exclusion
  if(focused==document.text_tools.text_after && effect!="find" && effect!="replace" && effect!="list" && effect!="remove_list" && effect!="repeat")
  {
    selectAll(document.text_tools.text_after)
  }
}

function watchInput() //input watcher
{
  if(watched_input != document.text_tools.text_before.value)
    {convert();}
  if(watched_find != document.text_tools.find_text.value)
    {watched_find = document.text_tools.find_text.value; convert();}
  if(watched_replace != document.text_tools.replace_text.value)
    {watched_replace = document.text_tools.replace_text.value; convert();}
  if(watched_list_start != document.text_tools.list_start.value)
    {watched_list_start = document.text_tools.list_start.value; convert();}
  if(watched_repetitions != document.text_tools.repetitions.value)
    {watched_repetitions = document.text_tools.repetitions.value; convert();}
  if(watched_cutoff != document.text_tools.cutoff.value)
    {watched_cutoff = document.text_tools.cutoff.value; convert();}
}

//various system functions
function outputToInput()
  {document.text_tools.text_before.value = document.text_tools.text_after.value;}
function update(change)
  {document.text_tools.text_after.value = change;}
function changeEffect(change)
  {effect = change; convert();}
function selectAll(field)
  {field.focus(); field.select();}
function clear()
  {document.text_tools.text_before.value = ""; document.text_tools.find_text.value = ""; document.text_tools.replace_text.value = ""; document.text_tools.list_start.value = "- "; document.text_tools.cutoff.value = "3"; document.text_tools.repetitions.value = "1";  document.text_tools.number_list.checked = false;}
function updateFocus(newFocus)
  {focused = newFocus;}
function regainFocus()
  {focused.focus()}

function toggleCheck(element)
  {if(element.checked==true) {element.checked=false} else {element.checked=true}}
String.prototype.repeat = function(l){return new Array(l+1).join(this);}

//plus and minus buttons
function valueUp(variable)
  {variable.value=parseInt(variable.value)+1}
function valueDown(variable)
  {variable.value=parseInt(variable.value)-1;if(parseInt(variable.value)<0){variable.value="0"}}

//awesome html case changer by me :D
function htmlCase(html_case_mode)
{
  working_input = watched_input
  content_array = new Array()
  for (i=1;i<watched_input.split(new RegExp("<", "gi")).length;i++) //set the input into an array
  {
    if(working_input.indexOf("<")!=-1)
    {
      content_array.push(working_input.substring(0,working_input.indexOf("<"))+"<")
      working_input = working_input.substring(working_input.indexOf("<")+1)
    }
    if(working_input.indexOf(">")!=-1)    
    {
      content_array.push(working_input.substring(0,working_input.indexOf(">"))+">")
      working_input = working_input.substring(working_input.indexOf(">")+1)
    }
  }
  content_array.push(working_input)
  for (i=1;i<content_array.length;i=i+2) //change the case of html
  {
    if(html_case_mode=="lower")content_array[i] = content_array[i].toLowerCase()
    if(html_case_mode=="upper")content_array[i] = content_array[i].toUpperCase()
  }
  update(content_array.join("")) //set this value as blank when not bug testing
}

//numbered lists
function listNumbers()
{
  working_input = ""
  content_array = new Array()
  content_array = watched_input.split(new RegExp("\n", "gi"))
  var list_length = content_array.length
  var num = 0
  for (i=0;i<list_length;i++) //act sequentially on all array items
  {
    working_input = working_input + ++num + document.text_tools.list_start.value + content_array.shift() + "\n"
  }
  update(working_input.slice(0,working_input.length-1))
}

//to title case 1.1.1 by david gouch <http://individed.com> license: http://individed.com/code/to-title-case/license.txt
String.prototype.toTitleCase = function() {
    return this.replace(/([\w&`'‘’"“.@:\/\{\(\[<>_]+-? *)/g, function(match, p1, index, title) {
        if (index > 0 && title.charAt(index - 2) !== ":" &&
          match.search(/^(a(nd?|s|t)?|b(ut|y)|en|for|i[fn]|o[fnr]|t(he|o)|vs?\.?|via)[ \-]/i) > -1)
            return match.toLowerCase();
        if (title.substring(index - 1, index + 1).search(/['"_{(\[]/) > -1)
            return match.charAt(0) + match.charAt(1).toUpperCase() + match.substr(2);
        if (match.substr(1).search(/[A-Z]+|&|[\w]+[._][\w]+/) > -1 || 
          title.substring(index - 1, index + 1).search(/[\])}]/) > -1)
            return match;
        return match.charAt(0).toUpperCase() + match.substr(1);
    });
};

//numbers only
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

//selected button stuff
function addClass(ele,clss) {if(!ele.className.match(new RegExp("\\b ?"+clss+"\\b"))); ele.className += ' '+clss;}
function removeClass(ele,clss) {ele.className = ele.className.replace(new RegExp("\\b ?"+clss+"\\b"),"");}
var lastActive = null;
function clicked(clickedOn) {if(lastActive) removeClass(lastActive, 'active'); addClass(clickedOn, 'active'); lastActive = clickedOn;}