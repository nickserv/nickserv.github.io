var editor
$().ready(function() {
	editor = CodeMirror.fromTextArea(document.getElementById("editor"),
		{
			lineNumbers: true,
			indentWithTabs: true,
			indentUnit: 8
		})
	getFocus();
})

function getFocus() {$(".CodeMirror textarea").focus()}
function selectTheme(node)
{
    var theme = node.options[node.selectedIndex].innerHTML.toLowerCase()
    editor.setOption("theme", theme)
    getFocus()
}
function selectMode(node)
{
    var mode = node.options[node.selectedIndex].innerHTML.toLowerCase().split(" ").join("")
    editor.setOption("mode", mode)
    getFocus()
}