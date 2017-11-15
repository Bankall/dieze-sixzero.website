/**
 * @author Christian Sulecki
 */

/*jshint forin:true, noarg:true, noempty:true, eqeqeq:true, evil:true, laxbreak:true, bitwise:true, strict:true, undef:true, unused:true, curly:true, browser:true, devel:true, indent:4, maxerr:50, nonstandard:true */

(function(w) {
	"use strict";

	var time = now(), 
		browser = getBrowser(), 
		d = w.document, 
		intro, 
		animate,
		device = d.body.className,
		debug = w.DEBUG, 
		scrollinterval, 
		json = false,
		current_project,
		LOCALES = ["en", "fr"],
		swfobject,
		last = device,
		ios = w.ios;
		
	/*
	 * Core
	 */

	function startup() {
		
		if (!w.animate || !w.swfobject) {
			setTimeout(function() {
				startup();
			}, 200);
			return;
		}

		log("Start up - " + device);
		
		animate = w.animate;
		swfobject = w.swfobject;
		
		intro = get("#intro");
		
		intro.animation = animate({
			object : intro,
			length : 13,
			callback : function() {
				
				d.body.style.overflow = "auto";
				intro.style.display = "none";

				w.location.hash = "#main";
				
				get("nav").addClass("display");
				
				animate({
					object : get("#main nav ul"),
					length : 5,
					callback : function() {
						each(get("#main nav ul li"), function() {
							if ( typeof this === "object") {
								addRollOver(this);
							}
						});
						
						get("#locales_selector").addClass("display");
						get("#logo").addClass("display");
						get("#goto_project").addClass("display");
						each(get(".navigation_guide"), function() {
							if(this.addClass) {
								this.addClass("display");
							}
						});
						
						
						setLocaleSelector(get("#locales_selector .locale"));
						
						each(get(".goto_button"), function() {
							if(typeof this === "object") {
								this.setButton();
								this.addEventListener("click", function() {
									var anchor = "." + this.id.replace("goto_", "") + "_anchor";
									sweetScroll(getTop(anchor));
								});
							}
						});
						
						each(get("#social .logo"), function() {
							if(typeof this === "object") {
								this.setButton();
							}
						});
						
						if(ios) {
							prepareProjects(true);
						}
					}
				});
			}
		});
		
		prepareProjects();
		watchScrollLevel();
		watchKeyPressed();
		watchResize();
		
		get('#mobile_description').setButton();
		
		var xhr = new XMLHttpRequest();
		
		xhr.open("GET", "data/projects.json.php", true);
		xhr.send();
		
		xhr.onreadystatechange = function() {
			if(xhr.readyState === 4 && xhr.status === 200) {
				log("Projects data loaded");
				json = JSON.parse(xhr.responseText);
			}
		};
		
		get(".arrow-right").onclick = loadNextProject;
		get(".arrow-left").onclick = loadPreviousProject;
		get(".project_anchor").onclick = closeStage;
		
		get("#logo_bottom").onclick = closeStage;
	}
	
	function watchKeyPressed() {
		w.addEventListener("keypress", function(e) {
			if(e.keyCode === 39) {
				//next
				loadNextProject();
			} else if(e.keyCode === 37) {
				//prev
				loadPreviousProject();
			} else if(e.keyCode === 27) {
				//exit
				closeStage();
			}
		});
	}
	
	function watchResize() {
		setInterval(function() {
			if(last !== d.body.className) {
				log("Width threshold passed");
				last = device = d.body.className;
				
				prepareProjects(true);
				
				setTimeout(function() {
					prepareProjects(true);
				}, 600);
				
				setTimeout(function() {
					prepareProjects(true);
				}, 1000);
			}
		}, 200);	
	}
	
	w.prepareProjects = prepareProjects;
	
	function prepareProjects(replace) {
		var top = 0, PROJECT_ORIGINAL_SIZE = device === "tablet" ? 200 : device === "mobile" ? 90 : 325;
		
		each(get(".project"), function(i) {
			if(typeof this === "object") {
				var y = parseInt(this.getBoundingClientRect().width, 10),
					z = parseInt(this.getBoundingClientRect().height, 10),
					x = y / 2 * - 1 + ((y - PROJECT_ORIGINAL_SIZE) / 2),
					middle = x,
					position,
					mover = device === "mobile" && ios ? 5 : device === "mobile" ? 5 : device === "tablet" ? 5 : 10;
					
				if(i % 3 === 0) {	
					position = "middle";
					x = x;
					top += y / 2 + mover;
				} else if(i % 3 === 1) {
					position = "left";
					x += ((y) / -2) - mover;
					top += y / 2 + mover;
				} else if(i % 3 === 2) {
					position = "right";
					x = ((y - PROJECT_ORIGINAL_SIZE) / 2) + mover;
				}
				
				this.style.marginLeft = x + "px";
				this.style.top = top + "px";
				
				this.setAttribute("data-left", x);
				this.setAttribute("data-top", top);
				this.setAttribute("data-position", position);
				this.setAttribute("data-middle", middle);
				
				if(!replace) {
				
					this.addEventListener("mousemove", function() {
						if(!this.hasClass("hover") && device === "desktop") {
							this.addClass("hover");
							this.style.opacity = 1;
						}
					});
						
					this.addEventListener("mouseout", function() {
						if(device === "desktop") {
							this.removeClass("hover");	
						}
					});
					
					this.addEventListener("click", function() {
						
						if(get("#projects").hasClass("stage-on")) {
							return;
						}
						
						log("Show project " + this.id);
						
						
						this.addClass("active");
						
						var _original = this,
							right = getViewportSize()[0] / 2 + 70, 
							left = getViewportSize()[0] / 2 * -1 - 395;
						
						each(get(".project"), function(i) {
							if(typeof this === "object") {
								if(this !== _original) {
									var _this = this, pos = this.getAttribute("data-position"), goingto = (pos === "right" ? right : pos === "left" ? left : Math.random() > 0.5 ? right : left);
									setTimeout(function() {
										log("Losange " + _this.id + " -> " + pos + " going to " + goingto);
										_this.style.marginLeft = goingto + "px";
									}, Math.random() * 1 * 1000);
								}
							}
						});
						
						setTimeout(function() {
							setupProjectStage(_original);
						}, 1000);
					});
				}
			}
		});
	}
	
	function setupProjectStage(project) {
		log("Setting up project " + project.id);
		
		current_project = project;
		
		project.style.marginLeft = project.getAttribute("data-middle") + "px";
		
		each(get(".project"), function(i) {
			if(typeof this === "object") {
				if(this !== current_project) {
					this.style.visibility = "hidden";
				}
			}
		});
		
		setTimeout(function() {
			animate({
				object : project,
				length : 1,
				callback : function() {
					get("#projects").addClass("stage-on");
					loadProject();
				}
			});
			
			sweetScroll(getTop("#projects"));
		}, 500);	
	}
	
	function loadProject() {
		var key = current_project.id, wrapper = get("#project_content");
		
		wrapper.innerHTML = "";
		
		get("#projects .breadcrumb").style.background = "url('projects/" + key + "/" + ( device === "desktop" ? "breadcrumb.jpg" : "breadcrumbs_mobile.png") + "') 0 0 no-repeat";	
		
		log("Project id #" + key);
		
		current_project.querySelector(".tag").addClass(json.projects[key].tag);
		current_project.querySelector(".description").innerHTML = json.projects[key].description;
		
		animate({
			object : current_project.querySelector(".meta-wrapper"),
			length : 2
		});
		
		each(json.projects[key].content, function() {
			var x;
			if(typeof this === "string") {
				if(this === "gotop") {
					
					x = d.createElement("div"); 
					var y = d.createElement("div"), z = d.createElement("div");
					
					x.className = "gotop-button";
					
					y.className = z.className = "gotop-button-item";
					
					y.style.background = "url('projects/" + key + "/up.svg') 0 0 no-repeat";
					z.style.background = "url('projects/" + key + "/up-survol.svg') 0 0 no-repeat";
					z.style.display = "none";
					
					x.appendChild(y);
					x.appendChild(z);
					
					if(device === "desktop") {
						x.addEventListener("mouseover", function() {
							z.style.display = "block";
							y.style.display = "none";
						});
						
						x.addEventListener("mouseout", function() {
							z.style.display = "none";
							y.style.display = "block";
						});
					}
					
					wrapper.appendChild(x);
					
					x.onclick = function() {
						sweetScroll(getTop("#projects"));
					};

				} else if(getExtention(this)) {
					log("loading " + getExtention(this) + " file ; " + this);
					
					x = d.createElement("img");
					
					x.style.opacity = 0;
					
					x.className = "content";
					x.src = "projects/" + key + "/" + this + "";
					
					x.onload = function() {
						x.style.opacity = 1;
					};
					
					wrapper.appendChild(x);
				}
			} else {
				log("Object, probably a video");
				if(hasFlash()) {
					
					var w = d.createElement("div");
					w.className = "flash-wrapper";
					
					x = d.createElement("div");
					var id = "flash-" + new Date().getTime();
					x.id = id;
					w.appendChild(x);
					wrapper.appendChild(w);
					
					swfobject.embedSWF("player.swf", id, 392, 303, "9", false, {
						src : "projects/" + key + "/" + this.video
					}, { wmode : "opaque" }, { wmode : "opaque", style : "position : relative; display : block; left : 50%; margin : 0 0 0 -196px; top : 33px" });
				} else {
					x = d.createElement("img");
					x.style.opacity = 0;
					x.className = "content";
					x.src = "projects/" + key + "/" + this.placeholder + "";
					
					x.onload = function() {
						x.style.opacity = 1;
					};
					
					wrapper.appendChild(x);
				}
			}
		});
		
		
	}
	
	function loadNextProject() {
		
		var key = current_project.id,
			x = json.projects_name.indexOf(key),
			y = json.projects_name[x + 1] ? json.projects_name[x + 1] : json.projects_name[0];
		
		projectBootStrap(y);
	}
	
	function projectBootStrap(id) {
		if(!get("#projects").hasClass("stage-on")) {
			return;
		}
		
		var key = current_project.id,
			right = getViewportSize()[0] / 2 + 70, 
			left = getViewportSize()[0] / 2 * -1 - 395,
			pos = current_project.getAttribute("data-position"), 
			goingto = (pos === "right" ? right : pos === "left" ? left : Math.random() > 0.5 ? right : left);
		
		current_project.style.marginLeft = goingto + "px";
		current_project.className = "project";
		current_project.querySelector(".meta-wrapper").className = "meta-wrapper strong-transition";
		current_project.style.visibility = "hidden";
		
		current_project = get("#" + id);
		current_project.style.visibility = "visible";
		current_project.style.marginLeft = current_project.getAttribute("data-middle") + "px";
		current_project.addClass("active");
		current_project.addClass("first");
		
		
		loadProject();
	
	}
	
	function loadPreviousProject() {
		
		var key = current_project.id,
			x = json.projects_name.indexOf(key),
			y = json.projects_name[x - 1] ? json.projects_name[x - 1] : json.projects_name[json.projects_name.length - 1];
			
		projectBootStrap(y);
	}
	
	function closeStage() {
		if(!get("#projects").hasClass("stage-on")) {
			return;
		}
		
		get("#projects").removeClass("stage-on");
		get("#project_content").innerHTML = "";
		get(".breadcrumb").style.background = "none";
		
		each(get(".meta-wrapper"), function() {
			if(typeof this === "object" && this.className) {
				this.className = "meta-wrapper strong-transition";
			}
		});
		
		current_project.className = "";
		setTimeout(function() { // Only way found to fix chrome bug not refreshing display.
			current_project.className = "project";
		}, 10); 
		
		setTimeout(function() {
			each(get(".project"), function(i) {
				if(typeof this === "object") {
					this.style.visibility = "visible";
					this.style.marginLeft = this.getAttribute("data-left") + "px";
				}
			});
		}, 500);
	}
	
	function watchScrollLevel() {
		each(get(".project"), function(i) {
			if(typeof this === "object") {
				var x = setInterval(function() {
					if(y.getBoundingClientRect().bottom - getViewportSize()[1] < y.getBoundingClientRect().height * 0.25 && w.location.hash !== "#introduction") {
						y.style.opacity = 1;
					} else if(!y.hasClass("hover")) {
						y.style.opacity = 0;
					}
				}, 250), y = this;
			}
		});
	}
	
	function addRollOver(target) {
		
		target.addEventListener("mouseover", function() {
			if(device === "desktop") {
				this.addClass("display-content");
				this.addEventListener("mousemove", moveaction);
			}	
		});
		
		
		target.querySelector(".content").style.left = target.getBoundingClientRect().left + "px";
		target.querySelector(".content").style.top = target.getBoundingClientRect().top + "px";
		
		var moveaction = function(e) {
			this.querySelector(".content").style.left = (e.pageX - this.getBoundingClientRect().width / 2) - (29) + "px";
			this.querySelector(".content").style.top = (e.pageY) - (10) + "px";
			
			var data = target.getBoundingClientRect();
			
			if(e.pageX < data.left || 
				e.pageX > data.left + data.width ||
					e.pageY < data.top ||
						e.pageY > data.top + data.height) {
							
				each(get("#main nav ul li"), function() {
					if ( typeof this === "object") {
						this.removeClass("display-content");
						this.removeEventListener("mousemove", moveaction);
					}
				});
			}
		};
	}
	
	function setLocaleSelector(object) {
		object.innerHTML = getCookie("locale") ? getCookie("locale").split("_")[0] : "fr";
		
		object.addEventListener("click", function() {
			this.innerHTML = this.innerHTML === "fr" ? "en" : "fr";
			setCookie("locale", (this.innerHTML === "fr" ? "fr_FR" : "en_US"), 1440 * 30 * 12, "/");
			w.location.reload();
		});
		
		object.addEventListener("mouseover", function() {
			if(device === "desktop") {
				this.addClass("hover");
			}
		});
			
		object.addEventListener("mouseout", function() {
			if(device === "desktop") {
				this.removeClass("hover");
			}
		});
		
	}
	
	
	
	log("Js file loaded, domready ? " + d.readyState);
	
	if (d.readyState === "complete") {
		startup();
	} else {
		
		/*
		 * not working, dunno why, let's resort to old fashion method
		 */
		
		/*
		d.addEventListener("DOMContentLoaded", function() {
			log("Dom ready now, let's start");
			startup();
		}, false);
		*/
		
		/*
		 * 
		 */
		
		var x = setInterval(function() {
			if(document.readyState === "complete") {
				clearInterval(x);
				startup();
			}
		}, 100);
	}

	/*
	 * Lib
	 */

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
		if (!this.hasClass(cname)) {
			this.className += (this.className ? ' ' : '') + cname;
		}
	};

	w.Object.prototype.removeClass = function(cname) {
		if (this.hasClass(cname)) {
			this.className = this.className.replace(new RegExp('(\\s|^)' + cname + '(\\s|$)'), ' ').replace(/^\s+|\s+$/g, '');
		}
	};

	w.Object.prototype.hasClass = function(cname) {
		if (this.className) {
			return new RegExp('(\\s|^)' + cname + '(\\s|$)').test(this.className);
		} else {
			return false;
		}
	};
	
	w.Object.prototype.setButton = function() {
		var out = false;
		
		
		this.addEventListener("mouseover", function() {
			if(device === "desktop") {
				if(!this.hasClass("active")) {
					this.addClass("hover");
				}
			}
		});
		
		this.addEventListener("mouseout", function() {
			this.removeClass("hover");
		});
	
		
		this.addEventListener("click", function() {
			if(!this.hasClass("active")) {
				this.addClass("active");
				this.removeClass("hover");	
			} else {
				this.addClass("hover");
				this.removeClass("active");
			}
		});
	};

	if (!w.Array.prototype.indexOf) {
		w.Array.prototype.indexOf = function(search) {
			var index = -1;
			for (var i = 0; i < this.length; i++) {
				if (this[i] === search) {
					index = i;
				}
			}
			return index;
		};
	}
	
	function hasFlash() {
		var bool = false;
		try {
			if (navigator.mimeTypes['application/x-shockwave-flash'].enabledPlugin) {
				bool = true;
			}
		} catch(e) {
		}
		if (!bool) {
			try {
				new window.ActiveXObject("ShockwaveFlash.ShockwaveFlash.7");
				bool = true;
			} catch(e) {
			}
		}
		if (!bool) {
			try {
				new window.ActiveXObject("ShockwaveFlash.ShockwaveFlash.6");
				bool = true;
			} catch(e) {
			}
		}
		if (!bool) {
			try {
				new window.ActiveXObject("ShockwaveFlash.ShockwaveFlash");
				bool = true;
			} catch(e) {
			}

		}
		return bool;
	}
	
	function getExtention(string) {
		if (!string) {
			return "";
		}
		return string.replace(/\?[0-9\.\,]+$/gi, "").match(/\.([a-zA-Z0-9]{2,5})$/)[1] ? string.replace(/\?[0-9\.\,]+$/gi, "").match(/\.([a-zA-Z0-9]{2,5})$/)[1].toLowerCase() : "";
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
	
	function getPageScroll() {
		var xScroll, yScroll;

		if (w.self.pageYOffset !== undefined) {
			yScroll = w.self.pageYOffset;
			xScroll = w.self.pageXOffset;
		} else if (d.documentElement && d.documentElement.scrollTop !== undefined) {
			yScroll = d.documentElement.scrollTop;
			xScroll = d.documentElement.scrollLeft;
		} else if (document.body) {
			yScroll = body.scrollTop;
			xScroll = body.scrollLeft;
		}
		return [xScroll, yScroll];
	}
	
	
    function getViewportSize() {
		var viewportwidth, viewportheight;
		if (navigator.userAgent.match(/ipad/i)) {
			viewportwidth = w.innerWidth;
			viewportheight = w.innerHeight;
		} else if ( typeof w.innerWidth !== 'undefined') {
			viewportwidth = w.innerWidth;
			viewportheight = w.innerHeight;
		} else if ( typeof w.document.documentElement !== 'undefined' && typeof w.document.documentElement.clientWidth !== 'undefined' && w.document.documentElement.clientWidth !== 0) {
			viewportwidth = w.document.documentElement.clientWidth;
			viewportheight = w.document.documentElement.clientHeight;
		} else {
			viewportwidth = w.document.getElementsByTagName('body')[0].clientWidth;
			viewportheight = w.document.getElementsByTagName('body')[0].clientHeight;
		}

		return [viewportwidth, viewportheight];
	}
    
	
	function sweetScroll(target) {
		clearInterval(scrollinterval);
		log("New scroll, from " + getPageScroll()[1] + ", to " + target);
		
		var prev_values = [];
		scrollinterval = setInterval(function() {
			var x = getPageScroll()[1];
			
			prev_values[1] = prev_values[0];
			prev_values[0] = x;
			
			if (x === prev_values[1]) {
				log("Ok, cleared");
				w.scrollTo(0, target);
				clearInterval(scrollinterval);
			} else {
				var z = x + ((target - x) * 0.3);
				w.scrollTo(0, z);
			}
		}, 25);
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

	function get(query) {
		var r = d.querySelectorAll(query);
		if (r.length === 1) {
			return d.querySelector(query);
		} else if (r.length === 0) {
			return null;
		} else {
			return r;
		}
	}
	
	function getTop(query) {
		return typeof query === "string" ? get(query).getBoundingClientRect().top + getPageScroll()[1] : query.getBoundingClientRect().top + getPageScroll()[1];
	}
	
	function isVisible(object) {
		return !w.getComputedStyle(object) ? false : (w.getComputedStyle(object).getPropertyValue("opacity") === "1" ? true : false);
	}
	
	function setCookie(name, value, expires, path, domain, secure){
	    var today = new Date();
	    today.setTime(today.getTime());
	    if (expires) {
	        expires = expires * 1000 * 60;
	    }
	    var expires_date = new Date(today.getTime() + (expires));
	    document.cookie = name + "=" + escape(value) +
	    ((expires) ? ";expires=" + expires_date.toGMTString() : "") +
	    ((path) ? ";path=" + path : "") +
	    ((domain) ? ";domain=" + domain : "") +
	    ((secure) ? ";secure" : "");
	}
	
	function getCookie(check_name){
	    var a_all_cookies = document.cookie.split(';');
	    var a_temp_cookie = '';
	    var cookie_name = '';
	    var cookie_value = '';
	    var b_cookie_found = false;
	    for (var i = 0; i < a_all_cookies.length; i++) {
	        a_temp_cookie = a_all_cookies[i].split('=');
	        cookie_name = a_temp_cookie[0].replace(/^\s+|\s+$/g, '');
	        if (cookie_name === check_name) {
	            b_cookie_found = true;
	            if (a_temp_cookie.length > 1) {
	                cookie_value = unescape(a_temp_cookie[1].replace(/^\s+|\s+$/g, ''));
	            }
	            return cookie_value;	            
	        }
	        a_temp_cookie = null;
	        cookie_name = '';
	    }
	    if (!b_cookie_found) {
	        return null;
	    }
	}
	
})(window.location !== parent.window.location ? parent.window : window);
