var requirejs, require, define;
(function (ba) {
  function G(b) {
    return "[object Function]" === K.call(b);
  }
  function H(b) {
    return "[object Array]" === K.call(b);
  }
  function v(b, c) {
    if (b) {
      var d;
      for (d = 0; d < b.length && (!b[d] || !c(b[d], d, b)); d += 1) {}
    }
  }
  function T(b, c) {
    if (b) {
      var d;
      for (d = b.length - 1; -1 < d && (!b[d] || !c(b[d], d, b)); d -= 1) {}
    }
  }
  function t(b, c) {
    return fa.call(b, c);
  }
  function m(b, c) {
    return t(b, c) && b[c];
  }
  function B(b, c) {
    for (var d in b) {
      if (t(b, d) && c(b[d], d)) {
        break;
      }
    }
  }
  function U(b, c, d, e) {
    c &&
      B(c, function (c, g) {
        if (d || !t(b, g)) {
          e &&
          "object" === typeof c &&
          c &&
          !H(c) &&
          !G(c) &&
          !(c instanceof RegExp)
            ? (b[g] || (b[g] = {}), U(b[g], c, d, e))
            : (b[g] = c);
        }
      });
    return b;
  }
  function u(b, c) {
    return function () {
      return c.apply(b, arguments);
    };
  }
  function ca(b) {
    throw b;
  }
  function da(b) {
    if (!b) {
      return b;
    }
    var c = ba;
    v(b.split("."), function (b) {
      c = c[b];
    });
    return c;
  }
  function C(b, c, d, e) {
    c = Error(c + "\nhttp://requirejs.org/docs/errors.html#" + b);
    c.requireType = b;
    c.requireModules = e;
    d && (c.originalError = d);
    return c;
  }
  function ga(b) {
    function c(a, k, b) {
      var f,
        l,
        c,
        d,
        e,
        g,
        i,
        p,
        k = k && k.split("/"),
        h = j.map,
        n = h && h["*"];
      if (a) {
        a = a.split("/");
        l = a.length - 1;
        j.nodeIdCompat && Q.test(a[l]) && (a[l] = a[l].replace(Q, ""));
        "." === a[0].charAt(0) &&
          k &&
          ((l = k.slice(0, k.length - 1)), (a = l.concat(a)));
        l = a;
        for (c = 0; c < l.length; c++) {
          if (((d = l[c]), "." === d)) {
            l.splice(c, 1), (c -= 1);
          } else {
            if (
              ".." === d &&
              !(0 === c || (1 == c && ".." === l[2]) || ".." === l[c - 1]) &&
              0 < c
            ) {
              l.splice(c - 1, 2), (c -= 2);
            }
          }
        }
        a = a.join("/");
      }
      if (b && h && (k || n)) {
        l = a.split("/");
        c = l.length;
        a: for (; 0 < c; c -= 1) {
          e = l.slice(0, c).join("/");
          if (k) {
            for (d = k.length; 0 < d; d -= 1) {
              if ((b = m(h, k.slice(0, d).join("/")))) {
                if ((b = m(b, e))) {
                  f = b;
                  g = c;
                  break a;
                }
              }
            }
          }
          !i && n && m(n, e) && ((i = m(n, e)), (p = c));
        }
        !f && i && ((f = i), (g = p));
        f && (l.splice(0, g, f), (a = l.join("/")));
      }
      return (f = m(j.pkgs, a)) ? f : a;
    }
    function d(a) {
      z &&
        v(document.getElementsByTagName("script"), function (k) {
          if (
            k.getAttribute("data-requiremodule") === a &&
            k.getAttribute("data-requirecontext") === i.contextName
          ) {
            return k.parentNode.removeChild(k), !0;
          }
        });
    }
    function e(a) {
      var k = m(j.paths, a);
      if (k && H(k) && 1 < k.length) {
        return (
          k.shift(),
          i.require.undef(a),
          i.makeRequire(null, { skipMap: !0 })([a]),
          !0
        );
      }
    }
    function n(a) {
      var k,
        c = a ? a.indexOf("!") : -1;
      -1 < c && ((k = a.substring(0, c)), (a = a.substring(c + 1, a.length)));
      return [k, a];
    }
    function p(a, k, b, f) {
      var l,
        d,
        e = null,
        g = k ? k.name : null,
        j = a,
        p = !0,
        h = "";
      a || ((p = !1), (a = "_@r" + (K += 1)));
      a = n(a);
      e = a[0];
      a = a[1];
      e && ((e = c(e, g, f)), (d = m(r, e)));
      a &&
        (e
          ? (h =
              d && d.normalize
                ? d.normalize(a, function (a) {
                    return c(a, g, f);
                  })
                : -1 === a.indexOf("!")
                ? c(a, g, f)
                : a)
          : ((h = c(a, g, f)),
            (a = n(h)),
            (e = a[0]),
            (h = a[1]),
            (b = !0),
            (l = i.nameToUrl(h))));
      b = e && !d && !b ? "_unnormalized" + (O += 1) : "";
      return {
        prefix: e,
        name: h,
        parentMap: k,
        unnormalized: !!b,
        url: l,
        originalName: j,
        isDefine: p,
        id: (e ? e + "!" + h : h) + b,
      };
    }
    function s(a) {
      var k = a.id,
        b = m(h, k);
      b || (b = h[k] = new i.Module(a));
      return b;
    }
    function q(a, k, b) {
      var f = a.id,
        c = m(h, f);
      if (t(r, f) && (!c || c.defineEmitComplete)) {
        "defined" === k && b(r[f]);
      } else {
        if (((c = s(a)), c.error && "error" === k)) {
          b(c.error);
        } else {
          c.on(k, b);
        }
      }
    }
    function w(a, b) {
      var c = a.requireModules,
        f = !1;
      if (b) {
        b(a);
      } else {
        if (
          (v(c, function (b) {
            if ((b = m(h, b))) {
              (b.error = a), b.events.error && ((f = !0), b.emit("error", a));
            }
          }),
          !f)
        ) {
          g.onError(a);
        }
      }
    }
    function x() {
      R.length && (ha.apply(A, [A.length, 0].concat(R)), (R = []));
    }
    function y(a) {
      delete h[a];
      delete V[a];
    }
    function F(a, b, c) {
      var f = a.map.id;
      a.error
        ? a.emit("error", a.error)
        : ((b[f] = !0),
          v(a.depMaps, function (f, d) {
            var e = f.id,
              g = m(h, e);
            g &&
              !a.depMatched[d] &&
              !c[e] &&
              (m(b, e) ? (a.defineDep(d, r[e]), a.check()) : F(g, b, c));
          }),
          (c[f] = !0));
    }
    function D() {
      var a,
        b,
        c =
          (a = 1000 * j.waitSeconds) && i.startTime + a < new Date().getTime(),
        f = [],
        l = [],
        g = !1,
        h = !0;
      if (!W) {
        W = !0;
        B(V, function (a) {
          var i = a.map,
            j = i.id;
          if (a.enabled && (i.isDefine || l.push(a), !a.error)) {
            if (!a.inited && c) {
              e(j) ? (g = b = !0) : (f.push(j), d(j));
            } else {
              if (
                !a.inited &&
                a.fetched &&
                i.isDefine &&
                ((g = !0), !i.prefix)
              ) {
                return (h = !1);
              }
            }
          }
        });
        if (c && f.length) {
          return (
            (a = C("timeout", "Load timeout for modules: " + f, null, f)),
            (a.contextName = i.contextName),
            w(a)
          );
        }
        h &&
          v(l, function (a) {
            F(a, {}, {});
          });
        if ((!c || b) && g) {
          if ((z || ea) && !X) {
            X = setTimeout(function () {
              X = 0;
              D();
            }, 50);
          }
        }
        W = !1;
      }
    }
    function E(a) {
      t(r, a[0]) || s(p(a[0], null, !0)).init(a[1], a[2]);
    }
    function I(a) {
      var a = a.currentTarget || a.srcElement,
        b = i.onScriptLoad;
      a.detachEvent && !Y
        ? a.detachEvent("onreadystatechange", b)
        : a.removeEventListener("load", b, !1);
      b = i.onScriptError;
      (!a.detachEvent || Y) && a.removeEventListener("error", b, !1);
      return { node: a, id: a && a.getAttribute("data-requiremodule") };
    }
    function J() {
      var a;
      for (x(); A.length; ) {
        a = A.shift();
        if (null === a[0]) {
          return w(
            C(
              "mismatch",
              "Mismatched anonymous define() module: " + a[a.length - 1]
            )
          );
        }
        E(a);
      }
    }
    var W,
      Z,
      i,
      L,
      X,
      j = {
        waitSeconds: 7,
        baseUrl: "./",
        paths: {},
        bundles: {},
        pkgs: {},
        shim: {},
        config: {},
      },
      h = {},
      V = {},
      $ = {},
      A = [],
      r = {},
      S = {},
      aa = {},
      K = 1,
      O = 1;
    L = {
      require: function (a) {
        return a.require ? a.require : (a.require = i.makeRequire(a.map));
      },
      exports: function (a) {
        a.usingExports = !0;
        if (a.map.isDefine) {
          return a.exports
            ? (r[a.map.id] = a.exports)
            : (a.exports = r[a.map.id] = {});
        }
      },
      module: function (a) {
        return a.module
          ? a.module
          : (a.module = {
              id: a.map.id,
              uri: a.map.url,
              config: function () {
                return m(j.config, a.map.id) || {};
              },
              exports: a.exports || (a.exports = {}),
            });
      },
    };
    Z = function (a) {
      this.events = m($, a.id) || {};
      this.map = a;
      this.shim = m(j.shim, a.id);
      this.depExports = [];
      this.depMaps = [];
      this.depMatched = [];
      this.pluginMaps = {};
      this.depCount = 0;
    };
    Z.prototype = {
      init: function (a, b, c, f) {
        f = f || {};
        if (!this.inited) {
          this.factory = b;
          if (c) {
            this.on("error", c);
          } else {
            this.events.error &&
              (c = u(this, function (a) {
                this.emit("error", a);
              }));
          }
          this.depMaps = a && a.slice(0);
          this.errback = c;
          this.inited = !0;
          this.ignore = f.ignore;
          f.enabled || this.enabled ? this.enable() : this.check();
        }
      },
      defineDep: function (a, b) {
        this.depMatched[a] ||
          ((this.depMatched[a] = !0),
          (this.depCount -= 1),
          (this.depExports[a] = b));
      },
      fetch: function () {
        if (!this.fetched) {
          this.fetched = !0;
          i.startTime = new Date().getTime();
          var a = this.map;
          if (this.shim) {
            i.makeRequire(this.map, { enableBuildCallback: !0 })(
              this.shim.deps || [],
              u(this, function () {
                return a.prefix ? this.callPlugin() : this.load();
              })
            );
          } else {
            return a.prefix ? this.callPlugin() : this.load();
          }
        }
      },
      load: function () {
        var a = this.map.url;
        S[a] || ((S[a] = !0), i.load(this.map.id, a));
      },
      check: function () {
        if (this.enabled && !this.enabling) {
          var a,
            b,
            c = this.map.id;
          b = this.depExports;
          var f = this.exports,
            l = this.factory;
          if (this.inited) {
            if (this.error) {
              this.emit("error", this.error);
            } else {
              if (!this.defining) {
                this.defining = !0;
                if (1 > this.depCount && !this.defined) {
                  if (G(l)) {
                    if (
                      (this.events.error && this.map.isDefine) ||
                      g.onError !== ca
                    ) {
                      try {
                        f = i.execCb(c, l, b, f);
                      } catch (d) {
                        a = d;
                      }
                    } else {
                      f = i.execCb(c, l, b, f);
                    }
                    this.map.isDefine &&
                      void 0 === f &&
                      ((b = this.module)
                        ? (f = b.exports)
                        : this.usingExports && (f = this.exports));
                    if (a) {
                      return (
                        (a.requireMap = this.map),
                        (a.requireModules = this.map.isDefine
                          ? [this.map.id]
                          : null),
                        (a.requireType = this.map.isDefine
                          ? "define"
                          : "require"),
                        w((this.error = a))
                      );
                    }
                  } else {
                    f = l;
                  }
                  this.exports = f;
                  if (
                    this.map.isDefine &&
                    !this.ignore &&
                    ((r[c] = f), g.onResourceLoad)
                  ) {
                    g.onResourceLoad(i, this.map, this.depMaps);
                  }
                  y(c);
                  this.defined = !0;
                }
                this.defining = !1;
                this.defined &&
                  !this.defineEmitted &&
                  ((this.defineEmitted = !0),
                  this.emit("defined", this.exports),
                  (this.defineEmitComplete = !0));
              }
            }
          } else {
            this.fetch();
          }
        }
      },
      callPlugin: function () {
        var a = this.map,
          b = a.id,
          d = p(a.prefix);
        this.depMaps.push(d);
        q(
          d,
          "defined",
          u(this, function (f) {
            var l, d;
            d = m(aa, this.map.id);
            var e = this.map.name,
              P = this.map.parentMap ? this.map.parentMap.name : null,
              n = i.makeRequire(a.parentMap, { enableBuildCallback: !0 });
            if (this.map.unnormalized) {
              if (
                (f.normalize &&
                  (e =
                    f.normalize(e, function (a) {
                      return c(a, P, !0);
                    }) || ""),
                (f = p(a.prefix + "!" + e, this.map.parentMap)),
                q(
                  f,
                  "defined",
                  u(this, function (a) {
                    this.init(
                      [],
                      function () {
                        return a;
                      },
                      null,
                      { enabled: !0, ignore: !0 }
                    );
                  })
                ),
                (d = m(h, f.id)))
              ) {
                this.depMaps.push(f);
                if (this.events.error) {
                  d.on(
                    "error",
                    u(this, function (a) {
                      this.emit("error", a);
                    })
                  );
                }
                d.enable();
              }
            } else {
              d
                ? ((this.map.url = i.nameToUrl(d)), this.load())
                : ((l = u(this, function (a) {
                    this.init(
                      [],
                      function () {
                        return a;
                      },
                      null,
                      { enabled: !0 }
                    );
                  })),
                  (l.error = u(this, function (a) {
                    this.inited = !0;
                    this.error = a;
                    a.requireModules = [b];
                    B(h, function (a) {
                      0 === a.map.id.indexOf(b + "_unnormalized") &&
                        y(a.map.id);
                    });
                    w(a);
                  })),
                  (l.fromText = u(this, function (f, c) {
                    var d = a.name,
                      e = p(d),
                      P = M;
                    c && (f = c);
                    P && (M = !1);
                    s(e);
                    t(j.config, b) && (j.config[d] = j.config[b]);
                    try {
                      g.exec(f);
                    } catch (h) {
                      return w(
                        C(
                          "fromtexteval",
                          "fromText eval for " + b + " failed: " + h,
                          h,
                          [b]
                        )
                      );
                    }
                    P && (M = !0);
                    this.depMaps.push(e);
                    i.completeLoad(d);
                    n([d], l);
                  })),
                  f.load(a.name, n, l, j));
            }
          })
        );
        i.enable(d, this);
        this.pluginMaps[d.id] = d;
      },
      enable: function () {
        V[this.map.id] = this;
        this.enabling = this.enabled = !0;
        v(
          this.depMaps,
          u(this, function (a, b) {
            var c, f;
            if ("string" === typeof a) {
              a = p(
                a,
                this.map.isDefine ? this.map : this.map.parentMap,
                !1,
                !this.skipMap
              );
              this.depMaps[b] = a;
              if ((c = m(L, a.id))) {
                this.depExports[b] = c(this);
                return;
              }
              this.depCount += 1;
              q(
                a,
                "defined",
                u(this, function (a) {
                  this.defineDep(b, a);
                  this.check();
                })
              );
              this.errback && q(a, "error", u(this, this.errback));
            }
            c = a.id;
            f = h[c];
            !t(L, c) && f && !f.enabled && i.enable(a, this);
          })
        );
        B(
          this.pluginMaps,
          u(this, function (a) {
            var b = m(h, a.id);
            b && !b.enabled && i.enable(a, this);
          })
        );
        this.enabling = !1;
        this.check();
      },
      on: function (a, b) {
        var c = this.events[a];
        c || (c = this.events[a] = []);
        c.push(b);
      },
      emit: function (a, b) {
        v(this.events[a], function (a) {
          a(b);
        });
        "error" === a && delete this.events[a];
      },
    };
    i = {
      config: j,
      contextName: b,
      registry: h,
      defined: r,
      urlFetched: S,
      defQueue: A,
      Module: Z,
      makeModuleMap: p,
      nextTick: g.nextTick,
      onError: w,
      configure: function (a) {
        a.baseUrl &&
          "/" !== a.baseUrl.charAt(a.baseUrl.length - 1) &&
          (a.baseUrl += "/");
        var b = j.shim,
          c = { paths: !0, bundles: !0, config: !0, map: !0 };
        B(a, function (a, b) {
          c[b] ? (j[b] || (j[b] = {}), U(j[b], a, !0, !0)) : (j[b] = a);
        });
        a.bundles &&
          B(a.bundles, function (a, b) {
            v(a, function (a) {
              a !== b && (aa[a] = b);
            });
          });
        a.shim &&
          (B(a.shim, function (a, c) {
            H(a) && (a = { deps: a });
            if ((a.exports || a.init) && !a.exportsFn) {
              a.exportsFn = i.makeShimExports(a);
            }
            b[c] = a;
          }),
          (j.shim = b));
        a.packages &&
          v(a.packages, function (a) {
            var b,
              a = "string" === typeof a ? { name: a } : a;
            b = a.name;
            a.location && (j.paths[b] = a.location);
            j.pkgs[b] =
              a.name + "/" + (a.main || "main").replace(ia, "").replace(Q, "");
          });
        B(h, function (a, b) {
          !a.inited && !a.map.unnormalized && (a.map = p(b));
        });
        if (a.deps || a.callback) {
          i.require(a.deps || [], a.callback);
        }
      },
      makeShimExports: function (a) {
        return function () {
          var b;
          a.init && (b = a.init.apply(ba, arguments));
          return b || (a.exports && da(a.exports));
        };
      },
      makeRequire: function (a, e) {
        function j(c, d, m) {
          var n, q;
          e.enableBuildCallback && d && G(d) && (d.__requireJsBuild = !0);
          if ("string" === typeof c) {
            if (G(d)) {
              return w(C("requireargs", "Invalid require call"), m);
            }
            if (a && t(L, c)) {
              return L[c](h[a.id]);
            }
            if (g.get) {
              return g.get(i, c, a, j);
            }
            n = p(c, a, !1, !0);
            n = n.id;
            return !t(r, n)
              ? w(
                  C(
                    "notloaded",
                    'Module name "' +
                      n +
                      '" has not been loaded yet for context: ' +
                      b +
                      (a ? "" : ". Use require([])")
                  )
                )
              : r[n];
          }
          J();
          i.nextTick(function () {
            J();
            q = s(p(null, a));
            q.skipMap = e.skipMap;
            q.init(c, d, m, { enabled: !0 });
            D();
          });
          return j;
        }
        e = e || {};
        U(j, {
          isBrowser: z,
          toUrl: function (b) {
            var d,
              e = b.lastIndexOf("."),
              k = b.split("/")[0];
            if (-1 !== e && (!("." === k || ".." === k) || 1 < e)) {
              (d = b.substring(e, b.length)), (b = b.substring(0, e));
            }
            return i.nameToUrl(c(b, a && a.id, !0), d, !0);
          },
          defined: function (b) {
            return t(r, p(b, a, !1, !0).id);
          },
          specified: function (b) {
            b = p(b, a, !1, !0).id;
            return t(r, b) || t(h, b);
          },
        });
        a ||
          (j.undef = function (b) {
            x();
            var c = p(b, a, !0),
              e = m(h, b);
            d(b);
            delete r[b];
            delete S[c.url];
            delete $[b];
            T(A, function (a, c) {
              a[0] === b && A.splice(c, 1);
            });
            e && (e.events.defined && ($[b] = e.events), y(b));
          });
        return j;
      },
      enable: function (a) {
        m(h, a.id) && s(a).enable();
      },
      completeLoad: function (a) {
        var b,
          c,
          d = m(j.shim, a) || {},
          g = d.exports;
        for (x(); A.length; ) {
          c = A.shift();
          if (null === c[0]) {
            c[0] = a;
            if (b) {
              break;
            }
            b = !0;
          } else {
            c[0] === a && (b = !0);
          }
          E(c);
        }
        c = m(h, a);
        if (!b && !t(r, a) && c && !c.inited) {
          if (j.enforceDefine && (!g || !da(g))) {
            return e(a)
              ? void 0
              : w(C("nodefine", "No define call for " + a, null, [a]));
          }
          E([a, d.deps || [], d.exportsFn]);
        }
        D();
      },
      nameToUrl: function (a, b, c) {
        var d, e, h;
        (d = m(j.pkgs, a)) && (a = d);
        if ((d = m(aa, a))) {
          return i.nameToUrl(d, b, c);
        }
        if (g.jsExtRegExp.test(a)) {
          d = a + (b || "");
        } else {
          d = j.paths;
          a = a.split("/");
          for (e = a.length; 0 < e; e -= 1) {
            if (((h = a.slice(0, e).join("/")), (h = m(d, h)))) {
              H(h) && (h = h[0]);
              a.splice(0, e, h);
              break;
            }
          }
          d = a.join("/");
          d += b || (/^data\:|\?/.test(d) || c ? "" : ".js");
          d =
            ("/" === d.charAt(0) || d.match(/^[\w\+\.\-]+:/) ? "" : j.baseUrl) +
            d;
        }
        return j.urlArgs
          ? d + ((-1 === d.indexOf("?") ? "?" : "&") + j.urlArgs)
          : d;
      },
      load: function (a, b) {
        g.load(i, a, b);
      },
      execCb: function (a, b, c, d) {
        return b.apply(d, c);
      },
      onScriptLoad: function (a) {
        if (
          "load" === a.type ||
          ja.test((a.currentTarget || a.srcElement).readyState)
        ) {
          (N = null), (a = I(a)), i.completeLoad(a.id);
        }
      },
      onScriptError: function (a) {
        var b = I(a);
        if (!e(b.id)) {
          return w(C("scripterror", "Script error for: " + b.id, a, [b.id]));
        }
      },
    };
    i.require = i.makeRequire();
    return i;
  }
  var g,
    x,
    y,
    D,
    I,
    E,
    N,
    J,
    s,
    O,
    ka = /(\/\*([\s\S]*?)\*\/|([^:]|^)\/\/(.*)$)/gm,
    la = /[^.]\s*require\s*\(\s*["']([^'"\s]+)["']\s*\)/g,
    Q = /\.js$/,
    ia = /^\.\//;
  x = Object.prototype;
  var K = x.toString,
    fa = x.hasOwnProperty,
    ha = Array.prototype.splice,
    z = !!(
      "undefined" !== typeof window &&
      "undefined" !== typeof navigator &&
      window.document
    ),
    ea = !z && "undefined" !== typeof importScripts,
    ja =
      z && "PLAYSTATION 3" === navigator.platform
        ? /^complete$/
        : /^(complete|loaded)$/,
    Y = "undefined" !== typeof opera && "[object Opera]" === opera.toString(),
    F = {},
    q = {},
    R = [],
    M = !1;
  if ("undefined" === typeof define) {
    if ("undefined" !== typeof requirejs) {
      if (G(requirejs)) {
        return;
      }
      q = requirejs;
      requirejs = void 0;
    }
    "undefined" !== typeof require &&
      !G(require) &&
      ((q = require), (require = void 0));
    g = requirejs = function (b, c, d, e) {
      var n,
        p = "_";
      !H(b) &&
        "string" !== typeof b &&
        ((n = b), H(c) ? ((b = c), (c = d), (d = e)) : (b = []));
      n && n.context && (p = n.context);
      (e = m(F, p)) || (e = F[p] = g.s.newContext(p));
      n && e.configure(n);
      return e.require(b, c, d);
    };
    g.config = function (b) {
      return g(b);
    };
    g.nextTick =
      "undefined" !== typeof setTimeout
        ? function (b) {
            setTimeout(b, 4);
          }
        : function (b) {
            b();
          };
    require || (require = g);
    g.version = "2.1.15";
    g.jsExtRegExp = /^\/|:|\?|\.js$/;
    g.isBrowser = z;
    x = g.s = { contexts: F, newContext: ga };
    g({});
    v(["toUrl", "undef", "defined", "specified"], function (b) {
      g[b] = function () {
        var c = F._;
        return c.require[b].apply(c, arguments);
      };
    });
    if (
      z &&
      ((y = x.head = document.getElementsByTagName("head")[0]),
      (D = document.getElementsByTagName("base")[0]))
    ) {
      y = x.head = D.parentNode;
    }
    g.onError = ca;
    g.createNode = function (b) {
      var c = b.xhtml
        ? document.createElementNS(
            "http://www.w3.org/1999/xhtml",
            "html:script"
          )
        : document.createElement("script");
      c.type = b.scriptType || "text/javascript";
      c.charset = "utf-8";
      c.async = !0;
      return c;
    };
    g.load = function (b, c, d) {
      var e = (b && b.config) || {};
      if (z) {
        return (
          (e = g.createNode(e, c, d)),
          e.setAttribute("data-requirecontext", b.contextName),
          e.setAttribute("data-requiremodule", c),
          e.attachEvent &&
          !(
            e.attachEvent.toString &&
            0 > e.attachEvent.toString().indexOf("[native code")
          ) &&
          !Y
            ? ((M = !0), e.attachEvent("onreadystatechange", b.onScriptLoad))
            : (e.addEventListener("load", b.onScriptLoad, !1),
              e.addEventListener("error", b.onScriptError, !1)),
          (e.src = d),
          (J = e),
          D ? y.insertBefore(e, D) : y.appendChild(e),
          (J = null),
          e
        );
      }
      if (ea) {
        try {
          importScripts(d), b.completeLoad(c);
        } catch (m) {
          b.onError(
            C(
              "importscripts",
              "importScripts failed for " + c + " at " + d,
              m,
              [c]
            )
          );
        }
      }
    };
    z &&
      !q.skipDataMain &&
      T(document.getElementsByTagName("script"), function (b) {
        y || (y = b.parentNode);
        if ((I = b.getAttribute("data-main"))) {
          return (
            (s = I),
            q.baseUrl ||
              ((E = s.split("/")),
              (s = E.pop()),
              (O = E.length ? E.join("/") + "/" : "./"),
              (q.baseUrl = O)),
            (s = s.replace(Q, "")),
            g.jsExtRegExp.test(s) && (s = I),
            (q.deps = q.deps ? q.deps.concat(s) : [s]),
            !0
          );
        }
      });
    define = function (b, c, d) {
      var e, g;
      "string" !== typeof b && ((d = c), (c = b), (b = null));
      H(c) || ((d = c), (c = null));
      !c &&
        G(d) &&
        ((c = []),
        d.length &&
          (d
            .toString()
            .replace(ka, "")
            .replace(la, function (b, d) {
              c.push(d);
            }),
          (c = (
            1 === d.length ? ["require"] : ["require", "exports", "module"]
          ).concat(c))));
      if (M) {
        if (!(e = J)) {
          (N && "interactive" === N.readyState) ||
            T(document.getElementsByTagName("script"), function (b) {
              if ("interactive" === b.readyState) {
                return (N = b);
              }
            }),
            (e = N);
        }
        e &&
          (b || (b = e.getAttribute("data-requiremodule")),
          (g = F[e.getAttribute("data-requirecontext")]));
      }
      (g ? g.defQueue : R).push([b, c, d]);
    };
    define.amd = { jQuery: !0 };
    g.exec = function (b) {
      return eval(b);
    };
    g(q);
  }
})(this);
/* jQuery v1.11.3 | (c) 2005, 2015 jQuery Foundation, Inc. | jquery.org/license */
!(function (d, c) {
  "object" == typeof module && "object" == typeof module.exports
    ? (module.exports = d.document
        ? c(d, !0)
        : function (b) {
            if (!b.document) {
              throw new Error("jQuery requires a window with a document");
            }
            return c(b);
          })
    : c(d);
})("undefined" != typeof window ? window : this, function (a, b) {
  var c = [],
    d = c.slice,
    e = c.concat,
    f = c.push,
    g = c.indexOf,
    h = {},
    i = h.toString,
    j = h.hasOwnProperty,
    k = {},
    l = "1.11.3",
    m = function (a, b) {
      return new m.fn.init(a, b);
    },
    n = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,
    o = /^-ms-/,
    p = /-([\da-z])/gi,
    q = function (a, b) {
      return b.toUpperCase();
    };
  (m.fn = m.prototype =
    {
      jquery: l,
      constructor: m,
      selector: "",
      length: 0,
      toArray: function () {
        return d.call(this);
      },
      get: function (a) {
        return null != a
          ? 0 > a
            ? this[a + this.length]
            : this[a]
          : d.call(this);
      },
      pushStack: function (a) {
        var b = m.merge(this.constructor(), a);
        return (b.prevObject = this), (b.context = this.context), b;
      },
      each: function (a, b) {
        return m.each(this, a, b);
      },
      map: function (a) {
        return this.pushStack(
          m.map(this, function (b, c) {
            return a.call(b, c, b);
          })
        );
      },
      slice: function () {
        return this.pushStack(d.apply(this, arguments));
      },
      first: function () {
        return this.eq(0);
      },
      last: function () {
        return this.eq(-1);
      },
      eq: function (a) {
        var b = this.length,
          c = +a + (0 > a ? b : 0);
        return this.pushStack(c >= 0 && b > c ? [this[c]] : []);
      },
      end: function () {
        return this.prevObject || this.constructor(null);
      },
      push: f,
      sort: c.sort,
      splice: c.splice,
    }),
    (m.extend = m.fn.extend =
      function () {
        var a,
          b,
          c,
          d,
          e,
          f,
          g = arguments[0] || {},
          h = 1,
          i = arguments.length,
          j = !1;
        for (
          "boolean" == typeof g && ((j = g), (g = arguments[h] || {}), h++),
            "object" == typeof g || m.isFunction(g) || (g = {}),
            h === i && ((g = this), h--);
          i > h;
          h++
        ) {
          if (null != (e = arguments[h])) {
            for (d in e) {
              (a = g[d]),
                (c = e[d]),
                g !== c &&
                  (j && c && (m.isPlainObject(c) || (b = m.isArray(c)))
                    ? (b
                        ? ((b = !1), (f = a && m.isArray(a) ? a : []))
                        : (f = a && m.isPlainObject(a) ? a : {}),
                      (g[d] = m.extend(j, f, c)))
                    : void 0 !== c && (g[d] = c));
            }
          }
        }
        return g;
      }),
    m.extend({
      expando: "jQuery" + (l + Math.random()).replace(/\D/g, ""),
      isReady: !0,
      error: function (a) {
        throw new Error(a);
      },
      noop: function () {},
      isFunction: function (a) {
        return "function" === m.type(a);
      },
      isArray:
        Array.isArray ||
        function (a) {
          return "array" === m.type(a);
        },
      isWindow: function (a) {
        return null != a && a == a.window;
      },
      isNumeric: function (a) {
        return !m.isArray(a) && a - parseFloat(a) + 1 >= 0;
      },
      isEmptyObject: function (a) {
        var b;
        for (b in a) {
          return !1;
        }
        return !0;
      },
      isPlainObject: function (a) {
        var b;
        if (!a || "object" !== m.type(a) || a.nodeType || m.isWindow(a)) {
          return !1;
        }
        try {
          if (
            a.constructor &&
            !j.call(a, "constructor") &&
            !j.call(a.constructor.prototype, "isPrototypeOf")
          ) {
            return !1;
          }
        } catch (c) {
          return !1;
        }
        if (k.ownLast) {
          for (b in a) {
            return j.call(a, b);
          }
        }
        for (b in a) {
        }
        return void 0 === b || j.call(a, b);
      },
      type: function (a) {
        return null == a
          ? a + ""
          : "object" == typeof a || "function" == typeof a
          ? h[i.call(a)] || "object"
          : typeof a;
      },
      globalEval: function (b) {
        b &&
          m.trim(b) &&
          (
            a.execScript ||
            function (b) {
              a.eval.call(a, b);
            }
          )(b);
      },
      camelCase: function (a) {
        return a.replace(o, "ms-").replace(p, q);
      },
      nodeName: function (a, b) {
        return a.nodeName && a.nodeName.toLowerCase() === b.toLowerCase();
      },
      each: function (a, b, c) {
        var d,
          e = 0,
          f = a.length,
          g = r(a);
        if (c) {
          if (g) {
            for (; f > e; e++) {
              if (((d = b.apply(a[e], c)), d === !1)) {
                break;
              }
            }
          } else {
            for (e in a) {
              if (((d = b.apply(a[e], c)), d === !1)) {
                break;
              }
            }
          }
        } else {
          if (g) {
            for (; f > e; e++) {
              if (((d = b.call(a[e], e, a[e])), d === !1)) {
                break;
              }
            }
          } else {
            for (e in a) {
              if (((d = b.call(a[e], e, a[e])), d === !1)) {
                break;
              }
            }
          }
        }
        return a;
      },
      trim: function (a) {
        return null == a ? "" : (a + "").replace(n, "");
      },
      makeArray: function (a, b) {
        var c = b || [];
        return (
          null != a &&
            (r(Object(a))
              ? m.merge(c, "string" == typeof a ? [a] : a)
              : f.call(c, a)),
          c
        );
      },
      inArray: function (a, b, c) {
        var d;
        if (b) {
          if (g) {
            return g.call(b, a, c);
          }
          for (
            d = b.length, c = c ? (0 > c ? Math.max(0, d + c) : c) : 0;
            d > c;
            c++
          ) {
            if (c in b && b[c] === a) {
              return c;
            }
          }
        }
        return -1;
      },
      merge: function (a, b) {
        var c = +b.length,
          d = 0,
          e = a.length;
        while (c > d) {
          a[e++] = b[d++];
        }
        if (c !== c) {
          while (void 0 !== b[d]) {
            a[e++] = b[d++];
          }
        }
        return (a.length = e), a;
      },
      grep: function (a, b, c) {
        for (var d, e = [], f = 0, g = a.length, h = !c; g > f; f++) {
          (d = !b(a[f], f)), d !== h && e.push(a[f]);
        }
        return e;
      },
      map: function (a, b, c) {
        var d,
          f = 0,
          g = a.length,
          h = r(a),
          i = [];
        if (h) {
          for (; g > f; f++) {
            (d = b(a[f], f, c)), null != d && i.push(d);
          }
        } else {
          for (f in a) {
            (d = b(a[f], f, c)), null != d && i.push(d);
          }
        }
        return e.apply([], i);
      },
      guid: 1,
      proxy: function (a, b) {
        var c, e, f;
        return (
          "string" == typeof b && ((f = a[b]), (b = a), (a = f)),
          m.isFunction(a)
            ? ((c = d.call(arguments, 2)),
              (e = function () {
                return a.apply(b || this, c.concat(d.call(arguments)));
              }),
              (e.guid = a.guid = a.guid || m.guid++),
              e)
            : void 0
        );
      },
      now: function () {
        return +new Date();
      },
      support: k,
    }),
    m.each(
      "Boolean Number String Function Array Date RegExp Object Error".split(
        " "
      ),
      function (a, b) {
        h["[object " + b + "]"] = b.toLowerCase();
      }
    );
  function r(a) {
    var b = "length" in a && a.length,
      c = m.type(a);
    return "function" === c || m.isWindow(a)
      ? !1
      : 1 === a.nodeType && b
      ? !0
      : "array" === c ||
        0 === b ||
        ("number" == typeof b && b > 0 && b - 1 in a);
  }
  var s = (function (a) {
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
      n,
      o,
      p,
      q,
      r,
      s,
      t,
      u = "sizzle" + 1 * new Date(),
      v = a.document,
      w = 0,
      x = 0,
      y = ha(),
      z = ha(),
      A = ha(),
      B = function (a, b) {
        return a === b && (l = !0), 0;
      },
      C = 1 << 31,
      D = {}.hasOwnProperty,
      E = [],
      F = E.pop,
      G = E.push,
      H = E.push,
      I = E.slice,
      J = function (a, b) {
        for (var c = 0, d = a.length; d > c; c++) {
          if (a[c] === b) {
            return c;
          }
        }
        return -1;
      },
      K =
        "checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped",
      L = "[\\x20\\t\\r\\n\\f]",
      M = "(?:\\\\.|[\\w-]|[^\\x00-\\xa0])+",
      N = M.replace("w", "w#"),
      O =
        "\\[" +
        L +
        "*(" +
        M +
        ")(?:" +
        L +
        "*([*^$|!~]?=)" +
        L +
        "*(?:'((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\"|(" +
        N +
        "))|)" +
        L +
        "*\\]",
      P =
        ":(" +
        M +
        ")(?:\\((('((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\")|((?:\\\\.|[^\\\\()[\\]]|" +
        O +
        ")*)|.*)\\)|)",
      Q = new RegExp(L + "+", "g"),
      R = new RegExp("^" + L + "+|((?:^|[^\\\\])(?:\\\\.)*)" + L + "+$", "g"),
      S = new RegExp("^" + L + "*," + L + "*"),
      T = new RegExp("^" + L + "*([>+~]|" + L + ")" + L + "*"),
      U = new RegExp("=" + L + "*([^\\]'\"]*?)" + L + "*\\]", "g"),
      V = new RegExp(P),
      W = new RegExp("^" + N + "$"),
      X = {
        ID: new RegExp("^#(" + M + ")"),
        CLASS: new RegExp("^\\.(" + M + ")"),
        TAG: new RegExp("^(" + M.replace("w", "w*") + ")"),
        ATTR: new RegExp("^" + O),
        PSEUDO: new RegExp("^" + P),
        CHILD: new RegExp(
          "^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(" +
            L +
            "*(even|odd|(([+-]|)(\\d*)n|)" +
            L +
            "*(?:([+-]|)" +
            L +
            "*(\\d+)|))" +
            L +
            "*\\)|)",
          "i"
        ),
        bool: new RegExp("^(?:" + K + ")$", "i"),
        needsContext: new RegExp(
          "^" +
            L +
            "*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(" +
            L +
            "*((?:-\\d)?\\d*)" +
            L +
            "*\\)|)(?=[^-]|$)",
          "i"
        ),
      },
      Y = /^(?:input|select|textarea|button)$/i,
      Z = /^h\d$/i,
      $ = /^[^{]+\{\s*\[native \w/,
      _ = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,
      aa = /[+~]/,
      ba = /'|\\/g,
      ca = new RegExp("\\\\([\\da-f]{1,6}" + L + "?|(" + L + ")|.)", "ig"),
      da = function (a, b, c) {
        var d = "0x" + b - 65536;
        return d !== d || c
          ? b
          : 0 > d
          ? String.fromCharCode(d + 65536)
          : String.fromCharCode((d >> 10) | 55296, (1023 & d) | 56320);
      },
      ea = function () {
        m();
      };
    try {
      H.apply((E = I.call(v.childNodes)), v.childNodes),
        E[v.childNodes.length].nodeType;
    } catch (fa) {
      H = {
        apply: E.length
          ? function (a, b) {
              G.apply(a, I.call(b));
            }
          : function (a, b) {
              var c = a.length,
                d = 0;
              while ((a[c++] = b[d++])) {}
              a.length = c - 1;
            },
      };
    }
    function ga(a, b, d, e) {
      var f, h, j, k, l, o, r, s, w, x;
      if (
        ((b ? b.ownerDocument || b : v) !== n && m(b),
        (b = b || n),
        (d = d || []),
        (k = b.nodeType),
        "string" != typeof a || !a || (1 !== k && 9 !== k && 11 !== k))
      ) {
        return d;
      }
      if (!e && p) {
        if (11 !== k && (f = _.exec(a))) {
          if ((j = f[1])) {
            if (9 === k) {
              if (((h = b.getElementById(j)), !h || !h.parentNode)) {
                return d;
              }
              if (h.id === j) {
                return d.push(h), d;
              }
            } else {
              if (
                b.ownerDocument &&
                (h = b.ownerDocument.getElementById(j)) &&
                t(b, h) &&
                h.id === j
              ) {
                return d.push(h), d;
              }
            }
          } else {
            if (f[2]) {
              return H.apply(d, b.getElementsByTagName(a)), d;
            }
            if ((j = f[3]) && c.getElementsByClassName) {
              return H.apply(d, b.getElementsByClassName(j)), d;
            }
          }
        }
        if (c.qsa && (!q || !q.test(a))) {
          if (
            ((s = r = u),
            (w = b),
            (x = 1 !== k && a),
            1 === k && "object" !== b.nodeName.toLowerCase())
          ) {
            (o = g(a)),
              (r = b.getAttribute("id"))
                ? (s = r.replace(ba, "\\$&"))
                : b.setAttribute("id", s),
              (s = "[id='" + s + "'] "),
              (l = o.length);
            while (l--) {
              o[l] = s + ra(o[l]);
            }
            (w = (aa.test(a) && pa(b.parentNode)) || b), (x = o.join(","));
          }
          if (x) {
            try {
              return H.apply(d, w.querySelectorAll(x)), d;
            } catch (y) {
            } finally {
              r || b.removeAttribute("id");
            }
          }
        }
      }
      return i(a.replace(R, "$1"), b, d, e);
    }
    function ha() {
      var a = [];
      function b(c, e) {
        return (
          a.push(c + " ") > d.cacheLength && delete b[a.shift()],
          (b[c + " "] = e)
        );
      }
      return b;
    }
    function ia(a) {
      return (a[u] = !0), a;
    }
    function ja(a) {
      var b = n.createElement("div");
      try {
        return !!a(b);
      } catch (c) {
        return !1;
      } finally {
        b.parentNode && b.parentNode.removeChild(b), (b = null);
      }
    }
    function ka(a, b) {
      var c = a.split("|"),
        e = a.length;
      while (e--) {
        d.attrHandle[c[e]] = b;
      }
    }
    function la(a, b) {
      var c = b && a,
        d =
          c &&
          1 === a.nodeType &&
          1 === b.nodeType &&
          (~b.sourceIndex || C) - (~a.sourceIndex || C);
      if (d) {
        return d;
      }
      if (c) {
        while ((c = c.nextSibling)) {
          if (c === b) {
            return -1;
          }
        }
      }
      return a ? 1 : -1;
    }
    function ma(a) {
      return function (b) {
        var c = b.nodeName.toLowerCase();
        return "input" === c && b.type === a;
      };
    }
    function na(a) {
      return function (b) {
        var c = b.nodeName.toLowerCase();
        return ("input" === c || "button" === c) && b.type === a;
      };
    }
    function oa(a) {
      return ia(function (b) {
        return (
          (b = +b),
          ia(function (c, d) {
            var e,
              f = a([], c.length, b),
              g = f.length;
            while (g--) {
              c[(e = f[g])] && (c[e] = !(d[e] = c[e]));
            }
          })
        );
      });
    }
    function pa(a) {
      return a && "undefined" != typeof a.getElementsByTagName && a;
    }
    (c = ga.support = {}),
      (f = ga.isXML =
        function (a) {
          var b = a && (a.ownerDocument || a).documentElement;
          return b ? "HTML" !== b.nodeName : !1;
        }),
      (m = ga.setDocument =
        function (a) {
          var b,
            e,
            g = a ? a.ownerDocument || a : v;
          return g !== n && 9 === g.nodeType && g.documentElement
            ? ((n = g),
              (o = g.documentElement),
              (e = g.defaultView),
              e &&
                e !== e.top &&
                (e.addEventListener
                  ? e.addEventListener("unload", ea, !1)
                  : e.attachEvent && e.attachEvent("onunload", ea)),
              (p = !f(g)),
              (c.attributes = ja(function (a) {
                return (a.className = "i"), !a.getAttribute("className");
              })),
              (c.getElementsByTagName = ja(function (a) {
                return (
                  a.appendChild(g.createComment("")),
                  !a.getElementsByTagName("*").length
                );
              })),
              (c.getElementsByClassName = $.test(g.getElementsByClassName)),
              (c.getById = ja(function (a) {
                return (
                  (o.appendChild(a).id = u),
                  !g.getElementsByName || !g.getElementsByName(u).length
                );
              })),
              c.getById
                ? ((d.find.ID = function (a, b) {
                    if ("undefined" != typeof b.getElementById && p) {
                      var c = b.getElementById(a);
                      return c && c.parentNode ? [c] : [];
                    }
                  }),
                  (d.filter.ID = function (a) {
                    var b = a.replace(ca, da);
                    return function (a) {
                      return a.getAttribute("id") === b;
                    };
                  }))
                : (delete d.find.ID,
                  (d.filter.ID = function (a) {
                    var b = a.replace(ca, da);
                    return function (a) {
                      var c =
                        "undefined" != typeof a.getAttributeNode &&
                        a.getAttributeNode("id");
                      return c && c.value === b;
                    };
                  })),
              (d.find.TAG = c.getElementsByTagName
                ? function (a, b) {
                    return "undefined" != typeof b.getElementsByTagName
                      ? b.getElementsByTagName(a)
                      : c.qsa
                      ? b.querySelectorAll(a)
                      : void 0;
                  }
                : function (a, b) {
                    var c,
                      d = [],
                      e = 0,
                      f = b.getElementsByTagName(a);
                    if ("*" === a) {
                      while ((c = f[e++])) {
                        1 === c.nodeType && d.push(c);
                      }
                      return d;
                    }
                    return f;
                  }),
              (d.find.CLASS =
                c.getElementsByClassName &&
                function (a, b) {
                  return p ? b.getElementsByClassName(a) : void 0;
                }),
              (r = []),
              (q = []),
              (c.qsa = $.test(g.querySelectorAll)) &&
                (ja(function (a) {
                  (o.appendChild(a).innerHTML =
                    "<a id='" +
                    u +
                    "'></a><select id='" +
                    u +
                    "-\f]' msallowcapture=''><option selected=''></option></select>"),
                    a.querySelectorAll("[msallowcapture^='']").length &&
                      q.push("[*^$]=" + L + "*(?:''|\"\")"),
                    a.querySelectorAll("[selected]").length ||
                      q.push("\\[" + L + "*(?:value|" + K + ")"),
                    a.querySelectorAll("[id~=" + u + "-]").length ||
                      q.push("~="),
                    a.querySelectorAll(":checked").length || q.push(":checked"),
                    a.querySelectorAll("a#" + u + "+*").length ||
                      q.push(".#.+[+~]");
                }),
                ja(function (a) {
                  var b = g.createElement("input");
                  b.setAttribute("type", "hidden"),
                    a.appendChild(b).setAttribute("name", "D"),
                    a.querySelectorAll("[name=d]").length &&
                      q.push("name" + L + "*[*^$|!~]?="),
                    a.querySelectorAll(":enabled").length ||
                      q.push(":enabled", ":disabled"),
                    a.querySelectorAll("*,:x"),
                    q.push(",.*:");
                })),
              (c.matchesSelector = $.test(
                (s =
                  o.matches ||
                  o.webkitMatchesSelector ||
                  o.mozMatchesSelector ||
                  o.oMatchesSelector ||
                  o.msMatchesSelector)
              )) &&
                ja(function (a) {
                  (c.disconnectedMatch = s.call(a, "div")),
                    s.call(a, "[s!='']:x"),
                    r.push("!=", P);
                }),
              (q = q.length && new RegExp(q.join("|"))),
              (r = r.length && new RegExp(r.join("|"))),
              (b = $.test(o.compareDocumentPosition)),
              (t =
                b || $.test(o.contains)
                  ? function (a, b) {
                      var c = 9 === a.nodeType ? a.documentElement : a,
                        d = b && b.parentNode;
                      return (
                        a === d ||
                        !(
                          !d ||
                          1 !== d.nodeType ||
                          !(c.contains
                            ? c.contains(d)
                            : a.compareDocumentPosition &&
                              16 & a.compareDocumentPosition(d))
                        )
                      );
                    }
                  : function (a, b) {
                      if (b) {
                        while ((b = b.parentNode)) {
                          if (b === a) {
                            return !0;
                          }
                        }
                      }
                      return !1;
                    }),
              (B = b
                ? function (a, b) {
                    if (a === b) {
                      return (l = !0), 0;
                    }
                    var d =
                      !a.compareDocumentPosition - !b.compareDocumentPosition;
                    return d
                      ? d
                      : ((d =
                          (a.ownerDocument || a) === (b.ownerDocument || b)
                            ? a.compareDocumentPosition(b)
                            : 1),
                        1 & d ||
                        (!c.sortDetached && b.compareDocumentPosition(a) === d)
                          ? a === g || (a.ownerDocument === v && t(v, a))
                            ? -1
                            : b === g || (b.ownerDocument === v && t(v, b))
                            ? 1
                            : k
                            ? J(k, a) - J(k, b)
                            : 0
                          : 4 & d
                          ? -1
                          : 1);
                  }
                : function (a, b) {
                    if (a === b) {
                      return (l = !0), 0;
                    }
                    var c,
                      d = 0,
                      e = a.parentNode,
                      f = b.parentNode,
                      h = [a],
                      i = [b];
                    if (!e || !f) {
                      return a === g
                        ? -1
                        : b === g
                        ? 1
                        : e
                        ? -1
                        : f
                        ? 1
                        : k
                        ? J(k, a) - J(k, b)
                        : 0;
                    }
                    if (e === f) {
                      return la(a, b);
                    }
                    c = a;
                    while ((c = c.parentNode)) {
                      h.unshift(c);
                    }
                    c = b;
                    while ((c = c.parentNode)) {
                      i.unshift(c);
                    }
                    while (h[d] === i[d]) {
                      d++;
                    }
                    return d
                      ? la(h[d], i[d])
                      : h[d] === v
                      ? -1
                      : i[d] === v
                      ? 1
                      : 0;
                  }),
              g)
            : n;
        }),
      (ga.matches = function (a, b) {
        return ga(a, null, null, b);
      }),
      (ga.matchesSelector = function (a, b) {
        if (
          ((a.ownerDocument || a) !== n && m(a),
          (b = b.replace(U, "='$1']")),
          !(!c.matchesSelector || !p || (r && r.test(b)) || (q && q.test(b))))
        ) {
          try {
            var d = s.call(a, b);
            if (
              d ||
              c.disconnectedMatch ||
              (a.document && 11 !== a.document.nodeType)
            ) {
              return d;
            }
          } catch (e) {}
        }
        return ga(b, n, null, [a]).length > 0;
      }),
      (ga.contains = function (a, b) {
        return (a.ownerDocument || a) !== n && m(a), t(a, b);
      }),
      (ga.attr = function (a, b) {
        (a.ownerDocument || a) !== n && m(a);
        var e = d.attrHandle[b.toLowerCase()],
          f = e && D.call(d.attrHandle, b.toLowerCase()) ? e(a, b, !p) : void 0;
        return void 0 !== f
          ? f
          : c.attributes || !p
          ? a.getAttribute(b)
          : (f = a.getAttributeNode(b)) && f.specified
          ? f.value
          : null;
      }),
      (ga.error = function (a) {
        throw new Error("Syntax error, unrecognized expression: " + a);
      }),
      (ga.uniqueSort = function (a) {
        var b,
          d = [],
          e = 0,
          f = 0;
        if (
          ((l = !c.detectDuplicates),
          (k = !c.sortStable && a.slice(0)),
          a.sort(B),
          l)
        ) {
          while ((b = a[f++])) {
            b === a[f] && (e = d.push(f));
          }
          while (e--) {
            a.splice(d[e], 1);
          }
        }
        return (k = null), a;
      }),
      (e = ga.getText =
        function (a) {
          var b,
            c = "",
            d = 0,
            f = a.nodeType;
          if (f) {
            if (1 === f || 9 === f || 11 === f) {
              if ("string" == typeof a.textContent) {
                return a.textContent;
              }
              for (a = a.firstChild; a; a = a.nextSibling) {
                c += e(a);
              }
            } else {
              if (3 === f || 4 === f) {
                return a.nodeValue;
              }
            }
          } else {
            while ((b = a[d++])) {
              c += e(b);
            }
          }
          return c;
        }),
      (d = ga.selectors =
        {
          cacheLength: 50,
          createPseudo: ia,
          match: X,
          attrHandle: {},
          find: {},
          relative: {
            ">": { dir: "parentNode", first: !0 },
            " ": { dir: "parentNode" },
            "+": { dir: "previousSibling", first: !0 },
            "~": { dir: "previousSibling" },
          },
          preFilter: {
            ATTR: function (a) {
              return (
                (a[1] = a[1].replace(ca, da)),
                (a[3] = (a[3] || a[4] || a[5] || "").replace(ca, da)),
                "~=" === a[2] && (a[3] = " " + a[3] + " "),
                a.slice(0, 4)
              );
            },
            CHILD: function (a) {
              return (
                (a[1] = a[1].toLowerCase()),
                "nth" === a[1].slice(0, 3)
                  ? (a[3] || ga.error(a[0]),
                    (a[4] = +(a[4]
                      ? a[5] + (a[6] || 1)
                      : 2 * ("even" === a[3] || "odd" === a[3]))),
                    (a[5] = +(a[7] + a[8] || "odd" === a[3])))
                  : a[3] && ga.error(a[0]),
                a
              );
            },
            PSEUDO: function (a) {
              var b,
                c = !a[6] && a[2];
              return X.CHILD.test(a[0])
                ? null
                : (a[3]
                    ? (a[2] = a[4] || a[5] || "")
                    : c &&
                      V.test(c) &&
                      (b = g(c, !0)) &&
                      (b = c.indexOf(")", c.length - b) - c.length) &&
                      ((a[0] = a[0].slice(0, b)), (a[2] = c.slice(0, b))),
                  a.slice(0, 3));
            },
          },
          filter: {
            TAG: function (a) {
              var b = a.replace(ca, da).toLowerCase();
              return "*" === a
                ? function () {
                    return !0;
                  }
                : function (a) {
                    return a.nodeName && a.nodeName.toLowerCase() === b;
                  };
            },
            CLASS: function (a) {
              var b = y[a + " "];
              return (
                b ||
                ((b = new RegExp("(^|" + L + ")" + a + "(" + L + "|$)")) &&
                  y(a, function (a) {
                    return b.test(
                      ("string" == typeof a.className && a.className) ||
                        ("undefined" != typeof a.getAttribute &&
                          a.getAttribute("class")) ||
                        ""
                    );
                  }))
              );
            },
            ATTR: function (a, b, c) {
              return function (d) {
                var e = ga.attr(d, a);
                return null == e
                  ? "!=" === b
                  : b
                  ? ((e += ""),
                    "=" === b
                      ? e === c
                      : "!=" === b
                      ? e !== c
                      : "^=" === b
                      ? c && 0 === e.indexOf(c)
                      : "*=" === b
                      ? c && e.indexOf(c) > -1
                      : "$=" === b
                      ? c && e.slice(-c.length) === c
                      : "~=" === b
                      ? (" " + e.replace(Q, " ") + " ").indexOf(c) > -1
                      : "|=" === b
                      ? e === c || e.slice(0, c.length + 1) === c + "-"
                      : !1)
                  : !0;
              };
            },
            CHILD: function (a, b, c, d, e) {
              var f = "nth" !== a.slice(0, 3),
                g = "last" !== a.slice(-4),
                h = "of-type" === b;
              return 1 === d && 0 === e
                ? function (a) {
                    return !!a.parentNode;
                  }
                : function (b, c, i) {
                    var j,
                      k,
                      l,
                      m,
                      n,
                      o,
                      p = f !== g ? "nextSibling" : "previousSibling",
                      q = b.parentNode,
                      r = h && b.nodeName.toLowerCase(),
                      s = !i && !h;
                    if (q) {
                      if (f) {
                        while (p) {
                          l = b;
                          while ((l = l[p])) {
                            if (
                              h
                                ? l.nodeName.toLowerCase() === r
                                : 1 === l.nodeType
                            ) {
                              return !1;
                            }
                          }
                          o = p = "only" === a && !o && "nextSibling";
                        }
                        return !0;
                      }
                      if (((o = [g ? q.firstChild : q.lastChild]), g && s)) {
                        (k = q[u] || (q[u] = {})),
                          (j = k[a] || []),
                          (n = j[0] === w && j[1]),
                          (m = j[0] === w && j[2]),
                          (l = n && q.childNodes[n]);
                        while (
                          (l = (++n && l && l[p]) || (m = n = 0) || o.pop())
                        ) {
                          if (1 === l.nodeType && ++m && l === b) {
                            k[a] = [w, n, m];
                            break;
                          }
                        }
                      } else {
                        if (s && (j = (b[u] || (b[u] = {}))[a]) && j[0] === w) {
                          m = j[1];
                        } else {
                          while (
                            (l = (++n && l && l[p]) || (m = n = 0) || o.pop())
                          ) {
                            if (
                              (h
                                ? l.nodeName.toLowerCase() === r
                                : 1 === l.nodeType) &&
                              ++m &&
                              (s && ((l[u] || (l[u] = {}))[a] = [w, m]),
                              l === b)
                            ) {
                              break;
                            }
                          }
                        }
                      }
                      return (m -= e), m === d || (m % d === 0 && m / d >= 0);
                    }
                  };
            },
            PSEUDO: function (a, b) {
              var c,
                e =
                  d.pseudos[a] ||
                  d.setFilters[a.toLowerCase()] ||
                  ga.error("unsupported pseudo: " + a);
              return e[u]
                ? e(b)
                : e.length > 1
                ? ((c = [a, a, "", b]),
                  d.setFilters.hasOwnProperty(a.toLowerCase())
                    ? ia(function (a, c) {
                        var d,
                          f = e(a, b),
                          g = f.length;
                        while (g--) {
                          (d = J(a, f[g])), (a[d] = !(c[d] = f[g]));
                        }
                      })
                    : function (a) {
                        return e(a, 0, c);
                      })
                : e;
            },
          },
          pseudos: {
            not: ia(function (a) {
              var b = [],
                c = [],
                d = h(a.replace(R, "$1"));
              return d[u]
                ? ia(function (a, b, c, e) {
                    var f,
                      g = d(a, null, e, []),
                      h = a.length;
                    while (h--) {
                      (f = g[h]) && (a[h] = !(b[h] = f));
                    }
                  })
                : function (a, e, f) {
                    return (
                      (b[0] = a), d(b, null, f, c), (b[0] = null), !c.pop()
                    );
                  };
            }),
            has: ia(function (a) {
              return function (b) {
                return ga(a, b).length > 0;
              };
            }),
            contains: ia(function (a) {
              return (
                (a = a.replace(ca, da)),
                function (b) {
                  return (b.textContent || b.innerText || e(b)).indexOf(a) > -1;
                }
              );
            }),
            lang: ia(function (a) {
              return (
                W.test(a || "") || ga.error("unsupported lang: " + a),
                (a = a.replace(ca, da).toLowerCase()),
                function (b) {
                  var c;
                  do {
                    if (
                      (c = p
                        ? b.lang
                        : b.getAttribute("xml:lang") || b.getAttribute("lang"))
                    ) {
                      return (
                        (c = c.toLowerCase()),
                        c === a || 0 === c.indexOf(a + "-")
                      );
                    }
                  } while ((b = b.parentNode) && 1 === b.nodeType);
                  return !1;
                }
              );
            }),
            target: function (b) {
              var c = a.location && a.location.hash;
              return c && c.slice(1) === b.id;
            },
            root: function (a) {
              return a === o;
            },
            focus: function (a) {
              return (
                a === n.activeElement &&
                (!n.hasFocus || n.hasFocus()) &&
                !!(a.type || a.href || ~a.tabIndex)
              );
            },
            enabled: function (a) {
              return a.disabled === !1;
            },
            disabled: function (a) {
              return a.disabled === !0;
            },
            checked: function (a) {
              var b = a.nodeName.toLowerCase();
              return (
                ("input" === b && !!a.checked) ||
                ("option" === b && !!a.selected)
              );
            },
            selected: function (a) {
              return (
                a.parentNode && a.parentNode.selectedIndex, a.selected === !0
              );
            },
            empty: function (a) {
              for (a = a.firstChild; a; a = a.nextSibling) {
                if (a.nodeType < 6) {
                  return !1;
                }
              }
              return !0;
            },
            parent: function (a) {
              return !d.pseudos.empty(a);
            },
            header: function (a) {
              return Z.test(a.nodeName);
            },
            input: function (a) {
              return Y.test(a.nodeName);
            },
            button: function (a) {
              var b = a.nodeName.toLowerCase();
              return ("input" === b && "button" === a.type) || "button" === b;
            },
            text: function (a) {
              var b;
              return (
                "input" === a.nodeName.toLowerCase() &&
                "text" === a.type &&
                (null == (b = a.getAttribute("type")) ||
                  "text" === b.toLowerCase())
              );
            },
            first: oa(function () {
              return [0];
            }),
            last: oa(function (a, b) {
              return [b - 1];
            }),
            eq: oa(function (a, b, c) {
              return [0 > c ? c + b : c];
            }),
            even: oa(function (a, b) {
              for (var c = 0; b > c; c += 2) {
                a.push(c);
              }
              return a;
            }),
            odd: oa(function (a, b) {
              for (var c = 1; b > c; c += 2) {
                a.push(c);
              }
              return a;
            }),
            lt: oa(function (a, b, c) {
              for (var d = 0 > c ? c + b : c; --d >= 0; ) {
                a.push(d);
              }
              return a;
            }),
            gt: oa(function (a, b, c) {
              for (var d = 0 > c ? c + b : c; ++d < b; ) {
                a.push(d);
              }
              return a;
            }),
          },
        }),
      (d.pseudos.nth = d.pseudos.eq);
    for (b in { radio: !0, checkbox: !0, file: !0, password: !0, image: !0 }) {
      d.pseudos[b] = ma(b);
    }
    for (b in { submit: !0, reset: !0 }) {
      d.pseudos[b] = na(b);
    }
    function qa() {}
    (qa.prototype = d.filters = d.pseudos),
      (d.setFilters = new qa()),
      (g = ga.tokenize =
        function (a, b) {
          var c,
            e,
            f,
            g,
            h,
            i,
            j,
            k = z[a + " "];
          if (k) {
            return b ? 0 : k.slice(0);
          }
          (h = a), (i = []), (j = d.preFilter);
          while (h) {
            (!c || (e = S.exec(h))) &&
              (e && (h = h.slice(e[0].length) || h), i.push((f = []))),
              (c = !1),
              (e = T.exec(h)) &&
                ((c = e.shift()),
                f.push({ value: c, type: e[0].replace(R, " ") }),
                (h = h.slice(c.length)));
            for (g in d.filter) {
              !(e = X[g].exec(h)) ||
                (j[g] && !(e = j[g](e))) ||
                ((c = e.shift()),
                f.push({ value: c, type: g, matches: e }),
                (h = h.slice(c.length)));
            }
            if (!c) {
              break;
            }
          }
          return b ? h.length : h ? ga.error(a) : z(a, i).slice(0);
        });
    function ra(a) {
      for (var b = 0, c = a.length, d = ""; c > b; b++) {
        d += a[b].value;
      }
      return d;
    }
    function sa(a, b, c) {
      var d = b.dir,
        e = c && "parentNode" === d,
        f = x++;
      return b.first
        ? function (b, c, f) {
            while ((b = b[d])) {
              if (1 === b.nodeType || e) {
                return a(b, c, f);
              }
            }
          }
        : function (b, c, g) {
            var h,
              i,
              j = [w, f];
            if (g) {
              while ((b = b[d])) {
                if ((1 === b.nodeType || e) && a(b, c, g)) {
                  return !0;
                }
              }
            } else {
              while ((b = b[d])) {
                if (1 === b.nodeType || e) {
                  if (
                    ((i = b[u] || (b[u] = {})),
                    (h = i[d]) && h[0] === w && h[1] === f)
                  ) {
                    return (j[2] = h[2]);
                  }
                  if (((i[d] = j), (j[2] = a(b, c, g)))) {
                    return !0;
                  }
                }
              }
            }
          };
    }
    function ta(a) {
      return a.length > 1
        ? function (b, c, d) {
            var e = a.length;
            while (e--) {
              if (!a[e](b, c, d)) {
                return !1;
              }
            }
            return !0;
          }
        : a[0];
    }
    function ua(a, b, c) {
      for (var d = 0, e = b.length; e > d; d++) {
        ga(a, b[d], c);
      }
      return c;
    }
    function va(a, b, c, d, e) {
      for (var f, g = [], h = 0, i = a.length, j = null != b; i > h; h++) {
        (f = a[h]) && (!c || c(f, d, e)) && (g.push(f), j && b.push(h));
      }
      return g;
    }
    function wa(a, b, c, d, e, f) {
      return (
        d && !d[u] && (d = wa(d)),
        e && !e[u] && (e = wa(e, f)),
        ia(function (f, g, h, i) {
          var j,
            k,
            l,
            m = [],
            n = [],
            o = g.length,
            p = f || ua(b || "*", h.nodeType ? [h] : h, []),
            q = !a || (!f && b) ? p : va(p, m, a, h, i),
            r = c ? (e || (f ? a : o || d) ? [] : g) : q;
          if ((c && c(q, r, h, i), d)) {
            (j = va(r, n)), d(j, [], h, i), (k = j.length);
            while (k--) {
              (l = j[k]) && (r[n[k]] = !(q[n[k]] = l));
            }
          }
          if (f) {
            if (e || a) {
              if (e) {
                (j = []), (k = r.length);
                while (k--) {
                  (l = r[k]) && j.push((q[k] = l));
                }
                e(null, (r = []), j, i);
              }
              k = r.length;
              while (k--) {
                (l = r[k]) &&
                  (j = e ? J(f, l) : m[k]) > -1 &&
                  (f[j] = !(g[j] = l));
              }
            }
          } else {
            (r = va(r === g ? r.splice(o, r.length) : r)),
              e ? e(null, g, r, i) : H.apply(g, r);
          }
        })
      );
    }
    function xa(a) {
      for (
        var b,
          c,
          e,
          f = a.length,
          g = d.relative[a[0].type],
          h = g || d.relative[" "],
          i = g ? 1 : 0,
          k = sa(
            function (a) {
              return a === b;
            },
            h,
            !0
          ),
          l = sa(
            function (a) {
              return J(b, a) > -1;
            },
            h,
            !0
          ),
          m = [
            function (a, c, d) {
              var e =
                (!g && (d || c !== j)) ||
                ((b = c).nodeType ? k(a, c, d) : l(a, c, d));
              return (b = null), e;
            },
          ];
        f > i;
        i++
      ) {
        if ((c = d.relative[a[i].type])) {
          m = [sa(ta(m), c)];
        } else {
          if (((c = d.filter[a[i].type].apply(null, a[i].matches)), c[u])) {
            for (e = ++i; f > e; e++) {
              if (d.relative[a[e].type]) {
                break;
              }
            }
            return wa(
              i > 1 && ta(m),
              i > 1 &&
                ra(
                  a
                    .slice(0, i - 1)
                    .concat({ value: " " === a[i - 2].type ? "*" : "" })
                ).replace(R, "$1"),
              c,
              e > i && xa(a.slice(i, e)),
              f > e && xa((a = a.slice(e))),
              f > e && ra(a)
            );
          }
          m.push(c);
        }
      }
      return ta(m);
    }
    function ya(a, b) {
      var c = b.length > 0,
        e = a.length > 0,
        f = function (f, g, h, i, k) {
          var l,
            m,
            o,
            p = 0,
            q = "0",
            r = f && [],
            s = [],
            t = j,
            u = f || (e && d.find.TAG("*", k)),
            v = (w += null == t ? 1 : Math.random() || 0.1),
            x = u.length;
          for (k && (j = g !== n && g); q !== x && null != (l = u[q]); q++) {
            if (e && l) {
              m = 0;
              while ((o = a[m++])) {
                if (o(l, g, h)) {
                  i.push(l);
                  break;
                }
              }
              k && (w = v);
            }
            c && ((l = !o && l) && p--, f && r.push(l));
          }
          if (((p += q), c && q !== p)) {
            m = 0;
            while ((o = b[m++])) {
              o(r, s, g, h);
            }
            if (f) {
              if (p > 0) {
                while (q--) {
                  r[q] || s[q] || (s[q] = F.call(i));
                }
              }
              s = va(s);
            }
            H.apply(i, s),
              k && !f && s.length > 0 && p + b.length > 1 && ga.uniqueSort(i);
          }
          return k && ((w = v), (j = t)), r;
        };
      return c ? ia(f) : f;
    }
    return (
      (h = ga.compile =
        function (a, b) {
          var c,
            d = [],
            e = [],
            f = A[a + " "];
          if (!f) {
            b || (b = g(a)), (c = b.length);
            while (c--) {
              (f = xa(b[c])), f[u] ? d.push(f) : e.push(f);
            }
            (f = A(a, ya(e, d))), (f.selector = a);
          }
          return f;
        }),
      (i = ga.select =
        function (a, b, e, f) {
          var i,
            j,
            k,
            l,
            m,
            n = "function" == typeof a && a,
            o = !f && g((a = n.selector || a));
          if (((e = e || []), 1 === o.length)) {
            if (
              ((j = o[0] = o[0].slice(0)),
              j.length > 2 &&
                "ID" === (k = j[0]).type &&
                c.getById &&
                9 === b.nodeType &&
                p &&
                d.relative[j[1].type])
            ) {
              if (
                ((b = (d.find.ID(k.matches[0].replace(ca, da), b) || [])[0]),
                !b)
              ) {
                return e;
              }
              n && (b = b.parentNode), (a = a.slice(j.shift().value.length));
            }
            i = X.needsContext.test(a) ? 0 : j.length;
            while (i--) {
              if (((k = j[i]), d.relative[(l = k.type)])) {
                break;
              }
              if (
                (m = d.find[l]) &&
                (f = m(
                  k.matches[0].replace(ca, da),
                  (aa.test(j[0].type) && pa(b.parentNode)) || b
                ))
              ) {
                if ((j.splice(i, 1), (a = f.length && ra(j)), !a)) {
                  return H.apply(e, f), e;
                }
                break;
              }
            }
          }
          return (
            (n || h(a, o))(f, b, !p, e, (aa.test(a) && pa(b.parentNode)) || b),
            e
          );
        }),
      (c.sortStable = u.split("").sort(B).join("") === u),
      (c.detectDuplicates = !!l),
      m(),
      (c.sortDetached = ja(function (a) {
        return 1 & a.compareDocumentPosition(n.createElement("div"));
      })),
      ja(function (a) {
        return (
          (a.innerHTML = "<a href='#'></a>"),
          "#" === a.firstChild.getAttribute("href")
        );
      }) ||
        ka("type|href|height|width", function (a, b, c) {
          return c
            ? void 0
            : a.getAttribute(b, "type" === b.toLowerCase() ? 1 : 2);
        }),
      (c.attributes &&
        ja(function (a) {
          return (
            (a.innerHTML = "<input/>"),
            a.firstChild.setAttribute("value", ""),
            "" === a.firstChild.getAttribute("value")
          );
        })) ||
        ka("value", function (a, b, c) {
          return c || "input" !== a.nodeName.toLowerCase()
            ? void 0
            : a.defaultValue;
        }),
      ja(function (a) {
        return null == a.getAttribute("disabled");
      }) ||
        ka(K, function (a, b, c) {
          var d;
          return c
            ? void 0
            : a[b] === !0
            ? b.toLowerCase()
            : (d = a.getAttributeNode(b)) && d.specified
            ? d.value
            : null;
        }),
      ga
    );
  })(a);
  (m.find = s),
    (m.expr = s.selectors),
    (m.expr[":"] = m.expr.pseudos),
    (m.unique = s.uniqueSort),
    (m.text = s.getText),
    (m.isXMLDoc = s.isXML),
    (m.contains = s.contains);
  var t = m.expr.match.needsContext,
    u = /^<(\w+)\s*\/?>(?:<\/\1>|)$/,
    v = /^.[^:#\[\.,]*$/;
  function w(a, b, c) {
    if (m.isFunction(b)) {
      return m.grep(a, function (a, d) {
        return !!b.call(a, d, a) !== c;
      });
    }
    if (b.nodeType) {
      return m.grep(a, function (a) {
        return (a === b) !== c;
      });
    }
    if ("string" == typeof b) {
      if (v.test(b)) {
        return m.filter(b, a, c);
      }
      b = m.filter(b, a);
    }
    return m.grep(a, function (a) {
      return m.inArray(a, b) >= 0 !== c;
    });
  }
  (m.filter = function (a, b, c) {
    var d = b[0];
    return (
      c && (a = ":not(" + a + ")"),
      1 === b.length && 1 === d.nodeType
        ? m.find.matchesSelector(d, a)
          ? [d]
          : []
        : m.find.matches(
            a,
            m.grep(b, function (a) {
              return 1 === a.nodeType;
            })
          )
    );
  }),
    m.fn.extend({
      find: function (a) {
        var b,
          c = [],
          d = this,
          e = d.length;
        if ("string" != typeof a) {
          return this.pushStack(
            m(a).filter(function () {
              for (b = 0; e > b; b++) {
                if (m.contains(d[b], this)) {
                  return !0;
                }
              }
            })
          );
        }
        for (b = 0; e > b; b++) {
          m.find(a, d[b], c);
        }
        return (
          (c = this.pushStack(e > 1 ? m.unique(c) : c)),
          (c.selector = this.selector ? this.selector + " " + a : a),
          c
        );
      },
      filter: function (a) {
        return this.pushStack(w(this, a || [], !1));
      },
      not: function (a) {
        return this.pushStack(w(this, a || [], !0));
      },
      is: function (a) {
        return !!w(this, "string" == typeof a && t.test(a) ? m(a) : a || [], !1)
          .length;
      },
    });
  var x,
    y = a.document,
    z = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]*))$/,
    A = (m.fn.init = function (a, b) {
      var c, d;
      if (!a) {
        return this;
      }
      if ("string" == typeof a) {
        if (
          ((c =
            "<" === a.charAt(0) &&
            ">" === a.charAt(a.length - 1) &&
            a.length >= 3
              ? [null, a, null]
              : z.exec(a)),
          !c || (!c[1] && b))
        ) {
          return !b || b.jquery
            ? (b || x).find(a)
            : this.constructor(b).find(a);
        }
        if (c[1]) {
          if (
            ((b = b instanceof m ? b[0] : b),
            m.merge(
              this,
              m.parseHTML(c[1], b && b.nodeType ? b.ownerDocument || b : y, !0)
            ),
            u.test(c[1]) && m.isPlainObject(b))
          ) {
            for (c in b) {
              m.isFunction(this[c]) ? this[c](b[c]) : this.attr(c, b[c]);
            }
          }
          return this;
        }
        if (((d = y.getElementById(c[2])), d && d.parentNode)) {
          if (d.id !== c[2]) {
            return x.find(a);
          }
          (this.length = 1), (this[0] = d);
        }
        return (this.context = y), (this.selector = a), this;
      }
      return a.nodeType
        ? ((this.context = this[0] = a), (this.length = 1), this)
        : m.isFunction(a)
        ? "undefined" != typeof x.ready
          ? x.ready(a)
          : a(m)
        : (void 0 !== a.selector &&
            ((this.selector = a.selector), (this.context = a.context)),
          m.makeArray(a, this));
    });
  (A.prototype = m.fn), (x = m(y));
  var B = /^(?:parents|prev(?:Until|All))/,
    C = { children: !0, contents: !0, next: !0, prev: !0 };
  m.extend({
    dir: function (a, b, c) {
      var d = [],
        e = a[b];
      while (
        e &&
        9 !== e.nodeType &&
        (void 0 === c || 1 !== e.nodeType || !m(e).is(c))
      ) {
        1 === e.nodeType && d.push(e), (e = e[b]);
      }
      return d;
    },
    sibling: function (a, b) {
      for (var c = []; a; a = a.nextSibling) {
        1 === a.nodeType && a !== b && c.push(a);
      }
      return c;
    },
  }),
    m.fn.extend({
      has: function (a) {
        var b,
          c = m(a, this),
          d = c.length;
        return this.filter(function () {
          for (b = 0; d > b; b++) {
            if (m.contains(this, c[b])) {
              return !0;
            }
          }
        });
      },
      closest: function (a, b) {
        for (
          var c,
            d = 0,
            e = this.length,
            f = [],
            g = t.test(a) || "string" != typeof a ? m(a, b || this.context) : 0;
          e > d;
          d++
        ) {
          for (c = this[d]; c && c !== b; c = c.parentNode) {
            if (
              c.nodeType < 11 &&
              (g
                ? g.index(c) > -1
                : 1 === c.nodeType && m.find.matchesSelector(c, a))
            ) {
              f.push(c);
              break;
            }
          }
        }
        return this.pushStack(f.length > 1 ? m.unique(f) : f);
      },
      index: function (a) {
        return a
          ? "string" == typeof a
            ? m.inArray(this[0], m(a))
            : m.inArray(a.jquery ? a[0] : a, this)
          : this[0] && this[0].parentNode
          ? this.first().prevAll().length
          : -1;
      },
      add: function (a, b) {
        return this.pushStack(m.unique(m.merge(this.get(), m(a, b))));
      },
      addBack: function (a) {
        return this.add(
          null == a ? this.prevObject : this.prevObject.filter(a)
        );
      },
    });
  function D(a, b) {
    do {
      a = a[b];
    } while (a && 1 !== a.nodeType);
    return a;
  }
  m.each(
    {
      parent: function (a) {
        var b = a.parentNode;
        return b && 11 !== b.nodeType ? b : null;
      },
      parents: function (a) {
        return m.dir(a, "parentNode");
      },
      parentsUntil: function (a, b, c) {
        return m.dir(a, "parentNode", c);
      },
      next: function (a) {
        return D(a, "nextSibling");
      },
      prev: function (a) {
        return D(a, "previousSibling");
      },
      nextAll: function (a) {
        return m.dir(a, "nextSibling");
      },
      prevAll: function (a) {
        return m.dir(a, "previousSibling");
      },
      nextUntil: function (a, b, c) {
        return m.dir(a, "nextSibling", c);
      },
      prevUntil: function (a, b, c) {
        return m.dir(a, "previousSibling", c);
      },
      siblings: function (a) {
        return m.sibling((a.parentNode || {}).firstChild, a);
      },
      children: function (a) {
        return m.sibling(a.firstChild);
      },
      contents: function (a) {
        return m.nodeName(a, "iframe")
          ? a.contentDocument || a.contentWindow.document
          : m.merge([], a.childNodes);
      },
    },
    function (a, b) {
      m.fn[a] = function (c, d) {
        var e = m.map(this, b, c);
        return (
          "Until" !== a.slice(-5) && (d = c),
          d && "string" == typeof d && (e = m.filter(d, e)),
          this.length > 1 &&
            (C[a] || (e = m.unique(e)), B.test(a) && (e = e.reverse())),
          this.pushStack(e)
        );
      };
    }
  );
  var E = /\S+/g,
    F = {};
  function G(a) {
    var b = (F[a] = {});
    return (
      m.each(a.match(E) || [], function (a, c) {
        b[c] = !0;
      }),
      b
    );
  }
  (m.Callbacks = function (a) {
    a = "string" == typeof a ? F[a] || G(a) : m.extend({}, a);
    var b,
      c,
      d,
      e,
      f,
      g,
      h = [],
      i = !a.once && [],
      j = function (l) {
        for (
          c = a.memory && l, d = !0, f = g || 0, g = 0, e = h.length, b = !0;
          h && e > f;
          f++
        ) {
          if (h[f].apply(l[0], l[1]) === !1 && a.stopOnFalse) {
            c = !1;
            break;
          }
        }
        (b = !1),
          h && (i ? i.length && j(i.shift()) : c ? (h = []) : k.disable());
      },
      k = {
        add: function () {
          if (h) {
            var d = h.length;
            !(function f(b) {
              m.each(b, function (b, c) {
                var d = m.type(c);
                "function" === d
                  ? (a.unique && k.has(c)) || h.push(c)
                  : c && c.length && "string" !== d && f(c);
              });
            })(arguments),
              b ? (e = h.length) : c && ((g = d), j(c));
          }
          return this;
        },
        remove: function () {
          return (
            h &&
              m.each(arguments, function (a, c) {
                var d;
                while ((d = m.inArray(c, h, d)) > -1) {
                  h.splice(d, 1), b && (e >= d && e--, f >= d && f--);
                }
              }),
            this
          );
        },
        has: function (a) {
          return a ? m.inArray(a, h) > -1 : !(!h || !h.length);
        },
        empty: function () {
          return (h = []), (e = 0), this;
        },
        disable: function () {
          return (h = i = c = void 0), this;
        },
        disabled: function () {
          return !h;
        },
        lock: function () {
          return (i = void 0), c || k.disable(), this;
        },
        locked: function () {
          return !i;
        },
        fireWith: function (a, c) {
          return (
            !h ||
              (d && !i) ||
              ((c = c || []),
              (c = [a, c.slice ? c.slice() : c]),
              b ? i.push(c) : j(c)),
            this
          );
        },
        fire: function () {
          return k.fireWith(this, arguments), this;
        },
        fired: function () {
          return !!d;
        },
      };
    return k;
  }),
    m.extend({
      Deferred: function (a) {
        var b = [
            ["resolve", "done", m.Callbacks("once memory"), "resolved"],
            ["reject", "fail", m.Callbacks("once memory"), "rejected"],
            ["notify", "progress", m.Callbacks("memory")],
          ],
          c = "pending",
          d = {
            state: function () {
              return c;
            },
            always: function () {
              return e.done(arguments).fail(arguments), this;
            },
            then: function () {
              var a = arguments;
              return m
                .Deferred(function (c) {
                  m.each(b, function (b, f) {
                    var g = m.isFunction(a[b]) && a[b];
                    e[f[1]](function () {
                      var a = g && g.apply(this, arguments);
                      a && m.isFunction(a.promise)
                        ? a
                            .promise()
                            .done(c.resolve)
                            .fail(c.reject)
                            .progress(c.notify)
                        : c[f[0] + "With"](
                            this === d ? c.promise() : this,
                            g ? [a] : arguments
                          );
                    });
                  }),
                    (a = null);
                })
                .promise();
            },
            promise: function (a) {
              return null != a ? m.extend(a, d) : d;
            },
          },
          e = {};
        return (
          (d.pipe = d.then),
          m.each(b, function (a, f) {
            var g = f[2],
              h = f[3];
            (d[f[1]] = g.add),
              h &&
                g.add(
                  function () {
                    c = h;
                  },
                  b[1 ^ a][2].disable,
                  b[2][2].lock
                ),
              (e[f[0]] = function () {
                return e[f[0] + "With"](this === e ? d : this, arguments), this;
              }),
              (e[f[0] + "With"] = g.fireWith);
          }),
          d.promise(e),
          a && a.call(e, e),
          e
        );
      },
      when: function (a) {
        var b = 0,
          c = d.call(arguments),
          e = c.length,
          f = 1 !== e || (a && m.isFunction(a.promise)) ? e : 0,
          g = 1 === f ? a : m.Deferred(),
          h = function (a, b, c) {
            return function (e) {
              (b[a] = this),
                (c[a] = arguments.length > 1 ? d.call(arguments) : e),
                c === i ? g.notifyWith(b, c) : --f || g.resolveWith(b, c);
            };
          },
          i,
          j,
          k;
        if (e > 1) {
          for (
            i = new Array(e), j = new Array(e), k = new Array(e);
            e > b;
            b++
          ) {
            c[b] && m.isFunction(c[b].promise)
              ? c[b]
                  .promise()
                  .done(h(b, k, c))
                  .fail(g.reject)
                  .progress(h(b, j, i))
              : --f;
          }
        }
        return f || g.resolveWith(k, c), g.promise();
      },
    });
  var H;
  (m.fn.ready = function (a) {
    return m.ready.promise().done(a), this;
  }),
    m.extend({
      isReady: !1,
      readyWait: 1,
      holdReady: function (a) {
        a ? m.readyWait++ : m.ready(!0);
      },
      ready: function (a) {
        if (a === !0 ? !--m.readyWait : !m.isReady) {
          if (!y.body) {
            return setTimeout(m.ready);
          }
          (m.isReady = !0),
            (a !== !0 && --m.readyWait > 0) ||
              (H.resolveWith(y, [m]),
              m.fn.triggerHandler &&
                (m(y).triggerHandler("ready"), m(y).off("ready")));
        }
      },
    });
  function I() {
    y.addEventListener
      ? (y.removeEventListener("DOMContentLoaded", J, !1),
        a.removeEventListener("load", J, !1))
      : (y.detachEvent("onreadystatechange", J), a.detachEvent("onload", J));
  }
  function J() {
    (y.addEventListener ||
      "load" === event.type ||
      "complete" === y.readyState) &&
      (I(), m.ready());
  }
  m.ready.promise = function (b) {
    if (!H) {
      if (((H = m.Deferred()), "complete" === y.readyState)) {
        setTimeout(m.ready);
      } else {
        if (y.addEventListener) {
          y.addEventListener("DOMContentLoaded", J, !1),
            a.addEventListener("load", J, !1);
        } else {
          y.attachEvent("onreadystatechange", J), a.attachEvent("onload", J);
          var c = !1;
          try {
            c = null == a.frameElement && y.documentElement;
          } catch (d) {}
          c &&
            c.doScroll &&
            !(function e() {
              if (!m.isReady) {
                try {
                  c.doScroll("left");
                } catch (a) {
                  return setTimeout(e, 50);
                }
                I(), m.ready();
              }
            })();
        }
      }
    }
    return H.promise(b);
  };
  var K = "undefined",
    L;
  for (L in m(k)) {
    break;
  }
  (k.ownLast = "0" !== L),
    (k.inlineBlockNeedsLayout = !1),
    m(function () {
      var a, b, c, d;
      (c = y.getElementsByTagName("body")[0]),
        c &&
          c.style &&
          ((b = y.createElement("div")),
          (d = y.createElement("div")),
          (d.style.cssText =
            "position:absolute;border:0;width:0;height:0;top:0;left:-9999px"),
          c.appendChild(d).appendChild(b),
          typeof b.style.zoom !== K &&
            ((b.style.cssText =
              "display:inline;margin:0;border:0;padding:1px;width:1px;zoom:1"),
            (k.inlineBlockNeedsLayout = a = 3 === b.offsetWidth),
            a && (c.style.zoom = 1)),
          c.removeChild(d));
    }),
    (function () {
      var a = y.createElement("div");
      if (null == k.deleteExpando) {
        k.deleteExpando = !0;
        try {
          delete a.test;
        } catch (b) {
          k.deleteExpando = !1;
        }
      }
      a = null;
    })(),
    (m.acceptData = function (a) {
      var b = m.noData[(a.nodeName + " ").toLowerCase()],
        c = +a.nodeType || 1;
      return 1 !== c && 9 !== c
        ? !1
        : !b || (b !== !0 && a.getAttribute("classid") === b);
    });
  var M = /^(?:\{[\w\W]*\}|\[[\w\W]*\])$/,
    N = /([A-Z])/g;
  function O(a, b, c) {
    if (void 0 === c && 1 === a.nodeType) {
      var d = "data-" + b.replace(N, "-$1").toLowerCase();
      if (((c = a.getAttribute(d)), "string" == typeof c)) {
        try {
          c =
            "true" === c
              ? !0
              : "false" === c
              ? !1
              : "null" === c
              ? null
              : +c + "" === c
              ? +c
              : M.test(c)
              ? m.parseJSON(c)
              : c;
        } catch (e) {}
        m.data(a, b, c);
      } else {
        c = void 0;
      }
    }
    return c;
  }
  function P(a) {
    var b;
    for (b in a) {
      if (("data" !== b || !m.isEmptyObject(a[b])) && "toJSON" !== b) {
        return !1;
      }
    }
    return !0;
  }
  function Q(a, b, d, e) {
    if (m.acceptData(a)) {
      var f,
        g,
        h = m.expando,
        i = a.nodeType,
        j = i ? m.cache : a,
        k = i ? a[h] : a[h] && h;
      if (
        (k && j[k] && (e || j[k].data)) ||
        void 0 !== d ||
        "string" != typeof b
      ) {
        return (
          k || (k = i ? (a[h] = c.pop() || m.guid++) : h),
          j[k] || (j[k] = i ? {} : { toJSON: m.noop }),
          ("object" == typeof b || "function" == typeof b) &&
            (e
              ? (j[k] = m.extend(j[k], b))
              : (j[k].data = m.extend(j[k].data, b))),
          (g = j[k]),
          e || (g.data || (g.data = {}), (g = g.data)),
          void 0 !== d && (g[m.camelCase(b)] = d),
          "string" == typeof b
            ? ((f = g[b]), null == f && (f = g[m.camelCase(b)]))
            : (f = g),
          f
        );
      }
    }
  }
  function R(a, b, c) {
    if (m.acceptData(a)) {
      var d,
        e,
        f = a.nodeType,
        g = f ? m.cache : a,
        h = f ? a[m.expando] : m.expando;
      if (g[h]) {
        if (b && (d = c ? g[h] : g[h].data)) {
          m.isArray(b)
            ? (b = b.concat(m.map(b, m.camelCase)))
            : b in d
            ? (b = [b])
            : ((b = m.camelCase(b)), (b = b in d ? [b] : b.split(" "))),
            (e = b.length);
          while (e--) {
            delete d[b[e]];
          }
          if (c ? !P(d) : !m.isEmptyObject(d)) {
            return;
          }
        }
        (c || (delete g[h].data, P(g[h]))) &&
          (f
            ? m.cleanData([a], !0)
            : k.deleteExpando || g != g.window
            ? delete g[h]
            : (g[h] = null));
      }
    }
  }
  m.extend({
    cache: {},
    noData: {
      "applet ": !0,
      "embed ": !0,
      "object ": "clsid:D27CDB6E-AE6D-11cf-96B8-444553540000",
    },
    hasData: function (a) {
      return (
        (a = a.nodeType ? m.cache[a[m.expando]] : a[m.expando]), !!a && !P(a)
      );
    },
    data: function (a, b, c) {
      return Q(a, b, c);
    },
    removeData: function (a, b) {
      return R(a, b);
    },
    _data: function (a, b, c) {
      return Q(a, b, c, !0);
    },
    _removeData: function (a, b) {
      return R(a, b, !0);
    },
  }),
    m.fn.extend({
      data: function (a, b) {
        var c,
          d,
          e,
          f = this[0],
          g = f && f.attributes;
        if (void 0 === a) {
          if (
            this.length &&
            ((e = m.data(f)), 1 === f.nodeType && !m._data(f, "parsedAttrs"))
          ) {
            c = g.length;
            while (c--) {
              g[c] &&
                ((d = g[c].name),
                0 === d.indexOf("data-") &&
                  ((d = m.camelCase(d.slice(5))), O(f, d, e[d])));
            }
            m._data(f, "parsedAttrs", !0);
          }
          return e;
        }
        return "object" == typeof a
          ? this.each(function () {
              m.data(this, a);
            })
          : arguments.length > 1
          ? this.each(function () {
              m.data(this, a, b);
            })
          : f
          ? O(f, a, m.data(f, a))
          : void 0;
      },
      removeData: function (a) {
        return this.each(function () {
          m.removeData(this, a);
        });
      },
    }),
    m.extend({
      queue: function (a, b, c) {
        var d;
        return a
          ? ((b = (b || "fx") + "queue"),
            (d = m._data(a, b)),
            c &&
              (!d || m.isArray(c)
                ? (d = m._data(a, b, m.makeArray(c)))
                : d.push(c)),
            d || [])
          : void 0;
      },
      dequeue: function (a, b) {
        b = b || "fx";
        var c = m.queue(a, b),
          d = c.length,
          e = c.shift(),
          f = m._queueHooks(a, b),
          g = function () {
            m.dequeue(a, b);
          };
        "inprogress" === e && ((e = c.shift()), d--),
          e &&
            ("fx" === b && c.unshift("inprogress"),
            delete f.stop,
            e.call(a, g, f)),
          !d && f && f.empty.fire();
      },
      _queueHooks: function (a, b) {
        var c = b + "queueHooks";
        return (
          m._data(a, c) ||
          m._data(a, c, {
            empty: m.Callbacks("once memory").add(function () {
              m._removeData(a, b + "queue"), m._removeData(a, c);
            }),
          })
        );
      },
    }),
    m.fn.extend({
      queue: function (a, b) {
        var c = 2;
        return (
          "string" != typeof a && ((b = a), (a = "fx"), c--),
          arguments.length < c
            ? m.queue(this[0], a)
            : void 0 === b
            ? this
            : this.each(function () {
                var c = m.queue(this, a, b);
                m._queueHooks(this, a),
                  "fx" === a && "inprogress" !== c[0] && m.dequeue(this, a);
              })
        );
      },
      dequeue: function (a) {
        return this.each(function () {
          m.dequeue(this, a);
        });
      },
      clearQueue: function (a) {
        return this.queue(a || "fx", []);
      },
      promise: function (a, b) {
        var c,
          d = 1,
          e = m.Deferred(),
          f = this,
          g = this.length,
          h = function () {
            --d || e.resolveWith(f, [f]);
          };
        "string" != typeof a && ((b = a), (a = void 0)), (a = a || "fx");
        while (g--) {
          (c = m._data(f[g], a + "queueHooks")),
            c && c.empty && (d++, c.empty.add(h));
        }
        return h(), e.promise(b);
      },
    });
  var S = /[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/.source,
    T = ["Top", "Right", "Bottom", "Left"],
    U = function (a, b) {
      return (
        (a = b || a),
        "none" === m.css(a, "display") || !m.contains(a.ownerDocument, a)
      );
    },
    V = (m.access = function (a, b, c, d, e, f, g) {
      var h = 0,
        i = a.length,
        j = null == c;
      if ("object" === m.type(c)) {
        e = !0;
        for (h in c) {
          m.access(a, b, h, c[h], !0, f, g);
        }
      } else {
        if (
          void 0 !== d &&
          ((e = !0),
          m.isFunction(d) || (g = !0),
          j &&
            (g
              ? (b.call(a, d), (b = null))
              : ((j = b),
                (b = function (a, b, c) {
                  return j.call(m(a), c);
                }))),
          b)
        ) {
          for (; i > h; h++) {
            b(a[h], c, g ? d : d.call(a[h], h, b(a[h], c)));
          }
        }
      }
      return e ? a : j ? b.call(a) : i ? b(a[0], c) : f;
    }),
    W = /^(?:checkbox|radio)$/i;
  !(function () {
    var a = y.createElement("input"),
      b = y.createElement("div"),
      c = y.createDocumentFragment();
    if (
      ((b.innerHTML =
        "  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>"),
      (k.leadingWhitespace = 3 === b.firstChild.nodeType),
      (k.tbody = !b.getElementsByTagName("tbody").length),
      (k.htmlSerialize = !!b.getElementsByTagName("link").length),
      (k.html5Clone =
        "<:nav></:nav>" !== y.createElement("nav").cloneNode(!0).outerHTML),
      (a.type = "checkbox"),
      (a.checked = !0),
      c.appendChild(a),
      (k.appendChecked = a.checked),
      (b.innerHTML = "<textarea>x</textarea>"),
      (k.noCloneChecked = !!b.cloneNode(!0).lastChild.defaultValue),
      c.appendChild(b),
      (b.innerHTML = "<input type='radio' checked='checked' name='t'/>"),
      (k.checkClone = b.cloneNode(!0).cloneNode(!0).lastChild.checked),
      (k.noCloneEvent = !0),
      b.attachEvent &&
        (b.attachEvent("onclick", function () {
          k.noCloneEvent = !1;
        }),
        b.cloneNode(!0).click()),
      null == k.deleteExpando)
    ) {
      k.deleteExpando = !0;
      try {
        delete b.test;
      } catch (d) {
        k.deleteExpando = !1;
      }
    }
  })(),
    (function () {
      var b,
        c,
        d = y.createElement("div");
      for (b in { submit: !0, change: !0, focusin: !0 }) {
        (c = "on" + b),
          (k[b + "Bubbles"] = c in a) ||
            (d.setAttribute(c, "t"),
            (k[b + "Bubbles"] = d.attributes[c].expando === !1));
      }
      d = null;
    })();
  var X = /^(?:input|select|textarea)$/i,
    Y = /^key/,
    Z = /^(?:mouse|pointer|contextmenu)|click/,
    $ = /^(?:focusinfocus|focusoutblur)$/,
    _ = /^([^.]*)(?:\.(.+)|)$/;
  function aa() {
    return !0;
  }
  function ba() {
    return !1;
  }
  function ca() {
    try {
      return y.activeElement;
    } catch (a) {}
  }
  (m.event = {
    global: {},
    add: function (a, b, c, d, e) {
      var f,
        g,
        h,
        i,
        j,
        k,
        l,
        n,
        o,
        p,
        q,
        r = m._data(a);
      if (r) {
        c.handler && ((i = c), (c = i.handler), (e = i.selector)),
          c.guid || (c.guid = m.guid++),
          (g = r.events) || (g = r.events = {}),
          (k = r.handle) ||
            ((k = r.handle =
              function (a) {
                return typeof m === K || (a && m.event.triggered === a.type)
                  ? void 0
                  : m.event.dispatch.apply(k.elem, arguments);
              }),
            (k.elem = a)),
          (b = (b || "").match(E) || [""]),
          (h = b.length);
        while (h--) {
          (f = _.exec(b[h]) || []),
            (o = q = f[1]),
            (p = (f[2] || "").split(".").sort()),
            o &&
              ((j = m.event.special[o] || {}),
              (o = (e ? j.delegateType : j.bindType) || o),
              (j = m.event.special[o] || {}),
              (l = m.extend(
                {
                  type: o,
                  origType: q,
                  data: d,
                  handler: c,
                  guid: c.guid,
                  selector: e,
                  needsContext: e && m.expr.match.needsContext.test(e),
                  namespace: p.join("."),
                },
                i
              )),
              (n = g[o]) ||
                ((n = g[o] = []),
                (n.delegateCount = 0),
                (j.setup && j.setup.call(a, d, p, k) !== !1) ||
                  (a.addEventListener
                    ? a.addEventListener(o, k, !1)
                    : a.attachEvent && a.attachEvent("on" + o, k))),
              j.add &&
                (j.add.call(a, l), l.handler.guid || (l.handler.guid = c.guid)),
              e ? n.splice(n.delegateCount++, 0, l) : n.push(l),
              (m.event.global[o] = !0));
        }
        a = null;
      }
    },
    remove: function (a, b, c, d, e) {
      var f,
        g,
        h,
        i,
        j,
        k,
        l,
        n,
        o,
        p,
        q,
        r = m.hasData(a) && m._data(a);
      if (r && (k = r.events)) {
        (b = (b || "").match(E) || [""]), (j = b.length);
        while (j--) {
          if (
            ((h = _.exec(b[j]) || []),
            (o = q = h[1]),
            (p = (h[2] || "").split(".").sort()),
            o)
          ) {
            (l = m.event.special[o] || {}),
              (o = (d ? l.delegateType : l.bindType) || o),
              (n = k[o] || []),
              (h =
                h[2] &&
                new RegExp("(^|\\.)" + p.join("\\.(?:.*\\.|)") + "(\\.|$)")),
              (i = f = n.length);
            while (f--) {
              (g = n[f]),
                (!e && q !== g.origType) ||
                  (c && c.guid !== g.guid) ||
                  (h && !h.test(g.namespace)) ||
                  (d && d !== g.selector && ("**" !== d || !g.selector)) ||
                  (n.splice(f, 1),
                  g.selector && n.delegateCount--,
                  l.remove && l.remove.call(a, g));
            }
            i &&
              !n.length &&
              ((l.teardown && l.teardown.call(a, p, r.handle) !== !1) ||
                m.removeEvent(a, o, r.handle),
              delete k[o]);
          } else {
            for (o in k) {
              m.event.remove(a, o + b[j], c, d, !0);
            }
          }
        }
        m.isEmptyObject(k) && (delete r.handle, m._removeData(a, "events"));
      }
    },
    trigger: function (b, c, d, e) {
      var f,
        g,
        h,
        i,
        k,
        l,
        n,
        o = [d || y],
        p = j.call(b, "type") ? b.type : b,
        q = j.call(b, "namespace") ? b.namespace.split(".") : [];
      if (
        ((h = l = d = d || y),
        3 !== d.nodeType &&
          8 !== d.nodeType &&
          !$.test(p + m.event.triggered) &&
          (p.indexOf(".") >= 0 &&
            ((q = p.split(".")), (p = q.shift()), q.sort()),
          (g = p.indexOf(":") < 0 && "on" + p),
          (b = b[m.expando] ? b : new m.Event(p, "object" == typeof b && b)),
          (b.isTrigger = e ? 2 : 3),
          (b.namespace = q.join(".")),
          (b.namespace_re = b.namespace
            ? new RegExp("(^|\\.)" + q.join("\\.(?:.*\\.|)") + "(\\.|$)")
            : null),
          (b.result = void 0),
          b.target || (b.target = d),
          (c = null == c ? [b] : m.makeArray(c, [b])),
          (k = m.event.special[p] || {}),
          e || !k.trigger || k.trigger.apply(d, c) !== !1))
      ) {
        if (!e && !k.noBubble && !m.isWindow(d)) {
          for (
            i = k.delegateType || p, $.test(i + p) || (h = h.parentNode);
            h;
            h = h.parentNode
          ) {
            o.push(h), (l = h);
          }
          l === (d.ownerDocument || y) &&
            o.push(l.defaultView || l.parentWindow || a);
        }
        n = 0;
        while ((h = o[n++]) && !b.isPropagationStopped()) {
          (b.type = n > 1 ? i : k.bindType || p),
            (f = (m._data(h, "events") || {})[b.type] && m._data(h, "handle")),
            f && f.apply(h, c),
            (f = g && h[g]),
            f &&
              f.apply &&
              m.acceptData(h) &&
              ((b.result = f.apply(h, c)),
              b.result === !1 && b.preventDefault());
        }
        if (
          ((b.type = p),
          !e &&
            !b.isDefaultPrevented() &&
            (!k._default || k._default.apply(o.pop(), c) === !1) &&
            m.acceptData(d) &&
            g &&
            d[p] &&
            !m.isWindow(d))
        ) {
          (l = d[g]), l && (d[g] = null), (m.event.triggered = p);
          try {
            d[p]();
          } catch (r) {}
          (m.event.triggered = void 0), l && (d[g] = l);
        }
        return b.result;
      }
    },
    dispatch: function (a) {
      a = m.event.fix(a);
      var b,
        c,
        e,
        f,
        g,
        h = [],
        i = d.call(arguments),
        j = (m._data(this, "events") || {})[a.type] || [],
        k = m.event.special[a.type] || {};
      if (
        ((i[0] = a),
        (a.delegateTarget = this),
        !k.preDispatch || k.preDispatch.call(this, a) !== !1)
      ) {
        (h = m.event.handlers.call(this, a, j)), (b = 0);
        while ((f = h[b++]) && !a.isPropagationStopped()) {
          (a.currentTarget = f.elem), (g = 0);
          while ((e = f.handlers[g++]) && !a.isImmediatePropagationStopped()) {
            (!a.namespace_re || a.namespace_re.test(e.namespace)) &&
              ((a.handleObj = e),
              (a.data = e.data),
              (c = (
                (m.event.special[e.origType] || {}).handle || e.handler
              ).apply(f.elem, i)),
              void 0 !== c &&
                (a.result = c) === !1 &&
                (a.preventDefault(), a.stopPropagation()));
          }
        }
        return k.postDispatch && k.postDispatch.call(this, a), a.result;
      }
    },
    handlers: function (a, b) {
      var c,
        d,
        e,
        f,
        g = [],
        h = b.delegateCount,
        i = a.target;
      if (h && i.nodeType && (!a.button || "click" !== a.type)) {
        for (; i != this; i = i.parentNode || this) {
          if (1 === i.nodeType && (i.disabled !== !0 || "click" !== a.type)) {
            for (e = [], f = 0; h > f; f++) {
              (d = b[f]),
                (c = d.selector + " "),
                void 0 === e[c] &&
                  (e[c] = d.needsContext
                    ? m(c, this).index(i) >= 0
                    : m.find(c, this, null, [i]).length),
                e[c] && e.push(d);
            }
            e.length && g.push({ elem: i, handlers: e });
          }
        }
      }
      return h < b.length && g.push({ elem: this, handlers: b.slice(h) }), g;
    },
    fix: function (a) {
      if (a[m.expando]) {
        return a;
      }
      var b,
        c,
        d,
        e = a.type,
        f = a,
        g = this.fixHooks[e];
      g ||
        (this.fixHooks[e] = g =
          Z.test(e) ? this.mouseHooks : Y.test(e) ? this.keyHooks : {}),
        (d = g.props ? this.props.concat(g.props) : this.props),
        (a = new m.Event(f)),
        (b = d.length);
      while (b--) {
        (c = d[b]), (a[c] = f[c]);
      }
      return (
        a.target || (a.target = f.srcElement || y),
        3 === a.target.nodeType && (a.target = a.target.parentNode),
        (a.metaKey = !!a.metaKey),
        g.filter ? g.filter(a, f) : a
      );
    },
    props:
      "altKey bubbles cancelable ctrlKey currentTarget eventPhase metaKey relatedTarget shiftKey target timeStamp view which".split(
        " "
      ),
    fixHooks: {},
    keyHooks: {
      props: "char charCode key keyCode".split(" "),
      filter: function (a, b) {
        return (
          null == a.which &&
            (a.which = null != b.charCode ? b.charCode : b.keyCode),
          a
        );
      },
    },
    mouseHooks: {
      props:
        "button buttons clientX clientY fromElement offsetX offsetY pageX pageY screenX screenY toElement".split(
          " "
        ),
      filter: function (a, b) {
        var c,
          d,
          e,
          f = b.button,
          g = b.fromElement;
        return (
          null == a.pageX &&
            null != b.clientX &&
            ((d = a.target.ownerDocument || y),
            (e = d.documentElement),
            (c = d.body),
            (a.pageX =
              b.clientX +
              ((e && e.scrollLeft) || (c && c.scrollLeft) || 0) -
              ((e && e.clientLeft) || (c && c.clientLeft) || 0)),
            (a.pageY =
              b.clientY +
              ((e && e.scrollTop) || (c && c.scrollTop) || 0) -
              ((e && e.clientTop) || (c && c.clientTop) || 0))),
          !a.relatedTarget &&
            g &&
            (a.relatedTarget = g === a.target ? b.toElement : g),
          a.which ||
            void 0 === f ||
            (a.which = 1 & f ? 1 : 2 & f ? 3 : 4 & f ? 2 : 0),
          a
        );
      },
    },
    special: {
      load: { noBubble: !0 },
      focus: {
        trigger: function () {
          if (this !== ca() && this.focus) {
            try {
              return this.focus(), !1;
            } catch (a) {}
          }
        },
        delegateType: "focusin",
      },
      blur: {
        trigger: function () {
          return this === ca() && this.blur ? (this.blur(), !1) : void 0;
        },
        delegateType: "focusout",
      },
      click: {
        trigger: function () {
          return m.nodeName(this, "input") &&
            "checkbox" === this.type &&
            this.click
            ? (this.click(), !1)
            : void 0;
        },
        _default: function (a) {
          return m.nodeName(a.target, "a");
        },
      },
      beforeunload: {
        postDispatch: function (a) {
          void 0 !== a.result &&
            a.originalEvent &&
            (a.originalEvent.returnValue = a.result);
        },
      },
    },
    simulate: function (a, b, c, d) {
      var e = m.extend(new m.Event(), c, {
        type: a,
        isSimulated: !0,
        originalEvent: {},
      });
      d ? m.event.trigger(e, null, b) : m.event.dispatch.call(b, e),
        e.isDefaultPrevented() && c.preventDefault();
    },
  }),
    (m.removeEvent = y.removeEventListener
      ? function (a, b, c) {
          a.removeEventListener && a.removeEventListener(b, c, !1);
        }
      : function (a, b, c) {
          var d = "on" + b;
          a.detachEvent &&
            (typeof a[d] === K && (a[d] = null), a.detachEvent(d, c));
        }),
    (m.Event = function (a, b) {
      return this instanceof m.Event
        ? (a && a.type
            ? ((this.originalEvent = a),
              (this.type = a.type),
              (this.isDefaultPrevented =
                a.defaultPrevented ||
                (void 0 === a.defaultPrevented && a.returnValue === !1)
                  ? aa
                  : ba))
            : (this.type = a),
          b && m.extend(this, b),
          (this.timeStamp = (a && a.timeStamp) || m.now()),
          void (this[m.expando] = !0))
        : new m.Event(a, b);
    }),
    (m.Event.prototype = {
      isDefaultPrevented: ba,
      isPropagationStopped: ba,
      isImmediatePropagationStopped: ba,
      preventDefault: function () {
        var a = this.originalEvent;
        (this.isDefaultPrevented = aa),
          a && (a.preventDefault ? a.preventDefault() : (a.returnValue = !1));
      },
      stopPropagation: function () {
        var a = this.originalEvent;
        (this.isPropagationStopped = aa),
          a &&
            (a.stopPropagation && a.stopPropagation(), (a.cancelBubble = !0));
      },
      stopImmediatePropagation: function () {
        var a = this.originalEvent;
        (this.isImmediatePropagationStopped = aa),
          a && a.stopImmediatePropagation && a.stopImmediatePropagation(),
          this.stopPropagation();
      },
    }),
    m.each(
      {
        mouseenter: "mouseover",
        mouseleave: "mouseout",
        pointerenter: "pointerover",
        pointerleave: "pointerout",
      },
      function (a, b) {
        m.event.special[a] = {
          delegateType: b,
          bindType: b,
          handle: function (a) {
            var c,
              d = this,
              e = a.relatedTarget,
              f = a.handleObj;
            return (
              (!e || (e !== d && !m.contains(d, e))) &&
                ((a.type = f.origType),
                (c = f.handler.apply(this, arguments)),
                (a.type = b)),
              c
            );
          },
        };
      }
    ),
    k.submitBubbles ||
      (m.event.special.submit = {
        setup: function () {
          return m.nodeName(this, "form")
            ? !1
            : void m.event.add(
                this,
                "click._submit keypress._submit",
                function (a) {
                  var b = a.target,
                    c =
                      m.nodeName(b, "input") || m.nodeName(b, "button")
                        ? b.form
                        : void 0;
                  c &&
                    !m._data(c, "submitBubbles") &&
                    (m.event.add(c, "submit._submit", function (a) {
                      a._submit_bubble = !0;
                    }),
                    m._data(c, "submitBubbles", !0));
                }
              );
        },
        postDispatch: function (a) {
          a._submit_bubble &&
            (delete a._submit_bubble,
            this.parentNode &&
              !a.isTrigger &&
              m.event.simulate("submit", this.parentNode, a, !0));
        },
        teardown: function () {
          return m.nodeName(this, "form")
            ? !1
            : void m.event.remove(this, "._submit");
        },
      }),
    k.changeBubbles ||
      (m.event.special.change = {
        setup: function () {
          return X.test(this.nodeName)
            ? (("checkbox" === this.type || "radio" === this.type) &&
                (m.event.add(this, "propertychange._change", function (a) {
                  "checked" === a.originalEvent.propertyName &&
                    (this._just_changed = !0);
                }),
                m.event.add(this, "click._change", function (a) {
                  this._just_changed &&
                    !a.isTrigger &&
                    (this._just_changed = !1),
                    m.event.simulate("change", this, a, !0);
                })),
              !1)
            : void m.event.add(this, "beforeactivate._change", function (a) {
                var b = a.target;
                X.test(b.nodeName) &&
                  !m._data(b, "changeBubbles") &&
                  (m.event.add(b, "change._change", function (a) {
                    !this.parentNode ||
                      a.isSimulated ||
                      a.isTrigger ||
                      m.event.simulate("change", this.parentNode, a, !0);
                  }),
                  m._data(b, "changeBubbles", !0));
              });
        },
        handle: function (a) {
          var b = a.target;
          return this !== b ||
            a.isSimulated ||
            a.isTrigger ||
            ("radio" !== b.type && "checkbox" !== b.type)
            ? a.handleObj.handler.apply(this, arguments)
            : void 0;
        },
        teardown: function () {
          return m.event.remove(this, "._change"), !X.test(this.nodeName);
        },
      }),
    k.focusinBubbles ||
      m.each({ focus: "focusin", blur: "focusout" }, function (a, b) {
        var c = function (a) {
          m.event.simulate(b, a.target, m.event.fix(a), !0);
        };
        m.event.special[b] = {
          setup: function () {
            var d = this.ownerDocument || this,
              e = m._data(d, b);
            e || d.addEventListener(a, c, !0), m._data(d, b, (e || 0) + 1);
          },
          teardown: function () {
            var d = this.ownerDocument || this,
              e = m._data(d, b) - 1;
            e
              ? m._data(d, b, e)
              : (d.removeEventListener(a, c, !0), m._removeData(d, b));
          },
        };
      }),
    m.fn.extend({
      on: function (a, b, c, d, e) {
        var f, g;
        if ("object" == typeof a) {
          "string" != typeof b && ((c = c || b), (b = void 0));
          for (f in a) {
            this.on(f, b, c, a[f], e);
          }
          return this;
        }
        if (
          (null == c && null == d
            ? ((d = b), (c = b = void 0))
            : null == d &&
              ("string" == typeof b
                ? ((d = c), (c = void 0))
                : ((d = c), (c = b), (b = void 0))),
          d === !1)
        ) {
          d = ba;
        } else {
          if (!d) {
            return this;
          }
        }
        return (
          1 === e &&
            ((g = d),
            (d = function (a) {
              return m().off(a), g.apply(this, arguments);
            }),
            (d.guid = g.guid || (g.guid = m.guid++))),
          this.each(function () {
            m.event.add(this, a, d, c, b);
          })
        );
      },
      one: function (a, b, c, d) {
        return this.on(a, b, c, d, 1);
      },
      off: function (a, b, c) {
        var d, e;
        if (a && a.preventDefault && a.handleObj) {
          return (
            (d = a.handleObj),
            m(a.delegateTarget).off(
              d.namespace ? d.origType + "." + d.namespace : d.origType,
              d.selector,
              d.handler
            ),
            this
          );
        }
        if ("object" == typeof a) {
          for (e in a) {
            this.off(e, b, a[e]);
          }
          return this;
        }
        return (
          (b === !1 || "function" == typeof b) && ((c = b), (b = void 0)),
          c === !1 && (c = ba),
          this.each(function () {
            m.event.remove(this, a, c, b);
          })
        );
      },
      trigger: function (a, b) {
        return this.each(function () {
          m.event.trigger(a, b, this);
        });
      },
      triggerHandler: function (a, b) {
        var c = this[0];
        return c ? m.event.trigger(a, b, c, !0) : void 0;
      },
    });
  function da(a) {
    var b = ea.split("|"),
      c = a.createDocumentFragment();
    if (c.createElement) {
      while (b.length) {
        c.createElement(b.pop());
      }
    }
    return c;
  }
  var ea =
      "abbr|article|aside|audio|bdi|canvas|data|datalist|details|figcaption|figure|footer|header|hgroup|mark|meter|nav|output|progress|section|summary|time|video",
    fa = / jQuery\d+="(?:null|\d+)"/g,
    ga = new RegExp("<(?:" + ea + ")[\\s/>]", "i"),
    ha = /^\s+/,
    ia =
      /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/gi,
    ja = /<([\w:]+)/,
    ka = /<tbody/i,
    la = /<|&#?\w+;/,
    ma = /<(?:script|style|link)/i,
    na = /checked\s*(?:[^=]|=\s*.checked.)/i,
    oa = /^$|\/(?:java|ecma)script/i,
    pa = /^true\/(.*)/,
    qa = /^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g,
    ra = {
      option: [1, "<select multiple='multiple'>", "</select>"],
      legend: [1, "<fieldset>", "</fieldset>"],
      area: [1, "<map>", "</map>"],
      param: [1, "<object>", "</object>"],
      thead: [1, "<table>", "</table>"],
      tr: [2, "<table><tbody>", "</tbody></table>"],
      col: [2, "<table><tbody></tbody><colgroup>", "</colgroup></table>"],
      td: [3, "<table><tbody><tr>", "</tr></tbody></table>"],
      _default: k.htmlSerialize ? [0, "", ""] : [1, "X<div>", "</div>"],
    },
    sa = da(y),
    ta = sa.appendChild(y.createElement("div"));
  (ra.optgroup = ra.option),
    (ra.tbody = ra.tfoot = ra.colgroup = ra.caption = ra.thead),
    (ra.th = ra.td);
  function ua(a, b) {
    var c,
      d,
      e = 0,
      f =
        typeof a.getElementsByTagName !== K
          ? a.getElementsByTagName(b || "*")
          : typeof a.querySelectorAll !== K
          ? a.querySelectorAll(b || "*")
          : void 0;
    if (!f) {
      for (f = [], c = a.childNodes || a; null != (d = c[e]); e++) {
        !b || m.nodeName(d, b) ? f.push(d) : m.merge(f, ua(d, b));
      }
    }
    return void 0 === b || (b && m.nodeName(a, b)) ? m.merge([a], f) : f;
  }
  function va(a) {
    W.test(a.type) && (a.defaultChecked = a.checked);
  }
  function wa(a, b) {
    return m.nodeName(a, "table") &&
      m.nodeName(11 !== b.nodeType ? b : b.firstChild, "tr")
      ? a.getElementsByTagName("tbody")[0] ||
          a.appendChild(a.ownerDocument.createElement("tbody"))
      : a;
  }
  function xa(a) {
    return (a.type = (null !== m.find.attr(a, "type")) + "/" + a.type), a;
  }
  function ya(a) {
    var b = pa.exec(a.type);
    return b ? (a.type = b[1]) : a.removeAttribute("type"), a;
  }
  function za(a, b) {
    for (var c, d = 0; null != (c = a[d]); d++) {
      m._data(c, "globalEval", !b || m._data(b[d], "globalEval"));
    }
  }
  function Aa(a, b) {
    if (1 === b.nodeType && m.hasData(a)) {
      var c,
        d,
        e,
        f = m._data(a),
        g = m._data(b, f),
        h = f.events;
      if (h) {
        delete g.handle, (g.events = {});
        for (c in h) {
          for (d = 0, e = h[c].length; e > d; d++) {
            m.event.add(b, c, h[c][d]);
          }
        }
      }
      g.data && (g.data = m.extend({}, g.data));
    }
  }
  function Ba(a, b) {
    var c, d, e;
    if (1 === b.nodeType) {
      if (((c = b.nodeName.toLowerCase()), !k.noCloneEvent && b[m.expando])) {
        e = m._data(b);
        for (d in e.events) {
          m.removeEvent(b, d, e.handle);
        }
        b.removeAttribute(m.expando);
      }
      "script" === c && b.text !== a.text
        ? ((xa(b).text = a.text), ya(b))
        : "object" === c
        ? (b.parentNode && (b.outerHTML = a.outerHTML),
          k.html5Clone &&
            a.innerHTML &&
            !m.trim(b.innerHTML) &&
            (b.innerHTML = a.innerHTML))
        : "input" === c && W.test(a.type)
        ? ((b.defaultChecked = b.checked = a.checked),
          b.value !== a.value && (b.value = a.value))
        : "option" === c
        ? (b.defaultSelected = b.selected = a.defaultSelected)
        : ("input" === c || "textarea" === c) &&
          (b.defaultValue = a.defaultValue);
    }
  }
  m.extend({
    clone: function (a, b, c) {
      var d,
        e,
        f,
        g,
        h,
        i = m.contains(a.ownerDocument, a);
      if (
        (k.html5Clone || m.isXMLDoc(a) || !ga.test("<" + a.nodeName + ">")
          ? (f = a.cloneNode(!0))
          : ((ta.innerHTML = a.outerHTML), ta.removeChild((f = ta.firstChild))),
        !(
          (k.noCloneEvent && k.noCloneChecked) ||
          (1 !== a.nodeType && 11 !== a.nodeType) ||
          m.isXMLDoc(a)
        ))
      ) {
        for (d = ua(f), h = ua(a), g = 0; null != (e = h[g]); ++g) {
          d[g] && Ba(e, d[g]);
        }
      }
      if (b) {
        if (c) {
          for (h = h || ua(a), d = d || ua(f), g = 0; null != (e = h[g]); g++) {
            Aa(e, d[g]);
          }
        } else {
          Aa(a, f);
        }
      }
      return (
        (d = ua(f, "script")),
        d.length > 0 && za(d, !i && ua(a, "script")),
        (d = h = e = null),
        f
      );
    },
    buildFragment: function (a, b, c, d) {
      for (
        var e, f, g, h, i, j, l, n = a.length, o = da(b), p = [], q = 0;
        n > q;
        q++
      ) {
        if (((f = a[q]), f || 0 === f)) {
          if ("object" === m.type(f)) {
            m.merge(p, f.nodeType ? [f] : f);
          } else {
            if (la.test(f)) {
              (h = h || o.appendChild(b.createElement("div"))),
                (i = (ja.exec(f) || ["", ""])[1].toLowerCase()),
                (l = ra[i] || ra._default),
                (h.innerHTML = l[1] + f.replace(ia, "<$1></$2>") + l[2]),
                (e = l[0]);
              while (e--) {
                h = h.lastChild;
              }
              if (
                (!k.leadingWhitespace &&
                  ha.test(f) &&
                  p.push(b.createTextNode(ha.exec(f)[0])),
                !k.tbody)
              ) {
                (f =
                  "table" !== i || ka.test(f)
                    ? "<table>" !== l[1] || ka.test(f)
                      ? 0
                      : h
                    : h.firstChild),
                  (e = f && f.childNodes.length);
                while (e--) {
                  m.nodeName((j = f.childNodes[e]), "tbody") &&
                    !j.childNodes.length &&
                    f.removeChild(j);
                }
              }
              m.merge(p, h.childNodes), (h.textContent = "");
              while (h.firstChild) {
                h.removeChild(h.firstChild);
              }
              h = o.lastChild;
            } else {
              p.push(b.createTextNode(f));
            }
          }
        }
      }
      h && o.removeChild(h),
        k.appendChecked || m.grep(ua(p, "input"), va),
        (q = 0);
      while ((f = p[q++])) {
        if (
          (!d || -1 === m.inArray(f, d)) &&
          ((g = m.contains(f.ownerDocument, f)),
          (h = ua(o.appendChild(f), "script")),
          g && za(h),
          c)
        ) {
          e = 0;
          while ((f = h[e++])) {
            oa.test(f.type || "") && c.push(f);
          }
        }
      }
      return (h = null), o;
    },
    cleanData: function (a, b) {
      for (
        var d,
          e,
          f,
          g,
          h = 0,
          i = m.expando,
          j = m.cache,
          l = k.deleteExpando,
          n = m.event.special;
        null != (d = a[h]);
        h++
      ) {
        if ((b || m.acceptData(d)) && ((f = d[i]), (g = f && j[f]))) {
          if (g.events) {
            for (e in g.events) {
              n[e] ? m.event.remove(d, e) : m.removeEvent(d, e, g.handle);
            }
          }
          j[f] &&
            (delete j[f],
            l
              ? delete d[i]
              : typeof d.removeAttribute !== K
              ? d.removeAttribute(i)
              : (d[i] = null),
            c.push(f));
        }
      }
    },
  }),
    m.fn.extend({
      text: function (a) {
        return V(
          this,
          function (a) {
            return void 0 === a
              ? m.text(this)
              : this.empty().append(
                  ((this[0] && this[0].ownerDocument) || y).createTextNode(a)
                );
          },
          null,
          a,
          arguments.length
        );
      },
      append: function () {
        return this.domManip(arguments, function (a) {
          if (
            1 === this.nodeType ||
            11 === this.nodeType ||
            9 === this.nodeType
          ) {
            var b = wa(this, a);
            b.appendChild(a);
          }
        });
      },
      prepend: function () {
        return this.domManip(arguments, function (a) {
          if (
            1 === this.nodeType ||
            11 === this.nodeType ||
            9 === this.nodeType
          ) {
            var b = wa(this, a);
            b.insertBefore(a, b.firstChild);
          }
        });
      },
      before: function () {
        return this.domManip(arguments, function (a) {
          this.parentNode && this.parentNode.insertBefore(a, this);
        });
      },
      after: function () {
        return this.domManip(arguments, function (a) {
          this.parentNode && this.parentNode.insertBefore(a, this.nextSibling);
        });
      },
      remove: function (a, b) {
        for (
          var c, d = a ? m.filter(a, this) : this, e = 0;
          null != (c = d[e]);
          e++
        ) {
          b || 1 !== c.nodeType || m.cleanData(ua(c)),
            c.parentNode &&
              (b && m.contains(c.ownerDocument, c) && za(ua(c, "script")),
              c.parentNode.removeChild(c));
        }
        return this;
      },
      empty: function () {
        for (var a, b = 0; null != (a = this[b]); b++) {
          1 === a.nodeType && m.cleanData(ua(a, !1));
          while (a.firstChild) {
            a.removeChild(a.firstChild);
          }
          a.options && m.nodeName(a, "select") && (a.options.length = 0);
        }
        return this;
      },
      clone: function (a, b) {
        return (
          (a = null == a ? !1 : a),
          (b = null == b ? a : b),
          this.map(function () {
            return m.clone(this, a, b);
          })
        );
      },
      html: function (a) {
        return V(
          this,
          function (a) {
            var b = this[0] || {},
              c = 0,
              d = this.length;
            if (void 0 === a) {
              return 1 === b.nodeType ? b.innerHTML.replace(fa, "") : void 0;
            }
            if (
              !(
                "string" != typeof a ||
                ma.test(a) ||
                (!k.htmlSerialize && ga.test(a)) ||
                (!k.leadingWhitespace && ha.test(a)) ||
                ra[(ja.exec(a) || ["", ""])[1].toLowerCase()]
              )
            ) {
              a = a.replace(ia, "<$1></$2>");
              try {
                for (; d > c; c++) {
                  (b = this[c] || {}),
                    1 === b.nodeType &&
                      (m.cleanData(ua(b, !1)), (b.innerHTML = a));
                }
                b = 0;
              } catch (e) {}
            }
            b && this.empty().append(a);
          },
          null,
          a,
          arguments.length
        );
      },
      replaceWith: function () {
        var a = arguments[0];
        return (
          this.domManip(arguments, function (b) {
            (a = this.parentNode),
              m.cleanData(ua(this)),
              a && a.replaceChild(b, this);
          }),
          a && (a.length || a.nodeType) ? this : this.remove()
        );
      },
      detach: function (a) {
        return this.remove(a, !0);
      },
      domManip: function (a, b) {
        a = e.apply([], a);
        var c,
          d,
          f,
          g,
          h,
          i,
          j = 0,
          l = this.length,
          n = this,
          o = l - 1,
          p = a[0],
          q = m.isFunction(p);
        if (
          q ||
          (l > 1 && "string" == typeof p && !k.checkClone && na.test(p))
        ) {
          return this.each(function (c) {
            var d = n.eq(c);
            q && (a[0] = p.call(this, c, d.html())), d.domManip(a, b);
          });
        }
        if (
          l &&
          ((i = m.buildFragment(a, this[0].ownerDocument, !1, this)),
          (c = i.firstChild),
          1 === i.childNodes.length && (i = c),
          c)
        ) {
          for (g = m.map(ua(i, "script"), xa), f = g.length; l > j; j++) {
            (d = i),
              j !== o &&
                ((d = m.clone(d, !0, !0)), f && m.merge(g, ua(d, "script"))),
              b.call(this[j], d, j);
          }
          if (f) {
            for (
              h = g[g.length - 1].ownerDocument, m.map(g, ya), j = 0;
              f > j;
              j++
            ) {
              (d = g[j]),
                oa.test(d.type || "") &&
                  !m._data(d, "globalEval") &&
                  m.contains(h, d) &&
                  (d.src
                    ? m._evalUrl && m._evalUrl(d.src)
                    : m.globalEval(
                        (d.text || d.textContent || d.innerHTML || "").replace(
                          qa,
                          ""
                        )
                      ));
            }
          }
          i = c = null;
        }
        return this;
      },
    }),
    m.each(
      {
        appendTo: "append",
        prependTo: "prepend",
        insertBefore: "before",
        insertAfter: "after",
        replaceAll: "replaceWith",
      },
      function (a, b) {
        m.fn[a] = function (a) {
          for (var c, d = 0, e = [], g = m(a), h = g.length - 1; h >= d; d++) {
            (c = d === h ? this : this.clone(!0)),
              m(g[d])[b](c),
              f.apply(e, c.get());
          }
          return this.pushStack(e);
        };
      }
    );
  var Ca,
    Da = {};
  function Ea(b, c) {
    var d,
      e = m(c.createElement(b)).appendTo(c.body),
      f =
        a.getDefaultComputedStyle && (d = a.getDefaultComputedStyle(e[0]))
          ? d.display
          : m.css(e[0], "display");
    return e.detach(), f;
  }
  function Fa(a) {
    var b = y,
      c = Da[a];
    return (
      c ||
        ((c = Ea(a, b)),
        ("none" !== c && c) ||
          ((Ca = (
            Ca || m("<iframe frameborder='0' width='0' height='0'/>")
          ).appendTo(b.documentElement)),
          (b = (Ca[0].contentWindow || Ca[0].contentDocument).document),
          b.write(),
          b.close(),
          (c = Ea(a, b)),
          Ca.detach()),
        (Da[a] = c)),
      c
    );
  }
  !(function () {
    var a;
    k.shrinkWrapBlocks = function () {
      if (null != a) {
        return a;
      }
      a = !1;
      var b, c, d;
      return (
        (c = y.getElementsByTagName("body")[0]),
        c && c.style
          ? ((b = y.createElement("div")),
            (d = y.createElement("div")),
            (d.style.cssText =
              "position:absolute;border:0;width:0;height:0;top:0;left:-9999px"),
            c.appendChild(d).appendChild(b),
            typeof b.style.zoom !== K &&
              ((b.style.cssText =
                "-webkit-box-sizing:content-box;-moz-box-sizing:content-box;box-sizing:content-box;display:block;margin:0;border:0;padding:1px;width:1px;zoom:1"),
              (b.appendChild(y.createElement("div")).style.width = "5px"),
              (a = 3 !== b.offsetWidth)),
            c.removeChild(d),
            a)
          : void 0
      );
    };
  })();
  var Ga = /^margin/,
    Ha = new RegExp("^(" + S + ")(?!px)[a-z%]+$", "i"),
    Ia,
    Ja,
    Ka = /^(top|right|bottom|left)$/;
  a.getComputedStyle
    ? ((Ia = function (b) {
        return b.ownerDocument.defaultView.opener
          ? b.ownerDocument.defaultView.getComputedStyle(b, null)
          : a.getComputedStyle(b, null);
      }),
      (Ja = function (a, b, c) {
        var d,
          e,
          f,
          g,
          h = a.style;
        return (
          (c = c || Ia(a)),
          (g = c ? c.getPropertyValue(b) || c[b] : void 0),
          c &&
            ("" !== g || m.contains(a.ownerDocument, a) || (g = m.style(a, b)),
            Ha.test(g) &&
              Ga.test(b) &&
              ((d = h.width),
              (e = h.minWidth),
              (f = h.maxWidth),
              (h.minWidth = h.maxWidth = h.width = g),
              (g = c.width),
              (h.width = d),
              (h.minWidth = e),
              (h.maxWidth = f))),
          void 0 === g ? g : g + ""
        );
      }))
    : y.documentElement.currentStyle &&
      ((Ia = function (a) {
        return a.currentStyle;
      }),
      (Ja = function (a, b, c) {
        var d,
          e,
          f,
          g,
          h = a.style;
        return (
          (c = c || Ia(a)),
          (g = c ? c[b] : void 0),
          null == g && h && h[b] && (g = h[b]),
          Ha.test(g) &&
            !Ka.test(b) &&
            ((d = h.left),
            (e = a.runtimeStyle),
            (f = e && e.left),
            f && (e.left = a.currentStyle.left),
            (h.left = "fontSize" === b ? "1em" : g),
            (g = h.pixelLeft + "px"),
            (h.left = d),
            f && (e.left = f)),
          void 0 === g ? g : g + "" || "auto"
        );
      }));
  function La(a, b) {
    return {
      get: function () {
        var c = a();
        if (null != c) {
          return c
            ? void delete this.get
            : (this.get = b).apply(this, arguments);
        }
      },
    };
  }
  !(function () {
    var b, c, d, e, f, g, h;
    if (
      ((b = y.createElement("div")),
      (b.innerHTML =
        "  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>"),
      (d = b.getElementsByTagName("a")[0]),
      (c = d && d.style))
    ) {
      (c.cssText = "float:left;opacity:.5"),
        (k.opacity = "0.5" === c.opacity),
        (k.cssFloat = !!c.cssFloat),
        (b.style.backgroundClip = "content-box"),
        (b.cloneNode(!0).style.backgroundClip = ""),
        (k.clearCloneStyle = "content-box" === b.style.backgroundClip),
        (k.boxSizing =
          "" === c.boxSizing ||
          "" === c.MozBoxSizing ||
          "" === c.WebkitBoxSizing),
        m.extend(k, {
          reliableHiddenOffsets: function () {
            return null == g && i(), g;
          },
          boxSizingReliable: function () {
            return null == f && i(), f;
          },
          pixelPosition: function () {
            return null == e && i(), e;
          },
          reliableMarginRight: function () {
            return null == h && i(), h;
          },
        });
      function i() {
        var b, c, d, i;
        (c = y.getElementsByTagName("body")[0]),
          c &&
            c.style &&
            ((b = y.createElement("div")),
            (d = y.createElement("div")),
            (d.style.cssText =
              "position:absolute;border:0;width:0;height:0;top:0;left:-9999px"),
            c.appendChild(d).appendChild(b),
            (b.style.cssText =
              "-webkit-box-sizing:border-box;-moz-box-sizing:border-box;box-sizing:border-box;display:block;margin-top:1%;top:1%;border:1px;padding:1px;width:4px;position:absolute"),
            (e = f = !1),
            (h = !0),
            a.getComputedStyle &&
              ((e = "1%" !== (a.getComputedStyle(b, null) || {}).top),
              (f =
                "4px" ===
                (a.getComputedStyle(b, null) || { width: "4px" }).width),
              (i = b.appendChild(y.createElement("div"))),
              (i.style.cssText = b.style.cssText =
                "-webkit-box-sizing:content-box;-moz-box-sizing:content-box;box-sizing:content-box;display:block;margin:0;border:0;padding:0"),
              (i.style.marginRight = i.style.width = "0"),
              (b.style.width = "1px"),
              (h = !parseFloat(
                (a.getComputedStyle(i, null) || {}).marginRight
              )),
              b.removeChild(i)),
            (b.innerHTML = "<table><tr><td></td><td>t</td></tr></table>"),
            (i = b.getElementsByTagName("td")),
            (i[0].style.cssText = "margin:0;border:0;padding:0;display:none"),
            (g = 0 === i[0].offsetHeight),
            g &&
              ((i[0].style.display = ""),
              (i[1].style.display = "none"),
              (g = 0 === i[0].offsetHeight)),
            c.removeChild(d));
      }
    }
  })(),
    (m.swap = function (a, b, c, d) {
      var e,
        f,
        g = {};
      for (f in b) {
        (g[f] = a.style[f]), (a.style[f] = b[f]);
      }
      e = c.apply(a, d || []);
      for (f in b) {
        a.style[f] = g[f];
      }
      return e;
    });
  var Ma = /alpha\([^)]*\)/i,
    Na = /opacity\s*=\s*([^)]*)/,
    Oa = /^(none|table(?!-c[ea]).+)/,
    Pa = new RegExp("^(" + S + ")(.*)$", "i"),
    Qa = new RegExp("^([+-])=(" + S + ")", "i"),
    Ra = { position: "absolute", visibility: "hidden", display: "block" },
    Sa = { letterSpacing: "0", fontWeight: "400" },
    Ta = ["Webkit", "O", "Moz", "ms"];
  function Ua(a, b) {
    if (b in a) {
      return b;
    }
    var c = b.charAt(0).toUpperCase() + b.slice(1),
      d = b,
      e = Ta.length;
    while (e--) {
      if (((b = Ta[e] + c), b in a)) {
        return b;
      }
    }
    return d;
  }
  function Va(a, b) {
    for (var c, d, e, f = [], g = 0, h = a.length; h > g; g++) {
      (d = a[g]),
        d.style &&
          ((f[g] = m._data(d, "olddisplay")),
          (c = d.style.display),
          b
            ? (f[g] || "none" !== c || (d.style.display = ""),
              "" === d.style.display &&
                U(d) &&
                (f[g] = m._data(d, "olddisplay", Fa(d.nodeName))))
            : ((e = U(d)),
              ((c && "none" !== c) || !e) &&
                m._data(d, "olddisplay", e ? c : m.css(d, "display"))));
    }
    for (g = 0; h > g; g++) {
      (d = a[g]),
        d.style &&
          ((b && "none" !== d.style.display && "" !== d.style.display) ||
            (d.style.display = b ? f[g] || "" : "none"));
    }
    return a;
  }
  function Wa(a, b, c) {
    var d = Pa.exec(b);
    return d ? Math.max(0, d[1] - (c || 0)) + (d[2] || "px") : b;
  }
  function Xa(a, b, c, d, e) {
    for (
      var f = c === (d ? "border" : "content") ? 4 : "width" === b ? 1 : 0,
        g = 0;
      4 > f;
      f += 2
    ) {
      "margin" === c && (g += m.css(a, c + T[f], !0, e)),
        d
          ? ("content" === c && (g -= m.css(a, "padding" + T[f], !0, e)),
            "margin" !== c && (g -= m.css(a, "border" + T[f] + "Width", !0, e)))
          : ((g += m.css(a, "padding" + T[f], !0, e)),
            "padding" !== c &&
              (g += m.css(a, "border" + T[f] + "Width", !0, e)));
    }
    return g;
  }
  function Ya(a, b, c) {
    var d = !0,
      e = "width" === b ? a.offsetWidth : a.offsetHeight,
      f = Ia(a),
      g = k.boxSizing && "border-box" === m.css(a, "boxSizing", !1, f);
    if (0 >= e || null == e) {
      if (
        ((e = Ja(a, b, f)),
        (0 > e || null == e) && (e = a.style[b]),
        Ha.test(e))
      ) {
        return e;
      }
      (d = g && (k.boxSizingReliable() || e === a.style[b])),
        (e = parseFloat(e) || 0);
    }
    return e + Xa(a, b, c || (g ? "border" : "content"), d, f) + "px";
  }
  m.extend({
    cssHooks: {
      opacity: {
        get: function (a, b) {
          if (b) {
            var c = Ja(a, "opacity");
            return "" === c ? "1" : c;
          }
        },
      },
    },
    cssNumber: {
      columnCount: !0,
      fillOpacity: !0,
      flexGrow: !0,
      flexShrink: !0,
      fontWeight: !0,
      lineHeight: !0,
      opacity: !0,
      order: !0,
      orphans: !0,
      widows: !0,
      zIndex: !0,
      zoom: !0,
    },
    cssProps: { float: k.cssFloat ? "cssFloat" : "styleFloat" },
    style: function (a, b, c, d) {
      if (a && 3 !== a.nodeType && 8 !== a.nodeType && a.style) {
        var e,
          f,
          g,
          h = m.camelCase(b),
          i = a.style;
        if (
          ((b = m.cssProps[h] || (m.cssProps[h] = Ua(i, h))),
          (g = m.cssHooks[b] || m.cssHooks[h]),
          void 0 === c)
        ) {
          return g && "get" in g && void 0 !== (e = g.get(a, !1, d)) ? e : i[b];
        }
        if (
          ((f = typeof c),
          "string" === f &&
            (e = Qa.exec(c)) &&
            ((c = (e[1] + 1) * e[2] + parseFloat(m.css(a, b))), (f = "number")),
          null != c &&
            c === c &&
            ("number" !== f || m.cssNumber[h] || (c += "px"),
            k.clearCloneStyle ||
              "" !== c ||
              0 !== b.indexOf("background") ||
              (i[b] = "inherit"),
            !(g && "set" in g && void 0 === (c = g.set(a, c, d)))))
        ) {
          try {
            i[b] = c;
          } catch (j) {}
        }
      }
    },
    css: function (a, b, c, d) {
      var e,
        f,
        g,
        h = m.camelCase(b);
      return (
        (b = m.cssProps[h] || (m.cssProps[h] = Ua(a.style, h))),
        (g = m.cssHooks[b] || m.cssHooks[h]),
        g && "get" in g && (f = g.get(a, !0, c)),
        void 0 === f && (f = Ja(a, b, d)),
        "normal" === f && b in Sa && (f = Sa[b]),
        "" === c || c
          ? ((e = parseFloat(f)), c === !0 || m.isNumeric(e) ? e || 0 : f)
          : f
      );
    },
  }),
    m.each(["height", "width"], function (a, b) {
      m.cssHooks[b] = {
        get: function (a, c, d) {
          return c
            ? Oa.test(m.css(a, "display")) && 0 === a.offsetWidth
              ? m.swap(a, Ra, function () {
                  return Ya(a, b, d);
                })
              : Ya(a, b, d)
            : void 0;
        },
        set: function (a, c, d) {
          var e = d && Ia(a);
          return Wa(
            a,
            c,
            d
              ? Xa(
                  a,
                  b,
                  d,
                  k.boxSizing && "border-box" === m.css(a, "boxSizing", !1, e),
                  e
                )
              : 0
          );
        },
      };
    }),
    k.opacity ||
      (m.cssHooks.opacity = {
        get: function (a, b) {
          return Na.test(
            (b && a.currentStyle ? a.currentStyle.filter : a.style.filter) || ""
          )
            ? 0.01 * parseFloat(RegExp.$1) + ""
            : b
            ? "1"
            : "";
        },
        set: function (a, b) {
          var c = a.style,
            d = a.currentStyle,
            e = m.isNumeric(b) ? "alpha(opacity=" + 100 * b + ")" : "",
            f = (d && d.filter) || c.filter || "";
          (c.zoom = 1),
            ((b >= 1 || "" === b) &&
              "" === m.trim(f.replace(Ma, "")) &&
              c.removeAttribute &&
              (c.removeAttribute("filter"), "" === b || (d && !d.filter))) ||
              (c.filter = Ma.test(f) ? f.replace(Ma, e) : f + " " + e);
        },
      }),
    (m.cssHooks.marginRight = La(k.reliableMarginRight, function (a, b) {
      return b
        ? m.swap(a, { display: "inline-block" }, Ja, [a, "marginRight"])
        : void 0;
    })),
    m.each({ margin: "", padding: "", border: "Width" }, function (a, b) {
      (m.cssHooks[a + b] = {
        expand: function (c) {
          for (
            var d = 0, e = {}, f = "string" == typeof c ? c.split(" ") : [c];
            4 > d;
            d++
          ) {
            e[a + T[d] + b] = f[d] || f[d - 2] || f[0];
          }
          return e;
        },
      }),
        Ga.test(a) || (m.cssHooks[a + b].set = Wa);
    }),
    m.fn.extend({
      css: function (a, b) {
        return V(
          this,
          function (a, b, c) {
            var d,
              e,
              f = {},
              g = 0;
            if (m.isArray(b)) {
              for (d = Ia(a), e = b.length; e > g; g++) {
                f[b[g]] = m.css(a, b[g], !1, d);
              }
              return f;
            }
            return void 0 !== c ? m.style(a, b, c) : m.css(a, b);
          },
          a,
          b,
          arguments.length > 1
        );
      },
      show: function () {
        return Va(this, !0);
      },
      hide: function () {
        return Va(this);
      },
      toggle: function (a) {
        return "boolean" == typeof a
          ? a
            ? this.show()
            : this.hide()
          : this.each(function () {
              U(this) ? m(this).show() : m(this).hide();
            });
      },
    });
  function Za(a, b, c, d, e) {
    return new Za.prototype.init(a, b, c, d, e);
  }
  (m.Tween = Za),
    (Za.prototype = {
      constructor: Za,
      init: function (a, b, c, d, e, f) {
        (this.elem = a),
          (this.prop = c),
          (this.easing = e || "swing"),
          (this.options = b),
          (this.start = this.now = this.cur()),
          (this.end = d),
          (this.unit = f || (m.cssNumber[c] ? "" : "px"));
      },
      cur: function () {
        var a = Za.propHooks[this.prop];
        return a && a.get ? a.get(this) : Za.propHooks._default.get(this);
      },
      run: function (a) {
        var b,
          c = Za.propHooks[this.prop];
        return (
          this.options.duration
            ? (this.pos = b =
                m.easing[this.easing](
                  a,
                  this.options.duration * a,
                  0,
                  1,
                  this.options.duration
                ))
            : (this.pos = b = a),
          (this.now = (this.end - this.start) * b + this.start),
          this.options.step &&
            this.options.step.call(this.elem, this.now, this),
          c && c.set ? c.set(this) : Za.propHooks._default.set(this),
          this
        );
      },
    }),
    (Za.prototype.init.prototype = Za.prototype),
    (Za.propHooks = {
      _default: {
        get: function (a) {
          var b;
          return null == a.elem[a.prop] ||
            (a.elem.style && null != a.elem.style[a.prop])
            ? ((b = m.css(a.elem, a.prop, "")), b && "auto" !== b ? b : 0)
            : a.elem[a.prop];
        },
        set: function (a) {
          m.fx.step[a.prop]
            ? m.fx.step[a.prop](a)
            : a.elem.style &&
              (null != a.elem.style[m.cssProps[a.prop]] || m.cssHooks[a.prop])
            ? m.style(a.elem, a.prop, a.now + a.unit)
            : (a.elem[a.prop] = a.now);
        },
      },
    }),
    (Za.propHooks.scrollTop = Za.propHooks.scrollLeft =
      {
        set: function (a) {
          a.elem.nodeType && a.elem.parentNode && (a.elem[a.prop] = a.now);
        },
      }),
    (m.easing = {
      linear: function (a) {
        return a;
      },
      swing: function (a) {
        return 0.5 - Math.cos(a * Math.PI) / 2;
      },
    }),
    (m.fx = Za.prototype.init),
    (m.fx.step = {});
  var $a,
    _a,
    ab = /^(?:toggle|show|hide)$/,
    bb = new RegExp("^(?:([+-])=|)(" + S + ")([a-z%]*)$", "i"),
    cb = /queueHooks$/,
    db = [ib],
    eb = {
      "*": [
        function (a, b) {
          var c = this.createTween(a, b),
            d = c.cur(),
            e = bb.exec(b),
            f = (e && e[3]) || (m.cssNumber[a] ? "" : "px"),
            g =
              (m.cssNumber[a] || ("px" !== f && +d)) &&
              bb.exec(m.css(c.elem, a)),
            h = 1,
            i = 20;
          if (g && g[3] !== f) {
            (f = f || g[3]), (e = e || []), (g = +d || 1);
            do {
              (h = h || ".5"), (g /= h), m.style(c.elem, a, g + f);
            } while (h !== (h = c.cur() / d) && 1 !== h && --i);
          }
          return (
            e &&
              ((g = c.start = +g || +d || 0),
              (c.unit = f),
              (c.end = e[1] ? g + (e[1] + 1) * e[2] : +e[2])),
            c
          );
        },
      ],
    };
  function fb() {
    return (
      setTimeout(function () {
        $a = void 0;
      }),
      ($a = m.now())
    );
  }
  function gb(a, b) {
    var c,
      d = { height: a },
      e = 0;
    for (b = b ? 1 : 0; 4 > e; e += 2 - b) {
      (c = T[e]), (d["margin" + c] = d["padding" + c] = a);
    }
    return b && (d.opacity = d.width = a), d;
  }
  function hb(a, b, c) {
    for (
      var d, e = (eb[b] || []).concat(eb["*"]), f = 0, g = e.length;
      g > f;
      f++
    ) {
      if ((d = e[f].call(c, b, a))) {
        return d;
      }
    }
  }
  function ib(a, b, c) {
    var d,
      e,
      f,
      g,
      h,
      i,
      j,
      l,
      n = this,
      o = {},
      p = a.style,
      q = a.nodeType && U(a),
      r = m._data(a, "fxshow");
    c.queue ||
      ((h = m._queueHooks(a, "fx")),
      null == h.unqueued &&
        ((h.unqueued = 0),
        (i = h.empty.fire),
        (h.empty.fire = function () {
          h.unqueued || i();
        })),
      h.unqueued++,
      n.always(function () {
        n.always(function () {
          h.unqueued--, m.queue(a, "fx").length || h.empty.fire();
        });
      })),
      1 === a.nodeType &&
        ("height" in b || "width" in b) &&
        ((c.overflow = [p.overflow, p.overflowX, p.overflowY]),
        (j = m.css(a, "display")),
        (l = "none" === j ? m._data(a, "olddisplay") || Fa(a.nodeName) : j),
        "inline" === l &&
          "none" === m.css(a, "float") &&
          (k.inlineBlockNeedsLayout && "inline" !== Fa(a.nodeName)
            ? (p.zoom = 1)
            : (p.display = "inline-block"))),
      c.overflow &&
        ((p.overflow = "hidden"),
        k.shrinkWrapBlocks() ||
          n.always(function () {
            (p.overflow = c.overflow[0]),
              (p.overflowX = c.overflow[1]),
              (p.overflowY = c.overflow[2]);
          }));
    for (d in b) {
      if (((e = b[d]), ab.exec(e))) {
        if (
          (delete b[d], (f = f || "toggle" === e), e === (q ? "hide" : "show"))
        ) {
          if ("show" !== e || !r || void 0 === r[d]) {
            continue;
          }
          q = !0;
        }
        o[d] = (r && r[d]) || m.style(a, d);
      } else {
        j = void 0;
      }
    }
    if (m.isEmptyObject(o)) {
      "inline" === ("none" === j ? Fa(a.nodeName) : j) && (p.display = j);
    } else {
      r ? "hidden" in r && (q = r.hidden) : (r = m._data(a, "fxshow", {})),
        f && (r.hidden = !q),
        q
          ? m(a).show()
          : n.done(function () {
              m(a).hide();
            }),
        n.done(function () {
          var b;
          m._removeData(a, "fxshow");
          for (b in o) {
            m.style(a, b, o[b]);
          }
        });
      for (d in o) {
        (g = hb(q ? r[d] : 0, d, n)),
          d in r ||
            ((r[d] = g.start),
            q &&
              ((g.end = g.start),
              (g.start = "width" === d || "height" === d ? 1 : 0)));
      }
    }
  }
  function jb(a, b) {
    var c, d, e, f, g;
    for (c in a) {
      if (
        ((d = m.camelCase(c)),
        (e = b[d]),
        (f = a[c]),
        m.isArray(f) && ((e = f[1]), (f = a[c] = f[0])),
        c !== d && ((a[d] = f), delete a[c]),
        (g = m.cssHooks[d]),
        g && "expand" in g)
      ) {
        (f = g.expand(f)), delete a[d];
        for (c in f) {
          c in a || ((a[c] = f[c]), (b[c] = e));
        }
      } else {
        b[d] = e;
      }
    }
  }
  function kb(a, b, c) {
    var d,
      e,
      f = 0,
      g = db.length,
      h = m.Deferred().always(function () {
        delete i.elem;
      }),
      i = function () {
        if (e) {
          return !1;
        }
        for (
          var b = $a || fb(),
            c = Math.max(0, j.startTime + j.duration - b),
            d = c / j.duration || 0,
            f = 1 - d,
            g = 0,
            i = j.tweens.length;
          i > g;
          g++
        ) {
          j.tweens[g].run(f);
        }
        return (
          h.notifyWith(a, [j, f, c]),
          1 > f && i ? c : (h.resolveWith(a, [j]), !1)
        );
      },
      j = h.promise({
        elem: a,
        props: m.extend({}, b),
        opts: m.extend(!0, { specialEasing: {} }, c),
        originalProperties: b,
        originalOptions: c,
        startTime: $a || fb(),
        duration: c.duration,
        tweens: [],
        createTween: function (b, c) {
          var d = m.Tween(
            a,
            j.opts,
            b,
            c,
            j.opts.specialEasing[b] || j.opts.easing
          );
          return j.tweens.push(d), d;
        },
        stop: function (b) {
          var c = 0,
            d = b ? j.tweens.length : 0;
          if (e) {
            return this;
          }
          for (e = !0; d > c; c++) {
            j.tweens[c].run(1);
          }
          return b ? h.resolveWith(a, [j, b]) : h.rejectWith(a, [j, b]), this;
        },
      }),
      k = j.props;
    for (jb(k, j.opts.specialEasing); g > f; f++) {
      if ((d = db[f].call(j, a, k, j.opts))) {
        return d;
      }
    }
    return (
      m.map(k, hb, j),
      m.isFunction(j.opts.start) && j.opts.start.call(a, j),
      m.fx.timer(m.extend(i, { elem: a, anim: j, queue: j.opts.queue })),
      j
        .progress(j.opts.progress)
        .done(j.opts.done, j.opts.complete)
        .fail(j.opts.fail)
        .always(j.opts.always)
    );
  }
  (m.Animation = m.extend(kb, {
    tweener: function (a, b) {
      m.isFunction(a) ? ((b = a), (a = ["*"])) : (a = a.split(" "));
      for (var c, d = 0, e = a.length; e > d; d++) {
        (c = a[d]), (eb[c] = eb[c] || []), eb[c].unshift(b);
      }
    },
    prefilter: function (a, b) {
      b ? db.unshift(a) : db.push(a);
    },
  })),
    (m.speed = function (a, b, c) {
      var d =
        a && "object" == typeof a
          ? m.extend({}, a)
          : {
              complete: c || (!c && b) || (m.isFunction(a) && a),
              duration: a,
              easing: (c && b) || (b && !m.isFunction(b) && b),
            };
      return (
        (d.duration = m.fx.off
          ? 0
          : "number" == typeof d.duration
          ? d.duration
          : d.duration in m.fx.speeds
          ? m.fx.speeds[d.duration]
          : m.fx.speeds._default),
        (null == d.queue || d.queue === !0) && (d.queue = "fx"),
        (d.old = d.complete),
        (d.complete = function () {
          m.isFunction(d.old) && d.old.call(this),
            d.queue && m.dequeue(this, d.queue);
        }),
        d
      );
    }),
    m.fn.extend({
      fadeTo: function (a, b, c, d) {
        return this.filter(U)
          .css("opacity", 0)
          .show()
          .end()
          .animate({ opacity: b }, a, c, d);
      },
      animate: function (a, b, c, d) {
        var e = m.isEmptyObject(a),
          f = m.speed(b, c, d),
          g = function () {
            var b = kb(this, m.extend({}, a), f);
            (e || m._data(this, "finish")) && b.stop(!0);
          };
        return (
          (g.finish = g),
          e || f.queue === !1 ? this.each(g) : this.queue(f.queue, g)
        );
      },
      stop: function (a, b, c) {
        var d = function (a) {
          var b = a.stop;
          delete a.stop, b(c);
        };
        return (
          "string" != typeof a && ((c = b), (b = a), (a = void 0)),
          b && a !== !1 && this.queue(a || "fx", []),
          this.each(function () {
            var b = !0,
              e = null != a && a + "queueHooks",
              f = m.timers,
              g = m._data(this);
            if (e) {
              g[e] && g[e].stop && d(g[e]);
            } else {
              for (e in g) {
                g[e] && g[e].stop && cb.test(e) && d(g[e]);
              }
            }
            for (e = f.length; e--; ) {
              f[e].elem !== this ||
                (null != a && f[e].queue !== a) ||
                (f[e].anim.stop(c), (b = !1), f.splice(e, 1));
            }
            (b || !c) && m.dequeue(this, a);
          })
        );
      },
      finish: function (a) {
        return (
          a !== !1 && (a = a || "fx"),
          this.each(function () {
            var b,
              c = m._data(this),
              d = c[a + "queue"],
              e = c[a + "queueHooks"],
              f = m.timers,
              g = d ? d.length : 0;
            for (
              c.finish = !0,
                m.queue(this, a, []),
                e && e.stop && e.stop.call(this, !0),
                b = f.length;
              b--;

            ) {
              f[b].elem === this &&
                f[b].queue === a &&
                (f[b].anim.stop(!0), f.splice(b, 1));
            }
            for (b = 0; g > b; b++) {
              d[b] && d[b].finish && d[b].finish.call(this);
            }
            delete c.finish;
          })
        );
      },
    }),
    m.each(["toggle", "show", "hide"], function (a, b) {
      var c = m.fn[b];
      m.fn[b] = function (a, d, e) {
        return null == a || "boolean" == typeof a
          ? c.apply(this, arguments)
          : this.animate(gb(b, !0), a, d, e);
      };
    }),
    m.each(
      {
        slideDown: gb("show"),
        slideUp: gb("hide"),
        slideToggle: gb("toggle"),
        fadeIn: { opacity: "show" },
        fadeOut: { opacity: "hide" },
        fadeToggle: { opacity: "toggle" },
      },
      function (a, b) {
        m.fn[a] = function (a, c, d) {
          return this.animate(b, a, c, d);
        };
      }
    ),
    (m.timers = []),
    (m.fx.tick = function () {
      var a,
        b = m.timers,
        c = 0;
      for ($a = m.now(); c < b.length; c++) {
        (a = b[c]), a() || b[c] !== a || b.splice(c--, 1);
      }
      b.length || m.fx.stop(), ($a = void 0);
    }),
    (m.fx.timer = function (a) {
      m.timers.push(a), a() ? m.fx.start() : m.timers.pop();
    }),
    (m.fx.interval = 13),
    (m.fx.start = function () {
      _a || (_a = setInterval(m.fx.tick, m.fx.interval));
    }),
    (m.fx.stop = function () {
      clearInterval(_a), (_a = null);
    }),
    (m.fx.speeds = { slow: 600, fast: 200, _default: 400 }),
    (m.fn.delay = function (a, b) {
      return (
        (a = m.fx ? m.fx.speeds[a] || a : a),
        (b = b || "fx"),
        this.queue(b, function (b, c) {
          var d = setTimeout(b, a);
          c.stop = function () {
            clearTimeout(d);
          };
        })
      );
    }),
    (function () {
      var a, b, c, d, e;
      (b = y.createElement("div")),
        b.setAttribute("className", "t"),
        (b.innerHTML =
          "  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>"),
        (d = b.getElementsByTagName("a")[0]),
        (c = y.createElement("select")),
        (e = c.appendChild(y.createElement("option"))),
        (a = b.getElementsByTagName("input")[0]),
        (d.style.cssText = "top:1px"),
        (k.getSetAttribute = "t" !== b.className),
        (k.style = /top/.test(d.getAttribute("style"))),
        (k.hrefNormalized = "/a" === d.getAttribute("href")),
        (k.checkOn = !!a.value),
        (k.optSelected = e.selected),
        (k.enctype = !!y.createElement("form").enctype),
        (c.disabled = !0),
        (k.optDisabled = !e.disabled),
        (a = y.createElement("input")),
        a.setAttribute("value", ""),
        (k.input = "" === a.getAttribute("value")),
        (a.value = "t"),
        a.setAttribute("type", "radio"),
        (k.radioValue = "t" === a.value);
    })();
  var lb = /\r/g;
  m.fn.extend({
    val: function (a) {
      var b,
        c,
        d,
        e = this[0];
      if (arguments.length) {
        return (
          (d = m.isFunction(a)),
          this.each(function (c) {
            var e;
            1 === this.nodeType &&
              ((e = d ? a.call(this, c, m(this).val()) : a),
              null == e
                ? (e = "")
                : "number" == typeof e
                ? (e += "")
                : m.isArray(e) &&
                  (e = m.map(e, function (a) {
                    return null == a ? "" : a + "";
                  })),
              (b =
                m.valHooks[this.type] ||
                m.valHooks[this.nodeName.toLowerCase()]),
              (b && "set" in b && void 0 !== b.set(this, e, "value")) ||
                (this.value = e));
          })
        );
      }
      if (e) {
        return (
          (b = m.valHooks[e.type] || m.valHooks[e.nodeName.toLowerCase()]),
          b && "get" in b && void 0 !== (c = b.get(e, "value"))
            ? c
            : ((c = e.value),
              "string" == typeof c ? c.replace(lb, "") : null == c ? "" : c)
        );
      }
    },
  }),
    m.extend({
      valHooks: {
        option: {
          get: function (a) {
            var b = m.find.attr(a, "value");
            return null != b ? b : m.trim(m.text(a));
          },
        },
        select: {
          get: function (a) {
            for (
              var b,
                c,
                d = a.options,
                e = a.selectedIndex,
                f = "select-one" === a.type || 0 > e,
                g = f ? null : [],
                h = f ? e + 1 : d.length,
                i = 0 > e ? h : f ? e : 0;
              h > i;
              i++
            ) {
              if (
                ((c = d[i]),
                !(
                  (!c.selected && i !== e) ||
                  (k.optDisabled
                    ? c.disabled
                    : null !== c.getAttribute("disabled")) ||
                  (c.parentNode.disabled &&
                    m.nodeName(c.parentNode, "optgroup"))
                ))
              ) {
                if (((b = m(c).val()), f)) {
                  return b;
                }
                g.push(b);
              }
            }
            return g;
          },
          set: function (a, b) {
            var c,
              d,
              e = a.options,
              f = m.makeArray(b),
              g = e.length;
            while (g--) {
              if (((d = e[g]), m.inArray(m.valHooks.option.get(d), f) >= 0)) {
                try {
                  d.selected = c = !0;
                } catch (h) {
                  d.scrollHeight;
                }
              } else {
                d.selected = !1;
              }
            }
            return c || (a.selectedIndex = -1), e;
          },
        },
      },
    }),
    m.each(["radio", "checkbox"], function () {
      (m.valHooks[this] = {
        set: function (a, b) {
          return m.isArray(b)
            ? (a.checked = m.inArray(m(a).val(), b) >= 0)
            : void 0;
        },
      }),
        k.checkOn ||
          (m.valHooks[this].get = function (a) {
            return null === a.getAttribute("value") ? "on" : a.value;
          });
    });
  var mb,
    nb,
    ob = m.expr.attrHandle,
    pb = /^(?:checked|selected)$/i,
    qb = k.getSetAttribute,
    rb = k.input;
  m.fn.extend({
    attr: function (a, b) {
      return V(this, m.attr, a, b, arguments.length > 1);
    },
    removeAttr: function (a) {
      return this.each(function () {
        m.removeAttr(this, a);
      });
    },
  }),
    m.extend({
      attr: function (a, b, c) {
        var d,
          e,
          f = a.nodeType;
        if (a && 3 !== f && 8 !== f && 2 !== f) {
          return typeof a.getAttribute === K
            ? m.prop(a, b, c)
            : ((1 === f && m.isXMLDoc(a)) ||
                ((b = b.toLowerCase()),
                (d = m.attrHooks[b] || (m.expr.match.bool.test(b) ? nb : mb))),
              void 0 === c
                ? d && "get" in d && null !== (e = d.get(a, b))
                  ? e
                  : ((e = m.find.attr(a, b)), null == e ? void 0 : e)
                : null !== c
                ? d && "set" in d && void 0 !== (e = d.set(a, c, b))
                  ? e
                  : (a.setAttribute(b, c + ""), c)
                : void m.removeAttr(a, b));
        }
      },
      removeAttr: function (a, b) {
        var c,
          d,
          e = 0,
          f = b && b.match(E);
        if (f && 1 === a.nodeType) {
          while ((c = f[e++])) {
            (d = m.propFix[c] || c),
              m.expr.match.bool.test(c)
                ? (rb && qb) || !pb.test(c)
                  ? (a[d] = !1)
                  : (a[m.camelCase("default-" + c)] = a[d] = !1)
                : m.attr(a, c, ""),
              a.removeAttribute(qb ? c : d);
          }
        }
      },
      attrHooks: {
        type: {
          set: function (a, b) {
            if (!k.radioValue && "radio" === b && m.nodeName(a, "input")) {
              var c = a.value;
              return a.setAttribute("type", b), c && (a.value = c), b;
            }
          },
        },
      },
    }),
    (nb = {
      set: function (a, b, c) {
        return (
          b === !1
            ? m.removeAttr(a, c)
            : (rb && qb) || !pb.test(c)
            ? a.setAttribute((!qb && m.propFix[c]) || c, c)
            : (a[m.camelCase("default-" + c)] = a[c] = !0),
          c
        );
      },
    }),
    m.each(m.expr.match.bool.source.match(/\w+/g), function (a, b) {
      var c = ob[b] || m.find.attr;
      ob[b] =
        (rb && qb) || !pb.test(b)
          ? function (a, b, d) {
              var e, f;
              return (
                d ||
                  ((f = ob[b]),
                  (ob[b] = e),
                  (e = null != c(a, b, d) ? b.toLowerCase() : null),
                  (ob[b] = f)),
                e
              );
            }
          : function (a, b, c) {
              return c
                ? void 0
                : a[m.camelCase("default-" + b)]
                ? b.toLowerCase()
                : null;
            };
    }),
    (rb && qb) ||
      (m.attrHooks.value = {
        set: function (a, b, c) {
          return m.nodeName(a, "input")
            ? void (a.defaultValue = b)
            : mb && mb.set(a, b, c);
        },
      }),
    qb ||
      ((mb = {
        set: function (a, b, c) {
          var d = a.getAttributeNode(c);
          return (
            d || a.setAttributeNode((d = a.ownerDocument.createAttribute(c))),
            (d.value = b += ""),
            "value" === c || b === a.getAttribute(c) ? b : void 0
          );
        },
      }),
      (ob.id =
        ob.name =
        ob.coords =
          function (a, b, c) {
            var d;
            return c
              ? void 0
              : (d = a.getAttributeNode(b)) && "" !== d.value
              ? d.value
              : null;
          }),
      (m.valHooks.button = {
        get: function (a, b) {
          var c = a.getAttributeNode(b);
          return c && c.specified ? c.value : void 0;
        },
        set: mb.set,
      }),
      (m.attrHooks.contenteditable = {
        set: function (a, b, c) {
          mb.set(a, "" === b ? !1 : b, c);
        },
      }),
      m.each(["width", "height"], function (a, b) {
        m.attrHooks[b] = {
          set: function (a, c) {
            return "" === c ? (a.setAttribute(b, "auto"), c) : void 0;
          },
        };
      })),
    k.style ||
      (m.attrHooks.style = {
        get: function (a) {
          return a.style.cssText || void 0;
        },
        set: function (a, b) {
          return (a.style.cssText = b + "");
        },
      });
  var sb = /^(?:input|select|textarea|button|object)$/i,
    tb = /^(?:a|area)$/i;
  m.fn.extend({
    prop: function (a, b) {
      return V(this, m.prop, a, b, arguments.length > 1);
    },
    removeProp: function (a) {
      return (
        (a = m.propFix[a] || a),
        this.each(function () {
          try {
            (this[a] = void 0), delete this[a];
          } catch (b) {}
        })
      );
    },
  }),
    m.extend({
      propFix: { for: "htmlFor", class: "className" },
      prop: function (a, b, c) {
        var d,
          e,
          f,
          g = a.nodeType;
        if (a && 3 !== g && 8 !== g && 2 !== g) {
          return (
            (f = 1 !== g || !m.isXMLDoc(a)),
            f && ((b = m.propFix[b] || b), (e = m.propHooks[b])),
            void 0 !== c
              ? e && "set" in e && void 0 !== (d = e.set(a, c, b))
                ? d
                : (a[b] = c)
              : e && "get" in e && null !== (d = e.get(a, b))
              ? d
              : a[b]
          );
        }
      },
      propHooks: {
        tabIndex: {
          get: function (a) {
            var b = m.find.attr(a, "tabindex");
            return b
              ? parseInt(b, 10)
              : sb.test(a.nodeName) || (tb.test(a.nodeName) && a.href)
              ? 0
              : -1;
          },
        },
      },
    }),
    k.hrefNormalized ||
      m.each(["href", "src"], function (a, b) {
        m.propHooks[b] = {
          get: function (a) {
            return a.getAttribute(b, 4);
          },
        };
      }),
    k.optSelected ||
      (m.propHooks.selected = {
        get: function (a) {
          var b = a.parentNode;
          return (
            b && (b.selectedIndex, b.parentNode && b.parentNode.selectedIndex),
            null
          );
        },
      }),
    m.each(
      [
        "tabIndex",
        "readOnly",
        "maxLength",
        "cellSpacing",
        "cellPadding",
        "rowSpan",
        "colSpan",
        "useMap",
        "frameBorder",
        "contentEditable",
      ],
      function () {
        m.propFix[this.toLowerCase()] = this;
      }
    ),
    k.enctype || (m.propFix.enctype = "encoding");
  var ub = /[\t\r\n\f]/g;
  m.fn.extend({
    addClass: function (a) {
      var b,
        c,
        d,
        e,
        f,
        g,
        h = 0,
        i = this.length,
        j = "string" == typeof a && a;
      if (m.isFunction(a)) {
        return this.each(function (b) {
          m(this).addClass(a.call(this, b, this.className));
        });
      }
      if (j) {
        for (b = (a || "").match(E) || []; i > h; h++) {
          if (
            ((c = this[h]),
            (d =
              1 === c.nodeType &&
              (c.className ? (" " + c.className + " ").replace(ub, " ") : " ")))
          ) {
            f = 0;
            while ((e = b[f++])) {
              d.indexOf(" " + e + " ") < 0 && (d += e + " ");
            }
            (g = m.trim(d)), c.className !== g && (c.className = g);
          }
        }
      }
      return this;
    },
    removeClass: function (a) {
      var b,
        c,
        d,
        e,
        f,
        g,
        h = 0,
        i = this.length,
        j = 0 === arguments.length || ("string" == typeof a && a);
      if (m.isFunction(a)) {
        return this.each(function (b) {
          m(this).removeClass(a.call(this, b, this.className));
        });
      }
      if (j) {
        for (b = (a || "").match(E) || []; i > h; h++) {
          if (
            ((c = this[h]),
            (d =
              1 === c.nodeType &&
              (c.className ? (" " + c.className + " ").replace(ub, " ") : "")))
          ) {
            f = 0;
            while ((e = b[f++])) {
              while (d.indexOf(" " + e + " ") >= 0) {
                d = d.replace(" " + e + " ", " ");
              }
            }
            (g = a ? m.trim(d) : ""), c.className !== g && (c.className = g);
          }
        }
      }
      return this;
    },
    toggleClass: function (a, b) {
      var c = typeof a;
      return "boolean" == typeof b && "string" === c
        ? b
          ? this.addClass(a)
          : this.removeClass(a)
        : this.each(
            m.isFunction(a)
              ? function (c) {
                  m(this).toggleClass(a.call(this, c, this.className, b), b);
                }
              : function () {
                  if ("string" === c) {
                    var b,
                      d = 0,
                      e = m(this),
                      f = a.match(E) || [];
                    while ((b = f[d++])) {
                      e.hasClass(b) ? e.removeClass(b) : e.addClass(b);
                    }
                  } else {
                    (c === K || "boolean" === c) &&
                      (this.className &&
                        m._data(this, "__className__", this.className),
                      (this.className =
                        this.className || a === !1
                          ? ""
                          : m._data(this, "__className__") || ""));
                  }
                }
          );
    },
    hasClass: function (a) {
      for (var b = " " + a + " ", c = 0, d = this.length; d > c; c++) {
        if (
          1 === this[c].nodeType &&
          (" " + this[c].className + " ").replace(ub, " ").indexOf(b) >= 0
        ) {
          return !0;
        }
      }
      return !1;
    },
  }),
    m.each(
      "blur focus focusin focusout load resize scroll unload click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup error contextmenu".split(
        " "
      ),
      function (a, b) {
        m.fn[b] = function (a, c) {
          return arguments.length > 0
            ? this.on(b, null, a, c)
            : this.trigger(b);
        };
      }
    ),
    m.fn.extend({
      hover: function (a, b) {
        return this.mouseenter(a).mouseleave(b || a);
      },
      bind: function (a, b, c) {
        return this.on(a, null, b, c);
      },
      unbind: function (a, b) {
        return this.off(a, null, b);
      },
      delegate: function (a, b, c, d) {
        return this.on(b, a, c, d);
      },
      undelegate: function (a, b, c) {
        return 1 === arguments.length
          ? this.off(a, "**")
          : this.off(b, a || "**", c);
      },
    });
  var vb = m.now(),
    wb = /\?/,
    xb =
      /(,)|(\[|{)|(}|])|"(?:[^"\\\r\n]|\\["\\\/bfnrt]|\\u[\da-fA-F]{4})*"\s*:?|true|false|null|-?(?!0\d)\d+(?:\.\d+|)(?:[eE][+-]?\d+|)/g;
  (m.parseJSON = function (b) {
    if (a.JSON && a.JSON.parse) {
      return a.JSON.parse(b + "");
    }
    var c,
      d = null,
      e = m.trim(b + "");
    return e &&
      !m.trim(
        e.replace(xb, function (a, b, e, f) {
          return (
            c && b && (d = 0), 0 === d ? a : ((c = e || b), (d += !f - !e), "")
          );
        })
      )
      ? Function("return " + e)()
      : m.error("Invalid JSON: " + b);
  }),
    (m.parseXML = function (b) {
      var c, d;
      if (!b || "string" != typeof b) {
        return null;
      }
      try {
        a.DOMParser
          ? ((d = new DOMParser()), (c = d.parseFromString(b, "text/xml")))
          : ((c = new ActiveXObject("Microsoft.XMLDOM")),
            (c.async = "false"),
            c.loadXML(b));
      } catch (e) {
        c = void 0;
      }
      return (
        (c &&
          c.documentElement &&
          !c.getElementsByTagName("parsererror").length) ||
          m.error("Invalid XML: " + b),
        c
      );
    });
  var yb,
    zb,
    Ab = /#.*$/,
    Bb = /([?&])_=[^&]*/,
    Cb = /^(.*?):[ \t]*([^\r\n]*)\r?$/gm,
    Db = /^(?:about|app|app-storage|.+-extension|file|res|widget):$/,
    Eb = /^(?:GET|HEAD)$/,
    Fb = /^\/\//,
    Gb = /^([\w.+-]+:)(?:\/\/(?:[^\/?#]*@|)([^\/?#:]*)(?::(\d+)|)|)/,
    Hb = {},
    Ib = {},
    Jb = "*/".concat("*");
  try {
    zb = location.href;
  } catch (Kb) {
    (zb = y.createElement("a")), (zb.href = ""), (zb = zb.href);
  }
  yb = Gb.exec(zb.toLowerCase()) || [];
  function Lb(a) {
    return function (b, c) {
      "string" != typeof b && ((c = b), (b = "*"));
      var d,
        e = 0,
        f = b.toLowerCase().match(E) || [];
      if (m.isFunction(c)) {
        while ((d = f[e++])) {
          "+" === d.charAt(0)
            ? ((d = d.slice(1) || "*"), (a[d] = a[d] || []).unshift(c))
            : (a[d] = a[d] || []).push(c);
        }
      }
    };
  }
  function Mb(a, b, c, d) {
    var e = {},
      f = a === Ib;
    function g(h) {
      var i;
      return (
        (e[h] = !0),
        m.each(a[h] || [], function (a, h) {
          var j = h(b, c, d);
          return "string" != typeof j || f || e[j]
            ? f
              ? !(i = j)
              : void 0
            : (b.dataTypes.unshift(j), g(j), !1);
        }),
        i
      );
    }
    return g(b.dataTypes[0]) || (!e["*"] && g("*"));
  }
  function Nb(a, b) {
    var c,
      d,
      e = m.ajaxSettings.flatOptions || {};
    for (d in b) {
      void 0 !== b[d] && ((e[d] ? a : c || (c = {}))[d] = b[d]);
    }
    return c && m.extend(!0, a, c), a;
  }
  function Ob(a, b, c) {
    var d,
      e,
      f,
      g,
      h = a.contents,
      i = a.dataTypes;
    while ("*" === i[0]) {
      i.shift(),
        void 0 === e && (e = a.mimeType || b.getResponseHeader("Content-Type"));
    }
    if (e) {
      for (g in h) {
        if (h[g] && h[g].test(e)) {
          i.unshift(g);
          break;
        }
      }
    }
    if (i[0] in c) {
      f = i[0];
    } else {
      for (g in c) {
        if (!i[0] || a.converters[g + " " + i[0]]) {
          f = g;
          break;
        }
        d || (d = g);
      }
      f = f || d;
    }
    return f ? (f !== i[0] && i.unshift(f), c[f]) : void 0;
  }
  function Pb(a, b, c, d) {
    var e,
      f,
      g,
      h,
      i,
      j = {},
      k = a.dataTypes.slice();
    if (k[1]) {
      for (g in a.converters) {
        j[g.toLowerCase()] = a.converters[g];
      }
    }
    f = k.shift();
    while (f) {
      if (
        (a.responseFields[f] && (c[a.responseFields[f]] = b),
        !i && d && a.dataFilter && (b = a.dataFilter(b, a.dataType)),
        (i = f),
        (f = k.shift()))
      ) {
        if ("*" === f) {
          f = i;
        } else {
          if ("*" !== i && i !== f) {
            if (((g = j[i + " " + f] || j["* " + f]), !g)) {
              for (e in j) {
                if (
                  ((h = e.split(" ")),
                  h[1] === f && (g = j[i + " " + h[0]] || j["* " + h[0]]))
                ) {
                  g === !0
                    ? (g = j[e])
                    : j[e] !== !0 && ((f = h[0]), k.unshift(h[1]));
                  break;
                }
              }
            }
            if (g !== !0) {
              if (g && a["throws"]) {
                b = g(b);
              } else {
                try {
                  b = g(b);
                } catch (l) {
                  return {
                    state: "parsererror",
                    error: g ? l : "No conversion from " + i + " to " + f,
                  };
                }
              }
            }
          }
        }
      }
    }
    return { state: "success", data: b };
  }
  m.extend({
    active: 0,
    lastModified: {},
    etag: {},
    ajaxSettings: {
      url: zb,
      type: "GET",
      isLocal: Db.test(yb[1]),
      global: !0,
      processData: !0,
      async: !0,
      contentType: "application/x-www-form-urlencoded; charset=UTF-8",
      accepts: {
        "*": Jb,
        text: "text/plain",
        html: "text/html",
        xml: "application/xml, text/xml",
        json: "application/json, text/javascript",
      },
      contents: { xml: /xml/, html: /html/, json: /json/ },
      responseFields: {
        xml: "responseXML",
        text: "responseText",
        json: "responseJSON",
      },
      converters: {
        "* text": String,
        "text html": !0,
        "text json": m.parseJSON,
        "text xml": m.parseXML,
      },
      flatOptions: { url: !0, context: !0 },
    },
    ajaxSetup: function (a, b) {
      return b ? Nb(Nb(a, m.ajaxSettings), b) : Nb(m.ajaxSettings, a);
    },
    ajaxPrefilter: Lb(Hb),
    ajaxTransport: Lb(Ib),
    ajax: function (a, b) {
      "object" == typeof a && ((b = a), (a = void 0)), (b = b || {});
      var c,
        d,
        e,
        f,
        g,
        h,
        i,
        j,
        k = m.ajaxSetup({}, b),
        l = k.context || k,
        n = k.context && (l.nodeType || l.jquery) ? m(l) : m.event,
        o = m.Deferred(),
        p = m.Callbacks("once memory"),
        q = k.statusCode || {},
        r = {},
        s = {},
        t = 0,
        u = "canceled",
        v = {
          readyState: 0,
          getResponseHeader: function (a) {
            var b;
            if (2 === t) {
              if (!j) {
                j = {};
                while ((b = Cb.exec(f))) {
                  j[b[1].toLowerCase()] = b[2];
                }
              }
              b = j[a.toLowerCase()];
            }
            return null == b ? null : b;
          },
          getAllResponseHeaders: function () {
            return 2 === t ? f : null;
          },
          setRequestHeader: function (a, b) {
            var c = a.toLowerCase();
            return t || ((a = s[c] = s[c] || a), (r[a] = b)), this;
          },
          overrideMimeType: function (a) {
            return t || (k.mimeType = a), this;
          },
          statusCode: function (a) {
            var b;
            if (a) {
              if (2 > t) {
                for (b in a) {
                  q[b] = [q[b], a[b]];
                }
              } else {
                v.always(a[v.status]);
              }
            }
            return this;
          },
          abort: function (a) {
            var b = a || u;
            return i && i.abort(b), x(0, b), this;
          },
        };
      if (
        ((o.promise(v).complete = p.add),
        (v.success = v.done),
        (v.error = v.fail),
        (k.url = ((a || k.url || zb) + "")
          .replace(Ab, "")
          .replace(Fb, yb[1] + "//")),
        (k.type = b.method || b.type || k.method || k.type),
        (k.dataTypes = m
          .trim(k.dataType || "*")
          .toLowerCase()
          .match(E) || [""]),
        null == k.crossDomain &&
          ((c = Gb.exec(k.url.toLowerCase())),
          (k.crossDomain = !(
            !c ||
            (c[1] === yb[1] &&
              c[2] === yb[2] &&
              (c[3] || ("http:" === c[1] ? "80" : "443")) ===
                (yb[3] || ("http:" === yb[1] ? "80" : "443")))
          ))),
        k.data &&
          k.processData &&
          "string" != typeof k.data &&
          (k.data = m.param(k.data, k.traditional)),
        Mb(Hb, k, b, v),
        2 === t)
      ) {
        return v;
      }
      (h = m.event && k.global),
        h && 0 === m.active++ && m.event.trigger("ajaxStart"),
        (k.type = k.type.toUpperCase()),
        (k.hasContent = !Eb.test(k.type)),
        (e = k.url),
        k.hasContent ||
          (k.data &&
            ((e = k.url += (wb.test(e) ? "&" : "?") + k.data), delete k.data),
          k.cache === !1 &&
            (k.url = Bb.test(e)
              ? e.replace(Bb, "$1_=" + vb++)
              : e + (wb.test(e) ? "&" : "?") + "_=" + vb++)),
        k.ifModified &&
          (m.lastModified[e] &&
            v.setRequestHeader("If-Modified-Since", m.lastModified[e]),
          m.etag[e] && v.setRequestHeader("If-None-Match", m.etag[e])),
        ((k.data && k.hasContent && k.contentType !== !1) || b.contentType) &&
          v.setRequestHeader("Content-Type", k.contentType),
        v.setRequestHeader(
          "Accept",
          k.dataTypes[0] && k.accepts[k.dataTypes[0]]
            ? k.accepts[k.dataTypes[0]] +
                ("*" !== k.dataTypes[0] ? ", " + Jb + "; q=0.01" : "")
            : k.accepts["*"]
        );
      for (d in k.headers) {
        v.setRequestHeader(d, k.headers[d]);
      }
      if (k.beforeSend && (k.beforeSend.call(l, v, k) === !1 || 2 === t)) {
        return v.abort();
      }
      u = "abort";
      for (d in { success: 1, error: 1, complete: 1 }) {
        v[d](k[d]);
      }
      if ((i = Mb(Ib, k, b, v))) {
        (v.readyState = 1),
          h && n.trigger("ajaxSend", [v, k]),
          k.async &&
            k.timeout > 0 &&
            (g = setTimeout(function () {
              v.abort("timeout");
            }, k.timeout));
        try {
          (t = 1), i.send(r, x);
        } catch (w) {
          if (!(2 > t)) {
            throw w;
          }
          x(-1, w);
        }
      } else {
        x(-1, "No Transport");
      }
      function x(a, b, c, d) {
        var j,
          r,
          s,
          u,
          w,
          x = b;
        2 !== t &&
          ((t = 2),
          g && clearTimeout(g),
          (i = void 0),
          (f = d || ""),
          (v.readyState = a > 0 ? 4 : 0),
          (j = (a >= 200 && 300 > a) || 304 === a),
          c && (u = Ob(k, v, c)),
          (u = Pb(k, u, v, j)),
          j
            ? (k.ifModified &&
                ((w = v.getResponseHeader("Last-Modified")),
                w && (m.lastModified[e] = w),
                (w = v.getResponseHeader("etag")),
                w && (m.etag[e] = w)),
              204 === a || "HEAD" === k.type
                ? (x = "nocontent")
                : 304 === a
                ? (x = "notmodified")
                : ((x = u.state), (r = u.data), (s = u.error), (j = !s)))
            : ((s = x), (a || !x) && ((x = "error"), 0 > a && (a = 0))),
          (v.status = a),
          (v.statusText = (b || x) + ""),
          j ? o.resolveWith(l, [r, x, v]) : o.rejectWith(l, [v, x, s]),
          v.statusCode(q),
          (q = void 0),
          h && n.trigger(j ? "ajaxSuccess" : "ajaxError", [v, k, j ? r : s]),
          p.fireWith(l, [v, x]),
          h &&
            (n.trigger("ajaxComplete", [v, k]),
            --m.active || m.event.trigger("ajaxStop")));
      }
      return v;
    },
    getJSON: function (a, b, c) {
      return m.get(a, b, c, "json");
    },
    getScript: function (a, b) {
      return m.get(a, void 0, b, "script");
    },
  }),
    m.each(["get", "post"], function (a, b) {
      m[b] = function (a, c, d, e) {
        return (
          m.isFunction(c) && ((e = e || d), (d = c), (c = void 0)),
          m.ajax({ url: a, type: b, dataType: e, data: c, success: d })
        );
      };
    }),
    (m._evalUrl = function (a) {
      return m.ajax({
        url: a,
        type: "GET",
        dataType: "script",
        async: !1,
        global: !1,
        throws: !0,
      });
    }),
    m.fn.extend({
      wrapAll: function (a) {
        if (m.isFunction(a)) {
          return this.each(function (b) {
            m(this).wrapAll(a.call(this, b));
          });
        }
        if (this[0]) {
          var b = m(a, this[0].ownerDocument).eq(0).clone(!0);
          this[0].parentNode && b.insertBefore(this[0]),
            b
              .map(function () {
                var a = this;
                while (a.firstChild && 1 === a.firstChild.nodeType) {
                  a = a.firstChild;
                }
                return a;
              })
              .append(this);
        }
        return this;
      },
      wrapInner: function (a) {
        return this.each(
          m.isFunction(a)
            ? function (b) {
                m(this).wrapInner(a.call(this, b));
              }
            : function () {
                var b = m(this),
                  c = b.contents();
                c.length ? c.wrapAll(a) : b.append(a);
              }
        );
      },
      wrap: function (a) {
        var b = m.isFunction(a);
        return this.each(function (c) {
          m(this).wrapAll(b ? a.call(this, c) : a);
        });
      },
      unwrap: function () {
        return this.parent()
          .each(function () {
            m.nodeName(this, "body") || m(this).replaceWith(this.childNodes);
          })
          .end();
      },
    }),
    (m.expr.filters.hidden = function (a) {
      return (
        (a.offsetWidth <= 0 && a.offsetHeight <= 0) ||
        (!k.reliableHiddenOffsets() &&
          "none" === ((a.style && a.style.display) || m.css(a, "display")))
      );
    }),
    (m.expr.filters.visible = function (a) {
      return !m.expr.filters.hidden(a);
    });
  var Qb = /%20/g,
    Rb = /\[\]$/,
    Sb = /\r?\n/g,
    Tb = /^(?:submit|button|image|reset|file)$/i,
    Ub = /^(?:input|select|textarea|keygen)/i;
  function Vb(a, b, c, d) {
    var e;
    if (m.isArray(b)) {
      m.each(b, function (b, e) {
        c || Rb.test(a)
          ? d(a, e)
          : Vb(a + "[" + ("object" == typeof e ? b : "") + "]", e, c, d);
      });
    } else {
      if (c || "object" !== m.type(b)) {
        d(a, b);
      } else {
        for (e in b) {
          Vb(a + "[" + e + "]", b[e], c, d);
        }
      }
    }
  }
  (m.param = function (a, b) {
    var c,
      d = [],
      e = function (a, b) {
        (b = m.isFunction(b) ? b() : null == b ? "" : b),
          (d[d.length] = encodeURIComponent(a) + "=" + encodeURIComponent(b));
      };
    if (
      (void 0 === b && (b = m.ajaxSettings && m.ajaxSettings.traditional),
      m.isArray(a) || (a.jquery && !m.isPlainObject(a)))
    ) {
      m.each(a, function () {
        e(this.name, this.value);
      });
    } else {
      for (c in a) {
        Vb(c, a[c], b, e);
      }
    }
    return d.join("&").replace(Qb, "+");
  }),
    m.fn.extend({
      serialize: function () {
        return m.param(this.serializeArray());
      },
      serializeArray: function () {
        return this.map(function () {
          var a = m.prop(this, "elements");
          return a ? m.makeArray(a) : this;
        })
          .filter(function () {
            var a = this.type;
            return (
              this.name &&
              !m(this).is(":disabled") &&
              Ub.test(this.nodeName) &&
              !Tb.test(a) &&
              (this.checked || !W.test(a))
            );
          })
          .map(function (a, b) {
            var c = m(this).val();
            return null == c
              ? null
              : m.isArray(c)
              ? m.map(c, function (a) {
                  return { name: b.name, value: a.replace(Sb, "\r\n") };
                })
              : { name: b.name, value: c.replace(Sb, "\r\n") };
          })
          .get();
      },
    }),
    (m.ajaxSettings.xhr =
      void 0 !== a.ActiveXObject
        ? function () {
            return (
              (!this.isLocal &&
                /^(get|post|head|put|delete|options)$/i.test(this.type) &&
                Zb()) ||
              $b()
            );
          }
        : Zb);
  var Wb = 0,
    Xb = {},
    Yb = m.ajaxSettings.xhr();
  a.attachEvent &&
    a.attachEvent("onunload", function () {
      for (var a in Xb) {
        Xb[a](void 0, !0);
      }
    }),
    (k.cors = !!Yb && "withCredentials" in Yb),
    (Yb = k.ajax = !!Yb),
    Yb &&
      m.ajaxTransport(function (a) {
        if (!a.crossDomain || k.cors) {
          var b;
          return {
            send: function (c, d) {
              var e,
                f = a.xhr(),
                g = ++Wb;
              if (
                (f.open(a.type, a.url, a.async, a.username, a.password),
                a.xhrFields)
              ) {
                for (e in a.xhrFields) {
                  f[e] = a.xhrFields[e];
                }
              }
              a.mimeType &&
                f.overrideMimeType &&
                f.overrideMimeType(a.mimeType),
                a.crossDomain ||
                  c["X-Requested-With"] ||
                  (c["X-Requested-With"] = "XMLHttpRequest");
              for (e in c) {
                void 0 !== c[e] && f.setRequestHeader(e, c[e] + "");
              }
              f.send((a.hasContent && a.data) || null),
                (b = function (c, e) {
                  var h, i, j;
                  if (b && (e || 4 === f.readyState)) {
                    if (
                      (delete Xb[g],
                      (b = void 0),
                      (f.onreadystatechange = m.noop),
                      e)
                    ) {
                      4 !== f.readyState && f.abort();
                    } else {
                      (j = {}),
                        (h = f.status),
                        "string" == typeof f.responseText &&
                          (j.text = f.responseText);
                      try {
                        i = f.statusText;
                      } catch (k) {
                        i = "";
                      }
                      h || !a.isLocal || a.crossDomain
                        ? 1223 === h && (h = 204)
                        : (h = j.text ? 200 : 404);
                    }
                  }
                  j && d(h, i, j, f.getAllResponseHeaders());
                }),
                a.async
                  ? 4 === f.readyState
                    ? setTimeout(b)
                    : (f.onreadystatechange = Xb[g] = b)
                  : b();
            },
            abort: function () {
              b && b(void 0, !0);
            },
          };
        }
      });
  function Zb() {
    try {
      return new a.XMLHttpRequest();
    } catch (b) {}
  }
  function $b() {
    try {
      return new a.ActiveXObject("Microsoft.XMLHTTP");
    } catch (b) {}
  }
  m.ajaxSetup({
    accepts: {
      script:
        "text/javascript, application/javascript, application/ecmascript, application/x-ecmascript",
    },
    contents: { script: /(?:java|ecma)script/ },
    converters: {
      "text script": function (a) {
        return m.globalEval(a), a;
      },
    },
  }),
    m.ajaxPrefilter("script", function (a) {
      void 0 === a.cache && (a.cache = !1),
        a.crossDomain && ((a.type = "GET"), (a.global = !1));
    }),
    m.ajaxTransport("script", function (a) {
      if (a.crossDomain) {
        var b,
          c = y.head || m("head")[0] || y.documentElement;
        return {
          send: function (d, e) {
            (b = y.createElement("script")),
              (b.async = !0),
              a.scriptCharset && (b.charset = a.scriptCharset),
              (b.src = a.url),
              (b.onload = b.onreadystatechange =
                function (a, c) {
                  (c ||
                    !b.readyState ||
                    /loaded|complete/.test(b.readyState)) &&
                    ((b.onload = b.onreadystatechange = null),
                    b.parentNode && b.parentNode.removeChild(b),
                    (b = null),
                    c || e(200, "success"));
                }),
              c.insertBefore(b, c.firstChild);
          },
          abort: function () {
            b && b.onload(void 0, !0);
          },
        };
      }
    });
  var _b = [],
    ac = /(=)\?(?=&|$)|\?\?/;
  m.ajaxSetup({
    jsonp: "callback",
    jsonpCallback: function () {
      var a = _b.pop() || m.expando + "_" + vb++;
      return (this[a] = !0), a;
    },
  }),
    m.ajaxPrefilter("json jsonp", function (b, c, d) {
      var e,
        f,
        g,
        h =
          b.jsonp !== !1 &&
          (ac.test(b.url)
            ? "url"
            : "string" == typeof b.data &&
              !(b.contentType || "").indexOf(
                "application/x-www-form-urlencoded"
              ) &&
              ac.test(b.data) &&
              "data");
      return h || "jsonp" === b.dataTypes[0]
        ? ((e = b.jsonpCallback =
            m.isFunction(b.jsonpCallback)
              ? b.jsonpCallback()
              : b.jsonpCallback),
          h
            ? (b[h] = b[h].replace(ac, "$1" + e))
            : b.jsonp !== !1 &&
              (b.url += (wb.test(b.url) ? "&" : "?") + b.jsonp + "=" + e),
          (b.converters["script json"] = function () {
            return g || m.error(e + " was not called"), g[0];
          }),
          (b.dataTypes[0] = "json"),
          (f = a[e]),
          (a[e] = function () {
            g = arguments;
          }),
          d.always(function () {
            (a[e] = f),
              b[e] && ((b.jsonpCallback = c.jsonpCallback), _b.push(e)),
              g && m.isFunction(f) && f(g[0]),
              (g = f = void 0);
          }),
          "script")
        : void 0;
    }),
    (m.parseHTML = function (a, b, c) {
      if (!a || "string" != typeof a) {
        return null;
      }
      "boolean" == typeof b && ((c = b), (b = !1)), (b = b || y);
      var d = u.exec(a),
        e = !c && [];
      return d
        ? [b.createElement(d[1])]
        : ((d = m.buildFragment([a], b, e)),
          e && e.length && m(e).remove(),
          m.merge([], d.childNodes));
    });
  var bc = m.fn.load;
  (m.fn.load = function (a, b, c) {
    if ("string" != typeof a && bc) {
      return bc.apply(this, arguments);
    }
    var d,
      e,
      f,
      g = this,
      h = a.indexOf(" ");
    return (
      h >= 0 && ((d = m.trim(a.slice(h, a.length))), (a = a.slice(0, h))),
      m.isFunction(b)
        ? ((c = b), (b = void 0))
        : b && "object" == typeof b && (f = "POST"),
      g.length > 0 &&
        m
          .ajax({ url: a, type: f, dataType: "html", data: b })
          .done(function (a) {
            (e = arguments),
              g.html(d ? m("<div>").append(m.parseHTML(a)).find(d) : a);
          })
          .complete(
            c &&
              function (a, b) {
                g.each(c, e || [a.responseText, b, a]);
              }
          ),
      this
    );
  }),
    m.each(
      [
        "ajaxStart",
        "ajaxStop",
        "ajaxComplete",
        "ajaxError",
        "ajaxSuccess",
        "ajaxSend",
      ],
      function (a, b) {
        m.fn[b] = function (a) {
          return this.on(b, a);
        };
      }
    ),
    (m.expr.filters.animated = function (a) {
      return m.grep(m.timers, function (b) {
        return a === b.elem;
      }).length;
    });
  var cc = a.document.documentElement;
  function dc(a) {
    return m.isWindow(a)
      ? a
      : 9 === a.nodeType
      ? a.defaultView || a.parentWindow
      : !1;
  }
  (m.offset = {
    setOffset: function (a, b, c) {
      var d,
        e,
        f,
        g,
        h,
        i,
        j,
        k = m.css(a, "position"),
        l = m(a),
        n = {};
      "static" === k && (a.style.position = "relative"),
        (h = l.offset()),
        (f = m.css(a, "top")),
        (i = m.css(a, "left")),
        (j =
          ("absolute" === k || "fixed" === k) &&
          m.inArray("auto", [f, i]) > -1),
        j
          ? ((d = l.position()), (g = d.top), (e = d.left))
          : ((g = parseFloat(f) || 0), (e = parseFloat(i) || 0)),
        m.isFunction(b) && (b = b.call(a, c, h)),
        null != b.top && (n.top = b.top - h.top + g),
        null != b.left && (n.left = b.left - h.left + e),
        "using" in b ? b.using.call(a, n) : l.css(n);
    },
  }),
    m.fn.extend({
      offset: function (a) {
        if (arguments.length) {
          return void 0 === a
            ? this
            : this.each(function (b) {
                m.offset.setOffset(this, a, b);
              });
        }
        var b,
          c,
          d = { top: 0, left: 0 },
          e = this[0],
          f = e && e.ownerDocument;
        if (f) {
          return (
            (b = f.documentElement),
            m.contains(b, e)
              ? (typeof e.getBoundingClientRect !== K &&
                  (d = e.getBoundingClientRect()),
                (c = dc(f)),
                {
                  top:
                    d.top + (c.pageYOffset || b.scrollTop) - (b.clientTop || 0),
                  left:
                    d.left +
                    (c.pageXOffset || b.scrollLeft) -
                    (b.clientLeft || 0),
                })
              : d
          );
        }
      },
      position: function () {
        if (this[0]) {
          var a,
            b,
            c = { top: 0, left: 0 },
            d = this[0];
          return (
            "fixed" === m.css(d, "position")
              ? (b = d.getBoundingClientRect())
              : ((a = this.offsetParent()),
                (b = this.offset()),
                m.nodeName(a[0], "html") || (c = a.offset()),
                (c.top += m.css(a[0], "borderTopWidth", !0)),
                (c.left += m.css(a[0], "borderLeftWidth", !0))),
            {
              top: b.top - c.top - m.css(d, "marginTop", !0),
              left: b.left - c.left - m.css(d, "marginLeft", !0),
            }
          );
        }
      },
      offsetParent: function () {
        return this.map(function () {
          var a = this.offsetParent || cc;
          while (
            a &&
            !m.nodeName(a, "html") &&
            "static" === m.css(a, "position")
          ) {
            a = a.offsetParent;
          }
          return a || cc;
        });
      },
    }),
    m.each(
      { scrollLeft: "pageXOffset", scrollTop: "pageYOffset" },
      function (a, b) {
        var c = /Y/.test(b);
        m.fn[a] = function (d) {
          return V(
            this,
            function (a, d, e) {
              var f = dc(a);
              return void 0 === e
                ? f
                  ? b in f
                    ? f[b]
                    : f.document.documentElement[d]
                  : a[d]
                : void (f
                    ? f.scrollTo(
                        c ? m(f).scrollLeft() : e,
                        c ? e : m(f).scrollTop()
                      )
                    : (a[d] = e));
            },
            a,
            d,
            arguments.length,
            null
          );
        };
      }
    ),
    m.each(["top", "left"], function (a, b) {
      m.cssHooks[b] = La(k.pixelPosition, function (a, c) {
        return c
          ? ((c = Ja(a, b)), Ha.test(c) ? m(a).position()[b] + "px" : c)
          : void 0;
      });
    }),
    m.each({ Height: "height", Width: "width" }, function (a, b) {
      m.each(
        { padding: "inner" + a, content: b, "": "outer" + a },
        function (c, d) {
          m.fn[d] = function (d, e) {
            var f = arguments.length && (c || "boolean" != typeof d),
              g = c || (d === !0 || e === !0 ? "margin" : "border");
            return V(
              this,
              function (b, c, d) {
                var e;
                return m.isWindow(b)
                  ? b.document.documentElement["client" + a]
                  : 9 === b.nodeType
                  ? ((e = b.documentElement),
                    Math.max(
                      b.body["scroll" + a],
                      e["scroll" + a],
                      b.body["offset" + a],
                      e["offset" + a],
                      e["client" + a]
                    ))
                  : void 0 === d
                  ? m.css(b, c, g)
                  : m.style(b, c, d, g);
              },
              b,
              f ? d : void 0,
              f,
              null
            );
          };
        }
      );
    }),
    (m.fn.size = function () {
      return this.length;
    }),
    (m.fn.andSelf = m.fn.addBack),
    "function" == typeof define &&
      define.amd &&
      define("jquery", [], function () {
        return m;
      });
  var ec = a.jQuery,
    fc = a.$;
  return (
    (m.noConflict = function (b) {
      return a.$ === m && (a.$ = fc), b && a.jQuery === m && (a.jQuery = ec), m;
    }),
    typeof b === K && (a.jQuery = a.$ = m),
    m
  );
});
/* jQuery Migrate v1.2.1 | (c) 2005, 2013 jQuery Foundation, Inc. and other contributors | jquery.org/license */
jQuery.migrateMute === void 0 && (jQuery.migrateMute = !0),
  (function (ah, O, Y) {
    function U(b) {
      var a = O.console;
      ad[b] ||
        ((ad[b] = !0),
        ah.migrateWarnings.push(b),
        a &&
          a.warn &&
          !ah.migrateMute &&
          (a.warn("JQMIGRATE: " + b), ah.migrateTrace && a.trace && a.trace()));
    }
    function al(d, b, c, g) {
      if (Object.defineProperty) {
        try {
          return (
            Object.defineProperty(d, b, {
              configurable: !0,
              enumerable: !0,
              get: function () {
                return U(g), c;
              },
              set: function (a) {
                U(g), (c = a);
              },
            }),
            Y
          );
        } catch (f) {}
      }
      (ah._definePropertyBroken = !0), (d[b] = c);
    }
    var ad = {};
    (ah.migrateWarnings = []),
      !ah.migrateMute &&
        O.console &&
        O.console.log &&
        O.console.log("JQMIGRATE: Logging is active"),
      ah.migrateTrace === Y && (ah.migrateTrace = !0),
      (ah.migrateReset = function () {
        (ad = {}), (ah.migrateWarnings.length = 0);
      }),
      "BackCompat" === document.compatMode &&
        U("jQuery is not compatible with Quirks Mode");
    var X = ah("<input/>", { size: 1 }).attr("size") && ah.attrFn,
      P = ah.attr,
      L =
        (ah.attrHooks.value && ah.attrHooks.value.get) ||
        function () {
          return null;
        },
      aj =
        (ah.attrHooks.value && ah.attrHooks.value.set) ||
        function () {
          return Y;
        },
      aa = /^(?:input|button)$/i,
      ai = /^[238]$/,
      W =
        /^(?:autofocus|autoplay|async|checked|controls|defer|disabled|hidden|loop|multiple|open|readonly|required|scoped|selected)$/i,
      ag = /^(?:checked|selected)$/i;
    al(ah, "attrFn", X || {}, "jQuery.attrFn is deprecated"),
      (ah.attr = function (h, b, f, d) {
        var k = b.toLowerCase(),
          j = h && h.nodeType;
        return d &&
          (4 > P.length && U("jQuery.fn.attr( props, pass ) is deprecated"),
          h && !ai.test(j) && (X ? b in X : ah.isFunction(ah.fn[b])))
          ? ah(h)[b](f)
          : ("type" === b &&
              f !== Y &&
              aa.test(h.nodeName) &&
              h.parentNode &&
              U("Can't change the 'type' of an input or button in IE 6/7/8"),
            !ah.attrHooks[k] &&
              W.test(k) &&
              ((ah.attrHooks[k] = {
                get: function (l, m) {
                  var c,
                    g = ah.prop(l, m);
                  return g === !0 ||
                    ("boolean" != typeof g &&
                      (c = l.getAttributeNode(m)) &&
                      c.nodeValue !== !1)
                    ? m.toLowerCase()
                    : Y;
                },
                set: function (g, m, l) {
                  var c;
                  return (
                    m === !1
                      ? ah.removeAttr(g, l)
                      : ((c = ah.propFix[l] || l),
                        c in g && (g[c] = !0),
                        g.setAttribute(l, l.toLowerCase())),
                    l
                  );
                },
              }),
              ag.test(k) &&
                U(
                  "jQuery.fn.attr('" +
                    k +
                    "') may use property instead of attribute"
                )),
            P.call(ah, h, b, f));
      }),
      (ah.attrHooks.value = {
        get: function (b, a) {
          var c = (b.nodeName || "").toLowerCase();
          return "button" === c
            ? L.apply(this, arguments)
            : ("input" !== c &&
                "option" !== c &&
                U("jQuery.fn.attr('value') no longer gets properties"),
              a in b ? b.value : null);
        },
        set: function (d, c) {
          var b = (d.nodeName || "").toLowerCase();
          return "button" === b
            ? aj.apply(this, arguments)
            : ("input" !== b &&
                "option" !== b &&
                U("jQuery.fn.attr('value', val) no longer sets properties"),
              (d.value = c),
              Y);
        },
      });
    var af,
      ae,
      K = ah.fn.init,
      Z = ah.parseJSON,
      F = /^([^<]*)(<[\w\W]+>)([^>]*)$/;
    (ah.fn.init = function (d, f, b) {
      var c;
      return d &&
        "string" == typeof d &&
        !ah.isPlainObject(f) &&
        (c = F.exec(ah.trim(d))) &&
        c[0] &&
        ("<" !== d.charAt(0) &&
          U("$(html) HTML strings must start with '<' character"),
        c[3] && U("$(html) HTML text after last tag is ignored"),
        "#" === c[0].charAt(0) &&
          (U("HTML string cannot start with a '#' character"),
          ah.error("JQMIGRATE: Invalid selector string (XSS)")),
        f && f.context && (f = f.context),
        ah.parseHTML)
        ? K.call(this, ah.parseHTML(c[2], f, !0), f, b)
        : K.apply(this, arguments);
    }),
      (ah.fn.init.prototype = ah.fn),
      (ah.parseJSON = function (a) {
        return a || null === a
          ? Z.apply(this, arguments)
          : (U("jQuery.parseJSON requires a valid JSON string"), null);
      }),
      (ah.uaMatch = function (b) {
        b = b.toLowerCase();
        var a =
          /(chrome)[ \/]([\w.]+)/.exec(b) ||
          /(webkit)[ \/]([\w.]+)/.exec(b) ||
          /(opera)(?:.*version|)[ \/]([\w.]+)/.exec(b) ||
          /(msie) ([\w.]+)/.exec(b) ||
          (0 > b.indexOf("compatible") &&
            /(mozilla)(?:.*? rv:([\w.]+)|)/.exec(b)) ||
          [];
        return { browser: a[1] || "", version: a[2] || "0" };
      }),
      ah.browser ||
        ((af = ah.uaMatch(navigator.userAgent)),
        (ae = {}),
        af.browser && ((ae[af.browser] = !0), (ae.version = af.version)),
        ae.chrome ? (ae.webkit = !0) : ae.webkit && (ae.safari = !0),
        (ah.browser = ae)),
      al(ah, "browser", ah.browser, "jQuery.browser is deprecated"),
      (ah.sub = function () {
        function a(c, d) {
          return new a.fn.init(c, d);
        }
        ah.extend(!0, a, this),
          (a.superclass = this),
          (a.fn = a.prototype = this()),
          (a.fn.constructor = a),
          (a.sub = this.sub),
          (a.fn.init = function (d, c) {
            return (
              c && c instanceof ah && !(c instanceof a) && (c = a(c)),
              ah.fn.init.call(this, d, c, b)
            );
          }),
          (a.fn.init.prototype = a.fn);
        var b = a(document);
        return U("jQuery.sub() is deprecated"), a;
      }),
      ah.ajaxSetup({ converters: { "text json": ah.parseJSON } });
    var ak = ah.fn.data;
    ah.fn.data = function (d) {
      var b,
        c,
        f = this[0];
      return !f ||
        "events" !== d ||
        1 !== arguments.length ||
        ((b = ah.data(f, d)),
        (c = ah._data(f, d)),
        (b !== Y && b !== c) || c === Y)
        ? ak.apply(this, arguments)
        : (U("Use of jQuery.fn.data('events') is deprecated"), c);
    };
    var ac = /\/(java|ecma)script/i,
      J = ah.fn.andSelf || ah.fn.addBack;
    (ah.fn.andSelf = function () {
      return (
        U("jQuery.fn.andSelf() replaced by jQuery.fn.addBack()"),
        J.apply(this, arguments)
      );
    }),
      ah.clean ||
        (ah.clean = function (n, k, g, b) {
          (k = k || document),
            (k = (!k.nodeType && k[0]) || k),
            (k = k.ownerDocument || k),
            U("jQuery.clean() is deprecated");
          var r,
            m,
            j,
            f,
            h = [];
          if ((ah.merge(h, ah.buildFragment(n, k).childNodes), g)) {
            for (
              j = function (a) {
                return !a.type || ac.test(a.type)
                  ? b
                    ? b.push(a.parentNode ? a.parentNode.removeChild(a) : a)
                    : g.appendChild(a)
                  : Y;
              },
                r = 0;
              null != (m = h[r]);
              r++
            ) {
              (ah.nodeName(m, "script") && j(m)) ||
                (g.appendChild(m),
                m.getElementsByTagName !== Y &&
                  ((f = ah.grep(
                    ah.merge([], m.getElementsByTagName("script")),
                    j
                  )),
                  h.splice.apply(h, [r + 1, 0].concat(f)),
                  (r += f.length)));
            }
          }
          return h;
        });
    var B = ah.event.add,
      G = ah.event.remove,
      ab = ah.event.trigger,
      D = ah.fn.toggle,
      q = ah.fn.live,
      E = ah.fn.die,
      z = "ajaxStart|ajaxStop|ajaxSend|ajaxComplete|ajaxError|ajaxSuccess",
      R = RegExp("\\b(?:" + z + ")\\b"),
      I = /(?:^|\s)hover(\.\S+|)\b/,
      V = function (a) {
        return "string" != typeof a || ah.event.special.hover
          ? a
          : (I.test(a) &&
              U(
                "'hover' pseudo-event is deprecated, use 'mouseenter mouseleave'"
              ),
            a && a.replace(I, "mouseenter$1 mouseleave$1"));
      };
    ah.event.props &&
      "attrChange" !== ah.event.props[0] &&
      ah.event.props.unshift(
        "attrChange",
        "attrName",
        "relatedNode",
        "srcElement"
      ),
      ah.event.dispatch &&
        al(
          ah.event,
          "handle",
          ah.event.dispatch,
          "jQuery.event.handle is undocumented and deprecated"
        ),
      (ah.event.add = function (f, d, g, b, c) {
        f !== document &&
          R.test(d) &&
          U("AJAX events should be attached to document: " + d),
          B.call(this, f, V(d || ""), g, b, c);
      }),
      (ah.event.remove = function (f, c, g, d, b) {
        G.call(this, f, V(c) || "", g, d, b);
      }),
      (ah.fn.error = function () {
        var a = Array.prototype.slice.call(arguments, 0);
        return (
          U("jQuery.fn.error() is deprecated"),
          a.splice(0, 0, "error"),
          arguments.length
            ? this.bind.apply(this, a)
            : (this.triggerHandler.apply(this, a), this)
        );
      }),
      (ah.fn.toggle = function (d, h) {
        if (!ah.isFunction(d) || !ah.isFunction(h)) {
          return D.apply(this, arguments);
        }
        U("jQuery.fn.toggle(handler, handler...) is deprecated");
        var b = arguments,
          c = d.guid || ah.guid++,
          g = 0,
          f = function (j) {
            var a = (ah._data(this, "lastToggle" + d.guid) || 0) % g;
            return (
              ah._data(this, "lastToggle" + d.guid, a + 1),
              j.preventDefault(),
              b[a].apply(this, arguments) || !1
            );
          };
        for (f.guid = c; b.length > g; ) {
          b[g++].guid = c;
        }
        return this.click(f);
      }),
      (ah.fn.live = function (c, d, b) {
        return (
          U("jQuery.fn.live() is deprecated"),
          q
            ? q.apply(this, arguments)
            : (ah(this.context).on(c, this.selector, d, b), this)
        );
      }),
      (ah.fn.die = function (a, b) {
        return (
          U("jQuery.fn.die() is deprecated"),
          E
            ? E.apply(this, arguments)
            : (ah(this.context).off(a, this.selector || "**", b), this)
        );
      }),
      (ah.event.trigger = function (d, c, f, b) {
        return (
          f || R.test(d) || U("Global events are undocumented and deprecated"),
          ab.call(this, d, c, f || document, b)
        );
      }),
      ah.each(z.split("|"), function (a, b) {
        ah.event.special[b] = {
          setup: function () {
            var c = this;
            return (
              c !== document &&
                (ah.event.add(document, b + "." + ah.guid, function () {
                  ah.event.trigger(b, null, c, !0);
                }),
                ah._data(this, b, ah.guid++)),
              !1
            );
          },
          teardown: function () {
            return (
              this !== document &&
                ah.event.remove(document, b + "." + ah._data(this, b)),
              !1
            );
          },
        };
      });
  })(jQuery, window);
jQuery.cookie = function (d, f, b) {
  if (arguments.length > 1 && String(f) !== "[object Object]") {
    b = jQuery.extend({}, b);
    if (f === null || f === undefined) {
      b.expires = -1;
    }
    if (typeof b.expires === "number") {
      var h = b.expires,
        c = (b.expires = new Date());
      c.setDate(c.getDate() + h);
    }
    f = String(f);
    return (document.cookie = [
      encodeURIComponent(d),
      "=",
      b.raw ? f : encodeURIComponent(f),
      b.expires ? "; expires=" + b.expires.toUTCString() : "",
      b.path ? "; path=" + b.path : "",
      b.domain ? "; domain=" + b.domain : "",
      b.secure ? "; secure" : "",
    ].join(""));
  }
  b = f || {};
  var a,
    g = b.raw
      ? function (j) {
          return j;
        }
      : decodeURIComponent;
  return (a = new RegExp("(?:^|; )" + encodeURIComponent(d) + "=([^;]*)").exec(
    document.cookie
  ))
    ? g(a[1])
    : null;
};
/*
 * jQuery.ScrollTo
 * Copyright (c) 2007-2012 Ariel Flesler - aflesler(at)gmail(dot)com | http://flesler.blogspot.com
 * Dual licensed under MIT and GPL.
 * Date: 12/14/2012
 *
 * @projectDescription Easy element scrolling using jQuery.
 * http://flesler.blogspot.com/2007/10/jqueryscrollto.html
 * @author Ariel Flesler
 * @version 1.4.5 BETA
 *
 * @id jQuery.scrollTo
 * @id jQuery.fn.scrollTo
 * @param {String, Number, DOMElement, jQuery, Object} target Where to scroll the matched elements.
 *	  The different options for target are:
 *		- A number position (will be applied to all axes).
 *		- A string position ('44', '100px', '+=90', etc ) will be applied to all axes
 *		- A jQuery/DOM element ( logically, child of the element to scroll )
 *		- A string selector, that will be relative to the element to scroll ( 'li:eq(2)', etc )
 *		- A hash { top:x, left:y }, x and y can be any kind of number/string like above.
 *		- A percentage of the container's dimension/s, for example: 50% to go to the middle.
 *		- The string 'max' for go-to-end.
 * @param {Number, Function} duration The OVERALL length of the animation, this argument can be the settings object instead.
 * @param {Object,Function} settings Optional set of settings or the onAfter callback.
 *	 @option {String} axis Which axis must be scrolled, use 'x', 'y', 'xy' or 'yx'.
 *	 @option {Number, Function} duration The OVERALL length of the animation.
 *	 @option {String} easing The easing method for the animation.
 *	 @option {Boolean} margin If true, the margin of the target element will be deducted from the final position.
 *	 @option {Object, Number} offset Add/deduct from the end position. One number for both axes or { top:x, left:y }.
 *	 @option {Object, Number} over Add/deduct the height/width multiplied by 'over', can be { top:x, left:y } when using both axes.
 *	 @option {Boolean} queue If true, and both axis are given, the 2nd axis will only be animated after the first one ends.
 *	 @option {Function} onAfter Function to be called after the scrolling ends.
 *	 @option {Function} onAfterFirst If queuing is activated, this function will be called after the first scrolling ends.
 * @return {jQuery} Returns the same jQuery object, for chaining.
 *
 * @desc Scroll to a fixed position
 * @example $('div').scrollTo( 340 );
 *
 * @desc Scroll relatively to the actual position
 * @example $('div').scrollTo( '+=340px', { axis:'y' } );
 *
 * @desc Scroll using a selector (relative to the scrolled element)
 * @example $('div').scrollTo( 'p.paragraph:eq(2)', 500, { easing:'swing', queue:true, axis:'xy' } );
 *
 * @desc Scroll to a DOM element (same for jQuery object)
 * @example var second_child = document.getElementById('container').firstChild.nextSibling;
 *			$('#container').scrollTo( second_child, { duration:500, axis:'x', onAfter:function(){
 *				alert('scrolled!!');
 *			}});
 *
 * @desc Scroll on both axes, to different values
 * @example $('div').scrollTo( { top: 300, left:'+=200' }, { axis:'xy', offset:-20 } );
 */
(function (c) {
  var a = (c.scrollTo = function (g, f, d) {
    c(window).scrollTo(g, f, d);
  });
  a.defaults = {
    axis: "xy",
    duration: parseFloat(c.fn.jquery) >= 1.3 ? 0 : 1,
    limit: true,
  };
  a.window = function (d) {
    return c(window)._scrollable();
  };
  c.fn._scrollable = function () {
    return this.map(function () {
      var f = this,
        d =
          !f.nodeName ||
          c.inArray(f.nodeName.toLowerCase(), [
            "iframe",
            "#document",
            "html",
            "body",
          ]) != -1;
      if (!d) {
        return f;
      }
      var g = (f.contentWindow || f).document || f.ownerDocument || f;
      return /webkit/i.test(navigator.userAgent) || g.compatMode == "BackCompat"
        ? g.body
        : g.documentElement;
    });
  };
  c.fn.scrollTo = function (g, f, d) {
    if (typeof f == "object") {
      d = f;
      f = 0;
    }
    if (typeof d == "function") {
      d = { onAfter: d };
    }
    if (g == "max") {
      g = 9000000000;
    }
    d = c.extend({}, a.defaults, d);
    f = f || d.duration;
    d.queue = d.queue && d.axis.length > 1;
    if (d.queue) {
      f /= 2;
    }
    d.offset = b(d.offset);
    d.over = b(d.over);
    return this._scrollable()
      .each(function () {
        if (g == null) {
          return;
        }
        var n = this,
          l = c(n),
          m = g,
          k,
          h = {},
          o = l.is("html,body");
        switch (typeof m) {
          case "number":
          case "string":
            if (/^([+-]=?)?\d+(\.\d+)?(px|%)?$/.test(m)) {
              m = b(m);
              break;
            }
            m = c(m, this);
            if (!m.length) {
              return;
            }
          case "object":
            if (m.is || m.style) {
              k = (m = c(m)).offset();
            }
        }
        c.each(d.axis.split(""), function (t, u) {
          var v = u == "x" ? "Left" : "Top",
            x = v.toLowerCase(),
            s = "scroll" + v,
            r = n[s],
            q = a.max(n, u);
          if (k) {
            h[s] = k[x] + (o ? 0 : r - l.offset()[x]);
            if (d.margin) {
              h[s] -= parseInt(m.css("margin" + v)) || 0;
              h[s] -= parseInt(m.css("border" + v + "Width")) || 0;
            }
            h[s] += d.offset[x] || 0;
            if (d.over[x]) {
              h[s] += m[u == "x" ? "width" : "height"]() * d.over[x];
            }
          } else {
            var w = m[x];
            h[s] =
              w.slice && w.slice(-1) == "%" ? (parseFloat(w) / 100) * q : w;
          }
          if (d.limit && /^\d+$/.test(h[s])) {
            h[s] = h[s] <= 0 ? 0 : Math.min(h[s], q);
          }
          if (!t && d.queue) {
            if (r != h[s]) {
              j(d.onAfterFirst);
            }
            delete h[s];
          }
        });
        j(d.onAfter);
        function j(q) {
          l.animate(
            h,
            f,
            d.easing,
            q &&
              function () {
                q.call(this, g, d);
              }
          );
        }
      })
      .end();
  };
  a.max = function (l, k) {
    var j = k == "x" ? "Width" : "Height",
      f = "scroll" + j;
    if (!c(l).is("html,body")) {
      return l[f] - c(l)[j.toLowerCase()]();
    }
    var h = "client" + j,
      g = l.ownerDocument.documentElement,
      d = l.ownerDocument.body;
    return Math.max(g[f], d[f]) - Math.min(g[h], d[h]);
  };
  function b(d) {
    return typeof d == "object" ? d : { top: d, left: d };
  }
})(jQuery);
(function (a) {
  a.fn.btxData = function (b) {
    var f = a(this).data("btx");
    try {
      var c = a.parseJSON(decodeURIComponent(f));
    } catch (d) {
      return false;
    }
    return c;
  };
})(jQuery);
(function (b) {
  b.hotkeys = {
    version: "0.8",
    specialKeys: {
      8: "backspace",
      9: "tab",
      13: "return",
      16: "shift",
      17: "ctrl",
      18: "alt",
      19: "pause",
      20: "capslock",
      27: "esc",
      32: "space",
      33: "pageup",
      34: "pagedown",
      35: "end",
      36: "home",
      37: "left",
      38: "up",
      39: "right",
      40: "down",
      45: "insert",
      46: "del",
      96: "0",
      97: "1",
      98: "2",
      99: "3",
      100: "4",
      101: "5",
      102: "6",
      103: "7",
      104: "8",
      105: "9",
      106: "*",
      107: "+",
      109: "-",
      110: ".",
      111: "/",
      112: "f1",
      113: "f2",
      114: "f3",
      115: "f4",
      116: "f5",
      117: "f6",
      118: "f7",
      119: "f8",
      120: "f9",
      121: "f10",
      122: "f11",
      123: "f12",
      144: "numlock",
      145: "scroll",
      191: "/",
      224: "meta",
    },
    shiftNums: {
      "`": "~",
      1: "!",
      2: "@",
      3: "#",
      4: "$",
      5: "%",
      6: "^",
      7: "&",
      8: "*",
      9: "(",
      0: ")",
      "-": "_",
      "=": "+",
      ";": ": ",
      "'": '"',
      ",": "<",
      ".": ">",
      "/": "?",
      "\\": "|",
    },
  };
  function a(d) {
    if (typeof d.data !== "string") {
      return;
    }
    var c = d.handler,
      f = d.data.toLowerCase().split(" ");
    d.handler = function (o) {
      var j = o.type !== "keypress" && b.hotkeys.specialKeys[o.which],
        q = String.fromCharCode(o.which).toLowerCase(),
        m,
        n = "",
        h = {};
      if (o.altKey && j !== "alt") {
        n += "alt+";
      }
      if (o.ctrlKey && j !== "ctrl") {
        n += "ctrl+";
      }
      if (o.metaKey && !o.ctrlKey && j !== "meta") {
        n += "meta+";
      }
      if (o.shiftKey && j !== "shift") {
        n += "shift+";
      }
      if (j) {
        h[n + j] = true;
      } else {
        h[n + q] = true;
        h[n + b.hotkeys.shiftNums[q]] = true;
        if (n === "shift+") {
          h[b.hotkeys.shiftNums[q]] = true;
        }
      }
      for (var k = 0, g = f.length; k < g; k++) {
        if (h[f[k]]) {
          return c.apply(this, arguments);
        }
      }
    };
  }
  b.each(["keydown", "keyup", "keypress"], function () {
    b.event.special[this] = { add: a };
  });
})(jQuery);
(function (n, q, v) {
  var x = n([]),
    t = (n.resize = n.extend(n.resize, {})),
    o,
    l = "setTimeout",
    m = "resize",
    u = m + "-special-event",
    w = "delay",
    s = "throttleWindow";
  t[w] = 250;
  t[s] = true;
  n.event.special[m] = {
    setup: function () {
      if (!t[s] && this[l]) {
        return false;
      }
      var a = n(this);
      x = x.add(a);
      n.data(this, u, { w: a.width(), h: a.height() });
      if (x.length === 1) {
        r();
      }
    },
    teardown: function () {
      if (!t[s] && this[l]) {
        return false;
      }
      var a = n(this);
      x = x.not(a);
      a.removeData(u);
      if (!x.length) {
        clearTimeout(o);
      }
    },
    add: function (b) {
      if (!t[s] && this[l]) {
        return false;
      }
      var c;
      function a(d, j, h) {
        var g = n(this),
          f = n.data(this, u);
        f.w = j !== v ? j : g.width();
        f.h = h !== v ? h : g.height();
        c.apply(this, arguments);
      }
      if (n.isFunction(b)) {
        c = b;
        return a;
      } else {
        c = b.handler;
        b.handler = a;
      }
    },
  };
  function r() {
    o = q[l](function () {
      x.each(function () {
        var d = n(this),
          a = d.width(),
          b = d.height(),
          c = n.data(this, u);
        if (a !== c.w || b !== c.h) {
          d.trigger(m, [(c.w = a), (c.h = b)]);
        }
      });
      r();
    }, t[w]);
  }
})(jQuery, this);
(function (c) {
  var a = (c.hint = function (d, f) {
      return c(document).hint(d, f);
    }),
    b = function (d, f) {
      if (!f && typeof d == "object") {
        f = d;
        d = null;
      }
      f = f || {};
      if (d) {
        f.text = "" + d;
      }
      if (f.keepLabel) {
        f.method = "valueSwap";
      }
      return f;
    };
  c.fn.hint = function (d, f) {
    f = b(d, f);
    return this.each(function () {
      a.init.call(this, f);
    });
  };
  c.extend(a, {
    version: "1.7",
    query: "input:password,input:text:not(._hintPw),textarea",
    on: "hint",
    toggleOnFocus: true,
    attr: false,
    inline: false,
    text: undefined,
    method: "labelOver",
    parentCss: { position: "relative" },
    inlineCss: { display: "inline" },
    labelCss: { position: "absolute", top: "4px", left: "5px" },
    getElements: function (f) {
      var g = f.query || a.query,
        d = this.is(g) ? this : this.find(g);
      return d.length == 0 ? this : d;
    },
    init: function (g) {
      var f = c(this),
        h = c.metadata,
        d = h ? f.metadata() : null;
      a.getElements.call(f, g).each(function () {
        var l = c(this),
          k = h ? l.metadata() : null,
          j = c.extend(true, {}, a, d, k, g);
        c.extend(j, j[j.method]);
        j.create.call(l, j);
      });
    },
    hasValue: function (f) {
      var d = this.val();
      return d && c.trim(d) != "";
    },
    start: function () {
      var d = c(this),
        f = d.data("hint"),
        g = f.hasValue.call(d, f) ? "hide" : "show";
      f[g].call(d, f);
    },
    end: function () {
      var d = c(this),
        f = d.data("hint");
      if (f && f.hasHint.call(d, f)) {
        f.hide.call(d, f);
      }
    },
    getText: function (d) {
      return d.text || this.attr(d.attr || "title");
    },
    create: function (d) {
      if (this.data("hint")) {
        this.data("hint").destroy.call(this);
      }
      this.data("hint", d);
      d.setup.call(this, d);
      d.start.call(this);
    },
    destroy: function () {
      var d = this.data("hint");
      d.teardown.call(this, d);
      this.data("hint", null);
    },
    valueSwap: {
      setup: function (f) {
        var d = this,
          g = f.getText.call(d, f);
        f.kill = function () {
          f.destroy.call(d);
        };
        if (d.is(":password")) {
          f.password = c(
            '<input type="text" value="' + g + '" class="_hintPw">'
          )
            .focus(function () {
              d.show().focus();
            })
            .addClass(f.on)
            .insertBefore(d);
        } else {
          if (c.browser.msie && !d.attr("defaultValue") && d.val() == g) {
            d.val("");
          }
        }
        d.blur(f.start).focus(f.end);
        c(window).unload(f.kill);
        c(this[0].form).submit(f.kill);
      },
      hide: function (d) {
        if (d.password) {
          d.password.hide();
          this.show();
        } else {
          if (d.hasHint.call(this, d)) {
            this.val("");
          }
          this.removeClass(d.on);
        }
      },
      show: function (d) {
        if (d.password) {
          this.hide();
          d.password.show();
        } else {
          this.addClass(d.on).val(d.getText.call(this, d));
        }
      },
      hasHint: function (d) {
        if (d.password) {
          return d.password.is(":visible");
        }
        return this.hasClass(d.on) && this.val() == d.getText.call(this, d);
      },
      teardown: function (d) {
        d.end.call(this);
        if (d.password) {
          d.password.remove();
        }
        c(window).unbind("unload", d.kill);
        c(this[0].form).unbind("submit", d.kill);
      },
    },
    labelOver: {
      setup: function (j) {
        var g = this,
          q = this.attr("name"),
          f = c("label[for=" + q + "]"),
          o = g.parent();
        if (f.size() == 0) {
          j.newLabel = true;
          f = c(
            '<label for="' + q + '">' + j.getText.call(this, j) + "</label>"
          );
          g.before(f);
        } else {
          if (j.text || j.attr) {
            j.labelText = f.text();
            f.text(j.getText.call(this, j));
          }
        }
        o = g.parent().css(j.parentCss);
        if (j.inline) {
          o.css(j.inlineCss);
        }
        j.labelStyle = f.attr("style") || "";
        j.label = f
          .addClass(j.on)
          .css(j.labelCss)
          .click(function () {
            g.focus();
          });
        var d = this.position();
        var m = (this.outerWidth(true) - this.width()) / 2 + d.left;
        var k = (this.outerHeight(true) - this.height()) / 2 + d.top;
        f.css({ left: m, top: k });
        f.css({ width: c(this).width() - 8 });
        g.resize(function (h) {
          f.css({ width: c(this).width() - 8 });
        });
        if (j.toggleOnFocus) {
          g.blur(j.start).focus(j.end);
        } else {
          g.keyup(
            (j.toggle = function () {
              (j.hasValue.call(g, j) ? j.end : j.start).call(g);
            })
          );
        }
      },
      hide: function (d) {
        d.label.css("textIndent", -10000);
      },
      show: function (d) {
        d.label.css("textIndent", 0);
      },
      hasHint: function (d) {
        return d.label.css("textIndent").charAt(0) == "0";
      },
      teardown: function (d) {
        if (d.toggleOnFocus) {
          this.unbind("blur", d.start).unbind("focus", d.end);
        } else {
          this.unbind("keyup", d.toggle);
        }
        d.label.removeClass(d.on).attr("style", d.labelStyle);
        if (d.newLabel) {
          d.label.remove();
          d.label = null;
        } else {
          if (d.labelText) {
            d.label.text(d.labelText);
          }
        }
        var f = this.parent().after(this);
        if (d.label) {
          f.before(d.label);
        }
        f.remove();
      },
    },
  });
})(jQuery);
(function (a) {
  a.fn.tipTip = function (c) {
    var h = {
      activation: "hover",
      keepAlive: false,
      maxWidth: "200px",
      edgeOffset: 3,
      defaultPosition: "bottom",
      delay: 400,
      fadeIn: 200,
      fadeOut: 200,
      attribute: "title",
      content: false,
      enter: function () {},
      exit: function () {},
    };
    var f = a.extend(h, c);
    if (a("#tiptip_holder").length <= 0) {
      var b = a(
        '<div id="tiptip_holder" style="max-width:' + f.maxWidth + ';"></div>'
      );
      var d = a('<div id="tiptip_content"></div>');
      var g = a('<div id="tiptip_arrow"></div>');
      a("body").append(
        b.html(d).prepend(g.html('<div id="tiptip_arrow_inner"></div>'))
      );
    } else {
      var b = a("#tiptip_holder");
      var d = a("#tiptip_content");
      var g = a("#tiptip_arrow");
    }
    return this.each(function () {
      var k = a(this);
      if (f.content) {
        var n = f.content;
      } else {
        var n = k.attr(f.attribute);
      }
      if (n != "") {
        if (!f.content) {
          k.removeAttr(f.attribute);
        }
        var j = false;
        if (f.activation == "hover") {
          k.hover(
            function () {
              m();
            },
            function () {
              if (!f.keepAlive) {
                l();
              }
            }
          );
          if (f.keepAlive) {
            b.hover(
              function () {},
              function () {
                l();
              }
            );
          }
        } else {
          if (f.activation == "focus") {
            k.focus(function () {
              m();
            }).blur(function () {
              l();
            });
          } else {
            if (f.activation == "click") {
              k.click(function () {
                m();
                return false;
              }).hover(
                function () {},
                function () {
                  if (!f.keepAlive) {
                    l();
                  }
                }
              );
              if (f.keepAlive) {
                b.hover(
                  function () {},
                  function () {
                    l();
                  }
                );
              }
            }
          }
        }
        function m() {
          f.enter.call(this);
          d.html(n);
          b.hide().removeAttr("class").css("margin", "0");
          g.removeAttr("style");
          var B = parseInt(k.offset()["top"]);
          var s = parseInt(k.offset()["left"]);
          var y = parseInt(k.outerWidth());
          var D = parseInt(k.outerHeight());
          var A = b.outerWidth();
          var v = b.outerHeight();
          var z = Math.round((y - A) / 2);
          var r = Math.round((D - v) / 2);
          var q = Math.round(s + z);
          var o = Math.round(B + D + f.edgeOffset);
          var w = "";
          var F = "";
          var x = Math.round(A - 12) / 2;
          if (f.defaultPosition == "bottom") {
            w = "_bottom";
          } else {
            if (f.defaultPosition == "top") {
              w = "_top";
            } else {
              if (f.defaultPosition == "left") {
                w = "_left";
              } else {
                if (f.defaultPosition == "right") {
                  w = "_right";
                }
              }
            }
          }
          var u = z + s < parseInt(a(window).scrollLeft());
          var t = A + s > parseInt(a(window).width());
          if (
            (u && z < 0) ||
            (w == "_right" && !t) ||
            (w == "_left" && s < A + f.edgeOffset + 5)
          ) {
            w = "_right";
            F = Math.round(v - 13) / 2;
            x = -12;
            q = Math.round(s + y + f.edgeOffset);
            o = Math.round(B + r);
          } else {
            if ((t && z < 0) || (w == "_left" && !u)) {
              w = "_left";
              F = Math.round(v - 13) / 2;
              x = Math.round(A);
              q = Math.round(s - (A + f.edgeOffset + 5));
              o = Math.round(B + r);
            }
          }
          var C =
            B + D + f.edgeOffset + v + 8 >
            parseInt(a(window).height() + a(window).scrollTop());
          var E = B + D - (f.edgeOffset + v + 8) < 0;
          if (C || (w == "_bottom" && C) || (w == "_top" && !E)) {
            if (w == "_top" || w == "_bottom") {
              w = "_top";
            } else {
              w = w + "_top";
            }
            F = v;
            o = Math.round(B - (v + 5 + f.edgeOffset));
          } else {
            if (E | (w == "_top" && E) || (w == "_bottom" && !C)) {
              if (w == "_top" || w == "_bottom") {
                w = "_bottom";
              } else {
                w = w + "_bottom";
              }
              F = -12;
              o = Math.round(B + D + f.edgeOffset);
            }
          }
          if (w == "_right_top" || w == "_left_top") {
            o = o + 5;
          } else {
            if (w == "_right_bottom" || w == "_left_bottom") {
              o = o - 5;
            }
          }
          if (w == "_left_top" || w == "_left_bottom") {
            q = q + 5;
          }
          g.css({ "margin-left": x + "px", "margin-top": F + "px" });
          b.css({ "margin-left": q + "px", "margin-top": o + "px" }).attr(
            "class",
            "tip" + w
          );
          if (j) {
            clearTimeout(j);
          }
          j = setTimeout(function () {
            b.stop(true, true).fadeIn(f.fadeIn);
          }, f.delay);
        }
        function l() {
          f.exit.call(this);
          if (j) {
            clearTimeout(j);
          }
          b.fadeOut(f.fadeOut);
        }
      }
    });
  };
})(jQuery);
/* Copyright (c) 2010 Brandon Aaron (http://brandonaaron.net)
 * Dual licensed under the MIT (MIT_LICENSE.txt)
 * and GPL Version 2 (GPL_LICENSE.txt) licenses.
 *
 * Version: 1.1.1
 * Requires jQuery 1.3+
 * Docs: http://docs.jquery.com/Plugins/livequery
 */
(function (a) {
  a.extend(a.fn, {
    livequery: function (f, d, c) {
      var b = this,
        g;
      if (a.isFunction(f)) {
        (c = d), (d = f), (f = undefined);
      }
      a.each(a.livequery.queries, function (h, j) {
        if (
          b.selector == j.selector &&
          b.context == j.context &&
          f == j.type &&
          (!d || d.$lqguid == j.fn.$lqguid) &&
          (!c || c.$lqguid == j.fn2.$lqguid)
        ) {
          return (g = j) && false;
        }
      });
      g = g || new a.livequery(this.selector, this.context, f, d, c);
      g.stopped = false;
      g.run();
      return this;
    },
    expire: function (f, d, c) {
      var b = this;
      if (a.isFunction(f)) {
        (c = d), (d = f), (f = undefined);
      }
      a.each(a.livequery.queries, function (g, h) {
        if (
          b.selector == h.selector &&
          b.context == h.context &&
          (!f || f == h.type) &&
          (!d || d.$lqguid == h.fn.$lqguid) &&
          (!c || c.$lqguid == h.fn2.$lqguid) &&
          !this.stopped
        ) {
          a.livequery.stop(h.id);
        }
      });
      return this;
    },
  });
  a.livequery = function (b, d, g, f, c) {
    this.selector = b;
    this.context = d;
    this.type = g;
    this.fn = f;
    this.fn2 = c;
    this.elements = [];
    this.stopped = false;
    this.id = a.livequery.queries.push(this) - 1;
    f.$lqguid = f.$lqguid || a.livequery.guid++;
    if (c) {
      c.$lqguid = c.$lqguid || a.livequery.guid++;
    }
    return this;
  };
  a.livequery.prototype = {
    stop: function () {
      var b = this;
      if (this.type) {
        this.elements.unbind(this.type, this.fn);
      } else {
        if (this.fn2) {
          this.elements.each(function (c, d) {
            b.fn2.apply(d);
          });
        }
      }
      this.elements = [];
      this.stopped = true;
    },
    run: function () {
      if (this.stopped) {
        return;
      }
      var d = this;
      var f = this.elements,
        c = a(this.selector, this.context),
        b = c.not(f);
      this.elements = c;
      if (this.type) {
        b.bind(this.type, this.fn);
        if (f.length > 0) {
          a.each(f, function (g, h) {
            if (a.inArray(h, c) < 0) {
              a.event.remove(h, d.type, d.fn);
            }
          });
        }
      } else {
        b.each(function () {
          d.fn.apply(this);
        });
        if (this.fn2 && f.length > 0) {
          a.each(f, function (g, h) {
            if (a.inArray(h, c) < 0) {
              d.fn2.apply(h);
            }
          });
        }
      }
    },
  };
  a.extend(a.livequery, {
    guid: 0,
    queries: [],
    queue: [],
    running: false,
    timeout: null,
    checkQueue: function () {
      if (a.livequery.running && a.livequery.queue.length) {
        var b = a.livequery.queue.length;
        while (b--) {
          a.livequery.queries[a.livequery.queue.shift()].run();
        }
      }
    },
    pause: function () {
      a.livequery.running = false;
    },
    play: function () {
      a.livequery.running = true;
      a.livequery.run();
    },
    registerPlugin: function () {
      a.each(arguments, function (c, d) {
        if (!a.fn[d]) {
          return;
        }
        var b = a.fn[d];
        a.fn[d] = function () {
          var f = b.apply(this, arguments);
          a.livequery.run();
          return f;
        };
      });
    },
    run: function (b) {
      if (b != undefined) {
        if (a.inArray(b, a.livequery.queue) < 0) {
          a.livequery.queue.push(b);
        }
      } else {
        a.each(a.livequery.queries, function (c) {
          if (a.inArray(c, a.livequery.queue) < 0) {
            a.livequery.queue.push(c);
          }
        });
      }
      if (a.livequery.timeout) {
        clearTimeout(a.livequery.timeout);
      }
      a.livequery.timeout = setTimeout(a.livequery.checkQueue, 20);
    },
    stop: function (b) {
      if (b != undefined) {
        a.livequery.queries[b].stop();
      } else {
        a.each(a.livequery.queries, function (c) {
          a.livequery.queries[c].stop();
        });
      }
    },
  });
  a.livequery.registerPlugin(
    "append",
    "prepend",
    "after",
    "before",
    "wrap",
    "attr",
    "removeAttr",
    "addClass",
    "removeClass",
    "toggleClass",
    "empty",
    "remove",
    "html",
    "prop",
    "removeProp"
  );
  a(function () {
    a.livequery.play();
  });
})(jQuery);
(function (x, v) {
  var q,
    y = "([^/]+)",
    u = /:([\w\d]+)/g,
    t = /\?([^#]*)$/,
    C = function (a) {
      return Array.prototype.slice.call(a);
    },
    B = function (a) {
      return Object.prototype.toString.call(a) === "[object Function]";
    },
    s = function (a) {
      return Object.prototype.toString.call(a) === "[object Array]";
    },
    w = function (a) {
      return decodeURIComponent(a.replace(/\+/g, " "));
    },
    D = encodeURIComponent,
    z = function (a) {
      return String(a)
        .replace(/&(?!\w+;)/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;");
    },
    r = function (a) {
      return function (c, b) {
        return this.route.apply(this, [a, c, b]);
      };
    },
    E = {},
    A = [];
  q = function () {
    var b = C(arguments),
      a,
      c;
    q.apps = q.apps || {};
    if (b.length === 0 || (b[0] && B(b[0]))) {
      return q.apply(q, ["body"].concat(b));
    } else {
      if (typeof (c = b.shift()) == "string") {
        a = q.apps[c] || new q.Application();
        a.element_selector = c;
        if (b.length > 0) {
          x.each(b, function (f, d) {
            a.use(d);
          });
        }
        if (a.element_selector != c) {
          delete q.apps[c];
        }
        q.apps[a.element_selector] = a;
        return a;
      }
    }
  };
  q.VERSION = "0.6.3";
  q.addLogger = function (a) {
    A.push(a);
  };
  q.log = function () {
    var a = C(arguments);
    a.unshift("[" + Date() + "]");
    x.each(A, function (b, c) {
      c.apply(q, a);
    });
  };
  if (typeof v.console != "undefined") {
    if (B(v.console.log.apply)) {
      q.addLogger(function () {
        v.console.log.apply(v.console, arguments);
      });
    } else {
      q.addLogger(function () {
        v.console.log(arguments);
      });
    }
  } else {
    if (typeof console != "undefined") {
      q.addLogger(function () {
        console.log.apply(console, arguments);
      });
    }
  }
  x.extend(q, { makeArray: C, isFunction: B, isArray: s });
  q.Object = function (a) {
    return x.extend(this, a || {});
  };
  x.extend(q.Object.prototype, {
    escapeHTML: z,
    h: z,
    toHash: function () {
      var a = {};
      x.each(this, function (b, c) {
        if (!B(c)) {
          a[b] = c;
        }
      });
      return a;
    },
    toHTML: function () {
      var a = "";
      x.each(this, function (b, c) {
        if (!B(c)) {
          a += "<strong>" + b + "</strong> " + c + "<br />";
        }
      });
      return a;
    },
    keys: function (c) {
      var b = [];
      for (var a in this) {
        if (!B(this[a]) || !c) {
          b.push(a);
        }
      }
      return b;
    },
    has: function (a) {
      return this[a] && x.trim(this[a].toString()) != "";
    },
    join: function () {
      var a = C(arguments);
      var b = a.shift();
      return a.join(b);
    },
    log: function () {
      q.log.apply(q, arguments);
    },
    toString: function (b) {
      var a = [];
      x.each(this, function (c, d) {
        if (!B(d) || b) {
          a.push('"' + c + '": ' + d.toString());
        }
      });
      return "Sammy.Object: {" + a.join(",") + "}";
    },
  });
  q.HashLocationProxy = function (a, b) {
    this.app = a;
    this.is_native = false;
    this._startPolling(b);
  };
  q.HashLocationProxy.prototype = {
    bind: function () {
      var b = this,
        a = this.app;
      x(v).bind("hashchange." + this.app.eventNamespace(), function (c, d) {
        if (b.is_native === false && !d) {
          q.log("native hash change exists, using");
          b.is_native = true;
          v.clearInterval(q.HashLocationProxy._interval);
        }
        a.trigger("location-changed");
      });
      if (!q.HashLocationProxy._bindings) {
        q.HashLocationProxy._bindings = 0;
      }
      q.HashLocationProxy._bindings++;
    },
    unbind: function () {
      x(v).unbind("hashchange." + this.app.eventNamespace());
      q.HashLocationProxy._bindings--;
      if (q.HashLocationProxy._bindings <= 0) {
        v.clearInterval(q.HashLocationProxy._interval);
      }
    },
    getLocation: function () {
      var a = v.location.toString().match(/^[^#]*(#.+)$/);
      return a ? a[1] : "";
    },
    setLocation: function (a) {
      return (v.location = a);
    },
    _startPolling: function (a) {
      var b = this;
      if (!q.HashLocationProxy._interval) {
        if (!a) {
          a = 10;
        }
        var c = function () {
          var d = b.getLocation();
          if (
            !q.HashLocationProxy._last_location ||
            d != q.HashLocationProxy._last_location
          ) {
            v.setTimeout(function () {
              x(v).trigger("hashchange", [true]);
            }, 13);
          }
          q.HashLocationProxy._last_location = d;
        };
        c();
        q.HashLocationProxy._interval = v.setInterval(c, a);
      }
    },
  };
  q.Application = function (b) {
    var a = this;
    this.routes = {};
    this.listeners = new q.Object({});
    this.arounds = [];
    this.befores = [];
    this.namespace =
      new Date().getTime() + "-" + parseInt(Math.random() * 1000, 10);
    this.context_prototype = function () {
      q.EventContext.apply(this, arguments);
    };
    this.context_prototype.prototype = new q.EventContext();
    if (B(b)) {
      b.apply(this, [this]);
    }
    if (!this._location_proxy) {
      this.setLocationProxy(
        new q.HashLocationProxy(this, this.run_interval_every)
      );
    }
    if (this.debug) {
      this.bindToAllEvents(function (c, d) {
        a.log(a.toString(), c.cleaned_type, d || {});
      });
    }
  };
  q.Application.prototype = x.extend({}, q.Object.prototype, {
    ROUTE_VERBS: ["get", "post", "put", "delete"],
    APP_EVENTS: [
      "run",
      "unload",
      "lookup-route",
      "run-route",
      "route-found",
      "event-context-before",
      "event-context-after",
      "changed",
      "error",
      "check-form-submission",
      "redirect",
      "location-changed",
    ],
    _last_route: null,
    _location_proxy: null,
    _running: false,
    element_selector: "body",
    debug: false,
    raise_errors: false,
    run_interval_every: 50,
    template_engine: null,
    toString: function () {
      return "Sammy.Application:" + this.element_selector;
    },
    $element: function (a) {
      return a ? x(this.element_selector).find(a) : x(this.element_selector);
    },
    use: function () {
      var d = C(arguments),
        b = d.shift(),
        c = b || "";
      try {
        d.unshift(this);
        if (typeof b == "string") {
          c = "Sammy." + b;
          b = q[b];
        }
        b.apply(this, d);
      } catch (a) {
        if (typeof b === "undefined") {
          this.error(
            "Plugin Error: called use() but plugin (" +
              c.toString() +
              ") is not defined",
            a
          );
        } else {
          if (!B(b)) {
            this.error(
              "Plugin Error: called use() but '" +
                c.toString() +
                "' is not a function",
              a
            );
          } else {
            this.error("Plugin Error", a);
          }
        }
      }
      return this;
    },
    setLocationProxy: function (b) {
      var a = this._location_proxy;
      this._location_proxy = b;
      if (this.isRunning()) {
        if (a) {
          a.unbind();
        }
        this._location_proxy.bind();
      }
    },
    route: function (c, g, a) {
      var d = this,
        b = [],
        h,
        f;
      if (!a && B(g)) {
        g = c;
        a = g;
        c = "any";
      }
      c = c.toLowerCase();
      if (g.constructor == String) {
        u.lastIndex = 0;
        while ((f = u.exec(g)) !== null) {
          b.push(f[1]);
        }
        g = new RegExp("^" + g.replace(u, y) + "$");
      }
      if (typeof a == "string") {
        a = d[a];
      }
      h = function (k) {
        var j = { verb: k, path: g, callback: a, param_names: b };
        d.routes[k] = d.routes[k] || [];
        d.routes[k].push(j);
      };
      if (c === "any") {
        x.each(this.ROUTE_VERBS, function (j, k) {
          h(k);
        });
      } else {
        h(c);
      }
      return this;
    },
    get: r("get"),
    post: r("post"),
    put: r("put"),
    del: r("delete"),
    any: r("any"),
    mapRoutes: function (a) {
      var b = this;
      x.each(a, function (d, c) {
        b.route.apply(b, c);
      });
      return this;
    },
    eventNamespace: function () {
      return ["sammy-app", this.namespace].join("-");
    },
    bind: function (f, c, a) {
      var b = this;
      if (typeof a == "undefined") {
        a = c;
      }
      var d = function () {
        var g, j, h;
        g = arguments[0];
        h = arguments[1];
        if (h && h.context) {
          j = h.context;
          delete h.context;
        } else {
          j = new b.context_prototype(b, "bind", g.type, h, g.target);
        }
        g.cleaned_type = g.type.replace(b.eventNamespace(), "");
        a.apply(j, [g, h]);
      };
      if (!this.listeners[f]) {
        this.listeners[f] = [];
      }
      this.listeners[f].push(d);
      if (this.isRunning()) {
        this._listen(f, d);
      }
      return this;
    },
    trigger: function (b, a) {
      this.$element().trigger([b, this.eventNamespace()].join("."), [a]);
      return this;
    },
    refresh: function () {
      this.last_location = null;
      this.trigger("location-changed");
      return this;
    },
    before: function (b, a) {
      if (B(b)) {
        a = b;
        b = {};
      }
      this.befores.push([b, a]);
      return this;
    },
    after: function (a) {
      return this.bind("event-context-after", a);
    },
    around: function (a) {
      this.arounds.push(a);
      return this;
    },
    isRunning: function () {
      return this._running;
    },
    helpers: function (a) {
      x.extend(this.context_prototype.prototype, a);
      return this;
    },
    helper: function (b, a) {
      this.context_prototype.prototype[b] = a;
      return this;
    },
    run: function (b) {
      if (this.isRunning()) {
        return false;
      }
      var a = this;
      x.each(this.listeners.toHash(), function (d, c) {
        x.each(c, function (f, g) {
          a._listen(d, g);
        });
      });
      this.trigger("run", { start_url: b });
      this._running = true;
      this.last_location = null;
      if (this.getLocation() == "" && typeof b != "undefined") {
        this.setLocation(b);
      }
      this._checkLocation();
      this._location_proxy.bind();
      this.bind("location-changed", function () {
        a._checkLocation();
      });
      this.bind("submit", function (c) {
        var d = a._checkFormSubmission(x(c.target).closest("form"));
        return d === false ? c.preventDefault() : false;
      });
      x(v).bind("beforeunload", function () {
        a.unload();
      });
      return this.trigger("changed");
    },
    unload: function () {
      if (!this.isRunning()) {
        return false;
      }
      var a = this;
      this.trigger("unload");
      this._location_proxy.unbind();
      this.$element().unbind("submit").removeClass(a.eventNamespace());
      x.each(this.listeners.toHash(), function (c, b) {
        x.each(b, function (d, f) {
          a._unlisten(c, f);
        });
      });
      this._running = false;
      return this;
    },
    bindToAllEvents: function (a) {
      var b = this;
      x.each(this.APP_EVENTS, function (d, c) {
        b.bind(c, a);
      });
      x.each(this.listeners.keys(true), function (c, d) {
        if (b.APP_EVENTS.indexOf(d) == -1) {
          b.bind(d, a);
        }
      });
      return this;
    },
    routablePath: function (a) {
      return a.replace(t, "");
    },
    lookupRoute: function (a, c) {
      var b = this,
        d = false;
      this.trigger("lookup-route", { verb: a, path: c });
      if (typeof this.routes[a] != "undefined") {
        x.each(this.routes[a], function (f, g) {
          if (b.routablePath(c).match(g.path)) {
            d = g;
            return false;
          }
        });
      }
      return d;
    },
    runRoute: function (b, G, F, m) {
      var H = this,
        c = this.lookupRoute(b, G),
        d,
        j,
        o,
        k,
        a,
        h,
        l,
        g,
        f;
      this.log("runRoute", [b, G].join(" "));
      this.trigger("run-route", { verb: b, path: G, params: F });
      if (typeof F == "undefined") {
        F = {};
      }
      x.extend(F, this._parseQueryString(G));
      if (c) {
        this.trigger("route-found", { route: c });
        if ((g = c.path.exec(this.routablePath(G))) !== null) {
          g.shift();
          x.each(g, function (J, I) {
            if (c.param_names[J]) {
              F[c.param_names[J]] = w(I);
            } else {
              if (!F.splat) {
                F.splat = [];
              }
              F.splat.push(w(I));
            }
          });
        }
        d = new this.context_prototype(this, b, G, F, m);
        o = this.arounds.slice(0);
        a = this.befores.slice(0);
        l = [d].concat(F.splat);
        j = function () {
          var I;
          while (a.length > 0) {
            h = a.shift();
            if (H.contextMatchesOptions(d, h[0])) {
              I = h[1].apply(d, [d]);
              if (I === false) {
                return false;
              }
            }
          }
          H.last_route = c;
          d.trigger("event-context-before", { context: d });
          I = c.callback.apply(d, l);
          d.trigger("event-context-after", { context: d });
          return I;
        };
        x.each(o.reverse(), function (K, J) {
          var I = j;
          j = function () {
            return J.apply(d, [I]);
          };
        });
        try {
          f = j();
        } catch (n) {
          this.error(["500 Error", b, G].join(" "), n);
        }
        return f;
      } else {
        return this.notFound(b, G);
      }
    },
    contextMatchesOptions: function (c, a, f) {
      var d = a;
      if (typeof d === "undefined" || d == {}) {
        return true;
      }
      if (typeof f === "undefined") {
        f = true;
      }
      if (typeof d === "string" || B(d.test)) {
        d = { path: d };
      }
      if (d.only) {
        return this.contextMatchesOptions(c, d.only, true);
      } else {
        if (d.except) {
          return this.contextMatchesOptions(c, d.except, false);
        }
      }
      var g = true,
        b = true;
      if (d.path) {
        if (B(d.path.test)) {
          g = d.path.test(c.path);
        } else {
          g = d.path.toString() === c.path;
        }
      }
      if (d.verb) {
        b = d.verb === c.verb;
      }
      return f ? b && g : !(b && g);
    },
    getLocation: function () {
      return this._location_proxy.getLocation();
    },
    setLocation: function (a) {
      return this._location_proxy.setLocation(a);
    },
    swap: function (a) {
      return this.$element().html(a);
    },
    templateCache: function (b, a) {
      if (typeof a != "undefined") {
        return (E[b] = a);
      } else {
        return E[b];
      }
    },
    clearTemplateCache: function () {
      return (E = {});
    },
    notFound: function (a, b) {
      var c = this.error(["404 Not Found", a, b].join(" "));
      return a === "get" ? c : true;
    },
    error: function (a, b) {
      if (!b) {
        b = new Error();
      }
      b.message = [a, b.message].join(" ");
      this.trigger("error", { message: b.message, error: b });
      if (this.raise_errors) {
        throw b;
      } else {
        this.log(b.message, b);
      }
    },
    _checkLocation: function () {
      var b, a;
      b = this.getLocation();
      if (
        !this.last_location ||
        this.last_location[0] != "get" ||
        this.last_location[1] != b
      ) {
        this.last_location = ["get", b];
        a = this.runRoute("get", b);
      }
      return a;
    },
    _getFormVerb: function (b) {
      var c = x(b),
        a,
        d;
      d = c.find('input[name="_method"]');
      if (d.length > 0) {
        a = d.val();
      }
      if (!a) {
        a = c[0].getAttribute("method");
      }
      if (!a || a == "") {
        a = "get";
      }
      return x.trim(a.toString().toLowerCase());
    },
    _checkFormSubmission: function (d) {
      var g, c, a, b, f;
      this.trigger("check-form-submission", { form: d });
      g = x(d);
      c = g.attr("action");
      a = this._getFormVerb(g);
      this.log("_checkFormSubmission", g, c, a);
      if (a === "get") {
        this.setLocation(c + "?" + this._serializeFormParams(g));
        f = false;
      } else {
        b = x.extend({}, this._parseFormParams(g));
        f = this.runRoute(a, c, b, d.get(0));
      }
      return typeof f == "undefined" ? false : f;
    },
    _serializeFormParams: function (c) {
      var a = "",
        d = c.serializeArray(),
        b;
      if (d.length > 0) {
        a = this._encodeFormPair(d[0].name, d[0].value);
        for (b = 1; b < d.length; b++) {
          a = a + "&" + this._encodeFormPair(d[b].name, d[b].value);
        }
      }
      return a;
    },
    _encodeFormPair: function (b, a) {
      return D(b) + "=" + D(a);
    },
    _parseFormParams: function (d) {
      var a = {},
        b = d.serializeArray(),
        c;
      for (c = 0; c < b.length; c++) {
        a = this._parseParamPair(a, b[c].name, b[c].value);
      }
      return a;
    },
    _parseQueryString: function (c) {
      var a = {},
        d,
        f,
        b,
        g;
      d = c.match(t);
      if (d) {
        f = d[1].split("&");
        for (g = 0; g < f.length; g++) {
          b = f[g].split("=");
          a = this._parseParamPair(a, w(b[0]), w(b[1]));
        }
      }
      return a;
    },
    _parseParamPair: function (a, c, b) {
      if (a[c]) {
        if (s(a[c])) {
          a[c].push(b);
        } else {
          a[c] = [a[c], b];
        }
      } else {
        a[c] = b;
      }
      return a;
    },
    _listen: function (b, a) {
      return this.$element().bind([b, this.eventNamespace()].join("."), a);
    },
    _unlisten: function (b, a) {
      return this.$element().unbind([b, this.eventNamespace()].join("."), a);
    },
  });
  q.RenderContext = function (a) {
    this.event_context = a;
    this.callbacks = [];
    this.previous_content = null;
    this.content = null;
    this.next_engine = false;
    this.waiting = false;
  };
  q.RenderContext.prototype = x.extend({}, q.Object.prototype, {
    then: function (a) {
      if (!B(a)) {
        if (typeof a === "string" && a in this.event_context) {
          var b = this.event_context[a];
          a = function (d) {
            return b.apply(this.event_context, [d]);
          };
        } else {
          return this;
        }
      }
      var c = this;
      if (this.waiting) {
        this.callbacks.push(a);
      } else {
        this.wait();
        v.setTimeout(function () {
          var d = a.apply(c, [c.content, c.previous_content]);
          if (d !== false) {
            c.next(d);
          }
        }, 13);
      }
      return this;
    },
    wait: function () {
      this.waiting = true;
    },
    next: function (a) {
      this.waiting = false;
      if (typeof a !== "undefined") {
        this.previous_content = this.content;
        this.content = a;
      }
      if (this.callbacks.length > 0) {
        this.then(this.callbacks.shift());
      }
    },
    load: function (d, c, a) {
      var b = this;
      return this.then(function () {
        var j, h, f, g;
        if (B(c)) {
          a = c;
          c = {};
        } else {
          c = x.extend({}, c);
        }
        if (a) {
          this.then(a);
        }
        if (typeof d === "string") {
          f = d.match(/\.json$/) || c.json;
          j = (f && c.cache === true) || c.cache !== false;
          b.next_engine = b.event_context.engineFor(d);
          delete c.cache;
          delete c.json;
          if (c.engine) {
            b.next_engine = c.engine;
            delete c.engine;
          }
          if (j && (h = this.event_context.app.templateCache(d))) {
            return h;
          }
          this.wait();
          x.ajax(
            x.extend(
              {
                url: d,
                data: {},
                dataType: f ? "json" : null,
                type: "get",
                success: function (k) {
                  if (j) {
                    b.event_context.app.templateCache(d, k);
                  }
                  b.next(k);
                },
              },
              c
            )
          );
          return false;
        } else {
          if (d.nodeType) {
            return d.innerHTML;
          }
          if (d.selector) {
            b.next_engine = d.attr("data-engine");
            if (c.clone === false) {
              return d.remove()[0].innerHTML.toString();
            } else {
              return d[0].innerHTML.toString();
            }
          }
        }
      });
    },
    render: function (c, b, a) {
      if (B(c) && !b) {
        return this.then(c);
      } else {
        if (!b && this.content) {
          b = this.content;
        }
        return this.load(c).interpolate(b, c).then(a);
      }
    },
    partial: function (b, a) {
      return this.render(b, a).swap();
    },
    send: function () {
      var a = this,
        b = C(arguments),
        c = b.shift();
      if (s(b[0])) {
        b = b[0];
      }
      return this.then(function (d) {
        b.push(function (f) {
          a.next(f);
        });
        a.wait();
        c.apply(c, b);
        return false;
      });
    },
    collect: function (a, b, f) {
      var c = this;
      var d = function () {
        if (B(a)) {
          b = a;
          a = this.content;
        }
        var h = [],
          g = false;
        x.each(a, function (k, l) {
          var j = b.apply(c, [k, l]);
          if (j.jquery && j.length == 1) {
            j = j[0];
            g = true;
          }
          h.push(j);
          return j;
        });
        return g ? h : h.join("");
      };
      return f ? d() : this.then(d);
    },
    renderEach: function (d, c, b, a) {
      if (s(c)) {
        a = b;
        b = c;
        c = null;
      }
      return this.load(d).then(function (f) {
        var g = this;
        if (!b) {
          b = s(this.previous_content) ? this.previous_content : [];
        }
        if (a) {
          x.each(b, function (k, h) {
            var l = {},
              j = this.next_engine || d;
            c ? (l[c] = h) : (l = h);
            a(h, g.event_context.interpolate(f, l, j));
          });
        } else {
          return this.collect(
            b,
            function (k, h) {
              var l = {},
                j = this.next_engine || d;
              c ? (l[c] = h) : (l = h);
              return this.event_context.interpolate(f, l, j);
            },
            true
          );
        }
      });
    },
    interpolate: function (a, b, d) {
      var c = this;
      return this.then(function (g, h) {
        if (!a && h) {
          a = h;
        }
        if (this.next_engine) {
          b = this.next_engine;
          this.next_engine = false;
        }
        var f = c.event_context.interpolate(g, a, b);
        return d ? h + f : f;
      });
    },
    swap: function () {
      return this.then(function (a) {
        this.event_context.swap(a);
      }).trigger("changed", {});
    },
    appendTo: function (a) {
      return this.then(function (b) {
        x(a).append(b);
      }).trigger("changed", {});
    },
    prependTo: function (a) {
      return this.then(function (b) {
        x(a).prepend(b);
      }).trigger("changed", {});
    },
    replace: function (a) {
      return this.then(function (b) {
        x(a).html(b);
      }).trigger("changed", {});
    },
    trigger: function (b, a) {
      return this.then(function (c) {
        if (typeof a == "undefined") {
          a = { content: c };
        }
        this.event_context.trigger(b, a);
      });
    },
  });
  q.EventContext = function (a, b, d, c, f) {
    this.app = a;
    this.verb = b;
    this.path = d;
    this.params = new q.Object(c);
    this.target = f;
  };
  q.EventContext.prototype = x.extend({}, q.Object.prototype, {
    $element: function () {
      return this.app.$element(C(arguments).shift());
    },
    engineFor: function (a) {
      var b = this,
        c;
      if (B(a)) {
        return a;
      }
      a = (a || b.app.template_engine).toString();
      if ((c = a.match(/\.([^\.]+)$/))) {
        a = c[1];
      }
      if (a && B(b[a])) {
        return b[a];
      }
      if (b.app.template_engine) {
        return this.engineFor(b.app.template_engine);
      }
      return function (f, d) {
        return f;
      };
    },
    interpolate: function (b, a, c) {
      return this.engineFor(c).apply(this, [b, a]);
    },
    render: function (c, b, a) {
      return new q.RenderContext(this).render(c, b, a);
    },
    renderEach: function (d, c, b, a) {
      return new q.RenderContext(this).renderEach(d, c, b, a);
    },
    load: function (c, b, a) {
      return new q.RenderContext(this).load(c, b, a);
    },
    partial: function (b, a) {
      return new q.RenderContext(this).partial(b, a);
    },
    send: function () {
      var a = new q.RenderContext(this);
      return a.send.apply(a, arguments);
    },
    redirect: function () {
      var a,
        b = C(arguments),
        c = this.app.getLocation();
      if (b.length > 1) {
        b.unshift("/");
        a = this.join.apply(this, b);
      } else {
        a = b[0];
      }
      this.trigger("redirect", { to: a });
      this.app.last_location = [this.verb, this.path];
      this.app.setLocation(a);
      if (c == a) {
        this.app.trigger("location-changed");
      }
    },
    trigger: function (b, a) {
      if (typeof a == "undefined") {
        a = {};
      }
      if (!a.context) {
        a.context = this;
      }
      return this.app.trigger(b, a);
    },
    eventNamespace: function () {
      return this.app.eventNamespace();
    },
    swap: function (a) {
      return this.app.swap(a);
    },
    notFound: function () {
      return this.app.notFound(this.verb, this.path);
    },
    json: function (a) {
      return x.parseJSON(a);
    },
    toString: function () {
      return (
        "Sammy.EventContext: " + [this.verb, this.path, this.params].join(" ")
      );
    },
  });
  x.sammy = v.Sammy = q;
})(jQuery, window);
(function (a) {
  a.fn.classData = function (b, d) {
    var c = a(this).classDataGlue();
    if (d == undefined || d == null || !d) {
      var f = Array(this.length);
      b = b + c;
      this.each(function (g) {
        var h = a(this);
        a.each(h.attr("class").split(" "), function (j, k) {
          if (k.substr(0, b.length) == b) {
            f[g] = decodeURIComponent(k.replace(b, ""));
            return false;
          }
        });
      });
      return f;
    } else {
      return this.each(function () {
        var g = a(this);
        g.removeClass(b + c + g.classData(b));
        g.addClass(b + c + encodeURIComponent(d));
      });
    }
  };
  a.fn.classDataGlue = function (b) {
    if (b != undefined) {
      a.fn.classData.glue = b;
      return this;
    } else {
      if (!a.fn.classData.glue) {
        a.fn.classData.glue = "_";
      }
      return a.fn.classData.glue;
    }
  };
})(jQuery);
/*
 * jQuery Raty - A Star Rating Plugin
 *
 * Licensed under The MIT License
 *
 * @version        2.4.5
 * @author         Washington Botelho
 * @documentation  wbotelhos.com/raty
 *
 */
(function (c) {
  var d = {
    init: function (a) {
      return this.each(function () {
        var m = this,
          b = c(m).empty();
        m.opt = c.extend(true, {}, c.fn.raty.defaults, a);
        b.data("settings", m.opt);
        m.opt.number = d.between(m.opt.number, 0, 20);
        if (
          m.opt.path.substring(m.opt.path.length - 1, m.opt.path.length) != "/"
        ) {
          m.opt.path += "/";
        }
        if (typeof m.opt.score == "function") {
          m.opt.score = m.opt.score.call(m);
        }
        if (m.opt.score) {
          m.opt.score = d.between(m.opt.score, 0, m.opt.number);
        }
        for (var l = 1; l <= m.opt.number; l++) {
          c("<img />", {
            src:
              m.opt.path +
              (!m.opt.score || m.opt.score < l ? m.opt.starOff : m.opt.starOn),
            alt: l,
            title:
              l <= m.opt.hints.length && m.opt.hints[l - 1] !== null
                ? m.opt.hints[l - 1]
                : l,
          }).appendTo(m);
          if (m.opt.space) {
            b.append(l < m.opt.number ? "&#160;" : "");
          }
        }
        m.stars = b.children('img:not(".raty-cancel")');
        m.score = c("<input />", {
          type: "hidden",
          name: m.opt.scoreName,
        }).appendTo(m);
        if (m.opt.score && m.opt.score > 0) {
          m.score.val(m.opt.score);
          d.roundStar.call(m, m.opt.score);
        }
        if (m.opt.iconRange) {
          d.fill.call(m, m.opt.score);
        }
        d.setTarget.call(m, m.opt.score, m.opt.targetKeep);
        var j = m.opt.space ? 4 : 0,
          k = m.opt.width || m.opt.number * m.opt.size + m.opt.number * j;
        if (m.opt.cancel) {
          m.cancel = c("<img />", {
            src: m.opt.path + m.opt.cancelOff,
            alt: "x",
            title: m.opt.cancelHint,
            class: "raty-cancel",
          });
          if (m.opt.cancelPlace == "left") {
            b.prepend("&#160;").prepend(m.cancel);
          } else {
            b.append("&#160;").append(m.cancel);
          }
          k += m.opt.size + j;
        }
        if (m.opt.readOnly) {
          d.fixHint.call(m);
          if (m.cancel) {
            m.cancel.hide();
          }
        } else {
          b.css("cursor", "pointer");
          d.bindAction.call(m);
        }
        b.css("width", k);
      });
    },
    between: function (a, b, f) {
      return Math.min(Math.max(parseFloat(a), b), f);
    },
    bindAction: function () {
      var f = this,
        a = c(f);
      a.mouseleave(function () {
        var g = f.score.val() || undefined;
        d.initialize.call(f, g);
        d.setTarget.call(f, g, f.opt.targetKeep);
        if (f.opt.mouseover) {
          f.opt.mouseover.call(f, g);
        }
      });
      var b = f.opt.half ? "mousemove" : "mouseover";
      if (f.opt.cancel) {
        f.cancel
          .mouseenter(function () {
            c(this).attr("src", f.opt.path + f.opt.cancelOn);
            f.stars.attr("src", f.opt.path + f.opt.starOff);
            d.setTarget.call(f, null, true);
            if (f.opt.mouseover) {
              f.opt.mouseover.call(f, null);
            }
          })
          .mouseleave(function () {
            c(this).attr("src", f.opt.path + f.opt.cancelOff);
            if (f.opt.mouseover) {
              f.opt.mouseover.call(f, f.score.val() || null);
            }
          })
          .click(function (g) {
            f.score.removeAttr("value");
            if (f.opt.click) {
              f.opt.click.call(f, null, g);
            }
          });
      }
      f.stars
        .bind(b, function (l) {
          var k = parseInt(this.alt, 10);
          if (f.opt.half) {
            var m = parseFloat((l.pageX - c(this).offset().left) / f.opt.size),
              j = m > 0.5 ? 1 : 0.5;
            k = parseFloat(this.alt) - 1 + j;
            d.fill.call(f, k);
            if (f.opt.precision) {
              k = k - j + m;
            }
            d.showHalf.call(f, k);
          } else {
            d.fill.call(f, k);
          }
          a.data("score", k);
          d.setTarget.call(f, k, true);
          if (f.opt.mouseover) {
            f.opt.mouseover.call(f, k, l);
          }
        })
        .click(function (g) {
          f.score.val(
            f.opt.half || f.opt.precision ? a.data("score") : this.alt
          );
          if (f.opt.click) {
            f.opt.click.call(f, f.score.val(), g);
          }
        });
    },
    cancel: function (a) {
      return c(this).each(function () {
        var f = this,
          b = c(f);
        if (b.data("readonly") === true) {
          return this;
        }
        if (a) {
          d.click.call(f, null);
        } else {
          d.score.call(f, null);
        }
        f.score.removeAttr("value");
      });
    },
    click: function (a) {
      return c(this).each(function () {
        if (c(this).data("readonly") === true) {
          return this;
        }
        d.initialize.call(this, a);
        if (this.opt.click) {
          this.opt.click.call(this, a);
        } else {
          d.error.call(
            this,
            'you must add the "click: function(score, evt) { }" callback.'
          );
        }
        d.setTarget.call(this, a, true);
      });
    },
    error: function (a) {
      c(this).html(a);
      c.error(a);
    },
    fill: function (a) {
      var r = this,
        l = r.stars.length,
        m = 0,
        q,
        b,
        n;
      for (var o = 1; o <= l; o++) {
        q = r.stars.eq(o - 1);
        if (r.opt.iconRange && r.opt.iconRange.length > m) {
          b = r.opt.iconRange[m];
          if (r.opt.single) {
            n = o == a ? b.on || r.opt.starOn : b.off || r.opt.starOff;
          } else {
            n = o <= a ? b.on || r.opt.starOn : b.off || r.opt.starOff;
          }
          if (o <= b.range) {
            q.attr("src", r.opt.path + n);
          }
          if (o == b.range) {
            m++;
          }
        } else {
          if (r.opt.single) {
            n = o == a ? r.opt.starOn : r.opt.starOff;
          } else {
            n = o <= a ? r.opt.starOn : r.opt.starOff;
          }
          q.attr("src", r.opt.path + n);
        }
      }
    },
    fixHint: function () {
      var f = c(this),
        a = parseInt(this.score.val(), 10),
        b = this.opt.noRatedMsg;
      if (!isNaN(a) && a > 0) {
        b =
          a <= this.opt.hints.length && this.opt.hints[a - 1] !== null
            ? this.opt.hints[a - 1]
            : a;
      }
      f.data("readonly", true).css("cursor", "default").attr("title", b);
      this.score.attr("readonly", "readonly");
      this.stars.attr("title", b);
    },
    getScore: function () {
      var a = [],
        b;
      c(this).each(function () {
        b = this.score.val();
        a.push(b ? parseFloat(b) : undefined);
      });
      return a.length > 1 ? a : a[0];
    },
    readOnly: function (a) {
      return this.each(function () {
        var b = c(this);
        if (b.data("readonly") === a) {
          return this;
        }
        if (this.cancel) {
          if (a) {
            this.cancel.hide();
          } else {
            this.cancel.show();
          }
        }
        if (a) {
          b.unbind();
          b.children("img").unbind();
          d.fixHint.call(this);
        } else {
          d.bindAction.call(this);
          d.unfixHint.call(this);
        }
        b.data("readonly", a);
      });
    },
    reload: function () {
      return d.set.call(this, {});
    },
    roundStar: function (a) {
      var b = (a - Math.floor(a)).toFixed(2);
      if (b > this.opt.round.down) {
        var f = this.opt.starOn;
        if (b < this.opt.round.up && this.opt.halfShow) {
          f = this.opt.starHalf;
        } else {
          if (b < this.opt.round.full) {
            f = this.opt.starOff;
          }
        }
        this.stars.eq(Math.ceil(a) - 1).attr("src", this.opt.path + f);
      }
    },
    score: function () {
      return arguments.length
        ? d.setScore.apply(this, arguments)
        : d.getScore.call(this);
    },
    set: function (a) {
      this.each(function () {
        var h = c(this),
          b = h.data("settings"),
          g = h.clone().removeAttr("style").insertBefore(h);
        h.remove();
        g.raty(c.extend(b, a));
      });
      return c(this.selector);
    },
    setScore: function (a) {
      return c(this).each(function () {
        if (c(this).data("readonly") === true) {
          return this;
        }
        d.initialize.call(this, a);
        d.setTarget.call(this, a, true);
      });
    },
    setTarget: function (b, g) {
      if (this.opt.target) {
        var h = c(this.opt.target);
        if (h.length == 0) {
          d.error.call(this, "target selector invalid or missing!");
        }
        var a = b;
        if (!g || a === undefined) {
          a = this.opt.targetText;
        } else {
          if (this.opt.targetType == "hint") {
            a =
              a === null && this.opt.cancel
                ? this.opt.cancelHint
                : this.opt.hints[Math.ceil(a - 1)];
          } else {
            a = this.opt.precision ? parseFloat(a).toFixed(1) : parseInt(a, 10);
          }
        }
        if (this.opt.targetFormat.indexOf("{score}") < 0) {
          d.error.call(this, 'template "{score}" missing!');
        }
        if (b !== null) {
          a = this.opt.targetFormat.toString().replace("{score}", a);
        }
        if (h.is(":input")) {
          h.val(a);
        } else {
          h.html(a);
        }
      }
    },
    showHalf: function (a) {
      var b = (a - Math.floor(a)).toFixed(1);
      if (b > 0 && b < 0.6) {
        this.stars
          .eq(Math.ceil(a) - 1)
          .attr("src", this.opt.path + this.opt.starHalf);
      }
    },
    initialize: function (a) {
      a = !a ? 0 : d.between(a, 0, this.opt.number);
      d.fill.call(this, a);
      if (a > 0) {
        if (this.opt.halfShow) {
          d.roundStar.call(this, a);
        }
        this.score.val(a);
      }
    },
    unfixHint: function () {
      for (var a = 0; a < this.opt.number; a++) {
        this.stars
          .eq(a)
          .attr(
            "title",
            a < this.opt.hints.length && this.opt.hints[a] !== null
              ? this.opt.hints[a]
              : a
          );
      }
      c(this)
        .data("readonly", false)
        .css("cursor", "pointer")
        .removeAttr("title");
      this.score.attr("readonly", "readonly");
    },
  };
  c.fn.raty = function (a) {
    if (d[a]) {
      return d[a].apply(this, Array.prototype.slice.call(arguments, 1));
    } else {
      if (typeof a === "object" || !a) {
        return d.init.apply(this, arguments);
      } else {
        c.error("Method " + a + " does not exist!");
      }
    }
  };
  c.fn.raty.defaults = {
    cancel: false,
    cancelHint: "cancel this rating!",
    cancelOff: "cancel-off.png",
    cancelOn: "cancel-on.png",
    cancelPlace: "left",
    click: undefined,
    half: false,
    halfShow: true,
    hints: ["bad", "poor", "regular", "good", "gorgeous"],
    iconRange: undefined,
    mouseover: undefined,
    noRatedMsg: "not rated yet",
    number: 5,
    path: "img/",
    precision: false,
    round: { down: 0.25, full: 0.6, up: 0.76 },
    readOnly: false,
    score: undefined,
    scoreName: "score",
    single: false,
    size: 16,
    space: true,
    starHalf: "star-half.png",
    starOff: "star-off.png",
    starOn: "star-on.png",
    target: undefined,
    targetFormat: "{score}",
    targetKeep: false,
    targetText: "",
    targetType: "hint",
    width: undefined,
  };
})(jQuery);
(function (a) {
  a.fn.serializeObject = function () {
    var c = {};
    var b = this.serializeArray();
    a.each(b, function () {
      if (c[this.name] !== undefined) {
        if (!c[this.name].push) {
          c[this.name] = [c[this.name]];
        }
        c[this.name].push(this.value || "");
      } else {
        c[this.name] = this.value || "";
      }
    });
    return c;
  };
})(jQuery);
var $j = jQuery.noConflict();
if (typeof YAHOO == "undefined" || !YAHOO) {
  var YAHOO = {};
}
YAHOO.namespace = function () {
  var a = arguments,
    b = null,
    d,
    f,
    c;
  for (d = 0; d < a.length; d = d + 1) {
    c = ("" + a[d]).split(".");
    b = YAHOO;
    for (f = c[0] == "YAHOO" ? 1 : 0; f < c.length; f = f + 1) {
      b[c[f]] = b[c[f]] || {};
      b = b[c[f]];
    }
  }
  return b;
};
YAHOO.log = function (b, a, c) {
  var d = YAHOO.widget.Logger;
  if (d && d.log) {
    return d.log(b, a, c);
  } else {
    return false;
  }
};
YAHOO.register = function (d, k, a) {
  var f = YAHOO.env.modules,
    c,
    g,
    h,
    j,
    b;
  if (!f[d]) {
    f[d] = { versions: [], builds: [] };
  }
  c = f[d];
  g = a.version;
  h = a.build;
  j = YAHOO.env.listeners;
  c.name = d;
  c.version = g;
  c.build = h;
  c.versions.push(g);
  c.builds.push(h);
  c.mainClass = k;
  for (b = 0; b < j.length; b = b + 1) {
    j[b](c);
  }
  if (k) {
    k.VERSION = g;
    k.BUILD = h;
  } else {
    YAHOO.log("mainClass is undefined for module " + d, "warn");
  }
};
YAHOO.env = YAHOO.env || { modules: [], listeners: [] };
YAHOO.env.getVersion = function (a) {
  return YAHOO.env.modules[a] || null;
};
YAHOO.env.ua = (function () {
  var b = {
      ie: 0,
      opera: 0,
      gecko: 0,
      webkit: 0,
      mobile: null,
      air: 0,
      caja: 0,
    },
    c = navigator.userAgent,
    a;
  if (/KHTML/.test(c)) {
    b.webkit = 1;
  }
  a = c.match(/AppleWebKit\/([^\s]*)/);
  if (a && a[1]) {
    b.webkit = parseFloat(a[1]);
    if (/ Mobile\//.test(c)) {
      b.mobile = "Apple";
    } else {
      a = c.match(/NokiaN[^\/]*/);
      if (a) {
        b.mobile = a[0];
      }
    }
    a = c.match(/AdobeAIR\/([^\s]*)/);
    if (a) {
      b.air = a[0];
    }
  }
  if (!b.webkit) {
    a = c.match(/Opera[\s\/]([^\s]*)/);
    if (a && a[1]) {
      b.opera = parseFloat(a[1]);
      a = c.match(/Opera Mini[^;]*/);
      if (a) {
        b.mobile = a[0];
      }
    } else {
      a = c.match(/MSIE\s([^;]*)/);
      if (a && a[1]) {
        b.ie = parseFloat(a[1]);
      } else {
        a = c.match(/Gecko\/([^\s]*)/);
        if (a) {
          b.gecko = 1;
          a = c.match(/rv:([^\s\)]*)/);
          if (a && a[1]) {
            b.gecko = parseFloat(a[1]);
          }
        }
      }
    }
  }
  a = c.match(/Caja\/([^\s]*)/);
  if (a && a[1]) {
    b.caja = parseFloat(a[1]);
  }
  return b;
})();
(function () {
  YAHOO.namespace("util", "widget", "example");
  if ("undefined" !== typeof YAHOO_config) {
    var d = YAHOO_config.listener,
      a = YAHOO.env.listeners,
      b = true,
      c;
    if (d) {
      for (c = 0; c < a.length; c = c + 1) {
        if (a[c] == d) {
          b = false;
          break;
        }
      }
      if (b) {
        a.push(d);
      }
    }
  }
})();
YAHOO.lang = YAHOO.lang || {};
(function () {
  var g = YAHOO.lang,
    b = "[object Array]",
    f = "[object Function]",
    a = Object.prototype,
    c = ["toString", "valueOf"],
    d = {
      isArray: function (h) {
        return a.toString.apply(h) === b;
      },
      isBoolean: function (h) {
        return typeof h === "boolean";
      },
      isFunction: function (h) {
        return a.toString.apply(h) === f;
      },
      isNull: function (h) {
        return h === null;
      },
      isNumber: function (h) {
        return typeof h === "number" && isFinite(h);
      },
      isObject: function (h) {
        return (h && (typeof h === "object" || g.isFunction(h))) || false;
      },
      isString: function (h) {
        return typeof h === "string";
      },
      isUndefined: function (h) {
        return typeof h === "undefined";
      },
      _IEEnumFix: YAHOO.env.ua.ie
        ? function (k, l) {
            var m, h, j;
            for (m = 0; m < c.length; m = m + 1) {
              h = c[m];
              j = l[h];
              if (g.isFunction(j) && j != a[h]) {
                k[h] = j;
              }
            }
          }
        : function () {},
      extend: function (j, h, k) {
        if (!h || !j) {
          throw new Error(
            "extend failed, please check that all dependencies are included."
          );
        }
        var l = function () {},
          m;
        l.prototype = h.prototype;
        j.prototype = new l();
        j.prototype.constructor = j;
        j.superclass = h.prototype;
        if (h.prototype.constructor == a.constructor) {
          h.prototype.constructor = h;
        }
        if (k) {
          for (m in k) {
            if (g.hasOwnProperty(k, m)) {
              j.prototype[m] = k[m];
            }
          }
          g._IEEnumFix(j.prototype, k);
        }
      },
      augmentObject: function (j, k) {
        if (!k || !j) {
          throw new Error("Absorb failed, verify dependencies.");
        }
        var n = arguments,
          l,
          h,
          m = n[2];
        if (m && m !== true) {
          for (l = 2; l < n.length; l = l + 1) {
            j[n[l]] = k[n[l]];
          }
        } else {
          for (h in k) {
            if (m || !(h in j)) {
              j[h] = k[h];
            }
          }
          g._IEEnumFix(j, k);
        }
      },
      augmentProto: function (h, j) {
        if (!j || !h) {
          throw new Error("Augment failed, verify dependencies.");
        }
        var l = [h.prototype, j.prototype],
          k;
        for (k = 2; k < arguments.length; k = k + 1) {
          l.push(arguments[k]);
        }
        g.augmentObject.apply(this, l);
      },
      dump: function (r, l) {
        var o,
          m,
          j = [],
          h = "{...}",
          q = "f(){...}",
          k = ", ",
          n = " => ";
        if (!g.isObject(r)) {
          return r + "";
        } else {
          if (r instanceof Date || ("nodeType" in r && "tagName" in r)) {
            return r;
          } else {
            if (g.isFunction(r)) {
              return q;
            }
          }
        }
        l = g.isNumber(l) ? l : 3;
        if (g.isArray(r)) {
          j.push("[");
          for (o = 0, m = r.length; o < m; o = o + 1) {
            if (g.isObject(r[o])) {
              j.push(l > 0 ? g.dump(r[o], l - 1) : h);
            } else {
              j.push(r[o]);
            }
            j.push(k);
          }
          if (j.length > 1) {
            j.pop();
          }
          j.push("]");
        } else {
          j.push("{");
          for (o in r) {
            if (g.hasOwnProperty(r, o)) {
              j.push(o + n);
              if (g.isObject(r[o])) {
                j.push(l > 0 ? g.dump(r[o], l - 1) : h);
              } else {
                j.push(r[o]);
              }
              j.push(k);
            }
          }
          if (j.length > 1) {
            j.pop();
          }
          j.push("}");
        }
        return j.join("");
      },
      substitute: function (h, x, q) {
        var t,
          u,
          v,
          m,
          l,
          j,
          n = [],
          w,
          s = "dump",
          o = " ",
          y = "{",
          k = "}",
          r;
        for (;;) {
          t = h.lastIndexOf(y);
          if (t < 0) {
            break;
          }
          u = h.indexOf(k, t);
          if (t + 1 >= u) {
            break;
          }
          w = h.substring(t + 1, u);
          m = w;
          j = null;
          v = m.indexOf(o);
          if (v > -1) {
            j = m.substring(v + 1);
            m = m.substring(0, v);
          }
          l = x[m];
          if (q) {
            l = q(m, l, j);
          }
          if (g.isObject(l)) {
            if (g.isArray(l)) {
              l = g.dump(l, parseInt(j, 10));
            } else {
              j = j || "";
              r = j.indexOf(s);
              if (r > -1) {
                j = j.substring(4);
              }
              if (l.toString === a.toString || r > -1) {
                l = g.dump(l, parseInt(j, 10));
              } else {
                l = l.toString();
              }
            }
          } else {
            if (!g.isString(l) && !g.isNumber(l)) {
              l = "~-" + n.length + "-~";
              n[n.length] = w;
            }
          }
          h = h.substring(0, t) + l + h.substring(u + 1);
        }
        for (t = n.length - 1; t >= 0; t = t - 1) {
          h = h.replace(new RegExp("~-" + t + "-~"), "{" + n[t] + "}", "g");
        }
        return h;
      },
      trim: function (j) {
        try {
          return j.replace(/^\s+|\s+$/g, "");
        } catch (h) {
          return j;
        }
      },
      merge: function () {
        var h = {},
          k = arguments,
          l = k.length,
          j;
        for (j = 0; j < l; j = j + 1) {
          g.augmentObject(h, k[j], true);
        }
        return h;
      },
      later: function (j, q, h, n, m) {
        j = j || 0;
        q = q || {};
        var o = h,
          k = n,
          l,
          r;
        if (g.isString(h)) {
          o = q[h];
        }
        if (!o) {
          throw new TypeError("method undefined");
        }
        if (!g.isArray(k)) {
          k = [n];
        }
        l = function () {
          o.apply(q, k);
        };
        r = m ? setInterval(l, j) : setTimeout(l, j);
        return {
          interval: m,
          cancel: function () {
            if (this.interval) {
              clearInterval(r);
            } else {
              clearTimeout(r);
            }
          },
        };
      },
      isValue: function (h) {
        return (
          g.isObject(h) || g.isString(h) || g.isNumber(h) || g.isBoolean(h)
        );
      },
    };
  g.hasOwnProperty = a.hasOwnProperty
    ? function (j, h) {
        return j && j.hasOwnProperty(h);
      }
    : function (j, h) {
        return !g.isUndefined(j[h]) && j.constructor.prototype[h] !== j[h];
      };
  d.augmentObject(g, d, true);
  YAHOO.util.Lang = g;
  g.augment = g.augmentProto;
  YAHOO.augment = g.augmentProto;
  YAHOO.extend = g.extend;
})();
YAHOO.register("yahoo", YAHOO, { version: "2.7.0", build: "1799" });
YAHOO.lang.JSON = (function () {
  var l = YAHOO.lang,
    _UNICODE_EXCEPTIONS =
      /[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,
    _ESCAPES = /\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g,
    _VALUES =
      /"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g,
    _BRACKETS = /(?:^|:|,)(?:\s*\[)+/g,
    _INVALID = /^[\],:{}\s]*$/,
    _SPECIAL_CHARS =
      /[\\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,
    _CHARS = {
      "\b": "\\b",
      "\t": "\\t",
      "\n": "\\n",
      "\f": "\\f",
      "\r": "\\r",
      '"': '\\"',
      "\\": "\\\\",
    };
  function _revive(data, reviver) {
    var walk = function (o, key) {
      var k,
        v,
        value = o[key];
      if (value && typeof value === "object") {
        for (k in value) {
          if (l.hasOwnProperty(value, k)) {
            v = walk(value, k);
            if (v === undefined) {
              delete value[k];
            } else {
              value[k] = v;
            }
          }
        }
      }
      return reviver.call(o, key, value);
    };
    return typeof reviver === "function" ? walk({ "": data }, "") : data;
  }
  function _char(c) {
    if (!_CHARS[c]) {
      _CHARS[c] = "\\u" + ("0000" + (+c.charCodeAt(0)).toString(16)).slice(-4);
    }
    return _CHARS[c];
  }
  function _prepare(s) {
    return s.replace(_UNICODE_EXCEPTIONS, _char);
  }
  function _isValid(str) {
    return (
      l.isString(str) &&
      _INVALID.test(
        str.replace(_ESCAPES, "@").replace(_VALUES, "]").replace(_BRACKETS, "")
      )
    );
  }
  function _string(s) {
    return '"' + s.replace(_SPECIAL_CHARS, _char) + '"';
  }
  function _stringify(h, key, d, w, pstack) {
    var o = typeof w === "function" ? w.call(h, key, h[key]) : h[key],
      i,
      len,
      j,
      k,
      v,
      isArray,
      a;
    if (o instanceof Date) {
      o = l.JSON.dateToString(o);
    } else {
      if (o instanceof String || o instanceof Boolean || o instanceof Number) {
        o = o.valueOf();
      }
    }
    switch (typeof o) {
      case "string":
        return _string(o);
      case "number":
        return isFinite(o) ? String(o) : "null";
      case "boolean":
        return String(o);
      case "object":
        if (o === null) {
          return "null";
        }
        for (i = pstack.length - 1; i >= 0; --i) {
          if (pstack[i] === o) {
            return "null";
          }
        }
        pstack[pstack.length] = o;
        a = [];
        isArray = l.isArray(o);
        if (d > 0) {
          if (isArray) {
            for (i = o.length - 1; i >= 0; --i) {
              a[i] = _stringify(o, i, d - 1, w, pstack) || "null";
            }
          } else {
            j = 0;
            if (l.isArray(w)) {
              for (i = 0, len = w.length; i < len; ++i) {
                k = w[i];
                v = _stringify(o, k, d - 1, w, pstack);
                if (v) {
                  a[j++] = _string(k) + ":" + v;
                }
              }
            } else {
              for (k in o) {
                if (typeof k === "string" && l.hasOwnProperty(o, k)) {
                  v = _stringify(o, k, d - 1, w, pstack);
                  if (v) {
                    a[j++] = _string(k) + ":" + v;
                  }
                }
              }
            }
            a.sort();
          }
        }
        pstack.pop();
        return isArray ? "[" + a.join(",") + "]" : "{" + a.join(",") + "}";
    }
    return undefined;
  }
  return {
    isValid: function (s) {
      return _isValid(_prepare(s));
    },
    parse: function (s, reviver) {
      s = _prepare(s);
      if (_isValid(s)) {
        return _revive(eval("(" + s + ")"), reviver);
      }
      throw new SyntaxError("parseJSON");
    },
    stringify: function (o, w, d) {
      if (o !== undefined) {
        if (l.isArray(w)) {
          w = (function (a) {
            var uniq = [],
              map = {},
              v,
              i,
              j,
              len;
            for (i = 0, j = 0, len = a.length; i < len; ++i) {
              v = a[i];
              if (typeof v === "string" && map[v] === undefined) {
                uniq[(map[v] = j++)] = v;
              }
            }
            return uniq;
          })(w);
        }
        d = d >= 0 ? d : 1 / 0;
        return _stringify({ "": o }, "", d, w, []);
      }
      return undefined;
    },
    dateToString: function (d) {
      function _zeroPad(v) {
        return v < 10 ? "0" + v : v;
      }
      return (
        d.getUTCFullYear() +
        "-" +
        _zeroPad(d.getUTCMonth() + 1) +
        "-" +
        _zeroPad(d.getUTCDate()) +
        "T" +
        _zeroPad(d.getUTCHours()) +
        ":" +
        _zeroPad(d.getUTCMinutes()) +
        ":" +
        _zeroPad(d.getUTCSeconds()) +
        "Z"
      );
    },
    stringToDate: function (str) {
      if (/^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2})Z$/.test(str)) {
        var d = new Date();
        d.setUTCFullYear(RegExp.$1, (RegExp.$2 | 0) - 1, RegExp.$3);
        d.setUTCHours(RegExp.$4, RegExp.$5, RegExp.$6);
        return d;
      }
      return str;
    },
  };
})();
YAHOO.register("json", YAHOO.lang.JSON, { version: "2.7.0", build: "1799" });
YAHOO.util.CustomEvent = function (c, d, f, a) {
  this.type = c;
  this.scope = d || window;
  this.silent = f;
  this.signature = a || YAHOO.util.CustomEvent.LIST;
  this.subscribers = [];
  if (!this.silent) {
  }
  var b = "_YUICEOnSubscribe";
  if (c !== b) {
    this.subscribeEvent = new YAHOO.util.CustomEvent(b, this, true);
  }
  this.lastError = null;
};
YAHOO.util.CustomEvent.LIST = 0;
YAHOO.util.CustomEvent.FLAT = 1;
YAHOO.util.CustomEvent.prototype = {
  subscribe: function (a, c, b) {
    if (!a) {
      throw new Error("Invalid callback for subscriber to '" + this.type + "'");
    }
    if (this.subscribeEvent) {
      this.subscribeEvent.fire(a, c, b);
    }
    this.subscribers.push(new YAHOO.util.Subscriber(a, c, b));
  },
  unsubscribe: function (d, b) {
    if (!d) {
      return this.unsubscribeAll();
    }
    var c = false;
    for (var g = 0, a = this.subscribers.length; g < a; ++g) {
      var f = this.subscribers[g];
      if (f && f.contains(d, b)) {
        this._delete(g);
        c = true;
      }
    }
    return c;
  },
  fire: function () {
    this.lastError = null;
    var h = [],
      o = this.subscribers.length;
    if (!o && this.silent) {
      return true;
    }
    var k = [].slice.call(arguments, 0),
      m = true,
      a,
      j = false;
    if (!this.silent) {
    }
    var b = this.subscribers.slice(),
      d = YAHOO.util.Event.throwErrors;
    for (a = 0; a < o; ++a) {
      var f = b[a];
      if (!f) {
        j = true;
      } else {
        if (!this.silent) {
        }
        var g = f.getScope(this.scope);
        if (this.signature == YAHOO.util.CustomEvent.FLAT) {
          var c = null;
          if (k.length > 0) {
            c = k[0];
          }
          try {
            m = f.fn.call(g, c, f.obj);
          } catch (n) {
            this.lastError = n;
            if (d) {
              throw n;
            }
          }
        } else {
          try {
            m = f.fn.call(g, this.type, k, f.obj);
          } catch (l) {
            this.lastError = l;
            if (d) {
              throw l;
            }
          }
        }
        if (false === m) {
          if (!this.silent) {
          }
          break;
        }
      }
    }
    return m !== false;
  },
  unsubscribeAll: function () {
    var a = this.subscribers.length,
      b;
    for (b = a - 1; b > -1; b--) {
      this._delete(b);
    }
    this.subscribers = [];
    return a;
  },
  _delete: function (a) {
    var b = this.subscribers[a];
    if (b) {
      delete b.fn;
      delete b.obj;
    }
    this.subscribers.splice(a, 1);
  },
  toString: function () {
    return "CustomEvent: '" + this.type + "', context: " + this.scope;
  },
};
YAHOO.util.Subscriber = function (a, c, b) {
  this.fn = a;
  this.obj = YAHOO.lang.isUndefined(c) ? null : c;
  this.overrideContext = b;
};
YAHOO.util.Subscriber.prototype.getScope = function (a) {
  if (this.overrideContext) {
    if (this.overrideContext === true) {
      return this.obj;
    } else {
      return this.overrideContext;
    }
  }
  return a;
};
YAHOO.util.Subscriber.prototype.contains = function (a, b) {
  if (b) {
    return this.fn == a && this.obj == b;
  } else {
    return this.fn == a;
  }
};
YAHOO.util.Subscriber.prototype.toString = function () {
  return (
    "Subscriber { obj: " +
    this.obj +
    ", overrideContext: " +
    (this.overrideContext || "no") +
    " }"
  );
};
if (!YAHOO.util.Event) {
  YAHOO.util.Event = (function () {
    var k = false;
    var j = [];
    var h = [];
    var l = [];
    var n = [];
    var b = 0;
    var m = [];
    var c = [];
    var d = 0;
    var a = {
      63232: 38,
      63233: 40,
      63234: 37,
      63235: 39,
      63276: 33,
      63277: 34,
      25: 9,
    };
    var g = YAHOO.env.ua.ie ? "focusin" : "focus";
    var f = YAHOO.env.ua.ie ? "focusout" : "blur";
    return {
      POLL_RETRYS: 2000,
      POLL_INTERVAL: 20,
      EL: 0,
      TYPE: 1,
      FN: 2,
      WFN: 3,
      UNLOAD_OBJ: 3,
      ADJ_SCOPE: 4,
      OBJ: 5,
      OVERRIDE: 6,
      lastError: null,
      isSafari: YAHOO.env.ua.webkit,
      webkit: YAHOO.env.ua.webkit,
      isIE: YAHOO.env.ua.ie,
      _interval: null,
      _dri: null,
      DOMReady: false,
      throwErrors: false,
      startInterval: function () {
        if (!this._interval) {
          var q = this;
          var o = function () {
            q._tryPreloadAttach();
          };
          this._interval = setInterval(o, this.POLL_INTERVAL);
        }
      },
      onAvailable: function (o, t, r, q, s) {
        var v = YAHOO.lang.isString(o) ? [o] : o;
        for (var u = 0; u < v.length; u = u + 1) {
          m.push({
            id: v[u],
            fn: t,
            obj: r,
            overrideContext: q,
            checkReady: s,
          });
        }
        b = this.POLL_RETRYS;
        this.startInterval();
      },
      onContentReady: function (o, s, r, q) {
        this.onAvailable(o, s, r, q, true);
      },
      onDOMReady: function (r, q, o) {
        if (this.DOMReady) {
          setTimeout(function () {
            var s = window;
            if (o) {
              if (o === true) {
                s = q;
              } else {
                s = o;
              }
            }
            r.call(s, "DOMReady", [], q);
          }, 0);
        } else {
          this.DOMReadyEvent.subscribe(r, q, o);
        }
      },
      _addListener: function (A, C, q, w, s, D) {
        if (!q || !q.call) {
          return false;
        }
        if (this._isValidCollection(A)) {
          var o = true;
          for (var v = 0, t = A.length; v < t; ++v) {
            o = this.on(A[v], C, q, w, s) && o;
          }
          return o;
        } else {
          if (YAHOO.lang.isString(A)) {
            var x = this.getEl(A);
            if (x) {
              A = x;
            } else {
              this.onAvailable(A, function () {
                YAHOO.util.Event.on(A, C, q, w, s);
              });
              return true;
            }
          }
        }
        if (!A) {
          return false;
        }
        if ("unload" == C && w !== this) {
          h[h.length] = [A, C, q, w, s];
          return true;
        }
        var B = A;
        if (s) {
          if (s === true) {
            B = w;
          } else {
            B = s;
          }
        }
        var z = function (F) {
          return q.call(B, YAHOO.util.Event.getEvent(F, A), w);
        };
        var E = [A, C, q, z, B, w, s];
        var u = j.length;
        j[u] = E;
        if (this.useLegacyEvent(A, C)) {
          var y = this.getLegacyIndex(A, C);
          if (y == -1 || A != l[y][0]) {
            y = l.length;
            c[A.id + C] = y;
            l[y] = [A, C, A["on" + C]];
            n[y] = [];
            A["on" + C] = function (F) {
              YAHOO.util.Event.fireLegacyEvent(YAHOO.util.Event.getEvent(F), y);
            };
          }
          n[y].push(E);
        } else {
          try {
            this._simpleAdd(A, C, z, D);
          } catch (r) {
            this.lastError = r;
            this.removeListener(A, C, q);
            return false;
          }
        }
        return true;
      },
      addListener: function (s, o, t, r, q) {
        return this._addListener(s, o, t, r, q, false);
      },
      addFocusListener: function (r, s, q, o) {
        return this._addListener(r, g, s, q, o, true);
      },
      removeFocusListener: function (o, q) {
        return this.removeListener(o, g, q);
      },
      addBlurListener: function (r, s, q, o) {
        return this._addListener(r, f, s, q, o, true);
      },
      removeBlurListener: function (o, q) {
        return this.removeListener(o, f, q);
      },
      fireLegacyEvent: function (t, v) {
        var r = true,
          y,
          o,
          q,
          x,
          s;
        o = n[v].slice();
        for (var w = 0, u = o.length; w < u; ++w) {
          q = o[w];
          if (q && q[this.WFN]) {
            x = q[this.ADJ_SCOPE];
            s = q[this.WFN].call(x, t);
            r = r && s;
          }
        }
        y = l[v];
        if (y && y[2]) {
          y[2](t);
        }
        return r;
      },
      getLegacyIndex: function (q, o) {
        var r = this.generateId(q) + o;
        if (typeof c[r] == "undefined") {
          return -1;
        } else {
          return c[r];
        }
      },
      useLegacyEvent: function (q, o) {
        return (
          this.webkit && this.webkit < 419 && ("click" == o || "dblclick" == o)
        );
      },
      removeListener: function (z, A, r) {
        var w, t, o;
        if (typeof z == "string") {
          z = this.getEl(z);
        } else {
          if (this._isValidCollection(z)) {
            var q = true;
            for (w = z.length - 1; w > -1; w--) {
              q = this.removeListener(z[w], A, r) && q;
            }
            return q;
          }
        }
        if (!r || !r.call) {
          return this.purgeElement(z, false, A);
        }
        if ("unload" == A) {
          for (w = h.length - 1; w > -1; w--) {
            o = h[w];
            if (o && o[0] == z && o[1] == A && o[2] == r) {
              h.splice(w, 1);
              return true;
            }
          }
          return false;
        }
        var v = null;
        var u = arguments[3];
        if ("undefined" === typeof u) {
          u = this._getCacheIndex(z, A, r);
        }
        if (u >= 0) {
          v = j[u];
        }
        if (!z || !v) {
          return false;
        }
        if (this.useLegacyEvent(z, A)) {
          var x = this.getLegacyIndex(z, A);
          var y = n[x];
          if (y) {
            for (w = 0, t = y.length; w < t; ++w) {
              o = y[w];
              if (
                o &&
                o[this.EL] == z &&
                o[this.TYPE] == A &&
                o[this.FN] == r
              ) {
                y.splice(w, 1);
                break;
              }
            }
          }
        } else {
          try {
            this._simpleRemove(z, A, v[this.WFN], false);
          } catch (s) {
            this.lastError = s;
            return false;
          }
        }
        delete j[u][this.WFN];
        delete j[u][this.FN];
        j.splice(u, 1);
        return true;
      },
      getTarget: function (o, q) {
        var r = o.target || o.srcElement;
        return this.resolveTextNode(r);
      },
      resolveTextNode: function (o) {
        try {
          if (o && 3 == o.nodeType) {
            return o.parentNode;
          }
        } catch (q) {}
        return o;
      },
      getPageX: function (o) {
        var q = o.pageX;
        if (!q && 0 !== q) {
          q = o.clientX || 0;
          if (this.isIE) {
            q += this._getScrollLeft();
          }
        }
        return q;
      },
      getPageY: function (q) {
        var o = q.pageY;
        if (!o && 0 !== o) {
          o = q.clientY || 0;
          if (this.isIE) {
            o += this._getScrollTop();
          }
        }
        return o;
      },
      getXY: function (o) {
        return [this.getPageX(o), this.getPageY(o)];
      },
      getRelatedTarget: function (o) {
        var q = o.relatedTarget;
        if (!q) {
          if (o.type == "mouseout") {
            q = o.toElement;
          } else {
            if (o.type == "mouseover") {
              q = o.fromElement;
            }
          }
        }
        return this.resolveTextNode(q);
      },
      getTime: function (o) {
        if (!o.time) {
          var q = new Date().getTime();
          try {
            o.time = q;
          } catch (r) {
            this.lastError = r;
            return q;
          }
        }
        return o.time;
      },
      stopEvent: function (o) {
        this.stopPropagation(o);
        this.preventDefault(o);
      },
      stopPropagation: function (o) {
        if (o.stopPropagation) {
          o.stopPropagation();
        } else {
          o.cancelBubble = true;
        }
      },
      preventDefault: function (o) {
        if (o.preventDefault) {
          o.preventDefault();
        } else {
          o.returnValue = false;
        }
      },
      getEvent: function (q, s) {
        var r = q || window.event;
        if (!r) {
          var o = this.getEvent.caller;
          while (o) {
            r = o.arguments[0];
            if (r && Event == r.constructor) {
              break;
            }
            o = o.caller;
          }
        }
        return r;
      },
      getCharCode: function (o) {
        var q = o.keyCode || o.charCode || 0;
        if (YAHOO.env.ua.webkit && q in a) {
          q = a[q];
        }
        return q;
      },
      _getCacheIndex: function (q, o, r) {
        for (var s = 0, t = j.length; s < t; s = s + 1) {
          var u = j[s];
          if (u && u[this.FN] == r && u[this.EL] == q && u[this.TYPE] == o) {
            return s;
          }
        }
        return -1;
      },
      generateId: function (q) {
        var o = q.id;
        if (!o) {
          o = "yuievtautoid-" + d;
          ++d;
          q.id = o;
        }
        return o;
      },
      _isValidCollection: function (o) {
        try {
          return (
            o &&
            typeof o !== "string" &&
            o.length &&
            !o.tagName &&
            !o.alert &&
            typeof o[0] !== "undefined"
          );
        } catch (q) {
          return false;
        }
      },
      elCache: {},
      getEl: function (o) {
        return typeof o === "string" ? document.getElementById(o) : o;
      },
      clearCache: function () {},
      DOMReadyEvent: new YAHOO.util.CustomEvent("DOMReady", this),
      _load: function (o) {
        if (!k) {
          k = true;
          var q = YAHOO.util.Event;
          q._ready();
          q._tryPreloadAttach();
        }
      },
      _ready: function (o) {
        var q = YAHOO.util.Event;
        if (!q.DOMReady) {
          q.DOMReady = true;
          q.DOMReadyEvent.fire();
          q._simpleRemove(document, "DOMContentLoaded", q._ready);
        }
      },
      _tryPreloadAttach: function () {
        if (m.length === 0) {
          b = 0;
          if (this._interval) {
            clearInterval(this._interval);
            this._interval = null;
          }
          return;
        }
        if (this.locked) {
          return;
        }
        if (this.isIE) {
          if (!this.DOMReady) {
            this.startInterval();
            return;
          }
        }
        this.locked = true;
        var q = !k;
        if (!q) {
          q = b > 0 && m.length > 0;
        }
        var r = [];
        var o = function (y, x) {
          var z = y;
          if (x.overrideContext) {
            if (x.overrideContext === true) {
              z = x.obj;
            } else {
              z = x.overrideContext;
            }
          }
          x.fn.call(z, x.obj);
        };
        var v,
          w,
          s,
          t,
          u = [];
        for (v = 0, w = m.length; v < w; v = v + 1) {
          s = m[v];
          if (s) {
            t = this.getEl(s.id);
            if (t) {
              if (s.checkReady) {
                if (k || t.nextSibling || !q) {
                  u.push(s);
                  m[v] = null;
                }
              } else {
                o(t, s);
                m[v] = null;
              }
            } else {
              r.push(s);
            }
          }
        }
        for (v = 0, w = u.length; v < w; v = v + 1) {
          s = u[v];
          o(this.getEl(s.id), s);
        }
        b--;
        if (q) {
          for (v = m.length - 1; v > -1; v--) {
            s = m[v];
            if (!s || !s.id) {
              m.splice(v, 1);
            }
          }
          this.startInterval();
        } else {
          if (this._interval) {
            clearInterval(this._interval);
            this._interval = null;
          }
        }
        this.locked = false;
      },
      purgeElement: function (s, r, o) {
        var u = YAHOO.lang.isString(s) ? this.getEl(s) : s;
        var q = this.getListeners(u, o),
          t,
          w;
        if (q) {
          for (t = q.length - 1; t > -1; t--) {
            var v = q[t];
            this.removeListener(u, v.type, v.fn);
          }
        }
        if (r && u && u.childNodes) {
          for (t = 0, w = u.childNodes.length; t < w; ++t) {
            this.purgeElement(u.childNodes[t], r, o);
          }
        }
      },
      getListeners: function (w, y) {
        var t = [],
          x;
        if (!y) {
          x = [j, h];
        } else {
          if (y === "unload") {
            x = [h];
          } else {
            x = [j];
          }
        }
        var r = YAHOO.lang.isString(w) ? this.getEl(w) : w;
        for (var u = 0; u < x.length; u = u + 1) {
          var o = x[u];
          if (o) {
            for (var s = 0, q = o.length; s < q; ++s) {
              var v = o[s];
              if (v && v[this.EL] === r && (!y || y === v[this.TYPE])) {
                t.push({
                  type: v[this.TYPE],
                  fn: v[this.FN],
                  obj: v[this.OBJ],
                  adjust: v[this.OVERRIDE],
                  scope: v[this.ADJ_SCOPE],
                  index: s,
                });
              }
            }
          }
        }
        return t.length ? t : null;
      },
      _unload: function (q) {
        var w = YAHOO.util.Event,
          t,
          u,
          v,
          r,
          s,
          o = h.slice(),
          x;
        for (t = 0, r = h.length; t < r; ++t) {
          v = o[t];
          if (v) {
            x = window;
            if (v[w.ADJ_SCOPE]) {
              if (v[w.ADJ_SCOPE] === true) {
                x = v[w.UNLOAD_OBJ];
              } else {
                x = v[w.ADJ_SCOPE];
              }
            }
            v[w.FN].call(x, w.getEvent(q, v[w.EL]), v[w.UNLOAD_OBJ]);
            o[t] = null;
          }
        }
        v = null;
        x = null;
        h = null;
        if (j) {
          for (u = j.length - 1; u > -1; u--) {
            v = j[u];
            if (v) {
              w.removeListener(v[w.EL], v[w.TYPE], v[w.FN], u);
            }
          }
          v = null;
        }
        l = null;
        w._simpleRemove(window, "unload", w._unload);
      },
      _getScrollLeft: function () {
        return this._getScroll()[1];
      },
      _getScrollTop: function () {
        return this._getScroll()[0];
      },
      _getScroll: function () {
        var q = document.documentElement,
          o = document.body;
        if (q && (q.scrollTop || q.scrollLeft)) {
          return [q.scrollTop, q.scrollLeft];
        } else {
          if (o) {
            return [o.scrollTop, o.scrollLeft];
          } else {
            return [0, 0];
          }
        }
      },
      regCE: function () {},
      _simpleAdd: (function () {
        if (window.addEventListener) {
          return function (q, o, r, s) {
            q.addEventListener(o, r, s);
          };
        } else {
          if (window.attachEvent) {
            return function (q, o, r, s) {
              q.attachEvent("on" + o, r);
            };
          } else {
            return function () {};
          }
        }
      })(),
      _simpleRemove: (function () {
        if (window.removeEventListener) {
          return function (q, o, r, s) {
            q.removeEventListener(o, r, s);
          };
        } else {
          if (window.detachEvent) {
            return function (q, o, r) {
              q.detachEvent("on" + o, r);
            };
          } else {
            return function () {};
          }
        }
      })(),
    };
  })();
  (function () {
    var a = YAHOO.util.Event;
    a.on = a.addListener;
    a.onFocus = a.addFocusListener;
    a.onBlur = a.addBlurListener;
    if (a.isIE) {
      YAHOO.util.Event.onDOMReady(
        YAHOO.util.Event._tryPreloadAttach,
        YAHOO.util.Event,
        true
      );
      var b = document.createElement("p");
      a._dri = setInterval(function () {
        try {
          b.doScroll("left");
          clearInterval(a._dri);
          a._dri = null;
          a._ready();
          b = null;
        } catch (c) {}
      }, a.POLL_INTERVAL);
    } else {
      if (a.webkit && a.webkit < 525) {
        a._dri = setInterval(function () {
          var c = document.readyState;
          if ("loaded" == c || "complete" == c) {
            clearInterval(a._dri);
            a._dri = null;
            a._ready();
          }
        }, a.POLL_INTERVAL);
      } else {
        a._simpleAdd(document, "DOMContentLoaded", a._ready);
      }
    }
    a._simpleAdd(window, "load", a._load);
    a._simpleAdd(window, "unload", a._unload);
    a._tryPreloadAttach();
  })();
}
YAHOO.util.EventProvider = function () {};
YAHOO.util.EventProvider.prototype = {
  __yui_events: null,
  __yui_subscribers: null,
  subscribe: function (a, f, b, c) {
    this.__yui_events = this.__yui_events || {};
    var d = this.__yui_events[a];
    if (d) {
      d.subscribe(f, b, c);
    } else {
      this.__yui_subscribers = this.__yui_subscribers || {};
      var g = this.__yui_subscribers;
      if (!g[a]) {
        g[a] = [];
      }
      g[a].push({ fn: f, obj: b, overrideContext: c });
    }
  },
  unsubscribe: function (g, d, b) {
    this.__yui_events = this.__yui_events || {};
    var a = this.__yui_events;
    if (g) {
      var c = a[g];
      if (c) {
        return c.unsubscribe(d, b);
      }
    } else {
      var h = true;
      for (var f in a) {
        if (YAHOO.lang.hasOwnProperty(a, f)) {
          h = h && a[f].unsubscribe(d, b);
        }
      }
      return h;
    }
    return false;
  },
  unsubscribeAll: function (a) {
    return this.unsubscribe(a);
  },
  createEvent: function (h, a) {
    this.__yui_events = this.__yui_events || {};
    var d = a || {};
    var f = this.__yui_events;
    if (f[h]) {
    } else {
      var g = d.scope || this;
      var k = d.silent;
      var c = new YAHOO.util.CustomEvent(h, g, k, YAHOO.util.CustomEvent.FLAT);
      f[h] = c;
      if (d.onSubscribeCallback) {
        c.subscribeEvent.subscribe(d.onSubscribeCallback);
      }
      this.__yui_subscribers = this.__yui_subscribers || {};
      var j = this.__yui_subscribers[h];
      if (j) {
        for (var b = 0; b < j.length; ++b) {
          c.subscribe(j[b].fn, j[b].obj, j[b].overrideContext);
        }
      }
    }
    return f[h];
  },
  fireEvent: function (d, f, a, g) {
    this.__yui_events = this.__yui_events || {};
    var b = this.__yui_events[d];
    if (!b) {
      return null;
    }
    var h = [];
    for (var c = 1; c < arguments.length; ++c) {
      h.push(arguments[c]);
    }
    return b.fire.apply(b, h);
  },
  hasEvent: function (a) {
    if (this.__yui_events) {
      if (this.__yui_events[a]) {
        return true;
      }
    }
    return false;
  },
};
(function () {
  var a = YAHOO.util.Event,
    b = YAHOO.lang;
  YAHOO.util.KeyListener = function (k, d, j, h) {
    if (!k) {
    } else {
      if (!d) {
      } else {
        if (!j) {
        }
      }
    }
    if (!h) {
      h = YAHOO.util.KeyListener.KEYDOWN;
    }
    var g = new YAHOO.util.CustomEvent("keyPressed");
    this.enabledEvent = new YAHOO.util.CustomEvent("enabled");
    this.disabledEvent = new YAHOO.util.CustomEvent("disabled");
    if (b.isString(k)) {
      k = document.getElementById(k);
    }
    if (b.isFunction(j)) {
      g.subscribe(j);
    } else {
      g.subscribe(j.fn, j.scope, j.correctScope);
    }
    function f(o, q) {
      if (!d.shift) {
        d.shift = false;
      }
      if (!d.alt) {
        d.alt = false;
      }
      if (!d.ctrl) {
        d.ctrl = false;
      }
      if (o.shiftKey == d.shift && o.altKey == d.alt && o.ctrlKey == d.ctrl) {
        var n,
          r = d.keys,
          l;
        if (YAHOO.lang.isArray(r)) {
          for (var m = 0; m < r.length; m++) {
            n = r[m];
            l = a.getCharCode(o);
            if (n == l) {
              g.fire(l, o);
              break;
            }
          }
        } else {
          l = a.getCharCode(o);
          if (r == l) {
            g.fire(l, o);
          }
        }
      }
    }
    this.enable = function () {
      if (!this.enabled) {
        a.on(k, h, f);
        this.enabledEvent.fire(d);
      }
      this.enabled = true;
    };
    this.disable = function () {
      if (this.enabled) {
        a.removeListener(k, h, f);
        this.disabledEvent.fire(d);
      }
      this.enabled = false;
    };
    this.toString = function () {
      return (
        "KeyListener [" +
        d.keys +
        "] " +
        k.tagName +
        (k.id ? "[" + k.id + "]" : "")
      );
    };
  };
  var c = YAHOO.util.KeyListener;
  c.KEYDOWN = "keydown";
  c.KEYUP = "keyup";
  c.KEY = {
    ALT: 18,
    BACK_SPACE: 8,
    CAPS_LOCK: 20,
    CONTROL: 17,
    DELETE: 46,
    DOWN: 40,
    END: 35,
    ENTER: 13,
    ESCAPE: 27,
    HOME: 36,
    LEFT: 37,
    META: 224,
    NUM_LOCK: 144,
    PAGE_DOWN: 34,
    PAGE_UP: 33,
    PAUSE: 19,
    PRINTSCREEN: 44,
    RIGHT: 39,
    SCROLL_LOCK: 145,
    SHIFT: 16,
    SPACE: 32,
    TAB: 9,
    UP: 38,
  };
})();
YAHOO.register("event", YAHOO.util.Event, { version: "2.7.0", build: "1799" });
(function () {
  YAHOO.env._id_counter = YAHOO.env._id_counter || 0;
  var ao = YAHOO.util,
    ai = YAHOO.lang,
    aE = YAHOO.env.ua,
    at = YAHOO.lang.trim,
    aN = {},
    aJ = {},
    ag = /^t(?:able|d|h)$/i,
    y = /color$/i,
    aj = window.document,
    z = aj.documentElement,
    aM = "ownerDocument",
    aD = "defaultView",
    av = "documentElement",
    ax = "compatMode",
    aP = "offsetLeft",
    ae = "offsetTop",
    aw = "offsetParent",
    x = "parentNode",
    aF = "nodeType",
    aq = "tagName",
    af = "scrollLeft",
    aI = "scrollTop",
    ad = "getBoundingClientRect",
    au = "getComputedStyle",
    aQ = "currentStyle",
    ah = "CSS1Compat",
    aO = "BackCompat",
    aK = "class",
    an = "className",
    ak = "",
    ar = " ",
    ay = "(?:^|\\s)",
    aG = "(?= |$)",
    Y = "g",
    aB = "position",
    aL = "fixed",
    G = "relative",
    aH = "left",
    aC = "top",
    az = "medium",
    aA = "borderLeftWidth",
    ac = "borderTopWidth",
    ap = aE.opera,
    al = aE.webkit,
    am = aE.gecko,
    aa = aE.ie;
  ao.Dom = {
    CUSTOM_ATTRIBUTES: !z.hasAttribute
      ? { for: "htmlFor", class: an }
      : { htmlFor: "for", className: aK },
    get: function (g) {
      var f, d, c, a, b;
      if (g) {
        if (g[aF] || g.item) {
          return g;
        }
        if (typeof g === "string") {
          f = g;
          g = aj.getElementById(g);
          if (g && g.id === f) {
            return g;
          } else {
            if (g && aj.all) {
              g = null;
              d = aj.all[f];
              for (a = 0, b = d.length; a < b; ++a) {
                if (d[a].id === f) {
                  return d[a];
                }
              }
            }
          }
          return g;
        }
        if (g.DOM_EVENTS) {
          g = g.get("element");
        }
        if ("length" in g) {
          c = [];
          for (a = 0, b = g.length; a < b; ++a) {
            c[c.length] = ao.Dom.get(g[a]);
          }
          return c;
        }
        return g;
      }
      return null;
    },
    getComputedStyle: function (a, b) {
      if (window[au]) {
        return a[aM][aD][au](a, null)[b];
      } else {
        if (a[aQ]) {
          return ao.Dom.IE_ComputedStyle.get(a, b);
        }
      }
    },
    getStyle: function (a, b) {
      return ao.Dom.batch(a, ao.Dom._getStyle, b);
    },
    _getStyle: (function () {
      if (window[au]) {
        return function (b, d) {
          d = d === "float" ? (d = "cssFloat") : ao.Dom._toCamel(d);
          var a = b.style[d],
            c;
          if (!a) {
            c = b[aM][aD][au](b, null);
            if (c) {
              a = c[d];
            }
          }
          return a;
        };
      } else {
        if (z[aQ]) {
          return function (b, f) {
            var a;
            switch (f) {
              case "opacity":
                a = 100;
                try {
                  a = b.filters["DXImageTransform.Microsoft.Alpha"].opacity;
                } catch (d) {
                  try {
                    a = b.filters("alpha").opacity;
                  } catch (c) {}
                }
                return a / 100;
              case "float":
                f = "styleFloat";
              default:
                f = ao.Dom._toCamel(f);
                a = b[aQ] ? b[aQ][f] : null;
                return b.style[f] || a;
            }
          };
        }
      }
    })(),
    setStyle: function (b, c, a) {
      ao.Dom.batch(b, ao.Dom._setStyle, { prop: c, val: a });
    },
    _setStyle: (function () {
      if (aa) {
        return function (c, b) {
          var a = ao.Dom._toCamel(b.prop),
            d = b.val;
          if (c) {
            switch (a) {
              case "opacity":
                if (ai.isString(c.style.filter)) {
                  c.style.filter = "alpha(opacity=" + d * 100 + ")";
                  if (!c[aQ] || !c[aQ].hasLayout) {
                    c.style.zoom = 1;
                  }
                }
                break;
              case "float":
                a = "styleFloat";
              default:
                c.style[a] = d;
            }
          } else {
          }
        };
      } else {
        return function (c, b) {
          var a = ao.Dom._toCamel(b.prop),
            d = b.val;
          if (c) {
            if (a == "float") {
              a = "cssFloat";
            }
            c.style[a] = d;
          } else {
          }
        };
      }
    })(),
    getXY: function (a) {
      return ao.Dom.batch(a, ao.Dom._getXY);
    },
    _canPosition: function (a) {
      return ao.Dom._getStyle(a, "display") !== "none" && ao.Dom._inDoc(a);
    },
    _getXY: (function () {
      if (aj[av][ad]) {
        return function (l) {
          var k,
            a,
            j,
            c,
            d,
            f,
            g,
            n,
            m,
            h = Math.floor,
            b = false;
          if (ao.Dom._canPosition(l)) {
            j = l[ad]();
            c = l[aM];
            k = ao.Dom.getDocumentScrollLeft(c);
            a = ao.Dom.getDocumentScrollTop(c);
            b = [h(j[aH]), h(j[aC])];
            if (aa && aE.ie < 8) {
              d = 2;
              f = 2;
              g = c[ax];
              n = ab(c[av], aA);
              m = ab(c[av], ac);
              if (aE.ie === 6) {
                if (g !== aO) {
                  d = 0;
                  f = 0;
                }
              }
              if (g == aO) {
                if (n !== az) {
                  d = parseInt(n, 10);
                }
                if (m !== az) {
                  f = parseInt(m, 10);
                }
              }
              b[0] -= d;
              b[1] -= f;
            }
            if (a || k) {
              b[0] += k;
              b[1] += a;
            }
            b[0] = h(b[0]);
            b[1] = h(b[1]);
          } else {
          }
          return b;
        };
      } else {
        return function (j) {
          var a,
            h,
            g,
            d,
            c,
            f = false,
            b = j;
          if (ao.Dom._canPosition(j)) {
            f = [j[aP], j[ae]];
            a = ao.Dom.getDocumentScrollLeft(j[aM]);
            h = ao.Dom.getDocumentScrollTop(j[aM]);
            c = am || aE.webkit > 519 ? true : false;
            while ((b = b[aw])) {
              f[0] += b[aP];
              f[1] += b[ae];
              if (c) {
                f = ao.Dom._calcBorders(b, f);
              }
            }
            if (ao.Dom._getStyle(j, aB) !== aL) {
              b = j;
              while ((b = b[x]) && b[aq]) {
                g = b[aI];
                d = b[af];
                if (am && ao.Dom._getStyle(b, "overflow") !== "visible") {
                  f = ao.Dom._calcBorders(b, f);
                }
                if (g || d) {
                  f[0] -= d;
                  f[1] -= g;
                }
              }
              f[0] += a;
              f[1] += h;
            } else {
              if (ap) {
                f[0] -= a;
                f[1] -= h;
              } else {
                if (al || am) {
                  f[0] += a;
                  f[1] += h;
                }
              }
            }
            f[0] = Math.floor(f[0]);
            f[1] = Math.floor(f[1]);
          } else {
          }
          return f;
        };
      }
    })(),
    getX: function (a) {
      var b = function (c) {
        return ao.Dom.getXY(c)[0];
      };
      return ao.Dom.batch(a, b, ao.Dom, true);
    },
    getY: function (a) {
      var b = function (c) {
        return ao.Dom.getXY(c)[1];
      };
      return ao.Dom.batch(a, b, ao.Dom, true);
    },
    setXY: function (b, a, c) {
      ao.Dom.batch(b, ao.Dom._setXY, { pos: a, noRetry: c });
    },
    _setXY: function (k, g) {
      var f = ao.Dom._getStyle(k, aB),
        h = ao.Dom.setStyle,
        b = g.pos,
        a = g.noRetry,
        d = [
          parseInt(ao.Dom.getComputedStyle(k, aH), 10),
          parseInt(ao.Dom.getComputedStyle(k, aC), 10),
        ],
        c,
        j;
      if (f == "static") {
        f = G;
        h(k, aB, f);
      }
      c = ao.Dom._getXY(k);
      if (!b || c === false) {
        return false;
      }
      if (isNaN(d[0])) {
        d[0] = f == G ? 0 : k[aP];
      }
      if (isNaN(d[1])) {
        d[1] = f == G ? 0 : k[ae];
      }
      if (b[0] !== null) {
        h(k, aH, b[0] - c[0] + d[0] + "px");
      }
      if (b[1] !== null) {
        h(k, aC, b[1] - c[1] + d[1] + "px");
      }
      if (!a) {
        j = ao.Dom._getXY(k);
        if (
          (b[0] !== null && j[0] != b[0]) ||
          (b[1] !== null && j[1] != b[1])
        ) {
          ao.Dom._setXY(k, { pos: b, noRetry: true });
        }
      }
    },
    setX: function (b, a) {
      ao.Dom.setXY(b, [a, null]);
    },
    setY: function (a, b) {
      ao.Dom.setXY(a, [null, b]);
    },
    getRegion: function (a) {
      var b = function (c) {
        var d = false;
        if (ao.Dom._canPosition(c)) {
          d = ao.Region.getRegion(c);
        } else {
        }
        return d;
      };
      return ao.Dom.batch(a, b, ao.Dom, true);
    },
    getClientWidth: function () {
      return ao.Dom.getViewportWidth();
    },
    getClientHeight: function () {
      return ao.Dom.getViewportHeight();
    },
    getElementsByClassName: function (g, b, f, c, l, d) {
      g = ai.trim(g);
      b = b || "*";
      f = f ? ao.Dom.get(f) : null || aj;
      if (!f) {
        return [];
      }
      var a = [],
        m = f.getElementsByTagName(b),
        j = ao.Dom.hasClass;
      for (var k = 0, h = m.length; k < h; ++k) {
        if (j(m[k], g)) {
          a[a.length] = m[k];
        }
      }
      if (c) {
        ao.Dom.batch(a, c, l, d);
      }
      return a;
    },
    hasClass: function (b, a) {
      return ao.Dom.batch(b, ao.Dom._hasClass, a);
    },
    _hasClass: function (a, c) {
      var b = false,
        d;
      if (a && c) {
        d = ao.Dom.getAttribute(a, an) || ak;
        if (c.exec) {
          b = c.test(d);
        } else {
          b = c && (ar + d + ar).indexOf(ar + c + ar) > -1;
        }
      } else {
      }
      return b;
    },
    addClass: function (b, a) {
      return ao.Dom.batch(b, ao.Dom._addClass, a);
    },
    _addClass: function (a, c) {
      var b = false,
        d;
      if (a && c) {
        d = ao.Dom.getAttribute(a, an) || ak;
        if (!ao.Dom._hasClass(a, c)) {
          ao.Dom.setAttribute(a, an, at(d + ar + c));
          b = true;
        }
      } else {
      }
      return b;
    },
    removeClass: function (b, a) {
      return ao.Dom.batch(b, ao.Dom._removeClass, a);
    },
    _removeClass: function (g, a) {
      var f = false,
        d,
        c,
        b;
      if (g && a) {
        d = ao.Dom.getAttribute(g, an) || ak;
        ao.Dom.setAttribute(g, an, d.replace(ao.Dom._getClassRegex(a), ak));
        c = ao.Dom.getAttribute(g, an);
        if (d !== c) {
          ao.Dom.setAttribute(g, an, at(c));
          f = true;
          if (ao.Dom.getAttribute(g, an) === "") {
            b = g.hasAttribute && g.hasAttribute(aK) ? aK : an;
            g.removeAttribute(b);
          }
        }
      } else {
      }
      return f;
    },
    replaceClass: function (a, c, b) {
      return ao.Dom.batch(a, ao.Dom._replaceClass, { from: c, to: b });
    },
    _replaceClass: function (h, a) {
      var g,
        c,
        f,
        b = false,
        d;
      if (h && a) {
        c = a.from;
        f = a.to;
        if (!f) {
          b = false;
        } else {
          if (!c) {
            b = ao.Dom._addClass(h, a.to);
          } else {
            if (c !== f) {
              d = ao.Dom.getAttribute(h, an) || ak;
              g = (ar + d.replace(ao.Dom._getClassRegex(c), ar + f)).split(
                ao.Dom._getClassRegex(f)
              );
              g.splice(1, 0, ar + f);
              ao.Dom.setAttribute(h, an, at(g.join(ak)));
              b = true;
            }
          }
        }
      } else {
      }
      return b;
    },
    generateId: function (b, a) {
      a = a || "yui-gen";
      var c = function (f) {
        if (f && f.id) {
          return f.id;
        }
        var d = a + YAHOO.env._id_counter++;
        if (f) {
          if (f[aM].getElementById(d)) {
            return ao.Dom.generateId(f, d + a);
          }
          f.id = d;
        }
        return d;
      };
      return ao.Dom.batch(b, c, ao.Dom, true) || c.apply(ao.Dom, arguments);
    },
    isAncestor: function (c, a) {
      c = ao.Dom.get(c);
      a = ao.Dom.get(a);
      var b = false;
      if (c && a && c[aF] && a[aF]) {
        if (c.contains && c !== a) {
          b = c.contains(a);
        } else {
          if (c.compareDocumentPosition) {
            b = !!(c.compareDocumentPosition(a) & 16);
          }
        }
      } else {
      }
      return b;
    },
    inDocument: function (a, b) {
      return ao.Dom._inDoc(ao.Dom.get(a), b);
    },
    _inDoc: function (c, a) {
      var b = false;
      if (c && c[aq]) {
        a = a || c[aM];
        b = ao.Dom.isAncestor(a[av], c);
      } else {
      }
      return b;
    },
    getElementsBy: function (a, b, g, d, k, f, c) {
      b = b || "*";
      g = g ? ao.Dom.get(g) : null || aj;
      if (!g) {
        return [];
      }
      var l = [],
        m = g.getElementsByTagName(b);
      for (var j = 0, h = m.length; j < h; ++j) {
        if (a(m[j])) {
          if (c) {
            l = m[j];
            break;
          } else {
            l[l.length] = m[j];
          }
        }
      }
      if (d) {
        ao.Dom.batch(l, d, k, f);
      }
      return l;
    },
    getElementBy: function (a, b, c) {
      return ao.Dom.getElementsBy(a, b, c, null, null, null, true);
    },
    batch: function (a, c, g, f) {
      var h = [],
        d = f ? g : window;
      a = a && (a[aq] || a.item) ? a : ao.Dom.get(a);
      if (a && c) {
        if (a[aq] || a.length === undefined) {
          return c.call(d, a, g);
        }
        for (var b = 0; b < a.length; ++b) {
          h[h.length] = c.call(d, a[b], g);
        }
      } else {
        return false;
      }
      return h;
    },
    getDocumentHeight: function () {
      var b = aj[ax] != ah || al ? aj.body.scrollHeight : z.scrollHeight,
        a = Math.max(b, ao.Dom.getViewportHeight());
      return a;
    },
    getDocumentWidth: function () {
      var b = aj[ax] != ah || al ? aj.body.scrollWidth : z.scrollWidth,
        a = Math.max(b, ao.Dom.getViewportWidth());
      return a;
    },
    getViewportHeight: function () {
      var a = self.innerHeight,
        b = aj[ax];
      if ((b || aa) && !ap) {
        a = b == ah ? z.clientHeight : aj.body.clientHeight;
      }
      return a;
    },
    getViewportWidth: function () {
      var a = self.innerWidth,
        b = aj[ax];
      if (b || aa) {
        a = b == ah ? z.clientWidth : aj.body.clientWidth;
      }
      return a;
    },
    getAncestorBy: function (a, b) {
      while ((a = a[x])) {
        if (ao.Dom._testElement(a, b)) {
          return a;
        }
      }
      return null;
    },
    getAncestorByClassName: function (c, b) {
      c = ao.Dom.get(c);
      if (!c) {
        return null;
      }
      var a = function (d) {
        return ao.Dom.hasClass(d, b);
      };
      return ao.Dom.getAncestorBy(c, a);
    },
    getAncestorByTagName: function (c, b) {
      c = ao.Dom.get(c);
      if (!c) {
        return null;
      }
      var a = function (d) {
        return d[aq] && d[aq].toUpperCase() == b.toUpperCase();
      };
      return ao.Dom.getAncestorBy(c, a);
    },
    getPreviousSiblingBy: function (a, b) {
      while (a) {
        a = a.previousSibling;
        if (ao.Dom._testElement(a, b)) {
          return a;
        }
      }
      return null;
    },
    getPreviousSibling: function (a) {
      a = ao.Dom.get(a);
      if (!a) {
        return null;
      }
      return ao.Dom.getPreviousSiblingBy(a);
    },
    getNextSiblingBy: function (a, b) {
      while (a) {
        a = a.nextSibling;
        if (ao.Dom._testElement(a, b)) {
          return a;
        }
      }
      return null;
    },
    getNextSibling: function (a) {
      a = ao.Dom.get(a);
      if (!a) {
        return null;
      }
      return ao.Dom.getNextSiblingBy(a);
    },
    getFirstChildBy: function (b, a) {
      var c = ao.Dom._testElement(b.firstChild, a) ? b.firstChild : null;
      return c || ao.Dom.getNextSiblingBy(b.firstChild, a);
    },
    getFirstChild: function (a, b) {
      a = ao.Dom.get(a);
      if (!a) {
        return null;
      }
      return ao.Dom.getFirstChildBy(a);
    },
    getLastChildBy: function (b, a) {
      if (!b) {
        return null;
      }
      var c = ao.Dom._testElement(b.lastChild, a) ? b.lastChild : null;
      return c || ao.Dom.getPreviousSiblingBy(b.lastChild, a);
    },
    getLastChild: function (a) {
      a = ao.Dom.get(a);
      return ao.Dom.getLastChildBy(a);
    },
    getChildrenBy: function (c, d) {
      var a = ao.Dom.getFirstChildBy(c, d),
        b = a ? [a] : [];
      ao.Dom.getNextSiblingBy(a, function (f) {
        if (!d || d(f)) {
          b[b.length] = f;
        }
        return false;
      });
      return b;
    },
    getChildren: function (a) {
      a = ao.Dom.get(a);
      if (!a) {
      }
      return ao.Dom.getChildrenBy(a);
    },
    getDocumentScrollLeft: function (a) {
      a = a || aj;
      return Math.max(a[av].scrollLeft, a.body.scrollLeft);
    },
    getDocumentScrollTop: function (a) {
      a = a || aj;
      return Math.max(a[av].scrollTop, a.body.scrollTop);
    },
    insertBefore: function (b, a) {
      b = ao.Dom.get(b);
      a = ao.Dom.get(a);
      if (!b || !a || !a[x]) {
        return null;
      }
      return a[x].insertBefore(b, a);
    },
    insertAfter: function (b, a) {
      b = ao.Dom.get(b);
      a = ao.Dom.get(a);
      if (!b || !a || !a[x]) {
        return null;
      }
      if (a.nextSibling) {
        return a[x].insertBefore(b, a.nextSibling);
      } else {
        return a[x].appendChild(b);
      }
    },
    getClientRegion: function () {
      var a = ao.Dom.getDocumentScrollTop(),
        c = ao.Dom.getDocumentScrollLeft(),
        d = ao.Dom.getViewportWidth() + c,
        b = ao.Dom.getViewportHeight() + a;
      return new ao.Region(a, d, b, c);
    },
    setAttribute: function (c, b, a) {
      b = ao.Dom.CUSTOM_ATTRIBUTES[b] || b;
      c.setAttribute(b, a);
    },
    getAttribute: function (b, a) {
      a = ao.Dom.CUSTOM_ATTRIBUTES[a] || a;
      return b.getAttribute(a);
    },
    _toCamel: function (c) {
      var a = aN;
      function b(f, d) {
        return d.toUpperCase();
      }
      return (
        a[c] || (a[c] = c.indexOf("-") === -1 ? c : c.replace(/-([a-z])/gi, b))
      );
    },
    _getClassRegex: function (b) {
      var a;
      if (b !== undefined) {
        if (b.exec) {
          a = b;
        } else {
          a = aJ[b];
          if (!a) {
            b = b.replace(ao.Dom._patterns.CLASS_RE_TOKENS, "\\$1");
            a = aJ[b] = new RegExp(ay + b + aG, Y);
          }
        }
      }
      return a;
    },
    _patterns: {
      ROOT_TAG: /^body|html$/i,
      CLASS_RE_TOKENS: /([\.\(\)\^\$\*\+\?\|\[\]\{\}])/g,
    },
    _testElement: function (a, b) {
      return a && a[aF] == 1 && (!b || b(a));
    },
    _calcBorders: function (a, d) {
      var c = parseInt(ao.Dom[au](a, ac), 10) || 0,
        b = parseInt(ao.Dom[au](a, aA), 10) || 0;
      if (am) {
        if (ag.test(a[aq])) {
          c = 0;
          b = 0;
        }
      }
      d[0] += b;
      d[1] += c;
      return d;
    },
  };
  var ab = ao.Dom[au];
  if (aE.opera) {
    ao.Dom[au] = function (c, b) {
      var a = ab(c, b);
      if (y.test(b)) {
        a = ao.Dom.Color.toRGB(a);
      }
      return a;
    };
  }
  if (aE.webkit) {
    ao.Dom[au] = function (c, b) {
      var a = ab(c, b);
      if (a === "rgba(0, 0, 0, 0)") {
        a = "transparent";
      }
      return a;
    };
  }
})();
YAHOO.util.Region = function (c, b, a, d) {
  this.top = c;
  this.y = c;
  this[1] = c;
  this.right = b;
  this.bottom = a;
  this.left = d;
  this.x = d;
  this[0] = d;
  this.width = this.right - this.left;
  this.height = this.bottom - this.top;
};
YAHOO.util.Region.prototype.contains = function (a) {
  return (
    a.left >= this.left &&
    a.right <= this.right &&
    a.top >= this.top &&
    a.bottom <= this.bottom
  );
};
YAHOO.util.Region.prototype.getArea = function () {
  return (this.bottom - this.top) * (this.right - this.left);
};
YAHOO.util.Region.prototype.intersect = function (b) {
  var d = Math.max(this.top, b.top),
    c = Math.min(this.right, b.right),
    a = Math.min(this.bottom, b.bottom),
    f = Math.max(this.left, b.left);
  if (a >= d && c >= f) {
    return new YAHOO.util.Region(d, c, a, f);
  } else {
    return null;
  }
};
YAHOO.util.Region.prototype.union = function (b) {
  var d = Math.min(this.top, b.top),
    c = Math.max(this.right, b.right),
    a = Math.max(this.bottom, b.bottom),
    f = Math.min(this.left, b.left);
  return new YAHOO.util.Region(d, c, a, f);
};
YAHOO.util.Region.prototype.toString = function () {
  return (
    "Region {top: " +
    this.top +
    ", right: " +
    this.right +
    ", bottom: " +
    this.bottom +
    ", left: " +
    this.left +
    ", height: " +
    this.height +
    ", width: " +
    this.width +
    "}"
  );
};
YAHOO.util.Region.getRegion = function (d) {
  var b = YAHOO.util.Dom.getXY(d),
    f = b[1],
    c = b[0] + d.offsetWidth,
    a = b[1] + d.offsetHeight,
    g = b[0];
  return new YAHOO.util.Region(f, c, a, g);
};
YAHOO.util.Point = function (a, b) {
  if (YAHOO.lang.isArray(a)) {
    b = a[1];
    a = a[0];
  }
  YAHOO.util.Point.superclass.constructor.call(this, b, a, b, a);
};
YAHOO.extend(YAHOO.util.Point, YAHOO.util.Region);
(function () {
  var y = YAHOO.util,
    z = "clientTop",
    u = "clientLeft",
    q = "parentNode",
    o = "right",
    a = "hasLayout",
    r = "px",
    c = "opacity",
    n = "auto",
    w = "borderLeftWidth",
    t = "borderTopWidth",
    j = "borderRightWidth",
    b = "borderBottomWidth",
    f = "visible",
    h = "transparent",
    l = "height",
    v = "width",
    s = "style",
    d = "currentStyle",
    g = /^width|height$/,
    k =
      /^(\d[.\d]*)+(em|ex|px|gd|rem|vw|vh|vm|ch|mm|cm|in|pt|pc|deg|rad|ms|s|hz|khz|%){1}?/i,
    m = {
      get: function (D, B) {
        var C = "",
          A = D[d][B];
        if (B === c) {
          C = y.Dom.getStyle(D, c);
        } else {
          if (!A || (A.indexOf && A.indexOf(r) > -1)) {
            C = A;
          } else {
            if (y.Dom.IE_COMPUTED[B]) {
              C = y.Dom.IE_COMPUTED[B](D, B);
            } else {
              if (k.test(A)) {
                C = y.Dom.IE.ComputedStyle.getPixel(D, B);
              } else {
                C = A;
              }
            }
          }
        }
        return C;
      },
      getOffset: function (D, C) {
        var A = D[d][C],
          H = C.charAt(0).toUpperCase() + C.substr(1),
          G = "offset" + H,
          F = "pixel" + H,
          B = "",
          E;
        if (A == n) {
          E = D[G];
          if (E === undefined) {
            B = 0;
          }
          B = E;
          if (g.test(C)) {
            D[s][C] = E;
            if (D[G] > E) {
              B = E - (D[G] - E);
            }
            D[s][C] = n;
          }
        } else {
          if (!D[s][F] && !D[s][C]) {
            D[s][C] = A;
          }
          B = D[s][F];
        }
        return B + r;
      },
      getBorderWidth: function (C, A) {
        var B = null;
        if (!C[d][a]) {
          C[s].zoom = 1;
        }
        switch (A) {
          case t:
            B = C[z];
            break;
          case b:
            B = C.offsetHeight - C.clientHeight - C[z];
            break;
          case w:
            B = C[u];
            break;
          case j:
            B = C.offsetWidth - C.clientWidth - C[u];
            break;
        }
        return B + r;
      },
      getPixel: function (D, E) {
        var B = null,
          A = D[d][o],
          C = D[d][E];
        D[s][o] = C;
        B = D[s].pixelRight;
        D[s][o] = A;
        return B + r;
      },
      getMargin: function (B, C) {
        var A;
        if (B[d][C] == n) {
          A = 0 + r;
        } else {
          A = y.Dom.IE.ComputedStyle.getPixel(B, C);
        }
        return A;
      },
      getVisibility: function (B, C) {
        var A;
        while ((A = B[d]) && A[C] == "inherit") {
          B = B[q];
        }
        return A ? A[C] : f;
      },
      getColor: function (A, B) {
        return y.Dom.Color.toRGB(A[d][B]) || h;
      },
      getBorderColor: function (C, D) {
        var B = C[d],
          A = B[D] || B.color;
        return y.Dom.Color.toRGB(y.Dom.Color.toHex(A));
      },
    },
    x = {};
  x.top = x.right = x.bottom = x.left = x[v] = x[l] = m.getOffset;
  x.color = m.getColor;
  x[t] = x[j] = x[b] = x[w] = m.getBorderWidth;
  x.marginTop = x.marginRight = x.marginBottom = x.marginLeft = m.getMargin;
  x.visibility = m.getVisibility;
  x.borderColor =
    x.borderTopColor =
    x.borderRightColor =
    x.borderBottomColor =
    x.borderLeftColor =
      m.getBorderColor;
  y.Dom.IE_COMPUTED = x;
  y.Dom.IE_ComputedStyle = m;
})();
(function () {
  var c = "toString",
    a = parseInt,
    d = RegExp,
    b = YAHOO.util;
  b.Dom.Color = {
    KEYWORDS: {
      black: "000",
      silver: "c0c0c0",
      gray: "808080",
      white: "fff",
      maroon: "800000",
      red: "f00",
      purple: "800080",
      fuchsia: "f0f",
      green: "008000",
      lime: "0f0",
      olive: "808000",
      yellow: "ff0",
      navy: "000080",
      blue: "00f",
      teal: "008080",
      aqua: "0ff",
    },
    re_RGB: /^rgb\(([0-9]+)\s*,\s*([0-9]+)\s*,\s*([0-9]+)\)$/i,
    re_hex: /^#?([0-9A-F]{2})([0-9A-F]{2})([0-9A-F]{2})$/i,
    re_hex3: /([0-9A-F])/gi,
    toRGB: function (f) {
      if (!b.Dom.Color.re_RGB.test(f)) {
        f = b.Dom.Color.toHex(f);
      }
      if (b.Dom.Color.re_hex.exec(f)) {
        f = "rgb(" + [a(d.$1, 16), a(d.$2, 16), a(d.$3, 16)].join(", ") + ")";
      }
      return f;
    },
    toHex: function (f) {
      f = b.Dom.Color.KEYWORDS[f] || f;
      if (b.Dom.Color.re_RGB.exec(f)) {
        var g = d.$1.length === 1 ? "0" + d.$1 : Number(d.$1),
          h = d.$2.length === 1 ? "0" + d.$2 : Number(d.$2),
          j = d.$3.length === 1 ? "0" + d.$3 : Number(d.$3);
        f = [g[c](16), h[c](16), j[c](16)].join("");
      }
      if (f.length < 6) {
        f = f.replace(b.Dom.Color.re_hex3, "$1$1");
      }
      if (f !== "transparent" && f.indexOf("#") < 0) {
        f = "#" + f;
      }
      return f.toLowerCase();
    },
  };
})();
YAHOO.register("dom", YAHOO.util.Dom, { version: "2.7.0", build: "1799" });
YAHOO.util.Attribute = function (b, a) {
  if (a) {
    this.owner = a;
    this.configure(b, true);
  }
};
YAHOO.util.Attribute.prototype = {
  name: undefined,
  value: null,
  owner: null,
  readOnly: false,
  writeOnce: false,
  _initialConfig: null,
  _written: false,
  method: null,
  setter: null,
  getter: null,
  validator: null,
  getValue: function () {
    var a = this.value;
    if (this.getter) {
      a = this.getter.call(this.owner, this.name);
    }
    return a;
  },
  setValue: function (b, g) {
    var c,
      a = this.owner,
      f = this.name;
    var d = { type: f, prevValue: this.getValue(), newValue: b };
    if (this.readOnly || (this.writeOnce && this._written)) {
      return false;
    }
    if (this.validator && !this.validator.call(a, b)) {
      return false;
    }
    if (!g) {
      c = a.fireBeforeChangeEvent(d);
      if (c === false) {
        return false;
      }
    }
    if (this.setter) {
      b = this.setter.call(a, b, this.name);
      if (b === undefined) {
      }
    }
    if (this.method) {
      this.method.call(a, b, this.name);
    }
    this.value = b;
    this._written = true;
    d.type = f;
    if (!g) {
      this.owner.fireChangeEvent(d);
    }
    return true;
  },
  configure: function (c, b) {
    c = c || {};
    if (b) {
      this._written = false;
    }
    this._initialConfig = this._initialConfig || {};
    for (var a in c) {
      if (c.hasOwnProperty(a)) {
        this[a] = c[a];
        if (b) {
          this._initialConfig[a] = c[a];
        }
      }
    }
  },
  resetValue: function () {
    return this.setValue(this._initialConfig.value);
  },
  resetConfig: function () {
    this.configure(this._initialConfig, true);
  },
  refresh: function (a) {
    this.setValue(this.value, a);
  },
};
(function () {
  var a = YAHOO.util.Lang;
  YAHOO.util.AttributeProvider = function () {};
  YAHOO.util.AttributeProvider.prototype = {
    _configs: null,
    get: function (b) {
      this._configs = this._configs || {};
      var c = this._configs[b];
      if (!c || !this._configs.hasOwnProperty(b)) {
        return null;
      }
      return c.getValue();
    },
    set: function (c, b, f) {
      this._configs = this._configs || {};
      var d = this._configs[c];
      if (!d) {
        return false;
      }
      return d.setValue(b, f);
    },
    getAttributeKeys: function () {
      this._configs = this._configs;
      var b = [],
        c;
      for (c in this._configs) {
        if (
          a.hasOwnProperty(this._configs, c) &&
          !a.isUndefined(this._configs[c])
        ) {
          b[b.length] = c;
        }
      }
      return b;
    },
    setAttributes: function (b, d) {
      for (var c in b) {
        if (a.hasOwnProperty(b, c)) {
          this.set(c, b[c], d);
        }
      }
    },
    resetValue: function (b, c) {
      this._configs = this._configs || {};
      if (this._configs[b]) {
        this.set(b, this._configs[b]._initialConfig.value, c);
        return true;
      }
      return false;
    },
    refresh: function (c, f) {
      this._configs = this._configs || {};
      var b = this._configs;
      c = (a.isString(c) ? [c] : c) || this.getAttributeKeys();
      for (var d = 0, g = c.length; d < g; ++d) {
        if (b.hasOwnProperty(c[d])) {
          this._configs[c[d]].refresh(f);
        }
      }
    },
    register: function (c, b) {
      this.setAttributeConfig(c, b);
    },
    getAttributeConfig: function (c) {
      this._configs = this._configs || {};
      var d = this._configs[c] || {};
      var b = {};
      for (c in d) {
        if (a.hasOwnProperty(d, c)) {
          b[c] = d[c];
        }
      }
      return b;
    },
    setAttributeConfig: function (d, c, b) {
      this._configs = this._configs || {};
      c = c || {};
      if (!this._configs[d]) {
        c.name = d;
        this._configs[d] = this.createAttribute(c);
      } else {
        this._configs[d].configure(c, b);
      }
    },
    configureAttribute: function (d, c, b) {
      this.setAttributeConfig(d, c, b);
    },
    resetAttributeConfig: function (b) {
      this._configs = this._configs || {};
      this._configs[b].resetConfig();
    },
    subscribe: function (c, b) {
      this._events = this._events || {};
      if (!(c in this._events)) {
        this._events[c] = this.createEvent(c);
      }
      YAHOO.util.EventProvider.prototype.subscribe.apply(this, arguments);
    },
    on: function () {
      this.subscribe.apply(this, arguments);
    },
    addListener: function () {
      this.subscribe.apply(this, arguments);
    },
    fireBeforeChangeEvent: function (b) {
      var c = "before";
      c += b.type.charAt(0).toUpperCase() + b.type.substr(1) + "Change";
      b.type = c;
      return this.fireEvent(b.type, b);
    },
    fireChangeEvent: function (b) {
      b.type += "Change";
      return this.fireEvent(b.type, b);
    },
    createAttribute: function (b) {
      return new YAHOO.util.Attribute(b, this);
    },
  };
  YAHOO.augment(YAHOO.util.AttributeProvider, YAHOO.util.EventProvider);
})();
(function () {
  var c = YAHOO.util.Dom,
    b = YAHOO.util.AttributeProvider;
  var a = function (f, d) {
    this.init.apply(this, arguments);
  };
  a.DOM_EVENTS = {
    click: true,
    dblclick: true,
    keydown: true,
    keypress: true,
    keyup: true,
    mousedown: true,
    mousemove: true,
    mouseout: true,
    mouseover: true,
    mouseup: true,
    focus: true,
    blur: true,
    submit: true,
    change: true,
  };
  a.prototype = {
    DOM_EVENTS: null,
    DEFAULT_HTML_SETTER: function (d, g) {
      var f = this.get("element");
      if (f) {
        f[g] = d;
      }
    },
    DEFAULT_HTML_GETTER: function (g) {
      var f = this.get("element"),
        d;
      if (f) {
        d = f[g];
      }
      return d;
    },
    appendChild: function (d) {
      d = d.get ? d.get("element") : d;
      return this.get("element").appendChild(d);
    },
    getElementsByTagName: function (d) {
      return this.get("element").getElementsByTagName(d);
    },
    hasChildNodes: function () {
      return this.get("element").hasChildNodes();
    },
    insertBefore: function (f, d) {
      f = f.get ? f.get("element") : f;
      d = d && d.get ? d.get("element") : d;
      return this.get("element").insertBefore(f, d);
    },
    removeChild: function (d) {
      d = d.get ? d.get("element") : d;
      return this.get("element").removeChild(d);
    },
    replaceChild: function (f, d) {
      f = f.get ? f.get("element") : f;
      d = d.get ? d.get("element") : d;
      return this.get("element").replaceChild(f, d);
    },
    initAttributes: function (d) {},
    addListener: function (f, g, d, h) {
      var j = this.get("element") || this.get("id");
      h = h || this;
      var k = this;
      if (!this._events[f]) {
        if (j && this.DOM_EVENTS[f]) {
          YAHOO.util.Event.addListener(
            j,
            f,
            function (l) {
              if (l.srcElement && !l.target) {
                l.target = l.srcElement;
              }
              k.fireEvent(f, l);
            },
            d,
            h
          );
        }
        this.createEvent(f, this);
      }
      return YAHOO.util.EventProvider.prototype.subscribe.apply(
        this,
        arguments
      );
    },
    on: function () {
      return this.addListener.apply(this, arguments);
    },
    subscribe: function () {
      return this.addListener.apply(this, arguments);
    },
    removeListener: function (d, f) {
      return this.unsubscribe.apply(this, arguments);
    },
    addClass: function (d) {
      c.addClass(this.get("element"), d);
    },
    getElementsByClassName: function (d, f) {
      return c.getElementsByClassName(d, f, this.get("element"));
    },
    hasClass: function (d) {
      return c.hasClass(this.get("element"), d);
    },
    removeClass: function (d) {
      return c.removeClass(this.get("element"), d);
    },
    replaceClass: function (d, f) {
      return c.replaceClass(this.get("element"), d, f);
    },
    setStyle: function (d, f) {
      return c.setStyle(this.get("element"), d, f);
    },
    getStyle: function (d) {
      return c.getStyle(this.get("element"), d);
    },
    fireQueue: function () {
      var f = this._queue;
      for (var d = 0, g = f.length; d < g; ++d) {
        this[f[d][0]].apply(this, f[d][1]);
      }
    },
    appendTo: function (f, d) {
      f = f.get ? f.get("element") : c.get(f);
      this.fireEvent("beforeAppendTo", { type: "beforeAppendTo", target: f });
      d = d && d.get ? d.get("element") : c.get(d);
      var g = this.get("element");
      if (!g) {
        return false;
      }
      if (!f) {
        return false;
      }
      if (g.parent != f) {
        if (d) {
          f.insertBefore(g, d);
        } else {
          f.appendChild(g);
        }
      }
      this.fireEvent("appendTo", { type: "appendTo", target: f });
      return g;
    },
    get: function (g) {
      var d = this._configs || {},
        f = d.element;
      if (f && !d[g] && !YAHOO.lang.isUndefined(f.value[g])) {
        this._setHTMLAttrConfig(g);
      }
      return b.prototype.get.call(this, g);
    },
    setAttributes: function (d, h) {
      var k = {},
        g = this._configOrder;
      for (var f = 0, l = g.length; f < l; ++f) {
        if (d[g[f]] !== undefined) {
          k[g[f]] = true;
          this.set(g[f], d[g[f]], h);
        }
      }
      for (var j in d) {
        if (d.hasOwnProperty(j) && !k[j]) {
          this.set(j, d[j], h);
        }
      }
    },
    set: function (g, d, h) {
      var f = this.get("element");
      if (!f) {
        this._queue[this._queue.length] = ["set", arguments];
        if (this._configs[g]) {
          this._configs[g].value = d;
        }
        return;
      }
      if (!this._configs[g] && !YAHOO.lang.isUndefined(f[g])) {
        this._setHTMLAttrConfig(g);
      }
      return b.prototype.set.apply(this, arguments);
    },
    setAttributeConfig: function (g, f, d) {
      this._configOrder.push(g);
      b.prototype.setAttributeConfig.apply(this, arguments);
    },
    createEvent: function (d, f) {
      this._events[d] = true;
      return b.prototype.createEvent.apply(this, arguments);
    },
    init: function (d, f) {
      this._initElement(d, f);
    },
    destroy: function () {
      var d = this.get("element");
      YAHOO.util.Event.purgeElement(d, true);
      this.unsubscribeAll();
      if (d && d.parentNode) {
        d.parentNode.removeChild(d);
      }
      this._queue = [];
      this._events = {};
      this._configs = {};
      this._configOrder = [];
    },
    _initElement: function (g, h) {
      this._queue = this._queue || [];
      this._events = this._events || {};
      this._configs = this._configs || {};
      this._configOrder = [];
      h = h || {};
      h.element = h.element || g || null;
      var d = false;
      var j = a.DOM_EVENTS;
      this.DOM_EVENTS = this.DOM_EVENTS || {};
      for (var f in j) {
        if (j.hasOwnProperty(f)) {
          this.DOM_EVENTS[f] = j[f];
        }
      }
      if (typeof h.element === "string") {
        this._setHTMLAttrConfig("id", { value: h.element });
      }
      if (c.get(h.element)) {
        d = true;
        this._initHTMLElement(h);
        this._initContent(h);
      }
      YAHOO.util.Event.onAvailable(
        h.element,
        function () {
          if (!d) {
            this._initHTMLElement(h);
          }
          this.fireEvent("available", {
            type: "available",
            target: c.get(h.element),
          });
        },
        this,
        true
      );
      YAHOO.util.Event.onContentReady(
        h.element,
        function () {
          if (!d) {
            this._initContent(h);
          }
          this.fireEvent("contentReady", {
            type: "contentReady",
            target: c.get(h.element),
          });
        },
        this,
        true
      );
    },
    _initHTMLElement: function (d) {
      this.setAttributeConfig("element", {
        value: c.get(d.element),
        readOnly: true,
      });
    },
    _initContent: function (d) {
      this.initAttributes(d);
      this.setAttributes(d, true);
      this.fireQueue();
    },
    _setHTMLAttrConfig: function (g, d) {
      var f = this.get("element");
      d = d || {};
      d.name = g;
      d.setter = d.setter || this.DEFAULT_HTML_SETTER;
      d.getter = d.getter || this.DEFAULT_HTML_GETTER;
      d.value = d.value || f[g];
      this._configs[g] = new YAHOO.util.Attribute(d, this);
    },
  };
  YAHOO.augment(a, b);
  YAHOO.util.Element = a;
})();
YAHOO.register("element", YAHOO.util.Element, {
  version: "2.7.0",
  build: "1799",
});
if (!YAHOO.util.DragDropMgr) {
  YAHOO.util.DragDropMgr = (function () {
    var a = YAHOO.util.Event,
      b = YAHOO.util.Dom;
    return {
      useShim: false,
      _shimActive: false,
      _shimState: false,
      _debugShim: false,
      _createShim: function () {
        var c = document.createElement("div");
        c.id = "yui-ddm-shim";
        if (document.body.firstChild) {
          document.body.insertBefore(c, document.body.firstChild);
        } else {
          document.body.appendChild(c);
        }
        c.style.display = "none";
        c.style.backgroundColor = "red";
        c.style.position = "absolute";
        c.style.zIndex = "99999";
        b.setStyle(c, "opacity", "0");
        this._shim = c;
        a.on(c, "mouseup", this.handleMouseUp, this, true);
        a.on(c, "mousemove", this.handleMouseMove, this, true);
        a.on(window, "scroll", this._sizeShim, this, true);
      },
      _sizeShim: function () {
        if (this._shimActive) {
          var c = this._shim;
          c.style.height = b.getDocumentHeight() + "px";
          c.style.width = b.getDocumentWidth() + "px";
          c.style.top = "0";
          c.style.left = "0";
        }
      },
      _activateShim: function () {
        if (this.useShim) {
          if (!this._shim) {
            this._createShim();
          }
          this._shimActive = true;
          var d = this._shim,
            c = "0";
          if (this._debugShim) {
            c = ".5";
          }
          b.setStyle(d, "opacity", c);
          this._sizeShim();
          d.style.display = "block";
        }
      },
      _deactivateShim: function () {
        this._shim.style.display = "none";
        this._shimActive = false;
      },
      _shim: null,
      ids: {},
      handleIds: {},
      dragCurrent: null,
      dragOvers: {},
      deltaX: 0,
      deltaY: 0,
      preventDefault: true,
      stopPropagation: true,
      initialized: false,
      locked: false,
      interactionInfo: null,
      init: function () {
        this.initialized = true;
      },
      POINT: 0,
      INTERSECT: 1,
      STRICT_INTERSECT: 2,
      mode: 0,
      _execOnAll: function (f, g) {
        for (var d in this.ids) {
          for (var h in this.ids[d]) {
            var c = this.ids[d][h];
            if (!this.isTypeOfDD(c)) {
              continue;
            }
            c[f].apply(c, g);
          }
        }
      },
      _onLoad: function () {
        this.init();
        a.on(document, "mouseup", this.handleMouseUp, this, true);
        a.on(document, "mousemove", this.handleMouseMove, this, true);
        a.on(window, "unload", this._onUnload, this, true);
        a.on(window, "resize", this._onResize, this, true);
      },
      _onResize: function (c) {
        this._execOnAll("resetConstraints", []);
      },
      lock: function () {
        this.locked = true;
      },
      unlock: function () {
        this.locked = false;
      },
      isLocked: function () {
        return this.locked;
      },
      locationCache: {},
      useCache: true,
      clickPixelThresh: 3,
      clickTimeThresh: 1000,
      dragThreshMet: false,
      clickTimeout: null,
      startX: 0,
      startY: 0,
      fromTimeout: false,
      regDragDrop: function (c, d) {
        if (!this.initialized) {
          this.init();
        }
        if (!this.ids[d]) {
          this.ids[d] = {};
        }
        this.ids[d][c.id] = c;
      },
      removeDDFromGroup: function (c, f) {
        if (!this.ids[f]) {
          this.ids[f] = {};
        }
        var d = this.ids[f];
        if (d && d[c.id]) {
          delete d[c.id];
        }
      },
      _remove: function (c) {
        for (var d in c.groups) {
          if (d) {
            var f = this.ids[d];
            if (f && f[c.id]) {
              delete f[c.id];
            }
          }
        }
        delete this.handleIds[c.id];
      },
      regHandle: function (c, d) {
        if (!this.handleIds[c]) {
          this.handleIds[c] = {};
        }
        this.handleIds[c][d] = d;
      },
      isDragDrop: function (c) {
        return this.getDDById(c) ? true : false;
      },
      getRelated: function (c, h) {
        var d = [];
        for (var f in c.groups) {
          for (var g in this.ids[f]) {
            var j = this.ids[f][g];
            if (!this.isTypeOfDD(j)) {
              continue;
            }
            if (!h || j.isTarget) {
              d[d.length] = j;
            }
          }
        }
        return d;
      },
      isLegalTarget: function (c, d) {
        var g = this.getRelated(c, true);
        for (var f = 0, h = g.length; f < h; ++f) {
          if (g[f].id == d.id) {
            return true;
          }
        }
        return false;
      },
      isTypeOfDD: function (c) {
        return c && c.__ygDragDrop;
      },
      isHandle: function (c, d) {
        return this.handleIds[c] && this.handleIds[c][d];
      },
      getDDById: function (c) {
        for (var d in this.ids) {
          if (this.ids[d][c]) {
            return this.ids[d][c];
          }
        }
        return null;
      },
      handleMouseDown: function (c, d) {
        this.currentTarget = YAHOO.util.Event.getTarget(c);
        this.dragCurrent = d;
        var f = d.getEl();
        this.startX = YAHOO.util.Event.getPageX(c);
        this.startY = YAHOO.util.Event.getPageY(c);
        this.deltaX = this.startX - f.offsetLeft;
        this.deltaY = this.startY - f.offsetTop;
        this.dragThreshMet = false;
        this.clickTimeout = setTimeout(function () {
          var g = YAHOO.util.DDM;
          g.startDrag(g.startX, g.startY);
          g.fromTimeout = true;
        }, this.clickTimeThresh);
      },
      startDrag: function (f, c) {
        if (this.dragCurrent && this.dragCurrent.useShim) {
          this._shimState = this.useShim;
          this.useShim = true;
        }
        this._activateShim();
        clearTimeout(this.clickTimeout);
        var d = this.dragCurrent;
        if (d && d.events.b4StartDrag) {
          d.b4StartDrag(f, c);
          d.fireEvent("b4StartDragEvent", { x: f, y: c });
        }
        if (d && d.events.startDrag) {
          d.startDrag(f, c);
          d.fireEvent("startDragEvent", { x: f, y: c });
        }
        this.dragThreshMet = true;
      },
      handleMouseUp: function (c) {
        if (this.dragCurrent) {
          clearTimeout(this.clickTimeout);
          if (this.dragThreshMet) {
            if (this.fromTimeout) {
              this.fromTimeout = false;
              this.handleMouseMove(c);
            }
            this.fromTimeout = false;
            this.fireEvents(c, true);
          } else {
          }
          this.stopDrag(c);
          this.stopEvent(c);
        }
      },
      stopEvent: function (c) {
        if (this.stopPropagation) {
          YAHOO.util.Event.stopPropagation(c);
        }
        if (this.preventDefault) {
          YAHOO.util.Event.preventDefault(c);
        }
      },
      stopDrag: function (c, d) {
        var f = this.dragCurrent;
        if (f && !d) {
          if (this.dragThreshMet) {
            if (f.events.b4EndDrag) {
              f.b4EndDrag(c);
              f.fireEvent("b4EndDragEvent", { e: c });
            }
            if (f.events.endDrag) {
              f.endDrag(c);
              f.fireEvent("endDragEvent", { e: c });
            }
          }
          if (f.events.mouseUp) {
            f.onMouseUp(c);
            f.fireEvent("mouseUpEvent", { e: c });
          }
        }
        if (this._shimActive) {
          this._deactivateShim();
          if (this.dragCurrent && this.dragCurrent.useShim) {
            this.useShim = this._shimState;
            this._shimState = false;
          }
        }
        this.dragCurrent = null;
        this.dragOvers = {};
      },
      handleMouseMove: function (c) {
        var g = this.dragCurrent;
        if (g) {
          if (YAHOO.util.Event.isIE && !c.button) {
            this.stopEvent(c);
            return this.handleMouseUp(c);
          } else {
            if (c.clientX < 0 || c.clientY < 0) {
            }
          }
          if (!this.dragThreshMet) {
            var d = Math.abs(this.startX - YAHOO.util.Event.getPageX(c));
            var f = Math.abs(this.startY - YAHOO.util.Event.getPageY(c));
            if (d > this.clickPixelThresh || f > this.clickPixelThresh) {
              this.startDrag(this.startX, this.startY);
            }
          }
          if (this.dragThreshMet) {
            if (g && g.events.b4Drag) {
              g.b4Drag(c);
              g.fireEvent("b4DragEvent", { e: c });
            }
            if (g && g.events.drag) {
              g.onDrag(c);
              g.fireEvent("dragEvent", { e: c });
            }
            if (g) {
              this.fireEvents(c, false);
            }
          }
          this.stopEvent(c);
        }
      },
      fireEvents: function (k, v) {
        var af = this.dragCurrent;
        if (!af || af.isLocked() || af.dragOnly) {
          return;
        }
        var t = YAHOO.util.Event.getPageX(k),
          u = YAHOO.util.Event.getPageY(k),
          r = new YAHOO.util.Point(t, u),
          w = af.getTargetCoord(r.x, r.y),
          B = af.getDragEl(),
          aa = ["out", "over", "drop", "enter"],
          l = new YAHOO.util.Region(
            w.y,
            w.x + B.offsetWidth,
            w.y + B.offsetHeight,
            w.x
          ),
          y = [],
          ab = {},
          q = [],
          ae = { outEvts: [], overEvts: [], dropEvts: [], enterEvts: [] };
        for (var n in this.dragOvers) {
          var ad = this.dragOvers[n];
          if (!this.isTypeOfDD(ad)) {
            continue;
          }
          if (!this.isOverTarget(r, ad, this.mode, l)) {
            ae.outEvts.push(ad);
          }
          y[n] = true;
          delete this.dragOvers[n];
        }
        for (var o in af.groups) {
          if ("string" != typeof o) {
            continue;
          }
          for (n in this.ids[o]) {
            var A = this.ids[o][n];
            if (!this.isTypeOfDD(A)) {
              continue;
            }
            if (A.isTarget && !A.isLocked() && A != af) {
              if (this.isOverTarget(r, A, this.mode, l)) {
                ab[o] = true;
                if (v) {
                  ae.dropEvts.push(A);
                } else {
                  if (!y[A.id]) {
                    ae.enterEvts.push(A);
                  } else {
                    ae.overEvts.push(A);
                  }
                  this.dragOvers[A.id] = A;
                }
              }
            }
          }
        }
        this.interactionInfo = {
          out: ae.outEvts,
          enter: ae.enterEvts,
          over: ae.overEvts,
          drop: ae.dropEvts,
          point: r,
          draggedRegion: l,
          sourceRegion: this.locationCache[af.id],
          validDrop: v,
        };
        for (var ac in ab) {
          q.push(ac);
        }
        if (v && !ae.dropEvts.length) {
          this.interactionInfo.validDrop = false;
          if (af.events.invalidDrop) {
            af.onInvalidDrop(k);
            af.fireEvent("invalidDropEvent", { e: k });
          }
        }
        for (n = 0; n < aa.length; n++) {
          var g = null;
          if (ae[aa[n] + "Evts"]) {
            g = ae[aa[n] + "Evts"];
          }
          if (g && g.length) {
            var z = aa[n].charAt(0).toUpperCase() + aa[n].substr(1),
              h = "onDrag" + z,
              x = "b4Drag" + z,
              s = "drag" + z + "Event",
              j = "drag" + z;
            if (this.mode) {
              if (af.events[x]) {
                af[x](k, g, q);
                af.fireEvent(x + "Event", { event: k, info: g, group: q });
              }
              if (af.events[j]) {
                af[h](k, g, q);
                af.fireEvent(s, { event: k, info: g, group: q });
              }
            } else {
              for (var f = 0, m = g.length; f < m; ++f) {
                if (af.events[x]) {
                  af[x](k, g[f].id, q[0]);
                  af.fireEvent(x + "Event", {
                    event: k,
                    info: g[f].id,
                    group: q[0],
                  });
                }
                if (af.events[j]) {
                  af[h](k, g[f].id, q[0]);
                  af.fireEvent(s, { event: k, info: g[f].id, group: q[0] });
                }
              }
            }
          }
        }
      },
      getBestMatch: function (f) {
        var c = null;
        var g = f.length;
        if (g == 1) {
          c = f[0];
        } else {
          for (var d = 0; d < g; ++d) {
            var h = f[d];
            if (this.mode == this.INTERSECT && h.cursorIsOver) {
              c = h;
              break;
            } else {
              if (
                !c ||
                !c.overlap ||
                (h.overlap && c.overlap.getArea() < h.overlap.getArea())
              ) {
                c = h;
              }
            }
          }
        }
        return c;
      },
      refreshCache: function (h) {
        var f = h || this.ids;
        for (var j in f) {
          if ("string" != typeof j) {
            continue;
          }
          for (var g in this.ids[j]) {
            var d = this.ids[j][g];
            if (this.isTypeOfDD(d)) {
              var c = this.getLocation(d);
              if (c) {
                this.locationCache[d.id] = c;
              } else {
                delete this.locationCache[d.id];
              }
            }
          }
        }
      },
      verifyEl: function (d) {
        try {
          if (d) {
            var f = d.offsetParent;
            if (f) {
              return true;
            }
          }
        } catch (c) {}
        return false;
      },
      getLocation: function (m) {
        if (!this.isTypeOfDD(m)) {
          return null;
        }
        var o = m.getEl(),
          j,
          q,
          c,
          g,
          h,
          f,
          d,
          k,
          n;
        try {
          j = YAHOO.util.Dom.getXY(o);
        } catch (l) {}
        if (!j) {
          return null;
        }
        q = j[0];
        c = q + o.offsetWidth;
        g = j[1];
        h = g + o.offsetHeight;
        f = g - m.padding[0];
        d = c + m.padding[1];
        k = h + m.padding[2];
        n = q - m.padding[3];
        return new YAHOO.util.Region(f, d, k, n);
      },
      isOverTarget: function (f, d, m, l) {
        var k = this.locationCache[d.id];
        if (!k || !this.useCache) {
          k = this.getLocation(d);
          this.locationCache[d.id] = k;
        }
        if (!k) {
          return false;
        }
        d.cursorIsOver = k.contains(f);
        var g = this.dragCurrent;
        if (!g || (!m && !g.constrainX && !g.constrainY)) {
          return d.cursorIsOver;
        }
        d.overlap = null;
        if (!l) {
          var j = g.getTargetCoord(f.x, f.y);
          var c = g.getDragEl();
          l = new YAHOO.util.Region(
            j.y,
            j.x + c.offsetWidth,
            j.y + c.offsetHeight,
            j.x
          );
        }
        var h = l.intersect(k);
        if (h) {
          d.overlap = h;
          return m ? true : d.cursorIsOver;
        } else {
          return false;
        }
      },
      _onUnload: function (c, d) {
        this.unregAll();
      },
      unregAll: function () {
        if (this.dragCurrent) {
          this.stopDrag();
          this.dragCurrent = null;
        }
        this._execOnAll("unreg", []);
        this.ids = {};
      },
      elementCache: {},
      getElWrapper: function (c) {
        var d = this.elementCache[c];
        if (!d || !d.el) {
          d = this.elementCache[c] = new this.ElementWrapper(
            YAHOO.util.Dom.get(c)
          );
        }
        return d;
      },
      getElement: function (c) {
        return YAHOO.util.Dom.get(c);
      },
      getCss: function (c) {
        var d = YAHOO.util.Dom.get(c);
        return d ? d.style : null;
      },
      ElementWrapper: function (c) {
        this.el = c || null;
        this.id = this.el && c.id;
        this.css = this.el && c.style;
      },
      getPosX: function (c) {
        return YAHOO.util.Dom.getX(c);
      },
      getPosY: function (c) {
        return YAHOO.util.Dom.getY(c);
      },
      swapNode: function (d, g) {
        if (d.swapNode) {
          d.swapNode(g);
        } else {
          var c = g.parentNode;
          var f = g.nextSibling;
          if (f == d) {
            c.insertBefore(d, g);
          } else {
            if (g == d.nextSibling) {
              c.insertBefore(g, d);
            } else {
              d.parentNode.replaceChild(g, d);
              c.insertBefore(d, f);
            }
          }
        }
      },
      getScroll: function () {
        var d,
          g,
          c = document.documentElement,
          f = document.body;
        if (c && (c.scrollTop || c.scrollLeft)) {
          d = c.scrollTop;
          g = c.scrollLeft;
        } else {
          if (f) {
            d = f.scrollTop;
            g = f.scrollLeft;
          } else {
          }
        }
        return { top: d, left: g };
      },
      getStyle: function (c, d) {
        return YAHOO.util.Dom.getStyle(c, d);
      },
      getScrollTop: function () {
        return this.getScroll().top;
      },
      getScrollLeft: function () {
        return this.getScroll().left;
      },
      moveToEl: function (f, c) {
        var d = YAHOO.util.Dom.getXY(c);
        YAHOO.util.Dom.setXY(f, d);
      },
      getClientHeight: function () {
        return YAHOO.util.Dom.getViewportHeight();
      },
      getClientWidth: function () {
        return YAHOO.util.Dom.getViewportWidth();
      },
      numericSort: function (c, d) {
        return c - d;
      },
      _timeoutCount: 0,
      _addListeners: function () {
        var c = YAHOO.util.DDM;
        if (YAHOO.util.Event && document) {
          c._onLoad();
        } else {
          if (c._timeoutCount > 2000) {
          } else {
            setTimeout(c._addListeners, 10);
            if (document && document.body) {
              c._timeoutCount += 1;
            }
          }
        }
      },
      handleWasClicked: function (f, c) {
        if (this.isHandle(c, f.id)) {
          return true;
        } else {
          var d = f.parentNode;
          while (d) {
            if (this.isHandle(c, d.id)) {
              return true;
            } else {
              d = d.parentNode;
            }
          }
        }
        return false;
      },
    };
  })();
  YAHOO.util.DDM = YAHOO.util.DragDropMgr;
  YAHOO.util.DDM._addListeners();
}
(function () {
  var a = YAHOO.util.Event;
  var b = YAHOO.util.Dom;
  YAHOO.util.DragDrop = function (c, f, d) {
    if (c) {
      this.init(c, f, d);
    }
  };
  YAHOO.util.DragDrop.prototype = {
    events: null,
    on: function () {
      this.subscribe.apply(this, arguments);
    },
    id: null,
    config: null,
    dragElId: null,
    handleElId: null,
    invalidHandleTypes: null,
    invalidHandleIds: null,
    invalidHandleClasses: null,
    startPageX: 0,
    startPageY: 0,
    groups: null,
    locked: false,
    lock: function () {
      this.locked = true;
    },
    unlock: function () {
      this.locked = false;
    },
    isTarget: true,
    padding: null,
    dragOnly: false,
    useShim: false,
    _domRef: null,
    __ygDragDrop: true,
    constrainX: false,
    constrainY: false,
    minX: 0,
    maxX: 0,
    minY: 0,
    maxY: 0,
    deltaX: 0,
    deltaY: 0,
    maintainOffset: false,
    xTicks: null,
    yTicks: null,
    primaryButtonOnly: true,
    available: false,
    hasOuterHandles: false,
    cursorIsOver: false,
    overlap: null,
    b4StartDrag: function (d, c) {},
    startDrag: function (d, c) {},
    b4Drag: function (c) {},
    onDrag: function (c) {},
    onDragEnter: function (d, c) {},
    b4DragOver: function (c) {},
    onDragOver: function (d, c) {},
    b4DragOut: function (c) {},
    onDragOut: function (d, c) {},
    b4DragDrop: function (c) {},
    onDragDrop: function (d, c) {},
    onInvalidDrop: function (c) {},
    b4EndDrag: function (c) {},
    endDrag: function (c) {},
    b4MouseDown: function (c) {},
    onMouseDown: function (c) {},
    onMouseUp: function (c) {},
    onAvailable: function () {},
    getEl: function () {
      if (!this._domRef) {
        this._domRef = b.get(this.id);
      }
      return this._domRef;
    },
    getDragEl: function () {
      return b.get(this.dragElId);
    },
    init: function (c, g, f) {
      this.initTarget(c, g, f);
      a.on(
        this._domRef || this.id,
        "mousedown",
        this.handleMouseDown,
        this,
        true
      );
      for (var d in this.events) {
        this.createEvent(d + "Event");
      }
    },
    initTarget: function (c, f, d) {
      this.config = d || {};
      this.events = {};
      this.DDM = YAHOO.util.DDM;
      this.groups = {};
      if (typeof c !== "string") {
        this._domRef = c;
        c = b.generateId(c);
      }
      this.id = c;
      this.addToGroup(f ? f : "default");
      this.handleElId = c;
      a.onAvailable(c, this.handleOnAvailable, this, true);
      this.setDragElId(c);
      this.invalidHandleTypes = { A: "A" };
      this.invalidHandleIds = {};
      this.invalidHandleClasses = [];
      this.applyConfig();
    },
    applyConfig: function () {
      this.events = {
        mouseDown: true,
        b4MouseDown: true,
        mouseUp: true,
        b4StartDrag: true,
        startDrag: true,
        b4EndDrag: true,
        endDrag: true,
        drag: true,
        b4Drag: true,
        invalidDrop: true,
        b4DragOut: true,
        dragOut: true,
        dragEnter: true,
        b4DragOver: true,
        dragOver: true,
        b4DragDrop: true,
        dragDrop: true,
      };
      if (this.config.events) {
        for (var c in this.config.events) {
          if (this.config.events[c] === false) {
            this.events[c] = false;
          }
        }
      }
      this.padding = this.config.padding || [0, 0, 0, 0];
      this.isTarget = this.config.isTarget !== false;
      this.maintainOffset = this.config.maintainOffset;
      this.primaryButtonOnly = this.config.primaryButtonOnly !== false;
      this.dragOnly = this.config.dragOnly === true ? true : false;
      this.useShim = this.config.useShim === true ? true : false;
    },
    handleOnAvailable: function () {
      this.available = true;
      this.resetConstraints();
      this.onAvailable();
    },
    setPadding: function (d, g, c, f) {
      if (!g && 0 !== g) {
        this.padding = [d, d, d, d];
      } else {
        if (!c && 0 !== c) {
          this.padding = [d, g, d, g];
        } else {
          this.padding = [d, g, c, f];
        }
      }
    },
    setInitPosition: function (f, g) {
      var d = this.getEl();
      if (!this.DDM.verifyEl(d)) {
        if (d && d.style && d.style.display == "none") {
        } else {
        }
        return;
      }
      var h = f || 0;
      var j = g || 0;
      var c = b.getXY(d);
      this.initPageX = c[0] - h;
      this.initPageY = c[1] - j;
      this.lastPageX = c[0];
      this.lastPageY = c[1];
      this.setStartPosition(c);
    },
    setStartPosition: function (c) {
      var d = c || b.getXY(this.getEl());
      this.deltaSetXY = null;
      this.startPageX = d[0];
      this.startPageY = d[1];
    },
    addToGroup: function (c) {
      this.groups[c] = true;
      this.DDM.regDragDrop(this, c);
    },
    removeFromGroup: function (c) {
      if (this.groups[c]) {
        delete this.groups[c];
      }
      this.DDM.removeDDFromGroup(this, c);
    },
    setDragElId: function (c) {
      this.dragElId = c;
    },
    setHandleElId: function (c) {
      if (typeof c !== "string") {
        c = b.generateId(c);
      }
      this.handleElId = c;
      this.DDM.regHandle(this.id, c);
    },
    setOuterHandleElId: function (c) {
      if (typeof c !== "string") {
        c = b.generateId(c);
      }
      a.on(c, "mousedown", this.handleMouseDown, this, true);
      this.setHandleElId(c);
      this.hasOuterHandles = true;
    },
    unreg: function () {
      a.removeListener(this.id, "mousedown", this.handleMouseDown);
      this._domRef = null;
      this.DDM._remove(this);
    },
    isLocked: function () {
      return this.DDM.isLocked() || this.locked;
    },
    handleMouseDown: function (c, d) {
      var k = c.which || c.button;
      if (this.primaryButtonOnly && k > 1) {
        return;
      }
      if (this.isLocked()) {
        return;
      }
      var l = this.b4MouseDown(c),
        h = true;
      if (this.events.b4MouseDown) {
        h = this.fireEvent("b4MouseDownEvent", c);
      }
      var j = this.onMouseDown(c),
        f = true;
      if (this.events.mouseDown) {
        f = this.fireEvent("mouseDownEvent", c);
      }
      if (l === false || j === false || h === false || f === false) {
        return;
      }
      this.DDM.refreshCache(this.groups);
      var g = new YAHOO.util.Point(a.getPageX(c), a.getPageY(c));
      if (!this.hasOuterHandles && !this.DDM.isOverTarget(g, this)) {
      } else {
        if (this.clickValidator(c)) {
          this.setStartPosition();
          this.DDM.handleMouseDown(c, this);
          this.DDM.stopEvent(c);
        } else {
        }
      }
    },
    clickValidator: function (c) {
      var d = YAHOO.util.Event.getTarget(c);
      return (
        this.isValidHandleChild(d) &&
        (this.id == this.handleElId || this.DDM.handleWasClicked(d, this.id))
      );
    },
    getTargetCoord: function (d, f) {
      var g = d - this.deltaX;
      var c = f - this.deltaY;
      if (this.constrainX) {
        if (g < this.minX) {
          g = this.minX;
        }
        if (g > this.maxX) {
          g = this.maxX;
        }
      }
      if (this.constrainY) {
        if (c < this.minY) {
          c = this.minY;
        }
        if (c > this.maxY) {
          c = this.maxY;
        }
      }
      g = this.getTick(g, this.xTicks);
      c = this.getTick(c, this.yTicks);
      return { x: g, y: c };
    },
    addInvalidHandleType: function (d) {
      var c = d.toUpperCase();
      this.invalidHandleTypes[c] = c;
    },
    addInvalidHandleId: function (c) {
      if (typeof c !== "string") {
        c = b.generateId(c);
      }
      this.invalidHandleIds[c] = c;
    },
    addInvalidHandleClass: function (c) {
      this.invalidHandleClasses.push(c);
    },
    removeInvalidHandleType: function (d) {
      var c = d.toUpperCase();
      delete this.invalidHandleTypes[c];
    },
    removeInvalidHandleId: function (c) {
      if (typeof c !== "string") {
        c = b.generateId(c);
      }
      delete this.invalidHandleIds[c];
    },
    removeInvalidHandleClass: function (d) {
      for (var c = 0, f = this.invalidHandleClasses.length; c < f; ++c) {
        if (this.invalidHandleClasses[c] == d) {
          delete this.invalidHandleClasses[c];
        }
      }
    },
    isValidHandleChild: function (f) {
      var g = true;
      var c;
      try {
        c = f.nodeName.toUpperCase();
      } catch (d) {
        c = f.nodeName;
      }
      g = g && !this.invalidHandleTypes[c];
      g = g && !this.invalidHandleIds[f.id];
      for (var h = 0, j = this.invalidHandleClasses.length; g && h < j; ++h) {
        g = !b.hasClass(f, this.invalidHandleClasses[h]);
      }
      return g;
    },
    setXTicks: function (c, g) {
      this.xTicks = [];
      this.xTickSize = g;
      var d = {};
      for (var f = this.initPageX; f >= this.minX; f = f - g) {
        if (!d[f]) {
          this.xTicks[this.xTicks.length] = f;
          d[f] = true;
        }
      }
      for (f = this.initPageX; f <= this.maxX; f = f + g) {
        if (!d[f]) {
          this.xTicks[this.xTicks.length] = f;
          d[f] = true;
        }
      }
      this.xTicks.sort(this.DDM.numericSort);
    },
    setYTicks: function (c, g) {
      this.yTicks = [];
      this.yTickSize = g;
      var d = {};
      for (var f = this.initPageY; f >= this.minY; f = f - g) {
        if (!d[f]) {
          this.yTicks[this.yTicks.length] = f;
          d[f] = true;
        }
      }
      for (f = this.initPageY; f <= this.maxY; f = f + g) {
        if (!d[f]) {
          this.yTicks[this.yTicks.length] = f;
          d[f] = true;
        }
      }
      this.yTicks.sort(this.DDM.numericSort);
    },
    setXConstraint: function (c, d, f) {
      this.leftConstraint = parseInt(c, 10);
      this.rightConstraint = parseInt(d, 10);
      this.minX = this.initPageX - this.leftConstraint;
      this.maxX = this.initPageX + this.rightConstraint;
      if (f) {
        this.setXTicks(this.initPageX, f);
      }
      this.constrainX = true;
    },
    clearConstraints: function () {
      this.constrainX = false;
      this.constrainY = false;
      this.clearTicks();
    },
    clearTicks: function () {
      this.xTicks = null;
      this.yTicks = null;
      this.xTickSize = 0;
      this.yTickSize = 0;
    },
    setYConstraint: function (f, c, d) {
      this.topConstraint = parseInt(f, 10);
      this.bottomConstraint = parseInt(c, 10);
      this.minY = this.initPageY - this.topConstraint;
      this.maxY = this.initPageY + this.bottomConstraint;
      if (d) {
        this.setYTicks(this.initPageY, d);
      }
      this.constrainY = true;
    },
    resetConstraints: function () {
      if (this.initPageX || this.initPageX === 0) {
        var c = this.maintainOffset ? this.lastPageX - this.initPageX : 0;
        var d = this.maintainOffset ? this.lastPageY - this.initPageY : 0;
        this.setInitPosition(c, d);
      } else {
        this.setInitPosition();
      }
      if (this.constrainX) {
        this.setXConstraint(
          this.leftConstraint,
          this.rightConstraint,
          this.xTickSize
        );
      }
      if (this.constrainY) {
        this.setYConstraint(
          this.topConstraint,
          this.bottomConstraint,
          this.yTickSize
        );
      }
    },
    getTick: function (c, g) {
      if (!g) {
        return c;
      } else {
        if (g[0] >= c) {
          return g[0];
        } else {
          for (var j = 0, k = g.length; j < k; ++j) {
            var h = j + 1;
            if (g[h] && g[h] >= c) {
              var d = c - g[j];
              var f = g[h] - c;
              return f > d ? g[j] : g[h];
            }
          }
          return g[g.length - 1];
        }
      }
    },
    toString: function () {
      return "DragDrop " + this.id;
    },
  };
  YAHOO.augment(YAHOO.util.DragDrop, YAHOO.util.EventProvider);
})();
YAHOO.util.DD = function (b, a, c) {
  if (b) {
    this.init(b, a, c);
  }
};
YAHOO.extend(YAHOO.util.DD, YAHOO.util.DragDrop, {
  scroll: true,
  autoOffset: function (c, d) {
    var a = c - this.startPageX;
    var b = d - this.startPageY;
    this.setDelta(a, b);
  },
  setDelta: function (b, a) {
    this.deltaX = b;
    this.deltaY = a;
  },
  setDragElPos: function (b, c) {
    var a = this.getDragEl();
    this.alignElWithMouse(a, b, c);
  },
  alignElWithMouse: function (h, c, d) {
    var f = this.getTargetCoord(c, d);
    if (!this.deltaSetXY) {
      var b = [f.x, f.y];
      YAHOO.util.Dom.setXY(h, b);
      var g = parseInt(YAHOO.util.Dom.getStyle(h, "left"), 10);
      var j = parseInt(YAHOO.util.Dom.getStyle(h, "top"), 10);
      this.deltaSetXY = [g - f.x, j - f.y];
    } else {
      YAHOO.util.Dom.setStyle(h, "left", f.x + this.deltaSetXY[0] + "px");
      YAHOO.util.Dom.setStyle(h, "top", f.y + this.deltaSetXY[1] + "px");
    }
    this.cachePosition(f.x, f.y);
    var a = this;
    setTimeout(function () {
      a.autoScroll.call(a, f.x, f.y, h.offsetHeight, h.offsetWidth);
    }, 0);
  },
  cachePosition: function (c, a) {
    if (c) {
      this.lastPageX = c;
      this.lastPageY = a;
    } else {
      var b = YAHOO.util.Dom.getXY(this.getEl());
      this.lastPageX = b[0];
      this.lastPageY = b[1];
    }
  },
  autoScroll: function (k, l, q, j) {
    if (this.scroll) {
      var h = this.DDM.getClientHeight();
      var c = this.DDM.getClientWidth();
      var f = this.DDM.getScrollTop();
      var a = this.DDM.getScrollLeft();
      var m = q + l;
      var g = j + k;
      var n = h + f - l - this.deltaY;
      var o = c + a - k - this.deltaX;
      var b = 40;
      var d = document.all ? 80 : 30;
      if (m > h && n < b) {
        window.scrollTo(a, f + d);
      }
      if (l < f && f > 0 && l - f < b) {
        window.scrollTo(a, f - d);
      }
      if (g > c && o < b) {
        window.scrollTo(a + d, f);
      }
      if (k < a && a > 0 && k - a < b) {
        window.scrollTo(a - d, f);
      }
    }
  },
  applyConfig: function () {
    YAHOO.util.DD.superclass.applyConfig.call(this);
    this.scroll = this.config.scroll !== false;
  },
  b4MouseDown: function (a) {
    this.setStartPosition();
    this.autoOffset(YAHOO.util.Event.getPageX(a), YAHOO.util.Event.getPageY(a));
  },
  b4Drag: function (a) {
    this.setDragElPos(
      YAHOO.util.Event.getPageX(a),
      YAHOO.util.Event.getPageY(a)
    );
  },
  toString: function () {
    return "DD " + this.id;
  },
});
YAHOO.util.DDProxy = function (b, a, c) {
  if (b) {
    this.init(b, a, c);
    this.initFrame();
  }
};
YAHOO.util.DDProxy.dragElId = "ygddfdiv";
YAHOO.extend(YAHOO.util.DDProxy, YAHOO.util.DD, {
  resizeFrame: true,
  centerFrame: false,
  createFrame: function () {
    var g = this,
      a = document.body;
    if (!a || !a.firstChild) {
      setTimeout(function () {
        g.createFrame();
      }, 50);
      return;
    }
    var b = this.getDragEl(),
      c = YAHOO.util.Dom;
    if (!b) {
      b = document.createElement("div");
      b.id = this.dragElId;
      var d = b.style;
      d.position = "absolute";
      d.visibility = "hidden";
      d.cursor = "move";
      d.border = "2px solid #aaa";
      d.zIndex = 999;
      d.height = "25px";
      d.width = "25px";
      var f = document.createElement("div");
      c.setStyle(f, "height", "100%");
      c.setStyle(f, "width", "100%");
      c.setStyle(f, "background-color", "#ccc");
      c.setStyle(f, "opacity", "0");
      b.appendChild(f);
      a.insertBefore(b, a.firstChild);
    }
  },
  initFrame: function () {
    this.createFrame();
  },
  applyConfig: function () {
    YAHOO.util.DDProxy.superclass.applyConfig.call(this);
    this.resizeFrame = this.config.resizeFrame !== false;
    this.centerFrame = this.config.centerFrame;
    this.setDragElId(this.config.dragElId || YAHOO.util.DDProxy.dragElId);
  },
  showFrame: function (b, c) {
    var d = this.getEl();
    var a = this.getDragEl();
    var f = a.style;
    this._resizeProxy();
    if (this.centerFrame) {
      this.setDelta(
        Math.round(parseInt(f.width, 10) / 2),
        Math.round(parseInt(f.height, 10) / 2)
      );
    }
    this.setDragElPos(b, c);
    YAHOO.util.Dom.setStyle(a, "visibility", "visible");
  },
  _resizeProxy: function () {
    if (this.resizeFrame) {
      var g = YAHOO.util.Dom;
      var c = this.getEl();
      var b = this.getDragEl();
      var h = parseInt(g.getStyle(b, "borderTopWidth"), 10);
      var f = parseInt(g.getStyle(b, "borderRightWidth"), 10);
      var j = parseInt(g.getStyle(b, "borderBottomWidth"), 10);
      var a = parseInt(g.getStyle(b, "borderLeftWidth"), 10);
      if (isNaN(h)) {
        h = 0;
      }
      if (isNaN(f)) {
        f = 0;
      }
      if (isNaN(j)) {
        j = 0;
      }
      if (isNaN(a)) {
        a = 0;
      }
      var k = Math.max(0, c.offsetWidth - f - a);
      var d = Math.max(0, c.offsetHeight - h - j);
      g.setStyle(b, "width", k + "px");
      g.setStyle(b, "height", d + "px");
    }
  },
  b4MouseDown: function (c) {
    this.setStartPosition();
    var a = YAHOO.util.Event.getPageX(c);
    var b = YAHOO.util.Event.getPageY(c);
    this.autoOffset(a, b);
  },
  b4StartDrag: function (a, b) {
    this.showFrame(a, b);
  },
  b4EndDrag: function (a) {
    YAHOO.util.Dom.setStyle(this.getDragEl(), "visibility", "hidden");
  },
  endDrag: function (b) {
    var c = YAHOO.util.Dom;
    var d = this.getEl();
    var a = this.getDragEl();
    c.setStyle(a, "visibility", "");
    c.setStyle(d, "visibility", "hidden");
    YAHOO.util.DDM.moveToEl(d, a);
    c.setStyle(a, "visibility", "hidden");
    c.setStyle(d, "visibility", "");
  },
  toString: function () {
    return "DDProxy " + this.id;
  },
});
YAHOO.util.DDTarget = function (b, a, c) {
  if (b) {
    this.initTarget(b, a, c);
  }
};
YAHOO.extend(YAHOO.util.DDTarget, YAHOO.util.DragDrop, {
  toString: function () {
    return "DDTarget " + this.id;
  },
});
YAHOO.register("dragdrop", YAHOO.util.DragDropMgr, {
  version: "2.7.0",
  build: "1799",
});
YAHOO.util.Connect = {
  _msxml_progid: ["Microsoft.XMLHTTP", "MSXML2.XMLHTTP.3.0", "MSXML2.XMLHTTP"],
  _http_headers: {},
  _has_http_headers: false,
  _use_default_post_header: true,
  _default_post_header: "application/x-www-form-urlencoded; charset=UTF-8",
  _default_form_header: "application/x-www-form-urlencoded",
  _use_default_xhr_header: true,
  _default_xhr_header: "XMLHttpRequest",
  _has_default_headers: true,
  _default_headers: {},
  _isFormSubmit: false,
  _isFileUpload: false,
  _formNode: null,
  _sFormData: null,
  _poll: {},
  _timeOut: {},
  _polling_interval: 50,
  _transaction_id: 0,
  _submitElementValue: null,
  _hasSubmitListener: (function () {
    if (YAHOO.util.Event) {
      YAHOO.util.Event.addListener(document, "click", function (b) {
        var c = YAHOO.util.Event.getTarget(b),
          a = c.nodeName.toLowerCase();
        if (
          (a === "input" || a === "button") &&
          c.type &&
          c.type.toLowerCase() == "submit"
        ) {
          YAHOO.util.Connect._submitElementValue =
            encodeURIComponent(c.name) + "=" + encodeURIComponent(c.value);
        }
      });
      return true;
    }
    return false;
  })(),
  startEvent: new YAHOO.util.CustomEvent("start"),
  completeEvent: new YAHOO.util.CustomEvent("complete"),
  successEvent: new YAHOO.util.CustomEvent("success"),
  failureEvent: new YAHOO.util.CustomEvent("failure"),
  uploadEvent: new YAHOO.util.CustomEvent("upload"),
  abortEvent: new YAHOO.util.CustomEvent("abort"),
  _customEvents: {
    onStart: ["startEvent", "start"],
    onComplete: ["completeEvent", "complete"],
    onSuccess: ["successEvent", "success"],
    onFailure: ["failureEvent", "failure"],
    onUpload: ["uploadEvent", "upload"],
    onAbort: ["abortEvent", "abort"],
  },
  setProgId: function (a) {
    this._msxml_progid.unshift(a);
  },
  setDefaultPostHeader: function (a) {
    if (typeof a == "string") {
      this._default_post_header = a;
    } else {
      if (typeof a == "boolean") {
        this._use_default_post_header = a;
      }
    }
  },
  setDefaultXhrHeader: function (a) {
    if (typeof a == "string") {
      this._default_xhr_header = a;
    } else {
      this._use_default_xhr_header = a;
    }
  },
  setPollingInterval: function (a) {
    if (typeof a == "number" && isFinite(a)) {
      this._polling_interval = a;
    }
  },
  createXhrObject: function (b) {
    var c, a;
    try {
      a = new XMLHttpRequest();
      c = { conn: a, tId: b };
    } catch (d) {
      for (var g = 0; g < this._msxml_progid.length; ++g) {
        try {
          a = new ActiveXObject(this._msxml_progid[g]);
          c = { conn: a, tId: b };
          break;
        } catch (f) {}
      }
    } finally {
      return c;
    }
  },
  getConnectionObject: function (a) {
    var c;
    var b = this._transaction_id;
    try {
      if (!a) {
        c = this.createXhrObject(b);
      } else {
        c = {};
        c.tId = b;
        c.isUpload = true;
      }
      if (c) {
        this._transaction_id++;
      }
    } catch (d) {
    } finally {
      return c;
    }
  },
  asyncRequest: function (b, f, c, a) {
    var d = this._isFileUpload
      ? this.getConnectionObject(true)
      : this.getConnectionObject();
    var g = c && c.argument ? c.argument : null;
    if (!d) {
      return null;
    } else {
      if (c && c.customevents) {
        this.initCustomEvents(d, c);
      }
      if (this._isFormSubmit) {
        if (this._isFileUpload) {
          this.uploadFile(d, c, f, a);
          return d;
        }
        if (b.toUpperCase() == "GET") {
          if (this._sFormData.length !== 0) {
            f += (f.indexOf("?") == -1 ? "?" : "&") + this._sFormData;
          }
        } else {
          if (b.toUpperCase() == "POST") {
            a = a ? this._sFormData + "&" + a : this._sFormData;
          }
        }
      }
      if (b.toUpperCase() == "GET" && c && c.cache === false) {
        f +=
          (f.indexOf("?") == -1 ? "?" : "&") +
          "rnd=" +
          new Date().valueOf().toString();
      }
      d.conn.open(b, f, true);
      if (this._use_default_xhr_header) {
        if (!this._default_headers["X-Requested-With"]) {
          this.initHeader("X-Requested-With", this._default_xhr_header, true);
        }
      }
      if (
        b.toUpperCase() === "POST" &&
        this._use_default_post_header &&
        this._isFormSubmit === false
      ) {
        this.initHeader("Content-Type", this._default_post_header);
      }
      if (this._has_default_headers || this._has_http_headers) {
        this.setHeader(d);
      }
      this.handleReadyState(d, c);
      d.conn.send(a || "");
      if (this._isFormSubmit === true) {
        this.resetFormState();
      }
      this.startEvent.fire(d, g);
      if (d.startEvent) {
        d.startEvent.fire(d, g);
      }
      return d;
    }
  },
  initCustomEvents: function (a, b) {
    var c;
    for (c in b.customevents) {
      if (this._customEvents[c][0]) {
        a[this._customEvents[c][0]] = new YAHOO.util.CustomEvent(
          this._customEvents[c][1],
          b.scope ? b.scope : null
        );
        a[this._customEvents[c][0]].subscribe(b.customevents[c]);
      }
    }
  },
  handleReadyState: function (c, b) {
    var d = this;
    var a = b && b.argument ? b.argument : null;
    if (b && b.timeout) {
      this._timeOut[c.tId] = window.setTimeout(function () {
        d.abort(c, b, true);
      }, b.timeout);
    }
    this._poll[c.tId] = window.setInterval(function () {
      if (c.conn && c.conn.readyState === 4) {
        window.clearInterval(d._poll[c.tId]);
        delete d._poll[c.tId];
        if (b && b.timeout) {
          window.clearTimeout(d._timeOut[c.tId]);
          delete d._timeOut[c.tId];
        }
        d.completeEvent.fire(c, a);
        if (c.completeEvent) {
          c.completeEvent.fire(c, a);
        }
        d.handleTransactionResponse(c, b);
      }
    }, this._polling_interval);
  },
  handleTransactionResponse: function (c, b, a) {
    var f, g;
    var h = b && b.argument ? b.argument : null;
    try {
      if (c.conn.status !== undefined && c.conn.status !== 0) {
        f = c.conn.status;
      } else {
        f = 13030;
      }
    } catch (d) {
      f = 13030;
    }
    if ((f >= 200 && f < 300) || f === 1223) {
      g = this.createResponseObject(c, h);
      if (b && b.success) {
        if (!b.scope) {
          b.success(g);
        } else {
          b.success.apply(b.scope, [g]);
        }
      }
      this.successEvent.fire(g);
      if (c.successEvent) {
        c.successEvent.fire(g);
      }
    } else {
      switch (f) {
        case 12002:
        case 12029:
        case 12030:
        case 12031:
        case 12152:
        case 13030:
          g = this.createExceptionObject(c.tId, h, a ? a : false);
          if (b && b.failure) {
            if (!b.scope) {
              b.failure(g);
            } else {
              b.failure.apply(b.scope, [g]);
            }
          }
          break;
        default:
          g = this.createResponseObject(c, h);
          if (b && b.failure) {
            if (!b.scope) {
              b.failure(g);
            } else {
              b.failure.apply(b.scope, [g]);
            }
          }
      }
      this.failureEvent.fire(g);
      if (c.failureEvent) {
        c.failureEvent.fire(g);
      }
    }
    this.releaseObject(c);
    g = null;
  },
  createResponseObject: function (d, h) {
    var a = {};
    var f = {};
    try {
      var b = d.conn.getAllResponseHeaders();
      var j = b.split("\n");
      for (var k = 0; k < j.length; k++) {
        var c = j[k].indexOf(":");
        if (c != -1) {
          f[j[k].substring(0, c)] = j[k].substring(c + 2);
        }
      }
    } catch (g) {}
    a.tId = d.tId;
    a.status = d.conn.status == 1223 ? 204 : d.conn.status;
    a.statusText = d.conn.status == 1223 ? "No Content" : d.conn.statusText;
    a.getResponseHeader = f;
    a.getAllResponseHeaders = b;
    a.responseText = d.conn.responseText;
    a.responseXML = d.conn.responseXML;
    if (h) {
      a.argument = h;
    }
    return a;
  },
  createExceptionObject: function (b, g, a) {
    var d = 0;
    var c = "communication failure";
    var h = -1;
    var j = "transaction aborted";
    var f = {};
    f.tId = b;
    if (a) {
      f.status = h;
      f.statusText = j;
    } else {
      f.status = d;
      f.statusText = c;
    }
    if (g) {
      f.argument = g;
    }
    return f;
  },
  initHeader: function (a, b, c) {
    var d = c ? this._default_headers : this._http_headers;
    d[a] = b;
    if (c) {
      this._has_default_headers = true;
    } else {
      this._has_http_headers = true;
    }
  },
  setHeader: function (a) {
    var b;
    if (this._has_default_headers) {
      for (b in this._default_headers) {
        if (YAHOO.lang.hasOwnProperty(this._default_headers, b)) {
          a.conn.setRequestHeader(b, this._default_headers[b]);
        }
      }
    }
    if (this._has_http_headers) {
      for (b in this._http_headers) {
        if (YAHOO.lang.hasOwnProperty(this._http_headers, b)) {
          a.conn.setRequestHeader(b, this._http_headers[b]);
        }
      }
      delete this._http_headers;
      this._http_headers = {};
      this._has_http_headers = false;
    }
  },
  resetDefaultHeaders: function () {
    delete this._default_headers;
    this._default_headers = {};
    this._has_default_headers = false;
  },
  setForm: function (j, o, b) {
    var k,
      c,
      l,
      n,
      f,
      m = false,
      r = [],
      g = 0,
      s,
      q,
      a,
      h,
      d;
    this.resetFormState();
    if (typeof j == "string") {
      k = document.getElementById(j) || document.forms[j];
    } else {
      if (typeof j == "object") {
        k = j;
      } else {
        return;
      }
    }
    if (o) {
      this.createFrame(b ? b : null);
      this._isFormSubmit = true;
      this._isFileUpload = true;
      this._formNode = k;
      return;
    }
    for (s = 0, q = k.elements.length; s < q; ++s) {
      c = k.elements[s];
      f = c.disabled;
      l = c.name;
      if (!f && l) {
        l = encodeURIComponent(l) + "=";
        n = encodeURIComponent(c.value);
        switch (c.type) {
          case "select-one":
            if (c.selectedIndex > -1) {
              d = c.options[c.selectedIndex];
              r[g++] =
                l +
                encodeURIComponent(
                  d.attributes.value && d.attributes.value.specified
                    ? d.value
                    : d.text
                );
            }
            break;
          case "select-multiple":
            if (c.selectedIndex > -1) {
              for (a = c.selectedIndex, h = c.options.length; a < h; ++a) {
                d = c.options[a];
                if (d.selected) {
                  r[g++] =
                    l +
                    encodeURIComponent(
                      d.attributes.value && d.attributes.value.specified
                        ? d.value
                        : d.text
                    );
                }
              }
            }
            break;
          case "radio":
          case "checkbox":
            if (c.checked) {
              r[g++] = l + n;
            }
            break;
          case "file":
          case undefined:
          case "reset":
          case "button":
            break;
          case "submit":
            if (m === false) {
              if (this._hasSubmitListener && this._submitElementValue) {
                r[g++] = this._submitElementValue;
              }
              m = true;
            }
            break;
          default:
            r[g++] = l + n;
        }
      }
    }
    this._isFormSubmit = true;
    this._sFormData = r.join("&");
    this.initHeader("Content-Type", this._default_form_header);
    return this._sFormData;
  },
  resetFormState: function () {
    this._isFormSubmit = false;
    this._isFileUpload = false;
    this._formNode = null;
    this._sFormData = "";
  },
  createFrame: function (a) {
    var c = "yuiIO" + this._transaction_id;
    var b;
    if (YAHOO.env.ua.ie) {
      b = document.createElement('<iframe id="' + c + '" name="' + c + '" />');
      if (typeof a == "boolean") {
        b.src = "javascript:false";
      }
    } else {
      b = document.createElement("iframe");
      b.id = c;
      b.name = c;
    }
    b.style.position = "absolute";
    b.style.top = "-1000px";
    b.style.left = "-1000px";
    document.body.appendChild(b);
  },
  appendPostData: function (a) {
    var c = [],
      f = a.split("&"),
      d,
      b;
    for (d = 0; d < f.length; d++) {
      b = f[d].indexOf("=");
      if (b != -1) {
        c[d] = document.createElement("input");
        c[d].type = "hidden";
        c[d].name = decodeURIComponent(f[d].substring(0, b));
        c[d].value = decodeURIComponent(f[d].substring(b + 1));
        this._formNode.appendChild(c[d]);
      }
    }
    return c;
  },
  uploadFile: function (a, g, r, b) {
    var m = "yuiIO" + a.tId,
      l = "multipart/form-data",
      j = document.getElementById(m),
      f = this,
      k = g && g.argument ? g.argument : null,
      h,
      n,
      c,
      o;
    var d = {
      action: this._formNode.getAttribute("action"),
      method: this._formNode.getAttribute("method"),
      target: this._formNode.getAttribute("target"),
    };
    this._formNode.setAttribute("action", r);
    this._formNode.setAttribute("method", "POST");
    this._formNode.setAttribute("target", m);
    if (YAHOO.env.ua.ie) {
      this._formNode.setAttribute("encoding", l);
    } else {
      this._formNode.setAttribute("enctype", l);
    }
    if (b) {
      h = this.appendPostData(b);
    }
    this._formNode.submit();
    this.startEvent.fire(a, k);
    if (a.startEvent) {
      a.startEvent.fire(a, k);
    }
    if (g && g.timeout) {
      this._timeOut[a.tId] = window.setTimeout(function () {
        f.abort(a, g, true);
      }, g.timeout);
    }
    if (h && h.length > 0) {
      for (n = 0; n < h.length; n++) {
        this._formNode.removeChild(h[n]);
      }
    }
    for (c in d) {
      if (YAHOO.lang.hasOwnProperty(d, c)) {
        if (d[c]) {
          this._formNode.setAttribute(c, d[c]);
        } else {
          this._formNode.removeAttribute(c);
        }
      }
    }
    this.resetFormState();
    var q = function () {
      if (g && g.timeout) {
        window.clearTimeout(f._timeOut[a.tId]);
        delete f._timeOut[a.tId];
      }
      f.completeEvent.fire(a, k);
      if (a.completeEvent) {
        a.completeEvent.fire(a, k);
      }
      o = { tId: a.tId, argument: g.argument };
      try {
        o.responseText = j.contentWindow.document.body
          ? j.contentWindow.document.body.innerHTML
          : j.contentWindow.document.documentElement.textContent;
        o.responseXML = j.contentWindow.document.XMLDocument
          ? j.contentWindow.document.XMLDocument
          : j.contentWindow.document;
      } catch (s) {}
      if (g && g.upload) {
        if (!g.scope) {
          g.upload(o);
        } else {
          g.upload.apply(g.scope, [o]);
        }
      }
      f.uploadEvent.fire(o);
      if (a.uploadEvent) {
        a.uploadEvent.fire(o);
      }
      YAHOO.util.Event.removeListener(j, "load", q);
      setTimeout(function () {
        document.body.removeChild(j);
        f.releaseObject(a);
      }, 100);
    };
    YAHOO.util.Event.addListener(j, "load", q);
  },
  abort: function (d, b, a) {
    var f;
    var h = b && b.argument ? b.argument : null;
    if (d && d.conn) {
      if (this.isCallInProgress(d)) {
        d.conn.abort();
        window.clearInterval(this._poll[d.tId]);
        delete this._poll[d.tId];
        if (a) {
          window.clearTimeout(this._timeOut[d.tId]);
          delete this._timeOut[d.tId];
        }
        f = true;
      }
    } else {
      if (d && d.isUpload === true) {
        var g = "yuiIO" + d.tId;
        var c = document.getElementById(g);
        if (c) {
          YAHOO.util.Event.removeListener(c, "load");
          document.body.removeChild(c);
          if (a) {
            window.clearTimeout(this._timeOut[d.tId]);
            delete this._timeOut[d.tId];
          }
          f = true;
        }
      } else {
        f = false;
      }
    }
    if (f === true) {
      this.abortEvent.fire(d, h);
      if (d.abortEvent) {
        d.abortEvent.fire(d, h);
      }
      this.handleTransactionResponse(d, b, true);
    }
    return f;
  },
  isCallInProgress: function (b) {
    if (b && b.conn) {
      return b.conn.readyState !== 4 && b.conn.readyState !== 0;
    } else {
      if (b && b.isUpload === true) {
        var a = "yuiIO" + b.tId;
        return document.getElementById(a) ? true : false;
      } else {
        return false;
      }
    }
  },
  releaseObject: function (a) {
    if (a && a.conn) {
      a.conn = null;
      a = null;
    }
  },
};
YAHOO.register("connection", YAHOO.util.Connect, {
  version: "2.7.0",
  build: "1799",
});
(function () {
  var lang = YAHOO.lang,
    util = YAHOO.util,
    Ev = util.Event;
  util.DataSourceBase = function (oLiveData, oConfigs) {
    if (oLiveData === null || oLiveData === undefined) {
      return;
    }
    this.liveData = oLiveData;
    this._oQueue = { interval: null, conn: null, requests: [] };
    this.responseSchema = {};
    if (oConfigs && oConfigs.constructor == Object) {
      for (var sConfig in oConfigs) {
        if (sConfig) {
          this[sConfig] = oConfigs[sConfig];
        }
      }
    }
    var maxCacheEntries = this.maxCacheEntries;
    if (!lang.isNumber(maxCacheEntries) || maxCacheEntries < 0) {
      maxCacheEntries = 0;
    }
    this._aIntervals = [];
    this.createEvent("cacheRequestEvent");
    this.createEvent("cacheResponseEvent");
    this.createEvent("requestEvent");
    this.createEvent("responseEvent");
    this.createEvent("responseParseEvent");
    this.createEvent("responseCacheEvent");
    this.createEvent("dataErrorEvent");
    this.createEvent("cacheFlushEvent");
    var DS = util.DataSourceBase;
    this._sName = "DataSource instance" + DS._nIndex;
    DS._nIndex++;
  };
  var DS = util.DataSourceBase;
  lang.augmentObject(DS, {
    TYPE_UNKNOWN: -1,
    TYPE_JSARRAY: 0,
    TYPE_JSFUNCTION: 1,
    TYPE_XHR: 2,
    TYPE_JSON: 3,
    TYPE_XML: 4,
    TYPE_TEXT: 5,
    TYPE_HTMLTABLE: 6,
    TYPE_SCRIPTNODE: 7,
    TYPE_LOCAL: 8,
    ERROR_DATAINVALID: "Invalid data",
    ERROR_DATANULL: "Null data",
    _nIndex: 0,
    _nTransactionId: 0,
    issueCallback: function (callback, params, error, scope) {
      if (lang.isFunction(callback)) {
        callback.apply(scope, params);
      } else {
        if (lang.isObject(callback)) {
          scope = callback.scope || scope || window;
          var callbackFunc = callback.success;
          if (error) {
            callbackFunc = callback.failure;
          }
          if (callbackFunc) {
            callbackFunc.apply(scope, params.concat([callback.argument]));
          }
        }
      }
    },
    parseString: function (oData) {
      if (!lang.isValue(oData)) {
        return null;
      }
      var string = oData + "";
      if (lang.isString(string)) {
        return string;
      } else {
        return null;
      }
    },
    parseNumber: function (oData) {
      if (!lang.isValue(oData) || oData === "") {
        return null;
      }
      var number = oData * 1;
      if (lang.isNumber(number)) {
        return number;
      } else {
        return null;
      }
    },
    convertNumber: function (oData) {
      return DS.parseNumber(oData);
    },
    parseDate: function (oData) {
      var date = null;
      if (!(oData instanceof Date)) {
        date = new Date(oData);
      } else {
        return oData;
      }
      if (date instanceof Date) {
        return date;
      } else {
        return null;
      }
    },
    convertDate: function (oData) {
      return DS.parseDate(oData);
    },
  });
  DS.Parser = {
    string: DS.parseString,
    number: DS.parseNumber,
    date: DS.parseDate,
  };
  DS.prototype = {
    _sName: null,
    _aCache: null,
    _oQueue: null,
    _aIntervals: null,
    maxCacheEntries: 0,
    liveData: null,
    dataType: DS.TYPE_UNKNOWN,
    responseType: DS.TYPE_UNKNOWN,
    responseSchema: null,
    toString: function () {
      return this._sName;
    },
    getCachedResponse: function (oRequest, oCallback, oCaller) {
      var aCache = this._aCache;
      if (this.maxCacheEntries > 0) {
        if (!aCache) {
          this._aCache = [];
        } else {
          var nCacheLength = aCache.length;
          if (nCacheLength > 0) {
            var oResponse = null;
            this.fireEvent("cacheRequestEvent", {
              request: oRequest,
              callback: oCallback,
              caller: oCaller,
            });
            for (var i = nCacheLength - 1; i >= 0; i--) {
              var oCacheElem = aCache[i];
              if (this.isCacheHit(oRequest, oCacheElem.request)) {
                oResponse = oCacheElem.response;
                this.fireEvent("cacheResponseEvent", {
                  request: oRequest,
                  response: oResponse,
                  callback: oCallback,
                  caller: oCaller,
                });
                if (i < nCacheLength - 1) {
                  aCache.splice(i, 1);
                  this.addToCache(oRequest, oResponse);
                }
                oResponse.cached = true;
                break;
              }
            }
            return oResponse;
          }
        }
      } else {
        if (aCache) {
          this._aCache = null;
        }
      }
      return null;
    },
    isCacheHit: function (oRequest, oCachedRequest) {
      return oRequest === oCachedRequest;
    },
    addToCache: function (oRequest, oResponse) {
      var aCache = this._aCache;
      if (!aCache) {
        return;
      }
      while (aCache.length >= this.maxCacheEntries) {
        aCache.shift();
      }
      var oCacheElem = { request: oRequest, response: oResponse };
      aCache[aCache.length] = oCacheElem;
      this.fireEvent("responseCacheEvent", {
        request: oRequest,
        response: oResponse,
      });
    },
    flushCache: function () {
      if (this._aCache) {
        this._aCache = [];
        this.fireEvent("cacheFlushEvent");
      }
    },
    setInterval: function (nMsec, oRequest, oCallback, oCaller) {
      if (lang.isNumber(nMsec) && nMsec >= 0) {
        var oSelf = this;
        var nId = setInterval(function () {
          oSelf.makeConnection(oRequest, oCallback, oCaller);
        }, nMsec);
        this._aIntervals.push(nId);
        return nId;
      } else {
      }
    },
    clearInterval: function (nId) {
      var tracker = this._aIntervals || [];
      for (var i = tracker.length - 1; i > -1; i--) {
        if (tracker[i] === nId) {
          tracker.splice(i, 1);
          clearInterval(nId);
        }
      }
    },
    clearAllIntervals: function () {
      var tracker = this._aIntervals || [];
      for (var i = tracker.length - 1; i > -1; i--) {
        clearInterval(tracker[i]);
      }
      tracker = [];
    },
    sendRequest: function (oRequest, oCallback, oCaller) {
      var oCachedResponse = this.getCachedResponse(
        oRequest,
        oCallback,
        oCaller
      );
      if (oCachedResponse) {
        DS.issueCallback(
          oCallback,
          [oRequest, oCachedResponse],
          false,
          oCaller
        );
        return null;
      }
      return this.makeConnection(oRequest, oCallback, oCaller);
    },
    makeConnection: function (oRequest, oCallback, oCaller) {
      var tId = DS._nTransactionId++;
      this.fireEvent("requestEvent", {
        tId: tId,
        request: oRequest,
        callback: oCallback,
        caller: oCaller,
      });
      var oRawResponse = this.liveData;
      this.handleResponse(oRequest, oRawResponse, oCallback, oCaller, tId);
      return tId;
    },
    handleResponse: function (oRequest, oRawResponse, oCallback, oCaller, tId) {
      this.fireEvent("responseEvent", {
        tId: tId,
        request: oRequest,
        response: oRawResponse,
        callback: oCallback,
        caller: oCaller,
      });
      var xhr = this.dataType == DS.TYPE_XHR ? true : false;
      var oParsedResponse = null;
      var oFullResponse = oRawResponse;
      if (this.responseType === DS.TYPE_UNKNOWN) {
        var ctype =
          oRawResponse && oRawResponse.getResponseHeader
            ? oRawResponse.getResponseHeader["Content-Type"]
            : null;
        if (ctype) {
          if (ctype.indexOf("text/xml") > -1) {
            this.responseType = DS.TYPE_XML;
          } else {
            if (ctype.indexOf("application/json") > -1) {
              this.responseType = DS.TYPE_JSON;
            } else {
              if (ctype.indexOf("text/plain") > -1) {
                this.responseType = DS.TYPE_TEXT;
              }
            }
          }
        } else {
          if (YAHOO.lang.isArray(oRawResponse)) {
            this.responseType = DS.TYPE_JSARRAY;
          } else {
            if (
              oRawResponse &&
              oRawResponse.nodeType &&
              oRawResponse.nodeType == 9
            ) {
              this.responseType = DS.TYPE_XML;
            } else {
              if (
                oRawResponse &&
                oRawResponse.nodeName &&
                oRawResponse.nodeName.toLowerCase() == "table"
              ) {
                this.responseType = DS.TYPE_HTMLTABLE;
              } else {
                if (YAHOO.lang.isObject(oRawResponse)) {
                  this.responseType = DS.TYPE_JSON;
                } else {
                  if (YAHOO.lang.isString(oRawResponse)) {
                    this.responseType = DS.TYPE_TEXT;
                  }
                }
              }
            }
          }
        }
      }
      switch (this.responseType) {
        case DS.TYPE_JSARRAY:
          if (xhr && oRawResponse && oRawResponse.responseText) {
            oFullResponse = oRawResponse.responseText;
          }
          try {
            if (lang.isString(oFullResponse)) {
              var parseArgs = [oFullResponse].concat(this.parseJSONArgs);
              if (lang.JSON) {
                oFullResponse = lang.JSON.parse.apply(lang.JSON, parseArgs);
              } else {
                if (window.JSON && JSON.parse) {
                  oFullResponse = JSON.parse.apply(JSON, parseArgs);
                } else {
                  if (oFullResponse.parseJSON) {
                    oFullResponse = oFullResponse.parseJSON.apply(
                      oFullResponse,
                      parseArgs.slice(1)
                    );
                  } else {
                    while (
                      oFullResponse.length > 0 &&
                      oFullResponse.charAt(0) != "{" &&
                      oFullResponse.charAt(0) != "["
                    ) {
                      oFullResponse = oFullResponse.substring(
                        1,
                        oFullResponse.length
                      );
                    }
                    if (oFullResponse.length > 0) {
                      var arrayEnd = Math.max(
                        oFullResponse.lastIndexOf("]"),
                        oFullResponse.lastIndexOf("}")
                      );
                      oFullResponse = oFullResponse.substring(0, arrayEnd + 1);
                      oFullResponse = eval("(" + oFullResponse + ")");
                    }
                  }
                }
              }
            }
          } catch (e1) {}
          oFullResponse = this.doBeforeParseData(
            oRequest,
            oFullResponse,
            oCallback
          );
          oParsedResponse = this.parseArrayData(oRequest, oFullResponse);
          break;
        case DS.TYPE_JSON:
          if (xhr && oRawResponse && oRawResponse.responseText) {
            oFullResponse = oRawResponse.responseText;
          }
          try {
            if (lang.isString(oFullResponse)) {
              var parseArgs = [oFullResponse].concat(this.parseJSONArgs);
              if (lang.JSON) {
                oFullResponse = lang.JSON.parse.apply(lang.JSON, parseArgs);
              } else {
                if (window.JSON && JSON.parse) {
                  oFullResponse = JSON.parse.apply(JSON, parseArgs);
                } else {
                  if (oFullResponse.parseJSON) {
                    oFullResponse = oFullResponse.parseJSON.apply(
                      oFullResponse,
                      parseArgs.slice(1)
                    );
                  } else {
                    while (
                      oFullResponse.length > 0 &&
                      oFullResponse.charAt(0) != "{" &&
                      oFullResponse.charAt(0) != "["
                    ) {
                      oFullResponse = oFullResponse.substring(
                        1,
                        oFullResponse.length
                      );
                    }
                    if (oFullResponse.length > 0) {
                      var objEnd = Math.max(
                        oFullResponse.lastIndexOf("]"),
                        oFullResponse.lastIndexOf("}")
                      );
                      oFullResponse = oFullResponse.substring(0, objEnd + 1);
                      oFullResponse = eval("(" + oFullResponse + ")");
                    }
                  }
                }
              }
            }
          } catch (e) {}
          oFullResponse = this.doBeforeParseData(
            oRequest,
            oFullResponse,
            oCallback
          );
          oParsedResponse = this.parseJSONData(oRequest, oFullResponse);
          break;
        case DS.TYPE_HTMLTABLE:
          if (xhr && oRawResponse.responseText) {
            var el = document.createElement("div");
            el.innerHTML = oRawResponse.responseText;
            oFullResponse = el.getElementsByTagName("table")[0];
          }
          oFullResponse = this.doBeforeParseData(
            oRequest,
            oFullResponse,
            oCallback
          );
          oParsedResponse = this.parseHTMLTableData(oRequest, oFullResponse);
          break;
        case DS.TYPE_XML:
          if (xhr && oRawResponse.responseXML) {
            oFullResponse = oRawResponse.responseXML;
          }
          oFullResponse = this.doBeforeParseData(
            oRequest,
            oFullResponse,
            oCallback
          );
          oParsedResponse = this.parseXMLData(oRequest, oFullResponse);
          break;
        case DS.TYPE_TEXT:
          if (xhr && lang.isString(oRawResponse.responseText)) {
            oFullResponse = oRawResponse.responseText;
          }
          oFullResponse = this.doBeforeParseData(
            oRequest,
            oFullResponse,
            oCallback
          );
          oParsedResponse = this.parseTextData(oRequest, oFullResponse);
          break;
        default:
          oFullResponse = this.doBeforeParseData(
            oRequest,
            oFullResponse,
            oCallback
          );
          oParsedResponse = this.parseData(oRequest, oFullResponse);
          break;
      }
      oParsedResponse = oParsedResponse || {};
      if (!oParsedResponse.results) {
        oParsedResponse.results = [];
      }
      if (!oParsedResponse.meta) {
        oParsedResponse.meta = {};
      }
      if (oParsedResponse && !oParsedResponse.error) {
        oParsedResponse = this.doBeforeCallback(
          oRequest,
          oFullResponse,
          oParsedResponse,
          oCallback
        );
        this.fireEvent("responseParseEvent", {
          request: oRequest,
          response: oParsedResponse,
          callback: oCallback,
          caller: oCaller,
        });
        this.addToCache(oRequest, oParsedResponse);
      } else {
        oParsedResponse.error = true;
        this.fireEvent("dataErrorEvent", {
          request: oRequest,
          response: oRawResponse,
          callback: oCallback,
          caller: oCaller,
          message: DS.ERROR_DATANULL,
        });
      }
      oParsedResponse.tId = tId;
      DS.issueCallback(
        oCallback,
        [oRequest, oParsedResponse],
        oParsedResponse.error,
        oCaller
      );
    },
    doBeforeParseData: function (oRequest, oFullResponse, oCallback) {
      return oFullResponse;
    },
    doBeforeCallback: function (
      oRequest,
      oFullResponse,
      oParsedResponse,
      oCallback
    ) {
      return oParsedResponse;
    },
    parseData: function (oRequest, oFullResponse) {
      if (lang.isValue(oFullResponse)) {
        var oParsedResponse = { results: oFullResponse, meta: {} };
        return oParsedResponse;
      }
      return null;
    },
    parseArrayData: function (oRequest, oFullResponse) {
      if (lang.isArray(oFullResponse)) {
        var results = [],
          i,
          j,
          rec,
          field,
          data;
        if (lang.isArray(this.responseSchema.fields)) {
          var fields = this.responseSchema.fields;
          for (i = fields.length - 1; i >= 0; --i) {
            if (typeof fields[i] !== "object") {
              fields[i] = { key: fields[i] };
            }
          }
          var parsers = {},
            p;
          for (i = fields.length - 1; i >= 0; --i) {
            p =
              (typeof fields[i].parser === "function"
                ? fields[i].parser
                : DS.Parser[fields[i].parser + ""]) || fields[i].converter;
            if (p) {
              parsers[fields[i].key] = p;
            }
          }
          var arrType = lang.isArray(oFullResponse[0]);
          for (i = oFullResponse.length - 1; i > -1; i--) {
            var oResult = {};
            rec = oFullResponse[i];
            if (typeof rec === "object") {
              for (j = fields.length - 1; j > -1; j--) {
                field = fields[j];
                data = arrType ? rec[j] : rec[field.key];
                if (parsers[field.key]) {
                  data = parsers[field.key].call(this, data);
                }
                if (data === undefined) {
                  data = null;
                }
                oResult[field.key] = data;
              }
            } else {
              if (lang.isString(rec)) {
                for (j = fields.length - 1; j > -1; j--) {
                  field = fields[j];
                  data = rec;
                  if (parsers[field.key]) {
                    data = parsers[field.key].call(this, data);
                  }
                  if (data === undefined) {
                    data = null;
                  }
                  oResult[field.key] = data;
                }
              }
            }
            results[i] = oResult;
          }
        } else {
          results = oFullResponse;
        }
        var oParsedResponse = { results: results };
        return oParsedResponse;
      }
      return null;
    },
    parseTextData: function (oRequest, oFullResponse) {
      if (lang.isString(oFullResponse)) {
        if (
          lang.isString(this.responseSchema.recordDelim) &&
          lang.isString(this.responseSchema.fieldDelim)
        ) {
          var oParsedResponse = { results: [] };
          var recDelim = this.responseSchema.recordDelim;
          var fieldDelim = this.responseSchema.fieldDelim;
          if (oFullResponse.length > 0) {
            var newLength = oFullResponse.length - recDelim.length;
            if (oFullResponse.substr(newLength) == recDelim) {
              oFullResponse = oFullResponse.substr(0, newLength);
            }
            if (oFullResponse.length > 0) {
              var recordsarray = oFullResponse.split(recDelim);
              for (
                var i = 0, len = recordsarray.length, recIdx = 0;
                i < len;
                ++i
              ) {
                var bError = false,
                  sRecord = recordsarray[i];
                if (lang.isString(sRecord) && sRecord.length > 0) {
                  var fielddataarray = recordsarray[i].split(fieldDelim);
                  var oResult = {};
                  if (lang.isArray(this.responseSchema.fields)) {
                    var fields = this.responseSchema.fields;
                    for (var j = fields.length - 1; j > -1; j--) {
                      try {
                        var data = fielddataarray[j];
                        if (lang.isString(data)) {
                          if (data.charAt(0) == '"') {
                            data = data.substr(1);
                          }
                          if (data.charAt(data.length - 1) == '"') {
                            data = data.substr(0, data.length - 1);
                          }
                          var field = fields[j];
                          var key = lang.isValue(field.key) ? field.key : field;
                          if (!field.parser && field.converter) {
                            field.parser = field.converter;
                          }
                          var parser =
                            typeof field.parser === "function"
                              ? field.parser
                              : DS.Parser[field.parser + ""];
                          if (parser) {
                            data = parser.call(this, data);
                          }
                          if (data === undefined) {
                            data = null;
                          }
                          oResult[key] = data;
                        } else {
                          bError = true;
                        }
                      } catch (e) {
                        bError = true;
                      }
                    }
                  } else {
                    oResult = fielddataarray;
                  }
                  if (!bError) {
                    oParsedResponse.results[recIdx++] = oResult;
                  }
                }
              }
            }
          }
          return oParsedResponse;
        }
      }
      return null;
    },
    parseXMLResult: function (result) {
      var oResult = {},
        schema = this.responseSchema;
      try {
        for (var m = schema.fields.length - 1; m >= 0; m--) {
          var field = schema.fields[m];
          var key = lang.isValue(field.key) ? field.key : field;
          var data = null;
          var xmlAttr = result.attributes.getNamedItem(key);
          if (xmlAttr) {
            data = xmlAttr.value;
          } else {
            var xmlNode = result.getElementsByTagName(key);
            if (xmlNode && xmlNode.item(0)) {
              var item = xmlNode.item(0);
              data = item
                ? item.text
                  ? item.text
                  : item.textContent
                  ? item.textContent
                  : null
                : null;
              if (!data) {
                var datapieces = [];
                for (var j = 0, len = item.childNodes.length; j < len; j++) {
                  if (item.childNodes[j].nodeValue) {
                    datapieces[datapieces.length] =
                      item.childNodes[j].nodeValue;
                  }
                }
                if (datapieces.length > 0) {
                  data = datapieces.join("");
                }
              }
            }
          }
          if (data === null) {
            data = "";
          }
          if (!field.parser && field.converter) {
            field.parser = field.converter;
          }
          var parser =
            typeof field.parser === "function"
              ? field.parser
              : DS.Parser[field.parser + ""];
          if (parser) {
            data = parser.call(this, data);
          }
          if (data === undefined) {
            data = null;
          }
          oResult[key] = data;
        }
      } catch (e) {}
      return oResult;
    },
    parseXMLData: function (oRequest, oFullResponse) {
      var bError = false,
        schema = this.responseSchema,
        oParsedResponse = { meta: {} },
        xmlList = null,
        metaNode = schema.metaNode,
        metaLocators = schema.metaFields || {},
        i,
        k,
        loc,
        v;
      try {
        xmlList = schema.resultNode
          ? oFullResponse.getElementsByTagName(schema.resultNode)
          : null;
        metaNode = metaNode
          ? oFullResponse.getElementsByTagName(metaNode)[0]
          : oFullResponse;
        if (metaNode) {
          for (k in metaLocators) {
            if (lang.hasOwnProperty(metaLocators, k)) {
              loc = metaLocators[k];
              v = metaNode.getElementsByTagName(loc)[0];
              if (v) {
                v = v.firstChild.nodeValue;
              } else {
                v = metaNode.attributes.getNamedItem(loc);
                if (v) {
                  v = v.value;
                }
              }
              if (lang.isValue(v)) {
                oParsedResponse.meta[k] = v;
              }
            }
          }
        }
      } catch (e) {}
      if (!xmlList || !lang.isArray(schema.fields)) {
        bError = true;
      } else {
        oParsedResponse.results = [];
        for (i = xmlList.length - 1; i >= 0; --i) {
          var oResult = this.parseXMLResult(xmlList.item(i));
          oParsedResponse.results[i] = oResult;
        }
      }
      if (bError) {
        oParsedResponse.error = true;
      } else {
      }
      return oParsedResponse;
    },
    parseJSONData: function (oRequest, oFullResponse) {
      var oParsedResponse = { results: [], meta: {} };
      if (lang.isObject(oFullResponse) && this.responseSchema.resultsList) {
        var schema = this.responseSchema,
          fields = schema.fields,
          resultsList = oFullResponse,
          results = [],
          metaFields = schema.metaFields || {},
          fieldParsers = [],
          fieldPaths = [],
          simpleFields = [],
          bError = false,
          i,
          len,
          j,
          v,
          key,
          parser,
          path;
        var buildPath = function (needle) {
          var path = null,
            keys = [],
            i = 0;
          if (needle) {
            needle = needle
              .replace(/\[(['"])(.*?)\1\]/g, function (x, $1, $2) {
                keys[i] = $2;
                return ".@" + i++;
              })
              .replace(/\[(\d+)\]/g, function (x, $1) {
                keys[i] = parseInt($1, 10) | 0;
                return ".@" + i++;
              })
              .replace(/^\./, "");
            if (!/[^\w\.\$@]/.test(needle)) {
              path = needle.split(".");
              for (i = path.length - 1; i >= 0; --i) {
                if (path[i].charAt(0) === "@") {
                  path[i] = keys[parseInt(path[i].substr(1), 10)];
                }
              }
            } else {
            }
          }
          return path;
        };
        var walkPath = function (path, origin) {
          var v = origin,
            i = 0,
            len = path.length;
          for (; i < len && v; ++i) {
            v = v[path[i]];
          }
          return v;
        };
        path = buildPath(schema.resultsList);
        if (path) {
          resultsList = walkPath(path, oFullResponse);
          if (resultsList === undefined) {
            bError = true;
          }
        } else {
          bError = true;
        }
        if (!resultsList) {
          resultsList = [];
        }
        if (!lang.isArray(resultsList)) {
          resultsList = [resultsList];
        }
        if (!bError) {
          if (schema.fields) {
            var field;
            for (i = 0, len = fields.length; i < len; i++) {
              field = fields[i];
              key = field.key || field;
              parser =
                (typeof field.parser === "function"
                  ? field.parser
                  : DS.Parser[field.parser + ""]) || field.converter;
              path = buildPath(key);
              if (parser) {
                fieldParsers[fieldParsers.length] = {
                  key: key,
                  parser: parser,
                };
              }
              if (path) {
                if (path.length > 1) {
                  fieldPaths[fieldPaths.length] = { key: key, path: path };
                } else {
                  simpleFields[simpleFields.length] = {
                    key: key,
                    path: path[0],
                  };
                }
              } else {
              }
            }
            for (i = resultsList.length - 1; i >= 0; --i) {
              var r = resultsList[i],
                rec = {};
              if (r) {
                for (j = simpleFields.length - 1; j >= 0; --j) {
                  rec[simpleFields[j].key] =
                    r[simpleFields[j].path] !== undefined
                      ? r[simpleFields[j].path]
                      : r[j];
                }
                for (j = fieldPaths.length - 1; j >= 0; --j) {
                  rec[fieldPaths[j].key] = walkPath(fieldPaths[j].path, r);
                }
                for (j = fieldParsers.length - 1; j >= 0; --j) {
                  var p = fieldParsers[j].key;
                  rec[p] = fieldParsers[j].parser(rec[p]);
                  if (rec[p] === undefined) {
                    rec[p] = null;
                  }
                }
              }
              results[i] = rec;
            }
          } else {
            results = resultsList;
          }
          for (key in metaFields) {
            if (lang.hasOwnProperty(metaFields, key)) {
              path = buildPath(metaFields[key]);
              if (path) {
                v = walkPath(path, oFullResponse);
                oParsedResponse.meta[key] = v;
              }
            }
          }
        } else {
          oParsedResponse.error = true;
        }
        oParsedResponse.results = results;
      } else {
        oParsedResponse.error = true;
      }
      return oParsedResponse;
    },
    parseHTMLTableData: function (oRequest, oFullResponse) {
      var bError = false;
      var elTable = oFullResponse;
      var fields = this.responseSchema.fields;
      var oParsedResponse = { results: [] };
      if (lang.isArray(fields)) {
        for (var i = 0; i < elTable.tBodies.length; i++) {
          var elTbody = elTable.tBodies[i];
          for (var j = elTbody.rows.length - 1; j > -1; j--) {
            var elRow = elTbody.rows[j];
            var oResult = {};
            for (var k = fields.length - 1; k > -1; k--) {
              var field = fields[k];
              var key = lang.isValue(field.key) ? field.key : field;
              var data = elRow.cells[k].innerHTML;
              if (!field.parser && field.converter) {
                field.parser = field.converter;
              }
              var parser =
                typeof field.parser === "function"
                  ? field.parser
                  : DS.Parser[field.parser + ""];
              if (parser) {
                data = parser.call(this, data);
              }
              if (data === undefined) {
                data = null;
              }
              oResult[key] = data;
            }
            oParsedResponse.results[j] = oResult;
          }
        }
      } else {
        bError = true;
      }
      if (bError) {
        oParsedResponse.error = true;
      } else {
      }
      return oParsedResponse;
    },
  };
  lang.augmentProto(DS, util.EventProvider);
  util.LocalDataSource = function (oLiveData, oConfigs) {
    this.dataType = DS.TYPE_LOCAL;
    if (oLiveData) {
      if (YAHOO.lang.isArray(oLiveData)) {
        this.responseType = DS.TYPE_JSARRAY;
      } else {
        if (oLiveData.nodeType && oLiveData.nodeType == 9) {
          this.responseType = DS.TYPE_XML;
        } else {
          if (
            oLiveData.nodeName &&
            oLiveData.nodeName.toLowerCase() == "table"
          ) {
            this.responseType = DS.TYPE_HTMLTABLE;
            oLiveData = oLiveData.cloneNode(true);
          } else {
            if (YAHOO.lang.isString(oLiveData)) {
              this.responseType = DS.TYPE_TEXT;
            } else {
              if (YAHOO.lang.isObject(oLiveData)) {
                this.responseType = DS.TYPE_JSON;
              }
            }
          }
        }
      }
    } else {
      oLiveData = [];
      this.responseType = DS.TYPE_JSARRAY;
    }
    util.LocalDataSource.superclass.constructor.call(this, oLiveData, oConfigs);
  };
  lang.extend(util.LocalDataSource, DS);
  lang.augmentObject(util.LocalDataSource, DS);
  util.FunctionDataSource = function (oLiveData, oConfigs) {
    this.dataType = DS.TYPE_JSFUNCTION;
    oLiveData = oLiveData || function () {};
    util.FunctionDataSource.superclass.constructor.call(
      this,
      oLiveData,
      oConfigs
    );
  };
  lang.extend(util.FunctionDataSource, DS, {
    scope: null,
    makeConnection: function (oRequest, oCallback, oCaller) {
      var tId = DS._nTransactionId++;
      this.fireEvent("requestEvent", {
        tId: tId,
        request: oRequest,
        callback: oCallback,
        caller: oCaller,
      });
      var oRawResponse = this.scope
        ? this.liveData.call(this.scope, oRequest, this)
        : this.liveData(oRequest);
      if (this.responseType === DS.TYPE_UNKNOWN) {
        if (YAHOO.lang.isArray(oRawResponse)) {
          this.responseType = DS.TYPE_JSARRAY;
        } else {
          if (
            oRawResponse &&
            oRawResponse.nodeType &&
            oRawResponse.nodeType == 9
          ) {
            this.responseType = DS.TYPE_XML;
          } else {
            if (
              oRawResponse &&
              oRawResponse.nodeName &&
              oRawResponse.nodeName.toLowerCase() == "table"
            ) {
              this.responseType = DS.TYPE_HTMLTABLE;
            } else {
              if (YAHOO.lang.isObject(oRawResponse)) {
                this.responseType = DS.TYPE_JSON;
              } else {
                if (YAHOO.lang.isString(oRawResponse)) {
                  this.responseType = DS.TYPE_TEXT;
                }
              }
            }
          }
        }
      }
      this.handleResponse(oRequest, oRawResponse, oCallback, oCaller, tId);
      return tId;
    },
  });
  lang.augmentObject(util.FunctionDataSource, DS);
  util.ScriptNodeDataSource = function (oLiveData, oConfigs) {
    this.dataType = DS.TYPE_SCRIPTNODE;
    oLiveData = oLiveData || "";
    util.ScriptNodeDataSource.superclass.constructor.call(
      this,
      oLiveData,
      oConfigs
    );
  };
  lang.extend(util.ScriptNodeDataSource, DS, {
    getUtility: util.Get,
    asyncMode: "allowAll",
    scriptCallbackParam: "callback",
    generateRequestCallback: function (id) {
      return (
        "&" +
        this.scriptCallbackParam +
        "=YAHOO.util.ScriptNodeDataSource.callbacks[" +
        id +
        "]"
      );
    },
    doBeforeGetScriptNode: function (sUri) {
      return sUri;
    },
    makeConnection: function (oRequest, oCallback, oCaller) {
      var tId = DS._nTransactionId++;
      this.fireEvent("requestEvent", {
        tId: tId,
        request: oRequest,
        callback: oCallback,
        caller: oCaller,
      });
      if (util.ScriptNodeDataSource._nPending === 0) {
        util.ScriptNodeDataSource.callbacks = [];
        util.ScriptNodeDataSource._nId = 0;
      }
      var id = util.ScriptNodeDataSource._nId;
      util.ScriptNodeDataSource._nId++;
      var oSelf = this;
      util.ScriptNodeDataSource.callbacks[id] = function (oRawResponse) {
        if (
          oSelf.asyncMode !== "ignoreStaleResponses" ||
          id === util.ScriptNodeDataSource.callbacks.length - 1
        ) {
          if (oSelf.responseType === DS.TYPE_UNKNOWN) {
            if (YAHOO.lang.isArray(oRawResponse)) {
              oSelf.responseType = DS.TYPE_JSARRAY;
            } else {
              if (oRawResponse.nodeType && oRawResponse.nodeType == 9) {
                oSelf.responseType = DS.TYPE_XML;
              } else {
                if (
                  oRawResponse.nodeName &&
                  oRawResponse.nodeName.toLowerCase() == "table"
                ) {
                  oSelf.responseType = DS.TYPE_HTMLTABLE;
                } else {
                  if (YAHOO.lang.isObject(oRawResponse)) {
                    oSelf.responseType = DS.TYPE_JSON;
                  } else {
                    if (YAHOO.lang.isString(oRawResponse)) {
                      oSelf.responseType = DS.TYPE_TEXT;
                    }
                  }
                }
              }
            }
          }
          oSelf.handleResponse(oRequest, oRawResponse, oCallback, oCaller, tId);
        } else {
        }
        delete util.ScriptNodeDataSource.callbacks[id];
      };
      util.ScriptNodeDataSource._nPending++;
      var sUri = this.liveData + oRequest + this.generateRequestCallback(id);
      sUri = this.doBeforeGetScriptNode(sUri);
      this.getUtility.script(sUri, {
        autopurge: true,
        onsuccess: util.ScriptNodeDataSource._bumpPendingDown,
        onfail: util.ScriptNodeDataSource._bumpPendingDown,
      });
      return tId;
    },
  });
  lang.augmentObject(util.ScriptNodeDataSource, DS);
  lang.augmentObject(util.ScriptNodeDataSource, {
    _nId: 0,
    _nPending: 0,
    callbacks: [],
  });
  util.XHRDataSource = function (oLiveData, oConfigs) {
    this.dataType = DS.TYPE_XHR;
    this.connMgr = this.connMgr || util.Connect;
    oLiveData = oLiveData || "";
    util.XHRDataSource.superclass.constructor.call(this, oLiveData, oConfigs);
  };
  lang.extend(util.XHRDataSource, DS, {
    connMgr: null,
    connXhrMode: "allowAll",
    connMethodPost: false,
    connTimeout: 0,
    makeConnection: function (oRequest, oCallback, oCaller) {
      var oRawResponse = null;
      var tId = DS._nTransactionId++;
      this.fireEvent("requestEvent", {
        tId: tId,
        request: oRequest,
        callback: oCallback,
        caller: oCaller,
      });
      var oSelf = this;
      var oConnMgr = this.connMgr;
      var oQueue = this._oQueue;
      var _xhrSuccess = function (oResponse) {
        if (
          oResponse &&
          this.connXhrMode == "ignoreStaleResponses" &&
          oResponse.tId != oQueue.conn.tId
        ) {
          return null;
        } else {
          if (!oResponse) {
            this.fireEvent("dataErrorEvent", {
              request: oRequest,
              callback: oCallback,
              caller: oCaller,
              message: DS.ERROR_DATANULL,
            });
            DS.issueCallback(
              oCallback,
              [oRequest, { error: true }],
              true,
              oCaller
            );
            return null;
          } else {
            if (this.responseType === DS.TYPE_UNKNOWN) {
              var ctype = oResponse.getResponseHeader
                ? oResponse.getResponseHeader["Content-Type"]
                : null;
              if (ctype) {
                if (ctype.indexOf("text/xml") > -1) {
                  this.responseType = DS.TYPE_XML;
                } else {
                  if (ctype.indexOf("application/json") > -1) {
                    this.responseType = DS.TYPE_JSON;
                  } else {
                    if (ctype.indexOf("text/plain") > -1) {
                      this.responseType = DS.TYPE_TEXT;
                    }
                  }
                }
              }
            }
            this.handleResponse(oRequest, oResponse, oCallback, oCaller, tId);
          }
        }
      };
      var _xhrFailure = function (oResponse) {
        this.fireEvent("dataErrorEvent", {
          request: oRequest,
          callback: oCallback,
          caller: oCaller,
          message: DS.ERROR_DATAINVALID,
        });
        if (
          lang.isString(this.liveData) &&
          lang.isString(oRequest) &&
          this.liveData.lastIndexOf("?") !== this.liveData.length - 1 &&
          oRequest.indexOf("?") !== 0
        ) {
        }
        oResponse = oResponse || {};
        oResponse.error = true;
        DS.issueCallback(oCallback, [oRequest, oResponse], true, oCaller);
        return null;
      };
      var _xhrCallback = {
        success: _xhrSuccess,
        failure: _xhrFailure,
        scope: this,
      };
      if (lang.isNumber(this.connTimeout)) {
        _xhrCallback.timeout = this.connTimeout;
      }
      if (this.connXhrMode == "cancelStaleRequests") {
        if (oQueue.conn) {
          if (oConnMgr.abort) {
            oConnMgr.abort(oQueue.conn);
            oQueue.conn = null;
          } else {
          }
        }
      }
      if (oConnMgr && oConnMgr.asyncRequest) {
        var sLiveData = this.liveData;
        var isPost = this.connMethodPost;
        var sMethod = isPost ? "POST" : "GET";
        var sUri =
          isPost || !lang.isValue(oRequest) ? sLiveData : sLiveData + oRequest;
        var sRequest = isPost ? oRequest : null;
        if (this.connXhrMode != "queueRequests") {
          oQueue.conn = oConnMgr.asyncRequest(
            sMethod,
            sUri,
            _xhrCallback,
            sRequest
          );
        } else {
          if (oQueue.conn) {
            var allRequests = oQueue.requests;
            allRequests.push({ request: oRequest, callback: _xhrCallback });
            if (!oQueue.interval) {
              oQueue.interval = setInterval(function () {
                if (oConnMgr.isCallInProgress(oQueue.conn)) {
                  return;
                } else {
                  if (allRequests.length > 0) {
                    sUri =
                      isPost || !lang.isValue(allRequests[0].request)
                        ? sLiveData
                        : sLiveData + allRequests[0].request;
                    sRequest = isPost ? allRequests[0].request : null;
                    oQueue.conn = oConnMgr.asyncRequest(
                      sMethod,
                      sUri,
                      allRequests[0].callback,
                      sRequest
                    );
                    allRequests.shift();
                  } else {
                    clearInterval(oQueue.interval);
                    oQueue.interval = null;
                  }
                }
              }, 50);
            }
          } else {
            oQueue.conn = oConnMgr.asyncRequest(
              sMethod,
              sUri,
              _xhrCallback,
              sRequest
            );
          }
        }
      } else {
        DS.issueCallback(oCallback, [oRequest, { error: true }], true, oCaller);
      }
      return tId;
    },
  });
  lang.augmentObject(util.XHRDataSource, DS);
  util.DataSource = function (oLiveData, oConfigs) {
    oConfigs = oConfigs || {};
    var dataType = oConfigs.dataType;
    if (dataType) {
      if (dataType == DS.TYPE_LOCAL) {
        lang.augmentObject(util.DataSource, util.LocalDataSource);
        return new util.LocalDataSource(oLiveData, oConfigs);
      } else {
        if (dataType == DS.TYPE_XHR) {
          lang.augmentObject(util.DataSource, util.XHRDataSource);
          return new util.XHRDataSource(oLiveData, oConfigs);
        } else {
          if (dataType == DS.TYPE_SCRIPTNODE) {
            lang.augmentObject(util.DataSource, util.ScriptNodeDataSource);
            return new util.ScriptNodeDataSource(oLiveData, oConfigs);
          } else {
            if (dataType == DS.TYPE_JSFUNCTION) {
              lang.augmentObject(util.DataSource, util.FunctionDataSource);
              return new util.FunctionDataSource(oLiveData, oConfigs);
            }
          }
        }
      }
    }
    if (YAHOO.lang.isString(oLiveData)) {
      lang.augmentObject(util.DataSource, util.XHRDataSource);
      return new util.XHRDataSource(oLiveData, oConfigs);
    } else {
      if (YAHOO.lang.isFunction(oLiveData)) {
        lang.augmentObject(util.DataSource, util.FunctionDataSource);
        return new util.FunctionDataSource(oLiveData, oConfigs);
      } else {
        lang.augmentObject(util.DataSource, util.LocalDataSource);
        return new util.LocalDataSource(oLiveData, oConfigs);
      }
    }
  };
  lang.augmentObject(util.DataSource, DS);
})();
YAHOO.util.Number = {
  format: function (b, m) {
    var c = YAHOO.lang;
    if (!c.isValue(b) || b === "") {
      return "";
    }
    m = m || {};
    if (!c.isNumber(b)) {
      b *= 1;
    }
    if (c.isNumber(b)) {
      var o = b < 0;
      var h = b + "";
      var l = m.decimalSeparator ? m.decimalSeparator : ".";
      var k;
      if (c.isNumber(m.decimalPlaces)) {
        var j = m.decimalPlaces;
        var a = Math.pow(10, j);
        h = Math.round(b * a) / a + "";
        k = h.lastIndexOf(".");
        if (j > 0) {
          if (k < 0) {
            h += l;
            k = h.length - 1;
          } else {
            if (l !== ".") {
              h = h.replace(".", l);
            }
          }
          while (h.length - 1 - k < j) {
            h += "0";
          }
        }
      }
      if (m.thousandsSeparator) {
        var f = m.thousandsSeparator;
        k = h.lastIndexOf(l);
        k = k > -1 ? k : h.length;
        var g = h.substring(k);
        var d = -1;
        for (var n = k; n > 0; n--) {
          d++;
          if (d % 3 === 0 && n !== k && (!o || n > 1)) {
            g = f + g;
          }
          g = h.charAt(n - 1) + g;
        }
        h = g;
      }
      h = m.prefix ? m.prefix + h : h;
      h = m.suffix ? h + m.suffix : h;
      return h;
    } else {
      return b;
    }
  },
};
(function () {
  var a = function (f, c, d) {
    if (typeof d === "undefined") {
      d = 10;
    }
    for (; parseInt(f, 10) < d && d > 1; d /= 10) {
      f = c.toString() + f;
    }
    return f.toString();
  };
  var b = {
    formats: {
      a: function (c, d) {
        return d.a[c.getDay()];
      },
      A: function (c, d) {
        return d.A[c.getDay()];
      },
      b: function (c, d) {
        return d.b[c.getMonth()];
      },
      B: function (c, d) {
        return d.B[c.getMonth()];
      },
      C: function (c) {
        return a(parseInt(c.getFullYear() / 100, 10), 0);
      },
      d: ["getDate", "0"],
      e: ["getDate", " "],
      g: function (c) {
        return a(parseInt(b.formats.G(c) % 100, 10), 0);
      },
      G: function (d) {
        var c = d.getFullYear();
        var f = parseInt(b.formats.V(d), 10);
        var g = parseInt(b.formats.W(d), 10);
        if (g > f) {
          c++;
        } else {
          if (g === 0 && f >= 52) {
            c--;
          }
        }
        return c;
      },
      H: ["getHours", "0"],
      I: function (c) {
        var d = c.getHours() % 12;
        return a(d === 0 ? 12 : d, 0);
      },
      j: function (c) {
        var d = new Date("" + c.getFullYear() + "/1/1 GMT");
        var g = new Date(
          "" +
            c.getFullYear() +
            "/" +
            (c.getMonth() + 1) +
            "/" +
            c.getDate() +
            " GMT"
        );
        var h = g - d;
        var f = parseInt(h / 60000 / 60 / 24, 10) + 1;
        return a(f, 0, 100);
      },
      k: ["getHours", " "],
      l: function (c) {
        var d = c.getHours() % 12;
        return a(d === 0 ? 12 : d, " ");
      },
      m: function (c) {
        return a(c.getMonth() + 1, 0);
      },
      M: ["getMinutes", "0"],
      p: function (c, d) {
        return d.p[c.getHours() >= 12 ? 1 : 0];
      },
      P: function (c, d) {
        return d.P[c.getHours() >= 12 ? 1 : 0];
      },
      s: function (c, d) {
        return parseInt(c.getTime() / 1000, 10);
      },
      S: ["getSeconds", "0"],
      u: function (d) {
        var c = d.getDay();
        return c === 0 ? 7 : c;
      },
      U: function (c) {
        var g = parseInt(b.formats.j(c), 10);
        var d = 6 - c.getDay();
        var f = parseInt((g + d) / 7, 10);
        return a(f, 0);
      },
      V: function (c) {
        var d = parseInt(b.formats.W(c), 10);
        var g = new Date("" + c.getFullYear() + "/1/1").getDay();
        var f = d + (g > 4 || g <= 1 ? 0 : 1);
        if (
          f === 53 &&
          new Date("" + c.getFullYear() + "/12/31").getDay() < 4
        ) {
          f = 1;
        } else {
          if (f === 0) {
            f = b.formats.V(new Date("" + (c.getFullYear() - 1) + "/12/31"));
          }
        }
        return a(f, 0);
      },
      w: "getDay",
      W: function (c) {
        var g = parseInt(b.formats.j(c), 10);
        var d = 7 - b.formats.u(c);
        var f = parseInt((g + d) / 7, 10);
        return a(f, 0, 10);
      },
      y: function (c) {
        return a(c.getFullYear() % 100, 0);
      },
      Y: "getFullYear",
      z: function (d) {
        var f = d.getTimezoneOffset();
        var g = a(parseInt(Math.abs(f / 60), 10), 0);
        var c = a(Math.abs(f % 60), 0);
        return (f > 0 ? "-" : "+") + g + c;
      },
      Z: function (d) {
        var c = d
          .toString()
          .replace(/^.*:\d\d( GMT[+-]\d+)? \(?([A-Za-z ]+)\)?\d*$/, "$2")
          .replace(/[a-z ]/g, "");
        if (c.length > 4) {
          c = b.formats.z(d);
        }
        return c;
      },
      "%": function (c) {
        return "%";
      },
    },
    aggregates: {
      c: "locale",
      D: "%m/%d/%y",
      F: "%Y-%m-%d",
      h: "%b",
      n: "\n",
      r: "locale",
      R: "%H:%M",
      t: "\t",
      T: "%H:%M:%S",
      x: "locale",
      X: "locale",
    },
    format: function (g, h, k) {
      h = h || {};
      if (!(g instanceof Date)) {
        return YAHOO.lang.isValue(g) ? g : "";
      }
      var f = h.format || "%m/%d/%Y";
      if (f === "YYYY/MM/DD") {
        f = "%Y/%m/%d";
      } else {
        if (f === "DD/MM/YYYY") {
          f = "%d/%m/%Y";
        } else {
          if (f === "MM/DD/YYYY") {
            f = "%m/%d/%Y";
          }
        }
      }
      k = k || "en";
      if (!(k in YAHOO.util.DateLocale)) {
        if (k.replace(/-[a-zA-Z]+$/, "") in YAHOO.util.DateLocale) {
          k = k.replace(/-[a-zA-Z]+$/, "");
        } else {
          k = "en";
        }
      }
      var c = YAHOO.util.DateLocale[k];
      var l = function (m, n) {
        var o = b.aggregates[n];
        return o === "locale" ? c[n] : o;
      };
      var j = function (m, n) {
        var o = b.formats[n];
        if (typeof o === "string") {
          return g[o]();
        } else {
          if (typeof o === "function") {
            return o.call(g, g, c);
          } else {
            if (typeof o === "object" && typeof o[0] === "string") {
              return a(g[o[0]](), o[1]);
            } else {
              return n;
            }
          }
        }
      };
      while (f.match(/%[cDFhnrRtTxX]/)) {
        f = f.replace(/%([cDFhnrRtTxX])/g, l);
      }
      var d = f.replace(/%([aAbBCdegGHIjklmMpPsSuUVwWyYzZ%])/g, j);
      l = j = undefined;
      return d;
    },
  };
  YAHOO.namespace("YAHOO.util");
  YAHOO.util.Date = b;
  YAHOO.util.DateLocale = {
    a: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
    A: [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ],
    b: [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ],
    B: [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ],
    c: "%a %d %b %Y %T %Z",
    p: ["AM", "PM"],
    P: ["am", "pm"],
    r: "%I:%M:%S %p",
    x: "%d/%m/%y",
    X: "%T",
  };
  YAHOO.util.DateLocale.en = YAHOO.lang.merge(YAHOO.util.DateLocale, {});
  YAHOO.util.DateLocale["en-US"] = YAHOO.lang.merge(YAHOO.util.DateLocale.en, {
    c: "%a %d %b %Y %I:%M:%S %p %Z",
    x: "%m/%d/%Y",
    X: "%I:%M:%S %p",
  });
  YAHOO.util.DateLocale["en-GB"] = YAHOO.lang.merge(YAHOO.util.DateLocale.en, {
    r: "%l:%M:%S %P %Z",
  });
  YAHOO.util.DateLocale["en-AU"] = YAHOO.lang.merge(YAHOO.util.DateLocale.en);
})();
YAHOO.register("datasource", YAHOO.util.DataSource, {
  version: "2.7.0",
  build: "1799",
});
YAHOO.widget.DS_JSArray = YAHOO.util.LocalDataSource;
YAHOO.widget.DS_JSFunction = YAHOO.util.FunctionDataSource;
YAHOO.widget.DS_XHR = function (d, a, b) {
  var c = new YAHOO.util.XHRDataSource(d, b);
  c._aDeprecatedSchema = a;
  return c;
};
YAHOO.widget.DS_ScriptNode = function (d, a, b) {
  var c = new YAHOO.util.ScriptNodeDataSource(d, b);
  c._aDeprecatedSchema = a;
  return c;
};
YAHOO.widget.DS_XHR.TYPE_JSON = YAHOO.util.DataSourceBase.TYPE_JSON;
YAHOO.widget.DS_XHR.TYPE_XML = YAHOO.util.DataSourceBase.TYPE_XML;
YAHOO.widget.DS_XHR.TYPE_FLAT = YAHOO.util.DataSourceBase.TYPE_TEXT;
YAHOO.widget.AutoComplete = function (k, c, g, b) {
  if (k && c && g) {
    if (g instanceof YAHOO.util.DataSourceBase) {
      this.dataSource = g;
    } else {
      return;
    }
    this.key = 0;
    var a = g.responseSchema;
    if (g._aDeprecatedSchema) {
      var f = g._aDeprecatedSchema;
      if (YAHOO.lang.isArray(f)) {
        if (
          g.responseType === YAHOO.util.DataSourceBase.TYPE_JSON ||
          g.responseType === YAHOO.util.DataSourceBase.TYPE_UNKNOWN
        ) {
          a.resultsList = f[0];
          this.key = f[1];
          a.fields = f.length < 3 ? null : f.slice(1);
        } else {
          if (g.responseType === YAHOO.util.DataSourceBase.TYPE_XML) {
            a.resultNode = f[0];
            this.key = f[1];
            a.fields = f.slice(1);
          } else {
            if (g.responseType === YAHOO.util.DataSourceBase.TYPE_TEXT) {
              a.recordDelim = f[0];
              a.fieldDelim = f[1];
            }
          }
        }
        g.responseSchema = a;
      }
    }
    if (YAHOO.util.Dom.inDocument(k)) {
      if (YAHOO.lang.isString(k)) {
        this._sName = "instance" + YAHOO.widget.AutoComplete._nIndex + " " + k;
        this._elTextbox = document.getElementById(k);
      } else {
        this._sName = k.id
          ? "instance" + YAHOO.widget.AutoComplete._nIndex + " " + k.id
          : "instance" + YAHOO.widget.AutoComplete._nIndex;
        this._elTextbox = k;
      }
      YAHOO.util.Dom.addClass(this._elTextbox, "yui-ac-input");
    } else {
      return;
    }
    if (YAHOO.util.Dom.inDocument(c)) {
      if (YAHOO.lang.isString(c)) {
        this._elContainer = document.getElementById(c);
      } else {
        this._elContainer = c;
      }
      if (this._elContainer.style.display == "none") {
      }
      var m = this._elContainer.parentNode;
      var d = m.tagName.toLowerCase();
      if (d == "div") {
        YAHOO.util.Dom.addClass(m, "yui-ac");
      } else {
      }
    } else {
      return;
    }
    if (this.dataSource.dataType === YAHOO.util.DataSourceBase.TYPE_LOCAL) {
      this.applyLocalFilter = true;
    }
    if (b && b.constructor == Object) {
      for (var h in b) {
        if (h) {
          this[h] = b[h];
        }
      }
    }
    this._initContainerEl();
    this._initProps();
    this._initListEl();
    this._initContainerHelperEls();
    var j = this;
    var l = this._elTextbox;
    YAHOO.util.Event.addListener(l, "keyup", j._onTextboxKeyUp, j);
    YAHOO.util.Event.addListener(l, "keydown", j._onTextboxKeyDown, j);
    YAHOO.util.Event.addListener(l, "focus", j._onTextboxFocus, j);
    YAHOO.util.Event.addListener(l, "blur", j._onTextboxBlur, j);
    YAHOO.util.Event.addListener(c, "mouseover", j._onContainerMouseover, j);
    YAHOO.util.Event.addListener(c, "mouseout", j._onContainerMouseout, j);
    YAHOO.util.Event.addListener(c, "click", j._onContainerClick, j);
    YAHOO.util.Event.addListener(c, "scroll", j._onContainerScroll, j);
    YAHOO.util.Event.addListener(c, "resize", j._onContainerResize, j);
    YAHOO.util.Event.addListener(l, "keypress", j._onTextboxKeyPress, j);
    YAHOO.util.Event.addListener(window, "unload", j._onWindowUnload, j);
    this.textboxFocusEvent = new YAHOO.util.CustomEvent("textboxFocus", this);
    this.textboxKeyEvent = new YAHOO.util.CustomEvent("textboxKey", this);
    this.dataRequestEvent = new YAHOO.util.CustomEvent("dataRequest", this);
    this.dataReturnEvent = new YAHOO.util.CustomEvent("dataReturn", this);
    this.dataErrorEvent = new YAHOO.util.CustomEvent("dataError", this);
    this.containerPopulateEvent = new YAHOO.util.CustomEvent(
      "containerPopulate",
      this
    );
    this.containerExpandEvent = new YAHOO.util.CustomEvent(
      "containerExpand",
      this
    );
    this.typeAheadEvent = new YAHOO.util.CustomEvent("typeAhead", this);
    this.itemMouseOverEvent = new YAHOO.util.CustomEvent("itemMouseOver", this);
    this.itemMouseOutEvent = new YAHOO.util.CustomEvent("itemMouseOut", this);
    this.itemArrowToEvent = new YAHOO.util.CustomEvent("itemArrowTo", this);
    this.itemArrowFromEvent = new YAHOO.util.CustomEvent("itemArrowFrom", this);
    this.itemSelectEvent = new YAHOO.util.CustomEvent("itemSelect", this);
    this.unmatchedItemSelectEvent = new YAHOO.util.CustomEvent(
      "unmatchedItemSelect",
      this
    );
    this.selectionEnforceEvent = new YAHOO.util.CustomEvent(
      "selectionEnforce",
      this
    );
    this.containerCollapseEvent = new YAHOO.util.CustomEvent(
      "containerCollapse",
      this
    );
    this.textboxBlurEvent = new YAHOO.util.CustomEvent("textboxBlur", this);
    this.textboxChangeEvent = new YAHOO.util.CustomEvent("textboxChange", this);
    l.setAttribute("autocomplete", "off");
    YAHOO.widget.AutoComplete._nIndex++;
  } else {
  }
};
YAHOO.widget.AutoComplete.prototype.dataSource = null;
YAHOO.widget.AutoComplete.prototype.applyLocalFilter = null;
YAHOO.widget.AutoComplete.prototype.queryMatchCase = false;
YAHOO.widget.AutoComplete.prototype.queryMatchContains = false;
YAHOO.widget.AutoComplete.prototype.queryMatchSubset = false;
YAHOO.widget.AutoComplete.prototype.minQueryLength = 1;
YAHOO.widget.AutoComplete.prototype.maxResultsDisplayed = 10;
YAHOO.widget.AutoComplete.prototype.queryDelay = 0.2;
YAHOO.widget.AutoComplete.prototype.typeAheadDelay = 0.5;
YAHOO.widget.AutoComplete.prototype.queryInterval = 500;
YAHOO.widget.AutoComplete.prototype.highlightClassName = "yui-ac-highlight";
YAHOO.widget.AutoComplete.prototype.prehighlightClassName = null;
YAHOO.widget.AutoComplete.prototype.delimChar = null;
YAHOO.widget.AutoComplete.prototype.autoHighlight = true;
YAHOO.widget.AutoComplete.prototype.typeAhead = false;
YAHOO.widget.AutoComplete.prototype.animHoriz = false;
YAHOO.widget.AutoComplete.prototype.animVert = true;
YAHOO.widget.AutoComplete.prototype.animSpeed = 0.3;
YAHOO.widget.AutoComplete.prototype.forceSelection = false;
YAHOO.widget.AutoComplete.prototype.allowBrowserAutocomplete = true;
YAHOO.widget.AutoComplete.prototype.alwaysShowContainer = false;
YAHOO.widget.AutoComplete.prototype.useIFrame = false;
YAHOO.widget.AutoComplete.prototype.useShadow = false;
YAHOO.widget.AutoComplete.prototype.suppressInputUpdate = false;
YAHOO.widget.AutoComplete.prototype.resultTypeList = true;
YAHOO.widget.AutoComplete.prototype.queryQuestionMark = true;
YAHOO.widget.AutoComplete.prototype.toString = function () {
  return "AutoComplete " + this._sName;
};
YAHOO.widget.AutoComplete.prototype.getInputEl = function () {
  return this._elTextbox;
};
YAHOO.widget.AutoComplete.prototype.getContainerEl = function () {
  return this._elContainer;
};
YAHOO.widget.AutoComplete.prototype.isFocused = function () {
  return this._bFocused === null ? false : this._bFocused;
};
YAHOO.widget.AutoComplete.prototype.isContainerOpen = function () {
  return this._bContainerOpen;
};
YAHOO.widget.AutoComplete.prototype.getListEl = function () {
  return this._elList;
};
YAHOO.widget.AutoComplete.prototype.getListItemMatch = function (a) {
  if (a._sResultMatch) {
    return a._sResultMatch;
  } else {
    return null;
  }
};
YAHOO.widget.AutoComplete.prototype.getListItemData = function (a) {
  if (a._oResultData) {
    return a._oResultData;
  } else {
    return null;
  }
};
YAHOO.widget.AutoComplete.prototype.getListItemIndex = function (a) {
  if (YAHOO.lang.isNumber(a._nItemIndex)) {
    return a._nItemIndex;
  } else {
    return null;
  }
};
YAHOO.widget.AutoComplete.prototype.setHeader = function (b) {
  if (this._elHeader) {
    var a = this._elHeader;
    if (b) {
      a.innerHTML = b;
      a.style.display = "block";
    } else {
      a.innerHTML = "";
      a.style.display = "none";
    }
  }
};
YAHOO.widget.AutoComplete.prototype.setFooter = function (b) {
  if (this._elFooter) {
    var a = this._elFooter;
    if (b) {
      a.innerHTML = b;
      a.style.display = "block";
    } else {
      a.innerHTML = "";
      a.style.display = "none";
    }
  }
};
YAHOO.widget.AutoComplete.prototype.setBody = function (a) {
  if (this._elBody) {
    var b = this._elBody;
    YAHOO.util.Event.purgeElement(b, true);
    if (a) {
      b.innerHTML = a;
      b.style.display = "block";
    } else {
      b.innerHTML = "";
      b.style.display = "none";
    }
    this._elList = null;
  }
};
YAHOO.widget.AutoComplete.prototype.generateRequest = function (b) {
  var a = this.dataSource.dataType;
  if (a === YAHOO.util.DataSourceBase.TYPE_XHR) {
    if (!this.dataSource.connMethodPost) {
      b =
        (this.queryQuestionMark ? "?" : "") +
        (this.dataSource.scriptQueryParam || "query") +
        "=" +
        b +
        (this.dataSource.scriptQueryAppend
          ? "&" + this.dataSource.scriptQueryAppend
          : "");
    } else {
      b =
        (this.dataSource.scriptQueryParam || "query") +
        "=" +
        b +
        (this.dataSource.scriptQueryAppend
          ? "&" + this.dataSource.scriptQueryAppend
          : "");
    }
  } else {
    if (a === YAHOO.util.DataSourceBase.TYPE_SCRIPTNODE) {
      b =
        "&" +
        (this.dataSource.scriptQueryParam || "query") +
        "=" +
        b +
        (this.dataSource.scriptQueryAppend
          ? "&" + this.dataSource.scriptQueryAppend
          : "");
    }
  }
  return b;
};
YAHOO.widget.AutoComplete.prototype.sendQuery = function (b) {
  this._bFocused = null;
  var a = this.delimChar ? this._elTextbox.value + b : b;
  this._sendQuery(a);
};
YAHOO.widget.AutoComplete.prototype.collapseContainer = function () {
  this._toggleContainer(false);
};
YAHOO.widget.AutoComplete.prototype.getSubsetMatches = function (b) {
  var c, d, a;
  for (var f = b.length; f >= this.minQueryLength; f--) {
    a = this.generateRequest(b.substr(0, f));
    this.dataRequestEvent.fire(this, c, a);
    d = this.dataSource.getCachedResponse(a);
    if (d) {
      return this.filterResults.apply(this.dataSource, [
        b,
        d,
        d,
        { scope: this },
      ]);
    }
  }
  return null;
};
YAHOO.widget.AutoComplete.prototype.preparseRawResponse = function (c, d, a) {
  var b =
    this.responseStripAfter !== "" && d.indexOf
      ? d.indexOf(this.responseStripAfter)
      : -1;
  if (b != -1) {
    d = d.substring(0, b);
  }
  return d;
};
YAHOO.widget.AutoComplete.prototype.filterResults = function (m, k, f, l) {
  if (l && l.argument && l.argument.query) {
    m = l.argument.query;
  }
  if (m && m !== "") {
    f = YAHOO.widget.AutoComplete._cloneObject(f);
    var o = l.scope,
      g = this,
      c = f.results,
      j = [],
      a = false,
      n = g.queryMatchCase || o.queryMatchCase,
      d = g.queryMatchContains || o.queryMatchContains;
    for (var b = c.length - 1; b >= 0; b--) {
      var r = c[b];
      var s = null;
      if (YAHOO.lang.isString(r)) {
        s = r;
      } else {
        if (YAHOO.lang.isArray(r)) {
          s = r[0];
        } else {
          if (this.responseSchema.fields) {
            var h =
              this.responseSchema.fields[0].key ||
              this.responseSchema.fields[0];
            s = r[h];
          } else {
            if (this.key) {
              s = r[this.key];
            }
          }
        }
      }
      if (YAHOO.lang.isString(s)) {
        var q = n
          ? s.indexOf(decodeURIComponent(m))
          : s.toLowerCase().indexOf(decodeURIComponent(m).toLowerCase());
        if ((!d && q === 0) || (d && q > -1)) {
          j.unshift(r);
        }
      }
    }
    f.results = j;
  } else {
  }
  return f;
};
YAHOO.widget.AutoComplete.prototype.handleResponse = function (b, a, c) {
  if (this instanceof YAHOO.widget.AutoComplete && this._sName) {
    this._populateList(b, a, c);
  }
};
YAHOO.widget.AutoComplete.prototype.doBeforeLoadData = function (b, a, c) {
  return true;
};
YAHOO.widget.AutoComplete.prototype.formatResult = function (d, b, a) {
  var c = a ? a : "";
  return c;
};
YAHOO.widget.AutoComplete.prototype.doBeforeExpandContainer = function (
  b,
  a,
  c,
  d
) {
  return true;
};
YAHOO.widget.AutoComplete.prototype.destroy = function () {
  var d = this.toString();
  var a = this._elTextbox;
  var b = this._elContainer;
  this.textboxFocusEvent.unsubscribeAll();
  this.textboxKeyEvent.unsubscribeAll();
  this.dataRequestEvent.unsubscribeAll();
  this.dataReturnEvent.unsubscribeAll();
  this.dataErrorEvent.unsubscribeAll();
  this.containerPopulateEvent.unsubscribeAll();
  this.containerExpandEvent.unsubscribeAll();
  this.typeAheadEvent.unsubscribeAll();
  this.itemMouseOverEvent.unsubscribeAll();
  this.itemMouseOutEvent.unsubscribeAll();
  this.itemArrowToEvent.unsubscribeAll();
  this.itemArrowFromEvent.unsubscribeAll();
  this.itemSelectEvent.unsubscribeAll();
  this.unmatchedItemSelectEvent.unsubscribeAll();
  this.selectionEnforceEvent.unsubscribeAll();
  this.containerCollapseEvent.unsubscribeAll();
  this.textboxBlurEvent.unsubscribeAll();
  this.textboxChangeEvent.unsubscribeAll();
  YAHOO.util.Event.purgeElement(a, true);
  YAHOO.util.Event.purgeElement(b, true);
  b.innerHTML = "";
  for (var c in this) {
    if (YAHOO.lang.hasOwnProperty(this, c)) {
      this[c] = null;
    }
  }
};
YAHOO.widget.AutoComplete.prototype.textboxFocusEvent = null;
YAHOO.widget.AutoComplete.prototype.textboxKeyEvent = null;
YAHOO.widget.AutoComplete.prototype.dataRequestEvent = null;
YAHOO.widget.AutoComplete.prototype.dataReturnEvent = null;
YAHOO.widget.AutoComplete.prototype.dataErrorEvent = null;
YAHOO.widget.AutoComplete.prototype.containerPopulateEvent = null;
YAHOO.widget.AutoComplete.prototype.containerExpandEvent = null;
YAHOO.widget.AutoComplete.prototype.typeAheadEvent = null;
YAHOO.widget.AutoComplete.prototype.itemMouseOverEvent = null;
YAHOO.widget.AutoComplete.prototype.itemMouseOutEvent = null;
YAHOO.widget.AutoComplete.prototype.itemArrowToEvent = null;
YAHOO.widget.AutoComplete.prototype.itemArrowFromEvent = null;
YAHOO.widget.AutoComplete.prototype.itemSelectEvent = null;
YAHOO.widget.AutoComplete.prototype.unmatchedItemSelectEvent = null;
YAHOO.widget.AutoComplete.prototype.selectionEnforceEvent = null;
YAHOO.widget.AutoComplete.prototype.containerCollapseEvent = null;
YAHOO.widget.AutoComplete.prototype.textboxBlurEvent = null;
YAHOO.widget.AutoComplete.prototype.textboxChangeEvent = null;
YAHOO.widget.AutoComplete._nIndex = 0;
YAHOO.widget.AutoComplete.prototype._sName = null;
YAHOO.widget.AutoComplete.prototype._elTextbox = null;
YAHOO.widget.AutoComplete.prototype._elContainer = null;
YAHOO.widget.AutoComplete.prototype._elContent = null;
YAHOO.widget.AutoComplete.prototype._elHeader = null;
YAHOO.widget.AutoComplete.prototype._elBody = null;
YAHOO.widget.AutoComplete.prototype._elFooter = null;
YAHOO.widget.AutoComplete.prototype._elShadow = null;
YAHOO.widget.AutoComplete.prototype._elIFrame = null;
YAHOO.widget.AutoComplete.prototype._bFocused = null;
YAHOO.widget.AutoComplete.prototype._oAnim = null;
YAHOO.widget.AutoComplete.prototype._bContainerOpen = false;
YAHOO.widget.AutoComplete.prototype._bOverContainer = false;
YAHOO.widget.AutoComplete.prototype._elList = null;
YAHOO.widget.AutoComplete.prototype._nDisplayedItems = 0;
YAHOO.widget.AutoComplete.prototype._sCurQuery = null;
YAHOO.widget.AutoComplete.prototype._sPastSelections = "";
YAHOO.widget.AutoComplete.prototype._sInitInputValue = null;
YAHOO.widget.AutoComplete.prototype._elCurListItem = null;
YAHOO.widget.AutoComplete.prototype._bItemSelected = false;
YAHOO.widget.AutoComplete.prototype._nKeyCode = null;
YAHOO.widget.AutoComplete.prototype._nDelayID = -1;
YAHOO.widget.AutoComplete.prototype._nTypeAheadDelayID = -1;
YAHOO.widget.AutoComplete.prototype._iFrameSrc = "javascript:false;";
YAHOO.widget.AutoComplete.prototype._queryInterval = null;
YAHOO.widget.AutoComplete.prototype._sLastTextboxValue = null;
YAHOO.widget.AutoComplete.prototype._initProps = function () {
  var g = this.minQueryLength;
  if (!YAHOO.lang.isNumber(g)) {
    this.minQueryLength = 1;
  }
  var c = this.maxResultsDisplayed;
  if (!YAHOO.lang.isNumber(c) || c < 1) {
    this.maxResultsDisplayed = 10;
  }
  var b = this.queryDelay;
  if (!YAHOO.lang.isNumber(b) || b < 0) {
    this.queryDelay = 0.2;
  }
  var f = this.typeAheadDelay;
  if (!YAHOO.lang.isNumber(f) || f < 0) {
    this.typeAheadDelay = 0.2;
  }
  var a = this.delimChar;
  if (YAHOO.lang.isString(a) && a.length > 0) {
    this.delimChar = [a];
  } else {
    if (!YAHOO.lang.isArray(a)) {
      this.delimChar = null;
    }
  }
  var d = this.animSpeed;
  if ((this.animHoriz || this.animVert) && YAHOO.util.Anim) {
    if (!YAHOO.lang.isNumber(d) || d < 0) {
      this.animSpeed = 0.3;
    }
    if (!this._oAnim) {
      this._oAnim = new YAHOO.util.Anim(this._elContent, {}, this.animSpeed);
    } else {
      this._oAnim.duration = this.animSpeed;
    }
  }
  if (this.forceSelection && a) {
  }
};
YAHOO.widget.AutoComplete.prototype._initContainerHelperEls = function () {
  if (this.useShadow && !this._elShadow) {
    var a = document.createElement("div");
    a.className = "yui-ac-shadow";
    a.style.width = 0;
    a.style.height = 0;
    this._elShadow = this._elContainer.appendChild(a);
  }
  if (this.useIFrame && !this._elIFrame) {
    var b = document.createElement("iframe");
    b.src = this._iFrameSrc;
    b.frameBorder = 0;
    b.scrolling = "no";
    b.style.position = "absolute";
    b.style.width = 0;
    b.style.height = 0;
    b.tabIndex = -1;
    b.style.padding = 0;
    this._elIFrame = this._elContainer.appendChild(b);
  }
};
YAHOO.widget.AutoComplete.prototype._initContainerEl = function () {
  YAHOO.util.Dom.addClass(this._elContainer, "yui-ac-container");
  if (!this._elContent) {
    var c = document.createElement("div");
    c.className = "yui-ac-content";
    c.style.display = "none";
    this._elContent = this._elContainer.appendChild(c);
    var d = document.createElement("div");
    d.className = "yui-ac-hd";
    d.style.display = "none";
    this._elHeader = this._elContent.appendChild(d);
    var b = document.createElement("div");
    b.className = "yui-ac-bd";
    this._elBody = this._elContent.appendChild(b);
    var a = document.createElement("div");
    a.className = "yui-ac-ft";
    a.style.display = "none";
    this._elFooter = this._elContent.appendChild(a);
  } else {
  }
};
YAHOO.widget.AutoComplete.prototype._initListEl = function () {
  var c = this.maxResultsDisplayed;
  var a = this._elList || document.createElement("ul");
  var d;
  while (a.childNodes.length < c) {
    d = document.createElement("li");
    d.style.display = "none";
    d._nItemIndex = a.childNodes.length;
    a.appendChild(d);
  }
  if (!this._elList) {
    var b = this._elBody;
    YAHOO.util.Event.purgeElement(b, true);
    b.innerHTML = "";
    this._elList = b.appendChild(a);
  }
};
YAHOO.widget.AutoComplete.prototype._focus = function () {
  var a = this;
  setTimeout(function () {
    try {
      a._elTextbox.focus();
    } catch (b) {}
  }, 0);
};
YAHOO.widget.AutoComplete.prototype._enableIntervalDetection = function () {
  var a = this;
  if (!a._queryInterval && a.queryInterval) {
    a._queryInterval = setInterval(function () {
      a._onInterval();
    }, a.queryInterval);
  }
};
YAHOO.widget.AutoComplete.prototype._onInterval = function () {
  var a = this._elTextbox.value;
  var b = this._sLastTextboxValue;
  if (a != b) {
    this._sLastTextboxValue = a;
    this._sendQuery(a);
  }
};
YAHOO.widget.AutoComplete.prototype._clearInterval = function () {
  if (this._queryInterval) {
    clearInterval(this._queryInterval);
    this._queryInterval = null;
  }
};
YAHOO.widget.AutoComplete.prototype._isIgnoreKey = function (a) {
  if (
    a == 9 ||
    a == 13 ||
    a == 16 ||
    a == 17 ||
    (a >= 18 && a <= 20) ||
    a == 27 ||
    (a >= 33 && a <= 35) ||
    (a >= 36 && a <= 40) ||
    (a >= 44 && a <= 45) ||
    a == 229
  ) {
    return true;
  }
  return false;
};
YAHOO.widget.AutoComplete.prototype._sendQuery = function (b) {
  if (this.minQueryLength < 0) {
    this._toggleContainer(false);
    return;
  }
  if (this.delimChar) {
    var a = this._extractQuery(b);
    b = a.query;
    this._sPastSelections = a.previous;
  }
  if (
    (b && b.length < this.minQueryLength) ||
    (!b && this.minQueryLength > 0)
  ) {
    if (this._nDelayID != -1) {
      clearTimeout(this._nDelayID);
    }
    this._toggleContainer(false);
    return;
  }
  b = encodeURIComponent(b);
  this._nDelayID = -1;
  if (this.dataSource.queryMatchSubset || this.queryMatchSubset) {
    var c = this.getSubsetMatches(b);
    if (c) {
      this.handleResponse(b, c, { query: b });
      return;
    }
  }
  if (this.responseStripAfter) {
    this.dataSource.doBeforeParseData = this.preparseRawResponse;
  }
  if (this.applyLocalFilter) {
    this.dataSource.doBeforeCallback = this.filterResults;
  }
  var d = this.generateRequest(b);
  this.dataRequestEvent.fire(this, b, d);
  this.dataSource.sendRequest(d, {
    success: this.handleResponse,
    failure: this.handleResponse,
    scope: this,
    argument: { query: b },
  });
};
YAHOO.widget.AutoComplete.prototype._populateList = function (k, q, t) {
  if (this._nTypeAheadDelayID != -1) {
    clearTimeout(this._nTypeAheadDelayID);
  }
  k = t && t.query ? t.query : k;
  var n = this.doBeforeLoadData(k, q, t);
  if (n && !q.error) {
    this.dataReturnEvent.fire(this, k, q.results);
    if (this._bFocused || this._bFocused === null) {
      var h = decodeURIComponent(k);
      this._sCurQuery = h;
      this._bItemSelected = false;
      var b = q.results,
        v = Math.min(b.length, this.maxResultsDisplayed),
        l = this.dataSource.responseSchema.fields
          ? this.dataSource.responseSchema.fields[0].key ||
            this.dataSource.responseSchema.fields[0]
          : 0;
      if (v > 0) {
        if (!this._elList || this._elList.childNodes.length < v) {
          this._initListEl();
        }
        this._initContainerHelperEls();
        var m = this._elList.childNodes;
        for (var c = v - 1; c >= 0; c--) {
          var d = m[c],
            r = b[c];
          if (this.resultTypeList) {
            var u = [];
            u[0] = YAHOO.lang.isString(r) ? r : r[l] || r[this.key];
            var j = this.dataSource.responseSchema.fields;
            if (YAHOO.lang.isArray(j) && j.length > 1) {
              for (var g = 1, a = j.length; g < a; g++) {
                u[u.length] = r[j[g].key || j[g]];
              }
            } else {
              if (YAHOO.lang.isArray(r)) {
                u = r;
              } else {
                if (YAHOO.lang.isString(r)) {
                  u = [r];
                } else {
                  u[1] = r;
                }
              }
            }
            r = u;
          }
          d._sResultMatch = YAHOO.lang.isString(r)
            ? r
            : YAHOO.lang.isArray(r)
            ? r[0]
            : r[l] || "";
          d._oResultData = r;
          d.innerHTML = this.formatResult(r, h, d._sResultMatch);
          d.style.display = "";
        }
        if (v < m.length) {
          var o;
          for (var f = m.length - 1; f >= v; f--) {
            o = m[f];
            o.style.display = "none";
          }
        }
        this._nDisplayedItems = v;
        this.containerPopulateEvent.fire(this, k, b);
        if (this.autoHighlight) {
          var s = this._elList.firstChild;
          this._toggleHighlight(s, "to");
          this.itemArrowToEvent.fire(this, s);
          this._typeAhead(s, k);
        } else {
          this._toggleHighlight(this._elCurListItem, "from");
        }
        n = this.doBeforeExpandContainer(
          this._elTextbox,
          this._elContainer,
          k,
          b
        );
        this._toggleContainer(n);
      } else {
        this._toggleContainer(false);
      }
      return;
    }
  } else {
    this.dataErrorEvent.fire(this, k);
  }
};
YAHOO.widget.AutoComplete.prototype._clearSelection = function () {
  var a = this.delimChar
    ? this._extractQuery(this._elTextbox.value)
    : { previous: "", query: this._elTextbox.value };
  this._elTextbox.value = a.previous;
  this.selectionEnforceEvent.fire(this, a.query);
};
YAHOO.widget.AutoComplete.prototype._textMatchesOption = function () {
  var a = null;
  for (var d = 0; d < this._nDisplayedItems; d++) {
    var c = this._elList.childNodes[d];
    var b = ("" + c._sResultMatch).toLowerCase();
    if (b == this._sCurQuery.toLowerCase()) {
      a = c;
      break;
    }
  }
  return a;
};
YAHOO.widget.AutoComplete.prototype._typeAhead = function (d, b) {
  if (!this.typeAhead || this._nKeyCode == 8) {
    return;
  }
  var a = this,
    c = this._elTextbox;
  if (c.setSelectionRange || c.createTextRange) {
    this._nTypeAheadDelayID = setTimeout(function () {
      var g = c.value.length;
      a._updateValue(d);
      var f = c.value.length;
      a._selectText(c, g, f);
      var h = c.value.substr(g, f);
      a.typeAheadEvent.fire(a, b, h);
    }, this.typeAheadDelay * 1000);
  }
};
YAHOO.widget.AutoComplete.prototype._selectText = function (b, a, d) {
  if (b.setSelectionRange) {
    b.setSelectionRange(a, d);
  } else {
    if (b.createTextRange) {
      var c = b.createTextRange();
      c.moveStart("character", a);
      c.moveEnd("character", d - b.value.length);
      c.select();
    } else {
      b.select();
    }
  }
};
YAHOO.widget.AutoComplete.prototype._extractQuery = function (b) {
  var h = this.delimChar,
    d = -1,
    c,
    f,
    j = h.length - 1,
    g;
  for (; j >= 0; j--) {
    c = b.lastIndexOf(h[j]);
    if (c > d) {
      d = c;
    }
  }
  if (h[j] == " ") {
    for (var a = h.length - 1; a >= 0; a--) {
      if (b[d - 1] == h[a]) {
        d--;
        break;
      }
    }
  }
  if (d > -1) {
    f = d + 1;
    while (b.charAt(f) == " ") {
      f += 1;
    }
    g = b.substring(0, f);
    b = b.substr(f);
  } else {
    g = "";
  }
  return { previous: g, query: b };
};
YAHOO.widget.AutoComplete.prototype._toggleContainerHelpers = function (c) {
  var b = this._elContent.offsetWidth + "px";
  var f = this._elContent.offsetHeight + "px";
  if (this.useIFrame && this._elIFrame) {
    var d = this._elIFrame;
    if (c) {
      d.style.width = b;
      d.style.height = f;
      d.style.padding = "";
    } else {
      d.style.width = 0;
      d.style.height = 0;
      d.style.padding = 0;
    }
  }
  if (this.useShadow && this._elShadow) {
    var a = this._elShadow;
    if (c) {
      a.style.width = b;
      a.style.height = f;
    } else {
      a.style.width = 0;
      a.style.height = 0;
    }
  }
};
YAHOO.widget.AutoComplete.prototype._toggleContainer = function (g) {
  var a = this._elContainer;
  if (this.alwaysShowContainer && this._bContainerOpen) {
    return;
  }
  if (!g) {
    this._toggleHighlight(this._elCurListItem, "from");
    this._nDisplayedItems = 0;
    this._sCurQuery = null;
    if (this._elContent.style.display == "none") {
      return;
    }
  }
  var d = this._oAnim;
  if (d && d.getEl() && (this.animHoriz || this.animVert)) {
    if (d.isAnimated()) {
      d.stop(true);
    }
    var j = this._elContent.cloneNode(true);
    a.appendChild(j);
    j.style.top = "-9000px";
    j.style.width = "";
    j.style.height = "";
    j.style.display = "";
    var k = j.offsetWidth;
    var b = j.offsetHeight;
    var c = this.animHoriz ? 0 : k;
    var l = this.animVert ? 0 : b;
    d.attributes = g
      ? { width: { to: k }, height: { to: b } }
      : { width: { to: c }, height: { to: l } };
    if (g && !this._bContainerOpen) {
      this._elContent.style.width = c + "px";
      this._elContent.style.height = l + "px";
    } else {
      this._elContent.style.width = k + "px";
      this._elContent.style.height = b + "px";
    }
    a.removeChild(j);
    j = null;
    var h = this;
    var f = function () {
      d.onComplete.unsubscribeAll();
      if (g) {
        h._toggleContainerHelpers(true);
        h._bContainerOpen = g;
        h.containerExpandEvent.fire(h);
      } else {
        h._elContent.style.display = "none";
        h._bContainerOpen = g;
        h.containerCollapseEvent.fire(h);
      }
    };
    this._toggleContainerHelpers(false);
    this._elContent.style.display = "";
    d.onComplete.subscribe(f);
    d.animate();
  } else {
    if (g) {
      this._elContent.style.display = "";
      this._toggleContainerHelpers(true);
      this._bContainerOpen = g;
      this.containerExpandEvent.fire(this);
    } else {
      this._toggleContainerHelpers(false);
      this._elContent.style.display = "none";
      this._bContainerOpen = g;
      this.containerCollapseEvent.fire(this);
    }
  }
};
YAHOO.widget.AutoComplete.prototype._toggleHighlight = function (a, b) {
  if (a) {
    var c = this.highlightClassName;
    if (this._elCurListItem) {
      YAHOO.util.Dom.removeClass(this._elCurListItem, c);
      this._elCurListItem = null;
    }
    if (b == "to" && c) {
      YAHOO.util.Dom.addClass(a, c);
      this._elCurListItem = a;
    }
  }
};
YAHOO.widget.AutoComplete.prototype._togglePrehighlight = function (c, b) {
  if (c == this._elCurListItem) {
    return;
  }
  var a = this.prehighlightClassName;
  if (b == "mouseover" && a) {
    YAHOO.util.Dom.addClass(c, a);
  } else {
    YAHOO.util.Dom.removeClass(c, a);
  }
};
YAHOO.widget.AutoComplete.prototype._updateValue = function (f) {
  if (!this.suppressInputUpdate) {
    var b = this._elTextbox;
    var c = this.delimChar ? this.delimChar[0] || this.delimChar : null;
    var g = f._sResultMatch;
    var d = "";
    if (c) {
      d = this._sPastSelections;
      d += g + c;
      if (c != " ") {
        d += " ";
      }
    } else {
      d = g;
    }
    b.value = d;
    if (b.type == "textarea") {
      b.scrollTop = b.scrollHeight;
    }
    var a = b.value.length;
    this._selectText(b, a, a);
    this._elCurListItem = f;
  }
};
YAHOO.widget.AutoComplete.prototype._selectItem = function (a) {
  this._bItemSelected = true;
  this._updateValue(a);
  this._sPastSelections = this._elTextbox.value;
  this._clearInterval();
  this.itemSelectEvent.fire(this, a, a._oResultData);
  this._toggleContainer(false);
};
YAHOO.widget.AutoComplete.prototype._jumpSelection = function () {
  if (this._elCurListItem) {
    this._selectItem(this._elCurListItem);
  } else {
    this._toggleContainer(false);
  }
};
YAHOO.widget.AutoComplete.prototype._moveSelection = function (h) {
  if (this._bContainerOpen) {
    var g = this._elCurListItem,
      a = -1;
    if (g) {
      a = g._nItemIndex;
    }
    var k = h == 40 ? a + 1 : a - 1;
    if (k < -2 || k >= this._nDisplayedItems) {
      return;
    }
    if (g) {
      this._toggleHighlight(g, "from");
      this.itemArrowFromEvent.fire(this, g);
    }
    if (k == -1) {
      if (this.delimChar) {
        this._elTextbox.value = this._sPastSelections + this._sCurQuery;
      } else {
        this._elTextbox.value = this._sCurQuery;
      }
      return;
    }
    if (k == -2) {
      this._toggleContainer(false);
      return;
    }
    var j = this._elList.childNodes[k],
      c = this._elContent,
      b = YAHOO.util.Dom.getStyle(c, "overflow"),
      f = YAHOO.util.Dom.getStyle(c, "overflowY"),
      d = b == "auto" || b == "scroll" || f == "auto" || f == "scroll";
    if (d && k > -1 && k < this._nDisplayedItems) {
      if (h == 40) {
        if (j.offsetTop + j.offsetHeight > c.scrollTop + c.offsetHeight) {
          c.scrollTop = j.offsetTop + j.offsetHeight - c.offsetHeight;
        } else {
          if (j.offsetTop + j.offsetHeight < c.scrollTop) {
            c.scrollTop = j.offsetTop;
          }
        }
      } else {
        if (j.offsetTop < c.scrollTop) {
          this._elContent.scrollTop = j.offsetTop;
        } else {
          if (j.offsetTop > c.scrollTop + c.offsetHeight) {
            this._elContent.scrollTop =
              j.offsetTop + j.offsetHeight - c.offsetHeight;
          }
        }
      }
    }
    this._toggleHighlight(j, "to");
    this.itemArrowToEvent.fire(this, j);
    if (this.typeAhead) {
      this._updateValue(j);
    }
  }
};
YAHOO.widget.AutoComplete.prototype._onContainerMouseover = function (a, c) {
  var b = YAHOO.util.Event.getTarget(a);
  var d = b.nodeName.toLowerCase();
  while (b && d != "table") {
    switch (d) {
      case "body":
        return;
      case "li":
        if (c.prehighlightClassName) {
          c._togglePrehighlight(b, "mouseover");
        } else {
          c._toggleHighlight(b, "to");
        }
        c.itemMouseOverEvent.fire(c, b);
        break;
      case "div":
        if (YAHOO.util.Dom.hasClass(b, "yui-ac-container")) {
          c._bOverContainer = true;
          return;
        }
        break;
      default:
        break;
    }
    b = b.parentNode;
    if (b) {
      d = b.nodeName.toLowerCase();
    }
  }
};
YAHOO.widget.AutoComplete.prototype._onContainerMouseout = function (a, c) {
  var b = YAHOO.util.Event.getTarget(a);
  var d = b.nodeName.toLowerCase();
  while (b && d != "table") {
    switch (d) {
      case "body":
        return;
      case "li":
        if (c.prehighlightClassName) {
          c._togglePrehighlight(b, "mouseout");
        } else {
          c._toggleHighlight(b, "from");
        }
        c.itemMouseOutEvent.fire(c, b);
        break;
      case "ul":
        c._toggleHighlight(c._elCurListItem, "to");
        break;
      case "div":
        if (YAHOO.util.Dom.hasClass(b, "yui-ac-container")) {
          c._bOverContainer = false;
          return;
        }
        break;
      default:
        break;
    }
    b = b.parentNode;
    if (b) {
      d = b.nodeName.toLowerCase();
    }
  }
};
YAHOO.widget.AutoComplete.prototype._onContainerClick = function (a, c) {
  var b = YAHOO.util.Event.getTarget(a);
  var d = b.nodeName.toLowerCase();
  while (b && d != "table") {
    switch (d) {
      case "body":
        return;
      case "li":
        c._toggleHighlight(b, "to");
        c._selectItem(b);
        return;
      default:
        break;
    }
    b = b.parentNode;
    if (b) {
      d = b.nodeName.toLowerCase();
    }
  }
};
YAHOO.widget.AutoComplete.prototype._onContainerScroll = function (a, b) {
  b._focus();
};
YAHOO.widget.AutoComplete.prototype._onContainerResize = function (a, b) {
  b._toggleContainerHelpers(b._bContainerOpen);
};
YAHOO.widget.AutoComplete.prototype._onTextboxKeyDown = function (a, c) {
  var b = a.keyCode;
  if (c._nTypeAheadDelayID != -1) {
    clearTimeout(c._nTypeAheadDelayID);
  }
  switch (b) {
    case 9:
      if (
        (!YAHOO.env.ua.opera &&
          navigator.userAgent.toLowerCase().indexOf("mac") == -1) ||
        YAHOO.env.ua.webkit > 420
      ) {
        if (c._elCurListItem) {
          if (c.delimChar && c._nKeyCode != b) {
            if (c._bContainerOpen) {
              YAHOO.util.Event.stopEvent(a);
            }
          }
          c._selectItem(c._elCurListItem);
        } else {
          c._toggleContainer(false);
        }
      }
      break;
    case 13:
      if (
        (!YAHOO.env.ua.opera &&
          navigator.userAgent.toLowerCase().indexOf("mac") == -1) ||
        YAHOO.env.ua.webkit > 420
      ) {
        if (c._elCurListItem) {
          if (c._nKeyCode != b) {
            if (c._bContainerOpen) {
              YAHOO.util.Event.stopEvent(a);
            }
          }
          c._selectItem(c._elCurListItem);
        } else {
          c._toggleContainer(false);
        }
      }
      break;
    case 27:
      c._toggleContainer(false);
      return;
    case 39:
      c._jumpSelection();
      break;
    case 38:
      if (c._bContainerOpen) {
        YAHOO.util.Event.stopEvent(a);
        c._moveSelection(b);
      }
      break;
    case 40:
      if (c._bContainerOpen) {
        YAHOO.util.Event.stopEvent(a);
        c._moveSelection(b);
      }
      break;
    default:
      c._bItemSelected = false;
      c._toggleHighlight(c._elCurListItem, "from");
      c.textboxKeyEvent.fire(c, b);
      break;
  }
  if (b === 18) {
    c._enableIntervalDetection();
  }
  c._nKeyCode = b;
};
YAHOO.widget.AutoComplete.prototype._onTextboxKeyPress = function (a, c) {
  var b = a.keyCode;
  if (
    YAHOO.env.ua.opera ||
    (navigator.userAgent.toLowerCase().indexOf("mac") != -1 &&
      YAHOO.env.ua.webkit < 420)
  ) {
    switch (b) {
      case 9:
        if (c._bContainerOpen) {
          if (c.delimChar) {
            YAHOO.util.Event.stopEvent(a);
          }
          if (c._elCurListItem) {
            c._selectItem(c._elCurListItem);
          } else {
            c._toggleContainer(false);
          }
        }
        break;
      case 13:
        if (c._bContainerOpen) {
          YAHOO.util.Event.stopEvent(a);
          if (c._elCurListItem) {
            c._selectItem(c._elCurListItem);
          } else {
            c._toggleContainer(false);
          }
        }
        break;
      default:
        break;
    }
  } else {
    if (b == 229) {
      c._enableIntervalDetection();
    }
  }
};
YAHOO.widget.AutoComplete.prototype._onTextboxKeyUp = function (a, c) {
  var d = this.value;
  c._initProps();
  var b = a.keyCode;
  if (c._isIgnoreKey(b)) {
    return;
  }
  if (c._nDelayID != -1) {
    clearTimeout(c._nDelayID);
  }
  c._nDelayID = setTimeout(function () {
    c._sendQuery(d);
  }, c.queryDelay * 1000);
};
YAHOO.widget.AutoComplete.prototype._onTextboxFocus = function (a, b) {
  if (!b._bFocused) {
    b._elTextbox.setAttribute("autocomplete", "off");
    b._bFocused = true;
    b._sInitInputValue = b._elTextbox.value;
    b.textboxFocusEvent.fire(b);
  }
};
YAHOO.widget.AutoComplete.prototype._onTextboxBlur = function (a, b) {
  if (!b._bOverContainer || b._nKeyCode == 9) {
    if (!b._bItemSelected) {
      var c = b._textMatchesOption();
      if (!b._bContainerOpen || (b._bContainerOpen && c === null)) {
        if (b.forceSelection) {
          b._clearSelection();
        } else {
          b.unmatchedItemSelectEvent.fire(b, b._sCurQuery);
        }
      } else {
        if (b.forceSelection) {
          b._selectItem(c);
        }
      }
    }
    b._clearInterval();
    b._bFocused = false;
    if (b._sInitInputValue !== b._elTextbox.value) {
      b.textboxChangeEvent.fire(b);
    }
    b.textboxBlurEvent.fire(b);
    b._toggleContainer(false);
  } else {
    b._focus();
  }
};
YAHOO.widget.AutoComplete.prototype._onWindowUnload = function (a, b) {
  if (b && b._elTextbox && b.allowBrowserAutocomplete) {
    b._elTextbox.setAttribute("autocomplete", "on");
  }
};
YAHOO.widget.AutoComplete.prototype.doBeforeSendQuery = function (a) {
  return this.generateRequest(a);
};
YAHOO.widget.AutoComplete.prototype.getListItems = function () {
  var b = [],
    c = this._elList.childNodes;
  for (var a = c.length - 1; a >= 0; a--) {
    b[a] = c[a];
  }
  return b;
};
YAHOO.widget.AutoComplete._cloneObject = function (d) {
  if (!YAHOO.lang.isValue(d)) {
    return d;
  }
  var b = {};
  if (YAHOO.lang.isFunction(d)) {
    b = d;
  } else {
    if (YAHOO.lang.isArray(d)) {
      var c = [];
      for (var f = 0, g = d.length; f < g; f++) {
        c[f] = YAHOO.widget.AutoComplete._cloneObject(d[f]);
      }
      b = c;
    } else {
      if (YAHOO.lang.isObject(d)) {
        for (var a in d) {
          if (YAHOO.lang.hasOwnProperty(d, a)) {
            if (
              (YAHOO.lang.isValue(d[a]) && YAHOO.lang.isObject(d[a])) ||
              YAHOO.lang.isArray(d[a])
            ) {
              b[a] = YAHOO.widget.AutoComplete._cloneObject(d[a]);
            } else {
              b[a] = d[a];
            }
          }
        }
      } else {
        b = d;
      }
    }
  }
  return b;
};
YAHOO.register("autocomplete", YAHOO.widget.AutoComplete, {
  version: "2.7.0",
  build: "1799",
});
var JSON = JSON || {
  copyright: "(c)2005 JSON.org",
  license: "http://www.crockford.com/JSON/license.html",
  stringify: function (c) {
    var b = [];
    function f(a) {
      b[b.length] = a;
    }
    function d(a) {
      var k, j, g, h;
      switch (typeof a) {
        case "object":
          if (a) {
            if (a instanceof Array) {
              f("[");
              g = b.length;
              for (j = 0; j < a.length; j += 1) {
                h = a[j];
                if (typeof h != "undefined" && typeof h != "function") {
                  if (g < b.length) {
                    f(",");
                  }
                  d(h);
                }
              }
              f("]");
              return;
            } else {
              if (typeof a.valueOf == "function") {
                f("{");
                g = b.length;
                for (j in a) {
                  h = a[j];
                  if (
                    typeof h != "undefined" &&
                    typeof h != "function" &&
                    (!h ||
                      typeof h != "object" ||
                      typeof h.valueOf == "function")
                  ) {
                    if (g < b.length) {
                      f(",");
                    }
                    d(j);
                    f(":");
                    d(h);
                  }
                }
                return f("}");
              }
            }
          }
          f("null");
          return;
        case "number":
          f(isFinite(a) ? +a : "null");
          return;
        case "string":
          g = a.length;
          f('"');
          for (j = 0; j < g; j += 1) {
            k = a.charAt(j);
            if (k >= " ") {
              if (k == "\\" || k == '"') {
                f("\\");
              }
              f(k);
            } else {
              switch (k) {
                case "\b":
                  f("\\b");
                  break;
                case "\f":
                  f("\\f");
                  break;
                case "\n":
                  f("\\n");
                  break;
                case "\r":
                  f("\\r");
                  break;
                case "\t":
                  f("\\t");
                  break;
                default:
                  k = k.charCodeAt();
                  f(
                    "\\u00" +
                      Math.floor(k / 16).toString(16) +
                      (k % 16).toString(16)
                  );
              }
            }
          }
          f('"');
          return;
        case "boolean":
          f(String(a));
          return;
        default:
          f("null");
          return;
      }
    }
    d(c);
    return b.join("");
  },
  parse: function (text) {
    return (
      /^(\s+|[,:{}\[\]]|"(\\["\\\/bfnrtu]|[^\x00-\x1f"\\]+)*"|-?\d+(\.\d*)?([eE][+-]?\d+)?|true|false|null)+$/.test(
        text
      ) && eval("(" + text + ")")
    );
  },
};
(function (a) {
  SpamKiller = (function () {
    var d = false;
    var c = false;
    var b = {
      init: function () {
        b.displayLogout();
        b.bindActions();
      },
      bindActions: function () {
        if (!b.actionsBinded) {
          b.bindToolbar();
          b.bindUsers();
          b.bindLinks();
          b.bindQueueButtons();
          b.actionsBinded = true;
        }
      },
      loadCss: function () {
        if (!b.cssLoaded) {
          a("head").append(
            '<link href="/common--misc/spamkiller/tools.css" rel="stylesheet">'
          );
          b.cssLoaded = true;
        }
      },
      displayLogin: function () {
        b.loadCss();
        b.bindActions();
        var f = a(
          '<div class="sk-toolbar">                         <form>Login: <input type="password" name="password"></form>                     </div>'
        );
        a(".sk-toolbar").remove();
        a(f).appendTo("body");
        a("input", f).focus();
      },
      displayLogout: function () {
        b.loadCss();
        var f = a(
          '<div class="sk-toolbar">                         <span class="logout">Logout</span>                         <span class="sk-more actions" style="display: none;"></span>                         <span class="sk-more log" style="display: none;"></span>                     </div>'
        );
        var g = a(".actions", f);
        a('<span class="sk-queue-button sk-btn-danger">KILL SITE</span>')
          .data("action", "kill")
          .data("type", "site")
          .data("id", WIKIREQUEST.info.siteId)
          .appendTo(g);
        a('<span class="sk-queue-button sk-btn-success">RESTORE SITE</span>')
          .data("action", "restore")
          .data("type", "site")
          .data("id", WIKIREQUEST.info.siteId)
          .appendTo(g);
        a(".sk-toolbar").remove();
        a(f).appendTo("body");
      },
      bindToolbar: function () {
        a("body").on("submit", ".sk-toolbar form", function () {
          a.ajax({
            url: "/killer.php",
            type: "POST",
            data: {
              action: "login",
              password: a("input[name=password]", this).val(),
            },
            dataType: "json",
          }).success(function (g, f, h) {
            if (g.error) {
              b.displayLogin();
            } else {
              b.init();
            }
          });
          return false;
        });
        a("body").on("click", ".sk-toolbar .logout", function () {
          a.ajax({
            url: "/killer.php",
            type: "POST",
            data: { action: "logout" },
          }).success(function () {
            b.displayLogin();
          });
        });
        a("body")
          .on("mouseenter", ".sk-toolbar", function () {
            a(".sk-more", this).show();
          })
          .on("mouseleave", ".sk-toolbar", function () {
            a(".sk-more", this).hide();
          });
      },
      bindUsers: function () {
        a("body")
          .on("mouseenter", ".printuser", function () {
            a(this).addClass("sk-chrome-fix");
            var h = a(this).children("a:first");
            var g = a(this).data("id");
            if (h.length) {
              var f = a(h)
                .attr("onclick")
                .match(/\(([0-9]+)\)/);
              a('<span class="sk-queue-button sk-btn-danger">&#9760;</span>')
                .data("action", "kill")
                .data("type", "user")
                .data("id", f[1])
                .appendTo(this);
            } else {
              if (g) {
                a(
                  '<span class="sk-queue-button sk-btn-success">&#10014;</span>'
                )
                  .data("action", "restore")
                  .data("type", "user")
                  .data("id", g)
                  .appendTo(this);
              }
            }
          })
          .on("mouseleave", ".printuser", function () {
            a(this).removeClass("sk-chrome-fix");
            a(".sk-queue-button", this).remove();
          });
      },
      bindLinks: function () {
        a("body")
          .on("mouseenter", "a", function () {
            var f = a(this)
              .attr("href")
              .match(/^http[s]?:\/\/.*/);
            if (
              f &&
              f[0].indexOf("wikidot.com") == -1 &&
              f[0].indexOf("wikidot.dev") == -1 &&
              f[0].indexOf("wdfiles.com") == -1 &&
              f[0].indexOf("wdfiles.dev") == -1
            ) {
              a(this).addClass("sk-chrome-fix");
              var g = a(
                '<span class="sk-queue-button sk-btn-danger">&#9760;</span>'
              )
                .data("action", "blacklist")
                .data("type", "domain")
                .data("name", f[0])
                .appendTo(this);
              var h = a(
                '<span class="sk-queue-button sk-btn-success">&check;</span>'
              )
                .data("action", "whitelist")
                .data("type", "domain")
                .data("name", f[0])
                .appendTo(this);
            }
          })
          .on("mouseleave", "a", function () {
            a(this).removeClass("sk-chrome-fix");
            a(".sk-queue-button", this).remove();
          });
      },
      bindQueueButtons: function () {
        a("body").on("click", ".sk-queue-button", function () {
          if (!a(this).hasClass("sk-btn-disabled")) {
            a(this)
              .removeClass("sk-btn-danger sk-btn-primary sk-btn-success")
              .addClass("sk-btn-disabled");
            var f = {
              action: "queue",
              options: {
                type: a(this).data("type"),
                action: a(this).data("action"),
                id: a(this).data("id"),
                name: a(this).data("name"),
              },
            };
            a.ajax({
              url: "/killer.php",
              type: "POST",
              data: f,
              dataType: "json",
            }).success(function (h, g, j) {
              if (h.error == "session_disabled") {
                b.displayLogin();
                alert(h.msg);
              } else {
                if (h.error) {
                  a('<div class="error">' + h.msg + "</div>").prependTo(
                    ".sk-toolbar .log"
                  );
                } else {
                  a('<div class="success">' + h.msg + "</div>").prependTo(
                    ".sk-toolbar .log"
                  );
                }
              }
            });
          }
          return false;
        });
      },
    };
    return b;
  })();
})(jQuery);
var OZONE = function () {};
window.$ = function (a) {
  if (a instanceof Object) {
    return a;
  } else {
    return jQuery("#" + a)[0];
  }
};
OZONE.ajax = {
  _callbackArray: new Array(),
  _callbackArrayIndex: 0,
  _javascriptLoadLock: false,
  requestModule: function (c, g, j, a, b) {
    if (!b || !b.noCursorWait) {
      OZONE.visuals.cursorWait();
    }
    if (g == null) {
      g = new Object();
    }
    if (c == null || c == "") {
      c = "Empty";
    }
    g.moduleName = c;
    if (b && b.clearRequestQueue) {
      OZONE.ajax._callbackArray = new Array();
    }
    var h = OZONE.ajax._callbackArrayIndex++;
    OZONE.ajax._callbackArray[h] = { callback: j, arg: a };
    g.callbackIndex = h;
    var d = OZONE.ajax.requestModuleCallback;
    var f = function () {
      var l = OZONE.utils.getCookie("wikidot_token7");
      if (l == null) {
        OZONE.visuals.cursorClear();
        return;
      }
      g.wikidot_token7 = l;
      var k = jQuery.param(g);
      YAHOO.util.Connect.asyncRequest(
        "POST",
        "/ajax-module-connector.php",
        {
          success: function (q) {
            var n = OZONE.ajax.parseResponse(q.responseText);
            if (n.status == "wrong_token7") {
              alert(
                "wikidot.com security error:\n\nYour authentication token in the request is not valid. Please enable cookies in your browser and try to repeat the action.\n\nIf you see this message on the page not associated with the wikidot.com wiki hosting it probably means an indentity theft attempt or improper use of wikidot.com service."
              );
              OZONE.visuals.cursorClear();
              return;
            }
            if (n.status == "try_again") {
              setTimeout(f, n.time_to_wait * 1000);
              return;
            }
            if (
              OZONE.request &&
              OZONE.request.timestamp &&
              n.CURRENT_TIMESTAMP
            ) {
              OZONE.request.timestamp = n.CURRENT_TIMESTAMP;
            }
            var r = n.callbackIndex;
            if (r == null) {
              OZONE.visuals.cursorClear();
              OZONE.dialog.cleanAll();
            }
            if (!OZONE.ajax._callbackArray[r]) {
              return;
            }
            var s = OZONE.ajax._callbackArray[r]["callback"];
            if (!s) {
              alert("internal: callback error");
            }
            var m = OZONE.ajax._callbackArray[r]["arg"];
            if (m != null) {
              s(n, m);
            } else {
              s(n);
            }
            if (n.jsInclude != null) {
              for (var o = 0; o < n.jsInclude.length; o++) {
                OZONE.utils.addJavascriptUrl(n.jsInclude[o]);
              }
            }
            if (n.cssInclude != null) {
              for (var o = 0; o < n.cssInclude.length; o++) {
                OZONE.utils.addStyleUrl(n.cssInclude[o]);
              }
            }
            OZONE.visuals.cursorClear();
          },
          failure: function (m) {
            if ((b && b.ignoreCodeZero && m.status == "0") || !g.action) {
            } else {
              alert(
                "The ajax request failed. Please check your internet connection or\nreport a bug if the error repeats during your work.\ncode:" +
                  m.status
              );
            }
            OZONE.visuals.cursorClear();
            OZONE.dialog.cleanAll();
          },
        },
        k
      );
    };
    f();
  },
  parseResponse: function (a) {
    res = JSON.parse(a);
    if (!res) {
      alert(a.replace(/\r?\n/g, " "));
    }
    return res;
  },
  requestQuickModule: function (a, d, g) {
    if (d == null) {
      d = new Object();
    }
    if (a == null || a == "") {
      alert("Quick module name empty.");
    }
    var f = OZONE.ajax._callbackArrayIndex++;
    OZONE.ajax._callbackArray[f] = g;
    d.callbackIndex = f;
    var c = JSON.stringify(d);
    var b = OZONE.ajax.requestQuickModuleCallback;
    YAHOO.util.Connect.asyncRequest(
      "POST",
      "/quickmodule.php?module=" + a,
      b,
      c
    );
  },
  requestQuickModuleCallback: {
    success: function (b) {
      var a = OZONE.ajax.parseResponse(b.responseText);
      var c = a.callbackIndex;
      var d = OZONE.ajax._callbackArray[c];
      d(a);
    },
    failure: function (a) {
      alert(
        "The ajax request failed. Please check your internet connection or\nreport a bug if the error repeats during your work."
      );
    },
  },
};
OZONE.utils = {
  formToArray: function (d) {
    d = $(d);
    if (d == null) {
      return;
    }
    var c = new Object();
    for (i = 0; i < d.length; i++) {
      var a = d.elements[i];
      var b = a.type;
      if (
        b == "text" ||
        b == "hidden" ||
        b == "password" ||
        b == "select-one" ||
        b == "textarea" ||
        b == "select"
      ) {
        c[a.name] = a.value;
      }
      if (b == "checkbox" && a.checked == true) {
        c[a.name] = "on";
      }
      if (b == "radio" && a.checked == true) {
        c[a.name] = a.value;
      }
    }
    return c;
  },
  arrayToPostData: function (a) {
    if (a == null) {
      return null;
    }
    var b = "";
    var c;
    for (key in a) {
      c = encodeURIComponent(a[key]);
      b += "&" + key + "=" + c;
    }
    if (b.length > 0) {
      b = b.substring(1);
    }
    return b;
  },
  addJavascriptUrl: function (c, f, b) {
    if (
      OZONE.utils._javascripLoadLock &&
      new Date().getTime() < OZONE.utils._javascripLoadLock + 2000
    ) {
      setTimeout(function () {
        OZONE.utils.addJavascriptUrl(c, f, b);
      }, 50);
      return;
    }
    OZONE.utils._javascripLoadLock = false;
    var d = document.getElementsByTagName("head").item(0);
    var a = d.getElementsByTagName("script");
    for (i = 0; i < a.length; i++) {
      if (a[i].getAttribute("src") == c) {
        if (b) {
          if (f) {
            f();
          }
          return;
        }
        d.removeChild(a[i]);
      }
    }
    OZONE.utils._javascripLoadLock = new Date().getTime();
    var g = document.createElement("script");
    g.setAttribute("type", "text/javascript");
    g.setAttribute("src", c);
    if (YAHOO.env.ua.ie) {
      g.onreadystatechange = function () {
        if (this.readyState == "complete" || this.readyState == "loaded") {
          g.onreadystatechange = null;
          OZONE.utils._javascripLoadLock = false;
          if (f) {
            f.call();
          }
        }
      };
    } else {
      YAHOO.util.Event.addListener(g, "load", function () {
        OZONE.utils._javascripLoadLock = false;
        if (f) {
          f.call();
        }
      });
    }
    d.appendChild(g);
  },
  addStyleUrl: function (b, d, a) {
    var c = document.getElementsByTagName("head").item(0);
    var f = c.getElementsByTagName("link");
    for (i = 0; i < f.length; i++) {
      if (f[i].type == "text/css" && f[i].getAttribute("src") == b) {
        if (a) {
          if (d) {
            d();
          }
          return;
        }
        c.removeChild(f[i]);
      }
    }
    var g = document.createElement("link");
    g.rel = "stylesheet";
    g.type = "text/css";
    g.href = b;
    if (d) {
      YAHOO.util.Event.addListener(g, "load", d);
    }
    c.appendChild(g);
  },
  setInnerHTMLContent: function (a, c) {
    var b = $(a);
    if (b) {
      $j(b).html(c);
      OZONE.dialog.hovertip.dominit(b);
    }
  },
  disableEnterKey: function (c) {
    var a;
    var b = c.target ? c.target : c.srcElement;
    if (b.tagName == "TEXTAREA") {
      return true;
    }
    if (window.event) {
      a = window.event.keyCode;
    } else {
      a = c.which;
    }
    if (a == 13) {
      return false;
    } else {
      return true;
    }
  },
  escapeHtml: function (a) {
    if (a == null || a == "") {
      return "";
    }
    return a
      .split("&")
      .join("&amp;")
      .split("<")
      .join("&lt;")
      .split(">")
      .join("&gt;");
  },
  unescapeHtml: function (a) {
    if (a == null || a == "") {
      return "";
    }
    return a
      .split("&gt;")
      .join(">")
      .split("&lt;")
      .join("<")
      .split("&amp;")
      .join("&");
  },
  formatOdate: function (d) {
    var h = $j;
    if (h(d).data("qwert") == true) {
      return;
    }
    h(d).data("qwert", true);
    var f = h(d).classData("time");
    var t = h(d).classData("format");
    t = t.toString();
    var n = false;
    var j = "";
    var g = "";
    var m = new Array(
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December"
    );
    var a = new Array(
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec"
    );
    var A = new Array(
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday"
    );
    var s = new Array("Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat");
    var z = new Date();
    if (!f[0]) {
      var D = h(d).text();
      if (D.match(/^[0-9]+$/)) {
        f = D;
        z.setTime(f * 1000);
        j = z.toLocaleString();
      }
      if (D.match(/^[0-9]+\s*\|.*$/)) {
        f = D.replace(/^([0-9]+)\s*\|.*/, "$1");
        j = D.replace(/^[0-9]+\s*\|\s*(.*?)(?:\|(.*))?$/, "$1");
        g = D.replace(/^[0-9]+\s*\|\s*(.*?)(?:\|(.*))?$/, "$2");
        z.setTime(f * 1000);
        n = true;
      }
    } else {
      z.setTime(f * 1000);
      if (t[0] && t.match(/^.*$/)) {
        j = t.replace(/^\s*(.*?)(?:\|(.*))?$/, "$1");
        g = t.replace(/^\s*(.*?)(?:\|(.*))?$/, "$2");
        n = true;
      } else {
        j = z.toLocaleString();
      }
    }
    if (n) {
      var C;
      h(d).data("timestamp", f);
      j = j.replace(/%r/g, "%I:%M:%S %p");
      j = j.replace(/%R/g, "%H:%M");
      j = j.replace(/%T/g, "%H:%M:%S");
      j = j.replace(/%D/g, "%m/%d/%y");
      j = j.replace(/%a/g, s[z.getDay()]);
      j = j.replace(/%A/g, A[z.getDay()]);
      j = j.replace(/%b/g, a[z.getMonth()]);
      j = j.replace(/%B/g, m[z.getMonth()]);
      j = j.replace(/%c/g, z.toLocaleString());
      C = z.getDate();
      j = j.replace(/%d/g, C < 10 ? "0" + C : C);
      j = j.replace(/%e/g, z.getDate());
      var u = z.getHours();
      j = j.replace(/%H/g, u < 10 ? "0" + u : u);
      var v = ((u - 1) % 12) + 1;
      j = j.replace(/%I/g, v < 10 ? "0" + v : v);
      var B = z.getMonth();
      j = j.replace(/%m/g, B + 1 < 10 ? "0" + (B + 1) : B + 1);
      var r = z.getMinutes();
      j = j.replace(/%M/g, r < 10 ? "0" + r : r);
      j = j.replace(/%p/g, u < 12 ? "AM" : "PM");
      var q = z.getSeconds();
      j = j.replace(/%S/g, q < 10 ? "0" + q : q);
      var l = z.getYear();
      l = l < 10 ? "0" + l : "" + l;
      j = j.replace(/%y/g, l.substring(l.length - 2));
      var c = z.getFullYear();
      j = j.replace(/%Y/g, c);
      if (j.match(/%z/i)) {
        var x;
        x = z.toLocaleString().replace(/^.*?([A-Z]{3,}(?:\+[0-9]+)?).*$/, "$1");
        if (x == z.toLocaleString()) {
          var o = z.getTimezoneOffset();
          if (o == 0) {
            x = "GMT";
          } else {
            o = -o / 60;
            if (Math.abs(o) < 10) {
              o = o.toString().replace(/([0-9])/, "0$1");
            }
            x = (o > 0 ? "+" : "") + o;
            x = x.replace(/\.5/, "30");
            x = "GMT" + x;
          }
        }
        j = j.replace(/%z/gi, x);
      }
      if (j.match(/%O/) || g.match(/agohover/)) {
        var w = OZONE.request.timestamp - f;
        w += Math.floor(
          (new Date().getTime() - OZONE.request.date.getTime()) * 0.001
        );
        var k = OZONE.utils.calculateDateAgo(Math.abs(w));
        j = j.replace(/%O/, k);
        if (g.match(/agohover/)) {
          var b = k + " " + (w < 0 ? ogettext("till") : ogettext("ago"));
          OZONE.dialog.hovertip.makeTip(d, {
            text: b,
            style: { width: "auto" },
          });
          YAHOO.util.Event.addListener(d, "mouseover", function (H) {
            var F = $j;
            var G = OZONE.request.timestamp - F(this).data("timestamp");
            G += Math.floor(
              (new Date().getTime() - OZONE.request.date.getTime()) * 0.001
            );
            var E = OZONE.utils.calculateDateAgo(Math.abs(G));
            var y = E + " " + (G < 0 ? ogettext("till") : ogettext("ago"));
            this.hovertip.getElementsByTagName("div").item(0).innerHTML = y;
          });
        }
      }
    }
    if (j) {
      h(d).html(OZONE.utils.escapeHtml(j)).show();
    }
  },
  calculateDateAgo: function (d) {
    var a;
    if (d >= 60 * 60 * 24) {
      var f = Math.floor(d / (60 * 60 * 24));
      a = "" + f + " " + (f > 1 ? ogettext("days") : ogettext("day"));
    } else {
      if (d >= 60 * 60) {
        var b = Math.floor(d / (60 * 60));
        a = "" + b + " " + (b > 1 ? ogettext("hours") : ogettext("hour"));
      } else {
        if (d >= 60) {
          var c = Math.floor(d / 60);
          a = "" + c + " " + (c > 1 ? ogettext("minutes") : ogettext("minute"));
        } else {
          if (d == 0) {
            d++;
          }
          a = "" + d + " " + (d > 1 ? ogettext("seconds") : ogettext("second"));
        }
      }
    }
    return a;
  },
  loadPage: function (b, d) {
    var c = document.createElement("form");
    for (p in d) {
      var a = document.createElement("input");
      a.type = "hidden";
      a.name = p;
      a.value = d[p];
      c.appendChild(a);
    }
    c.name = "loadPageForm";
    c.action = b;
    c.method = "post";
    c.display = "none";
    c.target = "_self";
    document.getElementsByTagName("body").item(0).appendChild(c);
    c.submit();
  },
  getCookie: function (c) {
    if (document.cookie.length > 0) {
      var b = document.cookie.indexOf(c + "=");
      if (b != -1) {
        b = b + c.length + 1;
        var a = document.cookie.indexOf(";", b);
        if (a == -1) {
          a = document.cookie.length;
        }
        return unescape(document.cookie.substring(b, a));
      }
    }
    return null;
  },
  olang: function (a) {
    return a.replace(/\[\[olang (.*?)\|\]\]/g, function (j, h, g, c) {
      var f = OZONE.lang;
      var b = new RegExp(f + ":([^|]*)(||]])");
      var d = j.match(b);
      if (d) {
        return d[1];
      }
    });
  },
};
OZONE.lang = "en";
OZONE.loc = {};
OZONE.loc.messages = {};
OZONE.loc.addMessages = function (a, c) {
  if (!OZONE.loc.messages[c]) {
    OZONE.loc.messages[c] = {};
  }
  for (var b in a) {
    OZONE.loc.messages[c][b] = a[b];
  }
};
OZONE.loc.addMessage = function (b, a, c) {
  if (!OZONE.loc.messages[c]) {
    OZONE.loc.messages[c] = {};
  }
  OZONE.loc.messages[c][b] = a;
};
OZONE.loc.getMessage = function (a, b) {
  if (OZONE.loc.messages[b]) {
    if (OZONE.loc.messages[b][a]) {
      return OZONE.loc.messages[b][a];
    }
  }
  return a;
};
ogettext = function (a) {
  return OZONE.loc.getMessage(a, OZONE.lang);
};
OZONE.visuals = {
  cursorWait: function () {
    var a = document.getElementsByTagName("body")[0];
    YAHOO.util.Dom.addClass(a, "wait");
  },
  cursorClear: function () {
    var a = document.getElementsByTagName("body")[0];
    YAHOO.util.Dom.removeClass(a, "wait");
  },
  scrollTo: function (a, b) {
    a = a == "header" ? "body" : "#" + a;
    jQuery("body").scrollTo(a, 0);
  },
  scrollOffsetY: function () {
    var a;
    if (self.pageYOffset) {
      a = self.pageYOffset;
    } else {
      if (document.documentElement && document.documentElement.scrollTop) {
        a = document.documentElement.scrollTop;
      } else {
        if (document.body) {
          a = document.body.scrollTop;
        }
      }
    }
    return a;
  },
  bodyHeight: function () {
    var a, d;
    var c = document.body.scrollHeight;
    var b = document.body.offsetHeight;
    if (c > b) {
      return document.body.scrollHeight;
    } else {
      return document.body.offsetHeight;
    }
  },
  initScroll: function () {
    if (window.location.hash != null && window.location.href != "") {
      var a = window.location.hash.replace(/#/, "");
      if (a != null && a != "" && $(a)) {
        OZONE.visuals.scrollTo(a, { blink: true });
      }
    }
  },
  highlightText: function (h, k) {
    if (k.indexOf(" ") != -1) {
      var a = k.split(/ +/);
      for (var c = 0; c < a.length; c++) {
        if (!a[c].match(/^\-/)) {
          OZONE.visuals.highlightText(h, a[c]);
        }
      }
      return;
    }
    h = $(h);
    if (!h) {
      return;
    }
    if (h.hasChildNodes) {
      var f = h.childNodes;
      for (var c = f.length - 1; c >= 0; c--) {
        OZONE.visuals.highlightText(f[c], k);
      }
    }
    if (h.nodeType == 3) {
      var b = new RegExp(k, "gi");
      if (h.nodeValue.match(b)) {
        var d = (" " + h.nodeValue + " ").split(b);
        p = h.parentNode;
        for (var c = 0; c < d.length; c++) {
          if (c != 0) {
            var j = document.createElement("span");
            j.className = "search-highlight";
            j.appendChild(document.createTextNode(k));
            p.insertBefore(j, h);
          }
          var g = document.createTextNode(d[c]);
          if (c != d.length - 1) {
            p.insertBefore(g, h);
          } else {
            p.replaceChild(g, h);
          }
        }
      }
    }
  },
};
OZONE.forms = {};
OZONE.forms.lengthLimiter = function (b, c, a) {
  this.textElement = $(b);
  this.countElement = $(c);
  this.limit = a;
  YAHOO.util.Event.addListener(
    this.textElement,
    "keyup",
    this.keyListener,
    this,
    true
  );
  this.keyListener();
};
OZONE.forms.lengthLimiter.prototype.keyListener = function (c) {
  if (this.textElement == null) {
    return;
  }
  var a = this.textElement.value.replace(/\r\n/, "\n").length;
  this.countElement.innerHTML = this.limit - a;
  if (a > this.limit) {
    var b = this.textElement.scrollTop;
    this.textElement.value = this.textElement.value.substr(0, this.limit);
    this.textElement.scrollTop = b;
    a = this.textElement.value.replace(/\r\n/, "\n").length;
    this.countElement.innerHTML = this.limit - a;
  }
};
OZONE.dom = {
  insertAfter: function (a, c, b) {
    if (b.nextSibling) {
      a.insertBefore(c, b.nextSibling);
    } else {
      a.appendChild(c);
    }
  },
  onDomReady: function (c, b, d) {
    if (!d) {
      d = document;
    }
    if (
      typeof d.getElementsByTagName != "undefined" &&
      (d.getElementsByTagName("body")[0] != null || d.body != null) &&
      (typeof b != "string" || $(b))
    ) {
      if (typeof c == "function") {
        c();
      } else {
        OZONE.dom.onDomReady.fs[c].call();
      }
    } else {
      var g;
      if (typeof c == "function") {
        if (!OZONE.dom.onDomReady.fs) {
          OZONE.dom.onDomReady.fs = new Array();
        }
        g = OZONE.dom.onDomReady.fs.push(c) - 1;
      } else {
        g = c;
      }
      var a = "OZONE.dom.onDomReady(" + g;
      if (typeof b == "string") {
        a += ',"' + b + '"';
      }
      a += ")";
      setTimeout(a, 200);
    }
  },
};
OZONE.request = {};
OZONE.init = function () {};
OZONE.dialog = {};
var Class = {
  create: function () {
    return function () {
      this.initialize.apply(this, arguments);
    };
  },
};
Object.extend = function (a, b) {
  for (property in b) {
    a[property] = b[property];
  }
  return a;
};
OZONE.dialog.stock = new Array();
OZONE.dialog.cleanAll = function (a) {
  var b;
  if (!a || typeof a.timeout != "number") {
    b = 200;
  } else {
    b = a.timeout;
  }
  setTimeout("OZONE.dialog.factory.boxcontainer().hide()", b);
  setTimeout("OZONE.dialog.factory.shader().hide()", b);
};
OZONE.dialog.factory = {
  shader: function () {
    if (OZONE.dialog.factory.stock.shader == null) {
      OZONE.dialog.factory.stock.shader = new OZONE.dialog.shader();
    }
    return OZONE.dialog.factory.stock.shader;
  },
  boxcontainer: function () {
    if (OZONE.dialog.factory.stock.boxcontainer == null) {
      OZONE.dialog.factory.stock.boxcontainer =
        new OZONE.dialog.boxcontainer2();
    }
    return OZONE.dialog.factory.stock.boxcontainer;
  },
};
OZONE.dialog.factory.stock = {};
OZONE.dialog.shader = function () {
  this.color = null;
  this.cssClass = null;
  this.setColor = function (a) {
    this.color = a;
  };
  this.show = function () {
    var c = document.getElementById("odialog-shader");
    if (c != null) {
      return;
    }
    c = document.createElement("div");
    c.id = "odialog-shader";
    var a = document.getElementsByTagName("body").item(0);
    if (this.color != null) {
      c.style.backgroundColor = this.color;
    }
    if (this.cssClass != null) {
      c.className = this.cssClass;
    } else {
      c.className = "odialog-shader";
    }
    var b = document.createElement("iframe");
    b.id = "odialog-shader-iframe";
    b.src = "/common--misc/blank.html";
    b.frameBorder = 0;
    b.className = "odialog-shader-iframe";
    a.appendChild(b);
    a.appendChild(c);
  };
  this.hide = function () {
    var a = document.getElementsByTagName("body").item(0);
    var c = $("odialog-shader");
    var b = $("odialog-shader-iframe");
    if (c != null) {
      a.removeChild(c);
    }
    if (b != null) {
      a.removeChild(b);
    }
  };
};
OZONE.dialog.boxcontainer2 = function () {
  this.mDiv = null;
  this.cDiv = null;
  this.init = function () {
    var b = $("odialog-container");
    if (!b) {
      b = document.createElement("div");
      b.id = "odialog-container";
      var a = document.getElementsByTagName("body").item(0);
      a.appendChild(b);
      this.mDiv = b;
    }
    b.style.display = "block";
  };
  this.setContent = function (f) {
    this.clearContent();
    if (typeof f == "string") {
      $j(this.mDiv).html(f);
    } else {
      this.mDiv.appendChild(f);
    }
    OZONE.dialog.hovertip.dominit(this.mDiv, { delay: 300 });
    var d = this.mDiv.getElementsByTagName("div").item(0);
    this.cDiv = d;
    this.mDiv.style.display = "block";
    this.centerContent();
    d.id = "owindow-1";
    var c = d.getElementsByTagName("div");
    var b;
    for (b in c) {
      if (c[b].className == "title") {
        c[b].id = "ohandle-1";
        var a = new YAHOO.util.DD(this.cDiv.id);
        a.setHandleElId(c[b].id);
      }
      if (c[b].className == "close") {
        YAHOO.util.Event.addListener(c[b], "click", OZONE.dialog.cleanAll);
      }
    }
  };
  this.attachDD = function () {
    var c = this.cDiv.getElementsByTagName("div");
    var b;
    for (b in c) {
      if (c[b].className == "title") {
        c[b].id = "ohandle-1";
        var a = new YAHOO.util.DD(this.cDiv.id);
        a.setHandleElId(c[b].id);
      }
      if (c[b].className == "close") {
        YAHOO.util.Event.addListener(c[b], "click", OZONE.dialog.cleanAll);
      }
    }
  };
  this.clearContent = function () {
    this.cDiv = null;
    $j(this.mDiv).html("");
  };
  this.centerContent = function () {
    var d = this.cDiv;
    var a = d.offsetHeight;
    var c = d.offsetWidth;
    var f = YAHOO.util.Dom.getClientHeight();
    var b = YAHOO.util.Dom.getClientWidth();
    var h = Math.max((b - c) * 0.5, 0);
    var g = Math.max(OZONE.visuals.scrollOffsetY() + (f - a) * 0.5, 0);
    h = Math.max(0, h);
    g = Math.max(0, g);
    YAHOO.util.Dom.setXY(d, [h, g]);
  };
  this.setContentObject = function (a) {
    this.mDiv.appendChild(a);
  };
  (this.showContent = function (a) {
    this.mDiv.style.display = "block";
    if (a && a.smooth == true) {
      $j(this.cDiv).fadeIn(200);
    } else {
      $j(this.cDiv).show();
    }
  }),
    (this.hideContent = function () {
      $j(this.cDiv).hide();
    });
  this.hide = function (a) {
    if (a && a.smooth == true) {
      $(this.cDiv).fadeOut(200);
    }
    this.clearContent();
    $("odialog-container").style.display = "none";
  };
  this.clickOutsideToHide = function (a) {
    YAHOO.util.Event.addListener(
      "odialog-shader",
      "click",
      OZONE.dialog.cleanAll
    );
  };
  this.changeContent = function (a) {
    this.setContent(a);
    this.showContent();
  };
  this.init();
};
OZONE.dialog.hovertip = {
  container: null,
  bindings: new Array(),
  init: function () {
    var b = $("odialog-hovertips");
    if (!b) {
      b = document.createElement("div");
      b.id = "odialog-hovertips";
      b.style.position = "absolute";
      b.style.zIndex = 100;
      b.style.top = 0;
      b.style.width = "100%";
      var a = document.getElementsByTagName("body").item(0);
      a.appendChild(b);
      OZONE.dialog.hovertip.container = b;
    }
  },
  makeTip: function (d, m) {
    if (typeof d != "string" && d.length > 0) {
      for (var f = 0; f < d.length; f++) {
        OZONE.dialog.hovertip.makeTip(d[f], m);
      }
    }
    OZONE.dialog.hovertip.init();
    var g = document.getElementsByTagName("body").item(0);
    var b = $(d);
    if (!b) {
      return;
    }
    if (b.hovertip) {
      return;
    }
    var a;
    if (m && m.context) {
      a = $(m.context);
      if (!a) {
        return;
      }
    } else {
      if (m && m.text) {
        a = document.createElement("div");
        a.innerHTML = '<div class="content">' + m.text + "</div>";
      } else {
        var h;
        if (b.attributes) {
          for (var j = 0; j < b.attributes.length; j++) {
            if (b.attributes[j].nodeName.toLowerCase() == "title") {
              h = b.attributes[j].nodeValue;
              b.attributes[j].nodeValue = "";
            }
          }
        }
        if (!h) {
          return;
        }
        a = document.createElement("div");
        a.innerHTML = '<div class="content">' + h + "</div>";
      }
    }
    if (!a.className.match(/hovertip/)) {
      a.className = "hovertip " + a.className;
    }
    if (m) {
      b.hovertipOptions = m;
    }
    if (m && m.style) {
      for (var k in m.style) {
        a.style[k] = m.style[k];
      }
    }
    var l = a.getElementsByTagName("div");
    var c = false;
    for (var f = 0; f < l.length; f++) {
      if (YAHOO.util.Dom.hasClass(l[f], "content")) {
        c = true;
      }
    }
    if (!c) {
      a.innerHTML = '<div class="content">' + a.innerHTML + "</div>";
    }
    b.hovertip = a;
    a.style.position = "absolute";
    a.style.display = "none";
    a.style.border = "1px solid black";
    if (b.tagName.toLowerCase() != "a" && (!m || !m.noCursorHelp)) {
      b.style.cursor = "help";
    }
    $("odialog-hovertips").appendChild(a);
    OZONE.dialog.hovertip.bindings.push([b, a]);
    YAHOO.util.Event.addListener(
      b,
      "mousemove",
      OZONE.dialog.hovertip._mousemove
    );
    YAHOO.util.Event.addListener(
      b,
      "mouseout",
      OZONE.dialog.hovertip._mouseout
    );
    YAHOO.util.Event.addListener(
      b,
      "mouseover",
      OZONE.dialog.hovertip._mouseover
    );
    return;
  },
  _mouseover: function (d) {
    var b = YAHOO.util.Event.getTarget(d);
    var c = b.hovertip;
    c.style.display = "block";
    var a = b.hovertipOptions;
    YAHOO.util.Dom.setXY(b.hovertip, [0, 0]);
    OZONE.dialog.hovertip._mousemove(d);
    console.log(c);
    $j(c).fadeIn(50);
  },
  _mousemove: function (j) {
    var c = YAHOO.util.Event.getTarget(j);
    var b = c.hovertip;
    var l = 0;
    var k = 0;
    if (!j) {
      var j = window.event;
    }
    if (j.pageX || j.pageY) {
      l = j.pageX;
      k = j.pageY;
    } else {
      if (j.clientX || j.clientY) {
        l = j.clientX + document.documentElement.scrollLeft;
        k = j.clientY + document.documentElement.scrollTop;
      }
    }
    var m = YAHOO.util.Dom.getViewportHeight();
    var a = YAHOO.util.Dom.getViewportWidth();
    var g = b.offsetHeight;
    var f = b.offsetWidth;
    var d = 20;
    if (c.hovertipOptions && c.hovertipOptions.smartWidthLimit) {
      var h = c.hovertipOptions.smartWidthLimit;
      if (f > h * a) {
        b.style.width = h * a + "px";
      }
    }
    if (c.hovertipOptions && c.hovertipOptions.valign) {
      switch (c.hovertipOptions.valign) {
        case "center":
          if (m - j.clientY < g + 2 * d && j.clientY > g + 1.5 * d) {
            k -= g + 1.5 * d;
          }
          k += d;
          l = j.clientX - f * 0.5;
          if (l + f > a - d) {
            l = a - f - d;
          }
          if (l < d) {
            l = d;
          }
      }
    } else {
      if (a - j.clientX < f + 2 * d && j.clientX > f + 1.5 * d) {
        l -= f + 1.5 * d;
      }
      if (m - j.clientY < g + 2 * d && j.clientY > g + 1.5 * d) {
        k -= g + 1.5 * d;
      }
      l += d;
      k += d;
    }
    YAHOO.util.Dom.setXY(b, [l, k]);
  },
  _mouseout: function (c) {
    var a = YAHOO.util.Event.getTarget(c);
    var b = a.hovertip;
    b.style.display = "none";
  },
  dominit: function (j, b) {
    OZONE.dialog.hovertip.init();
    var f;
    if (j) {
      f = $(j).getElementsByTagName("div");
    } else {
      f = document.getElementsByTagName("div");
    }
    var d = new Array();
    for (var c = 0; c < f.length; c++) {
      if (f[c].id.match(/\-hovertip$/)) {
        d.push(f[c]);
      }
    }
    for (var c = 0; c < d.length; c++) {
      var h = d[c];
      var a = h.id.replace(/\-hovertip$/, "");
      var g = $(a);
      if (g) {
        if (!b) {
          var b = new Object();
        }
        b.context = h;
        OZONE.dialog.hovertip.makeTip(g, b);
      }
    }
  },
  hideAll: function () {
    var a = $("odialog-hovertips");
    if (a) {
      var c = a.getElementsByTagName("div");
      for (var b = 0; b < c.length; b++) {
        if (c[b].className.match(/hovertip/)) {
          c[b].style.display = "none";
        }
      }
    }
  },
};
OZONE.dialogs = {};
OZONE.dialogs.Base = function () {};
OZONE.dialogs.Base.prototype = {
  initialize: function () {
    this.templateBase = "/common--dialogs/";
    this.template = "";
    this.title = null;
    this.buttons = new Array();
    this.buttonObjects = new Array();
    this.clickOutsideToClose = false;
    this.smooth = false;
    this.focusButton = null;
    this.buttonListeners = new Object();
    this.windowClass = "";
    this.content = "";
    this.windowDiv = null;
    this.fixODate = true;
    this.style = new Object();
  },
  setButtons: function (a) {},
  addButtonListener: function (c, b, a) {
    this.buttonListeners[c] = b;
  },
  show: function () {
    var d = document.createElement("div");
    this.windowDiv = d;
    d.className = "owindow " + this.windowClass;
    var k;
    for (k in this.style) {
      d.style[k] = this.style[k];
    }
    var m = document.createElement("div");
    $j(m).html(this.content);
    if (
      m.getElementsByTagName("div").item(0) &&
      YAHOO.util.Dom.hasClass(m.getElementsByTagName("div").item(0), "owindow")
    ) {
      d = m.getElementsByTagName("div").item(0);
    } else {
      if (
        YAHOO.util.Dom.getElementsByClassName("content", "div", m).length == 1
      ) {
        $j(d).html(m.innerHTML);
      } else {
        if (this.title != null) {
          var b = document.createElement("div");
          b.className = "title modal-header";
          $j(b).html(this.title);
          d.appendChild(b);
        }
        var c = m;
        c.className = "content modal-body";
        d.appendChild(c);
        if (this.buttons.length > 0) {
          var f = document.createElement("div");
          f.className = "button-bar modal-footer";
          for (var g = 0; g < this.buttons.length; g++) {
            var l = this.buttons[g];
            var h = document.createElement("a");
            h.href = "javascript:;";
            h.innerHTML = ogettext(l);
            h.className =
              "btn btn-default button button-" +
              l.toLowerCase().replace(/ /g, "-");
            if (this.buttonListeners[l]) {
              YAHOO.util.Event.addListener(
                h,
                "click",
                this.buttonListeners[l],
                this,
                true
              );
            }
            f.appendChild(h);
            this.buttonObjects[l] = h;
          }
          d.appendChild(f);
        }
      }
    }
    OZONE.dialog.factory.shader().show();
    var a = OZONE.dialog.factory.boxcontainer();
    a.setContent(d);
    if (this.smooth == true) {
      a.showContent({ smooth: true });
    } else {
      a.showContent();
    }
    if (this.clickOutsideToClose) {
      a.clickOutsideToHide();
    }
    if (this.focusButton && this.buttonObjects[this.focusButton]) {
      this.buttonObjects[this.focusButton].focus();
    }
  },
  hide: function () {
    $j(this.windowDiv).fadeOut(100);
  },
  close: function () {
    this.hide();
    OZONE.dialog.cleanAll({ timeout: 200 });
  },
};
OZONE.dialogs.SmallInfoBox = Class.create();
OZONE.dialogs.SmallInfoBox.prototype = Object.extend(new OZONE.dialogs.Base(), {
  initialize: function () {
    OZONE.dialogs.Base.prototype.initialize.call(this);
    this.smooth = true;
    this.windowClass = "o-infobox";
  },
});
OZONE.dialogs.WaitBox = Class.create();
OZONE.dialogs.WaitBox.prototype = Object.extend(new OZONE.dialogs.Base(), {
  initialize: function () {
    OZONE.dialogs.Base.prototype.initialize.call(this);
    this.smooth = true;
    this.windowClass = "owait";
  },
});
OZONE.dialogs.SuccessBox = Class.create();
OZONE.dialogs.SuccessBox.prototype = Object.extend(new OZONE.dialogs.Base(), {
  initialize: function () {
    OZONE.dialogs.Base.prototype.initialize.call(this);
    this.smooth = true;
    this.windowClass = "osuccess";
    this.timeout = 1500;
  },
});
OZONE.dialogs.SuccessBox.prototype.show = function () {
  OZONE.dialogs.Base.prototype.show.call(this);
  if (this.timeout) {
    setTimeout("OZONE.dialog.cleanAll()", this.timeout);
  }
};
OZONE.dialogs.ErrorDialog = Class.create();
OZONE.dialogs.ErrorDialog.prototype = Object.extend(new OZONE.dialogs.Base(), {
  initialize: function () {
    OZONE.dialogs.Base.prototype.initialize.call(this);
    this.windowClass = "error";
    this.title = "Error";
    var a = "close message";
    this.buttons = [a];
    this.addButtonListener(a, this.close);
    this.focusButton = a;
  },
});
OZONE.dialogs.ConfirmationDialog = Class.create();
OZONE.dialogs.ConfirmationDialog.prototype = Object.extend(
  new OZONE.dialogs.Base(),
  {
    initialize: function () {
      OZONE.dialogs.Base.prototype.initialize.call(this);
      this.windowClass = "confirmation";
      this.title = "Confirmation";
    },
  }
);
OZONE.dialogs.SuccessDialog = Class.create();
OZONE.dialogs.SuccessDialog.prototype = Object.extend(
  new OZONE.dialogs.Base(),
  {
    initialize: function () {
      OZONE.dialogs.Base.prototype.initialize.call(this);
      this.smooth = true;
      this.windowClass = "confirm";
      this.title = "Success";
      this.buttons = ["close message"];
      this.addButtonListener("close message", this.close);
      this.focusButton = "close message";
    },
  }
);
OZONE.dialogs.InfoDialog = Class.create();
OZONE.dialogs.InfoDialog.prototype = Object.extend(new OZONE.dialogs.Base(), {
  initialize: function () {
    OZONE.dialogs.Base.prototype.initialize.call(this);
    this.smooth = true;
    this.windowClass = "info";
    this.title = " ";
    this.buttons = ["close window"];
    this.addButtonListener("close window", this.close);
    this.focusButton = "close window";
  },
});
OZONE.dialogs.ActionDialog = Class.create();
OZONE.dialogs.ActionDialog.prototype = Object.extend(new OZONE.dialogs.Base(), {
  initialize: function () {
    OZONE.dialogs.Base.prototype.initialize.call(this);
    this.smooth = true;
    this.windowClass = "info";
    this.title = " ";
    this.buttons = ["Cancel"];
    this.addButtonListener("Cancel", this.close);
    this.focusButton = "Cancel";
  },
});
OZONE.dialogs.Dialog = Class.create();
OZONE.dialogs.Dialog.prototype = Object.extend(new OZONE.dialogs.Base(), {
  initialize: function () {
    OZONE.dialogs.Base.prototype.initialize.call(this);
    this.title = "";
  },
});
function exinfo2() {
  this.show = function () {
    var b = OZONE.dialog.factory.shader();
    b.show();
    var a = OZONE.dialog.factory.boxcontainer();
    a.setContent('<div class="box444">DUPA</div>');
    a.showContent();
  };
}
function listener1() {
  var a = new OZONE.dialog.shader();
  a.show();
}
function listener2() {
  e = new exinfo2();
  e.show();
}
function testdialog() {
  var a = new OZONE.dialogs.Base();
  a.template = "Warning";
  a.content = "dupowy content";
  a.buttons = ["cancel", "Ok"];
  a.addButtonListener("cancel", a.close);
  a.smooth = true;
  a.show();
}
function testdialog2() {
  var a = new OZONE.dialogs.ErrorDialog();
  a.content = "<h1>Error processing template...</h1>test";
  a.show();
}
function testdialog3() {
  var a = new OZONE.dialogs.SuccessBox();
  a.content = "Loading file...";
  a.timeout = 1000;
  a.show();
}
