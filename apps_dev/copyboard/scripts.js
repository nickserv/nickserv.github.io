function notifyCopy() {
	$('#copy_notice').fadeIn(250).delay(3000).fadeOut(250);
};

function bindAll() {
	var boxes = $('.box').get();
	var conts = $('.cont').get();
	var clips = [];
	for(var i=0; i<$('.box').length; i++) {
		clips.push(bindBox(boxes[i],conts[i]));
	};
};

function bindBox(box,cont) {
	console.log("binding a box");
	var clip = new ZeroClipboard.Client();
	clip.setText($(box).text());
	clip.addEventListener('complete',function(){notifyCopy()});
	clip.glue(box,cont); //STYLING ERROR
	return clip;
}

$(document).ready(function() {
	ZeroClipboard.setMoviePath('zeroclipboard/ZeroClipboard.swf');
	bindAll();
	$(".alert").alert();
	$(".alert").alert('close');
	$(".alert").alert();
});
