$(document).ready(function(){
	// set #background-* to full window height and fade in the body
	var width = $(window).width();
	var height = $(window).height();
		$('#background-container, #background-1, #background-2').css({
			'min-width': width,
			'min-height': height
		});

	// call new svg and start recreate svg timeout
	svgNew();
	recreateSvg();
	
	/******** Copyright Year   **********/
	var date = new Date().getFullYear();
	document.getElementById('currentyear').innerHTML = date;
	


	/****** Key Coding **************/

var keyCodes={3:"Break",8:"Backspace / Delete",9:"Tab",12:'Clear',13:"Enter",16:"Shift",17:"Ctrl",18:"Alt",19:"Pause/Break",20:"Caps lock",27:"Escape",32:"Spacebar",33:"Page up",34:"Page down",35:"End",36:"Home ",37:"Left arrow ",38:"Up arrow ",39:"Right arrow",40:"Down arrow ",41:"Select",42:"Print",43:"Execute",44:"Print Screen",45:"Insert ",46:"Delete",48:"0",49:"1",50:"2",51:"3",52:"4",53:"5",54:"6",55:"7",56:"8",57:"9",58:":",59:"Semicolon (firefox), equals",60:"<",61:"Equals (firefox)",63:"ß",64:"@ (firefox)",65:"A",66:"B",67:"C",68:"D",69:"E",70:"F",71:"G",72:"H",73:"I",74:"J",75:"K",76:"L",77:"M",78:"N",79:"O",80:"P",81:"Q",82:"R",83:"S",84:"T",85:"U",86:"V",87:"W",88:"X",89:"Y",90:"Z",91:"Windows Key / Left ⌘ / Chromebook Search key",92:"Right window key ",93:"Windows Menu / Right ⌘",96:"Numpad 0 ",97:"Numpad 1 ",98:"Numpad 2 ",99:"Numpad 3 ",100:"Numpad 4 ",101:"Numpad 5 ",102:"Numpad 6 ",103:"Numpad 7 ",104:"Numpad 8 ",105:"Numpad 9 ",106:"Multiply ",107:"Add",108:"Numpad period (firefox)",109:"Subtract ",110:"decimal point",111:"divide ",112:"f1 ",113:"f2 ",114:"f3 ",115:"f4 ",116:"f5 ",117:"f6 ",118:"f7 ",119:"f8 ",120:"f9 ",121:"f10",122:"f11",123:"f12",124:"f13",125:"f14",126:"f15",127:"f16",128:"f17",129:"f18",130:"f19",131:"f20",132:"f21",133:"f22",134:"f23",135:"f24",144:"num lock ",145:"scroll lock",160:"^",161:'!',163:"#",164:'$',165:'ù',166:"page backward",167:"page forward",169:"closing paren (AZERTY)",170:'*',171:"~ + * key",173:"minus (firefox), mute/unmute",174:"decrease volume level",175:"increase volume level",176:"next",177:"previous",178:"stop",179:"play/pause",180:"e-mail",181:"mute/unmute (firefox)",182:"decrease volume level (firefox)",183:"increase volume level (firefox)",186:"semi-colon / ñ",187:"equal sign ",188:"comma",189:"dash ",190:"period ",191:"forward slash / ç",192:"grave accent / ñ / æ",193:"?, / or °",194:"numpad period (chrome)",219:"open bracket ",220:"back slash ",221:"close bracket / å",222:"single quote / ø",223:"`",224:"left or right ⌘ key (firefox)",225:"altgr",226:"< /git >",230:"GNOME Compose Key",231:"ç",233:"XF86Forward",234:"XF86Back",255:"toggle touchpad"};

	var keyCode = document.getElementById('key_codes');
	var keyInfo = document.getElementById('key_info');
	var welcomeInfo = document.getElementById('welcome_info');
	
	$(keyCode).hide();
	$(keyInfo).hide()
	
	window.addEventListener('keydown',function(event){
		$(welcomeInfo).hide();
		$(keyCode).show();
		keyCode.textContent=event.keyCode || event.which;
		$(keyInfo).show();
		keyInfo.textContent= keyCodes[event.keyCode || event.which];
//			String.fromCharCode(event.keyCode || event.which);
	});

});

// GOOGLE ANALYTICS TAG

  (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
  (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
  m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
  })(window,document,'script','https://www.google-analytics.com/analytics.js','ga');

  ga('create', 'UA-97416980-1', 'auto');
  ga('send', 'pageview');

// END GOOGLE ANALYTICS TAG

// set global svg object
var svg = {};
// used to determine which background to draw to
var draw = 1;
// create new svg 
var svgNew = function(){
	svg.t = new Trianglify({
		noiseIntensity: 0,
	});
	// set svg size to window height and width
	svg.width = $(window).width();
	svg.height = $(window).height();
	svg.pattern = svg.t.generate(svg.width, svg.height);
	// draw svg on to either background 1 or 2
	if (draw === 1) {
		svgDraw1();
	} else {
		svgDraw2();
	}
}; // end svgNew

// draw svg on to bg1 and call fade
// if called with resize, redraw the svg to match new size and do not call fade
var svgDraw1 = function (resize){
	draw = 2;
	if (resize === 'resize') {	
		svg.pattern = svg.t.generate(svg.width, svg.height);
		$('#background-1').css({
			'min-width': svg.width,
			'min-height': svg.height,
			'background': svg.pattern.dataUrl
		});
		$('#contact-background-1').css({
			'min-width': svg.width,
			'min-height': (svg.height / 2),
			'background': svg.pattern.dataUrl
		});
	} else {
		$('.background-1').css({
			'background': svg.pattern.dataUrl
		});
		fade1();
	}
}; // end svgDraw1

// same as above but for bg2
var svgDraw2 = function(resize){
	draw = 1;
	if (resize === 'resize') {	
		svg.pattern = svg.t.generate(svg.width, svg.height);
		$('#background-2').css({
			'min-width': svg.width,
			'min-height': svg.height,
			'background': svg.pattern.dataUrl
		});
		$('#contact-background-2').css({
			'min-width': svg.width,
			'min-height': (svg.height / 2),
			'background': svg.pattern.dataUrl
		});
	} else {
		$('.background-2').css({
			'background': svg.pattern.dataUrl
		});
		fade2();
	}
}; // end svgDraw2

// fade in bg1 and fade our bg2
var fade1 = function(){
	$('.background-1').velocity("fadeIn", { duration: 3000 });
	$('.background-2').velocity("fadeOut", { duration: 4000 });
};
// fade in bg2 and fade out bg1
var fade2 = function(){
	$('.background-2').velocity("fadeIn", { duration: 3000 });
	$('.background-1').velocity("fadeOut", { duration: 4000 });
};

// timeout function to create new svg every 5 seconds
var recreateSvg = function(){
 	window.setInterval(svgNew, 5000);
};

// redraw the current svg to match screen size on resize
$(window).resize(function() {
	svg.width = $(window).width();
	svg.height = $(window).height();
	$('#background-container').css({
		'min-width': svg.width,
		'min-height': svg.height
	});
	$('#contact-container').css({
		'min-width': svg.width,
		'min-height': (svg.height / 2)
	});
	svgDraw1('resize');
	svgDraw2('resize');
});
