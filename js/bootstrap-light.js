/**
 * @author Christian Sulecki
 */

/*jshint forin:true, noarg:true, noempty:true, eqeqeq:true, evil:true, laxbreak:true, bitwise:true, strict:true, undef:true, unused:true, curly:true, browser:true, devel:true, indent:4, maxerr:50, nonstandard:true */

(function(w) {
	"use strict";
	
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
		
		function f() {
			var width = getViewportSize()[0], body = document.body, name = "";
			if(width > 1100) {
				name = "desktop";
			} else {
				name = "mobile";
			}
			
			if(name !== body.className) {
				body.className = name;
			}
		}
		
		setInterval(f, 100);
		f();
		
	});
	
}(window));
