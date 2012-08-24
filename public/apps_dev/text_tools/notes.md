#New HTML System
In the new HTML layout system, Text Tools will aim to have much less bloated code. The HTML code will have far less redundant data, leaving the work of those properties to new JavaScript functions. CSS will stay mostly the same, unless some minor tweaks are needed. The system will have to be robust in letting elements that are not in the effects class handle external click creation, focus regaining, and other important UI tasks.

##Old HTML
- '''<a href="javascript:toEffect('normal')" title="Outputs the original, unedited text." onFocus="regainFocus()" onClick="clicked(this)"><img src="icons/text.png">&nbsp;Normal</a>'''

##New HTML
- '''<a id="normal" class="effect"><img src="icons/text.png">&nbsp;Normal</a>'''

##New JavaScript
- when specific effect link clicked: switch to the effect named in the link's id
- when specific effect link hovered: show the link's help tooltip, which is stored in a data structure (if help mode is enabled)
- when any effect link clicked: run clicked(this) for the clicked item
- when any effect link focused: run regainFOcus()

#Changelog

##2.0
- extremely awesome new dark, minimalistic theme :3
- improved collapsing interface
- buttons are easier to click (block display)
- various fixes and improvements

##1.6
- manual list remover added
- plus and minus buttons added for list remover and repeater
- fixed extra line return at the end of numbered lists

##1.5
- new, modern theme with backwards compatibility
- basic bookmarklet support (a little buggy)
- more helpful about page
- faq updates
- much better compatibility with images turned off
- title case effect
- uppercase and lowercase effects for HTML tags
- numbered lists for list effect

##1.0
- first public release of Text Tools
