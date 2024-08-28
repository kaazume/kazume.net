var app = function() {
    "use strict";
    function t() {}
    function e(t) {
        return t()
    }
    function n() {
        return Object.create(null)
    }
    function r(t) {
        t.forEach(e)
    }
    function o(t) {
        return "function" == typeof t
    }
    function c(t, e) {
        return t != t ? e == e : t !== e || t && "object" == typeof t || "function" == typeof t
    }
    function u(t, e) {
        t.appendChild(e)
    }
    function a(t) {
        return document.createElement(t)
    }
    function s() {
        return t = " ",
        document.createTextNode(t);
        var t
    }
    function i(t, e, n, r) {
        return t.addEventListener(e, n, r),
        () => t.removeEventListener(e, n, r)
    }
    function l(t, e, n) {
        null == n ? t.removeAttribute(e) : t.getAttribute(e) !== n && t.setAttribute(e, n)
    }
    let f;
    function d(t) {
        f = t
    }
    function p(t) {
        (function() {
            if (!f)
                throw new Error("Function called outside component initialization");
            return f
        }
        )().$$.on_mount.push(t)
    }
    const m = []
      , h = []
      , g = []
      , $ = []
      , y = Promise.resolve();
    let v = !1;
    function b(t) {
        g.push(t)
    }
    let _ = !1;
    const x = new Set;
    function w() {
        if (!_) {
            _ = !0;
            do {
                for (let t = 0; t < m.length; t += 1) {
                    const e = m[t];
                    d(e),
                    E(e.$$)
                }
                for (m.length = 0; h.length; )
                    h.pop()();
                for (let t = 0; t < g.length; t += 1) {
                    const e = g[t];
                    x.has(e) || (x.add(e),
                    e())
                }
                g.length = 0
            } while (m.length);
            for (; $.length; )
                $.pop()();
            v = !1,
            _ = !1,
            x.clear()
        }
    }
    function E(t) {
        if (null !== t.fragment) {
            t.update(),
            r(t.before_update);
            const e = t.dirty;
            t.dirty = [-1],
            t.fragment && t.fragment.p(t.ctx, e),
            t.after_update.forEach(b)
        }
    }
    const A = new Set;
    function T(t, e) {
        -1 === t.$$.dirty[0] && (m.push(t),
        v || (v = !0,
        y.then(w)),
        t.$$.dirty.fill(0)),
        t.$$.dirty[e / 31 | 0] |= 1 << e % 31
    }
    function k(c, u, a, s, i, l, p=[-1]) {
        const m = f;
        d(c);
        const h = u.props || {}
          , g = c.$$ = {
            fragment: null,
            ctx: null,
            props: l,
            update: t,
            not_equal: i,
            bound: n(),
            on_mount: [],
            on_destroy: [],
            before_update: [],
            after_update: [],
            context: new Map(m ? m.$$.context : []),
            callbacks: n(),
            dirty: p
        };
        let $ = !1;
        var y, v;
        g.ctx = a ? a(c, h, (t, e, ...n) => {
            const r = n.length ? n[0] : e;
            return g.ctx && i(g.ctx[t], g.ctx[t] = r) && (g.bound[t] && g.bound[t](r),
            $ && T(c, t)),
            e
        }
        ) : [],
        g.update(),
        $ = !0,
        r(g.before_update),
        g.fragment = !!s && s(g.ctx),
        u.target && (u.hydrate ? g.fragment && g.fragment.l(function(t) {
            return Array.from(t.childNodes)
        }(u.target)) : g.fragment && g.fragment.c(),
        u.intro && ((y = c.$$.fragment) && y.i && (A.delete(y),
        y.i(v))),
        function(t, n, c) {
            const {fragment: u, on_mount: a, on_destroy: s, after_update: i} = t.$$;
            u && u.m(n, c),
            b( () => {
                const n = a.map(e).filter(o);
                s ? s.push(...n) : r(n),
                t.$$.on_mount = []
            }
            ),
            i.forEach(b)
        }(c, u.target, u.anchor),
        w()),
        d(m)
    }
    function C(e) {
        let n, o, c, f, d, p, m, h, g;
        return {
            c() {
                n = a("main"),
                o = a("h1"),
                o.textContent = "カーソルを当てると手が乾くぞ！",
                c = s(),
                f = a("img"),
                p = s(),
                m = a("map"),
                h = a("area"),
                l(f, "class", "hand-dryer svelte-4mvow8"),
                l(f, "usemap", "#sample"),
                f.src !== (d = "handdryer.png") && l(f, "src", "handdryer.png"),
                l(f, "alt", "ハンドドライヤー"),
                l(h, "shape", "rect"),
                l(h, "alt", "四角形"),
                l(h, "coords", "40,220,200,320"),
                l(h, "class", "svelte-4mvow8"),
                l(m, "name", "sample"),
                l(n, "class", "svelte-4mvow8")
            },
            m(t, r) {
                !function(t, e, n) {
                    t.insertBefore(e, n || null)
                }(t, n, r),
                u(n, o),
                u(n, c),
                u(n, f),
                u(n, p),
                u(n, m),
                u(m, h),
                g = [i(h, "mouseover", e[0]), i(h, "mouseleave", e[1])]
            },
            p: t,
            i: t,
            o: t,
            d(t) {
                var e;
                t && (e = n).parentNode.removeChild(e),
                r(g)
            }
        }
    }
    function N(t) {
        let e;
        p( () => {
            e = new Audio("dryer.mp3"),
            e.load()
        }
        );
        setInterval( () => {
            e && n && e.currentTime >= 2.5 && (e.currentTime = 0)
        }
        , 100);
        let n = !1;
        return [ () => {
            n = !0,
            e.play()
        }
        , () => {
            n = !1,
            e.pause(),
            e.currentTime = 0
        }
        ]
    }
    return new class extends class {
        $destroy() {
            !function(t, e) {
                const n = t.$$;
                null !== n.fragment && (r(n.on_destroy),
                n.fragment && n.fragment.d(e),
                n.on_destroy = n.fragment = null,
                n.ctx = [])
            }(this, 1),
            this.$destroy = t
        }
        $on(t, e) {
            const n = this.$$.callbacks[t] || (this.$$.callbacks[t] = []);
            return n.push(e),
            () => {
                const t = n.indexOf(e);
                -1 !== t && n.splice(t, 1)
            }
        }
        $set() {}
    }
    {
        constructor(t) {
            super(),
            k(this, t, N, C, c, {})
        }
    }
    ({
        target: document.body,
        props: {}
    })
}();
//# sourceMappingURL=bundle.js.map
