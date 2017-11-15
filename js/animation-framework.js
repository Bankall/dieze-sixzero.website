/**
 * @author Christian Sulecki
 */

/*jshint forin:true, noarg:true, noempty:true, eqeqeq:true, evil:true, laxbreak:true, bitwise:true, strict:true, undef:true, unused:true, curly:true, browser:true, devel:true, indent:4, maxerr:50, nonstandard:true */

(function(w) {
	
	"use strict";
	
	function Animation(data) {
		if(!data.object) {
			return;
		}
		
		var time = now(), browser = getBrowser(), eventNames = {
			"chrome" : {
				"transitionend" : "webkitTransitionEnd"
			},
			"safari" : {
				"transitionend" : "webkitTransitionEnd"
			},
			"firefox" : {
				"transitionend" : "transitionend"
			},
			"msie" : {
				"transitionend" : "transitionend"
			},
			"default" : {
				"transitionend" : "transitionend"
			}
		}, steps = "first second third fourth fifth sixth seventh eighth ninth tenth eleventh twelfth thirteenth fourteenth fifteenth sixteenth seventeenth eighteenth nineteenth twentieth".split(" "), defaultOptions = {
			length : 10,
			timeoutbetweeneach : 0,
			autostart : true,
			callback : function() { log("no callback"); }
		}, _options = {}, forward = true, globaltimeout, debug = w.DEBUG, backuptimeout;
		
		this.play = play;
		this.reverse = reverse;
		this.stop = stop;
		
		extend(data, defaultOptions);
		_options = data;
		_options.object = data.object[0] ? data.object : [data.object];
		
		function extend(a, b, nolog) {
			each(b, function(i) {
				if (typeof a[i] === "undefined" || ((a[i] === "" || a[i] === null) && a[i] !== false && a[i] !== 0)) {
					a[i] = b[i];
				} else if(typeof a[i] === "string" && typeof b[i] === "number" && parseInt(a[i], 10)) {
					a[i] = parseInt(a[i], 10);
				}
			});
		}
		
		function log(message) {
			if(!debug) {
				return;
			}
			var action = "log";
			if ( typeof message !== "object") {
				w.console[action]("[" + getTime() + "ms] " + message);
			} else {
				w.console[action]("[" + getTime() + "ms] --> Object");
				w.console[action](message);
			}
		}
		
		w.Object.prototype.addClass = function(cname) {
			if(!this.hasClass(cname)) {
				this.className += (this.className ? ' ' : '') + cname; 
			}
		};
	
		w.Object.prototype.removeClass = function(cname) {
			if (this.hasClass(cname)) {
				this.className = this.className.replace(new RegExp('(\\s|^)' + cname + '(\\s|$)'),' ').replace(/^\s+|\s+$/g, '');
			}
		};
		
		w.Object.prototype.hasClass = function(cname) {
			if(this.className) {
				return new RegExp('(\\s|^)' + cname + '(\\s|$)').test(this.className);	
			} else {
				return false;
			}
			
		};
		
		if(!w.Array.prototype.indexOf) {
			w.Array.prototype.indexOf = function(search) {
				var index = -1;
				for(var i = 0; i < this.length; i++) {
					if(this[i] === search) {
						index = i;
					}
				}
				return index;
			};
		}
	
		function getBrowser() {
			if (navigator.userAgent.search("Chrome") >= 0) {
				try {
					return "chrome";
				} catch(e) {
				}
			} else if (navigator.userAgent.search("Safari") >= 0) {
				try {
					return "safari";
				} catch(e) {
				}
			} else if (navigator.userAgent.search("Firefox") >= 0) {
				try {
					return "firefox";
				} catch(e) {
				}
			} else if (navigator.appName === 'Microsoft Internet Explorer') {
				try {
					return "msie";
				} catch(e) {
				}
			}
			return false;
		}
		
		function getEventName(event) {
			if (browser && eventNames[browser]) {
				return eventNames[browser][event];
			} else {
				return eventNames["default"][event];
			}
		}
	
		function now() {
			return new Date().getTime();
		}
	
		function getTime() {
			var timeFromStart = now() - time, zeroToAdd = 5 - timeFromStart.toString().length;
			while (zeroToAdd > 0) {
				zeroToAdd--;
				timeFromStart = "0" + timeFromStart;
			}
			return timeFromStart;
		}
	
		function each(object, callback) {
			for (var i in object) {
				if (object.hasOwnProperty(i)) {
					var x = callback.call(object[i], i);
					if (x !== undefined) {
						return x;
					}
				}
			}
		}
	
		function copy(array) {
			return Array.prototype.slice.call(array);
		}
		
		function getCurrentStepIndex(object) {
			var a = copy(steps), found = false, index = -1;
			
			a.reverse();
				
			each(a, function() {
				if(object.hasClass(this) && !found) {
					found = true;
					index = steps.indexOf(this);
				}
			});
			
			return index;
		}
		
		function play() {
			forward = true;
			handleNextStep();
		}
		
		function stop() {
			each(_options.object, function() {
				this.removeEventListener(getEventName("transitionend"), delayHandleNextStep, false);
			});
		}
		
		function reverse() {
			forward = false;
			handleNextStep();
		}
		
		function delayHandleNextStep() {
			clearTimeout(backuptimeout);
			globaltimeout = setTimeout(function() {
				clearTimeout(globaltimeout);
				setTimeout(function() {
					handleNextStep();
				}, _options.timeoutbetweeneach);
			}, 100);
		}
		
		function handleNextStep() {
			each(_options.object, function() {
				this.removeEventListener(getEventName("transitionend"), delayHandleNextStep, false);
				
				var x = getCurrentStepIndex(this), next = forward ? x + 1 : x - 1;
				
				if(forward) {
					if(steps[next] && next < _options.length) {
						this.addClass(steps[next]);
						this.addEventListener(getEventName("transitionend"), delayHandleNextStep, false);
					} else {
						_options.callback(forward);
					}
				} else {
					if(steps[x]) {
						this.removeClass(steps[x]);
						this.addEventListener(getEventName("transitionend"), delayHandleNextStep, false);
				
					} else {
						_options.callback(forward);
					}
				}
			});
		}
		
		if(_options.autostart) {
			log("Start animation");
			log(data.object);
			play();
		}
	}
	
	w.animate = function(args) {
		return new Animation(args);	
	};
})(window.location !== parent.window.location ? parent.window : window);
