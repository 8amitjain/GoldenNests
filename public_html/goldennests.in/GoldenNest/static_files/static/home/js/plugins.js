(window.Modernizr = (function (a, b, c) {
	function x(a) {
		j.cssText = a;
	}
	function y(a, b) {
		return x(prefixes.join(a + ";") + (b || ""));
	}
	function z(a, b) {
		return typeof a === b;
	}
	function A(a, b) {
		return !!~("" + a).indexOf(b);
	}
	function B(a, b) {
		for (var d in a) {
			var e = a[d];
			if (!A(e, "-") && j[e] !== c) return b == "pfx" ? e : !0;
		}
		return !1;
	}
	function C(a, b, d) {
		for (var e in a) {
			var f = b[a[e]];
			if (f !== c)
				return d === !1 ? a[e] : z(f, "function") ? f.bind(d || b) : f;
		}
		return !1;
	}
	function D(a, b, c) {
		var d = a.charAt(0).toUpperCase() + a.slice(1),
			e = (a + " " + n.join(d + " ") + d).split(" ");
		return z(b, "string") || z(b, "undefined")
			? B(e, b)
			: ((e = (a + " " + o.join(d + " ") + d).split(" ")), C(e, b, c));
	}
	var d = "2.6.2",
		e = {},
		f = !0,
		g = b.documentElement,
		h = "modernizr",
		i = b.createElement(h),
		j = i.style,
		k,
		l = {}.toString,
		m = "Webkit Moz O ms",
		n = m.split(" "),
		o = m.toLowerCase().split(" "),
		p = {},
		q = {},
		r = {},
		s = [],
		t = s.slice,
		u,
		v = {}.hasOwnProperty,
		w;
	!z(v, "undefined") && !z(v.call, "undefined")
		? (w = function (a, b) {
				return v.call(a, b);
		  })
		: (w = function (a, b) {
				return b in a && z(a.constructor.prototype[b], "undefined");
		  }),
		Function.prototype.bind ||
			(Function.prototype.bind = function (b) {
				var c = this;
				if (typeof c != "function") throw new TypeError();
				var d = t.call(arguments, 1),
					e = function () {
						if (this instanceof e) {
							var a = function () {};
							a.prototype = c.prototype;
							var f = new a(),
								g = c.apply(f, d.concat(t.call(arguments)));
							return Object(g) === g ? g : f;
						}
						return c.apply(b, d.concat(t.call(arguments)));
					};
				return e;
			}),
		(p.csstransitions = function () {
			return D("transition");
		});
	for (var E in p)
		w(p, E) &&
			((u = E.toLowerCase()),
			(e[u] = p[E]()),
			s.push((e[u] ? "" : "no-") + u));
	return (
		(e.addTest = function (a, b) {
			if (typeof a == "object")
				for (var d in a) w(a, d) && e.addTest(d, a[d]);
			else {
				a = a.toLowerCase();
				if (e[a] !== c) return e;
				(b = typeof b == "function" ? b() : b),
					typeof f != "undefined" &&
						f &&
						(g.className += " " + (b ? "" : "no-") + a),
					(e[a] = b);
			}
			return e;
		}),
		x(""),
		(i = k = null),
		(function (a, b) {
			function k(a, b) {
				var c = a.createElement("p"),
					d = a.getElementsByTagName("head")[0] || a.documentElement;
				return (
					(c.innerHTML = "x<style>" + b + "</style>"),
					d.insertBefore(c.lastChild, d.firstChild)
				);
			}
			function l() {
				var a = r.elements;
				return typeof a == "string" ? a.split(" ") : a;
			}
			function m(a) {
				var b = i[a[g]];
				return b || ((b = {}), h++, (a[g] = h), (i[h] = b)), b;
			}
			function n(a, c, f) {
				c || (c = b);
				if (j) return c.createElement(a);
				f || (f = m(c));
				var g;
				return (
					f.cache[a]
						? (g = f.cache[a].cloneNode())
						: e.test(a)
						? (g = (f.cache[a] = f.createElem(a)).cloneNode())
						: (g = f.createElem(a)),
					g.canHaveChildren && !d.test(a) ? f.frag.appendChild(g) : g
				);
			}
			function o(a, c) {
				a || (a = b);
				if (j) return a.createDocumentFragment();
				c = c || m(a);
				var d = c.frag.cloneNode(),
					e = 0,
					f = l(),
					g = f.length;
				for (; e < g; e++) d.createElement(f[e]);
				return d;
			}
			function p(a, b) {
				b.cache ||
					((b.cache = {}),
					(b.createElem = a.createElement),
					(b.createFrag = a.createDocumentFragment),
					(b.frag = b.createFrag())),
					(a.createElement = function (c) {
						return r.shivMethods ? n(c, a, b) : b.createElem(c);
					}),
					(a.createDocumentFragment = Function(
						"h,f",
						"return function(){var n=f.cloneNode(),c=n.createElement;h.shivMethods&&(" +
							l()
								.join()
								.replace(/\w+/g, function (a) {
									return (
										b.createElem(a),
										b.frag.createElement(a),
										'c("' + a + '")'
									);
								}) +
							");return n}"
					)(r, b.frag));
			}
			function q(a) {
				a || (a = b);
				var c = m(a);
				return (
					r.shivCSS &&
						!f &&
						!c.hasCSS &&
						(c.hasCSS = !!k(
							a,
							"article,aside,figcaption,figure,footer,header,hgroup,nav,section{display:block}mark{background:#FF0;color:#000}"
						)),
					j || p(a, c),
					a
				);
			}
			var c = a.html5 || {},
				d =
					/^<|^(?:button|map|select|textarea|object|iframe|option|optgroup)$/i,
				e =
					/^(?:a|b|code|div|fieldset|h1|h2|h3|h4|h5|h6|i|label|li|ol|p|q|span|strong|style|table|tbody|td|th|tr|ul)$/i,
				f,
				g = "_html5shiv",
				h = 0,
				i = {},
				j;
			(function () {
				try {
					var a = b.createElement("a");
					(a.innerHTML = "<xyz></xyz>"),
						(f = "hidden" in a),
						(j =
							a.childNodes.length == 1 ||
							(function () {
								b.createElement("a");
								var a = b.createDocumentFragment();
								return (
									typeof a.cloneNode == "undefined" ||
									typeof a.createDocumentFragment ==
										"undefined" ||
									typeof a.createElement == "undefined"
								);
							})());
				} catch (c) {
					(f = !0), (j = !0);
				}
			})();
			var r = {
				elements:
					c.elements ||
					"abbr article aside audio bdi canvas data datalist details figcaption figure footer header hgroup mark meter nav output progress section summary time video",
				shivCSS: c.shivCSS !== !1,
				supportsUnknownElements: j,
				shivMethods: c.shivMethods !== !1,
				type: "default",
				shivDocument: q,
				createElement: n,
				createDocumentFragment: o,
			};
			(a.html5 = r), q(b);
		})(this, b),
		(e._version = d),
		(e._domPrefixes = o),
		(e._cssomPrefixes = n),
		(e.testProp = function (a) {
			return B([a]);
		}),
		(e.testAllProps = D),
		(g.className =
			g.className.replace(/(^|\s)no-js(\s|$)/, "$1$2") +
			(f ? " js " + s.join(" ") : "")),
		e
	);
})(this, this.document)),
	(function (a, b, c) {
		function d(a) {
			return "[object Function]" == o.call(a);
		}
		function e(a) {
			return "string" == typeof a;
		}
		function f() {}
		function g(a) {
			return (
				!a || "loaded" == a || "complete" == a || "uninitialized" == a
			);
		}
		function h() {
			var a = p.shift();
			(q = 1),
				a
					? a.t
						? m(function () {
								("c" == a.t
									? B.injectCss
									: B.injectJs)(a.s, 0, a.a, a.x, a.e, 1);
						  }, 0)
						: (a(), h())
					: (q = 0);
		}
		function i(a, c, d, e, f, i, j) {
			function k(b) {
				if (
					!o &&
					g(l.readyState) &&
					((u.r = o = 1),
					!q && h(),
					(l.onload = l.onreadystatechange = null),
					b)
				) {
					"img" != a &&
						m(function () {
							t.removeChild(l);
						}, 50);
					for (var d in y[c])
						y[c].hasOwnProperty(d) && y[c][d].onload();
				}
			}
			var j = j || B.errorTimeout,
				l = b.createElement(a),
				o = 0,
				r = 0,
				u = { t: d, s: c, e: f, a: i, x: j };
			1 === y[c] && ((r = 1), (y[c] = [])),
				"object" == a ? (l.data = c) : ((l.src = c), (l.type = a)),
				(l.width = l.height = "0"),
				(l.onerror =
					l.onload =
					l.onreadystatechange =
						function () {
							k.call(this, r);
						}),
				p.splice(e, 0, u),
				"img" != a &&
					(r || 2 === y[c]
						? (t.insertBefore(l, s ? null : n), m(k, j))
						: y[c].push(l));
		}
		function j(a, b, c, d, f) {
			return (
				(q = 0),
				(b = b || "j"),
				e(a)
					? i("c" == b ? v : u, a, b, this.i++, c, d, f)
					: (p.splice(this.i++, 0, a), 1 == p.length && h()),
				this
			);
		}
		function k() {
			var a = B;
			return (a.loader = { load: j, i: 0 }), a;
		}
		var l = b.documentElement,
			m = a.setTimeout,
			n = b.getElementsByTagName("script")[0],
			o = {}.toString,
			p = [],
			q = 0,
			r = "MozAppearance" in l.style,
			s = r && !!b.createRange().compareNode,
			t = s ? l : n.parentNode,
			l = a.opera && "[object Opera]" == o.call(a.opera),
			l = !!b.attachEvent && !l,
			u = r ? "object" : l ? "script" : "img",
			v = l ? "script" : u,
			w =
				Array.isArray ||
				function (a) {
					return "[object Array]" == o.call(a);
				},
			x = [],
			y = {},
			z = {
				timeout: function (a, b) {
					return b.length && (a.timeout = b[0]), a;
				},
			},
			A,
			B;
		(B = function (a) {
			function b(a) {
				var a = a.split("!"),
					b = x.length,
					c = a.pop(),
					d = a.length,
					c = { url: c, origUrl: c, prefixes: a },
					e,
					f,
					g;
				for (f = 0; f < d; f++)
					(g = a[f].split("=")), (e = z[g.shift()]) && (c = e(c, g));
				for (f = 0; f < b; f++) c = x[f](c);
				return c;
			}
			function g(a, e, f, g, h) {
				var i = b(a),
					j = i.autoCallback;
				i.url.split(".").pop().split("?").shift(),
					i.bypass ||
						(e &&
							(e = d(e)
								? e
								: e[a] ||
								  e[g] ||
								  e[a.split("/").pop().split("?")[0]]),
						i.instead
							? i.instead(a, e, f, g, h)
							: (y[i.url] ? (i.noexec = !0) : (y[i.url] = 1),
							  f.load(
									i.url,
									i.forceCSS ||
										(!i.forceJS &&
											"css" ==
												i.url
													.split(".")
													.pop()
													.split("?")
													.shift())
										? "c"
										: c,
									i.noexec,
									i.attrs,
									i.timeout
							  ),
							  (d(e) || d(j)) &&
									f.load(function () {
										k(),
											e && e(i.origUrl, h, g),
											j && j(i.origUrl, h, g),
											(y[i.url] = 2);
									})));
			}
			function h(a, b) {
				function c(a, c) {
					if (a) {
						if (e(a))
							c ||
								(j = function () {
									var a = [].slice.call(arguments);
									k.apply(this, a), l();
								}),
								g(a, j, b, 0, h);
						else if (Object(a) === a)
							for (n in ((m = (function () {
								var b = 0,
									c;
								for (c in a) a.hasOwnProperty(c) && b++;
								return b;
							})()),
							a))
								a.hasOwnProperty(n) &&
									(!c &&
										!--m &&
										(d(j)
											? (j = function () {
													var a = [].slice.call(
														arguments
													);
													k.apply(this, a), l();
											  })
											: (j[n] = (function (a) {
													return function () {
														var b = [].slice.call(
															arguments
														);
														a && a.apply(this, b),
															l();
													};
											  })(k[n]))),
									g(a[n], j, b, n, h));
					} else !c && l();
				}
				var h = !!a.test,
					i = a.load || a.both,
					j = a.callback || f,
					k = j,
					l = a.complete || f,
					m,
					n;
				c(h ? a.yep : a.nope, !!i), i && c(i);
			}
			var i,
				j,
				l = this.yepnope.loader;
			if (e(a)) g(a, 0, l, 0);
			else if (w(a))
				for (i = 0; i < a.length; i++)
					(j = a[i]),
						e(j)
							? g(j, 0, l, 0)
							: w(j)
							? B(j)
							: Object(j) === j && h(j, l);
			else Object(a) === a && h(a, l);
		}),
			(B.addPrefix = function (a, b) {
				z[a] = b;
			}),
			(B.addFilter = function (a) {
				x.push(a);
			}),
			(B.errorTimeout = 1e4),
			null == b.readyState &&
				b.addEventListener &&
				((b.readyState = "loading"),
				b.addEventListener(
					"DOMContentLoaded",
					(A = function () {
						b.removeEventListener("DOMContentLoaded", A, 0),
							(b.readyState = "complete");
					}),
					0
				)),
			(a.yepnope = k()),
			(a.yepnope.executeStack = h),
			(a.yepnope.injectJs = function (a, c, d, e, i, j) {
				var k = b.createElement("script"),
					l,
					o,
					e = e || B.errorTimeout;
				k.src = a;
				for (o in d) k.setAttribute(o, d[o]);
				(c = j ? h : c || f),
					(k.onreadystatechange = k.onload =
						function () {
							!l &&
								g(k.readyState) &&
								((l = 1),
								c(),
								(k.onload = k.onreadystatechange = null));
						}),
					m(function () {
						l || ((l = 1), c(1));
					}, e),
					i ? k.onload() : n.parentNode.insertBefore(k, n);
			}),
			(a.yepnope.injectCss = function (a, c, d, e, g, i) {
				var e = b.createElement("link"),
					j,
					c = i ? h : c || f;
				(e.href = a), (e.rel = "stylesheet"), (e.type = "text/css");
				for (j in d) e.setAttribute(j, d[j]);
				g || (n.parentNode.insertBefore(e, n), m(c, 0));
			});
	})(this, document),
	(Modernizr.load = function () {
		yepnope.apply(window, [].slice.call(arguments, 0));
	});
/*! jQuery.easing*/
jQuery.easing.jswing = jQuery.easing.swing;
jQuery.extend(jQuery.easing, {
	def: "easeOutQuad",
	swing: function (e, f, a, h, g) {
		return jQuery.easing[jQuery.easing.def](e, f, a, h, g);
	},
	easeInQuad: function (e, f, a, h, g) {
		return h * (f /= g) * f + a;
	},
	easeOutQuad: function (e, f, a, h, g) {
		return -h * (f /= g) * (f - 2) + a;
	},
	easeInOutQuad: function (e, f, a, h, g) {
		if ((f /= g / 2) < 1) {
			return (h / 2) * f * f + a;
		}
		return (-h / 2) * (--f * (f - 2) - 1) + a;
	},
	easeInCubic: function (e, f, a, h, g) {
		return h * (f /= g) * f * f + a;
	},
	easeOutCubic: function (e, f, a, h, g) {
		return h * ((f = f / g - 1) * f * f + 1) + a;
	},
	easeInOutCubic: function (e, f, a, h, g) {
		if ((f /= g / 2) < 1) {
			return (h / 2) * f * f * f + a;
		}
		return (h / 2) * ((f -= 2) * f * f + 2) + a;
	},
	easeInQuart: function (e, f, a, h, g) {
		return h * (f /= g) * f * f * f + a;
	},
	easeOutQuart: function (e, f, a, h, g) {
		return -h * ((f = f / g - 1) * f * f * f - 1) + a;
	},
	easeInOutQuart: function (e, f, a, h, g) {
		if ((f /= g / 2) < 1) {
			return (h / 2) * f * f * f * f + a;
		}
		return (-h / 2) * ((f -= 2) * f * f * f - 2) + a;
	},
	easeInQuint: function (e, f, a, h, g) {
		return h * (f /= g) * f * f * f * f + a;
	},
	easeOutQuint: function (e, f, a, h, g) {
		return h * ((f = f / g - 1) * f * f * f * f + 1) + a;
	},
	easeInOutQuint: function (e, f, a, h, g) {
		if ((f /= g / 2) < 1) {
			return (h / 2) * f * f * f * f * f + a;
		}
		return (h / 2) * ((f -= 2) * f * f * f * f + 2) + a;
	},
	easeInSine: function (e, f, a, h, g) {
		return -h * Math.cos((f / g) * (Math.PI / 2)) + h + a;
	},
	easeOutSine: function (e, f, a, h, g) {
		return h * Math.sin((f / g) * (Math.PI / 2)) + a;
	},
	easeInOutSine: function (e, f, a, h, g) {
		return (-h / 2) * (Math.cos((Math.PI * f) / g) - 1) + a;
	},
	easeInExpo: function (e, f, a, h, g) {
		return f == 0 ? a : h * Math.pow(2, 10 * (f / g - 1)) + a;
	},
	easeOutExpo: function (e, f, a, h, g) {
		return f == g ? a + h : h * (-Math.pow(2, (-10 * f) / g) + 1) + a;
	},
	easeInOutExpo: function (e, f, a, h, g) {
		if (f == 0) {
			return a;
		}
		if (f == g) {
			return a + h;
		}
		if ((f /= g / 2) < 1) {
			return (h / 2) * Math.pow(2, 10 * (f - 1)) + a;
		}
		return (h / 2) * (-Math.pow(2, -10 * --f) + 2) + a;
	},
	easeInCirc: function (e, f, a, h, g) {
		return -h * (Math.sqrt(1 - (f /= g) * f) - 1) + a;
	},
	easeOutCirc: function (e, f, a, h, g) {
		return h * Math.sqrt(1 - (f = f / g - 1) * f) + a;
	},
	easeInOutCirc: function (e, f, a, h, g) {
		if ((f /= g / 2) < 1) {
			return (-h / 2) * (Math.sqrt(1 - f * f) - 1) + a;
		}
		return (h / 2) * (Math.sqrt(1 - (f -= 2) * f) + 1) + a;
	},
	easeInElastic: function (f, h, e, l, k) {
		var i = 1.70158;
		var j = 0;
		var g = l;
		if (h == 0) {
			return e;
		}
		if ((h /= k) == 1) {
			return e + l;
		}
		if (!j) {
			j = k * 0.3;
		}
		if (g < Math.abs(l)) {
			g = l;
			var i = j / 4;
		} else {
			var i = (j / (2 * Math.PI)) * Math.asin(l / g);
		}
		return (
			-(
				g *
				Math.pow(2, 10 * (h -= 1)) *
				Math.sin(((h * k - i) * (2 * Math.PI)) / j)
			) + e
		);
	},
	easeOutElastic: function (f, h, e, l, k) {
		var i = 1.70158;
		var j = 0;
		var g = l;
		if (h == 0) {
			return e;
		}
		if ((h /= k) == 1) {
			return e + l;
		}
		if (!j) {
			j = k * 0.3;
		}
		if (g < Math.abs(l)) {
			g = l;
			var i = j / 4;
		} else {
			var i = (j / (2 * Math.PI)) * Math.asin(l / g);
		}
		return (
			g *
				Math.pow(2, -10 * h) *
				Math.sin(((h * k - i) * (2 * Math.PI)) / j) +
			l +
			e
		);
	},
	easeInOutElastic: function (f, h, e, l, k) {
		var i = 1.70158;
		var j = 0;
		var g = l;
		if (h == 0) {
			return e;
		}
		if ((h /= k / 2) == 2) {
			return e + l;
		}
		if (!j) {
			j = k * (0.3 * 1.5);
		}
		if (g < Math.abs(l)) {
			g = l;
			var i = j / 4;
		} else {
			var i = (j / (2 * Math.PI)) * Math.asin(l / g);
		}
		if (h < 1) {
			return (
				-0.5 *
					(g *
						Math.pow(2, 10 * (h -= 1)) *
						Math.sin(((h * k - i) * (2 * Math.PI)) / j)) +
				e
			);
		}
		return (
			g *
				Math.pow(2, -10 * (h -= 1)) *
				Math.sin(((h * k - i) * (2 * Math.PI)) / j) *
				0.5 +
			l +
			e
		);
	},
	easeInBack: function (e, f, a, i, h, g) {
		if (g == undefined) {
			g = 1.70158;
		}
		return i * (f /= h) * f * ((g + 1) * f - g) + a;
	},
	easeOutBack: function (e, f, a, i, h, g) {
		if (g == undefined) {
			g = 1.70158;
		}
		return i * ((f = f / h - 1) * f * ((g + 1) * f + g) + 1) + a;
	},
	easeInOutBack: function (e, f, a, i, h, g) {
		if (g == undefined) {
			g = 1.70158;
		}
		if ((f /= h / 2) < 1) {
			return (i / 2) * (f * f * (((g *= 1.525) + 1) * f - g)) + a;
		}
		return (i / 2) * ((f -= 2) * f * (((g *= 1.525) + 1) * f + g) + 2) + a;
	},
	easeInBounce: function (e, f, a, h, g) {
		return h - jQuery.easing.easeOutBounce(e, g - f, 0, h, g) + a;
	},
	easeOutBounce: function (e, f, a, h, g) {
		if ((f /= g) < 1 / 2.75) {
			return h * (7.5625 * f * f) + a;
		} else {
			if (f < 2 / 2.75) {
				return h * (7.5625 * (f -= 1.5 / 2.75) * f + 0.75) + a;
			} else {
				if (f < 2.5 / 2.75) {
					return h * (7.5625 * (f -= 2.25 / 2.75) * f + 0.9375) + a;
				} else {
					return (
						h * (7.5625 * (f -= 2.625 / 2.75) * f + 0.984375) + a
					);
				}
			}
		}
	},
	easeInOutBounce: function (e, f, a, h, g) {
		if (f < g / 2) {
			return jQuery.easing.easeInBounce(e, f * 2, 0, h, g) * 0.5 + a;
		}
		return (
			jQuery.easing.easeOutBounce(e, f * 2 - g, 0, h, g) * 0.5 +
			h * 0.5 +
			a
		);
	},
});

/*! lightgallery - v1.2.22 - 2016-07-20
 * http://sachinchoolur.github.io/lightGallery/
 * Copyright (c) 2016 Sachin N; Licensed Apache 2.0 */
!(function (a, b, c, d) {
	"use strict";
	function e(b, d) {
		if (
			((this.el = b),
			(this.$el = a(b)),
			(this.s = a.extend({}, f, d)),
			this.s.dynamic &&
				"undefined" !== this.s.dynamicEl &&
				this.s.dynamicEl.constructor === Array &&
				!this.s.dynamicEl.length)
		)
			throw "When using dynamic mode, you must also define dynamicEl as an Array.";
		return (
			(this.modules = {}),
			(this.lGalleryOn = !1),
			(this.lgBusy = !1),
			(this.hideBartimeout = !1),
			(this.isTouch = "ontouchstart" in c.documentElement),
			this.s.slideEndAnimatoin && (this.s.hideControlOnEnd = !1),
			this.s.dynamic
				? (this.$items = this.s.dynamicEl)
				: "this" === this.s.selector
				? (this.$items = this.$el)
				: "" !== this.s.selector
				? this.s.selectWithin
					? (this.$items = a(this.s.selectWithin).find(
							this.s.selector
					  ))
					: (this.$items = this.$el.find(a(this.s.selector)))
				: (this.$items = this.$el.children()),
			(this.$slide = ""),
			(this.$outer = ""),
			this.init(),
			this
		);
	}
	var f = {
		mode: "lg-slide",
		cssEasing: "ease",
		easing: "linear",
		speed: 600,
		height: "100%",
		width: "100%",
		addClass: "",
		startClass: "lg-start-zoom",
		backdropDuration: 150,
		hideBarsDelay: 6e3,
		useLeft: !1,
		closable: !0,
		loop: !0,
		escKey: !0,
		keyPress: !0,
		controls: !0,
		slideEndAnimatoin: !0,
		hideControlOnEnd: !1,
		mousewheel: !0,
		getCaptionFromTitleOrAlt: !0,
		appendSubHtmlTo: ".lg-sub-html",
		subHtmlSelectorRelative: !1,
		preload: 1,
		showAfterLoad: !0,
		selector: "",
		selectWithin: "",
		nextHtml: "",
		prevHtml: "",
		index: !1,
		iframeMaxWidth: "100%",
		download: !0,
		counter: !0,
		appendCounterTo: ".lg-toolbar",
		swipeThreshold: 50,
		enableSwipe: !0,
		enableDrag: !0,
		dynamic: !1,
		dynamicEl: [],
		galleryId: 1,
	};
	(e.prototype.init = function () {
		var c = this;
		c.s.preload > c.$items.length && (c.s.preload = c.$items.length);
		var d = b.location.hash;
		d.indexOf("lg=" + this.s.galleryId) > 0 &&
			((c.index = parseInt(d.split("&slide=")[1], 10)),
			a("body").addClass("lg-from-hash"),
			a("body").hasClass("lg-on") ||
				(setTimeout(function () {
					c.build(c.index);
				}),
				a("body").addClass("lg-on"))),
			c.s.dynamic
				? (c.$el.trigger("onBeforeOpen.lg"),
				  (c.index = c.s.index || 0),
				  a("body").hasClass("lg-on") ||
						setTimeout(function () {
							c.build(c.index), a("body").addClass("lg-on");
						}))
				: c.$items.on("click.lgcustom", function (b) {
						try {
							b.preventDefault(), b.preventDefault();
						} catch (a) {
							b.returnValue = !1;
						}
						c.$el.trigger("onBeforeOpen.lg"),
							(c.index = c.s.index || c.$items.index(this)),
							a("body").hasClass("lg-on") ||
								(c.build(c.index), a("body").addClass("lg-on"));
				  });
	}),
		(e.prototype.build = function (b) {
			var c = this;
			c.structure(),
				a.each(a.fn.lightGallery.modules, function (b) {
					c.modules[b] = new a.fn.lightGallery.modules[b](c.el);
				}),
				c.slide(b, !1, !1),
				c.s.keyPress && c.keyPress(),
				c.$items.length > 1 &&
					(c.arrow(),
					setTimeout(function () {
						c.enableDrag(), c.enableSwipe();
					}, 50),
					c.s.mousewheel && c.mousewheel()),
				c.counter(),
				c.closeGallery(),
				c.$el.trigger("onAfterOpen.lg"),
				c.$outer.on("mousemove.lg click.lg touchstart.lg", function () {
					c.$outer.removeClass("lg-hide-items"),
						clearTimeout(c.hideBartimeout),
						(c.hideBartimeout = setTimeout(function () {
							c.$outer.addClass("lg-hide-items");
						}, c.s.hideBarsDelay));
				});
		}),
		(e.prototype.structure = function () {
			var c,
				d = "",
				e = "",
				f = 0,
				g = "",
				h = this;
			for (
				a("body").append('<div class="lg-backdrop"></div>'),
					a(".lg-backdrop").css(
						"transition-duration",
						this.s.backdropDuration + "ms"
					),
					f = 0;
				f < this.$items.length;
				f++
			)
				d += '<div class="lg-item"></div>';
			if (
				(this.s.controls &&
					this.$items.length > 1 &&
					(e =
						'<div class="lg-actions"><div class="lg-prev lg-icon">' +
						this.s.prevHtml +
						'</div><div class="lg-next lg-icon">' +
						this.s.nextHtml +
						"</div></div>"),
				".lg-sub-html" === this.s.appendSubHtmlTo &&
					(g = '<div class="lg-sub-html"></div>'),
				(c =
					'<div class="lg-outer ' +
					this.s.addClass +
					" " +
					this.s.startClass +
					'"><div class="lg" style="width:' +
					this.s.width +
					"; height:" +
					this.s.height +
					'"><div class="lg-inner">' +
					d +
					'</div><div class="lg-toolbar group"><span class="lg-close lg-icon"></span></div>' +
					e +
					g +
					"</div></div>"),
				a("body").append(c),
				(this.$outer = a(".lg-outer")),
				(this.$slide = this.$outer.find(".lg-item")),
				this.s.useLeft
					? (this.$outer.addClass("lg-use-left"),
					  (this.s.mode = "lg-slide"))
					: this.$outer.addClass("lg-use-css3"),
				h.setTop(),
				a(b).on("resize.lg orientationchange.lg", function () {
					setTimeout(function () {
						h.setTop();
					}, 100);
				}),
				this.$slide.eq(this.index).addClass("lg-current"),
				this.doCss()
					? this.$outer.addClass("lg-css3")
					: (this.$outer.addClass("lg-css"), (this.s.speed = 0)),
				this.$outer.addClass(this.s.mode),
				this.s.enableDrag &&
					this.$items.length > 1 &&
					this.$outer.addClass("lg-grab"),
				this.s.showAfterLoad &&
					this.$outer.addClass("lg-show-after-load"),
				this.doCss())
			) {
				var i = this.$outer.find(".lg-inner");
				i.css("transition-timing-function", this.s.cssEasing),
					i.css("transition-duration", this.s.speed + "ms");
			}
			a(".lg-backdrop").addClass("in"),
				setTimeout(function () {
					h.$outer.addClass("lg-visible");
				}, this.s.backdropDuration),
				this.s.download &&
					this.$outer
						.find(".lg-toolbar")
						.append(
							'<a id="lg-download" target="_blank" download class="lg-download lg-icon"></a>'
						),
				(this.prevScrollTop = a(b).scrollTop());
		}),
		(e.prototype.setTop = function () {
			if ("100%" !== this.s.height) {
				var c = a(b).height(),
					d = (c - parseInt(this.s.height, 10)) / 2,
					e = this.$outer.find(".lg");
				c >= parseInt(this.s.height, 10)
					? e.css("top", d + "px")
					: e.css("top", "0px");
			}
		}),
		(e.prototype.doCss = function () {
			var a = function () {
				var a = [
						"transition",
						"MozTransition",
						"WebkitTransition",
						"OTransition",
						"msTransition",
						"KhtmlTransition",
					],
					b = c.documentElement,
					d = 0;
				for (d = 0; d < a.length; d++) if (a[d] in b.style) return !0;
			};
			return !!a();
		}),
		(e.prototype.isVideo = function (a, b) {
			var c;
			if (
				((c = this.s.dynamic
					? this.s.dynamicEl[b].html
					: this.$items.eq(b).attr("data-html")),
				!a && c)
			)
				return { html5: !0 };
			var d = a.match(
					/\/\/(?:www\.)?youtu(?:\.be|be\.com)\/(?:watch\?v=|embed\/)?([a-z0-9\-\_\%]+)/i
				),
				e = a.match(/\/\/(?:www\.)?vimeo.com\/([0-9a-z\-_]+)/i),
				f = a.match(/\/\/(?:www\.)?dai.ly\/([0-9a-z\-_]+)/i),
				g = a.match(
					/\/\/(?:www\.)?(?:vk\.com|vkontakte\.ru)\/(?:video_ext\.php\?)(.*)/i
				);
			return d
				? { youtube: d }
				: e
				? { vimeo: e }
				: f
				? { dailymotion: f }
				: g
				? { vk: g }
				: void 0;
		}),
		(e.prototype.counter = function () {
			this.s.counter &&
				a(this.s.appendCounterTo).append(
					'<div id="lg-counter"><span id="lg-counter-current">' +
						(parseInt(this.index, 10) + 1) +
						'</span> / <span id="lg-counter-all">' +
						this.$items.length +
						"</span></div>"
				);
		}),
		(e.prototype.addHtml = function (b) {
			var c,
				d,
				e = null;
			if (
				(this.s.dynamic
					? this.s.dynamicEl[b].subHtmlUrl
						? (c = this.s.dynamicEl[b].subHtmlUrl)
						: (e = this.s.dynamicEl[b].subHtml)
					: ((d = this.$items.eq(b)),
					  d.attr("data-sub-html-url")
							? (c = d.attr("data-sub-html-url"))
							: ((e = d.attr("data-sub-html")),
							  this.s.getCaptionFromTitleOrAlt &&
									!e &&
									(e =
										d.attr("title") ||
										d.find("img").first().attr("alt")))),
				!c)
			)
				if ("undefined" != typeof e && null !== e) {
					var f = e.substring(0, 1);
					("." !== f && "#" !== f) ||
						(e =
							this.s.subHtmlSelectorRelative && !this.s.dynamic
								? d.find(e).html()
								: a(e).html());
				} else e = "";
			".lg-sub-html" === this.s.appendSubHtmlTo
				? c
					? this.$outer.find(this.s.appendSubHtmlTo).load(c)
					: this.$outer.find(this.s.appendSubHtmlTo).html(e)
				: c
				? this.$slide.eq(b).load(c)
				: this.$slide.eq(b).append(e),
				"undefined" != typeof e &&
					null !== e &&
					("" === e
						? this.$outer
								.find(this.s.appendSubHtmlTo)
								.addClass("lg-empty-html")
						: this.$outer
								.find(this.s.appendSubHtmlTo)
								.removeClass("lg-empty-html")),
				this.$el.trigger("onAfterAppendSubHtml.lg", [b]);
		}),
		(e.prototype.preload = function (a) {
			var b = 1,
				c = 1;
			for (
				b = 1;
				b <= this.s.preload && !(b >= this.$items.length - a);
				b++
			)
				this.loadContent(a + b, !1, 0);
			for (c = 1; c <= this.s.preload && !(a - c < 0); c++)
				this.loadContent(a - c, !1, 0);
		}),
		(e.prototype.loadContent = function (c, d, e) {
			var f,
				g,
				h,
				i,
				j,
				k,
				l = this,
				m = !1,
				n = function (c) {
					for (var d = [], e = [], f = 0; f < c.length; f++) {
						var h = c[f].split(" ");
						"" === h[0] && h.splice(0, 1),
							e.push(h[0]),
							d.push(h[1]);
					}
					for (var i = a(b).width(), j = 0; j < d.length; j++)
						if (parseInt(d[j], 10) > i) {
							g = e[j];
							break;
						}
				};
			if (l.s.dynamic) {
				if (
					(l.s.dynamicEl[c].poster &&
						((m = !0), (h = l.s.dynamicEl[c].poster)),
					(k = l.s.dynamicEl[c].html),
					(g = l.s.dynamicEl[c].src),
					l.s.dynamicEl[c].responsive)
				) {
					var o = l.s.dynamicEl[c].responsive.split(",");
					n(o);
				}
				(i = l.s.dynamicEl[c].srcset), (j = l.s.dynamicEl[c].sizes);
			} else {
				if (
					(l.$items.eq(c).attr("data-poster") &&
						((m = !0), (h = l.$items.eq(c).attr("data-poster"))),
					(k = l.$items.eq(c).attr("data-html")),
					(g =
						l.$items.eq(c).attr("href") ||
						l.$items.eq(c).attr("data-src")),
					l.$items.eq(c).attr("data-responsive"))
				) {
					var p = l.$items.eq(c).attr("data-responsive").split(",");
					n(p);
				}
				(i = l.$items.eq(c).attr("data-srcset")),
					(j = l.$items.eq(c).attr("data-sizes"));
			}
			var q = !1;
			l.s.dynamic
				? l.s.dynamicEl[c].iframe && (q = !0)
				: "true" === l.$items.eq(c).attr("data-iframe") && (q = !0);
			var r = l.isVideo(g, c);
			if (!l.$slide.eq(c).hasClass("lg-loaded")) {
				if (q)
					l.$slide
						.eq(c)
						.prepend(
							'<div class="lg-video-cont" style="max-width:' +
								l.s.iframeMaxWidth +
								'"><div class="lg-video"><iframe class="lg-object" frameborder="0" src="' +
								g +
								'"  allowfullscreen="true"></iframe></div></div>'
						);
				else if (m) {
					var s = "";
					(s =
						r && r.youtube
							? "lg-has-youtube"
							: r && r.vimeo
							? "lg-has-vimeo"
							: "lg-has-html5"),
						l.$slide
							.eq(c)
							.prepend(
								'<div class="lg-video-cont ' +
									s +
									' "><div class="lg-video"><span class="lg-video-play"></span><img class="lg-object lg-has-poster" src="' +
									h +
									'" /></div></div>'
							);
				} else
					r
						? (l.$slide
								.eq(c)
								.prepend(
									'<div class="lg-video-cont "><div class="lg-video"></div></div>'
								),
						  l.$el.trigger("hasVideo.lg", [c, g, k]))
						: l.$slide
								.eq(c)
								.prepend(
									'<div class="lg-img-wrap"><img class="lg-object lg-image" src="' +
										g +
										'" /></div>'
								);
				if (
					(l.$el.trigger("onAferAppendSlide.lg", [c]),
					(f = l.$slide.eq(c).find(".lg-object")),
					j && f.attr("sizes", j),
					i)
				) {
					f.attr("srcset", i);
					try {
						picturefill({ elements: [f[0]] });
					} catch (a) {
						console.error(
							"Make sure you have included Picturefill version 2"
						);
					}
				}
				".lg-sub-html" !== this.s.appendSubHtmlTo && l.addHtml(c),
					l.$slide.eq(c).addClass("lg-loaded");
			}
			l.$slide
				.eq(c)
				.find(".lg-object")
				.on("load.lg error.lg", function () {
					var b = 0;
					e && !a("body").hasClass("lg-from-hash") && (b = e),
						setTimeout(function () {
							l.$slide.eq(c).addClass("lg-complete"),
								l.$el.trigger("onSlideItemLoad.lg", [
									c,
									e || 0,
								]);
						}, b);
				}),
				r && r.html5 && !m && l.$slide.eq(c).addClass("lg-complete"),
				d === !0 &&
					(l.$slide.eq(c).hasClass("lg-complete")
						? l.preload(c)
						: l.$slide
								.eq(c)
								.find(".lg-object")
								.on("load.lg error.lg", function () {
									l.preload(c);
								}));
		}),
		(e.prototype.slide = function (b, c, d) {
			var e = this.$outer.find(".lg-current").index(),
				f = this;
			if (!f.lGalleryOn || e !== b) {
				var g = this.$slide.length,
					h = f.lGalleryOn ? this.s.speed : 0,
					i = !1,
					j = !1;
				if (!f.lgBusy) {
					if (this.s.download) {
						var k;
						(k = f.s.dynamic
							? f.s.dynamicEl[b].downloadUrl !== !1 &&
							  (f.s.dynamicEl[b].downloadUrl ||
									f.s.dynamicEl[b].src)
							: "false" !==
									f.$items.eq(b).attr("data-download-url") &&
							  (f.$items.eq(b).attr("data-download-url") ||
									f.$items.eq(b).attr("href") ||
									f.$items.eq(b).attr("data-src"))),
							k
								? (a("#lg-download").attr("href", k),
								  f.$outer.removeClass("lg-hide-download"))
								: f.$outer.addClass("lg-hide-download");
					}
					if (
						(this.$el.trigger("onBeforeSlide.lg", [e, b, c, d]),
						(f.lgBusy = !0),
						clearTimeout(f.hideBartimeout),
						".lg-sub-html" === this.s.appendSubHtmlTo &&
							setTimeout(function () {
								f.addHtml(b);
							}, h),
						this.arrowDisable(b),
						c)
					) {
						var l = b - 1,
							m = b + 1;
						0 === b && e === g - 1
							? ((m = 0), (l = g - 1))
							: b === g - 1 && 0 === e && ((m = 0), (l = g - 1)),
							this.$slide.removeClass(
								"lg-prev-slide lg-current lg-next-slide"
							),
							f.$slide.eq(l).addClass("lg-prev-slide"),
							f.$slide.eq(m).addClass("lg-next-slide"),
							f.$slide.eq(b).addClass("lg-current");
					} else
						f.$outer.addClass("lg-no-trans"),
							this.$slide.removeClass(
								"lg-prev-slide lg-next-slide"
							),
							b < e
								? ((j = !0),
								  0 !== b ||
										e !== g - 1 ||
										d ||
										((j = !1), (i = !0)))
								: b > e &&
								  ((i = !0),
								  b !== g - 1 ||
										0 !== e ||
										d ||
										((j = !0), (i = !1))),
							j
								? (this.$slide.eq(b).addClass("lg-prev-slide"),
								  this.$slide.eq(e).addClass("lg-next-slide"))
								: i &&
								  (this.$slide.eq(b).addClass("lg-next-slide"),
								  this.$slide.eq(e).addClass("lg-prev-slide")),
							setTimeout(function () {
								f.$slide.removeClass("lg-current"),
									f.$slide.eq(b).addClass("lg-current"),
									f.$outer.removeClass("lg-no-trans");
							}, 50);
					f.lGalleryOn
						? (setTimeout(function () {
								f.loadContent(b, !0, 0);
						  }, this.s.speed + 50),
						  setTimeout(function () {
								(f.lgBusy = !1),
									f.$el.trigger("onAfterSlide.lg", [
										e,
										b,
										c,
										d,
									]);
						  }, this.s.speed))
						: (f.loadContent(b, !0, f.s.backdropDuration),
						  (f.lgBusy = !1),
						  f.$el.trigger("onAfterSlide.lg", [e, b, c, d])),
						(f.lGalleryOn = !0),
						this.s.counter && a("#lg-counter-current").text(b + 1);
				}
			}
		}),
		(e.prototype.goToNextSlide = function (a) {
			var b = this;
			b.lgBusy ||
				(b.index + 1 < b.$slide.length
					? (b.index++,
					  b.$el.trigger("onBeforeNextSlide.lg", [b.index]),
					  b.slide(b.index, a, !1))
					: b.s.loop
					? ((b.index = 0),
					  b.$el.trigger("onBeforeNextSlide.lg", [b.index]),
					  b.slide(b.index, a, !1))
					: b.s.slideEndAnimatoin &&
					  (b.$outer.addClass("lg-right-end"),
					  setTimeout(function () {
							b.$outer.removeClass("lg-right-end");
					  }, 400)));
		}),
		(e.prototype.goToPrevSlide = function (a) {
			var b = this;
			b.lgBusy ||
				(b.index > 0
					? (b.index--,
					  b.$el.trigger("onBeforePrevSlide.lg", [b.index, a]),
					  b.slide(b.index, a, !1))
					: b.s.loop
					? ((b.index = b.$items.length - 1),
					  b.$el.trigger("onBeforePrevSlide.lg", [b.index, a]),
					  b.slide(b.index, a, !1))
					: b.s.slideEndAnimatoin &&
					  (b.$outer.addClass("lg-left-end"),
					  setTimeout(function () {
							b.$outer.removeClass("lg-left-end");
					  }, 400)));
		}),
		(e.prototype.keyPress = function () {
			var c = this;
			this.$items.length > 1 &&
				a(b).on("keyup.lg", function (a) {
					c.$items.length > 1 &&
						(37 === a.keyCode &&
							(a.preventDefault(), c.goToPrevSlide()),
						39 === a.keyCode &&
							(a.preventDefault(), c.goToNextSlide()));
				}),
				a(b).on("keydown.lg", function (a) {
					c.s.escKey === !0 &&
						27 === a.keyCode &&
						(a.preventDefault(),
						c.$outer.hasClass("lg-thumb-open")
							? c.$outer.removeClass("lg-thumb-open")
							: c.destroy());
				});
		}),
		(e.prototype.arrow = function () {
			var a = this;
			this.$outer.find(".lg-prev").on("click.lg", function () {
				a.goToPrevSlide();
			}),
				this.$outer.find(".lg-next").on("click.lg", function () {
					a.goToNextSlide();
				});
		}),
		(e.prototype.arrowDisable = function (a) {
			!this.s.loop &&
				this.s.hideControlOnEnd &&
				(a + 1 < this.$slide.length
					? this.$outer
							.find(".lg-next")
							.removeAttr("disabled")
							.removeClass("disabled")
					: this.$outer
							.find(".lg-next")
							.attr("disabled", "disabled")
							.addClass("disabled"),
				a > 0
					? this.$outer
							.find(".lg-prev")
							.removeAttr("disabled")
							.removeClass("disabled")
					: this.$outer
							.find(".lg-prev")
							.attr("disabled", "disabled")
							.addClass("disabled"));
		}),
		(e.prototype.setTranslate = function (a, b, c) {
			this.s.useLeft
				? a.css("left", b)
				: a.css({
						transform: "translate3d(" + b + "px, " + c + "px, 0px)",
				  });
		}),
		(e.prototype.touchMove = function (b, c) {
			var d = c - b;
			Math.abs(d) > 15 &&
				(this.$outer.addClass("lg-dragging"),
				this.setTranslate(this.$slide.eq(this.index), d, 0),
				this.setTranslate(
					a(".lg-prev-slide"),
					-this.$slide.eq(this.index).width() + d,
					0
				),
				this.setTranslate(
					a(".lg-next-slide"),
					this.$slide.eq(this.index).width() + d,
					0
				));
		}),
		(e.prototype.touchEnd = function (a) {
			var b = this;
			"lg-slide" !== b.s.mode && b.$outer.addClass("lg-slide"),
				this.$slide
					.not(".lg-current, .lg-prev-slide, .lg-next-slide")
					.css("opacity", "0"),
				setTimeout(function () {
					b.$outer.removeClass("lg-dragging"),
						a < 0 && Math.abs(a) > b.s.swipeThreshold
							? b.goToNextSlide(!0)
							: a > 0 && Math.abs(a) > b.s.swipeThreshold
							? b.goToPrevSlide(!0)
							: Math.abs(a) < 5 &&
							  b.$el.trigger("onSlideClick.lg"),
						b.$slide.removeAttr("style");
				}),
				setTimeout(function () {
					b.$outer.hasClass("lg-dragging") ||
						"lg-slide" === b.s.mode ||
						b.$outer.removeClass("lg-slide");
				}, b.s.speed + 100);
		}),
		(e.prototype.enableSwipe = function () {
			var a = this,
				b = 0,
				c = 0,
				d = !1;
			a.s.enableSwipe &&
				a.isTouch &&
				a.doCss() &&
				(a.$slide.on("touchstart.lg", function (c) {
					a.$outer.hasClass("lg-zoomed") ||
						a.lgBusy ||
						(c.preventDefault(),
						a.manageSwipeClass(),
						(b = c.originalEvent.targetTouches[0].pageX));
				}),
				a.$slide.on("touchmove.lg", function (e) {
					a.$outer.hasClass("lg-zoomed") ||
						(e.preventDefault(),
						(c = e.originalEvent.targetTouches[0].pageX),
						a.touchMove(b, c),
						(d = !0));
				}),
				a.$slide.on("touchend.lg", function () {
					a.$outer.hasClass("lg-zoomed") ||
						(d
							? ((d = !1), a.touchEnd(c - b))
							: a.$el.trigger("onSlideClick.lg"));
				}));
		}),
		(e.prototype.enableDrag = function () {
			var c = this,
				d = 0,
				e = 0,
				f = !1,
				g = !1;
			c.s.enableDrag &&
				!c.isTouch &&
				c.doCss() &&
				(c.$slide.on("mousedown.lg", function (b) {
					c.$outer.hasClass("lg-zoomed") ||
						((a(b.target).hasClass("lg-object") ||
							a(b.target).hasClass("lg-video-play")) &&
							(b.preventDefault(),
							c.lgBusy ||
								(c.manageSwipeClass(),
								(d = b.pageX),
								(f = !0),
								(c.$outer.scrollLeft += 1),
								(c.$outer.scrollLeft -= 1),
								c.$outer
									.removeClass("lg-grab")
									.addClass("lg-grabbing"),
								c.$el.trigger("onDragstart.lg"))));
				}),
				a(b).on("mousemove.lg", function (a) {
					f &&
						((g = !0),
						(e = a.pageX),
						c.touchMove(d, e),
						c.$el.trigger("onDragmove.lg"));
				}),
				a(b).on("mouseup.lg", function (b) {
					g
						? ((g = !1),
						  c.touchEnd(e - d),
						  c.$el.trigger("onDragend.lg"))
						: (a(b.target).hasClass("lg-object") ||
								a(b.target).hasClass("lg-video-play")) &&
						  c.$el.trigger("onSlideClick.lg"),
						f &&
							((f = !1),
							c.$outer
								.removeClass("lg-grabbing")
								.addClass("lg-grab"));
				}));
		}),
		(e.prototype.manageSwipeClass = function () {
			var a = this.index + 1,
				b = this.index - 1,
				c = this.$slide.length;
			this.s.loop &&
				(0 === this.index
					? (b = c - 1)
					: this.index === c - 1 && (a = 0)),
				this.$slide.removeClass("lg-next-slide lg-prev-slide"),
				b > -1 && this.$slide.eq(b).addClass("lg-prev-slide"),
				this.$slide.eq(a).addClass("lg-next-slide");
		}),
		(e.prototype.mousewheel = function () {
			var a = this;
			a.$outer.on("mousewheel.lg", function (b) {
				b.deltaY &&
					(b.deltaY > 0 ? a.goToPrevSlide() : a.goToNextSlide(),
					b.preventDefault());
			});
		}),
		(e.prototype.closeGallery = function () {
			var b = this,
				c = !1;
			this.$outer.find(".lg-close").on("click.lg", function () {
				b.destroy();
			}),
				b.s.closable &&
					(b.$outer.on("mousedown.lg", function (b) {
						c = !!(
							a(b.target).is(".lg-outer") ||
							a(b.target).is(".lg-item ") ||
							a(b.target).is(".lg-img-wrap")
						);
					}),
					b.$outer.on("mouseup.lg", function (d) {
						(a(d.target).is(".lg-outer") ||
							a(d.target).is(".lg-item ") ||
							(a(d.target).is(".lg-img-wrap") && c)) &&
							(b.$outer.hasClass("lg-dragging") || b.destroy());
					}));
		}),
		(e.prototype.destroy = function (c) {
			var d = this;
			c || d.$el.trigger("onBeforeClose.lg"),
				a(b).scrollTop(d.prevScrollTop),
				c &&
					(d.s.dynamic || this.$items.off("click.lg click.lgcustom"),
					a.removeData(d.el, "lightGallery")),
				this.$el.off(".lg.tm"),
				a.each(a.fn.lightGallery.modules, function (a) {
					d.modules[a] && d.modules[a].destroy();
				}),
				(this.lGalleryOn = !1),
				clearTimeout(d.hideBartimeout),
				(this.hideBartimeout = !1),
				a(b).off(".lg"),
				a("body").removeClass("lg-on lg-from-hash"),
				d.$outer && d.$outer.removeClass("lg-visible"),
				a(".lg-backdrop").removeClass("in"),
				setTimeout(function () {
					d.$outer && d.$outer.remove(),
						a(".lg-backdrop").remove(),
						c || d.$el.trigger("onCloseAfter.lg");
				}, d.s.backdropDuration + 50);
		}),
		(a.fn.lightGallery = function (b) {
			return this.each(function () {
				if (a.data(this, "lightGallery"))
					try {
						a(this).data("lightGallery").init();
					} catch (a) {
						console.error(
							"lightGallery has not initiated properly"
						);
					}
				else a.data(this, "lightGallery", new e(this, b));
			});
		}),
		(a.fn.lightGallery.modules = {});
})(jQuery, window, document);
/*! lg-zoom - v1.0.4 - 2016-12-20
 * http://sachinchoolur.github.io/lightGallery
 * Copyright (c) 2016 Sachin N; Licensed GPLv3 */
!(function (a, b) {
	"function" == typeof define && define.amd
		? define(["jquery"], function (a) {
				return b(a);
		  })
		: "object" == typeof exports
		? (module.exports = b(require("jquery")))
		: b(jQuery);
})(this, function (a) {
	!(function () {
		"use strict";
		var b = function () {
				var a = !1,
					b = navigator.userAgent.match(/Chrom(e|ium)\/([0-9]+)\./);
				return b && parseInt(b[2], 10) < 54 && (a = !0), a;
			},
			c = {
				scale: 1,
				zoom: !0,
				actualSize: !0,
				enableZoomAfter: 300,
				useLeftForZoom: b(),
			},
			d = function (b) {
				return (
					(this.core = a(b).data("lightGallery")),
					(this.core.s = a.extend({}, c, this.core.s)),
					this.core.s.zoom &&
						this.core.doCss() &&
						(this.init(),
						(this.zoomabletimeout = !1),
						(this.pageX = a(window).width() / 2),
						(this.pageY =
							a(window).height() / 2 + a(window).scrollTop())),
					this
				);
			};
		(d.prototype.init = function () {
			var b = this,
				c =
					'<span id="lg-zoom-in" class="lg-icon"></span><span id="lg-zoom-out" class="lg-icon"></span>';
			b.core.s.actualSize &&
				(c += '<span id="lg-actual-size" class="lg-icon"></span>'),
				b.core.s.useLeftForZoom
					? b.core.$outer.addClass("lg-use-left-for-zoom")
					: b.core.$outer.addClass("lg-use-transition-for-zoom"),
				this.core.$outer.find(".lg-toolbar").append(c),
				b.core.$el.on("onSlideItemLoad.lg.tm.zoom", function (c, d, e) {
					var f = b.core.s.enableZoomAfter + e;
					a("body").hasClass("lg-from-hash") && e
						? (f = 0)
						: a("body").removeClass("lg-from-hash"),
						(b.zoomabletimeout = setTimeout(function () {
							b.core.$slide.eq(d).addClass("lg-zoomable");
						}, f + 30));
				});
			var d = 1,
				e = function (c) {
					var e,
						f,
						d = b.core.$outer.find(".lg-current .lg-image"),
						g = (a(window).width() - d.prop("offsetWidth")) / 2,
						h =
							(a(window).height() - d.prop("offsetHeight")) / 2 +
							a(window).scrollTop();
					(e = b.pageX - g), (f = b.pageY - h);
					var i = (c - 1) * e,
						j = (c - 1) * f;
					d
						.css("transform", "scale3d(" + c + ", " + c + ", 1)")
						.attr("data-scale", c),
						b.core.s.useLeftForZoom
							? d
									.parent()
									.css({ left: -i + "px", top: -j + "px" })
									.attr("data-x", i)
									.attr("data-y", j)
							: d
									.parent()
									.css(
										"transform",
										"translate3d(-" +
											i +
											"px, -" +
											j +
											"px, 0)"
									)
									.attr("data-x", i)
									.attr("data-y", j);
				},
				f = function () {
					d > 1 ? b.core.$outer.addClass("lg-zoomed") : b.resetZoom(),
						d < 1 && (d = 1),
						e(d);
				},
				g = function (c, e, g, h) {
					var j,
						i = e.prop("offsetWidth");
					j = b.core.s.dynamic
						? b.core.s.dynamicEl[g].width || e[0].naturalWidth || i
						: b.core.$items.eq(g).attr("data-width") ||
						  e[0].naturalWidth ||
						  i;
					var k;
					b.core.$outer.hasClass("lg-zoomed")
						? (d = 1)
						: j > i && ((k = j / i), (d = k || 2)),
						h
							? ((b.pageX = a(window).width() / 2),
							  (b.pageY =
									a(window).height() / 2 +
									a(window).scrollTop()))
							: ((b.pageX =
									c.pageX ||
									c.originalEvent.targetTouches[0].pageX),
							  (b.pageY =
									c.pageY ||
									c.originalEvent.targetTouches[0].pageY)),
						f(),
						setTimeout(function () {
							b.core.$outer
								.removeClass("lg-grabbing")
								.addClass("lg-grab");
						}, 10);
				},
				h = !1;
			b.core.$el.on("onAferAppendSlide.lg.tm.zoom", function (a, c) {
				var d = b.core.$slide.eq(c).find(".lg-image");
				d.on("dblclick", function (a) {
					g(a, d, c);
				}),
					d.on("touchstart", function (a) {
						h
							? (clearTimeout(h), (h = null), g(a, d, c))
							: (h = setTimeout(function () {
									h = null;
							  }, 300)),
							a.preventDefault();
					});
			}),
				a(window).on(
					"resize.lg.zoom scroll.lg.zoom orientationchange.lg.zoom",
					function () {
						(b.pageX = a(window).width() / 2),
							(b.pageY =
								a(window).height() / 2 + a(window).scrollTop()),
							e(d);
					}
				),
				a("#lg-zoom-out").on("click.lg", function () {
					b.core.$outer.find(".lg-current .lg-image").length &&
						((d -= b.core.s.scale), f());
				}),
				a("#lg-zoom-in").on("click.lg", function () {
					b.core.$outer.find(".lg-current .lg-image").length &&
						((d += b.core.s.scale), f());
				}),
				a("#lg-actual-size").on("click.lg", function (a) {
					g(
						a,
						b.core.$slide.eq(b.core.index).find(".lg-image"),
						b.core.index,
						!0
					);
				}),
				b.core.$el.on("onBeforeSlide.lg.tm", function () {
					(d = 1), b.resetZoom();
				}),
				b.core.isTouch || b.zoomDrag(),
				b.core.isTouch && b.zoomSwipe();
		}),
			(d.prototype.resetZoom = function () {
				this.core.$outer.removeClass("lg-zoomed"),
					this.core.$slide
						.find(".lg-img-wrap")
						.removeAttr("style data-x data-y"),
					this.core.$slide
						.find(".lg-image")
						.removeAttr("style data-scale"),
					(this.pageX = a(window).width() / 2),
					(this.pageY =
						a(window).height() / 2 + a(window).scrollTop());
			}),
			(d.prototype.zoomSwipe = function () {
				var a = this,
					b = {},
					c = {},
					d = !1,
					e = !1,
					f = !1;
				a.core.$slide.on("touchstart.lg", function (c) {
					if (a.core.$outer.hasClass("lg-zoomed")) {
						var d = a.core.$slide
							.eq(a.core.index)
							.find(".lg-object");
						(f =
							d.prop("offsetHeight") * d.attr("data-scale") >
							a.core.$outer.find(".lg").height()),
							(e =
								d.prop("offsetWidth") * d.attr("data-scale") >
								a.core.$outer.find(".lg").width()),
							(e || f) &&
								(c.preventDefault(),
								(b = {
									x: c.originalEvent.targetTouches[0].pageX,
									y: c.originalEvent.targetTouches[0].pageY,
								}));
					}
				}),
					a.core.$slide.on("touchmove.lg", function (g) {
						if (a.core.$outer.hasClass("lg-zoomed")) {
							var i,
								j,
								h = a.core.$slide
									.eq(a.core.index)
									.find(".lg-img-wrap");
							g.preventDefault(),
								(d = !0),
								(c = {
									x: g.originalEvent.targetTouches[0].pageX,
									y: g.originalEvent.targetTouches[0].pageY,
								}),
								a.core.$outer.addClass("lg-zoom-dragging"),
								(j = f
									? -Math.abs(h.attr("data-y")) + (c.y - b.y)
									: -Math.abs(h.attr("data-y"))),
								(i = e
									? -Math.abs(h.attr("data-x")) + (c.x - b.x)
									: -Math.abs(h.attr("data-x"))),
								(Math.abs(c.x - b.x) > 15 ||
									Math.abs(c.y - b.y) > 15) &&
									(a.core.s.useLeftForZoom
										? h.css({
												left: i + "px",
												top: j + "px",
										  })
										: h.css(
												"transform",
												"translate3d(" +
													i +
													"px, " +
													j +
													"px, 0)"
										  ));
						}
					}),
					a.core.$slide.on("touchend.lg", function () {
						a.core.$outer.hasClass("lg-zoomed") &&
							d &&
							((d = !1),
							a.core.$outer.removeClass("lg-zoom-dragging"),
							a.touchendZoom(b, c, e, f));
					});
			}),
			(d.prototype.zoomDrag = function () {
				var b = this,
					c = {},
					d = {},
					e = !1,
					f = !1,
					g = !1,
					h = !1;
				b.core.$slide.on("mousedown.lg.zoom", function (d) {
					var f = b.core.$slide.eq(b.core.index).find(".lg-object");
					(h =
						f.prop("offsetHeight") * f.attr("data-scale") >
						b.core.$outer.find(".lg").height()),
						(g =
							f.prop("offsetWidth") * f.attr("data-scale") >
							b.core.$outer.find(".lg").width()),
						b.core.$outer.hasClass("lg-zoomed") &&
							a(d.target).hasClass("lg-object") &&
							(g || h) &&
							(d.preventDefault(),
							(c = { x: d.pageX, y: d.pageY }),
							(e = !0),
							(b.core.$outer.scrollLeft += 1),
							(b.core.$outer.scrollLeft -= 1),
							b.core.$outer
								.removeClass("lg-grab")
								.addClass("lg-grabbing"));
				}),
					a(window).on("mousemove.lg.zoom", function (a) {
						if (e) {
							var j,
								k,
								i = b.core.$slide
									.eq(b.core.index)
									.find(".lg-img-wrap");
							(f = !0),
								(d = { x: a.pageX, y: a.pageY }),
								b.core.$outer.addClass("lg-zoom-dragging"),
								(k = h
									? -Math.abs(i.attr("data-y")) + (d.y - c.y)
									: -Math.abs(i.attr("data-y"))),
								(j = g
									? -Math.abs(i.attr("data-x")) + (d.x - c.x)
									: -Math.abs(i.attr("data-x"))),
								b.core.s.useLeftForZoom
									? i.css({ left: j + "px", top: k + "px" })
									: i.css(
											"transform",
											"translate3d(" +
												j +
												"px, " +
												k +
												"px, 0)"
									  );
						}
					}),
					a(window).on("mouseup.lg.zoom", function (a) {
						e &&
							((e = !1),
							b.core.$outer.removeClass("lg-zoom-dragging"),
							!f ||
								(c.x === d.x && c.y === d.y) ||
								((d = { x: a.pageX, y: a.pageY }),
								b.touchendZoom(c, d, g, h)),
							(f = !1)),
							b.core.$outer
								.removeClass("lg-grabbing")
								.addClass("lg-grab");
					});
			}),
			(d.prototype.touchendZoom = function (a, b, c, d) {
				var e = this,
					f = e.core.$slide.eq(e.core.index).find(".lg-img-wrap"),
					g = e.core.$slide.eq(e.core.index).find(".lg-object"),
					h = -Math.abs(f.attr("data-x")) + (b.x - a.x),
					i = -Math.abs(f.attr("data-y")) + (b.y - a.y),
					j =
						(e.core.$outer.find(".lg").height() -
							g.prop("offsetHeight")) /
						2,
					k = Math.abs(
						g.prop("offsetHeight") *
							Math.abs(g.attr("data-scale")) -
							e.core.$outer.find(".lg").height() +
							j
					),
					l =
						(e.core.$outer.find(".lg").width() -
							g.prop("offsetWidth")) /
						2,
					m = Math.abs(
						g.prop("offsetWidth") * Math.abs(g.attr("data-scale")) -
							e.core.$outer.find(".lg").width() +
							l
					);
				(Math.abs(b.x - a.x) > 15 || Math.abs(b.y - a.y) > 15) &&
					(d && (i <= -k ? (i = -k) : i >= -j && (i = -j)),
					c && (h <= -m ? (h = -m) : h >= -l && (h = -l)),
					d
						? f.attr("data-y", Math.abs(i))
						: (i = -Math.abs(f.attr("data-y"))),
					c
						? f.attr("data-x", Math.abs(h))
						: (h = -Math.abs(f.attr("data-x"))),
					e.core.s.useLeftForZoom
						? f.css({ left: h + "px", top: i + "px" })
						: f.css(
								"transform",
								"translate3d(" + h + "px, " + i + "px, 0)"
						  ));
			}),
			(d.prototype.destroy = function () {
				var b = this;
				b.core.$el.off(".lg.zoom"),
					a(window).off(".lg.zoom"),
					b.core.$slide.off(".lg.zoom"),
					b.core.$el.off(".lg.tm.zoom"),
					b.resetZoom(),
					clearTimeout(b.zoomabletimeout),
					(b.zoomabletimeout = !1);
			}),
			(a.fn.lightGallery.modules.zoom = d);
	})();
});
/*!  lightGallery video */
!(function (e, o, i, l) {
	"use strict";
	var a = {
			videoMaxWidth: "855px",
			youtubePlayerParams: !1,
			vimeoPlayerParams: !1,
			dailymotionPlayerParams: !1,
			videojs: !1,
		},
		s = function (o) {
			return (
				(this.core = e(o).data("lightGallery")),
				(this.$el = e(o)),
				(this.core.s = e.extend({}, a, this.core.s)),
				(this.videoLoaded = !1),
				this.init(),
				this
			);
		};
	(s.prototype.init = function () {
		var o = this;
		o.core.$el.on("hasVideo.lg.tm", function (e, i, l, a) {
			if (
				(o.core.$slide
					.eq(i)
					.find(".lg-video")
					.append(o.loadVideo(l, "lg-object", !0, i, a)),
				a)
			)
				if (o.core.s.videojs)
					try {
						videojs(
							o.core.$slide.eq(i).find(".lg-html5").get(0),
							{},
							function () {
								o.videoLoaded || this.play();
							}
						);
					} catch (s) {
						console.error("Make sure you have included videojs");
					}
				else o.core.$slide.eq(i).find(".lg-html5").get(0).play();
		}),
			o.core.$el.on("onAferAppendSlide.lg.tm", function (e, i) {
				o.core.$slide
					.eq(i)
					.find(".lg-video-cont")
					.css("max-width", o.core.s.videoMaxWidth),
					(o.videoLoaded = !0);
			});
		var i = function (e) {
			if (
				e.find(".lg-object").hasClass("lg-has-poster") &&
				e.find(".lg-object").is(":visible")
			)
				if (e.hasClass("lg-has-video")) {
					var i = e.find(".lg-youtube").get(0),
						l = e.find(".lg-vimeo").get(0),
						a = e.find(".lg-dailymotion").get(0),
						s = e.find(".lg-html5").get(0);
					if (i)
						i.contentWindow.postMessage(
							'{"event":"command","func":"playVideo","args":""}',
							"*"
						);
					else if (l)
						try {
							$f(l).api("play");
						} catch (r) {
							console.error(
								"Make sure you have included froogaloop2 js"
							);
						}
					else if (a) a.contentWindow.postMessage("play", "*");
					else if (s)
						if (o.core.s.videojs)
							try {
								videojs(s).play();
							} catch (r) {
								console.error(
									"Make sure you have included videojs"
								);
							}
						else s.play();
					e.addClass("lg-video-palying");
				} else {
					e.addClass("lg-video-palying lg-has-video");
					var t,
						d,
						c = function (i, l) {
							if (
								(e
									.find(".lg-video")
									.append(
										o.loadVideo(i, "", !1, o.core.index, l)
									),
								l)
							)
								if (o.core.s.videojs)
									try {
										videojs(
											o.core.$slide
												.eq(o.core.index)
												.find(".lg-html5")
												.get(0),
											{},
											function () {
												this.play();
											}
										);
									} catch (a) {
										console.error(
											"Make sure you have included videojs"
										);
									}
								else
									o.core.$slide
										.eq(o.core.index)
										.find(".lg-html5")
										.get(0)
										.play();
						};
					o.core.s.dynamic
						? ((t = o.core.s.dynamicEl[o.core.index].src),
						  (d = o.core.s.dynamicEl[o.core.index].html),
						  c(t, d))
						: ((t =
								o.core.$items.eq(o.core.index).attr("href") ||
								o.core.$items
									.eq(o.core.index)
									.attr("data-src")),
						  (d = o.core.$items
								.eq(o.core.index)
								.attr("data-html")),
						  c(t, d));
					var n = e.find(".lg-object");
					e.find(".lg-video").append(n),
						e.find(".lg-video-object").hasClass("lg-html5") ||
							(e.removeClass("lg-complete"),
							e
								.find(".lg-video-object")
								.on("load.lg error.lg", function () {
									e.addClass("lg-complete");
								}));
				}
		};
		o.core.doCss() &&
		o.core.$items.length > 1 &&
		((o.core.s.enableSwipe && o.core.isTouch) ||
			(o.core.s.enableDrag && !o.core.isTouch))
			? o.core.$el.on("onSlideClick.lg.tm", function () {
					var e = o.core.$slide.eq(o.core.index);
					i(e);
			  })
			: o.core.$slide.on("click.lg", function () {
					i(e(this));
			  }),
			o.core.$el.on("onBeforeSlide.lg.tm", function (e, i, l) {
				var a = o.core.$slide.eq(i),
					s = a.find(".lg-youtube").get(0),
					r = a.find(".lg-vimeo").get(0),
					t = a.find(".lg-dailymotion").get(0),
					d = a.find(".lg-html5").get(0);
				if (s)
					s.contentWindow.postMessage(
						'{"event":"command","func":"pauseVideo","args":""}',
						"*"
					);
				else if (r)
					try {
						$f(r).api("pause");
					} catch (c) {
						console.error(
							"Make sure you have included froogaloop2 js"
						);
					}
				else if (t) t.contentWindow.postMessage("pause", "*");
				else if (d)
					if (o.core.s.videojs)
						try {
							videojs(d).pause();
						} catch (c) {
							console.error(
								"Make sure you have included videojs"
							);
						}
					else d.pause();
				var n;
				n = o.core.s.dynamic
					? o.core.s.dynamicEl[l].src
					: o.core.$items.eq(l).attr("href") ||
					  o.core.$items.eq(l).attr("data-src");
				var m = o.core.isVideo(n, l) || {};
				(m.youtube || m.vimeo || m.dailymotion) &&
					o.core.$outer.addClass("lg-hide-download");
			}),
			o.core.$el.on("onAfterSlide.lg.tm", function (e, i) {
				o.core.$slide.eq(i).removeClass("lg-video-palying");
			});
	}),
		(s.prototype.loadVideo = function (o, i, l, a, s) {
			var r = "",
				t = 1,
				d = "",
				c = this.core.isVideo(o, a) || {};
			if ((l && (t = this.videoLoaded ? 0 : 1), c.youtube))
				(d = "?wmode=opaque&autoplay=" + t + "&enablejsapi=1"),
					this.core.s.youtubePlayerParams &&
						(d =
							d + "&" + e.param(this.core.s.youtubePlayerParams)),
					(r =
						'<iframe class="lg-video-object lg-youtube ' +
						i +
						'" width="560" height="315" src="//www.youtube.com/embed/' +
						c.youtube[1] +
						d +
						'" frameborder="0" allowfullscreen></iframe>');
			else if (c.vimeo)
				(d = "?autoplay=" + t + "&api=1"),
					this.core.s.vimeoPlayerParams &&
						(d = d + "&" + e.param(this.core.s.vimeoPlayerParams)),
					(r =
						'<iframe class="lg-video-object lg-vimeo ' +
						i +
						'" width="560" height="315"  src="http://player.vimeo.com/video/' +
						c.vimeo[1] +
						d +
						'" frameborder="0" webkitAllowFullScreen mozallowfullscreen allowFullScreen></iframe>');
			else if (c.dailymotion)
				(d = "?wmode=opaque&autoplay=" + t + "&api=postMessage"),
					this.core.s.dailymotionPlayerParams &&
						(d =
							d +
							"&" +
							e.param(this.core.s.dailymotionPlayerParams)),
					(r =
						'<iframe class="lg-video-object lg-dailymotion ' +
						i +
						'" width="560" height="315" src="//www.dailymotion.com/embed/video/' +
						c.dailymotion[1] +
						d +
						'" frameborder="0" allowfullscreen></iframe>');
			else if (c.html5) {
				var n = s.substring(0, 1);
				("." === n || "#" === n) && (s = e(s).html()), (r = s);
			}
			return r;
		}),
		(s.prototype.destroy = function () {
			this.videoLoaded = !1;
		}),
		(e.fn.lightGallery.modules.video = s);
})(jQuery, window, document);
/*!
 * Isotope PACKAGED v2.2.2
 *
 * Licensed GPLv3 for open source use
 * or Isotope Commercial License for commercial use
 *
 * http://isotope.metafizzy.co
 * Copyright 2015 Metafizzy
 */
!(function (a) {
	function b() {}
	function c(a) {
		function c(b) {
			b.prototype.option ||
				(b.prototype.option = function (b) {
					a.isPlainObject(b) &&
						(this.options = a.extend(!0, this.options, b));
				});
		}
		function e(b, c) {
			a.fn[b] = function (e) {
				if ("string" == typeof e) {
					for (
						var g = d.call(arguments, 1), h = 0, i = this.length;
						i > h;
						h++
					) {
						var j = this[h],
							k = a.data(j, b);
						if (k)
							if (a.isFunction(k[e]) && "_" !== e.charAt(0)) {
								var l = k[e].apply(k, g);
								if (void 0 !== l) return l;
							} else
								f(
									"no such method '" +
										e +
										"' for " +
										b +
										" instance"
								);
						else
							f(
								"cannot call methods on " +
									b +
									" prior to initialization; attempted to call '" +
									e +
									"'"
							);
					}
					return this;
				}
				return this.each(function () {
					var d = a.data(this, b);
					d
						? (d.option(e), d._init())
						: ((d = new c(this, e)), a.data(this, b, d));
				});
			};
		}
		if (a) {
			var f =
				"undefined" == typeof console
					? b
					: function (a) {
							console.error(a);
					  };
			return (
				(a.bridget = function (a, b) {
					c(b), e(a, b);
				}),
				a.bridget
			);
		}
	}
	var d = Array.prototype.slice;
	"function" == typeof define && define.amd
		? define("jquery-bridget/jquery.bridget", ["jquery"], c)
		: c("object" == typeof exports ? require("jquery") : a.jQuery);
})(window),
	(function (a) {
		function b(b) {
			var c = a.event;
			return (c.target = c.target || c.srcElement || b), c;
		}
		var c = document.documentElement,
			d = function () {};
		c.addEventListener
			? (d = function (a, b, c) {
					a.addEventListener(b, c, !1);
			  })
			: c.attachEvent &&
			  (d = function (a, c, d) {
					(a[c + d] = d.handleEvent
						? function () {
								var c = b(a);
								d.handleEvent.call(d, c);
						  }
						: function () {
								var c = b(a);
								d.call(a, c);
						  }),
						a.attachEvent("on" + c, a[c + d]);
			  });
		var e = function () {};
		c.removeEventListener
			? (e = function (a, b, c) {
					a.removeEventListener(b, c, !1);
			  })
			: c.detachEvent &&
			  (e = function (a, b, c) {
					a.detachEvent("on" + b, a[b + c]);
					try {
						delete a[b + c];
					} catch (d) {
						a[b + c] = void 0;
					}
			  });
		var f = { bind: d, unbind: e };
		"function" == typeof define && define.amd
			? define("eventie/eventie", f)
			: "object" == typeof exports
			? (module.exports = f)
			: (a.eventie = f);
	})(window),
	function () {
		"use strict";
		function a() {}
		function b(a, b) {
			for (var c = a.length; c--; ) if (a[c].listener === b) return c;
			return -1;
		}
		function c(a) {
			return function () {
				return this[a].apply(this, arguments);
			};
		}
		var d = a.prototype,
			e = this,
			f = e.EventEmitter;
		(d.getListeners = function (a) {
			var b,
				c,
				d = this._getEvents();
			if (a instanceof RegExp) {
				b = {};
				for (c in d) d.hasOwnProperty(c) && a.test(c) && (b[c] = d[c]);
			} else b = d[a] || (d[a] = []);
			return b;
		}),
			(d.flattenListeners = function (a) {
				var b,
					c = [];
				for (b = 0; b < a.length; b += 1) c.push(a[b].listener);
				return c;
			}),
			(d.getListenersAsObject = function (a) {
				var b,
					c = this.getListeners(a);
				return c instanceof Array && ((b = {}), (b[a] = c)), b || c;
			}),
			(d.addListener = function (a, c) {
				var d,
					e = this.getListenersAsObject(a),
					f = "object" == typeof c;
				for (d in e)
					e.hasOwnProperty(d) &&
						-1 === b(e[d], c) &&
						e[d].push(f ? c : { listener: c, once: !1 });
				return this;
			}),
			(d.on = c("addListener")),
			(d.addOnceListener = function (a, b) {
				return this.addListener(a, { listener: b, once: !0 });
			}),
			(d.once = c("addOnceListener")),
			(d.defineEvent = function (a) {
				return this.getListeners(a), this;
			}),
			(d.defineEvents = function (a) {
				for (var b = 0; b < a.length; b += 1) this.defineEvent(a[b]);
				return this;
			}),
			(d.removeListener = function (a, c) {
				var d,
					e,
					f = this.getListenersAsObject(a);
				for (e in f)
					f.hasOwnProperty(e) &&
						((d = b(f[e], c)), -1 !== d && f[e].splice(d, 1));
				return this;
			}),
			(d.off = c("removeListener")),
			(d.addListeners = function (a, b) {
				return this.manipulateListeners(!1, a, b);
			}),
			(d.removeListeners = function (a, b) {
				return this.manipulateListeners(!0, a, b);
			}),
			(d.manipulateListeners = function (a, b, c) {
				var d,
					e,
					f = a ? this.removeListener : this.addListener,
					g = a ? this.removeListeners : this.addListeners;
				if ("object" != typeof b || b instanceof RegExp)
					for (d = c.length; d--; ) f.call(this, b, c[d]);
				else
					for (d in b)
						b.hasOwnProperty(d) &&
							(e = b[d]) &&
							("function" == typeof e
								? f.call(this, d, e)
								: g.call(this, d, e));
				return this;
			}),
			(d.removeEvent = function (a) {
				var b,
					c = typeof a,
					d = this._getEvents();
				if ("string" === c) delete d[a];
				else if (a instanceof RegExp)
					for (b in d)
						d.hasOwnProperty(b) && a.test(b) && delete d[b];
				else delete this._events;
				return this;
			}),
			(d.removeAllListeners = c("removeEvent")),
			(d.emitEvent = function (a, b) {
				var c,
					d,
					e,
					f,
					g = this.getListenersAsObject(a);
				for (e in g)
					if (g.hasOwnProperty(e))
						for (d = g[e].length; d--; )
							(c = g[e][d]),
								c.once === !0 &&
									this.removeListener(a, c.listener),
								(f = c.listener.apply(this, b || [])),
								f === this._getOnceReturnValue() &&
									this.removeListener(a, c.listener);
				return this;
			}),
			(d.trigger = c("emitEvent")),
			(d.emit = function (a) {
				var b = Array.prototype.slice.call(arguments, 1);
				return this.emitEvent(a, b);
			}),
			(d.setOnceReturnValue = function (a) {
				return (this._onceReturnValue = a), this;
			}),
			(d._getOnceReturnValue = function () {
				return this.hasOwnProperty("_onceReturnValue")
					? this._onceReturnValue
					: !0;
			}),
			(d._getEvents = function () {
				return this._events || (this._events = {});
			}),
			(a.noConflict = function () {
				return (e.EventEmitter = f), a;
			}),
			"function" == typeof define && define.amd
				? define("eventEmitter/EventEmitter", [], function () {
						return a;
				  })
				: "object" == typeof module && module.exports
				? (module.exports = a)
				: (e.EventEmitter = a);
	}.call(this),
	(function (a) {
		function b(a) {
			if (a) {
				if ("string" == typeof d[a]) return a;
				a = a.charAt(0).toUpperCase() + a.slice(1);
				for (var b, e = 0, f = c.length; f > e; e++)
					if (((b = c[e] + a), "string" == typeof d[b])) return b;
			}
		}
		var c = "Webkit Moz ms Ms O".split(" "),
			d = document.documentElement.style;
		"function" == typeof define && define.amd
			? define("get-style-property/get-style-property", [], function () {
					return b;
			  })
			: "object" == typeof exports
			? (module.exports = b)
			: (a.getStyleProperty = b);
	})(window),
	(function (a, b) {
		function c(a) {
			var b = parseFloat(a),
				c = -1 === a.indexOf("%") && !isNaN(b);
			return c && b;
		}
		function d() {}
		function e() {
			for (
				var a = {
						width: 0,
						height: 0,
						innerWidth: 0,
						innerHeight: 0,
						outerWidth: 0,
						outerHeight: 0,
					},
					b = 0,
					c = h.length;
				c > b;
				b++
			) {
				var d = h[b];
				a[d] = 0;
			}
			return a;
		}
		function f(b) {
			function d() {
				if (!m) {
					m = !0;
					var d = a.getComputedStyle;
					if (
						((j = (function () {
							var a = d
								? function (a) {
										return d(a, null);
								  }
								: function (a) {
										return a.currentStyle;
								  };
							return function (b) {
								var c = a(b);
								return (
									c ||
										g(
											"Style returned " +
												c +
												". Are you running this code in a hidden iframe on Firefox? See http://bit.ly/getsizebug1"
										),
									c
								);
							};
						})()),
						(k = b("boxSizing")))
					) {
						var e = document.createElement("div");
						(e.style.width = "200px"),
							(e.style.padding = "1px 2px 3px 4px"),
							(e.style.borderStyle = "solid"),
							(e.style.borderWidth = "1px 2px 3px 4px"),
							(e.style[k] = "border-box");
						var f = document.body || document.documentElement;
						f.appendChild(e);
						var h = j(e);
						(l = 200 === c(h.width)), f.removeChild(e);
					}
				}
			}
			function f(a) {
				if (
					(d(),
					"string" == typeof a && (a = document.querySelector(a)),
					a && "object" == typeof a && a.nodeType)
				) {
					var b = j(a);
					if ("none" === b.display) return e();
					var f = {};
					(f.width = a.offsetWidth), (f.height = a.offsetHeight);
					for (
						var g = (f.isBorderBox = !(
								!k ||
								!b[k] ||
								"border-box" !== b[k]
							)),
							m = 0,
							n = h.length;
						n > m;
						m++
					) {
						var o = h[m],
							p = b[o];
						p = i(a, p);
						var q = parseFloat(p);
						f[o] = isNaN(q) ? 0 : q;
					}
					var r = f.paddingLeft + f.paddingRight,
						s = f.paddingTop + f.paddingBottom,
						t = f.marginLeft + f.marginRight,
						u = f.marginTop + f.marginBottom,
						v = f.borderLeftWidth + f.borderRightWidth,
						w = f.borderTopWidth + f.borderBottomWidth,
						x = g && l,
						y = c(b.width);
					y !== !1 && (f.width = y + (x ? 0 : r + v));
					var z = c(b.height);
					return (
						z !== !1 && (f.height = z + (x ? 0 : s + w)),
						(f.innerWidth = f.width - (r + v)),
						(f.innerHeight = f.height - (s + w)),
						(f.outerWidth = f.width + t),
						(f.outerHeight = f.height + u),
						f
					);
				}
			}
			function i(b, c) {
				if (a.getComputedStyle || -1 === c.indexOf("%")) return c;
				var d = b.style,
					e = d.left,
					f = b.runtimeStyle,
					g = f && f.left;
				return (
					g && (f.left = b.currentStyle.left),
					(d.left = c),
					(c = d.pixelLeft),
					(d.left = e),
					g && (f.left = g),
					c
				);
			}
			var j,
				k,
				l,
				m = !1;
			return f;
		}
		var g =
				"undefined" == typeof console
					? d
					: function (a) {
							console.error(a);
					  },
			h = [
				"paddingLeft",
				"paddingRight",
				"paddingTop",
				"paddingBottom",
				"marginLeft",
				"marginRight",
				"marginTop",
				"marginBottom",
				"borderLeftWidth",
				"borderRightWidth",
				"borderTopWidth",
				"borderBottomWidth",
			];
		"function" == typeof define && define.amd
			? define(
					"get-size/get-size",
					["get-style-property/get-style-property"],
					f
			  )
			: "object" == typeof exports
			? (module.exports = f(require("desandro-get-style-property")))
			: (a.getSize = f(a.getStyleProperty));
	})(window),
	(function (a) {
		function b(a) {
			"function" == typeof a && (b.isReady ? a() : g.push(a));
		}
		function c(a) {
			var c =
				"readystatechange" === a.type && "complete" !== f.readyState;
			b.isReady || c || d();
		}
		function d() {
			b.isReady = !0;
			for (var a = 0, c = g.length; c > a; a++) {
				var d = g[a];
				d();
			}
		}
		function e(e) {
			return (
				"complete" === f.readyState
					? d()
					: (e.bind(f, "DOMContentLoaded", c),
					  e.bind(f, "readystatechange", c),
					  e.bind(a, "load", c)),
				b
			);
		}
		var f = a.document,
			g = [];
		(b.isReady = !1),
			"function" == typeof define && define.amd
				? define("doc-ready/doc-ready", ["eventie/eventie"], e)
				: "object" == typeof exports
				? (module.exports = e(require("eventie")))
				: (a.docReady = e(a.eventie));
	})(window),
	(function (a) {
		"use strict";
		function b(a, b) {
			return a[g](b);
		}
		function c(a) {
			if (!a.parentNode) {
				var b = document.createDocumentFragment();
				b.appendChild(a);
			}
		}
		function d(a, b) {
			c(a);
			for (
				var d = a.parentNode.querySelectorAll(b), e = 0, f = d.length;
				f > e;
				e++
			)
				if (d[e] === a) return !0;
			return !1;
		}
		function e(a, d) {
			return c(a), b(a, d);
		}
		var f,
			g = (function () {
				if (a.matches) return "matches";
				if (a.matchesSelector) return "matchesSelector";
				for (
					var b = ["webkit", "moz", "ms", "o"], c = 0, d = b.length;
					d > c;
					c++
				) {
					var e = b[c],
						f = e + "MatchesSelector";
					if (a[f]) return f;
				}
			})();
		if (g) {
			var h = document.createElement("div"),
				i = b(h, "div");
			f = i ? b : e;
		} else f = d;
		"function" == typeof define && define.amd
			? define("matches-selector/matches-selector", [], function () {
					return f;
			  })
			: "object" == typeof exports
			? (module.exports = f)
			: (window.matchesSelector = f);
	})(Element.prototype),
	(function (a, b) {
		"use strict";
		"function" == typeof define && define.amd
			? define(
					"fizzy-ui-utils/utils",
					[
						"doc-ready/doc-ready",
						"matches-selector/matches-selector",
					],
					function (c, d) {
						return b(a, c, d);
					}
			  )
			: "object" == typeof exports
			? (module.exports = b(
					a,
					require("doc-ready"),
					require("desandro-matches-selector")
			  ))
			: (a.fizzyUIUtils = b(a, a.docReady, a.matchesSelector));
	})(window, function (a, b, c) {
		var d = {};
		(d.extend = function (a, b) {
			for (var c in b) a[c] = b[c];
			return a;
		}),
			(d.modulo = function (a, b) {
				return ((a % b) + b) % b;
			});
		var e = Object.prototype.toString;
		(d.isArray = function (a) {
			return "[object Array]" == e.call(a);
		}),
			(d.makeArray = function (a) {
				var b = [];
				if (d.isArray(a)) b = a;
				else if (a && "number" == typeof a.length)
					for (var c = 0, e = a.length; e > c; c++) b.push(a[c]);
				else b.push(a);
				return b;
			}),
			(d.indexOf = Array.prototype.indexOf
				? function (a, b) {
						return a.indexOf(b);
				  }
				: function (a, b) {
						for (var c = 0, d = a.length; d > c; c++)
							if (a[c] === b) return c;
						return -1;
				  }),
			(d.removeFrom = function (a, b) {
				var c = d.indexOf(a, b);
				-1 != c && a.splice(c, 1);
			}),
			(d.isElement =
				"function" == typeof HTMLElement ||
				"object" == typeof HTMLElement
					? function (a) {
							return a instanceof HTMLElement;
					  }
					: function (a) {
							return (
								a &&
								"object" == typeof a &&
								1 == a.nodeType &&
								"string" == typeof a.nodeName
							);
					  }),
			(d.setText = (function () {
				function a(a, c) {
					(b =
						b ||
						(void 0 !== document.documentElement.textContent
							? "textContent"
							: "innerText")),
						(a[b] = c);
				}
				var b;
				return a;
			})()),
			(d.getParent = function (a, b) {
				for (; a != document.body; )
					if (((a = a.parentNode), c(a, b))) return a;
			}),
			(d.getQueryElement = function (a) {
				return "string" == typeof a ? document.querySelector(a) : a;
			}),
			(d.handleEvent = function (a) {
				var b = "on" + a.type;
				this[b] && this[b](a);
			}),
			(d.filterFindElements = function (a, b) {
				a = d.makeArray(a);
				for (var e = [], f = 0, g = a.length; g > f; f++) {
					var h = a[f];
					if (d.isElement(h))
						if (b) {
							c(h, b) && e.push(h);
							for (
								var i = h.querySelectorAll(b),
									j = 0,
									k = i.length;
								k > j;
								j++
							)
								e.push(i[j]);
						} else e.push(h);
				}
				return e;
			}),
			(d.debounceMethod = function (a, b, c) {
				var d = a.prototype[b],
					e = b + "Timeout";
				a.prototype[b] = function () {
					var a = this[e];
					a && clearTimeout(a);
					var b = arguments,
						f = this;
					this[e] = setTimeout(function () {
						d.apply(f, b), delete f[e];
					}, c || 100);
				};
			}),
			(d.toDashed = function (a) {
				return a
					.replace(/(.)([A-Z])/g, function (a, b, c) {
						return b + "-" + c;
					})
					.toLowerCase();
			});
		var f = a.console;
		return (
			(d.htmlInit = function (c, e) {
				b(function () {
					for (
						var b = d.toDashed(e),
							g = document.querySelectorAll(".js-" + b),
							h = "data-" + b + "-options",
							i = 0,
							j = g.length;
						j > i;
						i++
					) {
						var k,
							l = g[i],
							m = l.getAttribute(h);
						try {
							k = m && JSON.parse(m);
						} catch (n) {
							f &&
								f.error(
									"Error parsing " +
										h +
										" on " +
										l.nodeName.toLowerCase() +
										(l.id ? "#" + l.id : "") +
										": " +
										n
								);
							continue;
						}
						var o = new c(l, k),
							p = a.jQuery;
						p && p.data(l, e, o);
					}
				});
			}),
			d
		);
	}),
	(function (a, b) {
		"use strict";
		"function" == typeof define && define.amd
			? define(
					"outlayer/item",
					[
						"eventEmitter/EventEmitter",
						"get-size/get-size",
						"get-style-property/get-style-property",
						"fizzy-ui-utils/utils",
					],
					function (c, d, e, f) {
						return b(a, c, d, e, f);
					}
			  )
			: "object" == typeof exports
			? (module.exports = b(
					a,
					require("wolfy87-eventemitter"),
					require("get-size"),
					require("desandro-get-style-property"),
					require("fizzy-ui-utils")
			  ))
			: ((a.Outlayer = {}),
			  (a.Outlayer.Item = b(
					a,
					a.EventEmitter,
					a.getSize,
					a.getStyleProperty,
					a.fizzyUIUtils
			  )));
	})(window, function (a, b, c, d, e) {
		"use strict";
		function f(a) {
			for (var b in a) return !1;
			return (b = null), !0;
		}
		function g(a, b) {
			a &&
				((this.element = a),
				(this.layout = b),
				(this.position = { x: 0, y: 0 }),
				this._create());
		}
		function h(a) {
			return a.replace(/([A-Z])/g, function (a) {
				return "-" + a.toLowerCase();
			});
		}
		var i = a.getComputedStyle,
			j = i
				? function (a) {
						return i(a, null);
				  }
				: function (a) {
						return a.currentStyle;
				  },
			k = d("transition"),
			l = d("transform"),
			m = k && l,
			n = !!d("perspective"),
			o = {
				WebkitTransition: "webkitTransitionEnd",
				MozTransition: "transitionend",
				OTransition: "otransitionend",
				transition: "transitionend",
			}[k],
			p = [
				"transform",
				"transition",
				"transitionDuration",
				"transitionProperty",
			],
			q = (function () {
				for (var a = {}, b = 0, c = p.length; c > b; b++) {
					var e = p[b],
						f = d(e);
					f && f !== e && (a[e] = f);
				}
				return a;
			})();
		e.extend(g.prototype, b.prototype),
			(g.prototype._create = function () {
				(this._transn = { ingProperties: {}, clean: {}, onEnd: {} }),
					this.css({ position: "absolute" });
			}),
			(g.prototype.handleEvent = function (a) {
				var b = "on" + a.type;
				this[b] && this[b](a);
			}),
			(g.prototype.getSize = function () {
				this.size = c(this.element);
			}),
			(g.prototype.css = function (a) {
				var b = this.element.style;
				for (var c in a) {
					var d = q[c] || c;
					b[d] = a[c];
				}
			}),
			(g.prototype.getPosition = function () {
				var a = j(this.element),
					b = this.layout.options,
					c = b.isOriginLeft,
					d = b.isOriginTop,
					e = a[c ? "left" : "right"],
					f = a[d ? "top" : "bottom"],
					g = this.layout.size,
					h =
						-1 != e.indexOf("%")
							? (parseFloat(e) / 100) * g.width
							: parseInt(e, 10),
					i =
						-1 != f.indexOf("%")
							? (parseFloat(f) / 100) * g.height
							: parseInt(f, 10);
				(h = isNaN(h) ? 0 : h),
					(i = isNaN(i) ? 0 : i),
					(h -= c ? g.paddingLeft : g.paddingRight),
					(i -= d ? g.paddingTop : g.paddingBottom),
					(this.position.x = h),
					(this.position.y = i);
			}),
			(g.prototype.layoutPosition = function () {
				var a = this.layout.size,
					b = this.layout.options,
					c = {},
					d = b.isOriginLeft ? "paddingLeft" : "paddingRight",
					e = b.isOriginLeft ? "left" : "right",
					f = b.isOriginLeft ? "right" : "left",
					g = this.position.x + a[d];
				(c[e] = this.getXValue(g)), (c[f] = "");
				var h = b.isOriginTop ? "paddingTop" : "paddingBottom",
					i = b.isOriginTop ? "top" : "bottom",
					j = b.isOriginTop ? "bottom" : "top",
					k = this.position.y + a[h];
				(c[i] = this.getYValue(k)),
					(c[j] = ""),
					this.css(c),
					this.emitEvent("layout", [this]);
			}),
			(g.prototype.getXValue = function (a) {
				var b = this.layout.options;
				return b.percentPosition && !b.isHorizontal
					? (a / this.layout.size.width) * 100 + "%"
					: a + "px";
			}),
			(g.prototype.getYValue = function (a) {
				var b = this.layout.options;
				return b.percentPosition && b.isHorizontal
					? (a / this.layout.size.height) * 100 + "%"
					: a + "px";
			}),
			(g.prototype._transitionTo = function (a, b) {
				this.getPosition();
				var c = this.position.x,
					d = this.position.y,
					e = parseInt(a, 10),
					f = parseInt(b, 10),
					g = e === this.position.x && f === this.position.y;
				if ((this.setPosition(a, b), g && !this.isTransitioning))
					return void this.layoutPosition();
				var h = a - c,
					i = b - d,
					j = {};
				(j.transform = this.getTranslate(h, i)),
					this.transition({
						to: j,
						onTransitionEnd: { transform: this.layoutPosition },
						isCleaning: !0,
					});
			}),
			(g.prototype.getTranslate = function (a, b) {
				var c = this.layout.options;
				return (
					(a = c.isOriginLeft ? a : -a),
					(b = c.isOriginTop ? b : -b),
					n
						? "translate3d(" + a + "px, " + b + "px, 0)"
						: "translate(" + a + "px, " + b + "px)"
				);
			}),
			(g.prototype.goTo = function (a, b) {
				this.setPosition(a, b), this.layoutPosition();
			}),
			(g.prototype.moveTo = m
				? g.prototype._transitionTo
				: g.prototype.goTo),
			(g.prototype.setPosition = function (a, b) {
				(this.position.x = parseInt(a, 10)),
					(this.position.y = parseInt(b, 10));
			}),
			(g.prototype._nonTransition = function (a) {
				this.css(a.to), a.isCleaning && this._removeStyles(a.to);
				for (var b in a.onTransitionEnd)
					a.onTransitionEnd[b].call(this);
			}),
			(g.prototype._transition = function (a) {
				if (!parseFloat(this.layout.options.transitionDuration))
					return void this._nonTransition(a);
				var b = this._transn;
				for (var c in a.onTransitionEnd)
					b.onEnd[c] = a.onTransitionEnd[c];
				for (c in a.to)
					(b.ingProperties[c] = !0),
						a.isCleaning && (b.clean[c] = !0);
				if (a.from) {
					this.css(a.from);
					var d = this.element.offsetHeight;
					d = null;
				}
				this.enableTransition(a.to),
					this.css(a.to),
					(this.isTransitioning = !0);
			});
		var r = "opacity," + h(q.transform || "transform");
		(g.prototype.enableTransition = function () {
			this.isTransitioning ||
				(this.css({
					transitionProperty: r,
					transitionDuration: this.layout.options.transitionDuration,
				}),
				this.element.addEventListener(o, this, !1));
		}),
			(g.prototype.transition =
				g.prototype[k ? "_transition" : "_nonTransition"]),
			(g.prototype.onwebkitTransitionEnd = function (a) {
				this.ontransitionend(a);
			}),
			(g.prototype.onotransitionend = function (a) {
				this.ontransitionend(a);
			});
		var s = {
			"-webkit-transform": "transform",
			"-moz-transform": "transform",
			"-o-transform": "transform",
		};
		(g.prototype.ontransitionend = function (a) {
			if (a.target === this.element) {
				var b = this._transn,
					c = s[a.propertyName] || a.propertyName;
				if (
					(delete b.ingProperties[c],
					f(b.ingProperties) && this.disableTransition(),
					c in b.clean &&
						((this.element.style[a.propertyName] = ""),
						delete b.clean[c]),
					c in b.onEnd)
				) {
					var d = b.onEnd[c];
					d.call(this), delete b.onEnd[c];
				}
				this.emitEvent("transitionEnd", [this]);
			}
		}),
			(g.prototype.disableTransition = function () {
				this.removeTransitionStyles(),
					this.element.removeEventListener(o, this, !1),
					(this.isTransitioning = !1);
			}),
			(g.prototype._removeStyles = function (a) {
				var b = {};
				for (var c in a) b[c] = "";
				this.css(b);
			});
		var t = { transitionProperty: "", transitionDuration: "" };
		return (
			(g.prototype.removeTransitionStyles = function () {
				this.css(t);
			}),
			(g.prototype.removeElem = function () {
				this.element.parentNode.removeChild(this.element),
					this.css({ display: "" }),
					this.emitEvent("remove", [this]);
			}),
			(g.prototype.remove = function () {
				if (!k || !parseFloat(this.layout.options.transitionDuration))
					return void this.removeElem();
				var a = this;
				this.once("transitionEnd", function () {
					a.removeElem();
				}),
					this.hide();
			}),
			(g.prototype.reveal = function () {
				delete this.isHidden, this.css({ display: "" });
				var a = this.layout.options,
					b = {},
					c = this.getHideRevealTransitionEndProperty("visibleStyle");
				(b[c] = this.onRevealTransitionEnd),
					this.transition({
						from: a.hiddenStyle,
						to: a.visibleStyle,
						isCleaning: !0,
						onTransitionEnd: b,
					});
			}),
			(g.prototype.onRevealTransitionEnd = function () {
				this.isHidden || this.emitEvent("reveal");
			}),
			(g.prototype.getHideRevealTransitionEndProperty = function (a) {
				var b = this.layout.options[a];
				if (b.opacity) return "opacity";
				for (var c in b) return c;
			}),
			(g.prototype.hide = function () {
				(this.isHidden = !0), this.css({ display: "" });
				var a = this.layout.options,
					b = {},
					c = this.getHideRevealTransitionEndProperty("hiddenStyle");
				(b[c] = this.onHideTransitionEnd),
					this.transition({
						from: a.visibleStyle,
						to: a.hiddenStyle,
						isCleaning: !0,
						onTransitionEnd: b,
					});
			}),
			(g.prototype.onHideTransitionEnd = function () {
				this.isHidden &&
					(this.css({ display: "none" }), this.emitEvent("hide"));
			}),
			(g.prototype.destroy = function () {
				this.css({
					position: "",
					left: "",
					right: "",
					top: "",
					bottom: "",
					transition: "",
					transform: "",
				});
			}),
			g
		);
	}),
	(function (a, b) {
		"use strict";
		"function" == typeof define && define.amd
			? define(
					"outlayer/outlayer",
					[
						"eventie/eventie",
						"eventEmitter/EventEmitter",
						"get-size/get-size",
						"fizzy-ui-utils/utils",
						"./item",
					],
					function (c, d, e, f, g) {
						return b(a, c, d, e, f, g);
					}
			  )
			: "object" == typeof exports
			? (module.exports = b(
					a,
					require("eventie"),
					require("wolfy87-eventemitter"),
					require("get-size"),
					require("fizzy-ui-utils"),
					require("./item")
			  ))
			: (a.Outlayer = b(
					a,
					a.eventie,
					a.EventEmitter,
					a.getSize,
					a.fizzyUIUtils,
					a.Outlayer.Item
			  ));
	})(window, function (a, b, c, d, e, f) {
		"use strict";
		function g(a, b) {
			var c = e.getQueryElement(a);
			if (!c)
				return void (
					h &&
					h.error(
						"Bad element for " +
							this.constructor.namespace +
							": " +
							(c || a)
					)
				);
			(this.element = c),
				i && (this.$element = i(this.element)),
				(this.options = e.extend({}, this.constructor.defaults)),
				this.option(b);
			var d = ++k;
			(this.element.outlayerGUID = d),
				(l[d] = this),
				this._create(),
				this.options.isInitLayout && this.layout();
		}
		var h = a.console,
			i = a.jQuery,
			j = function () {},
			k = 0,
			l = {};
		return (
			(g.namespace = "outlayer"),
			(g.Item = f),
			(g.defaults = {
				containerStyle: { position: "relative" },
				isInitLayout: !0,
				isOriginLeft: !0,
				isOriginTop: !0,
				isResizeBound: !0,
				isResizingContainer: !0,
				transitionDuration: "0.4s",
				hiddenStyle: { opacity: 0, transform: "scale(0.001)" },
				visibleStyle: { opacity: 1, transform: "scale(1)" },
			}),
			e.extend(g.prototype, c.prototype),
			(g.prototype.option = function (a) {
				e.extend(this.options, a);
			}),
			(g.prototype._create = function () {
				this.reloadItems(),
					(this.stamps = []),
					this.stamp(this.options.stamp),
					e.extend(this.element.style, this.options.containerStyle),
					this.options.isResizeBound && this.bindResize();
			}),
			(g.prototype.reloadItems = function () {
				this.items = this._itemize(this.element.children);
			}),
			(g.prototype._itemize = function (a) {
				for (
					var b = this._filterFindItemElements(a),
						c = this.constructor.Item,
						d = [],
						e = 0,
						f = b.length;
					f > e;
					e++
				) {
					var g = b[e],
						h = new c(g, this);
					d.push(h);
				}
				return d;
			}),
			(g.prototype._filterFindItemElements = function (a) {
				return e.filterFindElements(a, this.options.itemSelector);
			}),
			(g.prototype.getItemElements = function () {
				for (var a = [], b = 0, c = this.items.length; c > b; b++)
					a.push(this.items[b].element);
				return a;
			}),
			(g.prototype.layout = function () {
				this._resetLayout(), this._manageStamps();
				var a =
					void 0 !== this.options.isLayoutInstant
						? this.options.isLayoutInstant
						: !this._isLayoutInited;
				this.layoutItems(this.items, a), (this._isLayoutInited = !0);
			}),
			(g.prototype._init = g.prototype.layout),
			(g.prototype._resetLayout = function () {
				this.getSize();
			}),
			(g.prototype.getSize = function () {
				this.size = d(this.element);
			}),
			(g.prototype._getMeasurement = function (a, b) {
				var c,
					f = this.options[a];
				f
					? ("string" == typeof f
							? (c = this.element.querySelector(f))
							: e.isElement(f) && (c = f),
					  (this[a] = c ? d(c)[b] : f))
					: (this[a] = 0);
			}),
			(g.prototype.layoutItems = function (a, b) {
				(a = this._getItemsForLayout(a)),
					this._layoutItems(a, b),
					this._postLayout();
			}),
			(g.prototype._getItemsForLayout = function (a) {
				for (var b = [], c = 0, d = a.length; d > c; c++) {
					var e = a[c];
					e.isIgnored || b.push(e);
				}
				return b;
			}),
			(g.prototype._layoutItems = function (a, b) {
				if ((this._emitCompleteOnItems("layout", a), a && a.length)) {
					for (var c = [], d = 0, e = a.length; e > d; d++) {
						var f = a[d],
							g = this._getItemLayoutPosition(f);
						(g.item = f),
							(g.isInstant = b || f.isLayoutInstant),
							c.push(g);
					}
					this._processLayoutQueue(c);
				}
			}),
			(g.prototype._getItemLayoutPosition = function () {
				return { x: 0, y: 0 };
			}),
			(g.prototype._processLayoutQueue = function (a) {
				for (var b = 0, c = a.length; c > b; b++) {
					var d = a[b];
					this._positionItem(d.item, d.x, d.y, d.isInstant);
				}
			}),
			(g.prototype._positionItem = function (a, b, c, d) {
				d ? a.goTo(b, c) : a.moveTo(b, c);
			}),
			(g.prototype._postLayout = function () {
				this.resizeContainer();
			}),
			(g.prototype.resizeContainer = function () {
				if (this.options.isResizingContainer) {
					var a = this._getContainerSize();
					a &&
						(this._setContainerMeasure(a.width, !0),
						this._setContainerMeasure(a.height, !1));
				}
			}),
			(g.prototype._getContainerSize = j),
			(g.prototype._setContainerMeasure = function (a, b) {
				if (void 0 !== a) {
					var c = this.size;
					c.isBorderBox &&
						(a += b
							? c.paddingLeft +
							  c.paddingRight +
							  c.borderLeftWidth +
							  c.borderRightWidth
							: c.paddingBottom +
							  c.paddingTop +
							  c.borderTopWidth +
							  c.borderBottomWidth),
						(a = Math.max(a, 0)),
						(this.element.style[b ? "width" : "height"] = a + "px");
				}
			}),
			(g.prototype._emitCompleteOnItems = function (a, b) {
				function c() {
					e.dispatchEvent(a + "Complete", null, [b]);
				}
				function d() {
					g++, g === f && c();
				}
				var e = this,
					f = b.length;
				if (!b || !f) return void c();
				for (var g = 0, h = 0, i = b.length; i > h; h++) {
					var j = b[h];
					j.once(a, d);
				}
			}),
			(g.prototype.dispatchEvent = function (a, b, c) {
				var d = b ? [b].concat(c) : c;
				if ((this.emitEvent(a, d), i))
					if (
						((this.$element = this.$element || i(this.element)), b)
					) {
						var e = i.Event(b);
						(e.type = a), this.$element.trigger(e, c);
					} else this.$element.trigger(a, c);
			}),
			(g.prototype.ignore = function (a) {
				var b = this.getItem(a);
				b && (b.isIgnored = !0);
			}),
			(g.prototype.unignore = function (a) {
				var b = this.getItem(a);
				b && delete b.isIgnored;
			}),
			(g.prototype.stamp = function (a) {
				if ((a = this._find(a))) {
					this.stamps = this.stamps.concat(a);
					for (var b = 0, c = a.length; c > b; b++) {
						var d = a[b];
						this.ignore(d);
					}
				}
			}),
			(g.prototype.unstamp = function (a) {
				if ((a = this._find(a)))
					for (var b = 0, c = a.length; c > b; b++) {
						var d = a[b];
						e.removeFrom(this.stamps, d), this.unignore(d);
					}
			}),
			(g.prototype._find = function (a) {
				return a
					? ("string" == typeof a &&
							(a = this.element.querySelectorAll(a)),
					  (a = e.makeArray(a)))
					: void 0;
			}),
			(g.prototype._manageStamps = function () {
				if (this.stamps && this.stamps.length) {
					this._getBoundingRect();
					for (var a = 0, b = this.stamps.length; b > a; a++) {
						var c = this.stamps[a];
						this._manageStamp(c);
					}
				}
			}),
			(g.prototype._getBoundingRect = function () {
				var a = this.element.getBoundingClientRect(),
					b = this.size;
				this._boundingRect = {
					left: a.left + b.paddingLeft + b.borderLeftWidth,
					top: a.top + b.paddingTop + b.borderTopWidth,
					right: a.right - (b.paddingRight + b.borderRightWidth),
					bottom: a.bottom - (b.paddingBottom + b.borderBottomWidth),
				};
			}),
			(g.prototype._manageStamp = j),
			(g.prototype._getElementOffset = function (a) {
				var b = a.getBoundingClientRect(),
					c = this._boundingRect,
					e = d(a),
					f = {
						left: b.left - c.left - e.marginLeft,
						top: b.top - c.top - e.marginTop,
						right: c.right - b.right - e.marginRight,
						bottom: c.bottom - b.bottom - e.marginBottom,
					};
				return f;
			}),
			(g.prototype.handleEvent = function (a) {
				var b = "on" + a.type;
				this[b] && this[b](a);
			}),
			(g.prototype.bindResize = function () {
				this.isResizeBound ||
					(b.bind(a, "resize", this), (this.isResizeBound = !0));
			}),
			(g.prototype.unbindResize = function () {
				this.isResizeBound && b.unbind(a, "resize", this),
					(this.isResizeBound = !1);
			}),
			(g.prototype.onresize = function () {
				function a() {
					b.resize(), delete b.resizeTimeout;
				}
				this.resizeTimeout && clearTimeout(this.resizeTimeout);
				var b = this;
				this.resizeTimeout = setTimeout(a, 100);
			}),
			(g.prototype.resize = function () {
				this.isResizeBound && this.needsResizeLayout() && this.layout();
			}),
			(g.prototype.needsResizeLayout = function () {
				var a = d(this.element),
					b = this.size && a;
				return b && a.innerWidth !== this.size.innerWidth;
			}),
			(g.prototype.addItems = function (a) {
				var b = this._itemize(a);
				return b.length && (this.items = this.items.concat(b)), b;
			}),
			(g.prototype.appended = function (a) {
				var b = this.addItems(a);
				b.length && (this.layoutItems(b, !0), this.reveal(b));
			}),
			(g.prototype.prepended = function (a) {
				var b = this._itemize(a);
				if (b.length) {
					var c = this.items.slice(0);
					(this.items = b.concat(c)),
						this._resetLayout(),
						this._manageStamps(),
						this.layoutItems(b, !0),
						this.reveal(b),
						this.layoutItems(c);
				}
			}),
			(g.prototype.reveal = function (a) {
				this._emitCompleteOnItems("reveal", a);
				for (var b = a && a.length, c = 0; b && b > c; c++) {
					var d = a[c];
					d.reveal();
				}
			}),
			(g.prototype.hide = function (a) {
				this._emitCompleteOnItems("hide", a);
				for (var b = a && a.length, c = 0; b && b > c; c++) {
					var d = a[c];
					d.hide();
				}
			}),
			(g.prototype.revealItemElements = function (a) {
				var b = this.getItems(a);
				this.reveal(b);
			}),
			(g.prototype.hideItemElements = function (a) {
				var b = this.getItems(a);
				this.hide(b);
			}),
			(g.prototype.getItem = function (a) {
				for (var b = 0, c = this.items.length; c > b; b++) {
					var d = this.items[b];
					if (d.element === a) return d;
				}
			}),
			(g.prototype.getItems = function (a) {
				a = e.makeArray(a);
				for (var b = [], c = 0, d = a.length; d > c; c++) {
					var f = a[c],
						g = this.getItem(f);
					g && b.push(g);
				}
				return b;
			}),
			(g.prototype.remove = function (a) {
				var b = this.getItems(a);
				if ((this._emitCompleteOnItems("remove", b), b && b.length))
					for (var c = 0, d = b.length; d > c; c++) {
						var f = b[c];
						f.remove(), e.removeFrom(this.items, f);
					}
			}),
			(g.prototype.destroy = function () {
				var a = this.element.style;
				(a.height = ""), (a.position = ""), (a.width = "");
				for (var b = 0, c = this.items.length; c > b; b++) {
					var d = this.items[b];
					d.destroy();
				}
				this.unbindResize();
				var e = this.element.outlayerGUID;
				delete l[e],
					delete this.element.outlayerGUID,
					i && i.removeData(this.element, this.constructor.namespace);
			}),
			(g.data = function (a) {
				a = e.getQueryElement(a);
				var b = a && a.outlayerGUID;
				return b && l[b];
			}),
			(g.create = function (a, b) {
				function c() {
					g.apply(this, arguments);
				}
				return (
					Object.create
						? (c.prototype = Object.create(g.prototype))
						: e.extend(c.prototype, g.prototype),
					(c.prototype.constructor = c),
					(c.defaults = e.extend({}, g.defaults)),
					e.extend(c.defaults, b),
					(c.prototype.settings = {}),
					(c.namespace = a),
					(c.data = g.data),
					(c.Item = function () {
						f.apply(this, arguments);
					}),
					(c.Item.prototype = new f()),
					e.htmlInit(c, a),
					i && i.bridget && i.bridget(a, c),
					c
				);
			}),
			(g.Item = f),
			g
		);
	}),
	(function (a, b) {
		"use strict";
		"function" == typeof define && define.amd
			? define("isotope/js/item", ["outlayer/outlayer"], b)
			: "object" == typeof exports
			? (module.exports = b(require("outlayer")))
			: ((a.Isotope = a.Isotope || {}), (a.Isotope.Item = b(a.Outlayer)));
	})(window, function (a) {
		"use strict";
		function b() {
			a.Item.apply(this, arguments);
		}
		(b.prototype = new a.Item()),
			(b.prototype._create = function () {
				(this.id = this.layout.itemGUID++),
					a.Item.prototype._create.call(this),
					(this.sortData = {});
			}),
			(b.prototype.updateSortData = function () {
				if (!this.isIgnored) {
					(this.sortData.id = this.id),
						(this.sortData["original-order"] = this.id),
						(this.sortData.random = Math.random());
					var a = this.layout.options.getSortData,
						b = this.layout._sorters;
					for (var c in a) {
						var d = b[c];
						this.sortData[c] = d(this.element, this);
					}
				}
			});
		var c = b.prototype.destroy;
		return (
			(b.prototype.destroy = function () {
				c.apply(this, arguments), this.css({ display: "" });
			}),
			b
		);
	}),
	(function (a, b) {
		"use strict";
		"function" == typeof define && define.amd
			? define(
					"isotope/js/layout-mode",
					["get-size/get-size", "outlayer/outlayer"],
					b
			  )
			: "object" == typeof exports
			? (module.exports = b(require("get-size"), require("outlayer")))
			: ((a.Isotope = a.Isotope || {}),
			  (a.Isotope.LayoutMode = b(a.getSize, a.Outlayer)));
	})(window, function (a, b) {
		"use strict";
		function c(a) {
			(this.isotope = a),
				a &&
					((this.options = a.options[this.namespace]),
					(this.element = a.element),
					(this.items = a.filteredItems),
					(this.size = a.size));
		}
		return (
			(function () {
				function a(a) {
					return function () {
						return b.prototype[a].apply(this.isotope, arguments);
					};
				}
				for (
					var d = [
							"_resetLayout",
							"_getItemLayoutPosition",
							"_manageStamp",
							"_getContainerSize",
							"_getElementOffset",
							"needsResizeLayout",
						],
						e = 0,
						f = d.length;
					f > e;
					e++
				) {
					var g = d[e];
					c.prototype[g] = a(g);
				}
			})(),
			(c.prototype.needsVerticalResizeLayout = function () {
				var b = a(this.isotope.element),
					c = this.isotope.size && b;
				return c && b.innerHeight != this.isotope.size.innerHeight;
			}),
			(c.prototype._getMeasurement = function () {
				this.isotope._getMeasurement.apply(this, arguments);
			}),
			(c.prototype.getColumnWidth = function () {
				this.getSegmentSize("column", "Width");
			}),
			(c.prototype.getRowHeight = function () {
				this.getSegmentSize("row", "Height");
			}),
			(c.prototype.getSegmentSize = function (a, b) {
				var c = a + b,
					d = "outer" + b;
				if ((this._getMeasurement(c, d), !this[c])) {
					var e = this.getFirstItemSize();
					this[c] = (e && e[d]) || this.isotope.size["inner" + b];
				}
			}),
			(c.prototype.getFirstItemSize = function () {
				var b = this.isotope.filteredItems[0];
				return b && b.element && a(b.element);
			}),
			(c.prototype.layout = function () {
				this.isotope.layout.apply(this.isotope, arguments);
			}),
			(c.prototype.getSize = function () {
				this.isotope.getSize(), (this.size = this.isotope.size);
			}),
			(c.modes = {}),
			(c.create = function (a, b) {
				function d() {
					c.apply(this, arguments);
				}
				return (
					(d.prototype = new c()),
					b && (d.options = b),
					(d.prototype.namespace = a),
					(c.modes[a] = d),
					d
				);
			}),
			c
		);
	}),
	(function (a, b) {
		"use strict";
		"function" == typeof define && define.amd
			? define(
					"masonry/masonry",
					[
						"outlayer/outlayer",
						"get-size/get-size",
						"fizzy-ui-utils/utils",
					],
					b
			  )
			: "object" == typeof exports
			? (module.exports = b(
					require("outlayer"),
					require("get-size"),
					require("fizzy-ui-utils")
			  ))
			: (a.Masonry = b(a.Outlayer, a.getSize, a.fizzyUIUtils));
	})(window, function (a, b, c) {
		var d = a.create("masonry");
		return (
			(d.prototype._resetLayout = function () {
				this.getSize(),
					this._getMeasurement("columnWidth", "outerWidth"),
					this._getMeasurement("gutter", "outerWidth"),
					this.measureColumns();
				var a = this.cols;
				for (this.colYs = []; a--; ) this.colYs.push(0);
				this.maxY = 0;
			}),
			(d.prototype.measureColumns = function () {
				if ((this.getContainerWidth(), !this.columnWidth)) {
					var a = this.items[0],
						c = a && a.element;
					this.columnWidth =
						(c && b(c).outerWidth) || this.containerWidth;
				}
				var d = (this.columnWidth += this.gutter),
					e = this.containerWidth + this.gutter,
					f = e / d,
					g = d - (e % d),
					h = g && 1 > g ? "round" : "floor";
				(f = Math[h](f)), (this.cols = Math.max(f, 1));
			}),
			(d.prototype.getContainerWidth = function () {
				var a = this.options.isFitWidth
						? this.element.parentNode
						: this.element,
					c = b(a);
				this.containerWidth = c && c.innerWidth;
			}),
			(d.prototype._getItemLayoutPosition = function (a) {
				a.getSize();
				var b = a.size.outerWidth % this.columnWidth,
					d = b && 1 > b ? "round" : "ceil",
					e = Math[d](a.size.outerWidth / this.columnWidth);
				e = Math.min(e, this.cols);
				for (
					var f = this._getColGroup(e),
						g = Math.min.apply(Math, f),
						h = c.indexOf(f, g),
						i = { x: this.columnWidth * h, y: g },
						j = g + a.size.outerHeight,
						k = this.cols + 1 - f.length,
						l = 0;
					k > l;
					l++
				)
					this.colYs[h + l] = j;
				return i;
			}),
			(d.prototype._getColGroup = function (a) {
				if (2 > a) return this.colYs;
				for (var b = [], c = this.cols + 1 - a, d = 0; c > d; d++) {
					var e = this.colYs.slice(d, d + a);
					b[d] = Math.max.apply(Math, e);
				}
				return b;
			}),
			(d.prototype._manageStamp = function (a) {
				var c = b(a),
					d = this._getElementOffset(a),
					e = this.options.isOriginLeft ? d.left : d.right,
					f = e + c.outerWidth,
					g = Math.floor(e / this.columnWidth);
				g = Math.max(0, g);
				var h = Math.floor(f / this.columnWidth);
				(h -= f % this.columnWidth ? 0 : 1),
					(h = Math.min(this.cols - 1, h));
				for (
					var i =
							(this.options.isOriginTop ? d.top : d.bottom) +
							c.outerHeight,
						j = g;
					h >= j;
					j++
				)
					this.colYs[j] = Math.max(i, this.colYs[j]);
			}),
			(d.prototype._getContainerSize = function () {
				this.maxY = Math.max.apply(Math, this.colYs);
				var a = { height: this.maxY };
				return (
					this.options.isFitWidth &&
						(a.width = this._getContainerFitWidth()),
					a
				);
			}),
			(d.prototype._getContainerFitWidth = function () {
				for (var a = 0, b = this.cols; --b && 0 === this.colYs[b]; )
					a++;
				return (this.cols - a) * this.columnWidth - this.gutter;
			}),
			(d.prototype.needsResizeLayout = function () {
				var a = this.containerWidth;
				return this.getContainerWidth(), a !== this.containerWidth;
			}),
			d
		);
	}),
	(function (a, b) {
		"use strict";
		"function" == typeof define && define.amd
			? define(
					"isotope/js/layout-modes/masonry",
					["../layout-mode", "masonry/masonry"],
					b
			  )
			: "object" == typeof exports
			? (module.exports = b(
					require("../layout-mode"),
					require("masonry-layout")
			  ))
			: b(a.Isotope.LayoutMode, a.Masonry);
	})(window, function (a, b) {
		"use strict";
		function c(a, b) {
			for (var c in b) a[c] = b[c];
			return a;
		}
		var d = a.create("masonry"),
			e = d.prototype._getElementOffset,
			f = d.prototype.layout,
			g = d.prototype._getMeasurement;
		c(d.prototype, b.prototype),
			(d.prototype._getElementOffset = e),
			(d.prototype.layout = f),
			(d.prototype._getMeasurement = g);
		var h = d.prototype.measureColumns;
		d.prototype.measureColumns = function () {
			(this.items = this.isotope.filteredItems), h.call(this);
		};
		var i = d.prototype._manageStamp;
		return (
			(d.prototype._manageStamp = function () {
				(this.options.isOriginLeft = this.isotope.options.isOriginLeft),
					(this.options.isOriginTop =
						this.isotope.options.isOriginTop),
					i.apply(this, arguments);
			}),
			d
		);
	}),
	(function (a, b) {
		"use strict";
		"function" == typeof define && define.amd
			? define("isotope/js/layout-modes/fit-rows", ["../layout-mode"], b)
			: "object" == typeof exports
			? (module.exports = b(require("../layout-mode")))
			: b(a.Isotope.LayoutMode);
	})(window, function (a) {
		"use strict";
		var b = a.create("fitRows");
		return (
			(b.prototype._resetLayout = function () {
				(this.x = 0),
					(this.y = 0),
					(this.maxY = 0),
					this._getMeasurement("gutter", "outerWidth");
			}),
			(b.prototype._getItemLayoutPosition = function (a) {
				a.getSize();
				var b = a.size.outerWidth + this.gutter,
					c = this.isotope.size.innerWidth + this.gutter;
				0 !== this.x &&
					b + this.x > c &&
					((this.x = 0), (this.y = this.maxY));
				var d = { x: this.x, y: this.y };
				return (
					(this.maxY = Math.max(
						this.maxY,
						this.y + a.size.outerHeight
					)),
					(this.x += b),
					d
				);
			}),
			(b.prototype._getContainerSize = function () {
				return { height: this.maxY };
			}),
			b
		);
	}),
	(function (a, b) {
		"use strict";
		"function" == typeof define && define.amd
			? define("isotope/js/layout-modes/vertical", ["../layout-mode"], b)
			: "object" == typeof exports
			? (module.exports = b(require("../layout-mode")))
			: b(a.Isotope.LayoutMode);
	})(window, function (a) {
		"use strict";
		var b = a.create("vertical", { horizontalAlignment: 0 });
		return (
			(b.prototype._resetLayout = function () {
				this.y = 0;
			}),
			(b.prototype._getItemLayoutPosition = function (a) {
				a.getSize();
				var b =
						(this.isotope.size.innerWidth - a.size.outerWidth) *
						this.options.horizontalAlignment,
					c = this.y;
				return (this.y += a.size.outerHeight), { x: b, y: c };
			}),
			(b.prototype._getContainerSize = function () {
				return { height: this.y };
			}),
			b
		);
	}),
	(function (a, b) {
		"use strict";
		"function" == typeof define && define.amd
			? define(
					[
						"outlayer/outlayer",
						"get-size/get-size",
						"matches-selector/matches-selector",
						"fizzy-ui-utils/utils",
						"isotope/js/item",
						"isotope/js/layout-mode",
						"isotope/js/layout-modes/masonry",
						"isotope/js/layout-modes/fit-rows",
						"isotope/js/layout-modes/vertical",
					],
					function (c, d, e, f, g, h) {
						return b(a, c, d, e, f, g, h);
					}
			  )
			: "object" == typeof exports
			? (module.exports = b(
					a,
					require("outlayer"),
					require("get-size"),
					require("desandro-matches-selector"),
					require("fizzy-ui-utils"),
					require("./item"),
					require("./layout-mode"),
					require("./layout-modes/masonry"),
					require("./layout-modes/fit-rows"),
					require("./layout-modes/vertical")
			  ))
			: (a.Isotope = b(
					a,
					a.Outlayer,
					a.getSize,
					a.matchesSelector,
					a.fizzyUIUtils,
					a.Isotope.Item,
					a.Isotope.LayoutMode
			  ));
	})(window, function (a, b, c, d, e, f, g) {
		function h(a, b) {
			return function (c, d) {
				for (var e = 0, f = a.length; f > e; e++) {
					var g = a[e],
						h = c.sortData[g],
						i = d.sortData[g];
					if (h > i || i > h) {
						var j = void 0 !== b[g] ? b[g] : b,
							k = j ? 1 : -1;
						return (h > i ? 1 : -1) * k;
					}
				}
				return 0;
			};
		}
		var i = a.jQuery,
			j = String.prototype.trim
				? function (a) {
						return a.trim();
				  }
				: function (a) {
						return a.replace(/^\s+|\s+$/g, "");
				  },
			k = document.documentElement,
			l = k.textContent
				? function (a) {
						return a.textContent;
				  }
				: function (a) {
						return a.innerText;
				  },
			m = b.create("isotope", {
				layoutMode: "masonry",
				isJQueryFiltering: !0,
				sortAscending: !0,
			});
		(m.Item = f),
			(m.LayoutMode = g),
			(m.prototype._create = function () {
				(this.itemGUID = 0),
					(this._sorters = {}),
					this._getSorters(),
					b.prototype._create.call(this),
					(this.modes = {}),
					(this.filteredItems = this.items),
					(this.sortHistory = ["original-order"]);
				for (var a in g.modes) this._initLayoutMode(a);
			}),
			(m.prototype.reloadItems = function () {
				(this.itemGUID = 0), b.prototype.reloadItems.call(this);
			}),
			(m.prototype._itemize = function () {
				for (
					var a = b.prototype._itemize.apply(this, arguments),
						c = 0,
						d = a.length;
					d > c;
					c++
				) {
					var e = a[c];
					e.id = this.itemGUID++;
				}
				return this._updateItemsSortData(a), a;
			}),
			(m.prototype._initLayoutMode = function (a) {
				var b = g.modes[a],
					c = this.options[a] || {};
				(this.options[a] = b.options ? e.extend(b.options, c) : c),
					(this.modes[a] = new b(this));
			}),
			(m.prototype.layout = function () {
				return !this._isLayoutInited && this.options.isInitLayout
					? void this.arrange()
					: void this._layout();
			}),
			(m.prototype._layout = function () {
				var a = this._getIsInstant();
				this._resetLayout(),
					this._manageStamps(),
					this.layoutItems(this.filteredItems, a),
					(this._isLayoutInited = !0);
			}),
			(m.prototype.arrange = function (a) {
				function b() {
					d.reveal(c.needReveal), d.hide(c.needHide);
				}
				this.option(a), this._getIsInstant();
				var c = this._filter(this.items);
				this.filteredItems = c.matches;
				var d = this;
				this._bindArrangeComplete(),
					this._isInstant ? this._noTransition(b) : b(),
					this._sort(),
					this._layout();
			}),
			(m.prototype._init = m.prototype.arrange),
			(m.prototype._getIsInstant = function () {
				var a =
					void 0 !== this.options.isLayoutInstant
						? this.options.isLayoutInstant
						: !this._isLayoutInited;
				return (this._isInstant = a), a;
			}),
			(m.prototype._bindArrangeComplete = function () {
				function a() {
					b &&
						c &&
						d &&
						e.dispatchEvent("arrangeComplete", null, [
							e.filteredItems,
						]);
				}
				var b,
					c,
					d,
					e = this;
				this.once("layoutComplete", function () {
					(b = !0), a();
				}),
					this.once("hideComplete", function () {
						(c = !0), a();
					}),
					this.once("revealComplete", function () {
						(d = !0), a();
					});
			}),
			(m.prototype._filter = function (a) {
				var b = this.options.filter;
				b = b || "*";
				for (
					var c = [],
						d = [],
						e = [],
						f = this._getFilterTest(b),
						g = 0,
						h = a.length;
					h > g;
					g++
				) {
					var i = a[g];
					if (!i.isIgnored) {
						var j = f(i);
						j && c.push(i),
							j && i.isHidden
								? d.push(i)
								: j || i.isHidden || e.push(i);
					}
				}
				return { matches: c, needReveal: d, needHide: e };
			}),
			(m.prototype._getFilterTest = function (a) {
				return i && this.options.isJQueryFiltering
					? function (b) {
							return i(b.element).is(a);
					  }
					: "function" == typeof a
					? function (b) {
							return a(b.element);
					  }
					: function (b) {
							return d(b.element, a);
					  };
			}),
			(m.prototype.updateSortData = function (a) {
				var b;
				a
					? ((a = e.makeArray(a)), (b = this.getItems(a)))
					: (b = this.items),
					this._getSorters(),
					this._updateItemsSortData(b);
			}),
			(m.prototype._getSorters = function () {
				var a = this.options.getSortData;
				for (var b in a) {
					var c = a[b];
					this._sorters[b] = n(c);
				}
			}),
			(m.prototype._updateItemsSortData = function (a) {
				for (var b = a && a.length, c = 0; b && b > c; c++) {
					var d = a[c];
					d.updateSortData();
				}
			});
		var n = (function () {
			function a(a) {
				if ("string" != typeof a) return a;
				var c = j(a).split(" "),
					d = c[0],
					e = d.match(/^\[(.+)\]$/),
					f = e && e[1],
					g = b(f, d),
					h = m.sortDataParsers[c[1]];
				return (a = h
					? function (a) {
							return a && h(g(a));
					  }
					: function (a) {
							return a && g(a);
					  });
			}
			function b(a, b) {
				var c;
				return (c = a
					? function (b) {
							return b.getAttribute(a);
					  }
					: function (a) {
							var c = a.querySelector(b);
							return c && l(c);
					  });
			}
			return a;
		})();
		(m.sortDataParsers = {
			parseInt: function (a) {
				return parseInt(a, 10);
			},
			parseFloat: function (a) {
				return parseFloat(a);
			},
		}),
			(m.prototype._sort = function () {
				var a = this.options.sortBy;
				if (a) {
					var b = [].concat.apply(a, this.sortHistory),
						c = h(b, this.options.sortAscending);
					this.filteredItems.sort(c),
						a != this.sortHistory[0] && this.sortHistory.unshift(a);
				}
			}),
			(m.prototype._mode = function () {
				var a = this.options.layoutMode,
					b = this.modes[a];
				if (!b) throw new Error("No layout mode: " + a);
				return (b.options = this.options[a]), b;
			}),
			(m.prototype._resetLayout = function () {
				b.prototype._resetLayout.call(this),
					this._mode()._resetLayout();
			}),
			(m.prototype._getItemLayoutPosition = function (a) {
				return this._mode()._getItemLayoutPosition(a);
			}),
			(m.prototype._manageStamp = function (a) {
				this._mode()._manageStamp(a);
			}),
			(m.prototype._getContainerSize = function () {
				return this._mode()._getContainerSize();
			}),
			(m.prototype.needsResizeLayout = function () {
				return this._mode().needsResizeLayout();
			}),
			(m.prototype.appended = function (a) {
				var b = this.addItems(a);
				if (b.length) {
					var c = this._filterRevealAdded(b);
					this.filteredItems = this.filteredItems.concat(c);
				}
			}),
			(m.prototype.prepended = function (a) {
				var b = this._itemize(a);
				if (b.length) {
					this._resetLayout(), this._manageStamps();
					var c = this._filterRevealAdded(b);
					this.layoutItems(this.filteredItems),
						(this.filteredItems = c.concat(this.filteredItems)),
						(this.items = b.concat(this.items));
				}
			}),
			(m.prototype._filterRevealAdded = function (a) {
				var b = this._filter(a);
				return (
					this.hide(b.needHide),
					this.reveal(b.matches),
					this.layoutItems(b.matches, !0),
					b.matches
				);
			}),
			(m.prototype.insert = function (a) {
				var b = this.addItems(a);
				if (b.length) {
					var c,
						d,
						e = b.length;
					for (c = 0; e > c; c++)
						(d = b[c]), this.element.appendChild(d.element);
					var f = this._filter(b).matches;
					for (c = 0; e > c; c++) b[c].isLayoutInstant = !0;
					for (this.arrange(), c = 0; e > c; c++)
						delete b[c].isLayoutInstant;
					this.reveal(f);
				}
			});
		var o = m.prototype.remove;
		return (
			(m.prototype.remove = function (a) {
				a = e.makeArray(a);
				var b = this.getItems(a);
				o.call(this, a);
				var c = b && b.length;
				if (c)
					for (var d = 0; c > d; d++) {
						var f = b[d];
						e.removeFrom(this.filteredItems, f);
					}
			}),
			(m.prototype.shuffle = function () {
				for (var a = 0, b = this.items.length; b > a; a++) {
					var c = this.items[a];
					c.sortData.random = Math.random();
				}
				(this.options.sortBy = "random"), this._sort(), this._layout();
			}),
			(m.prototype._noTransition = function (a) {
				var b = this.options.transitionDuration;
				this.options.transitionDuration = 0;
				var c = a.call(this);
				return (this.options.transitionDuration = b), c;
			}),
			(m.prototype.getFilteredItemElements = function () {
				for (
					var a = [], b = 0, c = this.filteredItems.length;
					c > b;
					b++
				)
					a.push(this.filteredItems[b].element);
				return a;
			}),
			m
		);
	});

(function () {
	function e() {}
	function t(e, t) {
		for (var n = e.length; n--; ) if (e[n].listener === t) return n;
		return -1;
	}
	function n(e) {
		return function () {
			return this[e].apply(this, arguments);
		};
	}
	var i = e.prototype,
		r = this,
		o = r.EventEmitter;
	(i.getListeners = function (e) {
		var t,
			n,
			i = this._getEvents();
		if ("object" == typeof e) {
			t = {};
			for (n in i) i.hasOwnProperty(n) && e.test(n) && (t[n] = i[n]);
		} else t = i[e] || (i[e] = []);
		return t;
	}),
		(i.flattenListeners = function (e) {
			var t,
				n = [];
			for (t = 0; e.length > t; t += 1) n.push(e[t].listener);
			return n;
		}),
		(i.getListenersAsObject = function (e) {
			var t,
				n = this.getListeners(e);
			return n instanceof Array && ((t = {}), (t[e] = n)), t || n;
		}),
		(i.addListener = function (e, n) {
			var i,
				r = this.getListenersAsObject(e),
				o = "object" == typeof n;
			for (i in r)
				r.hasOwnProperty(i) &&
					-1 === t(r[i], n) &&
					r[i].push(o ? n : { listener: n, once: !1 });
			return this;
		}),
		(i.on = n("addListener")),
		(i.addOnceListener = function (e, t) {
			return this.addListener(e, { listener: t, once: !0 });
		}),
		(i.once = n("addOnceListener")),
		(i.defineEvent = function (e) {
			return this.getListeners(e), this;
		}),
		(i.defineEvents = function (e) {
			for (var t = 0; e.length > t; t += 1) this.defineEvent(e[t]);
			return this;
		}),
		(i.removeListener = function (e, n) {
			var i,
				r,
				o = this.getListenersAsObject(e);
			for (r in o)
				o.hasOwnProperty(r) &&
					((i = t(o[r], n)), -1 !== i && o[r].splice(i, 1));
			return this;
		}),
		(i.off = n("removeListener")),
		(i.addListeners = function (e, t) {
			return this.manipulateListeners(!1, e, t);
		}),
		(i.removeListeners = function (e, t) {
			return this.manipulateListeners(!0, e, t);
		}),
		(i.manipulateListeners = function (e, t, n) {
			var i,
				r,
				o = e ? this.removeListener : this.addListener,
				s = e ? this.removeListeners : this.addListeners;
			if ("object" != typeof t || t instanceof RegExp)
				for (i = n.length; i--; ) o.call(this, t, n[i]);
			else
				for (i in t)
					t.hasOwnProperty(i) &&
						(r = t[i]) &&
						("function" == typeof r
							? o.call(this, i, r)
							: s.call(this, i, r));
			return this;
		}),
		(i.removeEvent = function (e) {
			var t,
				n = typeof e,
				i = this._getEvents();
			if ("string" === n) delete i[e];
			else if ("object" === n)
				for (t in i) i.hasOwnProperty(t) && e.test(t) && delete i[t];
			else delete this._events;
			return this;
		}),
		(i.removeAllListeners = n("removeEvent")),
		(i.emitEvent = function (e, t) {
			var n,
				i,
				r,
				o,
				s = this.getListenersAsObject(e);
			for (r in s)
				if (s.hasOwnProperty(r))
					for (i = s[r].length; i--; )
						(n = s[r][i]),
							n.once === !0 && this.removeListener(e, n.listener),
							(o = n.listener.apply(this, t || [])),
							o === this._getOnceReturnValue() &&
								this.removeListener(e, n.listener);
			return this;
		}),
		(i.trigger = n("emitEvent")),
		(i.emit = function (e) {
			var t = Array.prototype.slice.call(arguments, 1);
			return this.emitEvent(e, t);
		}),
		(i.setOnceReturnValue = function (e) {
			return (this._onceReturnValue = e), this;
		}),
		(i._getOnceReturnValue = function () {
			return this.hasOwnProperty("_onceReturnValue")
				? this._onceReturnValue
				: !0;
		}),
		(i._getEvents = function () {
			return this._events || (this._events = {});
		}),
		(e.noConflict = function () {
			return (r.EventEmitter = o), e;
		}),
		"function" == typeof define && define.amd
			? define("eventEmitter/EventEmitter", [], function () {
					return e;
			  })
			: "object" == typeof module && module.exports
			? (module.exports = e)
			: (this.EventEmitter = e);
}.call(this),
	(function (e) {
		function t(t) {
			var n = e.event;
			return (n.target = n.target || n.srcElement || t), n;
		}
		var n = document.documentElement,
			i = function () {};
		n.addEventListener
			? (i = function (e, t, n) {
					e.addEventListener(t, n, !1);
			  })
			: n.attachEvent &&
			  (i = function (e, n, i) {
					(e[n + i] = i.handleEvent
						? function () {
								var n = t(e);
								i.handleEvent.call(i, n);
						  }
						: function () {
								var n = t(e);
								i.call(e, n);
						  }),
						e.attachEvent("on" + n, e[n + i]);
			  });
		var r = function () {};
		n.removeEventListener
			? (r = function (e, t, n) {
					e.removeEventListener(t, n, !1);
			  })
			: n.detachEvent &&
			  (r = function (e, t, n) {
					e.detachEvent("on" + t, e[t + n]);
					try {
						delete e[t + n];
					} catch (i) {
						e[t + n] = void 0;
					}
			  });
		var o = { bind: i, unbind: r };
		"function" == typeof define && define.amd
			? define("eventie/eventie", o)
			: (e.eventie = o);
	})(this),
	(function (e, t) {
		"function" == typeof define && define.amd
			? define(
					["eventEmitter/EventEmitter", "eventie/eventie"],
					function (n, i) {
						return t(e, n, i);
					}
			  )
			: "object" == typeof exports
			? (module.exports = t(
					e,
					require("wolfy87-eventemitter"),
					require("eventie")
			  ))
			: (e.imagesLoaded = t(e, e.EventEmitter, e.eventie));
	})(window, function (e, t, n) {
		function i(e, t) {
			for (var n in t) e[n] = t[n];
			return e;
		}
		function r(e) {
			return "[object Array]" === d.call(e);
		}
		function o(e) {
			var t = [];
			if (r(e)) t = e;
			else if ("number" == typeof e.length)
				for (var n = 0, i = e.length; i > n; n++) t.push(e[n]);
			else t.push(e);
			return t;
		}
		function s(e, t, n) {
			if (!(this instanceof s)) return new s(e, t);
			"string" == typeof e && (e = document.querySelectorAll(e)),
				(this.elements = o(e)),
				(this.options = i({}, this.options)),
				"function" == typeof t ? (n = t) : i(this.options, t),
				n && this.on("always", n),
				this.getImages(),
				a && (this.jqDeferred = new a.Deferred());
			var r = this;
			setTimeout(function () {
				r.check();
			});
		}
		function f(e) {
			this.img = e;
		}
		function c(e) {
			(this.src = e), (v[e] = this);
		}
		var a = e.jQuery,
			u = e.console,
			h = u !== void 0,
			d = Object.prototype.toString;
		(s.prototype = new t()),
			(s.prototype.options = {}),
			(s.prototype.getImages = function () {
				this.images = [];
				for (var e = 0, t = this.elements.length; t > e; e++) {
					var n = this.elements[e];
					"IMG" === n.nodeName && this.addImage(n);
					var i = n.nodeType;
					if (i && (1 === i || 9 === i || 11 === i))
						for (
							var r = n.querySelectorAll("img"),
								o = 0,
								s = r.length;
							s > o;
							o++
						) {
							var f = r[o];
							this.addImage(f);
						}
				}
			}),
			(s.prototype.addImage = function (e) {
				var t = new f(e);
				this.images.push(t);
			}),
			(s.prototype.check = function () {
				function e(e, r) {
					return (
						t.options.debug && h && u.log("confirm", e, r),
						t.progress(e),
						n++,
						n === i && t.complete(),
						!0
					);
				}
				var t = this,
					n = 0,
					i = this.images.length;
				if (((this.hasAnyBroken = !1), !i))
					return this.complete(), void 0;
				for (var r = 0; i > r; r++) {
					var o = this.images[r];
					o.on("confirm", e), o.check();
				}
			}),
			(s.prototype.progress = function (e) {
				this.hasAnyBroken = this.hasAnyBroken || !e.isLoaded;
				var t = this;
				setTimeout(function () {
					t.emit("progress", t, e),
						t.jqDeferred &&
							t.jqDeferred.notify &&
							t.jqDeferred.notify(t, e);
				});
			}),
			(s.prototype.complete = function () {
				var e = this.hasAnyBroken ? "fail" : "done";
				this.isComplete = !0;
				var t = this;
				setTimeout(function () {
					if ((t.emit(e, t), t.emit("always", t), t.jqDeferred)) {
						var n = t.hasAnyBroken ? "reject" : "resolve";
						t.jqDeferred[n](t);
					}
				});
			}),
			a &&
				(a.fn.imagesLoaded = function (e, t) {
					var n = new s(this, e, t);
					return n.jqDeferred.promise(a(this));
				}),
			(f.prototype = new t()),
			(f.prototype.check = function () {
				var e = v[this.img.src] || new c(this.img.src);
				if (e.isConfirmed)
					return (
						this.confirm(e.isLoaded, "cached was confirmed"), void 0
					);
				if (this.img.complete && void 0 !== this.img.naturalWidth)
					return (
						this.confirm(
							0 !== this.img.naturalWidth,
							"naturalWidth"
						),
						void 0
					);
				var t = this;
				e.on("confirm", function (e, n) {
					return t.confirm(e.isLoaded, n), !0;
				}),
					e.check();
			}),
			(f.prototype.confirm = function (e, t) {
				(this.isLoaded = e), this.emit("confirm", this, t);
			});
		var v = {};
		return (
			(c.prototype = new t()),
			(c.prototype.check = function () {
				if (!this.isChecked) {
					var e = new Image();
					n.bind(e, "load", this),
						n.bind(e, "error", this),
						(e.src = this.src),
						(this.isChecked = !0);
				}
			}),
			(c.prototype.handleEvent = function (e) {
				var t = "on" + e.type;
				this[t] && this[t](e);
			}),
			(c.prototype.onload = function (e) {
				this.confirm(!0, "onload"), this.unbindProxyEvents(e);
			}),
			(c.prototype.onerror = function (e) {
				this.confirm(!1, "onerror"), this.unbindProxyEvents(e);
			}),
			(c.prototype.confirm = function (e, t) {
				(this.isConfirmed = !0),
					(this.isLoaded = e),
					this.emit("confirm", this, t);
			}),
			(c.prototype.unbindProxyEvents = function (e) {
				n.unbind(e.target, "load", this),
					n.unbind(e.target, "error", this);
			}),
			s
		);
	}));
/*!
 * Packery layout mode PACKAGED v1.1.3
 * sub-classes Packery
 * http://packery.metafizzy.co
 */

!(function (a) {
	function b(a) {
		return new RegExp("(^|\\s+)" + a + "(\\s+|$)");
	}
	function c(a, b) {
		var c = d(a, b) ? f : e;
		c(a, b);
	}
	var d, e, f;
	"classList" in document.documentElement
		? ((d = function (a, b) {
				return a.classList.contains(b);
		  }),
		  (e = function (a, b) {
				a.classList.add(b);
		  }),
		  (f = function (a, b) {
				a.classList.remove(b);
		  }))
		: ((d = function (a, c) {
				return b(c).test(a.className);
		  }),
		  (e = function (a, b) {
				d(a, b) || (a.className = a.className + " " + b);
		  }),
		  (f = function (a, c) {
				a.className = a.className.replace(b(c), " ");
		  }));
	var g = {
		hasClass: d,
		addClass: e,
		removeClass: f,
		toggleClass: c,
		has: d,
		add: e,
		remove: f,
		toggle: c,
	};
	"function" == typeof define && define.amd
		? define("classie/classie", g)
		: "object" == typeof exports
		? (module.exports = g)
		: (a.classie = g);
})(window),
	(function (a, b) {
		"function" == typeof define && define.amd
			? define("packery/js/rect", b)
			: "object" == typeof exports
			? (module.exports = b())
			: ((a.Packery = a.Packery || {}), (a.Packery.Rect = b()));
	})(window, function () {
		function a(b) {
			for (var c in a.defaults) this[c] = a.defaults[c];
			for (c in b) this[c] = b[c];
		}
		var b = (window.Packery = function () {});
		return (
			(b.Rect = a),
			(a.defaults = { x: 0, y: 0, width: 0, height: 0 }),
			(a.prototype.contains = function (a) {
				var b = a.width || 0,
					c = a.height || 0;
				return (
					this.x <= a.x &&
					this.y <= a.y &&
					this.x + this.width >= a.x + b &&
					this.y + this.height >= a.y + c
				);
			}),
			(a.prototype.overlaps = function (a) {
				var b = this.x + this.width,
					c = this.y + this.height,
					d = a.x + a.width,
					e = a.y + a.height;
				return this.x < d && b > a.x && this.y < e && c > a.y;
			}),
			(a.prototype.getMaximalFreeRects = function (b) {
				if (!this.overlaps(b)) return !1;
				var c,
					d = [],
					e = this.x + this.width,
					f = this.y + this.height,
					g = b.x + b.width,
					h = b.y + b.height;
				return (
					this.y < b.y &&
						((c = new a({
							x: this.x,
							y: this.y,
							width: this.width,
							height: b.y - this.y,
						})),
						d.push(c)),
					e > g &&
						((c = new a({
							x: g,
							y: this.y,
							width: e - g,
							height: this.height,
						})),
						d.push(c)),
					f > h &&
						((c = new a({
							x: this.x,
							y: h,
							width: this.width,
							height: f - h,
						})),
						d.push(c)),
					this.x < b.x &&
						((c = new a({
							x: this.x,
							y: this.y,
							width: b.x - this.x,
							height: this.height,
						})),
						d.push(c)),
					d
				);
			}),
			(a.prototype.canFit = function (a) {
				return this.width >= a.width && this.height >= a.height;
			}),
			a
		);
	}),
	(function (a, b) {
		if ("function" == typeof define && define.amd)
			define("packery/js/packer", ["./rect"], b);
		else if ("object" == typeof exports)
			module.exports = b(require("./rect"));
		else {
			var c = (a.Packery = a.Packery || {});
			c.Packer = b(c.Rect);
		}
	})(window, function (a) {
		function b(a, b, c) {
			(this.width = a || 0),
				(this.height = b || 0),
				(this.sortDirection = c || "downwardLeftToRight"),
				this.reset();
		}
		(b.prototype.reset = function () {
			(this.spaces = []), (this.newSpaces = []);
			var b = new a({
				x: 0,
				y: 0,
				width: this.width,
				height: this.height,
			});
			this.spaces.push(b),
				(this.sorter = c[this.sortDirection] || c.downwardLeftToRight);
		}),
			(b.prototype.pack = function (a) {
				for (var b = 0, c = this.spaces.length; c > b; b++) {
					var d = this.spaces[b];
					if (d.canFit(a)) {
						this.placeInSpace(a, d);
						break;
					}
				}
			}),
			(b.prototype.placeInSpace = function (a, b) {
				(a.x = b.x), (a.y = b.y), this.placed(a);
			}),
			(b.prototype.placed = function (a) {
				for (var b = [], c = 0, d = this.spaces.length; d > c; c++) {
					var e = this.spaces[c],
						f = e.getMaximalFreeRects(a);
					f ? b.push.apply(b, f) : b.push(e);
				}
				(this.spaces = b), this.mergeSortSpaces();
			}),
			(b.prototype.mergeSortSpaces = function () {
				b.mergeRects(this.spaces), this.spaces.sort(this.sorter);
			}),
			(b.prototype.addSpace = function (a) {
				this.spaces.push(a), this.mergeSortSpaces();
			}),
			(b.mergeRects = function (a) {
				for (var b = 0, c = a.length; c > b; b++) {
					var d = a[b];
					if (d) {
						var e = a.slice(0);
						e.splice(b, 1);
						for (var f = 0, g = 0, h = e.length; h > g; g++) {
							var i = e[g],
								j = b > g ? 0 : 1;
							d.contains(i) && (a.splice(g + j - f, 1), f++);
						}
					}
				}
				return a;
			});
		var c = {
			downwardLeftToRight: function (a, b) {
				return a.y - b.y || a.x - b.x;
			},
			rightwardTopToBottom: function (a, b) {
				return a.x - b.x || a.y - b.y;
			},
		};
		return b;
	}),
	(function (a, b) {
		"function" == typeof define && define.amd
			? define(
					"packery/js/item",
					[
						"get-style-property/get-style-property",
						"outlayer/outlayer",
						"./rect",
					],
					b
			  )
			: "object" == typeof exports
			? (module.exports = b(
					require("desandro-get-style-property"),
					require("outlayer"),
					require("./rect")
			  ))
			: (a.Packery.Item = b(
					a.getStyleProperty,
					a.Outlayer,
					a.Packery.Rect
			  ));
	})(window, function (a, b, c) {
		var d = a("transform"),
			e = function () {
				b.Item.apply(this, arguments);
			};
		e.prototype = new b.Item();
		var f = e.prototype._create;
		return (
			(e.prototype._create = function () {
				f.call(this), (this.rect = new c()), (this.placeRect = new c());
			}),
			(e.prototype.dragStart = function () {
				this.getPosition(),
					this.removeTransitionStyles(),
					this.isTransitioning &&
						d &&
						(this.element.style[d] = "none"),
					this.getSize(),
					(this.isPlacing = !0),
					(this.needsPositioning = !1),
					this.positionPlaceRect(this.position.x, this.position.y),
					(this.isTransitioning = !1),
					(this.didDrag = !1);
			}),
			(e.prototype.dragMove = function (a, b) {
				this.didDrag = !0;
				var c = this.layout.size;
				(a -= c.paddingLeft),
					(b -= c.paddingTop),
					this.positionPlaceRect(a, b);
			}),
			(e.prototype.dragStop = function () {
				this.getPosition();
				var a = this.position.x != this.placeRect.x,
					b = this.position.y != this.placeRect.y;
				(this.needsPositioning = a || b), (this.didDrag = !1);
			}),
			(e.prototype.positionPlaceRect = function (a, b, c) {
				(this.placeRect.x = this.getPlaceRectCoord(a, !0)),
					(this.placeRect.y = this.getPlaceRectCoord(b, !1, c));
			}),
			(e.prototype.getPlaceRectCoord = function (a, b, c) {
				var d = b ? "Width" : "Height",
					e = this.size["outer" + d],
					f = this.layout[b ? "columnWidth" : "rowHeight"],
					g = this.layout.size["inner" + d];
				b ||
					((g = Math.max(g, this.layout.maxY)),
					this.layout.rowHeight || (g -= this.layout.gutter));
				var h;
				if (f) {
					(f += this.layout.gutter),
						(g += b ? this.layout.gutter : 0),
						(a = Math.round(a / f));
					var i;
					i = this.layout.options.isHorizontal
						? b
							? "ceil"
							: "floor"
						: b
						? "floor"
						: "ceil";
					var j = Math[i](g / f);
					(j -= Math.ceil(e / f)), (h = j);
				} else h = g - e;
				return (
					(a = c ? a : Math.min(a, h)), (a *= f || 1), Math.max(0, a)
				);
			}),
			(e.prototype.copyPlaceRectPosition = function () {
				(this.rect.x = this.placeRect.x),
					(this.rect.y = this.placeRect.y);
			}),
			(e.prototype.removeElem = function () {
				this.element.parentNode.removeChild(this.element),
					this.layout.packer.addSpace(this.rect),
					this.emitEvent("remove", [this]);
			}),
			e
		);
	}),
	(function (a, b) {
		"function" == typeof define && define.amd
			? define(
					"packery/js/packery",
					[
						"classie/classie",
						"get-size/get-size",
						"outlayer/outlayer",
						"./rect",
						"./packer",
						"./item",
					],
					b
			  )
			: "object" == typeof exports
			? (module.exports = b(
					require("desandro-classie"),
					require("get-size"),
					require("outlayer"),
					require("./rect"),
					require("./packer"),
					require("./item")
			  ))
			: (a.Packery = b(
					a.classie,
					a.getSize,
					a.Outlayer,
					a.Packery.Rect,
					a.Packery.Packer,
					a.Packery.Item
			  ));
	})(window, function (a, b, c, d, e, f) {
		function g(a, b) {
			return a.position.y - b.position.y || a.position.x - b.position.x;
		}
		function h(a, b) {
			return a.position.x - b.position.x || a.position.y - b.position.y;
		}
		d.prototype.canFit = function (a) {
			return this.width >= a.width - 1 && this.height >= a.height - 1;
		};
		var i = c.create("packery");
		return (
			(i.Item = f),
			(i.prototype._create = function () {
				c.prototype._create.call(this),
					(this.packer = new e()),
					this.stamp(this.options.stamped);
				var a = this;
				(this.handleDraggabilly = {
					dragStart: function () {
						a.itemDragStart(this.element);
					},
					dragMove: function () {
						a.itemDragMove(
							this.element,
							this.position.x,
							this.position.y
						);
					},
					dragEnd: function () {
						a.itemDragEnd(this.element);
					},
				}),
					(this.handleUIDraggable = {
						start: function (b) {
							a.itemDragStart(b.currentTarget);
						},
						drag: function (b, c) {
							a.itemDragMove(
								b.currentTarget,
								c.position.left,
								c.position.top
							);
						},
						stop: function (b) {
							a.itemDragEnd(b.currentTarget);
						},
					});
			}),
			(i.prototype._resetLayout = function () {
				this.getSize(), this._getMeasurements();
				var a = this.packer;
				this.options.isHorizontal
					? ((a.width = Number.POSITIVE_INFINITY),
					  (a.height = this.size.innerHeight + this.gutter),
					  (a.sortDirection = "rightwardTopToBottom"))
					: ((a.width = this.size.innerWidth + this.gutter),
					  (a.height = Number.POSITIVE_INFINITY),
					  (a.sortDirection = "downwardLeftToRight")),
					a.reset(),
					(this.maxY = 0),
					(this.maxX = 0);
			}),
			(i.prototype._getMeasurements = function () {
				this._getMeasurement("columnWidth", "width"),
					this._getMeasurement("rowHeight", "height"),
					this._getMeasurement("gutter", "width");
			}),
			(i.prototype._getItemLayoutPosition = function (a) {
				return this._packItem(a), a.rect;
			}),
			(i.prototype._packItem = function (a) {
				this._setRectSize(a.element, a.rect),
					this.packer.pack(a.rect),
					this._setMaxXY(a.rect);
			}),
			(i.prototype._setMaxXY = function (a) {
				(this.maxX = Math.max(a.x + a.width, this.maxX)),
					(this.maxY = Math.max(a.y + a.height, this.maxY));
			}),
			(i.prototype._setRectSize = function (a, c) {
				var d = b(a),
					e = d.outerWidth,
					f = d.outerHeight;
				(e || f) &&
					((e = this._applyGridGutter(e, this.columnWidth)),
					(f = this._applyGridGutter(f, this.rowHeight))),
					(c.width = Math.min(e, this.packer.width)),
					(c.height = Math.min(f, this.packer.height));
			}),
			(i.prototype._applyGridGutter = function (a, b) {
				if (!b) return a + this.gutter;
				b += this.gutter;
				var c = a % b,
					d = c && 1 > c ? "round" : "ceil";
				return (a = Math[d](a / b) * b);
			}),
			(i.prototype._getContainerSize = function () {
				return this.options.isHorizontal
					? { width: this.maxX - this.gutter }
					: { height: this.maxY - this.gutter };
			}),
			(i.prototype._manageStamp = function (a) {
				var b,
					c = this.getItem(a);
				if (c && c.isPlacing) b = c.placeRect;
				else {
					var e = this._getElementOffset(a);
					b = new d({
						x: this.options.isOriginLeft ? e.left : e.right,
						y: this.options.isOriginTop ? e.top : e.bottom,
					});
				}
				this._setRectSize(a, b),
					this.packer.placed(b),
					this._setMaxXY(b);
			}),
			(i.prototype.sortItemsByPosition = function () {
				var a = this.options.isHorizontal ? h : g;
				this.items.sort(a);
			}),
			(i.prototype.fit = function (a, b, c) {
				var d = this.getItem(a);
				d &&
					(this._getMeasurements(),
					this.stamp(d.element),
					d.getSize(),
					(d.isPlacing = !0),
					(b = void 0 === b ? d.rect.x : b),
					(c = void 0 === c ? d.rect.y : c),
					d.positionPlaceRect(b, c, !0),
					this._bindFitEvents(d),
					d.moveTo(d.placeRect.x, d.placeRect.y),
					this.layout(),
					this.unstamp(d.element),
					this.sortItemsByPosition(),
					(d.isPlacing = !1),
					d.copyPlaceRectPosition());
			}),
			(i.prototype._bindFitEvents = function (a) {
				function b() {
					d++, 2 == d && c.emitEvent("fitComplete", [a]);
				}
				var c = this,
					d = 0;
				a.on("layout", function () {
					return b(), !0;
				}),
					this.on("layoutComplete", function () {
						return b(), !0;
					});
			}),
			(i.prototype.resize = function () {
				var a = b(this.element),
					c = this.size && a,
					d = this.options.isHorizontal
						? "innerHeight"
						: "innerWidth";
				(c && a[d] == this.size[d]) || this.layout();
			}),
			(i.prototype.itemDragStart = function (a) {
				this.stamp(a);
				var b = this.getItem(a);
				b && b.dragStart();
			}),
			(i.prototype.itemDragMove = function (a, b, c) {
				function d() {
					f.layout(), delete f.dragTimeout;
				}
				var e = this.getItem(a);
				e && e.dragMove(b, c);
				var f = this;
				this.clearDragTimeout(), (this.dragTimeout = setTimeout(d, 40));
			}),
			(i.prototype.clearDragTimeout = function () {
				this.dragTimeout && clearTimeout(this.dragTimeout);
			}),
			(i.prototype.itemDragEnd = function (b) {
				var c,
					d = this.getItem(b);
				if (
					(d && ((c = d.didDrag), d.dragStop()),
					!d || (!c && !d.needsPositioning))
				)
					return void this.unstamp(b);
				a.add(d.element, "is-positioning-post-drag");
				var e = this._getDragEndLayoutComplete(b, d);
				d.needsPositioning
					? (d.on("layout", e),
					  d.moveTo(d.placeRect.x, d.placeRect.y))
					: d && d.copyPlaceRectPosition(),
					this.clearDragTimeout(),
					this.on("layoutComplete", e),
					this.layout();
			}),
			(i.prototype._getDragEndLayoutComplete = function (b, c) {
				var d = c && c.needsPositioning,
					e = 0,
					f = d ? 2 : 1,
					g = this;
				return function () {
					return (
						e++,
						e != f
							? !0
							: (c &&
									(a.remove(
										c.element,
										"is-positioning-post-drag"
									),
									(c.isPlacing = !1),
									c.copyPlaceRectPosition()),
							  g.unstamp(b),
							  g.sortItemsByPosition(),
							  d && g.emitEvent("dragItemPositioned", [c]),
							  !0)
					);
				};
			}),
			(i.prototype.bindDraggabillyEvents = function (a) {
				a.on("dragStart", this.handleDraggabilly.dragStart),
					a.on("dragMove", this.handleDraggabilly.dragMove),
					a.on("dragEnd", this.handleDraggabilly.dragEnd);
			}),
			(i.prototype.bindUIDraggableEvents = function (a) {
				a.on("dragstart", this.handleUIDraggable.start)
					.on("drag", this.handleUIDraggable.drag)
					.on("dragstop", this.handleUIDraggable.stop);
			}),
			(i.Rect = d),
			(i.Packer = e),
			i
		);
	}),
	(function (a, b) {
		"function" == typeof define && define.amd
			? define(
					[
						"isotope/js/layout-mode",
						"packery/js/packery",
						"get-size/get-size",
					],
					b
			  )
			: "object" == typeof exports
			? (module.exports = b(
					require("isotope-layout/js/layout-mode"),
					require("packery"),
					require("get-size")
			  ))
			: b(a.Isotope.LayoutMode, a.Packery, a.getSize);
	})(window, function (a, b, c) {
		function d(a, b) {
			for (var c in b) a[c] = b[c];
			return a;
		}
		var e = a.create("packery"),
			f = e.prototype._getElementOffset,
			g = e.prototype._getMeasurement;
		d(e.prototype, b.prototype),
			(e.prototype._getElementOffset = f),
			(e.prototype._getMeasurement = g);
		var h = e.prototype._resetLayout;
		e.prototype._resetLayout = function () {
			(this.packer = this.packer || new b.Packer()),
				h.apply(this, arguments);
		};
		var i = e.prototype._getItemLayoutPosition;
		e.prototype._getItemLayoutPosition = function (a) {
			return (a.rect = a.rect || new b.Rect()), i.call(this, a);
		};
		var j = e.prototype._manageStamp;
		return (
			(e.prototype._manageStamp = function () {
				(this.options.isOriginLeft = this.isotope.options.isOriginLeft),
					(this.options.isOriginTop =
						this.isotope.options.isOriginTop),
					j.apply(this, arguments);
			}),
			(e.prototype.needsResizeLayout = function () {
				var a = c(this.element),
					b = this.size && a,
					d = this.options.isHorizontal
						? "innerHeight"
						: "innerWidth";
				return b && a[d] != this.size[d];
			}),
			e
		);
	});
/**
 * jQuery.share - social media sharing plugin
 * ---
 * @author Carol Skelly (http://in1.com)
 * @version 1.0
 * @license MIT license (http://opensource.org/licenses/mit-license.php)
 * ---
 */

!(function (t, e) {
	var s = e.document;
	(t.fn.share = function (i) {
		var r = {
				init: function (i) {
					this.share.settings = t.extend({}, this.share.defaults, i);
					var r = (this.share.settings, this.share.settings.networks),
						o = this.share.settings.theme,
						a = this.share.settings.orientation,
						u = this.share.settings.affix,
						h = this.share.settings.margin,
						l = this.share.settings.title || t(s).attr("title"),
						c =
							this.share.settings.urlToShare ||
							t(location).attr("href"),
						p = "";
					return (
						t.each(
							t(s).find('meta[name="description"]'),
							function (e, s) {
								p = t(s).attr("content");
							}
						),
						this.each(function () {
							var s,
								i = t(this),
								m = i.attr("id"),
								d = encodeURIComponent(c),
								f = l.replace("|", ""),
								g = p.substring(0, 250);
							r.forEach(function (e) {
								(s = n.networkDefs[e].url),
									(s = s
										.replace("|u|", d)
										.replace("|t|", f)
										.replace("|d|", g)
										.replace("|140|", f.substring(0, 130))),
									t(
										"<a href='" +
											s +
											"'   class='pop share-" +
											o +
											" share-" +
											o +
											"-" +
											e +
											"'></a>"
									).appendTo(i);
							}),
								t("#" + m + ".share-" + o).css("margin", h),
								"horizontal" != a
									? t("#" + m + " a.share-" + o).css(
											"display",
											"block"
									  )
									: t("#" + m + " a.share-" + o).css(
											"display",
											"inline-block"
									  ),
								"undefined" != typeof u &&
									(i.addClass("share-affix"),
									-1 != u.indexOf("right")
										? (i.css("left", "auto"),
										  i.css("right", "0px"),
										  -1 != u.indexOf("center") &&
												i.css("top", "40%"))
										: -1 != u.indexOf("left center") &&
										  i.css("top", "40%"),
									-1 != u.indexOf("bottom") &&
										(i.css("bottom", "0px"),
										i.css("top", "auto"),
										-1 != u.indexOf("center") &&
											i.css("left", "40%"))),
								t(".pop").click(function () {
									return (
										e.open(
											t(this).attr("href"),
											"t",
											"toolbar=0,resizable=1,status=0,width=640,height=528"
										),
										!1
									);
								});
						})
					);
				},
			},
			n = {
				networkDefs: {
					facebook: {
						url: "http://www.facebook.com/share.php?u=|u|",
					},
					twitter: {
						url: "https://twitter.com/share?via=in1.com&text=|140|",
					},
					linkedin: {
						url: "http://www.linkedin.com/shareArticle?mini=true&url=|u|&title=|t|&summary=|d|&source=in1.com",
					},
					in1: {
						url: "http://www.in1.com/cast?u=|u|",
						w: "490",
						h: "529",
					},
					tumblr: { url: "http://www.tumblr.com/share?v=3&u=|u|" },
					digg: { url: "http://digg.com/submit?url=|u|&title=|t|" },
					googleplus: {
						url: "https://plusone.google.com/_/+1/confirm?hl=en&url=|u|",
					},
					reddit: { url: "http://reddit.com/submit?url=|u|" },
					pinterest: {
						url: "http://pinterest.com/pin/create/button/?url=|u|&media=&description=|d|",
					},
					posterous: {
						url: "http://posterous.com/share?linkto=|u|&title=|t|",
					},
					stumbleupon: {
						url: "http://www.stumbleupon.com/submit?url=|u|&title=|t|",
					},
					email: { url: "mailto:?subject=|t|" },
				},
			};
		return r[i]
			? r[i].apply(this, Array.prototype.slice.call(arguments, 1))
			: "object" != typeof i && i
			? void t.error('Method "' + i + '" does not exist in social plugin')
			: r.init.apply(this, arguments);
	}),
		(t.fn.share.defaults = {
			networks: ["in1", "facebook", "twitter", "linkedin"],
			theme: "icon",
			autoShow: !0,
			margin: "3px",
			orientation: "horizontal",
			useIn1: !0,
		}),
		(t.fn.share.settings = {});
})(jQuery, window);
/** video**/
"function" != typeof Object.create &&
	(Object.create = function (e) {
		function t() {}
		return (t.prototype = e), new t();
	}),
	(function (e, t, o) {
		var a = function (e) {
				var t = o.createElement("script"),
					a = o.getElementsByTagName("head")[0];
				(t.src = location.protocol + "//www.youtube.com/iframe_api"),
					a.appendChild(t),
					(a = null),
					(t = null),
					n(e);
			},
			n = function (o) {
				"undefined" == typeof YT &&
				"undefined" == typeof t.loadingPlayer
					? ((t.loadingPlayer = !0),
					  (t.dfd = e.Deferred()),
					  (t.onYouTubeIframeAPIReady = function () {
							(t.onYouTubeIframeAPIReady = null),
								t.dfd.resolve("John"),
								o();
					  }))
					: t.dfd.done(function (e) {
							o();
					  });
			};
		(YTPlayer = {
			player: null,
			defaults: {
				ratio: 16 / 9,
				videoId: "LSmgKRx5pBo",
				mute: !0,
				repeat: !0,
				width: e(t).width(),
				playButtonClass: "YTPlayer-play",
				pauseButtonClass: "YTPlayer-pause",
				muteButtonClass: "YTPlayer-mute",
				volumeUpClass: "YTPlayer-volume-up",
				volumeDownClass: "YTPlayer-volume-down",
				start: 0,
				pauseOnScroll: !1,
				fitToBackground: !0,
				playerVars: {
					modestbranding: 1,
					autoplay: 1,
					controls: 0,
					showinfo: 0,
					wmode: "transparent",
					branding: 0,
					rel: 0,
					autohide: 0,
					origin: t.location.origin,
				},
				events: null,
			},
			init: function (o, n) {
				var i = this;
				return (
					(i.userOptions = n),
					(i.$body = e("body")),
					(i.$node = e(o)),
					(i.$window = e(t)),
					(i.defaults.events = {
						onReady: function (e) {
							i.onPlayerReady(e),
								i.options.pauseOnScroll && i.pauseOnScroll(),
								"function" == typeof i.options.callback &&
									i.options.callback.call(this);
						},
						onStateChange: function (e) {
							1 === e.data
								? i.$node.addClass("loaded")
								: 0 === e.data &&
								  i.options.repeat &&
								  i.player.seekTo(i.options.start);
						},
					}),
					(i.options = e.extend(!0, {}, i.defaults, i.userOptions)),
					(i.ID = new Date().getTime()),
					(i.holderID = "YTPlayer-ID-" + i.ID),
					i.options.fitToBackground
						? i.createBackgroundVideo()
						: i.createContainerVideo(),
					i.$window.on("resize.YTplayer" + i.ID, function () {
						i.resize(i);
					}),
					a(i.onYouTubeIframeAPIReady.bind(i)),
					i.resize(i),
					i
				);
			},
			pauseOnScroll: function () {
				var e = this;
				e.$window.on("scroll.YTplayer" + e.ID, function () {
					var t = e.player.getPlayerState();
					1 === t && e.player.pauseVideo();
				}),
					e.$window.scrollStopped(function () {
						var t = e.player.getPlayerState();
						2 === t && e.player.playVideo();
					});
			},
			createContainerVideo: function () {
				var t = this,
					o = e(
						'<div id="ytplayer-container' +
							t.ID +
							'" >                                    <div id="' +
							t.holderID +
							'" class="ytplayer-player"></div>                                     </div>                                     <div id="ytplayer-shield"></div>'
					);
				t.$node.append(o), (t.$YTPlayerString = o), (o = null);
			},
			createBackgroundVideo: function () {
				var t = this,
					o = e(
						'<div id="ytplayer-container' +
							t.ID +
							'" class="ytplayer-container background">                                    <div id="' +
							t.holderID +
							'" class="ytplayer-player"></div>                                    </div>                                    <div id="ytplayer-shield"></div>'
					);
				t.$node.append(o), (t.$YTPlayerString = o), (o = null);
			},
			resize: function (t) {
				var o = e(".media-container");
				t.options.fitToBackground || (o = t.$node);
				var a,
					n,
					i = o.width(),
					r = o.height(),
					l = e("#" + t.holderID);
				i / t.options.ratio < r
					? ((a = Math.ceil(r * t.options.ratio)),
					  l
							.width(a)
							.height(r)
							.css({ left: (i - a) / 2, top: 0 }))
					: ((n = Math.ceil(i / t.options.ratio)),
					  l.width(i).height(n).css({ left: 0, top: 0 })),
					(l = null),
					(o = null);
			},
			onYouTubeIframeAPIReady: function () {
				var e = this;
				e.player = new t.YT.Player(e.holderID, {
					width: e.options.width,
					height: Math.ceil(e.options.width / e.options.ratio),
					videoId: e.options.videoId,
					playerVars: e.options.playerVars,
					events: e.options.events,
				});
			},
			onPlayerReady: function (e) {
				this.options.mute && e.target.mute(), e.target.playVideo();
			},
			getPlayer: function () {
				return this.player;
			},
			destroy: function () {
				var o = this;
				o.$node
					.removeData("yt-init")
					.removeData("ytPlayer")
					.removeClass("loaded"),
					o.$YTPlayerString.remove(),
					e(t).off("resize.YTplayer" + o.ID),
					e(t).off("scroll.YTplayer" + o.ID),
					(o.$body = null),
					(o.$node = null),
					(o.$YTPlayerString = null),
					o.player.destroy(),
					(o.player = null);
			},
		}),
			(e.fn.scrollStopped = function (t) {
				var o = e(this),
					a = this;
				o.scroll(function () {
					o.data("scrollTimeout") &&
						clearTimeout(o.data("scrollTimeout")),
						o.data("scrollTimeout", setTimeout(t, 250, a));
				});
			}),
			(e.fn.YTPlayer = function (t) {
				return this.each(function () {
					var o = this;
					e(o).data("yt-init", !0);
					var a = Object.create(YTPlayer);
					a.init(o, t), e.data(o, "ytPlayer", a);
				});
			});
	})(jQuery, window, document);
/**
 *  Parallax Scrolling Library
 *
 */
(function (e) {
	"function" === typeof define && define.amd
		? define(["jquery"], e)
		: "undefined" !== typeof exports
		? (module.exports = e(require("jquery")))
		: e(jQuery);
})(function (e) {
	function W(a) {
		if (console && console.warn) console.warn("Scrollax: " + a);
		else throw "Scrollax: " + a;
	}
	function ka(a) {
		var g = !!("pageYOffset" in a);
		return {
			width: g
				? window.innerWidth ||
				  document.documentElement.clientWidth ||
				  document.body.clientWidth
				: a.offsetWidth,
			height: g
				? window.innerHeight ||
				  document.documentElement.clientHeight ||
				  document.body.clientHeight
				: a.offsetHeight,
			left: a[g ? "pageXOffset" : "scrollLeft"],
			top: a[g ? "pageYOffset" : "scrollTop"],
		};
	}
	function X(a) {
		return ((a = a.data("scrollax")) && eval("({" + a + "})")) || {};
	}
	function Y(a) {
		var g, c;
		return !!(
			a &&
			"object" === typeof a &&
			"object" === typeof a.window &&
			a.window == a &&
			a.setTimeout &&
			a.alert &&
			(g = a.document) &&
			"object" === typeof g &&
			(c = g.defaultView || g.parentWindow) &&
			"object" === typeof c &&
			c == a
		);
	}
	var v = Array.prototype,
		C = v.push,
		Z = v.splice,
		aa = Object.prototype.hasOwnProperty,
		la = /[-+]?\d+(\.\d+)?/g,
		ma =
			"translateX translateY rotate rotateX rotateY rotateZ skewX skewY scaleX scaleY".split(
				" "
			),
		ba = e(window),
		ca = e(document.body),
		da,
		ea,
		L,
		M,
		N,
		q = function (a, g, c) {
			function k() {
				O = fa ? ca.find(ga) : P.find(ga);
				x.length = 0;
				r = !!t.horizontal;
				O.each(na);
				d();
				t.performanceTrick && (F = fa ? ca : P);
				u("load");
				return f;
			}
			function l() {
				G && (G = clearTimeout(G));
				G = setTimeout(function () {
					f.reload();
				});
			}
			function d() {
				var ha = x.length;
				t.performanceTrick &&
					F &&
					(clearTimeout(ia),
					Q || (F.addClass("scrollax-performance"), (Q = !0)),
					(ia = setTimeout(function () {
						F.removeClass("scrollax-performance");
						Q = !1;
					}, 100)));
				if (ha) {
					H = ka(a);
					for (var c = 0; c < ha; c++)
						(I = x[c]),
							(y = L(I.element, a)),
							0 > y[r ? "right" : "bottom"] ||
								y[r ? "left" : "top"] >
									H[r ? "width" : "height"] ||
								((ja = I.options),
								(R = ja.offset || t.offset || 0),
								(J = y[r ? "right" : "bottom"]),
								(z = y[r ? "width" : "height"]),
								(A = (z - J + R) / z),
								0 > A &&
									((J = y[r ? "left" : "top"]),
									(z = H[r ? "width" : "height"]),
									(A = -1 + (z - J + R) / z)),
								1 < A || -1 > A || b(I, A, r));
					u("scroll", H);
				}
			}
			function b(a, b) {
				S = a.parallaxElements;
				var c = S.length;
				if (c)
					for (var f = 0; f < c; f++) {
						T = S[f];
						var g = (oa = T.element),
							d = b;
						U =
							T.properties ||
							(r
								? { translateX: "100%" }
								: { translateY: "100%" });
						D = "";
						for (B in U) {
							n = U[B];
							if ("number" === typeof n) n *= d;
							else if ("string" === typeof n)
								for (
									K = n.match(la), m = 0, E = K.length;
									m < E;
									m++
								)
									n = n.replace(K[m], parseFloat(K[m] * d));
							if (-1 !== e.inArray(B, ma)) D += B + "(" + n + ")";
							else {
								var k = g.style,
									l = B,
									h;
								"opacity" === B
									? ((h = 0 > d ? 1 + n : 1 - n),
									  (h = 0 > h ? 0 : 1 < h ? 1 : h))
									: (h = n);
								k[l] = h;
							}
						}
						D && (g.style[da] = ea + D);
					}
			}
			function pa(a) {
				return "undefined" !== typeof a
					? ("number" !== typeof a && "string" !== typeof a) ||
					  "" === a ||
					  isNaN(a)
						? O.index(a)
						: 0 <= a && a < x.length
						? a
						: -1
					: -1;
			}
			function u(a, b) {
				if (h[a]) {
					E = h[a].length;
					for (m = V.length = 0; m < E; m++) C.call(V, h[a][m]);
					for (m = 0; m < E; m++) V[m].call(f, a, b);
				}
			}
			function p(a, b) {
				for (var c = 0, f = h[a].length; c < f; c++)
					if (h[a][c] === b) return c;
				return -1;
			}
			var f = this,
				P = (a && e(a).eq(0)) || ba,
				w = q.instances,
				v = null;
			a = P[0];
			e.each(w, function (b, c) {
				b && b.frame === a && (v = !0);
			});
			if (!a || v)
				v
					? W(
							"Scrollax: Scrollax has been initialized for this frame!"
					  )
					: W("Scrollax: Frame is not available!");
			else {
				var t = e.extend({}, q.defaults, g),
					x = [],
					O = null,
					ga = t.parentSelector || "[data-scrollax-parent]",
					qa = t.elementsSelector || "[data-scrollax]",
					h = {},
					V = [],
					G,
					fa = Y(a),
					m,
					E,
					F,
					ia,
					Q,
					H,
					r,
					R,
					y,
					I,
					ja,
					A,
					J,
					z,
					S,
					T,
					oa,
					U,
					B,
					n,
					D,
					K;
				f.frame = a;
				f.options = t;
				f.parents = x;
				f.initialized = !1;
				f.reload = k;
				var na = function (a, b) {
					var c = e(b),
						f = X(e(b)),
						d = {};
					d.element = b;
					d.options = f;
					d.parallaxElements = [];
					c.find(qa).each(function (a, b) {
						var c = X(e(b));
						c.element = b;
						C.call(d.parallaxElements, c);
					});
					C.call(x, d);
				};
				f.scroll = d;
				f.getIndex = pa;
				f.one = function (a, b) {
					function c() {
						b.apply(f, arguments);
						f.off(a, c);
					}
					f.on(a, c);
					return f;
				};
				f.on = function (a, b) {
					if ("object" === typeof a)
						for (var c in a) {
							if (aa.call(a, c)) f.on(c, a[c]);
						}
					else if ("function" === typeof b) {
						c = a.split(" ");
						for (var d = 0, g = c.length; d < g; d++)
							(h[c[d]] = h[c[d]] || []),
								-1 === p(c[d], b) && C.call(h[c[d]], b);
					} else if ("array" === typeof b)
						for (c = 0, d = b.length; c < d; c++) f.on(a, b[c]);
					return f;
				};
				f.off = function (a, c) {
					if (c instanceof Array)
						for (var b = 0, d = c.length; b < d; b++)
							f.off(a, c[b]);
					else
						for (
							var b = a.split(" "), d = 0, g = b.length;
							d < g;
							d++
						)
							if (
								((h[b[d]] = h[b[d]] || []),
								"undefined" === typeof c)
							)
								h[b[d]].length = 0;
							else {
								var k = p(b[d], c);
								-1 !== k && Z.call(h[b[d]], k, 1);
							}
					return f;
				};
				f.set = function (a, b) {
					e.isPlainObject(a)
						? e.extend(t, a)
						: aa.call(t, a) && (t[a] = b);
					k();
					return f;
				};
				f.destroy = function () {
					N(window, "resize", l);
					N(a, "scroll", d);
					e.each(w, function (b, c) {
						b && b.frame === a && Z.call(q.instances, c, 1);
					});
					x.length = 0;
					f.initialized = !1;
					u("destroy");
					return f;
				};
				f.init = function () {
					if (!f.initialized)
						return (
							f.on(c),
							k(),
							M(window, "resize", l),
							M(a, "scroll", d),
							C.call(q.instances, f),
							(f.initialized = !0),
							u("initialized"),
							f
						);
				};
			}
		};
	q.instances = [];
	(function () {
		var a, g, c, k, l, d, b, e;
		L = function (u, p) {
			g = u.ownerDocument || u;
			c = g.documentElement;
			k = Y(p) ? p : g.defaultView || window;
			p = p && p !== g ? p : c;
			l = (k.pageYOffset || c.scrollTop) - c.clientTop;
			d = (k.pageXOffset || c.scrollLeft) - c.clientLeft;
			b = { top: 0, left: 0 };
			if (u && u.getBoundingClientRect) {
				var f = {},
					q = u.getBoundingClientRect();
				for (a in q) f[a] = q[a];
				b = f;
				b.width = b.right - b.left;
				b.height = b.bottom - b.top;
			} else return null;
			if (p === k) return b;
			b.top += l;
			b.left += d;
			b.right += d;
			b.bottom += l;
			if (p === c) return b;
			e = L(p);
			b.left -= e.left;
			b.right -= e.left;
			b.top -= e.top;
			b.bottom -= e.top;
			return b;
		};
	})();
	(function () {
		function a() {
			this.returnValue = !1;
		}
		function g() {
			this.cancelBubble = !0;
		}
		M = window.addEventListener
			? function (a, g, e, d) {
					a.addEventListener(g, e, d || !1);
					return e;
			  }
			: function (c, e, l) {
					var d = e + l;
					c[d] =
						c[d] ||
						function () {
							var b = window.event;
							b.target = b.srcElement;
							b.preventDefault = a;
							b.stopPropagation = g;
							l.call(c, b);
						};
					c.attachEvent("on" + e, c[d]);
					return l;
			  };
		N = window.removeEventListener
			? function (a, g, e, d) {
					a.removeEventListener(g, e, d || !1);
					return e;
			  }
			: function (a, g, e) {
					var d = g + e;
					a.detachEvent("on" + g, a[d]);
					try {
						delete a[d];
					} catch (b) {
						a[d] = void 0;
					}
					return e;
			  };
	})();
	(function () {
		function a(a) {
			for (var e = 0, d = g.length; e < d; e++) {
				var b = g[e]
					? g[e] + a.charAt(0).toUpperCase() + a.slice(1)
					: a;
				if (null != c.style[b]) return b;
			}
		}
		var g = ["", "webkit", "moz", "ms", "o"],
			c = document.createElement("div");
		da = a("transform");
		ea = a("perspective") ? "translateZ(0) " : "";
	})();
	q.defaults = {
		horizontal: !1,
		offset: 0,
		parentSelector: null,
		elementsSelector: null,
		performanceTrick: !1,
	};
	window.Scrollax = q;
	e.fn.Scrollax = function (a, g) {
		var c, k;
		if (!e.isPlainObject(a)) {
			if ("string" === typeof a || !1 === a)
				(c = !1 === a ? "destroy" : a), (k = slice.call(arguments, 1));
			a = {};
		}
		return this.each(function (l, d) {
			var b = e.data(d, "scrollax");
			b || c
				? b && c && b[c] && b[c].apply(b, k)
				: e.data(d, "scrollax", new q(d, a, g).init());
		});
	};
	e.Scrollax = function (a, e) {
		ba.Scrollax(a, e);
	};
	var v = document.head || document.getElementsByTagName("head")[0],
		w = document.createElement("style");
	w.type = "text/css";
	w.styleSheet
		? (w.styleSheet.cssText =
				".scrollax-performance, .scrollax-performance *, .scrollax-performance *:before, .scrollax-performance *:after { pointer-events: none !important; -webkit-animation-play-state: paused !important; animation-play-state: paused !important; };")
		: w.appendChild(
				document.createTextNode(
					".scrollax-performance, .scrollax-performance *, .scrollax-performance *:before, .scrollax-performance *:after { pointer-events: none !important; -webkit-animation-play-state: paused !important; animation-play-state: paused !important; };"
				)
		  );
	v.appendChild(w);
	return q;
});
// appear
(function ($) {
	$.fn.appear = function (f, o) {
		var s = $.extend({ one: true }, o);
		return this.each(function () {
			var t = $(this);
			t.appeared = false;
			if (!f) {
				t.trigger("appear", s.data);
				return;
			}
			var w = $(window);
			var c = function () {
				if (!t.is(":visible")) {
					t.appeared = false;
					return;
				}
				var a = w.scrollLeft();
				var b = w.scrollTop();
				var o = t.offset();
				var x = o.left;
				var y = o.top;
				if (
					y + t.height() >= b &&
					y <= b + w.height() &&
					x + t.width() >= a &&
					x <= a + w.width()
				) {
					if (!t.appeared) t.trigger("appear", s.data);
				} else {
					t.appeared = false;
				}
			};
			var m = function () {
				t.appeared = true;
				if (s.one) {
					w.unbind("scroll", c);
					var i = $.inArray(c, $.fn.appear.checks);
					if (i >= 0) $.fn.appear.checks.splice(i, 1);
				}
				f.apply(this, arguments);
			};
			if (s.one) t.one("appear", s.data, m);
			else t.bind("appear", s.data, m);
			w.scroll(c);
			$.fn.appear.checks.push(c);
			c();
		});
	};
	$.extend($.fn.appear, {
		checks: [],
		timeout: null,
		checkAll: function () {
			var l = $.fn.appear.checks.length;
			if (l > 0) while (l--) $.fn.appear.checks[l]();
		},
		run: function () {
			if ($.fn.appear.timeout) clearTimeout($.fn.appear.timeout);
			$.fn.appear.timeout = setTimeout($.fn.appear.checkAll, 20);
		},
	});
	$.each(
		[
			"append",
			"prepend",
			"after",
			"before",
			"attr",
			"removeAttr",
			"addClass",
			"removeClass",
			"toggleClass",
			"remove",
			"css",
			"show",
			"hide",
		],
		function (i, n) {
			var u = $.fn[n];
			if (u) {
				$.fn[n] = function () {
					var r = u.apply(this, arguments);
					$.fn.appear.run();
					return r;
				};
			}
		}
	);
})(jQuery);

/**
 * Single Page Nav Plugin
 * Copyright (c) 2014 Chris Wojcik <hello@chriswojcik.net>
 * Dual licensed under MIT and GPL.
 * @author Chris Wojcik
 * @version 1.2.0
 */

// Utility
if (typeof Object.create !== "function") {
	Object.create = function (obj) {
		function F() {}
		F.prototype = obj;
		return new F();
	};
}
(function ($, window, document, undefined) {
	"use strict";
	var SinglePageNav = {
		init: function (options, container) {
			this.options = $.extend({}, $.fn.singlePageNav.defaults, options);
			this.container = container;
			this.$container = $(container);
			this.$links = this.$container.find("a");
			if (this.options.filter !== "") {
				this.$links = this.$links.filter(this.options.filter);
			}
			this.$window = $(window);
			this.$htmlbody = $("html, body");
			this.$links.on(
				"click.singlePageNav",
				$.proxy(this.handleClick, this)
			);
			this.didScroll = false;
			this.checkPosition();
			this.setTimer();
		},
		handleClick: function (e) {
			var self = this,
				link = e.currentTarget,
				$elem = $(link.hash);
			e.preventDefault();
			if ($elem.length) {
				self.clearTimer();
				if (typeof self.options.beforeStart === "function") {
					self.options.beforeStart();
				}
				self.setActiveLink(link.hash);
				self.scrollTo($elem, function () {
					if (self.options.updateHash && history.pushState) {
						history.pushState(null, null, link.hash);
					}
					self.setTimer();
					if (typeof self.options.onComplete === "function") {
						self.options.onComplete();
					}
				});
			}
		},
		scrollTo: function ($elem, callback) {
			var self = this;
			var target = self.getCoords($elem).top;
			var called = false;
			self.$htmlbody.stop().animate(
				{ scrollTop: target },
				{
					duration: self.options.speed,
					easing: self.options.easing,
					complete: function () {
						if (typeof callback === "function" && !called) {
							callback();
						}
						called = true;
					},
				}
			);
		},
		setTimer: function () {
			var self = this;
			self.$window.on("scroll.singlePageNav", function () {
				self.didScroll = true;
			});
			self.timer = setInterval(function () {
				if (self.didScroll) {
					self.didScroll = false;
					self.checkPosition();
				}
			}, 250);
		},
		clearTimer: function () {
			clearInterval(this.timer);
			this.$window.off("scroll.singlePageNav");
			this.didScroll = false;
		},
		checkPosition: function () {
			var scrollPos = this.$window.scrollTop();
			var currentSection = this.getCurrentSection(scrollPos);
			if (currentSection !== null) {
				this.setActiveLink(currentSection);
			}
		},
		getCoords: function ($elem) {
			return {
				top: Math.round($elem.offset().top) - this.options.offset,
			};
		},
		setActiveLink: function (href) {
			var $activeLink = this.$container.find("a[href$='" + href + "']");
			if (!$activeLink.hasClass(this.options.currentClass)) {
				this.$links.removeClass(this.options.currentClass);
				$activeLink.addClass(this.options.currentClass);
				if ($(".scroll-nav  a").hasClass("act-link"))
					$(".scroll-nav  a.act-link").each(function () {
						var a = $(this).data("bgscr"),
							b = $(this).data("bgtex");
						var ua = window.navigator.userAgent;
						var msie = ua.indexOf("MSIE ");
						if (
							msie > 0 ||
							!!navigator.userAgent.match(/Trident.*rv\:11\./)
						) {
							$(".bg-title span").html(b);
						}
						setTimeout(function () {}, 700);
					});
			}
		},
		getCurrentSection: function (scrollPos) {
			var i, hash, coords, section;
			for (i = 0; i < this.$links.length; i++) {
				hash = this.$links[i].hash;
				if ($(hash).length) {
					coords = this.getCoords($(hash));
					if (scrollPos >= coords.top - this.options.threshold) {
						section = hash;
					}
				}
			}
			return (
				section ||
				(this.$links.length === 0 ? null : this.$links[0].hash)
			);
		},
	};
	$.fn.singlePageNav = function (options) {
		return this.each(function () {
			var singlePageNav = Object.create(SinglePageNav);
			singlePageNav.init(options, this);
		});
	};
	$.fn.singlePageNav.defaults = {
		offset: 0,
		threshold: 120,
		speed: 400,
		currentClass: "current",
		easing: "swing",
		updateHash: false,
		filter: "",
		onComplete: false,
		beforeStart: false,
	};
})(jQuery, window, document);
// ScrollToFixed
(function (a) {
	a.isScrollToFixed = function (b) {
		return !!a(b).data("ScrollToFixed");
	};
	a.ScrollToFixed = function (d, i) {
		var l = this;
		l.$el = a(d);
		l.el = d;
		l.$el.data("ScrollToFixed", l);
		var c = false;
		var G = l.$el;
		var H;
		var E;
		var e;
		var y;
		var D = 0;
		var q = 0;
		var j = -1;
		var f = -1;
		var t = null;
		var z;
		var g;
		function u() {
			G.trigger("preUnfixed.ScrollToFixed");
			k();
			G.trigger("unfixed.ScrollToFixed");
			f = -1;
			D = G.offset().top;
			q = G.offset().left;
			if (l.options.offsets) {
				q += G.offset().left - G.position().left;
			}
			if (j == -1) {
				j = q;
			}
			H = G.css("position");
			c = true;
			if (l.options.bottom != -1) {
				G.trigger("preFixed.ScrollToFixed");
				w();
				G.trigger("fixed.ScrollToFixed");
			}
		}
		function n() {
			var I = l.options.limit;
			if (!I) {
				return 0;
			}
			if (typeof I === "function") {
				return I.apply(G);
			}
			return I;
		}
		function p() {
			return H === "fixed";
		}
		function x() {
			return H === "absolute";
		}
		function h() {
			return !(p() || x());
		}
		function w() {
			if (!p()) {
				t.css({
					display: G.css("display"),
					width: G.outerWidth(true),
					height: G.outerHeight(true),
					float: G.css("float"),
				});
				cssOptions = {
					"z-index": l.options.zIndex,
					position: "fixed",
					top: l.options.bottom == -1 ? s() : "",
					bottom: l.options.bottom == -1 ? "" : l.options.bottom,
					"margin-left": "0px",
				};
				if (!l.options.dontSetWidth) {
					cssOptions.width = G.width();
				}
				G.css(cssOptions);
				G.addClass(l.options.baseClassName);
				if (l.options.className) {
					G.addClass(l.options.className);
				}
				H = "fixed";
			}
		}
		function b() {
			var J = n();
			var I = q;
			if (l.options.removeOffsets) {
				I = "";
				J = J - D;
			}
			cssOptions = {
				position: "absolute",
				top: J,
				left: I,
				"margin-left": "0px",
				bottom: "",
			};
			if (!l.options.dontSetWidth) {
				cssOptions.width = G.width();
			}
			G.css(cssOptions);
			H = "absolute";
		}
		function k() {
			if (!h()) {
				f = -1;
				t.css("display", "none");
				G.css({
					"z-index": y,
					width: "",
					position: E,
					left: "",
					top: e,
					"margin-left": "",
				});
				G.removeClass("scroll-to-fixed-fixed");
				if (l.options.className) {
					G.removeClass(l.options.className);
				}
				H = null;
			}
		}
		function v(I) {
			if (I != f) {
				G.css("left", q - I);
				f = I;
			}
		}
		function s() {
			var I = l.options.marginTop;
			if (!I) {
				return 0;
			}
			if (typeof I === "function") {
				return I.apply(G);
			}
			return I;
		}
		function A() {
			if (!a.isScrollToFixed(G)) {
				return;
			}
			var K = c;
			if (!c) {
				u();
			} else {
				if (h()) {
					D = G.offset().top;
					q = G.offset().left;
				}
			}
			var I = a(window).scrollLeft();
			var L = a(window).scrollTop();
			var J = n();
			if (l.options.minWidth && a(window).width() < l.options.minWidth) {
				if (!h() || !K) {
					o();
					G.trigger("preUnfixed.ScrollToFixed");
					k();
					G.trigger("unfixed.ScrollToFixed");
				}
			} else {
				if (
					l.options.maxWidth &&
					a(window).width() > l.options.maxWidth
				) {
					if (!h() || !K) {
						o();
						G.trigger("preUnfixed.ScrollToFixed");
						k();
						G.trigger("unfixed.ScrollToFixed");
					}
				} else {
					if (l.options.bottom == -1) {
						if (J > 0 && L >= J - s()) {
							if (!x() || !K) {
								o();
								G.trigger("preAbsolute.ScrollToFixed");
								b();
								G.trigger("unfixed.ScrollToFixed");
							}
						} else {
							if (L >= D - s()) {
								if (!p() || !K) {
									o();
									G.trigger("preFixed.ScrollToFixed");
									w();
									f = -1;
									G.trigger("fixed.ScrollToFixed");
								}
								v(I);
							} else {
								if (!h() || !K) {
									o();
									G.trigger("preUnfixed.ScrollToFixed");
									k();
									G.trigger("unfixed.ScrollToFixed");
								}
							}
						}
					} else {
						if (J > 0) {
							if (
								L + a(window).height() - G.outerHeight(true) >=
								J - (s() || -m())
							) {
								if (p()) {
									o();
									G.trigger("preUnfixed.ScrollToFixed");
									if (E === "absolute") {
										b();
									} else {
										k();
									}
									G.trigger("unfixed.ScrollToFixed");
								}
							} else {
								if (!p()) {
									o();
									G.trigger("preFixed.ScrollToFixed");
									w();
								}
								v(I);
								G.trigger("fixed.ScrollToFixed");
							}
						} else {
							v(I);
						}
					}
				}
			}
		}
		function m() {
			if (!l.options.bottom) {
				return 0;
			}
			return l.options.bottom;
		}
		function o() {
			var I = G.css("position");
			if (I == "absolute") {
				G.trigger("postAbsolute.ScrollToFixed");
			} else {
				if (I == "fixed") {
					G.trigger("postFixed.ScrollToFixed");
				} else {
					G.trigger("postUnfixed.ScrollToFixed");
				}
			}
		}
		var C = function (I) {
			if (G.is(":visible")) {
				c = false;
				A();
			}
		};
		var F = function (I) {
			!!window.requestAnimationFrame ? requestAnimationFrame(A) : A();
		};
		var B = function () {
			var J = document.body;
			if (document.createElement && J && J.appendChild && J.removeChild) {
				var L = document.createElement("div");
				if (!L.getBoundingClientRect) {
					return null;
				}
				L.innerHTML = "x";
				L.style.cssText = "position:fixed;top:100px;";
				J.appendChild(L);
				var M = J.style.height,
					N = J.scrollTop;
				J.style.height = "3000px";
				J.scrollTop = 500;
				var I = L.getBoundingClientRect().top;
				J.style.height = M;
				var K = I === 100;
				J.removeChild(L);
				J.scrollTop = N;
				return K;
			}
			return null;
		};
		var r = function (I) {
			I = I || window.event;
			if (I.preventDefault) {
				I.preventDefault();
			}
			I.returnValue = false;
		};
		l.init = function () {
			l.options = a.extend({}, a.ScrollToFixed.defaultOptions, i);
			y = G.css("z-index");
			l.$el.css("z-index", l.options.zIndex);
			t = a("<div />");
			H = G.css("position");
			E = G.css("position");
			e = G.css("top");
			if (h()) {
				l.$el.after(t);
			}
			a(window).bind("resize.ScrollToFixed", C);
			a(window).bind("scroll.ScrollToFixed", F);
			if ("ontouchmove" in window) {
				a(window).bind("touchmove.ScrollToFixed", A);
			}
			if (l.options.preFixed) {
				G.bind("preFixed.ScrollToFixed", l.options.preFixed);
			}
			if (l.options.postFixed) {
				G.bind("postFixed.ScrollToFixed", l.options.postFixed);
			}
			if (l.options.preUnfixed) {
				G.bind("preUnfixed.ScrollToFixed", l.options.preUnfixed);
			}
			if (l.options.postUnfixed) {
				G.bind("postUnfixed.ScrollToFixed", l.options.postUnfixed);
			}
			if (l.options.preAbsolute) {
				G.bind("preAbsolute.ScrollToFixed", l.options.preAbsolute);
			}
			if (l.options.postAbsolute) {
				G.bind("postAbsolute.ScrollToFixed", l.options.postAbsolute);
			}
			if (l.options.fixed) {
				G.bind("fixed.ScrollToFixed", l.options.fixed);
			}
			if (l.options.unfixed) {
				G.bind("unfixed.ScrollToFixed", l.options.unfixed);
			}
			if (l.options.spacerClass) {
				t.addClass(l.options.spacerClass);
			}
			G.bind("resize.ScrollToFixed", function () {
				t.height(G.height());
			});
			G.bind("scroll.ScrollToFixed", function () {
				G.trigger("preUnfixed.ScrollToFixed");
				k();
				G.trigger("unfixed.ScrollToFixed");
				A();
			});
			G.bind("detach.ScrollToFixed", function (I) {
				r(I);
				G.trigger("preUnfixed.ScrollToFixed");
				k();
				G.trigger("unfixed.ScrollToFixed");
				a(window).unbind("resize.ScrollToFixed", C);
				a(window).unbind("scroll.ScrollToFixed", F);
				G.unbind(".ScrollToFixed");
				t.remove();
				l.$el.removeData("ScrollToFixed");
			});
			C();
		};
		l.init();
	};
	a.ScrollToFixed.defaultOptions = {
		marginTop: 0,
		limit: 0,
		bottom: -1,
		zIndex: 1000,
		baseClassName: "scroll-to-fixed-fixed",
	};
	a.fn.scrollToFixed = function (b) {
		return this.each(function () {
			new a.ScrollToFixed(this, b);
		});
	};
})(jQuery);
// count
(function ($) {
	$.fn.countTo = function (options) {
		options = options || {};
		return $(this).each(function () {
			var settings = $.extend(
				{},
				$.fn.countTo.defaults,
				{
					from: $(this).data("from"),
					to: $(this).data("num"),
					speed: $(this).data("speed"),
					refreshInterval: $(this).data("refresh-interval"),
					decimals: $(this).data("decimals"),
				},
				options
			);
			var loops = Math.ceil(settings.speed / settings.refreshInterval),
				increment = (settings.to - settings.from) / loops;
			var self = this,
				$self = $(this),
				loopCount = 0,
				value = settings.from,
				data = $self.data("countTo") || {};
			$self.data("countTo", data);
			if (data.interval) {
				clearInterval(data.interval);
			}
			data.interval = setInterval(updateTimer, settings.refreshInterval);
			render(value);
			function updateTimer() {
				value += increment;
				loopCount++;
				render(value);
				if (typeof settings.onUpdate == "function") {
					settings.onUpdate.call(self, value);
				}
				if (loopCount >= loops) {
					$self.removeData("countTo");
					clearInterval(data.interval);
					value = settings.to;
					if (typeof settings.onComplete == "function") {
						settings.onComplete.call(self, value);
					}
				}
			}
			function render(value) {
				var formattedValue = settings.formatter.call(
					self,
					value,
					settings
				);
				$self.text(formattedValue);
			}
		});
	};
	$.fn.countTo.defaults = {
		from: 0,
		to: 0,
		speed: 2500,
		refreshInterval: 100,
		decimals: 0,
		formatter: formatter,
		onUpdate: null,
		onComplete: null,
	};
	function formatter(value, settings) {
		return value.toFixed(settings.decimals);
	}
})(jQuery);

/*  TweenMax js */
var _gsScope =
	"undefined" != typeof module &&
	module.exports &&
	"undefined" != typeof global
		? global
		: this || window;
(_gsScope._gsQueue || (_gsScope._gsQueue = [])).push(function () {
	"use strict";
	_gsScope._gsDefine(
		"TweenMax",
		["core.Animation", "core.SimpleTimeline", "TweenLite"],
		function (a, b, c) {
			var d = function (a) {
					var b,
						c = [],
						d = a.length;
					for (b = 0; b !== d; c.push(a[b++]));
					return c;
				},
				e = function (a, b, c) {
					var d,
						e,
						f = a.cycle;
					for (d in f)
						(e = f[d]),
							(a[d] =
								"function" == typeof e
									? e(c, b[c])
									: e[c % e.length]);
					delete a.cycle;
				},
				f = function (a, b, d) {
					c.call(this, a, b, d),
						(this._cycle = 0),
						(this._yoyo =
							this.vars.yoyo === !0 || !!this.vars.yoyoEase),
						(this._repeat = this.vars.repeat || 0),
						(this._repeatDelay = this.vars.repeatDelay || 0),
						this._repeat && this._uncache(!0),
						(this.render = f.prototype.render);
				},
				g = 1e-10,
				h = c._internals,
				i = h.isSelector,
				j = h.isArray,
				k = (f.prototype = c.to({}, 0.1, {})),
				l = [];
			(f.version = "1.20.3"),
				(k.constructor = f),
				(k.kill()._gc = !1),
				(f.killTweensOf = f.killDelayedCallsTo = c.killTweensOf),
				(f.getTweensOf = c.getTweensOf),
				(f.lagSmoothing = c.lagSmoothing),
				(f.ticker = c.ticker),
				(f.render = c.render),
				(k.invalidate = function () {
					return (
						(this._yoyo =
							this.vars.yoyo === !0 || !!this.vars.yoyoEase),
						(this._repeat = this.vars.repeat || 0),
						(this._repeatDelay = this.vars.repeatDelay || 0),
						(this._yoyoEase = null),
						this._uncache(!0),
						c.prototype.invalidate.call(this)
					);
				}),
				(k.updateTo = function (a, b) {
					var d,
						e = this.ratio,
						f = this.vars.immediateRender || a.immediateRender;
					b &&
						this._startTime < this._timeline._time &&
						((this._startTime = this._timeline._time),
						this._uncache(!1),
						this._gc
							? this._enabled(!0, !1)
							: this._timeline.insert(
									this,
									this._startTime - this._delay
							  ));
					for (d in a) this.vars[d] = a[d];
					if (this._initted || f)
						if (b)
							(this._initted = !1), f && this.render(0, !0, !0);
						else if (
							(this._gc && this._enabled(!0, !1),
							this._notifyPluginsOfEnabled &&
								this._firstPT &&
								c._onPluginEvent("_onDisable", this),
							this._time / this._duration > 0.998)
						) {
							var g = this._totalTime;
							this.render(0, !0, !1),
								(this._initted = !1),
								this.render(g, !0, !1);
						} else if (
							((this._initted = !1),
							this._init(),
							this._time > 0 || f)
						)
							for (var h, i = 1 / (1 - e), j = this._firstPT; j; )
								(h = j.s + j.c),
									(j.c *= i),
									(j.s = h - j.c),
									(j = j._next);
					return this;
				}),
				(k.render = function (a, b, d) {
					this._initted ||
						(0 === this._duration &&
							this.vars.repeat &&
							this.invalidate());
					var e,
						f,
						i,
						j,
						k,
						l,
						m,
						n,
						o,
						p = this._dirty
							? this.totalDuration()
							: this._totalDuration,
						q = this._time,
						r = this._totalTime,
						s = this._cycle,
						t = this._duration,
						u = this._rawPrevTime;
					if (
						(a >= p - 1e-7 && a >= 0
							? ((this._totalTime = p),
							  (this._cycle = this._repeat),
							  this._yoyo && 0 !== (1 & this._cycle)
									? ((this._time = 0),
									  (this.ratio = this._ease._calcEnd
											? this._ease.getRatio(0)
											: 0))
									: ((this._time = t),
									  (this.ratio = this._ease._calcEnd
											? this._ease.getRatio(1)
											: 1)),
							  this._reversed ||
									((e = !0),
									(f = "onComplete"),
									(d =
										d ||
										this._timeline.autoRemoveChildren)),
							  0 === t &&
									(this._initted || !this.vars.lazy || d) &&
									(this._startTime ===
										this._timeline._duration && (a = 0),
									(0 > u ||
										(0 >= a && a >= -1e-7) ||
										(u === g && "isPause" !== this.data)) &&
										u !== a &&
										((d = !0),
										u > g && (f = "onReverseComplete")),
									(this._rawPrevTime = n =
										!b || a || u === a ? a : g)))
							: 1e-7 > a
							? ((this._totalTime = this._time = this._cycle = 0),
							  (this.ratio = this._ease._calcEnd
									? this._ease.getRatio(0)
									: 0),
							  (0 !== r || (0 === t && u > 0)) &&
									((f = "onReverseComplete"),
									(e = this._reversed)),
							  0 > a &&
									((this._active = !1),
									0 === t &&
										(this._initted ||
											!this.vars.lazy ||
											d) &&
										(u >= 0 && (d = !0),
										(this._rawPrevTime = n =
											!b || a || u === a ? a : g))),
							  this._initted || (d = !0))
							: ((this._totalTime = this._time = a),
							  0 !== this._repeat &&
									((j = t + this._repeatDelay),
									(this._cycle = (this._totalTime / j) >> 0),
									0 !== this._cycle &&
										this._cycle === this._totalTime / j &&
										a >= r &&
										this._cycle--,
									(this._time =
										this._totalTime - this._cycle * j),
									this._yoyo &&
										0 !== (1 & this._cycle) &&
										((this._time = t - this._time),
										(o =
											this._yoyoEase ||
											this.vars.yoyoEase),
										o &&
											(this._yoyoEase ||
												(o !== !0 || this._initted
													? (this._yoyoEase = o =
															o === !0
																? this._ease
																: o instanceof
																  Ease
																? o
																: Ease.map[o])
													: ((o = this.vars.ease),
													  (this._yoyoEase = o =
															o
																? o instanceof
																  Ease
																	? o
																	: "function" ==
																	  typeof o
																	? new Ease(
																			o,
																			this.vars.easeParams
																	  )
																	: Ease.map[
																			o
																	  ] ||
																	  c.defaultEase
																: c.defaultEase))),
											(this.ratio = o
												? 1 -
												  o.getRatio(
														(t - this._time) / t
												  )
												: 0))),
									this._time > t
										? (this._time = t)
										: this._time < 0 && (this._time = 0)),
							  this._easeType && !o
									? ((k = this._time / t),
									  (l = this._easeType),
									  (m = this._easePower),
									  (1 === l || (3 === l && k >= 0.5)) &&
											(k = 1 - k),
									  3 === l && (k *= 2),
									  1 === m
											? (k *= k)
											: 2 === m
											? (k *= k * k)
											: 3 === m
											? (k *= k * k * k)
											: 4 === m && (k *= k * k * k * k),
									  1 === l
											? (this.ratio = 1 - k)
											: 2 === l
											? (this.ratio = k)
											: this._time / t < 0.5
											? (this.ratio = k / 2)
											: (this.ratio = 1 - k / 2))
									: o ||
									  (this.ratio = this._ease.getRatio(
											this._time / t
									  ))),
						q === this._time && !d && s === this._cycle)
					)
						return void (
							r !== this._totalTime &&
							this._onUpdate &&
							(b || this._callback("onUpdate"))
						);
					if (!this._initted) {
						if ((this._init(), !this._initted || this._gc)) return;
						if (
							!d &&
							this._firstPT &&
							((this.vars.lazy !== !1 && this._duration) ||
								(this.vars.lazy && !this._duration))
						)
							return (
								(this._time = q),
								(this._totalTime = r),
								(this._rawPrevTime = u),
								(this._cycle = s),
								h.lazyTweens.push(this),
								void (this._lazy = [a, b])
							);
						!this._time || e || o
							? e &&
							  this._ease._calcEnd &&
							  !o &&
							  (this.ratio = this._ease.getRatio(
									0 === this._time ? 0 : 1
							  ))
							: (this.ratio = this._ease.getRatio(
									this._time / t
							  ));
					}
					for (
						this._lazy !== !1 && (this._lazy = !1),
							this._active ||
								(!this._paused &&
									this._time !== q &&
									a >= 0 &&
									(this._active = !0)),
							0 === r &&
								(2 === this._initted && a > 0 && this._init(),
								this._startAt &&
									(a >= 0
										? this._startAt.render(a, !0, d)
										: f || (f = "_dummyGS")),
								this.vars.onStart &&
									(0 !== this._totalTime || 0 === t) &&
									(b || this._callback("onStart"))),
							i = this._firstPT;
						i;

					)
						i.f
							? i.t[i.p](i.c * this.ratio + i.s)
							: (i.t[i.p] = i.c * this.ratio + i.s),
							(i = i._next);
					this._onUpdate &&
						(0 > a &&
							this._startAt &&
							this._startTime &&
							this._startAt.render(a, !0, d),
						b ||
							((this._totalTime !== r || f) &&
								this._callback("onUpdate"))),
						this._cycle !== s &&
							(b ||
								this._gc ||
								(this.vars.onRepeat &&
									this._callback("onRepeat"))),
						f &&
							(!this._gc || d) &&
							(0 > a &&
								this._startAt &&
								!this._onUpdate &&
								this._startTime &&
								this._startAt.render(a, !0, d),
							e &&
								(this._timeline.autoRemoveChildren &&
									this._enabled(!1, !1),
								(this._active = !1)),
							!b && this.vars[f] && this._callback(f),
							0 === t &&
								this._rawPrevTime === g &&
								n !== g &&
								(this._rawPrevTime = 0));
				}),
				(f.to = function (a, b, c) {
					return new f(a, b, c);
				}),
				(f.from = function (a, b, c) {
					return (
						(c.runBackwards = !0),
						(c.immediateRender = 0 != c.immediateRender),
						new f(a, b, c)
					);
				}),
				(f.fromTo = function (a, b, c, d) {
					return (
						(d.startAt = c),
						(d.immediateRender =
							0 != d.immediateRender && 0 != c.immediateRender),
						new f(a, b, d)
					);
				}),
				(f.staggerTo = f.allTo =
					function (a, b, g, h, k, m, n) {
						h = h || 0;
						var o,
							p,
							q,
							r,
							s = 0,
							t = [],
							u = function () {
								g.onComplete &&
									g.onComplete.apply(
										g.onCompleteScope || this,
										arguments
									),
									k.apply(
										n || g.callbackScope || this,
										m || l
									);
							},
							v = g.cycle,
							w = g.startAt && g.startAt.cycle;
						for (
							j(a) ||
								("string" == typeof a &&
									(a = c.selector(a) || a),
								i(a) && (a = d(a))),
								a = a || [],
								0 > h && ((a = d(a)), a.reverse(), (h *= -1)),
								o = a.length - 1,
								q = 0;
							o >= q;
							q++
						) {
							p = {};
							for (r in g) p[r] = g[r];
							if (
								(v &&
									(e(p, a, q),
									null != p.duration &&
										((b = p.duration), delete p.duration)),
								w)
							) {
								w = p.startAt = {};
								for (r in g.startAt) w[r] = g.startAt[r];
								e(p.startAt, a, q);
							}
							(p.delay = s + (p.delay || 0)),
								q === o && k && (p.onComplete = u),
								(t[q] = new f(a[q], b, p)),
								(s += h);
						}
						return t;
					}),
				(f.staggerFrom = f.allFrom =
					function (a, b, c, d, e, g, h) {
						return (
							(c.runBackwards = !0),
							(c.immediateRender = 0 != c.immediateRender),
							f.staggerTo(a, b, c, d, e, g, h)
						);
					}),
				(f.staggerFromTo = f.allFromTo =
					function (a, b, c, d, e, g, h, i) {
						return (
							(d.startAt = c),
							(d.immediateRender =
								0 != d.immediateRender &&
								0 != c.immediateRender),
							f.staggerTo(a, b, d, e, g, h, i)
						);
					}),
				(f.delayedCall = function (a, b, c, d, e) {
					return new f(b, 0, {
						delay: a,
						onComplete: b,
						onCompleteParams: c,
						callbackScope: d,
						onReverseComplete: b,
						onReverseCompleteParams: c,
						immediateRender: !1,
						useFrames: e,
						overwrite: 0,
					});
				}),
				(f.set = function (a, b) {
					return new f(a, 0, b);
				}),
				(f.isTweening = function (a) {
					return c.getTweensOf(a, !0).length > 0;
				});
			var m = function (a, b) {
					for (var d = [], e = 0, f = a._first; f; )
						f instanceof c
							? (d[e++] = f)
							: (b && (d[e++] = f),
							  (d = d.concat(m(f, b))),
							  (e = d.length)),
							(f = f._next);
					return d;
				},
				n = (f.getAllTweens = function (b) {
					return m(a._rootTimeline, b).concat(
						m(a._rootFramesTimeline, b)
					);
				});
			(f.killAll = function (a, c, d, e) {
				null == c && (c = !0), null == d && (d = !0);
				var f,
					g,
					h,
					i = n(0 != e),
					j = i.length,
					k = c && d && e;
				for (h = 0; j > h; h++)
					(g = i[h]),
						(k ||
							g instanceof b ||
							((f = g.target === g.vars.onComplete) && d) ||
							(c && !f)) &&
							(a
								? g.totalTime(
										g._reversed ? 0 : g.totalDuration()
								  )
								: g._enabled(!1, !1));
			}),
				(f.killChildTweensOf = function (a, b) {
					if (null != a) {
						var e,
							g,
							k,
							l,
							m,
							n = h.tweenLookup;
						if (
							("string" == typeof a && (a = c.selector(a) || a),
							i(a) && (a = d(a)),
							j(a))
						)
							for (l = a.length; --l > -1; )
								f.killChildTweensOf(a[l], b);
						else {
							e = [];
							for (k in n)
								for (g = n[k].target.parentNode; g; )
									g === a && (e = e.concat(n[k].tweens)),
										(g = g.parentNode);
							for (m = e.length, l = 0; m > l; l++)
								b && e[l].totalTime(e[l].totalDuration()),
									e[l]._enabled(!1, !1);
						}
					}
				});
			var o = function (a, c, d, e) {
				(c = c !== !1), (d = d !== !1), (e = e !== !1);
				for (
					var f, g, h = n(e), i = c && d && e, j = h.length;
					--j > -1;

				)
					(g = h[j]),
						(i ||
							g instanceof b ||
							((f = g.target === g.vars.onComplete) && d) ||
							(c && !f)) &&
							g.paused(a);
			};
			return (
				(f.pauseAll = function (a, b, c) {
					o(!0, a, b, c);
				}),
				(f.resumeAll = function (a, b, c) {
					o(!1, a, b, c);
				}),
				(f.globalTimeScale = function (b) {
					var d = a._rootTimeline,
						e = c.ticker.time;
					return arguments.length
						? ((b = b || g),
						  (d._startTime =
								e - ((e - d._startTime) * d._timeScale) / b),
						  (d = a._rootFramesTimeline),
						  (e = c.ticker.frame),
						  (d._startTime =
								e - ((e - d._startTime) * d._timeScale) / b),
						  (d._timeScale = a._rootTimeline._timeScale = b),
						  b)
						: d._timeScale;
				}),
				(k.progress = function (a, b) {
					return arguments.length
						? this.totalTime(
								this.duration() *
									(this._yoyo && 0 !== (1 & this._cycle)
										? 1 - a
										: a) +
									this._cycle *
										(this._duration + this._repeatDelay),
								b
						  )
						: this._time / this.duration();
				}),
				(k.totalProgress = function (a, b) {
					return arguments.length
						? this.totalTime(this.totalDuration() * a, b)
						: this._totalTime / this.totalDuration();
				}),
				(k.time = function (a, b) {
					return arguments.length
						? (this._dirty && this.totalDuration(),
						  a > this._duration && (a = this._duration),
						  this._yoyo && 0 !== (1 & this._cycle)
								? (a =
										this._duration -
										a +
										this._cycle *
											(this._duration +
												this._repeatDelay))
								: 0 !== this._repeat &&
								  (a +=
										this._cycle *
										(this._duration + this._repeatDelay)),
						  this.totalTime(a, b))
						: this._time;
				}),
				(k.duration = function (b) {
					return arguments.length
						? a.prototype.duration.call(this, b)
						: this._duration;
				}),
				(k.totalDuration = function (a) {
					return arguments.length
						? -1 === this._repeat
							? this
							: this.duration(
									(a - this._repeat * this._repeatDelay) /
										(this._repeat + 1)
							  )
						: (this._dirty &&
								((this._totalDuration =
									-1 === this._repeat
										? 999999999999
										: this._duration * (this._repeat + 1) +
										  this._repeatDelay * this._repeat),
								(this._dirty = !1)),
						  this._totalDuration);
				}),
				(k.repeat = function (a) {
					return arguments.length
						? ((this._repeat = a), this._uncache(!0))
						: this._repeat;
				}),
				(k.repeatDelay = function (a) {
					return arguments.length
						? ((this._repeatDelay = a), this._uncache(!0))
						: this._repeatDelay;
				}),
				(k.yoyo = function (a) {
					return arguments.length
						? ((this._yoyo = a), this)
						: this._yoyo;
				}),
				f
			);
		},
		!0
	),
		_gsScope._gsDefine(
			"TimelineLite",
			["core.Animation", "core.SimpleTimeline", "TweenLite"],
			function (a, b, c) {
				var d = function (a) {
						b.call(this, a),
							(this._labels = {}),
							(this.autoRemoveChildren =
								this.vars.autoRemoveChildren === !0),
							(this.smoothChildTiming =
								this.vars.smoothChildTiming === !0),
							(this._sortChildren = !0),
							(this._onUpdate = this.vars.onUpdate);
						var c,
							d,
							e = this.vars;
						for (d in e)
							(c = e[d]),
								i(c) &&
									-1 !== c.join("").indexOf("{self}") &&
									(e[d] = this._swapSelfInParams(c));
						i(e.tweens) &&
							this.add(e.tweens, 0, e.align, e.stagger);
					},
					e = 1e-10,
					f = c._internals,
					g = (d._internals = {}),
					h = f.isSelector,
					i = f.isArray,
					j = f.lazyTweens,
					k = f.lazyRender,
					l = _gsScope._gsDefine.globals,
					m = function (a) {
						var b,
							c = {};
						for (b in a) c[b] = a[b];
						return c;
					},
					n = function (a, b, c) {
						var d,
							e,
							f = a.cycle;
						for (d in f)
							(e = f[d]),
								(a[d] =
									"function" == typeof e
										? e(c, b[c])
										: e[c % e.length]);
						delete a.cycle;
					},
					o = (g.pauseCallback = function () {}),
					p = function (a) {
						var b,
							c = [],
							d = a.length;
						for (b = 0; b !== d; c.push(a[b++]));
						return c;
					},
					q = (d.prototype = new b());
				return (
					(d.version = "1.20.3"),
					(q.constructor = d),
					(q.kill()._gc = q._forcingPlayhead = q._hasPause = !1),
					(q.to = function (a, b, d, e) {
						var f = (d.repeat && l.TweenMax) || c;
						return b
							? this.add(new f(a, b, d), e)
							: this.set(a, d, e);
					}),
					(q.from = function (a, b, d, e) {
						return this.add(
							((d.repeat && l.TweenMax) || c).from(a, b, d),
							e
						);
					}),
					(q.fromTo = function (a, b, d, e, f) {
						var g = (e.repeat && l.TweenMax) || c;
						return b
							? this.add(g.fromTo(a, b, d, e), f)
							: this.set(a, e, f);
					}),
					(q.staggerTo = function (a, b, e, f, g, i, j, k) {
						var l,
							o,
							q = new d({
								onComplete: i,
								onCompleteParams: j,
								callbackScope: k,
								smoothChildTiming: this.smoothChildTiming,
							}),
							r = e.cycle;
						for (
							"string" == typeof a && (a = c.selector(a) || a),
								a = a || [],
								h(a) && (a = p(a)),
								f = f || 0,
								0 > f && ((a = p(a)), a.reverse(), (f *= -1)),
								o = 0;
							o < a.length;
							o++
						)
							(l = m(e)),
								l.startAt &&
									((l.startAt = m(l.startAt)),
									l.startAt.cycle && n(l.startAt, a, o)),
								r &&
									(n(l, a, o),
									null != l.duration &&
										((b = l.duration), delete l.duration)),
								q.to(a[o], b, l, o * f);
						return this.add(q, g);
					}),
					(q.staggerFrom = function (a, b, c, d, e, f, g, h) {
						return (
							(c.immediateRender = 0 != c.immediateRender),
							(c.runBackwards = !0),
							this.staggerTo(a, b, c, d, e, f, g, h)
						);
					}),
					(q.staggerFromTo = function (a, b, c, d, e, f, g, h, i) {
						return (
							(d.startAt = c),
							(d.immediateRender =
								0 != d.immediateRender &&
								0 != c.immediateRender),
							this.staggerTo(a, b, d, e, f, g, h, i)
						);
					}),
					(q.call = function (a, b, d, e) {
						return this.add(c.delayedCall(0, a, b, d), e);
					}),
					(q.set = function (a, b, d) {
						return (
							(d = this._parseTimeOrLabel(d, 0, !0)),
							null == b.immediateRender &&
								(b.immediateRender =
									d === this._time && !this._paused),
							this.add(new c(a, 0, b), d)
						);
					}),
					(d.exportRoot = function (a, b) {
						(a = a || {}),
							null == a.smoothChildTiming &&
								(a.smoothChildTiming = !0);
						var e,
							f,
							g,
							h,
							i = new d(a),
							j = i._timeline;
						for (
							null == b && (b = !0),
								j._remove(i, !0),
								i._startTime = 0,
								i._rawPrevTime =
									i._time =
									i._totalTime =
										j._time,
								g = j._first;
							g;

						)
							(h = g._next),
								(b &&
									g instanceof c &&
									g.target === g.vars.onComplete) ||
									((f = g._startTime - g._delay),
									0 > f && (e = 1),
									i.add(g, f)),
								(g = h);
						return j.add(i, 0), e && i.totalDuration(), i;
					}),
					(q.add = function (e, f, g, h) {
						var j, k, l, m, n, o;
						if (
							("number" != typeof f &&
								(f = this._parseTimeOrLabel(f, 0, !0, e)),
							!(e instanceof a))
						) {
							if (e instanceof Array || (e && e.push && i(e))) {
								for (
									g = g || "normal",
										h = h || 0,
										j = f,
										k = e.length,
										l = 0;
									k > l;
									l++
								)
									i((m = e[l])) && (m = new d({ tweens: m })),
										this.add(m, j),
										"string" != typeof m &&
											"function" != typeof m &&
											("sequence" === g
												? (j =
														m._startTime +
														m.totalDuration() /
															m._timeScale)
												: "start" === g &&
												  (m._startTime -= m.delay())),
										(j += h);
								return this._uncache(!0);
							}
							if ("string" == typeof e)
								return this.addLabel(e, f);
							if ("function" != typeof e)
								throw (
									"Cannot add " +
									e +
									" into the timeline; it is not a tween, timeline, function, or string."
								);
							e = c.delayedCall(0, e);
						}
						if (
							(b.prototype.add.call(this, e, f),
							e._time &&
								e.render(
									(this.rawTime() - e._startTime) *
										e._timeScale,
									!1,
									!1
								),
							(this._gc || this._time === this._duration) &&
								!this._paused &&
								this._duration < this.duration())
						)
							for (
								n = this, o = n.rawTime() > e._startTime;
								n._timeline;

							)
								o && n._timeline.smoothChildTiming
									? n.totalTime(n._totalTime, !0)
									: n._gc && n._enabled(!0, !1),
									(n = n._timeline);
						return this;
					}),
					(q.remove = function (b) {
						if (b instanceof a) {
							this._remove(b, !1);
							var c = (b._timeline = b.vars.useFrames
								? a._rootFramesTimeline
								: a._rootTimeline);
							return (
								(b._startTime =
									(b._paused ? b._pauseTime : c._time) -
									(b._reversed
										? b.totalDuration() - b._totalTime
										: b._totalTime) /
										b._timeScale),
								this
							);
						}
						if (b instanceof Array || (b && b.push && i(b))) {
							for (var d = b.length; --d > -1; )
								this.remove(b[d]);
							return this;
						}
						return "string" == typeof b
							? this.removeLabel(b)
							: this.kill(null, b);
					}),
					(q._remove = function (a, c) {
						b.prototype._remove.call(this, a, c);
						var d = this._last;
						return (
							d
								? this._time > this.duration() &&
								  ((this._time = this._duration),
								  (this._totalTime = this._totalDuration))
								: (this._time =
										this._totalTime =
										this._duration =
										this._totalDuration =
											0),
							this
						);
					}),
					(q.append = function (a, b) {
						return this.add(
							a,
							this._parseTimeOrLabel(null, b, !0, a)
						);
					}),
					(q.insert = q.insertMultiple =
						function (a, b, c, d) {
							return this.add(a, b || 0, c, d);
						}),
					(q.appendMultiple = function (a, b, c, d) {
						return this.add(
							a,
							this._parseTimeOrLabel(null, b, !0, a),
							c,
							d
						);
					}),
					(q.addLabel = function (a, b) {
						return (
							(this._labels[a] = this._parseTimeOrLabel(b)), this
						);
					}),
					(q.addPause = function (a, b, d, e) {
						var f = c.delayedCall(0, o, d, e || this);
						return (
							(f.vars.onComplete = f.vars.onReverseComplete = b),
							(f.data = "isPause"),
							(this._hasPause = !0),
							this.add(f, a)
						);
					}),
					(q.removeLabel = function (a) {
						return delete this._labels[a], this;
					}),
					(q.getLabelTime = function (a) {
						return null != this._labels[a] ? this._labels[a] : -1;
					}),
					(q._parseTimeOrLabel = function (b, c, d, e) {
						var f, g;
						if (e instanceof a && e.timeline === this)
							this.remove(e);
						else if (e && (e instanceof Array || (e.push && i(e))))
							for (g = e.length; --g > -1; )
								e[g] instanceof a &&
									e[g].timeline === this &&
									this.remove(e[g]);
						if (
							((f =
								"number" != typeof b || c
									? this.duration() > 99999999999
										? this.recent().endTime(!1)
										: this._duration
									: 0),
							"string" == typeof c)
						)
							return this._parseTimeOrLabel(
								c,
								d &&
									"number" == typeof b &&
									null == this._labels[c]
									? b - f
									: 0,
								d
							);
						if (
							((c = c || 0),
							"string" != typeof b ||
								(!isNaN(b) && null == this._labels[b]))
						)
							null == b && (b = f);
						else {
							if (((g = b.indexOf("=")), -1 === g))
								return null == this._labels[b]
									? d
										? (this._labels[b] = f + c)
										: c
									: this._labels[b] + c;
							(c =
								parseInt(b.charAt(g - 1) + "1", 10) *
								Number(b.substr(g + 1))),
								(b =
									g > 1
										? this._parseTimeOrLabel(
												b.substr(0, g - 1),
												0,
												d
										  )
										: f);
						}
						return Number(b) + c;
					}),
					(q.seek = function (a, b) {
						return this.totalTime(
							"number" == typeof a
								? a
								: this._parseTimeOrLabel(a),
							b !== !1
						);
					}),
					(q.stop = function () {
						return this.paused(!0);
					}),
					(q.gotoAndPlay = function (a, b) {
						return this.play(a, b);
					}),
					(q.gotoAndStop = function (a, b) {
						return this.pause(a, b);
					}),
					(q.render = function (a, b, c) {
						this._gc && this._enabled(!0, !1);
						var d,
							f,
							g,
							h,
							i,
							l,
							m,
							n = this._time,
							o = this._dirty
								? this.totalDuration()
								: this._totalDuration,
							p = this._startTime,
							q = this._timeScale,
							r = this._paused;
						if (
							(n !== this._time && (a += this._time - n),
							a >= o - 1e-7 && a >= 0)
						)
							(this._totalTime = this._time = o),
								this._reversed ||
									this._hasPausedChild() ||
									((f = !0),
									(h = "onComplete"),
									(i = !!this._timeline.autoRemoveChildren),
									0 === this._duration &&
										((0 >= a && a >= -1e-7) ||
											this._rawPrevTime < 0 ||
											this._rawPrevTime === e) &&
										this._rawPrevTime !== a &&
										this._first &&
										((i = !0),
										this._rawPrevTime > e &&
											(h = "onReverseComplete"))),
								(this._rawPrevTime =
									this._duration ||
									!b ||
									a ||
									this._rawPrevTime === a
										? a
										: e),
								(a = o + 1e-4);
						else if (1e-7 > a)
							if (
								((this._totalTime = this._time = 0),
								(0 !== n ||
									(0 === this._duration &&
										this._rawPrevTime !== e &&
										(this._rawPrevTime > 0 ||
											(0 > a &&
												this._rawPrevTime >= 0)))) &&
									((h = "onReverseComplete"),
									(f = this._reversed)),
								0 > a)
							)
								(this._active = !1),
									this._timeline.autoRemoveChildren &&
									this._reversed
										? ((i = f = !0),
										  (h = "onReverseComplete"))
										: this._rawPrevTime >= 0 &&
										  this._first &&
										  (i = !0),
									(this._rawPrevTime = a);
							else {
								if (
									((this._rawPrevTime =
										this._duration ||
										!b ||
										a ||
										this._rawPrevTime === a
											? a
											: e),
									0 === a && f)
								)
									for (
										d = this._first;
										d && 0 === d._startTime;

									)
										d._duration || (f = !1), (d = d._next);
								(a = 0), this._initted || (i = !0);
							}
						else {
							if (
								this._hasPause &&
								!this._forcingPlayhead &&
								!b
							) {
								if (a >= n)
									for (
										d = this._first;
										d && d._startTime <= a && !l;

									)
										d._duration ||
											"isPause" !== d.data ||
											d.ratio ||
											(0 === d._startTime &&
												0 === this._rawPrevTime) ||
											(l = d),
											(d = d._next);
								else
									for (
										d = this._last;
										d && d._startTime >= a && !l;

									)
										d._duration ||
											("isPause" === d.data &&
												d._rawPrevTime > 0 &&
												(l = d)),
											(d = d._prev);
								l &&
									((this._time = a = l._startTime),
									(this._totalTime =
										a +
										this._cycle *
											(this._totalDuration +
												this._repeatDelay)));
							}
							this._totalTime =
								this._time =
								this._rawPrevTime =
									a;
						}
						if ((this._time !== n && this._first) || c || i || l) {
							if (
								(this._initted || (this._initted = !0),
								this._active ||
									(!this._paused &&
										this._time !== n &&
										a > 0 &&
										(this._active = !0)),
								0 === n &&
									this.vars.onStart &&
									((0 === this._time && this._duration) ||
										b ||
										this._callback("onStart")),
								(m = this._time),
								m >= n)
							)
								for (
									d = this._first;
									d &&
									((g = d._next),
									m === this._time && (!this._paused || r));

								)
									(d._active ||
										(d._startTime <= m &&
											!d._paused &&
											!d._gc)) &&
										(l === d && this.pause(),
										d._reversed
											? d.render(
													(d._dirty
														? d.totalDuration()
														: d._totalDuration) -
														(a - d._startTime) *
															d._timeScale,
													b,
													c
											  )
											: d.render(
													(a - d._startTime) *
														d._timeScale,
													b,
													c
											  )),
										(d = g);
							else
								for (
									d = this._last;
									d &&
									((g = d._prev),
									m === this._time && (!this._paused || r));

								) {
									if (
										d._active ||
										(d._startTime <= n &&
											!d._paused &&
											!d._gc)
									) {
										if (l === d) {
											for (
												l = d._prev;
												l && l.endTime() > this._time;

											)
												l.render(
													l._reversed
														? l.totalDuration() -
																(a -
																	l._startTime) *
																	l._timeScale
														: (a - l._startTime) *
																l._timeScale,
													b,
													c
												),
													(l = l._prev);
											(l = null), this.pause();
										}
										d._reversed
											? d.render(
													(d._dirty
														? d.totalDuration()
														: d._totalDuration) -
														(a - d._startTime) *
															d._timeScale,
													b,
													c
											  )
											: d.render(
													(a - d._startTime) *
														d._timeScale,
													b,
													c
											  );
									}
									d = g;
								}
							this._onUpdate &&
								(b ||
									(j.length && k(),
									this._callback("onUpdate"))),
								h &&
									(this._gc ||
										((p === this._startTime ||
											q !== this._timeScale) &&
											(0 === this._time ||
												o >= this.totalDuration()) &&
											(f &&
												(j.length && k(),
												this._timeline
													.autoRemoveChildren &&
													this._enabled(!1, !1),
												(this._active = !1)),
											!b &&
												this.vars[h] &&
												this._callback(h))));
						}
					}),
					(q._hasPausedChild = function () {
						for (var a = this._first; a; ) {
							if (
								a._paused ||
								(a instanceof d && a._hasPausedChild())
							)
								return !0;
							a = a._next;
						}
						return !1;
					}),
					(q.getChildren = function (a, b, d, e) {
						e = e || -9999999999;
						for (var f = [], g = this._first, h = 0; g; )
							g._startTime < e ||
								(g instanceof c
									? b !== !1 && (f[h++] = g)
									: (d !== !1 && (f[h++] = g),
									  a !== !1 &&
											((f = f.concat(
												g.getChildren(!0, b, d)
											)),
											(h = f.length)))),
								(g = g._next);
						return f;
					}),
					(q.getTweensOf = function (a, b) {
						var d,
							e,
							f = this._gc,
							g = [],
							h = 0;
						for (
							f && this._enabled(!0, !0),
								d = c.getTweensOf(a),
								e = d.length;
							--e > -1;

						)
							(d[e].timeline === this ||
								(b && this._contains(d[e]))) &&
								(g[h++] = d[e]);
						return f && this._enabled(!1, !0), g;
					}),
					(q.recent = function () {
						return this._recent;
					}),
					(q._contains = function (a) {
						for (var b = a.timeline; b; ) {
							if (b === this) return !0;
							b = b.timeline;
						}
						return !1;
					}),
					(q.shiftChildren = function (a, b, c) {
						c = c || 0;
						for (var d, e = this._first, f = this._labels; e; )
							e._startTime >= c && (e._startTime += a),
								(e = e._next);
						if (b) for (d in f) f[d] >= c && (f[d] += a);
						return this._uncache(!0);
					}),
					(q._kill = function (a, b) {
						if (!a && !b) return this._enabled(!1, !1);
						for (
							var c = b
									? this.getTweensOf(b)
									: this.getChildren(!0, !0, !1),
								d = c.length,
								e = !1;
							--d > -1;

						)
							c[d]._kill(a, b) && (e = !0);
						return e;
					}),
					(q.clear = function (a) {
						var b = this.getChildren(!1, !0, !0),
							c = b.length;
						for (this._time = this._totalTime = 0; --c > -1; )
							b[c]._enabled(!1, !1);
						return (
							a !== !1 && (this._labels = {}), this._uncache(!0)
						);
					}),
					(q.invalidate = function () {
						for (var b = this._first; b; )
							b.invalidate(), (b = b._next);
						return a.prototype.invalidate.call(this);
					}),
					(q._enabled = function (a, c) {
						if (a === this._gc)
							for (var d = this._first; d; )
								d._enabled(a, !0), (d = d._next);
						return b.prototype._enabled.call(this, a, c);
					}),
					(q.totalTime = function (b, c, d) {
						this._forcingPlayhead = !0;
						var e = a.prototype.totalTime.apply(this, arguments);
						return (this._forcingPlayhead = !1), e;
					}),
					(q.duration = function (a) {
						return arguments.length
							? (0 !== this.duration() &&
									0 !== a &&
									this.timeScale(this._duration / a),
							  this)
							: (this._dirty && this.totalDuration(),
							  this._duration);
					}),
					(q.totalDuration = function (a) {
						if (!arguments.length) {
							if (this._dirty) {
								for (
									var b,
										c,
										d = 0,
										e = this._last,
										f = 999999999999;
									e;

								)
									(b = e._prev),
										e._dirty && e.totalDuration(),
										e._startTime > f &&
										this._sortChildren &&
										!e._paused &&
										!this._calculatingDuration
											? ((this._calculatingDuration = 1),
											  this.add(
													e,
													e._startTime - e._delay
											  ),
											  (this._calculatingDuration = 0))
											: (f = e._startTime),
										e._startTime < 0 &&
											!e._paused &&
											((d -= e._startTime),
											this._timeline.smoothChildTiming &&
												((this._startTime +=
													e._startTime /
													this._timeScale),
												(this._time -= e._startTime),
												(this._totalTime -=
													e._startTime),
												(this._rawPrevTime -=
													e._startTime)),
											this.shiftChildren(
												-e._startTime,
												!1,
												-9999999999
											),
											(f = 0)),
										(c =
											e._startTime +
											e._totalDuration / e._timeScale),
										c > d && (d = c),
										(e = b);
								(this._duration = this._totalDuration = d),
									(this._dirty = !1);
							}
							return this._totalDuration;
						}
						return a && this.totalDuration()
							? this.timeScale(this._totalDuration / a)
							: this;
					}),
					(q.paused = function (b) {
						if (!b)
							for (var c = this._first, d = this._time; c; )
								c._startTime === d &&
									"isPause" === c.data &&
									(c._rawPrevTime = 0),
									(c = c._next);
						return a.prototype.paused.apply(this, arguments);
					}),
					(q.usesFrames = function () {
						for (var b = this._timeline; b._timeline; )
							b = b._timeline;
						return b === a._rootFramesTimeline;
					}),
					(q.rawTime = function (a) {
						return a &&
							(this._paused ||
								(this._repeat &&
									this.time() > 0 &&
									this.totalProgress() < 1))
							? this._totalTime %
									(this._duration + this._repeatDelay)
							: this._paused
							? this._totalTime
							: (this._timeline.rawTime(a) - this._startTime) *
							  this._timeScale;
					}),
					d
				);
			},
			!0
		),
		_gsScope._gsDefine(
			"TimelineMax",
			["TimelineLite", "TweenLite", "easing.Ease"],
			function (a, b, c) {
				var d = function (b) {
						a.call(this, b),
							(this._repeat = this.vars.repeat || 0),
							(this._repeatDelay = this.vars.repeatDelay || 0),
							(this._cycle = 0),
							(this._yoyo = this.vars.yoyo === !0),
							(this._dirty = !0);
					},
					e = 1e-10,
					f = b._internals,
					g = f.lazyTweens,
					h = f.lazyRender,
					i = _gsScope._gsDefine.globals,
					j = new c(null, null, 1, 0),
					k = (d.prototype = new a());
				return (
					(k.constructor = d),
					(k.kill()._gc = !1),
					(d.version = "1.20.3"),
					(k.invalidate = function () {
						return (
							(this._yoyo = this.vars.yoyo === !0),
							(this._repeat = this.vars.repeat || 0),
							(this._repeatDelay = this.vars.repeatDelay || 0),
							this._uncache(!0),
							a.prototype.invalidate.call(this)
						);
					}),
					(k.addCallback = function (a, c, d, e) {
						return this.add(b.delayedCall(0, a, d, e), c);
					}),
					(k.removeCallback = function (a, b) {
						if (a)
							if (null == b) this._kill(null, a);
							else
								for (
									var c = this.getTweensOf(a, !1),
										d = c.length,
										e = this._parseTimeOrLabel(b);
									--d > -1;

								)
									c[d]._startTime === e &&
										c[d]._enabled(!1, !1);
						return this;
					}),
					(k.removePause = function (b) {
						return this.removeCallback(
							a._internals.pauseCallback,
							b
						);
					}),
					(k.tweenTo = function (a, c) {
						c = c || {};
						var d,
							e,
							f,
							g = {
								ease: j,
								useFrames: this.usesFrames(),
								immediateRender: !1,
							},
							h = (c.repeat && i.TweenMax) || b;
						for (e in c) g[e] = c[e];
						return (
							(g.time = this._parseTimeOrLabel(a)),
							(d =
								Math.abs(Number(g.time) - this._time) /
									this._timeScale || 0.001),
							(f = new h(this, d, g)),
							(g.onStart = function () {
								f.target.paused(!0),
									f.vars.time !== f.target.time() &&
										d === f.duration() &&
										f.duration(
											Math.abs(
												f.vars.time - f.target.time()
											) / f.target._timeScale
										),
									c.onStart &&
										c.onStart.apply(
											c.onStartScope ||
												c.callbackScope ||
												f,
											c.onStartParams || []
										);
							}),
							f
						);
					}),
					(k.tweenFromTo = function (a, b, c) {
						(c = c || {}),
							(a = this._parseTimeOrLabel(a)),
							(c.startAt = {
								onComplete: this.seek,
								onCompleteParams: [a],
								callbackScope: this,
							}),
							(c.immediateRender = c.immediateRender !== !1);
						var d = this.tweenTo(b, c);
						return d.duration(
							Math.abs(d.vars.time - a) / this._timeScale || 0.001
						);
					}),
					(k.render = function (a, b, c) {
						this._gc && this._enabled(!0, !1);
						var d,
							f,
							i,
							j,
							k,
							l,
							m,
							n,
							o = this._time,
							p = this._dirty
								? this.totalDuration()
								: this._totalDuration,
							q = this._duration,
							r = this._totalTime,
							s = this._startTime,
							t = this._timeScale,
							u = this._rawPrevTime,
							v = this._paused,
							w = this._cycle;
						if (
							(o !== this._time && (a += this._time - o),
							a >= p - 1e-7 && a >= 0)
						)
							this._locked ||
								((this._totalTime = p),
								(this._cycle = this._repeat)),
								this._reversed ||
									this._hasPausedChild() ||
									((f = !0),
									(j = "onComplete"),
									(k = !!this._timeline.autoRemoveChildren),
									0 === this._duration &&
										((0 >= a && a >= -1e-7) ||
											0 > u ||
											u === e) &&
										u !== a &&
										this._first &&
										((k = !0),
										u > e && (j = "onReverseComplete"))),
								(this._rawPrevTime =
									this._duration ||
									!b ||
									a ||
									this._rawPrevTime === a
										? a
										: e),
								this._yoyo && 0 !== (1 & this._cycle)
									? (this._time = a = 0)
									: ((this._time = q), (a = q + 1e-4));
						else if (1e-7 > a)
							if (
								(this._locked ||
									(this._totalTime = this._cycle = 0),
								(this._time = 0),
								(0 !== o ||
									(0 === q &&
										u !== e &&
										(u > 0 || (0 > a && u >= 0)) &&
										!this._locked)) &&
									((j = "onReverseComplete"),
									(f = this._reversed)),
								0 > a)
							)
								(this._active = !1),
									this._timeline.autoRemoveChildren &&
									this._reversed
										? ((k = f = !0),
										  (j = "onReverseComplete"))
										: u >= 0 && this._first && (k = !0),
									(this._rawPrevTime = a);
							else {
								if (
									((this._rawPrevTime =
										q || !b || a || this._rawPrevTime === a
											? a
											: e),
									0 === a && f)
								)
									for (
										d = this._first;
										d && 0 === d._startTime;

									)
										d._duration || (f = !1), (d = d._next);
								(a = 0), this._initted || (k = !0);
							}
						else if (
							(0 === q && 0 > u && (k = !0),
							(this._time = this._rawPrevTime = a),
							this._locked ||
								((this._totalTime = a),
								0 !== this._repeat &&
									((l = q + this._repeatDelay),
									(this._cycle = (this._totalTime / l) >> 0),
									0 !== this._cycle &&
										this._cycle === this._totalTime / l &&
										a >= r &&
										this._cycle--,
									(this._time =
										this._totalTime - this._cycle * l),
									this._yoyo &&
										0 !== (1 & this._cycle) &&
										(this._time = q - this._time),
									this._time > q
										? ((this._time = q), (a = q + 1e-4))
										: this._time < 0
										? (this._time = a = 0)
										: (a = this._time))),
							this._hasPause && !this._forcingPlayhead && !b)
						) {
							if (
								((a = this._time),
								a >= o || (this._repeat && w !== this._cycle))
							)
								for (
									d = this._first;
									d && d._startTime <= a && !m;

								)
									d._duration ||
										"isPause" !== d.data ||
										d.ratio ||
										(0 === d._startTime &&
											0 === this._rawPrevTime) ||
										(m = d),
										(d = d._next);
							else
								for (
									d = this._last;
									d && d._startTime >= a && !m;

								)
									d._duration ||
										("isPause" === d.data &&
											d._rawPrevTime > 0 &&
											(m = d)),
										(d = d._prev);
							m &&
								m._startTime < q &&
								((this._time = a = m._startTime),
								(this._totalTime =
									a +
									this._cycle *
										(this._totalDuration +
											this._repeatDelay)));
						}
						if (this._cycle !== w && !this._locked) {
							var x = this._yoyo && 0 !== (1 & w),
								y =
									x ===
									(this._yoyo && 0 !== (1 & this._cycle)),
								z = this._totalTime,
								A = this._cycle,
								B = this._rawPrevTime,
								C = this._time;
							if (
								((this._totalTime = w * q),
								this._cycle < w
									? (x = !x)
									: (this._totalTime += q),
								(this._time = o),
								(this._rawPrevTime = 0 === q ? u - 1e-4 : u),
								(this._cycle = w),
								(this._locked = !0),
								(o = x ? 0 : q),
								this.render(o, b, 0 === q),
								b ||
									this._gc ||
									(this.vars.onRepeat &&
										((this._cycle = A),
										(this._locked = !1),
										this._callback("onRepeat"))),
								o !== this._time)
							)
								return;
							if (
								(y &&
									((this._cycle = w),
									(this._locked = !0),
									(o = x ? q + 1e-4 : -1e-4),
									this.render(o, !0, !1)),
								(this._locked = !1),
								this._paused && !v)
							)
								return;
							(this._time = C),
								(this._totalTime = z),
								(this._cycle = A),
								(this._rawPrevTime = B);
						}
						if (!((this._time !== o && this._first) || c || k || m))
							return void (
								r !== this._totalTime &&
								this._onUpdate &&
								(b || this._callback("onUpdate"))
							);
						if (
							(this._initted || (this._initted = !0),
							this._active ||
								(!this._paused &&
									this._totalTime !== r &&
									a > 0 &&
									(this._active = !0)),
							0 === r &&
								this.vars.onStart &&
								((0 === this._totalTime &&
									this._totalDuration) ||
									b ||
									this._callback("onStart")),
							(n = this._time),
							n >= o)
						)
							for (
								d = this._first;
								d &&
								((i = d._next),
								n === this._time && (!this._paused || v));

							)
								(d._active ||
									(d._startTime <= this._time &&
										!d._paused &&
										!d._gc)) &&
									(m === d && this.pause(),
									d._reversed
										? d.render(
												(d._dirty
													? d.totalDuration()
													: d._totalDuration) -
													(a - d._startTime) *
														d._timeScale,
												b,
												c
										  )
										: d.render(
												(a - d._startTime) *
													d._timeScale,
												b,
												c
										  )),
									(d = i);
						else
							for (
								d = this._last;
								d &&
								((i = d._prev),
								n === this._time && (!this._paused || v));

							) {
								if (
									d._active ||
									(d._startTime <= o && !d._paused && !d._gc)
								) {
									if (m === d) {
										for (
											m = d._prev;
											m && m.endTime() > this._time;

										)
											m.render(
												m._reversed
													? m.totalDuration() -
															(a - m._startTime) *
																m._timeScale
													: (a - m._startTime) *
															m._timeScale,
												b,
												c
											),
												(m = m._prev);
										(m = null), this.pause();
									}
									d._reversed
										? d.render(
												(d._dirty
													? d.totalDuration()
													: d._totalDuration) -
													(a - d._startTime) *
														d._timeScale,
												b,
												c
										  )
										: d.render(
												(a - d._startTime) *
													d._timeScale,
												b,
												c
										  );
								}
								d = i;
							}
						this._onUpdate &&
							(b ||
								(g.length && h(), this._callback("onUpdate"))),
							j &&
								(this._locked ||
									this._gc ||
									((s === this._startTime ||
										t !== this._timeScale) &&
										(0 === this._time ||
											p >= this.totalDuration()) &&
										(f &&
											(g.length && h(),
											this._timeline.autoRemoveChildren &&
												this._enabled(!1, !1),
											(this._active = !1)),
										!b &&
											this.vars[j] &&
											this._callback(j))));
					}),
					(k.getActive = function (a, b, c) {
						null == a && (a = !0),
							null == b && (b = !0),
							null == c && (c = !1);
						var d,
							e,
							f = [],
							g = this.getChildren(a, b, c),
							h = 0,
							i = g.length;
						for (d = 0; i > d; d++)
							(e = g[d]), e.isActive() && (f[h++] = e);
						return f;
					}),
					(k.getLabelAfter = function (a) {
						a || (0 !== a && (a = this._time));
						var b,
							c = this.getLabelsArray(),
							d = c.length;
						for (b = 0; d > b; b++)
							if (c[b].time > a) return c[b].name;
						return null;
					}),
					(k.getLabelBefore = function (a) {
						null == a && (a = this._time);
						for (
							var b = this.getLabelsArray(), c = b.length;
							--c > -1;

						)
							if (b[c].time < a) return b[c].name;
						return null;
					}),
					(k.getLabelsArray = function () {
						var a,
							b = [],
							c = 0;
						for (a in this._labels)
							b[c++] = { time: this._labels[a], name: a };
						return (
							b.sort(function (a, b) {
								return a.time - b.time;
							}),
							b
						);
					}),
					(k.invalidate = function () {
						return (
							(this._locked = !1),
							a.prototype.invalidate.call(this)
						);
					}),
					(k.progress = function (a, b) {
						return arguments.length
							? this.totalTime(
									this.duration() *
										(this._yoyo && 0 !== (1 & this._cycle)
											? 1 - a
											: a) +
										this._cycle *
											(this._duration +
												this._repeatDelay),
									b
							  )
							: this._time / this.duration() || 0;
					}),
					(k.totalProgress = function (a, b) {
						return arguments.length
							? this.totalTime(this.totalDuration() * a, b)
							: this._totalTime / this.totalDuration() || 0;
					}),
					(k.totalDuration = function (b) {
						return arguments.length
							? -1 !== this._repeat && b
								? this.timeScale(this.totalDuration() / b)
								: this
							: (this._dirty &&
									(a.prototype.totalDuration.call(this),
									(this._totalDuration =
										-1 === this._repeat
											? 999999999999
											: this._duration *
													(this._repeat + 1) +
											  this._repeatDelay *
													this._repeat)),
							  this._totalDuration);
					}),
					(k.time = function (a, b) {
						return arguments.length
							? (this._dirty && this.totalDuration(),
							  a > this._duration && (a = this._duration),
							  this._yoyo && 0 !== (1 & this._cycle)
									? (a =
											this._duration -
											a +
											this._cycle *
												(this._duration +
													this._repeatDelay))
									: 0 !== this._repeat &&
									  (a +=
											this._cycle *
											(this._duration +
												this._repeatDelay)),
							  this.totalTime(a, b))
							: this._time;
					}),
					(k.repeat = function (a) {
						return arguments.length
							? ((this._repeat = a), this._uncache(!0))
							: this._repeat;
					}),
					(k.repeatDelay = function (a) {
						return arguments.length
							? ((this._repeatDelay = a), this._uncache(!0))
							: this._repeatDelay;
					}),
					(k.yoyo = function (a) {
						return arguments.length
							? ((this._yoyo = a), this)
							: this._yoyo;
					}),
					(k.currentLabel = function (a) {
						return arguments.length
							? this.seek(a, !0)
							: this.getLabelBefore(this._time + 1e-8);
					}),
					d
				);
			},
			!0
		),
		(function () {
			var a = 180 / Math.PI,
				b = [],
				c = [],
				d = [],
				e = {},
				f = _gsScope._gsDefine.globals,
				g = function (a, b, c, d) {
					c === d && (c = d - (d - b) / 1e6),
						a === b && (b = a + (c - a) / 1e6),
						(this.a = a),
						(this.b = b),
						(this.c = c),
						(this.d = d),
						(this.da = d - a),
						(this.ca = c - a),
						(this.ba = b - a);
				},
				h =
					",x,y,z,left,top,right,bottom,marginTop,marginLeft,marginRight,marginBottom,paddingLeft,paddingTop,paddingRight,paddingBottom,backgroundPosition,backgroundPosition_y,",
				i = function (a, b, c, d) {
					var e = { a: a },
						f = {},
						g = {},
						h = { c: d },
						i = (a + b) / 2,
						j = (b + c) / 2,
						k = (c + d) / 2,
						l = (i + j) / 2,
						m = (j + k) / 2,
						n = (m - l) / 8;
					return (
						(e.b = i + (a - i) / 4),
						(f.b = l + n),
						(e.c = f.a = (e.b + f.b) / 2),
						(f.c = g.a = (l + m) / 2),
						(g.b = m - n),
						(h.b = k + (d - k) / 4),
						(g.c = h.a = (g.b + h.b) / 2),
						[e, f, g, h]
					);
				},
				j = function (a, e, f, g, h) {
					var j,
						k,
						l,
						m,
						n,
						o,
						p,
						q,
						r,
						s,
						t,
						u,
						v,
						w = a.length - 1,
						x = 0,
						y = a[0].a;
					for (j = 0; w > j; j++)
						(n = a[x]),
							(k = n.a),
							(l = n.d),
							(m = a[x + 1].d),
							h
								? ((t = b[j]),
								  (u = c[j]),
								  (v =
										((u + t) * e * 0.25) /
										(g ? 0.5 : d[j] || 0.5)),
								  (o =
										l -
										(l - k) *
											(g
												? 0.5 * e
												: 0 !== t
												? v / t
												: 0)),
								  (p =
										l +
										(m - l) *
											(g
												? 0.5 * e
												: 0 !== u
												? v / u
												: 0)),
								  (q =
										l -
										(o +
											(((p - o) *
												((3 * t) / (t + u) + 0.5)) /
												4 || 0))))
								: ((o = l - (l - k) * e * 0.5),
								  (p = l + (m - l) * e * 0.5),
								  (q = l - (o + p) / 2)),
							(o += q),
							(p += q),
							(n.c = r = o),
							0 !== j
								? (n.b = y)
								: (n.b = y = n.a + 0.6 * (n.c - n.a)),
							(n.da = l - k),
							(n.ca = r - k),
							(n.ba = y - k),
							f
								? ((s = i(k, y, r, l)),
								  a.splice(x, 1, s[0], s[1], s[2], s[3]),
								  (x += 4))
								: x++,
							(y = p);
					(n = a[x]),
						(n.b = y),
						(n.c = y + 0.4 * (n.d - y)),
						(n.da = n.d - n.a),
						(n.ca = n.c - n.a),
						(n.ba = y - n.a),
						f &&
							((s = i(n.a, y, n.c, n.d)),
							a.splice(x, 1, s[0], s[1], s[2], s[3]));
				},
				k = function (a, d, e, f) {
					var h,
						i,
						j,
						k,
						l,
						m,
						n = [];
					if (f)
						for (a = [f].concat(a), i = a.length; --i > -1; )
							"string" == typeof (m = a[i][d]) &&
								"=" === m.charAt(1) &&
								(a[i][d] =
									f[d] + Number(m.charAt(0) + m.substr(2)));
					if (((h = a.length - 2), 0 > h))
						return (n[0] = new g(a[0][d], 0, 0, a[0][d])), n;
					for (i = 0; h > i; i++)
						(j = a[i][d]),
							(k = a[i + 1][d]),
							(n[i] = new g(j, 0, 0, k)),
							e &&
								((l = a[i + 2][d]),
								(b[i] = (b[i] || 0) + (k - j) * (k - j)),
								(c[i] = (c[i] || 0) + (l - k) * (l - k)));
					return (n[i] = new g(a[i][d], 0, 0, a[i + 1][d])), n;
				},
				l = function (a, f, g, i, l, m) {
					var n,
						o,
						p,
						q,
						r,
						s,
						t,
						u,
						v = {},
						w = [],
						x = m || a[0];
					(l = "string" == typeof l ? "," + l + "," : h),
						null == f && (f = 1);
					for (o in a[0]) w.push(o);
					if (a.length > 1) {
						for (
							u = a[a.length - 1], t = !0, n = w.length;
							--n > -1;

						)
							if (((o = w[n]), Math.abs(x[o] - u[o]) > 0.05)) {
								t = !1;
								break;
							}
						t &&
							((a = a.concat()),
							m && a.unshift(m),
							a.push(a[1]),
							(m = a[a.length - 3]));
					}
					for (
						b.length = c.length = d.length = 0, n = w.length;
						--n > -1;

					)
						(o = w[n]),
							(e[o] = -1 !== l.indexOf("," + o + ",")),
							(v[o] = k(a, o, e[o], m));
					for (n = b.length; --n > -1; )
						(b[n] = Math.sqrt(b[n])), (c[n] = Math.sqrt(c[n]));
					if (!i) {
						for (n = w.length; --n > -1; )
							if (e[o])
								for (
									p = v[w[n]], s = p.length - 1, q = 0;
									s > q;
									q++
								)
									(r =
										p[q + 1].da / c[q] + p[q].da / b[q] ||
										0),
										(d[q] = (d[q] || 0) + r * r);
						for (n = d.length; --n > -1; ) d[n] = Math.sqrt(d[n]);
					}
					for (n = w.length, q = g ? 4 : 1; --n > -1; )
						(o = w[n]),
							(p = v[o]),
							j(p, f, g, i, e[o]),
							t && (p.splice(0, q), p.splice(p.length - q, q));
					return v;
				},
				m = function (a, b, c) {
					b = b || "soft";
					var d,
						e,
						f,
						h,
						i,
						j,
						k,
						l,
						m,
						n,
						o,
						p = {},
						q = "cubic" === b ? 3 : 2,
						r = "soft" === b,
						s = [];
					if (
						(r && c && (a = [c].concat(a)),
						null == a || a.length < q + 1)
					)
						throw "invalid Bezier data";
					for (m in a[0]) s.push(m);
					for (j = s.length; --j > -1; ) {
						for (
							m = s[j], p[m] = i = [], n = 0, l = a.length, k = 0;
							l > k;
							k++
						)
							(d =
								null == c
									? a[k][m]
									: "string" == typeof (o = a[k][m]) &&
									  "=" === o.charAt(1)
									? c[m] + Number(o.charAt(0) + o.substr(2))
									: Number(o)),
								r &&
									k > 1 &&
									l - 1 > k &&
									(i[n++] = (d + i[n - 2]) / 2),
								(i[n++] = d);
						for (l = n - q + 1, n = 0, k = 0; l > k; k += q)
							(d = i[k]),
								(e = i[k + 1]),
								(f = i[k + 2]),
								(h = 2 === q ? 0 : i[k + 3]),
								(i[n++] = o =
									3 === q
										? new g(d, e, f, h)
										: new g(
												d,
												(2 * e + d) / 3,
												(2 * e + f) / 3,
												f
										  ));
						i.length = n;
					}
					return p;
				},
				n = function (a, b, c) {
					for (
						var d,
							e,
							f,
							g,
							h,
							i,
							j,
							k,
							l,
							m,
							n,
							o = 1 / c,
							p = a.length;
						--p > -1;

					)
						for (
							m = a[p],
								f = m.a,
								g = m.d - f,
								h = m.c - f,
								i = m.b - f,
								d = e = 0,
								k = 1;
							c >= k;
							k++
						)
							(j = o * k),
								(l = 1 - j),
								(d =
									e -
									(e =
										(j * j * g + 3 * l * (j * h + l * i)) *
										j)),
								(n = p * c + k - 1),
								(b[n] = (b[n] || 0) + d * d);
				},
				o = function (a, b) {
					b = b >> 0 || 6;
					var c,
						d,
						e,
						f,
						g = [],
						h = [],
						i = 0,
						j = 0,
						k = b - 1,
						l = [],
						m = [];
					for (c in a) n(a[c], g, b);
					for (e = g.length, d = 0; e > d; d++)
						(i += Math.sqrt(g[d])),
							(f = d % b),
							(m[f] = i),
							f === k &&
								((j += i),
								(f = (d / b) >> 0),
								(l[f] = m),
								(h[f] = j),
								(i = 0),
								(m = []));
					return { length: j, lengths: h, segments: l };
				},
				p = _gsScope._gsDefine.plugin({
					propName: "bezier",
					priority: -1,
					version: "1.3.8",
					API: 2,
					global: !0,
					init: function (a, b, c) {
						(this._target = a),
							b instanceof Array && (b = { values: b }),
							(this._func = {}),
							(this._mod = {}),
							(this._props = []),
							(this._timeRes =
								null == b.timeResolution
									? 6
									: parseInt(b.timeResolution, 10));
						var d,
							e,
							f,
							g,
							h,
							i = b.values || [],
							j = {},
							k = i[0],
							n = b.autoRotate || c.vars.orientToBezier;
						this._autoRotate = n
							? n instanceof Array
								? n
								: [
										[
											"x",
											"y",
											"rotation",
											n === !0 ? 0 : Number(n) || 0,
										],
								  ]
							: null;
						for (d in k) this._props.push(d);
						for (f = this._props.length; --f > -1; )
							(d = this._props[f]),
								this._overwriteProps.push(d),
								(e = this._func[d] = "function" == typeof a[d]),
								(j[d] = e
									? a[
											d.indexOf("set") ||
											"function" !=
												typeof a["get" + d.substr(3)]
												? d
												: "get" + d.substr(3)
									  ]()
									: parseFloat(a[d])),
								h || (j[d] !== i[0][d] && (h = j));
						if (
							((this._beziers =
								"cubic" !== b.type &&
								"quadratic" !== b.type &&
								"soft" !== b.type
									? l(
											i,
											isNaN(b.curviness)
												? 1
												: b.curviness,
											!1,
											"thruBasic" === b.type,
											b.correlate,
											h
									  )
									: m(i, b.type, j)),
							(this._segCount = this._beziers[d].length),
							this._timeRes)
						) {
							var p = o(this._beziers, this._timeRes);
							(this._length = p.length),
								(this._lengths = p.lengths),
								(this._segments = p.segments),
								(this._l1 = this._li = this._s1 = this._si = 0),
								(this._l2 = this._lengths[0]),
								(this._curSeg = this._segments[0]),
								(this._s2 = this._curSeg[0]),
								(this._prec = 1 / this._curSeg.length);
						}
						if ((n = this._autoRotate))
							for (
								this._initialRotations = [],
									n[0] instanceof Array ||
										(this._autoRotate = n = [n]),
									f = n.length;
								--f > -1;

							) {
								for (g = 0; 3 > g; g++)
									(d = n[f][g]),
										(this._func[d] =
											"function" == typeof a[d]
												? a[
														d.indexOf("set") ||
														"function" !=
															typeof a[
																"get" +
																	d.substr(3)
															]
															? d
															: "get" +
															  d.substr(3)
												  ]
												: !1);
								(d = n[f][2]),
									(this._initialRotations[f] =
										(this._func[d]
											? this._func[d].call(this._target)
											: this._target[d]) || 0),
									this._overwriteProps.push(d);
							}
						return (
							(this._startRatio = c.vars.runBackwards ? 1 : 0), !0
						);
					},
					set: function (b) {
						var c,
							d,
							e,
							f,
							g,
							h,
							i,
							j,
							k,
							l,
							m = this._segCount,
							n = this._func,
							o = this._target,
							p = b !== this._startRatio;
						if (this._timeRes) {
							if (
								((k = this._lengths),
								(l = this._curSeg),
								(b *= this._length),
								(e = this._li),
								b > this._l2 && m - 1 > e)
							) {
								for (
									j = m - 1;
									j > e && (this._l2 = k[++e]) <= b;

								);
								(this._l1 = k[e - 1]),
									(this._li = e),
									(this._curSeg = l = this._segments[e]),
									(this._s2 = l[(this._s1 = this._si = 0)]);
							} else if (b < this._l1 && e > 0) {
								for (; e > 0 && (this._l1 = k[--e]) >= b; );
								0 === e && b < this._l1 ? (this._l1 = 0) : e++,
									(this._l2 = k[e]),
									(this._li = e),
									(this._curSeg = l = this._segments[e]),
									(this._s1 =
										l[(this._si = l.length - 1) - 1] || 0),
									(this._s2 = l[this._si]);
							}
							if (
								((c = e),
								(b -= this._l1),
								(e = this._si),
								b > this._s2 && e < l.length - 1)
							) {
								for (
									j = l.length - 1;
									j > e && (this._s2 = l[++e]) <= b;

								);
								(this._s1 = l[e - 1]), (this._si = e);
							} else if (b < this._s1 && e > 0) {
								for (; e > 0 && (this._s1 = l[--e]) >= b; );
								0 === e && b < this._s1 ? (this._s1 = 0) : e++,
									(this._s2 = l[e]),
									(this._si = e);
							}
							h =
								(e + (b - this._s1) / (this._s2 - this._s1)) *
									this._prec || 0;
						} else
							(c = 0 > b ? 0 : b >= 1 ? m - 1 : (m * b) >> 0),
								(h = (b - c * (1 / m)) * m);
						for (d = 1 - h, e = this._props.length; --e > -1; )
							(f = this._props[e]),
								(g = this._beziers[f][c]),
								(i =
									(h * h * g.da +
										3 * d * (h * g.ca + d * g.ba)) *
										h +
									g.a),
								this._mod[f] && (i = this._mod[f](i, o)),
								n[f] ? o[f](i) : (o[f] = i);
						if (this._autoRotate) {
							var q,
								r,
								s,
								t,
								u,
								v,
								w,
								x = this._autoRotate;
							for (e = x.length; --e > -1; )
								(f = x[e][2]),
									(v = x[e][3] || 0),
									(w = x[e][4] === !0 ? 1 : a),
									(g = this._beziers[x[e][0]]),
									(q = this._beziers[x[e][1]]),
									g &&
										q &&
										((g = g[c]),
										(q = q[c]),
										(r = g.a + (g.b - g.a) * h),
										(t = g.b + (g.c - g.b) * h),
										(r += (t - r) * h),
										(t += (g.c + (g.d - g.c) * h - t) * h),
										(s = q.a + (q.b - q.a) * h),
										(u = q.b + (q.c - q.b) * h),
										(s += (u - s) * h),
										(u += (q.c + (q.d - q.c) * h - u) * h),
										(i = p
											? Math.atan2(u - s, t - r) * w + v
											: this._initialRotations[e]),
										this._mod[f] &&
											(i = this._mod[f](i, o)),
										n[f] ? o[f](i) : (o[f] = i));
						}
					},
				}),
				q = p.prototype;
			(p.bezierThrough = l),
				(p.cubicToQuadratic = i),
				(p._autoCSS = !0),
				(p.quadraticToCubic = function (a, b, c) {
					return new g(a, (2 * b + a) / 3, (2 * b + c) / 3, c);
				}),
				(p._cssRegister = function () {
					var a = f.CSSPlugin;
					if (a) {
						var b = a._internals,
							c = b._parseToProxy,
							d = b._setPluginRatio,
							e = b.CSSPropTween;
						b._registerComplexSpecialProp("bezier", {
							parser: function (a, b, f, g, h, i) {
								b instanceof Array && (b = { values: b }),
									(i = new p());
								var j,
									k,
									l,
									m = b.values,
									n = m.length - 1,
									o = [],
									q = {};
								if (0 > n) return h;
								for (j = 0; n >= j; j++)
									(l = c(a, m[j], g, h, i, n !== j)),
										(o[j] = l.end);
								for (k in b) q[k] = b[k];
								return (
									(q.values = o),
									(h = new e(a, "bezier", 0, 0, l.pt, 2)),
									(h.data = l),
									(h.plugin = i),
									(h.setRatio = d),
									0 === q.autoRotate && (q.autoRotate = !0),
									!q.autoRotate ||
										q.autoRotate instanceof Array ||
										((j =
											q.autoRotate === !0
												? 0
												: Number(q.autoRotate)),
										(q.autoRotate =
											null != l.end.left
												? [
														[
															"left",
															"top",
															"rotation",
															j,
															!1,
														],
												  ]
												: null != l.end.x
												? [
														[
															"x",
															"y",
															"rotation",
															j,
															!1,
														],
												  ]
												: !1)),
									q.autoRotate &&
										(g._transform ||
											g._enableTransforms(!1),
										(l.autoRotate = g._target._gsTransform),
										(l.proxy.rotation =
											l.autoRotate.rotation || 0),
										g._overwriteProps.push("rotation")),
									i._onInitTween(l.proxy, q, g._tween),
									h
								);
							},
						});
					}
				}),
				(q._mod = function (a) {
					for (
						var b, c = this._overwriteProps, d = c.length;
						--d > -1;

					)
						(b = a[c[d]]),
							b &&
								"function" == typeof b &&
								(this._mod[c[d]] = b);
				}),
				(q._kill = function (a) {
					var b,
						c,
						d = this._props;
					for (b in this._beziers)
						if (b in a)
							for (
								delete this._beziers[b],
									delete this._func[b],
									c = d.length;
								--c > -1;

							)
								d[c] === b && d.splice(c, 1);
					if ((d = this._autoRotate))
						for (c = d.length; --c > -1; )
							a[d[c][2]] && d.splice(c, 1);
					return this._super._kill.call(this, a);
				});
		})(),
		_gsScope._gsDefine(
			"plugins.CSSPlugin",
			["plugins.TweenPlugin", "TweenLite"],
			function (a, b) {
				var c,
					d,
					e,
					f,
					g = function () {
						a.call(this, "css"),
							(this._overwriteProps.length = 0),
							(this.setRatio = g.prototype.setRatio);
					},
					h = _gsScope._gsDefine.globals,
					i = {},
					j = (g.prototype = new a("css"));
				(j.constructor = g),
					(g.version = "1.20.3"),
					(g.API = 2),
					(g.defaultTransformPerspective = 0),
					(g.defaultSkewType = "compensated"),
					(g.defaultSmoothOrigin = !0),
					(j = "px"),
					(g.suffixMap = {
						top: j,
						right: j,
						bottom: j,
						left: j,
						width: j,
						height: j,
						fontSize: j,
						padding: j,
						margin: j,
						perspective: j,
						lineHeight: "",
					});
				var k,
					l,
					m,
					n,
					o,
					p,
					q,
					r,
					s = /(?:\-|\.|\b)(\d|\.|e\-)+/g,
					t = /(?:\d|\-\d|\.\d|\-\.\d|\+=\d|\-=\d|\+=.\d|\-=\.\d)+/g,
					u = /(?:\+=|\-=|\-|\b)[\d\-\.]+[a-zA-Z0-9]*(?:%|\b)/gi,
					v = /(?![+-]?\d*\.?\d+|[+-]|e[+-]\d+)[^0-9]/g,
					w = /(?:\d|\-|\+|=|#|\.)*/g,
					x = /opacity *= *([^)]*)/i,
					y = /opacity:([^;]*)/i,
					z = /alpha\(opacity *=.+?\)/i,
					A = /^(rgb|hsl)/,
					B = /([A-Z])/g,
					C = /-([a-z])/gi,
					D = /(^(?:url\(\"|url\())|(?:(\"\))$|\)$)/gi,
					E = function (a, b) {
						return b.toUpperCase();
					},
					F = /(?:Left|Right|Width)/i,
					G = /(M11|M12|M21|M22)=[\d\-\.e]+/gi,
					H = /progid\:DXImageTransform\.Microsoft\.Matrix\(.+?\)/i,
					I = /,(?=[^\)]*(?:\(|$))/gi,
					J = /[\s,\(]/i,
					K = Math.PI / 180,
					L = 180 / Math.PI,
					M = {},
					N = { style: {} },
					O = _gsScope.document || {
						createElement: function () {
							return N;
						},
					},
					P = function (a, b) {
						return O.createElementNS
							? O.createElementNS(
									b || "http://www.w3.org/1999/xhtml",
									a
							  )
							: O.createElement(a);
					},
					Q = P("div"),
					R = P("img"),
					S = (g._internals = { _specialProps: i }),
					T = (_gsScope.navigator || {}).userAgent || "",
					U = (function () {
						var a = T.indexOf("Android"),
							b = P("a");
						return (
							(m =
								-1 !== T.indexOf("Safari") &&
								-1 === T.indexOf("Chrome") &&
								(-1 === a ||
									parseFloat(T.substr(a + 8, 2)) > 3)),
							(o =
								m &&
								parseFloat(
									T.substr(T.indexOf("Version/") + 8, 2)
								) < 6),
							(n = -1 !== T.indexOf("Firefox")),
							(/MSIE ([0-9]{1,}[\.0-9]{0,})/.exec(T) ||
								/Trident\/.*rv:([0-9]{1,}[\.0-9]{0,})/.exec(
									T
								)) &&
								(p = parseFloat(RegExp.$1)),
							b
								? ((b.style.cssText = "top:1px;opacity:.55;"),
								  /^0.55/.test(b.style.opacity))
								: !1
						);
					})(),
					V = function (a) {
						return x.test(
							"string" == typeof a
								? a
								: (a.currentStyle
										? a.currentStyle.filter
										: a.style.filter) || ""
						)
							? parseFloat(RegExp.$1) / 100
							: 1;
					},
					W = function (a) {
						_gsScope.console && console.log(a);
					},
					X = "",
					Y = "",
					Z = function (a, b) {
						b = b || Q;
						var c,
							d,
							e = b.style;
						if (void 0 !== e[a]) return a;
						for (
							a = a.charAt(0).toUpperCase() + a.substr(1),
								c = ["O", "Moz", "ms", "Ms", "Webkit"],
								d = 5;
							--d > -1 && void 0 === e[c[d] + a];

						);
						return d >= 0
							? ((Y = 3 === d ? "ms" : c[d]),
							  (X = "-" + Y.toLowerCase() + "-"),
							  Y + a)
							: null;
					},
					$ = O.defaultView
						? O.defaultView.getComputedStyle
						: function () {},
					_ = (g.getStyle = function (a, b, c, d, e) {
						var f;
						return U || "opacity" !== b
							? (!d && a.style[b]
									? (f = a.style[b])
									: (c = c || $(a))
									? (f =
											c[b] ||
											c.getPropertyValue(b) ||
											c.getPropertyValue(
												b
													.replace(B, "-$1")
													.toLowerCase()
											))
									: a.currentStyle && (f = a.currentStyle[b]),
							  null == e ||
							  (f &&
									"none" !== f &&
									"auto" !== f &&
									"auto auto" !== f)
									? f
									: e)
							: V(a);
					}),
					aa = (S.convertToPixels = function (a, c, d, e, f) {
						if ("px" === e || (!e && "lineHeight" !== c)) return d;
						if ("auto" === e || !d) return 0;
						var h,
							i,
							j,
							k = F.test(c),
							l = a,
							m = Q.style,
							n = 0 > d,
							o = 1 === d;
						if (
							(n && (d = -d),
							o && (d *= 100),
							"lineHeight" !== c || e)
						)
							if ("%" === e && -1 !== c.indexOf("border"))
								h =
									(d / 100) *
									(k ? a.clientWidth : a.clientHeight);
							else {
								if (
									((m.cssText =
										"border:0 solid red;position:" +
										_(a, "position") +
										";line-height:0;"),
									"%" !== e &&
										l.appendChild &&
										"v" !== e.charAt(0) &&
										"rem" !== e)
								)
									m[
										k ? "borderLeftWidth" : "borderTopWidth"
									] = d + e;
								else {
									if (
										((l = a.parentNode || O.body),
										-1 !==
											_(l, "display").indexOf("flex") &&
											(m.position = "absolute"),
										(i = l._gsCache),
										(j = b.ticker.frame),
										i && k && i.time === j)
									)
										return (i.width * d) / 100;
									m[k ? "width" : "height"] = d + e;
								}
								l.appendChild(Q),
									(h = parseFloat(
										Q[k ? "offsetWidth" : "offsetHeight"]
									)),
									l.removeChild(Q),
									k &&
										"%" === e &&
										g.cacheWidths !== !1 &&
										((i = l._gsCache = l._gsCache || {}),
										(i.time = j),
										(i.width = (h / d) * 100)),
									0 !== h || f || (h = aa(a, c, d, e, !0));
							}
						else
							(i = $(a).lineHeight),
								(a.style.lineHeight = d),
								(h = parseFloat($(a).lineHeight)),
								(a.style.lineHeight = i);
						return o && (h /= 100), n ? -h : h;
					}),
					ba = (S.calculateOffset = function (a, b, c) {
						if ("absolute" !== _(a, "position", c)) return 0;
						var d = "left" === b ? "Left" : "Top",
							e = _(a, "margin" + d, c);
						return (
							a["offset" + d] -
							(aa(a, b, parseFloat(e), e.replace(w, "")) || 0)
						);
					}),
					ca = function (a, b) {
						var c,
							d,
							e,
							f = {};
						if ((b = b || $(a, null)))
							if ((c = b.length))
								for (; --c > -1; )
									(e = b[c]),
										(-1 === e.indexOf("-transform") ||
											Da === e) &&
											(f[e.replace(C, E)] =
												b.getPropertyValue(e));
							else
								for (c in b)
									(-1 === c.indexOf("Transform") ||
										Ca === c) &&
										(f[c] = b[c]);
						else if ((b = a.currentStyle || a.style))
							for (c in b)
								"string" == typeof c &&
									void 0 === f[c] &&
									(f[c.replace(C, E)] = b[c]);
						return (
							U || (f.opacity = V(a)),
							(d = Ra(a, b, !1)),
							(f.rotation = d.rotation),
							(f.skewX = d.skewX),
							(f.scaleX = d.scaleX),
							(f.scaleY = d.scaleY),
							(f.x = d.x),
							(f.y = d.y),
							Fa &&
								((f.z = d.z),
								(f.rotationX = d.rotationX),
								(f.rotationY = d.rotationY),
								(f.scaleZ = d.scaleZ)),
							f.filters && delete f.filters,
							f
						);
					},
					da = function (a, b, c, d, e) {
						var f,
							g,
							h,
							i = {},
							j = a.style;
						for (g in c)
							"cssText" !== g &&
								"length" !== g &&
								isNaN(g) &&
								(b[g] !== (f = c[g]) || (e && e[g])) &&
								-1 === g.indexOf("Origin") &&
								("number" == typeof f ||
									"string" == typeof f) &&
								((i[g] =
									"auto" !== f ||
									("left" !== g && "top" !== g)
										? ("" !== f &&
												"auto" !== f &&
												"none" !== f) ||
										  "string" != typeof b[g] ||
										  "" === b[g].replace(v, "")
											? f
											: 0
										: ba(a, g)),
								void 0 !== j[g] && (h = new sa(j, g, j[g], h)));
						if (d) for (g in d) "className" !== g && (i[g] = d[g]);
						return { difs: i, firstMPT: h };
					},
					ea = {
						width: ["Left", "Right"],
						height: ["Top", "Bottom"],
					},
					fa = [
						"marginLeft",
						"marginRight",
						"marginTop",
						"marginBottom",
					],
					ga = function (a, b, c) {
						if ("svg" === (a.nodeName + "").toLowerCase())
							return (c || $(a))[b] || 0;
						if (a.getCTM && Oa(a)) return a.getBBox()[b] || 0;
						var d = parseFloat(
								"width" === b ? a.offsetWidth : a.offsetHeight
							),
							e = ea[b],
							f = e.length;
						for (c = c || $(a, null); --f > -1; )
							(d -=
								parseFloat(_(a, "padding" + e[f], c, !0)) || 0),
								(d -=
									parseFloat(
										_(a, "border" + e[f] + "Width", c, !0)
									) || 0);
						return d;
					},
					ha = function (a, b) {
						if (
							"contain" === a ||
							"auto" === a ||
							"auto auto" === a
						)
							return a + " ";
						(null == a || "" === a) && (a = "0 0");
						var c,
							d = a.split(" "),
							e =
								-1 !== a.indexOf("left")
									? "0%"
									: -1 !== a.indexOf("right")
									? "100%"
									: d[0],
							f =
								-1 !== a.indexOf("top")
									? "0%"
									: -1 !== a.indexOf("bottom")
									? "100%"
									: d[1];
						if (d.length > 3 && !b) {
							for (
								d = a.split(", ").join(",").split(","),
									a = [],
									c = 0;
								c < d.length;
								c++
							)
								a.push(ha(d[c]));
							return a.join(",");
						}
						return (
							null == f
								? (f = "center" === e ? "50%" : "0")
								: "center" === f && (f = "50%"),
							("center" === e ||
								(isNaN(parseFloat(e)) &&
									-1 === (e + "").indexOf("="))) &&
								(e = "50%"),
							(a =
								e + " " + f + (d.length > 2 ? " " + d[2] : "")),
							b &&
								((b.oxp = -1 !== e.indexOf("%")),
								(b.oyp = -1 !== f.indexOf("%")),
								(b.oxr = "=" === e.charAt(1)),
								(b.oyr = "=" === f.charAt(1)),
								(b.ox = parseFloat(e.replace(v, ""))),
								(b.oy = parseFloat(f.replace(v, ""))),
								(b.v = a)),
							b || a
						);
					},
					ia = function (a, b) {
						return (
							"function" == typeof a && (a = a(r, q)),
							"string" == typeof a && "=" === a.charAt(1)
								? parseInt(a.charAt(0) + "1", 10) *
								  parseFloat(a.substr(2))
								: parseFloat(a) - parseFloat(b) || 0
						);
					},
					ja = function (a, b) {
						return (
							"function" == typeof a && (a = a(r, q)),
							null == a
								? b
								: "string" == typeof a && "=" === a.charAt(1)
								? parseInt(a.charAt(0) + "1", 10) *
										parseFloat(a.substr(2)) +
								  b
								: parseFloat(a) || 0
						);
					},
					ka = function (a, b, c, d) {
						var e,
							f,
							g,
							h,
							i,
							j = 1e-6;
						return (
							"function" == typeof a && (a = a(r, q)),
							null == a
								? (h = b)
								: "number" == typeof a
								? (h = a)
								: ((e = 360),
								  (f = a.split("_")),
								  (i = "=" === a.charAt(1)),
								  (g =
										(i
											? parseInt(a.charAt(0) + "1", 10) *
											  parseFloat(f[0].substr(2))
											: parseFloat(f[0])) *
											(-1 === a.indexOf("rad") ? 1 : L) -
										(i ? 0 : b)),
								  f.length &&
										(d && (d[c] = b + g),
										-1 !== a.indexOf("short") &&
											((g %= e),
											g !== g % (e / 2) &&
												(g = 0 > g ? g + e : g - e)),
										-1 !== a.indexOf("_cw") && 0 > g
											? (g =
													((g + 9999999999 * e) % e) -
													((g / e) | 0) * e)
											: -1 !== a.indexOf("ccw") &&
											  g > 0 &&
											  (g =
													((g - 9999999999 * e) % e) -
													((g / e) | 0) * e)),
								  (h = b + g)),
							j > h && h > -j && (h = 0),
							h
						);
					},
					la = {
						aqua: [0, 255, 255],
						lime: [0, 255, 0],
						silver: [192, 192, 192],
						black: [0, 0, 0],
						maroon: [128, 0, 0],
						teal: [0, 128, 128],
						blue: [0, 0, 255],
						navy: [0, 0, 128],
						white: [255, 255, 255],
						fuchsia: [255, 0, 255],
						olive: [128, 128, 0],
						yellow: [255, 255, 0],
						orange: [255, 165, 0],
						gray: [128, 128, 128],
						purple: [128, 0, 128],
						green: [0, 128, 0],
						red: [255, 0, 0],
						pink: [255, 192, 203],
						cyan: [0, 255, 255],
						transparent: [255, 255, 255, 0],
					},
					ma = function (a, b, c) {
						return (
							(a = 0 > a ? a + 1 : a > 1 ? a - 1 : a),
							(255 *
								(1 > 6 * a
									? b + (c - b) * a * 6
									: 0.5 > a
									? c
									: 2 > 3 * a
									? b + (c - b) * (2 / 3 - a) * 6
									: b) +
								0.5) |
								0
						);
					},
					na = (g.parseColor = function (a, b) {
						var c, d, e, f, g, h, i, j, k, l, m;
						if (a)
							if ("number" == typeof a)
								c = [a >> 16, (a >> 8) & 255, 255 & a];
							else {
								if (
									("," === a.charAt(a.length - 1) &&
										(a = a.substr(0, a.length - 1)),
									la[a])
								)
									c = la[a];
								else if ("#" === a.charAt(0))
									4 === a.length &&
										((d = a.charAt(1)),
										(e = a.charAt(2)),
										(f = a.charAt(3)),
										(a = "#" + d + d + e + e + f + f)),
										(a = parseInt(a.substr(1), 16)),
										(c = [
											a >> 16,
											(a >> 8) & 255,
											255 & a,
										]);
								else if ("hsl" === a.substr(0, 3))
									if (((c = m = a.match(s)), b)) {
										if (-1 !== a.indexOf("="))
											return a.match(t);
									} else
										(g = (Number(c[0]) % 360) / 360),
											(h = Number(c[1]) / 100),
											(i = Number(c[2]) / 100),
											(e =
												0.5 >= i
													? i * (h + 1)
													: i + h - i * h),
											(d = 2 * i - e),
											c.length > 3 &&
												(c[3] = Number(c[3])),
											(c[0] = ma(g + 1 / 3, d, e)),
											(c[1] = ma(g, d, e)),
											(c[2] = ma(g - 1 / 3, d, e));
								else c = a.match(s) || la.transparent;
								(c[0] = Number(c[0])),
									(c[1] = Number(c[1])),
									(c[2] = Number(c[2])),
									c.length > 3 && (c[3] = Number(c[3]));
							}
						else c = la.black;
						return (
							b &&
								!m &&
								((d = c[0] / 255),
								(e = c[1] / 255),
								(f = c[2] / 255),
								(j = Math.max(d, e, f)),
								(k = Math.min(d, e, f)),
								(i = (j + k) / 2),
								j === k
									? (g = h = 0)
									: ((l = j - k),
									  (h =
											i > 0.5
												? l / (2 - j - k)
												: l / (j + k)),
									  (g =
											j === d
												? (e - f) / l + (f > e ? 6 : 0)
												: j === e
												? (f - d) / l + 2
												: (d - e) / l + 4),
									  (g *= 60)),
								(c[0] = (g + 0.5) | 0),
								(c[1] = (100 * h + 0.5) | 0),
								(c[2] = (100 * i + 0.5) | 0)),
							c
						);
					}),
					oa = function (a, b) {
						var c,
							d,
							e,
							f = a.match(pa) || [],
							g = 0,
							h = "";
						if (!f.length) return a;
						for (c = 0; c < f.length; c++)
							(d = f[c]),
								(e = a.substr(g, a.indexOf(d, g) - g)),
								(g += e.length + d.length),
								(d = na(d, b)),
								3 === d.length && d.push(1),
								(h +=
									e +
									(b
										? "hsla(" +
										  d[0] +
										  "," +
										  d[1] +
										  "%," +
										  d[2] +
										  "%," +
										  d[3]
										: "rgba(" + d.join(",")) +
									")");
						return h + a.substr(g);
					},
					pa =
						"(?:\\b(?:(?:rgb|rgba|hsl|hsla)\\(.+?\\))|\\B#(?:[0-9a-f]{3}){1,2}\\b";
				for (j in la) pa += "|" + j + "\\b";
				(pa = new RegExp(pa + ")", "gi")),
					(g.colorStringFilter = function (a) {
						var b,
							c = a[0] + " " + a[1];
						pa.test(c) &&
							((b =
								-1 !== c.indexOf("hsl(") ||
								-1 !== c.indexOf("hsla(")),
							(a[0] = oa(a[0], b)),
							(a[1] = oa(a[1], b))),
							(pa.lastIndex = 0);
					}),
					b.defaultStringFilter ||
						(b.defaultStringFilter = g.colorStringFilter);
				var qa = function (a, b, c, d) {
						if (null == a)
							return function (a) {
								return a;
							};
						var e,
							f = b ? (a.match(pa) || [""])[0] : "",
							g = a.split(f).join("").match(u) || [],
							h = a.substr(0, a.indexOf(g[0])),
							i = ")" === a.charAt(a.length - 1) ? ")" : "",
							j = -1 !== a.indexOf(" ") ? " " : ",",
							k = g.length,
							l = k > 0 ? g[0].replace(s, "") : "";
						return k
							? (e = b
									? function (a) {
											var b, m, n, o;
											if ("number" == typeof a) a += l;
											else if (d && I.test(a)) {
												for (
													o = a
														.replace(I, "|")
														.split("|"),
														n = 0;
													n < o.length;
													n++
												)
													o[n] = e(o[n]);
												return o.join(",");
											}
											if (
												((b = (a.match(pa) || [f])[0]),
												(m =
													a
														.split(b)
														.join("")
														.match(u) || []),
												(n = m.length),
												k > n--)
											)
												for (; ++n < k; )
													m[n] = c
														? m[((n - 1) / 2) | 0]
														: g[n];
											return (
												h +
												m.join(j) +
												j +
												b +
												i +
												(-1 !== a.indexOf("inset")
													? " inset"
													: "")
											);
									  }
									: function (a) {
											var b, f, m;
											if ("number" == typeof a) a += l;
											else if (d && I.test(a)) {
												for (
													f = a
														.replace(I, "|")
														.split("|"),
														m = 0;
													m < f.length;
													m++
												)
													f[m] = e(f[m]);
												return f.join(",");
											}
											if (
												((b = a.match(u) || []),
												(m = b.length),
												k > m--)
											)
												for (; ++m < k; )
													b[m] = c
														? b[((m - 1) / 2) | 0]
														: g[m];
											return h + b.join(j) + i;
									  })
							: function (a) {
									return a;
							  };
					},
					ra = function (a) {
						return (
							(a = a.split(",")),
							function (b, c, d, e, f, g, h) {
								var i,
									j = (c + "").split(" ");
								for (h = {}, i = 0; 4 > i; i++)
									h[a[i]] = j[i] =
										j[i] || j[((i - 1) / 2) >> 0];
								return e.parse(b, h, f, g);
							}
						);
					},
					sa =
						((S._setPluginRatio = function (a) {
							this.plugin.setRatio(a);
							for (
								var b,
									c,
									d,
									e,
									f,
									g = this.data,
									h = g.proxy,
									i = g.firstMPT,
									j = 1e-6;
								i;

							)
								(b = h[i.v]),
									i.r
										? (b = Math.round(b))
										: j > b && b > -j && (b = 0),
									(i.t[i.p] = b),
									(i = i._next);
							if (
								(g.autoRotate &&
									(g.autoRotate.rotation = g.mod
										? g.mod(h.rotation, this.t)
										: h.rotation),
								1 === a || 0 === a)
							)
								for (
									i = g.firstMPT, f = 1 === a ? "e" : "b";
									i;

								) {
									if (((c = i.t), c.type)) {
										if (1 === c.type) {
											for (
												e = c.xs0 + c.s + c.xs1, d = 1;
												d < c.l;
												d++
											)
												e +=
													c["xn" + d] +
													c["xs" + (d + 1)];
											c[f] = e;
										}
									} else c[f] = c.s + c.xs0;
									i = i._next;
								}
						}),
						function (a, b, c, d, e) {
							(this.t = a),
								(this.p = b),
								(this.v = c),
								(this.r = e),
								d && ((d._prev = this), (this._next = d));
						}),
					ta =
						((S._parseToProxy = function (a, b, c, d, e, f) {
							var g,
								h,
								i,
								j,
								k,
								l = d,
								m = {},
								n = {},
								o = c._transform,
								p = M;
							for (
								c._transform = null,
									M = b,
									d = k = c.parse(a, b, d, e),
									M = p,
									f &&
										((c._transform = o),
										l &&
											((l._prev = null),
											l._prev && (l._prev._next = null)));
								d && d !== l;

							) {
								if (
									d.type <= 1 &&
									((h = d.p),
									(n[h] = d.s + d.c),
									(m[h] = d.s),
									f ||
										((j = new sa(d, "s", h, j, d.r)),
										(d.c = 0)),
									1 === d.type)
								)
									for (g = d.l; --g > 0; )
										(i = "xn" + g),
											(h = d.p + "_" + i),
											(n[h] = d.data[i]),
											(m[h] = d[i]),
											f ||
												(j = new sa(
													d,
													i,
													h,
													j,
													d.rxp[i]
												));
								d = d._next;
							}
							return { proxy: m, end: n, firstMPT: j, pt: k };
						}),
						(S.CSSPropTween = function (
							a,
							b,
							d,
							e,
							g,
							h,
							i,
							j,
							k,
							l,
							m
						) {
							(this.t = a),
								(this.p = b),
								(this.s = d),
								(this.c = e),
								(this.n = i || b),
								a instanceof ta || f.push(this.n),
								(this.r = j),
								(this.type = h || 0),
								k && ((this.pr = k), (c = !0)),
								(this.b = void 0 === l ? d : l),
								(this.e = void 0 === m ? d + e : m),
								g && ((this._next = g), (g._prev = this));
						})),
					ua = function (a, b, c, d, e, f) {
						var g = new ta(a, b, c, d - c, e, -1, f);
						return (g.b = c), (g.e = g.xs0 = d), g;
					},
					va = (g.parseComplex = function (
						a,
						b,
						c,
						d,
						e,
						f,
						h,
						i,
						j,
						l
					) {
						(c = c || f || ""),
							"function" == typeof d && (d = d(r, q)),
							(h = new ta(
								a,
								b,
								0,
								0,
								h,
								l ? 2 : 1,
								null,
								!1,
								i,
								c,
								d
							)),
							(d += ""),
							e &&
								pa.test(d + c) &&
								((d = [c, d]),
								g.colorStringFilter(d),
								(c = d[0]),
								(d = d[1]));
						var m,
							n,
							o,
							p,
							u,
							v,
							w,
							x,
							y,
							z,
							A,
							B,
							C,
							D = c.split(", ").join(",").split(" "),
							E = d.split(", ").join(",").split(" "),
							F = D.length,
							G = k !== !1;
						for (
							(-1 !== d.indexOf(",") || -1 !== c.indexOf(",")) &&
								(-1 !== (d + c).indexOf("rgb") ||
								-1 !== (d + c).indexOf("hsl")
									? ((D = D.join(" ")
											.replace(I, ", ")
											.split(" ")),
									  (E = E.join(" ")
											.replace(I, ", ")
											.split(" ")))
									: ((D = D.join(" ")
											.split(",")
											.join(", ")
											.split(" ")),
									  (E = E.join(" ")
											.split(",")
											.join(", ")
											.split(" "))),
								(F = D.length)),
								F !== E.length &&
									((D = (f || "").split(" ")),
									(F = D.length)),
								h.plugin = j,
								h.setRatio = l,
								pa.lastIndex = 0,
								m = 0;
							F > m;
							m++
						)
							if (
								((p = D[m]),
								(u = E[m]),
								(x = parseFloat(p)),
								x || 0 === x)
							)
								h.appendXtra(
									"",
									x,
									ia(u, x),
									u.replace(t, ""),
									G && -1 !== u.indexOf("px"),
									!0
								);
							else if (e && pa.test(p))
								(B = u.indexOf(")") + 1),
									(B = ")" + (B ? u.substr(B) : "")),
									(C = -1 !== u.indexOf("hsl") && U),
									(z = u),
									(p = na(p, C)),
									(u = na(u, C)),
									(y = p.length + u.length > 6),
									y && !U && 0 === u[3]
										? ((h["xs" + h.l] += h.l
												? " transparent"
												: "transparent"),
										  (h.e = h.e
												.split(E[m])
												.join("transparent")))
										: (U || (y = !1),
										  C
												? h
														.appendXtra(
															z.substr(
																0,
																z.indexOf("hsl")
															) +
																(y
																	? "hsla("
																	: "hsl("),
															p[0],
															ia(u[0], p[0]),
															",",
															!1,
															!0
														)
														.appendXtra(
															"",
															p[1],
															ia(u[1], p[1]),
															"%,",
															!1
														)
														.appendXtra(
															"",
															p[2],
															ia(u[2], p[2]),
															y ? "%," : "%" + B,
															!1
														)
												: h
														.appendXtra(
															z.substr(
																0,
																z.indexOf("rgb")
															) +
																(y
																	? "rgba("
																	: "rgb("),
															p[0],
															u[0] - p[0],
															",",
															!0,
															!0
														)
														.appendXtra(
															"",
															p[1],
															u[1] - p[1],
															",",
															!0
														)
														.appendXtra(
															"",
															p[2],
															u[2] - p[2],
															y ? "," : B,
															!0
														),
										  y &&
												((p = p.length < 4 ? 1 : p[3]),
												h.appendXtra(
													"",
													p,
													(u.length < 4 ? 1 : u[3]) -
														p,
													B,
													!1
												))),
									(pa.lastIndex = 0);
							else if ((v = p.match(s))) {
								if (
									((w = u.match(t)),
									!w || w.length !== v.length)
								)
									return h;
								for (o = 0, n = 0; n < v.length; n++)
									(A = v[n]),
										(z = p.indexOf(A, o)),
										h.appendXtra(
											p.substr(o, z - o),
											Number(A),
											ia(w[n], A),
											"",
											G &&
												"px" ===
													p.substr(z + A.length, 2),
											0 === n
										),
										(o = z + A.length);
								h["xs" + h.l] += p.substr(o);
							} else
								h["xs" + h.l] +=
									h.l || h["xs" + h.l] ? " " + u : u;
						if (-1 !== d.indexOf("=") && h.data) {
							for (B = h.xs0 + h.data.s, m = 1; m < h.l; m++)
								B += h["xs" + m] + h.data["xn" + m];
							h.e = B + h["xs" + m];
						}
						return (
							h.l || ((h.type = -1), (h.xs0 = h.e)), h.xfirst || h
						);
					}),
					wa = 9;
				for (j = ta.prototype, j.l = j.pr = 0; --wa > 0; )
					(j["xn" + wa] = 0), (j["xs" + wa] = "");
				(j.xs0 = ""),
					(j._next =
						j._prev =
						j.xfirst =
						j.data =
						j.plugin =
						j.setRatio =
						j.rxp =
							null),
					(j.appendXtra = function (a, b, c, d, e, f) {
						var g = this,
							h = g.l;
						return (
							(g["xs" + h] +=
								f && (h || g["xs" + h]) ? " " + a : a || ""),
							c || 0 === h || g.plugin
								? (g.l++,
								  (g.type = g.setRatio ? 2 : 1),
								  (g["xs" + g.l] = d || ""),
								  h > 0
										? ((g.data["xn" + h] = b + c),
										  (g.rxp["xn" + h] = e),
										  (g["xn" + h] = b),
										  g.plugin ||
												((g.xfirst = new ta(
													g,
													"xn" + h,
													b,
													c,
													g.xfirst || g,
													0,
													g.n,
													e,
													g.pr
												)),
												(g.xfirst.xs0 = 0)),
										  g)
										: ((g.data = { s: b + c }),
										  (g.rxp = {}),
										  (g.s = b),
										  (g.c = c),
										  (g.r = e),
										  g))
								: ((g["xs" + h] += b + (d || "")), g)
						);
					});
				var xa = function (a, b) {
						(b = b || {}),
							(this.p = b.prefix ? Z(a) || a : a),
							(i[a] = i[this.p] = this),
							(this.format =
								b.formatter ||
								qa(
									b.defaultValue,
									b.color,
									b.collapsible,
									b.multi
								)),
							b.parser && (this.parse = b.parser),
							(this.clrs = b.color),
							(this.multi = b.multi),
							(this.keyword = b.keyword),
							(this.dflt = b.defaultValue),
							(this.pr = b.priority || 0);
					},
					ya = (S._registerComplexSpecialProp = function (a, b, c) {
						"object" != typeof b && (b = { parser: c });
						var d,
							e,
							f = a.split(","),
							g = b.defaultValue;
						for (c = c || [g], d = 0; d < f.length; d++)
							(b.prefix = 0 === d && b.prefix),
								(b.defaultValue = c[d] || g),
								(e = new xa(f[d], b));
					}),
					za = (S._registerPluginProp = function (a) {
						if (!i[a]) {
							var b =
								a.charAt(0).toUpperCase() +
								a.substr(1) +
								"Plugin";
							ya(a, {
								parser: function (a, c, d, e, f, g, j) {
									var k = h.com.greensock.plugins[b];
									return k
										? (k._cssRegister(),
										  i[d].parse(a, c, d, e, f, g, j))
										: (W(
												"Error: " +
													b +
													" js file not loaded."
										  ),
										  f);
								},
							});
						}
					});
				(j = xa.prototype),
					(j.parseComplex = function (a, b, c, d, e, f) {
						var g,
							h,
							i,
							j,
							k,
							l,
							m = this.keyword;
						if (
							(this.multi &&
								(I.test(c) || I.test(b)
									? ((h = b.replace(I, "|").split("|")),
									  (i = c.replace(I, "|").split("|")))
									: m && ((h = [b]), (i = [c]))),
							i)
						) {
							for (
								j = i.length > h.length ? i.length : h.length,
									g = 0;
								j > g;
								g++
							)
								(b = h[g] = h[g] || this.dflt),
									(c = i[g] = i[g] || this.dflt),
									m &&
										((k = b.indexOf(m)),
										(l = c.indexOf(m)),
										k !== l &&
											(-1 === l
												? (h[g] = h[g]
														.split(m)
														.join(""))
												: -1 === k &&
												  (h[g] += " " + m)));
							(b = h.join(", ")), (c = i.join(", "));
						}
						return va(
							a,
							this.p,
							b,
							c,
							this.clrs,
							this.dflt,
							d,
							this.pr,
							e,
							f
						);
					}),
					(j.parse = function (a, b, c, d, f, g, h) {
						return this.parseComplex(
							a.style,
							this.format(_(a, this.p, e, !1, this.dflt)),
							this.format(b),
							f,
							g
						);
					}),
					(g.registerSpecialProp = function (a, b, c) {
						ya(a, {
							parser: function (a, d, e, f, g, h, i) {
								var j = new ta(a, e, 0, 0, g, 2, e, !1, c);
								return (
									(j.plugin = h),
									(j.setRatio = b(a, d, f._tween, e)),
									j
								);
							},
							priority: c,
						});
					}),
					(g.useSVGTransformAttr = !0);
				var Aa,
					Ba =
						"scaleX,scaleY,scaleZ,x,y,z,skewX,skewY,rotation,rotationX,rotationY,perspective,xPercent,yPercent".split(
							","
						),
					Ca = Z("transform"),
					Da = X + "transform",
					Ea = Z("transformOrigin"),
					Fa = null !== Z("perspective"),
					Ga = (S.Transform = function () {
						(this.perspective =
							parseFloat(g.defaultTransformPerspective) || 0),
							(this.force3D =
								g.defaultForce3D !== !1 && Fa
									? g.defaultForce3D || "auto"
									: !1);
					}),
					Ha = _gsScope.SVGElement,
					Ia = function (a, b, c) {
						var d,
							e = O.createElementNS(
								"http://www.w3.org/2000/svg",
								a
							),
							f = /([a-z])([A-Z])/g;
						for (d in c)
							e.setAttributeNS(
								null,
								d.replace(f, "$1-$2").toLowerCase(),
								c[d]
							);
						return b.appendChild(e), e;
					},
					Ja = O.documentElement || {},
					Ka = (function () {
						var a,
							b,
							c,
							d = p || (/Android/i.test(T) && !_gsScope.chrome);
						return (
							O.createElementNS &&
								!d &&
								((a = Ia("svg", Ja)),
								(b = Ia("rect", a, {
									width: 100,
									height: 50,
									x: 100,
								})),
								(c = b.getBoundingClientRect().width),
								(b.style[Ea] = "50% 50%"),
								(b.style[Ca] = "scaleX(0.5)"),
								(d =
									c === b.getBoundingClientRect().width &&
									!(n && Fa)),
								Ja.removeChild(a)),
							d
						);
					})(),
					La = function (a, b, c, d, e, f) {
						var h,
							i,
							j,
							k,
							l,
							m,
							n,
							o,
							p,
							q,
							r,
							s,
							t,
							u,
							v = a._gsTransform,
							w = Qa(a, !0);
						v && ((t = v.xOrigin), (u = v.yOrigin)),
							(!d || (h = d.split(" ")).length < 2) &&
								((n = a.getBBox()),
								0 === n.x &&
									0 === n.y &&
									n.width + n.height === 0 &&
									(n = {
										x:
											parseFloat(
												a.hasAttribute("x")
													? a.getAttribute("x")
													: a.hasAttribute("cx")
													? a.getAttribute("cx")
													: 0
											) || 0,
										y:
											parseFloat(
												a.hasAttribute("y")
													? a.getAttribute("y")
													: a.hasAttribute("cy")
													? a.getAttribute("cy")
													: 0
											) || 0,
										width: 0,
										height: 0,
									}),
								(b = ha(b).split(" ")),
								(h = [
									(-1 !== b[0].indexOf("%")
										? (parseFloat(b[0]) / 100) * n.width
										: parseFloat(b[0])) + n.x,
									(-1 !== b[1].indexOf("%")
										? (parseFloat(b[1]) / 100) * n.height
										: parseFloat(b[1])) + n.y,
								])),
							(c.xOrigin = k = parseFloat(h[0])),
							(c.yOrigin = l = parseFloat(h[1])),
							d &&
								w !== Pa &&
								((m = w[0]),
								(n = w[1]),
								(o = w[2]),
								(p = w[3]),
								(q = w[4]),
								(r = w[5]),
								(s = m * p - n * o),
								s &&
									((i =
										k * (p / s) +
										l * (-o / s) +
										(o * r - p * q) / s),
									(j =
										k * (-n / s) +
										l * (m / s) -
										(m * r - n * q) / s),
									(k = c.xOrigin = h[0] = i),
									(l = c.yOrigin = h[1] = j))),
							v &&
								(f &&
									((c.xOffset = v.xOffset),
									(c.yOffset = v.yOffset),
									(v = c)),
								e || (e !== !1 && g.defaultSmoothOrigin !== !1)
									? ((i = k - t),
									  (j = l - u),
									  (v.xOffset += i * w[0] + j * w[2] - i),
									  (v.yOffset += i * w[1] + j * w[3] - j))
									: (v.xOffset = v.yOffset = 0)),
							f || a.setAttribute("data-svg-origin", h.join(" "));
					},
					Ma = function (a) {
						var b,
							c = P(
								"svg",
								(this.ownerSVGElement &&
									this.ownerSVGElement.getAttribute(
										"xmlns"
									)) ||
									"http://www.w3.org/2000/svg"
							),
							d = this.parentNode,
							e = this.nextSibling,
							f = this.style.cssText;
						if (
							(Ja.appendChild(c),
							c.appendChild(this),
							(this.style.display = "block"),
							a)
						)
							try {
								(b = this.getBBox()),
									(this._originalGetBBox = this.getBBox),
									(this.getBBox = Ma);
							} catch (g) {}
						else
							this._originalGetBBox &&
								(b = this._originalGetBBox());
						return (
							e ? d.insertBefore(this, e) : d.appendChild(this),
							Ja.removeChild(c),
							(this.style.cssText = f),
							b
						);
					},
					Na = function (a) {
						try {
							return a.getBBox();
						} catch (b) {
							return Ma.call(a, !0);
						}
					},
					Oa = function (a) {
						return !(
							!Ha ||
							!a.getCTM ||
							(a.parentNode && !a.ownerSVGElement) ||
							!Na(a)
						);
					},
					Pa = [1, 0, 0, 1, 0, 0],
					Qa = function (a, b) {
						var c,
							d,
							e,
							f,
							g,
							h,
							i = a._gsTransform || new Ga(),
							j = 1e5,
							k = a.style;
						if (
							(Ca
								? (d = _(a, Da, null, !0))
								: a.currentStyle &&
								  ((d = a.currentStyle.filter.match(G)),
								  (d =
										d && 4 === d.length
											? [
													d[0].substr(4),
													Number(d[2].substr(4)),
													Number(d[1].substr(4)),
													d[3].substr(4),
													i.x || 0,
													i.y || 0,
											  ].join(",")
											: "")),
							(c =
								!d ||
								"none" === d ||
								"matrix(1, 0, 0, 1, 0, 0)" === d),
							!Ca ||
								(!(h = !$(a) || "none" === $(a).display) &&
									a.parentNode) ||
								(h && ((f = k.display), (k.display = "block")),
								a.parentNode || ((g = 1), Ja.appendChild(a)),
								(d = _(a, Da, null, !0)),
								(c =
									!d ||
									"none" === d ||
									"matrix(1, 0, 0, 1, 0, 0)" === d),
								f ? (k.display = f) : h && Va(k, "display"),
								g && Ja.removeChild(a)),
							(i.svg || (a.getCTM && Oa(a))) &&
								(c &&
									-1 !== (k[Ca] + "").indexOf("matrix") &&
									((d = k[Ca]), (c = 0)),
								(e = a.getAttribute("transform")),
								c &&
									e &&
									(-1 !== e.indexOf("matrix")
										? ((d = e), (c = 0))
										: -1 !== e.indexOf("translate") &&
										  ((d =
												"matrix(1,0,0,1," +
												e
													.match(
														/(?:\-|\b)[\d\-\.e]+\b/gi
													)
													.join(",") +
												")"),
										  (c = 0)))),
							c)
						)
							return Pa;
						for (
							e = (d || "").match(s) || [], wa = e.length;
							--wa > -1;

						)
							(f = Number(e[wa])),
								(e[wa] = (g = f - (f |= 0))
									? ((g * j + (0 > g ? -0.5 : 0.5)) | 0) / j +
									  f
									: f);
						return b && e.length > 6
							? [e[0], e[1], e[4], e[5], e[12], e[13]]
							: e;
					},
					Ra = (S.getTransform = function (a, c, d, e) {
						if (a._gsTransform && d && !e) return a._gsTransform;
						var f,
							h,
							i,
							j,
							k,
							l,
							m = d ? a._gsTransform || new Ga() : new Ga(),
							n = m.scaleX < 0,
							o = 2e-5,
							p = 1e5,
							q = Fa
								? parseFloat(
										_(a, Ea, c, !1, "0 0 0").split(" ")[2]
								  ) ||
								  m.zOrigin ||
								  0
								: 0,
							r = parseFloat(g.defaultTransformPerspective) || 0;
						if (
							((m.svg = !(!a.getCTM || !Oa(a))),
							m.svg &&
								(La(
									a,
									_(a, Ea, c, !1, "50% 50%") + "",
									m,
									a.getAttribute("data-svg-origin")
								),
								(Aa = g.useSVGTransformAttr || Ka)),
							(f = Qa(a)),
							f !== Pa)
						) {
							if (16 === f.length) {
								var s,
									t,
									u,
									v,
									w,
									x = f[0],
									y = f[1],
									z = f[2],
									A = f[3],
									B = f[4],
									C = f[5],
									D = f[6],
									E = f[7],
									F = f[8],
									G = f[9],
									H = f[10],
									I = f[12],
									J = f[13],
									K = f[14],
									M = f[11],
									N = Math.atan2(D, H);
								m.zOrigin &&
									((K = -m.zOrigin),
									(I = F * K - f[12]),
									(J = G * K - f[13]),
									(K = H * K + m.zOrigin - f[14])),
									(m.rotationX = N * L),
									N &&
										((v = Math.cos(-N)),
										(w = Math.sin(-N)),
										(s = B * v + F * w),
										(t = C * v + G * w),
										(u = D * v + H * w),
										(F = B * -w + F * v),
										(G = C * -w + G * v),
										(H = D * -w + H * v),
										(M = E * -w + M * v),
										(B = s),
										(C = t),
										(D = u)),
									(N = Math.atan2(-z, H)),
									(m.rotationY = N * L),
									N &&
										((v = Math.cos(-N)),
										(w = Math.sin(-N)),
										(s = x * v - F * w),
										(t = y * v - G * w),
										(u = z * v - H * w),
										(G = y * w + G * v),
										(H = z * w + H * v),
										(M = A * w + M * v),
										(x = s),
										(y = t),
										(z = u)),
									(N = Math.atan2(y, x)),
									(m.rotation = N * L),
									N &&
										((v = Math.cos(N)),
										(w = Math.sin(N)),
										(s = x * v + y * w),
										(t = B * v + C * w),
										(u = F * v + G * w),
										(y = y * v - x * w),
										(C = C * v - B * w),
										(G = G * v - F * w),
										(x = s),
										(B = t),
										(F = u)),
									m.rotationX &&
										Math.abs(m.rotationX) +
											Math.abs(m.rotation) >
											359.9 &&
										((m.rotationX = m.rotation = 0),
										(m.rotationY = 180 - m.rotationY)),
									(N = Math.atan2(B, C)),
									(m.scaleX =
										((Math.sqrt(x * x + y * y + z * z) * p +
											0.5) |
											0) /
										p),
									(m.scaleY =
										((Math.sqrt(C * C + D * D) * p + 0.5) |
											0) /
										p),
									(m.scaleZ =
										((Math.sqrt(F * F + G * G + H * H) * p +
											0.5) |
											0) /
										p),
									(x /= m.scaleX),
									(B /= m.scaleY),
									(y /= m.scaleX),
									(C /= m.scaleY),
									Math.abs(N) > o
										? ((m.skewX = N * L),
										  (B = 0),
										  "simple" !== m.skewType &&
												(m.scaleY *= 1 / Math.cos(N)))
										: (m.skewX = 0),
									(m.perspective = M
										? 1 / (0 > M ? -M : M)
										: 0),
									(m.x = I),
									(m.y = J),
									(m.z = K),
									m.svg &&
										((m.x -=
											m.xOrigin -
											(m.xOrigin * x - m.yOrigin * B)),
										(m.y -=
											m.yOrigin -
											(m.yOrigin * y - m.xOrigin * C)));
							} else if (
								!Fa ||
								e ||
								!f.length ||
								m.x !== f[4] ||
								m.y !== f[5] ||
								(!m.rotationX && !m.rotationY)
							) {
								var O = f.length >= 6,
									P = O ? f[0] : 1,
									Q = f[1] || 0,
									R = f[2] || 0,
									S = O ? f[3] : 1;
								(m.x = f[4] || 0),
									(m.y = f[5] || 0),
									(i = Math.sqrt(P * P + Q * Q)),
									(j = Math.sqrt(S * S + R * R)),
									(k =
										P || Q
											? Math.atan2(Q, P) * L
											: m.rotation || 0),
									(l =
										R || S
											? Math.atan2(R, S) * L + k
											: m.skewX || 0),
									(m.scaleX = i),
									(m.scaleY = j),
									(m.rotation = k),
									(m.skewX = l),
									Fa &&
										((m.rotationX = m.rotationY = m.z = 0),
										(m.perspective = r),
										(m.scaleZ = 1)),
									m.svg &&
										((m.x -=
											m.xOrigin -
											(m.xOrigin * P + m.yOrigin * R)),
										(m.y -=
											m.yOrigin -
											(m.xOrigin * Q + m.yOrigin * S)));
							}
							Math.abs(m.skewX) > 90 &&
								Math.abs(m.skewX) < 270 &&
								(n
									? ((m.scaleX *= -1),
									  (m.skewX += m.rotation <= 0 ? 180 : -180),
									  (m.rotation +=
											m.rotation <= 0 ? 180 : -180))
									: ((m.scaleY *= -1),
									  (m.skewX += m.skewX <= 0 ? 180 : -180))),
								(m.zOrigin = q);
							for (h in m) m[h] < o && m[h] > -o && (m[h] = 0);
						}
						return (
							d &&
								((a._gsTransform = m),
								m.svg &&
									(Aa && a.style[Ca]
										? b.delayedCall(0.001, function () {
												Va(a.style, Ca);
										  })
										: !Aa &&
										  a.getAttribute("transform") &&
										  b.delayedCall(0.001, function () {
												a.removeAttribute("transform");
										  }))),
							m
						);
					}),
					Sa = function (a) {
						var b,
							c,
							d = this.data,
							e = -d.rotation * K,
							f = e + d.skewX * K,
							g = 1e5,
							h = ((Math.cos(e) * d.scaleX * g) | 0) / g,
							i = ((Math.sin(e) * d.scaleX * g) | 0) / g,
							j = ((Math.sin(f) * -d.scaleY * g) | 0) / g,
							k = ((Math.cos(f) * d.scaleY * g) | 0) / g,
							l = this.t.style,
							m = this.t.currentStyle;
						if (m) {
							(c = i),
								(i = -j),
								(j = -c),
								(b = m.filter),
								(l.filter = "");
							var n,
								o,
								q = this.t.offsetWidth,
								r = this.t.offsetHeight,
								s = "absolute" !== m.position,
								t =
									"progid:DXImageTransform.Microsoft.Matrix(M11=" +
									h +
									", M12=" +
									i +
									", M21=" +
									j +
									", M22=" +
									k,
								u = d.x + (q * d.xPercent) / 100,
								v = d.y + (r * d.yPercent) / 100;
							if (
								(null != d.ox &&
									((n =
										(d.oxp ? q * d.ox * 0.01 : d.ox) -
										q / 2),
									(o =
										(d.oyp ? r * d.oy * 0.01 : d.oy) -
										r / 2),
									(u += n - (n * h + o * i)),
									(v += o - (n * j + o * k))),
								s
									? ((n = q / 2),
									  (o = r / 2),
									  (t +=
											", Dx=" +
											(n - (n * h + o * i) + u) +
											", Dy=" +
											(o - (n * j + o * k) + v) +
											")"))
									: (t += ", sizingMethod='auto expand')"),
								-1 !==
								b.indexOf("DXImageTransform.Microsoft.Matrix(")
									? (l.filter = b.replace(H, t))
									: (l.filter = t + " " + b),
								(0 === a || 1 === a) &&
									1 === h &&
									0 === i &&
									0 === j &&
									1 === k &&
									((s && -1 === t.indexOf("Dx=0, Dy=0")) ||
										(x.test(b) &&
											100 !== parseFloat(RegExp.$1)) ||
										(-1 === b.indexOf(b.indexOf("Alpha")) &&
											l.removeAttribute("filter"))),
								!s)
							) {
								var y,
									z,
									A,
									B = 8 > p ? 1 : -1;
								for (
									n = d.ieOffsetX || 0,
										o = d.ieOffsetY || 0,
										d.ieOffsetX = Math.round(
											(q -
												((0 > h ? -h : h) * q +
													(0 > i ? -i : i) * r)) /
												2 +
												u
										),
										d.ieOffsetY = Math.round(
											(r -
												((0 > k ? -k : k) * r +
													(0 > j ? -j : j) * q)) /
												2 +
												v
										),
										wa = 0;
									4 > wa;
									wa++
								)
									(z = fa[wa]),
										(y = m[z]),
										(c =
											-1 !== y.indexOf("px")
												? parseFloat(y)
												: aa(
														this.t,
														z,
														parseFloat(y),
														y.replace(w, "")
												  ) || 0),
										(A =
											c !== d[z]
												? 2 > wa
													? -d.ieOffsetX
													: -d.ieOffsetY
												: 2 > wa
												? n - d.ieOffsetX
												: o - d.ieOffsetY),
										(l[z] =
											(d[z] = Math.round(
												c -
													A *
														(0 === wa || 2 === wa
															? 1
															: B)
											)) + "px");
							}
						}
					},
					Ta =
						(S.set3DTransformRatio =
						S.setTransformRatio =
							function (a) {
								var b,
									c,
									d,
									e,
									f,
									g,
									h,
									i,
									j,
									k,
									l,
									m,
									o,
									p,
									q,
									r,
									s,
									t,
									u,
									v,
									w,
									x,
									y,
									z = this.data,
									A = this.t.style,
									B = z.rotation,
									C = z.rotationX,
									D = z.rotationY,
									E = z.scaleX,
									F = z.scaleY,
									G = z.scaleZ,
									H = z.x,
									I = z.y,
									J = z.z,
									L = z.svg,
									M = z.perspective,
									N = z.force3D,
									O = z.skewY,
									P = z.skewX;
								if (
									(O && ((P += O), (B += O)),
									((((1 === a || 0 === a) &&
										"auto" === N &&
										(this.tween._totalTime ===
											this.tween._totalDuration ||
											!this.tween._totalTime)) ||
										!N) &&
										!J &&
										!M &&
										!D &&
										!C &&
										1 === G) ||
										(Aa && L) ||
										!Fa)
								)
									return void (B || P || L
										? ((B *= K),
										  (x = P * K),
										  (y = 1e5),
										  (c = Math.cos(B) * E),
										  (f = Math.sin(B) * E),
										  (d = Math.sin(B - x) * -F),
										  (g = Math.cos(B - x) * F),
										  x &&
												"simple" === z.skewType &&
												((b = Math.tan(x - O * K)),
												(b = Math.sqrt(1 + b * b)),
												(d *= b),
												(g *= b),
												O &&
													((b = Math.tan(O * K)),
													(b = Math.sqrt(1 + b * b)),
													(c *= b),
													(f *= b))),
										  L &&
												((H +=
													z.xOrigin -
													(z.xOrigin * c +
														z.yOrigin * d) +
													z.xOffset),
												(I +=
													z.yOrigin -
													(z.xOrigin * f +
														z.yOrigin * g) +
													z.yOffset),
												Aa &&
													(z.xPercent ||
														z.yPercent) &&
													((q = this.t.getBBox()),
													(H +=
														0.01 *
														z.xPercent *
														q.width),
													(I +=
														0.01 *
														z.yPercent *
														q.height)),
												(q = 1e-6),
												q > H && H > -q && (H = 0),
												q > I && I > -q && (I = 0)),
										  (u =
												((c * y) | 0) / y +
												"," +
												((f * y) | 0) / y +
												"," +
												((d * y) | 0) / y +
												"," +
												((g * y) | 0) / y +
												"," +
												H +
												"," +
												I +
												")"),
										  L && Aa
												? this.t.setAttribute(
														"transform",
														"matrix(" + u
												  )
												: (A[Ca] =
														(z.xPercent ||
														z.yPercent
															? "translate(" +
															  z.xPercent +
															  "%," +
															  z.yPercent +
															  "%) matrix("
															: "matrix(") + u))
										: (A[Ca] =
												(z.xPercent || z.yPercent
													? "translate(" +
													  z.xPercent +
													  "%," +
													  z.yPercent +
													  "%) matrix("
													: "matrix(") +
												E +
												",0,0," +
												F +
												"," +
												H +
												"," +
												I +
												")"));
								if (
									(n &&
										((q = 1e-4),
										q > E && E > -q && (E = G = 2e-5),
										q > F && F > -q && (F = G = 2e-5),
										!M ||
											z.z ||
											z.rotationX ||
											z.rotationY ||
											(M = 0)),
									B || P)
								)
									(B *= K),
										(r = c = Math.cos(B)),
										(s = f = Math.sin(B)),
										P &&
											((B -= P * K),
											(r = Math.cos(B)),
											(s = Math.sin(B)),
											"simple" === z.skewType &&
												((b = Math.tan((P - O) * K)),
												(b = Math.sqrt(1 + b * b)),
												(r *= b),
												(s *= b),
												z.skewY &&
													((b = Math.tan(O * K)),
													(b = Math.sqrt(1 + b * b)),
													(c *= b),
													(f *= b)))),
										(d = -s),
										(g = r);
								else {
									if (!(D || C || 1 !== G || M || L))
										return void (A[Ca] =
											(z.xPercent || z.yPercent
												? "translate(" +
												  z.xPercent +
												  "%," +
												  z.yPercent +
												  "%) translate3d("
												: "translate3d(") +
											H +
											"px," +
											I +
											"px," +
											J +
											"px)" +
											(1 !== E || 1 !== F
												? " scale(" + E + "," + F + ")"
												: ""));
									(c = g = 1), (d = f = 0);
								}
								(k = 1),
									(e = h = i = j = l = m = 0),
									(o = M ? -1 / M : 0),
									(p = z.zOrigin),
									(q = 1e-6),
									(v = ","),
									(w = "0"),
									(B = D * K),
									B &&
										((r = Math.cos(B)),
										(s = Math.sin(B)),
										(i = -s),
										(l = o * -s),
										(e = c * s),
										(h = f * s),
										(k = r),
										(o *= r),
										(c *= r),
										(f *= r)),
									(B = C * K),
									B &&
										((r = Math.cos(B)),
										(s = Math.sin(B)),
										(b = d * r + e * s),
										(t = g * r + h * s),
										(j = k * s),
										(m = o * s),
										(e = d * -s + e * r),
										(h = g * -s + h * r),
										(k *= r),
										(o *= r),
										(d = b),
										(g = t)),
									1 !== G &&
										((e *= G),
										(h *= G),
										(k *= G),
										(o *= G)),
									1 !== F &&
										((d *= F),
										(g *= F),
										(j *= F),
										(m *= F)),
									1 !== E &&
										((c *= E),
										(f *= E),
										(i *= E),
										(l *= E)),
									(p || L) &&
										(p &&
											((H += e * -p),
											(I += h * -p),
											(J += k * -p + p)),
										L &&
											((H +=
												z.xOrigin -
												(z.xOrigin * c +
													z.yOrigin * d) +
												z.xOffset),
											(I +=
												z.yOrigin -
												(z.xOrigin * f +
													z.yOrigin * g) +
												z.yOffset)),
										q > H && H > -q && (H = w),
										q > I && I > -q && (I = w),
										q > J && J > -q && (J = 0)),
									(u =
										z.xPercent || z.yPercent
											? "translate(" +
											  z.xPercent +
											  "%," +
											  z.yPercent +
											  "%) matrix3d("
											: "matrix3d("),
									(u +=
										(q > c && c > -q ? w : c) +
										v +
										(q > f && f > -q ? w : f) +
										v +
										(q > i && i > -q ? w : i)),
									(u +=
										v +
										(q > l && l > -q ? w : l) +
										v +
										(q > d && d > -q ? w : d) +
										v +
										(q > g && g > -q ? w : g)),
									C || D || 1 !== G
										? ((u +=
												v +
												(q > j && j > -q ? w : j) +
												v +
												(q > m && m > -q ? w : m) +
												v +
												(q > e && e > -q ? w : e)),
										  (u +=
												v +
												(q > h && h > -q ? w : h) +
												v +
												(q > k && k > -q ? w : k) +
												v +
												(q > o && o > -q ? w : o) +
												v))
										: (u += ",0,0,0,0,1,0,"),
									(u +=
										H +
										v +
										I +
										v +
										J +
										v +
										(M ? 1 + -J / M : 1) +
										")"),
									(A[Ca] = u);
							});
				(j = Ga.prototype),
					(j.x =
						j.y =
						j.z =
						j.skewX =
						j.skewY =
						j.rotation =
						j.rotationX =
						j.rotationY =
						j.zOrigin =
						j.xPercent =
						j.yPercent =
						j.xOffset =
						j.yOffset =
							0),
					(j.scaleX = j.scaleY = j.scaleZ = 1),
					ya(
						"transform,scale,scaleX,scaleY,scaleZ,x,y,z,rotation,rotationX,rotationY,rotationZ,skewX,skewY,shortRotation,shortRotationX,shortRotationY,shortRotationZ,transformOrigin,svgOrigin,transformPerspective,directionalRotation,parseTransform,force3D,skewType,xPercent,yPercent,smoothOrigin",
						{
							parser: function (a, b, c, d, f, h, i) {
								if (d._lastParsedTransform === i) return f;
								d._lastParsedTransform = i;
								var j,
									k =
										i.scale && "function" == typeof i.scale
											? i.scale
											: 0;
								"function" == typeof i[c] &&
									((j = i[c]), (i[c] = b)),
									k && (i.scale = k(r, a));
								var l,
									m,
									n,
									o,
									p,
									s,
									t,
									u,
									v,
									w = a._gsTransform,
									x = a.style,
									y = 1e-6,
									z = Ba.length,
									A = i,
									B = {},
									C = "transformOrigin",
									D = Ra(a, e, !0, A.parseTransform),
									E =
										A.transform &&
										("function" == typeof A.transform
											? A.transform(r, q)
											: A.transform);
								if (
									((D.skewType =
										A.skewType ||
										D.skewType ||
										g.defaultSkewType),
									(d._transform = D),
									E && "string" == typeof E && Ca)
								)
									(m = Q.style),
										(m[Ca] = E),
										(m.display = "block"),
										(m.position = "absolute"),
										O.body.appendChild(Q),
										(l = Ra(Q, null, !1)),
										"simple" === D.skewType &&
											(l.scaleY *= Math.cos(l.skewX * K)),
										D.svg &&
											((s = D.xOrigin),
											(t = D.yOrigin),
											(l.x -= D.xOffset),
											(l.y -= D.yOffset),
											(A.transformOrigin ||
												A.svgOrigin) &&
												((E = {}),
												La(
													a,
													ha(A.transformOrigin),
													E,
													A.svgOrigin,
													A.smoothOrigin,
													!0
												),
												(s = E.xOrigin),
												(t = E.yOrigin),
												(l.x -= E.xOffset - D.xOffset),
												(l.y -= E.yOffset - D.yOffset)),
											(s || t) &&
												((u = Qa(Q, !0)),
												(l.x -=
													s - (s * u[0] + t * u[2])),
												(l.y -=
													t -
													(s * u[1] + t * u[3])))),
										O.body.removeChild(Q),
										l.perspective ||
											(l.perspective = D.perspective),
										null != A.xPercent &&
											(l.xPercent = ja(
												A.xPercent,
												D.xPercent
											)),
										null != A.yPercent &&
											(l.yPercent = ja(
												A.yPercent,
												D.yPercent
											));
								else if ("object" == typeof A) {
									if (
										((l = {
											scaleX: ja(
												null != A.scaleX
													? A.scaleX
													: A.scale,
												D.scaleX
											),
											scaleY: ja(
												null != A.scaleY
													? A.scaleY
													: A.scale,
												D.scaleY
											),
											scaleZ: ja(A.scaleZ, D.scaleZ),
											x: ja(A.x, D.x),
											y: ja(A.y, D.y),
											z: ja(A.z, D.z),
											xPercent: ja(
												A.xPercent,
												D.xPercent
											),
											yPercent: ja(
												A.yPercent,
												D.yPercent
											),
											perspective: ja(
												A.transformPerspective,
												D.perspective
											),
										}),
										(p = A.directionalRotation),
										null != p)
									)
										if ("object" == typeof p)
											for (m in p) A[m] = p[m];
										else A.rotation = p;
									"string" == typeof A.x &&
										-1 !== A.x.indexOf("%") &&
										((l.x = 0),
										(l.xPercent = ja(A.x, D.xPercent))),
										"string" == typeof A.y &&
											-1 !== A.y.indexOf("%") &&
											((l.y = 0),
											(l.yPercent = ja(A.y, D.yPercent))),
										(l.rotation = ka(
											"rotation" in A
												? A.rotation
												: "shortRotation" in A
												? A.shortRotation + "_short"
												: "rotationZ" in A
												? A.rotationZ
												: D.rotation,
											D.rotation,
											"rotation",
											B
										)),
										Fa &&
											((l.rotationX = ka(
												"rotationX" in A
													? A.rotationX
													: "shortRotationX" in A
													? A.shortRotationX +
													  "_short"
													: D.rotationX || 0,
												D.rotationX,
												"rotationX",
												B
											)),
											(l.rotationY = ka(
												"rotationY" in A
													? A.rotationY
													: "shortRotationY" in A
													? A.shortRotationY +
													  "_short"
													: D.rotationY || 0,
												D.rotationY,
												"rotationY",
												B
											))),
										(l.skewX = ka(A.skewX, D.skewX)),
										(l.skewY = ka(A.skewY, D.skewY));
								}
								for (
									Fa &&
										null != A.force3D &&
										((D.force3D = A.force3D), (o = !0)),
										n =
											D.force3D ||
											D.z ||
											D.rotationX ||
											D.rotationY ||
											l.z ||
											l.rotationX ||
											l.rotationY ||
											l.perspective,
										n || null == A.scale || (l.scaleZ = 1);
									--z > -1;

								)
									(v = Ba[z]),
										(E = l[v] - D[v]),
										(E > y ||
											-y > E ||
											null != A[v] ||
											null != M[v]) &&
											((o = !0),
											(f = new ta(D, v, D[v], E, f)),
											v in B && (f.e = B[v]),
											(f.xs0 = 0),
											(f.plugin = h),
											d._overwriteProps.push(f.n));
								return (
									(E = A.transformOrigin),
									D.svg &&
										(E || A.svgOrigin) &&
										((s = D.xOffset),
										(t = D.yOffset),
										La(
											a,
											ha(E),
											l,
											A.svgOrigin,
											A.smoothOrigin
										),
										(f = ua(
											D,
											"xOrigin",
											(w ? D : l).xOrigin,
											l.xOrigin,
											f,
											C
										)),
										(f = ua(
											D,
											"yOrigin",
											(w ? D : l).yOrigin,
											l.yOrigin,
											f,
											C
										)),
										(s !== D.xOffset || t !== D.yOffset) &&
											((f = ua(
												D,
												"xOffset",
												w ? s : D.xOffset,
												D.xOffset,
												f,
												C
											)),
											(f = ua(
												D,
												"yOffset",
												w ? t : D.yOffset,
												D.yOffset,
												f,
												C
											))),
										(E = "0px 0px")),
									(E || (Fa && n && D.zOrigin)) &&
										(Ca
											? ((o = !0),
											  (v = Ea),
											  (E =
													(E ||
														_(
															a,
															v,
															e,
															!1,
															"50% 50%"
														)) + ""),
											  (f = new ta(
													x,
													v,
													0,
													0,
													f,
													-1,
													C
											  )),
											  (f.b = x[v]),
											  (f.plugin = h),
											  Fa
													? ((m = D.zOrigin),
													  (E = E.split(" ")),
													  (D.zOrigin =
															(E.length > 2 &&
															(0 === m ||
																"0px" !== E[2])
																? parseFloat(
																		E[2]
																  )
																: m) || 0),
													  (f.xs0 = f.e =
															E[0] +
															" " +
															(E[1] || "50%") +
															" 0px"),
													  (f = new ta(
															D,
															"zOrigin",
															0,
															0,
															f,
															-1,
															f.n
													  )),
													  (f.b = m),
													  (f.xs0 = f.e = D.zOrigin))
													: (f.xs0 = f.e = E))
											: ha(E + "", D)),
									o &&
										(d._transformType =
											(D.svg && Aa) ||
											(!n && 3 !== this._transformType)
												? 2
												: 3),
									j && (i[c] = j),
									k && (i.scale = k),
									f
								);
							},
							prefix: !0,
						}
					),
					ya("boxShadow", {
						defaultValue: "0px 0px 0px 0px #999",
						prefix: !0,
						color: !0,
						multi: !0,
						keyword: "inset",
					}),
					ya("borderRadius", {
						defaultValue: "0px",
						parser: function (a, b, c, f, g, h) {
							b = this.format(b);
							var i,
								j,
								k,
								l,
								m,
								n,
								o,
								p,
								q,
								r,
								s,
								t,
								u,
								v,
								w,
								x,
								y = [
									"borderTopLeftRadius",
									"borderTopRightRadius",
									"borderBottomRightRadius",
									"borderBottomLeftRadius",
								],
								z = a.style;
							for (
								q = parseFloat(a.offsetWidth),
									r = parseFloat(a.offsetHeight),
									i = b.split(" "),
									j = 0;
								j < y.length;
								j++
							)
								this.p.indexOf("border") && (y[j] = Z(y[j])),
									(m = l = _(a, y[j], e, !1, "0px")),
									-1 !== m.indexOf(" ") &&
										((l = m.split(" ")),
										(m = l[0]),
										(l = l[1])),
									(n = k = i[j]),
									(o = parseFloat(m)),
									(t = m.substr((o + "").length)),
									(u = "=" === n.charAt(1)),
									u
										? ((p = parseInt(
												n.charAt(0) + "1",
												10
										  )),
										  (n = n.substr(2)),
										  (p *= parseFloat(n)),
										  (s =
												n.substr(
													(p + "").length -
														(0 > p ? 1 : 0)
												) || ""))
										: ((p = parseFloat(n)),
										  (s = n.substr((p + "").length))),
									"" === s && (s = d[c] || t),
									s !== t &&
										((v = aa(a, "borderLeft", o, t)),
										(w = aa(a, "borderTop", o, t)),
										"%" === s
											? ((m = (v / q) * 100 + "%"),
											  (l = (w / r) * 100 + "%"))
											: "em" === s
											? ((x = aa(
													a,
													"borderLeft",
													1,
													"em"
											  )),
											  (m = v / x + "em"),
											  (l = w / x + "em"))
											: ((m = v + "px"), (l = w + "px")),
										u &&
											((n = parseFloat(m) + p + s),
											(k = parseFloat(l) + p + s))),
									(g = va(
										z,
										y[j],
										m + " " + l,
										n + " " + k,
										!1,
										"0px",
										g
									));
							return g;
						},
						prefix: !0,
						formatter: qa("0px 0px 0px 0px", !1, !0),
					}),
					ya(
						"borderBottomLeftRadius,borderBottomRightRadius,borderTopLeftRadius,borderTopRightRadius",
						{
							defaultValue: "0px",
							parser: function (a, b, c, d, f, g) {
								return va(
									a.style,
									c,
									this.format(_(a, c, e, !1, "0px 0px")),
									this.format(b),
									!1,
									"0px",
									f
								);
							},
							prefix: !0,
							formatter: qa("0px 0px", !1, !0),
						}
					),
					ya("backgroundPosition", {
						defaultValue: "0 0",
						parser: function (a, b, c, d, f, g) {
							var h,
								i,
								j,
								k,
								l,
								m,
								n = "background-position",
								o = e || $(a, null),
								q = this.format(
									(o
										? p
											? o.getPropertyValue(n + "-x") +
											  " " +
											  o.getPropertyValue(n + "-y")
											: o.getPropertyValue(n)
										: a.currentStyle.backgroundPositionX +
										  " " +
										  a.currentStyle.backgroundPositionY) ||
										"0 0"
								),
								r = this.format(b);
							if (
								(-1 !== q.indexOf("%")) !=
									(-1 !== r.indexOf("%")) &&
								r.split(",").length < 2 &&
								((m = _(a, "backgroundImage").replace(D, "")),
								m && "none" !== m)
							) {
								for (
									h = q.split(" "),
										i = r.split(" "),
										R.setAttribute("src", m),
										j = 2;
									--j > -1;

								)
									(q = h[j]),
										(k = -1 !== q.indexOf("%")),
										k !== (-1 !== i[j].indexOf("%")) &&
											((l =
												0 === j
													? a.offsetWidth - R.width
													: a.offsetHeight -
													  R.height),
											(h[j] = k
												? (parseFloat(q) / 100) * l +
												  "px"
												: (parseFloat(q) / l) * 100 +
												  "%"));
								q = h.join(" ");
							}
							return this.parseComplex(a.style, q, r, f, g);
						},
						formatter: ha,
					}),
					ya("backgroundSize", {
						defaultValue: "0 0",
						formatter: function (a) {
							return (
								(a += ""),
								ha(-1 === a.indexOf(" ") ? a + " " + a : a)
							);
						},
					}),
					ya("perspective", { defaultValue: "0px", prefix: !0 }),
					ya("perspectiveOrigin", {
						defaultValue: "50% 50%",
						prefix: !0,
					}),
					ya("transformStyle", { prefix: !0 }),
					ya("backfaceVisibility", { prefix: !0 }),
					ya("userSelect", { prefix: !0 }),
					ya("margin", {
						parser: ra(
							"marginTop,marginRight,marginBottom,marginLeft"
						),
					}),
					ya("padding", {
						parser: ra(
							"paddingTop,paddingRight,paddingBottom,paddingLeft"
						),
					}),
					ya("clip", {
						defaultValue: "rect(0px,0px,0px,0px)",
						parser: function (a, b, c, d, f, g) {
							var h, i, j;
							return (
								9 > p
									? ((i = a.currentStyle),
									  (j = 8 > p ? " " : ","),
									  (h =
											"rect(" +
											i.clipTop +
											j +
											i.clipRight +
											j +
											i.clipBottom +
											j +
											i.clipLeft +
											")"),
									  (b = this.format(b).split(",").join(j)))
									: ((h = this.format(
											_(a, this.p, e, !1, this.dflt)
									  )),
									  (b = this.format(b))),
								this.parseComplex(a.style, h, b, f, g)
							);
						},
					}),
					ya("textShadow", {
						defaultValue: "0px 0px 0px #999",
						color: !0,
						multi: !0,
					}),
					ya("autoRound,strictUnits", {
						parser: function (a, b, c, d, e) {
							return e;
						},
					}),
					ya("border", {
						defaultValue: "0px solid #000",
						parser: function (a, b, c, d, f, g) {
							var h = _(a, "borderTopWidth", e, !1, "0px"),
								i = this.format(b).split(" "),
								j = i[0].replace(w, "");
							return (
								"px" !== j &&
									(h =
										parseFloat(h) /
											aa(a, "borderTopWidth", 1, j) +
										j),
								this.parseComplex(
									a.style,
									this.format(
										h +
											" " +
											_(
												a,
												"borderTopStyle",
												e,
												!1,
												"solid"
											) +
											" " +
											_(
												a,
												"borderTopColor",
												e,
												!1,
												"#000"
											)
									),
									i.join(" "),
									f,
									g
								)
							);
						},
						color: !0,
						formatter: function (a) {
							var b = a.split(" ");
							return (
								b[0] +
								" " +
								(b[1] || "solid") +
								" " +
								(a.match(pa) || ["#000"])[0]
							);
						},
					}),
					ya("borderWidth", {
						parser: ra(
							"borderTopWidth,borderRightWidth,borderBottomWidth,borderLeftWidth"
						),
					}),
					ya("float,cssFloat,styleFloat", {
						parser: function (a, b, c, d, e, f) {
							var g = a.style,
								h = "cssFloat" in g ? "cssFloat" : "styleFloat";
							return new ta(g, h, 0, 0, e, -1, c, !1, 0, g[h], b);
						},
					});
				var Ua = function (a) {
					var b,
						c = this.t,
						d = c.filter || _(this.data, "filter") || "",
						e = (this.s + this.c * a) | 0;
					100 === e &&
						(-1 === d.indexOf("atrix(") &&
						-1 === d.indexOf("radient(") &&
						-1 === d.indexOf("oader(")
							? (c.removeAttribute("filter"),
							  (b = !_(this.data, "filter")))
							: ((c.filter = d.replace(z, "")), (b = !0))),
						b ||
							(this.xn1 &&
								(c.filter = d =
									d || "alpha(opacity=" + e + ")"),
							-1 === d.indexOf("pacity")
								? (0 === e && this.xn1) ||
								  (c.filter = d + " alpha(opacity=" + e + ")")
								: (c.filter = d.replace(x, "opacity=" + e)));
				};
				ya("opacity,alpha,autoAlpha", {
					defaultValue: "1",
					parser: function (a, b, c, d, f, g) {
						var h = parseFloat(_(a, "opacity", e, !1, "1")),
							i = a.style,
							j = "autoAlpha" === c;
						return (
							"string" == typeof b &&
								"=" === b.charAt(1) &&
								(b =
									("-" === b.charAt(0) ? -1 : 1) *
										parseFloat(b.substr(2)) +
									h),
							j &&
								1 === h &&
								"hidden" === _(a, "visibility", e) &&
								0 !== b &&
								(h = 0),
							U
								? (f = new ta(i, "opacity", h, b - h, f))
								: ((f = new ta(
										i,
										"opacity",
										100 * h,
										100 * (b - h),
										f
								  )),
								  (f.xn1 = j ? 1 : 0),
								  (i.zoom = 1),
								  (f.type = 2),
								  (f.b = "alpha(opacity=" + f.s + ")"),
								  (f.e = "alpha(opacity=" + (f.s + f.c) + ")"),
								  (f.data = a),
								  (f.plugin = g),
								  (f.setRatio = Ua)),
							j &&
								((f = new ta(
									i,
									"visibility",
									0,
									0,
									f,
									-1,
									null,
									!1,
									0,
									0 !== h ? "inherit" : "hidden",
									0 === b ? "hidden" : "inherit"
								)),
								(f.xs0 = "inherit"),
								d._overwriteProps.push(f.n),
								d._overwriteProps.push(c)),
							f
						);
					},
				});
				var Va = function (a, b) {
						b &&
							(a.removeProperty
								? (("ms" === b.substr(0, 2) ||
										"webkit" === b.substr(0, 6)) &&
										(b = "-" + b),
								  a.removeProperty(
										b.replace(B, "-$1").toLowerCase()
								  ))
								: a.removeAttribute(b));
					},
					Wa = function (a) {
						if (((this.t._gsClassPT = this), 1 === a || 0 === a)) {
							this.t.setAttribute(
								"class",
								0 === a ? this.b : this.e
							);
							for (var b = this.data, c = this.t.style; b; )
								b.v ? (c[b.p] = b.v) : Va(c, b.p),
									(b = b._next);
							1 === a &&
								this.t._gsClassPT === this &&
								(this.t._gsClassPT = null);
						} else
							this.t.getAttribute("class") !== this.e &&
								this.t.setAttribute("class", this.e);
					};
				ya("className", {
					parser: function (a, b, d, f, g, h, i) {
						var j,
							k,
							l,
							m,
							n,
							o = a.getAttribute("class") || "",
							p = a.style.cssText;
						if (
							((g = f._classNamePT = new ta(a, d, 0, 0, g, 2)),
							(g.setRatio = Wa),
							(g.pr = -11),
							(c = !0),
							(g.b = o),
							(k = ca(a, e)),
							(l = a._gsClassPT))
						) {
							for (m = {}, n = l.data; n; )
								(m[n.p] = 1), (n = n._next);
							l.setRatio(1);
						}
						return (
							(a._gsClassPT = g),
							(g.e =
								"=" !== b.charAt(1)
									? b
									: o.replace(
											new RegExp(
												"(?:\\s|^)" +
													b.substr(2) +
													"(?![\\w-])"
											),
											""
									  ) +
									  ("+" === b.charAt(0)
											? " " + b.substr(2)
											: "")),
							a.setAttribute("class", g.e),
							(j = da(a, k, ca(a), i, m)),
							a.setAttribute("class", o),
							(g.data = j.firstMPT),
							(a.style.cssText = p),
							(g = g.xfirst = f.parse(a, j.difs, g, h))
						);
					},
				});
				var Xa = function (a) {
					if (
						(1 === a || 0 === a) &&
						this.data._totalTime === this.data._totalDuration &&
						"isFromStart" !== this.data.data
					) {
						var b,
							c,
							d,
							e,
							f,
							g = this.t.style,
							h = i.transform.parse;
						if ("all" === this.e) (g.cssText = ""), (e = !0);
						else
							for (
								b = this.e.split(" ").join("").split(","),
									d = b.length;
								--d > -1;

							)
								(c = b[d]),
									i[c] &&
										(i[c].parse === h
											? (e = !0)
											: (c =
													"transformOrigin" === c
														? Ea
														: i[c].p)),
									Va(g, c);
						e &&
							(Va(g, Ca),
							(f = this.t._gsTransform),
							f &&
								(f.svg &&
									(this.t.removeAttribute("data-svg-origin"),
									this.t.removeAttribute("transform")),
								delete this.t._gsTransform));
					}
				};
				for (
					ya("clearProps", {
						parser: function (a, b, d, e, f) {
							return (
								(f = new ta(a, d, 0, 0, f, 2)),
								(f.setRatio = Xa),
								(f.e = b),
								(f.pr = -10),
								(f.data = e._tween),
								(c = !0),
								f
							);
						},
					}),
						j = "bezier,throwProps,physicsProps,physics2D".split(
							","
						),
						wa = j.length;
					wa--;

				)
					za(j[wa]);
				(j = g.prototype),
					(j._firstPT = j._lastParsedTransform = j._transform = null),
					(j._onInitTween = function (a, b, h, j) {
						if (!a.nodeType) return !1;
						(this._target = q = a),
							(this._tween = h),
							(this._vars = b),
							(r = j),
							(k = b.autoRound),
							(c = !1),
							(d = b.suffixMap || g.suffixMap),
							(e = $(a, "")),
							(f = this._overwriteProps);
						var n,
							p,
							s,
							t,
							u,
							v,
							w,
							x,
							z,
							A = a.style;
						if (
							(l &&
								"" === A.zIndex &&
								((n = _(a, "zIndex", e)),
								("auto" === n || "" === n) &&
									this._addLazySet(A, "zIndex", 0)),
							"string" == typeof b &&
								((t = A.cssText),
								(n = ca(a, e)),
								(A.cssText = t + ";" + b),
								(n = da(a, n, ca(a)).difs),
								!U &&
									y.test(b) &&
									(n.opacity = parseFloat(RegExp.$1)),
								(b = n),
								(A.cssText = t)),
							b.className
								? (this._firstPT = p =
										i.className.parse(
											a,
											b.className,
											"className",
											this,
											null,
											null,
											b
										))
								: (this._firstPT = p = this.parse(a, b, null)),
							this._transformType)
						) {
							for (
								z = 3 === this._transformType,
									Ca
										? m &&
										  ((l = !0),
										  "" === A.zIndex &&
												((w = _(a, "zIndex", e)),
												("auto" === w || "" === w) &&
													this._addLazySet(
														A,
														"zIndex",
														0
													)),
										  o &&
												this._addLazySet(
													A,
													"WebkitBackfaceVisibility",
													this._vars
														.WebkitBackfaceVisibility ||
														(z
															? "visible"
															: "hidden")
												))
										: (A.zoom = 1),
									s = p;
								s && s._next;

							)
								s = s._next;
							(x = new ta(a, "transform", 0, 0, null, 2)),
								this._linkCSSP(x, null, s),
								(x.setRatio = Ca ? Ta : Sa),
								(x.data = this._transform || Ra(a, e, !0)),
								(x.tween = h),
								(x.pr = -1),
								f.pop();
						}
						if (c) {
							for (; p; ) {
								for (v = p._next, s = t; s && s.pr > p.pr; )
									s = s._next;
								(p._prev = s ? s._prev : u)
									? (p._prev._next = p)
									: (t = p),
									(p._next = s) ? (s._prev = p) : (u = p),
									(p = v);
							}
							this._firstPT = t;
						}
						return !0;
					}),
					(j.parse = function (a, b, c, f) {
						var g,
							h,
							j,
							l,
							m,
							n,
							o,
							p,
							s,
							t,
							u = a.style;
						for (g in b) {
							if (
								((n = b[g]),
								"function" == typeof n && (n = n(r, q)),
								(h = i[g]))
							)
								c = h.parse(a, n, g, this, c, f, b);
							else {
								if ("--" === g.substr(0, 2)) {
									this._tween._propLookup[g] =
										this._addTween.call(
											this._tween,
											a.style,
											"setProperty",
											$(a).getPropertyValue(g) + "",
											n + "",
											g,
											!1,
											g
										);
									continue;
								}
								(m = _(a, g, e) + ""),
									(s = "string" == typeof n),
									"color" === g ||
									"fill" === g ||
									"stroke" === g ||
									-1 !== g.indexOf("Color") ||
									(s && A.test(n))
										? (s ||
												((n = na(n)),
												(n =
													(n.length > 3
														? "rgba("
														: "rgb(") +
													n.join(",") +
													")")),
										  (c = va(
												u,
												g,
												m,
												n,
												!0,
												"transparent",
												c,
												0,
												f
										  )))
										: s && J.test(n)
										? (c = va(
												u,
												g,
												m,
												n,
												!0,
												null,
												c,
												0,
												f
										  ))
										: ((j = parseFloat(m)),
										  (o =
												j || 0 === j
													? m.substr((j + "").length)
													: ""),
										  ("" === m || "auto" === m) &&
												("width" === g || "height" === g
													? ((j = ga(a, g, e)),
													  (o = "px"))
													: "left" === g ||
													  "top" === g
													? ((j = ba(a, g, e)),
													  (o = "px"))
													: ((j =
															"opacity" !== g
																? 0
																: 1),
													  (o = ""))),
										  (t = s && "=" === n.charAt(1)),
										  t
												? ((l = parseInt(
														n.charAt(0) + "1",
														10
												  )),
												  (n = n.substr(2)),
												  (l *= parseFloat(n)),
												  (p = n.replace(w, "")))
												: ((l = parseFloat(n)),
												  (p = s
														? n.replace(w, "")
														: "")),
										  "" === p && (p = g in d ? d[g] : o),
										  (n =
												l || 0 === l
													? (t ? l + j : l) + p
													: b[g]),
										  o !== p &&
												("" !== p ||
													"lineHeight" === g) &&
												(l || 0 === l) &&
												j &&
												((j = aa(a, g, j, o)),
												"%" === p
													? ((j /=
															aa(a, g, 100, "%") /
															100),
													  b.strictUnits !== !0 &&
															(m = j + "%"))
													: "em" === p ||
													  "rem" === p ||
													  "vw" === p ||
													  "vh" === p
													? (j /= aa(a, g, 1, p))
													: "px" !== p &&
													  ((l = aa(a, g, l, p)),
													  (p = "px")),
												t &&
													(l || 0 === l) &&
													(n = l + j + p)),
										  t && (l += j),
										  (!j && 0 !== j) || (!l && 0 !== l)
												? void 0 !== u[g] &&
												  (n ||
														(n + "" != "NaN" &&
															null != n))
													? ((c = new ta(
															u,
															g,
															l || j || 0,
															0,
															c,
															-1,
															g,
															!1,
															0,
															m,
															n
													  )),
													  (c.xs0 =
															"none" !== n ||
															("display" !== g &&
																-1 ===
																	g.indexOf(
																		"Style"
																	))
																? n
																: m))
													: W(
															"invalid " +
																g +
																" tween value: " +
																b[g]
													  )
												: ((c = new ta(
														u,
														g,
														j,
														l - j,
														c,
														0,
														g,
														k !== !1 &&
															("px" === p ||
																"zIndex" === g),
														0,
														m,
														n
												  )),
												  (c.xs0 = p)));
							}
							f && c && !c.plugin && (c.plugin = f);
						}
						return c;
					}),
					(j.setRatio = function (a) {
						var b,
							c,
							d,
							e = this._firstPT,
							f = 1e-6;
						if (
							1 !== a ||
							(this._tween._time !== this._tween._duration &&
								0 !== this._tween._time)
						)
							if (
								a ||
								(this._tween._time !== this._tween._duration &&
									0 !== this._tween._time) ||
								this._tween._rawPrevTime === -1e-6
							)
								for (; e; ) {
									if (
										((b = e.c * a + e.s),
										e.r
											? (b = Math.round(b))
											: f > b && b > -f && (b = 0),
										e.type)
									)
										if (1 === e.type)
											if (((d = e.l), 2 === d))
												e.t[e.p] =
													e.xs0 +
													b +
													e.xs1 +
													e.xn1 +
													e.xs2;
											else if (3 === d)
												e.t[e.p] =
													e.xs0 +
													b +
													e.xs1 +
													e.xn1 +
													e.xs2 +
													e.xn2 +
													e.xs3;
											else if (4 === d)
												e.t[e.p] =
													e.xs0 +
													b +
													e.xs1 +
													e.xn1 +
													e.xs2 +
													e.xn2 +
													e.xs3 +
													e.xn3 +
													e.xs4;
											else if (5 === d)
												e.t[e.p] =
													e.xs0 +
													b +
													e.xs1 +
													e.xn1 +
													e.xs2 +
													e.xn2 +
													e.xs3 +
													e.xn3 +
													e.xs4 +
													e.xn4 +
													e.xs5;
											else {
												for (
													c = e.xs0 + b + e.xs1,
														d = 1;
													d < e.l;
													d++
												)
													c +=
														e["xn" + d] +
														e["xs" + (d + 1)];
												e.t[e.p] = c;
											}
										else
											-1 === e.type
												? (e.t[e.p] = e.xs0)
												: e.setRatio && e.setRatio(a);
									else e.t[e.p] = b + e.xs0;
									e = e._next;
								}
							else
								for (; e; )
									2 !== e.type
										? (e.t[e.p] = e.b)
										: e.setRatio(a),
										(e = e._next);
						else
							for (; e; ) {
								if (2 !== e.type)
									if (e.r && -1 !== e.type)
										if (
											((b = Math.round(e.s + e.c)),
											e.type)
										) {
											if (1 === e.type) {
												for (
													d = e.l,
														c = e.xs0 + b + e.xs1,
														d = 1;
													d < e.l;
													d++
												)
													c +=
														e["xn" + d] +
														e["xs" + (d + 1)];
												e.t[e.p] = c;
											}
										} else e.t[e.p] = b + e.xs0;
									else e.t[e.p] = e.e;
								else e.setRatio(a);
								e = e._next;
							}
					}),
					(j._enableTransforms = function (a) {
						(this._transform =
							this._transform || Ra(this._target, e, !0)),
							(this._transformType =
								(this._transform.svg && Aa) ||
								(!a && 3 !== this._transformType)
									? 2
									: 3);
					});
				var Ya = function (a) {
					(this.t[this.p] = this.e),
						this.data._linkCSSP(this, this._next, null, !0);
				};
				(j._addLazySet = function (a, b, c) {
					var d = (this._firstPT = new ta(
						a,
						b,
						0,
						0,
						this._firstPT,
						2
					));
					(d.e = c), (d.setRatio = Ya), (d.data = this);
				}),
					(j._linkCSSP = function (a, b, c, d) {
						return (
							a &&
								(b && (b._prev = a),
								a._next && (a._next._prev = a._prev),
								a._prev
									? (a._prev._next = a._next)
									: this._firstPT === a &&
									  ((this._firstPT = a._next), (d = !0)),
								c
									? (c._next = a)
									: d ||
									  null !== this._firstPT ||
									  (this._firstPT = a),
								(a._next = b),
								(a._prev = c)),
							a
						);
					}),
					(j._mod = function (a) {
						for (var b = this._firstPT; b; )
							"function" == typeof a[b.p] &&
								a[b.p] === Math.round &&
								(b.r = 1),
								(b = b._next);
					}),
					(j._kill = function (b) {
						var c,
							d,
							e,
							f = b;
						if (b.autoAlpha || b.alpha) {
							f = {};
							for (d in b) f[d] = b[d];
							(f.opacity = 1), f.autoAlpha && (f.visibility = 1);
						}
						for (
							b.className &&
								(c = this._classNamePT) &&
								((e = c.xfirst),
								e && e._prev
									? this._linkCSSP(
											e._prev,
											c._next,
											e._prev._prev
									  )
									: e === this._firstPT &&
									  (this._firstPT = c._next),
								c._next &&
									this._linkCSSP(
										c._next,
										c._next._next,
										e._prev
									),
								(this._classNamePT = null)),
								c = this._firstPT;
							c;

						)
							c.plugin &&
								c.plugin !== d &&
								c.plugin._kill &&
								(c.plugin._kill(b), (d = c.plugin)),
								(c = c._next);
						return a.prototype._kill.call(this, f);
					});
				var Za = function (a, b, c) {
					var d, e, f, g;
					if (a.slice) for (e = a.length; --e > -1; ) Za(a[e], b, c);
					else
						for (d = a.childNodes, e = d.length; --e > -1; )
							(f = d[e]),
								(g = f.type),
								f.style && (b.push(ca(f)), c && c.push(f)),
								(1 !== g && 9 !== g && 11 !== g) ||
									!f.childNodes.length ||
									Za(f, b, c);
				};
				return (
					(g.cascadeTo = function (a, c, d) {
						var e,
							f,
							g,
							h,
							i = b.to(a, c, d),
							j = [i],
							k = [],
							l = [],
							m = [],
							n = b._internals.reservedProps;
						for (
							a = i._targets || i.target,
								Za(a, k, m),
								i.render(c, !0, !0),
								Za(a, l),
								i.render(0, !0, !0),
								i._enabled(!0),
								e = m.length;
							--e > -1;

						)
							if (((f = da(m[e], k[e], l[e])), f.firstMPT)) {
								f = f.difs;
								for (g in d) n[g] && (f[g] = d[g]);
								h = {};
								for (g in f) h[g] = k[e][g];
								j.push(b.fromTo(m[e], c, h, f));
							}
						return j;
					}),
					a.activate([g]),
					g
				);
			},
			!0
		),
		(function () {
			var a = _gsScope._gsDefine.plugin({
					propName: "roundProps",
					version: "1.6.0",
					priority: -1,
					API: 2,
					init: function (a, b, c) {
						return (this._tween = c), !0;
					},
				}),
				b = function (a) {
					for (; a; )
						a.f || a.blob || (a.m = Math.round), (a = a._next);
				},
				c = a.prototype;
			(c._onInitAllProps = function () {
				for (
					var a,
						c,
						d,
						e = this._tween,
						f = e.vars.roundProps.join
							? e.vars.roundProps
							: e.vars.roundProps.split(","),
						g = f.length,
						h = {},
						i = e._propLookup.roundProps;
					--g > -1;

				)
					h[f[g]] = Math.round;
				for (g = f.length; --g > -1; )
					for (a = f[g], c = e._firstPT; c; )
						(d = c._next),
							c.pg
								? c.t._mod(h)
								: c.n === a &&
								  (2 === c.f && c.t
										? b(c.t._firstPT)
										: (this._add(c.t, a, c.s, c.c),
										  d && (d._prev = c._prev),
										  c._prev
												? (c._prev._next = d)
												: e._firstPT === c &&
												  (e._firstPT = d),
										  (c._next = c._prev = null),
										  (e._propLookup[a] = i))),
							(c = d);
				return !1;
			}),
				(c._add = function (a, b, c, d) {
					this._addTween(a, b, c, c + d, b, Math.round),
						this._overwriteProps.push(b);
				});
		})(),
		(function () {
			_gsScope._gsDefine.plugin({
				propName: "attr",
				API: 2,
				version: "0.6.1",
				init: function (a, b, c, d) {
					var e, f;
					if ("function" != typeof a.setAttribute) return !1;
					for (e in b)
						(f = b[e]),
							"function" == typeof f && (f = f(d, a)),
							this._addTween(
								a,
								"setAttribute",
								a.getAttribute(e) + "",
								f + "",
								e,
								!1,
								e
							),
							this._overwriteProps.push(e);
					return !0;
				},
			});
		})(),
		(_gsScope._gsDefine.plugin({
			propName: "directionalRotation",
			version: "0.3.1",
			API: 2,
			init: function (a, b, c, d) {
				"object" != typeof b && (b = { rotation: b }),
					(this.finals = {});
				var e,
					f,
					g,
					h,
					i,
					j,
					k = b.useRadians === !0 ? 2 * Math.PI : 360,
					l = 1e-6;
				for (e in b)
					"useRadians" !== e &&
						((h = b[e]),
						"function" == typeof h && (h = h(d, a)),
						(j = (h + "").split("_")),
						(f = j[0]),
						(g = parseFloat(
							"function" != typeof a[e]
								? a[e]
								: a[
										e.indexOf("set") ||
										"function" !=
											typeof a["get" + e.substr(3)]
											? e
											: "get" + e.substr(3)
								  ]()
						)),
						(h = this.finals[e] =
							"string" == typeof f && "=" === f.charAt(1)
								? g +
								  parseInt(f.charAt(0) + "1", 10) *
										Number(f.substr(2))
								: Number(f) || 0),
						(i = h - g),
						j.length &&
							((f = j.join("_")),
							-1 !== f.indexOf("short") &&
								((i %= k),
								i !== i % (k / 2) &&
									(i = 0 > i ? i + k : i - k)),
							-1 !== f.indexOf("_cw") && 0 > i
								? (i =
										((i + 9999999999 * k) % k) -
										((i / k) | 0) * k)
								: -1 !== f.indexOf("ccw") &&
								  i > 0 &&
								  (i =
										((i - 9999999999 * k) % k) -
										((i / k) | 0) * k)),
						(i > l || -l > i) &&
							(this._addTween(a, e, g, g + i, e),
							this._overwriteProps.push(e)));
				return !0;
			},
			set: function (a) {
				var b;
				if (1 !== a) this._super.setRatio.call(this, a);
				else
					for (b = this._firstPT; b; )
						b.f
							? b.t[b.p](this.finals[b.p])
							: (b.t[b.p] = this.finals[b.p]),
							(b = b._next);
			},
		})._autoCSS = !0),
		_gsScope._gsDefine(
			"easing.Back",
			["easing.Ease"],
			function (a) {
				var b,
					c,
					d,
					e = _gsScope.GreenSockGlobals || _gsScope,
					f = e.com.greensock,
					g = 2 * Math.PI,
					h = Math.PI / 2,
					i = f._class,
					j = function (b, c) {
						var d = i("easing." + b, function () {}, !0),
							e = (d.prototype = new a());
						return (e.constructor = d), (e.getRatio = c), d;
					},
					k = a.register || function () {},
					l = function (a, b, c, d, e) {
						var f = i(
							"easing." + a,
							{
								easeOut: new b(),
								easeIn: new c(),
								easeInOut: new d(),
							},
							!0
						);
						return k(f, a), f;
					},
					m = function (a, b, c) {
						(this.t = a),
							(this.v = b),
							c &&
								((this.next = c),
								(c.prev = this),
								(this.c = c.v - b),
								(this.gap = c.t - a));
					},
					n = function (b, c) {
						var d = i(
								"easing." + b,
								function (a) {
									(this._p1 = a || 0 === a ? a : 1.70158),
										(this._p2 = 1.525 * this._p1);
								},
								!0
							),
							e = (d.prototype = new a());
						return (
							(e.constructor = d),
							(e.getRatio = c),
							(e.config = function (a) {
								return new d(a);
							}),
							d
						);
					},
					o = l(
						"Back",
						n("BackOut", function (a) {
							return (
								(a -= 1) * a * ((this._p1 + 1) * a + this._p1) +
								1
							);
						}),
						n("BackIn", function (a) {
							return a * a * ((this._p1 + 1) * a - this._p1);
						}),
						n("BackInOut", function (a) {
							return (a *= 2) < 1
								? 0.5 * a * a * ((this._p2 + 1) * a - this._p2)
								: 0.5 *
										((a -= 2) *
											a *
											((this._p2 + 1) * a + this._p2) +
											2);
						})
					),
					p = i(
						"easing.SlowMo",
						function (a, b, c) {
							(b = b || 0 === b ? b : 0.7),
								null == a ? (a = 0.7) : a > 1 && (a = 1),
								(this._p = 1 !== a ? b : 0),
								(this._p1 = (1 - a) / 2),
								(this._p2 = a),
								(this._p3 = this._p1 + this._p2),
								(this._calcEnd = c === !0);
						},
						!0
					),
					q = (p.prototype = new a());
				return (
					(q.constructor = p),
					(q.getRatio = function (a) {
						var b = a + (0.5 - a) * this._p;
						return a < this._p1
							? this._calcEnd
								? 1 - (a = 1 - a / this._p1) * a
								: b - (a = 1 - a / this._p1) * a * a * a * b
							: a > this._p3
							? this._calcEnd
								? 1 === a
									? 0
									: 1 - (a = (a - this._p3) / this._p1) * a
								: b +
								  (a - b) *
										(a = (a - this._p3) / this._p1) *
										a *
										a *
										a
							: this._calcEnd
							? 1
							: b;
					}),
					(p.ease = new p(0.7, 0.7)),
					(q.config = p.config =
						function (a, b, c) {
							return new p(a, b, c);
						}),
					(b = i(
						"easing.SteppedEase",
						function (a, b) {
							(a = a || 1),
								(this._p1 = 1 / a),
								(this._p2 = a + (b ? 0 : 1)),
								(this._p3 = b ? 1 : 0);
						},
						!0
					)),
					(q = b.prototype = new a()),
					(q.constructor = b),
					(q.getRatio = function (a) {
						return (
							0 > a ? (a = 0) : a >= 1 && (a = 0.999999999),
							(((this._p2 * a) | 0) + this._p3) * this._p1
						);
					}),
					(q.config = b.config =
						function (a, c) {
							return new b(a, c);
						}),
					(c = i(
						"easing.RoughEase",
						function (b) {
							b = b || {};
							for (
								var c,
									d,
									e,
									f,
									g,
									h,
									i = b.taper || "none",
									j = [],
									k = 0,
									l = 0 | (b.points || 20),
									n = l,
									o = b.randomize !== !1,
									p = b.clamp === !0,
									q =
										b.template instanceof a
											? b.template
											: null,
									r =
										"number" == typeof b.strength
											? 0.4 * b.strength
											: 0.4;
								--n > -1;

							)
								(c = o ? Math.random() : (1 / l) * n),
									(d = q ? q.getRatio(c) : c),
									"none" === i
										? (e = r)
										: "out" === i
										? ((f = 1 - c), (e = f * f * r))
										: "in" === i
										? (e = c * c * r)
										: 0.5 > c
										? ((f = 2 * c), (e = f * f * 0.5 * r))
										: ((f = 2 * (1 - c)),
										  (e = f * f * 0.5 * r)),
									o
										? (d += Math.random() * e - 0.5 * e)
										: n % 2
										? (d += 0.5 * e)
										: (d -= 0.5 * e),
									p && (d > 1 ? (d = 1) : 0 > d && (d = 0)),
									(j[k++] = { x: c, y: d });
							for (
								j.sort(function (a, b) {
									return a.x - b.x;
								}),
									h = new m(1, 1, null),
									n = l;
								--n > -1;

							)
								(g = j[n]), (h = new m(g.x, g.y, h));
							this._prev = new m(0, 0, 0 !== h.t ? h : h.next);
						},
						!0
					)),
					(q = c.prototype = new a()),
					(q.constructor = c),
					(q.getRatio = function (a) {
						var b = this._prev;
						if (a > b.t) {
							for (; b.next && a >= b.t; ) b = b.next;
							b = b.prev;
						} else for (; b.prev && a <= b.t; ) b = b.prev;
						return (
							(this._prev = b), b.v + ((a - b.t) / b.gap) * b.c
						);
					}),
					(q.config = function (a) {
						return new c(a);
					}),
					(c.ease = new c()),
					l(
						"Bounce",
						j("BounceOut", function (a) {
							return 1 / 2.75 > a
								? 7.5625 * a * a
								: 2 / 2.75 > a
								? 7.5625 * (a -= 1.5 / 2.75) * a + 0.75
								: 2.5 / 2.75 > a
								? 7.5625 * (a -= 2.25 / 2.75) * a + 0.9375
								: 7.5625 * (a -= 2.625 / 2.75) * a + 0.984375;
						}),
						j("BounceIn", function (a) {
							return (a = 1 - a) < 1 / 2.75
								? 1 - 7.5625 * a * a
								: 2 / 2.75 > a
								? 1 - (7.5625 * (a -= 1.5 / 2.75) * a + 0.75)
								: 2.5 / 2.75 > a
								? 1 - (7.5625 * (a -= 2.25 / 2.75) * a + 0.9375)
								: 1 -
								  (7.5625 * (a -= 2.625 / 2.75) * a + 0.984375);
						}),
						j("BounceInOut", function (a) {
							var b = 0.5 > a;
							return (
								(a = b ? 1 - 2 * a : 2 * a - 1),
								(a =
									1 / 2.75 > a
										? 7.5625 * a * a
										: 2 / 2.75 > a
										? 7.5625 * (a -= 1.5 / 2.75) * a + 0.75
										: 2.5 / 2.75 > a
										? 7.5625 * (a -= 2.25 / 2.75) * a +
										  0.9375
										: 7.5625 * (a -= 2.625 / 2.75) * a +
										  0.984375),
								b ? 0.5 * (1 - a) : 0.5 * a + 0.5
							);
						})
					),
					l(
						"Circ",
						j("CircOut", function (a) {
							return Math.sqrt(1 - (a -= 1) * a);
						}),
						j("CircIn", function (a) {
							return -(Math.sqrt(1 - a * a) - 1);
						}),
						j("CircInOut", function (a) {
							return (a *= 2) < 1
								? -0.5 * (Math.sqrt(1 - a * a) - 1)
								: 0.5 * (Math.sqrt(1 - (a -= 2) * a) + 1);
						})
					),
					(d = function (b, c, d) {
						var e = i(
								"easing." + b,
								function (a, b) {
									(this._p1 = a >= 1 ? a : 1),
										(this._p2 = (b || d) / (1 > a ? a : 1)),
										(this._p3 =
											(this._p2 / g) *
											(Math.asin(1 / this._p1) || 0)),
										(this._p2 = g / this._p2);
								},
								!0
							),
							f = (e.prototype = new a());
						return (
							(f.constructor = e),
							(f.getRatio = c),
							(f.config = function (a, b) {
								return new e(a, b);
							}),
							e
						);
					}),
					l(
						"Elastic",
						d(
							"ElasticOut",
							function (a) {
								return (
									this._p1 *
										Math.pow(2, -10 * a) *
										Math.sin((a - this._p3) * this._p2) +
									1
								);
							},
							0.3
						),
						d(
							"ElasticIn",
							function (a) {
								return -(
									this._p1 *
									Math.pow(2, 10 * (a -= 1)) *
									Math.sin((a - this._p3) * this._p2)
								);
							},
							0.3
						),
						d(
							"ElasticInOut",
							function (a) {
								return (a *= 2) < 1
									? -0.5 *
											(this._p1 *
												Math.pow(2, 10 * (a -= 1)) *
												Math.sin(
													(a - this._p3) * this._p2
												))
									: this._p1 *
											Math.pow(2, -10 * (a -= 1)) *
											Math.sin(
												(a - this._p3) * this._p2
											) *
											0.5 +
											1;
							},
							0.45
						)
					),
					l(
						"Expo",
						j("ExpoOut", function (a) {
							return 1 - Math.pow(2, -10 * a);
						}),
						j("ExpoIn", function (a) {
							return Math.pow(2, 10 * (a - 1)) - 0.001;
						}),
						j("ExpoInOut", function (a) {
							return (a *= 2) < 1
								? 0.5 * Math.pow(2, 10 * (a - 1))
								: 0.5 * (2 - Math.pow(2, -10 * (a - 1)));
						})
					),
					l(
						"Sine",
						j("SineOut", function (a) {
							return Math.sin(a * h);
						}),
						j("SineIn", function (a) {
							return -Math.cos(a * h) + 1;
						}),
						j("SineInOut", function (a) {
							return -0.5 * (Math.cos(Math.PI * a) - 1);
						})
					),
					i(
						"easing.EaseLookup",
						{
							find: function (b) {
								return a.map[b];
							},
						},
						!0
					),
					k(e.SlowMo, "SlowMo", "ease,"),
					k(c, "RoughEase", "ease,"),
					k(b, "SteppedEase", "ease,"),
					o
				);
			},
			!0
		);
}),
	_gsScope._gsDefine && _gsScope._gsQueue.pop()(),
	(function (a, b) {
		"use strict";
		var c = {},
			d = a.document,
			e = (a.GreenSockGlobals = a.GreenSockGlobals || a);
		if (!e.TweenLite) {
			var f,
				g,
				h,
				i,
				j,
				k = function (a) {
					var b,
						c = a.split("."),
						d = e;
					for (b = 0; b < c.length; b++) d[c[b]] = d = d[c[b]] || {};
					return d;
				},
				l = k("com.greensock"),
				m = 1e-10,
				n = function (a) {
					var b,
						c = [],
						d = a.length;
					for (b = 0; b !== d; c.push(a[b++]));
					return c;
				},
				o = function () {},
				p = (function () {
					var a = Object.prototype.toString,
						b = a.call([]);
					return function (c) {
						return (
							null != c &&
							(c instanceof Array ||
								("object" == typeof c &&
									!!c.push &&
									a.call(c) === b))
						);
					};
				})(),
				q = {},
				r = function (d, f, g, h) {
					(this.sc = q[d] ? q[d].sc : []),
						(q[d] = this),
						(this.gsClass = null),
						(this.func = g);
					var i = [];
					(this.check = function (j) {
						for (var l, m, n, o, p = f.length, s = p; --p > -1; )
							(l = q[f[p]] || new r(f[p], [])).gsClass
								? ((i[p] = l.gsClass), s--)
								: j && l.sc.push(this);
						if (0 === s && g) {
							if (
								((m = ("com.greensock." + d).split(".")),
								(n = m.pop()),
								(o =
									k(m.join("."))[n] =
									this.gsClass =
										g.apply(g, i)),
								h)
							)
								if (
									((e[n] = c[n] = o),
									"undefined" != typeof module &&
										module.exports)
								)
									if (d === b) {
										module.exports = c[b] = o;
										for (p in c) o[p] = c[p];
									} else c[b] && (c[b][n] = o);
								else
									"function" == typeof define &&
										define.amd &&
										define(
											(a.GreenSockAMDPath
												? a.GreenSockAMDPath + "/"
												: "") + d.split(".").pop(),
											[],
											function () {
												return o;
											}
										);
							for (p = 0; p < this.sc.length; p++)
								this.sc[p].check();
						}
					}),
						this.check(!0);
				},
				s = (a._gsDefine = function (a, b, c, d) {
					return new r(a, b, c, d);
				}),
				t = (l._class = function (a, b, c) {
					return (
						(b = b || function () {}),
						s(
							a,
							[],
							function () {
								return b;
							},
							c
						),
						b
					);
				});
			s.globals = e;
			var u = [0, 0, 1, 1],
				v = t(
					"easing.Ease",
					function (a, b, c, d) {
						(this._func = a),
							(this._type = c || 0),
							(this._power = d || 0),
							(this._params = b ? u.concat(b) : u);
					},
					!0
				),
				w = (v.map = {}),
				x = (v.register = function (a, b, c, d) {
					for (
						var e,
							f,
							g,
							h,
							i = b.split(","),
							j = i.length,
							k = (c || "easeIn,easeOut,easeInOut").split(",");
						--j > -1;

					)
						for (
							f = i[j],
								e = d
									? t("easing." + f, null, !0)
									: l.easing[f] || {},
								g = k.length;
							--g > -1;

						)
							(h = k[g]),
								(w[f + "." + h] =
									w[h + f] =
									e[h] =
										a.getRatio ? a : a[h] || new a());
				});
			for (
				h = v.prototype,
					h._calcEnd = !1,
					h.getRatio = function (a) {
						if (this._func)
							return (
								(this._params[0] = a),
								this._func.apply(null, this._params)
							);
						var b = this._type,
							c = this._power,
							d =
								1 === b
									? 1 - a
									: 2 === b
									? a
									: 0.5 > a
									? 2 * a
									: 2 * (1 - a);
						return (
							1 === c
								? (d *= d)
								: 2 === c
								? (d *= d * d)
								: 3 === c
								? (d *= d * d * d)
								: 4 === c && (d *= d * d * d * d),
							1 === b
								? 1 - d
								: 2 === b
								? d
								: 0.5 > a
								? d / 2
								: 1 - d / 2
						);
					},
					f = ["Linear", "Quad", "Cubic", "Quart", "Quint,Strong"],
					g = f.length;
				--g > -1;

			)
				(h = f[g] + ",Power" + g),
					x(new v(null, null, 1, g), h, "easeOut", !0),
					x(
						new v(null, null, 2, g),
						h,
						"easeIn" + (0 === g ? ",easeNone" : "")
					),
					x(new v(null, null, 3, g), h, "easeInOut");
			(w.linear = l.easing.Linear.easeIn),
				(w.swing = l.easing.Quad.easeInOut);
			var y = t("events.EventDispatcher", function (a) {
				(this._listeners = {}), (this._eventTarget = a || this);
			});
			(h = y.prototype),
				(h.addEventListener = function (a, b, c, d, e) {
					e = e || 0;
					var f,
						g,
						h = this._listeners[a],
						k = 0;
					for (
						this !== i || j || i.wake(),
							null == h && (this._listeners[a] = h = []),
							g = h.length;
						--g > -1;

					)
						(f = h[g]),
							f.c === b && f.s === c
								? h.splice(g, 1)
								: 0 === k && f.pr < e && (k = g + 1);
					h.splice(k, 0, { c: b, s: c, up: d, pr: e });
				}),
				(h.removeEventListener = function (a, b) {
					var c,
						d = this._listeners[a];
					if (d)
						for (c = d.length; --c > -1; )
							if (d[c].c === b) return void d.splice(c, 1);
				}),
				(h.dispatchEvent = function (a) {
					var b,
						c,
						d,
						e = this._listeners[a];
					if (e)
						for (
							b = e.length,
								b > 1 && (e = e.slice(0)),
								c = this._eventTarget;
							--b > -1;

						)
							(d = e[b]),
								d &&
									(d.up
										? d.c.call(d.s || c, {
												type: a,
												target: c,
										  })
										: d.c.call(d.s || c));
				});
			var z = a.requestAnimationFrame,
				A = a.cancelAnimationFrame,
				B =
					Date.now ||
					function () {
						return new Date().getTime();
					},
				C = B();
			for (
				f = ["ms", "moz", "webkit", "o"], g = f.length;
				--g > -1 && !z;

			)
				(z = a[f[g] + "RequestAnimationFrame"]),
					(A =
						a[f[g] + "CancelAnimationFrame"] ||
						a[f[g] + "CancelRequestAnimationFrame"]);
			t("Ticker", function (a, b) {
				var c,
					e,
					f,
					g,
					h,
					k = this,
					l = B(),
					n = b !== !1 && z ? "auto" : !1,
					p = 500,
					q = 33,
					r = "tick",
					s = function (a) {
						var b,
							d,
							i = B() - C;
						i > p && (l += i - q),
							(C += i),
							(k.time = (C - l) / 1e3),
							(b = k.time - h),
							(!c || b > 0 || a === !0) &&
								(k.frame++,
								(h += b + (b >= g ? 0.004 : g - b)),
								(d = !0)),
							a !== !0 && (f = e(s)),
							d && k.dispatchEvent(r);
					};
				y.call(k),
					(k.time = k.frame = 0),
					(k.tick = function () {
						s(!0);
					}),
					(k.lagSmoothing = function (a, b) {
						return arguments.length
							? ((p = a || 1 / m), void (q = Math.min(b, p, 0)))
							: 1 / m > p;
					}),
					(k.sleep = function () {
						null != f &&
							(n && A ? A(f) : clearTimeout(f),
							(e = o),
							(f = null),
							k === i && (j = !1));
					}),
					(k.wake = function (a) {
						null !== f
							? k.sleep()
							: a
							? (l += -C + (C = B()))
							: k.frame > 10 && (C = B() - p + 5),
							(e =
								0 === c
									? o
									: n && z
									? z
									: function (a) {
											return setTimeout(
												a,
												(1e3 * (h - k.time) + 1) | 0
											);
									  }),
							k === i && (j = !0),
							s(2);
					}),
					(k.fps = function (a) {
						return arguments.length
							? ((c = a),
							  (g = 1 / (c || 60)),
							  (h = this.time + g),
							  void k.wake())
							: c;
					}),
					(k.useRAF = function (a) {
						return arguments.length
							? (k.sleep(), (n = a), void k.fps(c))
							: n;
					}),
					k.fps(a),
					setTimeout(function () {
						"auto" === n &&
							k.frame < 5 &&
							"hidden" !== d.visibilityState &&
							k.useRAF(!1);
					}, 1500);
			}),
				(h = l.Ticker.prototype = new l.events.EventDispatcher()),
				(h.constructor = l.Ticker);
			var D = t("core.Animation", function (a, b) {
				if (
					((this.vars = b = b || {}),
					(this._duration = this._totalDuration = a || 0),
					(this._delay = Number(b.delay) || 0),
					(this._timeScale = 1),
					(this._active = b.immediateRender === !0),
					(this.data = b.data),
					(this._reversed = b.reversed === !0),
					X)
				) {
					j || i.wake();
					var c = this.vars.useFrames ? W : X;
					c.add(this, c._time), this.vars.paused && this.paused(!0);
				}
			});
			(i = D.ticker = new l.Ticker()),
				(h = D.prototype),
				(h._dirty = h._gc = h._initted = h._paused = !1),
				(h._totalTime = h._time = 0),
				(h._rawPrevTime = -1),
				(h._next =
					h._last =
					h._onUpdate =
					h._timeline =
					h.timeline =
						null),
				(h._paused = !1);
			var E = function () {
				j &&
					B() - C > 2e3 &&
					("hidden" !== d.visibilityState || !i.lagSmoothing()) &&
					i.wake();
				var a = setTimeout(E, 2e3);
				a.unref && a.unref();
			};
			E(),
				(h.play = function (a, b) {
					return (
						null != a && this.seek(a, b),
						this.reversed(!1).paused(!1)
					);
				}),
				(h.pause = function (a, b) {
					return null != a && this.seek(a, b), this.paused(!0);
				}),
				(h.resume = function (a, b) {
					return null != a && this.seek(a, b), this.paused(!1);
				}),
				(h.seek = function (a, b) {
					return this.totalTime(Number(a), b !== !1);
				}),
				(h.restart = function (a, b) {
					return this.reversed(!1)
						.paused(!1)
						.totalTime(a ? -this._delay : 0, b !== !1, !0);
				}),
				(h.reverse = function (a, b) {
					return (
						null != a && this.seek(a || this.totalDuration(), b),
						this.reversed(!0).paused(!1)
					);
				}),
				(h.render = function (a, b, c) {}),
				(h.invalidate = function () {
					return (
						(this._time = this._totalTime = 0),
						(this._initted = this._gc = !1),
						(this._rawPrevTime = -1),
						(this._gc || !this.timeline) && this._enabled(!0),
						this
					);
				}),
				(h.isActive = function () {
					var a,
						b = this._timeline,
						c = this._startTime;
					return (
						!b ||
						(!this._gc &&
							!this._paused &&
							b.isActive() &&
							(a = b.rawTime(!0)) >= c &&
							a <
								c +
									this.totalDuration() / this._timeScale -
									1e-7)
					);
				}),
				(h._enabled = function (a, b) {
					return (
						j || i.wake(),
						(this._gc = !a),
						(this._active = this.isActive()),
						b !== !0 &&
							(a && !this.timeline
								? this._timeline.add(
										this,
										this._startTime - this._delay
								  )
								: !a &&
								  this.timeline &&
								  this._timeline._remove(this, !0)),
						!1
					);
				}),
				(h._kill = function (a, b) {
					return this._enabled(!1, !1);
				}),
				(h.kill = function (a, b) {
					return this._kill(a, b), this;
				}),
				(h._uncache = function (a) {
					for (var b = a ? this : this.timeline; b; )
						(b._dirty = !0), (b = b.timeline);
					return this;
				}),
				(h._swapSelfInParams = function (a) {
					for (var b = a.length, c = a.concat(); --b > -1; )
						"{self}" === a[b] && (c[b] = this);
					return c;
				}),
				(h._callback = function (a) {
					var b = this.vars,
						c = b[a],
						d = b[a + "Params"],
						e = b[a + "Scope"] || b.callbackScope || this,
						f = d ? d.length : 0;
					switch (f) {
						case 0:
							c.call(e);
							break;
						case 1:
							c.call(e, d[0]);
							break;
						case 2:
							c.call(e, d[0], d[1]);
							break;
						default:
							c.apply(e, d);
					}
				}),
				(h.eventCallback = function (a, b, c, d) {
					if ("on" === (a || "").substr(0, 2)) {
						var e = this.vars;
						if (1 === arguments.length) return e[a];
						null == b
							? delete e[a]
							: ((e[a] = b),
							  (e[a + "Params"] =
									p(c) && -1 !== c.join("").indexOf("{self}")
										? this._swapSelfInParams(c)
										: c),
							  (e[a + "Scope"] = d)),
							"onUpdate" === a && (this._onUpdate = b);
					}
					return this;
				}),
				(h.delay = function (a) {
					return arguments.length
						? (this._timeline.smoothChildTiming &&
								this.startTime(
									this._startTime + a - this._delay
								),
						  (this._delay = a),
						  this)
						: this._delay;
				}),
				(h.duration = function (a) {
					return arguments.length
						? ((this._duration = this._totalDuration = a),
						  this._uncache(!0),
						  this._timeline.smoothChildTiming &&
								this._time > 0 &&
								this._time < this._duration &&
								0 !== a &&
								this.totalTime(
									this._totalTime * (a / this._duration),
									!0
								),
						  this)
						: ((this._dirty = !1), this._duration);
				}),
				(h.totalDuration = function (a) {
					return (
						(this._dirty = !1),
						arguments.length
							? this.duration(a)
							: this._totalDuration
					);
				}),
				(h.time = function (a, b) {
					return arguments.length
						? (this._dirty && this.totalDuration(),
						  this.totalTime(
								a > this._duration ? this._duration : a,
								b
						  ))
						: this._time;
				}),
				(h.totalTime = function (a, b, c) {
					if ((j || i.wake(), !arguments.length))
						return this._totalTime;
					if (this._timeline) {
						if (
							(0 > a && !c && (a += this.totalDuration()),
							this._timeline.smoothChildTiming)
						) {
							this._dirty && this.totalDuration();
							var d = this._totalDuration,
								e = this._timeline;
							if (
								(a > d && !c && (a = d),
								(this._startTime =
									(this._paused ? this._pauseTime : e._time) -
									(this._reversed ? d - a : a) /
										this._timeScale),
								e._dirty || this._uncache(!1),
								e._timeline)
							)
								for (; e._timeline; )
									e._timeline._time !==
										(e._startTime + e._totalTime) /
											e._timeScale &&
										e.totalTime(e._totalTime, !0),
										(e = e._timeline);
						}
						this._gc && this._enabled(!0, !1),
							(this._totalTime !== a || 0 === this._duration) &&
								(J.length && Z(),
								this.render(a, b, !1),
								J.length && Z());
					}
					return this;
				}),
				(h.progress = h.totalProgress =
					function (a, b) {
						var c = this.duration();
						return arguments.length
							? this.totalTime(c * a, b)
							: c
							? this._time / c
							: this.ratio;
					}),
				(h.startTime = function (a) {
					return arguments.length
						? (a !== this._startTime &&
								((this._startTime = a),
								this.timeline &&
									this.timeline._sortChildren &&
									this.timeline.add(this, a - this._delay)),
						  this)
						: this._startTime;
				}),
				(h.endTime = function (a) {
					return (
						this._startTime +
						(0 != a ? this.totalDuration() : this.duration()) /
							this._timeScale
					);
				}),
				(h.timeScale = function (a) {
					if (!arguments.length) return this._timeScale;
					var b, c;
					for (
						a = a || m,
							this._timeline &&
								this._timeline.smoothChildTiming &&
								((b = this._pauseTime),
								(c =
									b || 0 === b
										? b
										: this._timeline.totalTime()),
								(this._startTime =
									c -
									((c - this._startTime) * this._timeScale) /
										a)),
							this._timeScale = a,
							c = this.timeline;
						c && c.timeline;

					)
						(c._dirty = !0), c.totalDuration(), (c = c.timeline);
					return this;
				}),
				(h.reversed = function (a) {
					return arguments.length
						? (a != this._reversed &&
								((this._reversed = a),
								this.totalTime(
									this._timeline &&
										!this._timeline.smoothChildTiming
										? this.totalDuration() - this._totalTime
										: this._totalTime,
									!0
								)),
						  this)
						: this._reversed;
				}),
				(h.paused = function (a) {
					if (!arguments.length) return this._paused;
					var b,
						c,
						d = this._timeline;
					return (
						a != this._paused &&
							d &&
							(j || a || i.wake(),
							(b = d.rawTime()),
							(c = b - this._pauseTime),
							!a &&
								d.smoothChildTiming &&
								((this._startTime += c), this._uncache(!1)),
							(this._pauseTime = a ? b : null),
							(this._paused = a),
							(this._active = this.isActive()),
							!a &&
								0 !== c &&
								this._initted &&
								this.duration() &&
								((b = d.smoothChildTiming
									? this._totalTime
									: (b - this._startTime) / this._timeScale),
								this.render(b, b === this._totalTime, !0))),
						this._gc && !a && this._enabled(!0, !1),
						this
					);
				});
			var F = t("core.SimpleTimeline", function (a) {
				D.call(this, 0, a),
					(this.autoRemoveChildren = this.smoothChildTiming = !0);
			});
			(h = F.prototype = new D()),
				(h.constructor = F),
				(h.kill()._gc = !1),
				(h._first = h._last = h._recent = null),
				(h._sortChildren = !1),
				(h.add = h.insert =
					function (a, b, c, d) {
						var e, f;
						if (
							((a._startTime = Number(b || 0) + a._delay),
							a._paused &&
								this !== a._timeline &&
								(a._pauseTime =
									a._startTime +
									(this.rawTime() - a._startTime) /
										a._timeScale),
							a.timeline && a.timeline._remove(a, !0),
							(a.timeline = a._timeline = this),
							a._gc && a._enabled(!0, !0),
							(e = this._last),
							this._sortChildren)
						)
							for (f = a._startTime; e && e._startTime > f; )
								e = e._prev;
						return (
							e
								? ((a._next = e._next), (e._next = a))
								: ((a._next = this._first), (this._first = a)),
							a._next ? (a._next._prev = a) : (this._last = a),
							(a._prev = e),
							(this._recent = a),
							this._timeline && this._uncache(!0),
							this
						);
					}),
				(h._remove = function (a, b) {
					return (
						a.timeline === this &&
							(b || a._enabled(!1, !0),
							a._prev
								? (a._prev._next = a._next)
								: this._first === a && (this._first = a._next),
							a._next
								? (a._next._prev = a._prev)
								: this._last === a && (this._last = a._prev),
							(a._next = a._prev = a.timeline = null),
							a === this._recent && (this._recent = this._last),
							this._timeline && this._uncache(!0)),
						this
					);
				}),
				(h.render = function (a, b, c) {
					var d,
						e = this._first;
					for (
						this._totalTime = this._time = this._rawPrevTime = a;
						e;

					)
						(d = e._next),
							(e._active ||
								(a >= e._startTime && !e._paused && !e._gc)) &&
								(e._reversed
									? e.render(
											(e._dirty
												? e.totalDuration()
												: e._totalDuration) -
												(a - e._startTime) *
													e._timeScale,
											b,
											c
									  )
									: e.render(
											(a - e._startTime) * e._timeScale,
											b,
											c
									  )),
							(e = d);
				}),
				(h.rawTime = function () {
					return j || i.wake(), this._totalTime;
				});
			var G = t(
					"TweenLite",
					function (b, c, d) {
						if (
							(D.call(this, c, d),
							(this.render = G.prototype.render),
							null == b)
						)
							throw "Cannot tween a null target.";
						this.target = b =
							"string" != typeof b ? b : G.selector(b) || b;
						var e,
							f,
							g,
							h =
								b.jquery ||
								(b.length &&
									b !== a &&
									b[0] &&
									(b[0] === a ||
										(b[0].nodeType &&
											b[0].style &&
											!b.nodeType))),
							i = this.vars.overwrite;
						if (
							((this._overwrite = i =
								null == i
									? V[G.defaultOverwrite]
									: "number" == typeof i
									? i >> 0
									: V[i]),
							(h || b instanceof Array || (b.push && p(b))) &&
								"number" != typeof b[0])
						)
							for (
								this._targets = g = n(b),
									this._propLookup = [],
									this._siblings = [],
									e = 0;
								e < g.length;
								e++
							)
								(f = g[e]),
									f
										? "string" != typeof f
											? f.length &&
											  f !== a &&
											  f[0] &&
											  (f[0] === a ||
													(f[0].nodeType &&
														f[0].style &&
														!f.nodeType))
												? (g.splice(e--, 1),
												  (this._targets = g =
														g.concat(n(f))))
												: ((this._siblings[e] = $(
														f,
														this,
														!1
												  )),
												  1 === i &&
														this._siblings[e]
															.length > 1 &&
														aa(
															f,
															this,
															null,
															1,
															this._siblings[e]
														))
											: ((f = g[e--] = G.selector(f)),
											  "string" == typeof f &&
													g.splice(e + 1, 1))
										: g.splice(e--, 1);
						else
							(this._propLookup = {}),
								(this._siblings = $(b, this, !1)),
								1 === i &&
									this._siblings.length > 1 &&
									aa(b, this, null, 1, this._siblings);
						(this.vars.immediateRender ||
							(0 === c &&
								0 === this._delay &&
								this.vars.immediateRender !== !1)) &&
							((this._time = -m),
							this.render(Math.min(0, -this._delay)));
					},
					!0
				),
				H = function (b) {
					return (
						b &&
						b.length &&
						b !== a &&
						b[0] &&
						(b[0] === a ||
							(b[0].nodeType && b[0].style && !b.nodeType))
					);
				},
				I = function (a, b) {
					var c,
						d = {};
					for (c in a)
						U[c] ||
							(c in b &&
								"transform" !== c &&
								"x" !== c &&
								"y" !== c &&
								"width" !== c &&
								"height" !== c &&
								"className" !== c &&
								"border" !== c) ||
							!(!R[c] || (R[c] && R[c]._autoCSS)) ||
							((d[c] = a[c]), delete a[c]);
					a.css = d;
				};
			(h = G.prototype = new D()),
				(h.constructor = G),
				(h.kill()._gc = !1),
				(h.ratio = 0),
				(h._firstPT =
					h._targets =
					h._overwrittenProps =
					h._startAt =
						null),
				(h._notifyPluginsOfEnabled = h._lazy = !1),
				(G.version = "1.20.3"),
				(G.defaultEase = h._ease = new v(null, null, 1, 1)),
				(G.defaultOverwrite = "auto"),
				(G.ticker = i),
				(G.autoSleep = 120),
				(G.lagSmoothing = function (a, b) {
					i.lagSmoothing(a, b);
				}),
				(G.selector =
					a.$ ||
					a.jQuery ||
					function (b) {
						var c = a.$ || a.jQuery;
						return c
							? ((G.selector = c), c(b))
							: "undefined" == typeof d
							? b
							: d.querySelectorAll
							? d.querySelectorAll(b)
							: d.getElementById(
									"#" === b.charAt(0) ? b.substr(1) : b
							  );
					});
			var J = [],
				K = {},
				L = /(?:(-|-=|\+=)?\d*\.?\d*(?:e[\-+]?\d+)?)[0-9]/gi,
				M = /[\+-]=-?[\.\d]/,
				N = function (a) {
					for (var b, c = this._firstPT, d = 1e-6; c; )
						(b = c.blob
							? 1 === a && null != this.end
								? this.end
								: a
								? this.join("")
								: this.start
							: c.c * a + c.s),
							c.m
								? (b = c.m(b, this._target || c.t))
								: d > b && b > -d && !c.blob && (b = 0),
							c.f
								? c.fp
									? c.t[c.p](c.fp, b)
									: c.t[c.p](b)
								: (c.t[c.p] = b),
							(c = c._next);
				},
				O = function (a, b, c, d) {
					var e,
						f,
						g,
						h,
						i,
						j,
						k,
						l = [],
						m = 0,
						n = "",
						o = 0;
					for (
						l.start = a,
							l.end = b,
							a = l[0] = a + "",
							b = l[1] = b + "",
							c && (c(l), (a = l[0]), (b = l[1])),
							l.length = 0,
							e = a.match(L) || [],
							f = b.match(L) || [],
							d &&
								((d._next = null),
								(d.blob = 1),
								(l._firstPT = l._applyPT = d)),
							i = f.length,
							h = 0;
						i > h;
						h++
					)
						(k = f[h]),
							(j = b.substr(m, b.indexOf(k, m) - m)),
							(n += j || !h ? j : ","),
							(m += j.length),
							o
								? (o = (o + 1) % 5)
								: "rgba(" === j.substr(-5) && (o = 1),
							k === e[h] || e.length <= h
								? (n += k)
								: (n && (l.push(n), (n = "")),
								  (g = parseFloat(e[h])),
								  l.push(g),
								  (l._firstPT = {
										_next: l._firstPT,
										t: l,
										p: l.length - 1,
										s: g,
										c:
											("=" === k.charAt(1)
												? parseInt(
														k.charAt(0) + "1",
														10
												  ) * parseFloat(k.substr(2))
												: parseFloat(k) - g) || 0,
										f: 0,
										m: o && 4 > o ? Math.round : 0,
								  })),
							(m += k.length);
					return (
						(n += b.substr(m)),
						n && l.push(n),
						(l.setRatio = N),
						M.test(b) && (l.end = null),
						l
					);
				},
				P = function (a, b, c, d, e, f, g, h, i) {
					"function" == typeof d && (d = d(i || 0, a));
					var j,
						k = typeof a[b],
						l =
							"function" !== k
								? ""
								: b.indexOf("set") ||
								  "function" != typeof a["get" + b.substr(3)]
								? b
								: "get" + b.substr(3),
						m = "get" !== c ? c : l ? (g ? a[l](g) : a[l]()) : a[b],
						n = "string" == typeof d && "=" === d.charAt(1),
						o = {
							t: a,
							p: b,
							s: m,
							f: "function" === k,
							pg: 0,
							n: e || b,
							m: f
								? "function" == typeof f
									? f
									: Math.round
								: 0,
							pr: 0,
							c: n
								? parseInt(d.charAt(0) + "1", 10) *
								  parseFloat(d.substr(2))
								: parseFloat(d) - m || 0,
						};
					return (
						("number" != typeof m ||
							("number" != typeof d && !n)) &&
							(g ||
							isNaN(m) ||
							(!n && isNaN(d)) ||
							"boolean" == typeof m ||
							"boolean" == typeof d
								? ((o.fp = g),
								  (j = O(
										m,
										n ? parseFloat(o.s) + o.c : d,
										h || G.defaultStringFilter,
										o
								  )),
								  (o = {
										t: j,
										p: "setRatio",
										s: 0,
										c: 1,
										f: 2,
										pg: 0,
										n: e || b,
										pr: 0,
										m: 0,
								  }))
								: ((o.s = parseFloat(m)),
								  n || (o.c = parseFloat(d) - o.s || 0))),
						o.c
							? ((o._next = this._firstPT) && (o._next._prev = o),
							  (this._firstPT = o),
							  o)
							: void 0
					);
				},
				Q = (G._internals = {
					isArray: p,
					isSelector: H,
					lazyTweens: J,
					blobDif: O,
				}),
				R = (G._plugins = {}),
				S = (Q.tweenLookup = {}),
				T = 0,
				U = (Q.reservedProps = {
					ease: 1,
					delay: 1,
					overwrite: 1,
					onComplete: 1,
					onCompleteParams: 1,
					onCompleteScope: 1,
					useFrames: 1,
					runBackwards: 1,
					startAt: 1,
					onUpdate: 1,
					onUpdateParams: 1,
					onUpdateScope: 1,
					onStart: 1,
					onStartParams: 1,
					onStartScope: 1,
					onReverseComplete: 1,
					onReverseCompleteParams: 1,
					onReverseCompleteScope: 1,
					onRepeat: 1,
					onRepeatParams: 1,
					onRepeatScope: 1,
					easeParams: 1,
					yoyo: 1,
					immediateRender: 1,
					repeat: 1,
					repeatDelay: 1,
					data: 1,
					paused: 1,
					reversed: 1,
					autoCSS: 1,
					lazy: 1,
					onOverwrite: 1,
					callbackScope: 1,
					stringFilter: 1,
					id: 1,
					yoyoEase: 1,
				}),
				V = {
					none: 0,
					all: 1,
					auto: 2,
					concurrent: 3,
					allOnStart: 4,
					preexisting: 5,
					true: 1,
					false: 0,
				},
				W = (D._rootFramesTimeline = new F()),
				X = (D._rootTimeline = new F()),
				Y = 30,
				Z = (Q.lazyRender = function () {
					var a,
						b = J.length;
					for (K = {}; --b > -1; )
						(a = J[b]),
							a &&
								a._lazy !== !1 &&
								(a.render(a._lazy[0], a._lazy[1], !0),
								(a._lazy = !1));
					J.length = 0;
				});
			(X._startTime = i.time),
				(W._startTime = i.frame),
				(X._active = W._active = !0),
				setTimeout(Z, 1),
				(D._updateRoot = G.render =
					function () {
						var a, b, c;
						if (
							(J.length && Z(),
							X.render(
								(i.time - X._startTime) * X._timeScale,
								!1,
								!1
							),
							W.render(
								(i.frame - W._startTime) * W._timeScale,
								!1,
								!1
							),
							J.length && Z(),
							i.frame >= Y)
						) {
							Y = i.frame + (parseInt(G.autoSleep, 10) || 120);
							for (c in S) {
								for (b = S[c].tweens, a = b.length; --a > -1; )
									b[a]._gc && b.splice(a, 1);
								0 === b.length && delete S[c];
							}
							if (
								((c = X._first),
								(!c || c._paused) &&
									G.autoSleep &&
									!W._first &&
									1 === i._listeners.tick.length)
							) {
								for (; c && c._paused; ) c = c._next;
								c || i.sleep();
							}
						}
					}),
				i.addEventListener("tick", D._updateRoot);
			var $ = function (a, b, c) {
					var d,
						e,
						f = a._gsTweenID;
					if (
						(S[f || (a._gsTweenID = f = "t" + T++)] ||
							(S[f] = { target: a, tweens: [] }),
						b && ((d = S[f].tweens), (d[(e = d.length)] = b), c))
					)
						for (; --e > -1; ) d[e] === b && d.splice(e, 1);
					return S[f].tweens;
				},
				_ = function (a, b, c, d) {
					var e,
						f,
						g = a.vars.onOverwrite;
					return (
						g && (e = g(a, b, c, d)),
						(g = G.onOverwrite),
						g && (f = g(a, b, c, d)),
						e !== !1 && f !== !1
					);
				},
				aa = function (a, b, c, d, e) {
					var f, g, h, i;
					if (1 === d || d >= 4) {
						for (i = e.length, f = 0; i > f; f++)
							if ((h = e[f]) !== b)
								h._gc || (h._kill(null, a, b) && (g = !0));
							else if (5 === d) break;
						return g;
					}
					var j,
						k = b._startTime + m,
						l = [],
						n = 0,
						o = 0 === b._duration;
					for (f = e.length; --f > -1; )
						(h = e[f]) === b ||
							h._gc ||
							h._paused ||
							(h._timeline !== b._timeline
								? ((j = j || ba(b, 0, o)),
								  0 === ba(h, j, o) && (l[n++] = h))
								: h._startTime <= k &&
								  h._startTime +
										h.totalDuration() / h._timeScale >
										k &&
								  (((o || !h._initted) &&
										k - h._startTime <= 2e-10) ||
										(l[n++] = h)));
					for (f = n; --f > -1; )
						if (
							((h = l[f]),
							2 === d && h._kill(c, a, b) && (g = !0),
							2 !== d || (!h._firstPT && h._initted))
						) {
							if (2 !== d && !_(h, b)) continue;
							h._enabled(!1, !1) && (g = !0);
						}
					return g;
				},
				ba = function (a, b, c) {
					for (
						var d = a._timeline, e = d._timeScale, f = a._startTime;
						d._timeline;

					) {
						if (
							((f += d._startTime),
							(e *= d._timeScale),
							d._paused)
						)
							return -100;
						d = d._timeline;
					}
					return (
						(f /= e),
						f > b
							? f - b
							: (c && f === b) || (!a._initted && 2 * m > f - b)
							? m
							: (f += a.totalDuration() / a._timeScale / e) >
							  b + m
							? 0
							: f - b - m
					);
				};
			(h._init = function () {
				var a,
					b,
					c,
					d,
					e,
					f,
					g = this.vars,
					h = this._overwrittenProps,
					i = this._duration,
					j = !!g.immediateRender,
					k = g.ease;
				if (g.startAt) {
					this._startAt &&
						(this._startAt.render(-1, !0), this._startAt.kill()),
						(e = {});
					for (d in g.startAt) e[d] = g.startAt[d];
					if (
						((e.data = "isStart"),
						(e.overwrite = !1),
						(e.immediateRender = !0),
						(e.lazy = j && g.lazy !== !1),
						(e.startAt = e.delay = null),
						(e.onUpdate = g.onUpdate),
						(e.onUpdateParams = g.onUpdateParams),
						(e.onUpdateScope =
							g.onUpdateScope || g.callbackScope || this),
						(this._startAt = G.to(this.target, 0, e)),
						j)
					)
						if (this._time > 0) this._startAt = null;
						else if (0 !== i) return;
				} else if (g.runBackwards && 0 !== i)
					if (this._startAt)
						this._startAt.render(-1, !0),
							this._startAt.kill(),
							(this._startAt = null);
					else {
						0 !== this._time && (j = !1), (c = {});
						for (d in g) (U[d] && "autoCSS" !== d) || (c[d] = g[d]);
						if (
							((c.overwrite = 0),
							(c.data = "isFromStart"),
							(c.lazy = j && g.lazy !== !1),
							(c.immediateRender = j),
							(this._startAt = G.to(this.target, 0, c)),
							j)
						) {
							if (0 === this._time) return;
						} else
							this._startAt._init(),
								this._startAt._enabled(!1),
								this.vars.immediateRender &&
									(this._startAt = null);
					}
				if (
					((this._ease = k =
						k
							? k instanceof v
								? k
								: "function" == typeof k
								? new v(k, g.easeParams)
								: w[k] || G.defaultEase
							: G.defaultEase),
					g.easeParams instanceof Array &&
						k.config &&
						(this._ease = k.config.apply(k, g.easeParams)),
					(this._easeType = this._ease._type),
					(this._easePower = this._ease._power),
					(this._firstPT = null),
					this._targets)
				)
					for (f = this._targets.length, a = 0; f > a; a++)
						this._initProps(
							this._targets[a],
							(this._propLookup[a] = {}),
							this._siblings[a],
							h ? h[a] : null,
							a
						) && (b = !0);
				else
					b = this._initProps(
						this.target,
						this._propLookup,
						this._siblings,
						h,
						0
					);
				if (
					(b && G._onPluginEvent("_onInitAllProps", this),
					h &&
						(this._firstPT ||
							("function" != typeof this.target &&
								this._enabled(!1, !1))),
					g.runBackwards)
				)
					for (c = this._firstPT; c; )
						(c.s += c.c), (c.c = -c.c), (c = c._next);
				(this._onUpdate = g.onUpdate), (this._initted = !0);
			}),
				(h._initProps = function (b, c, d, e, f) {
					var g, h, i, j, k, l;
					if (null == b) return !1;
					K[b._gsTweenID] && Z(),
						this.vars.css ||
							(b.style &&
								b !== a &&
								b.nodeType &&
								R.css &&
								this.vars.autoCSS !== !1 &&
								I(this.vars, b));
					for (g in this.vars)
						if (((l = this.vars[g]), U[g]))
							l &&
								(l instanceof Array || (l.push && p(l))) &&
								-1 !== l.join("").indexOf("{self}") &&
								(this.vars[g] = l =
									this._swapSelfInParams(l, this));
						else if (
							R[g] &&
							(j = new R[g]())._onInitTween(
								b,
								this.vars[g],
								this,
								f
							)
						) {
							for (
								this._firstPT = k =
									{
										_next: this._firstPT,
										t: j,
										p: "setRatio",
										s: 0,
										c: 1,
										f: 1,
										n: g,
										pg: 1,
										pr: j._priority,
										m: 0,
									},
									h = j._overwriteProps.length;
								--h > -1;

							)
								c[j._overwriteProps[h]] = this._firstPT;
							(j._priority || j._onInitAllProps) && (i = !0),
								(j._onDisable || j._onEnable) &&
									(this._notifyPluginsOfEnabled = !0),
								k._next && (k._next._prev = k);
						} else
							c[g] = P.call(
								this,
								b,
								g,
								"get",
								l,
								g,
								0,
								null,
								this.vars.stringFilter,
								f
							);
					return e && this._kill(e, b)
						? this._initProps(b, c, d, e, f)
						: this._overwrite > 1 &&
						  this._firstPT &&
						  d.length > 1 &&
						  aa(b, this, c, this._overwrite, d)
						? (this._kill(c, b), this._initProps(b, c, d, e, f))
						: (this._firstPT &&
								((this.vars.lazy !== !1 && this._duration) ||
									(this.vars.lazy && !this._duration)) &&
								(K[b._gsTweenID] = !0),
						  i);
				}),
				(h.render = function (a, b, c) {
					var d,
						e,
						f,
						g,
						h = this._time,
						i = this._duration,
						j = this._rawPrevTime;
					if (a >= i - 1e-7 && a >= 0)
						(this._totalTime = this._time = i),
							(this.ratio = this._ease._calcEnd
								? this._ease.getRatio(1)
								: 1),
							this._reversed ||
								((d = !0),
								(e = "onComplete"),
								(c = c || this._timeline.autoRemoveChildren)),
							0 === i &&
								(this._initted || !this.vars.lazy || c) &&
								(this._startTime === this._timeline._duration &&
									(a = 0),
								(0 > j ||
									(0 >= a && a >= -1e-7) ||
									(j === m && "isPause" !== this.data)) &&
									j !== a &&
									((c = !0),
									j > m && (e = "onReverseComplete")),
								(this._rawPrevTime = g =
									!b || a || j === a ? a : m));
					else if (1e-7 > a)
						(this._totalTime = this._time = 0),
							(this.ratio = this._ease._calcEnd
								? this._ease.getRatio(0)
								: 0),
							(0 !== h || (0 === i && j > 0)) &&
								((e = "onReverseComplete"),
								(d = this._reversed)),
							0 > a &&
								((this._active = !1),
								0 === i &&
									(this._initted || !this.vars.lazy || c) &&
									(j >= 0 &&
										(j !== m || "isPause" !== this.data) &&
										(c = !0),
									(this._rawPrevTime = g =
										!b || a || j === a ? a : m))),
							(!this._initted ||
								(this._startAt && this._startAt.progress())) &&
								(c = !0);
					else if (
						((this._totalTime = this._time = a), this._easeType)
					) {
						var k = a / i,
							l = this._easeType,
							n = this._easePower;
						(1 === l || (3 === l && k >= 0.5)) && (k = 1 - k),
							3 === l && (k *= 2),
							1 === n
								? (k *= k)
								: 2 === n
								? (k *= k * k)
								: 3 === n
								? (k *= k * k * k)
								: 4 === n && (k *= k * k * k * k),
							1 === l
								? (this.ratio = 1 - k)
								: 2 === l
								? (this.ratio = k)
								: 0.5 > a / i
								? (this.ratio = k / 2)
								: (this.ratio = 1 - k / 2);
					} else this.ratio = this._ease.getRatio(a / i);
					if (this._time !== h || c) {
						if (!this._initted) {
							if ((this._init(), !this._initted || this._gc))
								return;
							if (
								!c &&
								this._firstPT &&
								((this.vars.lazy !== !1 && this._duration) ||
									(this.vars.lazy && !this._duration))
							)
								return (
									(this._time = this._totalTime = h),
									(this._rawPrevTime = j),
									J.push(this),
									void (this._lazy = [a, b])
								);
							this._time && !d
								? (this.ratio = this._ease.getRatio(
										this._time / i
								  ))
								: d &&
								  this._ease._calcEnd &&
								  (this.ratio = this._ease.getRatio(
										0 === this._time ? 0 : 1
								  ));
						}
						for (
							this._lazy !== !1 && (this._lazy = !1),
								this._active ||
									(!this._paused &&
										this._time !== h &&
										a >= 0 &&
										(this._active = !0)),
								0 === h &&
									(this._startAt &&
										(a >= 0
											? this._startAt.render(a, !0, c)
											: e || (e = "_dummyGS")),
									this.vars.onStart &&
										(0 !== this._time || 0 === i) &&
										(b || this._callback("onStart"))),
								f = this._firstPT;
							f;

						)
							f.f
								? f.t[f.p](f.c * this.ratio + f.s)
								: (f.t[f.p] = f.c * this.ratio + f.s),
								(f = f._next);
						this._onUpdate &&
							(0 > a &&
								this._startAt &&
								a !== -1e-4 &&
								this._startAt.render(a, !0, c),
							b ||
								((this._time !== h || d || c) &&
									this._callback("onUpdate"))),
							e &&
								(!this._gc || c) &&
								(0 > a &&
									this._startAt &&
									!this._onUpdate &&
									a !== -1e-4 &&
									this._startAt.render(a, !0, c),
								d &&
									(this._timeline.autoRemoveChildren &&
										this._enabled(!1, !1),
									(this._active = !1)),
								!b && this.vars[e] && this._callback(e),
								0 === i &&
									this._rawPrevTime === m &&
									g !== m &&
									(this._rawPrevTime = 0));
					}
				}),
				(h._kill = function (a, b, c) {
					if (
						("all" === a && (a = null),
						null == a && (null == b || b === this.target))
					)
						return (this._lazy = !1), this._enabled(!1, !1);
					b =
						"string" != typeof b
							? b || this._targets || this.target
							: G.selector(b) || b;
					var d,
						e,
						f,
						g,
						h,
						i,
						j,
						k,
						l,
						m =
							c &&
							this._time &&
							c._startTime === this._startTime &&
							this._timeline === c._timeline;
					if ((p(b) || H(b)) && "number" != typeof b[0])
						for (d = b.length; --d > -1; )
							this._kill(a, b[d], c) && (i = !0);
					else {
						if (this._targets) {
							for (d = this._targets.length; --d > -1; )
								if (b === this._targets[d]) {
									(h = this._propLookup[d] || {}),
										(this._overwrittenProps =
											this._overwrittenProps || []),
										(e = this._overwrittenProps[d] =
											a
												? this._overwrittenProps[d] ||
												  {}
												: "all");
									break;
								}
						} else {
							if (b !== this.target) return !1;
							(h = this._propLookup),
								(e = this._overwrittenProps =
									a ? this._overwrittenProps || {} : "all");
						}
						if (h) {
							if (
								((j = a || h),
								(k =
									a !== e &&
									"all" !== e &&
									a !== h &&
									("object" != typeof a || !a._tempKill)),
								c && (G.onOverwrite || this.vars.onOverwrite))
							) {
								for (f in j) h[f] && (l || (l = []), l.push(f));
								if ((l || !a) && !_(this, c, b, l)) return !1;
							}
							for (f in j)
								(g = h[f]) &&
									(m &&
										(g.f ? g.t[g.p](g.s) : (g.t[g.p] = g.s),
										(i = !0)),
									g.pg && g.t._kill(j) && (i = !0),
									(g.pg &&
										0 !== g.t._overwriteProps.length) ||
										(g._prev
											? (g._prev._next = g._next)
											: g === this._firstPT &&
											  (this._firstPT = g._next),
										g._next && (g._next._prev = g._prev),
										(g._next = g._prev = null)),
									delete h[f]),
									k && (e[f] = 1);
							!this._firstPT &&
								this._initted &&
								this._enabled(!1, !1);
						}
					}
					return i;
				}),
				(h.invalidate = function () {
					return (
						this._notifyPluginsOfEnabled &&
							G._onPluginEvent("_onDisable", this),
						(this._firstPT =
							this._overwrittenProps =
							this._startAt =
							this._onUpdate =
								null),
						(this._notifyPluginsOfEnabled =
							this._active =
							this._lazy =
								!1),
						(this._propLookup = this._targets ? {} : []),
						D.prototype.invalidate.call(this),
						this.vars.immediateRender &&
							((this._time = -m),
							this.render(Math.min(0, -this._delay))),
						this
					);
				}),
				(h._enabled = function (a, b) {
					if ((j || i.wake(), a && this._gc)) {
						var c,
							d = this._targets;
						if (d)
							for (c = d.length; --c > -1; )
								this._siblings[c] = $(d[c], this, !0);
						else this._siblings = $(this.target, this, !0);
					}
					return (
						D.prototype._enabled.call(this, a, b),
						this._notifyPluginsOfEnabled && this._firstPT
							? G._onPluginEvent(
									a ? "_onEnable" : "_onDisable",
									this
							  )
							: !1
					);
				}),
				(G.to = function (a, b, c) {
					return new G(a, b, c);
				}),
				(G.from = function (a, b, c) {
					return (
						(c.runBackwards = !0),
						(c.immediateRender = 0 != c.immediateRender),
						new G(a, b, c)
					);
				}),
				(G.fromTo = function (a, b, c, d) {
					return (
						(d.startAt = c),
						(d.immediateRender =
							0 != d.immediateRender && 0 != c.immediateRender),
						new G(a, b, d)
					);
				}),
				(G.delayedCall = function (a, b, c, d, e) {
					return new G(b, 0, {
						delay: a,
						onComplete: b,
						onCompleteParams: c,
						callbackScope: d,
						onReverseComplete: b,
						onReverseCompleteParams: c,
						immediateRender: !1,
						lazy: !1,
						useFrames: e,
						overwrite: 0,
					});
				}),
				(G.set = function (a, b) {
					return new G(a, 0, b);
				}),
				(G.getTweensOf = function (a, b) {
					if (null == a) return [];
					a = "string" != typeof a ? a : G.selector(a) || a;
					var c, d, e, f;
					if ((p(a) || H(a)) && "number" != typeof a[0]) {
						for (c = a.length, d = []; --c > -1; )
							d = d.concat(G.getTweensOf(a[c], b));
						for (c = d.length; --c > -1; )
							for (f = d[c], e = c; --e > -1; )
								f === d[e] && d.splice(c, 1);
					} else if (a._gsTweenID)
						for (d = $(a).concat(), c = d.length; --c > -1; )
							(d[c]._gc || (b && !d[c].isActive())) &&
								d.splice(c, 1);
					return d || [];
				}),
				(G.killTweensOf = G.killDelayedCallsTo =
					function (a, b, c) {
						"object" == typeof b && ((c = b), (b = !1));
						for (
							var d = G.getTweensOf(a, b), e = d.length;
							--e > -1;

						)
							d[e]._kill(c, a);
					});
			var ca = t(
				"plugins.TweenPlugin",
				function (a, b) {
					(this._overwriteProps = (a || "").split(",")),
						(this._propName = this._overwriteProps[0]),
						(this._priority = b || 0),
						(this._super = ca.prototype);
				},
				!0
			);
			if (
				((h = ca.prototype),
				(ca.version = "1.19.0"),
				(ca.API = 2),
				(h._firstPT = null),
				(h._addTween = P),
				(h.setRatio = N),
				(h._kill = function (a) {
					var b,
						c = this._overwriteProps,
						d = this._firstPT;
					if (null != a[this._propName]) this._overwriteProps = [];
					else
						for (b = c.length; --b > -1; )
							null != a[c[b]] && c.splice(b, 1);
					for (; d; )
						null != a[d.n] &&
							(d._next && (d._next._prev = d._prev),
							d._prev
								? ((d._prev._next = d._next), (d._prev = null))
								: this._firstPT === d &&
								  (this._firstPT = d._next)),
							(d = d._next);
					return !1;
				}),
				(h._mod = h._roundProps =
					function (a) {
						for (var b, c = this._firstPT; c; )
							(b =
								a[this._propName] ||
								(null != c.n &&
									a[
										c.n.split(this._propName + "_").join("")
									])),
								b &&
									"function" == typeof b &&
									(2 === c.f
										? (c.t._applyPT.m = b)
										: (c.m = b)),
								(c = c._next);
					}),
				(G._onPluginEvent = function (a, b) {
					var c,
						d,
						e,
						f,
						g,
						h = b._firstPT;
					if ("_onInitAllProps" === a) {
						for (; h; ) {
							for (g = h._next, d = e; d && d.pr > h.pr; )
								d = d._next;
							(h._prev = d ? d._prev : f)
								? (h._prev._next = h)
								: (e = h),
								(h._next = d) ? (d._prev = h) : (f = h),
								(h = g);
						}
						h = b._firstPT = e;
					}
					for (; h; )
						h.pg &&
							"function" == typeof h.t[a] &&
							h.t[a]() &&
							(c = !0),
							(h = h._next);
					return c;
				}),
				(ca.activate = function (a) {
					for (var b = a.length; --b > -1; )
						a[b].API === ca.API && (R[new a[b]()._propName] = a[b]);
					return !0;
				}),
				(s.plugin = function (a) {
					if (!(a && a.propName && a.init && a.API))
						throw "illegal plugin definition.";
					var b,
						c = a.propName,
						d = a.priority || 0,
						e = a.overwriteProps,
						f = {
							init: "_onInitTween",
							set: "setRatio",
							kill: "_kill",
							round: "_mod",
							mod: "_mod",
							initAll: "_onInitAllProps",
						},
						g = t(
							"plugins." +
								c.charAt(0).toUpperCase() +
								c.substr(1) +
								"Plugin",
							function () {
								ca.call(this, c, d),
									(this._overwriteProps = e || []);
							},
							a.global === !0
						),
						h = (g.prototype = new ca(c));
					(h.constructor = g), (g.API = a.API);
					for (b in f) "function" == typeof a[b] && (h[f[b]] = a[b]);
					return (g.version = a.version), ca.activate([g]), g;
				}),
				(f = a._gsQueue))
			) {
				for (g = 0; g < f.length; g++) f[g]();
				for (h in q)
					q[h].func ||
						a.console.log(
							"GSAP encountered missing dependency: " + h
						);
			}
			j = !1;
		}
	})(
		"undefined" != typeof module &&
			module.exports &&
			"undefined" != typeof global
			? global
			: this || window,
		"TweenMax"
	);

/**
 * downCount: Simple Countdown clock with offset
 * Author: Sonny T. <hi@sonnyt.com>, sonnyt.com
 */

(function ($) {
	$.fn.downCount = function (options, callback) {
		var settings = $.extend({ date: null, offset: null }, options);
		if (!settings.date) {
			$.error("Date is not defined.");
		}
		if (!Date.parse(settings.date)) {
			$.error(
				"Incorrect date format, it should look like this, 12/24/2012 12:00:00."
			);
		}
		var container = this;
		var currentDate = function () {
			var date = new Date();
			var utc = date.getTime() + date.getTimezoneOffset() * 60000;
			var new_date = new Date(utc + 3600000 * settings.offset);
			return new_date;
		};
		function countdown() {
			var target_date = new Date(settings.date),
				current_date = currentDate();
			var difference = target_date - current_date;
			if (difference < 0) {
				clearInterval(interval);
				if (callback && typeof callback === "function") callback();
				return;
			}
			var _second = 1000,
				_minute = _second * 60,
				_hour = _minute * 60,
				_day = _hour * 24;
			var days = Math.floor(difference / _day),
				hours = Math.floor((difference % _day) / _hour),
				minutes = Math.floor((difference % _hour) / _minute),
				seconds = Math.floor((difference % _minute) / _second);
			days = String(days).length >= 2 ? days : "0" + days;
			hours = String(hours).length >= 2 ? hours : "0" + hours;
			minutes = String(minutes).length >= 2 ? minutes : "0" + minutes;
			seconds = String(seconds).length >= 2 ? seconds : "0" + seconds;
			var ref_days = days === 1 ? "day" : "days",
				ref_hours = hours === 1 ? "hour" : "hours",
				ref_minutes = minutes === 1 ? "minute" : "minutes",
				ref_seconds = seconds === 1 ? "second" : "seconds";
			container.find(".days").text(days);
			container.find(".hours").text(hours);
			container.find(".minutes").text(minutes);
			container.find(".seconds").text(seconds);
			container.find(".days_ref").text(ref_days);
			container.find(".hours_ref").text(ref_hours);
			container.find(".minutes_ref").text(ref_minutes);
			container.find(".seconds_ref").text(ref_seconds);
		}
		var interval = setInterval(countdown, 1000);
	};
})(jQuery);
/**
	/*
	 *
	 *	jQuery Sliding Menu Plugin
	 *	Mobile app list-style navigation in the browser
	 *
	 *	Written by Ali Zahid
	 *	http://alizahid.github.io/jquery-sliding-menu/
	 *
	 */
(function ($) {
	var usedIds = [];
	$.fn.menu = function (options) {
		var selector = this.selector;
		var settings = $.extend({ dataJSON: false, backLabel: "" }, options);
		return this.each(function () {
			var self = this,
				menu = $(self),
				data;
			if (menu.hasClass("sliding-menu")) {
				return;
			}
			var menuWidth = menu.width();
			if (settings.dataJSON) {
				data = processJSON(settings.dataJSON);
			} else {
				data = process(menu);
			}
			menu.empty().addClass("sliding-menu");
			var rootPanel;
			if (settings.dataJSON) {
				$(data).each(function (index, item) {
					var panel = $("<ul></ul>");
					if (item.root) {
						rootPanel = "#" + item.id;
					}
					panel.attr("id", item.id);
					panel.addClass("menu-panel");
					panel.width(menuWidth);
					$(item.children).each(function (index, item) {
						var link = $("<a></a>");
						link.attr("class", item.styleClass);
						link.attr("href", item.href);
						link.text(item.label);
						var li = $("<li></li>");
						li.append(link);
						panel.append(li);
					});
					menu.append(panel);
				});
			} else {
				$(data).each(function (index, item) {
					var panel = $(item);
					if (panel.hasClass("menu-panel-root")) {
						rootPanel = "#" + panel.attr("id");
					}
					panel.width(menuWidth);
					menu.append(item);
				});
			}
			rootPanel = $(rootPanel);
			rootPanel.addClass("menu-panel-root");
			var currentPanel = rootPanel;
			menu.height(rootPanel.height());
			var wrapper = $("<div></div>")
				.addClass("sliding-menu-wrapper")
				.width(data.length * menuWidth);
			menu.wrapInner(wrapper);
			wrapper = $(".sliding-menu-wrapper", menu);
			$("a", self).on("click", function (e) {
				var href = $(this).attr("href"),
					label = $(this).text();
				if (wrapper.is(":animated")) {
					e.preventDefault();
					return;
				}
				if (href == "#") {
					e.preventDefault();
				} else if (href.indexOf("#menu-panel") == 0) {
					var target = $(href),
						isBack = $(this).hasClass("back"),
						marginLeft = parseInt(wrapper.css("margin-left"));
					if (isBack) {
						if (href == "#menu-panel-back") {
							target = currentPanel.prev();
						}
						wrapper
							.stop(true, true)
							.animate(
								{ marginLeft: marginLeft + menuWidth },
								"fast"
							);
					} else {
						target.insertAfter(currentPanel);
						if (settings.backLabel === true) {
							$(".back", target).text(label);
						} else {
							$(".back", target).text(settings.backLabel);
						}
						wrapper
							.stop(true, true)
							.animate(
								{ marginLeft: marginLeft - menuWidth },
								"fast"
							);
					}
					currentPanel = target;
					menu.stop(true, true).animate(
						{ height: target.height() },
						"fast"
					);
					e.preventDefault();
				}
			});
			return this;
		});
		function process(data) {
			var ul = $("ul", data),
				panels = [];
			$(ul).each(function (index, item) {
				var panel = $(item),
					handler = panel.prev(),
					id = getNewId();
				if (handler.length == 1) {
					handler.addClass("nav").attr("href", "#menu-panel-" + id);
				}
				panel.attr("id", "menu-panel-" + id);
				if (index == 0) {
					panel.addClass("menu-panel-root");
				} else {
					panel.addClass("menu-panel");
					var li = $("<li></li>"),
						back = $("<a></a>")
							.addClass("back")
							.attr("href", "#menu-panel-back");
					panel.prepend(back);
				}
				panels.push(item);
			});
			return panels;
		}
		function processJSON(data, parent) {
			var root = {
					id: "menu-panel-" + getNewId(),
					children: [],
					root: parent ? false : true,
				},
				panels = [];
			if (parent) {
				root.children.push({
					styleClass: "back",
					href: "#" + parent.id,
				});
			}
			$(data).each(function (index, item) {
				root.children.push(item);
				if (item.children) {
					var panel = processJSON(item.children, root);
					item.href = "#" + panel[0].id;
					item.styleClass = "nav";
					panels = panels.concat(panel);
				}
			});
			return [root].concat(panels);
		}
		function getNewId() {
			var id;
			do {
				id = Math.random().toString(36).substring(3, 8);
			} while (usedIds.indexOf(id) >= 0);
			usedIds.push(id);
			return id;
		}
	};
})(jQuery);

/**!
 * easyPieChart
 * Lightweight plugin to render simple, animated and retina optimized pie charts
 *
 * @license Dual licensed under the MIT (http://www.opensource.org/licenses/mit-license.php) and GPL (http://www.opensource.org/licenses/gpl-license.php) licenses.
 * @author Robert Fleischmann <rendro87@gmail.com> (http://robert-fleischmann.de)
 * @version 2.1.1
 **/
(function (e, t) {
	if (typeof exports === "object") {
		module.exports = t(require("jquery"));
	} else if (typeof define === "function" && define.amd) {
		define("EasyPieChart", ["jquery"], t);
	} else {
		t(e.jQuery);
	}
})(this, function (e) {
	var t = function (e, t) {
		var n;
		var r = document.createElement("canvas");
		if (typeof G_vmlCanvasManager !== "undefined") {
			G_vmlCanvasManager.initElement(r);
		}
		var i = r.getContext("2d");
		r.width = r.height = t.size;
		e.appendChild(r);
		var s = 1;
		if (window.devicePixelRatio > 1) {
			s = window.devicePixelRatio;
			r.style.width = r.style.height = [t.size, "px"].join("");
			r.width = r.height = t.size * s;
			i.scale(s, s);
		}
		i.translate(t.size / 2, t.size / 2);
		i.rotate((-1 / 2 + t.rotate / 180) * Math.PI);
		var o = (t.size - t.lineWidth) / 2;
		if (t.scaleColor && t.scaleLength) {
			o -= t.scaleLength + 2;
		}
		Date.now =
			Date.now ||
			function () {
				return +new Date();
			};
		var u = function (e, t, n) {
			n = Math.min(Math.max(0, n || 1), 1);
			i.beginPath();
			i.arc(0, 0, o, 0, Math.PI * 2 * n, false);
			i.strokeStyle = e;
			i.lineWidth = t;
			i.stroke();
		};
		var a = function () {
			var e;
			var n;
			var r = 24;
			i.lineWidth = 1;
			i.fillStyle = t.scaleColor;
			i.save();
			for (var r = 24; r > 0; --r) {
				if (r % 6 === 0) {
					n = t.scaleLength;
					e = 0;
				} else {
					n = t.scaleLength * 0.6;
					e = t.scaleLength - n;
				}
				i.fillRect(-t.size / 2 + e, 0, n, 1);
				i.rotate(Math.PI / 12);
			}
			i.restore();
		};
		var f = (function () {
			return (
				window.requestAnimationFrame ||
				window.webkitRequestAnimationFrame ||
				window.mozRequestAnimationFrame ||
				function (e) {
					window.setTimeout(e, 1e3 / 60);
				}
			);
		})();
		var l = function () {
			t.scaleColor && a();
			t.trackColor && u(t.trackColor, t.lineWidth);
		};
		this.clear = function () {
			i.clearRect(t.size / -2, t.size / -2, t.size, t.size);
		};
		this.draw = function (e) {
			if (!!t.scaleColor || !!t.trackColor) {
				if (i.getImageData && i.putImageData) {
					if (!n) {
						l();
						n = i.getImageData(0, 0, t.size * s, t.size * s);
					} else {
						i.putImageData(n, 0, 0);
					}
				} else {
					this.clear();
					l();
				}
			} else {
				this.clear();
			}
			i.lineCap = t.lineCap;
			var r;
			if (typeof t.barColor === "function") {
				r = t.barColor(e);
			} else {
				r = t.barColor;
			}
			if (e > 0) {
				u(r, t.lineWidth, e / 100);
			}
		}.bind(this);
		this.animate = function (e, n) {
			var r = Date.now();
			t.onStart(e, n);
			var i = function () {
				var s = Math.min(Date.now() - r, t.animate);
				var o = t.easing(this, s, e, n - e, t.animate);
				this.draw(o);
				t.onStep(e, n, o);
				if (s >= t.animate) {
					t.onStop(e, n);
				} else {
					f(i);
				}
			}.bind(this);
			f(i);
		}.bind(this);
	};
	var n = function (e, n) {
		var r = {
			barColor: "#F54A4B",
			trackColor: "#ccc",
			scaleColor: "#ccc",
			scaleLength: 0,
			lineCap: "round",
			lineWidth: 10,
			size: 152,
			rotate: 0,
			animate: 4e3,
			easing: function (e, t, n, r, i) {
				t = t / (i / 2);
				if (t < 1) {
					return (r / 2) * t * t + n;
				}
				return (-r / 2) * (--t * (t - 2) - 1) + n;
			},
			onStart: function (e, t) {
				return;
			},
			onStep: function (e, t, n) {
				return;
			},
			onStop: function (e, t) {
				return;
			},
		};
		if (typeof t !== "undefined") {
			r.renderer = t;
		} else if (typeof SVGRenderer !== "undefined") {
			r.renderer = SVGRenderer;
		} else {
			throw new Error(
				"Please load either the SVG- or the CanvasRenderer"
			);
		}
		var i = {};
		var s = 0;
		var o = function () {
			this.el = e;
			this.options = i;
			for (var t in r) {
				if (r.hasOwnProperty(t)) {
					i[t] = n && typeof n[t] !== "undefined" ? n[t] : r[t];
					if (typeof i[t] === "function") {
						i[t] = i[t].bind(this);
					}
				}
			}
			if (
				typeof i.easing === "string" &&
				typeof jQuery !== "undefined" &&
				jQuery.isFunction(jQuery.easing[i.easing])
			) {
				i.easing = jQuery.easing[i.easing];
			} else {
				i.easing = r.easing;
			}
			this.renderer = new i.renderer(e, i);
			this.renderer.draw(s);
			if (e.dataset && e.dataset.percent) {
				this.update(parseFloat(e.dataset.percent));
			} else if (e.getAttribute && e.getAttribute("data-percent")) {
				this.update(parseFloat(e.getAttribute("data-percent")));
			}
		}.bind(this);
		this.update = function (e) {
			e = parseFloat(e);
			if (i.animate) {
				this.renderer.animate(s, e);
			} else {
				this.renderer.draw(e);
			}
			s = e;
			return this;
		}.bind(this);
		o();
	};
	e.fn.easyPieChart = function (t) {
		return this.each(function () {
			if (!e.data(this, "easyPieChart")) {
				e.data(this, "easyPieChart", new n(this, t));
			}
		});
	};
});
/**
 * jquery.matchHeight.js master
 * http://brm.io/jquery-match-height/
 * License: MIT
 */
!(function (t) {
	var e = -1,
		a = -1,
		o = function (t) {
			return parseFloat(t) || 0;
		},
		i = function (e) {
			var a = t(e),
				i = null,
				n = [];
			return (
				a.each(function () {
					var e = t(this),
						a = e.offset().top - o(e.css("margin-top")),
						r = n.length > 0 ? n[n.length - 1] : null;
					null === r
						? n.push(e)
						: Math.floor(Math.abs(i - a)) <= 1
						? (n[n.length - 1] = r.add(e))
						: n.push(e),
						(i = a);
				}),
				n
			);
		},
		n = function (e) {
			var a = { byRow: !0, property: "height", target: null, remove: !1 };
			return "object" == typeof e
				? t.extend(a, e)
				: ("boolean" == typeof e
						? (a.byRow = e)
						: "remove" === e && (a.remove = !0),
				  a);
		},
		r = (t.fn.matchHeight = function (e) {
			var a = n(e);
			if (a.remove) {
				var o = this;
				return (
					this.css(a.property, ""),
					t.each(r._groups, function (t, e) {
						e.elements = e.elements.not(o);
					}),
					this
				);
			}
			return this.length <= 1 && !a.target
				? this
				: (r._groups.push({ elements: this, options: a }),
				  r._apply(this, a),
				  this);
		});
	(r.version = "master"),
		(r._groups = []),
		(r._throttle = 80),
		(r._maintainScroll = !1),
		(r._beforeUpdate = null),
		(r._afterUpdate = null),
		(r._rows = i),
		(r._parse = o),
		(r._parseOptions = n),
		(r._apply = function (e, a) {
			var s = n(a),
				h = t(e),
				c = [h],
				l = t(window).scrollTop(),
				p = t("html").outerHeight(!0),
				d = h.parents().filter(":hidden");
			return (
				d.each(function () {
					var e = t(this);
					e.data("style-cache", e.attr("style"));
				}),
				d.css("display", "block"),
				s.byRow &&
					!s.target &&
					(h.each(function () {
						var e = t(this),
							a = e.css("display");
						"inline-block" !== a &&
							"inline-flex" !== a &&
							(a = "block"),
							e.data("style-cache", e.attr("style")),
							e.css({
								display: a,
								"padding-top": "0",
								"padding-bottom": "0",
								"margin-top": "0",
								"margin-bottom": "0",
								"border-top-width": "0",
								"border-bottom-width": "0",
								height: "100px",
								overflow: "hidden",
							});
					}),
					(c = i(h)),
					h.each(function () {
						var e = t(this);
						e.attr("style", e.data("style-cache") || "");
					})),
				t.each(c, function (e, a) {
					var i = t(a),
						n = 0;
					if (s.target) n = s.target.outerHeight(!1);
					else {
						if (s.byRow && i.length <= 1)
							return void i.css(s.property, "");
						i.each(function () {
							var e = t(this),
								a = e.css("display");
							"inline-block" !== a &&
								"inline-flex" !== a &&
								(a = "block");
							var o = { display: a };
							(o[s.property] = ""),
								e.css(o),
								e.outerHeight(!1) > n &&
									(n = e.outerHeight(!1)),
								e.css("display", "");
						});
					}
					i.each(function () {
						var e = t(this),
							a = 0;
						(s.target && e.is(s.target)) ||
							("border-box" !== e.css("box-sizing") &&
								((a +=
									o(e.css("border-top-width")) +
									o(e.css("border-bottom-width"))),
								(a +=
									o(e.css("padding-top")) +
									o(e.css("padding-bottom")))),
							e.css(s.property, n - a + "px"));
					});
				}),
				d.each(function () {
					var e = t(this);
					e.attr("style", e.data("style-cache") || null);
				}),
				r._maintainScroll &&
					t(window).scrollTop((l / p) * t("html").outerHeight(!0)),
				this
			);
		}),
		(r._applyDataApi = function () {
			var e = {};
			t("[data-match-height], [data-mh]").each(function () {
				var a = t(this),
					o = a.attr("data-mh") || a.attr("data-match-height");
				e[o] = o in e ? e[o].add(a) : a;
			}),
				t.each(e, function () {
					this.matchHeight(!0);
				});
		});
	var s = function (e) {
		r._beforeUpdate && r._beforeUpdate(e, r._groups),
			t.each(r._groups, function () {
				r._apply(this.elements, this.options);
			}),
			r._afterUpdate && r._afterUpdate(e, r._groups);
	};
	(r._update = function (o, i) {
		if (i && "resize" === i.type) {
			var n = t(window).width();
			if (n === e) return;
			e = n;
		}
		o
			? -1 === a &&
			  (a = setTimeout(function () {
					s(i), (a = -1);
			  }, r._throttle))
			: s(i);
	}),
		t(r._applyDataApi),
		t(window).bind("load", function (t) {
			r._update(!1, t);
		}),
		t(window).bind("resize orientationchange", function (t) {
			r._update(!0, t);
		});
})(jQuery);
/*!
Mailchimp Ajax Submit
jQuery Plugin

*/
(function ($) {
	$.ajaxChimp = {
		responses: {
			"We have sent you a confirmation email": 0,
			"Please enter a value": 1,
			"An email address must contain a single @": 2,
			"The domain portion of the email address is invalid (the portion after the @: )": 3,
			"The username portion of the email address is invalid (the portion before the @: )": 4,
			"This email address looks fake or invalid. Please enter a real email address": 5,
		},
		translations: { en: null },
		init: function (selector, options) {
			$(selector).ajaxChimp(options);
		},
	};
	$.fn.ajaxChimp = function (options) {
		$(this).each(function (i, elem) {
			var form = $(elem);
			var email = form.find("input[type=text]");
			var label = form.find("label[for=" + email.attr("id") + "]");
			var settings = $.extend(
				{ url: form.attr("action"), language: "en" },
				options
			);
			var url = settings.url
				.replace("/post?", "/post-json?")
				.concat("&c=?");
			form.attr("novalidate", "true");
			email.attr("name", "EMAIL");
			form.submit(function () {
				var msg;
				function successCallback(resp) {
					if (resp.result === "success") {
						msg = "We have sent you a confirmation email";
						label.removeClass("error").addClass("valid");
						email.removeClass("error").addClass("valid");
					} else {
						email.removeClass("valid").addClass("error");
						label.removeClass("valid").addClass("error");
						var index = -1;
						try {
							var parts = resp.msg.split(" - ", 2);
							if (parts[1] === undefined) {
								msg = resp.msg;
							} else {
								var i = parseInt(parts[0], 10);
								if (i.toString() === parts[0]) {
									index = parts[0];
									msg = parts[1];
								} else {
									index = -1;
									msg = resp.msg;
								}
							}
						} catch (e) {
							index = -1;
							msg = resp.msg;
						}
					}
					if (
						settings.language !== "en" &&
						$.ajaxChimp.responses[msg] !== undefined &&
						$.ajaxChimp.translations &&
						$.ajaxChimp.translations[settings.language] &&
						$.ajaxChimp.translations[settings.language][
							$.ajaxChimp.responses[msg]
						]
					) {
						msg =
							$.ajaxChimp.translations[settings.language][
								$.ajaxChimp.responses[msg]
							];
					}
					label.html(msg);
					label.show(2e3);
					if (settings.callback) {
						settings.callback(resp);
					}
				}
				var data = {};
				var dataArray = form.serializeArray();
				$.each(dataArray, function (index, item) {
					data[item.name] = item.value;
				});
				$.ajax({
					url: url,
					data: data,
					success: successCallback,
					dataType: "jsonp",
					error: function (resp, text) {
						console.log("mailchimp ajax submit error: " + text);
					},
				});
				var submitMsg = "Submitting...";
				if (
					settings.language !== "en" &&
					$.ajaxChimp.translations &&
					$.ajaxChimp.translations[settings.language] &&
					$.ajaxChimp.translations[settings.language]["submit"]
				) {
					submitMsg =
						$.ajaxChimp.translations[settings.language]["submit"];
				}
				label.html(submitMsg).show(2e3);
				return false;
			});
		});
		return this;
	};
})(jQuery);
// calendar
!(function (e, t) {
	"object" == typeof exports && "undefined" != typeof module
		? (module.exports = t())
		: "function" == typeof define && define.amd
		? define(t)
		: (e.moment = t());
})(this, function () {
	"use strict";
	var e, i;
	function c() {
		return e.apply(null, arguments);
	}
	function o(e) {
		return (
			e instanceof Array ||
			"[object Array]" === Object.prototype.toString.call(e)
		);
	}
	function u(e) {
		return (
			null != e && "[object Object]" === Object.prototype.toString.call(e)
		);
	}
	function l(e) {
		return void 0 === e;
	}
	function d(e) {
		return (
			"number" == typeof e ||
			"[object Number]" === Object.prototype.toString.call(e)
		);
	}
	function h(e) {
		return (
			e instanceof Date ||
			"[object Date]" === Object.prototype.toString.call(e)
		);
	}
	function f(e, t) {
		var n,
			s = [];
		for (n = 0; n < e.length; ++n) s.push(t(e[n], n));
		return s;
	}
	function m(e, t) {
		return Object.prototype.hasOwnProperty.call(e, t);
	}
	function _(e, t) {
		for (var n in t) m(t, n) && (e[n] = t[n]);
		return (
			m(t, "toString") && (e.toString = t.toString),
			m(t, "valueOf") && (e.valueOf = t.valueOf),
			e
		);
	}
	function y(e, t, n, s) {
		return Ot(e, t, n, s, !0).utc();
	}
	function g(e) {
		return (
			null == e._pf &&
				(e._pf = {
					empty: !1,
					unusedTokens: [],
					unusedInput: [],
					overflow: -2,
					charsLeftOver: 0,
					nullInput: !1,
					invalidMonth: null,
					invalidFormat: !1,
					userInvalidated: !1,
					iso: !1,
					parsedDateParts: [],
					meridiem: null,
					rfc2822: !1,
					weekdayMismatch: !1,
				}),
			e._pf
		);
	}
	function p(e) {
		if (null == e._isValid) {
			var t = g(e),
				n = i.call(t.parsedDateParts, function (e) {
					return null != e;
				}),
				s =
					!isNaN(e._d.getTime()) &&
					t.overflow < 0 &&
					!t.empty &&
					!t.invalidMonth &&
					!t.invalidWeekday &&
					!t.weekdayMismatch &&
					!t.nullInput &&
					!t.invalidFormat &&
					!t.userInvalidated &&
					(!t.meridiem || (t.meridiem && n));
			if (
				(e._strict &&
					(s =
						s &&
						0 === t.charsLeftOver &&
						0 === t.unusedTokens.length &&
						void 0 === t.bigHour),
				null != Object.isFrozen && Object.isFrozen(e))
			)
				return s;
			e._isValid = s;
		}
		return e._isValid;
	}
	function v(e) {
		var t = y(NaN);
		return null != e ? _(g(t), e) : (g(t).userInvalidated = !0), t;
	}
	i = Array.prototype.some
		? Array.prototype.some
		: function (e) {
				for (
					var t = Object(this), n = t.length >>> 0, s = 0;
					s < n;
					s++
				)
					if (s in t && e.call(this, t[s], s, t)) return !0;
				return !1;
		  };
	var r = (c.momentProperties = []);
	function w(e, t) {
		var n, s, i;
		if (
			(l(t._isAMomentObject) || (e._isAMomentObject = t._isAMomentObject),
			l(t._i) || (e._i = t._i),
			l(t._f) || (e._f = t._f),
			l(t._l) || (e._l = t._l),
			l(t._strict) || (e._strict = t._strict),
			l(t._tzm) || (e._tzm = t._tzm),
			l(t._isUTC) || (e._isUTC = t._isUTC),
			l(t._offset) || (e._offset = t._offset),
			l(t._pf) || (e._pf = g(t)),
			l(t._locale) || (e._locale = t._locale),
			0 < r.length)
		)
			for (n = 0; n < r.length; n++) l((i = t[(s = r[n])])) || (e[s] = i);
		return e;
	}
	var t = !1;
	function M(e) {
		w(this, e),
			(this._d = new Date(null != e._d ? e._d.getTime() : NaN)),
			this.isValid() || (this._d = new Date(NaN)),
			!1 === t && ((t = !0), c.updateOffset(this), (t = !1));
	}
	function S(e) {
		return e instanceof M || (null != e && null != e._isAMomentObject);
	}
	function D(e) {
		return e < 0 ? Math.ceil(e) || 0 : Math.floor(e);
	}
	function k(e) {
		var t = +e,
			n = 0;
		return 0 !== t && isFinite(t) && (n = D(t)), n;
	}
	function a(e, t, n) {
		var s,
			i = Math.min(e.length, t.length),
			r = Math.abs(e.length - t.length),
			a = 0;
		for (s = 0; s < i; s++)
			((n && e[s] !== t[s]) || (!n && k(e[s]) !== k(t[s]))) && a++;
		return a + r;
	}
	function Y(e) {
		!1 === c.suppressDeprecationWarnings &&
			"undefined" != typeof console &&
			console.warn &&
			console.warn("Deprecation warning: " + e);
	}
	function n(i, r) {
		var a = !0;
		return _(function () {
			if (
				(null != c.deprecationHandler && c.deprecationHandler(null, i),
				a)
			) {
				for (var e, t = [], n = 0; n < arguments.length; n++) {
					if (((e = ""), "object" == typeof arguments[n])) {
						for (var s in ((e += "\n[" + n + "] "), arguments[0]))
							e += s + ": " + arguments[0][s] + ", ";
						e = e.slice(0, -2);
					} else e = arguments[n];
					t.push(e);
				}
				Y(
					i +
						"\nArguments: " +
						Array.prototype.slice.call(t).join("") +
						"\n" +
						new Error().stack
				),
					(a = !1);
			}
			return r.apply(this, arguments);
		}, r);
	}
	var s,
		O = {};
	function T(e, t) {
		null != c.deprecationHandler && c.deprecationHandler(e, t),
			O[e] || (Y(t), (O[e] = !0));
	}
	function x(e) {
		return (
			e instanceof Function ||
			"[object Function]" === Object.prototype.toString.call(e)
		);
	}
	function b(e, t) {
		var n,
			s = _({}, e);
		for (n in t)
			m(t, n) &&
				(u(e[n]) && u(t[n])
					? ((s[n] = {}), _(s[n], e[n]), _(s[n], t[n]))
					: null != t[n]
					? (s[n] = t[n])
					: delete s[n]);
		for (n in e) m(e, n) && !m(t, n) && u(e[n]) && (s[n] = _({}, s[n]));
		return s;
	}
	function P(e) {
		null != e && this.set(e);
	}
	(c.suppressDeprecationWarnings = !1),
		(c.deprecationHandler = null),
		(s = Object.keys
			? Object.keys
			: function (e) {
					var t,
						n = [];
					for (t in e) m(e, t) && n.push(t);
					return n;
			  });
	var W = {};
	function H(e, t) {
		var n = e.toLowerCase();
		W[n] = W[n + "s"] = W[t] = e;
	}
	function R(e) {
		return "string" == typeof e ? W[e] || W[e.toLowerCase()] : void 0;
	}
	function C(e) {
		var t,
			n,
			s = {};
		for (n in e) m(e, n) && (t = R(n)) && (s[t] = e[n]);
		return s;
	}
	var F = {};
	function L(e, t) {
		F[e] = t;
	}
	function U(e, t, n) {
		var s = "" + Math.abs(e),
			i = t - s.length;
		return (
			(0 <= e ? (n ? "+" : "") : "-") +
			Math.pow(10, Math.max(0, i)).toString().substr(1) +
			s
		);
	}
	var N =
			/(\[[^\[]*\])|(\\)?([Hh]mm(ss)?|Mo|MM?M?M?|Do|DDDo|DD?D?D?|ddd?d?|do?|w[o|w]?|W[o|W]?|Qo?|YYYYYY|YYYYY|YYYY|YY|gg(ggg?)?|GG(GGG?)?|e|E|a|A|hh?|HH?|kk?|mm?|ss?|S{1,9}|x|X|zz?|ZZ?|.)/g,
		G = /(\[[^\[]*\])|(\\)?(LTS|LT|LL?L?L?|l{1,4})/g,
		V = {},
		E = {};
	function I(e, t, n, s) {
		var i = s;
		"string" == typeof s &&
			(i = function () {
				return this[s]();
			}),
			e && (E[e] = i),
			t &&
				(E[t[0]] = function () {
					return U(i.apply(this, arguments), t[1], t[2]);
				}),
			n &&
				(E[n] = function () {
					return this.localeData().ordinal(
						i.apply(this, arguments),
						e
					);
				});
	}
	function A(e, t) {
		return e.isValid()
			? ((t = j(t, e.localeData())),
			  (V[t] =
					V[t] ||
					(function (s) {
						var e,
							i,
							t,
							r = s.match(N);
						for (e = 0, i = r.length; e < i; e++)
							E[r[e]]
								? (r[e] = E[r[e]])
								: (r[e] = (t = r[e]).match(/\[[\s\S]/)
										? t.replace(/^\[|\]$/g, "")
										: t.replace(/\\/g, ""));
						return function (e) {
							var t,
								n = "";
							for (t = 0; t < i; t++)
								n += x(r[t]) ? r[t].call(e, s) : r[t];
							return n;
						};
					})(t)),
			  V[t](e))
			: e.localeData().invalidDate();
	}
	function j(e, t) {
		var n = 5;
		function s(e) {
			return t.longDateFormat(e) || e;
		}
		for (G.lastIndex = 0; 0 <= n && G.test(e); )
			(e = e.replace(G, s)), (G.lastIndex = 0), (n -= 1);
		return e;
	}
	var Z = /\d/,
		z = /\d\d/,
		$ = /\d{3}/,
		q = /\d{4}/,
		J = /[+-]?\d{6}/,
		B = /\d\d?/,
		Q = /\d\d\d\d?/,
		X = /\d\d\d\d\d\d?/,
		K = /\d{1,3}/,
		ee = /\d{1,4}/,
		te = /[+-]?\d{1,6}/,
		ne = /\d+/,
		se = /[+-]?\d+/,
		ie = /Z|[+-]\d\d:?\d\d/gi,
		re = /Z|[+-]\d\d(?::?\d\d)?/gi,
		ae =
			/[0-9]{0,256}['a-z\u00A0-\u05FF\u0700-\uD7FF\uF900-\uFDCF\uFDF0-\uFF07\uFF10-\uFFEF]{1,256}|[\u0600-\u06FF\/]{1,256}(\s*?[\u0600-\u06FF]{1,256}){1,2}/i,
		oe = {};
	function ue(e, n, s) {
		oe[e] = x(n)
			? n
			: function (e, t) {
					return e && s ? s : n;
			  };
	}
	function le(e, t) {
		return m(oe, e)
			? oe[e](t._strict, t._locale)
			: new RegExp(
					de(
						e
							.replace("\\", "")
							.replace(
								/\\(\[)|\\(\])|\[([^\]\[]*)\]|\\(.)/g,
								function (e, t, n, s, i) {
									return t || n || s || i;
								}
							)
					)
			  );
	}
	function de(e) {
		return e.replace(/[-\/\\^$*+?.()|[\]{}]/g, "\\$&");
	}
	var he = {};
	function ce(e, n) {
		var t,
			s = n;
		for (
			"string" == typeof e && (e = [e]),
				d(n) &&
					(s = function (e, t) {
						t[n] = k(e);
					}),
				t = 0;
			t < e.length;
			t++
		)
			he[e[t]] = s;
	}
	function fe(e, i) {
		ce(e, function (e, t, n, s) {
			(n._w = n._w || {}), i(e, n._w, n, s);
		});
	}
	var me = 0,
		_e = 1,
		ye = 2,
		ge = 3,
		pe = 4,
		ve = 5,
		we = 6,
		Me = 7,
		Se = 8;
	function De(e) {
		return ke(e) ? 366 : 365;
	}
	function ke(e) {
		return (e % 4 == 0 && e % 100 != 0) || e % 400 == 0;
	}
	I("Y", 0, 0, function () {
		var e = this.year();
		return e <= 9999 ? "" + e : "+" + e;
	}),
		I(0, ["YY", 2], 0, function () {
			return this.year() % 100;
		}),
		I(0, ["YYYY", 4], 0, "year"),
		I(0, ["YYYYY", 5], 0, "year"),
		I(0, ["YYYYYY", 6, !0], 0, "year"),
		H("year", "y"),
		L("year", 1),
		ue("Y", se),
		ue("YY", B, z),
		ue("YYYY", ee, q),
		ue("YYYYY", te, J),
		ue("YYYYYY", te, J),
		ce(["YYYYY", "YYYYYY"], me),
		ce("YYYY", function (e, t) {
			t[me] = 2 === e.length ? c.parseTwoDigitYear(e) : k(e);
		}),
		ce("YY", function (e, t) {
			t[me] = c.parseTwoDigitYear(e);
		}),
		ce("Y", function (e, t) {
			t[me] = parseInt(e, 10);
		}),
		(c.parseTwoDigitYear = function (e) {
			return k(e) + (68 < k(e) ? 1900 : 2e3);
		});
	var Ye,
		Oe = Te("FullYear", !0);
	function Te(t, n) {
		return function (e) {
			return null != e
				? (be(this, t, e), c.updateOffset(this, n), this)
				: xe(this, t);
		};
	}
	function xe(e, t) {
		return e.isValid() ? e._d["get" + (e._isUTC ? "UTC" : "") + t]() : NaN;
	}
	function be(e, t, n) {
		e.isValid() &&
			!isNaN(n) &&
			("FullYear" === t &&
			ke(e.year()) &&
			1 === e.month() &&
			29 === e.date()
				? e._d["set" + (e._isUTC ? "UTC" : "") + t](
						n,
						e.month(),
						Pe(n, e.month())
				  )
				: e._d["set" + (e._isUTC ? "UTC" : "") + t](n));
	}
	function Pe(e, t) {
		if (isNaN(e) || isNaN(t)) return NaN;
		var n,
			s = ((t % (n = 12)) + n) % n;
		return (
			(e += (t - s) / 12),
			1 === s ? (ke(e) ? 29 : 28) : 31 - ((s % 7) % 2)
		);
	}
	(Ye = Array.prototype.indexOf
		? Array.prototype.indexOf
		: function (e) {
				var t;
				for (t = 0; t < this.length; ++t) if (this[t] === e) return t;
				return -1;
		  }),
		I("M", ["MM", 2], "Mo", function () {
			return this.month() + 1;
		}),
		I("MMM", 0, 0, function (e) {
			return this.localeData().monthsShort(this, e);
		}),
		I("MMMM", 0, 0, function (e) {
			return this.localeData().months(this, e);
		}),
		H("month", "M"),
		L("month", 8),
		ue("M", B),
		ue("MM", B, z),
		ue("MMM", function (e, t) {
			return t.monthsShortRegex(e);
		}),
		ue("MMMM", function (e, t) {
			return t.monthsRegex(e);
		}),
		ce(["M", "MM"], function (e, t) {
			t[_e] = k(e) - 1;
		}),
		ce(["MMM", "MMMM"], function (e, t, n, s) {
			var i = n._locale.monthsParse(e, s, n._strict);
			null != i ? (t[_e] = i) : (g(n).invalidMonth = e);
		});
	var We = /D[oD]?(\[[^\[\]]*\]|\s)+MMMM?/,
		He =
			"January_February_March_April_May_June_July_August_September_October_November_December".split(
				"_"
			);
	var Re = "Jan_Feb_Mar_Apr_May_Jun_Jul_Aug_Sep_Oct_Nov_Dec".split("_");
	function Ce(e, t) {
		var n;
		if (!e.isValid()) return e;
		if ("string" == typeof t)
			if (/^\d+$/.test(t)) t = k(t);
			else if (!d((t = e.localeData().monthsParse(t)))) return e;
		return (
			(n = Math.min(e.date(), Pe(e.year(), t))),
			e._d["set" + (e._isUTC ? "UTC" : "") + "Month"](t, n),
			e
		);
	}
	function Fe(e) {
		return null != e
			? (Ce(this, e), c.updateOffset(this, !0), this)
			: xe(this, "Month");
	}
	var Le = ae;
	var Ue = ae;
	function Ne() {
		function e(e, t) {
			return t.length - e.length;
		}
		var t,
			n,
			s = [],
			i = [],
			r = [];
		for (t = 0; t < 12; t++)
			(n = y([2e3, t])),
				s.push(this.monthsShort(n, "")),
				i.push(this.months(n, "")),
				r.push(this.months(n, "")),
				r.push(this.monthsShort(n, ""));
		for (s.sort(e), i.sort(e), r.sort(e), t = 0; t < 12; t++)
			(s[t] = de(s[t])), (i[t] = de(i[t]));
		for (t = 0; t < 24; t++) r[t] = de(r[t]);
		(this._monthsRegex = new RegExp("^(" + r.join("|") + ")", "i")),
			(this._monthsShortRegex = this._monthsRegex),
			(this._monthsStrictRegex = new RegExp(
				"^(" + i.join("|") + ")",
				"i"
			)),
			(this._monthsShortStrictRegex = new RegExp(
				"^(" + s.join("|") + ")",
				"i"
			));
	}
	function Ge(e) {
		var t = new Date(Date.UTC.apply(null, arguments));
		return (
			e < 100 &&
				0 <= e &&
				isFinite(t.getUTCFullYear()) &&
				t.setUTCFullYear(e),
			t
		);
	}
	function Ve(e, t, n) {
		var s = 7 + t - n;
		return -((7 + Ge(e, 0, s).getUTCDay() - t) % 7) + s - 1;
	}
	function Ee(e, t, n, s, i) {
		var r,
			a,
			o = 1 + 7 * (t - 1) + ((7 + n - s) % 7) + Ve(e, s, i);
		return (
			o <= 0
				? (a = De((r = e - 1)) + o)
				: o > De(e)
				? ((r = e + 1), (a = o - De(e)))
				: ((r = e), (a = o)),
			{ year: r, dayOfYear: a }
		);
	}
	function Ie(e, t, n) {
		var s,
			i,
			r = Ve(e.year(), t, n),
			a = Math.floor((e.dayOfYear() - r - 1) / 7) + 1;
		return (
			a < 1
				? (s = a + Ae((i = e.year() - 1), t, n))
				: a > Ae(e.year(), t, n)
				? ((s = a - Ae(e.year(), t, n)), (i = e.year() + 1))
				: ((i = e.year()), (s = a)),
			{ week: s, year: i }
		);
	}
	function Ae(e, t, n) {
		var s = Ve(e, t, n),
			i = Ve(e + 1, t, n);
		return (De(e) - s + i) / 7;
	}
	I("w", ["ww", 2], "wo", "week"),
		I("W", ["WW", 2], "Wo", "isoWeek"),
		H("week", "w"),
		H("isoWeek", "W"),
		L("week", 5),
		L("isoWeek", 5),
		ue("w", B),
		ue("ww", B, z),
		ue("W", B),
		ue("WW", B, z),
		fe(["w", "ww", "W", "WW"], function (e, t, n, s) {
			t[s.substr(0, 1)] = k(e);
		});
	I("d", 0, "do", "day"),
		I("dd", 0, 0, function (e) {
			return this.localeData().weekdaysMin(this, e);
		}),
		I("ddd", 0, 0, function (e) {
			return this.localeData().weekdaysShort(this, e);
		}),
		I("dddd", 0, 0, function (e) {
			return this.localeData().weekdays(this, e);
		}),
		I("e", 0, 0, "weekday"),
		I("E", 0, 0, "isoWeekday"),
		H("day", "d"),
		H("weekday", "e"),
		H("isoWeekday", "E"),
		L("day", 11),
		L("weekday", 11),
		L("isoWeekday", 11),
		ue("d", B),
		ue("e", B),
		ue("E", B),
		ue("dd", function (e, t) {
			return t.weekdaysMinRegex(e);
		}),
		ue("ddd", function (e, t) {
			return t.weekdaysShortRegex(e);
		}),
		ue("dddd", function (e, t) {
			return t.weekdaysRegex(e);
		}),
		fe(["dd", "ddd", "dddd"], function (e, t, n, s) {
			var i = n._locale.weekdaysParse(e, s, n._strict);
			null != i ? (t.d = i) : (g(n).invalidWeekday = e);
		}),
		fe(["d", "e", "E"], function (e, t, n, s) {
			t[s] = k(e);
		});
	var je = "Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split(
		"_"
	);
	var Ze = "Sun_Mon_Tue_Wed_Thu_Fri_Sat".split("_");
	var ze = "Su_Mo_Tu_We_Th_Fr_Sa".split("_");
	var $e = ae;
	var qe = ae;
	var Je = ae;
	function Be() {
		function e(e, t) {
			return t.length - e.length;
		}
		var t,
			n,
			s,
			i,
			r,
			a = [],
			o = [],
			u = [],
			l = [];
		for (t = 0; t < 7; t++)
			(n = y([2e3, 1]).day(t)),
				(s = this.weekdaysMin(n, "")),
				(i = this.weekdaysShort(n, "")),
				(r = this.weekdays(n, "")),
				a.push(s),
				o.push(i),
				u.push(r),
				l.push(s),
				l.push(i),
				l.push(r);
		for (a.sort(e), o.sort(e), u.sort(e), l.sort(e), t = 0; t < 7; t++)
			(o[t] = de(o[t])), (u[t] = de(u[t])), (l[t] = de(l[t]));
		(this._weekdaysRegex = new RegExp("^(" + l.join("|") + ")", "i")),
			(this._weekdaysShortRegex = this._weekdaysRegex),
			(this._weekdaysMinRegex = this._weekdaysRegex),
			(this._weekdaysStrictRegex = new RegExp(
				"^(" + u.join("|") + ")",
				"i"
			)),
			(this._weekdaysShortStrictRegex = new RegExp(
				"^(" + o.join("|") + ")",
				"i"
			)),
			(this._weekdaysMinStrictRegex = new RegExp(
				"^(" + a.join("|") + ")",
				"i"
			));
	}
	function Qe() {
		return this.hours() % 12 || 12;
	}
	function Xe(e, t) {
		I(e, 0, 0, function () {
			return this.localeData().meridiem(this.hours(), this.minutes(), t);
		});
	}
	function Ke(e, t) {
		return t._meridiemParse;
	}
	I("H", ["HH", 2], 0, "hour"),
		I("h", ["hh", 2], 0, Qe),
		I("k", ["kk", 2], 0, function () {
			return this.hours() || 24;
		}),
		I("hmm", 0, 0, function () {
			return "" + Qe.apply(this) + U(this.minutes(), 2);
		}),
		I("hmmss", 0, 0, function () {
			return (
				"" +
				Qe.apply(this) +
				U(this.minutes(), 2) +
				U(this.seconds(), 2)
			);
		}),
		I("Hmm", 0, 0, function () {
			return "" + this.hours() + U(this.minutes(), 2);
		}),
		I("Hmmss", 0, 0, function () {
			return (
				"" + this.hours() + U(this.minutes(), 2) + U(this.seconds(), 2)
			);
		}),
		Xe("a", !0),
		Xe("A", !1),
		H("hour", "h"),
		L("hour", 13),
		ue("a", Ke),
		ue("A", Ke),
		ue("H", B),
		ue("h", B),
		ue("k", B),
		ue("HH", B, z),
		ue("hh", B, z),
		ue("kk", B, z),
		ue("hmm", Q),
		ue("hmmss", X),
		ue("Hmm", Q),
		ue("Hmmss", X),
		ce(["H", "HH"], ge),
		ce(["k", "kk"], function (e, t, n) {
			var s = k(e);
			t[ge] = 24 === s ? 0 : s;
		}),
		ce(["a", "A"], function (e, t, n) {
			(n._isPm = n._locale.isPM(e)), (n._meridiem = e);
		}),
		ce(["h", "hh"], function (e, t, n) {
			(t[ge] = k(e)), (g(n).bigHour = !0);
		}),
		ce("hmm", function (e, t, n) {
			var s = e.length - 2;
			(t[ge] = k(e.substr(0, s))),
				(t[pe] = k(e.substr(s))),
				(g(n).bigHour = !0);
		}),
		ce("hmmss", function (e, t, n) {
			var s = e.length - 4,
				i = e.length - 2;
			(t[ge] = k(e.substr(0, s))),
				(t[pe] = k(e.substr(s, 2))),
				(t[ve] = k(e.substr(i))),
				(g(n).bigHour = !0);
		}),
		ce("Hmm", function (e, t, n) {
			var s = e.length - 2;
			(t[ge] = k(e.substr(0, s))), (t[pe] = k(e.substr(s)));
		}),
		ce("Hmmss", function (e, t, n) {
			var s = e.length - 4,
				i = e.length - 2;
			(t[ge] = k(e.substr(0, s))),
				(t[pe] = k(e.substr(s, 2))),
				(t[ve] = k(e.substr(i)));
		});
	var et,
		tt = Te("Hours", !0),
		nt = {
			calendar: {
				sameDay: "[Today at] LT",
				nextDay: "[Tomorrow at] LT",
				nextWeek: "dddd [at] LT",
				lastDay: "[Yesterday at] LT",
				lastWeek: "[Last] dddd [at] LT",
				sameElse: "L",
			},
			longDateFormat: {
				LTS: "h:mm:ss A",
				LT: "h:mm A",
				L: "MM/DD/YYYY",
				LL: "MMMM D, YYYY",
				LLL: "MMMM D, YYYY h:mm A",
				LLLL: "dddd, MMMM D, YYYY h:mm A",
			},
			invalidDate: "Invalid date",
			ordinal: "%d",
			dayOfMonthOrdinalParse: /\d{1,2}/,
			relativeTime: {
				future: "in %s",
				past: "%s ago",
				s: "a few seconds",
				ss: "%d seconds",
				m: "a minute",
				mm: "%d minutes",
				h: "an hour",
				hh: "%d hours",
				d: "a day",
				dd: "%d days",
				M: "a month",
				MM: "%d months",
				y: "a year",
				yy: "%d years",
			},
			months: He,
			monthsShort: Re,
			week: { dow: 0, doy: 6 },
			weekdays: je,
			weekdaysMin: ze,
			weekdaysShort: Ze,
			meridiemParse: /[ap]\.?m?\.?/i,
		},
		st = {},
		it = {};
	function rt(e) {
		return e ? e.toLowerCase().replace("_", "-") : e;
	}
	function at(e) {
		var t = null;
		if (!st[e] && "undefined" != typeof module && module && module.exports)
			try {
				(t = et._abbr), require("./locale/" + e), ot(t);
			} catch (e) {}
		return st[e];
	}
	function ot(e, t) {
		var n;
		return (
			e &&
				((n = l(t) ? lt(e) : ut(e, t))
					? (et = n)
					: "undefined" != typeof console &&
					  console.warn &&
					  console.warn(
							"Locale " +
								e +
								" not found. Did you forget to load it?"
					  )),
			et._abbr
		);
	}
	function ut(e, t) {
		if (null !== t) {
			var n,
				s = nt;
			if (((t.abbr = e), null != st[e]))
				T(
					"defineLocaleOverride",
					"use moment.updateLocale(localeName, config) to change an existing locale. moment.defineLocale(localeName, config) should only be used for creating a new locale See http://momentjs.com/guides/#/warnings/define-locale/ for more info."
				),
					(s = st[e]._config);
			else if (null != t.parentLocale)
				if (null != st[t.parentLocale]) s = st[t.parentLocale]._config;
				else {
					if (null == (n = at(t.parentLocale)))
						return (
							it[t.parentLocale] || (it[t.parentLocale] = []),
							it[t.parentLocale].push({ name: e, config: t }),
							null
						);
					s = n._config;
				}
			return (
				(st[e] = new P(b(s, t))),
				it[e] &&
					it[e].forEach(function (e) {
						ut(e.name, e.config);
					}),
				ot(e),
				st[e]
			);
		}
		return delete st[e], null;
	}
	function lt(e) {
		var t;
		if ((e && e._locale && e._locale._abbr && (e = e._locale._abbr), !e))
			return et;
		if (!o(e)) {
			if ((t = at(e))) return t;
			e = [e];
		}
		return (function (e) {
			for (var t, n, s, i, r = 0; r < e.length; ) {
				for (
					t = (i = rt(e[r]).split("-")).length,
						n = (n = rt(e[r + 1])) ? n.split("-") : null;
					0 < t;

				) {
					if ((s = at(i.slice(0, t).join("-")))) return s;
					if (n && n.length >= t && a(i, n, !0) >= t - 1) break;
					t--;
				}
				r++;
			}
			return et;
		})(e);
	}
	function dt(e) {
		var t,
			n = e._a;
		return (
			n &&
				-2 === g(e).overflow &&
				((t =
					n[_e] < 0 || 11 < n[_e]
						? _e
						: n[ye] < 1 || n[ye] > Pe(n[me], n[_e])
						? ye
						: n[ge] < 0 ||
						  24 < n[ge] ||
						  (24 === n[ge] &&
								(0 !== n[pe] || 0 !== n[ve] || 0 !== n[we]))
						? ge
						: n[pe] < 0 || 59 < n[pe]
						? pe
						: n[ve] < 0 || 59 < n[ve]
						? ve
						: n[we] < 0 || 999 < n[we]
						? we
						: -1),
				g(e)._overflowDayOfYear && (t < me || ye < t) && (t = ye),
				g(e)._overflowWeeks && -1 === t && (t = Me),
				g(e)._overflowWeekday && -1 === t && (t = Se),
				(g(e).overflow = t)),
			e
		);
	}
	function ht(e, t, n) {
		return null != e ? e : null != t ? t : n;
	}
	function ct(e) {
		var t,
			n,
			s,
			i,
			r,
			a = [];
		if (!e._d) {
			var o, u;
			for (
				o = e,
					u = new Date(c.now()),
					s = o._useUTC
						? [u.getUTCFullYear(), u.getUTCMonth(), u.getUTCDate()]
						: [u.getFullYear(), u.getMonth(), u.getDate()],
					e._w &&
						null == e._a[ye] &&
						null == e._a[_e] &&
						(function (e) {
							var t, n, s, i, r, a, o, u;
							if (
								null != (t = e._w).GG ||
								null != t.W ||
								null != t.E
							)
								(r = 1),
									(a = 4),
									(n = ht(
										t.GG,
										e._a[me],
										Ie(Tt(), 1, 4).year
									)),
									(s = ht(t.W, 1)),
									((i = ht(t.E, 1)) < 1 || 7 < i) && (u = !0);
							else {
								(r = e._locale._week.dow),
									(a = e._locale._week.doy);
								var l = Ie(Tt(), r, a);
								(n = ht(t.gg, e._a[me], l.year)),
									(s = ht(t.w, l.week)),
									null != t.d
										? ((i = t.d) < 0 || 6 < i) && (u = !0)
										: null != t.e
										? ((i = t.e + r),
										  (t.e < 0 || 6 < t.e) && (u = !0))
										: (i = r);
							}
							s < 1 || s > Ae(n, r, a)
								? (g(e)._overflowWeeks = !0)
								: null != u
								? (g(e)._overflowWeekday = !0)
								: ((o = Ee(n, s, i, r, a)),
								  (e._a[me] = o.year),
								  (e._dayOfYear = o.dayOfYear));
						})(e),
					null != e._dayOfYear &&
						((r = ht(e._a[me], s[me])),
						(e._dayOfYear > De(r) || 0 === e._dayOfYear) &&
							(g(e)._overflowDayOfYear = !0),
						(n = Ge(r, 0, e._dayOfYear)),
						(e._a[_e] = n.getUTCMonth()),
						(e._a[ye] = n.getUTCDate())),
					t = 0;
				t < 3 && null == e._a[t];
				++t
			)
				e._a[t] = a[t] = s[t];
			for (; t < 7; t++)
				e._a[t] = a[t] = null == e._a[t] ? (2 === t ? 1 : 0) : e._a[t];
			24 === e._a[ge] &&
				0 === e._a[pe] &&
				0 === e._a[ve] &&
				0 === e._a[we] &&
				((e._nextDay = !0), (e._a[ge] = 0)),
				(e._d = (
					e._useUTC
						? Ge
						: function (e, t, n, s, i, r, a) {
								var o = new Date(e, t, n, s, i, r, a);
								return (
									e < 100 &&
										0 <= e &&
										isFinite(o.getFullYear()) &&
										o.setFullYear(e),
									o
								);
						  }
				).apply(null, a)),
				(i = e._useUTC ? e._d.getUTCDay() : e._d.getDay()),
				null != e._tzm &&
					e._d.setUTCMinutes(e._d.getUTCMinutes() - e._tzm),
				e._nextDay && (e._a[ge] = 24),
				e._w &&
					void 0 !== e._w.d &&
					e._w.d !== i &&
					(g(e).weekdayMismatch = !0);
		}
	}
	var ft =
			/^\s*((?:[+-]\d{6}|\d{4})-(?:\d\d-\d\d|W\d\d-\d|W\d\d|\d\d\d|\d\d))(?:(T| )(\d\d(?::\d\d(?::\d\d(?:[.,]\d+)?)?)?)([\+\-]\d\d(?::?\d\d)?|\s*Z)?)?$/,
		mt =
			/^\s*((?:[+-]\d{6}|\d{4})(?:\d\d\d\d|W\d\d\d|W\d\d|\d\d\d|\d\d))(?:(T| )(\d\d(?:\d\d(?:\d\d(?:[.,]\d+)?)?)?)([\+\-]\d\d(?::?\d\d)?|\s*Z)?)?$/,
		_t = /Z|[+-]\d\d(?::?\d\d)?/,
		yt = [
			["YYYYYY-MM-DD", /[+-]\d{6}-\d\d-\d\d/],
			["YYYY-MM-DD", /\d{4}-\d\d-\d\d/],
			["GGGG-[W]WW-E", /\d{4}-W\d\d-\d/],
			["GGGG-[W]WW", /\d{4}-W\d\d/, !1],
			["YYYY-DDD", /\d{4}-\d{3}/],
			["YYYY-MM", /\d{4}-\d\d/, !1],
			["YYYYYYMMDD", /[+-]\d{10}/],
			["YYYYMMDD", /\d{8}/],
			["GGGG[W]WWE", /\d{4}W\d{3}/],
			["GGGG[W]WW", /\d{4}W\d{2}/, !1],
			["YYYYDDD", /\d{7}/],
		],
		gt = [
			["HH:mm:ss.SSSS", /\d\d:\d\d:\d\d\.\d+/],
			["HH:mm:ss,SSSS", /\d\d:\d\d:\d\d,\d+/],
			["HH:mm:ss", /\d\d:\d\d:\d\d/],
			["HH:mm", /\d\d:\d\d/],
			["HHmmss.SSSS", /\d\d\d\d\d\d\.\d+/],
			["HHmmss,SSSS", /\d\d\d\d\d\d,\d+/],
			["HHmmss", /\d\d\d\d\d\d/],
			["HHmm", /\d\d\d\d/],
			["HH", /\d\d/],
		],
		pt = /^\/?Date\((\-?\d+)/i;
	function vt(e) {
		var t,
			n,
			s,
			i,
			r,
			a,
			o = e._i,
			u = ft.exec(o) || mt.exec(o);
		if (u) {
			for (g(e).iso = !0, t = 0, n = yt.length; t < n; t++)
				if (yt[t][1].exec(u[1])) {
					(i = yt[t][0]), (s = !1 !== yt[t][2]);
					break;
				}
			if (null == i) return void (e._isValid = !1);
			if (u[3]) {
				for (t = 0, n = gt.length; t < n; t++)
					if (gt[t][1].exec(u[3])) {
						r = (u[2] || " ") + gt[t][0];
						break;
					}
				if (null == r) return void (e._isValid = !1);
			}
			if (!s && null != r) return void (e._isValid = !1);
			if (u[4]) {
				if (!_t.exec(u[4])) return void (e._isValid = !1);
				a = "Z";
			}
			(e._f = i + (r || "") + (a || "")), kt(e);
		} else e._isValid = !1;
	}
	var wt =
		/^(?:(Mon|Tue|Wed|Thu|Fri|Sat|Sun),?\s)?(\d{1,2})\s(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)\s(\d{2,4})\s(\d\d):(\d\d)(?::(\d\d))?\s(?:(UT|GMT|[ECMP][SD]T)|([Zz])|([+-]\d{4}))$/;
	function Mt(e, t, n, s, i, r) {
		var a = [
			(function (e) {
				var t = parseInt(e, 10);
				{
					if (t <= 49) return 2e3 + t;
					if (t <= 999) return 1900 + t;
				}
				return t;
			})(e),
			Re.indexOf(t),
			parseInt(n, 10),
			parseInt(s, 10),
			parseInt(i, 10),
		];
		return r && a.push(parseInt(r, 10)), a;
	}
	var St = {
		UT: 0,
		GMT: 0,
		EDT: -240,
		EST: -300,
		CDT: -300,
		CST: -360,
		MDT: -360,
		MST: -420,
		PDT: -420,
		PST: -480,
	};
	function Dt(e) {
		var t,
			n,
			s,
			i = wt.exec(
				e._i
					.replace(/\([^)]*\)|[\n\t]/g, " ")
					.replace(/(\s\s+)/g, " ")
					.trim()
			);
		if (i) {
			var r = Mt(i[4], i[3], i[2], i[5], i[6], i[7]);
			if (
				((t = i[1]),
				(n = r),
				(s = e),
				t &&
					Ze.indexOf(t) !== new Date(n[0], n[1], n[2]).getDay() &&
					((g(s).weekdayMismatch = !0), !(s._isValid = !1)))
			)
				return;
			(e._a = r),
				(e._tzm = (function (e, t, n) {
					if (e) return St[e];
					if (t) return 0;
					var s = parseInt(n, 10),
						i = s % 100;
					return ((s - i) / 100) * 60 + i;
				})(i[8], i[9], i[10])),
				(e._d = Ge.apply(null, e._a)),
				e._d.setUTCMinutes(e._d.getUTCMinutes() - e._tzm),
				(g(e).rfc2822 = !0);
		} else e._isValid = !1;
	}
	function kt(e) {
		if (e._f !== c.ISO_8601)
			if (e._f !== c.RFC_2822) {
				(e._a = []), (g(e).empty = !0);
				var t,
					n,
					s,
					i,
					r,
					a,
					o,
					u,
					l = "" + e._i,
					d = l.length,
					h = 0;
				for (
					s = j(e._f, e._locale).match(N) || [], t = 0;
					t < s.length;
					t++
				)
					(i = s[t]),
						(n = (l.match(le(i, e)) || [])[0]) &&
							(0 < (r = l.substr(0, l.indexOf(n))).length &&
								g(e).unusedInput.push(r),
							(l = l.slice(l.indexOf(n) + n.length)),
							(h += n.length)),
						E[i]
							? (n
									? (g(e).empty = !1)
									: g(e).unusedTokens.push(i),
							  (a = i),
							  (u = e),
							  null != (o = n) &&
									m(he, a) &&
									he[a](o, u._a, u, a))
							: e._strict && !n && g(e).unusedTokens.push(i);
				(g(e).charsLeftOver = d - h),
					0 < l.length && g(e).unusedInput.push(l),
					e._a[ge] <= 12 &&
						!0 === g(e).bigHour &&
						0 < e._a[ge] &&
						(g(e).bigHour = void 0),
					(g(e).parsedDateParts = e._a.slice(0)),
					(g(e).meridiem = e._meridiem),
					(e._a[ge] = (function (e, t, n) {
						var s;
						if (null == n) return t;
						return null != e.meridiemHour
							? e.meridiemHour(t, n)
							: (null != e.isPM &&
									((s = e.isPM(n)) && t < 12 && (t += 12),
									s || 12 !== t || (t = 0)),
							  t);
					})(e._locale, e._a[ge], e._meridiem)),
					ct(e),
					dt(e);
			} else Dt(e);
		else vt(e);
	}
	function Yt(e) {
		var t,
			n,
			s,
			i,
			r = e._i,
			a = e._f;
		return (
			(e._locale = e._locale || lt(e._l)),
			null === r || (void 0 === a && "" === r)
				? v({ nullInput: !0 })
				: ("string" == typeof r && (e._i = r = e._locale.preparse(r)),
				  S(r)
						? new M(dt(r))
						: (h(r)
								? (e._d = r)
								: o(a)
								? (function (e) {
										var t, n, s, i, r;
										if (0 === e._f.length)
											return (
												(g(e).invalidFormat = !0),
												(e._d = new Date(NaN))
											);
										for (i = 0; i < e._f.length; i++)
											(r = 0),
												(t = w({}, e)),
												null != e._useUTC &&
													(t._useUTC = e._useUTC),
												(t._f = e._f[i]),
												kt(t),
												p(t) &&
													((r += g(t).charsLeftOver),
													(r +=
														10 *
														g(t).unusedTokens
															.length),
													(g(t).score = r),
													(null == s || r < s) &&
														((s = r), (n = t)));
										_(e, n || t);
								  })(e)
								: a
								? kt(e)
								: l((n = (t = e)._i))
								? (t._d = new Date(c.now()))
								: h(n)
								? (t._d = new Date(n.valueOf()))
								: "string" == typeof n
								? ((s = t),
								  null === (i = pt.exec(s._i))
										? (vt(s),
										  !1 === s._isValid &&
												(delete s._isValid,
												Dt(s),
												!1 === s._isValid &&
													(delete s._isValid,
													c.createFromInputFallback(
														s
													))))
										: (s._d = new Date(+i[1])))
								: o(n)
								? ((t._a = f(n.slice(0), function (e) {
										return parseInt(e, 10);
								  })),
								  ct(t))
								: u(n)
								? (function (e) {
										if (!e._d) {
											var t = C(e._i);
											(e._a = f(
												[
													t.year,
													t.month,
													t.day || t.date,
													t.hour,
													t.minute,
													t.second,
													t.millisecond,
												],
												function (e) {
													return e && parseInt(e, 10);
												}
											)),
												ct(e);
										}
								  })(t)
								: d(n)
								? (t._d = new Date(n))
								: c.createFromInputFallback(t),
						  p(e) || (e._d = null),
						  e))
		);
	}
	function Ot(e, t, n, s, i) {
		var r,
			a = {};
		return (
			(!0 !== n && !1 !== n) || ((s = n), (n = void 0)),
			((u(e) &&
				(function (e) {
					if (Object.getOwnPropertyNames)
						return 0 === Object.getOwnPropertyNames(e).length;
					var t;
					for (t in e) if (e.hasOwnProperty(t)) return !1;
					return !0;
				})(e)) ||
				(o(e) && 0 === e.length)) &&
				(e = void 0),
			(a._isAMomentObject = !0),
			(a._useUTC = a._isUTC = i),
			(a._l = n),
			(a._i = e),
			(a._f = t),
			(a._strict = s),
			(r = new M(dt(Yt(a))))._nextDay &&
				(r.add(1, "d"), (r._nextDay = void 0)),
			r
		);
	}
	function Tt(e, t, n, s) {
		return Ot(e, t, n, s, !1);
	}
	(c.createFromInputFallback = n(
		"value provided is not in a recognized RFC2822 or ISO format. moment construction falls back to js Date(), which is not reliable across all browsers and versions. Non RFC2822/ISO date formats are discouraged and will be removed in an upcoming major release. Please refer to http://momentjs.com/guides/#/warnings/js-date/ for more info.",
		function (e) {
			e._d = new Date(e._i + (e._useUTC ? " UTC" : ""));
		}
	)),
		(c.ISO_8601 = function () {}),
		(c.RFC_2822 = function () {});
	var xt = n(
			"moment().min is deprecated, use moment.max instead. http://momentjs.com/guides/#/warnings/min-max/",
			function () {
				var e = Tt.apply(null, arguments);
				return this.isValid() && e.isValid()
					? e < this
						? this
						: e
					: v();
			}
		),
		bt = n(
			"moment().max is deprecated, use moment.min instead. http://momentjs.com/guides/#/warnings/min-max/",
			function () {
				var e = Tt.apply(null, arguments);
				return this.isValid() && e.isValid()
					? this < e
						? this
						: e
					: v();
			}
		);
	function Pt(e, t) {
		var n, s;
		if ((1 === t.length && o(t[0]) && (t = t[0]), !t.length)) return Tt();
		for (n = t[0], s = 1; s < t.length; ++s)
			(t[s].isValid() && !t[s][e](n)) || (n = t[s]);
		return n;
	}
	var Wt = [
		"year",
		"quarter",
		"month",
		"week",
		"day",
		"hour",
		"minute",
		"second",
		"millisecond",
	];
	function Ht(e) {
		var t = C(e),
			n = t.year || 0,
			s = t.quarter || 0,
			i = t.month || 0,
			r = t.week || 0,
			a = t.day || 0,
			o = t.hour || 0,
			u = t.minute || 0,
			l = t.second || 0,
			d = t.millisecond || 0;
		(this._isValid = (function (e) {
			for (var t in e)
				if (-1 === Ye.call(Wt, t) || (null != e[t] && isNaN(e[t])))
					return !1;
			for (var n = !1, s = 0; s < Wt.length; ++s)
				if (e[Wt[s]]) {
					if (n) return !1;
					parseFloat(e[Wt[s]]) !== k(e[Wt[s]]) && (n = !0);
				}
			return !0;
		})(t)),
			(this._milliseconds = +d + 1e3 * l + 6e4 * u + 1e3 * o * 60 * 60),
			(this._days = +a + 7 * r),
			(this._months = +i + 3 * s + 12 * n),
			(this._data = {}),
			(this._locale = lt()),
			this._bubble();
	}
	function Rt(e) {
		return e instanceof Ht;
	}
	function Ct(e) {
		return e < 0 ? -1 * Math.round(-1 * e) : Math.round(e);
	}
	function Ft(e, n) {
		I(e, 0, 0, function () {
			var e = this.utcOffset(),
				t = "+";
			return (
				e < 0 && ((e = -e), (t = "-")),
				t + U(~~(e / 60), 2) + n + U(~~e % 60, 2)
			);
		});
	}
	Ft("Z", ":"),
		Ft("ZZ", ""),
		ue("Z", re),
		ue("ZZ", re),
		ce(["Z", "ZZ"], function (e, t, n) {
			(n._useUTC = !0), (n._tzm = Ut(re, e));
		});
	var Lt = /([\+\-]|\d\d)/gi;
	function Ut(e, t) {
		var n = (t || "").match(e);
		if (null === n) return null;
		var s = ((n[n.length - 1] || []) + "").match(Lt) || ["-", 0, 0],
			i = 60 * s[1] + k(s[2]);
		return 0 === i ? 0 : "+" === s[0] ? i : -i;
	}
	function Nt(e, t) {
		var n, s;
		return t._isUTC
			? ((n = t.clone()),
			  (s =
					(S(e) || h(e) ? e.valueOf() : Tt(e).valueOf()) -
					n.valueOf()),
			  n._d.setTime(n._d.valueOf() + s),
			  c.updateOffset(n, !1),
			  n)
			: Tt(e).local();
	}
	function Gt(e) {
		return 15 * -Math.round(e._d.getTimezoneOffset() / 15);
	}
	function Vt() {
		return !!this.isValid() && this._isUTC && 0 === this._offset;
	}
	c.updateOffset = function () {};
	var Et = /^(\-|\+)?(?:(\d*)[. ])?(\d+)\:(\d+)(?:\:(\d+)(\.\d*)?)?$/,
		It =
			/^(-|\+)?P(?:([-+]?[0-9,.]*)Y)?(?:([-+]?[0-9,.]*)M)?(?:([-+]?[0-9,.]*)W)?(?:([-+]?[0-9,.]*)D)?(?:T(?:([-+]?[0-9,.]*)H)?(?:([-+]?[0-9,.]*)M)?(?:([-+]?[0-9,.]*)S)?)?$/;
	function At(e, t) {
		var n,
			s,
			i,
			r = e,
			a = null;
		return (
			Rt(e)
				? (r = { ms: e._milliseconds, d: e._days, M: e._months })
				: d(e)
				? ((r = {}), t ? (r[t] = e) : (r.milliseconds = e))
				: (a = Et.exec(e))
				? ((n = "-" === a[1] ? -1 : 1),
				  (r = {
						y: 0,
						d: k(a[ye]) * n,
						h: k(a[ge]) * n,
						m: k(a[pe]) * n,
						s: k(a[ve]) * n,
						ms: k(Ct(1e3 * a[we])) * n,
				  }))
				: (a = It.exec(e))
				? ((n = "-" === a[1] ? -1 : (a[1], 1)),
				  (r = {
						y: jt(a[2], n),
						M: jt(a[3], n),
						w: jt(a[4], n),
						d: jt(a[5], n),
						h: jt(a[6], n),
						m: jt(a[7], n),
						s: jt(a[8], n),
				  }))
				: null == r
				? (r = {})
				: "object" == typeof r &&
				  ("from" in r || "to" in r) &&
				  ((i = (function (e, t) {
						var n;
						if (!e.isValid() || !t.isValid())
							return { milliseconds: 0, months: 0 };
						(t = Nt(t, e)),
							e.isBefore(t)
								? (n = Zt(e, t))
								: (((n = Zt(t, e)).milliseconds =
										-n.milliseconds),
								  (n.months = -n.months));
						return n;
				  })(Tt(r.from), Tt(r.to))),
				  ((r = {}).ms = i.milliseconds),
				  (r.M = i.months)),
			(s = new Ht(r)),
			Rt(e) && m(e, "_locale") && (s._locale = e._locale),
			s
		);
	}
	function jt(e, t) {
		var n = e && parseFloat(e.replace(",", "."));
		return (isNaN(n) ? 0 : n) * t;
	}
	function Zt(e, t) {
		var n = { milliseconds: 0, months: 0 };
		return (
			(n.months = t.month() - e.month() + 12 * (t.year() - e.year())),
			e.clone().add(n.months, "M").isAfter(t) && --n.months,
			(n.milliseconds = +t - +e.clone().add(n.months, "M")),
			n
		);
	}
	function zt(s, i) {
		return function (e, t) {
			var n;
			return (
				null === t ||
					isNaN(+t) ||
					(T(
						i,
						"moment()." +
							i +
							"(period, number) is deprecated. Please use moment()." +
							i +
							"(number, period). See http://momentjs.com/guides/#/warnings/add-inverted-param/ for more info."
					),
					(n = e),
					(e = t),
					(t = n)),
				$t(this, At((e = "string" == typeof e ? +e : e), t), s),
				this
			);
		};
	}
	function $t(e, t, n, s) {
		var i = t._milliseconds,
			r = Ct(t._days),
			a = Ct(t._months);
		e.isValid() &&
			((s = null == s || s),
			a && Ce(e, xe(e, "Month") + a * n),
			r && be(e, "Date", xe(e, "Date") + r * n),
			i && e._d.setTime(e._d.valueOf() + i * n),
			s && c.updateOffset(e, r || a));
	}
	(At.fn = Ht.prototype),
		(At.invalid = function () {
			return At(NaN);
		});
	var qt = zt(1, "add"),
		Jt = zt(-1, "subtract");
	function Bt(e, t) {
		var n = 12 * (t.year() - e.year()) + (t.month() - e.month()),
			s = e.clone().add(n, "months");
		return (
			-(
				n +
				(t - s < 0
					? (t - s) / (s - e.clone().add(n - 1, "months"))
					: (t - s) / (e.clone().add(n + 1, "months") - s))
			) || 0
		);
	}
	function Qt(e) {
		var t;
		return void 0 === e
			? this._locale._abbr
			: (null != (t = lt(e)) && (this._locale = t), this);
	}
	(c.defaultFormat = "YYYY-MM-DDTHH:mm:ssZ"),
		(c.defaultFormatUtc = "YYYY-MM-DDTHH:mm:ss[Z]");
	var Xt = n(
		"moment().lang() is deprecated. Instead, use moment().localeData() to get the language configuration. Use moment().locale() to change languages.",
		function (e) {
			return void 0 === e ? this.localeData() : this.locale(e);
		}
	);
	function Kt() {
		return this._locale;
	}
	function en(e, t) {
		I(0, [e, e.length], 0, t);
	}
	function tn(e, t, n, s, i) {
		var r;
		return null == e
			? Ie(this, s, i).year
			: ((r = Ae(e, s, i)) < t && (t = r),
			  function (e, t, n, s, i) {
					var r = Ee(e, t, n, s, i),
						a = Ge(r.year, 0, r.dayOfYear);
					return (
						this.year(a.getUTCFullYear()),
						this.month(a.getUTCMonth()),
						this.date(a.getUTCDate()),
						this
					);
			  }.call(this, e, t, n, s, i));
	}
	I(0, ["gg", 2], 0, function () {
		return this.weekYear() % 100;
	}),
		I(0, ["GG", 2], 0, function () {
			return this.isoWeekYear() % 100;
		}),
		en("gggg", "weekYear"),
		en("ggggg", "weekYear"),
		en("GGGG", "isoWeekYear"),
		en("GGGGG", "isoWeekYear"),
		H("weekYear", "gg"),
		H("isoWeekYear", "GG"),
		L("weekYear", 1),
		L("isoWeekYear", 1),
		ue("G", se),
		ue("g", se),
		ue("GG", B, z),
		ue("gg", B, z),
		ue("GGGG", ee, q),
		ue("gggg", ee, q),
		ue("GGGGG", te, J),
		ue("ggggg", te, J),
		fe(["gggg", "ggggg", "GGGG", "GGGGG"], function (e, t, n, s) {
			t[s.substr(0, 2)] = k(e);
		}),
		fe(["gg", "GG"], function (e, t, n, s) {
			t[s] = c.parseTwoDigitYear(e);
		}),
		I("Q", 0, "Qo", "quarter"),
		H("quarter", "Q"),
		L("quarter", 7),
		ue("Q", Z),
		ce("Q", function (e, t) {
			t[_e] = 3 * (k(e) - 1);
		}),
		I("D", ["DD", 2], "Do", "date"),
		H("date", "D"),
		L("date", 9),
		ue("D", B),
		ue("DD", B, z),
		ue("Do", function (e, t) {
			return e
				? t._dayOfMonthOrdinalParse || t._ordinalParse
				: t._dayOfMonthOrdinalParseLenient;
		}),
		ce(["D", "DD"], ye),
		ce("Do", function (e, t) {
			t[ye] = k(e.match(B)[0]);
		});
	var nn = Te("Date", !0);
	I("DDD", ["DDDD", 3], "DDDo", "dayOfYear"),
		H("dayOfYear", "DDD"),
		L("dayOfYear", 4),
		ue("DDD", K),
		ue("DDDD", $),
		ce(["DDD", "DDDD"], function (e, t, n) {
			n._dayOfYear = k(e);
		}),
		I("m", ["mm", 2], 0, "minute"),
		H("minute", "m"),
		L("minute", 14),
		ue("m", B),
		ue("mm", B, z),
		ce(["m", "mm"], pe);
	var sn = Te("Minutes", !1);
	I("s", ["ss", 2], 0, "second"),
		H("second", "s"),
		L("second", 15),
		ue("s", B),
		ue("ss", B, z),
		ce(["s", "ss"], ve);
	var rn,
		an = Te("Seconds", !1);
	for (
		I("S", 0, 0, function () {
			return ~~(this.millisecond() / 100);
		}),
			I(0, ["SS", 2], 0, function () {
				return ~~(this.millisecond() / 10);
			}),
			I(0, ["SSS", 3], 0, "millisecond"),
			I(0, ["SSSS", 4], 0, function () {
				return 10 * this.millisecond();
			}),
			I(0, ["SSSSS", 5], 0, function () {
				return 100 * this.millisecond();
			}),
			I(0, ["SSSSSS", 6], 0, function () {
				return 1e3 * this.millisecond();
			}),
			I(0, ["SSSSSSS", 7], 0, function () {
				return 1e4 * this.millisecond();
			}),
			I(0, ["SSSSSSSS", 8], 0, function () {
				return 1e5 * this.millisecond();
			}),
			I(0, ["SSSSSSSSS", 9], 0, function () {
				return 1e6 * this.millisecond();
			}),
			H("millisecond", "ms"),
			L("millisecond", 16),
			ue("S", K, Z),
			ue("SS", K, z),
			ue("SSS", K, $),
			rn = "SSSS";
		rn.length <= 9;
		rn += "S"
	)
		ue(rn, ne);
	function on(e, t) {
		t[we] = k(1e3 * ("0." + e));
	}
	for (rn = "S"; rn.length <= 9; rn += "S") ce(rn, on);
	var un = Te("Milliseconds", !1);
	I("z", 0, 0, "zoneAbbr"), I("zz", 0, 0, "zoneName");
	var ln = M.prototype;
	function dn(e) {
		return e;
	}
	(ln.add = qt),
		(ln.calendar = function (e, t) {
			var n = e || Tt(),
				s = Nt(n, this).startOf("day"),
				i = c.calendarFormat(this, s) || "sameElse",
				r = t && (x(t[i]) ? t[i].call(this, n) : t[i]);
			return this.format(r || this.localeData().calendar(i, this, Tt(n)));
		}),
		(ln.clone = function () {
			return new M(this);
		}),
		(ln.diff = function (e, t, n) {
			var s, i, r;
			if (!this.isValid()) return NaN;
			if (!(s = Nt(e, this)).isValid()) return NaN;
			switch (
				((i = 6e4 * (s.utcOffset() - this.utcOffset())), (t = R(t)))
			) {
				case "year":
					r = Bt(this, s) / 12;
					break;
				case "month":
					r = Bt(this, s);
					break;
				case "quarter":
					r = Bt(this, s) / 3;
					break;
				case "second":
					r = (this - s) / 1e3;
					break;
				case "minute":
					r = (this - s) / 6e4;
					break;
				case "hour":
					r = (this - s) / 36e5;
					break;
				case "day":
					r = (this - s - i) / 864e5;
					break;
				case "week":
					r = (this - s - i) / 6048e5;
					break;
				default:
					r = this - s;
			}
			return n ? r : D(r);
		}),
		(ln.endOf = function (e) {
			return void 0 === (e = R(e)) || "millisecond" === e
				? this
				: ("date" === e && (e = "day"),
				  this.startOf(e)
						.add(1, "isoWeek" === e ? "week" : e)
						.subtract(1, "ms"));
		}),
		(ln.format = function (e) {
			e || (e = this.isUtc() ? c.defaultFormatUtc : c.defaultFormat);
			var t = A(this, e);
			return this.localeData().postformat(t);
		}),
		(ln.from = function (e, t) {
			return this.isValid() && ((S(e) && e.isValid()) || Tt(e).isValid())
				? At({ to: this, from: e }).locale(this.locale()).humanize(!t)
				: this.localeData().invalidDate();
		}),
		(ln.fromNow = function (e) {
			return this.from(Tt(), e);
		}),
		(ln.to = function (e, t) {
			return this.isValid() && ((S(e) && e.isValid()) || Tt(e).isValid())
				? At({ from: this, to: e }).locale(this.locale()).humanize(!t)
				: this.localeData().invalidDate();
		}),
		(ln.toNow = function (e) {
			return this.to(Tt(), e);
		}),
		(ln.get = function (e) {
			return x(this[(e = R(e))]) ? this[e]() : this;
		}),
		(ln.invalidAt = function () {
			return g(this).overflow;
		}),
		(ln.isAfter = function (e, t) {
			var n = S(e) ? e : Tt(e);
			return (
				!(!this.isValid() || !n.isValid()) &&
				("millisecond" === (t = R(l(t) ? "millisecond" : t))
					? this.valueOf() > n.valueOf()
					: n.valueOf() < this.clone().startOf(t).valueOf())
			);
		}),
		(ln.isBefore = function (e, t) {
			var n = S(e) ? e : Tt(e);
			return (
				!(!this.isValid() || !n.isValid()) &&
				("millisecond" === (t = R(l(t) ? "millisecond" : t))
					? this.valueOf() < n.valueOf()
					: this.clone().endOf(t).valueOf() < n.valueOf())
			);
		}),
		(ln.isBetween = function (e, t, n, s) {
			return (
				("(" === (s = s || "()")[0]
					? this.isAfter(e, n)
					: !this.isBefore(e, n)) &&
				(")" === s[1] ? this.isBefore(t, n) : !this.isAfter(t, n))
			);
		}),
		(ln.isSame = function (e, t) {
			var n,
				s = S(e) ? e : Tt(e);
			return (
				!(!this.isValid() || !s.isValid()) &&
				("millisecond" === (t = R(t || "millisecond"))
					? this.valueOf() === s.valueOf()
					: ((n = s.valueOf()),
					  this.clone().startOf(t).valueOf() <= n &&
							n <= this.clone().endOf(t).valueOf()))
			);
		}),
		(ln.isSameOrAfter = function (e, t) {
			return this.isSame(e, t) || this.isAfter(e, t);
		}),
		(ln.isSameOrBefore = function (e, t) {
			return this.isSame(e, t) || this.isBefore(e, t);
		}),
		(ln.isValid = function () {
			return p(this);
		}),
		(ln.lang = Xt),
		(ln.locale = Qt),
		(ln.localeData = Kt),
		(ln.max = bt),
		(ln.min = xt),
		(ln.parsingFlags = function () {
			return _({}, g(this));
		}),
		(ln.set = function (e, t) {
			if ("object" == typeof e)
				for (
					var n = (function (e) {
							var t = [];
							for (var n in e)
								t.push({ unit: n, priority: F[n] });
							return (
								t.sort(function (e, t) {
									return e.priority - t.priority;
								}),
								t
							);
						})((e = C(e))),
						s = 0;
					s < n.length;
					s++
				)
					this[n[s].unit](e[n[s].unit]);
			else if (x(this[(e = R(e))])) return this[e](t);
			return this;
		}),
		(ln.startOf = function (e) {
			switch ((e = R(e))) {
				case "year":
					this.month(0);
				case "quarter":
				case "month":
					this.date(1);
				case "week":
				case "isoWeek":
				case "day":
				case "date":
					this.hours(0);
				case "hour":
					this.minutes(0);
				case "minute":
					this.seconds(0);
				case "second":
					this.milliseconds(0);
			}
			return (
				"week" === e && this.weekday(0),
				"isoWeek" === e && this.isoWeekday(1),
				"quarter" === e && this.month(3 * Math.floor(this.month() / 3)),
				this
			);
		}),
		(ln.subtract = Jt),
		(ln.toArray = function () {
			var e = this;
			return [
				e.year(),
				e.month(),
				e.date(),
				e.hour(),
				e.minute(),
				e.second(),
				e.millisecond(),
			];
		}),
		(ln.toObject = function () {
			var e = this;
			return {
				years: e.year(),
				months: e.month(),
				date: e.date(),
				hours: e.hours(),
				minutes: e.minutes(),
				seconds: e.seconds(),
				milliseconds: e.milliseconds(),
			};
		}),
		(ln.toDate = function () {
			return new Date(this.valueOf());
		}),
		(ln.toISOString = function (e) {
			if (!this.isValid()) return null;
			var t = !0 !== e,
				n = t ? this.clone().utc() : this;
			return n.year() < 0 || 9999 < n.year()
				? A(
						n,
						t
							? "YYYYYY-MM-DD[T]HH:mm:ss.SSS[Z]"
							: "YYYYYY-MM-DD[T]HH:mm:ss.SSSZ"
				  )
				: x(Date.prototype.toISOString)
				? t
					? this.toDate().toISOString()
					: new Date(this.valueOf() + 60 * this.utcOffset() * 1e3)
							.toISOString()
							.replace("Z", A(n, "Z"))
				: A(
						n,
						t
							? "YYYY-MM-DD[T]HH:mm:ss.SSS[Z]"
							: "YYYY-MM-DD[T]HH:mm:ss.SSSZ"
				  );
		}),
		(ln.inspect = function () {
			if (!this.isValid()) return "moment.invalid(/* " + this._i + " */)";
			var e = "moment",
				t = "";
			this.isLocal() ||
				((e =
					0 === this.utcOffset() ? "moment.utc" : "moment.parseZone"),
				(t = "Z"));
			var n = "[" + e + '("]',
				s = 0 <= this.year() && this.year() <= 9999 ? "YYYY" : "YYYYYY",
				i = t + '[")]';
			return this.format(n + s + "-MM-DD[T]HH:mm:ss.SSS" + i);
		}),
		(ln.toJSON = function () {
			return this.isValid() ? this.toISOString() : null;
		}),
		(ln.toString = function () {
			return this.clone()
				.locale("en")
				.format("ddd MMM DD YYYY HH:mm:ss [GMT]ZZ");
		}),
		(ln.unix = function () {
			return Math.floor(this.valueOf() / 1e3);
		}),
		(ln.valueOf = function () {
			return this._d.valueOf() - 6e4 * (this._offset || 0);
		}),
		(ln.creationData = function () {
			return {
				input: this._i,
				format: this._f,
				locale: this._locale,
				isUTC: this._isUTC,
				strict: this._strict,
			};
		}),
		(ln.year = Oe),
		(ln.isLeapYear = function () {
			return ke(this.year());
		}),
		(ln.weekYear = function (e) {
			return tn.call(
				this,
				e,
				this.week(),
				this.weekday(),
				this.localeData()._week.dow,
				this.localeData()._week.doy
			);
		}),
		(ln.isoWeekYear = function (e) {
			return tn.call(this, e, this.isoWeek(), this.isoWeekday(), 1, 4);
		}),
		(ln.quarter = ln.quarters =
			function (e) {
				return null == e
					? Math.ceil((this.month() + 1) / 3)
					: this.month(3 * (e - 1) + (this.month() % 3));
			}),
		(ln.month = Fe),
		(ln.daysInMonth = function () {
			return Pe(this.year(), this.month());
		}),
		(ln.week = ln.weeks =
			function (e) {
				var t = this.localeData().week(this);
				return null == e ? t : this.add(7 * (e - t), "d");
			}),
		(ln.isoWeek = ln.isoWeeks =
			function (e) {
				var t = Ie(this, 1, 4).week;
				return null == e ? t : this.add(7 * (e - t), "d");
			}),
		(ln.weeksInYear = function () {
			var e = this.localeData()._week;
			return Ae(this.year(), e.dow, e.doy);
		}),
		(ln.isoWeeksInYear = function () {
			return Ae(this.year(), 1, 4);
		}),
		(ln.date = nn),
		(ln.day = ln.days =
			function (e) {
				if (!this.isValid()) return null != e ? this : NaN;
				var t,
					n,
					s = this._isUTC ? this._d.getUTCDay() : this._d.getDay();
				return null != e
					? ((t = e),
					  (n = this.localeData()),
					  (e =
							"string" != typeof t
								? t
								: isNaN(t)
								? "number" == typeof (t = n.weekdaysParse(t))
									? t
									: null
								: parseInt(t, 10)),
					  this.add(e - s, "d"))
					: s;
			}),
		(ln.weekday = function (e) {
			if (!this.isValid()) return null != e ? this : NaN;
			var t = (this.day() + 7 - this.localeData()._week.dow) % 7;
			return null == e ? t : this.add(e - t, "d");
		}),
		(ln.isoWeekday = function (e) {
			if (!this.isValid()) return null != e ? this : NaN;
			if (null != e) {
				var t =
					((n = e),
					(s = this.localeData()),
					"string" == typeof n
						? s.weekdaysParse(n) % 7 || 7
						: isNaN(n)
						? null
						: n);
				return this.day(this.day() % 7 ? t : t - 7);
			}
			return this.day() || 7;
			var n, s;
		}),
		(ln.dayOfYear = function (e) {
			var t =
				Math.round(
					(this.clone().startOf("day") -
						this.clone().startOf("year")) /
						864e5
				) + 1;
			return null == e ? t : this.add(e - t, "d");
		}),
		(ln.hour = ln.hours = tt),
		(ln.minute = ln.minutes = sn),
		(ln.second = ln.seconds = an),
		(ln.millisecond = ln.milliseconds = un),
		(ln.utcOffset = function (e, t, n) {
			var s,
				i = this._offset || 0;
			if (!this.isValid()) return null != e ? this : NaN;
			if (null != e) {
				if ("string" == typeof e) {
					if (null === (e = Ut(re, e))) return this;
				} else Math.abs(e) < 16 && !n && (e *= 60);
				return (
					!this._isUTC && t && (s = Gt(this)),
					(this._offset = e),
					(this._isUTC = !0),
					null != s && this.add(s, "m"),
					i !== e &&
						(!t || this._changeInProgress
							? $t(this, At(e - i, "m"), 1, !1)
							: this._changeInProgress ||
							  ((this._changeInProgress = !0),
							  c.updateOffset(this, !0),
							  (this._changeInProgress = null))),
					this
				);
			}
			return this._isUTC ? i : Gt(this);
		}),
		(ln.utc = function (e) {
			return this.utcOffset(0, e);
		}),
		(ln.local = function (e) {
			return (
				this._isUTC &&
					(this.utcOffset(0, e),
					(this._isUTC = !1),
					e && this.subtract(Gt(this), "m")),
				this
			);
		}),
		(ln.parseZone = function () {
			if (null != this._tzm) this.utcOffset(this._tzm, !1, !0);
			else if ("string" == typeof this._i) {
				var e = Ut(ie, this._i);
				null != e ? this.utcOffset(e) : this.utcOffset(0, !0);
			}
			return this;
		}),
		(ln.hasAlignedHourOffset = function (e) {
			return (
				!!this.isValid() &&
				((e = e ? Tt(e).utcOffset() : 0),
				(this.utcOffset() - e) % 60 == 0)
			);
		}),
		(ln.isDST = function () {
			return (
				this.utcOffset() > this.clone().month(0).utcOffset() ||
				this.utcOffset() > this.clone().month(5).utcOffset()
			);
		}),
		(ln.isLocal = function () {
			return !!this.isValid() && !this._isUTC;
		}),
		(ln.isUtcOffset = function () {
			return !!this.isValid() && this._isUTC;
		}),
		(ln.isUtc = Vt),
		(ln.isUTC = Vt),
		(ln.zoneAbbr = function () {
			return this._isUTC ? "UTC" : "";
		}),
		(ln.zoneName = function () {
			return this._isUTC ? "Coordinated Universal Time" : "";
		}),
		(ln.dates = n("dates accessor is deprecated. Use date instead.", nn)),
		(ln.months = n("months accessor is deprecated. Use month instead", Fe)),
		(ln.years = n("years accessor is deprecated. Use year instead", Oe)),
		(ln.zone = n(
			"moment().zone is deprecated, use moment().utcOffset instead. http://momentjs.com/guides/#/warnings/zone/",
			function (e, t) {
				return null != e
					? ("string" != typeof e && (e = -e),
					  this.utcOffset(e, t),
					  this)
					: -this.utcOffset();
			}
		)),
		(ln.isDSTShifted = n(
			"isDSTShifted is deprecated. See http://momentjs.com/guides/#/warnings/dst-shifted/ for more information",
			function () {
				if (!l(this._isDSTShifted)) return this._isDSTShifted;
				var e = {};
				if ((w(e, this), (e = Yt(e))._a)) {
					var t = e._isUTC ? y(e._a) : Tt(e._a);
					this._isDSTShifted =
						this.isValid() && 0 < a(e._a, t.toArray());
				} else this._isDSTShifted = !1;
				return this._isDSTShifted;
			}
		));
	var hn = P.prototype;
	function cn(e, t, n, s) {
		var i = lt(),
			r = y().set(s, t);
		return i[n](r, e);
	}
	function fn(e, t, n) {
		if ((d(e) && ((t = e), (e = void 0)), (e = e || ""), null != t))
			return cn(e, t, n, "month");
		var s,
			i = [];
		for (s = 0; s < 12; s++) i[s] = cn(e, s, n, "month");
		return i;
	}
	function mn(e, t, n, s) {
		"boolean" == typeof e
			? d(t) && ((n = t), (t = void 0))
			: ((t = e), (e = !1), d((n = t)) && ((n = t), (t = void 0))),
			(t = t || "");
		var i,
			r = lt(),
			a = e ? r._week.dow : 0;
		if (null != n) return cn(t, (n + a) % 7, s, "day");
		var o = [];
		for (i = 0; i < 7; i++) o[i] = cn(t, (i + a) % 7, s, "day");
		return o;
	}
	(hn.calendar = function (e, t, n) {
		var s = this._calendar[e] || this._calendar.sameElse;
		return x(s) ? s.call(t, n) : s;
	}),
		(hn.longDateFormat = function (e) {
			var t = this._longDateFormat[e],
				n = this._longDateFormat[e.toUpperCase()];
			return t || !n
				? t
				: ((this._longDateFormat[e] = n.replace(
						/MMMM|MM|DD|dddd/g,
						function (e) {
							return e.slice(1);
						}
				  )),
				  this._longDateFormat[e]);
		}),
		(hn.invalidDate = function () {
			return this._invalidDate;
		}),
		(hn.ordinal = function (e) {
			return this._ordinal.replace("%d", e);
		}),
		(hn.preparse = dn),
		(hn.postformat = dn),
		(hn.relativeTime = function (e, t, n, s) {
			var i = this._relativeTime[n];
			return x(i) ? i(e, t, n, s) : i.replace(/%d/i, e);
		}),
		(hn.pastFuture = function (e, t) {
			var n = this._relativeTime[0 < e ? "future" : "past"];
			return x(n) ? n(t) : n.replace(/%s/i, t);
		}),
		(hn.set = function (e) {
			var t, n;
			for (n in e) x((t = e[n])) ? (this[n] = t) : (this["_" + n] = t);
			(this._config = e),
				(this._dayOfMonthOrdinalParseLenient = new RegExp(
					(this._dayOfMonthOrdinalParse.source ||
						this._ordinalParse.source) +
						"|" +
						/\d{1,2}/.source
				));
		}),
		(hn.months = function (e, t) {
			return e
				? o(this._months)
					? this._months[e.month()]
					: this._months[
							(this._months.isFormat || We).test(t)
								? "format"
								: "standalone"
					  ][e.month()]
				: o(this._months)
				? this._months
				: this._months.standalone;
		}),
		(hn.monthsShort = function (e, t) {
			return e
				? o(this._monthsShort)
					? this._monthsShort[e.month()]
					: this._monthsShort[We.test(t) ? "format" : "standalone"][
							e.month()
					  ]
				: o(this._monthsShort)
				? this._monthsShort
				: this._monthsShort.standalone;
		}),
		(hn.monthsParse = function (e, t, n) {
			var s, i, r;
			if (this._monthsParseExact)
				return function (e, t, n) {
					var s,
						i,
						r,
						a = e.toLocaleLowerCase();
					if (!this._monthsParse)
						for (
							this._monthsParse = [],
								this._longMonthsParse = [],
								this._shortMonthsParse = [],
								s = 0;
							s < 12;
							++s
						)
							(r = y([2e3, s])),
								(this._shortMonthsParse[s] = this.monthsShort(
									r,
									""
								).toLocaleLowerCase()),
								(this._longMonthsParse[s] = this.months(
									r,
									""
								).toLocaleLowerCase());
					return n
						? "MMM" === t
							? -1 !== (i = Ye.call(this._shortMonthsParse, a))
								? i
								: null
							: -1 !== (i = Ye.call(this._longMonthsParse, a))
							? i
							: null
						: "MMM" === t
						? -1 !== (i = Ye.call(this._shortMonthsParse, a))
							? i
							: -1 !== (i = Ye.call(this._longMonthsParse, a))
							? i
							: null
						: -1 !== (i = Ye.call(this._longMonthsParse, a))
						? i
						: -1 !== (i = Ye.call(this._shortMonthsParse, a))
						? i
						: null;
				}.call(this, e, t, n);
			for (
				this._monthsParse ||
					((this._monthsParse = []),
					(this._longMonthsParse = []),
					(this._shortMonthsParse = [])),
					s = 0;
				s < 12;
				s++
			) {
				if (
					((i = y([2e3, s])),
					n &&
						!this._longMonthsParse[s] &&
						((this._longMonthsParse[s] = new RegExp(
							"^" + this.months(i, "").replace(".", "") + "$",
							"i"
						)),
						(this._shortMonthsParse[s] = new RegExp(
							"^" +
								this.monthsShort(i, "").replace(".", "") +
								"$",
							"i"
						))),
					n ||
						this._monthsParse[s] ||
						((r =
							"^" +
							this.months(i, "") +
							"|^" +
							this.monthsShort(i, "")),
						(this._monthsParse[s] = new RegExp(
							r.replace(".", ""),
							"i"
						))),
					n && "MMMM" === t && this._longMonthsParse[s].test(e))
				)
					return s;
				if (n && "MMM" === t && this._shortMonthsParse[s].test(e))
					return s;
				if (!n && this._monthsParse[s].test(e)) return s;
			}
		}),
		(hn.monthsRegex = function (e) {
			return this._monthsParseExact
				? (m(this, "_monthsRegex") || Ne.call(this),
				  e ? this._monthsStrictRegex : this._monthsRegex)
				: (m(this, "_monthsRegex") || (this._monthsRegex = Ue),
				  this._monthsStrictRegex && e
						? this._monthsStrictRegex
						: this._monthsRegex);
		}),
		(hn.monthsShortRegex = function (e) {
			return this._monthsParseExact
				? (m(this, "_monthsRegex") || Ne.call(this),
				  e ? this._monthsShortStrictRegex : this._monthsShortRegex)
				: (m(this, "_monthsShortRegex") ||
						(this._monthsShortRegex = Le),
				  this._monthsShortStrictRegex && e
						? this._monthsShortStrictRegex
						: this._monthsShortRegex);
		}),
		(hn.week = function (e) {
			return Ie(e, this._week.dow, this._week.doy).week;
		}),
		(hn.firstDayOfYear = function () {
			return this._week.doy;
		}),
		(hn.firstDayOfWeek = function () {
			return this._week.dow;
		}),
		(hn.weekdays = function (e, t) {
			return e
				? o(this._weekdays)
					? this._weekdays[e.day()]
					: this._weekdays[
							this._weekdays.isFormat.test(t)
								? "format"
								: "standalone"
					  ][e.day()]
				: o(this._weekdays)
				? this._weekdays
				: this._weekdays.standalone;
		}),
		(hn.weekdaysMin = function (e) {
			return e ? this._weekdaysMin[e.day()] : this._weekdaysMin;
		}),
		(hn.weekdaysShort = function (e) {
			return e ? this._weekdaysShort[e.day()] : this._weekdaysShort;
		}),
		(hn.weekdaysParse = function (e, t, n) {
			var s, i, r;
			if (this._weekdaysParseExact)
				return function (e, t, n) {
					var s,
						i,
						r,
						a = e.toLocaleLowerCase();
					if (!this._weekdaysParse)
						for (
							this._weekdaysParse = [],
								this._shortWeekdaysParse = [],
								this._minWeekdaysParse = [],
								s = 0;
							s < 7;
							++s
						)
							(r = y([2e3, 1]).day(s)),
								(this._minWeekdaysParse[s] = this.weekdaysMin(
									r,
									""
								).toLocaleLowerCase()),
								(this._shortWeekdaysParse[s] =
									this.weekdaysShort(
										r,
										""
									).toLocaleLowerCase()),
								(this._weekdaysParse[s] = this.weekdays(
									r,
									""
								).toLocaleLowerCase());
					return n
						? "dddd" === t
							? -1 !== (i = Ye.call(this._weekdaysParse, a))
								? i
								: null
							: "ddd" === t
							? -1 !== (i = Ye.call(this._shortWeekdaysParse, a))
								? i
								: null
							: -1 !== (i = Ye.call(this._minWeekdaysParse, a))
							? i
							: null
						: "dddd" === t
						? -1 !== (i = Ye.call(this._weekdaysParse, a))
							? i
							: -1 !== (i = Ye.call(this._shortWeekdaysParse, a))
							? i
							: -1 !== (i = Ye.call(this._minWeekdaysParse, a))
							? i
							: null
						: "ddd" === t
						? -1 !== (i = Ye.call(this._shortWeekdaysParse, a))
							? i
							: -1 !== (i = Ye.call(this._weekdaysParse, a))
							? i
							: -1 !== (i = Ye.call(this._minWeekdaysParse, a))
							? i
							: null
						: -1 !== (i = Ye.call(this._minWeekdaysParse, a))
						? i
						: -1 !== (i = Ye.call(this._weekdaysParse, a))
						? i
						: -1 !== (i = Ye.call(this._shortWeekdaysParse, a))
						? i
						: null;
				}.call(this, e, t, n);
			for (
				this._weekdaysParse ||
					((this._weekdaysParse = []),
					(this._minWeekdaysParse = []),
					(this._shortWeekdaysParse = []),
					(this._fullWeekdaysParse = [])),
					s = 0;
				s < 7;
				s++
			) {
				if (
					((i = y([2e3, 1]).day(s)),
					n &&
						!this._fullWeekdaysParse[s] &&
						((this._fullWeekdaysParse[s] = new RegExp(
							"^" + this.weekdays(i, "").replace(".", ".?") + "$",
							"i"
						)),
						(this._shortWeekdaysParse[s] = new RegExp(
							"^" +
								this.weekdaysShort(i, "").replace(".", ".?") +
								"$",
							"i"
						)),
						(this._minWeekdaysParse[s] = new RegExp(
							"^" +
								this.weekdaysMin(i, "").replace(".", ".?") +
								"$",
							"i"
						))),
					this._weekdaysParse[s] ||
						((r =
							"^" +
							this.weekdays(i, "") +
							"|^" +
							this.weekdaysShort(i, "") +
							"|^" +
							this.weekdaysMin(i, "")),
						(this._weekdaysParse[s] = new RegExp(
							r.replace(".", ""),
							"i"
						))),
					n && "dddd" === t && this._fullWeekdaysParse[s].test(e))
				)
					return s;
				if (n && "ddd" === t && this._shortWeekdaysParse[s].test(e))
					return s;
				if (n && "dd" === t && this._minWeekdaysParse[s].test(e))
					return s;
				if (!n && this._weekdaysParse[s].test(e)) return s;
			}
		}),
		(hn.weekdaysRegex = function (e) {
			return this._weekdaysParseExact
				? (m(this, "_weekdaysRegex") || Be.call(this),
				  e ? this._weekdaysStrictRegex : this._weekdaysRegex)
				: (m(this, "_weekdaysRegex") || (this._weekdaysRegex = $e),
				  this._weekdaysStrictRegex && e
						? this._weekdaysStrictRegex
						: this._weekdaysRegex);
		}),
		(hn.weekdaysShortRegex = function (e) {
			return this._weekdaysParseExact
				? (m(this, "_weekdaysRegex") || Be.call(this),
				  e ? this._weekdaysShortStrictRegex : this._weekdaysShortRegex)
				: (m(this, "_weekdaysShortRegex") ||
						(this._weekdaysShortRegex = qe),
				  this._weekdaysShortStrictRegex && e
						? this._weekdaysShortStrictRegex
						: this._weekdaysShortRegex);
		}),
		(hn.weekdaysMinRegex = function (e) {
			return this._weekdaysParseExact
				? (m(this, "_weekdaysRegex") || Be.call(this),
				  e ? this._weekdaysMinStrictRegex : this._weekdaysMinRegex)
				: (m(this, "_weekdaysMinRegex") ||
						(this._weekdaysMinRegex = Je),
				  this._weekdaysMinStrictRegex && e
						? this._weekdaysMinStrictRegex
						: this._weekdaysMinRegex);
		}),
		(hn.isPM = function (e) {
			return "p" === (e + "").toLowerCase().charAt(0);
		}),
		(hn.meridiem = function (e, t, n) {
			return 11 < e ? (n ? "pm" : "PM") : n ? "am" : "AM";
		}),
		ot("en", {
			dayOfMonthOrdinalParse: /\d{1,2}(th|st|nd|rd)/,
			ordinal: function (e) {
				var t = e % 10;
				return (
					e +
					(1 === k((e % 100) / 10)
						? "th"
						: 1 === t
						? "st"
						: 2 === t
						? "nd"
						: 3 === t
						? "rd"
						: "th")
				);
			},
		}),
		(c.lang = n(
			"moment.lang is deprecated. Use moment.locale instead.",
			ot
		)),
		(c.langData = n(
			"moment.langData is deprecated. Use moment.localeData instead.",
			lt
		));
	var _n = Math.abs;
	function yn(e, t, n, s) {
		var i = At(t, n);
		return (
			(e._milliseconds += s * i._milliseconds),
			(e._days += s * i._days),
			(e._months += s * i._months),
			e._bubble()
		);
	}
	function gn(e) {
		return e < 0 ? Math.floor(e) : Math.ceil(e);
	}
	function pn(e) {
		return (4800 * e) / 146097;
	}
	function vn(e) {
		return (146097 * e) / 4800;
	}
	function wn(e) {
		return function () {
			return this.as(e);
		};
	}
	var Mn = wn("ms"),
		Sn = wn("s"),
		Dn = wn("m"),
		kn = wn("h"),
		Yn = wn("d"),
		On = wn("w"),
		Tn = wn("M"),
		xn = wn("y");
	function bn(e) {
		return function () {
			return this.isValid() ? this._data[e] : NaN;
		};
	}
	var Pn = bn("milliseconds"),
		Wn = bn("seconds"),
		Hn = bn("minutes"),
		Rn = bn("hours"),
		Cn = bn("days"),
		Fn = bn("months"),
		Ln = bn("years");
	var Un = Math.round,
		Nn = { ss: 44, s: 45, m: 45, h: 22, d: 26, M: 11 };
	var Gn = Math.abs;
	function Vn(e) {
		return (0 < e) - (e < 0) || +e;
	}
	function En() {
		if (!this.isValid()) return this.localeData().invalidDate();
		var e,
			t,
			n = Gn(this._milliseconds) / 1e3,
			s = Gn(this._days),
			i = Gn(this._months);
		(t = D((e = D(n / 60)) / 60)), (n %= 60), (e %= 60);
		var r = D(i / 12),
			a = (i %= 12),
			o = s,
			u = t,
			l = e,
			d = n ? n.toFixed(3).replace(/\.?0+$/, "") : "",
			h = this.asSeconds();
		if (!h) return "P0D";
		var c = h < 0 ? "-" : "",
			f = Vn(this._months) !== Vn(h) ? "-" : "",
			m = Vn(this._days) !== Vn(h) ? "-" : "",
			_ = Vn(this._milliseconds) !== Vn(h) ? "-" : "";
		return (
			c +
			"P" +
			(r ? f + r + "Y" : "") +
			(a ? f + a + "M" : "") +
			(o ? m + o + "D" : "") +
			(u || l || d ? "T" : "") +
			(u ? _ + u + "H" : "") +
			(l ? _ + l + "M" : "") +
			(d ? _ + d + "S" : "")
		);
	}
	var In = Ht.prototype;
	return (
		(In.isValid = function () {
			return this._isValid;
		}),
		(In.abs = function () {
			var e = this._data;
			return (
				(this._milliseconds = _n(this._milliseconds)),
				(this._days = _n(this._days)),
				(this._months = _n(this._months)),
				(e.milliseconds = _n(e.milliseconds)),
				(e.seconds = _n(e.seconds)),
				(e.minutes = _n(e.minutes)),
				(e.hours = _n(e.hours)),
				(e.months = _n(e.months)),
				(e.years = _n(e.years)),
				this
			);
		}),
		(In.add = function (e, t) {
			return yn(this, e, t, 1);
		}),
		(In.subtract = function (e, t) {
			return yn(this, e, t, -1);
		}),
		(In.as = function (e) {
			if (!this.isValid()) return NaN;
			var t,
				n,
				s = this._milliseconds;
			if ("month" === (e = R(e)) || "year" === e)
				return (
					(t = this._days + s / 864e5),
					(n = this._months + pn(t)),
					"month" === e ? n : n / 12
				);
			switch (((t = this._days + Math.round(vn(this._months))), e)) {
				case "week":
					return t / 7 + s / 6048e5;
				case "day":
					return t + s / 864e5;
				case "hour":
					return 24 * t + s / 36e5;
				case "minute":
					return 1440 * t + s / 6e4;
				case "second":
					return 86400 * t + s / 1e3;
				case "millisecond":
					return Math.floor(864e5 * t) + s;
				default:
					throw new Error("Unknown unit " + e);
			}
		}),
		(In.asMilliseconds = Mn),
		(In.asSeconds = Sn),
		(In.asMinutes = Dn),
		(In.asHours = kn),
		(In.asDays = Yn),
		(In.asWeeks = On),
		(In.asMonths = Tn),
		(In.asYears = xn),
		(In.valueOf = function () {
			return this.isValid()
				? this._milliseconds +
						864e5 * this._days +
						(this._months % 12) * 2592e6 +
						31536e6 * k(this._months / 12)
				: NaN;
		}),
		(In._bubble = function () {
			var e,
				t,
				n,
				s,
				i,
				r = this._milliseconds,
				a = this._days,
				o = this._months,
				u = this._data;
			return (
				(0 <= r && 0 <= a && 0 <= o) ||
					(r <= 0 && a <= 0 && o <= 0) ||
					((r += 864e5 * gn(vn(o) + a)), (o = a = 0)),
				(u.milliseconds = r % 1e3),
				(e = D(r / 1e3)),
				(u.seconds = e % 60),
				(t = D(e / 60)),
				(u.minutes = t % 60),
				(n = D(t / 60)),
				(u.hours = n % 24),
				(o += i = D(pn((a += D(n / 24))))),
				(a -= gn(vn(i))),
				(s = D(o / 12)),
				(o %= 12),
				(u.days = a),
				(u.months = o),
				(u.years = s),
				this
			);
		}),
		(In.clone = function () {
			return At(this);
		}),
		(In.get = function (e) {
			return (e = R(e)), this.isValid() ? this[e + "s"]() : NaN;
		}),
		(In.milliseconds = Pn),
		(In.seconds = Wn),
		(In.minutes = Hn),
		(In.hours = Rn),
		(In.days = Cn),
		(In.weeks = function () {
			return D(this.days() / 7);
		}),
		(In.months = Fn),
		(In.years = Ln),
		(In.humanize = function (e) {
			if (!this.isValid()) return this.localeData().invalidDate();
			var t,
				n,
				s,
				i,
				r,
				a,
				o,
				u,
				l,
				d,
				h,
				c = this.localeData(),
				f =
					((n = !e),
					(s = c),
					(i = At((t = this)).abs()),
					(r = Un(i.as("s"))),
					(a = Un(i.as("m"))),
					(o = Un(i.as("h"))),
					(u = Un(i.as("d"))),
					(l = Un(i.as("M"))),
					(d = Un(i.as("y"))),
					((h = (r <= Nn.ss && ["s", r]) ||
						(r < Nn.s && ["ss", r]) ||
						(a <= 1 && ["m"]) ||
						(a < Nn.m && ["mm", a]) ||
						(o <= 1 && ["h"]) ||
						(o < Nn.h && ["hh", o]) ||
						(u <= 1 && ["d"]) ||
						(u < Nn.d && ["dd", u]) ||
						(l <= 1 && ["M"]) ||
						(l < Nn.M && ["MM", l]) ||
						(d <= 1 && ["y"]) || ["yy", d])[2] = n),
					(h[3] = 0 < +t),
					(h[4] = s),
					function (e, t, n, s, i) {
						return i.relativeTime(t || 1, !!n, e, s);
					}.apply(null, h));
			return e && (f = c.pastFuture(+this, f)), c.postformat(f);
		}),
		(In.toISOString = En),
		(In.toString = En),
		(In.toJSON = En),
		(In.locale = Qt),
		(In.localeData = Kt),
		(In.toIsoString = n(
			"toIsoString() is deprecated. Please use toISOString() instead (notice the capitals)",
			En
		)),
		(In.lang = Xt),
		I("X", 0, 0, "unix"),
		I("x", 0, 0, "valueOf"),
		ue("x", se),
		ue("X", /[+-]?\d+(\.\d{1,3})?/),
		ce("X", function (e, t, n) {
			n._d = new Date(1e3 * parseFloat(e, 10));
		}),
		ce("x", function (e, t, n) {
			n._d = new Date(k(e));
		}),
		(c.version = "2.22.1"),
		(e = Tt),
		(c.fn = ln),
		(c.min = function () {
			return Pt("isBefore", [].slice.call(arguments, 0));
		}),
		(c.max = function () {
			return Pt("isAfter", [].slice.call(arguments, 0));
		}),
		(c.now = function () {
			return Date.now ? Date.now() : +new Date();
		}),
		(c.utc = y),
		(c.unix = function (e) {
			return Tt(1e3 * e);
		}),
		(c.months = function (e, t) {
			return fn(e, t, "months");
		}),
		(c.isDate = h),
		(c.locale = ot),
		(c.invalid = v),
		(c.duration = At),
		(c.isMoment = S),
		(c.weekdays = function (e, t, n) {
			return mn(e, t, n, "weekdays");
		}),
		(c.parseZone = function () {
			return Tt.apply(null, arguments).parseZone();
		}),
		(c.localeData = lt),
		(c.isDuration = Rt),
		(c.monthsShort = function (e, t) {
			return fn(e, t, "monthsShort");
		}),
		(c.weekdaysMin = function (e, t, n) {
			return mn(e, t, n, "weekdaysMin");
		}),
		(c.defineLocale = ut),
		(c.updateLocale = function (e, t) {
			if (null != t) {
				var n,
					s,
					i = nt;
				null != (s = at(e)) && (i = s._config),
					((n = new P((t = b(i, t)))).parentLocale = st[e]),
					(st[e] = n),
					ot(e);
			} else
				null != st[e] &&
					(null != st[e].parentLocale
						? (st[e] = st[e].parentLocale)
						: null != st[e] && delete st[e]);
			return st[e];
		}),
		(c.locales = function () {
			return s(st);
		}),
		(c.weekdaysShort = function (e, t, n) {
			return mn(e, t, n, "weekdaysShort");
		}),
		(c.normalizeUnits = R),
		(c.relativeTimeRounding = function (e) {
			return void 0 === e ? Un : "function" == typeof e && ((Un = e), !0);
		}),
		(c.relativeTimeThreshold = function (e, t) {
			return (
				void 0 !== Nn[e] &&
				(void 0 === t
					? Nn[e]
					: ((Nn[e] = t), "s" === e && (Nn.ss = t - 1), !0))
			);
		}),
		(c.calendarFormat = function (e, t) {
			var n = e.diff(t, "days", !0);
			return n < -6
				? "sameElse"
				: n < -1
				? "lastWeek"
				: n < 0
				? "lastDay"
				: n < 1
				? "sameDay"
				: n < 2
				? "nextDay"
				: n < 7
				? "nextWeek"
				: "sameElse";
		}),
		(c.prototype = ln),
		(c.HTML5_FMT = {
			DATETIME_LOCAL: "YYYY-MM-DDTHH:mm",
			DATETIME_LOCAL_SECONDS: "YYYY-MM-DDTHH:mm:ss",
			DATETIME_LOCAL_MS: "YYYY-MM-DDTHH:mm:ss.SSS",
			DATE: "YYYY-MM-DD",
			TIME: "HH:mm",
			TIME_SECONDS: "HH:mm:ss",
			TIME_MS: "HH:mm:ss.SSS",
			WEEK: "YYYY-[W]WW",
			MONTH: "YYYY-MM",
		}),
		c
	);
});
// datepicker
!(function (t, a) {
	if ("function" == typeof define && define.amd)
		define(["moment", "jquery"], function (t, e) {
			return e.fn || (e.fn = {}), a(t, e);
		});
	else if ("object" == typeof module && module.exports) {
		var e = "undefined" != typeof window ? window.jQuery : void 0;
		e || (e = require("jquery")).fn || (e.fn = {});
		var i =
			"undefined" != typeof window && void 0 !== window.moment
				? window.moment
				: require("moment");
		module.exports = a(i, e);
	} else t.daterangepicker = a(t.moment, t.jQuery);
})(this, function (H, R) {
	var i = function (t, e, a) {
		if (
			((this.parentEl = "body"),
			(this.element = R(t)),
			(this.startDate = H().startOf("day")),
			(this.endDate = H().endOf("day")),
			(this.minDate = !1),
			(this.maxDate = !1),
			(this.maxSpan = !1),
			(this.autoApply = !1),
			(this.singleDatePicker = !1),
			(this.showDropdowns = !1),
			(this.minYear = H().subtract(100, "year").format("YYYY")),
			(this.maxYear = H().add(100, "year").format("YYYY")),
			(this.showWeekNumbers = !1),
			(this.showISOWeekNumbers = !1),
			(this.showCustomRangeLabel = !0),
			(this.timePicker = !1),
			(this.timePicker24Hour = !1),
			(this.timePickerIncrement = 1),
			(this.timePickerSeconds = !1),
			(this.linkedCalendars = !0),
			(this.autoUpdateInput = !0),
			(this.alwaysShowCalendars = !1),
			(this.ranges = {}),
			(this.opens = "right"),
			this.element.hasClass("pull-right") && (this.opens = "left"),
			(this.drops = "down"),
			this.element.hasClass("dropup") && (this.drops = "up"),
			(this.buttonClasses = "btn btn-sm"),
			(this.applyButtonClasses = "btn-primary"),
			(this.cancelButtonClasses = "btn-default"),
			(this.locale = {
				direction: "ltr",
				format: H.localeData().longDateFormat("L"),
				separator: " - ",
				applyLabel: "Apply",
				cancelLabel: "Cancel",
				weekLabel: "W",
				customRangeLabel: "Custom Range",
				daysOfWeek: H.weekdaysMin(),
				monthNames: H.monthsShort(),
				firstDay: H.localeData().firstDayOfWeek(),
			}),
			(this.callback = function () {}),
			(this.isShowing = !1),
			(this.leftCalendar = {}),
			(this.rightCalendar = {}),
			("object" == typeof e && null !== e) || (e = {}),
			"string" ==
				typeof (e = R.extend(this.element.data(), e)).template ||
				e.template instanceof R ||
				(e.template =
					'<div class="daterangepicker"><div class="ranges"></div><div class="drp-calendar left"><div class="calendar-table"></div><div class="calendar-time"></div></div><div class="drp-calendar right"><div class="calendar-table"></div><div class="calendar-time"></div></div><div class="drp-buttons"><span class="drp-selected"></span><button class="cancelBtn" type="button"></button><button class="applyBtn" disabled="disabled" type="button"></button> </div></div>'),
			(this.parentEl =
				e.parentEl && R(e.parentEl).length
					? R(e.parentEl)
					: R(this.parentEl)),
			(this.container = R(e.template).appendTo(this.parentEl)),
			"object" == typeof e.locale &&
				("string" == typeof e.locale.direction &&
					(this.locale.direction = e.locale.direction),
				"string" == typeof e.locale.format &&
					(this.locale.format = e.locale.format),
				"string" == typeof e.locale.separator &&
					(this.locale.separator = e.locale.separator),
				"object" == typeof e.locale.daysOfWeek &&
					(this.locale.daysOfWeek = e.locale.daysOfWeek.slice()),
				"object" == typeof e.locale.monthNames &&
					(this.locale.monthNames = e.locale.monthNames.slice()),
				"number" == typeof e.locale.firstDay &&
					(this.locale.firstDay = e.locale.firstDay),
				"string" == typeof e.locale.applyLabel &&
					(this.locale.applyLabel = e.locale.applyLabel),
				"string" == typeof e.locale.cancelLabel &&
					(this.locale.cancelLabel = e.locale.cancelLabel),
				"string" == typeof e.locale.weekLabel &&
					(this.locale.weekLabel = e.locale.weekLabel),
				"string" == typeof e.locale.customRangeLabel))
		) {
			(d = document.createElement("textarea")).innerHTML =
				e.locale.customRangeLabel;
			var i = d.value;
			this.locale.customRangeLabel = i;
		}
		if (
			(this.container.addClass(this.locale.direction),
			"string" == typeof e.startDate &&
				(this.startDate = H(e.startDate, this.locale.format)),
			"string" == typeof e.endDate &&
				(this.endDate = H(e.endDate, this.locale.format)),
			"string" == typeof e.minDate &&
				(this.minDate = H(e.minDate, this.locale.format)),
			"string" == typeof e.maxDate &&
				(this.maxDate = H(e.maxDate, this.locale.format)),
			"object" == typeof e.startDate && (this.startDate = H(e.startDate)),
			"object" == typeof e.endDate && (this.endDate = H(e.endDate)),
			"object" == typeof e.minDate && (this.minDate = H(e.minDate)),
			"object" == typeof e.maxDate && (this.maxDate = H(e.maxDate)),
			this.minDate &&
				this.startDate.isBefore(this.minDate) &&
				(this.startDate = this.minDate.clone()),
			this.maxDate &&
				this.endDate.isAfter(this.maxDate) &&
				(this.endDate = this.maxDate.clone()),
			"string" == typeof e.applyButtonClasses &&
				(this.applyButtonClasses = e.applyButtonClasses),
			"string" == typeof e.applyClass &&
				(this.applyButtonClasses = e.applyClass),
			"string" == typeof e.cancelButtonClasses &&
				(this.cancelButtonClasses = e.cancelButtonClasses),
			"string" == typeof e.cancelClass &&
				(this.cancelButtonClasses = e.cancelClass),
			"object" == typeof e.maxSpan && (this.maxSpan = e.maxSpan),
			"object" == typeof e.dateLimit && (this.maxSpan = e.dateLimit),
			"string" == typeof e.opens && (this.opens = e.opens),
			"string" == typeof e.drops && (this.drops = e.drops),
			"boolean" == typeof e.showWeekNumbers &&
				(this.showWeekNumbers = e.showWeekNumbers),
			"boolean" == typeof e.showISOWeekNumbers &&
				(this.showISOWeekNumbers = e.showISOWeekNumbers),
			"string" == typeof e.buttonClasses &&
				(this.buttonClasses = e.buttonClasses),
			"object" == typeof e.buttonClasses &&
				(this.buttonClasses = e.buttonClasses.join(" ")),
			"boolean" == typeof e.showDropdowns &&
				(this.showDropdowns = e.showDropdowns),
			"number" == typeof e.minYear && (this.minYear = e.minYear),
			"number" == typeof e.maxYear && (this.maxYear = e.maxYear),
			"boolean" == typeof e.showCustomRangeLabel &&
				(this.showCustomRangeLabel = e.showCustomRangeLabel),
			"boolean" == typeof e.singleDatePicker &&
				((this.singleDatePicker = e.singleDatePicker),
				this.singleDatePicker &&
					(this.endDate = this.startDate.clone())),
			"boolean" == typeof e.timePicker &&
				(this.timePicker = e.timePicker),
			"boolean" == typeof e.timePickerSeconds &&
				(this.timePickerSeconds = e.timePickerSeconds),
			"number" == typeof e.timePickerIncrement &&
				(this.timePickerIncrement = e.timePickerIncrement),
			"boolean" == typeof e.timePicker24Hour &&
				(this.timePicker24Hour = e.timePicker24Hour),
			"boolean" == typeof e.autoApply && (this.autoApply = e.autoApply),
			"boolean" == typeof e.autoUpdateInput &&
				(this.autoUpdateInput = e.autoUpdateInput),
			"boolean" == typeof e.linkedCalendars &&
				(this.linkedCalendars = e.linkedCalendars),
			"function" == typeof e.isInvalidDate &&
				(this.isInvalidDate = e.isInvalidDate),
			"function" == typeof e.isCustomDate &&
				(this.isCustomDate = e.isCustomDate),
			"boolean" == typeof e.alwaysShowCalendars &&
				(this.alwaysShowCalendars = e.alwaysShowCalendars),
			0 != this.locale.firstDay)
		)
			for (var s = this.locale.firstDay; 0 < s; )
				this.locale.daysOfWeek.push(this.locale.daysOfWeek.shift()),
					s--;
		var n, r, o;
		if (
			void 0 === e.startDate &&
			void 0 === e.endDate &&
			R(this.element).is(":text")
		) {
			var h = R(this.element).val(),
				l = h.split(this.locale.separator);
			(n = r = null),
				2 == l.length
					? ((n = H(l[0], this.locale.format)),
					  (r = H(l[1], this.locale.format)))
					: this.singleDatePicker &&
					  "" !== h &&
					  ((n = H(h, this.locale.format)),
					  (r = H(h, this.locale.format))),
				null !== n &&
					null !== r &&
					(this.setStartDate(n), this.setEndDate(r));
		}
		if ("object" == typeof e.ranges) {
			for (o in e.ranges) {
				(n =
					"string" == typeof e.ranges[o][0]
						? H(e.ranges[o][0], this.locale.format)
						: H(e.ranges[o][0])),
					(r =
						"string" == typeof e.ranges[o][1]
							? H(e.ranges[o][1], this.locale.format)
							: H(e.ranges[o][1])),
					this.minDate &&
						n.isBefore(this.minDate) &&
						(n = this.minDate.clone());
				var c = this.maxDate;
				if (
					(this.maxSpan &&
						c &&
						n.clone().add(this.maxSpan).isAfter(c) &&
						(c = n.clone().add(this.maxSpan)),
					c && r.isAfter(c) && (r = c.clone()),
					!(
						(this.minDate &&
							r.isBefore(
								this.minDate,
								this.timepicker ? "minute" : "day"
							)) ||
						(c && n.isAfter(c, this.timepicker ? "minute" : "day"))
					))
				) {
					var d;
					(d = document.createElement("textarea")).innerHTML = o;
					i = d.value;
					this.ranges[i] = [n, r];
				}
			}
			var m = "<ul>";
			for (o in this.ranges)
				m += '<li data-range-key="' + o + '">' + o + "</li>";
			this.showCustomRangeLabel &&
				(m +=
					'<li data-range-key="' +
					this.locale.customRangeLabel +
					'">' +
					this.locale.customRangeLabel +
					"</li>"),
				(m += "</ul>"),
				this.container.find(".ranges").prepend(m);
		}
		"function" == typeof a && (this.callback = a),
			this.timePicker ||
				((this.startDate = this.startDate.startOf("day")),
				(this.endDate = this.endDate.endOf("day")),
				this.container.find(".calendar-time").hide()),
			this.timePicker && this.autoApply && (this.autoApply = !1),
			this.autoApply && this.container.addClass("auto-apply"),
			"object" == typeof e.ranges &&
				this.container.addClass("show-ranges"),
			this.singleDatePicker &&
				(this.container.addClass("single"),
				this.container.find(".drp-calendar.left").addClass("single"),
				this.container.find(".drp-calendar.left").show(),
				this.container.find(".drp-calendar.right").hide(),
				this.timePicker || this.container.addClass("auto-apply")),
			((void 0 === e.ranges && !this.singleDatePicker) ||
				this.alwaysShowCalendars) &&
				this.container.addClass("show-calendar"),
			this.container.addClass("opens" + this.opens),
			this.container
				.find(".applyBtn, .cancelBtn")
				.addClass(this.buttonClasses),
			this.applyButtonClasses.length &&
				this.container
					.find(".applyBtn")
					.addClass(this.applyButtonClasses),
			this.cancelButtonClasses.length &&
				this.container
					.find(".cancelBtn")
					.addClass(this.cancelButtonClasses),
			this.container.find(".applyBtn").html(this.locale.applyLabel),
			this.container.find(".cancelBtn").html(this.locale.cancelLabel),
			this.container
				.find(".drp-calendar")
				.on(
					"click.daterangepicker",
					".prev",
					R.proxy(this.clickPrev, this)
				)
				.on(
					"click.daterangepicker",
					".next",
					R.proxy(this.clickNext, this)
				)
				.on(
					"mousedown.daterangepicker",
					"td.available",
					R.proxy(this.clickDate, this)
				)
				.on(
					"mouseenter.daterangepicker",
					"td.available",
					R.proxy(this.hoverDate, this)
				)
				.on(
					"change.daterangepicker",
					"select.yearselect",
					R.proxy(this.monthOrYearChanged, this)
				)
				.on(
					"change.daterangepicker",
					"select.monthselect",
					R.proxy(this.monthOrYearChanged, this)
				)
				.on(
					"change.daterangepicker",
					"select.hourselect,select.minuteselect,select.secondselect,select.ampmselect",
					R.proxy(this.timeChanged, this)
				),
			this.container
				.find(".ranges")
				.on(
					"click.daterangepicker",
					"li",
					R.proxy(this.clickRange, this)
				),
			this.container
				.find(".drp-buttons")
				.on(
					"click.daterangepicker",
					"button.applyBtn",
					R.proxy(this.clickApply, this)
				)
				.on(
					"click.daterangepicker",
					"button.cancelBtn",
					R.proxy(this.clickCancel, this)
				),
			this.element.is("input") || this.element.is("button")
				? this.element.on({
						"click.daterangepicker": R.proxy(this.show, this),
						"focus.daterangepicker": R.proxy(this.show, this),
						"keyup.daterangepicker": R.proxy(
							this.elementChanged,
							this
						),
						"keydown.daterangepicker": R.proxy(this.keydown, this),
				  })
				: (this.element.on(
						"click.daterangepicker",
						R.proxy(this.toggle, this)
				  ),
				  this.element.on(
						"keydown.daterangepicker",
						R.proxy(this.toggle, this)
				  )),
			this.updateElement();
	};
	return (
		(i.prototype = {
			constructor: i,
			setStartDate: function (t) {
				"string" == typeof t &&
					(this.startDate = H(t, this.locale.format)),
					"object" == typeof t && (this.startDate = H(t)),
					this.timePicker ||
						(this.startDate = this.startDate.startOf("day")),
					this.timePicker &&
						this.timePickerIncrement &&
						this.startDate.minute(
							Math.round(
								this.startDate.minute() /
									this.timePickerIncrement
							) * this.timePickerIncrement
						),
					this.minDate &&
						this.startDate.isBefore(this.minDate) &&
						((this.startDate = this.minDate.clone()),
						this.timePicker &&
							this.timePickerIncrement &&
							this.startDate.minute(
								Math.round(
									this.startDate.minute() /
										this.timePickerIncrement
								) * this.timePickerIncrement
							)),
					this.maxDate &&
						this.startDate.isAfter(this.maxDate) &&
						((this.startDate = this.maxDate.clone()),
						this.timePicker &&
							this.timePickerIncrement &&
							this.startDate.minute(
								Math.floor(
									this.startDate.minute() /
										this.timePickerIncrement
								) * this.timePickerIncrement
							)),
					this.isShowing || this.updateElement(),
					this.updateMonthsInView();
			},
			setEndDate: function (t) {
				"string" == typeof t &&
					(this.endDate = H(t, this.locale.format)),
					"object" == typeof t && (this.endDate = H(t)),
					this.timePicker ||
						(this.endDate = this.endDate
							.add(1, "d")
							.startOf("day")
							.subtract(1, "second")),
					this.timePicker &&
						this.timePickerIncrement &&
						this.endDate.minute(
							Math.round(
								this.endDate.minute() / this.timePickerIncrement
							) * this.timePickerIncrement
						),
					this.endDate.isBefore(this.startDate) &&
						(this.endDate = this.startDate.clone()),
					this.maxDate &&
						this.endDate.isAfter(this.maxDate) &&
						(this.endDate = this.maxDate.clone()),
					this.maxSpan &&
						this.startDate
							.clone()
							.add(this.maxSpan)
							.isBefore(this.endDate) &&
						(this.endDate = this.startDate
							.clone()
							.add(this.maxSpan)),
					(this.previousRightTime = this.endDate.clone()),
					this.container
						.find(".drp-selected")
						.html(
							this.startDate.format(this.locale.format) +
								this.locale.separator +
								this.endDate.format(this.locale.format)
						),
					this.isShowing || this.updateElement(),
					this.updateMonthsInView();
			},
			isInvalidDate: function () {
				return !1;
			},
			isCustomDate: function () {
				return !1;
			},
			updateView: function () {
				this.timePicker &&
					(this.renderTimePicker("left"),
					this.renderTimePicker("right"),
					this.endDate
						? this.container
								.find(".right .calendar-time select")
								.removeAttr("disabled")
								.removeClass("disabled")
						: this.container
								.find(".right .calendar-time select")
								.attr("disabled", "disabled")
								.addClass("disabled")),
					this.endDate &&
						this.container
							.find(".drp-selected")
							.html(
								this.startDate.format(this.locale.format) +
									this.locale.separator +
									this.endDate.format(this.locale.format)
							),
					this.updateMonthsInView(),
					this.updateCalendars(),
					this.updateFormInputs();
			},
			updateMonthsInView: function () {
				if (this.endDate) {
					if (
						!this.singleDatePicker &&
						this.leftCalendar.month &&
						this.rightCalendar.month &&
						(this.startDate.format("YYYY-MM") ==
							this.leftCalendar.month.format("YYYY-MM") ||
							this.startDate.format("YYYY-MM") ==
								this.rightCalendar.month.format("YYYY-MM")) &&
						(this.endDate.format("YYYY-MM") ==
							this.leftCalendar.month.format("YYYY-MM") ||
							this.endDate.format("YYYY-MM") ==
								this.rightCalendar.month.format("YYYY-MM"))
					)
						return;
					(this.leftCalendar.month = this.startDate.clone().date(2)),
						this.linkedCalendars ||
						(this.endDate.month() == this.startDate.month() &&
							this.endDate.year() == this.startDate.year())
							? (this.rightCalendar.month = this.startDate
									.clone()
									.date(2)
									.add(1, "month"))
							: (this.rightCalendar.month = this.endDate
									.clone()
									.date(2));
				} else
					this.leftCalendar.month.format("YYYY-MM") !=
						this.startDate.format("YYYY-MM") &&
						this.rightCalendar.month.format("YYYY-MM") !=
							this.startDate.format("YYYY-MM") &&
						((this.leftCalendar.month = this.startDate
							.clone()
							.date(2)),
						(this.rightCalendar.month = this.startDate
							.clone()
							.date(2)
							.add(1, "month")));
				this.maxDate &&
					this.linkedCalendars &&
					!this.singleDatePicker &&
					this.rightCalendar.month > this.maxDate &&
					((this.rightCalendar.month = this.maxDate.clone().date(2)),
					(this.leftCalendar.month = this.maxDate
						.clone()
						.date(2)
						.subtract(1, "month")));
			},
			updateCalendars: function () {
				if (this.timePicker) {
					var t, e, a, i;
					if (this.endDate) {
						if (
							((t = parseInt(
								this.container.find(".left .hourselect").val(),
								10
							)),
							(e = parseInt(
								this.container
									.find(".left .minuteselect")
									.val(),
								10
							)),
							(a = this.timePickerSeconds
								? parseInt(
										this.container
											.find(".left .secondselect")
											.val(),
										10
								  )
								: 0),
							!this.timePicker24Hour)
						)
							"PM" ===
								(i = this.container
									.find(".left .ampmselect")
									.val()) &&
								t < 12 &&
								(t += 12),
								"AM" === i && 12 === t && (t = 0);
					} else if (
						((t = parseInt(
							this.container.find(".right .hourselect").val(),
							10
						)),
						(e = parseInt(
							this.container.find(".right .minuteselect").val(),
							10
						)),
						(a = this.timePickerSeconds
							? parseInt(
									this.container
										.find(".right .secondselect")
										.val(),
									10
							  )
							: 0),
						!this.timePicker24Hour)
					)
						"PM" ===
							(i = this.container
								.find(".right .ampmselect")
								.val()) &&
							t < 12 &&
							(t += 12),
							"AM" === i && 12 === t && (t = 0);
					this.leftCalendar.month.hour(t).minute(e).second(a),
						this.rightCalendar.month.hour(t).minute(e).second(a);
				}
				this.renderCalendar("left"),
					this.renderCalendar("right"),
					this.container.find(".ranges li").removeClass("active"),
					null != this.endDate && this.calculateChosenLabel();
			},
			renderCalendar: function (t) {
				var e,
					a = (e =
						"left" == t
							? this.leftCalendar
							: this.rightCalendar).month.month(),
					i = e.month.year(),
					s = e.month.hour(),
					n = e.month.minute(),
					r = e.month.second(),
					o = H([i, a]).daysInMonth(),
					h = H([i, a, 1]),
					l = H([i, a, o]),
					c = H(h).subtract(1, "month").month(),
					d = H(h).subtract(1, "month").year(),
					m = H([d, c]).daysInMonth(),
					f = h.day();
				((e = []).firstDay = h), (e.lastDay = l);
				for (var p = 0; p < 6; p++) e[p] = [];
				var u = m - f + this.locale.firstDay + 1;
				m < u && (u -= 7), f == this.locale.firstDay && (u = m - 6);
				for (
					var D = H([d, c, u, 12, n, r]), g = ((p = 0), 0), y = 0;
					p < 42;
					p++, g++, D = H(D).add(24, "hour")
				)
					0 < p && g % 7 == 0 && ((g = 0), y++),
						(e[y][g] = D.clone().hour(s).minute(n).second(r)),
						D.hour(12),
						this.minDate &&
							e[y][g].format("YYYY-MM-DD") ==
								this.minDate.format("YYYY-MM-DD") &&
							e[y][g].isBefore(this.minDate) &&
							"left" == t &&
							(e[y][g] = this.minDate.clone()),
						this.maxDate &&
							e[y][g].format("YYYY-MM-DD") ==
								this.maxDate.format("YYYY-MM-DD") &&
							e[y][g].isAfter(this.maxDate) &&
							"right" == t &&
							(e[y][g] = this.maxDate.clone());
				"left" == t
					? (this.leftCalendar.calendar = e)
					: (this.rightCalendar.calendar = e);
				var k = "left" == t ? this.minDate : this.startDate,
					b = this.maxDate,
					C =
						("left" == t ? this.startDate : this.endDate,
						this.locale.direction,
						'<table class="table-condensed">');
				(C += "<thead>"),
					(C += "<tr>"),
					(this.showWeekNumbers || this.showISOWeekNumbers) &&
						(C += "<th></th>"),
					(k && !k.isBefore(e.firstDay)) ||
					(this.linkedCalendars && "left" != t)
						? (C += "<th></th>")
						: (C +=
								'<th class="prev available"><span></span></th>');
				var v =
					this.locale.monthNames[e[1][1].month()] +
					e[1][1].format(" YYYY");
				if (this.showDropdowns) {
					for (
						var Y = e[1][1].month(),
							w = e[1][1].year(),
							P = (b && b.year()) || this.maxYear,
							x = (k && k.year()) || this.minYear,
							M = w == x,
							S = w == P,
							I = '<select class="monthselect">',
							B = 0;
						B < 12;
						B++
					)
						(!M || B >= k.month()) && (!S || B <= b.month())
							? (I +=
									"<option value='" +
									B +
									"'" +
									(B === Y ? " selected='selected'" : "") +
									">" +
									this.locale.monthNames[B] +
									"</option>")
							: (I +=
									"<option value='" +
									B +
									"'" +
									(B === Y ? " selected='selected'" : "") +
									" disabled='disabled'>" +
									this.locale.monthNames[B] +
									"</option>");
					I += "</select>";
					for (
						var A = '<select class="yearselect">', L = x;
						L <= P;
						L++
					)
						A +=
							'<option value="' +
							L +
							'"' +
							(L === w ? ' selected="selected"' : "") +
							">" +
							L +
							"</option>";
					v = I + (A += "</select>");
				}
				if (
					((C += '<th colspan="5" class="month">' + v + "</th>"),
					(b && !b.isAfter(e.lastDay)) ||
					(this.linkedCalendars &&
						"right" != t &&
						!this.singleDatePicker)
						? (C += "<th></th>")
						: (C +=
								'<th class="next available"><span></span></th>'),
					(C += "</tr>"),
					(C += "<tr>"),
					(this.showWeekNumbers || this.showISOWeekNumbers) &&
						(C +=
							'<th class="week">' +
							this.locale.weekLabel +
							"</th>"),
					R.each(this.locale.daysOfWeek, function (t, e) {
						C += "<th>" + e + "</th>";
					}),
					(C += "</tr>"),
					(C += "</thead>"),
					(C += "<tbody>"),
					null == this.endDate && this.maxSpan)
				) {
					var E = this.startDate
						.clone()
						.add(this.maxSpan)
						.endOf("day");
					(b && !E.isBefore(b)) || (b = E);
				}
				for (y = 0; y < 6; y++) {
					(C += "<tr>"),
						this.showWeekNumbers
							? (C +=
									'<td class="week">' +
									e[y][0].week() +
									"</td>")
							: this.showISOWeekNumbers &&
							  (C +=
									'<td class="week">' +
									e[y][0].isoWeek() +
									"</td>");
					for (g = 0; g < 7; g++) {
						var W = [];
						e[y][g].isSame(new Date(), "day") && W.push("today"),
							5 < e[y][g].isoWeekday() && W.push("weekend"),
							e[y][g].month() != e[1][1].month() && W.push("off"),
							this.minDate &&
								e[y][g].isBefore(this.minDate, "day") &&
								W.push("off", "disabled"),
							b &&
								e[y][g].isAfter(b, "day") &&
								W.push("off", "disabled"),
							this.isInvalidDate(e[y][g]) &&
								W.push("off", "disabled"),
							e[y][g].format("YYYY-MM-DD") ==
								this.startDate.format("YYYY-MM-DD") &&
								W.push("active", "start-date"),
							null != this.endDate &&
								e[y][g].format("YYYY-MM-DD") ==
									this.endDate.format("YYYY-MM-DD") &&
								W.push("active", "end-date"),
							null != this.endDate &&
								e[y][g] > this.startDate &&
								e[y][g] < this.endDate &&
								W.push("in-range");
						var O = this.isCustomDate(e[y][g]);
						!1 !== O &&
							("string" == typeof O
								? W.push(O)
								: Array.prototype.push.apply(W, O));
						var N = "",
							j = !1;
						for (p = 0; p < W.length; p++)
							(N += W[p] + " "), "disabled" == W[p] && (j = !0);
						j || (N += "available"),
							(C +=
								'<td class="' +
								N.replace(/^\s+|\s+$/g, "") +
								'" data-title="r' +
								y +
								"c" +
								g +
								'">' +
								e[y][g].date() +
								"</td>");
					}
					C += "</tr>";
				}
				(C += "</tbody>"),
					(C += "</table>"),
					this.container
						.find(".drp-calendar." + t + " .calendar-table")
						.html(C);
			},
			renderTimePicker: function (t) {
				if ("right" != t || this.endDate) {
					var e,
						a,
						i,
						s = this.maxDate;
					if (
						(!this.maxSpan ||
							(this.maxDate &&
								!this.startDate
									.clone()
									.add(this.maxSpan)
									.isAfter(this.maxDate)) ||
							(s = this.startDate.clone().add(this.maxSpan)),
						"left" == t)
					)
						(a = this.startDate.clone()), (i = this.minDate);
					else if ("right" == t) {
						(a = this.endDate.clone()), (i = this.startDate);
						var n = this.container.find(
							".drp-calendar.right .calendar-time"
						);
						if (
							"" != n.html() &&
							(a.hour(
								a.hour() ||
									n.find(".hourselect option:selected").val()
							),
							a.minute(
								a.minute() ||
									n
										.find(".minuteselect option:selected")
										.val()
							),
							a.second(
								a.second() ||
									n
										.find(".secondselect option:selected")
										.val()
							),
							!this.timePicker24Hour)
						) {
							var r = n.find(".ampmselect option:selected").val();
							"PM" === r &&
								a.hour() < 12 &&
								a.hour(a.hour() + 12),
								"AM" === r && 12 === a.hour() && a.hour(0);
						}
						a.isBefore(this.startDate) &&
							(a = this.startDate.clone()),
							s && a.isAfter(s) && (a = s.clone());
					}
					e = '<select class="hourselect">';
					for (
						var o = this.timePicker24Hour ? 0 : 1,
							h = this.timePicker24Hour ? 23 : 12,
							l = o;
						l <= h;
						l++
					) {
						var c = l;
						this.timePicker24Hour ||
							(c =
								12 <= a.hour()
									? 12 == l
										? 12
										: l + 12
									: 12 == l
									? 0
									: l);
						var d = a.clone().hour(c),
							m = !1;
						i && d.minute(59).isBefore(i) && (m = !0),
							s && d.minute(0).isAfter(s) && (m = !0),
							c != a.hour() || m
								? (e += m
										? '<option value="' +
										  l +
										  '" disabled="disabled" class="disabled">' +
										  l +
										  "</option>"
										: '<option value="' +
										  l +
										  '">' +
										  l +
										  "</option>")
								: (e +=
										'<option value="' +
										l +
										'" selected="selected">' +
										l +
										"</option>");
					}
					(e += "</select> "),
						(e += ': <select class="minuteselect">');
					for (l = 0; l < 60; l += this.timePickerIncrement) {
						var f = l < 10 ? "0" + l : l;
						(d = a.clone().minute(l)), (m = !1);
						i && d.second(59).isBefore(i) && (m = !0),
							s && d.second(0).isAfter(s) && (m = !0),
							a.minute() != l || m
								? (e += m
										? '<option value="' +
										  l +
										  '" disabled="disabled" class="disabled">' +
										  f +
										  "</option>"
										: '<option value="' +
										  l +
										  '">' +
										  f +
										  "</option>")
								: (e +=
										'<option value="' +
										l +
										'" selected="selected">' +
										f +
										"</option>");
					}
					if (((e += "</select> "), this.timePickerSeconds)) {
						e += ': <select class="secondselect">';
						for (l = 0; l < 60; l++) {
							(f = l < 10 ? "0" + l : l),
								(d = a.clone().second(l)),
								(m = !1);
							i && d.isBefore(i) && (m = !0),
								s && d.isAfter(s) && (m = !0),
								a.second() != l || m
									? (e += m
											? '<option value="' +
											  l +
											  '" disabled="disabled" class="disabled">' +
											  f +
											  "</option>"
											: '<option value="' +
											  l +
											  '">' +
											  f +
											  "</option>")
									: (e +=
											'<option value="' +
											l +
											'" selected="selected">' +
											f +
											"</option>");
						}
						e += "</select> ";
					}
					if (!this.timePicker24Hour) {
						e += '<select class="ampmselect">';
						var p = "",
							u = "";
						i &&
							a
								.clone()
								.hour(12)
								.minute(0)
								.second(0)
								.isBefore(i) &&
							(p = ' disabled="disabled" class="disabled"'),
							s &&
								a
									.clone()
									.hour(0)
									.minute(0)
									.second(0)
									.isAfter(s) &&
								(u = ' disabled="disabled" class="disabled"'),
							12 <= a.hour()
								? (e +=
										'<option value="AM"' +
										p +
										'>AM</option><option value="PM" selected="selected"' +
										u +
										">PM</option>")
								: (e +=
										'<option value="AM" selected="selected"' +
										p +
										'>AM</option><option value="PM"' +
										u +
										">PM</option>"),
							(e += "</select>");
					}
					this.container
						.find(".drp-calendar." + t + " .calendar-time")
						.html(e);
				}
			},
			updateFormInputs: function () {
				this.singleDatePicker ||
				(this.endDate &&
					(this.startDate.isBefore(this.endDate) ||
						this.startDate.isSame(this.endDate)))
					? this.container
							.find("button.applyBtn")
							.removeAttr("disabled")
					: this.container
							.find("button.applyBtn")
							.attr("disabled", "disabled");
			},
			move: function () {
				var t,
					e = { top: 0, left: 0 },
					a = R(window).width();
				this.parentEl.is("body") ||
					((e = {
						top:
							this.parentEl.offset().top -
							this.parentEl.scrollTop(),
						left:
							this.parentEl.offset().left -
							this.parentEl.scrollLeft(),
					}),
					(a =
						this.parentEl[0].clientWidth +
						this.parentEl.offset().left)),
					(t =
						"up" == this.drops
							? this.element.offset().top -
							  this.container.outerHeight() -
							  e.top
							: this.element.offset().top +
							  this.element.outerHeight() -
							  e.top),
					this.container[
						"up" == this.drops ? "addClass" : "removeClass"
					]("drop-up"),
					"left" == this.opens
						? (this.container.css({
								top: t,
								right:
									a -
									this.element.offset().left -
									this.element.outerWidth(),
								left: "auto",
						  }),
						  this.container.offset().left < 0 &&
								this.container.css({ right: "auto", left: 9 }))
						: "center" == this.opens
						? (this.container.css({
								top: t,
								left:
									this.element.offset().left -
									e.left +
									this.element.outerWidth() / 2 -
									this.container.outerWidth() / 2,
								right: "auto",
						  }),
						  this.container.offset().left < 0 &&
								this.container.css({ right: "auto", left: 9 }))
						: (this.container.css({
								top: t,
								left: this.element.offset().left - e.left,
								right: "auto",
						  }),
						  this.container.offset().left +
								this.container.outerWidth() >
								R(window).width() &&
								this.container.css({ left: "auto", right: 0 }));
			},
			show: function (t) {
				this.isShowing ||
					((this._outsideClickProxy = R.proxy(function (t) {
						this.outsideClick(t);
					}, this)),
					R(document)
						.on(
							"mousedown.daterangepicker",
							this._outsideClickProxy
						)
						.on("touchend.daterangepicker", this._outsideClickProxy)
						.on(
							"click.daterangepicker",
							"[data-toggle=dropdown]",
							this._outsideClickProxy
						)
						.on("focusin.daterangepicker", this._outsideClickProxy),
					R(window).on(
						"resize.daterangepicker",
						R.proxy(function (t) {
							this.move(t);
						}, this)
					),
					(this.oldStartDate = this.startDate.clone()),
					(this.oldEndDate = this.endDate.clone()),
					(this.previousRightTime = this.endDate.clone()),
					this.updateView(),
					this.container.show(),
					this.move(),
					this.element.trigger("show.daterangepicker", this),
					(this.isShowing = !0));
			},
			hide: function (t) {
				this.isShowing &&
					(this.endDate ||
						((this.startDate = this.oldStartDate.clone()),
						(this.endDate = this.oldEndDate.clone())),
					(this.startDate.isSame(this.oldStartDate) &&
						this.endDate.isSame(this.oldEndDate)) ||
						this.callback(
							this.startDate.clone(),
							this.endDate.clone(),
							this.chosenLabel
						),
					this.updateElement(),
					R(document).off(".daterangepicker"),
					R(window).off(".daterangepicker"),
					this.container.hide(),
					this.element.trigger("hide.daterangepicker", this),
					(this.isShowing = !1));
			},
			toggle: function (t) {
				this.isShowing ? this.hide() : this.show();
			},
			outsideClick: function (t) {
				var e = R(t.target);
				"focusin" == t.type ||
					e.closest(this.element).length ||
					e.closest(this.container).length ||
					e.closest(".calendar-table").length ||
					(this.hide(),
					this.element.trigger("outsideClick.daterangepicker", this));
			},
			showCalendars: function () {
				this.container.addClass("show-calendar"),
					this.move(),
					this.element.trigger("showCalendar.daterangepicker", this);
			},
			hideCalendars: function () {
				this.container.removeClass("show-calendar"),
					this.element.trigger("hideCalendar.daterangepicker", this);
			},
			clickRange: function (t) {
				var e = t.target.getAttribute("data-range-key");
				if ((this.chosenLabel = e) == this.locale.customRangeLabel)
					this.showCalendars();
				else {
					var a = this.ranges[e];
					(this.startDate = a[0]),
						(this.endDate = a[1]),
						this.timePicker ||
							(this.startDate.startOf("day"),
							this.endDate.endOf("day")),
						this.alwaysShowCalendars || this.hideCalendars(),
						this.clickApply();
				}
			},
			clickPrev: function (t) {
				R(t.target).parents(".drp-calendar").hasClass("left")
					? (this.leftCalendar.month.subtract(1, "month"),
					  this.linkedCalendars &&
							this.rightCalendar.month.subtract(1, "month"))
					: this.rightCalendar.month.subtract(1, "month"),
					this.updateCalendars();
			},
			clickNext: function (t) {
				R(t.target).parents(".drp-calendar").hasClass("left")
					? this.leftCalendar.month.add(1, "month")
					: (this.rightCalendar.month.add(1, "month"),
					  this.linkedCalendars &&
							this.leftCalendar.month.add(1, "month")),
					this.updateCalendars();
			},
			hoverDate: function (t) {
				if (R(t.target).hasClass("available")) {
					var e = R(t.target).attr("data-title"),
						a = e.substr(1, 1),
						i = e.substr(3, 1),
						r = R(t.target)
							.parents(".drp-calendar")
							.hasClass("left")
							? this.leftCalendar.calendar[a][i]
							: this.rightCalendar.calendar[a][i],
						o = this.leftCalendar,
						h = this.rightCalendar,
						l = this.startDate;
					this.endDate ||
						this.container
							.find(".drp-calendar tbody td")
							.each(function (t, e) {
								if (!R(e).hasClass("week")) {
									var a = R(e).attr("data-title"),
										i = a.substr(1, 1),
										s = a.substr(3, 1),
										n = R(e)
											.parents(".drp-calendar")
											.hasClass("left")
											? o.calendar[i][s]
											: h.calendar[i][s];
									(n.isAfter(l) && n.isBefore(r)) ||
									n.isSame(r, "day")
										? R(e).addClass("in-range")
										: R(e).removeClass("in-range");
								}
							});
				}
			},
			clickDate: function (t) {
				if (R(t.target).hasClass("available")) {
					var e = R(t.target).attr("data-title"),
						a = e.substr(1, 1),
						i = e.substr(3, 1),
						s = R(t.target)
							.parents(".drp-calendar")
							.hasClass("left")
							? this.leftCalendar.calendar[a][i]
							: this.rightCalendar.calendar[a][i];
					if (this.endDate || s.isBefore(this.startDate, "day")) {
						if (this.timePicker) {
							var n = parseInt(
								this.container.find(".left .hourselect").val(),
								10
							);
							if (!this.timePicker24Hour)
								"PM" ===
									(h = this.container
										.find(".left .ampmselect")
										.val()) &&
									n < 12 &&
									(n += 12),
									"AM" === h && 12 === n && (n = 0);
							var r = parseInt(
									this.container
										.find(".left .minuteselect")
										.val(),
									10
								),
								o = this.timePickerSeconds
									? parseInt(
											this.container
												.find(".left .secondselect")
												.val(),
											10
									  )
									: 0;
							s = s.clone().hour(n).minute(r).second(o);
						}
						(this.endDate = null), this.setStartDate(s.clone());
					} else if (!this.endDate && s.isBefore(this.startDate))
						this.setEndDate(this.startDate.clone());
					else {
						if (this.timePicker) {
							var h;
							n = parseInt(
								this.container.find(".right .hourselect").val(),
								10
							);
							if (!this.timePicker24Hour)
								"PM" ===
									(h = this.container
										.find(".right .ampmselect")
										.val()) &&
									n < 12 &&
									(n += 12),
									"AM" === h && 12 === n && (n = 0);
							(r = parseInt(
								this.container
									.find(".right .minuteselect")
									.val(),
								10
							)),
								(o = this.timePickerSeconds
									? parseInt(
											this.container
												.find(".right .secondselect")
												.val(),
											10
									  )
									: 0);
							s = s.clone().hour(n).minute(r).second(o);
						}
						this.setEndDate(s.clone()),
							this.autoApply &&
								(this.calculateChosenLabel(),
								this.clickApply());
					}
					this.singleDatePicker &&
						(this.setEndDate(this.startDate),
						this.timePicker || this.clickApply()),
						this.updateView(),
						t.stopPropagation();
				}
			},
			calculateChosenLabel: function () {
				var t = !0,
					e = 0;
				for (var a in this.ranges) {
					if (this.timePicker) {
						var i = this.timePickerSeconds
							? "YYYY-MM-DD hh:mm:ss"
							: "YYYY-MM-DD hh:mm";
						if (
							this.startDate.format(i) ==
								this.ranges[a][0].format(i) &&
							this.endDate.format(i) ==
								this.ranges[a][1].format(i)
						) {
							(t = !1),
								(this.chosenLabel = this.container
									.find(".ranges li:eq(" + e + ")")
									.addClass("active")
									.attr("data-range-key"));
							break;
						}
					} else if (
						this.startDate.format("YYYY-MM-DD") ==
							this.ranges[a][0].format("YYYY-MM-DD") &&
						this.endDate.format("YYYY-MM-DD") ==
							this.ranges[a][1].format("YYYY-MM-DD")
					) {
						(t = !1),
							(this.chosenLabel = this.container
								.find(".ranges li:eq(" + e + ")")
								.addClass("active")
								.attr("data-range-key"));
						break;
					}
					e++;
				}
				t &&
					(this.showCustomRangeLabel
						? (this.chosenLabel = this.container
								.find(".ranges li:last")
								.addClass("active")
								.attr("data-range-key"))
						: (this.chosenLabel = null),
					this.showCalendars());
			},
			clickApply: function (t) {
				this.hide(),
					this.element.trigger("apply.daterangepicker", this);
			},
			clickCancel: function (t) {
				(this.startDate = this.oldStartDate),
					(this.endDate = this.oldEndDate),
					this.hide(),
					this.element.trigger("cancel.daterangepicker", this);
			},
			monthOrYearChanged: function (t) {
				var e = R(t.target).closest(".drp-calendar").hasClass("left"),
					a = e ? "left" : "right",
					i = this.container.find(".drp-calendar." + a),
					s = parseInt(i.find(".monthselect").val(), 10),
					n = i.find(".yearselect").val();
				e ||
					((n < this.startDate.year() ||
						(n == this.startDate.year() &&
							s < this.startDate.month())) &&
						((s = this.startDate.month()),
						(n = this.startDate.year()))),
					this.minDate &&
						(n < this.minDate.year() ||
							(n == this.minDate.year() &&
								s < this.minDate.month())) &&
						((s = this.minDate.month()), (n = this.minDate.year())),
					this.maxDate &&
						(n > this.maxDate.year() ||
							(n == this.maxDate.year() &&
								s > this.maxDate.month())) &&
						((s = this.maxDate.month()), (n = this.maxDate.year())),
					e
						? (this.leftCalendar.month.month(s).year(n),
						  this.linkedCalendars &&
								(this.rightCalendar.month =
									this.leftCalendar.month
										.clone()
										.add(1, "month")))
						: (this.rightCalendar.month.month(s).year(n),
						  this.linkedCalendars &&
								(this.leftCalendar.month =
									this.rightCalendar.month
										.clone()
										.subtract(1, "month"))),
					this.updateCalendars();
			},
			timeChanged: function (t) {
				var e = R(t.target).closest(".drp-calendar"),
					a = e.hasClass("left"),
					i = parseInt(e.find(".hourselect").val(), 10),
					s = parseInt(e.find(".minuteselect").val(), 10),
					n = this.timePickerSeconds
						? parseInt(e.find(".secondselect").val(), 10)
						: 0;
				if (!this.timePicker24Hour) {
					var r = e.find(".ampmselect").val();
					"PM" === r && i < 12 && (i += 12),
						"AM" === r && 12 === i && (i = 0);
				}
				if (a) {
					var o = this.startDate.clone();
					o.hour(i),
						o.minute(s),
						o.second(n),
						this.setStartDate(o),
						this.singleDatePicker
							? (this.endDate = this.startDate.clone())
							: this.endDate &&
							  this.endDate.format("YYYY-MM-DD") ==
									o.format("YYYY-MM-DD") &&
							  this.endDate.isBefore(o) &&
							  this.setEndDate(o.clone());
				} else if (this.endDate) {
					var h = this.endDate.clone();
					h.hour(i), h.minute(s), h.second(n), this.setEndDate(h);
				}
				this.updateCalendars(),
					this.updateFormInputs(),
					this.renderTimePicker("left"),
					this.renderTimePicker("right");
			},
			elementChanged: function () {
				if (this.element.is("input") && this.element.val().length) {
					var t = this.element.val().split(this.locale.separator),
						e = null,
						a = null;
					2 === t.length &&
						((e = H(t[0], this.locale.format)),
						(a = H(t[1], this.locale.format))),
						(this.singleDatePicker || null === e || null === a) &&
							(a = e = H(this.element.val(), this.locale.format)),
						e.isValid() &&
							a.isValid() &&
							(this.setStartDate(e),
							this.setEndDate(a),
							this.updateView());
				}
			},
			keydown: function (t) {
				(9 !== t.keyCode && 13 !== t.keyCode) || this.hide(),
					27 === t.keyCode &&
						(t.preventDefault(), t.stopPropagation(), this.hide());
			},
			updateElement: function () {
				if (this.element.is("input") && this.autoUpdateInput) {
					var t = this.startDate.format(this.locale.format);
					this.singleDatePicker ||
						(t +=
							this.locale.separator +
							this.endDate.format(this.locale.format)),
						t !== this.element.val() &&
							this.element.val(t).trigger("change");
				}
			},
			remove: function () {
				this.container.remove(),
					this.element.off(".daterangepicker"),
					this.element.removeData();
			},
		}),
		(R.fn.daterangepicker = function (t, e) {
			var a = R.extend(!0, {}, R.fn.daterangepicker.defaultOptions, t);
			return (
				this.each(function () {
					var t = R(this);
					t.data("daterangepicker") &&
						t.data("daterangepicker").remove(),
						t.data("daterangepicker", new i(t, a, e));
				}),
				this
			);
		}),
		i
	);
});
// niceSelect
!(function (e) {
	e.fn.niceSelect = function (t) {
		if ("string" == typeof t)
			return (
				"update" == t
					? this.each(function () {
							var t = e(this),
								l = e(this).next(".nice-select"),
								c = l.hasClass("open");
							l.length &&
								(l.remove(),
								s(t),
								c && t.next().trigger("click"));
					  })
					: "destroy" == t
					? (this.each(function () {
							var t = e(this),
								s = e(this).next(".nice-select");
							s.length && (s.remove(), t.css("display", ""));
					  }),
					  0 == e(".nice-select").length &&
							e(document).off(".nice_select"))
					: console.log('Method "' + t + '" does not exist.'),
				this
			);
		function s(t) {
			t.after(
				e("<div></div>")
					.addClass("nice-select")
					.addClass(t.attr("class") || "")
					.addClass(t.attr("disabled") ? "disabled" : "")
					.addClass(t.attr("multiple") ? "has-multiple" : "")
					.attr("tabindex", t.attr("disabled") ? null : "0")
					.html(
						t.attr("multiple")
							? '<span class="multiple-options"></span><div class="nice-select-search-box"><input type="text" class="nice-select-search" placeholder="Search..."/></div><ul class="list"></ul>'
							: '<span class="current"></span><div class="nice-select-search-box"><input type="text" class="nice-select-search" placeholder="Search..."/></div><ul class="list"></ul>'
					)
			);
			var s = t.next(),
				l = t.find("option");
			if (t.attr("multiple")) {
				var c = "";
				(a = t.find("option:selected")).each(function () {
					($selected_option = e(this)),
						($selected_text =
							$selected_option.data("display") ||
							$selected_option.text()),
						(c +=
							'<span class="current">' +
							$selected_text +
							"</span>");
				}),
					($select_placeholder =
						t.data("placeholder") || t.attr("placeholder")),
					($select_placeholder =
						"" == $select_placeholder
							? "Select"
							: $select_placeholder),
					(c = "" == c ? $select_placeholder : c),
					s.find(".multiple-options").html(c);
			} else {
				var a = t.find("option:selected");
				s.find(".current").html(a.data("display") || a.text());
			}
			l.each(function (t) {
				var l = e(this),
					c = l.data("display");
				s.find("ul").append(
					e("<li></li>")
						.attr("data-value", l.val())
						.attr("data-display", c || null)
						.addClass(
							"option" +
								(l.is(":selected") ? " selected" : "") +
								(l.is(":disabled") ? " disabled" : "")
						)
						.html(l.text())
				);
			});
		}
		this.hide(),
			this.each(function () {
				var t = e(this);
				t.next().hasClass("nice-select") || s(t);
			}),
			e(document).off(".nice_select"),
			e(document).on("click.nice_select", ".nice-select", function (t) {
				var s = e(this);
				e(".nice-select").not(s).removeClass("open"),
					s.toggleClass("open"),
					s.hasClass("open")
						? (s.find(".option"),
						  s.find(".nice-select-search").val(""),
						  s.find(".nice-select-search").focus(),
						  s.find(".focus").removeClass("focus"),
						  s.find(".selected").addClass("focus"),
						  s.find("ul li").show())
						: s.focus();
			}),
			e(document).on("click", ".nice-select-search-box", function (e) {
				return e.stopPropagation(), !1;
			}),
			e(document).on("click.nice_select", function (t) {
				0 === e(t.target).closest(".nice-select").length &&
					e(".nice-select").removeClass("open").find(".option");
			}),
			e(document).on(
				"click.nice_select",
				".nice-select .option:not(.disabled)",
				function (t) {
					var s = e(this),
						l = s.closest(".nice-select");
					if (l.hasClass("has-multiple"))
						s.hasClass("selected")
							? s.removeClass("selected")
							: s.addClass("selected"),
							($selected_html = ""),
							($selected_values = []),
							l.find(".selected").each(function () {
								$selected_option = e(this);
								var t =
									$selected_option.data("display") ||
									$selected_option.text();
								($selected_html +=
									'<span class="current">' + t + "</span>"),
									$selected_values.push(
										$selected_option.data("value")
									);
							}),
							($select_placeholder =
								l.prev("select").data("placeholder") ||
								l.prev("select").attr("placeholder")),
							($select_placeholder =
								"" == $select_placeholder
									? "Select"
									: $select_placeholder),
							($selected_html =
								"" == $selected_html
									? $select_placeholder
									: $selected_html),
							l.find(".multiple-options").html($selected_html),
							l
								.prev("select")
								.val($selected_values)
								.trigger("change");
					else {
						l.find(".selected").removeClass("selected"),
							s.addClass("selected");
						var c = s.data("display") || s.text();
						l.find(".current").text(c),
							l
								.prev("select")
								.val(s.data("value"))
								.trigger("change");
					}
				}
			),
			e(document).on("keydown.nice_select", ".nice-select", function (t) {
				var s = e(this),
					l = e(s.find(".focus") || s.find(".list .option.selected"));
				if (32 == t.keyCode || 13 == t.keyCode)
					return (
						s.hasClass("open")
							? l.trigger("click")
							: s.trigger("click"),
						!1
					);
				if (40 == t.keyCode) {
					if (s.hasClass("open")) {
						var c = l.nextAll(".option:not(.disabled)").first();
						c.length > 0 &&
							(s.find(".focus").removeClass("focus"),
							c.addClass("focus"));
					} else s.trigger("click");
					return !1;
				}
				if (38 == t.keyCode) {
					if (s.hasClass("open")) {
						var a = l.prevAll(".option:not(.disabled)").first();
						a.length > 0 &&
							(s.find(".focus").removeClass("focus"),
							a.addClass("focus"));
					} else s.trigger("click");
					return !1;
				}
				if (27 == t.keyCode) s.hasClass("open") && s.trigger("click");
				else if (9 == t.keyCode && s.hasClass("open")) return !1;
			}),
			e(document).on(
				"keydown.nice-select-search",
				".nice-select",
				function () {
					var t = e(this),
						s = t.find(".nice-select-search").val(),
						l = t.find("ul li");
					if ("" == s) l.show();
					else if (t.hasClass("open")) {
						s = s.toLowerCase();
						var c = new RegExp(s);
						0 < l.length
							? l.each(function () {
									var t = e(this),
										s = t.text().toLowerCase();
									c.test(s) ? t.show() : t.hide();
							  })
							: l.show();
					}
				}
			);
		var l = document.createElement("a").style;
		return (
			(l.cssText = "pointer-events:auto"),
			"auto" !== l.pointerEvents &&
				e("html").addClass("no-csspointerevents"),
			this
		);
	};
})(jQuery);
// Ion.RangeSlider | version 2.2.0 | https://github.com/IonDen/ion.rangeSlider
(function (f) {
	"function" === typeof define && define.amd
		? define(["jquery"], function (n) {
				return f(n, document, window, navigator);
		  })
		: "object" === typeof exports
		? f(require("jquery"), document, window, navigator)
		: f(jQuery, document, window, navigator);
})(function (f, n, k, r, p) {
	var t = 0,
		m = (function () {
			var a = r.userAgent,
				b = /msie\s\d+/i;
			return 0 < a.search(b) &&
				((a = b.exec(a).toString()), (a = a.split(" ")[1]), 9 > a)
				? (f("html").addClass("lt-ie9"), !0)
				: !1;
		})();
	Function.prototype.bind ||
		(Function.prototype.bind = function (a) {
			var b = this,
				d = [].slice;
			if ("function" != typeof b) throw new TypeError();
			var c = d.call(arguments, 1),
				e = function () {
					if (this instanceof e) {
						var g = function () {};
						g.prototype = b.prototype;
						var g = new g(),
							l = b.apply(g, c.concat(d.call(arguments)));
						return Object(l) === l ? l : g;
					}
					return b.apply(a, c.concat(d.call(arguments)));
				};
			return e;
		});
	Array.prototype.indexOf ||
		(Array.prototype.indexOf = function (a, b) {
			if (null == this)
				throw new TypeError('"this" is null or not defined');
			var d = Object(this),
				c = d.length >>> 0;
			if (0 === c) return -1;
			var e = +b || 0;
			Infinity === Math.abs(e) && (e = 0);
			if (e >= c) return -1;
			for (e = Math.max(0 <= e ? e : c - Math.abs(e), 0); e < c; ) {
				if (e in d && d[e] === a) return e;
				e++;
			}
			return -1;
		});
	var q = function (a, b, d) {
		this.VERSION = "2.2.0";
		this.input = a;
		this.plugin_count = d;
		this.old_to =
			this.old_from =
			this.update_tm =
			this.calc_count =
			this.current_plugin =
				0;
		this.raf_id = this.old_min_interval = null;
		this.no_diapason = this.force_redraw = this.dragging = !1;
		this.has_tab_index = !0;
		this.is_update = this.is_key = !1;
		this.is_start = !0;
		this.is_click = this.is_resize = this.is_active = this.is_finish = !1;
		b = b || {};
		this.$cache = {
			win: f(k),
			body: f(n.body),
			input: f(a),
			cont: null,
			rs: null,
			min: null,
			max: null,
			from: null,
			to: null,
			single: null,
			bar: null,
			line: null,
			s_single: null,
			s_from: null,
			s_to: null,
			shad_single: null,
			shad_from: null,
			shad_to: null,
			edge: null,
			grid: null,
			grid_labels: [],
		};
		this.coords = {
			x_gap: 0,
			x_pointer: 0,
			w_rs: 0,
			w_rs_old: 0,
			w_handle: 0,
			p_gap: 0,
			p_gap_left: 0,
			p_gap_right: 0,
			p_step: 0,
			p_pointer: 0,
			p_handle: 0,
			p_single_fake: 0,
			p_single_real: 0,
			p_from_fake: 0,
			p_from_real: 0,
			p_to_fake: 0,
			p_to_real: 0,
			p_bar_x: 0,
			p_bar_w: 0,
			grid_gap: 0,
			big_num: 0,
			big: [],
			big_w: [],
			big_p: [],
			big_x: [],
		};
		this.labels = {
			w_min: 0,
			w_max: 0,
			w_from: 0,
			w_to: 0,
			w_single: 0,
			p_min: 0,
			p_max: 0,
			p_from_fake: 0,
			p_from_left: 0,
			p_to_fake: 0,
			p_to_left: 0,
			p_single_fake: 0,
			p_single_left: 0,
		};
		var c = this.$cache.input;
		a = c.prop("value");
		var e;
		d = {
			type: "single",
			min: 10,
			max: 100,
			from: null,
			to: null,
			step: 1,
			min_interval: 0,
			max_interval: 0,
			drag_interval: !1,
			values: [],
			p_values: [],
			from_fixed: !1,
			from_min: null,
			from_max: null,
			from_shadow: !1,
			to_fixed: !1,
			to_min: null,
			to_max: null,
			to_shadow: !1,
			prettify_enabled: !0,
			prettify_separator: " ",
			prettify: null,
			force_edges: !1,
			keyboard: !0,
			grid: !1,
			grid_margin: !0,
			grid_num: 4,
			grid_snap: !1,
			hide_min_max: !1,
			hide_from_to: !1,
			prefix: "",
			postfix: "",
			max_postfix: "",
			decorate_both: !0,
			values_separator: " \u2014 ",
			input_values_separator: ";",
			disable: !1,
			block: !1,
			extra_classes: "",
			scope: null,
			onStart: null,
			onChange: null,
			onFinish: null,
			onUpdate: null,
		};
		"INPUT" !== c[0].nodeName &&
			console &&
			console.warn &&
			console.warn("Base element should be <input>!", c[0]);
		c = {
			type: c.data("type"),
			min: c.data("min"),
			max: c.data("max"),
			from: c.data("from"),
			to: c.data("to"),
			step: c.data("step"),
			min_interval: c.data("minInterval"),
			max_interval: c.data("maxInterval"),
			drag_interval: c.data("dragInterval"),
			values: c.data("values"),
			from_fixed: c.data("fromFixed"),
			from_min: c.data("fromMin"),
			from_max: c.data("fromMax"),
			from_shadow: c.data("fromShadow"),
			to_fixed: c.data("toFixed"),
			to_min: c.data("toMin"),
			to_max: c.data("toMax"),
			to_shadow: c.data("toShadow"),
			prettify_enabled: c.data("prettifyEnabled"),
			prettify_separator: c.data("prettifySeparator"),
			force_edges: c.data("forceEdges"),
			keyboard: c.data("keyboard"),
			grid: c.data("grid"),
			grid_margin: c.data("gridMargin"),
			grid_num: c.data("gridNum"),
			grid_snap: c.data("gridSnap"),
			hide_min_max: c.data("hideMinMax"),
			hide_from_to: c.data("hideFromTo"),
			prefix: c.data("prefix"),
			postfix: c.data("postfix"),
			max_postfix: c.data("maxPostfix"),
			decorate_both: c.data("decorateBoth"),
			values_separator: c.data("valuesSeparator"),
			input_values_separator: c.data("inputValuesSeparator"),
			disable: c.data("disable"),
			block: c.data("block"),
			extra_classes: c.data("extraClasses"),
		};
		c.values = c.values && c.values.split(",");
		for (e in c)
			c.hasOwnProperty(e) && ((c[e] !== p && "" !== c[e]) || delete c[e]);
		a !== p &&
			"" !== a &&
			((a = a.split(
				c.input_values_separator || b.input_values_separator || ";"
			)),
			a[0] && a[0] == +a[0] && (a[0] = +a[0]),
			a[1] && a[1] == +a[1] && (a[1] = +a[1]),
			b && b.values && b.values.length
				? ((d.from = a[0] && b.values.indexOf(a[0])),
				  (d.to = a[1] && b.values.indexOf(a[1])))
				: ((d.from = a[0] && +a[0]), (d.to = a[1] && +a[1])));
		f.extend(d, b);
		f.extend(d, c);
		this.options = d;
		this.update_check = {};
		this.validate();
		this.result = {
			input: this.$cache.input,
			slider: null,
			min: this.options.min,
			max: this.options.max,
			from: this.options.from,
			from_percent: 0,
			from_value: null,
			to: this.options.to,
			to_percent: 0,
			to_value: null,
		};
		this.init();
	};
	q.prototype = {
		init: function (a) {
			this.no_diapason = !1;
			this.coords.p_step = this.convertToPercent(this.options.step, !0);
			this.target = "base";
			this.toggleInput();
			this.append();
			this.setMinMax();
			a
				? ((this.force_redraw = !0), this.calc(!0), this.callOnUpdate())
				: ((this.force_redraw = !0), this.calc(!0), this.callOnStart());
			this.updateScene();
		},
		append: function () {
			this.$cache.input.before(
				'<span class="irs js-irs-' +
					this.plugin_count +
					" " +
					this.options.extra_classes +
					'"></span>'
			);
			this.$cache.input.prop("readonly", !0);
			this.$cache.cont = this.$cache.input.prev();
			this.result.slider = this.$cache.cont;
			this.$cache.cont.html(
				'<span class="irs"><span class="irs-line" tabindex="0"><span class="irs-line-left"></span><span class="irs-line-mid"></span><span class="irs-line-right"></span></span><span class="irs-min">0</span><span class="irs-max">1</span><span class="irs-from">0</span><span class="irs-to">0</span><span class="irs-single">0</span></span><span class="irs-grid"></span><span class="irs-bar"></span>'
			);
			this.$cache.rs = this.$cache.cont.find(".irs");
			this.$cache.min = this.$cache.cont.find(".irs-min");
			this.$cache.max = this.$cache.cont.find(".irs-max");
			this.$cache.from = this.$cache.cont.find(".irs-from");
			this.$cache.to = this.$cache.cont.find(".irs-to");
			this.$cache.single = this.$cache.cont.find(".irs-single");
			this.$cache.bar = this.$cache.cont.find(".irs-bar");
			this.$cache.line = this.$cache.cont.find(".irs-line");
			this.$cache.grid = this.$cache.cont.find(".irs-grid");
			"single" === this.options.type
				? (this.$cache.cont.append(
						'<span class="irs-bar-edge"></span><span class="irs-shadow shadow-single"></span><span class="irs-slider single"></span>'
				  ),
				  (this.$cache.edge = this.$cache.cont.find(".irs-bar-edge")),
				  (this.$cache.s_single = this.$cache.cont.find(".single")),
				  (this.$cache.from[0].style.visibility = "hidden"),
				  (this.$cache.to[0].style.visibility = "hidden"),
				  (this.$cache.shad_single =
						this.$cache.cont.find(".shadow-single")))
				: (this.$cache.cont.append(
						'<span class="irs-shadow shadow-from"></span><span class="irs-shadow shadow-to"></span><span class="irs-slider from"></span><span class="irs-slider to"></span>'
				  ),
				  (this.$cache.s_from = this.$cache.cont.find(".from")),
				  (this.$cache.s_to = this.$cache.cont.find(".to")),
				  (this.$cache.shad_from =
						this.$cache.cont.find(".shadow-from")),
				  (this.$cache.shad_to = this.$cache.cont.find(".shadow-to")),
				  this.setTopHandler());
			this.options.hide_from_to &&
				((this.$cache.from[0].style.display = "none"),
				(this.$cache.to[0].style.display = "none"),
				(this.$cache.single[0].style.display = "none"));
			this.appendGrid();
			this.options.disable
				? (this.appendDisableMask(),
				  (this.$cache.input[0].disabled = !0))
				: ((this.$cache.input[0].disabled = !1),
				  this.removeDisableMask(),
				  this.bindEvents());
			this.options.disable ||
				(this.options.block
					? this.appendDisableMask()
					: this.removeDisableMask());
			this.options.drag_interval &&
				(this.$cache.bar[0].style.cursor = "ew-resize");
		},
		setTopHandler: function () {
			var a = this.options.max,
				b = this.options.to;
			this.options.from > this.options.min && b === a
				? this.$cache.s_from.addClass("type_last")
				: b < a && this.$cache.s_to.addClass("type_last");
		},
		changeLevel: function (a) {
			switch (a) {
				case "single":
					this.coords.p_gap = this.toFixed(
						this.coords.p_pointer - this.coords.p_single_fake
					);
					this.$cache.s_single.addClass("state_hover");
					break;
				case "from":
					this.coords.p_gap = this.toFixed(
						this.coords.p_pointer - this.coords.p_from_fake
					);
					this.$cache.s_from.addClass("state_hover");
					this.$cache.s_from.addClass("type_last");
					this.$cache.s_to.removeClass("type_last");
					break;
				case "to":
					this.coords.p_gap = this.toFixed(
						this.coords.p_pointer - this.coords.p_to_fake
					);
					this.$cache.s_to.addClass("state_hover");
					this.$cache.s_to.addClass("type_last");
					this.$cache.s_from.removeClass("type_last");
					break;
				case "both":
					(this.coords.p_gap_left = this.toFixed(
						this.coords.p_pointer - this.coords.p_from_fake
					)),
						(this.coords.p_gap_right = this.toFixed(
							this.coords.p_to_fake - this.coords.p_pointer
						)),
						this.$cache.s_to.removeClass("type_last"),
						this.$cache.s_from.removeClass("type_last");
			}
		},
		appendDisableMask: function () {
			this.$cache.cont.append('<span class="irs-disable-mask"></span>');
			this.$cache.cont.addClass("irs-disabled");
		},
		removeDisableMask: function () {
			this.$cache.cont.remove(".irs-disable-mask");
			this.$cache.cont.removeClass("irs-disabled");
		},
		remove: function () {
			this.$cache.cont.remove();
			this.$cache.cont = null;
			this.$cache.line.off("keydown.irs_" + this.plugin_count);
			this.$cache.body.off("touchmove.irs_" + this.plugin_count);
			this.$cache.body.off("mousemove.irs_" + this.plugin_count);
			this.$cache.win.off("touchend.irs_" + this.plugin_count);
			this.$cache.win.off("mouseup.irs_" + this.plugin_count);
			m &&
				(this.$cache.body.off("mouseup.irs_" + this.plugin_count),
				this.$cache.body.off("mouseleave.irs_" + this.plugin_count));
			this.$cache.grid_labels = [];
			this.coords.big = [];
			this.coords.big_w = [];
			this.coords.big_p = [];
			this.coords.big_x = [];
			cancelAnimationFrame(this.raf_id);
		},
		bindEvents: function () {
			if (!this.no_diapason) {
				this.$cache.body.on(
					"touchmove.irs_" + this.plugin_count,
					this.pointerMove.bind(this)
				);
				this.$cache.body.on(
					"mousemove.irs_" + this.plugin_count,
					this.pointerMove.bind(this)
				);
				this.$cache.win.on(
					"touchend.irs_" + this.plugin_count,
					this.pointerUp.bind(this)
				);
				this.$cache.win.on(
					"mouseup.irs_" + this.plugin_count,
					this.pointerUp.bind(this)
				);
				this.$cache.line.on(
					"touchstart.irs_" + this.plugin_count,
					this.pointerClick.bind(this, "click")
				);
				this.$cache.line.on(
					"mousedown.irs_" + this.plugin_count,
					this.pointerClick.bind(this, "click")
				);
				this.$cache.line.on(
					"focus.irs_" + this.plugin_count,
					this.pointerFocus.bind(this)
				);
				this.options.drag_interval && "double" === this.options.type
					? (this.$cache.bar.on(
							"touchstart.irs_" + this.plugin_count,
							this.pointerDown.bind(this, "both")
					  ),
					  this.$cache.bar.on(
							"mousedown.irs_" + this.plugin_count,
							this.pointerDown.bind(this, "both")
					  ))
					: (this.$cache.bar.on(
							"touchstart.irs_" + this.plugin_count,
							this.pointerClick.bind(this, "click")
					  ),
					  this.$cache.bar.on(
							"mousedown.irs_" + this.plugin_count,
							this.pointerClick.bind(this, "click")
					  ));
				"single" === this.options.type
					? (this.$cache.single.on(
							"touchstart.irs_" + this.plugin_count,
							this.pointerDown.bind(this, "single")
					  ),
					  this.$cache.s_single.on(
							"touchstart.irs_" + this.plugin_count,
							this.pointerDown.bind(this, "single")
					  ),
					  this.$cache.shad_single.on(
							"touchstart.irs_" + this.plugin_count,
							this.pointerClick.bind(this, "click")
					  ),
					  this.$cache.single.on(
							"mousedown.irs_" + this.plugin_count,
							this.pointerDown.bind(this, "single")
					  ),
					  this.$cache.s_single.on(
							"mousedown.irs_" + this.plugin_count,
							this.pointerDown.bind(this, "single")
					  ),
					  this.$cache.edge.on(
							"mousedown.irs_" + this.plugin_count,
							this.pointerClick.bind(this, "click")
					  ),
					  this.$cache.shad_single.on(
							"mousedown.irs_" + this.plugin_count,
							this.pointerClick.bind(this, "click")
					  ))
					: (this.$cache.single.on(
							"touchstart.irs_" + this.plugin_count,
							this.pointerDown.bind(this, null)
					  ),
					  this.$cache.single.on(
							"mousedown.irs_" + this.plugin_count,
							this.pointerDown.bind(this, null)
					  ),
					  this.$cache.from.on(
							"touchstart.irs_" + this.plugin_count,
							this.pointerDown.bind(this, "from")
					  ),
					  this.$cache.s_from.on(
							"touchstart.irs_" + this.plugin_count,
							this.pointerDown.bind(this, "from")
					  ),
					  this.$cache.to.on(
							"touchstart.irs_" + this.plugin_count,
							this.pointerDown.bind(this, "to")
					  ),
					  this.$cache.s_to.on(
							"touchstart.irs_" + this.plugin_count,
							this.pointerDown.bind(this, "to")
					  ),
					  this.$cache.shad_from.on(
							"touchstart.irs_" + this.plugin_count,
							this.pointerClick.bind(this, "click")
					  ),
					  this.$cache.shad_to.on(
							"touchstart.irs_" + this.plugin_count,
							this.pointerClick.bind(this, "click")
					  ),
					  this.$cache.from.on(
							"mousedown.irs_" + this.plugin_count,
							this.pointerDown.bind(this, "from")
					  ),
					  this.$cache.s_from.on(
							"mousedown.irs_" + this.plugin_count,
							this.pointerDown.bind(this, "from")
					  ),
					  this.$cache.to.on(
							"mousedown.irs_" + this.plugin_count,
							this.pointerDown.bind(this, "to")
					  ),
					  this.$cache.s_to.on(
							"mousedown.irs_" + this.plugin_count,
							this.pointerDown.bind(this, "to")
					  ),
					  this.$cache.shad_from.on(
							"mousedown.irs_" + this.plugin_count,
							this.pointerClick.bind(this, "click")
					  ),
					  this.$cache.shad_to.on(
							"mousedown.irs_" + this.plugin_count,
							this.pointerClick.bind(this, "click")
					  ));
				if (this.options.keyboard)
					this.$cache.line.on(
						"keydown.irs_" + this.plugin_count,
						this.key.bind(this, "keyboard")
					);
				m &&
					(this.$cache.body.on(
						"mouseup.irs_" + this.plugin_count,
						this.pointerUp.bind(this)
					),
					this.$cache.body.on(
						"mouseleave.irs_" + this.plugin_count,
						this.pointerUp.bind(this)
					));
			}
		},
		pointerFocus: function (a) {
			if (!this.target) {
				var b =
					"single" === this.options.type
						? this.$cache.single
						: this.$cache.from;
				a = b.offset().left;
				a += b.width() / 2 - 1;
				this.pointerClick("single", {
					preventDefault: function () {},
					pageX: a,
				});
			}
		},
		pointerMove: function (a) {
			this.dragging &&
				((this.coords.x_pointer =
					(a.pageX ||
						(a.originalEvent.touches &&
							a.originalEvent.touches[0].pageX)) -
					this.coords.x_gap),
				this.calc());
		},
		pointerUp: function (a) {
			this.current_plugin === this.plugin_count &&
				this.is_active &&
				((this.is_active = !1),
				this.$cache.cont
					.find(".state_hover")
					.removeClass("state_hover"),
				(this.force_redraw = !0),
				m && f("*").prop("unselectable", !1),
				this.updateScene(),
				this.restoreOriginalMinInterval(),
				(f.contains(this.$cache.cont[0], a.target) || this.dragging) &&
					this.callOnFinish(),
				(this.dragging = !1));
		},
		pointerDown: function (a, b) {
			b.preventDefault();
			var d =
				b.pageX ||
				(b.originalEvent.touches && b.originalEvent.touches[0].pageX);
			2 !== b.button &&
				("both" === a && this.setTempMinInterval(),
				a || (a = this.target || "from"),
				(this.current_plugin = this.plugin_count),
				(this.target = a),
				(this.dragging = this.is_active = !0),
				(this.coords.x_gap = this.$cache.rs.offset().left),
				(this.coords.x_pointer = d - this.coords.x_gap),
				this.calcPointerPercent(),
				this.changeLevel(a),
				m && f("*").prop("unselectable", !0),
				this.$cache.line.trigger("focus"),
				this.updateScene());
		},
		pointerClick: function (a, b) {
			b.preventDefault();
			var d =
				b.pageX ||
				(b.originalEvent.touches && b.originalEvent.touches[0].pageX);
			2 !== b.button &&
				((this.current_plugin = this.plugin_count),
				(this.target = a),
				(this.is_click = !0),
				(this.coords.x_gap = this.$cache.rs.offset().left),
				(this.coords.x_pointer = +(d - this.coords.x_gap).toFixed()),
				(this.force_redraw = !0),
				this.calc(),
				this.$cache.line.trigger("focus"));
		},
		key: function (a, b) {
			if (
				!(
					this.current_plugin !== this.plugin_count ||
					b.altKey ||
					b.ctrlKey ||
					b.shiftKey ||
					b.metaKey
				)
			) {
				switch (b.which) {
					case 83:
					case 65:
					case 40:
					case 37:
						b.preventDefault();
						this.moveByKey(!1);
						break;
					case 87:
					case 68:
					case 38:
					case 39:
						b.preventDefault(), this.moveByKey(!0);
				}
				return !0;
			}
		},
		moveByKey: function (a) {
			var b = this.coords.p_pointer,
				d = (this.options.max - this.options.min) / 100,
				d = this.options.step / d;
			this.coords.x_pointer = this.toFixed(
				(this.coords.w_rs / 100) * (a ? b + d : b - d)
			);
			this.is_key = !0;
			this.calc();
		},
		setMinMax: function () {
			if (this.options)
				if (this.options.hide_min_max)
					(this.$cache.min[0].style.display = "none"),
						(this.$cache.max[0].style.display = "none");
				else {
					if (this.options.values.length)
						this.$cache.min.html(
							this.decorate(
								this.options.p_values[this.options.min]
							)
						),
							this.$cache.max.html(
								this.decorate(
									this.options.p_values[this.options.max]
								)
							);
					else {
						var a = this._prettify(this.options.min),
							b = this._prettify(this.options.max);
						this.result.min_pretty = a;
						this.result.max_pretty = b;
						this.$cache.min.html(
							this.decorate(a, this.options.min)
						);
						this.$cache.max.html(
							this.decorate(b, this.options.max)
						);
					}
					this.labels.w_min = this.$cache.min.outerWidth(!1);
					this.labels.w_max = this.$cache.max.outerWidth(!1);
				}
		},
		setTempMinInterval: function () {
			var a = this.result.to - this.result.from;
			null === this.old_min_interval &&
				(this.old_min_interval = this.options.min_interval);
			this.options.min_interval = a;
		},
		restoreOriginalMinInterval: function () {
			null !== this.old_min_interval &&
				((this.options.min_interval = this.old_min_interval),
				(this.old_min_interval = null));
		},
		calc: function (a) {
			if (this.options) {
				this.calc_count++;
				if (10 === this.calc_count || a)
					(this.calc_count = 0),
						(this.coords.w_rs = this.$cache.rs.outerWidth(!1)),
						this.calcHandlePercent();
				if (this.coords.w_rs) {
					this.calcPointerPercent();
					a = this.getHandleX();
					"both" === this.target &&
						((this.coords.p_gap = 0), (a = this.getHandleX()));
					"click" === this.target &&
						((this.coords.p_gap = this.coords.p_handle / 2),
						(a = this.getHandleX()),
						(this.target = this.options.drag_interval
							? "both_one"
							: this.chooseHandle(a)));
					switch (this.target) {
						case "base":
							var b = (this.options.max - this.options.min) / 100;
							a = (this.result.from - this.options.min) / b;
							b = (this.result.to - this.options.min) / b;
							this.coords.p_single_real = this.toFixed(a);
							this.coords.p_from_real = this.toFixed(a);
							this.coords.p_to_real = this.toFixed(b);
							this.coords.p_single_real = this.checkDiapason(
								this.coords.p_single_real,
								this.options.from_min,
								this.options.from_max
							);
							this.coords.p_from_real = this.checkDiapason(
								this.coords.p_from_real,
								this.options.from_min,
								this.options.from_max
							);
							this.coords.p_to_real = this.checkDiapason(
								this.coords.p_to_real,
								this.options.to_min,
								this.options.to_max
							);
							this.coords.p_single_fake =
								this.convertToFakePercent(
									this.coords.p_single_real
								);
							this.coords.p_from_fake = this.convertToFakePercent(
								this.coords.p_from_real
							);
							this.coords.p_to_fake = this.convertToFakePercent(
								this.coords.p_to_real
							);
							this.target = null;
							break;
						case "single":
							if (this.options.from_fixed) break;
							this.coords.p_single_real =
								this.convertToRealPercent(a);
							this.coords.p_single_real = this.calcWithStep(
								this.coords.p_single_real
							);
							this.coords.p_single_real = this.checkDiapason(
								this.coords.p_single_real,
								this.options.from_min,
								this.options.from_max
							);
							this.coords.p_single_fake =
								this.convertToFakePercent(
									this.coords.p_single_real
								);
							break;
						case "from":
							if (this.options.from_fixed) break;
							this.coords.p_from_real =
								this.convertToRealPercent(a);
							this.coords.p_from_real = this.calcWithStep(
								this.coords.p_from_real
							);
							this.coords.p_from_real > this.coords.p_to_real &&
								(this.coords.p_from_real =
									this.coords.p_to_real);
							this.coords.p_from_real = this.checkDiapason(
								this.coords.p_from_real,
								this.options.from_min,
								this.options.from_max
							);
							this.coords.p_from_real = this.checkMinInterval(
								this.coords.p_from_real,
								this.coords.p_to_real,
								"from"
							);
							this.coords.p_from_real = this.checkMaxInterval(
								this.coords.p_from_real,
								this.coords.p_to_real,
								"from"
							);
							this.coords.p_from_fake = this.convertToFakePercent(
								this.coords.p_from_real
							);
							break;
						case "to":
							if (this.options.to_fixed) break;
							this.coords.p_to_real =
								this.convertToRealPercent(a);
							this.coords.p_to_real = this.calcWithStep(
								this.coords.p_to_real
							);
							this.coords.p_to_real < this.coords.p_from_real &&
								(this.coords.p_to_real =
									this.coords.p_from_real);
							this.coords.p_to_real = this.checkDiapason(
								this.coords.p_to_real,
								this.options.to_min,
								this.options.to_max
							);
							this.coords.p_to_real = this.checkMinInterval(
								this.coords.p_to_real,
								this.coords.p_from_real,
								"to"
							);
							this.coords.p_to_real = this.checkMaxInterval(
								this.coords.p_to_real,
								this.coords.p_from_real,
								"to"
							);
							this.coords.p_to_fake = this.convertToFakePercent(
								this.coords.p_to_real
							);
							break;
						case "both":
							if (
								this.options.from_fixed ||
								this.options.to_fixed
							)
								break;
							a = this.toFixed(a + 0.001 * this.coords.p_handle);
							this.coords.p_from_real =
								this.convertToRealPercent(a) -
								this.coords.p_gap_left;
							this.coords.p_from_real = this.calcWithStep(
								this.coords.p_from_real
							);
							this.coords.p_from_real = this.checkDiapason(
								this.coords.p_from_real,
								this.options.from_min,
								this.options.from_max
							);
							this.coords.p_from_real = this.checkMinInterval(
								this.coords.p_from_real,
								this.coords.p_to_real,
								"from"
							);
							this.coords.p_from_fake = this.convertToFakePercent(
								this.coords.p_from_real
							);
							this.coords.p_to_real =
								this.convertToRealPercent(a) +
								this.coords.p_gap_right;
							this.coords.p_to_real = this.calcWithStep(
								this.coords.p_to_real
							);
							this.coords.p_to_real = this.checkDiapason(
								this.coords.p_to_real,
								this.options.to_min,
								this.options.to_max
							);
							this.coords.p_to_real = this.checkMinInterval(
								this.coords.p_to_real,
								this.coords.p_from_real,
								"to"
							);
							this.coords.p_to_fake = this.convertToFakePercent(
								this.coords.p_to_real
							);
							break;
						case "both_one":
							if (
								!this.options.from_fixed &&
								!this.options.to_fixed
							) {
								var d = this.convertToRealPercent(a);
								a =
									this.result.to_percent -
									this.result.from_percent;
								var c = a / 2,
									b = d - c,
									d = d + c;
								0 > b && ((b = 0), (d = b + a));
								100 < d && ((d = 100), (b = d - a));
								this.coords.p_from_real = this.calcWithStep(b);
								this.coords.p_from_real = this.checkDiapason(
									this.coords.p_from_real,
									this.options.from_min,
									this.options.from_max
								);
								this.coords.p_from_fake =
									this.convertToFakePercent(
										this.coords.p_from_real
									);
								this.coords.p_to_real = this.calcWithStep(d);
								this.coords.p_to_real = this.checkDiapason(
									this.coords.p_to_real,
									this.options.to_min,
									this.options.to_max
								);
								this.coords.p_to_fake =
									this.convertToFakePercent(
										this.coords.p_to_real
									);
							}
					}
					"single" === this.options.type
						? ((this.coords.p_bar_x = this.coords.p_handle / 2),
						  (this.coords.p_bar_w = this.coords.p_single_fake),
						  (this.result.from_percent =
								this.coords.p_single_real),
						  (this.result.from = this.convertToValue(
								this.coords.p_single_real
						  )),
						  (this.result.from_pretty = this._prettify(
								this.result.from
						  )),
						  this.options.values.length &&
								(this.result.from_value =
									this.options.values[this.result.from]))
						: ((this.coords.p_bar_x = this.toFixed(
								this.coords.p_from_fake +
									this.coords.p_handle / 2
						  )),
						  (this.coords.p_bar_w = this.toFixed(
								this.coords.p_to_fake - this.coords.p_from_fake
						  )),
						  (this.result.from_percent = this.coords.p_from_real),
						  (this.result.from = this.convertToValue(
								this.coords.p_from_real
						  )),
						  (this.result.from_pretty = this._prettify(
								this.result.from
						  )),
						  (this.result.to_percent = this.coords.p_to_real),
						  (this.result.to = this.convertToValue(
								this.coords.p_to_real
						  )),
						  (this.result.to_pretty = this._prettify(
								this.result.to
						  )),
						  this.options.values.length &&
								((this.result.from_value =
									this.options.values[this.result.from]),
								(this.result.to_value =
									this.options.values[this.result.to])));
					this.calcMinMax();
					this.calcLabels();
				}
			}
		},
		calcPointerPercent: function () {
			this.coords.w_rs
				? (0 > this.coords.x_pointer || isNaN(this.coords.x_pointer)
						? (this.coords.x_pointer = 0)
						: this.coords.x_pointer > this.coords.w_rs &&
						  (this.coords.x_pointer = this.coords.w_rs),
				  (this.coords.p_pointer = this.toFixed(
						(this.coords.x_pointer / this.coords.w_rs) * 100
				  )))
				: (this.coords.p_pointer = 0);
		},
		convertToRealPercent: function (a) {
			return (a / (100 - this.coords.p_handle)) * 100;
		},
		convertToFakePercent: function (a) {
			return (a / 100) * (100 - this.coords.p_handle);
		},
		getHandleX: function () {
			var a = 100 - this.coords.p_handle,
				b = this.toFixed(this.coords.p_pointer - this.coords.p_gap);
			0 > b ? (b = 0) : b > a && (b = a);
			return b;
		},
		calcHandlePercent: function () {
			this.coords.w_handle =
				"single" === this.options.type
					? this.$cache.s_single.outerWidth(!1)
					: this.$cache.s_from.outerWidth(!1);
			this.coords.p_handle = this.toFixed(
				(this.coords.w_handle / this.coords.w_rs) * 100
			);
		},
		chooseHandle: function (a) {
			return "single" === this.options.type
				? "single"
				: a >=
				  this.coords.p_from_real +
						(this.coords.p_to_real - this.coords.p_from_real) / 2
				? this.options.to_fixed
					? "from"
					: "to"
				: this.options.from_fixed
				? "to"
				: "from";
		},
		calcMinMax: function () {
			this.coords.w_rs &&
				((this.labels.p_min =
					(this.labels.w_min / this.coords.w_rs) * 100),
				(this.labels.p_max =
					(this.labels.w_max / this.coords.w_rs) * 100));
		},
		calcLabels: function () {
			this.coords.w_rs &&
				!this.options.hide_from_to &&
				("single" === this.options.type
					? ((this.labels.w_single = this.$cache.single.outerWidth(
							!1
					  )),
					  (this.labels.p_single_fake =
							(this.labels.w_single / this.coords.w_rs) * 100),
					  (this.labels.p_single_left =
							this.coords.p_single_fake +
							this.coords.p_handle / 2 -
							this.labels.p_single_fake / 2))
					: ((this.labels.w_from = this.$cache.from.outerWidth(!1)),
					  (this.labels.p_from_fake =
							(this.labels.w_from / this.coords.w_rs) * 100),
					  (this.labels.p_from_left =
							this.coords.p_from_fake +
							this.coords.p_handle / 2 -
							this.labels.p_from_fake / 2),
					  (this.labels.p_from_left = this.toFixed(
							this.labels.p_from_left
					  )),
					  (this.labels.p_from_left = this.checkEdges(
							this.labels.p_from_left,
							this.labels.p_from_fake
					  )),
					  (this.labels.w_to = this.$cache.to.outerWidth(!1)),
					  (this.labels.p_to_fake =
							(this.labels.w_to / this.coords.w_rs) * 100),
					  (this.labels.p_to_left =
							this.coords.p_to_fake +
							this.coords.p_handle / 2 -
							this.labels.p_to_fake / 2),
					  (this.labels.p_to_left = this.toFixed(
							this.labels.p_to_left
					  )),
					  (this.labels.p_to_left = this.checkEdges(
							this.labels.p_to_left,
							this.labels.p_to_fake
					  )),
					  (this.labels.w_single = this.$cache.single.outerWidth(
							!1
					  )),
					  (this.labels.p_single_fake =
							(this.labels.w_single / this.coords.w_rs) * 100),
					  (this.labels.p_single_left =
							(this.labels.p_from_left +
								this.labels.p_to_left +
								this.labels.p_to_fake) /
								2 -
							this.labels.p_single_fake / 2),
					  (this.labels.p_single_left = this.toFixed(
							this.labels.p_single_left
					  ))),
				(this.labels.p_single_left = this.checkEdges(
					this.labels.p_single_left,
					this.labels.p_single_fake
				)));
		},
		updateScene: function () {
			this.raf_id &&
				(cancelAnimationFrame(this.raf_id), (this.raf_id = null));
			clearTimeout(this.update_tm);
			this.update_tm = null;
			this.options &&
				(this.drawHandles(),
				this.is_active
					? (this.raf_id = requestAnimationFrame(
							this.updateScene.bind(this)
					  ))
					: (this.update_tm = setTimeout(
							this.updateScene.bind(this),
							300
					  )));
		},
		drawHandles: function () {
			this.coords.w_rs = this.$cache.rs.outerWidth(!1);
			if (this.coords.w_rs) {
				this.coords.w_rs !== this.coords.w_rs_old &&
					((this.target = "base"), (this.is_resize = !0));
				if (
					this.coords.w_rs !== this.coords.w_rs_old ||
					this.force_redraw
				)
					this.setMinMax(),
						this.calc(!0),
						this.drawLabels(),
						this.options.grid &&
							(this.calcGridMargin(), this.calcGridLabels()),
						(this.force_redraw = !0),
						(this.coords.w_rs_old = this.coords.w_rs),
						this.drawShadow();
				if (
					this.coords.w_rs &&
					(this.dragging || this.force_redraw || this.is_key)
				) {
					if (
						this.old_from !== this.result.from ||
						this.old_to !== this.result.to ||
						this.force_redraw ||
						this.is_key
					) {
						this.drawLabels();
						this.$cache.bar[0].style.left =
							this.coords.p_bar_x + "%";
						this.$cache.bar[0].style.width =
							this.coords.p_bar_w + "%";
						if ("single" === this.options.type)
							this.$cache.s_single[0].style.left =
								this.coords.p_single_fake + "%";
						else {
							this.$cache.s_from[0].style.left =
								this.coords.p_from_fake + "%";
							this.$cache.s_to[0].style.left =
								this.coords.p_to_fake + "%";
							if (
								this.old_from !== this.result.from ||
								this.force_redraw
							)
								this.$cache.from[0].style.left =
									this.labels.p_from_left + "%";
							if (
								this.old_to !== this.result.to ||
								this.force_redraw
							)
								this.$cache.to[0].style.left =
									this.labels.p_to_left + "%";
						}
						this.$cache.single[0].style.left =
							this.labels.p_single_left + "%";
						this.writeToInput();
						(this.old_from === this.result.from &&
							this.old_to === this.result.to) ||
							this.is_start ||
							(this.$cache.input.trigger("change"),
							this.$cache.input.trigger("input"));
						this.old_from = this.result.from;
						this.old_to = this.result.to;
						this.is_resize ||
							this.is_update ||
							this.is_start ||
							this.is_finish ||
							this.callOnChange();
						if (this.is_key || this.is_click)
							(this.is_click = this.is_key = !1),
								this.callOnFinish();
						this.is_finish = this.is_resize = this.is_update = !1;
					}
					this.force_redraw =
						this.is_click =
						this.is_key =
						this.is_start =
							!1;
				}
			}
		},
		drawLabels: function () {
			if (this.options) {
				var a = this.options.values.length,
					b = this.options.p_values;
				if (!this.options.hide_from_to)
					if ("single" === this.options.type) {
						if (a) a = this.decorate(b[this.result.from]);
						else {
							var d = this._prettify(this.result.from);
							a = this.decorate(d, this.result.from);
						}
						this.$cache.single.html(a);
						this.calcLabels();
						this.$cache.min[0].style.visibility =
							this.labels.p_single_left < this.labels.p_min + 1
								? "hidden"
								: "visible";
						this.$cache.max[0].style.visibility =
							this.labels.p_single_left +
								this.labels.p_single_fake >
							100 - this.labels.p_max - 1
								? "hidden"
								: "visible";
					} else {
						a
							? (this.options.decorate_both
									? ((a = this.decorate(b[this.result.from])),
									  (a += this.options.values_separator),
									  (a += this.decorate(b[this.result.to])))
									: (a = this.decorate(
											b[this.result.from] +
												this.options.values_separator +
												b[this.result.to]
									  )),
							  (d = this.decorate(b[this.result.from])),
							  (b = this.decorate(b[this.result.to])))
							: ((d = this._prettify(this.result.from)),
							  (b = this._prettify(this.result.to)),
							  this.options.decorate_both
									? ((a = this.decorate(d, this.result.from)),
									  (a += this.options.values_separator),
									  (a += this.decorate(b, this.result.to)))
									: (a = this.decorate(
											d +
												this.options.values_separator +
												b,
											this.result.to
									  )),
							  (d = this.decorate(d, this.result.from)),
							  (b = this.decorate(b, this.result.to)));
						this.$cache.single.html(a);
						this.$cache.from.html(d);
						this.$cache.to.html(b);
						this.calcLabels();
						a = Math.min(
							this.labels.p_single_left,
							this.labels.p_from_left
						);
						d =
							this.labels.p_single_left +
							this.labels.p_single_fake;
						var b = this.labels.p_to_left + this.labels.p_to_fake,
							c = Math.max(d, b);
						this.labels.p_from_left + this.labels.p_from_fake >=
						this.labels.p_to_left
							? ((this.$cache.from[0].style.visibility =
									"hidden"),
							  (this.$cache.to[0].style.visibility = "hidden"),
							  (this.$cache.single[0].style.visibility =
									"visible"),
							  this.result.from === this.result.to
									? ("from" === this.target
											? (this.$cache.from[0].style.visibility =
													"visible")
											: "to" === this.target
											? (this.$cache.to[0].style.visibility =
													"visible")
											: this.target ||
											  (this.$cache.from[0].style.visibility =
													"visible"),
									  (this.$cache.single[0].style.visibility =
											"hidden"),
									  (c = b))
									: ((this.$cache.from[0].style.visibility =
											"hidden"),
									  (this.$cache.to[0].style.visibility =
											"hidden"),
									  (this.$cache.single[0].style.visibility =
											"visible"),
									  (c = Math.max(d, b))))
							: ((this.$cache.from[0].style.visibility =
									"visible"),
							  (this.$cache.to[0].style.visibility = "visible"),
							  (this.$cache.single[0].style.visibility =
									"hidden"));
						this.$cache.min[0].style.visibility =
							a < this.labels.p_min + 1 ? "hidden" : "visible";
						this.$cache.max[0].style.visibility =
							c > 100 - this.labels.p_max - 1
								? "hidden"
								: "visible";
					}
			}
		},
		drawShadow: function () {
			var a = this.options,
				b = this.$cache,
				d = "number" === typeof a.from_min && !isNaN(a.from_min),
				c = "number" === typeof a.from_max && !isNaN(a.from_max),
				e = "number" === typeof a.to_min && !isNaN(a.to_min),
				g = "number" === typeof a.to_max && !isNaN(a.to_max);
			"single" === a.type
				? a.from_shadow && (d || c)
					? ((d = this.convertToPercent(d ? a.from_min : a.min)),
					  (c = this.convertToPercent(c ? a.from_max : a.max) - d),
					  (d = this.toFixed(d - (this.coords.p_handle / 100) * d)),
					  (c = this.toFixed(c - (this.coords.p_handle / 100) * c)),
					  (d += this.coords.p_handle / 2),
					  (b.shad_single[0].style.display = "block"),
					  (b.shad_single[0].style.left = d + "%"),
					  (b.shad_single[0].style.width = c + "%"))
					: (b.shad_single[0].style.display = "none")
				: (a.from_shadow && (d || c)
						? ((d = this.convertToPercent(d ? a.from_min : a.min)),
						  (c =
								this.convertToPercent(c ? a.from_max : a.max) -
								d),
						  (d = this.toFixed(
								d - (this.coords.p_handle / 100) * d
						  )),
						  (c = this.toFixed(
								c - (this.coords.p_handle / 100) * c
						  )),
						  (d += this.coords.p_handle / 2),
						  (b.shad_from[0].style.display = "block"),
						  (b.shad_from[0].style.left = d + "%"),
						  (b.shad_from[0].style.width = c + "%"))
						: (b.shad_from[0].style.display = "none"),
				  a.to_shadow && (e || g)
						? ((e = this.convertToPercent(e ? a.to_min : a.min)),
						  (a = this.convertToPercent(g ? a.to_max : a.max) - e),
						  (e = this.toFixed(
								e - (this.coords.p_handle / 100) * e
						  )),
						  (a = this.toFixed(
								a - (this.coords.p_handle / 100) * a
						  )),
						  (e += this.coords.p_handle / 2),
						  (b.shad_to[0].style.display = "block"),
						  (b.shad_to[0].style.left = e + "%"),
						  (b.shad_to[0].style.width = a + "%"))
						: (b.shad_to[0].style.display = "none"));
		},
		writeToInput: function () {
			"single" === this.options.type
				? (this.options.values.length
						? this.$cache.input.prop(
								"value",
								this.result.from_value
						  )
						: this.$cache.input.prop("value", this.result.from),
				  this.$cache.input.data("from", this.result.from))
				: (this.options.values.length
						? this.$cache.input.prop(
								"value",
								this.result.from_value +
									this.options.input_values_separator +
									this.result.to_value
						  )
						: this.$cache.input.prop(
								"value",
								this.result.from +
									this.options.input_values_separator +
									this.result.to
						  ),
				  this.$cache.input.data("from", this.result.from),
				  this.$cache.input.data("to", this.result.to));
		},
		callOnStart: function () {
			this.writeToInput();
			if (
				this.options.onStart &&
				"function" === typeof this.options.onStart
			)
				if (this.options.scope)
					this.options.onStart.call(this.options.scope, this.result);
				else this.options.onStart(this.result);
		},
		callOnChange: function () {
			this.writeToInput();
			if (
				this.options.onChange &&
				"function" === typeof this.options.onChange
			)
				if (this.options.scope)
					this.options.onChange.call(this.options.scope, this.result);
				else this.options.onChange(this.result);
		},
		callOnFinish: function () {
			this.writeToInput();
			if (
				this.options.onFinish &&
				"function" === typeof this.options.onFinish
			)
				if (this.options.scope)
					this.options.onFinish.call(this.options.scope, this.result);
				else this.options.onFinish(this.result);
		},
		callOnUpdate: function () {
			this.writeToInput();
			if (
				this.options.onUpdate &&
				"function" === typeof this.options.onUpdate
			)
				if (this.options.scope)
					this.options.onUpdate.call(this.options.scope, this.result);
				else this.options.onUpdate(this.result);
		},
		toggleInput: function () {
			this.$cache.input.toggleClass("irs-hidden-input");
			this.has_tab_index
				? this.$cache.input.prop("tabindex", -1)
				: this.$cache.input.removeProp("tabindex");
			this.has_tab_index = !this.has_tab_index;
		},
		convertToPercent: function (a, b) {
			var d = this.options.max - this.options.min;
			return d
				? this.toFixed((b ? a : a - this.options.min) / (d / 100))
				: ((this.no_diapason = !0), 0);
		},
		convertToValue: function (a) {
			var b = this.options.min,
				d = this.options.max,
				c = b.toString().split(".")[1],
				e = d.toString().split(".")[1],
				g,
				l,
				f = 0,
				h = 0;
			if (0 === a) return this.options.min;
			if (100 === a) return this.options.max;
			c && (f = g = c.length);
			e && (f = l = e.length);
			g && l && (f = g >= l ? g : l);
			0 > b &&
				((h = Math.abs(b)),
				(b = +(b + h).toFixed(f)),
				(d = +(d + h).toFixed(f)));
			a = ((d - b) / 100) * a + b;
			(b = this.options.step.toString().split(".")[1])
				? (a = +a.toFixed(b.length))
				: ((a /= this.options.step),
				  (a *= this.options.step),
				  (a = +a.toFixed(0)));
			h && (a -= h);
			h = b ? +a.toFixed(b.length) : this.toFixed(a);
			h < this.options.min
				? (h = this.options.min)
				: h > this.options.max && (h = this.options.max);
			return h;
		},
		calcWithStep: function (a) {
			var b = Math.round(a / this.coords.p_step) * this.coords.p_step;
			100 < b && (b = 100);
			100 === a && (b = 100);
			return this.toFixed(b);
		},
		checkMinInterval: function (a, b, d) {
			var c = this.options;
			if (!c.min_interval) return a;
			a = this.convertToValue(a);
			b = this.convertToValue(b);
			"from" === d
				? b - a < c.min_interval && (a = b - c.min_interval)
				: a - b < c.min_interval && (a = b + c.min_interval);
			return this.convertToPercent(a);
		},
		checkMaxInterval: function (a, b, d) {
			var c = this.options;
			if (!c.max_interval) return a;
			a = this.convertToValue(a);
			b = this.convertToValue(b);
			"from" === d
				? b - a > c.max_interval && (a = b - c.max_interval)
				: a - b > c.max_interval && (a = b + c.max_interval);
			return this.convertToPercent(a);
		},
		checkDiapason: function (a, b, d) {
			a = this.convertToValue(a);
			var c = this.options;
			"number" !== typeof b && (b = c.min);
			"number" !== typeof d && (d = c.max);
			a < b && (a = b);
			a > d && (a = d);
			return this.convertToPercent(a);
		},
		toFixed: function (a) {
			a = a.toFixed(20);
			return +a;
		},
		_prettify: function (a) {
			return this.options.prettify_enabled
				? this.options.prettify &&
				  "function" === typeof this.options.prettify
					? this.options.prettify(a)
					: this.prettify(a)
				: a;
		},
		prettify: function (a) {
			return a
				.toString()
				.replace(
					/(\d{1,3}(?=(?:\d\d\d)+(?!\d)))/g,
					"$1" + this.options.prettify_separator
				);
		},
		checkEdges: function (a, b) {
			if (!this.options.force_edges) return this.toFixed(a);
			0 > a ? (a = 0) : a > 100 - b && (a = 100 - b);
			return this.toFixed(a);
		},
		validate: function () {
			var a = this.options,
				b = this.result,
				d = a.values,
				c = d.length,
				e;
			"string" === typeof a.min && (a.min = +a.min);
			"string" === typeof a.max && (a.max = +a.max);
			"string" === typeof a.from && (a.from = +a.from);
			"string" === typeof a.to && (a.to = +a.to);
			"string" === typeof a.step && (a.step = +a.step);
			"string" === typeof a.from_min && (a.from_min = +a.from_min);
			"string" === typeof a.from_max && (a.from_max = +a.from_max);
			"string" === typeof a.to_min && (a.to_min = +a.to_min);
			"string" === typeof a.to_max && (a.to_max = +a.to_max);
			"string" === typeof a.grid_num && (a.grid_num = +a.grid_num);
			a.max < a.min && (a.max = a.min);
			if (c)
				for (
					a.p_values = [],
						a.min = 0,
						a.max = c - 1,
						a.step = 1,
						a.grid_num = a.max,
						a.grid_snap = !0,
						e = 0;
					e < c;
					e++
				) {
					var g = +d[e];
					isNaN(g)
						? (g = d[e])
						: ((d[e] = g), (g = this._prettify(g)));
					a.p_values.push(g);
				}
			if ("number" !== typeof a.from || isNaN(a.from)) a.from = a.min;
			if ("number" !== typeof a.to || isNaN(a.to)) a.to = a.max;
			"single" === a.type
				? (a.from < a.min && (a.from = a.min),
				  a.from > a.max && (a.from = a.max))
				: (a.from < a.min && (a.from = a.min),
				  a.from > a.max && (a.from = a.max),
				  a.to < a.min && (a.to = a.min),
				  a.to > a.max && (a.to = a.max),
				  this.update_check.from &&
						(this.update_check.from !== a.from &&
							a.from > a.to &&
							(a.from = a.to),
						this.update_check.to !== a.to &&
							a.to < a.from &&
							(a.to = a.from)),
				  a.from > a.to && (a.from = a.to),
				  a.to < a.from && (a.to = a.from));
			if (
				"number" !== typeof a.step ||
				isNaN(a.step) ||
				!a.step ||
				0 > a.step
			)
				a.step = 1;
			"number" === typeof a.from_min &&
				a.from < a.from_min &&
				(a.from = a.from_min);
			"number" === typeof a.from_max &&
				a.from > a.from_max &&
				(a.from = a.from_max);
			"number" === typeof a.to_min &&
				a.to < a.to_min &&
				(a.to = a.to_min);
			"number" === typeof a.to_max &&
				a.from > a.to_max &&
				(a.to = a.to_max);
			if (b) {
				b.min !== a.min && (b.min = a.min);
				b.max !== a.max && (b.max = a.max);
				if (b.from < b.min || b.from > b.max) b.from = a.from;
				if (b.to < b.min || b.to > b.max) b.to = a.to;
			}
			if (
				"number" !== typeof a.min_interval ||
				isNaN(a.min_interval) ||
				!a.min_interval ||
				0 > a.min_interval
			)
				a.min_interval = 0;
			if (
				"number" !== typeof a.max_interval ||
				isNaN(a.max_interval) ||
				!a.max_interval ||
				0 > a.max_interval
			)
				a.max_interval = 0;
			a.min_interval &&
				a.min_interval > a.max - a.min &&
				(a.min_interval = a.max - a.min);
			a.max_interval &&
				a.max_interval > a.max - a.min &&
				(a.max_interval = a.max - a.min);
		},
		decorate: function (a, b) {
			var d = "",
				c = this.options;
			c.prefix && (d += c.prefix);
			d += a;
			c.max_postfix &&
				(c.values.length && a === c.p_values[c.max]
					? ((d += c.max_postfix), c.postfix && (d += " "))
					: b === c.max &&
					  ((d += c.max_postfix), c.postfix && (d += " ")));
			c.postfix && (d += c.postfix);
			return d;
		},
		updateFrom: function () {
			this.result.from = this.options.from;
			this.result.from_percent = this.convertToPercent(this.result.from);
			this.result.from_pretty = this._prettify(this.result.from);
			this.options.values &&
				(this.result.from_value =
					this.options.values[this.result.from]);
		},
		updateTo: function () {
			this.result.to = this.options.to;
			this.result.to_percent = this.convertToPercent(this.result.to);
			this.result.to_pretty = this._prettify(this.result.to);
			this.options.values &&
				(this.result.to_value = this.options.values[this.result.to]);
		},
		updateResult: function () {
			this.result.min = this.options.min;
			this.result.max = this.options.max;
			this.updateFrom();
			this.updateTo();
		},
		appendGrid: function () {
			if (this.options.grid) {
				var a = this.options,
					b;
				var d = a.max - a.min;
				var c = a.grid_num,
					e = 4,
					g = "";
				this.calcGridMargin();
				if (a.grid_snap)
					if (50 < d) {
						c = 50 / a.step;
						var f = this.toFixed(a.step / 0.5);
					} else
						(c = d / a.step),
							(f = this.toFixed(a.step / (d / 100)));
				else f = this.toFixed(100 / c);
				4 < c && (e = 3);
				7 < c && (e = 2);
				14 < c && (e = 1);
				28 < c && (e = 0);
				for (d = 0; d < c + 1; d++) {
					var k = e;
					var h = this.toFixed(f * d);
					100 < h && (h = 100);
					this.coords.big[d] = h;
					var m = (h - f * (d - 1)) / (k + 1);
					for (b = 1; b <= k && 0 !== h; b++) {
						var n = this.toFixed(h - m * b);
						g +=
							'<span class="irs-grid-pol small" style="left: ' +
							n +
							'%"></span>';
					}
					g +=
						'<span class="irs-grid-pol" style="left: ' +
						h +
						'%"></span>';
					b = this.convertToValue(h);
					b = a.values.length ? a.p_values[b] : this._prettify(b);
					g +=
						'<span class="irs-grid-text js-grid-text-' +
						d +
						'" style="left: ' +
						h +
						'%">' +
						b +
						"</span>";
				}
				this.coords.big_num = Math.ceil(c + 1);
				this.$cache.cont.addClass("irs-with-grid");
				this.$cache.grid.html(g);
				this.cacheGridLabels();
			}
		},
		cacheGridLabels: function () {
			var a,
				b = this.coords.big_num;
			for (a = 0; a < b; a++) {
				var d = this.$cache.grid.find(".js-grid-text-" + a);
				this.$cache.grid_labels.push(d);
			}
			this.calcGridLabels();
		},
		calcGridLabels: function () {
			var a;
			var b = [];
			var d = [],
				c = this.coords.big_num;
			for (a = 0; a < c; a++)
				(this.coords.big_w[a] = this.$cache.grid_labels[a].outerWidth(
					!1
				)),
					(this.coords.big_p[a] = this.toFixed(
						(this.coords.big_w[a] / this.coords.w_rs) * 100
					)),
					(this.coords.big_x[a] = this.toFixed(
						this.coords.big_p[a] / 2
					)),
					(b[a] = this.toFixed(
						this.coords.big[a] - this.coords.big_x[a]
					)),
					(d[a] = this.toFixed(b[a] + this.coords.big_p[a]));
			this.options.force_edges &&
				(b[0] < -this.coords.grid_gap &&
					((b[0] = -this.coords.grid_gap),
					(d[0] = this.toFixed(b[0] + this.coords.big_p[0])),
					(this.coords.big_x[0] = this.coords.grid_gap)),
				d[c - 1] > 100 + this.coords.grid_gap &&
					((d[c - 1] = 100 + this.coords.grid_gap),
					(b[c - 1] = this.toFixed(
						d[c - 1] - this.coords.big_p[c - 1]
					)),
					(this.coords.big_x[c - 1] = this.toFixed(
						this.coords.big_p[c - 1] - this.coords.grid_gap
					))));
			this.calcGridCollision(2, b, d);
			this.calcGridCollision(4, b, d);
			for (a = 0; a < c; a++)
				(b = this.$cache.grid_labels[a][0]),
					this.coords.big_x[a] !== Number.POSITIVE_INFINITY &&
						(b.style.marginLeft = -this.coords.big_x[a] + "%");
		},
		calcGridCollision: function (a, b, d) {
			var c,
				e = this.coords.big_num;
			for (c = 0; c < e; c += a) {
				var g = c + a / 2;
				if (g >= e) break;
				var f = this.$cache.grid_labels[g][0];
				f.style.visibility = d[c] <= b[g] ? "visible" : "hidden";
			}
		},
		calcGridMargin: function () {
			this.options.grid_margin &&
				((this.coords.w_rs = this.$cache.rs.outerWidth(!1)),
				this.coords.w_rs &&
					((this.coords.w_handle =
						"single" === this.options.type
							? this.$cache.s_single.outerWidth(!1)
							: this.$cache.s_from.outerWidth(!1)),
					(this.coords.p_handle = this.toFixed(
						(this.coords.w_handle / this.coords.w_rs) * 100
					)),
					(this.coords.grid_gap = this.toFixed(
						this.coords.p_handle / 2 - 0.1
					)),
					(this.$cache.grid[0].style.width =
						this.toFixed(100 - this.coords.p_handle) + "%"),
					(this.$cache.grid[0].style.left =
						this.coords.grid_gap + "%")));
		},
		update: function (a) {
			this.input &&
				((this.is_update = !0),
				(this.options.from = this.result.from),
				(this.options.to = this.result.to),
				(this.update_check.from = this.result.from),
				(this.update_check.to = this.result.to),
				(this.options = f.extend(this.options, a)),
				this.validate(),
				this.updateResult(a),
				this.toggleInput(),
				this.remove(),
				this.init(!0));
		},
		reset: function () {
			this.input && (this.updateResult(), this.update());
		},
		destroy: function () {
			this.input &&
				(this.toggleInput(),
				this.$cache.input.prop("readonly", !1),
				f.data(this.input, "ionRangeSlider", null),
				this.remove(),
				(this.options = this.input = null));
		},
	};
	f.fn.ionRangeSlider = function (a) {
		return this.each(function () {
			f.data(this, "ionRangeSlider") ||
				f.data(this, "ionRangeSlider", new q(this, a, t++));
		});
	};
	(function () {
		for (
			var a = 0, b = ["ms", "moz", "webkit", "o"], d = 0;
			d < b.length && !k.requestAnimationFrame;
			++d
		)
			(k.requestAnimationFrame = k[b[d] + "RequestAnimationFrame"]),
				(k.cancelAnimationFrame =
					k[b[d] + "CancelAnimationFrame"] ||
					k[b[d] + "CancelRequestAnimationFrame"]);
		k.requestAnimationFrame ||
			(k.requestAnimationFrame = function (b, d) {
				var c = new Date().getTime(),
					e = Math.max(0, 16 - (c - a)),
					f = k.setTimeout(function () {
						b(c + e);
					}, e);
				a = c + e;
				return f;
			});
		k.cancelAnimationFrame ||
			(k.cancelAnimationFrame = function (a) {
				clearTimeout(a);
			});
	})();
});
/**
 * Swiper 4.4.1
 * Most modern mobile touch slider and framework with hardware accelerated transitions
 * http://www.idangero.us/swiper/
 *
 * Copyright 2014-2018 Vladimir Kharlampidi
 *
 * Released under the MIT License
 *
 * Released on: September 14, 2018
 */
!(function (e, t) {
	"object" == typeof exports && "undefined" != typeof module
		? (module.exports = t())
		: "function" == typeof define && define.amd
		? define(t)
		: (e.Swiper = t());
})(this, function () {
	"use strict";
	var f =
			"undefined" == typeof document
				? {
						body: {},
						addEventListener: function () {},
						removeEventListener: function () {},
						activeElement: { blur: function () {}, nodeName: "" },
						querySelector: function () {
							return null;
						},
						querySelectorAll: function () {
							return [];
						},
						getElementById: function () {
							return null;
						},
						createEvent: function () {
							return { initEvent: function () {} };
						},
						createElement: function () {
							return {
								children: [],
								childNodes: [],
								style: {},
								setAttribute: function () {},
								getElementsByTagName: function () {
									return [];
								},
							};
						},
						location: { hash: "" },
				  }
				: document,
		Y =
			"undefined" == typeof window
				? {
						document: f,
						navigator: { userAgent: "" },
						location: {},
						history: {},
						CustomEvent: function () {
							return this;
						},
						addEventListener: function () {},
						removeEventListener: function () {},
						getComputedStyle: function () {
							return {
								getPropertyValue: function () {
									return "";
								},
							};
						},
						Image: function () {},
						Date: function () {},
						screen: {},
						setTimeout: function () {},
						clearTimeout: function () {},
				  }
				: window,
		l = function (e) {
			for (var t = 0; t < e.length; t += 1) this[t] = e[t];
			return (this.length = e.length), this;
		};
	function L(e, t) {
		var a = [],
			i = 0;
		if (e && !t && e instanceof l) return e;
		if (e)
			if ("string" == typeof e) {
				var s,
					r,
					n = e.trim();
				if (0 <= n.indexOf("<") && 0 <= n.indexOf(">")) {
					var o = "div";
					for (
						0 === n.indexOf("<li") && (o = "ul"),
							0 === n.indexOf("<tr") && (o = "tbody"),
							(0 !== n.indexOf("<td") &&
								0 !== n.indexOf("<th")) ||
								(o = "tr"),
							0 === n.indexOf("<tbody") && (o = "table"),
							0 === n.indexOf("<option") && (o = "select"),
							(r = f.createElement(o)).innerHTML = n,
							i = 0;
						i < r.childNodes.length;
						i += 1
					)
						a.push(r.childNodes[i]);
				} else
					for (
						s =
							t || "#" !== e[0] || e.match(/[ .<>:~]/)
								? (t || f).querySelectorAll(e.trim())
								: [f.getElementById(e.trim().split("#")[1])],
							i = 0;
						i < s.length;
						i += 1
					)
						s[i] && a.push(s[i]);
			} else if (e.nodeType || e === Y || e === f) a.push(e);
			else if (0 < e.length && e[0].nodeType)
				for (i = 0; i < e.length; i += 1) a.push(e[i]);
		return new l(a);
	}
	function r(e) {
		for (var t = [], a = 0; a < e.length; a += 1)
			-1 === t.indexOf(e[a]) && t.push(e[a]);
		return t;
	}
	(L.fn = l.prototype), (L.Class = l), (L.Dom7 = l);
	var t = {
		addClass: function (e) {
			if (void 0 === e) return this;
			for (var t = e.split(" "), a = 0; a < t.length; a += 1)
				for (var i = 0; i < this.length; i += 1)
					void 0 !== this[i] &&
						void 0 !== this[i].classList &&
						this[i].classList.add(t[a]);
			return this;
		},
		removeClass: function (e) {
			for (var t = e.split(" "), a = 0; a < t.length; a += 1)
				for (var i = 0; i < this.length; i += 1)
					void 0 !== this[i] &&
						void 0 !== this[i].classList &&
						this[i].classList.remove(t[a]);
			return this;
		},
		hasClass: function (e) {
			return !!this[0] && this[0].classList.contains(e);
		},
		toggleClass: function (e) {
			for (var t = e.split(" "), a = 0; a < t.length; a += 1)
				for (var i = 0; i < this.length; i += 1)
					void 0 !== this[i] &&
						void 0 !== this[i].classList &&
						this[i].classList.toggle(t[a]);
			return this;
		},
		attr: function (e, t) {
			var a = arguments;
			if (1 === arguments.length && "string" == typeof e)
				return this[0] ? this[0].getAttribute(e) : void 0;
			for (var i = 0; i < this.length; i += 1)
				if (2 === a.length) this[i].setAttribute(e, t);
				else
					for (var s in e)
						(this[i][s] = e[s]), this[i].setAttribute(s, e[s]);
			return this;
		},
		removeAttr: function (e) {
			for (var t = 0; t < this.length; t += 1) this[t].removeAttribute(e);
			return this;
		},
		data: function (e, t) {
			var a;
			if (void 0 !== t) {
				for (var i = 0; i < this.length; i += 1)
					(a = this[i]).dom7ElementDataStorage ||
						(a.dom7ElementDataStorage = {}),
						(a.dom7ElementDataStorage[e] = t);
				return this;
			}
			if ((a = this[0])) {
				if (a.dom7ElementDataStorage && e in a.dom7ElementDataStorage)
					return a.dom7ElementDataStorage[e];
				var s = a.getAttribute("data-" + e);
				return s || void 0;
			}
		},
		transform: function (e) {
			for (var t = 0; t < this.length; t += 1) {
				var a = this[t].style;
				(a.webkitTransform = e), (a.transform = e);
			}
			return this;
		},
		transition: function (e) {
			"string" != typeof e && (e += "ms");
			for (var t = 0; t < this.length; t += 1) {
				var a = this[t].style;
				(a.webkitTransitionDuration = e), (a.transitionDuration = e);
			}
			return this;
		},
		on: function () {
			for (var e, t = [], a = arguments.length; a--; )
				t[a] = arguments[a];
			var i = t[0],
				r = t[1],
				n = t[2],
				s = t[3];
			function o(e) {
				var t = e.target;
				if (t) {
					var a = e.target.dom7EventData || [];
					if ((a.indexOf(e) < 0 && a.unshift(e), L(t).is(r)))
						n.apply(t, a);
					else
						for (
							var i = L(t).parents(), s = 0;
							s < i.length;
							s += 1
						)
							L(i[s]).is(r) && n.apply(i[s], a);
				}
			}
			function l(e) {
				var t = (e && e.target && e.target.dom7EventData) || [];
				t.indexOf(e) < 0 && t.unshift(e), n.apply(this, t);
			}
			"function" == typeof t[1] &&
				((i = (e = t)[0]), (n = e[1]), (s = e[2]), (r = void 0)),
				s || (s = !1);
			for (var d, p = i.split(" "), c = 0; c < this.length; c += 1) {
				var u = this[c];
				if (r)
					for (d = 0; d < p.length; d += 1) {
						var h = p[d];
						u.dom7LiveListeners || (u.dom7LiveListeners = {}),
							u.dom7LiveListeners[h] ||
								(u.dom7LiveListeners[h] = []),
							u.dom7LiveListeners[h].push({
								listener: n,
								proxyListener: o,
							}),
							u.addEventListener(h, o, s);
					}
				else
					for (d = 0; d < p.length; d += 1) {
						var v = p[d];
						u.dom7Listeners || (u.dom7Listeners = {}),
							u.dom7Listeners[v] || (u.dom7Listeners[v] = []),
							u.dom7Listeners[v].push({
								listener: n,
								proxyListener: l,
							}),
							u.addEventListener(v, l, s);
					}
			}
			return this;
		},
		off: function () {
			for (var e, t = [], a = arguments.length; a--; )
				t[a] = arguments[a];
			var i = t[0],
				s = t[1],
				r = t[2],
				n = t[3];
			"function" == typeof t[1] &&
				((i = (e = t)[0]), (r = e[1]), (n = e[2]), (s = void 0)),
				n || (n = !1);
			for (var o = i.split(" "), l = 0; l < o.length; l += 1)
				for (var d = o[l], p = 0; p < this.length; p += 1) {
					var c = this[p],
						u = void 0;
					if (
						(!s && c.dom7Listeners
							? (u = c.dom7Listeners[d])
							: s &&
							  c.dom7LiveListeners &&
							  (u = c.dom7LiveListeners[d]),
						u && u.length)
					)
						for (var h = u.length - 1; 0 <= h; h -= 1) {
							var v = u[h];
							r && v.listener === r
								? (c.removeEventListener(d, v.proxyListener, n),
								  u.splice(h, 1))
								: r ||
								  (c.removeEventListener(d, v.proxyListener, n),
								  u.splice(h, 1));
						}
				}
			return this;
		},
		trigger: function () {
			for (var e = [], t = arguments.length; t--; ) e[t] = arguments[t];
			for (var a = e[0].split(" "), i = e[1], s = 0; s < a.length; s += 1)
				for (var r = a[s], n = 0; n < this.length; n += 1) {
					var o = this[n],
						l = void 0;
					try {
						l = new Y.CustomEvent(r, {
							detail: i,
							bubbles: !0,
							cancelable: !0,
						});
					} catch (e) {
						(l = f.createEvent("Event")).initEvent(r, !0, !0),
							(l.detail = i);
					}
					(o.dom7EventData = e.filter(function (e, t) {
						return 0 < t;
					})),
						o.dispatchEvent(l),
						(o.dom7EventData = []),
						delete o.dom7EventData;
				}
			return this;
		},
		transitionEnd: function (t) {
			var a,
				i = ["webkitTransitionEnd", "transitionend"],
				s = this;
			function r(e) {
				if (e.target === this)
					for (t.call(this, e), a = 0; a < i.length; a += 1)
						s.off(i[a], r);
			}
			if (t) for (a = 0; a < i.length; a += 1) s.on(i[a], r);
			return this;
		},
		outerWidth: function (e) {
			if (0 < this.length) {
				if (e) {
					var t = this.styles();
					return (
						this[0].offsetWidth +
						parseFloat(t.getPropertyValue("margin-right")) +
						parseFloat(t.getPropertyValue("margin-left"))
					);
				}
				return this[0].offsetWidth;
			}
			return null;
		},
		outerHeight: function (e) {
			if (0 < this.length) {
				if (e) {
					var t = this.styles();
					return (
						this[0].offsetHeight +
						parseFloat(t.getPropertyValue("margin-top")) +
						parseFloat(t.getPropertyValue("margin-bottom"))
					);
				}
				return this[0].offsetHeight;
			}
			return null;
		},
		offset: function () {
			if (0 < this.length) {
				var e = this[0],
					t = e.getBoundingClientRect(),
					a = f.body,
					i = e.clientTop || a.clientTop || 0,
					s = e.clientLeft || a.clientLeft || 0,
					r = e === Y ? Y.scrollY : e.scrollTop,
					n = e === Y ? Y.scrollX : e.scrollLeft;
				return { top: t.top + r - i, left: t.left + n - s };
			}
			return null;
		},
		css: function (e, t) {
			var a;
			if (1 === arguments.length) {
				if ("string" != typeof e) {
					for (a = 0; a < this.length; a += 1)
						for (var i in e) this[a].style[i] = e[i];
					return this;
				}
				if (this[0])
					return Y.getComputedStyle(this[0], null).getPropertyValue(
						e
					);
			}
			if (2 === arguments.length && "string" == typeof e) {
				for (a = 0; a < this.length; a += 1) this[a].style[e] = t;
				return this;
			}
			return this;
		},
		each: function (e) {
			if (!e) return this;
			for (var t = 0; t < this.length; t += 1)
				if (!1 === e.call(this[t], t, this[t])) return this;
			return this;
		},
		html: function (e) {
			if (void 0 === e) return this[0] ? this[0].innerHTML : void 0;
			for (var t = 0; t < this.length; t += 1) this[t].innerHTML = e;
			return this;
		},
		text: function (e) {
			if (void 0 === e)
				return this[0] ? this[0].textContent.trim() : null;
			for (var t = 0; t < this.length; t += 1) this[t].textContent = e;
			return this;
		},
		is: function (e) {
			var t,
				a,
				i = this[0];
			if (!i || void 0 === e) return !1;
			if ("string" == typeof e) {
				if (i.matches) return i.matches(e);
				if (i.webkitMatchesSelector) return i.webkitMatchesSelector(e);
				if (i.msMatchesSelector) return i.msMatchesSelector(e);
				for (t = L(e), a = 0; a < t.length; a += 1)
					if (t[a] === i) return !0;
				return !1;
			}
			if (e === f) return i === f;
			if (e === Y) return i === Y;
			if (e.nodeType || e instanceof l) {
				for (t = e.nodeType ? [e] : e, a = 0; a < t.length; a += 1)
					if (t[a] === i) return !0;
				return !1;
			}
			return !1;
		},
		index: function () {
			var e,
				t = this[0];
			if (t) {
				for (e = 0; null !== (t = t.previousSibling); )
					1 === t.nodeType && (e += 1);
				return e;
			}
		},
		eq: function (e) {
			if (void 0 === e) return this;
			var t,
				a = this.length;
			return new l(
				a - 1 < e
					? []
					: e < 0
					? (t = a + e) < 0
						? []
						: [this[t]]
					: [this[e]]
			);
		},
		append: function () {
			for (var e, t = [], a = arguments.length; a--; )
				t[a] = arguments[a];
			for (var i = 0; i < t.length; i += 1) {
				e = t[i];
				for (var s = 0; s < this.length; s += 1)
					if ("string" == typeof e) {
						var r = f.createElement("div");
						for (r.innerHTML = e; r.firstChild; )
							this[s].appendChild(r.firstChild);
					} else if (e instanceof l)
						for (var n = 0; n < e.length; n += 1)
							this[s].appendChild(e[n]);
					else this[s].appendChild(e);
			}
			return this;
		},
		prepend: function (e) {
			var t,
				a,
				i = this;
			for (t = 0; t < this.length; t += 1)
				if ("string" == typeof e) {
					var s = f.createElement("div");
					for (
						s.innerHTML = e, a = s.childNodes.length - 1;
						0 <= a;
						a -= 1
					)
						i[t].insertBefore(s.childNodes[a], i[t].childNodes[0]);
				} else if (e instanceof l)
					for (a = 0; a < e.length; a += 1)
						i[t].insertBefore(e[a], i[t].childNodes[0]);
				else i[t].insertBefore(e, i[t].childNodes[0]);
			return this;
		},
		next: function (e) {
			return 0 < this.length
				? e
					? this[0].nextElementSibling &&
					  L(this[0].nextElementSibling).is(e)
						? new l([this[0].nextElementSibling])
						: new l([])
					: this[0].nextElementSibling
					? new l([this[0].nextElementSibling])
					: new l([])
				: new l([]);
		},
		nextAll: function (e) {
			var t = [],
				a = this[0];
			if (!a) return new l([]);
			for (; a.nextElementSibling; ) {
				var i = a.nextElementSibling;
				e ? L(i).is(e) && t.push(i) : t.push(i), (a = i);
			}
			return new l(t);
		},
		prev: function (e) {
			if (0 < this.length) {
				var t = this[0];
				return e
					? t.previousElementSibling &&
					  L(t.previousElementSibling).is(e)
						? new l([t.previousElementSibling])
						: new l([])
					: t.previousElementSibling
					? new l([t.previousElementSibling])
					: new l([]);
			}
			return new l([]);
		},
		prevAll: function (e) {
			var t = [],
				a = this[0];
			if (!a) return new l([]);
			for (; a.previousElementSibling; ) {
				var i = a.previousElementSibling;
				e ? L(i).is(e) && t.push(i) : t.push(i), (a = i);
			}
			return new l(t);
		},
		parent: function (e) {
			for (var t = [], a = 0; a < this.length; a += 1)
				null !== this[a].parentNode &&
					(e
						? L(this[a].parentNode).is(e) &&
						  t.push(this[a].parentNode)
						: t.push(this[a].parentNode));
			return L(r(t));
		},
		parents: function (e) {
			for (var t = [], a = 0; a < this.length; a += 1)
				for (var i = this[a].parentNode; i; )
					e ? L(i).is(e) && t.push(i) : t.push(i), (i = i.parentNode);
			return L(r(t));
		},
		closest: function (e) {
			var t = this;
			return void 0 === e
				? new l([])
				: (t.is(e) || (t = t.parents(e).eq(0)), t);
		},
		find: function (e) {
			for (var t = [], a = 0; a < this.length; a += 1)
				for (
					var i = this[a].querySelectorAll(e), s = 0;
					s < i.length;
					s += 1
				)
					t.push(i[s]);
			return new l(t);
		},
		children: function (e) {
			for (var t = [], a = 0; a < this.length; a += 1)
				for (var i = this[a].childNodes, s = 0; s < i.length; s += 1)
					e
						? 1 === i[s].nodeType && L(i[s]).is(e) && t.push(i[s])
						: 1 === i[s].nodeType && t.push(i[s]);
			return new l(r(t));
		},
		remove: function () {
			for (var e = 0; e < this.length; e += 1)
				this[e].parentNode && this[e].parentNode.removeChild(this[e]);
			return this;
		},
		add: function () {
			for (var e = [], t = arguments.length; t--; ) e[t] = arguments[t];
			var a, i;
			for (a = 0; a < e.length; a += 1) {
				var s = L(e[a]);
				for (i = 0; i < s.length; i += 1)
					(this[this.length] = s[i]), (this.length += 1);
			}
			return this;
		},
		styles: function () {
			return this[0] ? Y.getComputedStyle(this[0], null) : {};
		},
	};
	Object.keys(t).forEach(function (e) {
		L.fn[e] = t[e];
	});
	var e,
		a,
		i,
		V = {
			deleteProps: function (e) {
				var t = e;
				Object.keys(t).forEach(function (e) {
					try {
						t[e] = null;
					} catch (e) {}
					try {
						delete t[e];
					} catch (e) {}
				});
			},
			nextTick: function (e, t) {
				return void 0 === t && (t = 0), setTimeout(e, t);
			},
			now: function () {
				return Date.now();
			},
			getTranslate: function (e, t) {
				var a, i, s;
				void 0 === t && (t = "x");
				var r = Y.getComputedStyle(e, null);
				return (
					Y.WebKitCSSMatrix
						? (6 <
								(i = r.transform || r.webkitTransform).split(
									","
								).length &&
								(i = i
									.split(", ")
									.map(function (e) {
										return e.replace(",", ".");
									})
									.join(", ")),
						  (s = new Y.WebKitCSSMatrix("none" === i ? "" : i)))
						: (a = (s =
								r.MozTransform ||
								r.OTransform ||
								r.MsTransform ||
								r.msTransform ||
								r.transform ||
								r
									.getPropertyValue("transform")
									.replace(
										"translate(",
										"matrix(1, 0, 0, 1,"
									))
								.toString()
								.split(",")),
					"x" === t &&
						(i = Y.WebKitCSSMatrix
							? s.m41
							: 16 === a.length
							? parseFloat(a[12])
							: parseFloat(a[4])),
					"y" === t &&
						(i = Y.WebKitCSSMatrix
							? s.m42
							: 16 === a.length
							? parseFloat(a[13])
							: parseFloat(a[5])),
					i || 0
				);
			},
			parseUrlQuery: function (e) {
				var t,
					a,
					i,
					s,
					r = {},
					n = e || Y.location.href;
				if ("string" == typeof n && n.length)
					for (
						s = (a = (n =
							-1 < n.indexOf("?") ? n.replace(/\S*\?/, "") : "")
							.split("&")
							.filter(function (e) {
								return "" !== e;
							})).length,
							t = 0;
						t < s;
						t += 1
					)
						(i = a[t].replace(/#\S+/g, "").split("=")),
							(r[decodeURIComponent(i[0])] =
								void 0 === i[1]
									? void 0
									: decodeURIComponent(i[1]) || "");
				return r;
			},
			isObject: function (e) {
				return (
					"object" == typeof e &&
					null !== e &&
					e.constructor &&
					e.constructor === Object
				);
			},
			extend: function () {
				for (var e = [], t = arguments.length; t--; )
					e[t] = arguments[t];
				for (var a = Object(e[0]), i = 1; i < e.length; i += 1) {
					var s = e[i];
					if (null != s)
						for (
							var r = Object.keys(Object(s)), n = 0, o = r.length;
							n < o;
							n += 1
						) {
							var l = r[n],
								d = Object.getOwnPropertyDescriptor(s, l);
							void 0 !== d &&
								d.enumerable &&
								(V.isObject(a[l]) && V.isObject(s[l])
									? V.extend(a[l], s[l])
									: !V.isObject(a[l]) && V.isObject(s[l])
									? ((a[l] = {}), V.extend(a[l], s[l]))
									: (a[l] = s[l]));
						}
				}
				return a;
			},
		},
		R =
			((i = f.createElement("div")),
			{
				touch:
					(Y.Modernizr && !0 === Y.Modernizr.touch) ||
					!!(
						"ontouchstart" in Y ||
						(Y.DocumentTouch && f instanceof Y.DocumentTouch)
					),
				pointerEvents: !(
					!Y.navigator.pointerEnabled && !Y.PointerEvent
				),
				prefixedPointerEvents: !!Y.navigator.msPointerEnabled,
				transition:
					((a = i.style),
					"transition" in a ||
						"webkitTransition" in a ||
						"MozTransition" in a),
				transforms3d:
					(Y.Modernizr && !0 === Y.Modernizr.csstransforms3d) ||
					((e = i.style),
					"webkitPerspective" in e ||
						"MozPerspective" in e ||
						"OPerspective" in e ||
						"MsPerspective" in e ||
						"perspective" in e),
				flexbox: (function () {
					for (
						var e = i.style,
							t =
								"alignItems webkitAlignItems webkitBoxAlign msFlexAlign mozBoxAlign webkitFlexDirection msFlexDirection mozBoxDirection mozBoxOrient webkitBoxDirection webkitBoxOrient".split(
									" "
								),
							a = 0;
						a < t.length;
						a += 1
					)
						if (t[a] in e) return !0;
					return !1;
				})(),
				observer:
					"MutationObserver" in Y || "WebkitMutationObserver" in Y,
				passiveListener: (function () {
					var e = !1;
					try {
						var t = Object.defineProperty({}, "passive", {
							get: function () {
								e = !0;
							},
						});
						Y.addEventListener("testPassiveListener", null, t);
					} catch (e) {}
					return e;
				})(),
				gestures: "ongesturestart" in Y,
			}),
		s = function (e) {
			void 0 === e && (e = {});
			var t = this;
			(t.params = e),
				(t.eventsListeners = {}),
				t.params &&
					t.params.on &&
					Object.keys(t.params.on).forEach(function (e) {
						t.on(e, t.params.on[e]);
					});
		},
		n = { components: { configurable: !0 } };
	(s.prototype.on = function (e, t, a) {
		var i = this;
		if ("function" != typeof t) return i;
		var s = a ? "unshift" : "push";
		return (
			e.split(" ").forEach(function (e) {
				i.eventsListeners[e] || (i.eventsListeners[e] = []),
					i.eventsListeners[e][s](t);
			}),
			i
		);
	}),
		(s.prototype.once = function (i, s, e) {
			var r = this;
			if ("function" != typeof s) return r;
			return r.on(
				i,
				function e() {
					for (var t = [], a = arguments.length; a--; )
						t[a] = arguments[a];
					s.apply(r, t), r.off(i, e);
				},
				e
			);
		}),
		(s.prototype.off = function (e, i) {
			var s = this;
			return (
				s.eventsListeners &&
					e.split(" ").forEach(function (a) {
						void 0 === i
							? (s.eventsListeners[a] = [])
							: s.eventsListeners[a] &&
							  s.eventsListeners[a].length &&
							  s.eventsListeners[a].forEach(function (e, t) {
									e === i &&
										s.eventsListeners[a].splice(t, 1);
							  });
					}),
				s
			);
		}),
		(s.prototype.emit = function () {
			for (var e = [], t = arguments.length; t--; ) e[t] = arguments[t];
			var a,
				i,
				s,
				r = this;
			return (
				r.eventsListeners &&
					("string" == typeof e[0] || Array.isArray(e[0])
						? ((a = e[0]), (i = e.slice(1, e.length)), (s = r))
						: ((a = e[0].events),
						  (i = e[0].data),
						  (s = e[0].context || r)),
					(Array.isArray(a) ? a : a.split(" ")).forEach(function (e) {
						if (r.eventsListeners && r.eventsListeners[e]) {
							var t = [];
							r.eventsListeners[e].forEach(function (e) {
								t.push(e);
							}),
								t.forEach(function (e) {
									e.apply(s, i);
								});
						}
					})),
				r
			);
		}),
		(s.prototype.useModulesParams = function (a) {
			var i = this;
			i.modules &&
				Object.keys(i.modules).forEach(function (e) {
					var t = i.modules[e];
					t.params && V.extend(a, t.params);
				});
		}),
		(s.prototype.useModules = function (i) {
			void 0 === i && (i = {});
			var s = this;
			s.modules &&
				Object.keys(s.modules).forEach(function (e) {
					var a = s.modules[e],
						t = i[e] || {};
					a.instance &&
						Object.keys(a.instance).forEach(function (e) {
							var t = a.instance[e];
							s[e] = "function" == typeof t ? t.bind(s) : t;
						}),
						a.on &&
							s.on &&
							Object.keys(a.on).forEach(function (e) {
								s.on(e, a.on[e]);
							}),
						a.create && a.create.bind(s)(t);
				});
		}),
		(n.components.set = function (e) {
			this.use && this.use(e);
		}),
		(s.installModule = function (t) {
			for (var e = [], a = arguments.length - 1; 0 < a--; )
				e[a] = arguments[a + 1];
			var i = this;
			i.prototype.modules || (i.prototype.modules = {});
			var s =
				t.name ||
				Object.keys(i.prototype.modules).length + "_" + V.now();
			return (
				(i.prototype.modules[s] = t).proto &&
					Object.keys(t.proto).forEach(function (e) {
						i.prototype[e] = t.proto[e];
					}),
				t.static &&
					Object.keys(t.static).forEach(function (e) {
						i[e] = t.static[e];
					}),
				t.install && t.install.apply(i, e),
				i
			);
		}),
		(s.use = function (e) {
			for (var t = [], a = arguments.length - 1; 0 < a--; )
				t[a] = arguments[a + 1];
			var i = this;
			return Array.isArray(e)
				? (e.forEach(function (e) {
						return i.installModule(e);
				  }),
				  i)
				: i.installModule.apply(i, [e].concat(t));
		}),
		Object.defineProperties(s, n);
	var o = {
		updateSize: function () {
			var e,
				t,
				a = this,
				i = a.$el;
			(e = void 0 !== a.params.width ? a.params.width : i[0].clientWidth),
				(t =
					void 0 !== a.params.height
						? a.params.height
						: i[0].clientHeight),
				(0 === e && a.isHorizontal()) ||
					(0 === t && a.isVertical()) ||
					((e =
						e -
						parseInt(i.css("padding-left"), 10) -
						parseInt(i.css("padding-right"), 10)),
					(t =
						t -
						parseInt(i.css("padding-top"), 10) -
						parseInt(i.css("padding-bottom"), 10)),
					V.extend(a, {
						width: e,
						height: t,
						size: a.isHorizontal() ? e : t,
					}));
		},
		updateSlides: function () {
			var e = this,
				t = e.params,
				a = e.$wrapperEl,
				i = e.size,
				s = e.rtlTranslate,
				r = e.wrongRTL,
				n = e.virtual && t.virtual.enabled,
				o = n ? e.virtual.slides.length : e.slides.length,
				l = a.children("." + e.params.slideClass),
				d = n ? e.virtual.slides.length : l.length,
				p = [],
				c = [],
				u = [],
				h = t.slidesOffsetBefore;
			"function" == typeof h && (h = t.slidesOffsetBefore.call(e));
			var v = t.slidesOffsetAfter;
			"function" == typeof v && (v = t.slidesOffsetAfter.call(e));
			var f = e.snapGrid.length,
				m = e.snapGrid.length,
				g = t.spaceBetween,
				b = -h,
				w = 0,
				y = 0;
			if (void 0 !== i) {
				var x, T;
				"string" == typeof g &&
					0 <= g.indexOf("%") &&
					(g = (parseFloat(g.replace("%", "")) / 100) * i),
					(e.virtualSize = -g),
					s
						? l.css({ marginLeft: "", marginTop: "" })
						: l.css({ marginRight: "", marginBottom: "" }),
					1 < t.slidesPerColumn &&
						((x =
							Math.floor(d / t.slidesPerColumn) ===
							d / e.params.slidesPerColumn
								? d
								: Math.ceil(d / t.slidesPerColumn) *
								  t.slidesPerColumn),
						"auto" !== t.slidesPerView &&
							"row" === t.slidesPerColumnFill &&
							(x = Math.max(
								x,
								t.slidesPerView * t.slidesPerColumn
							)));
				for (
					var E,
						S = t.slidesPerColumn,
						C = x / S,
						M = C - (t.slidesPerColumn * C - d),
						k = 0;
					k < d;
					k += 1
				) {
					T = 0;
					var z = l.eq(k);
					if (1 < t.slidesPerColumn) {
						var P = void 0,
							$ = void 0,
							L = void 0;
						"column" === t.slidesPerColumnFill
							? ((L = k - ($ = Math.floor(k / S)) * S),
							  (M < $ || ($ === M && L === S - 1)) &&
									S <= (L += 1) &&
									((L = 0), ($ += 1)),
							  (P = $ + (L * x) / S),
							  z.css({
									"-webkit-box-ordinal-group": P,
									"-moz-box-ordinal-group": P,
									"-ms-flex-order": P,
									"-webkit-order": P,
									order: P,
							  }))
							: ($ = k - (L = Math.floor(k / C)) * C),
							z
								.css(
									"margin-" +
										(e.isHorizontal() ? "top" : "left"),
									0 !== L &&
										t.spaceBetween &&
										t.spaceBetween + "px"
								)
								.attr("data-swiper-column", $)
								.attr("data-swiper-row", L);
					}
					if ("none" !== z.css("display")) {
						if ("auto" === t.slidesPerView) {
							var I = Y.getComputedStyle(z[0], null),
								D = z[0].style.transform,
								O = z[0].style.webkitTransform;
							D && (z[0].style.transform = "none"),
								O && (z[0].style.webkitTransform = "none"),
								(T = t.roundLengths
									? e.isHorizontal()
										? z.outerWidth(!0)
										: z.outerHeight(!0)
									: e.isHorizontal()
									? z[0].getBoundingClientRect().width +
									  parseFloat(
											I.getPropertyValue("margin-left")
									  ) +
									  parseFloat(
											I.getPropertyValue("margin-right")
									  )
									: z[0].getBoundingClientRect().height +
									  parseFloat(
											I.getPropertyValue("margin-top")
									  ) +
									  parseFloat(
											I.getPropertyValue("margin-bottom")
									  )),
								D && (z[0].style.transform = D),
								O && (z[0].style.webkitTransform = O),
								t.roundLengths && (T = Math.floor(T));
						} else
							(T =
								(i - (t.slidesPerView - 1) * g) /
								t.slidesPerView),
								t.roundLengths && (T = Math.floor(T)),
								l[k] &&
									(e.isHorizontal()
										? (l[k].style.width = T + "px")
										: (l[k].style.height = T + "px"));
						l[k] && (l[k].swiperSlideSize = T),
							u.push(T),
							t.centeredSlides
								? ((b = b + T / 2 + w / 2 + g),
								  0 === w && 0 !== k && (b = b - i / 2 - g),
								  0 === k && (b = b - i / 2 - g),
								  Math.abs(b) < 0.001 && (b = 0),
								  t.roundLengths && (b = Math.floor(b)),
								  y % t.slidesPerGroup == 0 && p.push(b),
								  c.push(b))
								: (t.roundLengths && (b = Math.floor(b)),
								  y % t.slidesPerGroup == 0 && p.push(b),
								  c.push(b),
								  (b = b + T + g)),
							(e.virtualSize += T + g),
							(w = T),
							(y += 1);
					}
				}
				if (
					((e.virtualSize = Math.max(e.virtualSize, i) + v),
					s &&
						r &&
						("slide" === t.effect || "coverflow" === t.effect) &&
						a.css({ width: e.virtualSize + t.spaceBetween + "px" }),
					(R.flexbox && !t.setWrapperSize) ||
						(e.isHorizontal()
							? a.css({
									width:
										e.virtualSize + t.spaceBetween + "px",
							  })
							: a.css({
									height:
										e.virtualSize + t.spaceBetween + "px",
							  })),
					1 < t.slidesPerColumn &&
						((e.virtualSize = (T + t.spaceBetween) * x),
						(e.virtualSize =
							Math.ceil(e.virtualSize / t.slidesPerColumn) -
							t.spaceBetween),
						e.isHorizontal()
							? a.css({
									width:
										e.virtualSize + t.spaceBetween + "px",
							  })
							: a.css({
									height:
										e.virtualSize + t.spaceBetween + "px",
							  }),
						t.centeredSlides))
				) {
					E = [];
					for (var A = 0; A < p.length; A += 1) {
						var H = p[A];
						t.roundLengths && (H = Math.floor(H)),
							p[A] < e.virtualSize + p[0] && E.push(H);
					}
					p = E;
				}
				if (!t.centeredSlides) {
					E = [];
					for (var B = 0; B < p.length; B += 1) {
						var G = p[B];
						t.roundLengths && (G = Math.floor(G)),
							p[B] <= e.virtualSize - i && E.push(G);
					}
					(p = E),
						1 <
							Math.floor(e.virtualSize - i) -
								Math.floor(p[p.length - 1]) &&
							p.push(e.virtualSize - i);
				}
				if (
					(0 === p.length && (p = [0]),
					0 !== t.spaceBetween &&
						(e.isHorizontal()
							? s
								? l.css({ marginLeft: g + "px" })
								: l.css({ marginRight: g + "px" })
							: l.css({ marginBottom: g + "px" })),
					t.centerInsufficientSlides)
				) {
					var N = 0;
					if (
						(u.forEach(function (e) {
							N += e + (t.spaceBetween ? t.spaceBetween : 0);
						}),
						(N -= t.spaceBetween) < i)
					) {
						var X = (i - N) / 2;
						p.forEach(function (e, t) {
							p[t] = e - X;
						}),
							c.forEach(function (e, t) {
								c[t] = e + X;
							});
					}
				}
				V.extend(e, {
					slides: l,
					snapGrid: p,
					slidesGrid: c,
					slidesSizesGrid: u,
				}),
					d !== o && e.emit("slidesLengthChange"),
					p.length !== f &&
						(e.params.watchOverflow && e.checkOverflow(),
						e.emit("snapGridLengthChange")),
					c.length !== m && e.emit("slidesGridLengthChange"),
					(t.watchSlidesProgress || t.watchSlidesVisibility) &&
						e.updateSlidesOffset();
			}
		},
		updateAutoHeight: function (e) {
			var t,
				a = this,
				i = [],
				s = 0;
			if (
				("number" == typeof e
					? a.setTransition(e)
					: !0 === e && a.setTransition(a.params.speed),
				"auto" !== a.params.slidesPerView && 1 < a.params.slidesPerView)
			)
				for (t = 0; t < Math.ceil(a.params.slidesPerView); t += 1) {
					var r = a.activeIndex + t;
					if (r > a.slides.length) break;
					i.push(a.slides.eq(r)[0]);
				}
			else i.push(a.slides.eq(a.activeIndex)[0]);
			for (t = 0; t < i.length; t += 1)
				if (void 0 !== i[t]) {
					var n = i[t].offsetHeight;
					s = s < n ? n : s;
				}
			s && a.$wrapperEl.css("height", s + "px");
		},
		updateSlidesOffset: function () {
			for (var e = this.slides, t = 0; t < e.length; t += 1)
				e[t].swiperSlideOffset = this.isHorizontal()
					? e[t].offsetLeft
					: e[t].offsetTop;
		},
		updateSlidesProgress: function (e) {
			void 0 === e && (e = (this && this.translate) || 0);
			var t = this,
				a = t.params,
				i = t.slides,
				s = t.rtlTranslate;
			if (0 !== i.length) {
				void 0 === i[0].swiperSlideOffset && t.updateSlidesOffset();
				var r = -e;
				s && (r = e),
					i.removeClass(a.slideVisibleClass),
					(t.visibleSlidesIndexes = []),
					(t.visibleSlides = []);
				for (var n = 0; n < i.length; n += 1) {
					var o = i[n],
						l =
							(r +
								(a.centeredSlides ? t.minTranslate() : 0) -
								o.swiperSlideOffset) /
							(o.swiperSlideSize + a.spaceBetween);
					if (a.watchSlidesVisibility) {
						var d = -(r - o.swiperSlideOffset),
							p = d + t.slidesSizesGrid[n];
						((0 <= d && d < t.size) ||
							(0 < p && p <= t.size) ||
							(d <= 0 && p >= t.size)) &&
							(t.visibleSlides.push(o),
							t.visibleSlidesIndexes.push(n),
							i.eq(n).addClass(a.slideVisibleClass));
					}
					o.progress = s ? -l : l;
				}
				t.visibleSlides = L(t.visibleSlides);
			}
		},
		updateProgress: function (e) {
			void 0 === e && (e = (this && this.translate) || 0);
			var t = this,
				a = t.params,
				i = t.maxTranslate() - t.minTranslate(),
				s = t.progress,
				r = t.isBeginning,
				n = t.isEnd,
				o = r,
				l = n;
			0 === i
				? (n = r = !(s = 0))
				: ((r = (s = (e - t.minTranslate()) / i) <= 0), (n = 1 <= s)),
				V.extend(t, { progress: s, isBeginning: r, isEnd: n }),
				(a.watchSlidesProgress || a.watchSlidesVisibility) &&
					t.updateSlidesProgress(e),
				r && !o && t.emit("reachBeginning toEdge"),
				n && !l && t.emit("reachEnd toEdge"),
				((o && !r) || (l && !n)) && t.emit("fromEdge"),
				t.emit("progress", s);
		},
		updateSlidesClasses: function () {
			var e,
				t = this,
				a = t.slides,
				i = t.params,
				s = t.$wrapperEl,
				r = t.activeIndex,
				n = t.realIndex,
				o = t.virtual && i.virtual.enabled;
			a.removeClass(
				i.slideActiveClass +
					" " +
					i.slideNextClass +
					" " +
					i.slidePrevClass +
					" " +
					i.slideDuplicateActiveClass +
					" " +
					i.slideDuplicateNextClass +
					" " +
					i.slideDuplicatePrevClass
			),
				(e = o
					? t.$wrapperEl.find(
							"." +
								i.slideClass +
								'[data-swiper-slide-index="' +
								r +
								'"]'
					  )
					: a.eq(r)).addClass(i.slideActiveClass),
				i.loop &&
					(e.hasClass(i.slideDuplicateClass)
						? s
								.children(
									"." +
										i.slideClass +
										":not(." +
										i.slideDuplicateClass +
										')[data-swiper-slide-index="' +
										n +
										'"]'
								)
								.addClass(i.slideDuplicateActiveClass)
						: s
								.children(
									"." +
										i.slideClass +
										"." +
										i.slideDuplicateClass +
										'[data-swiper-slide-index="' +
										n +
										'"]'
								)
								.addClass(i.slideDuplicateActiveClass));
			var l = e
				.nextAll("." + i.slideClass)
				.eq(0)
				.addClass(i.slideNextClass);
			i.loop &&
				0 === l.length &&
				(l = a.eq(0)).addClass(i.slideNextClass);
			var d = e
				.prevAll("." + i.slideClass)
				.eq(0)
				.addClass(i.slidePrevClass);
			i.loop &&
				0 === d.length &&
				(d = a.eq(-1)).addClass(i.slidePrevClass),
				i.loop &&
					(l.hasClass(i.slideDuplicateClass)
						? s
								.children(
									"." +
										i.slideClass +
										":not(." +
										i.slideDuplicateClass +
										')[data-swiper-slide-index="' +
										l.attr("data-swiper-slide-index") +
										'"]'
								)
								.addClass(i.slideDuplicateNextClass)
						: s
								.children(
									"." +
										i.slideClass +
										"." +
										i.slideDuplicateClass +
										'[data-swiper-slide-index="' +
										l.attr("data-swiper-slide-index") +
										'"]'
								)
								.addClass(i.slideDuplicateNextClass),
					d.hasClass(i.slideDuplicateClass)
						? s
								.children(
									"." +
										i.slideClass +
										":not(." +
										i.slideDuplicateClass +
										')[data-swiper-slide-index="' +
										d.attr("data-swiper-slide-index") +
										'"]'
								)
								.addClass(i.slideDuplicatePrevClass)
						: s
								.children(
									"." +
										i.slideClass +
										"." +
										i.slideDuplicateClass +
										'[data-swiper-slide-index="' +
										d.attr("data-swiper-slide-index") +
										'"]'
								)
								.addClass(i.slideDuplicatePrevClass));
		},
		updateActiveIndex: function (e) {
			var t,
				a = this,
				i = a.rtlTranslate ? a.translate : -a.translate,
				s = a.slidesGrid,
				r = a.snapGrid,
				n = a.params,
				o = a.activeIndex,
				l = a.realIndex,
				d = a.snapIndex,
				p = e;
			if (void 0 === p) {
				for (var c = 0; c < s.length; c += 1)
					void 0 !== s[c + 1]
						? i >= s[c] && i < s[c + 1] - (s[c + 1] - s[c]) / 2
							? (p = c)
							: i >= s[c] && i < s[c + 1] && (p = c + 1)
						: i >= s[c] && (p = c);
				n.normalizeSlideIndex && (p < 0 || void 0 === p) && (p = 0);
			}
			if (
				((t =
					0 <= r.indexOf(i)
						? r.indexOf(i)
						: Math.floor(p / n.slidesPerGroup)) >= r.length &&
					(t = r.length - 1),
				p !== o)
			) {
				var u = parseInt(
					a.slides.eq(p).attr("data-swiper-slide-index") || p,
					10
				);
				V.extend(a, {
					snapIndex: t,
					realIndex: u,
					previousIndex: o,
					activeIndex: p,
				}),
					a.emit("activeIndexChange"),
					a.emit("snapIndexChange"),
					l !== u && a.emit("realIndexChange"),
					a.emit("slideChange");
			} else t !== d && ((a.snapIndex = t), a.emit("snapIndexChange"));
		},
		updateClickedSlide: function (e) {
			var t = this,
				a = t.params,
				i = L(e.target).closest("." + a.slideClass)[0],
				s = !1;
			if (i)
				for (var r = 0; r < t.slides.length; r += 1)
					t.slides[r] === i && (s = !0);
			if (!i || !s)
				return (
					(t.clickedSlide = void 0), void (t.clickedIndex = void 0)
				);
			(t.clickedSlide = i),
				t.virtual && t.params.virtual.enabled
					? (t.clickedIndex = parseInt(
							L(i).attr("data-swiper-slide-index"),
							10
					  ))
					: (t.clickedIndex = L(i).index()),
				a.slideToClickedSlide &&
					void 0 !== t.clickedIndex &&
					t.clickedIndex !== t.activeIndex &&
					t.slideToClickedSlide();
		},
	};
	var d = {
		getTranslate: function (e) {
			void 0 === e && (e = this.isHorizontal() ? "x" : "y");
			var t = this.params,
				a = this.rtlTranslate,
				i = this.translate,
				s = this.$wrapperEl;
			if (t.virtualTranslate) return a ? -i : i;
			var r = V.getTranslate(s[0], e);
			return a && (r = -r), r || 0;
		},
		setTranslate: function (e, t) {
			var a = this,
				i = a.rtlTranslate,
				s = a.params,
				r = a.$wrapperEl,
				n = a.progress,
				o = 0,
				l = 0;
			a.isHorizontal() ? (o = i ? -e : e) : (l = e),
				s.roundLengths && ((o = Math.floor(o)), (l = Math.floor(l))),
				s.virtualTranslate ||
					(R.transforms3d
						? r.transform(
								"translate3d(" + o + "px, " + l + "px, 0px)"
						  )
						: r.transform("translate(" + o + "px, " + l + "px)")),
				(a.previousTranslate = a.translate),
				(a.translate = a.isHorizontal() ? o : l);
			var d = a.maxTranslate() - a.minTranslate();
			(0 === d ? 0 : (e - a.minTranslate()) / d) !== n &&
				a.updateProgress(e),
				a.emit("setTranslate", a.translate, t);
		},
		minTranslate: function () {
			return -this.snapGrid[0];
		},
		maxTranslate: function () {
			return -this.snapGrid[this.snapGrid.length - 1];
		},
	};
	var p = {
		setTransition: function (e, t) {
			this.$wrapperEl.transition(e), this.emit("setTransition", e, t);
		},
		transitionStart: function (e, t) {
			void 0 === e && (e = !0);
			var a = this,
				i = a.activeIndex,
				s = a.params,
				r = a.previousIndex;
			s.autoHeight && a.updateAutoHeight();
			var n = t;
			if (
				(n || (n = r < i ? "next" : i < r ? "prev" : "reset"),
				a.emit("transitionStart"),
				e && i !== r)
			) {
				if ("reset" === n)
					return void a.emit("slideResetTransitionStart");
				a.emit("slideChangeTransitionStart"),
					"next" === n
						? a.emit("slideNextTransitionStart")
						: a.emit("slidePrevTransitionStart");
			}
		},
		transitionEnd: function (e, t) {
			void 0 === e && (e = !0);
			var a = this,
				i = a.activeIndex,
				s = a.previousIndex;
			(a.animating = !1), a.setTransition(0);
			var r = t;
			if (
				(r || (r = s < i ? "next" : i < s ? "prev" : "reset"),
				a.emit("transitionEnd"),
				e && i !== s)
			) {
				if ("reset" === r)
					return void a.emit("slideResetTransitionEnd");
				a.emit("slideChangeTransitionEnd"),
					"next" === r
						? a.emit("slideNextTransitionEnd")
						: a.emit("slidePrevTransitionEnd");
			}
		},
	};
	var c = {
		slideTo: function (e, t, a, i) {
			void 0 === e && (e = 0),
				void 0 === t && (t = this.params.speed),
				void 0 === a && (a = !0);
			var s = this,
				r = e;
			r < 0 && (r = 0);
			var n = s.params,
				o = s.snapGrid,
				l = s.slidesGrid,
				d = s.previousIndex,
				p = s.activeIndex,
				c = s.rtlTranslate;
			if (s.animating && n.preventInteractionOnTransition) return !1;
			var u = Math.floor(r / n.slidesPerGroup);
			u >= o.length && (u = o.length - 1),
				(p || n.initialSlide || 0) === (d || 0) &&
					a &&
					s.emit("beforeSlideChangeStart");
			var h,
				v = -o[u];
			if ((s.updateProgress(v), n.normalizeSlideIndex))
				for (var f = 0; f < l.length; f += 1)
					-Math.floor(100 * v) >= Math.floor(100 * l[f]) && (r = f);
			if (s.initialized && r !== p) {
				if (
					!s.allowSlideNext &&
					v < s.translate &&
					v < s.minTranslate()
				)
					return !1;
				if (
					!s.allowSlidePrev &&
					v > s.translate &&
					v > s.maxTranslate() &&
					(p || 0) !== r
				)
					return !1;
			}
			return (
				(h = p < r ? "next" : r < p ? "prev" : "reset"),
				(c && -v === s.translate) || (!c && v === s.translate)
					? (s.updateActiveIndex(r),
					  n.autoHeight && s.updateAutoHeight(),
					  s.updateSlidesClasses(),
					  "slide" !== n.effect && s.setTranslate(v),
					  "reset" !== h &&
							(s.transitionStart(a, h), s.transitionEnd(a, h)),
					  !1)
					: (0 !== t && R.transition
							? (s.setTransition(t),
							  s.setTranslate(v),
							  s.updateActiveIndex(r),
							  s.updateSlidesClasses(),
							  s.emit("beforeTransitionStart", t, i),
							  s.transitionStart(a, h),
							  s.animating ||
									((s.animating = !0),
									s.onSlideToWrapperTransitionEnd ||
										(s.onSlideToWrapperTransitionEnd =
											function (e) {
												s &&
													!s.destroyed &&
													e.target === this &&
													(s.$wrapperEl[0].removeEventListener(
														"transitionend",
														s.onSlideToWrapperTransitionEnd
													),
													s.$wrapperEl[0].removeEventListener(
														"webkitTransitionEnd",
														s.onSlideToWrapperTransitionEnd
													),
													(s.onSlideToWrapperTransitionEnd =
														null),
													delete s.onSlideToWrapperTransitionEnd,
													s.transitionEnd(a, h));
											}),
									s.$wrapperEl[0].addEventListener(
										"transitionend",
										s.onSlideToWrapperTransitionEnd
									),
									s.$wrapperEl[0].addEventListener(
										"webkitTransitionEnd",
										s.onSlideToWrapperTransitionEnd
									)))
							: (s.setTransition(0),
							  s.setTranslate(v),
							  s.updateActiveIndex(r),
							  s.updateSlidesClasses(),
							  s.emit("beforeTransitionStart", t, i),
							  s.transitionStart(a, h),
							  s.transitionEnd(a, h)),
					  !0)
			);
		},
		slideToLoop: function (e, t, a, i) {
			void 0 === e && (e = 0),
				void 0 === t && (t = this.params.speed),
				void 0 === a && (a = !0);
			var s = e;
			return (
				this.params.loop && (s += this.loopedSlides),
				this.slideTo(s, t, a, i)
			);
		},
		slideNext: function (e, t, a) {
			void 0 === e && (e = this.params.speed), void 0 === t && (t = !0);
			var i = this,
				s = i.params,
				r = i.animating;
			return s.loop
				? !r &&
						(i.loopFix(),
						(i._clientLeft = i.$wrapperEl[0].clientLeft),
						i.slideTo(i.activeIndex + s.slidesPerGroup, e, t, a))
				: i.slideTo(i.activeIndex + s.slidesPerGroup, e, t, a);
		},
		slidePrev: function (e, t, a) {
			void 0 === e && (e = this.params.speed), void 0 === t && (t = !0);
			var i = this,
				s = i.params,
				r = i.animating,
				n = i.snapGrid,
				o = i.slidesGrid,
				l = i.rtlTranslate;
			if (s.loop) {
				if (r) return !1;
				i.loopFix(), (i._clientLeft = i.$wrapperEl[0].clientLeft);
			}
			function d(e) {
				return e < 0 ? -Math.floor(Math.abs(e)) : Math.floor(e);
			}
			var p,
				c = d(l ? i.translate : -i.translate),
				u = n.map(function (e) {
					return d(e);
				}),
				h =
					(o.map(function (e) {
						return d(e);
					}),
					n[u.indexOf(c)],
					n[u.indexOf(c) - 1]);
			return (
				void 0 !== h &&
					(p = o.indexOf(h)) < 0 &&
					(p = i.activeIndex - 1),
				i.slideTo(p, e, t, a)
			);
		},
		slideReset: function (e, t, a) {
			return (
				void 0 === e && (e = this.params.speed),
				void 0 === t && (t = !0),
				this.slideTo(this.activeIndex, e, t, a)
			);
		},
		slideToClosest: function (e, t, a) {
			void 0 === e && (e = this.params.speed), void 0 === t && (t = !0);
			var i = this,
				s = i.activeIndex,
				r = Math.floor(s / i.params.slidesPerGroup);
			if (r < i.snapGrid.length - 1) {
				var n = i.rtlTranslate ? i.translate : -i.translate,
					o = i.snapGrid[r];
				(i.snapGrid[r + 1] - o) / 2 < n - o &&
					(s = i.params.slidesPerGroup);
			}
			return i.slideTo(s, e, t, a);
		},
		slideToClickedSlide: function () {
			var e,
				t = this,
				a = t.params,
				i = t.$wrapperEl,
				s =
					"auto" === a.slidesPerView
						? t.slidesPerViewDynamic()
						: a.slidesPerView,
				r = t.clickedIndex;
			if (a.loop) {
				if (t.animating) return;
				(e = parseInt(
					L(t.clickedSlide).attr("data-swiper-slide-index"),
					10
				)),
					a.centeredSlides
						? r < t.loopedSlides - s / 2 ||
						  r > t.slides.length - t.loopedSlides + s / 2
							? (t.loopFix(),
							  (r = i
									.children(
										"." +
											a.slideClass +
											'[data-swiper-slide-index="' +
											e +
											'"]:not(.' +
											a.slideDuplicateClass +
											")"
									)
									.eq(0)
									.index()),
							  V.nextTick(function () {
									t.slideTo(r);
							  }))
							: t.slideTo(r)
						: r > t.slides.length - s
						? (t.loopFix(),
						  (r = i
								.children(
									"." +
										a.slideClass +
										'[data-swiper-slide-index="' +
										e +
										'"]:not(.' +
										a.slideDuplicateClass +
										")"
								)
								.eq(0)
								.index()),
						  V.nextTick(function () {
								t.slideTo(r);
						  }))
						: t.slideTo(r);
			} else t.slideTo(r);
		},
	};
	var u = {
		loopCreate: function () {
			var i = this,
				e = i.params,
				t = i.$wrapperEl;
			t.children(
				"." + e.slideClass + "." + e.slideDuplicateClass
			).remove();
			var s = t.children("." + e.slideClass);
			if (e.loopFillGroupWithBlank) {
				var a = e.slidesPerGroup - (s.length % e.slidesPerGroup);
				if (a !== e.slidesPerGroup) {
					for (var r = 0; r < a; r += 1) {
						var n = L(f.createElement("div")).addClass(
							e.slideClass + " " + e.slideBlankClass
						);
						t.append(n);
					}
					s = t.children("." + e.slideClass);
				}
			}
			"auto" !== e.slidesPerView ||
				e.loopedSlides ||
				(e.loopedSlides = s.length),
				(i.loopedSlides = parseInt(
					e.loopedSlides || e.slidesPerView,
					10
				)),
				(i.loopedSlides += e.loopAdditionalSlides),
				i.loopedSlides > s.length && (i.loopedSlides = s.length);
			var o = [],
				l = [];
			s.each(function (e, t) {
				var a = L(t);
				e < i.loopedSlides && l.push(t),
					e < s.length && e >= s.length - i.loopedSlides && o.push(t),
					a.attr("data-swiper-slide-index", e);
			});
			for (var d = 0; d < l.length; d += 1)
				t.append(L(l[d].cloneNode(!0)).addClass(e.slideDuplicateClass));
			for (var p = o.length - 1; 0 <= p; p -= 1)
				t.prepend(
					L(o[p].cloneNode(!0)).addClass(e.slideDuplicateClass)
				);
		},
		loopFix: function () {
			var e,
				t = this,
				a = t.params,
				i = t.activeIndex,
				s = t.slides,
				r = t.loopedSlides,
				n = t.allowSlidePrev,
				o = t.allowSlideNext,
				l = t.snapGrid,
				d = t.rtlTranslate;
			(t.allowSlidePrev = !0), (t.allowSlideNext = !0);
			var p = -l[i] - t.getTranslate();
			i < r
				? ((e = s.length - 3 * r + i),
				  (e += r),
				  t.slideTo(e, 0, !1, !0) &&
						0 !== p &&
						t.setTranslate((d ? -t.translate : t.translate) - p))
				: (("auto" === a.slidesPerView && 2 * r <= i) ||
						i >= s.length - r) &&
				  ((e = -s.length + i + r),
				  (e += r),
				  t.slideTo(e, 0, !1, !0) &&
						0 !== p &&
						t.setTranslate((d ? -t.translate : t.translate) - p));
			(t.allowSlidePrev = n), (t.allowSlideNext = o);
		},
		loopDestroy: function () {
			var e = this.$wrapperEl,
				t = this.params,
				a = this.slides;
			e
				.children("." + t.slideClass + "." + t.slideDuplicateClass)
				.remove(),
				a.removeAttr("data-swiper-slide-index");
		},
	};
	var h = {
		setGrabCursor: function (e) {
			if (
				!(
					R.touch ||
					!this.params.simulateTouch ||
					(this.params.watchOverflow && this.isLocked)
				)
			) {
				var t = this.el;
				(t.style.cursor = "move"),
					(t.style.cursor = e ? "-webkit-grabbing" : "-webkit-grab"),
					(t.style.cursor = e ? "-moz-grabbin" : "-moz-grab"),
					(t.style.cursor = e ? "grabbing" : "grab");
			}
		},
		unsetGrabCursor: function () {
			R.touch ||
				(this.params.watchOverflow && this.isLocked) ||
				(this.el.style.cursor = "");
		},
	};
	var v = {
			appendSlide: function (e) {
				var t = this,
					a = t.$wrapperEl,
					i = t.params;
				if (
					(i.loop && t.loopDestroy(),
					"object" == typeof e && "length" in e)
				)
					for (var s = 0; s < e.length; s += 1)
						e[s] && a.append(e[s]);
				else a.append(e);
				i.loop && t.loopCreate(),
					(i.observer && R.observer) || t.update();
			},
			prependSlide: function (e) {
				var t = this,
					a = t.params,
					i = t.$wrapperEl,
					s = t.activeIndex;
				a.loop && t.loopDestroy();
				var r = s + 1;
				if ("object" == typeof e && "length" in e) {
					for (var n = 0; n < e.length; n += 1)
						e[n] && i.prepend(e[n]);
					r = s + e.length;
				} else i.prepend(e);
				a.loop && t.loopCreate(),
					(a.observer && R.observer) || t.update(),
					t.slideTo(r, 0, !1);
			},
			addSlide: function (e, t) {
				var a = this,
					i = a.$wrapperEl,
					s = a.params,
					r = a.activeIndex;
				s.loop &&
					((r -= a.loopedSlides),
					a.loopDestroy(),
					(a.slides = i.children("." + s.slideClass)));
				var n = a.slides.length;
				if (e <= 0) a.prependSlide(t);
				else if (n <= e) a.appendSlide(t);
				else {
					for (
						var o = e < r ? r + 1 : r, l = [], d = n - 1;
						e <= d;
						d -= 1
					) {
						var p = a.slides.eq(d);
						p.remove(), l.unshift(p);
					}
					if ("object" == typeof t && "length" in t) {
						for (var c = 0; c < t.length; c += 1)
							t[c] && i.append(t[c]);
						o = e < r ? r + t.length : r;
					} else i.append(t);
					for (var u = 0; u < l.length; u += 1) i.append(l[u]);
					s.loop && a.loopCreate(),
						(s.observer && R.observer) || a.update(),
						s.loop
							? a.slideTo(o + a.loopedSlides, 0, !1)
							: a.slideTo(o, 0, !1);
				}
			},
			removeSlide: function (e) {
				var t = this,
					a = t.params,
					i = t.$wrapperEl,
					s = t.activeIndex;
				a.loop &&
					((s -= t.loopedSlides),
					t.loopDestroy(),
					(t.slides = i.children("." + a.slideClass)));
				var r,
					n = s;
				if ("object" == typeof e && "length" in e) {
					for (var o = 0; o < e.length; o += 1)
						(r = e[o]),
							t.slides[r] && t.slides.eq(r).remove(),
							r < n && (n -= 1);
					n = Math.max(n, 0);
				} else
					(r = e),
						t.slides[r] && t.slides.eq(r).remove(),
						r < n && (n -= 1),
						(n = Math.max(n, 0));
				a.loop && t.loopCreate(),
					(a.observer && R.observer) || t.update(),
					a.loop
						? t.slideTo(n + t.loopedSlides, 0, !1)
						: t.slideTo(n, 0, !1);
			},
			removeAllSlides: function () {
				for (var e = [], t = 0; t < this.slides.length; t += 1)
					e.push(t);
				this.removeSlide(e);
			},
		},
		m = (function () {
			var e = Y.navigator.userAgent,
				t = {
					ios: !1,
					android: !1,
					androidChrome: !1,
					desktop: !1,
					windows: !1,
					iphone: !1,
					ipod: !1,
					ipad: !1,
					cordova: Y.cordova || Y.phonegap,
					phonegap: Y.cordova || Y.phonegap,
				},
				a = e.match(/(Windows Phone);?[\s\/]+([\d.]+)?/),
				i = e.match(/(Android);?[\s\/]+([\d.]+)?/),
				s = e.match(/(iPad).*OS\s([\d_]+)/),
				r = e.match(/(iPod)(.*OS\s([\d_]+))?/),
				n = !s && e.match(/(iPhone\sOS|iOS)\s([\d_]+)/);
			if (
				(a &&
					((t.os = "windows"),
					(t.osVersion = a[2]),
					(t.windows = !0)),
				i &&
					!a &&
					((t.os = "android"),
					(t.osVersion = i[2]),
					(t.android = !0),
					(t.androidChrome = 0 <= e.toLowerCase().indexOf("chrome"))),
				(s || n || r) && ((t.os = "ios"), (t.ios = !0)),
				n &&
					!r &&
					((t.osVersion = n[2].replace(/_/g, ".")), (t.iphone = !0)),
				s && ((t.osVersion = s[2].replace(/_/g, ".")), (t.ipad = !0)),
				r &&
					((t.osVersion = r[3] ? r[3].replace(/_/g, ".") : null),
					(t.iphone = !0)),
				t.ios &&
					t.osVersion &&
					0 <= e.indexOf("Version/") &&
					"10" === t.osVersion.split(".")[0] &&
					(t.osVersion = e
						.toLowerCase()
						.split("version/")[1]
						.split(" ")[0]),
				(t.desktop = !(t.os || t.android || t.webView)),
				(t.webView =
					(n || s || r) && e.match(/.*AppleWebKit(?!.*Safari)/i)),
				t.os && "ios" === t.os)
			) {
				var o = t.osVersion.split("."),
					l = f.querySelector('meta[name="viewport"]');
				t.minimalUi =
					!t.webView &&
					(r || n) &&
					(1 * o[0] == 7 ? 1 <= 1 * o[1] : 7 < 1 * o[0]) &&
					l &&
					0 <= l.getAttribute("content").indexOf("minimal-ui");
			}
			return (t.pixelRatio = Y.devicePixelRatio || 1), t;
		})();
	function g() {
		var e = this,
			t = e.params,
			a = e.el;
		if (!a || 0 !== a.offsetWidth) {
			t.breakpoints && e.setBreakpoint();
			var i = e.allowSlideNext,
				s = e.allowSlidePrev,
				r = e.snapGrid;
			if (
				((e.allowSlideNext = !0),
				(e.allowSlidePrev = !0),
				e.updateSize(),
				e.updateSlides(),
				t.freeMode)
			) {
				var n = Math.min(
					Math.max(e.translate, e.maxTranslate()),
					e.minTranslate()
				);
				e.setTranslate(n),
					e.updateActiveIndex(),
					e.updateSlidesClasses(),
					t.autoHeight && e.updateAutoHeight();
			} else
				e.updateSlidesClasses(),
					("auto" === t.slidesPerView || 1 < t.slidesPerView) &&
					e.isEnd &&
					!e.params.centeredSlides
						? e.slideTo(e.slides.length - 1, 0, !1, !0)
						: e.slideTo(e.activeIndex, 0, !1, !0);
			(e.allowSlidePrev = s),
				(e.allowSlideNext = i),
				e.params.watchOverflow && r !== e.snapGrid && e.checkOverflow();
		}
	}
	var b = {
		attachEvents: function () {
			var e = this,
				t = e.params,
				a = e.touchEvents,
				i = e.el,
				s = e.wrapperEl;
			(e.onTouchStart = function (e) {
				var t = this,
					a = t.touchEventsData,
					i = t.params,
					s = t.touches;
				if (!t.animating || !i.preventInteractionOnTransition) {
					var r = e;
					if (
						(r.originalEvent && (r = r.originalEvent),
						(a.isTouchEvent = "touchstart" === r.type),
						(a.isTouchEvent || !("which" in r) || 3 !== r.which) &&
							!(
								(!a.isTouchEvent &&
									"button" in r &&
									0 < r.button) ||
								(a.isTouched && a.isMoved)
							))
					)
						if (
							i.noSwiping &&
							L(r.target).closest(
								i.noSwipingSelector
									? i.noSwipingSelector
									: "." + i.noSwipingClass
							)[0]
						)
							t.allowClick = !0;
						else if (
							!i.swipeHandler ||
							L(r).closest(i.swipeHandler)[0]
						) {
							(s.currentX =
								"touchstart" === r.type
									? r.targetTouches[0].pageX
									: r.pageX),
								(s.currentY =
									"touchstart" === r.type
										? r.targetTouches[0].pageY
										: r.pageY);
							var n = s.currentX,
								o = s.currentY,
								l =
									i.edgeSwipeDetection ||
									i.iOSEdgeSwipeDetection,
								d =
									i.edgeSwipeThreshold ||
									i.iOSEdgeSwipeThreshold;
							if (!l || !(n <= d || n >= Y.screen.width - d)) {
								if (
									(V.extend(a, {
										isTouched: !0,
										isMoved: !1,
										allowTouchCallbacks: !0,
										isScrolling: void 0,
										startMoving: void 0,
									}),
									(s.startX = n),
									(s.startY = o),
									(a.touchStartTime = V.now()),
									(t.allowClick = !0),
									t.updateSize(),
									(t.swipeDirection = void 0),
									0 < i.threshold &&
										(a.allowThresholdMove = !1),
									"touchstart" !== r.type)
								) {
									var p = !0;
									L(r.target).is(a.formElements) && (p = !1),
										f.activeElement &&
											L(f.activeElement).is(
												a.formElements
											) &&
											f.activeElement !== r.target &&
											f.activeElement.blur(),
										p &&
											t.allowTouchMove &&
											i.touchStartPreventDefault &&
											r.preventDefault();
								}
								t.emit("touchStart", r);
							}
						}
				}
			}.bind(e)),
				(e.onTouchMove = function (e) {
					var t = this,
						a = t.touchEventsData,
						i = t.params,
						s = t.touches,
						r = t.rtlTranslate,
						n = e;
					if (
						(n.originalEvent && (n = n.originalEvent), a.isTouched)
					) {
						if (!a.isTouchEvent || "mousemove" !== n.type) {
							var o =
									"touchmove" === n.type
										? n.targetTouches[0].pageX
										: n.pageX,
								l =
									"touchmove" === n.type
										? n.targetTouches[0].pageY
										: n.pageY;
							if (n.preventedByNestedSwiper)
								return (s.startX = o), void (s.startY = l);
							if (!t.allowTouchMove)
								return (
									(t.allowClick = !1),
									void (
										a.isTouched &&
										(V.extend(s, {
											startX: o,
											startY: l,
											currentX: o,
											currentY: l,
										}),
										(a.touchStartTime = V.now()))
									)
								);
							if (
								a.isTouchEvent &&
								i.touchReleaseOnEdges &&
								!i.loop
							)
								if (t.isVertical()) {
									if (
										(l < s.startY &&
											t.translate <= t.maxTranslate()) ||
										(l > s.startY &&
											t.translate >= t.minTranslate())
									)
										return (
											(a.isTouched = !1),
											void (a.isMoved = !1)
										);
								} else if (
									(o < s.startX &&
										t.translate <= t.maxTranslate()) ||
									(o > s.startX &&
										t.translate >= t.minTranslate())
								)
									return;
							if (
								a.isTouchEvent &&
								f.activeElement &&
								n.target === f.activeElement &&
								L(n.target).is(a.formElements)
							)
								return (
									(a.isMoved = !0), void (t.allowClick = !1)
								);
							if (
								(a.allowTouchCallbacks &&
									t.emit("touchMove", n),
								!(
									n.targetTouches &&
									1 < n.targetTouches.length
								))
							) {
								(s.currentX = o), (s.currentY = l);
								var d,
									p = s.currentX - s.startX,
									c = s.currentY - s.startY;
								if (
									!(
										t.params.threshold &&
										Math.sqrt(
											Math.pow(p, 2) + Math.pow(c, 2)
										) < t.params.threshold
									)
								)
									if (
										(void 0 === a.isScrolling &&
											((t.isHorizontal() &&
												s.currentY === s.startY) ||
											(t.isVertical() &&
												s.currentX === s.startX)
												? (a.isScrolling = !1)
												: 25 <= p * p + c * c &&
												  ((d =
														(180 *
															Math.atan2(
																Math.abs(c),
																Math.abs(p)
															)) /
														Math.PI),
												  (a.isScrolling =
														t.isHorizontal()
															? d > i.touchAngle
															: 90 - d >
															  i.touchAngle))),
										a.isScrolling &&
											t.emit("touchMoveOpposite", n),
										void 0 === a.startMoving &&
											((s.currentX === s.startX &&
												s.currentY === s.startY) ||
												(a.startMoving = !0)),
										a.isScrolling)
									)
										a.isTouched = !1;
									else if (a.startMoving) {
										(t.allowClick = !1),
											n.preventDefault(),
											i.touchMoveStopPropagation &&
												!i.nested &&
												n.stopPropagation(),
											a.isMoved ||
												(i.loop && t.loopFix(),
												(a.startTranslate =
													t.getTranslate()),
												t.setTransition(0),
												t.animating &&
													t.$wrapperEl.trigger(
														"webkitTransitionEnd transitionend"
													),
												(a.allowMomentumBounce = !1),
												!i.grabCursor ||
													(!0 !== t.allowSlideNext &&
														!0 !==
															t.allowSlidePrev) ||
													t.setGrabCursor(!0),
												t.emit("sliderFirstMove", n)),
											t.emit("sliderMove", n),
											(a.isMoved = !0);
										var u = t.isHorizontal() ? p : c;
										(s.diff = u),
											(u *= i.touchRatio),
											r && (u = -u),
											(t.swipeDirection =
												0 < u ? "prev" : "next"),
											(a.currentTranslate =
												u + a.startTranslate);
										var h = !0,
											v = i.resistanceRatio;
										if (
											(i.touchReleaseOnEdges && (v = 0),
											0 < u &&
											a.currentTranslate >
												t.minTranslate()
												? ((h = !1),
												  i.resistance &&
														(a.currentTranslate =
															t.minTranslate() -
															1 +
															Math.pow(
																-t.minTranslate() +
																	a.startTranslate +
																	u,
																v
															)))
												: u < 0 &&
												  a.currentTranslate <
														t.maxTranslate() &&
												  ((h = !1),
												  i.resistance &&
														(a.currentTranslate =
															t.maxTranslate() +
															1 -
															Math.pow(
																t.maxTranslate() -
																	a.startTranslate -
																	u,
																v
															))),
											h &&
												(n.preventedByNestedSwiper =
													!0),
											!t.allowSlideNext &&
												"next" === t.swipeDirection &&
												a.currentTranslate <
													a.startTranslate &&
												(a.currentTranslate =
													a.startTranslate),
											!t.allowSlidePrev &&
												"prev" === t.swipeDirection &&
												a.currentTranslate >
													a.startTranslate &&
												(a.currentTranslate =
													a.startTranslate),
											0 < i.threshold)
										) {
											if (
												!(
													Math.abs(u) > i.threshold ||
													a.allowThresholdMove
												)
											)
												return void (a.currentTranslate =
													a.startTranslate);
											if (!a.allowThresholdMove)
												return (
													(a.allowThresholdMove = !0),
													(s.startX = s.currentX),
													(s.startY = s.currentY),
													(a.currentTranslate =
														a.startTranslate),
													void (s.diff =
														t.isHorizontal()
															? s.currentX -
															  s.startX
															: s.currentY -
															  s.startY)
												);
										}
										i.followFinger &&
											((i.freeMode ||
												i.watchSlidesProgress ||
												i.watchSlidesVisibility) &&
												(t.updateActiveIndex(),
												t.updateSlidesClasses()),
											i.freeMode &&
												(0 === a.velocities.length &&
													a.velocities.push({
														position:
															s[
																t.isHorizontal()
																	? "startX"
																	: "startY"
															],
														time: a.touchStartTime,
													}),
												a.velocities.push({
													position:
														s[
															t.isHorizontal()
																? "currentX"
																: "currentY"
														],
													time: V.now(),
												})),
											t.updateProgress(
												a.currentTranslate
											),
											t.setTranslate(a.currentTranslate));
									}
							}
						}
					} else
						a.startMoving &&
							a.isScrolling &&
							t.emit("touchMoveOpposite", n);
				}.bind(e)),
				(e.onTouchEnd = function (e) {
					var t = this,
						a = t.touchEventsData,
						i = t.params,
						s = t.touches,
						r = t.rtlTranslate,
						n = t.$wrapperEl,
						o = t.slidesGrid,
						l = t.snapGrid,
						d = e;
					if (
						(d.originalEvent && (d = d.originalEvent),
						a.allowTouchCallbacks && t.emit("touchEnd", d),
						(a.allowTouchCallbacks = !1),
						!a.isTouched)
					)
						return (
							a.isMoved && i.grabCursor && t.setGrabCursor(!1),
							(a.isMoved = !1),
							void (a.startMoving = !1)
						);
					i.grabCursor &&
						a.isMoved &&
						a.isTouched &&
						(!0 === t.allowSlideNext || !0 === t.allowSlidePrev) &&
						t.setGrabCursor(!1);
					var p,
						c = V.now(),
						u = c - a.touchStartTime;
					if (
						(t.allowClick &&
							(t.updateClickedSlide(d),
							t.emit("tap", d),
							u < 300 &&
								300 < c - a.lastClickTime &&
								(a.clickTimeout && clearTimeout(a.clickTimeout),
								(a.clickTimeout = V.nextTick(function () {
									t && !t.destroyed && t.emit("click", d);
								}, 300))),
							u < 300 &&
								c - a.lastClickTime < 300 &&
								(a.clickTimeout && clearTimeout(a.clickTimeout),
								t.emit("doubleTap", d))),
						(a.lastClickTime = V.now()),
						V.nextTick(function () {
							t.destroyed || (t.allowClick = !0);
						}),
						!a.isTouched ||
							!a.isMoved ||
							!t.swipeDirection ||
							0 === s.diff ||
							a.currentTranslate === a.startTranslate)
					)
						return (
							(a.isTouched = !1),
							(a.isMoved = !1),
							void (a.startMoving = !1)
						);
					if (
						((a.isTouched = !1),
						(a.isMoved = !1),
						(a.startMoving = !1),
						(p = i.followFinger
							? r
								? t.translate
								: -t.translate
							: -a.currentTranslate),
						i.freeMode)
					) {
						if (p < -t.minTranslate())
							return void t.slideTo(t.activeIndex);
						if (p > -t.maxTranslate())
							return void (t.slides.length < l.length
								? t.slideTo(l.length - 1)
								: t.slideTo(t.slides.length - 1));
						if (i.freeModeMomentum) {
							if (1 < a.velocities.length) {
								var h = a.velocities.pop(),
									v = a.velocities.pop(),
									f = h.position - v.position,
									m = h.time - v.time;
								(t.velocity = f / m),
									(t.velocity /= 2),
									Math.abs(t.velocity) <
										i.freeModeMinimumVelocity &&
										(t.velocity = 0),
									(150 < m || 300 < V.now() - h.time) &&
										(t.velocity = 0);
							} else t.velocity = 0;
							(t.velocity *= i.freeModeMomentumVelocityRatio),
								(a.velocities.length = 0);
							var g = 1e3 * i.freeModeMomentumRatio,
								b = t.velocity * g,
								w = t.translate + b;
							r && (w = -w);
							var y,
								x,
								T = !1,
								E =
									20 *
									Math.abs(t.velocity) *
									i.freeModeMomentumBounceRatio;
							if (w < t.maxTranslate())
								i.freeModeMomentumBounce
									? (w + t.maxTranslate() < -E &&
											(w = t.maxTranslate() - E),
									  (y = t.maxTranslate()),
									  (T = !0),
									  (a.allowMomentumBounce = !0))
									: (w = t.maxTranslate()),
									i.loop && i.centeredSlides && (x = !0);
							else if (w > t.minTranslate())
								i.freeModeMomentumBounce
									? (w - t.minTranslate() > E &&
											(w = t.minTranslate() + E),
									  (y = t.minTranslate()),
									  (T = !0),
									  (a.allowMomentumBounce = !0))
									: (w = t.minTranslate()),
									i.loop && i.centeredSlides && (x = !0);
							else if (i.freeModeSticky) {
								for (var S, C = 0; C < l.length; C += 1)
									if (l[C] > -w) {
										S = C;
										break;
									}
								w = -(w =
									Math.abs(l[S] - w) <
										Math.abs(l[S - 1] - w) ||
									"next" === t.swipeDirection
										? l[S]
										: l[S - 1]);
							}
							if (
								(x &&
									t.once("transitionEnd", function () {
										t.loopFix();
									}),
								0 !== t.velocity)
							)
								g = r
									? Math.abs((-w - t.translate) / t.velocity)
									: Math.abs((w - t.translate) / t.velocity);
							else if (i.freeModeSticky)
								return void t.slideToClosest();
							i.freeModeMomentumBounce && T
								? (t.updateProgress(y),
								  t.setTransition(g),
								  t.setTranslate(w),
								  t.transitionStart(!0, t.swipeDirection),
								  (t.animating = !0),
								  n.transitionEnd(function () {
										t &&
											!t.destroyed &&
											a.allowMomentumBounce &&
											(t.emit("momentumBounce"),
											t.setTransition(i.speed),
											t.setTranslate(y),
											n.transitionEnd(function () {
												t &&
													!t.destroyed &&
													t.transitionEnd();
											}));
								  }))
								: t.velocity
								? (t.updateProgress(w),
								  t.setTransition(g),
								  t.setTranslate(w),
								  t.transitionStart(!0, t.swipeDirection),
								  t.animating ||
										((t.animating = !0),
										n.transitionEnd(function () {
											t &&
												!t.destroyed &&
												t.transitionEnd();
										})))
								: t.updateProgress(w),
								t.updateActiveIndex(),
								t.updateSlidesClasses();
						} else if (i.freeModeSticky)
							return void t.slideToClosest();
						(!i.freeModeMomentum || u >= i.longSwipesMs) &&
							(t.updateProgress(),
							t.updateActiveIndex(),
							t.updateSlidesClasses());
					} else {
						for (
							var M = 0, k = t.slidesSizesGrid[0], z = 0;
							z < o.length;
							z += i.slidesPerGroup
						)
							void 0 !== o[z + i.slidesPerGroup]
								? p >= o[z] &&
								  p < o[z + i.slidesPerGroup] &&
								  (k = o[(M = z) + i.slidesPerGroup] - o[z])
								: p >= o[z] &&
								  ((M = z),
								  (k = o[o.length - 1] - o[o.length - 2]));
						var P = (p - o[M]) / k;
						if (u > i.longSwipesMs) {
							if (!i.longSwipes)
								return void t.slideTo(t.activeIndex);
							"next" === t.swipeDirection &&
								(P >= i.longSwipesRatio
									? t.slideTo(M + i.slidesPerGroup)
									: t.slideTo(M)),
								"prev" === t.swipeDirection &&
									(P > 1 - i.longSwipesRatio
										? t.slideTo(M + i.slidesPerGroup)
										: t.slideTo(M));
						} else {
							if (!i.shortSwipes)
								return void t.slideTo(t.activeIndex);
							"next" === t.swipeDirection &&
								t.slideTo(M + i.slidesPerGroup),
								"prev" === t.swipeDirection && t.slideTo(M);
						}
					}
				}.bind(e)),
				(e.onClick = function (e) {
					this.allowClick ||
						(this.params.preventClicks && e.preventDefault(),
						this.params.preventClicksPropagation &&
							this.animating &&
							(e.stopPropagation(),
							e.stopImmediatePropagation()));
				}.bind(e));
			var r = "container" === t.touchEventsTarget ? i : s,
				n = !!t.nested;
			if (R.touch || (!R.pointerEvents && !R.prefixedPointerEvents)) {
				if (R.touch) {
					var o = !(
						"touchstart" !== a.start ||
						!R.passiveListener ||
						!t.passiveListeners
					) && { passive: !0, capture: !1 };
					r.addEventListener(a.start, e.onTouchStart, o),
						r.addEventListener(
							a.move,
							e.onTouchMove,
							R.passiveListener ? { passive: !1, capture: n } : n
						),
						r.addEventListener(a.end, e.onTouchEnd, o);
				}
				((t.simulateTouch && !m.ios && !m.android) ||
					(t.simulateTouch && !R.touch && m.ios)) &&
					(r.addEventListener("mousedown", e.onTouchStart, !1),
					f.addEventListener("mousemove", e.onTouchMove, n),
					f.addEventListener("mouseup", e.onTouchEnd, !1));
			} else
				r.addEventListener(a.start, e.onTouchStart, !1),
					f.addEventListener(a.move, e.onTouchMove, n),
					f.addEventListener(a.end, e.onTouchEnd, !1);
			(t.preventClicks || t.preventClicksPropagation) &&
				r.addEventListener("click", e.onClick, !0),
				e.on(
					m.ios || m.android
						? "resize orientationchange observerUpdate"
						: "resize observerUpdate",
					g,
					!0
				);
		},
		detachEvents: function () {
			var e = this,
				t = e.params,
				a = e.touchEvents,
				i = e.el,
				s = e.wrapperEl,
				r = "container" === t.touchEventsTarget ? i : s,
				n = !!t.nested;
			if (R.touch || (!R.pointerEvents && !R.prefixedPointerEvents)) {
				if (R.touch) {
					var o = !(
						"onTouchStart" !== a.start ||
						!R.passiveListener ||
						!t.passiveListeners
					) && { passive: !0, capture: !1 };
					r.removeEventListener(a.start, e.onTouchStart, o),
						r.removeEventListener(a.move, e.onTouchMove, n),
						r.removeEventListener(a.end, e.onTouchEnd, o);
				}
				((t.simulateTouch && !m.ios && !m.android) ||
					(t.simulateTouch && !R.touch && m.ios)) &&
					(r.removeEventListener("mousedown", e.onTouchStart, !1),
					f.removeEventListener("mousemove", e.onTouchMove, n),
					f.removeEventListener("mouseup", e.onTouchEnd, !1));
			} else
				r.removeEventListener(a.start, e.onTouchStart, !1),
					f.removeEventListener(a.move, e.onTouchMove, n),
					f.removeEventListener(a.end, e.onTouchEnd, !1);
			(t.preventClicks || t.preventClicksPropagation) &&
				r.removeEventListener("click", e.onClick, !0),
				e.off(
					m.ios || m.android
						? "resize orientationchange observerUpdate"
						: "resize observerUpdate",
					g
				);
		},
	};
	var w,
		y = {
			setBreakpoint: function () {
				var e = this,
					t = e.activeIndex,
					a = e.initialized,
					i = e.loopedSlides;
				void 0 === i && (i = 0);
				var s = e.params,
					r = s.breakpoints;
				if (r && (!r || 0 !== Object.keys(r).length)) {
					var n = e.getBreakpoint(r);
					if (n && e.currentBreakpoint !== n) {
						var o = n in r ? r[n] : e.originalParams,
							l = s.loop && o.slidesPerView !== s.slidesPerView;
						V.extend(e.params, o),
							V.extend(e, {
								allowTouchMove: e.params.allowTouchMove,
								allowSlideNext: e.params.allowSlideNext,
								allowSlidePrev: e.params.allowSlidePrev,
							}),
							(e.currentBreakpoint = n),
							l &&
								a &&
								(e.loopDestroy(),
								e.loopCreate(),
								e.updateSlides(),
								e.slideTo(t - i + e.loopedSlides, 0, !1)),
							e.emit("breakpoint", o);
					}
				}
			},
			getBreakpoint: function (e) {
				if (e) {
					var t = !1,
						a = [];
					Object.keys(e).forEach(function (e) {
						a.push(e);
					}),
						a.sort(function (e, t) {
							return parseInt(e, 10) - parseInt(t, 10);
						});
					for (var i = 0; i < a.length; i += 1) {
						var s = a[i];
						this.params.breakpointsInverse
							? s <= Y.innerWidth && (t = s)
							: s >= Y.innerWidth && !t && (t = s);
					}
					return t || "max";
				}
			},
		},
		I = {
			isIE:
				!!Y.navigator.userAgent.match(/Trident/g) ||
				!!Y.navigator.userAgent.match(/MSIE/g),
			isEdge: !!Y.navigator.userAgent.match(/Edge/g),
			isSafari:
				((w = Y.navigator.userAgent.toLowerCase()),
				0 <= w.indexOf("safari") &&
					w.indexOf("chrome") < 0 &&
					w.indexOf("android") < 0),
			isUiWebView: /(iPhone|iPod|iPad).*AppleWebKit(?!.*Safari)/i.test(
				Y.navigator.userAgent
			),
		};
	var x = {
			init: !0,
			direction: "horizontal",
			touchEventsTarget: "container",
			initialSlide: 0,
			speed: 300,
			preventInteractionOnTransition: !1,
			edgeSwipeDetection: !1,
			edgeSwipeThreshold: 20,
			freeMode: !1,
			freeModeMomentum: !0,
			freeModeMomentumRatio: 1,
			freeModeMomentumBounce: !0,
			freeModeMomentumBounceRatio: 1,
			freeModeMomentumVelocityRatio: 1,
			freeModeSticky: !1,
			freeModeMinimumVelocity: 0.02,
			autoHeight: !1,
			setWrapperSize: !1,
			virtualTranslate: !1,
			effect: "slide",
			breakpoints: void 0,
			breakpointsInverse: !1,
			spaceBetween: 0,
			slidesPerView: 1,
			slidesPerColumn: 1,
			slidesPerColumnFill: "column",
			slidesPerGroup: 1,
			centeredSlides: !1,
			slidesOffsetBefore: 0,
			slidesOffsetAfter: 0,
			normalizeSlideIndex: !0,
			centerInsufficientSlides: !1,
			watchOverflow: !1,
			roundLengths: !1,
			touchRatio: 1,
			touchAngle: 45,
			simulateTouch: !0,
			shortSwipes: !0,
			longSwipes: !0,
			longSwipesRatio: 0.5,
			longSwipesMs: 300,
			followFinger: !0,
			allowTouchMove: !0,
			threshold: 0,
			touchMoveStopPropagation: !0,
			touchStartPreventDefault: !0,
			touchReleaseOnEdges: !1,
			uniqueNavElements: !0,
			resistance: !0,
			resistanceRatio: 0.85,
			watchSlidesProgress: !1,
			watchSlidesVisibility: !1,
			grabCursor: !1,
			preventClicks: !0,
			preventClicksPropagation: !0,
			slideToClickedSlide: !1,
			preloadImages: !0,
			updateOnImagesReady: !0,
			loop: !1,
			loopAdditionalSlides: 0,
			loopedSlides: null,
			loopFillGroupWithBlank: !1,
			allowSlidePrev: !0,
			allowSlideNext: !0,
			swipeHandler: null,
			noSwiping: !0,
			noSwipingClass: "swiper-no-swiping",
			noSwipingSelector: null,
			passiveListeners: !0,
			containerModifierClass: "swiper-container-",
			slideClass: "swiper-slide",
			slideBlankClass: "swiper-slide-invisible-blank",
			slideActiveClass: "swiper-slide-active",
			slideDuplicateActiveClass: "swiper-slide-duplicate-active",
			slideVisibleClass: "swiper-slide-visible",
			slideDuplicateClass: "swiper-slide-duplicate",
			slideNextClass: "swiper-slide-next",
			slideDuplicateNextClass: "swiper-slide-duplicate-next",
			slidePrevClass: "swiper-slide-prev",
			slideDuplicatePrevClass: "swiper-slide-duplicate-prev",
			wrapperClass: "swiper-wrapper",
			runCallbacksOnInit: !0,
		},
		T = {
			update: o,
			translate: d,
			transition: p,
			slide: c,
			loop: u,
			grabCursor: h,
			manipulation: v,
			events: b,
			breakpoints: y,
			checkOverflow: {
				checkOverflow: function () {
					var e = this,
						t = e.isLocked;
					(e.isLocked = 1 === e.snapGrid.length),
						(e.allowSlideNext = !e.isLocked),
						(e.allowSlidePrev = !e.isLocked),
						t !== e.isLocked &&
							e.emit(e.isLocked ? "lock" : "unlock"),
						t &&
							t !== e.isLocked &&
							((e.isEnd = !1), e.navigation.update());
				},
			},
			classes: {
				addClasses: function () {
					var t = this.classNames,
						a = this.params,
						e = this.rtl,
						i = this.$el,
						s = [];
					s.push(a.direction),
						a.freeMode && s.push("free-mode"),
						R.flexbox || s.push("no-flexbox"),
						a.autoHeight && s.push("autoheight"),
						e && s.push("rtl"),
						1 < a.slidesPerColumn && s.push("multirow"),
						m.android && s.push("android"),
						m.ios && s.push("ios"),
						(I.isIE || I.isEdge) &&
							(R.pointerEvents || R.prefixedPointerEvents) &&
							s.push("wp8-" + a.direction),
						s.forEach(function (e) {
							t.push(a.containerModifierClass + e);
						}),
						i.addClass(t.join(" "));
				},
				removeClasses: function () {
					var e = this.$el,
						t = this.classNames;
					e.removeClass(t.join(" "));
				},
			},
			images: {
				loadImage: function (e, t, a, i, s, r) {
					var n;
					function o() {
						r && r();
					}
					e.complete && s
						? o()
						: t
						? (((n = new Y.Image()).onload = o),
						  (n.onerror = o),
						  i && (n.sizes = i),
						  a && (n.srcset = a),
						  t && (n.src = t))
						: o();
				},
				preloadImages: function () {
					var e = this;
					function t() {
						null != e &&
							e &&
							!e.destroyed &&
							(void 0 !== e.imagesLoaded && (e.imagesLoaded += 1),
							e.imagesLoaded === e.imagesToLoad.length &&
								(e.params.updateOnImagesReady && e.update(),
								e.emit("imagesReady")));
					}
					e.imagesToLoad = e.$el.find("img");
					for (var a = 0; a < e.imagesToLoad.length; a += 1) {
						var i = e.imagesToLoad[a];
						e.loadImage(
							i,
							i.currentSrc || i.getAttribute("src"),
							i.srcset || i.getAttribute("srcset"),
							i.sizes || i.getAttribute("sizes"),
							!0,
							t
						);
					}
				},
			},
		},
		E = {},
		S = (function (u) {
			function h() {
				for (var e, t, s, a = [], i = arguments.length; i--; )
					a[i] = arguments[i];
				1 === a.length &&
				a[0].constructor &&
				a[0].constructor === Object
					? (s = a[0])
					: ((t = (e = a)[0]), (s = e[1])),
					s || (s = {}),
					(s = V.extend({}, s)),
					t && !s.el && (s.el = t),
					u.call(this, s),
					Object.keys(T).forEach(function (t) {
						Object.keys(T[t]).forEach(function (e) {
							h.prototype[e] || (h.prototype[e] = T[t][e]);
						});
					});
				var r = this;
				void 0 === r.modules && (r.modules = {}),
					Object.keys(r.modules).forEach(function (e) {
						var t = r.modules[e];
						if (t.params) {
							var a = Object.keys(t.params)[0],
								i = t.params[a];
							if ("object" != typeof i || null === i) return;
							if (!(a in s && "enabled" in i)) return;
							!0 === s[a] && (s[a] = { enabled: !0 }),
								"object" != typeof s[a] ||
									"enabled" in s[a] ||
									(s[a].enabled = !0),
								s[a] || (s[a] = { enabled: !1 });
						}
					});
				var n = V.extend({}, x);
				r.useModulesParams(n),
					(r.params = V.extend({}, n, E, s)),
					(r.originalParams = V.extend({}, r.params)),
					(r.passedParams = V.extend({}, s));
				var o = (r.$ = L)(r.params.el);
				if ((t = o[0])) {
					if (1 < o.length) {
						var l = [];
						return (
							o.each(function (e, t) {
								var a = V.extend({}, s, { el: t });
								l.push(new h(a));
							}),
							l
						);
					}
					(t.swiper = r), o.data("swiper", r);
					var d,
						p,
						c = o.children("." + r.params.wrapperClass);
					return (
						V.extend(r, {
							$el: o,
							el: t,
							$wrapperEl: c,
							wrapperEl: c[0],
							classNames: [],
							slides: L(),
							slidesGrid: [],
							snapGrid: [],
							slidesSizesGrid: [],
							isHorizontal: function () {
								return "horizontal" === r.params.direction;
							},
							isVertical: function () {
								return "vertical" === r.params.direction;
							},
							rtl:
								"rtl" === t.dir.toLowerCase() ||
								"rtl" === o.css("direction"),
							rtlTranslate:
								"horizontal" === r.params.direction &&
								("rtl" === t.dir.toLowerCase() ||
									"rtl" === o.css("direction")),
							wrongRTL: "-webkit-box" === c.css("display"),
							activeIndex: 0,
							realIndex: 0,
							isBeginning: !0,
							isEnd: !1,
							translate: 0,
							previousTranslate: 0,
							progress: 0,
							velocity: 0,
							animating: !1,
							allowSlideNext: r.params.allowSlideNext,
							allowSlidePrev: r.params.allowSlidePrev,
							touchEvents:
								((d = ["touchstart", "touchmove", "touchend"]),
								(p = ["mousedown", "mousemove", "mouseup"]),
								R.pointerEvents
									? (p = [
											"pointerdown",
											"pointermove",
											"pointerup",
									  ])
									: R.prefixedPointerEvents &&
									  (p = [
											"MSPointerDown",
											"MSPointerMove",
											"MSPointerUp",
									  ]),
								(r.touchEventsTouch = {
									start: d[0],
									move: d[1],
									end: d[2],
								}),
								(r.touchEventsDesktop = {
									start: p[0],
									move: p[1],
									end: p[2],
								}),
								R.touch || !r.params.simulateTouch
									? r.touchEventsTouch
									: r.touchEventsDesktop),
							touchEventsData: {
								isTouched: void 0,
								isMoved: void 0,
								allowTouchCallbacks: void 0,
								touchStartTime: void 0,
								isScrolling: void 0,
								currentTranslate: void 0,
								startTranslate: void 0,
								allowThresholdMove: void 0,
								formElements:
									"input, select, option, textarea, button, video",
								lastClickTime: V.now(),
								clickTimeout: void 0,
								velocities: [],
								allowMomentumBounce: void 0,
								isTouchEvent: void 0,
								startMoving: void 0,
							},
							allowClick: !0,
							allowTouchMove: r.params.allowTouchMove,
							touches: {
								startX: 0,
								startY: 0,
								currentX: 0,
								currentY: 0,
								diff: 0,
							},
							imagesToLoad: [],
							imagesLoaded: 0,
						}),
						r.useModules(),
						r.params.init && r.init(),
						r
					);
				}
			}
			u && (h.__proto__ = u);
			var e = {
				extendedDefaults: { configurable: !0 },
				defaults: { configurable: !0 },
				Class: { configurable: !0 },
				$: { configurable: !0 },
			};
			return (
				(((h.prototype = Object.create(u && u.prototype)).constructor =
					h).prototype.slidesPerViewDynamic = function () {
					var e = this,
						t = e.params,
						a = e.slides,
						i = e.slidesGrid,
						s = e.size,
						r = e.activeIndex,
						n = 1;
					if (t.centeredSlides) {
						for (
							var o, l = a[r].swiperSlideSize, d = r + 1;
							d < a.length;
							d += 1
						)
							a[d] &&
								!o &&
								((n += 1),
								s < (l += a[d].swiperSlideSize) && (o = !0));
						for (var p = r - 1; 0 <= p; p -= 1)
							a[p] &&
								!o &&
								((n += 1),
								s < (l += a[p].swiperSlideSize) && (o = !0));
					} else
						for (var c = r + 1; c < a.length; c += 1)
							i[c] - i[r] < s && (n += 1);
					return n;
				}),
				(h.prototype.update = function () {
					var a = this;
					if (a && !a.destroyed) {
						var e = a.snapGrid,
							t = a.params;
						t.breakpoints && a.setBreakpoint(),
							a.updateSize(),
							a.updateSlides(),
							a.updateProgress(),
							a.updateSlidesClasses(),
							a.params.freeMode
								? (i(),
								  a.params.autoHeight && a.updateAutoHeight())
								: (("auto" === a.params.slidesPerView ||
										1 < a.params.slidesPerView) &&
								  a.isEnd &&
								  !a.params.centeredSlides
										? a.slideTo(
												a.slides.length - 1,
												0,
												!1,
												!0
										  )
										: a.slideTo(
												a.activeIndex,
												0,
												!1,
												!0
										  )) || i(),
							t.watchOverflow &&
								e !== a.snapGrid &&
								a.checkOverflow(),
							a.emit("update");
					}
					function i() {
						var e = a.rtlTranslate ? -1 * a.translate : a.translate,
							t = Math.min(
								Math.max(e, a.maxTranslate()),
								a.minTranslate()
							);
						a.setTranslate(t),
							a.updateActiveIndex(),
							a.updateSlidesClasses();
					}
				}),
				(h.prototype.init = function () {
					var e = this;
					e.initialized ||
						(e.emit("beforeInit"),
						e.params.breakpoints && e.setBreakpoint(),
						e.addClasses(),
						e.params.loop && e.loopCreate(),
						e.updateSize(),
						e.updateSlides(),
						e.params.watchOverflow && e.checkOverflow(),
						e.params.grabCursor && e.setGrabCursor(),
						e.params.preloadImages && e.preloadImages(),
						e.params.loop
							? e.slideTo(
									e.params.initialSlide + e.loopedSlides,
									0,
									e.params.runCallbacksOnInit
							  )
							: e.slideTo(
									e.params.initialSlide,
									0,
									e.params.runCallbacksOnInit
							  ),
						e.attachEvents(),
						(e.initialized = !0),
						e.emit("init"));
				}),
				(h.prototype.destroy = function (e, t) {
					void 0 === e && (e = !0), void 0 === t && (t = !0);
					var a = this,
						i = a.params,
						s = a.$el,
						r = a.$wrapperEl,
						n = a.slides;
					return (
						void 0 === a.params ||
							a.destroyed ||
							(a.emit("beforeDestroy"),
							(a.initialized = !1),
							a.detachEvents(),
							i.loop && a.loopDestroy(),
							t &&
								(a.removeClasses(),
								s.removeAttr("style"),
								r.removeAttr("style"),
								n &&
									n.length &&
									n
										.removeClass(
											[
												i.slideVisibleClass,
												i.slideActiveClass,
												i.slideNextClass,
												i.slidePrevClass,
											].join(" ")
										)
										.removeAttr("style")
										.removeAttr("data-swiper-slide-index")
										.removeAttr("data-swiper-column")
										.removeAttr("data-swiper-row")),
							a.emit("destroy"),
							Object.keys(a.eventsListeners).forEach(function (
								e
							) {
								a.off(e);
							}),
							!1 !== e &&
								((a.$el[0].swiper = null),
								a.$el.data("swiper", null),
								V.deleteProps(a)),
							(a.destroyed = !0)),
						null
					);
				}),
				(h.extendDefaults = function (e) {
					V.extend(E, e);
				}),
				(e.extendedDefaults.get = function () {
					return E;
				}),
				(e.defaults.get = function () {
					return x;
				}),
				(e.Class.get = function () {
					return u;
				}),
				(e.$.get = function () {
					return L;
				}),
				Object.defineProperties(h, e),
				h
			);
		})(s),
		C = { name: "device", proto: { device: m }, static: { device: m } },
		M = { name: "support", proto: { support: R }, static: { support: R } },
		k = { name: "browser", proto: { browser: I }, static: { browser: I } },
		z = {
			name: "resize",
			create: function () {
				var e = this;
				V.extend(e, {
					resize: {
						resizeHandler: function () {
							e &&
								!e.destroyed &&
								e.initialized &&
								(e.emit("beforeResize"), e.emit("resize"));
						},
						orientationChangeHandler: function () {
							e &&
								!e.destroyed &&
								e.initialized &&
								e.emit("orientationchange");
						},
					},
				});
			},
			on: {
				init: function () {
					Y.addEventListener("resize", this.resize.resizeHandler),
						Y.addEventListener(
							"orientationchange",
							this.resize.orientationChangeHandler
						);
				},
				destroy: function () {
					Y.removeEventListener("resize", this.resize.resizeHandler),
						Y.removeEventListener(
							"orientationchange",
							this.resize.orientationChangeHandler
						);
				},
			},
		},
		P = {
			func: Y.MutationObserver || Y.WebkitMutationObserver,
			attach: function (e, t) {
				void 0 === t && (t = {});
				var a = this,
					i = new P.func(function (e) {
						if (1 !== e.length) {
							var t = function () {
								a.emit("observerUpdate", e[0]);
							};
							Y.requestAnimationFrame
								? Y.requestAnimationFrame(t)
								: Y.setTimeout(t, 0);
						} else a.emit("observerUpdate", e[0]);
					});
				i.observe(e, {
					attributes: void 0 === t.attributes || t.attributes,
					childList: void 0 === t.childList || t.childList,
					characterData:
						void 0 === t.characterData || t.characterData,
				}),
					a.observer.observers.push(i);
			},
			init: function () {
				var e = this;
				if (R.observer && e.params.observer) {
					if (e.params.observeParents)
						for (
							var t = e.$el.parents(), a = 0;
							a < t.length;
							a += 1
						)
							e.observer.attach(t[a]);
					e.observer.attach(e.$el[0], { childList: !1 }),
						e.observer.attach(e.$wrapperEl[0], { attributes: !1 });
				}
			},
			destroy: function () {
				this.observer.observers.forEach(function (e) {
					e.disconnect();
				}),
					(this.observer.observers = []);
			},
		},
		$ = {
			name: "observer",
			params: { observer: !1, observeParents: !1 },
			create: function () {
				V.extend(this, {
					observer: {
						init: P.init.bind(this),
						attach: P.attach.bind(this),
						destroy: P.destroy.bind(this),
						observers: [],
					},
				});
			},
			on: {
				init: function () {
					this.observer.init();
				},
				destroy: function () {
					this.observer.destroy();
				},
			},
		},
		D = {
			update: function (e) {
				var t = this,
					a = t.params,
					i = a.slidesPerView,
					s = a.slidesPerGroup,
					r = a.centeredSlides,
					n = t.params.virtual,
					o = n.addSlidesBefore,
					l = n.addSlidesAfter,
					d = t.virtual,
					p = d.from,
					c = d.to,
					u = d.slides,
					h = d.slidesGrid,
					v = d.renderSlide,
					f = d.offset;
				t.updateActiveIndex();
				var m,
					g,
					b,
					w = t.activeIndex || 0;
				(m = t.rtlTranslate
					? "right"
					: t.isHorizontal()
					? "left"
					: "top"),
					r
						? ((g = Math.floor(i / 2) + s + o),
						  (b = Math.floor(i / 2) + s + l))
						: ((g = i + (s - 1) + o), (b = s + l));
				var y = Math.max((w || 0) - b, 0),
					x = Math.min((w || 0) + g, u.length - 1),
					T = (t.slidesGrid[y] || 0) - (t.slidesGrid[0] || 0);
				function E() {
					t.updateSlides(),
						t.updateProgress(),
						t.updateSlidesClasses(),
						t.lazy && t.params.lazy.enabled && t.lazy.load();
				}
				if (
					(V.extend(t.virtual, {
						from: y,
						to: x,
						offset: T,
						slidesGrid: t.slidesGrid,
					}),
					p === y && c === x && !e)
				)
					return (
						t.slidesGrid !== h &&
							T !== f &&
							t.slides.css(m, T + "px"),
						void t.updateProgress()
					);
				if (t.params.virtual.renderExternal)
					return (
						t.params.virtual.renderExternal.call(t, {
							offset: T,
							from: y,
							to: x,
							slides: (function () {
								for (var e = [], t = y; t <= x; t += 1)
									e.push(u[t]);
								return e;
							})(),
						}),
						void E()
					);
				var S = [],
					C = [];
				if (e) t.$wrapperEl.find("." + t.params.slideClass).remove();
				else
					for (var M = p; M <= c; M += 1)
						(M < y || x < M) &&
							t.$wrapperEl
								.find(
									"." +
										t.params.slideClass +
										'[data-swiper-slide-index="' +
										M +
										'"]'
								)
								.remove();
				for (var k = 0; k < u.length; k += 1)
					y <= k &&
						k <= x &&
						(void 0 === c || e
							? C.push(k)
							: (c < k && C.push(k), k < p && S.push(k)));
				C.forEach(function (e) {
					t.$wrapperEl.append(v(u[e], e));
				}),
					S.sort(function (e, t) {
						return e < t;
					}).forEach(function (e) {
						t.$wrapperEl.prepend(v(u[e], e));
					}),
					t.$wrapperEl.children(".swiper-slide").css(m, T + "px"),
					E();
			},
			renderSlide: function (e, t) {
				var a = this,
					i = a.params.virtual;
				if (i.cache && a.virtual.cache[t]) return a.virtual.cache[t];
				var s = i.renderSlide
					? L(i.renderSlide.call(a, e, t))
					: L(
							'<div class="' +
								a.params.slideClass +
								'" data-swiper-slide-index="' +
								t +
								'">' +
								e +
								"</div>"
					  );
				return (
					s.attr("data-swiper-slide-index") ||
						s.attr("data-swiper-slide-index", t),
					i.cache && (a.virtual.cache[t] = s),
					s
				);
			},
			appendSlide: function (e) {
				this.virtual.slides.push(e), this.virtual.update(!0);
			},
			prependSlide: function (e) {
				var t = this;
				if ((t.virtual.slides.unshift(e), t.params.virtual.cache)) {
					var a = t.virtual.cache,
						i = {};
					Object.keys(a).forEach(function (e) {
						i[e + 1] = a[e];
					}),
						(t.virtual.cache = i);
				}
				t.virtual.update(!0), t.slideNext(0);
			},
		},
		O = {
			name: "virtual",
			params: {
				virtual: {
					enabled: !1,
					slides: [],
					cache: !0,
					renderSlide: null,
					renderExternal: null,
					addSlidesBefore: 0,
					addSlidesAfter: 0,
				},
			},
			create: function () {
				var e = this;
				V.extend(e, {
					virtual: {
						update: D.update.bind(e),
						appendSlide: D.appendSlide.bind(e),
						prependSlide: D.prependSlide.bind(e),
						renderSlide: D.renderSlide.bind(e),
						slides: e.params.virtual.slides,
						cache: {},
					},
				});
			},
			on: {
				beforeInit: function () {
					var e = this;
					if (e.params.virtual.enabled) {
						e.classNames.push(
							e.params.containerModifierClass + "virtual"
						);
						var t = { watchSlidesProgress: !0 };
						V.extend(e.params, t),
							V.extend(e.originalParams, t),
							e.virtual.update();
					}
				},
				setTranslate: function () {
					this.params.virtual.enabled && this.virtual.update();
				},
			},
		},
		A = {
			handle: function (e) {
				var t = this,
					a = t.rtlTranslate,
					i = e;
				i.originalEvent && (i = i.originalEvent);
				var s = i.keyCode || i.charCode;
				if (
					!t.allowSlideNext &&
					((t.isHorizontal() && 39 === s) ||
						(t.isVertical() && 40 === s))
				)
					return !1;
				if (
					!t.allowSlidePrev &&
					((t.isHorizontal() && 37 === s) ||
						(t.isVertical() && 38 === s))
				)
					return !1;
				if (
					!(
						i.shiftKey ||
						i.altKey ||
						i.ctrlKey ||
						i.metaKey ||
						(f.activeElement &&
							f.activeElement.nodeName &&
							("input" ===
								f.activeElement.nodeName.toLowerCase() ||
								"textarea" ===
									f.activeElement.nodeName.toLowerCase()))
					)
				) {
					if (
						t.params.keyboard.onlyInViewport &&
						(37 === s || 39 === s || 38 === s || 40 === s)
					) {
						var r = !1;
						if (
							0 <
								t.$el.parents("." + t.params.slideClass)
									.length &&
							0 ===
								t.$el.parents("." + t.params.slideActiveClass)
									.length
						)
							return;
						var n = Y.innerWidth,
							o = Y.innerHeight,
							l = t.$el.offset();
						a && (l.left -= t.$el[0].scrollLeft);
						for (
							var d = [
									[l.left, l.top],
									[l.left + t.width, l.top],
									[l.left, l.top + t.height],
									[l.left + t.width, l.top + t.height],
								],
								p = 0;
							p < d.length;
							p += 1
						) {
							var c = d[p];
							0 <= c[0] &&
								c[0] <= n &&
								0 <= c[1] &&
								c[1] <= o &&
								(r = !0);
						}
						if (!r) return;
					}
					t.isHorizontal()
						? ((37 !== s && 39 !== s) ||
								(i.preventDefault
									? i.preventDefault()
									: (i.returnValue = !1)),
						  ((39 === s && !a) || (37 === s && a)) &&
								t.slideNext(),
						  ((37 === s && !a) || (39 === s && a)) &&
								t.slidePrev())
						: ((38 !== s && 40 !== s) ||
								(i.preventDefault
									? i.preventDefault()
									: (i.returnValue = !1)),
						  40 === s && t.slideNext(),
						  38 === s && t.slidePrev()),
						t.emit("keyPress", s);
				}
			},
			enable: function () {
				this.keyboard.enabled ||
					(L(f).on("keydown", this.keyboard.handle),
					(this.keyboard.enabled = !0));
			},
			disable: function () {
				this.keyboard.enabled &&
					(L(f).off("keydown", this.keyboard.handle),
					(this.keyboard.enabled = !1));
			},
		},
		H = {
			name: "keyboard",
			params: { keyboard: { enabled: !1, onlyInViewport: !0 } },
			create: function () {
				V.extend(this, {
					keyboard: {
						enabled: !1,
						enable: A.enable.bind(this),
						disable: A.disable.bind(this),
						handle: A.handle.bind(this),
					},
				});
			},
			on: {
				init: function () {
					this.params.keyboard.enabled && this.keyboard.enable();
				},
				destroy: function () {
					this.keyboard.enabled && this.keyboard.disable();
				},
			},
		};
	var B = {
			lastScrollTime: V.now(),
			event:
				-1 < Y.navigator.userAgent.indexOf("firefox")
					? "DOMMouseScroll"
					: (function () {
							var e = "onwheel",
								t = e in f;
							if (!t) {
								var a = f.createElement("div");
								a.setAttribute(e, "return;"),
									(t = "function" == typeof a[e]);
							}
							return (
								!t &&
									f.implementation &&
									f.implementation.hasFeature &&
									!0 !==
										f.implementation.hasFeature("", "") &&
									(t = f.implementation.hasFeature(
										"Events.wheel",
										"3.0"
									)),
								t
							);
					  })()
					? "wheel"
					: "mousewheel",
			normalize: function (e) {
				var t = 0,
					a = 0,
					i = 0,
					s = 0;
				return (
					"detail" in e && (a = e.detail),
					"wheelDelta" in e && (a = -e.wheelDelta / 120),
					"wheelDeltaY" in e && (a = -e.wheelDeltaY / 120),
					"wheelDeltaX" in e && (t = -e.wheelDeltaX / 120),
					"axis" in e &&
						e.axis === e.HORIZONTAL_AXIS &&
						((t = a), (a = 0)),
					(i = 10 * t),
					(s = 10 * a),
					"deltaY" in e && (s = e.deltaY),
					"deltaX" in e && (i = e.deltaX),
					(i || s) &&
						e.deltaMode &&
						(1 === e.deltaMode
							? ((i *= 40), (s *= 40))
							: ((i *= 800), (s *= 800))),
					i && !t && (t = i < 1 ? -1 : 1),
					s && !a && (a = s < 1 ? -1 : 1),
					{ spinX: t, spinY: a, pixelX: i, pixelY: s }
				);
			},
			handleMouseEnter: function () {
				this.mouseEntered = !0;
			},
			handleMouseLeave: function () {
				this.mouseEntered = !1;
			},
			handle: function (e) {
				var t = e,
					a = this,
					i = a.params.mousewheel;
				if (!a.mouseEntered && !i.releaseOnEdges) return !0;
				t.originalEvent && (t = t.originalEvent);
				var s = 0,
					r = a.rtlTranslate ? -1 : 1,
					n = B.normalize(t);
				if (i.forceToAxis)
					if (a.isHorizontal()) {
						if (!(Math.abs(n.pixelX) > Math.abs(n.pixelY)))
							return !0;
						s = n.pixelX * r;
					} else {
						if (!(Math.abs(n.pixelY) > Math.abs(n.pixelX)))
							return !0;
						s = n.pixelY;
					}
				else
					s =
						Math.abs(n.pixelX) > Math.abs(n.pixelY)
							? -n.pixelX * r
							: -n.pixelY;
				if (0 === s) return !0;
				if ((i.invert && (s = -s), a.params.freeMode)) {
					a.params.loop && a.loopFix();
					var o = a.getTranslate() + s * i.sensitivity,
						l = a.isBeginning,
						d = a.isEnd;
					if (
						(o >= a.minTranslate() && (o = a.minTranslate()),
						o <= a.maxTranslate() && (o = a.maxTranslate()),
						a.setTransition(0),
						a.setTranslate(o),
						a.updateProgress(),
						a.updateActiveIndex(),
						a.updateSlidesClasses(),
						((!l && a.isBeginning) || (!d && a.isEnd)) &&
							a.updateSlidesClasses(),
						a.params.freeModeSticky &&
							(clearTimeout(a.mousewheel.timeout),
							(a.mousewheel.timeout = V.nextTick(function () {
								a.slideToClosest();
							}, 300))),
						a.emit("scroll", t),
						a.params.autoplay &&
							a.params.autoplayDisableOnInteraction &&
							a.autoplay.stop(),
						o === a.minTranslate() || o === a.maxTranslate())
					)
						return !0;
				} else {
					if (60 < V.now() - a.mousewheel.lastScrollTime)
						if (s < 0)
							if ((a.isEnd && !a.params.loop) || a.animating) {
								if (i.releaseOnEdges) return !0;
							} else a.slideNext(), a.emit("scroll", t);
						else if (
							(a.isBeginning && !a.params.loop) ||
							a.animating
						) {
							if (i.releaseOnEdges) return !0;
						} else a.slidePrev(), a.emit("scroll", t);
					a.mousewheel.lastScrollTime = new Y.Date().getTime();
				}
				return (
					t.preventDefault
						? t.preventDefault()
						: (t.returnValue = !1),
					!1
				);
			},
			enable: function () {
				var e = this;
				if (!B.event) return !1;
				if (e.mousewheel.enabled) return !1;
				var t = e.$el;
				return (
					"container" !== e.params.mousewheel.eventsTarged &&
						(t = L(e.params.mousewheel.eventsTarged)),
					t.on("mouseenter", e.mousewheel.handleMouseEnter),
					t.on("mouseleave", e.mousewheel.handleMouseLeave),
					t.on(B.event, e.mousewheel.handle),
					(e.mousewheel.enabled = !0)
				);
			},
			disable: function () {
				var e = this;
				if (!B.event) return !1;
				if (!e.mousewheel.enabled) return !1;
				var t = e.$el;
				return (
					"container" !== e.params.mousewheel.eventsTarged &&
						(t = L(e.params.mousewheel.eventsTarged)),
					t.off(B.event, e.mousewheel.handle),
					!(e.mousewheel.enabled = !1)
				);
			},
		},
		G = {
			update: function () {
				var e = this,
					t = e.params.navigation;
				if (!e.params.loop) {
					var a = e.navigation,
						i = a.$nextEl,
						s = a.$prevEl;
					s &&
						0 < s.length &&
						(e.isBeginning
							? s.addClass(t.disabledClass)
							: s.removeClass(t.disabledClass),
						s[
							e.params.watchOverflow && e.isLocked
								? "addClass"
								: "removeClass"
						](t.lockClass)),
						i &&
							0 < i.length &&
							(e.isEnd
								? i.addClass(t.disabledClass)
								: i.removeClass(t.disabledClass),
							i[
								e.params.watchOverflow && e.isLocked
									? "addClass"
									: "removeClass"
							](t.lockClass));
				}
			},
			init: function () {
				var e,
					t,
					a = this,
					i = a.params.navigation;
				(i.nextEl || i.prevEl) &&
					(i.nextEl &&
						((e = L(i.nextEl)),
						a.params.uniqueNavElements &&
							"string" == typeof i.nextEl &&
							1 < e.length &&
							1 === a.$el.find(i.nextEl).length &&
							(e = a.$el.find(i.nextEl))),
					i.prevEl &&
						((t = L(i.prevEl)),
						a.params.uniqueNavElements &&
							"string" == typeof i.prevEl &&
							1 < t.length &&
							1 === a.$el.find(i.prevEl).length &&
							(t = a.$el.find(i.prevEl))),
					e &&
						0 < e.length &&
						e.on("click", function (e) {
							e.preventDefault(),
								(a.isEnd && !a.params.loop) || a.slideNext();
						}),
					t &&
						0 < t.length &&
						t.on("click", function (e) {
							e.preventDefault(),
								(a.isBeginning && !a.params.loop) ||
									a.slidePrev();
						}),
					V.extend(a.navigation, {
						$nextEl: e,
						nextEl: e && e[0],
						$prevEl: t,
						prevEl: t && t[0],
					}));
			},
			destroy: function () {
				var e = this.navigation,
					t = e.$nextEl,
					a = e.$prevEl;
				t &&
					t.length &&
					(t.off("click"),
					t.removeClass(this.params.navigation.disabledClass)),
					a &&
						a.length &&
						(a.off("click"),
						a.removeClass(this.params.navigation.disabledClass));
			},
		},
		N = {
			update: function () {
				var e = this,
					t = e.rtl,
					s = e.params.pagination;
				if (
					s.el &&
					e.pagination.el &&
					e.pagination.$el &&
					0 !== e.pagination.$el.length
				) {
					var r,
						a =
							e.virtual && e.params.virtual.enabled
								? e.virtual.slides.length
								: e.slides.length,
						i = e.pagination.$el,
						n = e.params.loop
							? Math.ceil(
									(a - 2 * e.loopedSlides) /
										e.params.slidesPerGroup
							  )
							: e.snapGrid.length;
					if (
						(e.params.loop
							? ((r = Math.ceil(
									(e.activeIndex - e.loopedSlides) /
										e.params.slidesPerGroup
							  )) >
									a - 1 - 2 * e.loopedSlides &&
									(r -= a - 2 * e.loopedSlides),
							  n - 1 < r && (r -= n),
							  r < 0 &&
									"bullets" !== e.params.paginationType &&
									(r = n + r))
							: (r =
									void 0 !== e.snapIndex
										? e.snapIndex
										: e.activeIndex || 0),
						"bullets" === s.type &&
							e.pagination.bullets &&
							0 < e.pagination.bullets.length)
					) {
						var o,
							l,
							d,
							p = e.pagination.bullets;
						if (
							(s.dynamicBullets &&
								((e.pagination.bulletSize = p
									.eq(0)
									[
										e.isHorizontal()
											? "outerWidth"
											: "outerHeight"
									](!0)),
								i.css(
									e.isHorizontal() ? "width" : "height",
									e.pagination.bulletSize *
										(s.dynamicMainBullets + 4) +
										"px"
								),
								1 < s.dynamicMainBullets &&
									void 0 !== e.previousIndex &&
									((e.pagination.dynamicBulletIndex +=
										r - e.previousIndex),
									e.pagination.dynamicBulletIndex >
									s.dynamicMainBullets - 1
										? (e.pagination.dynamicBulletIndex =
												s.dynamicMainBullets - 1)
										: e.pagination.dynamicBulletIndex < 0 &&
										  (e.pagination.dynamicBulletIndex = 0)),
								(o = r - e.pagination.dynamicBulletIndex),
								(d =
									((l =
										o +
										(Math.min(
											p.length,
											s.dynamicMainBullets
										) -
											1)) +
										o) /
									2)),
							p.removeClass(
								s.bulletActiveClass +
									" " +
									s.bulletActiveClass +
									"-next " +
									s.bulletActiveClass +
									"-next-next " +
									s.bulletActiveClass +
									"-prev " +
									s.bulletActiveClass +
									"-prev-prev " +
									s.bulletActiveClass +
									"-main"
							),
							1 < i.length)
						)
							p.each(function (e, t) {
								var a = L(t),
									i = a.index();
								i === r && a.addClass(s.bulletActiveClass),
									s.dynamicBullets &&
										(o <= i &&
											i <= l &&
											a.addClass(
												s.bulletActiveClass + "-main"
											),
										i === o &&
											a
												.prev()
												.addClass(
													s.bulletActiveClass +
														"-prev"
												)
												.prev()
												.addClass(
													s.bulletActiveClass +
														"-prev-prev"
												),
										i === l &&
											a
												.next()
												.addClass(
													s.bulletActiveClass +
														"-next"
												)
												.next()
												.addClass(
													s.bulletActiveClass +
														"-next-next"
												));
							});
						else if (
							(p.eq(r).addClass(s.bulletActiveClass),
							s.dynamicBullets)
						) {
							for (
								var c = p.eq(o), u = p.eq(l), h = o;
								h <= l;
								h += 1
							)
								p.eq(h).addClass(s.bulletActiveClass + "-main");
							c
								.prev()
								.addClass(s.bulletActiveClass + "-prev")
								.prev()
								.addClass(s.bulletActiveClass + "-prev-prev"),
								u
									.next()
									.addClass(s.bulletActiveClass + "-next")
									.next()
									.addClass(
										s.bulletActiveClass + "-next-next"
									);
						}
						if (s.dynamicBullets) {
							var v = Math.min(
									p.length,
									s.dynamicMainBullets + 4
								),
								f =
									(e.pagination.bulletSize * v -
										e.pagination.bulletSize) /
										2 -
									d * e.pagination.bulletSize,
								m = t ? "right" : "left";
							p.css(e.isHorizontal() ? m : "top", f + "px");
						}
					}
					if (
						("fraction" === s.type &&
							(i
								.find("." + s.currentClass)
								.text(s.formatFractionCurrent(r + 1)),
							i
								.find("." + s.totalClass)
								.text(s.formatFractionTotal(n))),
						"progressbar" === s.type)
					) {
						var g;
						g = s.progressbarOpposite
							? e.isHorizontal()
								? "vertical"
								: "horizontal"
							: e.isHorizontal()
							? "horizontal"
							: "vertical";
						var b = (r + 1) / n,
							w = 1,
							y = 1;
						"horizontal" === g ? (w = b) : (y = b),
							i
								.find("." + s.progressbarFillClass)
								.transform(
									"translate3d(0,0,0) scaleX(" +
										w +
										") scaleY(" +
										y +
										")"
								)
								.transition(e.params.speed);
					}
					"custom" === s.type && s.renderCustom
						? (i.html(s.renderCustom(e, r + 1, n)),
						  e.emit("paginationRender", e, i[0]))
						: e.emit("paginationUpdate", e, i[0]),
						i[
							e.params.watchOverflow && e.isLocked
								? "addClass"
								: "removeClass"
						](s.lockClass);
				}
			},
			render: function () {
				var e = this,
					t = e.params.pagination;
				if (
					t.el &&
					e.pagination.el &&
					e.pagination.$el &&
					0 !== e.pagination.$el.length
				) {
					var a =
							e.virtual && e.params.virtual.enabled
								? e.virtual.slides.length
								: e.slides.length,
						i = e.pagination.$el,
						s = "";
					if ("bullets" === t.type) {
						for (
							var r = e.params.loop
									? Math.ceil(
											(a - 2 * e.loopedSlides) /
												e.params.slidesPerGroup
									  )
									: e.snapGrid.length,
								n = 0;
							n < r;
							n += 1
						)
							t.renderBullet
								? (s += t.renderBullet.call(
										e,
										n,
										t.bulletClass
								  ))
								: (s +=
										"<" +
										t.bulletElement +
										' class="' +
										t.bulletClass +
										'"></' +
										t.bulletElement +
										">");
						i.html(s),
							(e.pagination.bullets = i.find(
								"." + t.bulletClass
							));
					}
					"fraction" === t.type &&
						((s = t.renderFraction
							? t.renderFraction.call(
									e,
									t.currentClass,
									t.totalClass
							  )
							: '<span class="' +
							  t.currentClass +
							  '"></span> / <span class="' +
							  t.totalClass +
							  '"></span>'),
						i.html(s)),
						"progressbar" === t.type &&
							((s = t.renderProgressbar
								? t.renderProgressbar.call(
										e,
										t.progressbarFillClass
								  )
								: '<span class="' +
								  t.progressbarFillClass +
								  '"></span>'),
							i.html(s)),
						"custom" !== t.type &&
							e.emit("paginationRender", e.pagination.$el[0]);
				}
			},
			init: function () {
				var a = this,
					e = a.params.pagination;
				if (e.el) {
					var t = L(e.el);
					0 !== t.length &&
						(a.params.uniqueNavElements &&
							"string" == typeof e.el &&
							1 < t.length &&
							1 === a.$el.find(e.el).length &&
							(t = a.$el.find(e.el)),
						"bullets" === e.type &&
							e.clickable &&
							t.addClass(e.clickableClass),
						t.addClass(e.modifierClass + e.type),
						"bullets" === e.type &&
							e.dynamicBullets &&
							(t.addClass(
								"" + e.modifierClass + e.type + "-dynamic"
							),
							(a.pagination.dynamicBulletIndex = 0),
							e.dynamicMainBullets < 1 &&
								(e.dynamicMainBullets = 1)),
						"progressbar" === e.type &&
							e.progressbarOpposite &&
							t.addClass(e.progressbarOppositeClass),
						e.clickable &&
							t.on("click", "." + e.bulletClass, function (e) {
								e.preventDefault();
								var t =
									L(this).index() * a.params.slidesPerGroup;
								a.params.loop && (t += a.loopedSlides),
									a.slideTo(t);
							}),
						V.extend(a.pagination, { $el: t, el: t[0] }));
				}
			},
			destroy: function () {
				var e = this,
					t = e.params.pagination;
				if (
					t.el &&
					e.pagination.el &&
					e.pagination.$el &&
					0 !== e.pagination.$el.length
				) {
					var a = e.pagination.$el;
					a.removeClass(t.hiddenClass),
						a.removeClass(t.modifierClass + t.type),
						e.pagination.bullets &&
							e.pagination.bullets.removeClass(
								t.bulletActiveClass
							),
						t.clickable && a.off("click", "." + t.bulletClass);
				}
			},
		},
		X = {
			setTranslate: function () {
				var e = this;
				if (e.params.scrollbar.el && e.scrollbar.el) {
					var t = e.scrollbar,
						a = e.rtlTranslate,
						i = e.progress,
						s = t.dragSize,
						r = t.trackSize,
						n = t.$dragEl,
						o = t.$el,
						l = e.params.scrollbar,
						d = s,
						p = (r - s) * i;
					a
						? 0 < (p = -p)
							? ((d = s - p), (p = 0))
							: r < -p + s && (d = r + p)
						: p < 0
						? ((d = s + p), (p = 0))
						: r < p + s && (d = r - p),
						e.isHorizontal()
							? (R.transforms3d
									? n.transform(
											"translate3d(" + p + "px, 0, 0)"
									  )
									: n.transform("translateX(" + p + "px)"),
							  (n[0].style.width = d + "px"))
							: (R.transforms3d
									? n.transform(
											"translate3d(0px, " + p + "px, 0)"
									  )
									: n.transform("translateY(" + p + "px)"),
							  (n[0].style.height = d + "px")),
						l.hide &&
							(clearTimeout(e.scrollbar.timeout),
							(o[0].style.opacity = 1),
							(e.scrollbar.timeout = setTimeout(function () {
								(o[0].style.opacity = 0), o.transition(400);
							}, 1e3)));
				}
			},
			setTransition: function (e) {
				this.params.scrollbar.el &&
					this.scrollbar.el &&
					this.scrollbar.$dragEl.transition(e);
			},
			updateSize: function () {
				var e = this;
				if (e.params.scrollbar.el && e.scrollbar.el) {
					var t = e.scrollbar,
						a = t.$dragEl,
						i = t.$el;
					(a[0].style.width = ""), (a[0].style.height = "");
					var s,
						r = e.isHorizontal()
							? i[0].offsetWidth
							: i[0].offsetHeight,
						n = e.size / e.virtualSize,
						o = n * (r / e.size);
					(s =
						"auto" === e.params.scrollbar.dragSize
							? r * n
							: parseInt(e.params.scrollbar.dragSize, 10)),
						e.isHorizontal()
							? (a[0].style.width = s + "px")
							: (a[0].style.height = s + "px"),
						(i[0].style.display = 1 <= n ? "none" : ""),
						e.params.scrollbarHide && (i[0].style.opacity = 0),
						V.extend(t, {
							trackSize: r,
							divider: n,
							moveDivider: o,
							dragSize: s,
						}),
						t.$el[
							e.params.watchOverflow && e.isLocked
								? "addClass"
								: "removeClass"
						](e.params.scrollbar.lockClass);
				}
			},
			setDragPosition: function (e) {
				var t,
					a = this,
					i = a.scrollbar,
					s = a.rtlTranslate,
					r = i.$el,
					n = i.dragSize,
					o = i.trackSize;
				(t =
					((a.isHorizontal()
						? "touchstart" === e.type || "touchmove" === e.type
							? e.targetTouches[0].pageX
							: e.pageX || e.clientX
						: "touchstart" === e.type || "touchmove" === e.type
						? e.targetTouches[0].pageY
						: e.pageY || e.clientY) -
						r.offset()[a.isHorizontal() ? "left" : "top"] -
						n / 2) /
					(o - n)),
					(t = Math.max(Math.min(t, 1), 0)),
					s && (t = 1 - t);
				var l =
					a.minTranslate() +
					(a.maxTranslate() - a.minTranslate()) * t;
				a.updateProgress(l),
					a.setTranslate(l),
					a.updateActiveIndex(),
					a.updateSlidesClasses();
			},
			onDragStart: function (e) {
				var t = this,
					a = t.params.scrollbar,
					i = t.scrollbar,
					s = t.$wrapperEl,
					r = i.$el,
					n = i.$dragEl;
				(t.scrollbar.isTouched = !0),
					e.preventDefault(),
					e.stopPropagation(),
					s.transition(100),
					n.transition(100),
					i.setDragPosition(e),
					clearTimeout(t.scrollbar.dragTimeout),
					r.transition(0),
					a.hide && r.css("opacity", 1),
					t.emit("scrollbarDragStart", e);
			},
			onDragMove: function (e) {
				var t = this.scrollbar,
					a = this.$wrapperEl,
					i = t.$el,
					s = t.$dragEl;
				this.scrollbar.isTouched &&
					(e.preventDefault
						? e.preventDefault()
						: (e.returnValue = !1),
					t.setDragPosition(e),
					a.transition(0),
					i.transition(0),
					s.transition(0),
					this.emit("scrollbarDragMove", e));
			},
			onDragEnd: function (e) {
				var t = this,
					a = t.params.scrollbar,
					i = t.scrollbar.$el;
				t.scrollbar.isTouched &&
					((t.scrollbar.isTouched = !1),
					a.hide &&
						(clearTimeout(t.scrollbar.dragTimeout),
						(t.scrollbar.dragTimeout = V.nextTick(function () {
							i.css("opacity", 0), i.transition(400);
						}, 1e3))),
					t.emit("scrollbarDragEnd", e),
					a.snapOnRelease && t.slideToClosest());
			},
			enableDraggable: function () {
				var e = this;
				if (e.params.scrollbar.el) {
					var t = e.scrollbar,
						a = e.touchEvents,
						i = e.touchEventsDesktop,
						s = e.params,
						r = t.$el[0],
						n = !(!R.passiveListener || !s.passiveListeners) && {
							passive: !1,
							capture: !1,
						},
						o = !(!R.passiveListener || !s.passiveListeners) && {
							passive: !0,
							capture: !1,
						};
					R.touch || (!R.pointerEvents && !R.prefixedPointerEvents)
						? (R.touch &&
								(r.addEventListener(
									a.start,
									e.scrollbar.onDragStart,
									n
								),
								r.addEventListener(
									a.move,
									e.scrollbar.onDragMove,
									n
								),
								r.addEventListener(
									a.end,
									e.scrollbar.onDragEnd,
									o
								)),
						  ((s.simulateTouch && !m.ios && !m.android) ||
								(s.simulateTouch && !R.touch && m.ios)) &&
								(r.addEventListener(
									"mousedown",
									e.scrollbar.onDragStart,
									n
								),
								f.addEventListener(
									"mousemove",
									e.scrollbar.onDragMove,
									n
								),
								f.addEventListener(
									"mouseup",
									e.scrollbar.onDragEnd,
									o
								)))
						: (r.addEventListener(
								i.start,
								e.scrollbar.onDragStart,
								n
						  ),
						  f.addEventListener(i.move, e.scrollbar.onDragMove, n),
						  f.addEventListener(i.end, e.scrollbar.onDragEnd, o));
				}
			},
			disableDraggable: function () {
				var e = this;
				if (e.params.scrollbar.el) {
					var t = e.scrollbar,
						a = e.touchEvents,
						i = e.touchEventsDesktop,
						s = e.params,
						r = t.$el[0],
						n = !(!R.passiveListener || !s.passiveListeners) && {
							passive: !1,
							capture: !1,
						},
						o = !(!R.passiveListener || !s.passiveListeners) && {
							passive: !0,
							capture: !1,
						};
					R.touch || (!R.pointerEvents && !R.prefixedPointerEvents)
						? (R.touch &&
								(r.removeEventListener(
									a.start,
									e.scrollbar.onDragStart,
									n
								),
								r.removeEventListener(
									a.move,
									e.scrollbar.onDragMove,
									n
								),
								r.removeEventListener(
									a.end,
									e.scrollbar.onDragEnd,
									o
								)),
						  ((s.simulateTouch && !m.ios && !m.android) ||
								(s.simulateTouch && !R.touch && m.ios)) &&
								(r.removeEventListener(
									"mousedown",
									e.scrollbar.onDragStart,
									n
								),
								f.removeEventListener(
									"mousemove",
									e.scrollbar.onDragMove,
									n
								),
								f.removeEventListener(
									"mouseup",
									e.scrollbar.onDragEnd,
									o
								)))
						: (r.removeEventListener(
								i.start,
								e.scrollbar.onDragStart,
								n
						  ),
						  f.removeEventListener(
								i.move,
								e.scrollbar.onDragMove,
								n
						  ),
						  f.removeEventListener(
								i.end,
								e.scrollbar.onDragEnd,
								o
						  ));
				}
			},
			init: function () {
				var e = this;
				if (e.params.scrollbar.el) {
					var t = e.scrollbar,
						a = e.$el,
						i = e.params.scrollbar,
						s = L(i.el);
					e.params.uniqueNavElements &&
						"string" == typeof i.el &&
						1 < s.length &&
						1 === a.find(i.el).length &&
						(s = a.find(i.el));
					var r = s.find("." + e.params.scrollbar.dragClass);
					0 === r.length &&
						((r = L(
							'<div class="' +
								e.params.scrollbar.dragClass +
								'"></div>'
						)),
						s.append(r)),
						V.extend(t, {
							$el: s,
							el: s[0],
							$dragEl: r,
							dragEl: r[0],
						}),
						i.draggable && t.enableDraggable();
				}
			},
			destroy: function () {
				this.scrollbar.disableDraggable();
			},
		},
		F = {
			setTransform: function (e, t) {
				var a = this.rtl,
					i = L(e),
					s = a ? -1 : 1,
					r = i.attr("data-swiper-parallax") || "0",
					n = i.attr("data-swiper-parallax-x"),
					o = i.attr("data-swiper-parallax-y"),
					l = i.attr("data-swiper-parallax-scale"),
					d = i.attr("data-swiper-parallax-opacity");
				if (
					(n || o
						? ((n = n || "0"), (o = o || "0"))
						: this.isHorizontal()
						? ((n = r), (o = "0"))
						: ((o = r), (n = "0")),
					(n =
						0 <= n.indexOf("%")
							? parseInt(n, 10) * t * s + "%"
							: n * t * s + "px"),
					(o =
						0 <= o.indexOf("%")
							? parseInt(o, 10) * t + "%"
							: o * t + "px"),
					null != d)
				) {
					var p = d - (d - 1) * (1 - Math.abs(t));
					i[0].style.opacity = p;
				}
				if (null == l)
					i.transform("translate3d(" + n + ", " + o + ", 0px)");
				else {
					var c = l - (l - 1) * (1 - Math.abs(t));
					i.transform(
						"translate3d(" +
							n +
							", " +
							o +
							", 0px) scale(" +
							c +
							")"
					);
				}
			},
			setTranslate: function () {
				var i = this,
					e = i.$el,
					t = i.slides,
					s = i.progress,
					r = i.snapGrid;
				e
					.children(
						"[data-swiper-parallax], [data-swiper-parallax-x], [data-swiper-parallax-y]"
					)
					.each(function (e, t) {
						i.parallax.setTransform(t, s);
					}),
					t.each(function (e, t) {
						var a = t.progress;
						1 < i.params.slidesPerGroup &&
							"auto" !== i.params.slidesPerView &&
							(a += Math.ceil(e / 2) - s * (r.length - 1)),
							(a = Math.min(Math.max(a, -1), 1)),
							L(t)
								.find(
									"[data-swiper-parallax], [data-swiper-parallax-x], [data-swiper-parallax-y]"
								)
								.each(function (e, t) {
									i.parallax.setTransform(t, a);
								});
					});
			},
			setTransition: function (s) {
				void 0 === s && (s = this.params.speed);
				this.$el
					.find(
						"[data-swiper-parallax], [data-swiper-parallax-x], [data-swiper-parallax-y]"
					)
					.each(function (e, t) {
						var a = L(t),
							i =
								parseInt(
									a.attr("data-swiper-parallax-duration"),
									10
								) || s;
						0 === s && (i = 0), a.transition(i);
					});
			},
		},
		q = {
			getDistanceBetweenTouches: function (e) {
				if (e.targetTouches.length < 2) return 1;
				var t = e.targetTouches[0].pageX,
					a = e.targetTouches[0].pageY,
					i = e.targetTouches[1].pageX,
					s = e.targetTouches[1].pageY;
				return Math.sqrt(Math.pow(i - t, 2) + Math.pow(s - a, 2));
			},
			onGestureStart: function (e) {
				var t = this,
					a = t.params.zoom,
					i = t.zoom,
					s = i.gesture;
				if (
					((i.fakeGestureTouched = !1),
					(i.fakeGestureMoved = !1),
					!R.gestures)
				) {
					if (
						"touchstart" !== e.type ||
						("touchstart" === e.type && e.targetTouches.length < 2)
					)
						return;
					(i.fakeGestureTouched = !0),
						(s.scaleStart = q.getDistanceBetweenTouches(e));
				}
				(s.$slideEl && s.$slideEl.length) ||
				((s.$slideEl = L(e.target).closest(".swiper-slide")),
				0 === s.$slideEl.length &&
					(s.$slideEl = t.slides.eq(t.activeIndex)),
				(s.$imageEl = s.$slideEl.find("img, svg, canvas")),
				(s.$imageWrapEl = s.$imageEl.parent("." + a.containerClass)),
				(s.maxRatio =
					s.$imageWrapEl.attr("data-swiper-zoom") || a.maxRatio),
				0 !== s.$imageWrapEl.length)
					? (s.$imageEl.transition(0), (t.zoom.isScaling = !0))
					: (s.$imageEl = void 0);
			},
			onGestureChange: function (e) {
				var t = this.params.zoom,
					a = this.zoom,
					i = a.gesture;
				if (!R.gestures) {
					if (
						"touchmove" !== e.type ||
						("touchmove" === e.type && e.targetTouches.length < 2)
					)
						return;
					(a.fakeGestureMoved = !0),
						(i.scaleMove = q.getDistanceBetweenTouches(e));
				}
				i.$imageEl &&
					0 !== i.$imageEl.length &&
					(R.gestures
						? (this.zoom.scale = e.scale * a.currentScale)
						: (a.scale =
								(i.scaleMove / i.scaleStart) * a.currentScale),
					a.scale > i.maxRatio &&
						(a.scale =
							i.maxRatio -
							1 +
							Math.pow(a.scale - i.maxRatio + 1, 0.5)),
					a.scale < t.minRatio &&
						(a.scale =
							t.minRatio +
							1 -
							Math.pow(t.minRatio - a.scale + 1, 0.5)),
					i.$imageEl.transform(
						"translate3d(0,0,0) scale(" + a.scale + ")"
					));
			},
			onGestureEnd: function (e) {
				var t = this.params.zoom,
					a = this.zoom,
					i = a.gesture;
				if (!R.gestures) {
					if (!a.fakeGestureTouched || !a.fakeGestureMoved) return;
					if (
						"touchend" !== e.type ||
						("touchend" === e.type &&
							e.changedTouches.length < 2 &&
							!m.android)
					)
						return;
					(a.fakeGestureTouched = !1), (a.fakeGestureMoved = !1);
				}
				i.$imageEl &&
					0 !== i.$imageEl.length &&
					((a.scale = Math.max(
						Math.min(a.scale, i.maxRatio),
						t.minRatio
					)),
					i.$imageEl
						.transition(this.params.speed)
						.transform("translate3d(0,0,0) scale(" + a.scale + ")"),
					(a.currentScale = a.scale),
					(a.isScaling = !1),
					1 === a.scale && (i.$slideEl = void 0));
			},
			onTouchStart: function (e) {
				var t = this.zoom,
					a = t.gesture,
					i = t.image;
				a.$imageEl &&
					0 !== a.$imageEl.length &&
					(i.isTouched ||
						(m.android && e.preventDefault(),
						(i.isTouched = !0),
						(i.touchesStart.x =
							"touchstart" === e.type
								? e.targetTouches[0].pageX
								: e.pageX),
						(i.touchesStart.y =
							"touchstart" === e.type
								? e.targetTouches[0].pageY
								: e.pageY)));
			},
			onTouchMove: function (e) {
				var t = this,
					a = t.zoom,
					i = a.gesture,
					s = a.image,
					r = a.velocity;
				if (
					i.$imageEl &&
					0 !== i.$imageEl.length &&
					((t.allowClick = !1), s.isTouched && i.$slideEl)
				) {
					s.isMoved ||
						((s.width = i.$imageEl[0].offsetWidth),
						(s.height = i.$imageEl[0].offsetHeight),
						(s.startX =
							V.getTranslate(i.$imageWrapEl[0], "x") || 0),
						(s.startY =
							V.getTranslate(i.$imageWrapEl[0], "y") || 0),
						(i.slideWidth = i.$slideEl[0].offsetWidth),
						(i.slideHeight = i.$slideEl[0].offsetHeight),
						i.$imageWrapEl.transition(0),
						t.rtl &&
							((s.startX = -s.startX), (s.startY = -s.startY)));
					var n = s.width * a.scale,
						o = s.height * a.scale;
					if (!(n < i.slideWidth && o < i.slideHeight)) {
						if (
							((s.minX = Math.min(i.slideWidth / 2 - n / 2, 0)),
							(s.maxX = -s.minX),
							(s.minY = Math.min(i.slideHeight / 2 - o / 2, 0)),
							(s.maxY = -s.minY),
							(s.touchesCurrent.x =
								"touchmove" === e.type
									? e.targetTouches[0].pageX
									: e.pageX),
							(s.touchesCurrent.y =
								"touchmove" === e.type
									? e.targetTouches[0].pageY
									: e.pageY),
							!s.isMoved && !a.isScaling)
						) {
							if (
								t.isHorizontal() &&
								((Math.floor(s.minX) === Math.floor(s.startX) &&
									s.touchesCurrent.x < s.touchesStart.x) ||
									(Math.floor(s.maxX) ===
										Math.floor(s.startX) &&
										s.touchesCurrent.x > s.touchesStart.x))
							)
								return void (s.isTouched = !1);
							if (
								!t.isHorizontal() &&
								((Math.floor(s.minY) === Math.floor(s.startY) &&
									s.touchesCurrent.y < s.touchesStart.y) ||
									(Math.floor(s.maxY) ===
										Math.floor(s.startY) &&
										s.touchesCurrent.y > s.touchesStart.y))
							)
								return void (s.isTouched = !1);
						}
						e.preventDefault(),
							e.stopPropagation(),
							(s.isMoved = !0),
							(s.currentX =
								s.touchesCurrent.x -
								s.touchesStart.x +
								s.startX),
							(s.currentY =
								s.touchesCurrent.y -
								s.touchesStart.y +
								s.startY),
							s.currentX < s.minX &&
								(s.currentX =
									s.minX +
									1 -
									Math.pow(s.minX - s.currentX + 1, 0.8)),
							s.currentX > s.maxX &&
								(s.currentX =
									s.maxX -
									1 +
									Math.pow(s.currentX - s.maxX + 1, 0.8)),
							s.currentY < s.minY &&
								(s.currentY =
									s.minY +
									1 -
									Math.pow(s.minY - s.currentY + 1, 0.8)),
							s.currentY > s.maxY &&
								(s.currentY =
									s.maxY -
									1 +
									Math.pow(s.currentY - s.maxY + 1, 0.8)),
							r.prevPositionX ||
								(r.prevPositionX = s.touchesCurrent.x),
							r.prevPositionY ||
								(r.prevPositionY = s.touchesCurrent.y),
							r.prevTime || (r.prevTime = Date.now()),
							(r.x =
								(s.touchesCurrent.x - r.prevPositionX) /
								(Date.now() - r.prevTime) /
								2),
							(r.y =
								(s.touchesCurrent.y - r.prevPositionY) /
								(Date.now() - r.prevTime) /
								2),
							Math.abs(s.touchesCurrent.x - r.prevPositionX) <
								2 && (r.x = 0),
							Math.abs(s.touchesCurrent.y - r.prevPositionY) <
								2 && (r.y = 0),
							(r.prevPositionX = s.touchesCurrent.x),
							(r.prevPositionY = s.touchesCurrent.y),
							(r.prevTime = Date.now()),
							i.$imageWrapEl.transform(
								"translate3d(" +
									s.currentX +
									"px, " +
									s.currentY +
									"px,0)"
							);
					}
				}
			},
			onTouchEnd: function () {
				var e = this.zoom,
					t = e.gesture,
					a = e.image,
					i = e.velocity;
				if (t.$imageEl && 0 !== t.$imageEl.length) {
					if (!a.isTouched || !a.isMoved)
						return (a.isTouched = !1), void (a.isMoved = !1);
					(a.isTouched = !1), (a.isMoved = !1);
					var s = 300,
						r = 300,
						n = i.x * s,
						o = a.currentX + n,
						l = i.y * r,
						d = a.currentY + l;
					0 !== i.x && (s = Math.abs((o - a.currentX) / i.x)),
						0 !== i.y && (r = Math.abs((d - a.currentY) / i.y));
					var p = Math.max(s, r);
					(a.currentX = o), (a.currentY = d);
					var c = a.width * e.scale,
						u = a.height * e.scale;
					(a.minX = Math.min(t.slideWidth / 2 - c / 2, 0)),
						(a.maxX = -a.minX),
						(a.minY = Math.min(t.slideHeight / 2 - u / 2, 0)),
						(a.maxY = -a.minY),
						(a.currentX = Math.max(
							Math.min(a.currentX, a.maxX),
							a.minX
						)),
						(a.currentY = Math.max(
							Math.min(a.currentY, a.maxY),
							a.minY
						)),
						t.$imageWrapEl
							.transition(p)
							.transform(
								"translate3d(" +
									a.currentX +
									"px, " +
									a.currentY +
									"px,0)"
							);
				}
			},
			onTransitionEnd: function () {
				var e = this.zoom,
					t = e.gesture;
				t.$slideEl &&
					this.previousIndex !== this.activeIndex &&
					(t.$imageEl.transform("translate3d(0,0,0) scale(1)"),
					t.$imageWrapEl.transform("translate3d(0,0,0)"),
					(t.$slideEl = void 0),
					(t.$imageEl = void 0),
					(t.$imageWrapEl = void 0),
					(e.scale = 1),
					(e.currentScale = 1));
			},
			toggle: function (e) {
				var t = this.zoom;
				t.scale && 1 !== t.scale ? t.out() : t.in(e);
			},
			in: function (e) {
				var t,
					a,
					i,
					s,
					r,
					n,
					o,
					l,
					d,
					p,
					c,
					u,
					h,
					v,
					f,
					m,
					g = this,
					b = g.zoom,
					w = g.params.zoom,
					y = b.gesture,
					x = b.image;
				(y.$slideEl ||
					((y.$slideEl = g.clickedSlide
						? L(g.clickedSlide)
						: g.slides.eq(g.activeIndex)),
					(y.$imageEl = y.$slideEl.find("img, svg, canvas")),
					(y.$imageWrapEl = y.$imageEl.parent(
						"." + w.containerClass
					))),
				y.$imageEl && 0 !== y.$imageEl.length) &&
					(y.$slideEl.addClass("" + w.zoomedSlideClass),
					void 0 === x.touchesStart.x && e
						? ((t =
								"touchend" === e.type
									? e.changedTouches[0].pageX
									: e.pageX),
						  (a =
								"touchend" === e.type
									? e.changedTouches[0].pageY
									: e.pageY))
						: ((t = x.touchesStart.x), (a = x.touchesStart.y)),
					(b.scale =
						y.$imageWrapEl.attr("data-swiper-zoom") || w.maxRatio),
					(b.currentScale =
						y.$imageWrapEl.attr("data-swiper-zoom") || w.maxRatio),
					e
						? ((f = y.$slideEl[0].offsetWidth),
						  (m = y.$slideEl[0].offsetHeight),
						  (i = y.$slideEl.offset().left + f / 2 - t),
						  (s = y.$slideEl.offset().top + m / 2 - a),
						  (o = y.$imageEl[0].offsetWidth),
						  (l = y.$imageEl[0].offsetHeight),
						  (d = o * b.scale),
						  (p = l * b.scale),
						  (h = -(c = Math.min(f / 2 - d / 2, 0))),
						  (v = -(u = Math.min(m / 2 - p / 2, 0))),
						  (r = i * b.scale) < c && (r = c),
						  h < r && (r = h),
						  (n = s * b.scale) < u && (n = u),
						  v < n && (n = v))
						: (n = r = 0),
					y.$imageWrapEl
						.transition(300)
						.transform("translate3d(" + r + "px, " + n + "px,0)"),
					y.$imageEl
						.transition(300)
						.transform(
							"translate3d(0,0,0) scale(" + b.scale + ")"
						));
			},
			out: function () {
				var e = this,
					t = e.zoom,
					a = e.params.zoom,
					i = t.gesture;
				i.$slideEl ||
					((i.$slideEl = e.clickedSlide
						? L(e.clickedSlide)
						: e.slides.eq(e.activeIndex)),
					(i.$imageEl = i.$slideEl.find("img, svg, canvas")),
					(i.$imageWrapEl = i.$imageEl.parent(
						"." + a.containerClass
					))),
					i.$imageEl &&
						0 !== i.$imageEl.length &&
						((t.scale = 1),
						(t.currentScale = 1),
						i.$imageWrapEl
							.transition(300)
							.transform("translate3d(0,0,0)"),
						i.$imageEl
							.transition(300)
							.transform("translate3d(0,0,0) scale(1)"),
						i.$slideEl.removeClass("" + a.zoomedSlideClass),
						(i.$slideEl = void 0));
			},
			enable: function () {
				var e = this,
					t = e.zoom;
				if (!t.enabled) {
					t.enabled = !0;
					var a = !(
						"touchstart" !== e.touchEvents.start ||
						!R.passiveListener ||
						!e.params.passiveListeners
					) && { passive: !0, capture: !1 };
					R.gestures
						? (e.$wrapperEl.on(
								"gesturestart",
								".swiper-slide",
								t.onGestureStart,
								a
						  ),
						  e.$wrapperEl.on(
								"gesturechange",
								".swiper-slide",
								t.onGestureChange,
								a
						  ),
						  e.$wrapperEl.on(
								"gestureend",
								".swiper-slide",
								t.onGestureEnd,
								a
						  ))
						: "touchstart" === e.touchEvents.start &&
						  (e.$wrapperEl.on(
								e.touchEvents.start,
								".swiper-slide",
								t.onGestureStart,
								a
						  ),
						  e.$wrapperEl.on(
								e.touchEvents.move,
								".swiper-slide",
								t.onGestureChange,
								a
						  ),
						  e.$wrapperEl.on(
								e.touchEvents.end,
								".swiper-slide",
								t.onGestureEnd,
								a
						  )),
						e.$wrapperEl.on(
							e.touchEvents.move,
							"." + e.params.zoom.containerClass,
							t.onTouchMove
						);
				}
			},
			disable: function () {
				var e = this,
					t = e.zoom;
				if (t.enabled) {
					e.zoom.enabled = !1;
					var a = !(
						"touchstart" !== e.touchEvents.start ||
						!R.passiveListener ||
						!e.params.passiveListeners
					) && { passive: !0, capture: !1 };
					R.gestures
						? (e.$wrapperEl.off(
								"gesturestart",
								".swiper-slide",
								t.onGestureStart,
								a
						  ),
						  e.$wrapperEl.off(
								"gesturechange",
								".swiper-slide",
								t.onGestureChange,
								a
						  ),
						  e.$wrapperEl.off(
								"gestureend",
								".swiper-slide",
								t.onGestureEnd,
								a
						  ))
						: "touchstart" === e.touchEvents.start &&
						  (e.$wrapperEl.off(
								e.touchEvents.start,
								".swiper-slide",
								t.onGestureStart,
								a
						  ),
						  e.$wrapperEl.off(
								e.touchEvents.move,
								".swiper-slide",
								t.onGestureChange,
								a
						  ),
						  e.$wrapperEl.off(
								e.touchEvents.end,
								".swiper-slide",
								t.onGestureEnd,
								a
						  )),
						e.$wrapperEl.off(
							e.touchEvents.move,
							"." + e.params.zoom.containerClass,
							t.onTouchMove
						);
				}
			},
		},
		W = {
			loadInSlide: function (e, l) {
				void 0 === l && (l = !0);
				var d = this,
					p = d.params.lazy;
				if (void 0 !== e && 0 !== d.slides.length) {
					var c =
							d.virtual && d.params.virtual.enabled
								? d.$wrapperEl.children(
										"." +
											d.params.slideClass +
											'[data-swiper-slide-index="' +
											e +
											'"]'
								  )
								: d.slides.eq(e),
						t = c.find(
							"." +
								p.elementClass +
								":not(." +
								p.loadedClass +
								"):not(." +
								p.loadingClass +
								")"
						);
					!c.hasClass(p.elementClass) ||
						c.hasClass(p.loadedClass) ||
						c.hasClass(p.loadingClass) ||
						(t = t.add(c[0])),
						0 !== t.length &&
							t.each(function (e, t) {
								var i = L(t);
								i.addClass(p.loadingClass);
								var s = i.attr("data-background"),
									r = i.attr("data-src"),
									n = i.attr("data-srcset"),
									o = i.attr("data-sizes");
								d.loadImage(
									i[0],
									r || s,
									n,
									o,
									!1,
									function () {
										if (
											null != d &&
											d &&
											(!d || d.params) &&
											!d.destroyed
										) {
											if (
												(s
													? (i.css(
															"background-image",
															'url("' + s + '")'
													  ),
													  i.removeAttr(
															"data-background"
													  ))
													: (n &&
															(i.attr(
																"srcset",
																n
															),
															i.removeAttr(
																"data-srcset"
															)),
													  o &&
															(i.attr("sizes", o),
															i.removeAttr(
																"data-sizes"
															)),
													  r &&
															(i.attr("src", r),
															i.removeAttr(
																"data-src"
															))),
												i
													.addClass(p.loadedClass)
													.removeClass(
														p.loadingClass
													),
												c
													.find(
														"." + p.preloaderClass
													)
													.remove(),
												d.params.loop && l)
											) {
												var e = c.attr(
													"data-swiper-slide-index"
												);
												if (
													c.hasClass(
														d.params
															.slideDuplicateClass
													)
												) {
													var t =
														d.$wrapperEl.children(
															'[data-swiper-slide-index="' +
																e +
																'"]:not(.' +
																d.params
																	.slideDuplicateClass +
																")"
														);
													d.lazy.loadInSlide(
														t.index(),
														!1
													);
												} else {
													var a =
														d.$wrapperEl.children(
															"." +
																d.params
																	.slideDuplicateClass +
																'[data-swiper-slide-index="' +
																e +
																'"]'
														);
													d.lazy.loadInSlide(
														a.index(),
														!1
													);
												}
											}
											d.emit(
												"lazyImageReady",
												c[0],
												i[0]
											);
										}
									}
								),
									d.emit("lazyImageLoad", c[0], i[0]);
							});
				}
			},
			load: function () {
				var i = this,
					t = i.$wrapperEl,
					a = i.params,
					s = i.slides,
					e = i.activeIndex,
					r = i.virtual && a.virtual.enabled,
					n = a.lazy,
					o = a.slidesPerView;
				function l(e) {
					if (r) {
						if (
							t.children(
								"." +
									a.slideClass +
									'[data-swiper-slide-index="' +
									e +
									'"]'
							).length
						)
							return !0;
					} else if (s[e]) return !0;
					return !1;
				}
				function d(e) {
					return r
						? L(e).attr("data-swiper-slide-index")
						: L(e).index();
				}
				if (
					("auto" === o && (o = 0),
					i.lazy.initialImageLoaded ||
						(i.lazy.initialImageLoaded = !0),
					i.params.watchSlidesVisibility)
				)
					t.children("." + a.slideVisibleClass).each(function (e, t) {
						var a = r
							? L(t).attr("data-swiper-slide-index")
							: L(t).index();
						i.lazy.loadInSlide(a);
					});
				else if (1 < o)
					for (var p = e; p < e + o; p += 1)
						l(p) && i.lazy.loadInSlide(p);
				else i.lazy.loadInSlide(e);
				if (n.loadPrevNext)
					if (
						1 < o ||
						(n.loadPrevNextAmount && 1 < n.loadPrevNextAmount)
					) {
						for (
							var c = n.loadPrevNextAmount,
								u = o,
								h = Math.min(e + u + Math.max(c, u), s.length),
								v = Math.max(e - Math.max(u, c), 0),
								f = e + o;
							f < h;
							f += 1
						)
							l(f) && i.lazy.loadInSlide(f);
						for (var m = v; m < e; m += 1)
							l(m) && i.lazy.loadInSlide(m);
					} else {
						var g = t.children("." + a.slideNextClass);
						0 < g.length && i.lazy.loadInSlide(d(g));
						var b = t.children("." + a.slidePrevClass);
						0 < b.length && i.lazy.loadInSlide(d(b));
					}
			},
		},
		j = {
			LinearSpline: function (e, t) {
				var a,
					i,
					s,
					r,
					n,
					o = function (e, t) {
						for (i = -1, a = e.length; 1 < a - i; )
							e[(s = (a + i) >> 1)] <= t ? (i = s) : (a = s);
						return a;
					};
				return (
					(this.x = e),
					(this.y = t),
					(this.lastIndex = e.length - 1),
					(this.interpolate = function (e) {
						return e
							? ((n = o(this.x, e)),
							  (r = n - 1),
							  ((e - this.x[r]) * (this.y[n] - this.y[r])) /
									(this.x[n] - this.x[r]) +
									this.y[r])
							: 0;
					}),
					this
				);
			},
			getInterpolateFunction: function (e) {
				var t = this;
				t.controller.spline ||
					(t.controller.spline = t.params.loop
						? new j.LinearSpline(t.slidesGrid, e.slidesGrid)
						: new j.LinearSpline(t.snapGrid, e.snapGrid));
			},
			setTranslate: function (e, t) {
				var a,
					i,
					s = this,
					r = s.controller.control;
				function n(e) {
					var t = s.rtlTranslate ? -s.translate : s.translate;
					"slide" === s.params.controller.by &&
						(s.controller.getInterpolateFunction(e),
						(i = -s.controller.spline.interpolate(-t))),
						(i && "container" !== s.params.controller.by) ||
							((a =
								(e.maxTranslate() - e.minTranslate()) /
								(s.maxTranslate() - s.minTranslate())),
							(i =
								(t - s.minTranslate()) * a + e.minTranslate())),
						s.params.controller.inverse &&
							(i = e.maxTranslate() - i),
						e.updateProgress(i),
						e.setTranslate(i, s),
						e.updateActiveIndex(),
						e.updateSlidesClasses();
				}
				if (Array.isArray(r))
					for (var o = 0; o < r.length; o += 1)
						r[o] !== t && r[o] instanceof S && n(r[o]);
				else r instanceof S && t !== r && n(r);
			},
			setTransition: function (t, e) {
				var a,
					i = this,
					s = i.controller.control;
				function r(e) {
					e.setTransition(t, i),
						0 !== t &&
							(e.transitionStart(),
							e.params.autoHeight &&
								V.nextTick(function () {
									e.updateAutoHeight();
								}),
							e.$wrapperEl.transitionEnd(function () {
								s &&
									(e.params.loop &&
										"slide" === i.params.controller.by &&
										e.loopFix(),
									e.transitionEnd());
							}));
				}
				if (Array.isArray(s))
					for (a = 0; a < s.length; a += 1)
						s[a] !== e && s[a] instanceof S && r(s[a]);
				else s instanceof S && e !== s && r(s);
			},
		},
		U = {
			makeElFocusable: function (e) {
				return e.attr("tabIndex", "0"), e;
			},
			addElRole: function (e, t) {
				return e.attr("role", t), e;
			},
			addElLabel: function (e, t) {
				return e.attr("aria-label", t), e;
			},
			disableEl: function (e) {
				return e.attr("aria-disabled", !0), e;
			},
			enableEl: function (e) {
				return e.attr("aria-disabled", !1), e;
			},
			onEnterKey: function (e) {
				var t = this,
					a = t.params.a11y;
				if (13 === e.keyCode) {
					var i = L(e.target);
					t.navigation &&
						t.navigation.$nextEl &&
						i.is(t.navigation.$nextEl) &&
						((t.isEnd && !t.params.loop) || t.slideNext(),
						t.isEnd
							? t.a11y.notify(a.lastSlideMessage)
							: t.a11y.notify(a.nextSlideMessage)),
						t.navigation &&
							t.navigation.$prevEl &&
							i.is(t.navigation.$prevEl) &&
							((t.isBeginning && !t.params.loop) || t.slidePrev(),
							t.isBeginning
								? t.a11y.notify(a.firstSlideMessage)
								: t.a11y.notify(a.prevSlideMessage)),
						t.pagination &&
							i.is("." + t.params.pagination.bulletClass) &&
							i[0].click();
				}
			},
			notify: function (e) {
				var t = this.a11y.liveRegion;
				0 !== t.length && (t.html(""), t.html(e));
			},
			updateNavigation: function () {
				var e = this;
				if (!e.params.loop) {
					var t = e.navigation,
						a = t.$nextEl,
						i = t.$prevEl;
					i &&
						0 < i.length &&
						(e.isBeginning
							? e.a11y.disableEl(i)
							: e.a11y.enableEl(i)),
						a &&
							0 < a.length &&
							(e.isEnd
								? e.a11y.disableEl(a)
								: e.a11y.enableEl(a));
				}
			},
			updatePagination: function () {
				var i = this,
					s = i.params.a11y;
				i.pagination &&
					i.params.pagination.clickable &&
					i.pagination.bullets &&
					i.pagination.bullets.length &&
					i.pagination.bullets.each(function (e, t) {
						var a = L(t);
						i.a11y.makeElFocusable(a),
							i.a11y.addElRole(a, "button"),
							i.a11y.addElLabel(
								a,
								s.paginationBulletMessage.replace(
									/{{index}}/,
									a.index() + 1
								)
							);
					});
			},
			init: function () {
				var e = this;
				e.$el.append(e.a11y.liveRegion);
				var t,
					a,
					i = e.params.a11y;
				e.navigation &&
					e.navigation.$nextEl &&
					(t = e.navigation.$nextEl),
					e.navigation &&
						e.navigation.$prevEl &&
						(a = e.navigation.$prevEl),
					t &&
						(e.a11y.makeElFocusable(t),
						e.a11y.addElRole(t, "button"),
						e.a11y.addElLabel(t, i.nextSlideMessage),
						t.on("keydown", e.a11y.onEnterKey)),
					a &&
						(e.a11y.makeElFocusable(a),
						e.a11y.addElRole(a, "button"),
						e.a11y.addElLabel(a, i.prevSlideMessage),
						a.on("keydown", e.a11y.onEnterKey)),
					e.pagination &&
						e.params.pagination.clickable &&
						e.pagination.bullets &&
						e.pagination.bullets.length &&
						e.pagination.$el.on(
							"keydown",
							"." + e.params.pagination.bulletClass,
							e.a11y.onEnterKey
						);
			},
			destroy: function () {
				var e,
					t,
					a = this;
				a.a11y.liveRegion &&
					0 < a.a11y.liveRegion.length &&
					a.a11y.liveRegion.remove(),
					a.navigation &&
						a.navigation.$nextEl &&
						(e = a.navigation.$nextEl),
					a.navigation &&
						a.navigation.$prevEl &&
						(t = a.navigation.$prevEl),
					e && e.off("keydown", a.a11y.onEnterKey),
					t && t.off("keydown", a.a11y.onEnterKey),
					a.pagination &&
						a.params.pagination.clickable &&
						a.pagination.bullets &&
						a.pagination.bullets.length &&
						a.pagination.$el.off(
							"keydown",
							"." + a.params.pagination.bulletClass,
							a.a11y.onEnterKey
						);
			},
		},
		K = {
			init: function () {
				var e = this;
				if (e.params.history) {
					if (!Y.history || !Y.history.pushState)
						return (
							(e.params.history.enabled = !1),
							void (e.params.hashNavigation.enabled = !0)
						);
					var t = e.history;
					(t.initialized = !0),
						(t.paths = K.getPathValues()),
						(t.paths.key || t.paths.value) &&
							(t.scrollToSlide(
								0,
								t.paths.value,
								e.params.runCallbacksOnInit
							),
							e.params.history.replaceState ||
								Y.addEventListener(
									"popstate",
									e.history.setHistoryPopState
								));
				}
			},
			destroy: function () {
				this.params.history.replaceState ||
					Y.removeEventListener(
						"popstate",
						this.history.setHistoryPopState
					);
			},
			setHistoryPopState: function () {
				(this.history.paths = K.getPathValues()),
					this.history.scrollToSlide(
						this.params.speed,
						this.history.paths.value,
						!1
					);
			},
			getPathValues: function () {
				var e = Y.location.pathname
						.slice(1)
						.split("/")
						.filter(function (e) {
							return "" !== e;
						}),
					t = e.length;
				return { key: e[t - 2], value: e[t - 1] };
			},
			setHistory: function (e, t) {
				if (this.history.initialized && this.params.history.enabled) {
					var a = this.slides.eq(t),
						i = K.slugify(a.attr("data-history"));
					Y.location.pathname.includes(e) || (i = e + "/" + i);
					var s = Y.history.state;
					(s && s.value === i) ||
						(this.params.history.replaceState
							? Y.history.replaceState({ value: i }, null, i)
							: Y.history.pushState({ value: i }, null, i));
				}
			},
			slugify: function (e) {
				return e
					.toString()
					.toLowerCase()
					.replace(/\s+/g, "-")
					.replace(/[^\w-]+/g, "")
					.replace(/--+/g, "-")
					.replace(/^-+/, "")
					.replace(/-+$/, "");
			},
			scrollToSlide: function (e, t, a) {
				var i = this;
				if (t)
					for (var s = 0, r = i.slides.length; s < r; s += 1) {
						var n = i.slides.eq(s);
						if (
							K.slugify(n.attr("data-history")) === t &&
							!n.hasClass(i.params.slideDuplicateClass)
						) {
							var o = n.index();
							i.slideTo(o, e, a);
						}
					}
				else i.slideTo(0, e, a);
			},
		},
		_ = {
			onHashCange: function () {
				var e = this,
					t = f.location.hash.replace("#", "");
				if (t !== e.slides.eq(e.activeIndex).attr("data-hash")) {
					var a = e.$wrapperEl
						.children(
							"." +
								e.params.slideClass +
								'[data-hash="' +
								t +
								'"]'
						)
						.index();
					if (void 0 === a) return;
					e.slideTo(a);
				}
			},
			setHash: function () {
				var e = this;
				if (
					e.hashNavigation.initialized &&
					e.params.hashNavigation.enabled
				)
					if (
						e.params.hashNavigation.replaceState &&
						Y.history &&
						Y.history.replaceState
					)
						Y.history.replaceState(
							null,
							null,
							"#" +
								e.slides.eq(e.activeIndex).attr("data-hash") ||
								""
						);
					else {
						var t = e.slides.eq(e.activeIndex),
							a = t.attr("data-hash") || t.attr("data-history");
						f.location.hash = a || "";
					}
			},
			init: function () {
				var e = this;
				if (
					!(
						!e.params.hashNavigation.enabled ||
						(e.params.history && e.params.history.enabled)
					)
				) {
					e.hashNavigation.initialized = !0;
					var t = f.location.hash.replace("#", "");
					if (t)
						for (var a = 0, i = e.slides.length; a < i; a += 1) {
							var s = e.slides.eq(a);
							if (
								(s.attr("data-hash") ||
									s.attr("data-history")) === t &&
								!s.hasClass(e.params.slideDuplicateClass)
							) {
								var r = s.index();
								e.slideTo(
									r,
									0,
									e.params.runCallbacksOnInit,
									!0
								);
							}
						}
					e.params.hashNavigation.watchState &&
						L(Y).on("hashchange", e.hashNavigation.onHashCange);
				}
			},
			destroy: function () {
				this.params.hashNavigation.watchState &&
					L(Y).off("hashchange", this.hashNavigation.onHashCange);
			},
		},
		Z = {
			run: function () {
				var e = this,
					t = e.slides.eq(e.activeIndex),
					a = e.params.autoplay.delay;
				t.attr("data-swiper-autoplay") &&
					(a =
						t.attr("data-swiper-autoplay") ||
						e.params.autoplay.delay),
					(e.autoplay.timeout = V.nextTick(function () {
						e.params.autoplay.reverseDirection
							? e.params.loop
								? (e.loopFix(),
								  e.slidePrev(e.params.speed, !0, !0),
								  e.emit("autoplay"))
								: e.isBeginning
								? e.params.autoplay.stopOnLastSlide
									? e.autoplay.stop()
									: (e.slideTo(
											e.slides.length - 1,
											e.params.speed,
											!0,
											!0
									  ),
									  e.emit("autoplay"))
								: (e.slidePrev(e.params.speed, !0, !0),
								  e.emit("autoplay"))
							: e.params.loop
							? (e.loopFix(),
							  e.slideNext(e.params.speed, !0, !0),
							  e.emit("autoplay"))
							: e.isEnd
							? e.params.autoplay.stopOnLastSlide
								? e.autoplay.stop()
								: (e.slideTo(0, e.params.speed, !0, !0),
								  e.emit("autoplay"))
							: (e.slideNext(e.params.speed, !0, !0),
							  e.emit("autoplay"));
					}, a));
			},
			start: function () {
				var e = this;
				return (
					void 0 === e.autoplay.timeout &&
					!e.autoplay.running &&
					((e.autoplay.running = !0),
					e.emit("autoplayStart"),
					e.autoplay.run(),
					!0)
				);
			},
			stop: function () {
				var e = this;
				return (
					!!e.autoplay.running &&
					void 0 !== e.autoplay.timeout &&
					(e.autoplay.timeout &&
						(clearTimeout(e.autoplay.timeout),
						(e.autoplay.timeout = void 0)),
					(e.autoplay.running = !1),
					e.emit("autoplayStop"),
					!0)
				);
			},
			pause: function (e) {
				var t = this;
				t.autoplay.running &&
					(t.autoplay.paused ||
						(t.autoplay.timeout && clearTimeout(t.autoplay.timeout),
						(t.autoplay.paused = !0),
						0 !== e && t.params.autoplay.waitForTransition
							? (t.$wrapperEl[0].addEventListener(
									"transitionend",
									t.autoplay.onTransitionEnd
							  ),
							  t.$wrapperEl[0].addEventListener(
									"webkitTransitionEnd",
									t.autoplay.onTransitionEnd
							  ))
							: ((t.autoplay.paused = !1), t.autoplay.run())));
			},
		},
		Q = {
			setTranslate: function () {
				for (var e = this, t = e.slides, a = 0; a < t.length; a += 1) {
					var i = e.slides.eq(a),
						s = -i[0].swiperSlideOffset;
					e.params.virtualTranslate || (s -= e.translate);
					var r = 0;
					e.isHorizontal() || ((r = s), (s = 0));
					var n = e.params.fadeEffect.crossFade
						? Math.max(1 - Math.abs(i[0].progress), 0)
						: 1 + Math.min(Math.max(i[0].progress, -1), 0);
					i.css({ opacity: n }).transform(
						"translate3d(" + s + "px, " + r + "px, 0px)"
					);
				}
			},
			setTransition: function (e) {
				var a = this,
					t = a.slides,
					i = a.$wrapperEl;
				if ((t.transition(e), a.params.virtualTranslate && 0 !== e)) {
					var s = !1;
					t.transitionEnd(function () {
						if (!s && a && !a.destroyed) {
							(s = !0), (a.animating = !1);
							for (
								var e = [
										"webkitTransitionEnd",
										"transitionend",
									],
									t = 0;
								t < e.length;
								t += 1
							)
								i.trigger(e[t]);
						}
					});
				}
			},
		},
		J = {
			setTranslate: function () {
				var e,
					t = this,
					a = t.$el,
					i = t.$wrapperEl,
					s = t.slides,
					r = t.width,
					n = t.height,
					o = t.rtlTranslate,
					l = t.size,
					d = t.params.cubeEffect,
					p = t.isHorizontal(),
					c = t.virtual && t.params.virtual.enabled,
					u = 0;
				d.shadow &&
					(p
						? (0 === (e = i.find(".swiper-cube-shadow")).length &&
								((e = L(
									'<div class="swiper-cube-shadow"></div>'
								)),
								i.append(e)),
						  e.css({ height: r + "px" }))
						: 0 === (e = a.find(".swiper-cube-shadow")).length &&
						  ((e = L('<div class="swiper-cube-shadow"></div>')),
						  a.append(e)));
				for (var h = 0; h < s.length; h += 1) {
					var v = s.eq(h),
						f = h;
					c && (f = parseInt(v.attr("data-swiper-slide-index"), 10));
					var m = 90 * f,
						g = Math.floor(m / 360);
					o && ((m = -m), (g = Math.floor(-m / 360)));
					var b = Math.max(Math.min(v[0].progress, 1), -1),
						w = 0,
						y = 0,
						x = 0;
					f % 4 == 0
						? ((w = 4 * -g * l), (x = 0))
						: (f - 1) % 4 == 0
						? ((w = 0), (x = 4 * -g * l))
						: (f - 2) % 4 == 0
						? ((w = l + 4 * g * l), (x = l))
						: (f - 3) % 4 == 0 &&
						  ((w = -l), (x = 3 * l + 4 * l * g)),
						o && (w = -w),
						p || ((y = w), (w = 0));
					var T =
						"rotateX(" +
						(p ? 0 : -m) +
						"deg) rotateY(" +
						(p ? m : 0) +
						"deg) translate3d(" +
						w +
						"px, " +
						y +
						"px, " +
						x +
						"px)";
					if (
						(b <= 1 &&
							-1 < b &&
							((u = 90 * f + 90 * b),
							o && (u = 90 * -f - 90 * b)),
						v.transform(T),
						d.slideShadows)
					) {
						var E = p
								? v.find(".swiper-slide-shadow-left")
								: v.find(".swiper-slide-shadow-top"),
							S = p
								? v.find(".swiper-slide-shadow-right")
								: v.find(".swiper-slide-shadow-bottom");
						0 === E.length &&
							((E = L(
								'<div class="swiper-slide-shadow-' +
									(p ? "left" : "top") +
									'"></div>'
							)),
							v.append(E)),
							0 === S.length &&
								((S = L(
									'<div class="swiper-slide-shadow-' +
										(p ? "right" : "bottom") +
										'"></div>'
								)),
								v.append(S)),
							E.length && (E[0].style.opacity = Math.max(-b, 0)),
							S.length && (S[0].style.opacity = Math.max(b, 0));
					}
				}
				if (
					(i.css({
						"-webkit-transform-origin": "50% 50% -" + l / 2 + "px",
						"-moz-transform-origin": "50% 50% -" + l / 2 + "px",
						"-ms-transform-origin": "50% 50% -" + l / 2 + "px",
						"transform-origin": "50% 50% -" + l / 2 + "px",
					}),
					d.shadow)
				)
					if (p)
						e.transform(
							"translate3d(0px, " +
								(r / 2 + d.shadowOffset) +
								"px, " +
								-r / 2 +
								"px) rotateX(90deg) rotateZ(0deg) scale(" +
								d.shadowScale +
								")"
						);
					else {
						var C = Math.abs(u) - 90 * Math.floor(Math.abs(u) / 90),
							M =
								1.5 -
								(Math.sin((2 * C * Math.PI) / 360) / 2 +
									Math.cos((2 * C * Math.PI) / 360) / 2),
							k = d.shadowScale,
							z = d.shadowScale / M,
							P = d.shadowOffset;
						e.transform(
							"scale3d(" +
								k +
								", 1, " +
								z +
								") translate3d(0px, " +
								(n / 2 + P) +
								"px, " +
								-n / 2 / z +
								"px) rotateX(-90deg)"
						);
					}
				var $ = I.isSafari || I.isUiWebView ? -l / 2 : 0;
				i.transform(
					"translate3d(0px,0," +
						$ +
						"px) rotateX(" +
						(t.isHorizontal() ? 0 : u) +
						"deg) rotateY(" +
						(t.isHorizontal() ? -u : 0) +
						"deg)"
				);
			},
			setTransition: function (e) {
				var t = this.$el;
				this.slides
					.transition(e)
					.find(
						".swiper-slide-shadow-top, .swiper-slide-shadow-right, .swiper-slide-shadow-bottom, .swiper-slide-shadow-left"
					)
					.transition(e),
					this.params.cubeEffect.shadow &&
						!this.isHorizontal() &&
						t.find(".swiper-cube-shadow").transition(e);
			},
		},
		ee = {
			setTranslate: function () {
				for (
					var e = this, t = e.slides, a = e.rtlTranslate, i = 0;
					i < t.length;
					i += 1
				) {
					var s = t.eq(i),
						r = s[0].progress;
					e.params.flipEffect.limitRotation &&
						(r = Math.max(Math.min(s[0].progress, 1), -1));
					var n = -180 * r,
						o = 0,
						l = -s[0].swiperSlideOffset,
						d = 0;
					if (
						(e.isHorizontal()
							? a && (n = -n)
							: ((d = l), (o = -n), (n = l = 0)),
						(s[0].style.zIndex =
							-Math.abs(Math.round(r)) + t.length),
						e.params.flipEffect.slideShadows)
					) {
						var p = e.isHorizontal()
								? s.find(".swiper-slide-shadow-left")
								: s.find(".swiper-slide-shadow-top"),
							c = e.isHorizontal()
								? s.find(".swiper-slide-shadow-right")
								: s.find(".swiper-slide-shadow-bottom");
						0 === p.length &&
							((p = L(
								'<div class="swiper-slide-shadow-' +
									(e.isHorizontal() ? "left" : "top") +
									'"></div>'
							)),
							s.append(p)),
							0 === c.length &&
								((c = L(
									'<div class="swiper-slide-shadow-' +
										(e.isHorizontal()
											? "right"
											: "bottom") +
										'"></div>'
								)),
								s.append(c)),
							p.length && (p[0].style.opacity = Math.max(-r, 0)),
							c.length && (c[0].style.opacity = Math.max(r, 0));
					}
					s.transform(
						"translate3d(" +
							l +
							"px, " +
							d +
							"px, 0px) rotateX(" +
							o +
							"deg) rotateY(" +
							n +
							"deg)"
					);
				}
			},
			setTransition: function (e) {
				var a = this,
					t = a.slides,
					i = a.activeIndex,
					s = a.$wrapperEl;
				if (
					(t
						.transition(e)
						.find(
							".swiper-slide-shadow-top, .swiper-slide-shadow-right, .swiper-slide-shadow-bottom, .swiper-slide-shadow-left"
						)
						.transition(e),
					a.params.virtualTranslate && 0 !== e)
				) {
					var r = !1;
					t.eq(i).transitionEnd(function () {
						if (!r && a && !a.destroyed) {
							(r = !0), (a.animating = !1);
							for (
								var e = [
										"webkitTransitionEnd",
										"transitionend",
									],
									t = 0;
								t < e.length;
								t += 1
							)
								s.trigger(e[t]);
						}
					});
				}
			},
		},
		te = {
			setTranslate: function () {
				for (
					var e = this,
						t = e.width,
						a = e.height,
						i = e.slides,
						s = e.$wrapperEl,
						r = e.slidesSizesGrid,
						n = e.params.coverflowEffect,
						o = e.isHorizontal(),
						l = e.translate,
						d = o ? t / 2 - l : a / 2 - l,
						p = o ? n.rotate : -n.rotate,
						c = n.depth,
						u = 0,
						h = i.length;
					u < h;
					u += 1
				) {
					var v = i.eq(u),
						f = r[u],
						m =
							((d - v[0].swiperSlideOffset - f / 2) / f) *
							n.modifier,
						g = o ? p * m : 0,
						b = o ? 0 : p * m,
						w = -c * Math.abs(m),
						y = o ? 0 : n.stretch * m,
						x = o ? n.stretch * m : 0;
					Math.abs(x) < 0.001 && (x = 0),
						Math.abs(y) < 0.001 && (y = 0),
						Math.abs(w) < 0.001 && (w = 0),
						Math.abs(g) < 0.001 && (g = 0),
						Math.abs(b) < 0.001 && (b = 0);
					var T =
						"translate3d(" +
						x +
						"px," +
						y +
						"px," +
						w +
						"px)  rotateX(" +
						b +
						"deg) rotateY(" +
						g +
						"deg)";
					if (
						(v.transform(T),
						(v[0].style.zIndex = 1 - Math.abs(Math.round(m))),
						n.slideShadows)
					) {
						var E = o
								? v.find(".swiper-slide-shadow-left")
								: v.find(".swiper-slide-shadow-top"),
							S = o
								? v.find(".swiper-slide-shadow-right")
								: v.find(".swiper-slide-shadow-bottom");
						0 === E.length &&
							((E = L(
								'<div class="swiper-slide-shadow-' +
									(o ? "left" : "top") +
									'"></div>'
							)),
							v.append(E)),
							0 === S.length &&
								((S = L(
									'<div class="swiper-slide-shadow-' +
										(o ? "right" : "bottom") +
										'"></div>'
								)),
								v.append(S)),
							E.length && (E[0].style.opacity = 0 < m ? m : 0),
							S.length && (S[0].style.opacity = 0 < -m ? -m : 0);
					}
				}
				(R.pointerEvents || R.prefixedPointerEvents) &&
					(s[0].style.perspectiveOrigin = d + "px 50%");
			},
			setTransition: function (e) {
				this.slides
					.transition(e)
					.find(
						".swiper-slide-shadow-top, .swiper-slide-shadow-right, .swiper-slide-shadow-bottom, .swiper-slide-shadow-left"
					)
					.transition(e);
			},
		},
		ae = {
			init: function () {
				var e = this,
					t = e.params.thumbs,
					a = e.constructor;
				t.swiper instanceof a
					? ((e.thumbs.swiper = t.swiper),
					  V.extend(e.thumbs.swiper.originalParams, {
							watchSlidesProgress: !0,
							slideToClickedSlide: !1,
					  }),
					  V.extend(e.thumbs.swiper.params, {
							watchSlidesProgress: !0,
							slideToClickedSlide: !1,
					  }))
					: V.isObject(t.swiper) &&
					  ((e.thumbs.swiper = new a(
							V.extend({}, t.swiper, {
								watchSlidesVisibility: !0,
								watchSlidesProgress: !0,
								slideToClickedSlide: !1,
							})
					  )),
					  (e.thumbs.swiperCreated = !0)),
					e.thumbs.swiper.$el.addClass(
						e.params.thumbs.thumbsContainerClass
					),
					e.thumbs.swiper.on("tap", e.thumbs.onThumbClick);
			},
			onThumbClick: function () {
				var e = this,
					t = e.thumbs.swiper;
				if (t) {
					var a = t.clickedIndex;
					if (null != a) {
						var i;
						if (
							((i = t.params.loop
								? parseInt(
										L(t.clickedSlide).attr(
											"data-swiper-slide-index"
										),
										10
								  )
								: a),
							e.params.loop)
						) {
							var s = e.activeIndex;
							e.slides
								.eq(s)
								.hasClass(e.params.slideDuplicateClass) &&
								(e.loopFix(),
								(e._clientLeft = e.$wrapperEl[0].clientLeft),
								(s = e.activeIndex));
							var r = e.slides
									.eq(s)
									.prevAll(
										'[data-swiper-slide-index="' + i + '"]'
									)
									.eq(0)
									.index(),
								n = e.slides
									.eq(s)
									.nextAll(
										'[data-swiper-slide-index="' + i + '"]'
									)
									.eq(0)
									.index();
							i =
								void 0 === r
									? n
									: void 0 === n
									? r
									: n - s < s - r
									? n
									: r;
						}
						e.slideTo(i);
					}
				}
			},
			update: function (e) {
				var t = this,
					a = t.thumbs.swiper;
				if (a) {
					var i =
						"auto" === a.params.slidesPerView
							? a.slidesPerViewDynamic()
							: a.params.slidesPerView;
					if (t.realIndex !== a.realIndex) {
						var s,
							r = a.activeIndex;
						if (a.params.loop) {
							a.slides
								.eq(r)
								.hasClass(a.params.slideDuplicateClass) &&
								(a.loopFix(),
								(a._clientLeft = a.$wrapperEl[0].clientLeft),
								(r = a.activeIndex));
							var n = a.slides
									.eq(r)
									.prevAll(
										'[data-swiper-slide-index="' +
											t.realIndex +
											'"]'
									)
									.eq(0)
									.index(),
								o = a.slides
									.eq(r)
									.nextAll(
										'[data-swiper-slide-index="' +
											t.realIndex +
											'"]'
									)
									.eq(0)
									.index();
							s =
								void 0 === n
									? o
									: void 0 === o
									? n
									: o - r < r - n
									? o
									: n;
						} else s = t.realIndex;
						a.visibleSlidesIndexes.indexOf(s) < 0 &&
							(a.params.centeredSlides
								? (s =
										r < s
											? s - Math.floor(i / 2) + 1
											: s + Math.floor(i / 2) - 1)
								: r < s && (s = s - i + 1),
							a.slideTo(s, e ? 0 : void 0));
					}
					var l = 1,
						d = t.params.thumbs.slideThumbActiveClass;
					if (
						(1 < t.params.slidesPerView &&
							!t.params.centeredSlides &&
							(l = t.params.slidesPerView),
						a.slides.removeClass(d),
						a.params.loop)
					)
						for (var p = 0; p < l; p += 1)
							a.$wrapperEl
								.children(
									'[data-swiper-slide-index="' +
										(t.realIndex + p) +
										'"]'
								)
								.addClass(d);
					else
						for (var c = 0; c < l; c += 1)
							a.slides.eq(t.realIndex + c).addClass(d);
				}
			},
		},
		ie = [
			C,
			M,
			k,
			z,
			$,
			O,
			H,
			{
				name: "mousewheel",
				params: {
					mousewheel: {
						enabled: !1,
						releaseOnEdges: !1,
						invert: !1,
						forceToAxis: !1,
						sensitivity: 1,
						eventsTarged: "container",
					},
				},
				create: function () {
					var e = this;
					V.extend(e, {
						mousewheel: {
							enabled: !1,
							enable: B.enable.bind(e),
							disable: B.disable.bind(e),
							handle: B.handle.bind(e),
							handleMouseEnter: B.handleMouseEnter.bind(e),
							handleMouseLeave: B.handleMouseLeave.bind(e),
							lastScrollTime: V.now(),
						},
					});
				},
				on: {
					init: function () {
						this.params.mousewheel.enabled &&
							this.mousewheel.enable();
					},
					destroy: function () {
						this.mousewheel.enabled && this.mousewheel.disable();
					},
				},
			},
			{
				name: "navigation",
				params: {
					navigation: {
						nextEl: null,
						prevEl: null,
						hideOnClick: !1,
						disabledClass: "swiper-button-disabled",
						hiddenClass: "swiper-button-hidden",
						lockClass: "swiper-button-lock",
					},
				},
				create: function () {
					V.extend(this, {
						navigation: {
							init: G.init.bind(this),
							update: G.update.bind(this),
							destroy: G.destroy.bind(this),
						},
					});
				},
				on: {
					init: function () {
						this.navigation.init(), this.navigation.update();
					},
					toEdge: function () {
						this.navigation.update();
					},
					fromEdge: function () {
						this.navigation.update();
					},
					destroy: function () {
						this.navigation.destroy();
					},
					click: function (e) {
						var t = this.navigation,
							a = t.$nextEl,
							i = t.$prevEl;
						!this.params.navigation.hideOnClick ||
							L(e.target).is(i) ||
							L(e.target).is(a) ||
							(a &&
								a.toggleClass(
									this.params.navigation.hiddenClass
								),
							i &&
								i.toggleClass(
									this.params.navigation.hiddenClass
								));
					},
				},
			},
			{
				name: "pagination",
				params: {
					pagination: {
						el: null,
						bulletElement: "span",
						clickable: !1,
						hideOnClick: !1,
						renderBullet: null,
						renderProgressbar: null,
						renderFraction: null,
						renderCustom: null,
						progressbarOpposite: !1,
						type: "bullets",
						dynamicBullets: !1,
						dynamicMainBullets: 1,
						formatFractionCurrent: function (e) {
							return e;
						},
						formatFractionTotal: function (e) {
							return e;
						},
						bulletClass: "swiper-pagination-bullet",
						bulletActiveClass: "swiper-pagination-bullet-active",
						modifierClass: "swiper-pagination-",
						currentClass: "swiper-pagination-current",
						totalClass: "swiper-pagination-total",
						hiddenClass: "swiper-pagination-hidden",
						progressbarFillClass:
							"swiper-pagination-progressbar-fill",
						progressbarOppositeClass:
							"swiper-pagination-progressbar-opposite",
						clickableClass: "swiper-pagination-clickable",
						lockClass: "swiper-pagination-lock",
					},
				},
				create: function () {
					var e = this;
					V.extend(e, {
						pagination: {
							init: N.init.bind(e),
							render: N.render.bind(e),
							update: N.update.bind(e),
							destroy: N.destroy.bind(e),
							dynamicBulletIndex: 0,
						},
					});
				},
				on: {
					init: function () {
						this.pagination.init(),
							this.pagination.render(),
							this.pagination.update();
					},
					activeIndexChange: function () {
						this.params.loop
							? this.pagination.update()
							: void 0 === this.snapIndex &&
							  this.pagination.update();
					},
					snapIndexChange: function () {
						this.params.loop || this.pagination.update();
					},
					slidesLengthChange: function () {
						this.params.loop &&
							(this.pagination.render(),
							this.pagination.update());
					},
					snapGridLengthChange: function () {
						this.params.loop ||
							(this.pagination.render(),
							this.pagination.update());
					},
					destroy: function () {
						this.pagination.destroy();
					},
					click: function (e) {
						var t = this;
						t.params.pagination.el &&
							t.params.pagination.hideOnClick &&
							0 < t.pagination.$el.length &&
							!L(e.target).hasClass(
								t.params.pagination.bulletClass
							) &&
							t.pagination.$el.toggleClass(
								t.params.pagination.hiddenClass
							);
					},
				},
			},
			{
				name: "scrollbar",
				params: {
					scrollbar: {
						el: null,
						dragSize: "auto",
						hide: !1,
						draggable: !1,
						snapOnRelease: !0,
						lockClass: "swiper-scrollbar-lock",
						dragClass: "swiper-scrollbar-drag",
					},
				},
				create: function () {
					var e = this;
					V.extend(e, {
						scrollbar: {
							init: X.init.bind(e),
							destroy: X.destroy.bind(e),
							updateSize: X.updateSize.bind(e),
							setTranslate: X.setTranslate.bind(e),
							setTransition: X.setTransition.bind(e),
							enableDraggable: X.enableDraggable.bind(e),
							disableDraggable: X.disableDraggable.bind(e),
							setDragPosition: X.setDragPosition.bind(e),
							onDragStart: X.onDragStart.bind(e),
							onDragMove: X.onDragMove.bind(e),
							onDragEnd: X.onDragEnd.bind(e),
							isTouched: !1,
							timeout: null,
							dragTimeout: null,
						},
					});
				},
				on: {
					init: function () {
						this.scrollbar.init(),
							this.scrollbar.updateSize(),
							this.scrollbar.setTranslate();
					},
					update: function () {
						this.scrollbar.updateSize();
					},
					resize: function () {
						this.scrollbar.updateSize();
					},
					observerUpdate: function () {
						this.scrollbar.updateSize();
					},
					setTranslate: function () {
						this.scrollbar.setTranslate();
					},
					setTransition: function (e) {
						this.scrollbar.setTransition(e);
					},
					destroy: function () {
						this.scrollbar.destroy();
					},
				},
			},
			{
				name: "parallax",
				params: { parallax: { enabled: !1 } },
				create: function () {
					V.extend(this, {
						parallax: {
							setTransform: F.setTransform.bind(this),
							setTranslate: F.setTranslate.bind(this),
							setTransition: F.setTransition.bind(this),
						},
					});
				},
				on: {
					beforeInit: function () {
						this.params.parallax.enabled &&
							((this.params.watchSlidesProgress = !0),
							(this.originalParams.watchSlidesProgress = !0));
					},
					init: function () {
						this.params.parallax && this.parallax.setTranslate();
					},
					setTranslate: function () {
						this.params.parallax && this.parallax.setTranslate();
					},
					setTransition: function (e) {
						this.params.parallax && this.parallax.setTransition(e);
					},
				},
			},
			{
				name: "zoom",
				params: {
					zoom: {
						enabled: !1,
						maxRatio: 3,
						minRatio: 1,
						toggle: !0,
						containerClass: "swiper-zoom-container",
						zoomedSlideClass: "swiper-slide-zoomed",
					},
				},
				create: function () {
					var t = this,
						a = {
							enabled: !1,
							scale: 1,
							currentScale: 1,
							isScaling: !1,
							gesture: {
								$slideEl: void 0,
								slideWidth: void 0,
								slideHeight: void 0,
								$imageEl: void 0,
								$imageWrapEl: void 0,
								maxRatio: 3,
							},
							image: {
								isTouched: void 0,
								isMoved: void 0,
								currentX: void 0,
								currentY: void 0,
								minX: void 0,
								minY: void 0,
								maxX: void 0,
								maxY: void 0,
								width: void 0,
								height: void 0,
								startX: void 0,
								startY: void 0,
								touchesStart: {},
								touchesCurrent: {},
							},
							velocity: {
								x: void 0,
								y: void 0,
								prevPositionX: void 0,
								prevPositionY: void 0,
								prevTime: void 0,
							},
						};
					"onGestureStart onGestureChange onGestureEnd onTouchStart onTouchMove onTouchEnd onTransitionEnd toggle enable disable in out"
						.split(" ")
						.forEach(function (e) {
							a[e] = q[e].bind(t);
						}),
						V.extend(t, { zoom: a });
				},
				on: {
					init: function () {
						this.params.zoom.enabled && this.zoom.enable();
					},
					destroy: function () {
						this.zoom.disable();
					},
					touchStart: function (e) {
						this.zoom.enabled && this.zoom.onTouchStart(e);
					},
					touchEnd: function (e) {
						this.zoom.enabled && this.zoom.onTouchEnd(e);
					},
					doubleTap: function (e) {
						this.params.zoom.enabled &&
							this.zoom.enabled &&
							this.params.zoom.toggle &&
							this.zoom.toggle(e);
					},
					transitionEnd: function () {
						this.zoom.enabled &&
							this.params.zoom.enabled &&
							this.zoom.onTransitionEnd();
					},
				},
			},
			{
				name: "lazy",
				params: {
					lazy: {
						enabled: !1,
						loadPrevNext: !1,
						loadPrevNextAmount: 1,
						loadOnTransitionStart: !1,
						elementClass: "swiper-lazy",
						loadingClass: "swiper-lazy-loading",
						loadedClass: "swiper-lazy-loaded",
						preloaderClass: "swiper-lazy-preloader",
					},
				},
				create: function () {
					V.extend(this, {
						lazy: {
							initialImageLoaded: !1,
							load: W.load.bind(this),
							loadInSlide: W.loadInSlide.bind(this),
						},
					});
				},
				on: {
					beforeInit: function () {
						this.params.lazy.enabled &&
							this.params.preloadImages &&
							(this.params.preloadImages = !1);
					},
					init: function () {
						this.params.lazy.enabled &&
							!this.params.loop &&
							0 === this.params.initialSlide &&
							this.lazy.load();
					},
					scroll: function () {
						this.params.freeMode &&
							!this.params.freeModeSticky &&
							this.lazy.load();
					},
					resize: function () {
						this.params.lazy.enabled && this.lazy.load();
					},
					scrollbarDragMove: function () {
						this.params.lazy.enabled && this.lazy.load();
					},
					transitionStart: function () {
						var e = this;
						e.params.lazy.enabled &&
							(e.params.lazy.loadOnTransitionStart ||
								(!e.params.lazy.loadOnTransitionStart &&
									!e.lazy.initialImageLoaded)) &&
							e.lazy.load();
					},
					transitionEnd: function () {
						this.params.lazy.enabled &&
							!this.params.lazy.loadOnTransitionStart &&
							this.lazy.load();
					},
				},
			},
			{
				name: "controller",
				params: {
					controller: { control: void 0, inverse: !1, by: "slide" },
				},
				create: function () {
					var e = this;
					V.extend(e, {
						controller: {
							control: e.params.controller.control,
							getInterpolateFunction:
								j.getInterpolateFunction.bind(e),
							setTranslate: j.setTranslate.bind(e),
							setTransition: j.setTransition.bind(e),
						},
					});
				},
				on: {
					update: function () {
						this.controller.control &&
							this.controller.spline &&
							((this.controller.spline = void 0),
							delete this.controller.spline);
					},
					resize: function () {
						this.controller.control &&
							this.controller.spline &&
							((this.controller.spline = void 0),
							delete this.controller.spline);
					},
					observerUpdate: function () {
						this.controller.control &&
							this.controller.spline &&
							((this.controller.spline = void 0),
							delete this.controller.spline);
					},
					setTranslate: function (e, t) {
						this.controller.control &&
							this.controller.setTranslate(e, t);
					},
					setTransition: function (e, t) {
						this.controller.control &&
							this.controller.setTransition(e, t);
					},
				},
			},
			{
				name: "a11y",
				params: {
					a11y: {
						enabled: !0,
						notificationClass: "swiper-notification",
						prevSlideMessage: "Previous slide",
						nextSlideMessage: "Next slide",
						firstSlideMessage: "This is the first slide",
						lastSlideMessage: "This is the last slide",
						paginationBulletMessage: "Go to slide {{index}}",
					},
				},
				create: function () {
					var t = this;
					V.extend(t, {
						a11y: {
							liveRegion: L(
								'<span class="' +
									t.params.a11y.notificationClass +
									'" aria-live="assertive" aria-atomic="true"></span>'
							),
						},
					}),
						Object.keys(U).forEach(function (e) {
							t.a11y[e] = U[e].bind(t);
						});
				},
				on: {
					init: function () {
						this.params.a11y.enabled &&
							(this.a11y.init(), this.a11y.updateNavigation());
					},
					toEdge: function () {
						this.params.a11y.enabled &&
							this.a11y.updateNavigation();
					},
					fromEdge: function () {
						this.params.a11y.enabled &&
							this.a11y.updateNavigation();
					},
					paginationUpdate: function () {
						this.params.a11y.enabled &&
							this.a11y.updatePagination();
					},
					destroy: function () {
						this.params.a11y.enabled && this.a11y.destroy();
					},
				},
			},
			{
				name: "history",
				params: {
					history: { enabled: !1, replaceState: !1, key: "slides" },
				},
				create: function () {
					var e = this;
					V.extend(e, {
						history: {
							init: K.init.bind(e),
							setHistory: K.setHistory.bind(e),
							setHistoryPopState: K.setHistoryPopState.bind(e),
							scrollToSlide: K.scrollToSlide.bind(e),
							destroy: K.destroy.bind(e),
						},
					});
				},
				on: {
					init: function () {
						this.params.history.enabled && this.history.init();
					},
					destroy: function () {
						this.params.history.enabled && this.history.destroy();
					},
					transitionEnd: function () {
						this.history.initialized &&
							this.history.setHistory(
								this.params.history.key,
								this.activeIndex
							);
					},
				},
			},
			{
				name: "hash-navigation",
				params: {
					hashNavigation: {
						enabled: !1,
						replaceState: !1,
						watchState: !1,
					},
				},
				create: function () {
					var e = this;
					V.extend(e, {
						hashNavigation: {
							initialized: !1,
							init: _.init.bind(e),
							destroy: _.destroy.bind(e),
							setHash: _.setHash.bind(e),
							onHashCange: _.onHashCange.bind(e),
						},
					});
				},
				on: {
					init: function () {
						this.params.hashNavigation.enabled &&
							this.hashNavigation.init();
					},
					destroy: function () {
						this.params.hashNavigation.enabled &&
							this.hashNavigation.destroy();
					},
					transitionEnd: function () {
						this.hashNavigation.initialized &&
							this.hashNavigation.setHash();
					},
				},
			},
			{
				name: "autoplay",
				params: {
					autoplay: {
						enabled: !1,
						delay: 3e3,
						waitForTransition: !0,
						disableOnInteraction: !0,
						stopOnLastSlide: !1,
						reverseDirection: !1,
					},
				},
				create: function () {
					var t = this;
					V.extend(t, {
						autoplay: {
							running: !1,
							paused: !1,
							run: Z.run.bind(t),
							start: Z.start.bind(t),
							stop: Z.stop.bind(t),
							pause: Z.pause.bind(t),
							onTransitionEnd: function (e) {
								t &&
									!t.destroyed &&
									t.$wrapperEl &&
									e.target === this &&
									(t.$wrapperEl[0].removeEventListener(
										"transitionend",
										t.autoplay.onTransitionEnd
									),
									t.$wrapperEl[0].removeEventListener(
										"webkitTransitionEnd",
										t.autoplay.onTransitionEnd
									),
									(t.autoplay.paused = !1),
									t.autoplay.running
										? t.autoplay.run()
										: t.autoplay.stop());
							},
						},
					});
				},
				on: {
					init: function () {
						this.params.autoplay.enabled && this.autoplay.start();
					},
					beforeTransitionStart: function (e, t) {
						this.autoplay.running &&
							(t || !this.params.autoplay.disableOnInteraction
								? this.autoplay.pause(e)
								: this.autoplay.stop());
					},
					sliderFirstMove: function () {
						this.autoplay.running &&
							(this.params.autoplay.disableOnInteraction
								? this.autoplay.stop()
								: this.autoplay.pause());
					},
					destroy: function () {
						this.autoplay.running && this.autoplay.stop();
					},
				},
			},
			{
				name: "effect-fade",
				params: { fadeEffect: { crossFade: !1 } },
				create: function () {
					V.extend(this, {
						fadeEffect: {
							setTranslate: Q.setTranslate.bind(this),
							setTransition: Q.setTransition.bind(this),
						},
					});
				},
				on: {
					beforeInit: function () {
						var e = this;
						if ("fade" === e.params.effect) {
							e.classNames.push(
								e.params.containerModifierClass + "fade"
							);
							var t = {
								slidesPerView: 1,
								slidesPerColumn: 1,
								slidesPerGroup: 1,
								watchSlidesProgress: !0,
								spaceBetween: 0,
								virtualTranslate: !0,
							};
							V.extend(e.params, t),
								V.extend(e.originalParams, t);
						}
					},
					setTranslate: function () {
						"fade" === this.params.effect &&
							this.fadeEffect.setTranslate();
					},
					setTransition: function (e) {
						"fade" === this.params.effect &&
							this.fadeEffect.setTransition(e);
					},
				},
			},
			{
				name: "effect-cube",
				params: {
					cubeEffect: {
						slideShadows: !0,
						shadow: !0,
						shadowOffset: 20,
						shadowScale: 0.94,
					},
				},
				create: function () {
					V.extend(this, {
						cubeEffect: {
							setTranslate: J.setTranslate.bind(this),
							setTransition: J.setTransition.bind(this),
						},
					});
				},
				on: {
					beforeInit: function () {
						var e = this;
						if ("cube" === e.params.effect) {
							e.classNames.push(
								e.params.containerModifierClass + "cube"
							),
								e.classNames.push(
									e.params.containerModifierClass + "3d"
								);
							var t = {
								slidesPerView: 1,
								slidesPerColumn: 1,
								slidesPerGroup: 1,
								watchSlidesProgress: !0,
								resistanceRatio: 0,
								spaceBetween: 0,
								centeredSlides: !1,
								virtualTranslate: !0,
							};
							V.extend(e.params, t),
								V.extend(e.originalParams, t);
						}
					},
					setTranslate: function () {
						"cube" === this.params.effect &&
							this.cubeEffect.setTranslate();
					},
					setTransition: function (e) {
						"cube" === this.params.effect &&
							this.cubeEffect.setTransition(e);
					},
				},
			},
			{
				name: "effect-flip",
				params: { flipEffect: { slideShadows: !0, limitRotation: !0 } },
				create: function () {
					V.extend(this, {
						flipEffect: {
							setTranslate: ee.setTranslate.bind(this),
							setTransition: ee.setTransition.bind(this),
						},
					});
				},
				on: {
					beforeInit: function () {
						var e = this;
						if ("flip" === e.params.effect) {
							e.classNames.push(
								e.params.containerModifierClass + "flip"
							),
								e.classNames.push(
									e.params.containerModifierClass + "3d"
								);
							var t = {
								slidesPerView: 1,
								slidesPerColumn: 1,
								slidesPerGroup: 1,
								watchSlidesProgress: !0,
								spaceBetween: 0,
								virtualTranslate: !0,
							};
							V.extend(e.params, t),
								V.extend(e.originalParams, t);
						}
					},
					setTranslate: function () {
						"flip" === this.params.effect &&
							this.flipEffect.setTranslate();
					},
					setTransition: function (e) {
						"flip" === this.params.effect &&
							this.flipEffect.setTransition(e);
					},
				},
			},
			{
				name: "effect-coverflow",
				params: {
					coverflowEffect: {
						rotate: 50,
						stretch: 0,
						depth: 100,
						modifier: 1,
						slideShadows: !0,
					},
				},
				create: function () {
					V.extend(this, {
						coverflowEffect: {
							setTranslate: te.setTranslate.bind(this),
							setTransition: te.setTransition.bind(this),
						},
					});
				},
				on: {
					beforeInit: function () {
						var e = this;
						"coverflow" === e.params.effect &&
							(e.classNames.push(
								e.params.containerModifierClass + "coverflow"
							),
							e.classNames.push(
								e.params.containerModifierClass + "3d"
							),
							(e.params.watchSlidesProgress = !0),
							(e.originalParams.watchSlidesProgress = !0));
					},
					setTranslate: function () {
						"coverflow" === this.params.effect &&
							this.coverflowEffect.setTranslate();
					},
					setTransition: function (e) {
						"coverflow" === this.params.effect &&
							this.coverflowEffect.setTransition(e);
					},
				},
			},
			{
				name: "thumbs",
				params: {
					thumbs: {
						swiper: null,
						slideThumbActiveClass: "swiper-slide-thumb-active",
						thumbsContainerClass: "swiper-container-thumbs",
					},
				},
				create: function () {
					V.extend(this, {
						thumbs: {
							swiper: null,
							init: ae.init.bind(this),
							update: ae.update.bind(this),
							onThumbClick: ae.onThumbClick.bind(this),
						},
					});
				},
				on: {
					beforeInit: function () {
						var e = this.params.thumbs;
						e &&
							e.swiper &&
							(this.thumbs.init(), this.thumbs.update(!0));
					},
					slideChange: function () {
						this.thumbs.swiper && this.thumbs.update();
					},
					update: function () {
						this.thumbs.swiper && this.thumbs.update();
					},
					resize: function () {
						this.thumbs.swiper && this.thumbs.update();
					},
					observerUpdate: function () {
						this.thumbs.swiper && this.thumbs.update();
					},
					setTransition: function (e) {
						var t = this.thumbs.swiper;
						t && t.setTransition(e);
					},
					beforeDestroy: function () {
						var e = this.thumbs.swiper;
						e && this.thumbs.swiperCreated && e && e.destroy();
					},
				},
			},
		];
	return (
		void 0 === S.use &&
			((S.use = S.Class.use), (S.installModule = S.Class.installModule)),
		S.use(ie),
		S
	);
});
//# sourceMappingURL=swiper.min.js.map
/*!
 * perfect-scrollbar v1.4.0
 * (c) 2018 Hyunje Jun
 * @license MIT
 */
!(function (t, e) {
	"object" == typeof exports && "undefined" != typeof module
		? (module.exports = e())
		: "function" == typeof define && define.amd
		? define(e)
		: (t.PerfectScrollbar = e());
})(this, function () {
	"use strict";
	function t(t) {
		return getComputedStyle(t);
	}
	function e(t, e) {
		for (var i in e) {
			var r = e[i];
			"number" == typeof r && (r += "px"), (t.style[i] = r);
		}
		return t;
	}
	function i(t) {
		var e = document.createElement("div");
		return (e.className = t), e;
	}
	function r(t, e) {
		if (!v) throw new Error("No element matching method supported");
		return v.call(t, e);
	}
	function l(t) {
		t.remove ? t.remove() : t.parentNode && t.parentNode.removeChild(t);
	}
	function n(t, e) {
		return Array.prototype.filter.call(t.children, function (t) {
			return r(t, e);
		});
	}
	function o(t, e) {
		var i = t.element.classList,
			r = m.state.scrolling(e);
		i.contains(r) ? clearTimeout(Y[e]) : i.add(r);
	}
	function s(t, e) {
		Y[e] = setTimeout(function () {
			return (
				t.isAlive && t.element.classList.remove(m.state.scrolling(e))
			);
		}, t.settings.scrollingThreshold);
	}
	function a(t, e) {
		o(t, e), s(t, e);
	}
	function c(t) {
		if ("function" == typeof window.CustomEvent) return new CustomEvent(t);
		var e = document.createEvent("CustomEvent");
		return e.initCustomEvent(t, !1, !1, void 0), e;
	}
	function h(t, e, i, r, l) {
		var n = i[0],
			o = i[1],
			s = i[2],
			h = i[3],
			u = i[4],
			d = i[5];
		void 0 === r && (r = !0), void 0 === l && (l = !1);
		var f = t.element;
		(t.reach[h] = null),
			f[s] < 1 && (t.reach[h] = "start"),
			f[s] > t[n] - t[o] - 1 && (t.reach[h] = "end"),
			e &&
				(f.dispatchEvent(c("ps-scroll-" + h)),
				e < 0
					? f.dispatchEvent(c("ps-scroll-" + u))
					: e > 0 && f.dispatchEvent(c("ps-scroll-" + d)),
				r && a(t, h)),
			t.reach[h] &&
				(e || l) &&
				f.dispatchEvent(c("ps-" + h + "-reach-" + t.reach[h]));
	}
	function u(t) {
		return parseInt(t, 10) || 0;
	}
	function d(t) {
		return (
			r(t, "input,[contenteditable]") ||
			r(t, "select,[contenteditable]") ||
			r(t, "textarea,[contenteditable]") ||
			r(t, "button,[contenteditable]")
		);
	}
	function f(e) {
		var i = t(e);
		return (
			u(i.width) +
			u(i.paddingLeft) +
			u(i.paddingRight) +
			u(i.borderLeftWidth) +
			u(i.borderRightWidth)
		);
	}
	function p(t, e) {
		return (
			t.settings.minScrollbarLength &&
				(e = Math.max(e, t.settings.minScrollbarLength)),
			t.settings.maxScrollbarLength &&
				(e = Math.min(e, t.settings.maxScrollbarLength)),
			e
		);
	}
	function b(t, i) {
		var r = { width: i.railXWidth },
			l = Math.floor(t.scrollTop);
		i.isRtl
			? (r.left =
					i.negativeScrollAdjustment +
					t.scrollLeft +
					i.containerWidth -
					i.contentWidth)
			: (r.left = t.scrollLeft),
			i.isScrollbarXUsingBottom
				? (r.bottom = i.scrollbarXBottom - l)
				: (r.top = i.scrollbarXTop + l),
			e(i.scrollbarXRail, r);
		var n = { top: l, height: i.railYHeight };
		i.isScrollbarYUsingRight
			? i.isRtl
				? (n.right =
						i.contentWidth -
						(i.negativeScrollAdjustment + t.scrollLeft) -
						i.scrollbarYRight -
						i.scrollbarYOuterWidth)
				: (n.right = i.scrollbarYRight - t.scrollLeft)
			: i.isRtl
			? (n.left =
					i.negativeScrollAdjustment +
					t.scrollLeft +
					2 * i.containerWidth -
					i.contentWidth -
					i.scrollbarYLeft -
					i.scrollbarYOuterWidth)
			: (n.left = i.scrollbarYLeft + t.scrollLeft),
			e(i.scrollbarYRail, n),
			e(i.scrollbarX, {
				left: i.scrollbarXLeft,
				width: i.scrollbarXWidth - i.railBorderXWidth,
			}),
			e(i.scrollbarY, {
				top: i.scrollbarYTop,
				height: i.scrollbarYHeight - i.railBorderYWidth,
			});
	}
	function g(t, e) {
		function i(e) {
			(b[d] = g + Y * (e[a] - v)),
				o(t, f),
				R(t),
				e.stopPropagation(),
				e.preventDefault();
		}
		function r() {
			s(t, f),
				t[p].classList.remove(m.state.clicking),
				t.event.unbind(t.ownerDocument, "mousemove", i);
		}
		var l = e[0],
			n = e[1],
			a = e[2],
			c = e[3],
			h = e[4],
			u = e[5],
			d = e[6],
			f = e[7],
			p = e[8],
			b = t.element,
			g = null,
			v = null,
			Y = null;
		t.event.bind(t[h], "mousedown", function (e) {
			(g = b[d]),
				(v = e[a]),
				(Y = (t[n] - t[l]) / (t[c] - t[u])),
				t.event.bind(t.ownerDocument, "mousemove", i),
				t.event.once(t.ownerDocument, "mouseup", r),
				t[p].classList.add(m.state.clicking),
				e.stopPropagation(),
				e.preventDefault();
		});
	}
	var v =
			"undefined" != typeof Element &&
			(Element.prototype.matches ||
				Element.prototype.webkitMatchesSelector ||
				Element.prototype.mozMatchesSelector ||
				Element.prototype.msMatchesSelector),
		m = {
			main: "ps",
			element: {
				thumb: function (t) {
					return "ps__thumb-" + t;
				},
				rail: function (t) {
					return "ps__rail-" + t;
				},
				consuming: "ps__child--consume",
			},
			state: {
				focus: "ps--focus",
				clicking: "ps--clicking",
				active: function (t) {
					return "ps--active-" + t;
				},
				scrolling: function (t) {
					return "ps--scrolling-" + t;
				},
			},
		},
		Y = { x: null, y: null },
		X = function (t) {
			(this.element = t), (this.handlers = {});
		},
		w = { isEmpty: { configurable: !0 } };
	(X.prototype.bind = function (t, e) {
		void 0 === this.handlers[t] && (this.handlers[t] = []),
			this.handlers[t].push(e),
			this.element.addEventListener(t, e, !1);
	}),
		(X.prototype.unbind = function (t, e) {
			var i = this;
			this.handlers[t] = this.handlers[t].filter(function (r) {
				return (
					!(!e || r === e) ||
					(i.element.removeEventListener(t, r, !1), !1)
				);
			});
		}),
		(X.prototype.unbindAll = function () {
			var t = this;
			for (var e in t.handlers) t.unbind(e);
		}),
		(w.isEmpty.get = function () {
			var t = this;
			return Object.keys(this.handlers).every(function (e) {
				return 0 === t.handlers[e].length;
			});
		}),
		Object.defineProperties(X.prototype, w);
	var y = function () {
		this.eventElements = [];
	};
	(y.prototype.eventElement = function (t) {
		var e = this.eventElements.filter(function (e) {
			return e.element === t;
		})[0];
		return e || ((e = new X(t)), this.eventElements.push(e)), e;
	}),
		(y.prototype.bind = function (t, e, i) {
			this.eventElement(t).bind(e, i);
		}),
		(y.prototype.unbind = function (t, e, i) {
			var r = this.eventElement(t);
			r.unbind(e, i),
				r.isEmpty &&
					this.eventElements.splice(this.eventElements.indexOf(r), 1);
		}),
		(y.prototype.unbindAll = function () {
			this.eventElements.forEach(function (t) {
				return t.unbindAll();
			}),
				(this.eventElements = []);
		}),
		(y.prototype.once = function (t, e, i) {
			var r = this.eventElement(t),
				l = function (t) {
					r.unbind(e, l), i(t);
				};
			r.bind(e, l);
		});
	var W = function (t, e, i, r, l) {
			void 0 === r && (r = !0), void 0 === l && (l = !1);
			var n;
			if ("top" === e)
				n = [
					"contentHeight",
					"containerHeight",
					"scrollTop",
					"y",
					"up",
					"down",
				];
			else {
				if ("left" !== e)
					throw new Error("A proper axis should be provided");
				n = [
					"contentWidth",
					"containerWidth",
					"scrollLeft",
					"x",
					"left",
					"right",
				];
			}
			h(t, i, n, r, l);
		},
		L = {
			isWebKit:
				"undefined" != typeof document &&
				"WebkitAppearance" in document.documentElement.style,
			supportsTouch:
				"undefined" != typeof window &&
				("ontouchstart" in window ||
					(window.DocumentTouch &&
						document instanceof window.DocumentTouch)),
			supportsIePointer:
				"undefined" != typeof navigator && navigator.msMaxTouchPoints,
			isChrome:
				"undefined" != typeof navigator &&
				/Chrome/i.test(navigator && navigator.userAgent),
		},
		R = function (t) {
			var e = t.element,
				i = Math.floor(e.scrollTop);
			(t.containerWidth = e.clientWidth),
				(t.containerHeight = e.clientHeight),
				(t.contentWidth = e.scrollWidth),
				(t.contentHeight = e.scrollHeight),
				e.contains(t.scrollbarXRail) ||
					(n(e, m.element.rail("x")).forEach(function (t) {
						return l(t);
					}),
					e.appendChild(t.scrollbarXRail)),
				e.contains(t.scrollbarYRail) ||
					(n(e, m.element.rail("y")).forEach(function (t) {
						return l(t);
					}),
					e.appendChild(t.scrollbarYRail)),
				!t.settings.suppressScrollX &&
				t.containerWidth + t.settings.scrollXMarginOffset <
					t.contentWidth
					? ((t.scrollbarXActive = !0),
					  (t.railXWidth = t.containerWidth - t.railXMarginWidth),
					  (t.railXRatio = t.containerWidth / t.railXWidth),
					  (t.scrollbarXWidth = p(
							t,
							u(
								(t.railXWidth * t.containerWidth) /
									t.contentWidth
							)
					  )),
					  (t.scrollbarXLeft = u(
							((t.negativeScrollAdjustment + e.scrollLeft) *
								(t.railXWidth - t.scrollbarXWidth)) /
								(t.contentWidth - t.containerWidth)
					  )))
					: (t.scrollbarXActive = !1),
				!t.settings.suppressScrollY &&
				t.containerHeight + t.settings.scrollYMarginOffset <
					t.contentHeight
					? ((t.scrollbarYActive = !0),
					  (t.railYHeight = t.containerHeight - t.railYMarginHeight),
					  (t.railYRatio = t.containerHeight / t.railYHeight),
					  (t.scrollbarYHeight = p(
							t,
							u(
								(t.railYHeight * t.containerHeight) /
									t.contentHeight
							)
					  )),
					  (t.scrollbarYTop = u(
							(i * (t.railYHeight - t.scrollbarYHeight)) /
								(t.contentHeight - t.containerHeight)
					  )))
					: (t.scrollbarYActive = !1),
				t.scrollbarXLeft >= t.railXWidth - t.scrollbarXWidth &&
					(t.scrollbarXLeft = t.railXWidth - t.scrollbarXWidth),
				t.scrollbarYTop >= t.railYHeight - t.scrollbarYHeight &&
					(t.scrollbarYTop = t.railYHeight - t.scrollbarYHeight),
				b(e, t),
				t.scrollbarXActive
					? e.classList.add(m.state.active("x"))
					: (e.classList.remove(m.state.active("x")),
					  (t.scrollbarXWidth = 0),
					  (t.scrollbarXLeft = 0),
					  (e.scrollLeft = 0)),
				t.scrollbarYActive
					? e.classList.add(m.state.active("y"))
					: (e.classList.remove(m.state.active("y")),
					  (t.scrollbarYHeight = 0),
					  (t.scrollbarYTop = 0),
					  (e.scrollTop = 0));
		},
		T = {
			"click-rail": function (t) {
				t.event.bind(t.scrollbarY, "mousedown", function (t) {
					return t.stopPropagation();
				}),
					t.event.bind(t.scrollbarYRail, "mousedown", function (e) {
						var i =
							e.pageY -
								window.pageYOffset -
								t.scrollbarYRail.getBoundingClientRect().top >
							t.scrollbarYTop
								? 1
								: -1;
						(t.element.scrollTop += i * t.containerHeight),
							R(t),
							e.stopPropagation();
					}),
					t.event.bind(t.scrollbarX, "mousedown", function (t) {
						return t.stopPropagation();
					}),
					t.event.bind(t.scrollbarXRail, "mousedown", function (e) {
						var i =
							e.pageX -
								window.pageXOffset -
								t.scrollbarXRail.getBoundingClientRect().left >
							t.scrollbarXLeft
								? 1
								: -1;
						(t.element.scrollLeft += i * t.containerWidth),
							R(t),
							e.stopPropagation();
					});
			},
			"drag-thumb": function (t) {
				g(t, [
					"containerWidth",
					"contentWidth",
					"pageX",
					"railXWidth",
					"scrollbarX",
					"scrollbarXWidth",
					"scrollLeft",
					"x",
					"scrollbarXRail",
				]),
					g(t, [
						"containerHeight",
						"contentHeight",
						"pageY",
						"railYHeight",
						"scrollbarY",
						"scrollbarYHeight",
						"scrollTop",
						"y",
						"scrollbarYRail",
					]);
			},
			keyboard: function (t) {
				function e(e, r) {
					var l = Math.floor(i.scrollTop);
					if (0 === e) {
						if (!t.scrollbarYActive) return !1;
						if (
							(0 === l && r > 0) ||
							(l >= t.contentHeight - t.containerHeight && r < 0)
						)
							return !t.settings.wheelPropagation;
					}
					var n = i.scrollLeft;
					if (0 === r) {
						if (!t.scrollbarXActive) return !1;
						if (
							(0 === n && e < 0) ||
							(n >= t.contentWidth - t.containerWidth && e > 0)
						)
							return !t.settings.wheelPropagation;
					}
					return !0;
				}
				var i = t.element,
					l = function () {
						return r(i, ":hover");
					},
					n = function () {
						return (
							r(t.scrollbarX, ":focus") ||
							r(t.scrollbarY, ":focus")
						);
					};
				t.event.bind(t.ownerDocument, "keydown", function (r) {
					if (
						!(
							(r.isDefaultPrevented && r.isDefaultPrevented()) ||
							r.defaultPrevented
						) &&
						(l() || n())
					) {
						var o = document.activeElement
							? document.activeElement
							: t.ownerDocument.activeElement;
						if (o) {
							if ("IFRAME" === o.tagName)
								o = o.contentDocument.activeElement;
							else
								for (; o.shadowRoot; )
									o = o.shadowRoot.activeElement;
							if (d(o)) return;
						}
						var s = 0,
							a = 0;
						switch (r.which) {
							case 37:
								s = r.metaKey
									? -t.contentWidth
									: r.altKey
									? -t.containerWidth
									: -30;
								break;
							case 38:
								a = r.metaKey
									? t.contentHeight
									: r.altKey
									? t.containerHeight
									: 30;
								break;
							case 39:
								s = r.metaKey
									? t.contentWidth
									: r.altKey
									? t.containerWidth
									: 30;
								break;
							case 40:
								a = r.metaKey
									? -t.contentHeight
									: r.altKey
									? -t.containerHeight
									: -30;
								break;
							case 32:
								a = r.shiftKey
									? t.containerHeight
									: -t.containerHeight;
								break;
							case 33:
								a = t.containerHeight;
								break;
							case 34:
								a = -t.containerHeight;
								break;
							case 36:
								a = t.contentHeight;
								break;
							case 35:
								a = -t.contentHeight;
								break;
							default:
								return;
						}
						(t.settings.suppressScrollX && 0 !== s) ||
							(t.settings.suppressScrollY && 0 !== a) ||
							((i.scrollTop -= a),
							(i.scrollLeft += s),
							R(t),
							e(s, a) && r.preventDefault());
					}
				});
			},
			wheel: function (e) {
				function i(t, i) {
					var r = Math.floor(o.scrollTop),
						l = 0 === o.scrollTop,
						n = r + o.offsetHeight === o.scrollHeight,
						s = 0 === o.scrollLeft,
						a = o.scrollLeft + o.offsetWidth === o.scrollWidth;
					return (
						!(Math.abs(i) > Math.abs(t) ? l || n : s || a) ||
						!e.settings.wheelPropagation
					);
				}
				function r(t) {
					var e = t.deltaX,
						i = -1 * t.deltaY;
					return (
						(void 0 !== e && void 0 !== i) ||
							((e = (-1 * t.wheelDeltaX) / 6),
							(i = t.wheelDeltaY / 6)),
						t.deltaMode &&
							1 === t.deltaMode &&
							((e *= 10), (i *= 10)),
						e !== e && i !== i && ((e = 0), (i = t.wheelDelta)),
						t.shiftKey ? [-i, -e] : [e, i]
					);
				}
				function l(e, i, r) {
					if (!L.isWebKit && o.querySelector("select:focus"))
						return !0;
					if (!o.contains(e)) return !1;
					for (var l = e; l && l !== o; ) {
						if (l.classList.contains(m.element.consuming))
							return !0;
						var n = t(l);
						if (
							[n.overflow, n.overflowX, n.overflowY]
								.join("")
								.match(/(scroll|auto)/)
						) {
							var s = l.scrollHeight - l.clientHeight;
							if (
								s > 0 &&
								!(
									(0 === l.scrollTop && r > 0) ||
									(l.scrollTop === s && r < 0)
								)
							)
								return !0;
							var a = l.scrollWidth - l.clientWidth;
							if (
								a > 0 &&
								!(
									(0 === l.scrollLeft && i < 0) ||
									(l.scrollLeft === a && i > 0)
								)
							)
								return !0;
						}
						l = l.parentNode;
					}
					return !1;
				}
				function n(t) {
					var n = r(t),
						s = n[0],
						a = n[1];
					if (!l(t.target, s, a)) {
						var c = !1;
						e.settings.useBothWheelAxes
							? e.scrollbarYActive && !e.scrollbarXActive
								? (a
										? (o.scrollTop -=
												a * e.settings.wheelSpeed)
										: (o.scrollTop +=
												s * e.settings.wheelSpeed),
								  (c = !0))
								: e.scrollbarXActive &&
								  !e.scrollbarYActive &&
								  (s
										? (o.scrollLeft +=
												s * e.settings.wheelSpeed)
										: (o.scrollLeft -=
												a * e.settings.wheelSpeed),
								  (c = !0))
							: ((o.scrollTop -= a * e.settings.wheelSpeed),
							  (o.scrollLeft += s * e.settings.wheelSpeed)),
							R(e),
							(c = c || i(s, a)) &&
								!t.ctrlKey &&
								(t.stopPropagation(), t.preventDefault());
					}
				}
				var o = e.element;
				void 0 !== window.onwheel
					? e.event.bind(o, "wheel", n)
					: void 0 !== window.onmousewheel &&
					  e.event.bind(o, "mousewheel", n);
			},
			touch: function (e) {
				function i(t, i) {
					var r = Math.floor(h.scrollTop),
						l = h.scrollLeft,
						n = Math.abs(t),
						o = Math.abs(i);
					if (o > n) {
						if (
							(i < 0 &&
								r === e.contentHeight - e.containerHeight) ||
							(i > 0 && 0 === r)
						)
							return 0 === window.scrollY && i > 0 && L.isChrome;
					} else if (
						n > o &&
						((t < 0 && l === e.contentWidth - e.containerWidth) ||
							(t > 0 && 0 === l))
					)
						return !0;
					return !0;
				}
				function r(t, i) {
					(h.scrollTop -= i), (h.scrollLeft -= t), R(e);
				}
				function l(t) {
					return t.targetTouches ? t.targetTouches[0] : t;
				}
				function n(t) {
					return !(
						(t.pointerType &&
							"pen" === t.pointerType &&
							0 === t.buttons) ||
						((!t.targetTouches || 1 !== t.targetTouches.length) &&
							(!t.pointerType ||
								"mouse" === t.pointerType ||
								t.pointerType === t.MSPOINTER_TYPE_MOUSE))
					);
				}
				function o(t) {
					if (n(t)) {
						var e = l(t);
						(u.pageX = e.pageX),
							(u.pageY = e.pageY),
							(d = new Date().getTime()),
							null !== p && clearInterval(p);
					}
				}
				function s(e, i, r) {
					if (!h.contains(e)) return !1;
					for (var l = e; l && l !== h; ) {
						if (l.classList.contains(m.element.consuming))
							return !0;
						var n = t(l);
						if (
							[n.overflow, n.overflowX, n.overflowY]
								.join("")
								.match(/(scroll|auto)/)
						) {
							var o = l.scrollHeight - l.clientHeight;
							if (
								o > 0 &&
								!(
									(0 === l.scrollTop && r > 0) ||
									(l.scrollTop === o && r < 0)
								)
							)
								return !0;
							var s = l.scrollLeft - l.clientWidth;
							if (
								s > 0 &&
								!(
									(0 === l.scrollLeft && i < 0) ||
									(l.scrollLeft === s && i > 0)
								)
							)
								return !0;
						}
						l = l.parentNode;
					}
					return !1;
				}
				function a(t) {
					if (n(t)) {
						var e = l(t),
							o = { pageX: e.pageX, pageY: e.pageY },
							a = o.pageX - u.pageX,
							c = o.pageY - u.pageY;
						if (s(t.target, a, c)) return;
						r(a, c), (u = o);
						var h = new Date().getTime(),
							p = h - d;
						p > 0 && ((f.x = a / p), (f.y = c / p), (d = h)),
							i(a, c) && t.preventDefault();
					}
				}
				function c() {
					e.settings.swipeEasing &&
						(clearInterval(p),
						(p = setInterval(function () {
							e.isInitialized
								? clearInterval(p)
								: f.x || f.y
								? Math.abs(f.x) < 0.01 && Math.abs(f.y) < 0.01
									? clearInterval(p)
									: (r(30 * f.x, 30 * f.y),
									  (f.x *= 0.8),
									  (f.y *= 0.8))
								: clearInterval(p);
						}, 10)));
				}
				if (L.supportsTouch || L.supportsIePointer) {
					var h = e.element,
						u = {},
						d = 0,
						f = {},
						p = null;
					L.supportsTouch
						? (e.event.bind(h, "touchstart", o),
						  e.event.bind(h, "touchmove", a),
						  e.event.bind(h, "touchend", c))
						: L.supportsIePointer &&
						  (window.PointerEvent
								? (e.event.bind(h, "pointerdown", o),
								  e.event.bind(h, "pointermove", a),
								  e.event.bind(h, "pointerup", c))
								: window.MSPointerEvent &&
								  (e.event.bind(h, "MSPointerDown", o),
								  e.event.bind(h, "MSPointerMove", a),
								  e.event.bind(h, "MSPointerUp", c)));
				}
			},
		},
		H = function (r, l) {
			var n = this;
			if (
				(void 0 === l && (l = {}),
				"string" == typeof r && (r = document.querySelector(r)),
				!r || !r.nodeName)
			)
				throw new Error(
					"no element is specified to initialize PerfectScrollbar"
				);
			(this.element = r),
				r.classList.add(m.main),
				(this.settings = {
					handlers: [
						"click-rail",
						"drag-thumb",
						"keyboard",
						"wheel",
						"touch",
					],
					maxScrollbarLength: null,
					minScrollbarLength: null,
					scrollingThreshold: 1e3,
					scrollXMarginOffset: 0,
					scrollYMarginOffset: 0,
					suppressScrollX: !1,
					suppressScrollY: !1,
					swipeEasing: !0,
					useBothWheelAxes: !1,
					wheelPropagation: !0,
					wheelSpeed: 1,
				});
			for (var o in l) n.settings[o] = l[o];
			(this.containerWidth = null),
				(this.containerHeight = null),
				(this.contentWidth = null),
				(this.contentHeight = null);
			var s = function () {
					return r.classList.add(m.state.focus);
				},
				a = function () {
					return r.classList.remove(m.state.focus);
				};
			(this.isRtl = "rtl" === t(r).direction),
				(this.isNegativeScroll = (function () {
					var t = r.scrollLeft,
						e = null;
					return (
						(r.scrollLeft = -1),
						(e = r.scrollLeft < 0),
						(r.scrollLeft = t),
						e
					);
				})()),
				(this.negativeScrollAdjustment = this.isNegativeScroll
					? r.scrollWidth - r.clientWidth
					: 0),
				(this.event = new y()),
				(this.ownerDocument = r.ownerDocument || document),
				(this.scrollbarXRail = i(m.element.rail("x"))),
				r.appendChild(this.scrollbarXRail),
				(this.scrollbarX = i(m.element.thumb("x"))),
				this.scrollbarXRail.appendChild(this.scrollbarX),
				this.scrollbarX.setAttribute("tabindex", 0),
				this.event.bind(this.scrollbarX, "focus", s),
				this.event.bind(this.scrollbarX, "blur", a),
				(this.scrollbarXActive = null),
				(this.scrollbarXWidth = null),
				(this.scrollbarXLeft = null);
			var c = t(this.scrollbarXRail);
			(this.scrollbarXBottom = parseInt(c.bottom, 10)),
				isNaN(this.scrollbarXBottom)
					? ((this.isScrollbarXUsingBottom = !1),
					  (this.scrollbarXTop = u(c.top)))
					: (this.isScrollbarXUsingBottom = !0),
				(this.railBorderXWidth =
					u(c.borderLeftWidth) + u(c.borderRightWidth)),
				e(this.scrollbarXRail, { display: "block" }),
				(this.railXMarginWidth = u(c.marginLeft) + u(c.marginRight)),
				e(this.scrollbarXRail, { display: "" }),
				(this.railXWidth = null),
				(this.railXRatio = null),
				(this.scrollbarYRail = i(m.element.rail("y"))),
				r.appendChild(this.scrollbarYRail),
				(this.scrollbarY = i(m.element.thumb("y"))),
				this.scrollbarYRail.appendChild(this.scrollbarY),
				this.scrollbarY.setAttribute("tabindex", 0),
				this.event.bind(this.scrollbarY, "focus", s),
				this.event.bind(this.scrollbarY, "blur", a),
				(this.scrollbarYActive = null),
				(this.scrollbarYHeight = null),
				(this.scrollbarYTop = null);
			var h = t(this.scrollbarYRail);
			(this.scrollbarYRight = parseInt(h.right, 10)),
				isNaN(this.scrollbarYRight)
					? ((this.isScrollbarYUsingRight = !1),
					  (this.scrollbarYLeft = u(h.left)))
					: (this.isScrollbarYUsingRight = !0),
				(this.scrollbarYOuterWidth = this.isRtl
					? f(this.scrollbarY)
					: null),
				(this.railBorderYWidth =
					u(h.borderTopWidth) + u(h.borderBottomWidth)),
				e(this.scrollbarYRail, { display: "block" }),
				(this.railYMarginHeight = u(h.marginTop) + u(h.marginBottom)),
				e(this.scrollbarYRail, { display: "" }),
				(this.railYHeight = null),
				(this.railYRatio = null),
				(this.reach = {
					x:
						r.scrollLeft <= 0
							? "start"
							: r.scrollLeft >=
							  this.contentWidth - this.containerWidth
							? "end"
							: null,
					y:
						r.scrollTop <= 0
							? "start"
							: r.scrollTop >=
							  this.contentHeight - this.containerHeight
							? "end"
							: null,
				}),
				(this.isAlive = !0),
				this.settings.handlers.forEach(function (t) {
					return T[t](n);
				}),
				(this.lastScrollTop = Math.floor(r.scrollTop)),
				(this.lastScrollLeft = r.scrollLeft),
				this.event.bind(this.element, "scroll", function (t) {
					return n.onScroll(t);
				}),
				R(this);
		};
	return (
		(H.prototype.update = function () {
			this.isAlive &&
				((this.negativeScrollAdjustment = this.isNegativeScroll
					? this.element.scrollWidth - this.element.clientWidth
					: 0),
				e(this.scrollbarXRail, { display: "block" }),
				e(this.scrollbarYRail, { display: "block" }),
				(this.railXMarginWidth =
					u(t(this.scrollbarXRail).marginLeft) +
					u(t(this.scrollbarXRail).marginRight)),
				(this.railYMarginHeight =
					u(t(this.scrollbarYRail).marginTop) +
					u(t(this.scrollbarYRail).marginBottom)),
				e(this.scrollbarXRail, { display: "none" }),
				e(this.scrollbarYRail, { display: "none" }),
				R(this),
				W(this, "top", 0, !1, !0),
				W(this, "left", 0, !1, !0),
				e(this.scrollbarXRail, { display: "" }),
				e(this.scrollbarYRail, { display: "" }));
		}),
		(H.prototype.onScroll = function (t) {
			this.isAlive &&
				(R(this),
				W(this, "top", this.element.scrollTop - this.lastScrollTop),
				W(this, "left", this.element.scrollLeft - this.lastScrollLeft),
				(this.lastScrollTop = Math.floor(this.element.scrollTop)),
				(this.lastScrollLeft = this.element.scrollLeft));
		}),
		(H.prototype.destroy = function () {
			this.isAlive &&
				(this.event.unbindAll(),
				l(this.scrollbarX),
				l(this.scrollbarY),
				l(this.scrollbarXRail),
				l(this.scrollbarYRail),
				this.removePsClasses(),
				(this.element = null),
				(this.scrollbarX = null),
				(this.scrollbarY = null),
				(this.scrollbarXRail = null),
				(this.scrollbarYRail = null),
				(this.isAlive = !1));
		}),
		(H.prototype.removePsClasses = function () {
			this.element.className = this.element.className
				.split(" ")
				.filter(function (t) {
					return !t.match(/^ps([-_].+|)$/);
				})
				.join(" ");
		}),
		H
	);
});
!(function (t, n) {
	"object" == typeof exports && "object" == typeof module
		? (module.exports = n())
		: "function" == typeof define && define.amd
		? define("item-quantity-dropdown", [], n)
		: "object" == typeof exports
		? (exports["item-quantity-dropdown"] = n())
		: (t["item-quantity-dropdown"] = n());
})(this, function () {
	return (function (t) {
		function n(o) {
			if (e[o]) return e[o].exports;
			var r = (e[o] = { exports: {}, id: o, loaded: !1 });
			return (
				t[o].call(r.exports, r, r.exports, n),
				(r.loaded = !0),
				r.exports
			);
		}
		var e = {};
		return (n.m = t), (n.c = e), (n.p = ""), n(0);
	})([
		function (t, n, e) {
			"use strict";
			e(1),
				(function (t) {
					var n = {
						maxItems: 1 / 0,
						minItems: 0,
						selectionText: "item",
						textPlural: "items",
						controls: {
							position: "right",
							incrementText: "+",
							decrementText: "-",
							displayCls: "iqdropdown-item-display",
							controlsCls: "iqdropdown-item-controls",
							counterCls: "counter",
						},
						items: {},
						onChange: function () {},
						beforeDecrement: function () {
							return !0;
						},
						beforeIncrement: function () {
							return !0;
						},
					};
					t.fn.iqDropdown = function (e) {
						function o(t, n) {
							var e = parseInt(n.data("mincount"), 10),
								o = parseInt(n.data("maxcount"), 10);
							u.items[t] = {
								minCount: isNaN(e) ? 0 : e,
								maxCount: isNaN(o) ? 1 / 0 : o,
							};
						}
						function r(n, e, o) {
							var r = t("<div />").addClass(
									u.controls.controlsCls
								),
								i = t(
									"<button>" +
										u.controls.decrementText +
										"</button>"
								),
								s = t(
									"<button>" +
										u.controls.incrementText +
										"</button>"
								),
								a = t("<span>" + l[n] + "</span>").addClass(
									u.controls.counterCls
								);
							return (
								e
									.children("div")
									.addClass(u.controls.displayCls),
								r.append(i, a, s),
								"right" === u.controls.position
									? e.append(r)
									: e.prepend(r),
								i.click(function (t) {
									var e = u.items,
										r = u.minItems,
										i = u.beforeDecrement,
										s = u.onChange,
										c = i(n, l);
									c &&
										d > r &&
										l[n] > e[n].minCount &&
										(l[n]--,
										d--,
										a.html(l[n]),
										o(),
										s(n, l[n], d)),
										t.preventDefault();
								}),
								s.click(function (t) {
									var e = u.items,
										r = u.maxItems,
										i = u.beforeIncrement,
										s = u.onChange,
										c = i(n, l);
									c &&
										d < r &&
										l[n] < e[n].maxCount &&
										(l[n]++,
										d++,
										a.html(l[n]),
										o(),
										s(n, l[n], d)),
										t.preventDefault();
								}),
								e.click(function (t) {
									return t.stopPropagation();
								}),
								e
							);
						}
						function i() {
							var t = 1 !== d && u.textPlural.length > 0,
								n = t ? u.textPlural : u.selectionText;
							s.html(d + " " + n);
						}
						var s = this.find("p").last(),
							a = this.find("ul"),
							c = a.find("li"),
							u = t.extend(!0, {}, n, e),
							l = {},
							d = 0;
						return (
							this.click(function () {
								s.toggleClass("menu-open"),
									a.toggleClass("show-menu");
							}),
							c.each(function () {
								var n = t(this),
									e = n.data("id"),
									s = parseInt(
										n.data("defaultcount") || "0",
										10
									);
								(l[e] = s), (d += s), o(e, n), r(e, n, i);
							}),
							i(),
							this
						);
					};
				})(jQuery);
		},
		function (t, n) {},
	]);
});
//
// SmoothScroll for websites v1.4.10 (Balazs Galambosi)
// http://www.smoothscroll.net/
//
// Licensed under the terms of the MIT license.
//
// You may use it in your theme if you credit me.
// It is also free to use on any individual website.
//
// Exception:
// The only restriction is to not publish any
// extension for browsers or native application
// without getting a written permission first.
//

(function () {
	var ac = {
		frameRate: 350,
		animationTime: 700,
		stepSize: 45,
		pulseAlgorithm: true,
		pulseScale: 4,
		pulseNormalize: 1,
		accelerationDelta: 50,
		accelerationMax: 3,
		keyboardSupport: true,
		arrowScroll: 50,
		fixedBackground: true,
		excluded: "",
	};
	var I = ac;
	var G = false;
	var C = false;
	var m = { x: 0, y: 0 };
	var b = false;
	var K = document.documentElement;
	var h;
	var R;
	var t;
	var ai = [];
	var i;
	var ad = /^Mac/.test(navigator.platform);
	var B = {
		left: 37,
		up: 38,
		right: 39,
		down: 40,
		spacebar: 32,
		pageup: 33,
		pagedown: 34,
		end: 35,
		home: 36,
	};
	var T = { 37: 1, 38: 1, 39: 1, 40: 1 };
	function am() {
		if (I.keyboardSupport) {
			k("keydown", H);
		}
	}
	function af() {
		if (b || !document.body) {
			return;
		}
		b = true;
		var e = document.body;
		var ar = document.documentElement;
		var au = window.innerHeight;
		var at = e.scrollHeight;
		K = document.compatMode.indexOf("CSS") >= 0 ? ar : e;
		h = e;
		am();
		if (top != self) {
			C = true;
		} else {
			if (
				X &&
				at > au &&
				(e.offsetHeight <= au || ar.offsetHeight <= au)
			) {
				var ap = document.createElement("div");
				ap.style.cssText =
					"position:absolute; z-index:-10000; top:0; left:0; right:0; height:" +
					K.scrollHeight +
					"px";
				document.body.appendChild(ap);
				var an;
				t = function () {
					if (an) {
						return;
					}
					an = setTimeout(function () {
						if (G) {
							return;
						}
						ap.style.height = "0";
						ap.style.height = K.scrollHeight + "px";
						an = null;
					}, 500);
				};
				setTimeout(t, 10);
				k("resize", t);
				var aq = {
					attributes: true,
					childList: true,
					characterData: false,
				};
				R = new L(t);
				R.observe(e, aq);
				if (K.offsetHeight <= au) {
					var ao = document.createElement("div");
					ao.style.clear = "both";
					e.appendChild(ao);
				}
			}
		}
		if (!I.fixedBackground && !G) {
			e.style.backgroundAttachment = "scroll";
			ar.style.backgroundAttachment = "scroll";
		}
	}
	function d() {
		R && R.disconnect();
		a(S, u);
		a("mousedown", w);
		a("keydown", H);
		a("resize", t);
		a("load", af);
	}
	var V = [];
	var l = false;
	var v = Date.now();
	function ag(ap, ao, at) {
		M(ao, at);
		if (I.accelerationMax != 1) {
			var e = Date.now();
			var av = e - v;
			if (av < I.accelerationDelta) {
				var ar = (1 + 50 / av) / 2;
				if (ar > 1) {
					ar = Math.min(ar, I.accelerationMax);
					ao *= ar;
					at *= ar;
				}
			}
			v = Date.now();
		}
		V.push({
			x: ao,
			y: at,
			lastX: ao < 0 ? 0.99 : -0.99,
			lastY: at < 0 ? 0.99 : -0.99,
			start: Date.now(),
		});
		if (l) {
			return;
		}
		var au = D();
		var aq = ap === au || ap === document.body;
		if (ap.$scrollBehavior == null && O(ap)) {
			ap.$scrollBehavior = ap.style.scrollBehavior;
			ap.style.scrollBehavior = "auto";
		}
		var an = function (ax) {
			var aw = Date.now();
			var aE = 0;
			var aD = 0;
			for (var az = 0; az < V.length; az++) {
				var aG = V[az];
				var aF = aw - aG.start;
				var ay = aF >= I.animationTime;
				var aA = ay ? 1 : aF / I.animationTime;
				if (I.pulseAlgorithm) {
					aA = p(aA);
				}
				var aC = (aG.x * aA - aG.lastX) >> 0;
				var aB = (aG.y * aA - aG.lastY) >> 0;
				aE += aC;
				aD += aB;
				aG.lastX += aC;
				aG.lastY += aB;
				if (ay) {
					V.splice(az, 1);
					az--;
				}
			}
			if (aq) {
				window.scrollBy(aE, aD);
			} else {
				if (aE) {
					ap.scrollLeft += aE;
				}
				if (aD) {
					ap.scrollTop += aD;
				}
			}
			if (!ao && !at) {
				V = [];
			}
			if (V.length) {
				U(an, ap, 1000 / I.frameRate + 1);
			} else {
				l = false;
				if (ap.$scrollBehavior != null) {
					ap.style.scrollBehavior = ap.$scrollBehavior;
					ap.$scrollBehavior = null;
				}
			}
		};
		U(an, ap, 0);
		l = true;
	}
	function u(ap) {
		if (!b) {
			af();
		}
		var aq = ap.target;
		if (ap.defaultPrevented || ap.ctrlKey) {
			return true;
		}
		if (
			s(h, "embed") ||
			(s(aq, "embed") && /\.pdf/i.test(aq.src)) ||
			s(h, "object") ||
			aq.shadowRoot
		) {
			return true;
		}
		var an = -ap.wheelDeltaX || ap.deltaX || 0;
		var e = -ap.wheelDeltaY || ap.deltaY || 0;
		if (ad) {
			if (ap.wheelDeltaX && A(ap.wheelDeltaX, 120)) {
				an = -120 * (ap.wheelDeltaX / Math.abs(ap.wheelDeltaX));
			}
			if (ap.wheelDeltaY && A(ap.wheelDeltaY, 120)) {
				e = -120 * (ap.wheelDeltaY / Math.abs(ap.wheelDeltaY));
			}
		}
		if (!an && !e) {
			e = -ap.wheelDelta || 0;
		}
		if (ap.deltaMode === 1) {
			an *= 40;
			e *= 40;
		}
		var ao = Y(aq);
		if (!ao) {
			if (C && ah) {
				Object.defineProperty(ap, "target", {
					value: window.frameElement,
				});
				return parent.wheel(ap);
			}
			return true;
		}
		if (ak(e)) {
			return true;
		}
		if (Math.abs(an) > 1.2) {
			an *= I.stepSize / 120;
		}
		if (Math.abs(e) > 1.2) {
			e *= I.stepSize / 120;
		}
		ag(ao, an, e);
		ap.preventDefault();
		r();
	}
	function H(e) {
		var au = e.target;
		var aq =
			e.ctrlKey ||
			e.altKey ||
			e.metaKey ||
			(e.shiftKey && e.keyCode !== B.spacebar);
		if (!document.body.contains(h)) {
			h = document.activeElement;
		}
		var an = /^(textarea|select|embed|object)$/i;
		var ao = /^(button|submit|radio|checkbox|file|color|image)$/i;
		if (
			e.defaultPrevented ||
			an.test(au.nodeName) ||
			(s(au, "input") && !ao.test(au.type)) ||
			s(h, "video") ||
			z(e) ||
			au.isContentEditable ||
			aq
		) {
			return true;
		}
		if (
			(s(au, "button") || (s(au, "input") && ao.test(au.type))) &&
			e.keyCode === B.spacebar
		) {
			return true;
		}
		if (s(au, "input") && au.type == "radio" && T[e.keyCode]) {
			return true;
		}
		var ap,
			ay = 0,
			aw = 0;
		var at = Y(h);
		if (!at) {
			return C && ah ? parent.keydown(e) : true;
		}
		var ar = at.clientHeight;
		if (at == document.body) {
			ar = window.innerHeight;
		}
		switch (e.keyCode) {
			case B.up:
				aw = -I.arrowScroll;
				break;
			case B.down:
				aw = I.arrowScroll;
				break;
			case B.spacebar:
				ap = e.shiftKey ? 1 : -1;
				aw = -ap * ar * 0.9;
				break;
			case B.pageup:
				aw = -ar * 0.9;
				break;
			case B.pagedown:
				aw = ar * 0.9;
				break;
			case B.home:
				if (at == document.body && document.scrollingElement) {
					at = document.scrollingElement;
				}
				aw = -at.scrollTop;
				break;
			case B.end:
				var ax = at.scrollHeight - at.scrollTop;
				var av = ax - ar;
				aw = av > 0 ? av + 10 : 0;
				break;
			case B.left:
				ay = -I.arrowScroll;
				break;
			case B.right:
				ay = I.arrowScroll;
				break;
			default:
				return true;
		}
		ag(at, ay, aw);
		e.preventDefault();
		r();
	}
	function w(e) {
		h = e.target;
	}
	var J = (function () {
		var e = 0;
		return function (an) {
			return an.uniqueID || (an.uniqueID = e++);
		};
	})();
	var o = {};
	var n = {};
	var ae;
	var al = {};
	function r() {
		clearTimeout(ae);
		ae = setInterval(function () {
			o = n = al = {};
		}, 1 * 1000);
	}
	function g(ap, ao, e) {
		var an = e ? o : n;
		for (var aq = ap.length; aq--; ) {
			an[J(ap[aq])] = ao;
		}
		return ao;
	}
	function j(an, e) {
		return (e ? o : n)[J(an)];
	}
	function Y(ar) {
		var ao = [];
		var e = document.body;
		var an = K.scrollHeight;
		do {
			var aq = j(ar, false);
			if (aq) {
				return g(ao, aq);
			}
			ao.push(ar);
			if (an === ar.scrollHeight) {
				var at = W(K) && W(e);
				var ap = at || N(K);
				if ((C && Z(K)) || (!C && ap)) {
					return g(ao, D());
				}
			} else {
				if (Z(ar) && N(ar)) {
					return g(ao, ar);
				}
			}
		} while ((ar = ar.parentElement));
	}
	function Z(e) {
		return e.clientHeight + 10 < e.scrollHeight;
	}
	function W(e) {
		var an = getComputedStyle(e, "").getPropertyValue("overflow-y");
		return an !== "hidden";
	}
	function N(e) {
		var an = getComputedStyle(e, "").getPropertyValue("overflow-y");
		return an === "scroll" || an === "auto";
	}
	function O(e) {
		var ao = J(e);
		if (al[ao] == null) {
			var an = getComputedStyle(e, "")["scroll-behavior"];
			al[ao] = "smooth" == an;
		}
		return al[ao];
	}
	function k(ao, an, e) {
		window.addEventListener(ao, an, e || false);
	}
	function a(ao, an, e) {
		window.removeEventListener(ao, an, e || false);
	}
	function s(an, e) {
		return an && (an.nodeName || "").toLowerCase() === e.toLowerCase();
	}
	function M(e, an) {
		e = e > 0 ? 1 : -1;
		an = an > 0 ? 1 : -1;
		if (m.x !== e || m.y !== an) {
			m.x = e;
			m.y = an;
			V = [];
			v = 0;
		}
	}
	if (window.localStorage && localStorage.SS_deltaBuffer) {
		try {
			ai = localStorage.SS_deltaBuffer.split(",");
		} catch (aj) {}
	}
	function ak(e) {
		if (!e) {
			return;
		}
		if (!ai.length) {
			ai = [e, e, e];
		}
		e = Math.abs(e);
		ai.push(e);
		ai.shift();
		clearTimeout(i);
		i = setTimeout(function () {
			try {
				localStorage.SS_deltaBuffer = ai.join(",");
			} catch (ap) {}
		}, 1000);
		var an = e > 120 && F(e);
		var ao = !F(120) && !F(100) && !an;
		if (e < 50) {
			return true;
		}
		return ao;
	}
	function A(an, e) {
		return Math.floor(an / e) == an / e;
	}
	function F(e) {
		return A(ai[0], e) && A(ai[1], e) && A(ai[2], e);
	}
	function z(ao) {
		var an = ao.target;
		var e = false;
		if (document.URL.indexOf("www.youtube.com/watch") != -1) {
			do {
				e =
					an.classList &&
					an.classList.contains("html5-video-controls");
				if (e) {
					break;
				}
			} while ((an = an.parentNode));
		}
		return e;
	}
	var U = (function () {
		return (
			window.requestAnimationFrame ||
			window.webkitRequestAnimationFrame ||
			window.mozRequestAnimationFrame ||
			function (ao, an, e) {
				window.setTimeout(ao, e || 1000 / 60);
			}
		);
	})();
	var L =
		window.MutationObserver ||
		window.WebKitMutationObserver ||
		window.MozMutationObserver;
	var D = (function () {
		var e = document.scrollingElement;
		return function () {
			if (!e) {
				var ap = document.createElement("div");
				ap.style.cssText = "height:10000px;width:1px;";
				document.body.appendChild(ap);
				var ao = document.body.scrollTop;
				var an = document.documentElement.scrollTop;
				window.scrollBy(0, 3);
				if (document.body.scrollTop != ao) {
					e = document.body;
				} else {
					e = document.documentElement;
				}
				window.scrollBy(0, -3);
				document.body.removeChild(ap);
			}
			return e;
		};
	})();
	function ab(e) {
		var ao, ap, an;
		e = e * I.pulseScale;
		if (e < 1) {
			ao = e - (1 - Math.exp(-e));
		} else {
			ap = Math.exp(-1);
			e -= 1;
			an = 1 - Math.exp(-e);
			ao = ap + an * (1 - ap);
		}
		return ao * I.pulseNormalize;
	}
	function p(e) {
		if (e >= 1) {
			return 1;
		}
		if (e <= 0) {
			return 0;
		}
		if (I.pulseNormalize == 1) {
			I.pulseNormalize /= ab(1);
		}
		return ab(e);
	}
	var Q = window.navigator.userAgent;
	var aa = /Edge/.test(Q);
	var ah = /chrome/i.test(Q) && !aa;
	var f = /safari/i.test(Q) && !aa;
	var c = /firefox/i.test(Q);
	var P = /mobile/i.test(Q);
	var y = /Windows NT 6.1/i.test(Q) && /rv:11/i.test(Q);
	var X = f && (/Version\/8/i.test(Q) || /Version\/9/i.test(Q));
	var x = false;
	try {
		window.addEventListener(
			"test",
			null,
			Object.defineProperty({}, "passive", {
				get: function () {
					x = true;
				},
			})
		);
	} catch (aj) {}
	var E = x ? { passive: false } : false;
	var S = "onwheel" in document.createElement("div") ? "wheel" : "mousewheel";
	if (S) {
		k(S, u, E);
		k("mousedown", w);
		k("load", af);
	}
	function q(an) {
		for (var e in an) {
			if (ac.hasOwnProperty(e)) {
				I[e] = an[e];
			}
		}
	}
	q.destroy = d;
	if (window.SmoothScrollOptions) {
		q(window.SmoothScrollOptions);
	}
	if (typeof define === "function" && define.amd) {
		define(function () {
			return q;
		});
	} else {
		if ("object" == typeof exports) {
			module.exports = q;
		} else {
			window.SmoothScroll = q;
		}
	}
})();
