/**
 * @author Christian Sulecki
 */

/*jshint forin:true, noarg:true, noempty:true, eqeqeq:true, evil:true, laxbreak:true, bitwise:true, strict:true, undef:true, unused:true, curly:true, browser:true, devel:true, indent:4, maxerr:50, nonstandard:true */

(function(w) {
	"use strict";
	
	var DEBUG = true,
		BYPASS_CACHE = true,
		SCRIPT_TO_LOAD = ["js/animation-framework.js", "js/main.js", "js/swfobject.js"];
	
	w.DEBUG = DEBUG;
	
	var a = {},
		browser = getBrowser(),
		device = getDevice(navigator.userAgent),
		ios = browser === "safari" && (device === "tablet" || device === "mobile") ? iOSversion()[0] : false;
		
	w.ios = ios;
		
	if(!w.addEventListener || (browser === "msie" && (a.msie < 10 || device === "tablet")) || (ios && ios < 7)) {
		w.location = "/uncompliant-browser";
		return;
	}

	function getBrowser() {
		if(navigator.userAgent.search("Chrome") >= 0) {
			try {
				a.chrome = parseInt(navigator.userAgent.match(/Chrome\/([0-9]+)/)[1], 10);
				return "chrome";
			} catch(e) {}
		} else if(navigator.userAgent.search("Safari") >= 0) {
			try {
				a.safari = navigator.userAgent.match(/Version\/([.0-9]+)/)[1];
				return "safari";
			} catch(e) {}
		} else if(navigator.userAgent.search("Firefox") >= 0) {
			try {
				a.firefox = parseInt(navigator.userAgent.match(/Firefox\/([0-9]+)/)[1], 10);
				return "firefox";
			} catch(e) {}
		} else if(navigator.appName === 'Microsoft Internet Explorer') {
			try {
				var rv = false, ua = navigator.userAgent, re = new RegExp('MSIE ([0-9]{1,}[.0-9]{0,})');
				if (re.exec(ua) !== null) {
					rv = parseFloat(RegExp.$1);
				}
				a.msie = rv;
				return "msie";
			} catch(e) {}
		}
	}
	
	function getDevice(ua) {
		if (!ua || ua === '') {
			// No user agent.
			return "desktop";
		}

		if (ua.match(/GoogleTV|SmartTV|Internet TV|NetCast|NETTV|AppleTV|boxee|Kylo|Roku|DLNADOC|CE\-HTML/i)) {
			return 'desktop';
		} else if (ua.match(/Xbox|PLAYSTATION 3|Wii/i)) {
			return 'desktop';
		} else if (ua.match(/iP(a|ro)d/i) || (ua.match(/tablet/i) && !ua.match(/RX-34/i)) || ua.match(/FOLIO/i)) {
			return 'tablet';
		} else if (ua.match(/Linux/i) && ua.match(/Android/i) && !ua.match(/Fennec|mobi|HTC Magic|HTCX06HT|Nexus One|SC-02B|fone 945/i)) {
			return 'tablet';
		} else if (ua.match(/Kindle/i) || (ua.match(/Mac OS/i) && ua.match(/Silk/i))) {
			return 'tablet';
		} else if (ua.match(/GT-P10|SC-01C|SHW-M180S|SGH-T849|SCH-I800|SHW-M180L|SPH-P100|SGH-I987|zt180|HTC( Flyer|_Flyer)|Sprint ATP51|ViewPad7|pandigital(sprnova|nova)|Ideos S7|Dell Streak 7|Advent Vega|A101IT|A70BHT|MID7015|Next2|nook/i) || (ua.match(/MB511/i) && ua.match(/RUTEM/i))) {
			return 'tablet';
		} else if (ua.match(/BOLT|Fennec|Iris|Maemo|Minimo|Mobi|mowser|NetFront|Novarra|Prism|RX-34|Skyfire|Tear|XV6875|XV6975|Google Wireless Transcoder/i)) {
			return 'mobile';
		} else if (ua.match(/Opera/i) && ua.match(/Windows NT 5/i) && ua.match(/HTC|Xda|Mini|Vario|SAMSUNG\-GT\-i8000|SAMSUNG\-SGH\-i9/i)) {
			return 'mobile';
		} else if ((ua.match(/Windows (NT|XP|ME|9)/) && !ua.match(/Phone/i)) && !ua.match(/Bot|Spider|ia_archiver|NewsGator/i) || ua.match(/Win( ?9|NT)/i)) {
			return 'desktop';
		} else if (ua.match(/Macintosh|PowerPC/i) && !ua.match(/Silk/i)) {
			return 'desktop';
		} else if (ua.match(/Linux/i) && ua.match(/X11/i) && !ua.match(/Charlotte/i)) {
			return 'desktop';
		} else if (ua.match(/CrOS/)) {
			return 'desktop';
		} else if (ua.match(/Solaris|SunOS|BSD/i)) {
			return 'desktop';
		} else if (ua.match(/curl|Bot|B-O-T|Crawler|Spider|Spyder|Yahoo|ia_archiver|Covario-IDS|findlinks|DataparkSearch|larbin|Mediapartners-Google|NG-Search|Snappy|Teoma|Jeeves|Charlotte|NewsGator|TinEye|Cerberian|SearchSight|Zao|Scrubby|Qseero|PycURL|Pompos|oegp|SBIder|yoogliFetchAgent|yacy|webcollage|VYU2|voyager|updated|truwoGPS|StackRambler|Sqworm|silk|semanticdiscovery|ScoutJet|Nymesis|NetResearchServer|MVAClient|mogimogi|Mnogosearch|Arachmo|Accoona|holmes|htdig|ichiro|webis|LinkWalker|lwp-trivial|facebookexternalhit/i) && !ua.match(/phone|Playstation/i)) {
			return 'bot';
		} else {
			return 'mobile';
		}
	}
	
	function iOSversion() {
		if (/iP(hone|od|ad)/.test(navigator.platform)) {
    		// supports iOS 2.0 and later: <http://bit.ly/TJjs1V>
    		var v = (navigator.appVersion).match(/OS (\d+)_(\d+)_?(\d+)?/);
    		return [parseInt(v[1], 10), parseInt(v[2], 10), parseInt(v[3] || 0, 10)];
  		}
	}
	
	function loadJsFile(url) {
		var iframe = document.createElement('iframe'), where = document.getElementsByTagName('script')[0], doc;

		(iframe.frameElement || iframe).style.cssText = "width: 0; height: 0; border: 0";
		iframe.src = "javascript:false";

		where.parentNode.insertBefore(iframe, where);

		doc = iframe.contentWindow.document;
		doc.open().write('<body onload="' + 'var js = document.createElement(\'script\');' + 'js.src = \'' + url + (BYPASS_CACHE ? "?" + new Date().getTime() : "") +'\';' + 'document.body.appendChild(js);">');
		doc.close();
	}
	
	for(var i in SCRIPT_TO_LOAD) {
		if(SCRIPT_TO_LOAD.hasOwnProperty(i)) {
			loadJsFile(SCRIPT_TO_LOAD[i]);
		}
	}
	
	function getViewportSize() {
		var viewportwidth, viewportheight;
		if (navigator.userAgent.match(/ipad/i)) {
			viewportwidth = window.innerWidth * screen.width / window.innerWidth;
			viewportheight = window.innerHeight * screen.width / window.innerWidth;
		} else if ( typeof window.innerWidth !== 'undefined') {
			viewportwidth = window.innerWidth;
			viewportheight = window.innerHeight;
		} else if ( typeof document.documentElement !== 'undefined' && typeof document.documentElement.clientWidth !== 'undefined' && document.documentElement.clientWidth !== 0) {
			viewportwidth = document.documentElement.clientWidth;
			viewportheight = document.documentElement.clientHeight;
		} else {
			viewportwidth = document.getElementsByTagName('body')[0].clientWidth;
			viewportheight = document.getElementsByTagName('body')[0].clientHeight;
		}

		return [viewportwidth, viewportheight];
	}
	
	document.addEventListener("DOMContentLoaded", function() {
		document.querySelector("#intro").style.height = getViewportSize()[1] + "px";
		
		window.location.hash = "#introduction";
		
		function f() {
			var width = getViewportSize()[0], body = document.body, name = "";
			if(width >= 1200) {
				name = "desktop";
			} else if(width < 1200 && width > 600) {
				name = "tablet";
			} else {
				name = "mobile";
			}
			
			if(name !== body.className) {
				body.className = name;
			}
			
			if(window.location.hash === "#introduction") {
				scrollTo(0, 0);
			}
		}
		setInterval(f, 100);
		f();
	});
	
}(window));
