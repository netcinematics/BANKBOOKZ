/*!
 * @license
 * TradingView Lightweight Charts™ v4.1.7
 * Copyright (c) 2024 TradingView, Inc.
 * Licensed under Apache License 2.0 https://www.apache.org/licenses/LICENSE-2.0
 */
!function() {
    "use strict";
    const t = {
        upColor: "#26a69a",
        downColor: "#ef5350",
        wickVisible: !0,
        borderVisible: !0,
        borderColor: "#378658",
        borderUpColor: "#26a69a",
        borderDownColor: "#ef5350",
        wickColor: "#737375",
        wickUpColor: "#26a69a",
        wickDownColor: "#ef5350"
    }
      , i = {
        upColor: "#26a69a",
        downColor: "#ef5350",
        openVisible: !0,
        thinBars: !0
    }
      , n = {
        color: "#2196f3",
        lineStyle: 0,
        lineWidth: 3,
        lineType: 0,
        lineVisible: !0,
        crosshairMarkerVisible: !0,
        crosshairMarkerRadius: 4,
        crosshairMarkerBorderColor: "",
        crosshairMarkerBorderWidth: 2,
        crosshairMarkerBackgroundColor: "",
        lastPriceAnimation: 0,
        pointMarkersVisible: !1
    }
      , s = {
        topColor: "rgba( 46, 220, 135, 0.4)",
        bottomColor: "rgba( 40, 221, 100, 0)",
        invertFilledArea: !1,
        lineColor: "#33D778",
        lineStyle: 0,
        lineWidth: 3,
        lineType: 0,
        lineVisible: !0,
        crosshairMarkerVisible: !0,
        crosshairMarkerRadius: 4,
        crosshairMarkerBorderColor: "",
        crosshairMarkerBorderWidth: 2,
        crosshairMarkerBackgroundColor: "",
        lastPriceAnimation: 0,
        pointMarkersVisible: !1
    }
      , e = {
        baseValue: {
            type: "price",
            price: 0
        },
        topFillColor1: "rgba(38, 166, 154, 0.28)",
        topFillColor2: "rgba(38, 166, 154, 0.05)",
        topLineColor: "rgba(38, 166, 154, 1)",
        bottomFillColor1: "rgba(239, 83, 80, 0.05)",
        bottomFillColor2: "rgba(239, 83, 80, 0.28)",
        bottomLineColor: "rgba(239, 83, 80, 1)",
        lineWidth: 3,
        lineStyle: 0,
        lineType: 0,
        lineVisible: !0,
        crosshairMarkerVisible: !0,
        crosshairMarkerRadius: 4,
        crosshairMarkerBorderColor: "",
        crosshairMarkerBorderWidth: 2,
        crosshairMarkerBackgroundColor: "",
        lastPriceAnimation: 0,
        pointMarkersVisible: !1
    }
      , r = {
        color: "#26a69a",
        base: 0
    }
      , h = {
        color: "#2196f3"
    }
      , l = {
        title: "",
        visible: !0,
        lastValueVisible: !0,
        priceLineVisible: !0,
        priceLineSource: 0,
        priceLineWidth: 1,
        priceLineColor: "",
        priceLineStyle: 2,
        baseLineVisible: !0,
        baseLineWidth: 1,
        baseLineColor: "#B2B5BE",
        baseLineStyle: 0,
        priceFormat: {
            type: "price",
            precision: 2,
            minMove: .01
        }
    };
    var a, o;
    function _(t, i) {
        const n = {
            0: [],
            1: [t.lineWidth, t.lineWidth],
            2: [2 * t.lineWidth, 2 * t.lineWidth],
            3: [6 * t.lineWidth, 6 * t.lineWidth],
            4: [t.lineWidth, 4 * t.lineWidth]
        }[i];
        t.setLineDash(n)
    }
    function u(t, i, n, s) {
        t.beginPath();
        const e = t.lineWidth % 2 ? .5 : 0;
        t.moveTo(n, i + e),
        t.lineTo(s, i + e),
        t.stroke()
    }
    function c(t, i) {
        if (!t)
            throw new Error("Assertion failed" + (i ? ": " + i : ""))
    }
    function d(t) {
        if (void 0 === t)
            throw new Error("Value is undefined");
        return t
    }
    function f(t) {
        if (null === t)
            throw new Error("Value is null");
        return t
    }
    function v(t) {
        return f(d(t))
    }
    !function(t) {
        t[t.Simple = 0] = "Simple",
        t[t.WithSteps = 1] = "WithSteps",
        t[t.Curved = 2] = "Curved"
    }(a || (a = {})),
    function(t) {
        t[t.Solid = 0] = "Solid",
        t[t.Dotted = 1] = "Dotted",
        t[t.Dashed = 2] = "Dashed",
        t[t.LargeDashed = 3] = "LargeDashed",
        t[t.SparseDotted = 4] = "SparseDotted"
    }(o || (o = {}));
    const p = {
        khaki: "#f0e68c",
        azure: "#f0ffff",
        aliceblue: "#f0f8ff",
        ghostwhite: "#f8f8ff",
        gold: "#ffd700",
        goldenrod: "#daa520",
        gainsboro: "#dcdcdc",
        gray: "#808080",
        green: "#008000",
        honeydew: "#f0fff0",
        floralwhite: "#fffaf0",
        lightblue: "#add8e6",
        lightcoral: "#f08080",
        lemonchiffon: "#fffacd",
        hotpink: "#ff69b4",
        lightyellow: "#ffffe0",
        greenyellow: "#adff2f",
        lightgoldenrodyellow: "#fafad2",
        limegreen: "#32cd32",
        linen: "#faf0e6",
        lightcyan: "#e0ffff",
        magenta: "#f0f",
        maroon: "#800000",
        olive: "#808000",
        orange: "#ffa500",
        oldlace: "#fdf5e6",
        mediumblue: "#0000cd",
        transparent: "#0000",
        lime: "#0f0",
        lightpink: "#ffb6c1",
        mistyrose: "#ffe4e1",
        moccasin: "#ffe4b5",
        midnightblue: "#191970",
        orchid: "#da70d6",
        mediumorchid: "#ba55d3",
        mediumturquoise: "#48d1cc",
        orangered: "#ff4500",
        royalblue: "#4169e1",
        powderblue: "#b0e0e6",
        red: "#f00",
        coral: "#ff7f50",
        turquoise: "#40e0d0",
        white: "#fff",
        whitesmoke: "#f5f5f5",
        wheat: "#f5deb3",
        teal: "#008080",
        steelblue: "#4682b4",
        bisque: "#ffe4c4",
        aquamarine: "#7fffd4",
        aqua: "#0ff",
        sienna: "#a0522d",
        silver: "#c0c0c0",
        springgreen: "#00ff7f",
        antiquewhite: "#faebd7",
        burlywood: "#deb887",
        brown: "#a52a2a",
        beige: "#f5f5dc",
        chocolate: "#d2691e",
        chartreuse: "#7fff00",
        cornflowerblue: "#6495ed",
        cornsilk: "#fff8dc",
        crimson: "#dc143c",
        cadetblue: "#5f9ea0",
        tomato: "#ff6347",
        fuchsia: "#f0f",
        blue: "#00f",
        salmon: "#fa8072",
        blanchedalmond: "#ffebcd",
        slateblue: "#6a5acd",
        slategray: "#708090",
        thistle: "#d8bfd8",
        tan: "#d2b48c",
        cyan: "#0ff",
        darkblue: "#00008b",
        darkcyan: "#008b8b",
        darkgoldenrod: "#b8860b",
        darkgray: "#a9a9a9",
        blueviolet: "#8a2be2",
        black: "#000",
        darkmagenta: "#8b008b",
        darkslateblue: "#483d8b",
        darkkhaki: "#bdb76b",
        darkorchid: "#9932cc",
        darkorange: "#ff8c00",
        darkgreen: "#006400",
        darkred: "#8b0000",
        dodgerblue: "#1e90ff",
        darkslategray: "#2f4f4f",
        dimgray: "#696969",
        deepskyblue: "#00bfff",
        firebrick: "#b22222",
        forestgreen: "#228b22",
        indigo: "#4b0082",
        ivory: "#fffff0",
        lavenderblush: "#fff0f5",
        feldspar: "#d19275",
        indianred: "#cd5c5c",
        lightgreen: "#90ee90",
        lightgrey: "#d3d3d3",
        lightskyblue: "#87cefa",
        lightslategray: "#789",
        lightslateblue: "#8470ff",
        snow: "#fffafa",
        lightseagreen: "#20b2aa",
        lightsalmon: "#ffa07a",
        darksalmon: "#e9967a",
        darkviolet: "#9400d3",
        mediumpurple: "#9370d8",
        mediumaquamarine: "#66cdaa",
        skyblue: "#87ceeb",
        lavender: "#e6e6fa",
        lightsteelblue: "#b0c4de",
        mediumvioletred: "#c71585",
        mintcream: "#f5fffa",
        navajowhite: "#ffdead",
        navy: "#000080",
        olivedrab: "#6b8e23",
        palevioletred: "#d87093",
        violetred: "#d02090",
        yellow: "#ff0",
        yellowgreen: "#9acd32",
        lawngreen: "#7cfc00",
        pink: "#ffc0cb",
        paleturquoise: "#afeeee",
        palegoldenrod: "#eee8aa",
        darkolivegreen: "#556b2f",
        darkseagreen: "#8fbc8f",
        darkturquoise: "#00ced1",
        peachpuff: "#ffdab9",
        deeppink: "#ff1493",
        violet: "#ee82ee",
        palegreen: "#98fb98",
        mediumseagreen: "#3cb371",
        peru: "#cd853f",
        saddlebrown: "#8b4513",
        sandybrown: "#f4a460",
        rosybrown: "#bc8f8f",
        purple: "#800080",
        seagreen: "#2e8b57",
        seashell: "#fff5ee",
        papayawhip: "#ffefd5",
        mediumslateblue: "#7b68ee",
        plum: "#dda0dd",
        mediumspringgreen: "#00fa9a"
    };
    function m(t) {
        return t < 0 ? 0 : t > 255 ? 255 : Math.round(t) || 0
    }
    function b(t) {
        return t <= 0 || t > 1 ? Math.min(Math.max(t, 0), 1) : Math.round(1e4 * t) / 1e4
    }
    const w = /^#([0-9a-f])([0-9a-f])([0-9a-f])([0-9a-f])?$/i
      , g = /^#([0-9a-f]{2})([0-9a-f]{2})([0-9a-f]{2})([0-9a-f]{2})?$/i
      , M = /^rgb\(\s*(-?\d{1,10})\s*,\s*(-?\d{1,10})\s*,\s*(-?\d{1,10})\s*\)$/
      , x = /^rgba\(\s*(-?\d{1,10})\s*,\s*(-?\d{1,10})\s*,\s*(-?\d{1,10})\s*,\s*(-?\d*\.?\d+)\s*\)$/;
    function S(t) {
        (t = t.toLowerCase())in p && (t = p[t]);
        {
            const i = x.exec(t) || M.exec(t);
            if (i)
                return [m(parseInt(i[1], 10)), m(parseInt(i[2], 10)), m(parseInt(i[3], 10)), b(i.length < 5 ? 1 : parseFloat(i[4]))]
        }
        {
            const i = g.exec(t);
            if (i)
                return [m(parseInt(i[1], 16)), m(parseInt(i[2], 16)), m(parseInt(i[3], 16)), 1]
        }
        {
            const i = w.exec(t);
            if (i)
                return [m(17 * parseInt(i[1], 16)), m(17 * parseInt(i[2], 16)), m(17 * parseInt(i[3], 16)), 1]
        }
        throw new Error(`Cannot parse color: ${t}`)
    }
    function y(t) {
        const i = S(t);
        return {
            t: `rgb(${i[0]}, ${i[1]}, ${i[2]})`,
            i: (n = i,
            .199 * n[0] + .687 * n[1] + .114 * n[2] > 160 ? "black" : "white")
        };
        var n
    }
    class k {
        constructor() {
            this.h = []
        }
        l(t, i, n) {
            const s = {
                o: t,
                _: i,
                u: !0 === n
            };
            this.h.push(s)
        }
        v(t) {
            const i = this.h.findIndex((i=>t === i.o));
            i > -1 && this.h.splice(i, 1)
        }
        p(t) {
            this.h = this.h.filter((i=>i._ !== t))
        }
        m(t, i, n) {
            const s = [...this.h];
            this.h = this.h.filter((t=>!t.u)),
            s.forEach((s=>s.o(t, i, n)))
        }
        M() {
            return this.h.length > 0
        }
        S() {
            this.h = []
        }
    }
    function C(t, ...i) { //PARSE OPTIONS.
        for (const n of i)
            for (const i in n)
                void 0 !== n[i] && ("object" != typeof n[i] || void 0 === t[i] || Array.isArray(n[i]) ? t[i] = n[i] : C(t[i], n[i]));
        return t //RETURN OPTIONS
    }
    function T(t) {
        return "number" == typeof t && isFinite(t)
    }
    function P(t) {
        return "number" == typeof t && t % 1 == 0
    }
    function R(t) {
        return "string" == typeof t
    }
    function D(t) {
        return "boolean" == typeof t
    }
    function O(t) {
        const i = t;
        if (!i || "object" != typeof i)
            return i;
        let n, s, e;
        for (s in n = Array.isArray(i) ? [] : {},
        i)
            i.hasOwnProperty(s) && (e = i[s],
            n[s] = e && "object" == typeof e ? O(e) : e);
        return n
    }
    function B(t) {
        return null !== t
    }
    function A(t) {
        return null === t ? void 0 : t
    }
    const z = "-apple-system, BlinkMacSystemFont, 'Trebuchet MS', Roboto, Ubuntu, sans-serif";
    function V(t, i, n) {
        return void 0 === i && (i = z),
        `${n = void 0 !== n ? `${n} ` : ""}${t}px ${i}`
    }
    class E {
        constructor(t) {
            this.k = {
                C: 1,
                T: 5,
                P: NaN,
                R: "",
                D: "",
                O: "",
                B: "",
                A: 0,
                V: 0,
                I: 0,
                L: 0,
                N: 0
            },
            this.F = t
        }
        W() {
            const t = this.k
              , i = this.j()
              , n = this.H();
            return t.P === i && t.D === n || (t.P = i,
            t.D = n,
            t.R = V(i, n),
            t.L = 2.5 / 12 * i,
            t.A = t.L,
            t.V = i / 12 * t.T,
            t.I = i / 12 * t.T,
            t.N = 0),
            t.O = this.$(),
            t.B = this.U(),
            this.k
        }
        $() {
            return this.F.W().layout.textColor
        }
        U() {
            return this.F.q()
        }
        j() {
            return this.F.W().layout.fontSize
        }
        H() {
            return this.F.W().layout.fontFamily
        }
    }
    class I {
        constructor() {
            this.Y = []
        }
        X(t) {
            this.Y = t
        }
        K(t, i, n) {
            this.Y.forEach((s=>{
                s.K(t, i, n)
            }
            ))
        }
    }
    class L {
        K(t, i, n) {
            t.useBitmapCoordinateSpace((t=>this.Z(t, i, n)))
        }
    }
    class N extends L {
        constructor() {
            super(...arguments),
            this.G = null
        }
        J(t) {
            this.G = t
        }
        Z({context: t, horizontalPixelRatio: i, verticalPixelRatio: n}) {
            if (null === this.G || null === this.G.tt)
                return;
            const s = this.G.tt
              , e = this.G
              , r = Math.max(1, Math.floor(i)) % 2 / 2
              , h = h=>{
                t.beginPath();
                for (let l = s.to - 1; l >= s.from; --l) {
                    const s = e.it[l]
                      , a = Math.round(s.nt * i) + r
                      , o = s.st * n
                      , _ = h * n + r;
                    t.moveTo(a, o),
                    t.arc(a, o, _, 0, 2 * Math.PI)
                }
                t.fill()
            }
            ;
            e.et > 0 && (t.fillStyle = e.rt,
            h(e.ht + e.et)),
            t.fillStyle = e.lt,
            h(e.ht)
        }
    }
    function F() {
        return {
            it: [{
                nt: 0,
                st: 0,
                ot: 0,
                _t: 0
            }],
            lt: "",
            rt: "",
            ht: 0,
            et: 0,
            tt: null
        }
    }
    const W = {
        from: 0,
        to: 1
    };
    class j {
        constructor(t, i) {
            this.ut = new I,
            this.ct = [],
            this.dt = [],
            this.ft = !0,
            this.F = t,
            this.vt = i,
            this.ut.X(this.ct)
        }
        bt(t) {
            const i = this.F.wt();
            i.length !== this.ct.length && (this.dt = i.map(F),
            this.ct = this.dt.map((t=>{
                const i = new N;
                return i.J(t),
                i
            }
            )),
            this.ut.X(this.ct)),
            this.ft = !0
        }
        gt() {
            return this.ft && (this.Mt(),
            this.ft = !1),
            this.ut
        }
        Mt() {
            const t = 2 === this.vt.W().mode
              , i = this.F.wt()
              , n = this.vt.xt()
              , s = this.F.St();
            i.forEach(((i,e)=>{
                var r;
                const h = this.dt[e]
                  , l = i.yt(n);
                if (t || null === l || !i.kt())
                    return void (h.tt = null);
                const a = f(i.Ct());
                h.lt = l.Tt,
                h.ht = l.ht,
                h.et = l.Pt,
                h.it[0]._t = l._t,
                h.it[0].st = i.Dt().Rt(l._t, a.Ot),
                h.rt = null !== (r = l.Bt) && void 0 !== r ? r : this.F.At(h.it[0].st / i.Dt().zt()),
                h.it[0].ot = n,
                h.it[0].nt = s.Vt(n),
                h.tt = W
            }
            ))
        }
    }
    class H extends L {
        constructor(t) {
            super(),
            this.Et = t
        }
        Z({context: t, bitmapSize: i, horizontalPixelRatio: n, verticalPixelRatio: s}) {
            if (null === this.Et)
                return;
            const e = this.Et.It.kt
              , r = this.Et.Lt.kt;
            if (!e && !r)
                return;
            const h = Math.round(this.Et.nt * n)
              , l = Math.round(this.Et.st * s);
            t.lineCap = "butt",
            e && h >= 0 && (t.lineWidth = Math.floor(this.Et.It.et * n),
            t.strokeStyle = this.Et.It.O,
            t.fillStyle = this.Et.It.O,
            _(t, this.Et.It.Nt),
            function(t, i, n, s) {
                t.beginPath();
                const e = t.lineWidth % 2 ? .5 : 0;
                t.moveTo(i + e, n),
                t.lineTo(i + e, s),
                t.stroke()
            }(t, h, 0, i.height)),
            r && l >= 0 && (t.lineWidth = Math.floor(this.Et.Lt.et * s),
            t.strokeStyle = this.Et.Lt.O,
            t.fillStyle = this.Et.Lt.O,
            _(t, this.Et.Lt.Nt),
            u(t, l, 0, i.width))
        }
    }
    class $ {
        constructor(t) {
            this.ft = !0,
            this.Ft = {
                It: {
                    et: 1,
                    Nt: 0,
                    O: "",
                    kt: !1
                },
                Lt: {
                    et: 1,
                    Nt: 0,
                    O: "",
                    kt: !1
                },
                nt: 0,
                st: 0
            },
            this.Wt = new H(this.Ft),
            this.jt = t
        }
        bt() {
            this.ft = !0
        }
        gt() {
            return this.ft && (this.Mt(),
            this.ft = !1),
            this.Wt
        }
        Mt() {
            const t = this.jt.kt()
              , i = f(this.jt.Ht())
              , n = i.$t().W().crosshair
              , s = this.Ft;
            if (2 === n.mode)
                return s.Lt.kt = !1,
                void (s.It.kt = !1);
            s.Lt.kt = t && this.jt.Ut(i),
            s.It.kt = t && this.jt.qt(),
            s.Lt.et = n.horzLine.width,
            s.Lt.Nt = n.horzLine.style,
            s.Lt.O = n.horzLine.color,
            s.It.et = n.vertLine.width,
            s.It.Nt = n.vertLine.style,
            s.It.O = n.vertLine.color,
            s.nt = this.jt.Yt(),
            s.st = this.jt.Xt()
        }
    }
    function U(t, i, n, s, e, r) {
        t.fillRect(i + r, n, s - 2 * r, r),
        t.fillRect(i + r, n + e - r, s - 2 * r, r),
        t.fillRect(i, n, r, e),
        t.fillRect(i + s - r, n, r, e)
    }
    function q(t, i, n, s, e, r) {
        t.save(),
        t.globalCompositeOperation = "copy",
        t.fillStyle = r,
        t.fillRect(i, n, s, e),
        t.restore()
    }
    function Y(t, i, n, s, e, r) {
        t.beginPath(),
        t.roundRect ? t.roundRect(i, n, s, e, r) : (t.lineTo(i + s - r[1], n),
        0 !== r[1] && t.arcTo(i + s, n, i + s, n + r[1], r[1]),
        t.lineTo(i + s, n + e - r[2]),
        0 !== r[2] && t.arcTo(i + s, n + e, i + s - r[2], n + e, r[2]),
        t.lineTo(i + r[3], n + e),
        0 !== r[3] && t.arcTo(i, n + e, i, n + e - r[3], r[3]),
        t.lineTo(i, n + r[0]),
        0 !== r[0] && t.arcTo(i, n, i + r[0], n, r[0]))
    }
    function X(t, i, n, s, e, r, h=0, l=[0, 0, 0, 0], a="") {
        if (t.save(),
        !h || !a || a === r)
            return Y(t, i, n, s, e, l),
            t.fillStyle = r,
            t.fill(),
            void t.restore();
        const o = h / 2;
        var _;
        Y(t, i + o, n + o, s - h, e - h, (_ = -o,
        l.map((t=>0 === t ? t : t + _)))),
        "transparent" !== r && (t.fillStyle = r,
        t.fill()),
        "transparent" !== a && (t.lineWidth = h,
        t.strokeStyle = a,
        t.closePath(),
        t.stroke()),
        t.restore()
    }
    function K(t, i, n, s, e, r, h) {
        t.save(),
        t.globalCompositeOperation = "copy";
        const l = t.createLinearGradient(0, 0, 0, e);
        l.addColorStop(0, r),
        l.addColorStop(1, h),
        t.fillStyle = l,
        t.fillRect(i, n, s, e),
        t.restore()
    }
    class Z {
        constructor(t, i) {
            this.J(t, i)
        }
        J(t, i) {
            this.Et = t,
            this.Kt = i
        }
        zt(t, i) {
            return this.Et.kt ? t.P + t.L + t.A : 0
        }
        K(t, i, n, s) {
            if (!this.Et.kt || 0 === this.Et.Zt.length)
                return;
            const e = this.Et.O
              , r = this.Kt.t
              , h = t.useBitmapCoordinateSpace((t=>{
                const h = t.context;
                h.font = i.R;
                const l = this.Gt(t, i, n, s)
                  , a = l.Jt
                  , o = (t,i)=>{
                    l.Qt ? X(h, a.ti, a.ii, a.ni, a.si, t, a.ei, [a.ht, 0, 0, a.ht], i) : X(h, a.ri, a.ii, a.ni, a.si, t, a.ei, [0, a.ht, a.ht, 0], i)
                }
                ;
                return o(r, "transparent"),
                this.Et.hi && (h.fillStyle = e,
                h.fillRect(a.ri, a.li, a.ai - a.ri, a.oi)),
                o("transparent", r),
                this.Et._i && (h.fillStyle = i.B,
                h.fillRect(l.Qt ? a.ui - a.ei : 0, a.ii, a.ei, a.ci - a.ii)),
                l
            }
            ));
            t.useMediaCoordinateSpace((({context: t})=>{
                const n = h.di;
                t.font = i.R,
                t.textAlign = h.Qt ? "right" : "left",
                t.textBaseline = "middle",
                t.fillStyle = e,
                t.fillText(this.Et.Zt, n.fi, (n.ii + n.ci) / 2 + n.pi)
            }
            ))
        }
        Gt(t, i, n, s) {
            var e;
            const {context: r, bitmapSize: h, mediaSize: l, horizontalPixelRatio: a, verticalPixelRatio: o} = t
              , _ = this.Et.hi || !this.Et.mi ? i.T : 0
              , u = this.Et.bi ? i.C : 0
              , c = i.L + this.Kt.wi
              , d = i.A + this.Kt.gi
              , f = i.V
              , v = i.I
              , p = this.Et.Zt
              , m = i.P
              , b = n.Mi(r, p)
              , w = Math.ceil(n.xi(r, p))
              , g = m + c + d
              , M = i.C + f + v + w + _
              , x = Math.max(1, Math.floor(o));
            let S = Math.round(g * o);
            S % 2 != x % 2 && (S += 1);
            const y = u > 0 ? Math.max(1, Math.floor(u * a)) : 0
              , k = Math.round(M * a)
              , C = Math.round(_ * a)
              , T = null !== (e = this.Kt.Si) && void 0 !== e ? e : this.Kt.yi
              , P = Math.round(T * o) - Math.floor(.5 * o)
              , R = Math.floor(P + x / 2 - S / 2)
              , D = R + S
              , O = "right" === s
              , B = O ? l.width - u : u
              , A = O ? h.width - y : y;
            let z, V, E;
            return O ? (z = A - k,
            V = A - C,
            E = B - _ - f - u) : (z = A + k,
            V = A + C,
            E = B + _ + f),
            {
                Qt: O,
                Jt: {
                    ii: R,
                    li: P,
                    ci: D,
                    ni: k,
                    si: S,
                    ht: 2 * a,
                    ei: y,
                    ti: z,
                    ri: A,
                    ai: V,
                    oi: x,
                    ui: h.width
                },
                di: {
                    ii: R / o,
                    ci: D / o,
                    fi: E,
                    pi: b
                }
            }
        }
    }
    class G {
        constructor(t) {
            this.ki = {
                yi: 0,
                t: "#000",
                gi: 0,
                wi: 0
            },
            this.Ci = {
                Zt: "",
                kt: !1,
                hi: !0,
                mi: !1,
                Bt: "",
                O: "#FFF",
                _i: !1,
                bi: !1
            },
            this.Ti = {
                Zt: "",
                kt: !1,
                hi: !1,
                mi: !0,
                Bt: "",
                O: "#FFF",
                _i: !0,
                bi: !0
            },
            this.ft = !0,
            this.Pi = new (t || Z)(this.Ci,this.ki),
            this.Ri = new (t || Z)(this.Ti,this.ki)
        }
        Zt() {
            return this.Di(),
            this.Ci.Zt
        }
        yi() {
            return this.Di(),
            this.ki.yi
        }
        bt() {
            this.ft = !0
        }
        zt(t, i=!1) {
            return Math.max(this.Pi.zt(t, i), this.Ri.zt(t, i))
        }
        Oi() {
            return this.ki.Si || 0
        }
        Bi(t) {
            this.ki.Si = t
        }
        Ai() {
            return this.Di(),
            this.Ci.kt || this.Ti.kt
        }
        zi() {
            return this.Di(),
            this.Ci.kt
        }
        gt(t) {
            return this.Di(),
            this.Ci.hi = this.Ci.hi && t.W().ticksVisible,
            this.Ti.hi = this.Ti.hi && t.W().ticksVisible,
            this.Pi.J(this.Ci, this.ki),
            this.Ri.J(this.Ti, this.ki),
            this.Pi
        }
        Vi() {
            return this.Di(),
            this.Pi.J(this.Ci, this.ki),
            this.Ri.J(this.Ti, this.ki),
            this.Ri
        }
        Di() {
            this.ft && (this.Ci.hi = !0,
            this.Ti.hi = !1,
            this.Ei(this.Ci, this.Ti, this.ki))
        }
    }
    class J extends G {
        constructor(t, i, n) {
            super(),
            this.jt = t,
            this.Ii = i,
            this.Li = n
        }
        Ei(t, i, n) {
            if (t.kt = !1,
            2 === this.jt.W().mode)
                return;
            const s = this.jt.W().horzLine;
            if (!s.labelVisible)
                return;
            const e = this.Ii.Ct();
            if (!this.jt.kt() || this.Ii.Ni() || null === e)
                return;
            const r = y(s.labelBackgroundColor);
            n.t = r.t,
            t.O = r.i;
            const h = 2 / 12 * this.Ii.P();
            n.wi = h,
            n.gi = h;
            const l = this.Li(this.Ii);
            n.yi = l.yi,
            t.Zt = this.Ii.Fi(l._t, e),
            t.kt = !0
        }
    }
    const Q = /[1-9]/g;
    class tt {
        constructor() {
            this.Et = null
        }
        J(t) {
            this.Et = t
        }
        K(t, i) {
            if (null === this.Et || !1 === this.Et.kt || 0 === this.Et.Zt.length)
                return;
            const n = t.useMediaCoordinateSpace((({context: t})=>(t.font = i.R,
            Math.round(i.Wi.xi(t, f(this.Et).Zt, Q)))));
            if (n <= 0)
                return;
            const s = i.ji
              , e = n + 2 * s
              , r = e / 2
              , h = this.Et.Hi;
            let l = this.Et.yi
              , a = Math.floor(l - r) + .5;
            a < 0 ? (l += Math.abs(0 - a),
            a = Math.floor(l - r) + .5) : a + e > h && (l -= Math.abs(h - (a + e)),
            a = Math.floor(l - r) + .5);
            const o = a + e
              , _ = Math.ceil(0 + i.C + i.T + i.L + i.P + i.A);
            t.useBitmapCoordinateSpace((({context: t, horizontalPixelRatio: n, verticalPixelRatio: s})=>{
                const e = f(this.Et);
                t.fillStyle = e.t;
                const r = Math.round(a * n)
                  , h = Math.round(0 * s)
                  , l = Math.round(o * n)
                  , u = Math.round(_ * s)
                  , c = Math.round(2 * n);
                if (t.beginPath(),
                t.moveTo(r, h),
                t.lineTo(r, u - c),
                t.arcTo(r, u, r + c, u, c),
                t.lineTo(l - c, u),
                t.arcTo(l, u, l, u - c, c),
                t.lineTo(l, h),
                t.fill(),
                e.hi) {
                    const r = Math.round(e.yi * n)
                      , l = h
                      , a = Math.round((l + i.T) * s);
                    t.fillStyle = e.O;
                    const o = Math.max(1, Math.floor(n))
                      , _ = Math.floor(.5 * n);
                    t.fillRect(r - _, l, o, a - l)
                }
            }
            )),
            t.useMediaCoordinateSpace((({context: t})=>{
                const n = f(this.Et)
                  , e = 0 + i.C + i.T + i.L + i.P / 2;
                t.font = i.R,
                t.textAlign = "left",
                t.textBaseline = "middle",
                t.fillStyle = n.O;
                const r = i.Wi.Mi(t, "Apr0");
                t.translate(a + s, e + r),
                t.fillText(n.Zt, 0, 0)
            }
            ))
        }
    }
    class it {
        constructor(t, i, n) {
            this.ft = !0,
            this.Wt = new tt,
            this.Ft = {
                kt: !1,
                t: "#4c525e",
                O: "white",
                Zt: "",
                Hi: 0,
                yi: NaN,
                hi: !0
            },
            this.vt = t,
            this.$i = i,
            this.Li = n
        }
        bt() {
            this.ft = !0
        }
        gt() {
            return this.ft && (this.Mt(),
            this.ft = !1),
            this.Wt.J(this.Ft),
            this.Wt
        }
        Mt() {
            const t = this.Ft;
            if (t.kt = !1,
            2 === this.vt.W().mode)
                return;
            const i = this.vt.W().vertLine;
            if (!i.labelVisible)
                return;
            const n = this.$i.St();
            if (n.Ni())
                return;
            t.Hi = n.Hi();
            const s = this.Li();
            if (null === s)
                return;
            t.yi = s.yi;
            const e = n.Ui(this.vt.xt());
            t.Zt = n.qi(f(e)),
            t.kt = !0;
            const r = y(i.labelBackgroundColor);
            t.t = r.t,
            t.O = r.i,
            t.hi = n.W().ticksVisible
        }
    }
    class nt {
        constructor() {
            this.Yi = null,
            this.Xi = 0
        }
        Ki() {
            return this.Xi
        }
        Zi(t) {
            this.Xi = t
        }
        Dt() {
            return this.Yi
        }
        Gi(t) {
            this.Yi = t
        }
        Ji(t) {
            return []
        }
        Qi() {
            return []
        }
        kt() {
            return !0
        }
    }
    var st;
    !function(t) {
        t[t.Normal = 0] = "Normal",
        t[t.Magnet = 1] = "Magnet",
        t[t.Hidden = 2] = "Hidden"
    }(st || (st = {}));
    class et extends nt {
        constructor(t, i) {
            super(),
            this.tn = null,
            this.nn = NaN,
            this.sn = 0,
            this.en = !0,
            this.rn = new Map,
            this.hn = !1,
            this.ln = NaN,
            this.an = NaN,
            this._n = NaN,
            this.un = NaN,
            this.$i = t,
            this.cn = i,
            this.dn = new j(t,this);
            this.fn = ((t,i)=>n=>{
                const s = i()
                  , e = t();
                if (n === f(this.tn).vn())
                    return {
                        _t: e,
                        yi: s
                    };
                {
                    const t = f(n.Ct());
                    return {
                        _t: n.pn(s, t),
                        yi: s
                    }
                }
            }
            )((()=>this.nn), (()=>this.an));
            const n = ((t,i)=>()=>{
                const n = this.$i.St().mn(t())
                  , s = i();
                return n && Number.isFinite(s) ? {
                    ot: n,
                    yi: s
                } : null
            }
            )((()=>this.sn), (()=>this.Yt()));
            this.bn = new it(this,t,n),
            this.wn = new $(this)
        }
        W() {
            return this.cn
        }
        gn(t, i) {
            this._n = t,
            this.un = i
        }
        Mn() {
            this._n = NaN,
            this.un = NaN
        }
        xn() {
            return this._n
        }
        Sn() {
            return this.un
        }
        yn(t, i, n) {
            this.hn || (this.hn = !0),
            this.en = !0,
            this.kn(t, i, n)
        }
        xt() {
            return this.sn
        }
        Yt() {
            return this.ln
        }
        Xt() {
            return this.an
        }
        kt() {
            return this.en
        }
        Cn() {
            this.en = !1,
            this.Tn(),
            this.nn = NaN,
            this.ln = NaN,
            this.an = NaN,
            this.tn = null,
            this.Mn()
        }
        Pn(t) {
            return null !== this.tn ? [this.wn, this.dn] : []
        }
        Ut(t) {
            return t === this.tn && this.cn.horzLine.visible
        }
        qt() {
            return this.cn.vertLine.visible
        }
        Rn(t, i) {
            this.en && this.tn === t || this.rn.clear();
            const n = [];
            return this.tn === t && n.push(this.Dn(this.rn, i, this.fn)),
            n
        }
        Qi() {
            return this.en ? [this.bn] : []
        }
        Ht() {
            return this.tn
        }
        On() {
            this.wn.bt(),
            this.rn.forEach((t=>t.bt())),
            this.bn.bt(),
            this.dn.bt()
        }
        Bn(t) {
            return t && !t.vn().Ni() ? t.vn() : null
        }
        kn(t, i, n) {
            this.An(t, i, n) && this.On()
        }
        An(t, i, n) {
            const s = this.ln
              , e = this.an
              , r = this.nn
              , h = this.sn
              , l = this.tn
              , a = this.Bn(n);
            this.sn = t,
            this.ln = isNaN(t) ? NaN : this.$i.St().Vt(t),
            this.tn = n;
            const o = null !== a ? a.Ct() : null;
            return null !== a && null !== o ? (this.nn = i,
            this.an = a.Rt(i, o)) : (this.nn = NaN,
            this.an = NaN),
            s !== this.ln || e !== this.an || h !== this.sn || r !== this.nn || l !== this.tn
        }
        Tn() {
            const t = this.$i.wt().map((t=>t.Vn().zn())).filter(B)
              , i = 0 === t.length ? null : Math.max(...t);
            this.sn = null !== i ? i : NaN
        }
        Dn(t, i, n) {
            let s = t.get(i);
            return void 0 === s && (s = new J(this,i,n),
            t.set(i, s)),
            s
        }
    }
    function rt(t) {
        return "left" === t || "right" === t
    }
    class ht {
        constructor(t) {
            this.En = new Map,
            this.In = [],
            this.Ln = t
        }
        Nn(t, i) {
            const n = function(t, i) {
                return void 0 === t ? i : {
                    Fn: Math.max(t.Fn, i.Fn),
                    Wn: t.Wn || i.Wn
                }
            }(this.En.get(t), i);
            this.En.set(t, n)
        }
        jn() {
            return this.Ln
        }
        Hn(t) {
            const i = this.En.get(t);
            return void 0 === i ? {
                Fn: this.Ln
            } : {
                Fn: Math.max(this.Ln, i.Fn),
                Wn: i.Wn
            }
        }
        $n() {
            this.Un(),
            this.In = [{
                qn: 0
            }]
        }
        Yn(t) {
            this.Un(),
            this.In = [{
                qn: 1,
                Ot: t
            }]
        }
        Xn(t) {
            this.Kn(),
            this.In.push({
                qn: 5,
                Ot: t
            })
        }
        Un() {
            this.Kn(),
            this.In.push({
                qn: 6
            })
        }
        Zn() {
            this.Un(),
            this.In = [{
                qn: 4
            }]
        }
        Gn(t) {
            this.Un(),
            this.In.push({
                qn: 2,
                Ot: t
            })
        }
        Jn(t) {
            this.Un(),
            this.In.push({
                qn: 3,
                Ot: t
            })
        }
        Qn() {
            return this.In
        }
        ts(t) {
            for (const i of t.In)
                this.ns(i);
            this.Ln = Math.max(this.Ln, t.Ln),
            t.En.forEach(((t,i)=>{
                this.Nn(i, t)
            }
            ))
        }
        static ss() {
            return new ht(2)
        }
        static es() {
            return new ht(3)
        }
        ns(t) {
            switch (t.qn) {
            case 0:
                this.$n();
                break;
            case 1:
                this.Yn(t.Ot);
                break;
            case 2:
                this.Gn(t.Ot);
                break;
            case 3:
                this.Jn(t.Ot);
                break;
            case 4:
                this.Zn();
                break;
            case 5:
                this.Xn(t.Ot);
                break;
            case 6:
                this.Kn()
            }
        }
        Kn() {
            const t = this.In.findIndex((t=>5 === t.qn));
            -1 !== t && this.In.splice(t, 1)
        }
    }
    const lt = ".";
    function at(t, i) {
        if (!T(t))
            return "n/a";
        if (!P(i))
            throw new TypeError("invalid length");
        if (i < 0 || i > 16)
            throw new TypeError("invalid length");
        if (0 === i)
            return t.toString();
        return ("0000000000000000" + t.toString()).slice(-i)
    }
    class ot {
        constructor(t, i) {
            if (i || (i = 1),
            T(t) && P(t) || (t = 100),
            t < 0)
                throw new TypeError("invalid base");
            this.Ii = t,
            this.rs = i,
            this.hs()
        }
        format(t) {
            const i = t < 0 ? "−" : "";
            return t = Math.abs(t),
            i + this.ls(t)
        }
        hs() {
            if (this.os = 0,
            this.Ii > 0 && this.rs > 0) {
                let t = this.Ii;
                for (; t > 1; )
                    t /= 10,
                    this.os++
            }
        }
        ls(t) {
            const i = this.Ii / this.rs;
            let n = Math.floor(t)
              , s = "";
            const e = void 0 !== this.os ? this.os : NaN;
            if (i > 1) {
                let r = +(Math.round(t * i) - n * i).toFixed(this.os);
                r >= i && (r -= i,
                n += 1),
                s = lt + at(+r.toFixed(this.os) * this.rs, e)
            } else
                n = Math.round(n * i) / i,
                e > 0 && (s = lt + at(0, e));
            return n.toFixed(0) + s
        }
    }
    class _t extends ot {
        constructor(t=100) {
            super(t)
        }
        format(t) {
            return `${super.format(t)}%`
        }
    }
    class ut {
        constructor(t) {
            this._s = t
        }
        format(t) {
            let i = "";
            return t < 0 && (i = "-",
            t = -t),
            t < 995 ? i + this.us(t) : t < 999995 ? i + this.us(t / 1e3) + "K" : t < 999999995 ? (t = 1e3 * Math.round(t / 1e3),
            i + this.us(t / 1e6) + "M") : (t = 1e6 * Math.round(t / 1e6),
            i + this.us(t / 1e9) + "B")
        }
        us(t) {
            let i;
            const n = Math.pow(10, this._s);
            return i = (t = Math.round(t * n) / n) >= 1e-15 && t < 1 ? t.toFixed(this._s).replace(/\.?0+$/, "") : String(t),
            i.replace(/(\.[1-9]*)0+$/, ((t,i)=>i))
        }
    }
    function ct(t, i, n, s, e, r, h) {
        if (0 === i.length || s.from >= i.length || s.to <= 0)
            return;
        const {context: l, horizontalPixelRatio: a, verticalPixelRatio: o} = t
          , _ = i[s.from];
        let u = r(t, _)
          , c = _;
        if (s.to - s.from < 2) {
            const i = e / 2;
            l.beginPath();
            const n = {
                nt: _.nt - i,
                st: _.st
            }
              , s = {
                nt: _.nt + i,
                st: _.st
            };
            l.moveTo(n.nt * a, n.st * o),
            l.lineTo(s.nt * a, s.st * o),
            h(t, u, n, s)
        } else {
            const e = (i,n)=>{
                h(t, u, c, n),
                l.beginPath(),
                u = i,
                c = n
            }
            ;
            let d = c;
            l.beginPath(),
            l.moveTo(_.nt * a, _.st * o);
            for (let h = s.from + 1; h < s.to; ++h) {
                d = i[h];
                const s = r(t, d);
                switch (n) {
                case 0:
                    l.lineTo(d.nt * a, d.st * o);
                    break;
                case 1:
                    l.lineTo(d.nt * a, i[h - 1].st * o),
                    s !== u && (e(s, d),
                    l.lineTo(d.nt * a, i[h - 1].st * o)),
                    l.lineTo(d.nt * a, d.st * o);
                    break;
                case 2:
                    {
                        const [t,n] = pt(i, h - 1, h);
                        l.bezierCurveTo(t.nt * a, t.st * o, n.nt * a, n.st * o, d.nt * a, d.st * o);
                        break
                    }
                }
                1 !== n && s !== u && (e(s, d),
                l.moveTo(d.nt * a, d.st * o))
            }
            (c !== d || c === d && 1 === n) && h(t, u, c, d)
        }
    }
    const dt = 6;
    function ft(t, i) {
        return {
            nt: t.nt - i.nt,
            st: t.st - i.st
        }
    }
    function vt(t, i) {
        return {
            nt: t.nt / i,
            st: t.st / i
        }
    }
    function pt(t, i, n) {
        const s = Math.max(0, i - 1)
          , e = Math.min(t.length - 1, n + 1);
        var r, h;
        return [(r = t[i],
        h = vt(ft(t[n], t[s]), dt),
        {
            nt: r.nt + h.nt,
            st: r.st + h.st
        }), ft(t[n], vt(ft(t[e], t[i]), dt))]
    }
    function mt(t, i, n, s, e) {
        const {context: r, horizontalPixelRatio: h, verticalPixelRatio: l} = i;
        r.lineTo(e.nt * h, t * l),
        r.lineTo(s.nt * h, t * l),
        r.closePath(),
        r.fillStyle = n,
        r.fill()
    }
    class bt extends L {
        constructor() {
            super(...arguments),
            this.G = null
        }
        J(t) {
            this.G = t
        }
        Z(t) {
            var i;
            if (null === this.G)
                return;
            const {it: n, tt: s, cs: e, et: r, Nt: h, ds: l} = this.G
              , a = null !== (i = this.G.fs) && void 0 !== i ? i : this.G.vs ? 0 : t.mediaSize.height;
            if (null === s)
                return;
            const o = t.context;
            o.lineCap = "butt",
            o.lineJoin = "round",
            o.lineWidth = r,
            _(o, h),
            o.lineWidth = 1,
            ct(t, n, l, s, e, this.ps.bind(this), mt.bind(null, a))
        }
    }
    function wt(t, i, n) {
        return Math.min(Math.max(t, i), n)
    }
    function gt(t, i, n) {
        return i - t <= n
    }
    function Mt(t) {
        const i = Math.ceil(t);
        return i % 2 == 0 ? i - 1 : i
    }
    class xt {
        bs(t, i) {
            const n = this.ws
              , {gs: s, Ms: e, xs: r, Ss: h, ys: l, fs: a} = i;
            if (void 0 === this.ks || void 0 === n || n.gs !== s || n.Ms !== e || n.xs !== r || n.Ss !== h || n.fs !== a || n.ys !== l) {
                const n = t.context.createLinearGradient(0, 0, 0, l);
                if (n.addColorStop(0, s),
                null != a) {
                    const i = wt(a * t.verticalPixelRatio / l, 0, 1);
                    n.addColorStop(i, e),
                    n.addColorStop(i, r)
                }
                n.addColorStop(1, h),
                this.ks = n,
                this.ws = i
            }
            return this.ks
        }
    }
    class St extends bt {
        constructor() {
            super(...arguments),
            this.Cs = new xt
        }
        ps(t, i) {
            return this.Cs.bs(t, {
                gs: i.Ts,
                Ms: "",
                xs: "",
                Ss: i.Ps,
                ys: t.bitmapSize.height
            })
        }
    }
    function yt(t, i) {
        const n = t.context;
        n.strokeStyle = i,
        n.stroke()
    }
    class kt extends L {
        constructor() {
            super(...arguments),
            this.G = null
        }
        J(t) {
            this.G = t
        }
        Z(t) {
            if (null === this.G)
                return;
            const {it: i, tt: n, cs: s, ds: e, et: r, Nt: h, Rs: l} = this.G;
            if (null === n)
                return;
            const a = t.context;
            a.lineCap = "butt",
            a.lineWidth = r * t.verticalPixelRatio,
            _(a, h),
            a.lineJoin = "round";
            const o = this.Ds.bind(this);
            void 0 !== e && ct(t, i, e, n, s, o, yt),
            l && function(t, i, n, s, e) {
                const {horizontalPixelRatio: r, verticalPixelRatio: h, context: l} = t;
                let a = null;
                const o = Math.max(1, Math.floor(r)) % 2 / 2
                  , _ = n * h + o;
                for (let n = s.to - 1; n >= s.from; --n) {
                    const s = i[n];
                    if (s) {
                        const i = e(t, s);
                        i !== a && (l.beginPath(),
                        null !== a && l.fill(),
                        l.fillStyle = i,
                        a = i);
                        const n = Math.round(s.nt * r) + o
                          , u = s.st * h;
                        l.moveTo(n, u),
                        l.arc(n, u, _, 0, 2 * Math.PI)
                    }
                }
                l.fill()
            }(t, i, l, n, o)
        }
    }
    class Ct extends kt {
        Ds(t, i) {
            return i.lt
        }
    }
    function Tt(t, i, n, s, e=0, r=i.length) {
        let h = r - e;
        for (; 0 < h; ) {
            const r = h >> 1
              , l = e + r;
            s(i[l], n) === t ? (e = l + 1,
            h -= r + 1) : h = r
        }
        return e
    }
    const Pt = Tt.bind(null, !0)
      , Rt = Tt.bind(null, !1);
    function Dt(t, i) {
        return t.ot < i
    }
    function Ot(t, i) {
        return i < t.ot
    }
    function Bt(t, i, n) {
        const s = i.Os()
          , e = i.ui()
          , r = Pt(t, s, Dt)
          , h = Rt(t, e, Ot);
        if (!n)
            return {
                from: r,
                to: h
            };
        let l = r
          , a = h;
        return r > 0 && r < t.length && t[r].ot >= s && (l = r - 1),
        h > 0 && h < t.length && t[h - 1].ot <= e && (a = h + 1),
        {
            from: l,
            to: a
        }
    }
    class At {
        constructor(t, i, n) {
            this.Bs = !0,
            this.As = !0,
            this.zs = !0,
            this.Vs = [],
            this.Es = null,
            this.Is = t,
            this.Ls = i,
            this.Ns = n
        }
        bt(t) {
            this.Bs = !0,
            "data" === t && (this.As = !0),
            "options" === t && (this.zs = !0)
        }
        gt() {
            return this.Is.kt() ? (this.Fs(),
            null === this.Es ? null : this.Ws) : null
        }
        js() {
            this.Vs = this.Vs.map((t=>Object.assign(Object.assign({}, t), this.Is.$s().Hs(t.ot))))
        }
        Us() {
            this.Es = null
        }
        Fs() {
            this.As && (this.qs(),
            this.As = !1),
            this.zs && (this.js(),
            this.zs = !1),
            this.Bs && (this.Ys(),
            this.Bs = !1)
        }
        Ys() {
            const t = this.Is.Dt()
              , i = this.Ls.St();
            if (this.Us(),
            i.Ni() || t.Ni())
                return;
            const n = i.Xs();
            if (null === n)
                return;
            if (0 === this.Is.Vn().Ks())
                return;
            const s = this.Is.Ct();
            null !== s && (this.Es = Bt(this.Vs, n, this.Ns),
            this.Zs(t, i, s.Ot),
            this.Gs())
        }
    }
    class zt extends At {
        constructor(t, i) {
            super(t, i, !0)
        }
        Zs(t, i, n) {
            i.Js(this.Vs, A(this.Es)),
            t.Qs(this.Vs, n, A(this.Es))
        }
        te(t, i) {
            return {
                ot: t,
                _t: i,
                nt: NaN,
                st: NaN
            }
        }
        qs() {
            const t = this.Is.$s();
            this.Vs = this.Is.Vn().ie().map((i=>{
                const n = i.Ot[3];
                return this.ne(i.se, n, t)
            }
            ))
        }
    }
    class Vt extends zt {
        constructor(t, i) {
            super(t, i),
            this.Ws = new I,
            this.ee = new St,
            this.re = new Ct,
            this.Ws.X([this.ee, this.re])
        }
        ne(t, i, n) {
            return Object.assign(Object.assign({}, this.te(t, i)), n.Hs(t))
        }
        Gs() {
            const t = this.Is.W();
            this.ee.J({
                ds: t.lineType,
                it: this.Vs,
                Nt: t.lineStyle,
                et: t.lineWidth,
                fs: null,
                vs: t.invertFilledArea,
                tt: this.Es,
                cs: this.Ls.St().he()
            }),
            this.re.J({
                ds: t.lineVisible ? t.lineType : void 0,
                it: this.Vs,
                Nt: t.lineStyle,
                et: t.lineWidth,
                tt: this.Es,
                cs: this.Ls.St().he(),
                Rs: t.pointMarkersVisible ? t.pointMarkersRadius || t.lineWidth / 2 + 2 : void 0
            })
        }
    }
    class Et extends L {
        constructor() {
            super(...arguments),
            this.Et = null,
            this.le = 0,
            this.ae = 0
        }
        J(t) {
            this.Et = t
        }
        Z({context: t, horizontalPixelRatio: i, verticalPixelRatio: n}) {
            if (null === this.Et || 0 === this.Et.Vn.length || null === this.Et.tt)
                return;
            if (this.le = this.oe(i),
            this.le >= 2) {
                Math.max(1, Math.floor(i)) % 2 != this.le % 2 && this.le--
            }
            this.ae = this.Et._e ? Math.min(this.le, Math.floor(i)) : this.le;
            let s = null;
            const e = this.ae <= this.le && this.Et.he >= Math.floor(1.5 * i);
            for (let r = this.Et.tt.from; r < this.Et.tt.to; ++r) {
                const h = this.Et.Vn[r];
                s !== h.ue && (t.fillStyle = h.ue,
                s = h.ue);
                const l = Math.floor(.5 * this.ae)
                  , a = Math.round(h.nt * i)
                  , o = a - l
                  , _ = this.ae
                  , u = o + _ - 1
                  , c = Math.min(h.ce, h.de)
                  , d = Math.max(h.ce, h.de)
                  , f = Math.round(c * n) - l
                  , v = Math.round(d * n) + l
                  , p = Math.max(v - f, this.ae);
                t.fillRect(o, f, _, p);
                const m = Math.ceil(1.5 * this.le);
                if (e) {
                    if (this.Et.fe) {
                        const i = a - m;
                        let s = Math.max(f, Math.round(h.ve * n) - l)
                          , e = s + _ - 1;
                        e > f + p - 1 && (e = f + p - 1,
                        s = e - _ + 1),
                        t.fillRect(i, s, o - i, e - s + 1)
                    }
                    const i = a + m;
                    let s = Math.max(f, Math.round(h.pe * n) - l)
                      , e = s + _ - 1;
                    e > f + p - 1 && (e = f + p - 1,
                    s = e - _ + 1),
                    t.fillRect(u + 1, s, i - u, e - s + 1)
                }
            }
        }
        oe(t) {
            const i = Math.floor(t);
            return Math.max(i, Math.floor(function(t, i) {
                return Math.floor(.3 * t * i)
            }(f(this.Et).he, t)))
        }
    }
    class It extends At {
        constructor(t, i) {
            super(t, i, !1)
        }
        Zs(t, i, n) {
            i.Js(this.Vs, A(this.Es)),
            t.me(this.Vs, n, A(this.Es))
        }
        be(t, i, n) {
            return {
                ot: t,
                we: i.Ot[0],
                ge: i.Ot[1],
                Me: i.Ot[2],
                xe: i.Ot[3],
                nt: NaN,
                ve: NaN,
                ce: NaN,
                de: NaN,
                pe: NaN
            }
        }
        qs() {
            const t = this.Is.$s();
            this.Vs = this.Is.Vn().ie().map((i=>this.ne(i.se, i, t)))
        }
    }
    class Lt extends It {
        constructor() {
            super(...arguments),
            this.Ws = new Et
        }
        ne(t, i, n) {
            return Object.assign(Object.assign({}, this.be(t, i, n)), n.Hs(t))
        }
        Gs() {
            const t = this.Is.W();
            this.Ws.J({
                Vn: this.Vs,
                he: this.Ls.St().he(),
                fe: t.openVisible,
                _e: t.thinBars,
                tt: this.Es
            })
        }
    }
    class Nt extends bt {
        constructor() {
            super(...arguments),
            this.Cs = new xt
        }
        ps(t, i) {
            const n = this.G;
            return this.Cs.bs(t, {
                gs: i.Se,
                Ms: i.ye,
                xs: i.ke,
                Ss: i.Ce,
                ys: t.bitmapSize.height,
                fs: n.fs
            })
        }
    }
    class Ft extends kt {
        constructor() {
            super(...arguments),
            this.Te = new xt
        }
        Ds(t, i) {
            const n = this.G;
            return this.Te.bs(t, {
                gs: i.Pe,
                Ms: i.Pe,
                xs: i.Re,
                Ss: i.Re,
                ys: t.bitmapSize.height,
                fs: n.fs
            })
        }
    }
    class Wt extends zt {
        constructor(t, i) {
            super(t, i),
            this.Ws = new I,
            this.De = new Nt,
            this.Oe = new Ft,
            this.Ws.X([this.De, this.Oe])
        }
        ne(t, i, n) {
            return Object.assign(Object.assign({}, this.te(t, i)), n.Hs(t))
        }
        Gs() {
            const t = this.Is.Ct();
            if (null === t)
                return;
            const i = this.Is.W()
              , n = this.Is.Dt().Rt(i.baseValue.price, t.Ot)
              , s = this.Ls.St().he();
            this.De.J({
                it: this.Vs,
                et: i.lineWidth,
                Nt: i.lineStyle,
                ds: i.lineType,
                fs: n,
                vs: !1,
                tt: this.Es,
                cs: s
            }),
            this.Oe.J({
                it: this.Vs,
                et: i.lineWidth,
                Nt: i.lineStyle,
                ds: i.lineVisible ? i.lineType : void 0,
                Rs: i.pointMarkersVisible ? i.pointMarkersRadius || i.lineWidth / 2 + 2 : void 0,
                fs: n,
                tt: this.Es,
                cs: s
            })
        }
    }
    class jt extends L {
        constructor() {
            super(...arguments),
            this.Et = null,
            this.le = 0
        }
        J(t) {
            this.Et = t
        }
        Z(t) {
            if (null === this.Et || 0 === this.Et.Vn.length || null === this.Et.tt)
                return;
            const {horizontalPixelRatio: i} = t;
            if (this.le = function(t, i) {
                if (t >= 2.5 && t <= 4)
                    return Math.floor(3 * i);
                const n = 1 - .2 * Math.atan(Math.max(4, t) - 4) / (.5 * Math.PI)
                  , s = Math.floor(t * n * i)
                  , e = Math.floor(t * i)
                  , r = Math.min(s, e);
                return Math.max(Math.floor(i), r)
            }(this.Et.he, i),
            this.le >= 2) {
                Math.floor(i) % 2 != this.le % 2 && this.le--
            }
            const n = this.Et.Vn;
            this.Et.Be && this.Ae(t, n, this.Et.tt),
            this.Et._i && this.ze(t, n, this.Et.tt);
            const s = this.Ve(i);
            (!this.Et._i || this.le > 2 * s) && this.Ee(t, n, this.Et.tt)
        }
        Ae(t, i, n) {
            if (null === this.Et)
                return;
            const {context: s, horizontalPixelRatio: e, verticalPixelRatio: r} = t;
            let h = ""
              , l = Math.min(Math.floor(e), Math.floor(this.Et.he * e));
            l = Math.max(Math.floor(e), Math.min(l, this.le));
            const a = Math.floor(.5 * l);
            let o = null;
            for (let t = n.from; t < n.to; t++) {
                const n = i[t];
                n.Ie !== h && (s.fillStyle = n.Ie,
                h = n.Ie);
                const _ = Math.round(Math.min(n.ve, n.pe) * r)
                  , u = Math.round(Math.max(n.ve, n.pe) * r)
                  , c = Math.round(n.ce * r)
                  , d = Math.round(n.de * r);
                let f = Math.round(e * n.nt) - a;
                const v = f + l - 1;
                null !== o && (f = Math.max(o + 1, f),
                f = Math.min(f, v));
                const p = v - f + 1;
                s.fillRect(f, c, p, _ - c),
                s.fillRect(f, u + 1, p, d - u),
                o = v
            }
        }
        Ve(t) {
            let i = Math.floor(1 * t);
            this.le <= 2 * i && (i = Math.floor(.5 * (this.le - 1)));
            const n = Math.max(Math.floor(t), i);
            return this.le <= 2 * n ? Math.max(Math.floor(t), Math.floor(1 * t)) : n
        }
        ze(t, i, n) {
            if (null === this.Et)
                return;
            const {context: s, horizontalPixelRatio: e, verticalPixelRatio: r} = t;
            let h = "";
            const l = this.Ve(e);
            let a = null;
            for (let t = n.from; t < n.to; t++) {
                const n = i[t];
                n.Le !== h && (s.fillStyle = n.Le,
                h = n.Le);
                let o = Math.round(n.nt * e) - Math.floor(.5 * this.le);
                const _ = o + this.le - 1
                  , u = Math.round(Math.min(n.ve, n.pe) * r)
                  , c = Math.round(Math.max(n.ve, n.pe) * r);
                if (null !== a && (o = Math.max(a + 1, o),
                o = Math.min(o, _)),
                this.Et.he * e > 2 * l)
                    U(s, o, u, _ - o + 1, c - u + 1, l);
                else {
                    const t = _ - o + 1;
                    s.fillRect(o, u, t, c - u + 1)
                }
                a = _
            }
        }
        Ee(t, i, n) {
            if (null === this.Et)
                return;
            const {context: s, horizontalPixelRatio: e, verticalPixelRatio: r} = t;
            let h = "";
            const l = this.Ve(e);
            for (let t = n.from; t < n.to; t++) {
                const n = i[t];
                let a = Math.round(Math.min(n.ve, n.pe) * r)
                  , o = Math.round(Math.max(n.ve, n.pe) * r)
                  , _ = Math.round(n.nt * e) - Math.floor(.5 * this.le)
                  , u = _ + this.le - 1;
                if (n.ue !== h) {
                    const t = n.ue;
                    s.fillStyle = t,
                    h = t
                }
                this.Et._i && (_ += l,
                a += l,
                u -= l,
                o -= l),
                a > o || s.fillRect(_, a, u - _ + 1, o - a + 1)
            }
        }
    }
    class Ht extends It {
        constructor() {
            super(...arguments),
            this.Ws = new jt
        }
        ne(t, i, n) {
            return Object.assign(Object.assign({}, this.be(t, i, n)), n.Hs(t))
        }
        Gs() {
            const t = this.Is.W();
            this.Ws.J({
                Vn: this.Vs,
                he: this.Ls.St().he(),
                Be: t.wickVisible,
                _i: t.borderVisible,
                tt: this.Es
            })
        }
    }
    class $t {
        constructor(t, i) {
            this.Ne = t,
            this.Ii = i
        }
        K(t, i, n) {
            this.Ne.draw(t, this.Ii, i, n)
        }
    }
    class Ut extends At {
        constructor(t, i, n) {
            super(t, i, !1),
            this.wn = n,
            this.Ws = new $t(this.wn.renderer(),(i=>{
                const n = t.Ct();
                return null === n ? null : t.Dt().Rt(i, n.Ot)
            }
            ))
        }
        Fe(t) {
            return this.wn.priceValueBuilder(t)
        }
        We(t) {
            return this.wn.isWhitespace(t)
        }
        qs() {
            const t = this.Is.$s();
            this.Vs = this.Is.Vn().ie().map((i=>Object.assign(Object.assign({
                ot: i.se,
                nt: NaN
            }, t.Hs(i.se)), {
                je: i.He
            })))
        }
        Zs(t, i) {
            i.Js(this.Vs, A(this.Es))
        }
        Gs() {
            this.wn.update({
                bars: this.Vs.map(qt),
                barSpacing: this.Ls.St().he(),
                visibleRange: this.Es
            }, this.Is.W())
        }
    }
    function qt(t) {
        return {
            x: t.nt,
            time: t.ot,
            originalData: t.je,
            barColor: t.ue
        }
    }
    class Yt extends L {
        constructor() {
            super(...arguments),
            this.Et = null,
            this.$e = []
        }
        J(t) {
            this.Et = t,
            this.$e = []
        }
        Z({context: t, horizontalPixelRatio: i, verticalPixelRatio: n}) {
            if (null === this.Et || 0 === this.Et.it.length || null === this.Et.tt)
                return;
            this.$e.length || this.Ue(i);
            const s = Math.max(1, Math.floor(n))
              , e = Math.round(this.Et.qe * n) - Math.floor(s / 2)
              , r = e + s;
            for (let i = this.Et.tt.from; i < this.Et.tt.to; i++) {
                const h = this.Et.it[i]
                  , l = this.$e[i - this.Et.tt.from]
                  , a = Math.round(h.st * n);
                let o, _;
                t.fillStyle = h.ue,
                a <= e ? (o = a,
                _ = r) : (o = e,
                _ = a - Math.floor(s / 2) + s),
                t.fillRect(l.Os, o, l.ui - l.Os + 1, _ - o)
            }
        }
        Ue(t) {
            if (null === this.Et || 0 === this.Et.it.length || null === this.Et.tt)
                return void (this.$e = []);
            const i = Math.ceil(this.Et.he * t) <= 1 ? 0 : Math.max(1, Math.floor(t))
              , n = Math.round(this.Et.he * t) - i;
            this.$e = new Array(this.Et.tt.to - this.Et.tt.from);
            for (let i = this.Et.tt.from; i < this.Et.tt.to; i++) {
                const s = this.Et.it[i]
                  , e = Math.round(s.nt * t);
                let r, h;
                if (n % 2) {
                    const t = (n - 1) / 2;
                    r = e - t,
                    h = e + t
                } else {
                    const t = n / 2;
                    r = e - t,
                    h = e + t - 1
                }
                this.$e[i - this.Et.tt.from] = {
                    Os: r,
                    ui: h,
                    Ye: e,
                    Xe: s.nt * t,
                    ot: s.ot
                }
            }
            for (let t = this.Et.tt.from + 1; t < this.Et.tt.to; t++) {
                const n = this.$e[t - this.Et.tt.from]
                  , s = this.$e[t - this.Et.tt.from - 1];
                n.ot === s.ot + 1 && (n.Os - s.ui !== i + 1 && (s.Ye > s.Xe ? s.ui = n.Os - i - 1 : n.Os = s.ui + i + 1))
            }
            let s = Math.ceil(this.Et.he * t);
            for (let t = this.Et.tt.from; t < this.Et.tt.to; t++) {
                const i = this.$e[t - this.Et.tt.from];
                i.ui < i.Os && (i.ui = i.Os);
                const n = i.ui - i.Os + 1;
                s = Math.min(n, s)
            }
            if (i > 0 && s < 4)
                for (let t = this.Et.tt.from; t < this.Et.tt.to; t++) {
                    const i = this.$e[t - this.Et.tt.from];
                    i.ui - i.Os + 1 > s && (i.Ye > i.Xe ? i.ui -= 1 : i.Os += 1)
                }
        }
    }
    class Xt extends zt {
        constructor() {
            super(...arguments),
            this.Ws = new Yt
        }
        ne(t, i, n) {
            return Object.assign(Object.assign({}, this.te(t, i)), n.Hs(t))
        }
        Gs() {
            const t = {
                it: this.Vs,
                he: this.Ls.St().he(),
                tt: this.Es,
                qe: this.Is.Dt().Rt(this.Is.W().base, f(this.Is.Ct()).Ot)
            };
            this.Ws.J(t)
        }
    }
    class Kt extends zt {
        constructor() {
            super(...arguments),
            this.Ws = new Ct
        }
        ne(t, i, n) {
            return Object.assign(Object.assign({}, this.te(t, i)), n.Hs(t))
        }
        Gs() {
            const t = this.Is.W()
              , i = {
                it: this.Vs,
                Nt: t.lineStyle,
                ds: t.lineVisible ? t.lineType : void 0,
                et: t.lineWidth,
                Rs: t.pointMarkersVisible ? t.pointMarkersRadius || t.lineWidth / 2 + 2 : void 0,
                tt: this.Es,
                cs: this.Ls.St().he()
            };
            this.Ws.J(i)
        }
    }
    const Zt = /[2-9]/g;
    class Gt {
        constructor(t=50) {
            this.Ke = 0,
            this.Ze = 1,
            this.Ge = 1,
            this.Je = {},
            this.Qe = new Map,
            this.tr = t
        }
        ir() {
            this.Ke = 0,
            this.Qe.clear(),
            this.Ze = 1,
            this.Ge = 1,
            this.Je = {}
        }
        xi(t, i, n) {
            return this.nr(t, i, n).width
        }
        Mi(t, i, n) {
            const s = this.nr(t, i, n);
            return ((s.actualBoundingBoxAscent || 0) - (s.actualBoundingBoxDescent || 0)) / 2
        }
        nr(t, i, n) {
            const s = n || Zt
              , e = String(i).replace(s, "0");
            if (this.Qe.has(e))
                return d(this.Qe.get(e)).sr;
            if (this.Ke === this.tr) {
                const t = this.Je[this.Ge];
                delete this.Je[this.Ge],
                this.Qe.delete(t),
                this.Ge++,
                this.Ke--
            }
            t.save(),
            t.textBaseline = "middle";
            const r = t.measureText(e);
            return t.restore(),
            0 === r.width && i.length || (this.Qe.set(e, {
                sr: r,
                er: this.Ze
            }),
            this.Je[this.Ze] = e,
            this.Ke++,
            this.Ze++),
            r
        }
    }
    class Jt {
        constructor(t) {
            this.rr = null,
            this.k = null,
            this.hr = "right",
            this.lr = t
        }
        ar(t, i, n) {
            this.rr = t,
            this.k = i,
            this.hr = n
        }
        K(t) {
            null !== this.k && null !== this.rr && this.rr.K(t, this.k, this.lr, this.hr)
        }
    }
    class Qt {
        constructor(t, i, n) {
            this._r = t,
            this.lr = new Gt(50),
            this.ur = i,
            this.F = n,
            this.j = -1,
            this.Wt = new Jt(this.lr)
        }
        gt() {
            const t = this.F.cr(this.ur);
            if (null === t)
                return null;
            const i = t.dr(this.ur) ? t.vr() : this.ur.Dt();
            if (null === i)
                return null;
            const n = t.pr(i);
            if ("overlay" === n)
                return null;
            const s = this.F.mr();
            return s.P !== this.j && (this.j = s.P,
            this.lr.ir()),
            this.Wt.ar(this._r.Vi(), s, n),
            this.Wt
        }
    }
    class ti extends L {
        constructor() {
            super(...arguments),
            this.Et = null
        }
        J(t) {
            this.Et = t
        }
        br(t, i) {
            var n;
            if (!(null === (n = this.Et) || void 0 === n ? void 0 : n.kt))
                return null;
            const {st: s, et: e, wr: r} = this.Et;
            return i >= s - e - 7 && i <= s + e + 7 ? {
                gr: this.Et,
                wr: r
            } : null
        }
        Z({context: t, bitmapSize: i, horizontalPixelRatio: n, verticalPixelRatio: s}) {
            if (null === this.Et)
                return;
            if (!1 === this.Et.kt)
                return;
            const e = Math.round(this.Et.st * s);
            e < 0 || e > i.height || (t.lineCap = "butt",
            t.strokeStyle = this.Et.O,
            t.lineWidth = Math.floor(this.Et.et * n),
            _(t, this.Et.Nt),
            u(t, e, 0, i.width))
        }
    }
    class ii {
        constructor(t) {
            this.Mr = {
                st: 0,
                O: "rgba(0, 0, 0, 0)",
                et: 1,
                Nt: 0,
                kt: !1
            },
            this.Sr = new ti,
            this.ft = !0,
            this.Is = t,
            this.Ls = t.$t(),
            this.Sr.J(this.Mr)
        }
        bt() {
            this.ft = !0
        }
        gt() {
            return this.Is.kt() ? (this.ft && (this.yr(),
            this.ft = !1),
            this.Sr) : null
        }
    }
    class ni extends ii {
        constructor(t) {
            super(t)
        }
        yr() {
            this.Mr.kt = !1;
            const t = this.Is.Dt()
              , i = t.kr().kr;
            if (2 !== i && 3 !== i)
                return;
            const n = this.Is.W();
            if (!n.baseLineVisible || !this.Is.kt())
                return;
            const s = this.Is.Ct();
            null !== s && (this.Mr.kt = !0,
            this.Mr.st = t.Rt(s.Ot, s.Ot),
            this.Mr.O = n.baseLineColor,
            this.Mr.et = n.baseLineWidth,
            this.Mr.Nt = n.baseLineStyle)
        }
    }
    class si extends L {
        constructor() {
            super(...arguments),
            this.Et = null
        }
        J(t) {
            this.Et = t
        }
        He() {
            return this.Et
        }
        Z({context: t, horizontalPixelRatio: i, verticalPixelRatio: n}) {
            const s = this.Et;
            if (null === s)
                return;
            const e = Math.max(1, Math.floor(i))
              , r = e % 2 / 2
              , h = Math.round(s.Xe.x * i) + r
              , l = s.Xe.y * n;
            t.fillStyle = s.Cr,
            t.beginPath();
            const a = Math.max(2, 1.5 * s.Tr) * i;
            t.arc(h, l, a, 0, 2 * Math.PI, !1),
            t.fill(),
            t.fillStyle = s.Pr,
            t.beginPath(),
            t.arc(h, l, s.ht * i, 0, 2 * Math.PI, !1),
            t.fill(),
            t.lineWidth = e,
            t.strokeStyle = s.Rr,
            t.beginPath(),
            t.arc(h, l, s.ht * i + e / 2, 0, 2 * Math.PI, !1),
            t.stroke()
        }
    }
    const ei = [{
        Dr: 0,
        Or: .25,
        Br: 4,
        Ar: 10,
        zr: .25,
        Vr: 0,
        Er: .4,
        Ir: .8
    }, {
        Dr: .25,
        Or: .525,
        Br: 10,
        Ar: 14,
        zr: 0,
        Vr: 0,
        Er: .8,
        Ir: 0
    }, {
        Dr: .525,
        Or: 1,
        Br: 14,
        Ar: 14,
        zr: 0,
        Vr: 0,
        Er: 0,
        Ir: 0
    }];
    function ri(t, i, n, s) {
        return function(t, i) {
            if ("transparent" === t)
                return t;
            const n = S(t)
              , s = n[3];
            return `rgba(${n[0]}, ${n[1]}, ${n[2]}, ${i * s})`
        }(t, n + (s - n) * i)
    }
    function hi(t, i) {
        const n = t % 2600 / 2600;
        let s;
        for (const t of ei)
            if (n >= t.Dr && n <= t.Or) {
                s = t;
                break
            }
        c(void 0 !== s, "Last price animation internal logic error");
        const e = (n - s.Dr) / (s.Or - s.Dr);
        return {
            Pr: ri(i, e, s.zr, s.Vr),
            Rr: ri(i, e, s.Er, s.Ir),
            ht: (r = e,
            h = s.Br,
            l = s.Ar,
            h + (l - h) * r)
        };
        var r, h, l
    }
    class li {
        constructor(t) {
            this.Wt = new si,
            this.ft = !0,
            this.Lr = !0,
            this.Nr = performance.now(),
            this.Fr = this.Nr - 1,
            this.Wr = t
        }
        jr() {
            this.Fr = this.Nr - 1,
            this.bt()
        }
        Hr() {
            if (this.bt(),
            2 === this.Wr.W().lastPriceAnimation) {
                const t = performance.now()
                  , i = this.Fr - t;
                if (i > 0)
                    return void (i < 650 && (this.Fr += 2600));
                this.Nr = t,
                this.Fr = t + 2600
            }
        }
        bt() {
            this.ft = !0
        }
        $r() {
            this.Lr = !0
        }
        kt() {
            return 0 !== this.Wr.W().lastPriceAnimation
        }
        Ur() {
            switch (this.Wr.W().lastPriceAnimation) {
            case 0:
                return !1;
            case 1:
                return !0;
            case 2:
                return performance.now() <= this.Fr
            }
        }
        gt() {
            return this.ft ? (this.Mt(),
            this.ft = !1,
            this.Lr = !1) : this.Lr && (this.qr(),
            this.Lr = !1),
            this.Wt
        }
        Mt() {
            this.Wt.J(null);
            const t = this.Wr.$t().St()
              , i = t.Xs()
              , n = this.Wr.Ct();
            if (null === i || null === n)
                return;
            const s = this.Wr.Yr(!0);
            if (s.Xr || !i.Kr(s.se))
                return;
            const e = {
                x: t.Vt(s.se),
                y: this.Wr.Dt().Rt(s._t, n.Ot)
            }
              , r = s.O
              , h = this.Wr.W().lineWidth
              , l = hi(this.Zr(), r);
            this.Wt.J({
                Cr: r,
                Tr: h,
                Pr: l.Pr,
                Rr: l.Rr,
                ht: l.ht,
                Xe: e
            })
        }
        qr() {
            const t = this.Wt.He();
            if (null !== t) {
                const i = hi(this.Zr(), t.Cr);
                t.Pr = i.Pr,
                t.Rr = i.Rr,
                t.ht = i.ht
            }
        }
        Zr() {
            return this.Ur() ? performance.now() - this.Nr : 2599
        }
    }
    function ai(t, i) {
        return Mt(Math.min(Math.max(t, 12), 30) * i)
    }
    function oi(t, i) {
        switch (t) {
        case "arrowDown":
        case "arrowUp":
            return ai(i, 1);
        case "circle":
            return ai(i, .8);
        case "square":
            return ai(i, .7)
        }
    }
    function _i(t) {
        return function(t) {
            const i = Math.ceil(t);
            return i % 2 != 0 ? i - 1 : i
        }(ai(t, 1))
    }
    function ui(t) {
        return Math.max(ai(t, .1), 3)
    }
    function ci(t, i, n) {
        return i ? t : n ? Math.ceil(t / 2) : 0
    }
    function di(t, i, n, s, e) {
        const r = oi("square", n)
          , h = (r - 1) / 2
          , l = t - h
          , a = i - h;
        return s >= l && s <= l + r && e >= a && e <= a + r
    }
    function fi(t, i, n, s) {
        const e = (oi("arrowUp", s) - 1) / 2 * n.Gr
          , r = (Mt(s / 2) - 1) / 2 * n.Gr;
        i.beginPath(),
        t ? (i.moveTo(n.nt - e, n.st),
        i.lineTo(n.nt, n.st - e),
        i.lineTo(n.nt + e, n.st),
        i.lineTo(n.nt + r, n.st),
        i.lineTo(n.nt + r, n.st + e),
        i.lineTo(n.nt - r, n.st + e),
        i.lineTo(n.nt - r, n.st)) : (i.moveTo(n.nt - e, n.st),
        i.lineTo(n.nt, n.st + e),
        i.lineTo(n.nt + e, n.st),
        i.lineTo(n.nt + r, n.st),
        i.lineTo(n.nt + r, n.st - e),
        i.lineTo(n.nt - r, n.st - e),
        i.lineTo(n.nt - r, n.st)),
        i.fill()
    }
    function vi(t, i, n, s, e, r) {
        return di(i, n, s, e, r)
    }
    class pi extends L {
        constructor() {
            super(...arguments),
            this.Et = null,
            this.lr = new Gt,
            this.j = -1,
            this.H = "",
            this.Jr = ""
        }
        J(t) {
            this.Et = t
        }
        ar(t, i) {
            this.j === t && this.H === i || (this.j = t,
            this.H = i,
            this.Jr = V(t, i),
            this.lr.ir())
        }
        br(t, i) {
            if (null === this.Et || null === this.Et.tt)
                return null;
            for (let n = this.Et.tt.from; n < this.Et.tt.to; n++) {
                const s = this.Et.it[n];
                if (bi(s, t, i))
                    return {
                        gr: s.Qr,
                        wr: s.wr
                    }
            }
            return null
        }
        Z({context: t, horizontalPixelRatio: i, verticalPixelRatio: n}, s, e) {
            if (null !== this.Et && null !== this.Et.tt) {
                t.textBaseline = "middle",
                t.font = this.Jr;
                for (let s = this.Et.tt.from; s < this.Et.tt.to; s++) {
                    const e = this.Et.it[s];
                    void 0 !== e.Zt && (e.Zt.Hi = this.lr.xi(t, e.Zt.th),
                    e.Zt.zt = this.j,
                    e.Zt.nt = e.nt - e.Zt.Hi / 2),
                    mi(e, t, i, n)
                }
            }
        }
    }
    function mi(t, i, n, s) {
        i.fillStyle = t.O,
        void 0 !== t.Zt && function(t, i, n, s, e, r) {
            t.save(),
            t.scale(e, r),
            t.fillText(i, n, s),
            t.restore()
        }(i, t.Zt.th, t.Zt.nt, t.Zt.st, n, s),
        function(t, i, n) {
            if (0 === t.Ks)
                return;
            switch (t.ih) {
            case "arrowDown":
                return void fi(!1, i, n, t.Ks);
            case "arrowUp":
                return void fi(!0, i, n, t.Ks);
            case "circle":
                return void function(t, i, n) {
                    const s = (oi("circle", n) - 1) / 2;
                    t.beginPath(),
                    t.arc(i.nt, i.st, s * i.Gr, 0, 2 * Math.PI, !1),
                    t.fill()
                }(i, n, t.Ks);
            case "square":
                return void function(t, i, n) {
                    const s = oi("square", n)
                      , e = (s - 1) * i.Gr / 2
                      , r = i.nt - e
                      , h = i.st - e;
                    t.fillRect(r, h, s * i.Gr, s * i.Gr)
                }(i, n, t.Ks)
            }
            t.ih
        }(t, i, function(t, i, n) {
            const s = Math.max(1, Math.floor(i)) % 2 / 2;
            return {
                nt: Math.round(t.nt * i) + s,
                st: t.st * n,
                Gr: i
            }
        }(t, n, s))
    }
    function bi(t, i, n) {
        return !(void 0 === t.Zt || !function(t, i, n, s, e, r) {
            const h = s / 2;
            return e >= t && e <= t + n && r >= i - h && r <= i + h
        }(t.Zt.nt, t.Zt.st, t.Zt.Hi, t.Zt.zt, i, n)) || function(t, i, n) {
            if (0 === t.Ks)
                return !1;
            switch (t.ih) {
            case "arrowDown":
            case "arrowUp":
                return vi(0, t.nt, t.st, t.Ks, i, n);
            case "circle":
                return function(t, i, n, s, e) {
                    const r = 2 + oi("circle", n) / 2
                      , h = t - s
                      , l = i - e;
                    return Math.sqrt(h * h + l * l) <= r
                }(t.nt, t.st, t.Ks, i, n);
            case "square":
                return di(t.nt, t.st, t.Ks, i, n)
            }
        }(t, i, n)
    }
    function wi(t, i, n, s, e, r, h, l, a) {
        const o = T(n) ? n : n.xe
          , _ = T(n) ? n : n.ge
          , u = T(n) ? n : n.Me
          , c = T(i.size) ? Math.max(i.size, 0) : 1
          , d = _i(l.he()) * c
          , f = d / 2;
        switch (t.Ks = d,
        i.position) {
        case "inBar":
            return t.st = h.Rt(o, a),
            void (void 0 !== t.Zt && (t.Zt.st = t.st + f + r + .6 * e));
        case "aboveBar":
            return t.st = h.Rt(_, a) - f - s.nh,
            void 0 !== t.Zt && (t.Zt.st = t.st - f - .6 * e,
            s.nh += 1.2 * e),
            void (s.nh += d + r);
        case "belowBar":
            return t.st = h.Rt(u, a) + f + s.sh,
            void 0 !== t.Zt && (t.Zt.st = t.st + f + r + .6 * e,
            s.sh += 1.2 * e),
            void (s.sh += d + r)
        }
        i.position
    }
    class gi {
        constructor(t, i) {
            this.ft = !0,
            this.eh = !0,
            this.rh = !0,
            this.hh = null,
            this.ah = null,
            this.Wt = new pi,
            this.Wr = t,
            this.$i = i,
            this.Et = {
                it: [],
                tt: null
            }
        }
        bt(t) {
            this.ft = !0,
            this.rh = !0,
            "data" === t && (this.eh = !0,
            this.ah = null)
        }
        gt(t) {
            if (!this.Wr.kt())
                return null;
            this.ft && this.oh();
            const i = this.$i.W().layout;
            return this.Wt.ar(i.fontSize, i.fontFamily),
            this.Wt.J(this.Et),
            this.Wt
        }
        _h() {
            if (this.rh) {
                if (this.Wr.uh().length > 0) {
                    const t = this.$i.St().he()
                      , i = ui(t)
                      , n = 1.5 * _i(t) + 2 * i
                      , s = this.dh();
                    this.hh = {
                        above: ci(n, s.aboveBar, s.inBar),
                        below: ci(n, s.belowBar, s.inBar)
                    }
                } else
                    this.hh = null;
                this.rh = !1
            }
            return this.hh
        }
        dh() {
            return null === this.ah && (this.ah = this.Wr.uh().reduce(((t,i)=>(t[i.position] || (t[i.position] = !0),
            t)), {
                inBar: !1,
                aboveBar: !1,
                belowBar: !1
            })),
            this.ah
        }
        oh() {
            const t = this.Wr.Dt()
              , i = this.$i.St()
              , n = this.Wr.uh();
            this.eh && (this.Et.it = n.map((t=>({
                ot: t.time,
                nt: 0,
                st: 0,
                Ks: 0,
                ih: t.shape,
                O: t.color,
                Qr: t.Qr,
                wr: t.id,
                Zt: void 0
            }))),
            this.eh = !1);
            const s = this.$i.W().layout;
            this.Et.tt = null;
            const e = i.Xs();
            if (null === e)
                return;
            const r = this.Wr.Ct();
            if (null === r)
                return;
            if (0 === this.Et.it.length)
                return;
            let h = NaN;
            const l = ui(i.he())
              , a = {
                nh: l,
                sh: l
            };
            this.Et.tt = Bt(this.Et.it, e, !0);
            for (let e = this.Et.tt.from; e < this.Et.tt.to; e++) {
                const o = n[e];
                o.time !== h && (a.nh = l,
                a.sh = l,
                h = o.time);
                const _ = this.Et.it[e];
                _.nt = i.Vt(o.time),
                void 0 !== o.text && o.text.length > 0 && (_.Zt = {
                    th: o.text,
                    nt: 0,
                    st: 0,
                    Hi: 0,
                    zt: 0
                });
                const u = this.Wr.fh(o.time);
                null !== u && wi(_, o, u, a, s.fontSize, l, t, i, r.Ot)
            }
            this.ft = !1
        }
    }
    class Mi extends ii {
        constructor(t) {
            super(t)
        }
        yr() {
            const t = this.Mr;
            t.kt = !1;
            const i = this.Is.W();
            if (!i.priceLineVisible || !this.Is.kt())
                return;
            const n = this.Is.Yr(0 === i.priceLineSource);
            n.Xr || (t.kt = !0,
            t.st = n.yi,
            t.O = this.Is.ph(n.O),
            t.et = i.priceLineWidth,
            t.Nt = i.priceLineStyle)
        }
    }
    class xi extends G {
        constructor(t) {
            super(),
            this.jt = t
        }
        Ei(t, i, n) {
            t.kt = !1,
            i.kt = !1;
            const s = this.jt;
            if (!s.kt())
                return;
            const e = s.W()
              , r = e.lastValueVisible
              , h = "" !== s.mh()
              , l = 0 === e.seriesLastValueMode
              , a = s.Yr(!1);
            if (a.Xr)
                return;
            r && (t.Zt = this.bh(a, r, l),
            t.kt = 0 !== t.Zt.length),
            (h || l) && (i.Zt = this.wh(a, r, h, l),
            i.kt = i.Zt.length > 0);
            const o = s.ph(a.O)
              , _ = y(o);
            n.t = _.t,
            n.yi = a.yi,
            i.Bt = s.$t().At(a.yi / s.Dt().zt()),
            t.Bt = o,
            t.O = _.i,
            i.O = _.i
        }
        wh(t, i, n, s) {
            let e = "";
            const r = this.jt.mh();
            return n && 0 !== r.length && (e += `${r} `),
            i && s && (e += this.jt.Dt().gh() ? t.Mh : t.xh),
            e.trim()
        }
        bh(t, i, n) {
            return i ? n ? this.jt.Dt().gh() ? t.xh : t.Mh : t.Zt : ""
        }
    }
    function Si(t, i, n, s) {
        const e = Number.isFinite(i)
          , r = Number.isFinite(n);
        return e && r ? t(i, n) : e || r ? e ? i : n : s
    }
    class yi {
        constructor(t, i) {
            this.Sh = t,
            this.yh = i
        }
        kh(t) {
            return null !== t && (this.Sh === t.Sh && this.yh === t.yh)
        }
        Ch() {
            return new yi(this.Sh,this.yh)
        }
        Th() {
            return this.Sh
        }
        Ph() {
            return this.yh
        }
        Rh() {
            return this.yh - this.Sh
        }
        Ni() {
            return this.yh === this.Sh || Number.isNaN(this.yh) || Number.isNaN(this.Sh)
        }
        ts(t) {
            return null === t ? this : new yi(Si(Math.min, this.Th(), t.Th(), -1 / 0),Si(Math.max, this.Ph(), t.Ph(), 1 / 0))
        }
        Dh(t) {
            if (!T(t))
                return;
            if (0 === this.yh - this.Sh)
                return;
            const i = .5 * (this.yh + this.Sh);
            let n = this.yh - i
              , s = this.Sh - i;
            n *= t,
            s *= t,
            this.yh = i + n,
            this.Sh = i + s
        }
        Oh(t) {
            T(t) && (this.yh += t,
            this.Sh += t)
        }
        Bh() {
            return {
                minValue: this.Sh,
                maxValue: this.yh
            }
        }
        static Ah(t) {
            return null === t ? null : new yi(t.minValue,t.maxValue)
        }
    }
    class ki {
        constructor(t, i) {
            this.zh = t,
            this.Vh = i || null
        }
        Eh() {
            return this.zh
        }
        Ih() {
            return this.Vh
        }
        Bh() {
            return null === this.zh ? null : {
                priceRange: this.zh.Bh(),
                margins: this.Vh || void 0
            }
        }
        static Ah(t) {
            return null === t ? null : new ki(yi.Ah(t.priceRange),t.margins)
        }
    }
    class Ci extends ii {
        constructor(t, i) {
            super(t),
            this.Lh = i
        }
        yr() {
            const t = this.Mr;
            t.kt = !1;
            const i = this.Lh.W();
            if (!this.Is.kt() || !i.lineVisible)
                return;
            const n = this.Lh.Nh();
            null !== n && (t.kt = !0,
            t.st = n,
            t.O = i.color,
            t.et = i.lineWidth,
            t.Nt = i.lineStyle,
            t.wr = this.Lh.W().id)
        }
    }
    class Ti extends G {
        constructor(t, i) {
            super(),
            this.Wr = t,
            this.Lh = i
        }
        Ei(t, i, n) {
            t.kt = !1,
            i.kt = !1;
            const s = this.Lh.W()
              , e = s.axisLabelVisible
              , r = "" !== s.title
              , h = this.Wr;
            if (!e || !h.kt())
                return;
            const l = this.Lh.Nh();
            if (null === l)
                return;
            r && (i.Zt = s.title,
            i.kt = !0),
            i.Bt = h.$t().At(l / h.Dt().zt()),
            t.Zt = this.Fh(s.price),
            t.kt = !0;
            const a = y(s.axisLabelColor || s.color);
            n.t = a.t;
            const o = s.axisLabelTextColor || a.i;
            t.O = o,
            i.O = o,
            n.yi = l
        }
        Fh(t) {
            const i = this.Wr.Ct();
            return null === i ? "" : this.Wr.Dt().Fi(t, i.Ot)
        }
    }
    class Pi {
        constructor(t, i) {
            this.Wr = t,
            this.cn = i,
            this.Wh = new Ci(t,this),
            this._r = new Ti(t,this),
            this.jh = new Qt(this._r,t,t.$t())
        }
        Hh(t) {
            C(this.cn, t),
            this.bt(),
            this.Wr.$t().$h()
        }
        W() {
            return this.cn
        }
        Uh() {
            return this.Wh
        }
        qh() {
            return this.jh
        }
        Yh() {
            return this._r
        }
        bt() {
            this.Wh.bt(),
            this._r.bt()
        }
        Nh() {
            const t = this.Wr
              , i = t.Dt();
            if (t.$t().St().Ni() || i.Ni())
                return null;
            const n = t.Ct();
            return null === n ? null : i.Rt(this.cn.price, n.Ot)
        }
    }
    class Ri extends nt {
        constructor(t) {
            super(),
            this.$i = t
        }
        $t() {
            return this.$i
        }
    }
    const Di = {
        Bar: (t,i,n,s)=>{
            var e;
            const r = i.upColor
              , h = i.downColor
              , l = f(t(n, s))
              , a = v(l.Ot[0]) <= v(l.Ot[3]);
            return {
                ue: null !== (e = l.O) && void 0 !== e ? e : a ? r : h
            }
        }
        ,
        Candlestick: (t,i,n,s)=>{
            var e, r, h;
            const l = i.upColor
              , a = i.downColor
              , o = i.borderUpColor
              , _ = i.borderDownColor
              , u = i.wickUpColor
              , c = i.wickDownColor
              , d = f(t(n, s))
              , p = v(d.Ot[0]) <= v(d.Ot[3]);
            return {
                ue: null !== (e = d.O) && void 0 !== e ? e : p ? l : a,
                Le: null !== (r = d.Bt) && void 0 !== r ? r : p ? o : _,
                Ie: null !== (h = d.Xh) && void 0 !== h ? h : p ? u : c
            }
        }
        ,
        Custom: (t,i,n,s)=>{
            var e;
            return {
                ue: null !== (e = f(t(n, s)).O) && void 0 !== e ? e : i.color
            }
        }
        ,
        Area: (t,i,n,s)=>{
            var e, r, h, l;
            const a = f(t(n, s));
            return {
                ue: null !== (e = a.lt) && void 0 !== e ? e : i.lineColor,
                lt: null !== (r = a.lt) && void 0 !== r ? r : i.lineColor,
                Ts: null !== (h = a.Ts) && void 0 !== h ? h : i.topColor,
                Ps: null !== (l = a.Ps) && void 0 !== l ? l : i.bottomColor
            }
        }
        ,
        Baseline: (t,i,n,s)=>{
            var e, r, h, l, a, o;
            const _ = f(t(n, s));
            return {
                ue: _.Ot[3] >= i.baseValue.price ? i.topLineColor : i.bottomLineColor,
                Pe: null !== (e = _.Pe) && void 0 !== e ? e : i.topLineColor,
                Re: null !== (r = _.Re) && void 0 !== r ? r : i.bottomLineColor,
                Se: null !== (h = _.Se) && void 0 !== h ? h : i.topFillColor1,
                ye: null !== (l = _.ye) && void 0 !== l ? l : i.topFillColor2,
                ke: null !== (a = _.ke) && void 0 !== a ? a : i.bottomFillColor1,
                Ce: null !== (o = _.Ce) && void 0 !== o ? o : i.bottomFillColor2
            }
        }
        ,
        Line: (t,i,n,s)=>{
            var e, r;
            const h = f(t(n, s));
            return {
                ue: null !== (e = h.O) && void 0 !== e ? e : i.color,
                lt: null !== (r = h.O) && void 0 !== r ? r : i.color
            }
        }
        ,
        Histogram: (t,i,n,s)=>{
            var e;
            return {
                ue: null !== (e = f(t(n, s)).O) && void 0 !== e ? e : i.color
            }
        }
    };
    class Oi {
        constructor(t) {
            this.Kh = (t,i)=>void 0 !== i ? i.Ot : this.Wr.Vn().Zh(t),
            this.Wr = t,
            this.Gh = Di[t.Jh()]
        }
        Hs(t, i) {
            return this.Gh(this.Kh, this.Wr.W(), t, i)
        }
    }
    var Bi;
    !function(t) {
        t[t.NearestLeft = -1] = "NearestLeft",
        t[t.None = 0] = "None",
        t[t.NearestRight = 1] = "NearestRight"
    }(Bi || (Bi = {}));
    const Ai = 30;
    class zi {
        constructor() {
            this.Qh = [],
            this.tl = new Map,
            this.il = new Map
        }
        nl() {
            return this.Ks() > 0 ? this.Qh[this.Qh.length - 1] : null
        }
        sl() {
            return this.Ks() > 0 ? this.el(0) : null
        }
        zn() {
            return this.Ks() > 0 ? this.el(this.Qh.length - 1) : null
        }
        Ks() {
            return this.Qh.length
        }
        Ni() {
            return 0 === this.Ks()
        }
        Kr(t) {
            return null !== this.rl(t, 0)
        }
        Zh(t) {
            return this.hl(t)
        }
        hl(t, i=0) {
            const n = this.rl(t, i);
            return null === n ? null : Object.assign(Object.assign({}, this.ll(n)), {
                se: this.el(n)
            })
        }
        ie() {
            return this.Qh
        }
        al(t, i, n) {
            if (this.Ni())
                return null;
            let s = null;
            for (const e of n) {
                s = Vi(s, this.ol(t, i, e))
            }
            return s
        }
        J(t) {
            this.il.clear(),
            this.tl.clear(),
            this.Qh = t
        }
        el(t) {
            return this.Qh[t].se
        }
        ll(t) {
            return this.Qh[t]
        }
        rl(t, i) {
            const n = this._l(t);
            if (null === n && 0 !== i)
                switch (i) {
                case -1:
                    return this.ul(t);
                case 1:
                    return this.cl(t);
                default:
                    throw new TypeError("Unknown search mode")
                }
            return n
        }
        ul(t) {
            let i = this.dl(t);
            return i > 0 && (i -= 1),
            i !== this.Qh.length && this.el(i) < t ? i : null
        }
        cl(t) {
            const i = this.fl(t);
            return i !== this.Qh.length && t < this.el(i) ? i : null
        }
        _l(t) {
            const i = this.dl(t);
            return i === this.Qh.length || t < this.Qh[i].se ? null : i
        }
        dl(t) {
            return Pt(this.Qh, t, ((t,i)=>t.se < i))
        }
        fl(t) {
            return Rt(this.Qh, t, ((t,i)=>t.se > i))
        }
        vl(t, i, n) {
            let s = null;
            for (let e = t; e < i; e++) {
                const t = this.Qh[e].Ot[n];
                Number.isNaN(t) || (null === s ? s = {
                    pl: t,
                    ml: t
                } : (t < s.pl && (s.pl = t),
                t > s.ml && (s.ml = t)))
            }
            return s
        }
        ol(t, i, n) {
            if (this.Ni())
                return null;
            let s = null;
            const e = f(this.sl())
              , r = f(this.zn())
              , h = Math.max(t, e)
              , l = Math.min(i, r)
              , a = Math.ceil(h / Ai) * Ai
              , o = Math.max(a, Math.floor(l / Ai) * Ai);
            {
                const t = this.dl(h)
                  , e = this.fl(Math.min(l, a, i));
                s = Vi(s, this.vl(t, e, n))
            }
            let _ = this.tl.get(n);
            void 0 === _ && (_ = new Map,
            this.tl.set(n, _));
            for (let t = Math.max(a + 1, h); t < o; t += Ai) {
                const i = Math.floor(t / Ai);
                let e = _.get(i);
                if (void 0 === e) {
                    const t = this.dl(i * Ai)
                      , s = this.fl((i + 1) * Ai - 1);
                    e = this.vl(t, s, n),
                    _.set(i, e)
                }
                s = Vi(s, e)
            }
            {
                const t = this.dl(o)
                  , i = this.fl(l);
                s = Vi(s, this.vl(t, i, n))
            }
            return s
        }
    }
    function Vi(t, i) {
        if (null === t)
            return i;
        if (null === i)
            return t;
        return {
            pl: Math.min(t.pl, i.pl),
            ml: Math.max(t.ml, i.ml)
        }
    }
    class Ei {
        constructor(t) {
            this.bl = t
        }
        K(t, i, n) {
            this.bl.draw(t)
        }
        wl(t, i, n) {
            var s, e;
            null === (e = (s = this.bl).drawBackground) || void 0 === e || e.call(s, t)
        }
    }
    class Ii {
        constructor(t) {
            this.Qe = null,
            this.wn = t
        }
        gt() {
            var t;
            const i = this.wn.renderer();
            if (null === i)
                return null;
            if ((null === (t = this.Qe) || void 0 === t ? void 0 : t.gl) === i)
                return this.Qe.Ml;
            const n = new Ei(i);
            return this.Qe = {
                gl: i,
                Ml: n
            },
            n
        }
        xl() {
            var t, i, n;
            return null !== (n = null === (i = (t = this.wn).zOrder) || void 0 === i ? void 0 : i.call(t)) && void 0 !== n ? n : "normal"
        }
    }
    function Li(t) {
        var i, n, s, e, r;
        return {
            Zt: t.text(),
            yi: t.coordinate(),
            Si: null === (i = t.fixedCoordinate) || void 0 === i ? void 0 : i.call(t),
            O: t.textColor(),
            t: t.backColor(),
            kt: null === (s = null === (n = t.visible) || void 0 === n ? void 0 : n.call(t)) || void 0 === s || s,
            hi: null === (r = null === (e = t.tickVisible) || void 0 === e ? void 0 : e.call(t)) || void 0 === r || r
        }
    }
    class Ni {
        constructor(t, i) {
            this.Wt = new tt,
            this.Sl = t,
            this.yl = i
        }
        gt() {
            return this.Wt.J(Object.assign({
                Hi: this.yl.Hi()
            }, Li(this.Sl))),
            this.Wt
        }
    }
    class Fi extends G {
        constructor(t, i) {
            super(),
            this.Sl = t,
            this.Ii = i
        }
        Ei(t, i, n) {
            const s = Li(this.Sl);
            n.t = s.t,
            t.O = s.O;
            const e = 2 / 12 * this.Ii.P();
            n.wi = e,
            n.gi = e,
            n.yi = s.yi,
            n.Si = s.Si,
            t.Zt = s.Zt,
            t.kt = s.kt,
            t.hi = s.hi
        }
    }
    class Wi {
        constructor(t, i) {
            this.kl = null,
            this.Cl = null,
            this.Tl = null,
            this.Pl = null,
            this.Rl = null,
            this.Dl = t,
            this.Wr = i
        }
        Ol() {
            return this.Dl
        }
        On() {
            var t, i;
            null === (i = (t = this.Dl).updateAllViews) || void 0 === i || i.call(t)
        }
        Pn() {
            var t, i, n, s;
            const e = null !== (n = null === (i = (t = this.Dl).paneViews) || void 0 === i ? void 0 : i.call(t)) && void 0 !== n ? n : [];
            if ((null === (s = this.kl) || void 0 === s ? void 0 : s.gl) === e)
                return this.kl.Ml;
            const r = e.map((t=>new Ii(t)));
            return this.kl = {
                gl: e,
                Ml: r
            },
            r
        }
        Qi() {
            var t, i, n, s;
            const e = null !== (n = null === (i = (t = this.Dl).timeAxisViews) || void 0 === i ? void 0 : i.call(t)) && void 0 !== n ? n : [];
            if ((null === (s = this.Cl) || void 0 === s ? void 0 : s.gl) === e)
                return this.Cl.Ml;
            const r = this.Wr.$t().St()
              , h = e.map((t=>new Ni(t,r)));
            return this.Cl = {
                gl: e,
                Ml: h
            },
            h
        }
        Rn() {
            var t, i, n, s;
            const e = null !== (n = null === (i = (t = this.Dl).priceAxisViews) || void 0 === i ? void 0 : i.call(t)) && void 0 !== n ? n : [];
            if ((null === (s = this.Tl) || void 0 === s ? void 0 : s.gl) === e)
                return this.Tl.Ml;
            const r = this.Wr.Dt()
              , h = e.map((t=>new Fi(t,r)));
            return this.Tl = {
                gl: e,
                Ml: h
            },
            h
        }
        Bl() {
            var t, i, n, s;
            const e = null !== (n = null === (i = (t = this.Dl).priceAxisPaneViews) || void 0 === i ? void 0 : i.call(t)) && void 0 !== n ? n : [];
            if ((null === (s = this.Pl) || void 0 === s ? void 0 : s.gl) === e)
                return this.Pl.Ml;
            const r = e.map((t=>new Ii(t)));
            return this.Pl = {
                gl: e,
                Ml: r
            },
            r
        }
        Al() {
            var t, i, n, s;
            const e = null !== (n = null === (i = (t = this.Dl).timeAxisPaneViews) || void 0 === i ? void 0 : i.call(t)) && void 0 !== n ? n : [];
            if ((null === (s = this.Rl) || void 0 === s ? void 0 : s.gl) === e)
                return this.Rl.Ml;
            const r = e.map((t=>new Ii(t)));
            return this.Rl = {
                gl: e,
                Ml: r
            },
            r
        }
        zl(t, i) {
            var n, s, e;
            return null !== (e = null === (s = (n = this.Dl).autoscaleInfo) || void 0 === s ? void 0 : s.call(n, t, i)) && void 0 !== e ? e : null
        }
        br(t, i) {
            var n, s, e;
            return null !== (e = null === (s = (n = this.Dl).hitTest) || void 0 === s ? void 0 : s.call(n, t, i)) && void 0 !== e ? e : null
        }
    }
    function ji(t, i, n, s) {
        t.forEach((t=>{
            i(t).forEach((t=>{
                t.xl() === n && s.push(t)
            }
            ))
        }
        ))
    }
    function Hi(t) {
        return t.Pn()
    }
    function $i(t) {
        return t.Bl()
    }
    function Ui(t) {
        return t.Al()
    }
    class qi extends Ri {
        constructor(t, i, n, s, e) {
            super(t),
            this.Et = new zi,
            this.Wh = new Mi(this),
            this.Vl = [],
            this.El = new ni(this),
            this.Il = null,
            this.Ll = null,
            this.Nl = [],
            this.Fl = [],
            this.Wl = null,
            this.jl = [],
            this.cn = i,
            this.Hl = n;
            const r = new xi(this);
            this.rn = [r],
            this.jh = new Qt(r,this,t),
            "Area" !== n && "Line" !== n && "Baseline" !== n || (this.Il = new li(this)),
            this.$l(),
            this.Ul(e)
        }
        S() {
            null !== this.Wl && clearTimeout(this.Wl)
        }
        ph(t) {
            return this.cn.priceLineColor || t
        }
        Yr(t) {
            const i = {
                Xr: !0
            }
              , n = this.Dt();
            if (this.$t().St().Ni() || n.Ni() || this.Et.Ni())
                return i;
            const s = this.$t().St().Xs()
              , e = this.Ct();
            if (null === s || null === e)
                return i;
            let r, h;
            if (t) {
                const t = this.Et.nl();
                if (null === t)
                    return i;
                r = t,
                h = t.se
            } else {
                const t = this.Et.hl(s.ui(), -1);
                if (null === t)
                    return i;
                if (r = this.Et.Zh(t.se),
                null === r)
                    return i;
                h = t.se
            }
            const l = r.Ot[3]
              , a = this.$s().Hs(h, {
                Ot: r
            })
              , o = n.Rt(l, e.Ot);
            return {
                Xr: !1,
                _t: l,
                Zt: n.Fi(l, e.Ot),
                Mh: n.ql(l),
                xh: n.Yl(l, e.Ot),
                O: a.ue,
                yi: o,
                se: h
            }
        }
        $s() {
            return null !== this.Ll || (this.Ll = new Oi(this)),
            this.Ll
        }
        W() {
            return this.cn
        }
        Hh(t) {
            const i = t.priceScaleId;
            void 0 !== i && i !== this.cn.priceScaleId && this.$t().Xl(this, i),
            C(this.cn, t),
            void 0 !== t.priceFormat && (this.$l(),
            this.$t().Kl()),
            this.$t().Zl(this),
            this.$t().Gl(),
            this.wn.bt("options")
        }
        J(t, i) {
            this.Et.J(t),
            this.Jl(),
            this.wn.bt("data"),
            this.dn.bt("data"),
            null !== this.Il && (i && i.Ql ? this.Il.Hr() : 0 === t.length && this.Il.jr());
            const n = this.$t().cr(this);
            this.$t().ta(n),
            this.$t().Zl(this),
            this.$t().Gl(),
            this.$t().$h()
        }
        setMarkerData(timeData) {
            this.Nl = timeData,
            this.Jl();
            const i = this.$t().cr(this);
            this.dn.bt("data"),
            this.$t().ta(i),
            this.$t().Zl(this),
            this.$t().Gl(),
            this.$t().$h()
        }
        na() {
            return this.Nl
        }
        uh() {
            return this.Fl
        }
        sa(t) {
            const i = new Pi(this,t);
            return this.Vl.push(i),
            this.$t().Zl(this),
            i
        }
        ea(t) {
            const i = this.Vl.indexOf(t);
            -1 !== i && this.Vl.splice(i, 1),
            this.$t().Zl(this)
        }
        Jh() {
            return this.Hl
        }
        Ct() {
            const t = this.ra();
            return null === t ? null : {
                Ot: t.Ot[3],
                ha: t.ot
            }
        }
        ra() {
            const t = this.$t().St().Xs();
            if (null === t)
                return null;
            const i = t.Os();
            return this.Et.hl(i, 1)
        }
        Vn() {
            return this.Et
        }
        fh(t) {
            const i = this.Et.Zh(t);
            return null === i ? null : "Bar" === this.Hl || "Candlestick" === this.Hl || "Custom" === this.Hl ? {
                we: i.Ot[0],
                ge: i.Ot[1],
                Me: i.Ot[2],
                xe: i.Ot[3]
            } : i.Ot[3]
        }
        la(t) {
            const i = [];
            ji(this.jl, Hi, "top", i);
            const n = this.Il;
            return null !== n && n.kt() ? (null === this.Wl && n.Ur() && (this.Wl = setTimeout((()=>{
                this.Wl = null,
                this.$t().aa()
            }
            ), 0)),
            n.$r(),
            i.unshift(n),
            i) : i
        }
        Pn() {
            const t = [];
            this.oa() || t.push(this.El),
            t.push(this.wn, this.Wh, this.dn);
            const i = this.Vl.map((t=>t.Uh()));
            return t.push(...i),
            ji(this.jl, Hi, "normal", t),
            t
        }
        _a() {
            return this.ua(Hi, "bottom")
        }
        ca(t) {
            return this.ua($i, t)
        }
        da(t) {
            return this.ua(Ui, t)
        }
        fa(t, i) {
            return this.jl.map((n=>n.br(t, i))).filter((t=>null !== t))
        }
        Ji(t) {
            return [this.jh, ...this.Vl.map((t=>t.qh()))]
        }
        Rn(t, i) {
            if (i !== this.Yi && !this.oa())
                return [];
            const n = [...this.rn];
            for (const t of this.Vl)
                n.push(t.Yh());
            return this.jl.forEach((t=>{
                n.push(...t.Rn())
            }
            )),
            n
        }
        Qi() {
            const t = [];
            return this.jl.forEach((i=>{
                t.push(...i.Qi())
            }
            )),
            t
        }
        zl(t, i) {
            if (void 0 !== this.cn.autoscaleInfoProvider) {
                const n = this.cn.autoscaleInfoProvider((()=>{
                    const n = this.va(t, i);
                    return null === n ? null : n.Bh()
                }
                ));
                return ki.Ah(n)
            }
            return this.va(t, i)
        }
        pa() {
            return this.cn.priceFormat.minMove
        }
        ma() {
            return this.ba
        }
        On() {
            var t;
            this.wn.bt(),
            this.dn.bt();
            for (const t of this.rn)
                t.bt();
            for (const t of this.Vl)
                t.bt();
            this.Wh.bt(),
            this.El.bt(),
            null === (t = this.Il) || void 0 === t || t.bt(),
            this.jl.forEach((t=>t.On()))
        }
        Dt() {
            return f(super.Dt())
        }
        yt(t) {
            if (!(("Line" === this.Hl || "Area" === this.Hl || "Baseline" === this.Hl) && this.cn.crosshairMarkerVisible))
                return null;
            const i = this.Et.Zh(t);
            if (null === i)
                return null;
            return {
                _t: i.Ot[3],
                ht: this.wa(),
                Bt: this.ga(),
                Pt: this.Ma(),
                Tt: this.xa(t)
            }
        }
        mh() {
            return this.cn.title
        }
        kt() {
            return this.cn.visible
        }
        Sa(t) {
            this.jl.push(new Wi(t,this))
        }
        ya(t) {
            this.jl = this.jl.filter((i=>i.Ol() !== t))
        }
        ka() {
            if (this.wn instanceof Ut != !1)
                return t=>this.wn.Fe(t)
        }
        Ca() {
            if (this.wn instanceof Ut != !1)
                return t=>this.wn.We(t)
        }
        oa() {
            return !rt(this.Dt().Ta())
        }
        va(t, i) {
            if (!P(t) || !P(i) || this.Et.Ni())
                return null;
            const n = "Line" === this.Hl || "Area" === this.Hl || "Baseline" === this.Hl || "Histogram" === this.Hl ? [3] : [2, 1]
              , s = this.Et.al(t, i, n);
            let e = null !== s ? new yi(s.pl,s.ml) : null;
            if ("Histogram" === this.Jh()) {
                const t = this.cn.base
                  , i = new yi(t,t);
                e = null !== e ? e.ts(i) : i
            }
            let r = this.dn._h();
            return this.jl.forEach((n=>{
                const s = n.zl(t, i);
                if (null == s ? void 0 : s.priceRange) {
                    const t = new yi(s.priceRange.minValue,s.priceRange.maxValue);
                    e = null !== e ? e.ts(t) : t
                }
                var h, l, a, o;
                (null == s ? void 0 : s.margins) && (h = r,
                l = s.margins,
                r = {
                    above: Math.max(null !== (a = null == h ? void 0 : h.above) && void 0 !== a ? a : 0, l.above),
                    below: Math.max(null !== (o = null == h ? void 0 : h.below) && void 0 !== o ? o : 0, l.below)
                })
            }
            )),
            new ki(e,r)
        }
        wa() {
            switch (this.Hl) {
            case "Line":
            case "Area":
            case "Baseline":
                return this.cn.crosshairMarkerRadius
            }
            return 0
        }
        ga() {
            switch (this.Hl) {
            case "Line":
            case "Area":
            case "Baseline":
                {
                    const t = this.cn.crosshairMarkerBorderColor;
                    if (0 !== t.length)
                        return t
                }
            }
            return null
        }
        Ma() {
            switch (this.Hl) {
            case "Line":
            case "Area":
            case "Baseline":
                return this.cn.crosshairMarkerBorderWidth
            }
            return 0
        }
        xa(t) {
            switch (this.Hl) {
            case "Line":
            case "Area":
            case "Baseline":
                {
                    const t = this.cn.crosshairMarkerBackgroundColor;
                    if (0 !== t.length)
                        return t
                }
            }
            return this.$s().Hs(t).ue
        }
        $l() {
            switch (this.cn.priceFormat.type) {
            case "custom":
                this.ba = {
                    format: this.cn.priceFormat.formatter
                };
                break;
            case "volume":
                this.ba = new ut(this.cn.priceFormat.precision);
                break;
            case "percent":
                this.ba = new _t(this.cn.priceFormat.precision);
                break;
            default:
                {
                    const t = Math.pow(10, this.cn.priceFormat.precision);
                    this.ba = new ot(t,this.cn.priceFormat.minMove * t)
                }
            }
            null !== this.Yi && this.Yi.Pa()
        }
        Jl() {
            const t = this.$t().St();
            if (!t.Ra() || this.Et.Ni())
                return void (this.Fl = []);
            const i = f(this.Et.sl());
            this.Fl = this.Nl.map(((n,s)=>{
                const e = f(t.Da(n.time, !0))
                  , r = e < i ? 1 : -1;
                return {
                    time: f(this.Et.hl(e, r)).se,
                    position: n.position,
                    shape: n.shape,
                    color: n.color,
                    id: n.id,
                    Qr: s,
                    text: n.text,
                    size: n.size,
                    originalTime: n.originalTime
                }
            }
            ))
        }
        Ul(t) {
            switch (this.dn = new gi(this,this.$t()),
            this.Hl) {
            case "Bar":
                this.wn = new Lt(this,this.$t());
                break;
            case "Candlestick":
                this.wn = new Ht(this,this.$t());
                break;
            case "Line":
                this.wn = new Kt(this,this.$t());
                break;
            case "Custom":
                this.wn = new Ut(this,this.$t(),d(t));
                break;
            case "Area":
                this.wn = new Vt(this,this.$t());
                break;
            case "Baseline":
                this.wn = new Wt(this,this.$t());
                break;
            case "Histogram":
                this.wn = new Xt(this,this.$t());
                break;
            default:
                throw Error("Unknown chart style assigned: " + this.Hl)
            }
        }
        ua(t, i) {
            const n = [];
            return ji(this.jl, t, i, n),
            n
        }
    }
    class Yi {
        constructor(t) {
            this.cn = t
        }
        Oa(t, i, n) {
            let s = t;
            if (0 === this.cn.mode)
                return s;
            const e = n.vn()
              , r = e.Ct();
            if (null === r)
                return s;
            const h = e.Rt(t, r)
              , l = n.Ba().filter((t=>t instanceof qi)).reduce(((t,s)=>{
                if (n.dr(s) || !s.kt())
                    return t;
                const e = s.Dt()
                  , r = s.Vn();
                if (e.Ni() || !r.Kr(i))
                    return t;
                const h = r.Zh(i);
                if (null === h)
                    return t;
                const l = v(s.Ct());
                return t.concat([e.Rt(h.Ot[3], l.Ot)])
            }
            ), []);
            if (0 === l.length)
                return s;
            l.sort(((t,i)=>Math.abs(t - h) - Math.abs(i - h)));
            const a = l[0];
            return s = e.pn(a, r),
            s
        }
    }
    class Xi extends L {
        constructor() {
            super(...arguments),
            this.Et = null
        }
        J(t) {
            this.Et = t
        }
        Z({context: t, bitmapSize: i, horizontalPixelRatio: n, verticalPixelRatio: s}) {
            if (null === this.Et)
                return;
            const e = Math.max(1, Math.floor(n));
            t.lineWidth = e,
            function(t, i) {
                t.save(),
                t.lineWidth % 2 && t.translate(.5, .5),
                i(),
                t.restore()
            }(t, (()=>{
                const r = f(this.Et);
                if (r.Aa) {
                    t.strokeStyle = r.za,
                    _(t, r.Va),
                    t.beginPath();
                    for (const s of r.Ea) {
                        const r = Math.round(s.Ia * n);
                        t.moveTo(r, -e),
                        t.lineTo(r, i.height + e)
                    }
                    t.stroke()
                }
                if (r.La) {
                    t.strokeStyle = r.Na,
                    _(t, r.Fa),
                    t.beginPath();
                    for (const n of r.Wa) {
                        const r = Math.round(n.Ia * s);
                        t.moveTo(-e, r),
                        t.lineTo(i.width + e, r)
                    }
                    t.stroke()
                }
            }
            ))
        }
    }
    class Ki {
        constructor(t) {
            this.Wt = new Xi,
            this.ft = !0,
            this.tn = t
        }
        bt() {
            this.ft = !0
        }
        gt() {
            if (this.ft) {
                const t = this.tn.$t().W().grid
                  , i = {
                    La: t.horzLines.visible,
                    Aa: t.vertLines.visible,
                    Na: t.horzLines.color,
                    za: t.vertLines.color,
                    Fa: t.horzLines.style,
                    Va: t.vertLines.style,
                    Wa: this.tn.vn().ja(),
                    Ea: (this.tn.$t().St().ja() || []).map((t=>({
                        Ia: t.coord
                    })))
                };
                this.Wt.J(i),
                this.ft = !1
            }
            return this.Wt
        }
    }
    class Zi {
        constructor(t) {
            this.wn = new Ki(t)
        }
        Uh() {
            return this.wn
        }
    }
    const Gi = {
        Ha: 4,
        $a: 1e-4
    };
    function Ji(t, i) {
        const n = 100 * (t - i) / i;
        return i < 0 ? -n : n
    }
    function Qi(t, i) {
        const n = Ji(t.Th(), i)
          , s = Ji(t.Ph(), i);
        return new yi(n,s)
    }
    function tn(t, i) {
        const n = 100 * (t - i) / i + 100;
        return i < 0 ? -n : n
    }
    function nn(t, i) {
        const n = tn(t.Th(), i)
          , s = tn(t.Ph(), i);
        return new yi(n,s)
    }
    function sn(t, i) {
        const n = Math.abs(t);
        if (n < 1e-15)
            return 0;
        const s = Math.log10(n + i.$a) + i.Ha;
        return t < 0 ? -s : s
    }
    function en(t, i) {
        const n = Math.abs(t);
        if (n < 1e-15)
            return 0;
        const s = Math.pow(10, n - i.Ha) - i.$a;
        return t < 0 ? -s : s
    }
    function rn(t, i) {
        if (null === t)
            return null;
        const n = sn(t.Th(), i)
          , s = sn(t.Ph(), i);
        return new yi(n,s)
    }
    function hn(t, i) {
        if (null === t)
            return null;
        const n = en(t.Th(), i)
          , s = en(t.Ph(), i);
        return new yi(n,s)
    }
    function ln(t) {
        if (null === t)
            return Gi;
        const i = Math.abs(t.Ph() - t.Th());
        if (i >= 1 || i < 1e-15)
            return Gi;
        const n = Math.ceil(Math.abs(Math.log10(i)))
          , s = Gi.Ha + n;
        return {
            Ha: s,
            $a: 1 / Math.pow(10, s)
        }
    }
    class an {
        constructor(t, i) {
            if (this.Ua = t,
            this.qa = i,
            function(t) {
                if (t < 0)
                    return !1;
                for (let i = t; i > 1; i /= 10)
                    if (i % 10 != 0)
                        return !1;
                return !0
            }(this.Ua))
                this.Ya = [2, 2.5, 2];
            else {
                this.Ya = [];
                for (let t = this.Ua; 1 !== t; ) {
                    if (t % 2 == 0)
                        this.Ya.push(2),
                        t /= 2;
                    else {
                        if (t % 5 != 0)
                            throw new Error("unexpected base");
                        this.Ya.push(2, 2.5),
                        t /= 5
                    }
                    if (this.Ya.length > 100)
                        throw new Error("something wrong with base")
                }
            }
        }
        Xa(t, i, n) {
            const s = 0 === this.Ua ? 0 : 1 / this.Ua;
            let e = Math.pow(10, Math.max(0, Math.ceil(Math.log10(t - i))))
              , r = 0
              , h = this.qa[0];
            for (; ; ) {
                const t = gt(e, s, 1e-14) && e > s + 1e-14
                  , i = gt(e, n * h, 1e-14)
                  , l = gt(e, 1, 1e-14);
                if (!(t && i && l))
                    break;
                e /= h,
                h = this.qa[++r % this.qa.length]
            }
            if (e <= s + 1e-14 && (e = s),
            e = Math.max(1, e),
            this.Ya.length > 0 && (l = e,
            a = 1,
            o = 1e-14,
            Math.abs(l - a) < o))
                for (r = 0,
                h = this.Ya[0]; gt(e, n * h, 1e-14) && e > s + 1e-14; )
                    e /= h,
                    h = this.Ya[++r % this.Ya.length];
            var l, a, o;
            return e
        }
    }
    class on {
        constructor(t, i, n, s) {
            this.Ka = [],
            this.Ii = t,
            this.Ua = i,
            this.Za = n,
            this.Ga = s
        }
        Xa(t, i) {
            if (t < i)
                throw new Error("high < low");
            const n = this.Ii.zt()
              , s = (t - i) * this.Ja() / n
              , e = new an(this.Ua,[2, 2.5, 2])
              , r = new an(this.Ua,[2, 2, 2.5])
              , h = new an(this.Ua,[2.5, 2, 2])
              , l = [];
            return l.push(e.Xa(t, i, s), r.Xa(t, i, s), h.Xa(t, i, s)),
            function(t) {
                if (t.length < 1)
                    throw Error("array is empty");
                let i = t[0];
                for (let n = 1; n < t.length; ++n)
                    t[n] < i && (i = t[n]);
                return i
            }(l)
        }
        Qa() {
            const t = this.Ii
              , i = t.Ct();
            if (null === i)
                return void (this.Ka = []);
            const n = t.zt()
              , s = this.Za(n - 1, i)
              , e = this.Za(0, i)
              , r = this.Ii.W().entireTextOnly ? this.io() / 2 : 0
              , h = r
              , l = n - 1 - r
              , a = Math.max(s, e)
              , o = Math.min(s, e);
            if (a === o)
                return void (this.Ka = []);
            let _ = this.Xa(a, o)
              , u = a % _;
            u += u < 0 ? _ : 0;
            const c = a >= o ? 1 : -1;
            let d = null
              , f = 0;
            for (let n = a - u; n > o; n -= _) {
                const s = this.Ga(n, i, !0);
                null !== d && Math.abs(s - d) < this.Ja() || (s < h || s > l || (f < this.Ka.length ? (this.Ka[f].Ia = s,
                this.Ka[f].no = t.so(n)) : this.Ka.push({
                    Ia: s,
                    no: t.so(n)
                }),
                f++,
                d = s,
                t.eo() && (_ = this.Xa(n * c, o))))
            }
            this.Ka.length = f
        }
        ja() {
            return this.Ka
        }
        io() {
            return this.Ii.P()
        }
        Ja() {
            return Math.ceil(2.5 * this.io())
        }
    }
    function _n(t) {
        return t.slice().sort(((t,i)=>f(t.Ki()) - f(i.Ki())))
    }
    var un;
    !function(t) {
        t[t.Normal = 0] = "Normal",
        t[t.Logarithmic = 1] = "Logarithmic",
        t[t.Percentage = 2] = "Percentage",
        t[t.IndexedTo100 = 3] = "IndexedTo100"
    }(un || (un = {}));
    const cn = new _t
      , dn = new ot(100,1);
    class fn {
        constructor(t, i, n, s) {
            this.ro = 0,
            this.ho = null,
            this.zh = null,
            this.lo = null,
            this.ao = {
                oo: !1,
                _o: null
            },
            this.uo = 0,
            this.co = 0,
            this.do = new k,
            this.fo = new k,
            this.vo = [],
            this.po = null,
            this.mo = null,
            this.bo = null,
            this.wo = null,
            this.ba = dn,
            this.Mo = ln(null),
            this.xo = t,
            this.cn = i,
            this.So = n,
            this.yo = s,
            this.ko = new on(this,100,this.Co.bind(this),this.To.bind(this))
        }
        Ta() {
            return this.xo
        }
        W() {
            return this.cn
        }
        Hh(t) {
            if (C(this.cn, t),
            this.Pa(),
            void 0 !== t.mode && this.Po({
                kr: t.mode
            }),
            void 0 !== t.scaleMargins) {
                const i = d(t.scaleMargins.top)
                  , n = d(t.scaleMargins.bottom);
                if (i < 0 || i > 1)
                    throw new Error(`Invalid top margin - expect value between 0 and 1, given=${i}`);
                if (n < 0 || n > 1)
                    throw new Error(`Invalid bottom margin - expect value between 0 and 1, given=${n}`);
                if (i + n > 1)
                    throw new Error(`Invalid margins - sum of margins must be less than 1, given=${i + n}`);
                this.Ro(),
                this.mo = null
            }
        }
        Do() {
            return this.cn.autoScale
        }
        eo() {
            return 1 === this.cn.mode
        }
        gh() {
            return 2 === this.cn.mode
        }
        Oo() {
            return 3 === this.cn.mode
        }
        kr() {
            return {
                Wn: this.cn.autoScale,
                Bo: this.cn.invertScale,
                kr: this.cn.mode
            }
        }
        Po(t) {
            const i = this.kr();
            let n = null;
            void 0 !== t.Wn && (this.cn.autoScale = t.Wn),
            void 0 !== t.kr && (this.cn.mode = t.kr,
            2 !== t.kr && 3 !== t.kr || (this.cn.autoScale = !0),
            this.ao.oo = !1),
            1 === i.kr && t.kr !== i.kr && (!function(t, i) {
                if (null === t)
                    return !1;
                const n = en(t.Th(), i)
                  , s = en(t.Ph(), i);
                return isFinite(n) && isFinite(s)
            }(this.zh, this.Mo) ? this.cn.autoScale = !0 : (n = hn(this.zh, this.Mo),
            null !== n && this.Ao(n))),
            1 === t.kr && t.kr !== i.kr && (n = rn(this.zh, this.Mo),
            null !== n && this.Ao(n));
            const s = i.kr !== this.cn.mode;
            s && (2 === i.kr || this.gh()) && this.Pa(),
            s && (3 === i.kr || this.Oo()) && this.Pa(),
            void 0 !== t.Bo && i.Bo !== t.Bo && (this.cn.invertScale = t.Bo,
            this.zo()),
            this.fo.m(i, this.kr())
        }
        Vo() {
            return this.fo
        }
        P() {
            return this.So.fontSize
        }
        zt() {
            return this.ro
        }
        Eo(t) {
            this.ro !== t && (this.ro = t,
            this.Ro(),
            this.mo = null)
        }
        Io() {
            if (this.ho)
                return this.ho;
            const t = this.zt() - this.Lo() - this.No();
            return this.ho = t,
            t
        }
        Eh() {
            return this.Fo(),
            this.zh
        }
        Ao(t, i) {
            const n = this.zh;
            (i || null === n && null !== t || null !== n && !n.kh(t)) && (this.mo = null,
            this.zh = t)
        }
        Ni() {
            return this.Fo(),
            0 === this.ro || !this.zh || this.zh.Ni()
        }
        Wo(t) {
            return this.Bo() ? t : this.zt() - 1 - t
        }
        Rt(t, i) {
            return this.gh() ? t = Ji(t, i) : this.Oo() && (t = tn(t, i)),
            this.To(t, i)
        }
        Qs(t, i, n) {
            this.Fo();
            const s = this.No()
              , e = f(this.Eh())
              , r = e.Th()
              , h = e.Ph()
              , l = this.Io() - 1
              , a = this.Bo()
              , o = l / (h - r)
              , _ = void 0 === n ? 0 : n.from
              , u = void 0 === n ? t.length : n.to
              , c = this.jo();
            for (let n = _; n < u; n++) {
                const e = t[n]
                  , h = e._t;
                if (isNaN(h))
                    continue;
                let l = h;
                null !== c && (l = c(e._t, i));
                const _ = s + o * (l - r)
                  , u = a ? _ : this.ro - 1 - _;
                e.st = u
            }
        }
        me(t, i, n) {
            this.Fo();
            const s = this.No()
              , e = f(this.Eh())
              , r = e.Th()
              , h = e.Ph()
              , l = this.Io() - 1
              , a = this.Bo()
              , o = l / (h - r)
              , _ = void 0 === n ? 0 : n.from
              , u = void 0 === n ? t.length : n.to
              , c = this.jo();
            for (let n = _; n < u; n++) {
                const e = t[n];
                let h = e.we
                  , l = e.ge
                  , _ = e.Me
                  , u = e.xe;
                null !== c && (h = c(e.we, i),
                l = c(e.ge, i),
                _ = c(e.Me, i),
                u = c(e.xe, i));
                let d = s + o * (h - r)
                  , f = a ? d : this.ro - 1 - d;
                e.ve = f,
                d = s + o * (l - r),
                f = a ? d : this.ro - 1 - d,
                e.ce = f,
                d = s + o * (_ - r),
                f = a ? d : this.ro - 1 - d,
                e.de = f,
                d = s + o * (u - r),
                f = a ? d : this.ro - 1 - d,
                e.pe = f
            }
        }
        pn(t, i) {
            const n = this.Co(t, i);
            return this.Ho(n, i)
        }
        Ho(t, i) {
            let n = t;
            return this.gh() ? n = function(t, i) {
                return i < 0 && (t = -t),
                t / 100 * i + i
            }(n, i) : this.Oo() && (n = function(t, i) {
                return t -= 100,
                i < 0 && (t = -t),
                t / 100 * i + i
            }(n, i)),
            n
        }
        Ba() {
            return this.vo
        }
        $o() {
            if (this.po)
                return this.po;
            let t = [];
            for (let i = 0; i < this.vo.length; i++) {
                const n = this.vo[i];
                null === n.Ki() && n.Zi(i + 1),
                t.push(n)
            }
            return t = _n(t),
            this.po = t,
            this.po
        }
        Uo(t) {
            -1 === this.vo.indexOf(t) && (this.vo.push(t),
            this.Pa(),
            this.qo())
        }
        Yo(t) {
            const i = this.vo.indexOf(t);
            if (-1 === i)
                throw new Error("source is not attached to scale");
            this.vo.splice(i, 1),
            0 === this.vo.length && (this.Po({
                Wn: !0
            }),
            this.Ao(null)),
            this.Pa(),
            this.qo()
        }
        Ct() {
            let t = null;
            for (const i of this.vo) {
                const n = i.Ct();
                null !== n && ((null === t || n.ha < t.ha) && (t = n))
            }
            return null === t ? null : t.Ot
        }
        Bo() {
            return this.cn.invertScale
        }
        ja() {
            const t = null === this.Ct();
            if (null !== this.mo && (t || this.mo.Xo === t))
                return this.mo.ja;
            this.ko.Qa();
            const i = this.ko.ja();
            return this.mo = {
                ja: i,
                Xo: t
            },
            this.do.m(),
            i
        }
        Ko() {
            return this.do
        }
        Zo(t) {
            this.gh() || this.Oo() || null === this.bo && null === this.lo && (this.Ni() || (this.bo = this.ro - t,
            this.lo = f(this.Eh()).Ch()))
        }
        Go(t) {
            if (this.gh() || this.Oo())
                return;
            if (null === this.bo)
                return;
            this.Po({
                Wn: !1
            }),
            (t = this.ro - t) < 0 && (t = 0);
            let i = (this.bo + .2 * (this.ro - 1)) / (t + .2 * (this.ro - 1));
            const n = f(this.lo).Ch();
            i = Math.max(i, .1),
            n.Dh(i),
            this.Ao(n)
        }
        Jo() {
            this.gh() || this.Oo() || (this.bo = null,
            this.lo = null)
        }
        Qo(t) {
            this.Do() || null === this.wo && null === this.lo && (this.Ni() || (this.wo = t,
            this.lo = f(this.Eh()).Ch()))
        }
        t_(t) {
            if (this.Do())
                return;
            if (null === this.wo)
                return;
            const i = f(this.Eh()).Rh() / (this.Io() - 1);
            let n = t - this.wo;
            this.Bo() && (n *= -1);
            const s = n * i
              , e = f(this.lo).Ch();
            e.Oh(s),
            this.Ao(e, !0),
            this.mo = null
        }
        i_() {
            this.Do() || null !== this.wo && (this.wo = null,
            this.lo = null)
        }
        ma() {
            return this.ba || this.Pa(),
            this.ba
        }
        Fi(t, i) {
            switch (this.cn.mode) {
            case 2:
                return this.n_(Ji(t, i));
            case 3:
                return this.ma().format(tn(t, i));
            default:
                return this.Fh(t)
            }
        }
        so(t) {
            switch (this.cn.mode) {
            case 2:
                return this.n_(t);
            case 3:
                return this.ma().format(t);
            default:
                return this.Fh(t)
            }
        }
        ql(t) {
            return this.Fh(t, f(this.s_()).ma())
        }
        Yl(t, i) {
            return t = Ji(t, i),
            this.n_(t, cn)
        }
        e_() {
            return this.vo
        }
        r_(t) {
            this.ao = {
                _o: t,
                oo: !1
            }
        }
        On() {
            this.vo.forEach((t=>t.On()))
        }
        Pa() {
            this.mo = null;
            const t = this.s_();
            let i = 100;
            null !== t && (i = Math.round(1 / t.pa())),
            this.ba = dn,
            this.gh() ? (this.ba = cn,
            i = 100) : this.Oo() ? (this.ba = new ot(100,1),
            i = 100) : null !== t && (this.ba = t.ma()),
            this.ko = new on(this,i,this.Co.bind(this),this.To.bind(this)),
            this.ko.Qa()
        }
        qo() {
            this.po = null
        }
        s_() {
            return this.vo[0] || null
        }
        Lo() {
            return this.Bo() ? this.cn.scaleMargins.bottom * this.zt() + this.co : this.cn.scaleMargins.top * this.zt() + this.uo
        }
        No() {
            return this.Bo() ? this.cn.scaleMargins.top * this.zt() + this.uo : this.cn.scaleMargins.bottom * this.zt() + this.co
        }
        Fo() {
            this.ao.oo || (this.ao.oo = !0,
            this.h_())
        }
        Ro() {
            this.ho = null
        }
        To(t, i) {
            if (this.Fo(),
            this.Ni())
                return 0;
            t = this.eo() && t ? sn(t, this.Mo) : t;
            const n = f(this.Eh())
              , s = this.No() + (this.Io() - 1) * (t - n.Th()) / n.Rh();
            return this.Wo(s)
        }
        Co(t, i) {
            if (this.Fo(),
            this.Ni())
                return 0;
            const n = this.Wo(t)
              , s = f(this.Eh())
              , e = s.Th() + s.Rh() * ((n - this.No()) / (this.Io() - 1));
            return this.eo() ? en(e, this.Mo) : e
        }
        zo() {
            this.mo = null,
            this.ko.Qa()
        }
        h_() {
            const t = this.ao._o;
            if (null === t)
                return;
            let i = null;
            const n = this.e_();
            let s = 0
              , e = 0;
            for (const r of n) {
                if (!r.kt())
                    continue;
                const n = r.Ct();
                if (null === n)
                    continue;
                const h = r.zl(t.Os(), t.ui());
                let l = h && h.Eh();
                if (null !== l) {
                    switch (this.cn.mode) {
                    case 1:
                        l = rn(l, this.Mo);
                        break;
                    case 2:
                        l = Qi(l, n.Ot);
                        break;
                    case 3:
                        l = nn(l, n.Ot)
                    }
                    if (i = null === i ? l : i.ts(f(l)),
                    null !== h) {
                        const t = h.Ih();
                        null !== t && (s = Math.max(s, t.above),
                        e = Math.max(e, t.below))
                    }
                }
            }
            if (s === this.uo && e === this.co || (this.uo = s,
            this.co = e,
            this.mo = null,
            this.Ro()),
            null !== i) {
                if (i.Th() === i.Ph()) {
                    const t = this.s_()
                      , n = 5 * (null === t || this.gh() || this.Oo() ? 1 : t.pa());
                    this.eo() && (i = hn(i, this.Mo)),
                    i = new yi(i.Th() - n,i.Ph() + n),
                    this.eo() && (i = rn(i, this.Mo))
                }
                if (this.eo()) {
                    const t = hn(i, this.Mo)
                      , n = ln(t);
                    if (r = n,
                    h = this.Mo,
                    r.Ha !== h.Ha || r.$a !== h.$a) {
                        const s = null !== this.lo ? hn(this.lo, this.Mo) : null;
                        this.Mo = n,
                        i = rn(t, n),
                        null !== s && (this.lo = rn(s, n))
                    }
                }
                this.Ao(i)
            } else
                null === this.zh && (this.Ao(new yi(-.5,.5)),
                this.Mo = ln(null));
            var r, h;
            this.ao.oo = !0
        }
        jo() {
            return this.gh() ? Ji : this.Oo() ? tn : this.eo() ? t=>sn(t, this.Mo) : null
        }
        l_(t, i, n) {
            return void 0 === i ? (void 0 === n && (n = this.ma()),
            n.format(t)) : i(t)
        }
        Fh(t, i) {
            return this.l_(t, this.yo.priceFormatter, i)
        }
        n_(t, i) {
            return this.l_(t, this.yo.percentageFormatter, i)
        }
    }
    class vn {
        constructor(t, i) {
            this.vo = [],
            this.a_ = new Map,
            this.ro = 0,
            this.o_ = 0,
            this.__ = 1e3,
            this.po = null,
            this.u_ = new k,
            this.yl = t,
            this.$i = i,
            this.c_ = new Zi(this);
            const n = i.W();
            this.d_ = this.f_("left", n.leftPriceScale),
            this.v_ = this.f_("right", n.rightPriceScale),
            this.d_.Vo().l(this.p_.bind(this, this.d_), this),
            this.v_.Vo().l(this.p_.bind(this, this.v_), this),
            this.m_(n)
        }
        m_(t) {
            if (t.leftPriceScale && this.d_.Hh(t.leftPriceScale),
            t.rightPriceScale && this.v_.Hh(t.rightPriceScale),
            t.localization && (this.d_.Pa(),
            this.v_.Pa()),
            t.overlayPriceScales) {
                const i = Array.from(this.a_.values());
                for (const n of i) {
                    const i = f(n[0].Dt());
                    i.Hh(t.overlayPriceScales),
                    t.localization && i.Pa()
                }
            }
        }
        b_(t) {
            switch (t) {
            case "left":
                return this.d_;
            case "right":
                return this.v_
            }
            return this.a_.has(t) ? d(this.a_.get(t))[0].Dt() : null
        }
        S() {
            this.$t().w_().p(this),
            this.d_.Vo().p(this),
            this.v_.Vo().p(this),
            this.vo.forEach((t=>{
                t.S && t.S()
            }
            )),
            this.u_.m()
        }
        g_() {
            return this.__
        }
        M_(t) {
            this.__ = t
        }
        $t() {
            return this.$i
        }
        Hi() {
            return this.o_
        }
        zt() {
            return this.ro
        }
        x_(t) {
            this.o_ = t,
            this.S_()
        }
        Eo(t) {
            this.ro = t,
            this.d_.Eo(t),
            this.v_.Eo(t),
            this.vo.forEach((i=>{
                if (this.dr(i)) {
                    const n = i.Dt();
                    null !== n && n.Eo(t)
                }
            }
            )),
            this.S_()
        }
        Ba() {
            return this.vo
        }
        dr(t) {
            const i = t.Dt();
            return null === i || this.d_ !== i && this.v_ !== i
        }
        Uo(t, i, n) {
            const s = void 0 !== n ? n : this.k_().y_ + 1;
            this.C_(t, i, s)
        }
        Yo(t) {
            const i = this.vo.indexOf(t);
            c(-1 !== i, "removeDataSource: invalid data source"),
            this.vo.splice(i, 1);
            const n = f(t.Dt()).Ta();
            if (this.a_.has(n)) {
                const i = d(this.a_.get(n))
                  , s = i.indexOf(t);
                -1 !== s && (i.splice(s, 1),
                0 === i.length && this.a_.delete(n))
            }
            const s = t.Dt();
            s && s.Ba().indexOf(t) >= 0 && s.Yo(t),
            null !== s && (s.qo(),
            this.T_(s)),
            this.po = null
        }
        pr(t) {
            return t === this.d_ ? "left" : t === this.v_ ? "right" : "overlay"
        }
        P_() {
            return this.d_
        }
        R_() {
            return this.v_
        }
        D_(t, i) {
            t.Zo(i)
        }
        O_(t, i) {
            t.Go(i),
            this.S_()
        }
        B_(t) {
            t.Jo()
        }
        A_(t, i) {
            t.Qo(i)
        }
        z_(t, i) {
            t.t_(i),
            this.S_()
        }
        V_(t) {
            t.i_()
        }
        S_() {
            this.vo.forEach((t=>{
                t.On()
            }
            ))
        }
        vn() {
            let t = null;
            return this.$i.W().rightPriceScale.visible && 0 !== this.v_.Ba().length ? t = this.v_ : this.$i.W().leftPriceScale.visible && 0 !== this.d_.Ba().length ? t = this.d_ : 0 !== this.vo.length && (t = this.vo[0].Dt()),
            null === t && (t = this.v_),
            t
        }
        vr() {
            let t = null;
            return this.$i.W().rightPriceScale.visible ? t = this.v_ : this.$i.W().leftPriceScale.visible && (t = this.d_),
            t
        }
        T_(t) {
            null !== t && t.Do() && this.E_(t)
        }
        I_(t) {
            const i = this.yl.Xs();
            t.Po({
                Wn: !0
            }),
            null !== i && t.r_(i),
            this.S_()
        }
        L_() {
            this.E_(this.d_),
            this.E_(this.v_)
        }
        N_() {
            this.T_(this.d_),
            this.T_(this.v_),
            this.vo.forEach((t=>{
                this.dr(t) && this.T_(t.Dt())
            }
            )),
            this.S_(),
            this.$i.$h()
        }
        $o() {
            return null === this.po && (this.po = _n(this.vo)),
            this.po
        }
        F_() {
            return this.u_
        }
        W_() {
            return this.c_
        }
        E_(t) {
            const i = t.e_();
            if (i && i.length > 0 && !this.yl.Ni()) {
                const i = this.yl.Xs();
                null !== i && t.r_(i)
            }
            t.On()
        }
        k_() {
            const t = this.$o();
            if (0 === t.length)
                return {
                    j_: 0,
                    y_: 0
                };
            let i = 0
              , n = 0;
            for (let s = 0; s < t.length; s++) {
                const e = t[s].Ki();
                null !== e && (e < i && (i = e),
                e > n && (n = e))
            }
            return {
                j_: i,
                y_: n
            }
        }
        C_(t, i, n) {
            let s = this.b_(i);
            if (null === s && (s = this.f_(i, this.$i.W().overlayPriceScales)),
            this.vo.push(t),
            !rt(i)) {
                const n = this.a_.get(i) || [];
                n.push(t),
                this.a_.set(i, n)
            }
            s.Uo(t),
            t.Gi(s),
            t.Zi(n),
            this.T_(s),
            this.po = null
        }
        p_(t, i, n) {
            i.kr !== n.kr && this.E_(t)
        }
        f_(t, i) {
            const n = Object.assign({
                visible: !0,
                autoScale: !0
            }, O(i))
              , s = new fn(t,n,this.$i.W().layout,this.$i.W().localization);
            return s.Eo(this.zt()),
            s
        }
    }
    class pn {
        constructor(t, i, n=50) {
            this.Ke = 0,
            this.Ze = 1,
            this.Ge = 1,
            this.Qe = new Map,
            this.Je = new Map,
            this.H_ = t,
            this.U_ = i,
            this.tr = n
        }
        q_(t) {
            const i = t.time
              , n = this.U_.cacheKey(i)
              , s = this.Qe.get(n);
            if (void 0 !== s)
                return s.Y_;
            if (this.Ke === this.tr) {
                const t = this.Je.get(this.Ge);
                this.Je.delete(this.Ge),
                this.Qe.delete(d(t)),
                this.Ge++,
                this.Ke--
            }
            const e = this.H_(t);
            return this.Qe.set(n, {
                Y_: e,
                er: this.Ze
            }),
            this.Je.set(this.Ze, n),
            this.Ke++,
            this.Ze++,
            e
        }
    }
    class mn {
        constructor(t, i) {
            c(t <= i, "right should be >= left"),
            this.X_ = t,
            this.K_ = i
        }
        Os() {
            return this.X_
        }
        ui() {
            return this.K_
        }
        Z_() {
            return this.K_ - this.X_ + 1
        }
        Kr(t) {
            return this.X_ <= t && t <= this.K_
        }
        kh(t) {
            return this.X_ === t.Os() && this.K_ === t.ui()
        }
    }
    function bn(t, i) {
        return null === t || null === i ? t === i : t.kh(i)
    }
    class wn {
        constructor() {
            this.G_ = new Map,
            this.Qe = null,
            this.J_ = !1
        }
        Q_(t) {
            this.J_ = t,
            this.Qe = null
        }
        tu(t, i) {
            this.iu(i),
            this.Qe = null;
            for (let n = i; n < t.length; ++n) {
                const i = t[n];
                let s = this.G_.get(i.timeWeight);
                void 0 === s && (s = [],
                this.G_.set(i.timeWeight, s)),
                s.push({
                    index: n,
                    time: i.time,
                    weight: i.timeWeight,
                    originalTime: i.originalTime
                })
            }
        }
        nu(t, i) {
            const n = Math.ceil(i / t);
            return null !== this.Qe && this.Qe.su === n || (this.Qe = {
                ja: this.eu(n),
                su: n
            }),
            this.Qe.ja
        }
        iu(t) {
            if (0 === t)
                return void this.G_.clear();
            const i = [];
            this.G_.forEach(((n,s)=>{
                t <= n[0].index ? i.push(s) : n.splice(Pt(n, t, (i=>i.index < t)), 1 / 0)
            }
            ));
            for (const t of i)
                this.G_.delete(t)
        }
        eu(t) {
            let i = [];
            for (const n of Array.from(this.G_.keys()).sort(((t,i)=>i - t))) {
                if (!this.G_.get(n))
                    continue;
                const s = i;
                i = [];
                const e = s.length;
                let r = 0;
                const h = d(this.G_.get(n))
                  , l = h.length;
                let a = 1 / 0
                  , o = -1 / 0;
                for (let n = 0; n < l; n++) {
                    const l = h[n]
                      , _ = l.index;
                    for (; r < e; ) {
                        const t = s[r]
                          , n = t.index;
                        if (!(n < _)) {
                            a = n;
                            break
                        }
                        r++,
                        i.push(t),
                        o = n,
                        a = 1 / 0
                    }
                    if (a - _ >= t && _ - o >= t)
                        i.push(l),
                        o = _;
                    else if (this.J_)
                        return s
                }
                for (; r < e; r++)
                    i.push(s[r])
            }
            return i
        }
    }
    class gn {
        constructor(t) {
            this.ru = t
        }
        hu() {
            return null === this.ru ? null : new mn(Math.floor(this.ru.Os()),Math.ceil(this.ru.ui()))
        }
        lu() {
            return this.ru
        }
        static au() {
            return new gn(null)
        }
    }
    function Mn(t, i) {
        return t.weight > i.weight ? t : i
    }
    class xn {
        constructor(t, i, n, s) {
            this.o_ = 0,
            this.ou = null,
            this._u = [],
            this.wo = null,
            this.bo = null,
            this.uu = new wn,
            this.cu = new Map,
            this.du = gn.au(),
            this.fu = !0,
            this.vu = new k,
            this.pu = new k,
            this.mu = new k,
            this.bu = null,
            this.wu = null,
            this.gu = [],
            this.cn = i,
            this.yo = n,
            this.Mu = i.rightOffset,
            this.xu = i.barSpacing,
            this.$i = t,
            this.U_ = s,
            this.Su(),
            this.uu.Q_(i.uniformDistribution)
        }
        W() {
            return this.cn
        }
        yu(t) {
            C(this.yo, t),
            this.ku(),
            this.Su()
        }
        Hh(t, i) {
            var n;
            C(this.cn, t),
            this.cn.fixLeftEdge && this.Cu(),
            this.cn.fixRightEdge && this.Tu(),
            void 0 !== t.barSpacing && this.$i.Gn(t.barSpacing),
            void 0 !== t.rightOffset && this.$i.Jn(t.rightOffset),
            void 0 !== t.minBarSpacing && this.$i.Gn(null !== (n = t.barSpacing) && void 0 !== n ? n : this.xu),
            this.ku(),
            this.Su(),
            this.mu.m()
        }
        mn(t) {
            var i, n;
            return null !== (n = null === (i = this._u[t]) || void 0 === i ? void 0 : i.time) && void 0 !== n ? n : null
        }
        Ui(t) {
            var i;
            return null !== (i = this._u[t]) && void 0 !== i ? i : null
        }
        Da(t, i) {
            if (this._u.length < 1)
                return null;
            if (this.U_.key(t) > this.U_.key(this._u[this._u.length - 1].time))
                return i ? this._u.length - 1 : null;
            const n = Pt(this._u, this.U_.key(t), ((t,i)=>this.U_.key(t.time) < i));
            return this.U_.key(t) < this.U_.key(this._u[n].time) ? i ? n : null : n
        }
        Ni() {
            return 0 === this.o_ || 0 === this._u.length || null === this.ou
        }
        Ra() {
            return this._u.length > 0
        }
        Xs() {
            return this.Pu(),
            this.du.hu()
        }
        Ru() {
            return this.Pu(),
            this.du.lu()
        }
        Du() {
            const t = this.Xs();
            if (null === t)
                return null;
            const i = {
                from: t.Os(),
                to: t.ui()
            };
            return this.Ou(i)
        }
        Ou(t) {
            const i = Math.round(t.from)
              , n = Math.round(t.to)
              , s = f(this.Bu())
              , e = f(this.Au());
            return {
                from: f(this.Ui(Math.max(s, i))),
                to: f(this.Ui(Math.min(e, n)))
            }
        }
        zu(t) {
            return {
                from: f(this.Da(t.from, !0)),
                to: f(this.Da(t.to, !0))
            }
        }
        Hi() {
            return this.o_
        }
        x_(t) {
            if (!isFinite(t) || t <= 0)
                return;
            if (this.o_ === t)
                return;
            const i = this.Ru()
              , n = this.o_;
            if (this.o_ = t,
            this.fu = !0,
            this.cn.lockVisibleTimeRangeOnResize && 0 !== n) {
                const i = this.xu * t / n;
                this.xu = i
            }
            if (this.cn.fixLeftEdge && null !== i && i.Os() <= 0) {
                const i = n - t;
                this.Mu -= Math.round(i / this.xu) + 1,
                this.fu = !0
            }
            this.Vu(),
            this.Eu()
        }
        Vt(t) {
            if (this.Ni() || !P(t))
                return 0;
            const i = this.Iu() + this.Mu - t;
            return this.o_ - (i + .5) * this.xu - 1
        }
        Js(t, i) {
            const n = this.Iu()
              , s = void 0 === i ? 0 : i.from
              , e = void 0 === i ? t.length : i.to;
            for (let i = s; i < e; i++) {
                const s = t[i].ot
                  , e = n + this.Mu - s
                  , r = this.o_ - (e + .5) * this.xu - 1;
                t[i].nt = r
            }
        }
        Lu(t) {
            return Math.ceil(this.Nu(t))
        }
        Jn(t) {
            this.fu = !0,
            this.Mu = t,
            this.Eu(),
            this.$i.Fu(),
            this.$i.$h()
        }
        he() {
            return this.xu
        }
        Gn(t) {
            this.Wu(t),
            this.Eu(),
            this.$i.Fu(),
            this.$i.$h()
        }
        ju() {
            return this.Mu
        }
        ja() {
            if (this.Ni())
                return null;
            if (null !== this.wu)
                return this.wu;
            const t = this.xu
              , i = 5 * (this.$i.W().layout.fontSize + 4) / 8 * (this.cn.tickMarkMaxCharacterLength || 8)
              , n = Math.round(i / t)
              , s = f(this.Xs())
              , e = Math.max(s.Os(), s.Os() - n)
              , r = Math.max(s.ui(), s.ui() - n)
              , h = this.uu.nu(t, i)
              , l = this.Bu() + n
              , a = this.Au() - n
              , o = this.Hu()
              , _ = this.cn.fixLeftEdge || o
              , u = this.cn.fixRightEdge || o;
            let c = 0;
            for (const t of h) {
                if (!(e <= t.index && t.index <= r))
                    continue;
                let n;
                c < this.gu.length ? (n = this.gu[c],
                n.coord = this.Vt(t.index),
                n.label = this.$u(t),
                n.weight = t.weight) : (n = {
                    needAlignCoordinate: !1,
                    coord: this.Vt(t.index),
                    label: this.$u(t),
                    weight: t.weight
                },
                this.gu.push(n)),
                this.xu > i / 2 && !o ? n.needAlignCoordinate = !1 : n.needAlignCoordinate = _ && t.index <= l || u && t.index >= a,
                c++
            }
            return this.gu.length = c,
            this.wu = this.gu,
            this.gu
        }
        Uu() {
            this.fu = !0,
            this.Gn(this.cn.barSpacing),
            this.Jn(this.cn.rightOffset)
        }
        qu(t) {
            this.fu = !0,
            this.ou = t,
            this.Eu(),
            this.Cu()
        }
        Yu(t, i) {
            const n = this.Nu(t)
              , s = this.he()
              , e = s + i * (s / 10);
            this.Gn(e),
            this.cn.rightBarStaysOnScroll || this.Jn(this.ju() + (n - this.Nu(t)))
        }
        Zo(t) {
            this.wo && this.i_(),
            null === this.bo && null === this.bu && (this.Ni() || (this.bo = t,
            this.Xu()))
        }
        Go(t) {
            if (null === this.bu)
                return;
            const i = wt(this.o_ - t, 0, this.o_)
              , n = wt(this.o_ - f(this.bo), 0, this.o_);
            0 !== i && 0 !== n && this.Gn(this.bu.he * i / n)
        }
        Jo() {
            null !== this.bo && (this.bo = null,
            this.Ku())
        }
        Qo(t) {
            null === this.wo && null === this.bu && (this.Ni() || (this.wo = t,
            this.Xu()))
        }
        t_(t) {
            if (null === this.wo)
                return;
            const i = (this.wo - t) / this.he();
            this.Mu = f(this.bu).ju + i,
            this.fu = !0,
            this.Eu()
        }
        i_() {
            null !== this.wo && (this.wo = null,
            this.Ku())
        }
        Zu() {
            this.Gu(this.cn.rightOffset)
        }
        Gu(t, i=400) {
            if (!isFinite(t))
                throw new RangeError("offset is required and must be finite number");
            if (!isFinite(i) || i <= 0)
                throw new RangeError("animationDuration (optional) must be finite positive number");
            const n = this.Mu
              , s = performance.now();
            this.$i.Xn({
                Ju: t=>(t - s) / i >= 1,
                Qu: e=>{
                    const r = (e - s) / i;
                    return r >= 1 ? t : n + (t - n) * r
                }
            })
        }
        bt(t, i) {
            this.fu = !0,
            this._u = t,
            this.uu.tu(t, i),
            this.Eu()
        }
        tc() {
            return this.vu
        }
        nc() {
            return this.pu
        }
        sc() {
            return this.mu
        }
        Iu() {
            return this.ou || 0
        }
        ec(t) {
            const i = t.Z_();
            this.Wu(this.o_ / i),
            this.Mu = t.ui() - this.Iu(),
            this.Eu(),
            this.fu = !0,
            this.$i.Fu(),
            this.$i.$h()
        }
        rc() {
            const t = this.Bu()
              , i = this.Au();
            null !== t && null !== i && this.ec(new mn(t,i + this.cn.rightOffset))
        }
        hc(t) {
            const i = new mn(t.from,t.to);
            this.ec(i)
        }
        qi(t) {
            return void 0 !== this.yo.timeFormatter ? this.yo.timeFormatter(t.originalTime) : this.U_.formatHorzItem(t.time)
        }
        Hu() {
            const {handleScroll: t, handleScale: i} = this.$i.W();
            return !(t.horzTouchDrag || t.mouseWheel || t.pressedMouseMove || t.vertTouchDrag || i.axisDoubleClickReset.time || i.axisPressedMouseMove.time || i.mouseWheel || i.pinch)
        }
        Bu() {
            return 0 === this._u.length ? null : 0
        }
        Au() {
            return 0 === this._u.length ? null : this._u.length - 1
        }
        lc(t) {
            return (this.o_ - 1 - t) / this.xu
        }
        Nu(t) {
            const i = this.lc(t)
              , n = this.Iu() + this.Mu - i;
            return Math.round(1e6 * n) / 1e6
        }
        Wu(t) {
            const i = this.xu;
            this.xu = t,
            this.Vu(),
            i !== this.xu && (this.fu = !0,
            this.ac())
        }
        Pu() {
            if (!this.fu)
                return;
            if (this.fu = !1,
            this.Ni())
                return void this.oc(gn.au());
            const t = this.Iu()
              , i = this.o_ / this.xu
              , n = this.Mu + t
              , s = new mn(n - i + 1,n);
            this.oc(new gn(s))
        }
        Vu() {
            const t = this._c();
            if (this.xu < t && (this.xu = t,
            this.fu = !0),
            0 !== this.o_) {
                const t = .5 * this.o_;
                this.xu > t && (this.xu = t,
                this.fu = !0)
            }
        }
        _c() {
            return this.cn.fixLeftEdge && this.cn.fixRightEdge && 0 !== this._u.length ? this.o_ / this._u.length : this.cn.minBarSpacing
        }
        Eu() {
            const t = this.uc();
            this.Mu > t && (this.Mu = t,
            this.fu = !0);
            const i = this.cc();
            null !== i && this.Mu < i && (this.Mu = i,
            this.fu = !0)
        }
        cc() {
            const t = this.Bu()
              , i = this.ou;
            if (null === t || null === i)
                return null;
            return t - i - 1 + (this.cn.fixLeftEdge ? this.o_ / this.xu : Math.min(2, this._u.length))
        }
        uc() {
            return this.cn.fixRightEdge ? 0 : this.o_ / this.xu - Math.min(2, this._u.length)
        }
        Xu() {
            this.bu = {
                he: this.he(),
                ju: this.ju()
            }
        }
        Ku() {
            this.bu = null
        }
        $u(t) {
            let i = this.cu.get(t.weight);
            return void 0 === i && (i = new pn((t=>this.dc(t)),this.U_),
            this.cu.set(t.weight, i)),
            i.q_(t)
        }
        dc(t) {
            return this.U_.formatTickmark(t, this.yo)
        }
        oc(t) {
            const i = this.du;
            this.du = t,
            bn(i.hu(), this.du.hu()) || this.vu.m(),
            bn(i.lu(), this.du.lu()) || this.pu.m(),
            this.ac()
        }
        ac() {
            this.wu = null
        }
        ku() {
            this.ac(),
            this.cu.clear()
        }
        Su() {
            this.U_.updateFormatter(this.yo)
        }
        Cu() {
            if (!this.cn.fixLeftEdge)
                return;
            const t = this.Bu();
            if (null === t)
                return;
            const i = this.Xs();
            if (null === i)
                return;
            const n = i.Os() - t;
            if (n < 0) {
                const t = this.Mu - n - 1;
                this.Jn(t)
            }
            this.Vu()
        }
        Tu() {
            this.Eu(),
            this.Vu()
        }
    }
    class Sn {
        K(t, i, n) {
            t.useMediaCoordinateSpace((t=>this.Z(t, i, n)))
        }
        wl(t, i, n) {
            t.useMediaCoordinateSpace((t=>this.fc(t, i, n)))
        }
        fc(t, i, n) {}
    }
    class yn extends Sn {
        constructor(t) {
            super(),
            this.vc = new Map,
            this.Et = t
        }
        Z(t) {}
        fc(t) {
            if (!this.Et.kt)
                return;
            const {context: i, mediaSize: n} = t;
            let s = 0;
            for (const t of this.Et.mc) {
                if (0 === t.Zt.length)
                    continue;
                i.font = t.R;
                const e = this.bc(i, t.Zt);
                e > n.width ? t.Yu = n.width / e : t.Yu = 1,
                s += t.wc * t.Yu
            }
            let e = 0;
            switch (this.Et.gc) {
            case "top":
                e = 0;
                break;
            case "center":
                e = Math.max((n.height - s) / 2, 0);
                break;
            case "bottom":
                e = Math.max(n.height - s, 0)
            }
            i.fillStyle = this.Et.O;
            for (const t of this.Et.mc) {
                i.save();
                let s = 0;
                switch (this.Et.Mc) {
                case "left":
                    i.textAlign = "left",
                    s = t.wc / 2;
                    break;
                case "center":
                    i.textAlign = "center",
                    s = n.width / 2;
                    break;
                case "right":
                    i.textAlign = "right",
                    s = n.width - 1 - t.wc / 2
                }
                i.translate(s, e),
                i.textBaseline = "top",
                i.font = t.R,
                i.scale(t.Yu, t.Yu),
                i.fillText(t.Zt, 0, t.xc),
                i.restore(),
                e += t.wc * t.Yu
            }
        }
        bc(t, i) {
            const n = this.Sc(t.font);
            let s = n.get(i);
            return void 0 === s && (s = t.measureText(i).width,
            n.set(i, s)),
            s
        }
        Sc(t) {
            let i = this.vc.get(t);
            return void 0 === i && (i = new Map,
            this.vc.set(t, i)),
            i
        }
    }
    class kn {
        constructor(t) {
            this.ft = !0,
            this.Ft = {
                kt: !1,
                O: "",
                mc: [],
                gc: "center",
                Mc: "center"
            },
            this.Wt = new yn(this.Ft),
            this.jt = t
        }
        bt() {
            this.ft = !0
        }
        gt() {
            return this.ft && (this.Mt(),
            this.ft = !1),
            this.Wt
        }
        Mt() {
            const t = this.jt.W()
              , i = this.Ft;
            i.kt = t.visible,
            i.kt && (i.O = t.color,
            i.Mc = t.horzAlign,
            i.gc = t.vertAlign,
            i.mc = [{
                Zt: t.text,
                R: V(t.fontSize, t.fontFamily, t.fontStyle),
                wc: 1.2 * t.fontSize,
                xc: 0,
                Yu: 0
            }])
        }
    }
    class Cn extends nt {
        constructor(t, i) {
            super(),
            this.cn = i,
            this.wn = new kn(this)
        }
        Rn() {
            return []
        }
        Pn() {
            return [this.wn]
        }
        W() {
            return this.cn
        }
        On() {
            this.wn.bt()
        }
    }
    var Tn, Pn, Rn, Dn, On;
    !function(t) {
        t[t.OnTouchEnd = 0] = "OnTouchEnd",
        t[t.OnNextTap = 1] = "OnNextTap"
    }(Tn || (Tn = {}));
    class Bn {
        constructor(t, i, n) {
            this.yc = [],
            this.kc = [],
            this.o_ = 0,
            this.Cc = null,
            this.Tc = new k,
            this.Pc = new k,
            this.Rc = null,
            this.Dc = t,
            this.cn = i,
            this.U_ = n,
            this.Oc = new E(this),
            this.yl = new xn(this,i.timeScale,this.cn.localization,n),
            this.vt = new et(this,i.crosshair),
            this.Bc = new Yi(i.crosshair),
            this.Ac = new Cn(this,i.watermark),
            this.zc(),
            this.yc[0].M_(2e3),
            this.Vc = this.Ec(0),
            this.Ic = this.Ec(1)
        }
        Kl() {
            this.Lc(ht.es())
        }
        $h() {
            this.Lc(ht.ss())
        }
        aa() {
            this.Lc(new ht(1))
        }
        Zl(t) {
            const i = this.Nc(t);
            this.Lc(i)
        }
        Fc() {
            return this.Cc
        }
        Wc(t) {
            const i = this.Cc;
            this.Cc = t,
            null !== i && this.Zl(i.jc),
            null !== t && this.Zl(t.jc)
        }
        W() {
            return this.cn
        }
        Hh(t) {
            C(this.cn, t),
            this.yc.forEach((i=>i.m_(t))),
            void 0 !== t.timeScale && this.yl.Hh(t.timeScale),
            void 0 !== t.localization && this.yl.yu(t.localization),
            (t.leftPriceScale || t.rightPriceScale) && this.Tc.m(),
            this.Vc = this.Ec(0),
            this.Ic = this.Ec(1),
            this.Kl()
        }
        Hc(t, i) {
            if ("left" === t)
                return void this.Hh({
                    leftPriceScale: i
                });
            if ("right" === t)
                return void this.Hh({
                    rightPriceScale: i
                });
            const n = this.$c(t);
            null !== n && (n.Dt.Hh(i),
            this.Tc.m())
        }
        $c(t) {
            for (const i of this.yc) {
                const n = i.b_(t);
                if (null !== n)
                    return {
                        Ht: i,
                        Dt: n
                    }
            }
            return null
        }
        St() {
            return this.yl
        }
        Uc() {
            return this.yc
        }
        qc() {
            return this.Ac
        }
        Yc() {
            return this.vt
        }
        Xc() {
            return this.Pc
        }
        Kc(t, i) {
            t.Eo(i),
            this.Fu()
        }
        x_(t) {
            this.o_ = t,
            this.yl.x_(this.o_),
            this.yc.forEach((i=>i.x_(t))),
            this.Fu()
        }
        zc(t) {
            const i = new vn(this.yl,this);
            void 0 !== t ? this.yc.splice(t, 0, i) : this.yc.push(i);
            const n = void 0 === t ? this.yc.length - 1 : t
              , s = ht.es();
            return s.Nn(n, {
                Fn: 0,
                Wn: !0
            }),
            this.Lc(s),
            i
        }
        D_(t, i, n) {
            t.D_(i, n)
        }
        O_(t, i, n) {
            t.O_(i, n),
            this.Gl(),
            this.Lc(this.Zc(t, 2))
        }
        B_(t, i) {
            t.B_(i),
            this.Lc(this.Zc(t, 2))
        }
        A_(t, i, n) {
            i.Do() || t.A_(i, n)
        }
        z_(t, i, n) {
            i.Do() || (t.z_(i, n),
            this.Gl(),
            this.Lc(this.Zc(t, 2)))
        }
        V_(t, i) {
            i.Do() || (t.V_(i),
            this.Lc(this.Zc(t, 2)))
        }
        I_(t, i) {
            t.I_(i),
            this.Lc(this.Zc(t, 2))
        }
        Gc(t) {
            this.yl.Zo(t)
        }
        Jc(t, i) {
            const n = this.St();
            if (n.Ni() || 0 === i)
                return;
            const s = n.Hi();
            t = Math.max(1, Math.min(t, s)),
            n.Yu(t, i),
            this.Fu()
        }
        Qc(t) {
            this.td(0),
            this.nd(t),
            this.sd()
        }
        ed(t) {
            this.yl.Go(t),
            this.Fu()
        }
        rd() {
            this.yl.Jo(),
            this.$h()
        }
        td(t) {
            this.yl.Qo(t)
        }
        nd(t) {
            this.yl.t_(t),
            this.Fu()
        }
        sd() {
            this.yl.i_(),
            this.$h()
        }
        wt() {
            return this.kc
        }
        hd(t, i, n, s, e) {
            this.vt.gn(t, i);
            let r = NaN
              , h = this.yl.Lu(t);
            const l = this.yl.Xs();
            null !== l && (h = Math.min(Math.max(l.Os(), h), l.ui()));
            const a = s.vn()
              , o = a.Ct();
            null !== o && (r = a.pn(i, o)),
            r = this.Bc.Oa(r, h, s),
            this.vt.yn(h, r, s),
            this.aa(),
            e || this.Pc.m(this.vt.xt(), {
                x: t,
                y: i
            }, n)
        }
        ld(t, i, n) {
            const s = n.vn()
              , e = s.Ct()
              , r = s.Rt(t, f(e))
              , h = this.yl.Da(i, !0)
              , l = this.yl.Vt(f(h));
            this.hd(l, r, null, n, !0)
        }
        ad(t) {
            this.Yc().Cn(),
            this.aa(),
            t || this.Pc.m(null, null, null)
        }
        Gl() {
            const t = this.vt.Ht();
            if (null !== t) {
                const i = this.vt.xn()
                  , n = this.vt.Sn();
                this.hd(i, n, null, t)
            }
            this.vt.On()
        }
        od(t, i, n) {
            const s = this.yl.mn(0);
            void 0 !== i && void 0 !== n && this.yl.bt(i, n);
            const e = this.yl.mn(0)
              , r = this.yl.Iu()
              , h = this.yl.Xs();
            if (null !== h && null !== s && null !== e) {
                const i = h.Kr(r)
                  , l = this.U_.key(s) > this.U_.key(e)
                  , a = null !== t && t > r && !l
                  , o = this.yl.W().allowShiftVisibleRangeOnWhitespaceReplacement
                  , _ = i && (!(void 0 === n) || o) && this.yl.W().shiftVisibleRangeOnNewBar;
                if (a && !_) {
                    const i = t - r;
                    this.yl.Jn(this.yl.ju() - i)
                }
            }
            this.yl.qu(t)
        }
        ta(t) {
            null !== t && t.N_()
        }
        cr(t) {
            const i = this.yc.find((i=>i.$o().includes(t)));
            return void 0 === i ? null : i
        }
        Fu() {
            this.Ac.On(),
            this.yc.forEach((t=>t.N_())),
            this.Gl()
        }
        S() {
            this.yc.forEach((t=>t.S())),
            this.yc.length = 0,
            this.cn.localization.priceFormatter = void 0,
            this.cn.localization.percentageFormatter = void 0,
            this.cn.localization.timeFormatter = void 0
        }
        _d() {
            return this.Oc
        }
        mr() {
            return this.Oc.W()
        }
        w_() {
            return this.Tc
        }
        ud(t, i, n) {
            const s = this.yc[0]
              , e = this.dd(i, t, s, n);
            return this.kc.push(e),
            1 === this.kc.length ? this.Kl() : this.$h(),
            e
        }
        fd(t) {
            const i = this.cr(t)
              , n = this.kc.indexOf(t);
            c(-1 !== n, "Series not found"),
            this.kc.splice(n, 1),
            f(i).Yo(t),
            t.S && t.S()
        }
        Xl(t, i) {
            const n = f(this.cr(t));
            n.Yo(t);
            const s = this.$c(i);
            if (null === s) {
                const s = t.Ki();
                n.Uo(t, i, s)
            } else {
                const e = s.Ht === n ? t.Ki() : void 0;
                s.Ht.Uo(t, i, e)
            }
        }
        rc() {
            const t = ht.ss();
            t.$n(),
            this.Lc(t)
        }
        vd(t) {
            const i = ht.ss();
            i.Yn(t),
            this.Lc(i)
        }
        Zn() {
            const t = ht.ss();
            t.Zn(),
            this.Lc(t)
        }
        Gn(t) {
            const i = ht.ss();
            i.Gn(t),
            this.Lc(i)
        }
        Jn(t) {
            const i = ht.ss();
            i.Jn(t),
            this.Lc(i)
        }
        Xn(t) {
            const i = ht.ss();
            i.Xn(t),
            this.Lc(i)
        }
        Un() {
            const t = ht.ss();
            t.Un(),
            this.Lc(t)
        }
        pd() {
            return this.cn.rightPriceScale.visible ? "right" : "left"
        }
        md() {
            return this.Ic
        }
        q() {
            return this.Vc
        }
        At(t) {
            const i = this.Ic
              , n = this.Vc;
            if (i === n)
                return i;
            if (t = Math.max(0, Math.min(100, Math.round(100 * t))),
            null === this.Rc || this.Rc.Ts !== n || this.Rc.Ps !== i)
                this.Rc = {
                    Ts: n,
                    Ps: i,
                    bd: new Map
                };
            else {
                const i = this.Rc.bd.get(t);
                if (void 0 !== i)
                    return i
            }
            const s = function(t, i, n) {
                const [s,e,r,h] = S(t)
                  , [l,a,o,_] = S(i)
                  , u = [m(s + n * (l - s)), m(e + n * (a - e)), m(r + n * (o - r)), b(h + n * (_ - h))];
                return `rgba(${u[0]}, ${u[1]}, ${u[2]}, ${u[3]})`
            }(n, i, t / 100);
            return this.Rc.bd.set(t, s),
            s
        }
        Zc(t, i) {
            const n = new ht(i);
            if (null !== t) {
                const s = this.yc.indexOf(t);
                n.Nn(s, {
                    Fn: i
                })
            }
            return n
        }
        Nc(t, i) {
            return void 0 === i && (i = 2),
            this.Zc(this.cr(t), i)
        }
        Lc(t) {
            this.Dc && this.Dc(t),
            this.yc.forEach((t=>t.W_().Uh().bt()))
        }
        dd(t, i, n, s) {
            const e = new qi(this,t,i,n,s)
              , r = void 0 !== t.priceScaleId ? t.priceScaleId : this.pd();
            return n.Uo(e, r),
            rt(r) || e.Hh(t),
            e
        }
        Ec(t) {
            const i = this.cn.layout;
            return "gradient" === i.background.type ? 0 === t ? i.background.topColor : i.background.bottomColor : i.background.color
        }
    }
    function An(t) {
        return !T(t) && !R(t)
    }
    function zn(t) {
        return T(t)
    }
    !function(t) {
        t[t.Disabled = 0] = "Disabled",
        t[t.Continuous = 1] = "Continuous",
        t[t.OnDataUpdate = 2] = "OnDataUpdate"
    }(Pn || (Pn = {})),
    function(t) {
        t[t.LastBar = 0] = "LastBar",
        t[t.LastVisible = 1] = "LastVisible"
    }(Rn || (Rn = {})),
    function(t) {
        t.Solid = "solid",
        t.VerticalGradient = "gradient"
    }(Dn || (Dn = {})),
    function(t) {
        t[t.Year = 0] = "Year",
        t[t.Month = 1] = "Month",
        t[t.DayOfMonth = 2] = "DayOfMonth",
        t[t.Time = 3] = "Time",
        t[t.TimeWithSeconds = 4] = "TimeWithSeconds"
    }(On || (On = {}));
    const Vn = t=>t.getUTCFullYear();
    function En(t, i, n) {
        return i.replace(/yyyy/g, (t=>at(Vn(t), 4))(t)).replace(/yy/g, (t=>at(Vn(t) % 100, 2))(t)).replace(/MMMM/g, ((t,i)=>new Date(t.getUTCFullYear(),t.getUTCMonth(),1).toLocaleString(i, {
            month: "long"
        }))(t, n)).replace(/MMM/g, ((t,i)=>new Date(t.getUTCFullYear(),t.getUTCMonth(),1).toLocaleString(i, {
            month: "short"
        }))(t, n)).replace(/MM/g, (t=>at((t=>t.getUTCMonth() + 1)(t), 2))(t)).replace(/dd/g, (t=>at((t=>t.getUTCDate())(t), 2))(t))
    }
    class In {
        constructor(t="yyyy-MM-dd", i="default") {
            this.wd = t,
            this.gd = i
        }
        q_(t) {
            return En(t, this.wd, this.gd)
        }
    }
    class Ln {
        constructor(t) {
            this.Md = t || "%h:%m:%s"
        }
        q_(t) {
            return this.Md.replace("%h", at(t.getUTCHours(), 2)).replace("%m", at(t.getUTCMinutes(), 2)).replace("%s", at(t.getUTCSeconds(), 2))
        }
    }
    const Nn = {
        xd: "yyyy-MM-dd",
        Sd: "%h:%m:%s",
        yd: " ",
        kd: "default"
    };
    class Fn {
        constructor(t={}) {
            const i = Object.assign(Object.assign({}, Nn), t);
            this.Cd = new In(i.xd,i.kd),
            this.Td = new Ln(i.Sd),
            this.Pd = i.yd
        }
        q_(t) {
            return `${this.Cd.q_(t)}${this.Pd}${this.Td.q_(t)}`
        }
    }
    function Wn(t) {
        return 60 * t * 60 * 1e3
    }
    function jn(t) {
        return 60 * t * 1e3
    }
    const Hn = [{
        Rd: ($n = 1,
        1e3 * $n),
        Dd: 10
    }, {
        Rd: jn(1),
        Dd: 20
    }, {
        Rd: jn(5),
        Dd: 21
    }, {
        Rd: jn(30),
        Dd: 22
    }, {
        Rd: Wn(1),
        Dd: 30
    }, {
        Rd: Wn(3),
        Dd: 31
    }, {
        Rd: Wn(6),
        Dd: 32
    }, {
        Rd: Wn(12),
        Dd: 33
    }];
    var $n;
    function Un(t, i) {
        if (t.getUTCFullYear() !== i.getUTCFullYear())
            return 70;
        if (t.getUTCMonth() !== i.getUTCMonth())
            return 60;
        if (t.getUTCDate() !== i.getUTCDate())
            return 50;
        for (let n = Hn.length - 1; n >= 0; --n)
            if (Math.floor(i.getTime() / Hn[n].Rd) !== Math.floor(t.getTime() / Hn[n].Rd))
                return Hn[n].Dd;
        return 0
    }
    function qn(t) {
        let i = t;
        if (R(t) && (i = Xn(t)),
        !An(i))
            throw new Error("time must be of type BusinessDay");
        const n = new Date(Date.UTC(i.year, i.month - 1, i.day, 0, 0, 0, 0));
        return {
            Od: Math.round(n.getTime() / 1e3),
            Bd: i
        }
    }
    function Yn(t) {
        if (!zn(t))
            throw new Error("time must be of type isUTCTimestamp");
        return {
            Od: t
        }
    }
    function Xn(t) {
        const i = new Date(t);
        if (isNaN(i.getTime()))
            throw new Error(`Invalid date string=${t}, expected format=yyyy-mm-dd`);
        return {
            day: i.getUTCDate(),
            month: i.getUTCMonth() + 1,
            year: i.getUTCFullYear()
        }
    }
    function Kn(t) {
        R(t.time) && (t.time = Xn(t.time))
    }
    class Zn {
        options() {
            return this.cn
        }
        setOptions(t) {
            this.cn = t,
            this.updateFormatter(t.localization)
        }
        preprocessData(t) {
            Array.isArray(t) ? function(t) {
                t.forEach(Kn)
            }(t) : Kn(t)
        }
        createConverterToInternalObj(t) {
            return f(function(t) {
                return 0 === t.length ? null : An(t[0].time) || R(t[0].time) ? qn : Yn
            }(t))
        }
        key(t) {
            return "object" == typeof t && "Od"in t ? t.Od : this.key(this.convertHorzItemToInternal(t))
        }
        cacheKey(t) {
            const i = t;
            return void 0 === i.Bd ? new Date(1e3 * i.Od).getTime() : new Date(Date.UTC(i.Bd.year, i.Bd.month - 1, i.Bd.day)).getTime()
        }
        convertHorzItemToInternal(t) {
            return zn(i = t) ? Yn(i) : An(i) ? qn(i) : qn(Xn(i));
            var i
        }
        updateFormatter(t) {
            if (!this.cn)
                return;
            const i = t.dateFormat;
            this.cn.timeScale.timeVisible ? this.Ad = new Fn({
                xd: i,
                Sd: this.cn.timeScale.secondsVisible ? "%h:%m:%s" : "%h:%m",
                yd: "   ",
                kd: t.locale
            }) : this.Ad = new In(i,t.locale)
        }
        formatHorzItem(t) {
            const i = t;
            return this.Ad.q_(new Date(1e3 * i.Od))
        }
        formatTickmark(t, i) {
            const n = function(t, i, n) {
                switch (t) {
                case 0:
                case 10:
                    return i ? n ? 4 : 3 : 2;
                case 20:
                case 21:
                case 22:
                case 30:
                case 31:
                case 32:
                case 33:
                    return i ? 3 : 2;
                case 50:
                    return 2;
                case 60:
                    return 1;
                case 70:
                    return 0
                }
            }(t.weight, this.cn.timeScale.timeVisible, this.cn.timeScale.secondsVisible)
              , s = this.cn.timeScale;
            if (void 0 !== s.tickMarkFormatter) {
                const e = s.tickMarkFormatter(t.originalTime, n, i.locale);
                if (null !== e)
                    return e
            }
            return function(t, i, n) {
                const s = {};
                switch (i) {
                case 0:
                    s.year = "numeric";
                    break;
                case 1:
                    s.month = "short";
                    break;
                case 2:
                    s.day = "numeric";
                    break;
                case 3:
                    s.hour12 = !1,
                    s.hour = "2-digit",
                    s.minute = "2-digit";
                    break;
                case 4:
                    s.hour12 = !1,
                    s.hour = "2-digit",
                    s.minute = "2-digit",
                    s.second = "2-digit"
                }
                const e = void 0 === t.Bd ? new Date(1e3 * t.Od) : new Date(Date.UTC(t.Bd.year, t.Bd.month - 1, t.Bd.day));
                return new Date(e.getUTCFullYear(),e.getUTCMonth(),e.getUTCDate(),e.getUTCHours(),e.getUTCMinutes(),e.getUTCSeconds(),e.getUTCMilliseconds()).toLocaleString(n, s)
            }(t.time, n, i.locale)
        }
        maxTickMarkWeight(t) {
            let i = t.reduce(Mn, t[0]).weight;
            return i > 30 && i < 50 && (i = 30),
            i
        }
        fillWeightsForPoints(t, i) {
            !function(t, i=0) {
                if (0 === t.length)
                    return;
                let n = 0 === i ? null : t[i - 1].time.Od
                  , s = null !== n ? new Date(1e3 * n) : null
                  , e = 0;
                for (let r = i; r < t.length; ++r) {
                    const i = t[r]
                      , h = new Date(1e3 * i.time.Od);
                    null !== s && (i.timeWeight = Un(h, s)),
                    e += i.time.Od - (n || i.time.Od),
                    n = i.time.Od,
                    s = h
                }
                if (0 === i && t.length > 1) {
                    const i = Math.ceil(e / (t.length - 1))
                      , n = new Date(1e3 * (t[0].time.Od - i));
                    t[0].timeWeight = Un(new Date(1e3 * t[0].time.Od), n)
                }
            }(t, i)
        }
        static zd(t) {
            return C({
                localization: {
                    dateFormat: "dd MMM 'yy"
                }
            }, null != t ? t : {})
        }
    }
    function Gn(t) {
        var i = t.width
          , n = t.height;
        if (i < 0)
            throw new Error("Negative width is not allowed for Size");
        if (n < 0)
            throw new Error("Negative height is not allowed for Size");
        return {
            width: i,
            height: n
        }
    }
    function Jn(t, i) {
        return t.width === i.width && t.height === i.height
    }
    var Qn = function() {
        function t(t) {
            var i = this;
            this._resolutionListener = function() {
                return i._onResolutionChanged()
            }
            ,
            this._resolutionMediaQueryList = null,
            this._observers = [],
            this._window = t,
            this._installResolutionListener()
        }
        return t.prototype.dispose = function() {
            this._uninstallResolutionListener(),
            this._window = null
        }
        ,
        Object.defineProperty(t.prototype, "value", {
            get: function() {
                return this._window.devicePixelRatio
            },
            enumerable: !1,
            configurable: !0
        }),
        t.prototype.subscribe = function(t) {
            var i = this
              , n = {
                next: t
            };
            return this._observers.push(n),
            {
                unsubscribe: function() {
                    i._observers = i._observers.filter((function(t) {
                        return t !== n
                    }
                    ))
                }
            }
        }
        ,
        t.prototype._installResolutionListener = function() {
            if (null !== this._resolutionMediaQueryList)
                throw new Error("Resolution listener is already installed");
            var t = this._window.devicePixelRatio;
            this._resolutionMediaQueryList = this._window.matchMedia("all and (resolution: ".concat(t, "dppx)")),
            this._resolutionMediaQueryList.addListener(this._resolutionListener)
        }
        ,
        t.prototype._uninstallResolutionListener = function() {
            null !== this._resolutionMediaQueryList && (this._resolutionMediaQueryList.removeListener(this._resolutionListener),
            this._resolutionMediaQueryList = null)
        }
        ,
        t.prototype._reinstallResolutionListener = function() {
            this._uninstallResolutionListener(),
            this._installResolutionListener()
        }
        ,
        t.prototype._onResolutionChanged = function() {
            var t = this;
            this._observers.forEach((function(i) {
                return i.next(t._window.devicePixelRatio)
            }
            )),
            this._reinstallResolutionListener()
        }
        ,
        t
    }();
    var ts = function() {
        function t(t, i, n) {
            var s;
            this._canvasElement = null,
            this._bitmapSizeChangedListeners = [],
            this._suggestedBitmapSize = null,
            this._suggestedBitmapSizeChangedListeners = [],
            this._devicePixelRatioObservable = null,
            this._canvasElementResizeObserver = null,
            this._canvasElement = t,
            this._canvasElementClientSize = Gn({
                width: this._canvasElement.clientWidth,
                height: this._canvasElement.clientHeight
            }),
            this._transformBitmapSize = null != i ? i : function(t) {
                return t
            }
            ,
            this._allowResizeObserver = null === (s = null == n ? void 0 : n.allowResizeObserver) || void 0 === s || s,
            this._chooseAndInitObserver()
        }
        return t.prototype.dispose = function() {
            var t, i;
            if (null === this._canvasElement)
                throw new Error("Object is disposed");
            null === (t = this._canvasElementResizeObserver) || void 0 === t || t.disconnect(),
            this._canvasElementResizeObserver = null,
            null === (i = this._devicePixelRatioObservable) || void 0 === i || i.dispose(),
            this._devicePixelRatioObservable = null,
            this._suggestedBitmapSizeChangedListeners.length = 0,
            this._bitmapSizeChangedListeners.length = 0,
            this._canvasElement = null
        }
        ,
        Object.defineProperty(t.prototype, "canvasElement", {
            get: function() {
                if (null === this._canvasElement)
                    throw new Error("Object is disposed");
                return this._canvasElement
            },
            enumerable: !1,
            configurable: !0
        }),
        Object.defineProperty(t.prototype, "canvasElementClientSize", {
            get: function() {
                return this._canvasElementClientSize
            },
            enumerable: !1,
            configurable: !0
        }),
        Object.defineProperty(t.prototype, "bitmapSize", {
            get: function() {
                return Gn({
                    width: this.canvasElement.width,
                    height: this.canvasElement.height
                })
            },
            enumerable: !1,
            configurable: !0
        }),
        t.prototype.resizeCanvasElement = function(t) {
            this._canvasElementClientSize = Gn(t),
            this.canvasElement.style.width = "".concat(this._canvasElementClientSize.width, "px"),
            this.canvasElement.style.height = "".concat(this._canvasElementClientSize.height, "px"),
            this._invalidateBitmapSize()
        }
        ,
        t.prototype.subscribeBitmapSizeChanged = function(t) {
            this._bitmapSizeChangedListeners.push(t)
        }
        ,
        t.prototype.unsubscribeBitmapSizeChanged = function(t) {
            this._bitmapSizeChangedListeners = this._bitmapSizeChangedListeners.filter((function(i) {
                return i !== t
            }
            ))
        }
        ,
        Object.defineProperty(t.prototype, "suggestedBitmapSize", {
            get: function() {
                return this._suggestedBitmapSize
            },
            enumerable: !1,
            configurable: !0
        }),
        t.prototype.subscribeSuggestedBitmapSizeChanged = function(t) {
            this._suggestedBitmapSizeChangedListeners.push(t)
        }
        ,
        t.prototype.unsubscribeSuggestedBitmapSizeChanged = function(t) {
            this._suggestedBitmapSizeChangedListeners = this._suggestedBitmapSizeChangedListeners.filter((function(i) {
                return i !== t
            }
            ))
        }
        ,
        t.prototype.applySuggestedBitmapSize = function() {
            if (null !== this._suggestedBitmapSize) {
                var t = this._suggestedBitmapSize;
                this._suggestedBitmapSize = null,
                this._resizeBitmap(t),
                this._emitSuggestedBitmapSizeChanged(t, this._suggestedBitmapSize)
            }
        }
        ,
        t.prototype._resizeBitmap = function(t) {
            var i = this.bitmapSize;
            Jn(i, t) || (this.canvasElement.width = t.width,
            this.canvasElement.height = t.height,
            this._emitBitmapSizeChanged(i, t))
        }
        ,
        t.prototype._emitBitmapSizeChanged = function(t, i) {
            var n = this;
            this._bitmapSizeChangedListeners.forEach((function(s) {
                return s.call(n, t, i)
            }
            ))
        }
        ,
        t.prototype._suggestNewBitmapSize = function(t) {
            var i = this._suggestedBitmapSize
              , n = Gn(this._transformBitmapSize(t, this._canvasElementClientSize))
              , s = Jn(this.bitmapSize, n) ? null : n;
            null === i && null === s || null !== i && null !== s && Jn(i, s) || (this._suggestedBitmapSize = s,
            this._emitSuggestedBitmapSizeChanged(i, s))
        }
        ,
        t.prototype._emitSuggestedBitmapSizeChanged = function(t, i) {
            var n = this;
            this._suggestedBitmapSizeChangedListeners.forEach((function(s) {
                return s.call(n, t, i)
            }
            ))
        }
        ,
        t.prototype._chooseAndInitObserver = function() {
            var t = this;
            this._allowResizeObserver ? new Promise((function(t) {
                var i = new ResizeObserver((function(n) {
                    t(n.every((function(t) {
                        return "devicePixelContentBoxSize"in t
                    }
                    ))),
                    i.disconnect()
                }
                ));
                i.observe(document.body, {
                    box: "device-pixel-content-box"
                })
            }
            )).catch((function() {
                return !1
            }
            )).then((function(i) {
                return i ? t._initResizeObserver() : t._initDevicePixelRatioObservable()
            }
            )) : this._initDevicePixelRatioObservable()
        }
        ,
        t.prototype._initDevicePixelRatioObservable = function() {
            var t = this;
            if (null !== this._canvasElement) {
                var i = is(this._canvasElement);
                if (null === i)
                    throw new Error("No window is associated with the canvas");
                this._devicePixelRatioObservable = function(t) {
                    return new Qn(t)
                }(i),
                this._devicePixelRatioObservable.subscribe((function() {
                    return t._invalidateBitmapSize()
                }
                )),
                this._invalidateBitmapSize()
            }
        }
        ,
        t.prototype._invalidateBitmapSize = function() {
            var t, i;
            if (null !== this._canvasElement) {
                var n = is(this._canvasElement);
                if (null !== n) {
                    var s = null !== (i = null === (t = this._devicePixelRatioObservable) || void 0 === t ? void 0 : t.value) && void 0 !== i ? i : n.devicePixelRatio
                      , e = this._canvasElement.getClientRects()
                      , r = void 0 !== e[0] ? function(t, i) {
                        return Gn({
                            width: Math.round(t.left * i + t.width * i) - Math.round(t.left * i),
                            height: Math.round(t.top * i + t.height * i) - Math.round(t.top * i)
                        })
                    }(e[0], s) : Gn({
                        width: this._canvasElementClientSize.width * s,
                        height: this._canvasElementClientSize.height * s
                    });
                    this._suggestNewBitmapSize(r)
                }
            }
        }
        ,
        t.prototype._initResizeObserver = function() {
            var t = this;
            null !== this._canvasElement && (this._canvasElementResizeObserver = new ResizeObserver((function(i) {
                var n = i.find((function(i) {
                    return i.target === t._canvasElement
                }
                ));
                if (n && n.devicePixelContentBoxSize && n.devicePixelContentBoxSize[0]) {
                    var s = n.devicePixelContentBoxSize[0]
                      , e = Gn({
                        width: s.inlineSize,
                        height: s.blockSize
                    });
                    t._suggestNewBitmapSize(e)
                }
            }
            )),
            this._canvasElementResizeObserver.observe(this._canvasElement, {
                box: "device-pixel-content-box"
            }))
        }
        ,
        t
    }();
    function is(t) {
        return t.ownerDocument.defaultView
    }
    var ns = function() {
        function t(t, i, n) {
            if (0 === i.width || 0 === i.height)
                throw new TypeError("Rendering target could only be created on a media with positive width and height");
            if (this._mediaSize = i,
            0 === n.width || 0 === n.height)
                throw new TypeError("Rendering target could only be created using a bitmap with positive integer width and height");
            this._bitmapSize = n,
            this._context = t
        }
        return t.prototype.useMediaCoordinateSpace = function(t) {
            try {
                return this._context.save(),
                this._context.setTransform(1, 0, 0, 1, 0, 0),
                this._context.scale(this._horizontalPixelRatio, this._verticalPixelRatio),
                t({
                    context: this._context,
                    mediaSize: this._mediaSize
                })
            } finally {
                this._context.restore()
            }
        }
        ,
        t.prototype.useBitmapCoordinateSpace = function(t) {
            try {
                return this._context.save(),
                this._context.setTransform(1, 0, 0, 1, 0, 0),
                t({
                    context: this._context,
                    mediaSize: this._mediaSize,
                    bitmapSize: this._bitmapSize,
                    horizontalPixelRatio: this._horizontalPixelRatio,
                    verticalPixelRatio: this._verticalPixelRatio
                })
            } finally {
                this._context.restore()
            }
        }
        ,
        Object.defineProperty(t.prototype, "_horizontalPixelRatio", {
            get: function() {
                return this._bitmapSize.width / this._mediaSize.width
            },
            enumerable: !1,
            configurable: !0
        }),
        Object.defineProperty(t.prototype, "_verticalPixelRatio", {
            get: function() {
                return this._bitmapSize.height / this._mediaSize.height
            },
            enumerable: !1,
            configurable: !0
        }),
        t
    }();
    function ss(t, i) {
        var n = t.canvasElementClientSize;
        if (0 === n.width || 0 === n.height)
            return null;
        var s = t.bitmapSize;
        if (0 === s.width || 0 === s.height)
            return null;
        var e = t.canvasElement.getContext("2d", i);
        return null === e ? null : new ns(e,n,s)
    }
    const es = "undefined" != typeof window;
    function rs() {
        return !!es && window.navigator.userAgent.toLowerCase().indexOf("firefox") > -1
    }
    function hs() {
        return !!es && /iPhone|iPad|iPod/.test(window.navigator.platform)
    }
    function ls(t) {
        return t + t % 2
    }
    function as(t, i) {
        return t.Vd - i.Vd
    }
    function os(t, i, n) {
        const s = (t.Vd - i.Vd) / (t.ot - i.ot);
        return Math.sign(s) * Math.min(Math.abs(s), n)
    }
    class _s {
        constructor(t, i, n, s) {
            this.Ed = null,
            this.Id = null,
            this.Ld = null,
            this.Nd = null,
            this.Fd = null,
            this.Wd = 0,
            this.jd = 0,
            this.Hd = t,
            this.$d = i,
            this.Ud = n,
            this.rs = s
        }
        qd(t, i) {
            if (null !== this.Ed) {
                if (this.Ed.ot === i)
                    return void (this.Ed.Vd = t);
                if (Math.abs(this.Ed.Vd - t) < this.rs)
                    return
            }
            this.Nd = this.Ld,
            this.Ld = this.Id,
            this.Id = this.Ed,
            this.Ed = {
                ot: i,
                Vd: t
            }
        }
        Dr(t, i) {
            if (null === this.Ed || null === this.Id)
                return;
            if (i - this.Ed.ot > 50)
                return;
            let n = 0;
            const s = os(this.Ed, this.Id, this.$d)
              , e = as(this.Ed, this.Id)
              , r = [s]
              , h = [e];
            if (n += e,
            null !== this.Ld) {
                const t = os(this.Id, this.Ld, this.$d);
                if (Math.sign(t) === Math.sign(s)) {
                    const i = as(this.Id, this.Ld);
                    if (r.push(t),
                    h.push(i),
                    n += i,
                    null !== this.Nd) {
                        const t = os(this.Ld, this.Nd, this.$d);
                        if (Math.sign(t) === Math.sign(s)) {
                            const i = as(this.Ld, this.Nd);
                            r.push(t),
                            h.push(i),
                            n += i
                        }
                    }
                }
            }
            let l = 0;
            for (let t = 0; t < r.length; ++t)
                l += h[t] / n * r[t];
            Math.abs(l) < this.Hd || (this.Fd = {
                Vd: t,
                ot: i
            },
            this.jd = l,
            this.Wd = function(t, i) {
                const n = Math.log(i);
                return Math.log(1 * n / -t) / n
            }(Math.abs(l), this.Ud))
        }
        Qu(t) {
            const i = f(this.Fd)
              , n = t - i.ot;
            return i.Vd + this.jd * (Math.pow(this.Ud, n) - 1) / Math.log(this.Ud)
        }
        Ju(t) {
            return null === this.Fd || this.Yd(t) === this.Wd
        }
        Yd(t) {
            const i = t - f(this.Fd).ot;
            return Math.min(i, this.Wd)
        }
    }
    function us(t, i) {
        const n = f(t.ownerDocument).createElement("canvas");
        t.appendChild(n);
        const s = function(t, i) {
            if ("device-pixel-content-box" === i.type)
                return new ts(t,i.transform,i.options);
            throw new Error("Unsupported binding target")
        }(n, {
            type: "device-pixel-content-box",
            options: {
                allowResizeObserver: !1
            },
            transform: (t,i)=>({
                width: Math.max(t.width, i.width),
                height: Math.max(t.height, i.height)
            })
        });
        return s.resizeCanvasElement(i),
        s
    }
    function cs(t) {
        var i;
        t.width = 1,
        t.height = 1,
        null === (i = t.getContext("2d")) || void 0 === i || i.clearRect(0, 0, 1, 1)
    }
    function ds(t, i, n, s) {
        t.wl && t.wl(i, n, s)
    }
    function fs(t, i, n, s) {
        t.K(i, n, s)
    }
    function vs(t, i, n, s) {
        const e = t(n, s);
        for (const t of e) {
            const n = t.gt();
            null !== n && i(n)
        }
    }
    function ps(t) {
        es && void 0 !== window.chrome && t.addEventListener("mousedown", (t=>{
            if (1 === t.button)
                return t.preventDefault(),
                !1
        }
        ))
    }
    class ms {
        constructor(t, i, n) {
            this.Xd = 0,
            this.Kd = null,
            this.Zd = {
                nt: Number.NEGATIVE_INFINITY,
                st: Number.POSITIVE_INFINITY
            },
            this.Gd = 0,
            this.Jd = null,
            this.Qd = {
                nt: Number.NEGATIVE_INFINITY,
                st: Number.POSITIVE_INFINITY
            },
            this.tf = null,
            this.if = !1,
            this.nf = null,
            this.sf = null,
            this.ef = !1,
            this.rf = !1,
            this.hf = !1,
            this.lf = null,
            this.af = null,
            this._f = null,
            this.uf = null,
            this.cf = null,
            this.df = null,
            this.ff = null,
            this.vf = 0,
            this.pf = !1,
            this.mf = !1,
            this.bf = !1,
            this.wf = 0,
            this.gf = null,
            this.Mf = !hs(),
            this.xf = t=>{
                this.Sf(t)
            }
            ,
            this.yf = t=>{
                if (this.kf(t)) {
                    const i = this.Cf(t);
                    if (++this.Gd,
                    this.Jd && this.Gd > 1) {
                        const {Tf: n} = this.Pf(gs(t), this.Qd);
                        n < 30 && !this.hf && this.Rf(i, this.Of.Df),
                        this.Bf()
                    }
                } else {
                    const i = this.Cf(t);
                    if (++this.Xd,
                    this.Kd && this.Xd > 1) {
                        const {Tf: n} = this.Pf(gs(t), this.Zd);
                        n < 5 && !this.rf && this.Af(i, this.Of.zf),
                        this.Vf()
                    }
                }
            }
            ,
            this.Ef = t,
            this.Of = i,
            this.cn = n,
            this.If()
        }
        S() {
            null !== this.lf && (this.lf(),
            this.lf = null),
            null !== this.af && (this.af(),
            this.af = null),
            null !== this.uf && (this.uf(),
            this.uf = null),
            null !== this.cf && (this.cf(),
            this.cf = null),
            null !== this.df && (this.df(),
            this.df = null),
            null !== this._f && (this._f(),
            this._f = null),
            this.Lf(),
            this.Vf()
        }
        Nf(t) {
            this.uf && this.uf();
            const i = this.Ff.bind(this);
            if (this.uf = ()=>{
                this.Ef.removeEventListener("mousemove", i)
            }
            ,
            this.Ef.addEventListener("mousemove", i),
            this.kf(t))
                return;
            const n = this.Cf(t);
            this.Af(n, this.Of.Wf),
            this.Mf = !0
        }
        Vf() {
            null !== this.Kd && clearTimeout(this.Kd),
            this.Xd = 0,
            this.Kd = null,
            this.Zd = {
                nt: Number.NEGATIVE_INFINITY,
                st: Number.POSITIVE_INFINITY
            }
        }
        Bf() {
            null !== this.Jd && clearTimeout(this.Jd),
            this.Gd = 0,
            this.Jd = null,
            this.Qd = {
                nt: Number.NEGATIVE_INFINITY,
                st: Number.POSITIVE_INFINITY
            }
        }
        Ff(t) {
            if (this.bf || null !== this.sf)
                return;
            if (this.kf(t))
                return;
            const i = this.Cf(t);
            this.Af(i, this.Of.jf),
            this.Mf = !0
        }
        Hf(t) {
            const i = xs(t.changedTouches, f(this.gf));
            if (null === i)
                return;
            if (this.wf = Ms(t),
            null !== this.ff)
                return;
            if (this.mf)
                return;
            this.pf = !0;
            const n = this.Pf(gs(i), f(this.sf))
              , {$f: s, Uf: e, Tf: r} = n;
            if (this.ef || !(r < 5)) {
                if (!this.ef) {
                    const t = .5 * s
                      , i = e >= t && !this.cn.qf()
                      , n = t > e && !this.cn.Yf();
                    i || n || (this.mf = !0),
                    this.ef = !0,
                    this.hf = !0,
                    this.Lf(),
                    this.Bf()
                }
                if (!this.mf) {
                    const n = this.Cf(t, i);
                    this.Rf(n, this.Of.Xf),
                    ws(t)
                }
            }
        }
        Kf(t) {
            if (0 !== t.button)
                return;
            const i = this.Pf(gs(t), f(this.nf))
              , {Tf: n} = i;
            if (n >= 5 && (this.rf = !0,
            this.Vf()),
            this.rf) {
                const i = this.Cf(t);
                this.Af(i, this.Of.Zf)
            }
        }
        Pf(t, i) {
            const n = Math.abs(i.nt - t.nt)
              , s = Math.abs(i.st - t.st);
            return {
                $f: n,
                Uf: s,
                Tf: n + s
            }
        }
        Gf(t) {
            let i = xs(t.changedTouches, f(this.gf));
            if (null === i && 0 === t.touches.length && (i = t.changedTouches[0]),
            null === i)
                return;
            this.gf = null,
            this.wf = Ms(t),
            this.Lf(),
            this.sf = null,
            this.df && (this.df(),
            this.df = null);
            const n = this.Cf(t, i);
            if (this.Rf(n, this.Of.Jf),
            ++this.Gd,
            this.Jd && this.Gd > 1) {
                const {Tf: t} = this.Pf(gs(i), this.Qd);
                t < 30 && !this.hf && this.Rf(n, this.Of.Df),
                this.Bf()
            } else
                this.hf || (this.Rf(n, this.Of.Qf),
                this.Of.Qf && ws(t));
            0 === this.Gd && ws(t),
            0 === t.touches.length && this.if && (this.if = !1,
            ws(t))
        }
        Sf(t) {
            if (0 !== t.button)
                return;
            const i = this.Cf(t);
            if (this.nf = null,
            this.bf = !1,
            this.cf && (this.cf(),
            this.cf = null),
            rs()) {
                this.Ef.ownerDocument.documentElement.removeEventListener("mouseleave", this.xf)
            }
            if (!this.kf(t))
                if (this.Af(i, this.Of.tv),
                ++this.Xd,
                this.Kd && this.Xd > 1) {
                    const {Tf: n} = this.Pf(gs(t), this.Zd);
                    n < 5 && !this.rf && this.Af(i, this.Of.zf),
                    this.Vf()
                } else
                    this.rf || this.Af(i, this.Of.iv)
        }
        Lf() {
            null !== this.tf && (clearTimeout(this.tf),
            this.tf = null)
        }
        nv(t) {
            if (null !== this.gf)
                return;
            const i = t.changedTouches[0];
            this.gf = i.identifier,
            this.wf = Ms(t);
            const n = this.Ef.ownerDocument.documentElement;
            this.hf = !1,
            this.ef = !1,
            this.mf = !1,
            this.sf = gs(i),
            this.df && (this.df(),
            this.df = null);
            {
                const i = this.Hf.bind(this)
                  , s = this.Gf.bind(this);
                this.df = ()=>{
                    n.removeEventListener("touchmove", i),
                    n.removeEventListener("touchend", s)
                }
                ,
                n.addEventListener("touchmove", i, {
                    passive: !1
                }),
                n.addEventListener("touchend", s, {
                    passive: !1
                }),
                this.Lf(),
                this.tf = setTimeout(this.sv.bind(this, t), 240)
            }
            const s = this.Cf(t, i);
            this.Rf(s, this.Of.ev),
            this.Jd || (this.Gd = 0,
            this.Jd = setTimeout(this.Bf.bind(this), 500),
            this.Qd = gs(i))
        }
        rv(t) {
            if (0 !== t.button)
                return;
            const i = this.Ef.ownerDocument.documentElement;
            rs() && i.addEventListener("mouseleave", this.xf),
            this.rf = !1,
            this.nf = gs(t),
            this.cf && (this.cf(),
            this.cf = null);
            {
                const t = this.Kf.bind(this)
                  , n = this.Sf.bind(this);
                this.cf = ()=>{
                    i.removeEventListener("mousemove", t),
                    i.removeEventListener("mouseup", n)
                }
                ,
                i.addEventListener("mousemove", t),
                i.addEventListener("mouseup", n)
            }
            if (this.bf = !0,
            this.kf(t))
                return;
            const n = this.Cf(t);
            this.Af(n, this.Of.hv),
            this.Kd || (this.Xd = 0,
            this.Kd = setTimeout(this.Vf.bind(this), 500),
            this.Zd = gs(t))
        }
        If() {
            this.Ef.addEventListener("mouseenter", this.Nf.bind(this)),
            this.Ef.addEventListener("touchcancel", this.Lf.bind(this));
            {
                const t = this.Ef.ownerDocument
                  , i = t=>{
                    this.Of.lv && (t.composed && this.Ef.contains(t.composedPath()[0]) || t.target && this.Ef.contains(t.target) || this.Of.lv())
                }
                ;
                this.af = ()=>{
                    t.removeEventListener("touchstart", i)
                }
                ,
                this.lf = ()=>{
                    t.removeEventListener("mousedown", i)
                }
                ,
                t.addEventListener("mousedown", i),
                t.addEventListener("touchstart", i, {
                    passive: !0
                })
            }
            hs() && (this._f = ()=>{
                this.Ef.removeEventListener("dblclick", this.yf)
            }
            ,
            this.Ef.addEventListener("dblclick", this.yf)),
            this.Ef.addEventListener("mouseleave", this.av.bind(this)),
            this.Ef.addEventListener("touchstart", this.nv.bind(this), {
                passive: !0
            }),
            ps(this.Ef),
            this.Ef.addEventListener("mousedown", this.rv.bind(this)),
            this.ov(),
            this.Ef.addEventListener("touchmove", (()=>{}
            ), {
                passive: !1
            })
        }
        ov() {
            void 0 === this.Of._v && void 0 === this.Of.uv && void 0 === this.Of.cv || (this.Ef.addEventListener("touchstart", (t=>this.dv(t.touches)), {
                passive: !0
            }),
            this.Ef.addEventListener("touchmove", (t=>{
                if (2 === t.touches.length && null !== this.ff && void 0 !== this.Of.uv) {
                    const i = bs(t.touches[0], t.touches[1]) / this.vf;
                    this.Of.uv(this.ff, i),
                    ws(t)
                }
            }
            ), {
                passive: !1
            }),
            this.Ef.addEventListener("touchend", (t=>{
                this.dv(t.touches)
            }
            )))
        }
        dv(t) {
            1 === t.length && (this.pf = !1),
            2 !== t.length || this.pf || this.if ? this.fv() : this.vv(t)
        }
        vv(t) {
            const i = this.Ef.getBoundingClientRect() || {
                left: 0,
                top: 0
            };
            this.ff = {
                nt: (t[0].clientX - i.left + (t[1].clientX - i.left)) / 2,
                st: (t[0].clientY - i.top + (t[1].clientY - i.top)) / 2
            },
            this.vf = bs(t[0], t[1]),
            void 0 !== this.Of._v && this.Of._v(),
            this.Lf()
        }
        fv() {
            null !== this.ff && (this.ff = null,
            void 0 !== this.Of.cv && this.Of.cv())
        }
        av(t) {
            if (this.uf && this.uf(),
            this.kf(t))
                return;
            if (!this.Mf)
                return;
            const i = this.Cf(t);
            this.Af(i, this.Of.pv),
            this.Mf = !hs()
        }
        sv(t) {
            const i = xs(t.touches, f(this.gf));
            if (null === i)
                return;
            const n = this.Cf(t, i);
            this.Rf(n, this.Of.mv),
            this.hf = !0,
            this.if = !0
        }
        kf(t) {
            return t.sourceCapabilities && void 0 !== t.sourceCapabilities.firesTouchEvents ? t.sourceCapabilities.firesTouchEvents : Ms(t) < this.wf + 500
        }
        Rf(t, i) {
            i && i.call(this.Of, t)
        }
        Af(t, i) {
            i && i.call(this.Of, t)
        }
        Cf(t, i) {
            const n = i || t
              , s = this.Ef.getBoundingClientRect() || {
                left: 0,
                top: 0
            };
            return {
                clientX: n.clientX,
                clientY: n.clientY,
                pageX: n.pageX,
                pageY: n.pageY,
                screenX: n.screenX,
                screenY: n.screenY,
                localX: n.clientX - s.left,
                localY: n.clientY - s.top,
                ctrlKey: t.ctrlKey,
                altKey: t.altKey,
                shiftKey: t.shiftKey,
                metaKey: t.metaKey,
                bv: !t.type.startsWith("mouse") && "contextmenu" !== t.type && "click" !== t.type,
                wv: t.type,
                gv: n.target,
                Mv: t.view,
                xv: ()=>{
                    "touchstart" !== t.type && ws(t)
                }
            }
        }
    }
    function bs(t, i) {
        const n = t.clientX - i.clientX
          , s = t.clientY - i.clientY;
        return Math.sqrt(n * n + s * s)
    }
    function ws(t) {
        t.cancelable && t.preventDefault()
    }
    function gs(t) {
        return {
            nt: t.pageX,
            st: t.pageY
        }
    }
    function Ms(t) {
        return t.timeStamp || performance.now()
    }
    function xs(t, i) {
        for (let n = 0; n < t.length; ++n)
            if (t[n].identifier === i)
                return t[n];
        return null
    }
    function Ss(t) {
        return {
            jc: t.jc,
            Sv: {
                wr: t.yv.externalId
            },
            kv: t.yv.cursorStyle
        }
    }
    function ys(t, i, n) {
        for (const s of t) {
            const t = s.gt();
            if (null !== t && t.br) {
                const e = t.br(i, n);
                if (null !== e)
                    return {
                        Mv: s,
                        Sv: e
                    }
            }
        }
        return null
    }
    function ks(t, i) {
        return n=>{
            var s, e, r, h;
            return (null !== (e = null === (s = n.Dt()) || void 0 === s ? void 0 : s.Ta()) && void 0 !== e ? e : "") !== i ? [] : null !== (h = null === (r = n.ca) || void 0 === r ? void 0 : r.call(n, t)) && void 0 !== h ? h : []
        }
    }
    function Cs(t, i, n, s) {
        if (!t.length)
            return;
        let e = 0;
        const r = n / 2
          , h = t[0].zt(s, !0);
        let l = 1 === i ? r - (t[0].Oi() - h / 2) : t[0].Oi() - h / 2 - r;
        l = Math.max(0, l);
        for (let r = 1; r < t.length; r++) {
            const h = t[r]
              , a = t[r - 1]
              , o = a.zt(s, !1)
              , _ = h.Oi()
              , u = a.Oi();
            if (1 === i ? _ > u - o : _ < u + o) {
                const s = u - o * i;
                h.Bi(s);
                const r = s - i * o / 2;
                if ((1 === i ? r < 0 : r > n) && l > 0) {
                    const s = 1 === i ? -1 - r : r - n
                      , h = Math.min(s, l);
                    for (let n = e; n < t.length; n++)
                        t[n].Bi(t[n].Oi() + i * h);
                    l -= h
                }
            } else
                e = r,
                l = 1 === i ? u - o - _ : _ - (u + o)
        }
    }
    class Ts {
        constructor(t, i, n, s) {
            this.Ii = null,
            this.Cv = null,
            this.Tv = !1,
            this.Pv = new Gt(200),
            this.Jr = null,
            this.Rv = 0,
            this.Dv = !1,
            this.Ov = ()=>{
                this.Dv || this.tn.Bv().$t().$h()
            }
            ,
            this.Av = ()=>{
                this.Dv || this.tn.Bv().$t().$h()
            }
            ,
            this.tn = t,
            this.cn = i,
            this.So = i.layout,
            this.Oc = n,
            this.zv = "left" === s,
            this.Vv = ks("normal", s),
            this.Ev = ks("top", s),
            this.Iv = ks("bottom", s),
            this.Lv = document.createElement("div"),
            this.Lv.style.height = "100%",
            this.Lv.style.overflow = "hidden",
            this.Lv.style.width = "25px",
            this.Lv.style.left = "0",
            this.Lv.style.position = "relative",
            this.Nv = us(this.Lv, Gn({
                width: 16,
                height: 16
            })),
            this.Nv.subscribeSuggestedBitmapSizeChanged(this.Ov);
            const e = this.Nv.canvasElement;
            e.style.position = "absolute",
            e.style.zIndex = "1",
            e.style.left = "0",
            e.style.top = "0",
            this.Fv = us(this.Lv, Gn({
                width: 16,
                height: 16
            })),
            this.Fv.subscribeSuggestedBitmapSizeChanged(this.Av);
            const r = this.Fv.canvasElement;
            r.style.position = "absolute",
            r.style.zIndex = "2",
            r.style.left = "0",
            r.style.top = "0";
            const h = {
                hv: this.Wv.bind(this),
                ev: this.Wv.bind(this),
                Zf: this.jv.bind(this),
                Xf: this.jv.bind(this),
                lv: this.Hv.bind(this),
                tv: this.$v.bind(this),
                Jf: this.$v.bind(this),
                zf: this.Uv.bind(this),
                Df: this.Uv.bind(this),
                Wf: this.qv.bind(this),
                pv: this.Yv.bind(this)
            };
            this.Xv = new ms(this.Fv.canvasElement,h,{
                qf: ()=>!this.cn.handleScroll.vertTouchDrag,
                Yf: ()=>!0
            })
        }
        S() {
            this.Xv.S(),
            this.Fv.unsubscribeSuggestedBitmapSizeChanged(this.Av),
            cs(this.Fv.canvasElement),
            this.Fv.dispose(),
            this.Nv.unsubscribeSuggestedBitmapSizeChanged(this.Ov),
            cs(this.Nv.canvasElement),
            this.Nv.dispose(),
            null !== this.Ii && this.Ii.Ko().p(this),
            this.Ii = null
        }
        Kv() {
            return this.Lv
        }
        P() {
            return this.So.fontSize
        }
        Zv() {
            const t = this.Oc.W();
            return this.Jr !== t.R && (this.Pv.ir(),
            this.Jr = t.R),
            t
        }
        Gv() {
            if (null === this.Ii)
                return 0;
            let t = 0;
            const i = this.Zv()
              , n = f(this.Nv.canvasElement.getContext("2d"));
            n.save();
            const s = this.Ii.ja();
            n.font = this.Jv(),
            s.length > 0 && (t = Math.max(this.Pv.xi(n, s[0].no), this.Pv.xi(n, s[s.length - 1].no)));
            const e = this.Qv();
            for (let i = e.length; i--; ) {
                const s = this.Pv.xi(n, e[i].Zt());
                s > t && (t = s)
            }
            const r = this.Ii.Ct();
            if (null !== r && null !== this.Cv) {
                const i = this.Ii.pn(1, r)
                  , s = this.Ii.pn(this.Cv.height - 2, r);
                t = Math.max(t, this.Pv.xi(n, this.Ii.Fi(Math.floor(Math.min(i, s)) + .11111111111111, r)), this.Pv.xi(n, this.Ii.Fi(Math.ceil(Math.max(i, s)) - .11111111111111, r)))
            }
            n.restore();
            const h = t || 34;
            return ls(Math.ceil(i.C + i.T + i.V + i.I + 5 + h))
        }
        tp(t) {
            null !== this.Cv && Jn(this.Cv, t) || (this.Cv = t,
            this.Dv = !0,
            this.Nv.resizeCanvasElement(t),
            this.Fv.resizeCanvasElement(t),
            this.Dv = !1,
            this.Lv.style.width = `${t.width}px`,
            this.Lv.style.height = `${t.height}px`)
        }
        ip() {
            return f(this.Cv).width
        }
        Gi(t) {
            this.Ii !== t && (null !== this.Ii && this.Ii.Ko().p(this),
            this.Ii = t,
            t.Ko().l(this.do.bind(this), this))
        }
        Dt() {
            return this.Ii
        }
        ir() {
            const t = this.tn.np();
            this.tn.Bv().$t().I_(t, f(this.Dt()))
        }
        sp(t) {
            if (null === this.Cv)
                return;
            if (1 !== t) {
                this.ep(),
                this.Nv.applySuggestedBitmapSize();
                const t = ss(this.Nv);
                null !== t && (t.useBitmapCoordinateSpace((t=>{
                    this.rp(t),
                    this.ze(t)
                }
                )),
                this.tn.hp(t, this.Iv),
                this.lp(t),
                this.tn.hp(t, this.Vv),
                this.ap(t))
            }
            this.Fv.applySuggestedBitmapSize();
            const i = ss(this.Fv);
            null !== i && (i.useBitmapCoordinateSpace((({context: t, bitmapSize: i})=>{
                t.clearRect(0, 0, i.width, i.height)
            }
            )),
            this.op(i),
            this.tn.hp(i, this.Ev))
        }
        _p() {
            return this.Nv.bitmapSize
        }
        up(t, i, n) {
            const s = this._p();
            s.width > 0 && s.height > 0 && t.drawImage(this.Nv.canvasElement, i, n)
        }
        bt() {
            var t;
            null === (t = this.Ii) || void 0 === t || t.ja()
        }
        Wv(t) {
            if (null === this.Ii || this.Ii.Ni() || !this.cn.handleScale.axisPressedMouseMove.price)
                return;
            const i = this.tn.Bv().$t()
              , n = this.tn.np();
            this.Tv = !0,
            i.D_(n, this.Ii, t.localY)
        }
        jv(t) {
            if (null === this.Ii || !this.cn.handleScale.axisPressedMouseMove.price)
                return;
            const i = this.tn.Bv().$t()
              , n = this.tn.np()
              , s = this.Ii;
            i.O_(n, s, t.localY)
        }
        Hv() {
            if (null === this.Ii || !this.cn.handleScale.axisPressedMouseMove.price)
                return;
            const t = this.tn.Bv().$t()
              , i = this.tn.np()
              , n = this.Ii;
            this.Tv && (this.Tv = !1,
            t.B_(i, n))
        }
        $v(t) {
            if (null === this.Ii || !this.cn.handleScale.axisPressedMouseMove.price)
                return;
            const i = this.tn.Bv().$t()
              , n = this.tn.np();
            this.Tv = !1,
            i.B_(n, this.Ii)
        }
        Uv(t) {
            this.cn.handleScale.axisDoubleClickReset.price && this.ir()
        }
        qv(t) {
            if (null === this.Ii)
                return;
            !this.tn.Bv().$t().W().handleScale.axisPressedMouseMove.price || this.Ii.gh() || this.Ii.Oo() || this.cp(1)
        }
        Yv(t) {
            this.cp(0)
        }
        Qv() {
            const t = []
              , i = null === this.Ii ? void 0 : this.Ii;
            return (n=>{
                for (let s = 0; s < n.length; ++s) {
                    const e = n[s].Rn(this.tn.np(), i);
                    for (let i = 0; i < e.length; i++)
                        t.push(e[i])
                }
            }
            )(this.tn.np().$o()),
            t
        }
        rp({context: t, bitmapSize: i}) {
            const {width: n, height: s} = i
              , e = this.tn.np().$t()
              , r = e.q()
              , h = e.md();
            r === h ? q(t, 0, 0, n, s, r) : K(t, 0, 0, n, s, r, h)
        }
        ze({context: t, bitmapSize: i, horizontalPixelRatio: n}) {
            if (null === this.Cv || null === this.Ii || !this.Ii.W().borderVisible)
                return;
            t.fillStyle = this.Ii.W().borderColor;
            const s = Math.max(1, Math.floor(this.Zv().C * n));
            let e;
            e = this.zv ? i.width - s : 0,
            t.fillRect(e, 0, s, i.height)
        }
        lp(t) {
            if (null === this.Cv || null === this.Ii)
                return;
            const i = this.Ii.ja()
              , n = this.Ii.W()
              , s = this.Zv()
              , e = this.zv ? this.Cv.width - s.T : 0;
            n.borderVisible && n.ticksVisible && t.useBitmapCoordinateSpace((({context: t, horizontalPixelRatio: r, verticalPixelRatio: h})=>{
                t.fillStyle = n.borderColor;
                const l = Math.max(1, Math.floor(h))
                  , a = Math.floor(.5 * h)
                  , o = Math.round(s.T * r);
                t.beginPath();
                for (const n of i)
                    t.rect(Math.floor(e * r), Math.round(n.Ia * h) - a, o, l);
                t.fill()
            }
            )),
            t.useMediaCoordinateSpace((({context: t})=>{
                var r;
                t.font = this.Jv(),
                t.fillStyle = null !== (r = n.textColor) && void 0 !== r ? r : this.So.textColor,
                t.textAlign = this.zv ? "right" : "left",
                t.textBaseline = "middle";
                const h = this.zv ? Math.round(e - s.V) : Math.round(e + s.T + s.V)
                  , l = i.map((i=>this.Pv.Mi(t, i.no)));
                for (let n = i.length; n--; ) {
                    const s = i[n];
                    t.fillText(s.no, h, s.Ia + l[n])
                }
            }
            ))
        }
        ep() {
            if (null === this.Cv || null === this.Ii)
                return;
            const t = []
              , i = this.Ii.$o().slice()
              , n = this.tn.np()
              , s = this.Zv();
            this.Ii === n.vr() && this.tn.np().$o().forEach((t=>{
                n.dr(t) && i.push(t)
            }
            ));
            const e = this.Ii;
            i.forEach((i=>{
                i.Rn(n, e).forEach((i=>{
                    i.Bi(null),
                    i.Ai() && t.push(i)
                }
                ))
            }
            )),
            t.forEach((t=>t.Bi(t.yi())));
            this.Ii.W().alignLabels && this.dp(t, s)
        }
        dp(t, i) {
            if (null === this.Cv)
                return;
            const n = this.Cv.height / 2
              , s = t.filter((t=>t.yi() <= n))
              , e = t.filter((t=>t.yi() > n));
            s.sort(((t,i)=>i.yi() - t.yi())),
            e.sort(((t,i)=>t.yi() - i.yi()));
            for (const n of t) {
                const t = Math.floor(n.zt(i) / 2)
                  , s = n.yi();
                s > -t && s < t && n.Bi(t),
                s > this.Cv.height - t && s < this.Cv.height + t && n.Bi(this.Cv.height - t)
            }
            Cs(s, 1, this.Cv.height, i),
            Cs(e, -1, this.Cv.height, i)
        }
        ap(t) {
            if (null === this.Cv)
                return;
            const i = this.Qv()
              , n = this.Zv()
              , s = this.zv ? "right" : "left";
            i.forEach((i=>{
                if (i.zi()) {
                    i.gt(f(this.Ii)).K(t, n, this.Pv, s)
                }
            }
            ))
        }
        op(t) {
            if (null === this.Cv || null === this.Ii)
                return;
            const i = this.tn.Bv().$t()
              , n = []
              , s = this.tn.np()
              , e = i.Yc().Rn(s, this.Ii);
            e.length && n.push(e);
            const r = this.Zv()
              , h = this.zv ? "right" : "left";
            n.forEach((i=>{
                i.forEach((i=>{
                    i.gt(f(this.Ii)).K(t, r, this.Pv, h)
                }
                ))
            }
            ))
        }
        cp(t) {
            this.Lv.style.cursor = 1 === t ? "ns-resize" : "default"
        }
        do() {
            const t = this.Gv();
            this.Rv < t && this.tn.Bv().$t().Kl(),
            this.Rv = t
        }
        Jv() {
            return V(this.So.fontSize, this.So.fontFamily)
        }
    }
    function Ps(t, i) {
        var n, s;
        return null !== (s = null === (n = t._a) || void 0 === n ? void 0 : n.call(t, i)) && void 0 !== s ? s : []
    }
    function Rs(t, i) {
        var n, s;
        return null !== (s = null === (n = t.Pn) || void 0 === n ? void 0 : n.call(t, i)) && void 0 !== s ? s : []
    }
    function Ds(t, i) {
        var n, s;
        return null !== (s = null === (n = t.Ji) || void 0 === n ? void 0 : n.call(t, i)) && void 0 !== s ? s : []
    }
    function Os(t, i) {
        var n, s;
        return null !== (s = null === (n = t.la) || void 0 === n ? void 0 : n.call(t, i)) && void 0 !== s ? s : []
    }
    class Bs {
        constructor(t, i) {
            this.Cv = Gn({
                width: 0,
                height: 0
            }),
            this.fp = null,
            this.vp = null,
            this.pp = null,
            this.mp = !1,
            this.bp = new k,
            this.wp = new k,
            this.gp = 0,
            this.Mp = !1,
            this.xp = null,
            this.Sp = !1,
            this.yp = null,
            this.kp = null,
            this.Dv = !1,
            this.Ov = ()=>{
                this.Dv || null === this.Cp || this.$i().$h()
            }
            ,
            this.Av = ()=>{
                this.Dv || null === this.Cp || this.$i().$h()
            }
            ,
            this.Tp = t,
            this.Cp = i,
            this.Cp.F_().l(this.Pp.bind(this), this, !0),
            this.Rp = document.createElement("td"),
            this.Rp.style.padding = "0",
            this.Rp.style.position = "relative";
            const n = document.createElement("div");
            n.style.width = "100%",
            n.style.height = "100%",
            n.style.position = "relative",
            n.style.overflow = "hidden",
            this.Dp = document.createElement("td"),
            this.Dp.style.padding = "0",
            this.Op = document.createElement("td"),
            this.Op.style.padding = "0",
            this.Rp.appendChild(n),
            this.Nv = us(n, Gn({
                width: 16,
                height: 16
            })),
            this.Nv.subscribeSuggestedBitmapSizeChanged(this.Ov);
            const s = this.Nv.canvasElement;
            s.style.position = "absolute",
            s.style.zIndex = "1",
            s.style.left = "0",
            s.style.top = "0",
            this.Fv = us(n, Gn({
                width: 16,
                height: 16
            })),
            this.Fv.subscribeSuggestedBitmapSizeChanged(this.Av);
            const e = this.Fv.canvasElement;
            e.style.position = "absolute",
            e.style.zIndex = "2",
            e.style.left = "0",
            e.style.top = "0",
            this.Bp = document.createElement("tr"),
            this.Bp.appendChild(this.Dp),
            this.Bp.appendChild(this.Rp),
            this.Bp.appendChild(this.Op),
            this.Ap(),
            this.Xv = new ms(this.Fv.canvasElement,this,{
                qf: ()=>null === this.xp && !this.Tp.W().handleScroll.vertTouchDrag,
                Yf: ()=>null === this.xp && !this.Tp.W().handleScroll.horzTouchDrag
            })
        }
        S() {
            null !== this.fp && this.fp.S(),
            null !== this.vp && this.vp.S(),
            this.Fv.unsubscribeSuggestedBitmapSizeChanged(this.Av),
            cs(this.Fv.canvasElement),
            this.Fv.dispose(),
            this.Nv.unsubscribeSuggestedBitmapSizeChanged(this.Ov),
            cs(this.Nv.canvasElement),
            this.Nv.dispose(),
            null !== this.Cp && this.Cp.F_().p(this),
            this.Xv.S()
        }
        np() {
            return f(this.Cp)
        }
        zp(t) {
            null !== this.Cp && this.Cp.F_().p(this),
            this.Cp = t,
            null !== this.Cp && this.Cp.F_().l(Bs.prototype.Pp.bind(this), this, !0),
            this.Ap()
        }
        Bv() {
            return this.Tp
        }
        Kv() {
            return this.Bp
        }
        Ap() {
            if (null !== this.Cp && (this.Vp(),
            0 !== this.$i().wt().length)) {
                if (null !== this.fp) {
                    const t = this.Cp.P_();
                    this.fp.Gi(f(t))
                }
                if (null !== this.vp) {
                    const t = this.Cp.R_();
                    this.vp.Gi(f(t))
                }
            }
        }
        Ep() {
            null !== this.fp && this.fp.bt(),
            null !== this.vp && this.vp.bt()
        }
        g_() {
            return null !== this.Cp ? this.Cp.g_() : 0
        }
        M_(t) {
            this.Cp && this.Cp.M_(t)
        }
        Wf(t) {
            if (!this.Cp)
                return;
            this.Ip();
            const i = t.localX
              , n = t.localY;
            this.Lp(i, n, t)
        }
        hv(t) {
            this.Ip(),
            this.Np(),
            this.Lp(t.localX, t.localY, t)
        }
        jf(t) {
            var i;
            if (!this.Cp)
                return;
            this.Ip();
            const n = t.localX
              , s = t.localY;
            this.Lp(n, s, t);
            const e = this.br(n, s);
            this.Tp.Fp(null !== (i = null == e ? void 0 : e.kv) && void 0 !== i ? i : null),
            this.$i().Wc(e && {
                jc: e.jc,
                Sv: e.Sv
            })
        }
        iv(t) {
            null !== this.Cp && (this.Ip(),
            this.Wp(t))
        }
        zf(t) {
            null !== this.Cp && this.jp(this.wp, t)
        }
        Df(t) {
            this.zf(t)
        }
        Zf(t) {
            this.Ip(),
            this.Hp(t),
            this.Lp(t.localX, t.localY, t)
        }
        tv(t) {
            null !== this.Cp && (this.Ip(),
            this.Mp = !1,
            this.$p(t))
        }
        Qf(t) {
            null !== this.Cp && this.Wp(t)
        }
        mv(t) {
            if (this.Mp = !0,
            null === this.xp) {
                const i = {
                    x: t.localX,
                    y: t.localY
                };
                this.Up(i, i, t)
            }
        }
        pv(t) {
            null !== this.Cp && (this.Ip(),
            this.Cp.$t().Wc(null),
            this.qp())
        }
        Yp() {
            return this.bp
        }
        Xp() {
            return this.wp
        }
        _v() {
            this.gp = 1,
            this.$i().Un()
        }
        uv(t, i) {
            if (!this.Tp.W().handleScale.pinch)
                return;
            const n = 5 * (i - this.gp);
            this.gp = i,
            this.$i().Jc(t.nt, n)
        }
        ev(t) {
            this.Mp = !1,
            this.Sp = null !== this.xp,
            this.Np();
            const i = this.$i().Yc();
            null !== this.xp && i.kt() && (this.yp = {
                x: i.Yt(),
                y: i.Xt()
            },
            this.xp = {
                x: t.localX,
                y: t.localY
            })
        }
        Xf(t) {
            if (null === this.Cp)
                return;
            const i = t.localX
              , n = t.localY;
            if (null === this.xp)
                this.Hp(t);
            else {
                this.Sp = !1;
                const s = f(this.yp)
                  , e = s.x + (i - this.xp.x)
                  , r = s.y + (n - this.xp.y);
                this.Lp(e, r, t)
            }
        }
        Jf(t) {
            0 === this.Bv().W().trackingMode.exitMode && (this.Sp = !0),
            this.Kp(),
            this.$p(t)
        }
        br(t, i) {
            const n = this.Cp;
            return null === n ? null : function(t, i, n) {
                const s = t.$o()
                  , e = function(t, i, n) {
                    var s, e;
                    let r, h;
                    for (const o of t) {
                        const t = null !== (e = null === (s = o.fa) || void 0 === s ? void 0 : s.call(o, i, n)) && void 0 !== e ? e : [];
                        for (const i of t)
                            l = i.zOrder,
                            (!(a = null == r ? void 0 : r.zOrder) || "top" === l && "top" !== a || "normal" === l && "bottom" === a) && (r = i,
                            h = o)
                    }
                    var l, a;
                    return r && h ? {
                        yv: r,
                        jc: h
                    } : null
                }(s, i, n);
                if ("top" === (null == e ? void 0 : e.yv.zOrder))
                    return Ss(e);
                for (const r of s) {
                    if (e && e.jc === r && "bottom" !== e.yv.zOrder && !e.yv.isBackground)
                        return Ss(e);
                    const s = ys(r.Pn(t), i, n);
                    if (null !== s)
                        return {
                            jc: r,
                            Mv: s.Mv,
                            Sv: s.Sv
                        };
                    if (e && e.jc === r && "bottom" !== e.yv.zOrder && e.yv.isBackground)
                        return Ss(e)
                }
                return (null == e ? void 0 : e.yv) ? Ss(e) : null
            }(n, t, i)
        }
        Zp(t, i) {
            f("left" === i ? this.fp : this.vp).tp(Gn({
                width: t,
                height: this.Cv.height
            }))
        }
        Gp() {
            return this.Cv
        }
        tp(t) {
            Jn(this.Cv, t) || (this.Cv = t,
            this.Dv = !0,
            this.Nv.resizeCanvasElement(t),
            this.Fv.resizeCanvasElement(t),
            this.Dv = !1,
            this.Rp.style.width = t.width + "px",
            this.Rp.style.height = t.height + "px")
        }
        Jp() {
            const t = f(this.Cp);
            t.T_(t.P_()),
            t.T_(t.R_());
            for (const i of t.Ba())
                if (t.dr(i)) {
                    const n = i.Dt();
                    null !== n && t.T_(n),
                    i.On()
                }
        }
        _p() {
            return this.Nv.bitmapSize
        }
        up(t, i, n) {
            const s = this._p();
            s.width > 0 && s.height > 0 && t.drawImage(this.Nv.canvasElement, i, n)
        }
        sp(t) {
            if (0 === t)
                return;
            if (null === this.Cp)
                return;
            if (t > 1 && this.Jp(),
            null !== this.fp && this.fp.sp(t),
            null !== this.vp && this.vp.sp(t),
            1 !== t) {
                this.Nv.applySuggestedBitmapSize();
                const t = ss(this.Nv);
                null !== t && (t.useBitmapCoordinateSpace((t=>{
                    this.rp(t)
                }
                )),
                this.Cp && (this.Qp(t, Ps),
                this.tm(t),
                this.im(t),
                this.Qp(t, Rs),
                this.Qp(t, Ds)))
            }
            this.Fv.applySuggestedBitmapSize();
            const i = ss(this.Fv);
            null !== i && (i.useBitmapCoordinateSpace((({context: t, bitmapSize: i})=>{
                t.clearRect(0, 0, i.width, i.height)
            }
            )),
            this.nm(i),
            this.Qp(i, Os))
        }
        sm() {
            return this.fp
        }
        rm() {
            return this.vp
        }
        hp(t, i) {
            this.Qp(t, i)
        }
        Pp() {
            null !== this.Cp && this.Cp.F_().p(this),
            this.Cp = null
        }
        Wp(t) {
            this.jp(this.bp, t)
        }
        jp(t, i) {
            const n = i.localX
              , s = i.localY;
            t.M() && t.m(this.$i().St().Lu(n), {
                x: n,
                y: s
            }, i)
        }
        rp({context: t, bitmapSize: i}) {
            const {width: n, height: s} = i
              , e = this.$i()
              , r = e.q()
              , h = e.md();
            r === h ? q(t, 0, 0, n, s, h) : K(t, 0, 0, n, s, r, h)
        }
        tm(t) {
            const i = f(this.Cp).W_().Uh().gt();
            null !== i && i.K(t, !1)
        }
        im(t) {
            const i = this.$i().qc();
            this.hm(t, Rs, ds, i),
            this.hm(t, Rs, fs, i)
        }
        nm(t) {
            this.hm(t, Rs, fs, this.$i().Yc())
        }
        Qp(t, i) {
            const n = f(this.Cp).$o();
            for (const s of n)
                this.hm(t, i, ds, s);
            for (const s of n)
                this.hm(t, i, fs, s)
        }
        hm(t, i, n, s) {
            const e = f(this.Cp)
              , r = e.$t().Fc()
              , h = null !== r && r.jc === s
              , l = null !== r && h && void 0 !== r.Sv ? r.Sv.gr : void 0;
            vs(i, (i=>n(i, t, h, l)), s, e)
        }
        Vp() {
            if (null === this.Cp)
                return;
            const t = this.Tp
              , i = this.Cp.P_().W().visible
              , n = this.Cp.R_().W().visible;
            i || null === this.fp || (this.Dp.removeChild(this.fp.Kv()),
            this.fp.S(),
            this.fp = null),
            n || null === this.vp || (this.Op.removeChild(this.vp.Kv()),
            this.vp.S(),
            this.vp = null);
            const s = t.$t()._d();
            i && null === this.fp && (this.fp = new Ts(this,t.W(),s,"left"),
            this.Dp.appendChild(this.fp.Kv())),
            n && null === this.vp && (this.vp = new Ts(this,t.W(),s,"right"),
            this.Op.appendChild(this.vp.Kv()))
        }
        lm(t) {
            return t.bv && this.Mp || null !== this.xp
        }
        am(t) {
            return Math.max(0, Math.min(t, this.Cv.width - 1))
        }
        om(t) {
            return Math.max(0, Math.min(t, this.Cv.height - 1))
        }
        Lp(t, i, n) {
            this.$i().hd(this.am(t), this.om(i), n, f(this.Cp))
        }
        qp() {
            this.$i().ad()
        }
        Kp() {
            this.Sp && (this.xp = null,
            this.qp())
        }
        Up(t, i, n) {
            this.xp = t,
            this.Sp = !1,
            this.Lp(i.x, i.y, n);
            const s = this.$i().Yc();
            this.yp = {
                x: s.Yt(),
                y: s.Xt()
            }
        }
        $i() {
            return this.Tp.$t()
        }
        $p(t) {
            if (!this.mp)
                return;
            const i = this.$i()
              , n = this.np();
            if (i.V_(n, n.vn()),
            this.pp = null,
            this.mp = !1,
            i.sd(),
            null !== this.kp) {
                const t = performance.now()
                  , n = i.St();
                this.kp.Dr(n.ju(), t),
                this.kp.Ju(t) || i.Xn(this.kp)
            }
        }
        Ip() {
            this.xp = null
        }
        Np() {
            if (!this.Cp)
                return;
            if (this.$i().Un(),
            document.activeElement !== document.body && document.activeElement !== document.documentElement)
                f(document.activeElement).blur();
            else {
                const t = document.getSelection();
                null !== t && t.removeAllRanges()
            }
            !this.Cp.vn().Ni() && this.$i().St().Ni()
        }
        Hp(t) {
            if (null === this.Cp)
                return;
            const i = this.$i()
              , n = i.St();
            if (n.Ni())
                return;
            const s = this.Tp.W()
              , e = s.handleScroll
              , r = s.kineticScroll;
            if ((!e.pressedMouseMove || t.bv) && (!e.horzTouchDrag && !e.vertTouchDrag || !t.bv))
                return;
            const h = this.Cp.vn()
              , l = performance.now();
            if (null !== this.pp || this.lm(t) || (this.pp = {
                x: t.clientX,
                y: t.clientY,
                Od: l,
                _m: t.localX,
                um: t.localY
            }),
            null !== this.pp && !this.mp && (this.pp.x !== t.clientX || this.pp.y !== t.clientY)) {
                if (t.bv && r.touch || !t.bv && r.mouse) {
                    const t = n.he();
                    this.kp = new _s(.2 / t,7 / t,.997,15 / t),
                    this.kp.qd(n.ju(), this.pp.Od)
                } else
                    this.kp = null;
                h.Ni() || i.A_(this.Cp, h, t.localY),
                i.td(t.localX),
                this.mp = !0
            }
            this.mp && (h.Ni() || i.z_(this.Cp, h, t.localY),
            i.nd(t.localX),
            null !== this.kp && this.kp.qd(n.ju(), l))
        }
    }
    class As {
        constructor(t, i, n, s, e) {
            this.ft = !0,
            this.Cv = Gn({
                width: 0,
                height: 0
            }),
            this.Ov = ()=>this.sp(3),
            this.zv = "left" === t,
            this.Oc = n._d,
            this.cn = i,
            this.dm = s,
            this.fm = e,
            this.Lv = document.createElement("div"),
            this.Lv.style.width = "25px",
            this.Lv.style.height = "100%",
            this.Lv.style.overflow = "hidden",
            this.Nv = us(this.Lv, Gn({
                width: 16,
                height: 16
            })),
            this.Nv.subscribeSuggestedBitmapSizeChanged(this.Ov)
        }
        S() {
            this.Nv.unsubscribeSuggestedBitmapSizeChanged(this.Ov),
            cs(this.Nv.canvasElement),
            this.Nv.dispose()
        }
        Kv() {
            return this.Lv
        }
        Gp() {
            return this.Cv
        }
        tp(t) {
            Jn(this.Cv, t) || (this.Cv = t,
            this.Nv.resizeCanvasElement(t),
            this.Lv.style.width = `${t.width}px`,
            this.Lv.style.height = `${t.height}px`,
            this.ft = !0)
        }
        sp(t) {
            if (t < 3 && !this.ft)
                return;
            if (0 === this.Cv.width || 0 === this.Cv.height)
                return;
            this.ft = !1,
            this.Nv.applySuggestedBitmapSize();
            const i = ss(this.Nv);
            null !== i && i.useBitmapCoordinateSpace((t=>{
                this.rp(t),
                this.ze(t)
            }
            ))
        }
        _p() {
            return this.Nv.bitmapSize
        }
        up(t, i, n) {
            const s = this._p();
            s.width > 0 && s.height > 0 && t.drawImage(this.Nv.canvasElement, i, n)
        }
        ze({context: t, bitmapSize: i, horizontalPixelRatio: n, verticalPixelRatio: s}) {
            if (!this.dm())
                return;
            t.fillStyle = this.cn.timeScale.borderColor;
            const e = Math.floor(this.Oc.W().C * n)
              , r = Math.floor(this.Oc.W().C * s)
              , h = this.zv ? i.width - e : 0;
            t.fillRect(h, 0, e, r)
        }
        rp({context: t, bitmapSize: i}) {
            q(t, 0, 0, i.width, i.height, this.fm())
        }
    }
    function zs(t) {
        return i=>{
            var n, s;
            return null !== (s = null === (n = i.da) || void 0 === n ? void 0 : n.call(i, t)) && void 0 !== s ? s : []
        }
    }
    const Vs = zs("normal")
      , Es = zs("top")
      , Is = zs("bottom");
    class Ls {
        constructor(t, i) {
            this.vm = null,
            this.pm = null,
            this.k = null,
            this.bm = !1,
            this.Cv = Gn({
                width: 0,
                height: 0
            }),
            this.wm = new k,
            this.Pv = new Gt(5),
            this.Dv = !1,
            this.Ov = ()=>{
                this.Dv || this.Tp.$t().$h()
            }
            ,
            this.Av = ()=>{
                this.Dv || this.Tp.$t().$h()
            }
            ,
            this.Tp = t,
            this.U_ = i,
            this.cn = t.W().layout,
            this.gm = document.createElement("tr"),
            this.Mm = document.createElement("td"),
            this.Mm.style.padding = "0",
            this.xm = document.createElement("td"),
            this.xm.style.padding = "0",
            this.Lv = document.createElement("td"),
            this.Lv.style.height = "25px",
            this.Lv.style.padding = "0",
            this.Sm = document.createElement("div"),
            this.Sm.style.width = "100%",
            this.Sm.style.height = "100%",
            this.Sm.style.position = "relative",
            this.Sm.style.overflow = "hidden",
            this.Lv.appendChild(this.Sm),
            this.Nv = us(this.Sm, Gn({
                width: 16,
                height: 16
            })),
            this.Nv.subscribeSuggestedBitmapSizeChanged(this.Ov);
            const n = this.Nv.canvasElement;
            n.style.position = "absolute",
            n.style.zIndex = "1",
            n.style.left = "0",
            n.style.top = "0",
            this.Fv = us(this.Sm, Gn({
                width: 16,
                height: 16
            })),
            this.Fv.subscribeSuggestedBitmapSizeChanged(this.Av);
            const s = this.Fv.canvasElement;
            s.style.position = "absolute",
            s.style.zIndex = "2",
            s.style.left = "0",
            s.style.top = "0",
            this.gm.appendChild(this.Mm),
            this.gm.appendChild(this.Lv),
            this.gm.appendChild(this.xm),
            this.ym(),
            this.Tp.$t().w_().l(this.ym.bind(this), this),
            this.Xv = new ms(this.Fv.canvasElement,this,{
                qf: ()=>!0,
                Yf: ()=>!this.Tp.W().handleScroll.horzTouchDrag
            })
        }
        S() {
            this.Xv.S(),
            null !== this.vm && this.vm.S(),
            null !== this.pm && this.pm.S(),
            this.Fv.unsubscribeSuggestedBitmapSizeChanged(this.Av),
            cs(this.Fv.canvasElement),
            this.Fv.dispose(),
            this.Nv.unsubscribeSuggestedBitmapSizeChanged(this.Ov),
            cs(this.Nv.canvasElement),
            this.Nv.dispose()
        }
        Kv() {
            return this.gm
        }
        km() {
            return this.vm
        }
        Cm() {
            return this.pm
        }
        hv(t) {
            if (this.bm)
                return;
            this.bm = !0;
            const i = this.Tp.$t();
            !i.St().Ni() && this.Tp.W().handleScale.axisPressedMouseMove.time && i.Gc(t.localX)
        }
        ev(t) {
            this.hv(t)
        }
        lv() {
            const t = this.Tp.$t();
            !t.St().Ni() && this.bm && (this.bm = !1,
            this.Tp.W().handleScale.axisPressedMouseMove.time && t.rd())
        }
        Zf(t) {
            const i = this.Tp.$t();
            !i.St().Ni() && this.Tp.W().handleScale.axisPressedMouseMove.time && i.ed(t.localX)
        }
        Xf(t) {
            this.Zf(t)
        }
        tv() {
            this.bm = !1;
            const t = this.Tp.$t();
            t.St().Ni() && !this.Tp.W().handleScale.axisPressedMouseMove.time || t.rd()
        }
        Jf() {
            this.tv()
        }
        zf() {
            this.Tp.W().handleScale.axisDoubleClickReset.time && this.Tp.$t().Zn()
        }
        Df() {
            this.zf()
        }
        Wf() {
            this.Tp.$t().W().handleScale.axisPressedMouseMove.time && this.cp(1)
        }
        pv() {
            this.cp(0)
        }
        Gp() {
            return this.Cv
        }
        Tm() {
            return this.wm
        }
        Pm(t, i, n) {
            Jn(this.Cv, t) || (this.Cv = t,
            this.Dv = !0,
            this.Nv.resizeCanvasElement(t),
            this.Fv.resizeCanvasElement(t),
            this.Dv = !1,
            this.Lv.style.width = `${t.width}px`,
            this.Lv.style.height = `${t.height}px`,
            this.wm.m(t)),
            null !== this.vm && this.vm.tp(Gn({
                width: i,
                height: t.height
            })),
            null !== this.pm && this.pm.tp(Gn({
                width: n,
                height: t.height
            }))
        }
        Rm() {
            const t = this.Dm();
            return Math.ceil(t.C + t.T + t.P + t.L + t.A + t.Om)
        }
        bt() {
            this.Tp.$t().St().ja()
        }
        _p() {
            return this.Nv.bitmapSize
        }
        up(t, i, n) {
            const s = this._p();
            s.width > 0 && s.height > 0 && t.drawImage(this.Nv.canvasElement, i, n)
        }
        sp(t) {
            if (0 === t)
                return;
            if (1 !== t) {
                this.Nv.applySuggestedBitmapSize();
                const i = ss(this.Nv);
                null !== i && (i.useBitmapCoordinateSpace((t=>{
                    this.rp(t),
                    this.ze(t),
                    this.Bm(i, Is)
                }
                )),
                this.lp(i),
                this.Bm(i, Vs)),
                null !== this.vm && this.vm.sp(t),
                null !== this.pm && this.pm.sp(t)
            }
            this.Fv.applySuggestedBitmapSize();
            const i = ss(this.Fv);
            null !== i && (i.useBitmapCoordinateSpace((({context: t, bitmapSize: i})=>{
                t.clearRect(0, 0, i.width, i.height)
            }
            )),
            this.Am([...this.Tp.$t().wt(), this.Tp.$t().Yc()], i),
            this.Bm(i, Es))
        }
        Bm(t, i) {
            const n = this.Tp.$t().wt();
            for (const s of n)
                vs(i, (i=>ds(i, t, !1, void 0)), s, void 0);
            for (const s of n)
                vs(i, (i=>fs(i, t, !1, void 0)), s, void 0)
        }
        rp({context: t, bitmapSize: i}) {
            q(t, 0, 0, i.width, i.height, this.Tp.$t().md())
        }
        ze({context: t, bitmapSize: i, verticalPixelRatio: n}) {
            if (this.Tp.W().timeScale.borderVisible) {
                t.fillStyle = this.zm();
                const s = Math.max(1, Math.floor(this.Dm().C * n));
                t.fillRect(0, 0, i.width, s)
            }
        }
        lp(t) {
            const i = this.Tp.$t().St()
              , n = i.ja();
            if (!n || 0 === n.length)
                return;
            const s = this.U_.maxTickMarkWeight(n)
              , e = this.Dm()
              , r = i.W();
            r.borderVisible && r.ticksVisible && t.useBitmapCoordinateSpace((({context: t, horizontalPixelRatio: i, verticalPixelRatio: s})=>{
                t.strokeStyle = this.zm(),
                t.fillStyle = this.zm();
                const r = Math.max(1, Math.floor(i))
                  , h = Math.floor(.5 * i);
                t.beginPath();
                const l = Math.round(e.T * s);
                for (let s = n.length; s--; ) {
                    const e = Math.round(n[s].coord * i);
                    t.rect(e - h, 0, r, l)
                }
                t.fill()
            }
            )),
            t.useMediaCoordinateSpace((({context: t})=>{
                const i = e.C + e.T + e.L + e.P / 2;
                t.textAlign = "center",
                t.textBaseline = "middle",
                t.fillStyle = this.$(),
                t.font = this.Jv();
                for (const e of n)
                    if (e.weight < s) {
                        const n = e.needAlignCoordinate ? this.Vm(t, e.coord, e.label) : e.coord;
                        t.fillText(e.label, n, i)
                    }
                this.Tp.W().timeScale.allowBoldLabels && (t.font = this.Em());
                for (const e of n)
                    if (e.weight >= s) {
                        const n = e.needAlignCoordinate ? this.Vm(t, e.coord, e.label) : e.coord;
                        t.fillText(e.label, n, i)
                    }
            }
            ))
        }
        Vm(t, i, n) {
            const s = this.Pv.xi(t, n)
              , e = s / 2
              , r = Math.floor(i - e) + .5;
            return r < 0 ? i += Math.abs(0 - r) : r + s > this.Cv.width && (i -= Math.abs(this.Cv.width - (r + s))),
            i
        }
        Am(t, i) {
            const n = this.Dm();
            for (const s of t)
                for (const t of s.Qi())
                    t.gt().K(i, n)
        }
        zm() {
            return this.Tp.W().timeScale.borderColor
        }
        $() {
            return this.cn.textColor
        }
        j() {
            return this.cn.fontSize
        }
        Jv() {
            return V(this.j(), this.cn.fontFamily)
        }
        Em() {
            return V(this.j(), this.cn.fontFamily, "bold")
        }
        Dm() {
            null === this.k && (this.k = {
                C: 1,
                N: NaN,
                L: NaN,
                A: NaN,
                ji: NaN,
                T: 5,
                P: NaN,
                R: "",
                Wi: new Gt,
                Om: 0
            });
            const t = this.k
              , i = this.Jv();
            if (t.R !== i) {
                const n = this.j();
                t.P = n,
                t.R = i,
                t.L = 3 * n / 12,
                t.A = 3 * n / 12,
                t.ji = 9 * n / 12,
                t.N = 0,
                t.Om = 4 * n / 12,
                t.Wi.ir()
            }
            return this.k
        }
        cp(t) {
            this.Lv.style.cursor = 1 === t ? "ew-resize" : "default"
        }
        ym() {
            const t = this.Tp.$t()
              , i = t.W();
            i.leftPriceScale.visible || null === this.vm || (this.Mm.removeChild(this.vm.Kv()),
            this.vm.S(),
            this.vm = null),
            i.rightPriceScale.visible || null === this.pm || (this.xm.removeChild(this.pm.Kv()),
            this.pm.S(),
            this.pm = null);
            const n = {
                _d: this.Tp.$t()._d()
            }
              , s = ()=>i.leftPriceScale.borderVisible && t.St().W().borderVisible
              , e = ()=>t.md();
            i.leftPriceScale.visible && null === this.vm && (this.vm = new As("left",i,n,s,e),
            this.Mm.appendChild(this.vm.Kv())),
            i.rightPriceScale.visible && null === this.pm && (this.pm = new As("right",i,n,s,e),
            this.xm.appendChild(this.pm.Kv()))
        }
    }
    const Ns = !!es && !!navigator.userAgentData && navigator.userAgentData.brands.some((t=>t.brand.includes("Chromium"))) && !!es && ((null === (Fs = null === navigator || void 0 === navigator ? void 0 : navigator.userAgentData) || void 0 === Fs ? void 0 : Fs.platform) ? "Windows" === navigator.userAgentData.platform : navigator.userAgent.toLowerCase().indexOf("win") >= 0);
    var Fs;
    class Ws {
        constructor(t, i, n) {
            var s;
            this.Im = [],
            this.Lm = 0,
            this.ro = 0,
            this.o_ = 0,
            this.Nm = 0,
            this.Fm = 0,
            this.Wm = null,
            this.jm = !1,
            this.bp = new k,
            this.wp = new k,
            this.Pc = new k,
            this.Hm = null,
            this.$m = null,
            this.Um = t,
            this.cn = i,
            this.U_ = n,
            this.gm = document.createElement("div"),
            this.gm.classList.add("tv-lightweight-charts"),
            this.gm.style.overflow = "hidden",
            this.gm.style.direction = "ltr",
            this.gm.style.width = "100%",
            this.gm.style.height = "100%",
            (s = this.gm).style.userSelect = "none",
            s.style.webkitUserSelect = "none",
            s.style.msUserSelect = "none",
            s.style.MozUserSelect = "none",
            s.style.webkitTapHighlightColor = "transparent",
            this.qm = document.createElement("table"),
            this.qm.setAttribute("cellspacing", "0"),
            this.gm.appendChild(this.qm),
            this.Ym = this.Xm.bind(this),
            js(this.cn) && this.Km(!0),
            this.$i = new Bn(this.Dc.bind(this),this.cn,n),
            this.$t().Xc().l(this.Zm.bind(this), this),
            this.Gm = new Ls(this,this.U_),
            this.qm.appendChild(this.Gm.Kv());
            const e = i.autoSize && this.Jm();
            let r = this.cn.width
              , h = this.cn.height;
            if (e || 0 === r || 0 === h) {
                const i = t.getBoundingClientRect();
                r = r || i.width,
                h = h || i.height
            }
            this.Qm(r, h),
            this.tb(),
            t.appendChild(this.gm),
            this.ib(),
            this.$i.St().sc().l(this.$i.Kl.bind(this.$i), this),
            this.$i.w_().l(this.$i.Kl.bind(this.$i), this)
        }
        $t() {
            return this.$i
        }
        W() {
            return this.cn
        }
        nb() {
            return this.Im
        }
        sb() {
            return this.Gm
        }
        S() {
            this.Km(!1),
            0 !== this.Lm && window.cancelAnimationFrame(this.Lm),
            this.$i.Xc().p(this),
            this.$i.St().sc().p(this),
            this.$i.w_().p(this),
            this.$i.S();
            for (const t of this.Im)
                this.qm.removeChild(t.Kv()),
                t.Yp().p(this),
                t.Xp().p(this),
                t.S();
            this.Im = [],
            f(this.Gm).S(),
            null !== this.gm.parentElement && this.gm.parentElement.removeChild(this.gm),
            this.Pc.S(),
            this.bp.S(),
            this.wp.S(),
            this.eb()
        }
        Qm(t, i, n=!1) {
            if (this.ro === i && this.o_ === t)
                return;
            const s = function(t) {
                const i = Math.floor(t.width)
                  , n = Math.floor(t.height);
                return Gn({
                    width: i - i % 2,
                    height: n - n % 2
                })
            }(Gn({
                width: t,
                height: i
            }));
            this.ro = s.height,
            this.o_ = s.width;
            const e = this.ro + "px"
              , r = this.o_ + "px";
            f(this.gm).style.height = e,
            f(this.gm).style.width = r,
            this.qm.style.height = e,
            this.qm.style.width = r,
            n ? this.rb(ht.es(), performance.now()) : this.$i.Kl()
        }
        sp(t) {
            void 0 === t && (t = ht.es());
            for (let i = 0; i < this.Im.length; i++)
                this.Im[i].sp(t.Hn(i).Fn);
            this.cn.timeScale.visible && this.Gm.sp(t.jn())
        }
        Hh(t) {
            const i = js(this.cn);
            this.$i.Hh(t);
            const n = js(this.cn);
            n !== i && this.Km(n),
            this.ib(),
            this.hb(t)
        }
        Yp() {
            return this.bp
        }
        Xp() {
            return this.wp
        }
        Xc() {
            return this.Pc
        }
        lb() {
            null !== this.Wm && (this.rb(this.Wm, performance.now()),
            this.Wm = null);
            const t = this.ab(null)
              , i = document.createElement("canvas");
            i.width = t.width,
            i.height = t.height;
            const n = f(i.getContext("2d"));
            return this.ab(n),
            i
        }
        ob(t) {
            if ("left" === t && !this._b())
                return 0;
            if ("right" === t && !this.ub())
                return 0;
            if (0 === this.Im.length)
                return 0;
            return f("left" === t ? this.Im[0].sm() : this.Im[0].rm()).ip()
        }
        cb() {
            return this.cn.autoSize && null !== this.Hm
        }
        fb() {
            return this.gm
        }
        Fp(t) {
            this.$m = t,
            this.$m ? this.fb().style.setProperty("cursor", t) : this.fb().style.removeProperty("cursor")
        }
        pb() {
            return this.$m
        }
        mb() {
            return d(this.Im[0]).Gp()
        }
        hb(t) {
            (void 0 !== t.autoSize || !this.Hm || void 0 === t.width && void 0 === t.height) && (t.autoSize && !this.Hm && this.Jm(),
            !1 === t.autoSize && null !== this.Hm && this.eb(),
            t.autoSize || void 0 === t.width && void 0 === t.height || this.Qm(t.width || this.o_, t.height || this.ro))
        }
        ab(t) {
            let i = 0
              , n = 0;
            const s = this.Im[0]
              , e = (i,n)=>{
                let s = 0;
                for (let e = 0; e < this.Im.length; e++) {
                    const r = this.Im[e]
                      , h = f("left" === i ? r.sm() : r.rm())
                      , l = h._p();
                    null !== t && h.up(t, n, s),
                    s += l.height
                }
            }
            ;
            if (this._b()) {
                e("left", 0);
                i += f(s.sm())._p().width
            }
            for (let s = 0; s < this.Im.length; s++) {
                const e = this.Im[s]
                  , r = e._p();
                null !== t && e.up(t, i, n),
                n += r.height
            }
            if (i += s._p().width,
            this.ub()) {
                e("right", i);
                i += f(s.rm())._p().width
            }
            const r = (i,n,s)=>{
                f("left" === i ? this.Gm.km() : this.Gm.Cm()).up(f(t), n, s)
            }
            ;
            if (this.cn.timeScale.visible) {
                const i = this.Gm._p();
                if (null !== t) {
                    let e = 0;
                    this._b() && (r("left", e, n),
                    e = f(s.sm())._p().width),
                    this.Gm.up(t, e, n),
                    e += i.width,
                    this.ub() && r("right", e, n)
                }
                n += i.height
            }
            return Gn({
                width: i,
                height: n
            })
        }
        bb() {
            let t = 0
              , i = 0
              , n = 0;
            for (const s of this.Im)
                this._b() && (i = Math.max(i, f(s.sm()).Gv(), this.cn.leftPriceScale.minimumWidth)),
                this.ub() && (n = Math.max(n, f(s.rm()).Gv(), this.cn.rightPriceScale.minimumWidth)),
                t += s.g_();
            i = ls(i),
            n = ls(n);
            const s = this.o_
              , e = this.ro
              , r = Math.max(s - i - n, 0)
              , h = this.cn.timeScale.visible;
            let l = h ? Math.max(this.Gm.Rm(), this.cn.timeScale.minimumHeight) : 0;
            var a;
            l = (a = l) + a % 2;
            const o = 0 + l
              , _ = e < o ? 0 : e - o
              , u = _ / t;
            let c = 0;
            for (let t = 0; t < this.Im.length; ++t) {
                const s = this.Im[t];
                s.zp(this.$i.Uc()[t]);
                let e = 0
                  , h = 0;
                h = t === this.Im.length - 1 ? _ - c : Math.round(s.g_() * u),
                e = Math.max(h, 2),
                c += e,
                s.tp(Gn({
                    width: r,
                    height: e
                })),
                this._b() && s.Zp(i, "left"),
                this.ub() && s.Zp(n, "right"),
                s.np() && this.$i.Kc(s.np(), e)
            }
            this.Gm.Pm(Gn({
                width: h ? r : 0,
                height: l
            }), h ? i : 0, h ? n : 0),
            this.$i.x_(r),
            this.Nm !== i && (this.Nm = i),
            this.Fm !== n && (this.Fm = n)
        }
        Km(t) {
            t ? this.gm.addEventListener("wheel", this.Ym, {
                passive: !1
            }) : this.gm.removeEventListener("wheel", this.Ym)
        }
        wb(t) {
            switch (t.deltaMode) {
            case t.DOM_DELTA_PAGE:
                return 120;
            case t.DOM_DELTA_LINE:
                return 32
            }
            return Ns ? 1 / window.devicePixelRatio : 1
        }
        Xm(t) {
            if (!(0 !== t.deltaX && this.cn.handleScroll.mouseWheel || 0 !== t.deltaY && this.cn.handleScale.mouseWheel))
                return;
            const i = this.wb(t)
              , n = i * t.deltaX / 100
              , s = -i * t.deltaY / 100;
            if (t.cancelable && t.preventDefault(),
            0 !== s && this.cn.handleScale.mouseWheel) {
                const i = Math.sign(s) * Math.min(1, Math.abs(s))
                  , n = t.clientX - this.gm.getBoundingClientRect().left;
                this.$t().Jc(n, i)
            }
            0 !== n && this.cn.handleScroll.mouseWheel && this.$t().Qc(-80 * n)
        }
        rb(t, i) {
            var n;
            const s = t.jn();
            3 === s && this.gb(),
            3 !== s && 2 !== s || (this.Mb(t),
            this.xb(t, i),
            this.Gm.bt(),
            this.Im.forEach((t=>{
                t.Ep()
            }
            )),
            3 === (null === (n = this.Wm) || void 0 === n ? void 0 : n.jn()) && (this.Wm.ts(t),
            this.gb(),
            this.Mb(this.Wm),
            this.xb(this.Wm, i),
            t = this.Wm,
            this.Wm = null)),
            this.sp(t)
        }
        xb(t, i) {
            for (const n of t.Qn())
                this.ns(n, i)
        }
        Mb(t) {
            const i = this.$i.Uc();
            for (let n = 0; n < i.length; n++)
                t.Hn(n).Wn && i[n].L_()
        }
        ns(t, i) {
            const n = this.$i.St();
            switch (t.qn) {
            case 0:
                n.rc();
                break;
            case 1:
                n.hc(t.Ot);
                break;
            case 2:
                n.Gn(t.Ot);
                break;
            case 3:
                n.Jn(t.Ot);
                break;
            case 4:
                n.Uu();
                break;
            case 5:
                t.Ot.Ju(i) || n.Jn(t.Ot.Qu(i))
            }
        }
        Dc(t) {
            null !== this.Wm ? this.Wm.ts(t) : this.Wm = t,
            this.jm || (this.jm = !0,
            this.Lm = window.requestAnimationFrame((t=>{
                if (this.jm = !1,
                this.Lm = 0,
                null !== this.Wm) {
                    const i = this.Wm;
                    this.Wm = null,
                    this.rb(i, t);
                    for (const n of i.Qn())
                        if (5 === n.qn && !n.Ot.Ju(t)) {
                            this.$t().Xn(n.Ot);
                            break
                        }
                }
            }
            )))
        }
        gb() {
            this.tb()
        }
        tb() {
            const t = this.$i.Uc()
              , i = t.length
              , n = this.Im.length;
            for (let t = i; t < n; t++) {
                const t = d(this.Im.pop());
                this.qm.removeChild(t.Kv()),
                t.Yp().p(this),
                t.Xp().p(this),
                t.S()
            }
            for (let s = n; s < i; s++) {
                const i = new Bs(this,t[s]);
                i.Yp().l(this.Sb.bind(this), this),
                i.Xp().l(this.yb.bind(this), this),
                this.Im.push(i),
                this.qm.insertBefore(i.Kv(), this.Gm.Kv())
            }
            for (let n = 0; n < i; n++) {
                const i = t[n]
                  , s = this.Im[n];
                s.np() !== i ? s.zp(i) : s.Ap()
            }
            this.ib(),
            this.bb()
        }
        kb(t, i, n) {
            var s;
            const e = new Map;
            if (null !== t) {
                this.$i.wt().forEach((i=>{
                    const n = i.Vn().hl(t);
                    null !== n && e.set(i, n)
                }
                ))
            }
            let r;
            if (null !== t) {
                const i = null === (s = this.$i.St().Ui(t)) || void 0 === s ? void 0 : s.originalTime;
                void 0 !== i && (r = i)
            }
            const h = this.$t().Fc()
              , l = null !== h && h.jc instanceof qi ? h.jc : void 0
              , a = null !== h && void 0 !== h.Sv ? h.Sv.wr : void 0;
            return {
                Cb: r,
                se: null != t ? t : void 0,
                Tb: null != i ? i : void 0,
                Pb: l,
                Rb: e,
                Db: a,
                Ob: null != n ? n : void 0
            }
        }
        Sb(t, i, n) {
            this.bp.m((()=>this.kb(t, i, n)))
        }
        yb(t, i, n) {
            this.wp.m((()=>this.kb(t, i, n)))
        }
        Zm(t, i, n) {
            this.Pc.m((()=>this.kb(t, i, n)))
        }
        ib() {
            const t = this.cn.timeScale.visible ? "" : "none";
            this.Gm.Kv().style.display = t
        }
        _b() {
            return this.Im[0].np().P_().W().visible
        }
        ub() {
            return this.Im[0].np().R_().W().visible
        }
        Jm() {
            return "ResizeObserver"in window && (this.Hm = new ResizeObserver((t=>{
                const i = t.find((t=>t.target === this.Um));
                i && this.Qm(i.contentRect.width, i.contentRect.height)
            }
            )),
            this.Hm.observe(this.Um, {
                box: "border-box"
            }),
            !0)
        }
        eb() {
            null !== this.Hm && this.Hm.disconnect(),
            this.Hm = null
        }
    }
    function js(t) {
        return Boolean(t.handleScroll.mouseWheel || t.handleScale.mouseWheel)
    }
    function Hs(t, i) {
        var n = {};
        for (var s in t)
            Object.prototype.hasOwnProperty.call(t, s) && i.indexOf(s) < 0 && (n[s] = t[s]);
        if (null != t && "function" == typeof Object.getOwnPropertySymbols) {
            var e = 0;
            for (s = Object.getOwnPropertySymbols(t); e < s.length; e++)
                i.indexOf(s[e]) < 0 && Object.prototype.propertyIsEnumerable.call(t, s[e]) && (n[s[e]] = t[s[e]])
        }
        return n
    }
    function $s(t, i, n, s) {
        const e = n.value
          , r = {
            se: i,
            ot: t,
            Ot: [e, e, e, e],
            Cb: s
        };
        return void 0 !== n.color && (r.O = n.color),
        r
    }
    function Us(t, i, n, s) {
        const e = n.value
          , r = {
            se: i,
            ot: t,
            Ot: [e, e, e, e],
            Cb: s
        };
        return void 0 !== n.lineColor && (r.lt = n.lineColor),
        void 0 !== n.topColor && (r.Ts = n.topColor),
        void 0 !== n.bottomColor && (r.Ps = n.bottomColor),
        r
    }
    function qs(t, i, n, s) {
        const e = n.value
          , r = {
            se: i,
            ot: t,
            Ot: [e, e, e, e],
            Cb: s
        };
        return void 0 !== n.topLineColor && (r.Pe = n.topLineColor),
        void 0 !== n.bottomLineColor && (r.Re = n.bottomLineColor),
        void 0 !== n.topFillColor1 && (r.Se = n.topFillColor1),
        void 0 !== n.topFillColor2 && (r.ye = n.topFillColor2),
        void 0 !== n.bottomFillColor1 && (r.ke = n.bottomFillColor1),
        void 0 !== n.bottomFillColor2 && (r.Ce = n.bottomFillColor2),
        r
    }
    function Ys(t, i, n, s) {
        const e = {
            se: i,
            ot: t,
            Ot: [n.open, n.high, n.low, n.close],
            Cb: s
        };
        return void 0 !== n.color && (e.O = n.color),
        e
    }
    function Xs(t, i, n, s) {
        const e = {
            se: i,
            ot: t,
            Ot: [n.open, n.high, n.low, n.close],
            Cb: s
        };
        return void 0 !== n.color && (e.O = n.color),
        void 0 !== n.borderColor && (e.Bt = n.borderColor),
        void 0 !== n.wickColor && (e.Xh = n.wickColor),
        e
    }
    function Ks(t, i, n, s, e) {
        const r = d(e)(n)
          , h = Math.max(...r)
          , l = Math.min(...r)
          , a = r[r.length - 1]
          , o = [a, h, l, a]
          , _ = n
          , {time: u, color: c} = _;
        return {
            se: i,
            ot: t,
            Ot: o,
            Cb: s,
            He: Hs(_, ["time", "color"]),
            O: c
        }
    }
    function Zs(t) {
        return void 0 !== t.Ot
    }
    function Gs(t, i) {
        return void 0 !== i.customValues && (t.Bb = i.customValues),
        t
    }
    function Js(t) {
        return (i,n,s,e,r,h)=>function(t, i) {
            return i ? i(t) : void 0 === (n = t).open && void 0 === n.value;
            var n
        }(s, h) ? Gs({
            ot: i,
            se: n,
            Cb: e
        }, s) : Gs(t(i, n, s, e, r), s)
    }
    function Qs(t) {
        return {
            Candlestick: Js(Xs),
            Bar: Js(Ys),
            Area: Js(Us),
            Baseline: Js(qs),
            Histogram: Js($s),
            Line: Js($s),
            Custom: Js(Ks)
        }[t]
    }
    function te(t) {
        return {
            se: 0,
            Ab: new Map,
            ha: t
        }
    }
    function ie(t, i) {
        if (void 0 !== t && 0 !== t.length)
            return {
                zb: i.key(t[0].ot),
                Vb: i.key(t[t.length - 1].ot)
            }
    }
    function ne(t) {
        let i;
        return t.forEach((t=>{
            void 0 === i && (i = t.Cb)
        }
        )),
        d(i)
    }
    class se {
        constructor(t) {
            this.Eb = new Map,
            this.Ib = new Map,
            this.Lb = new Map,
            this.Nb = [],
            this.U_ = t
        }
        S() {
            this.Eb.clear(),
            this.Ib.clear(),
            this.Lb.clear(),
            this.Nb = []
        }
        Fb(t, i) {
            let n = 0 !== this.Eb.size
              , s = !1;
            const e = this.Ib.get(t);
            if (void 0 !== e)
                if (1 === this.Ib.size)
                    n = !1,
                    s = !0,
                    this.Eb.clear();
                else
                    for (const i of this.Nb)
                        i.pointData.Ab.delete(t) && (s = !0);
            let r = [];
            if (0 !== i.length) {
                const n = i.map((t=>t.time))
                  , e = this.U_.createConverterToInternalObj(i)
                  , h = Qs(t.Jh())
                  , l = t.ka()
                  , a = t.Ca();
                r = i.map(((i,r)=>{
                    const o = e(i.time)
                      , _ = this.U_.key(o);
                    let u = this.Eb.get(_);
                    void 0 === u && (u = te(o),
                    this.Eb.set(_, u),
                    s = !0);
                    const c = h(o, u.se, i, n[r], l, a);
                    return u.Ab.set(t, c),
                    c
                }
                ))
            }
            n && this.Wb(),
            this.jb(t, r);
            let h = -1;
            if (s) {
                const t = [];
                this.Eb.forEach((i=>{
                    t.push({
                        timeWeight: 0,
                        time: i.ha,
                        pointData: i,
                        originalTime: ne(i.Ab)
                    })
                }
                )),
                t.sort(((t,i)=>this.U_.key(t.time) - this.U_.key(i.time))),
                h = this.Hb(t)
            }
            return this.$b(t, h, function(t, i, n) {
                const s = ie(t, n)
                  , e = ie(i, n);
                if (void 0 !== s && void 0 !== e)
                    return {
                        Ql: s.Vb >= e.Vb && s.zb >= e.zb
                    }
            }(this.Ib.get(t), e, this.U_))
        }
        fd(t) {
            return this.Fb(t, [])
        }
        Ub(t, i) {
            const n = i;
            !function(t) {
                void 0 === t.Cb && (t.Cb = t.time)
            }(n),
            this.U_.preprocessData(i);
            const s = this.U_.createConverterToInternalObj([i])(i.time)
              , e = this.Lb.get(t);
            if (void 0 !== e && this.U_.key(s) < this.U_.key(e))
                throw new Error(`Cannot update oldest data, last time=${e}, new time=${s}`);
            let r = this.Eb.get(this.U_.key(s));
            const h = void 0 === r;
            void 0 === r && (r = te(s),
            this.Eb.set(this.U_.key(s), r));
            const l = Qs(t.Jh())
              , a = t.ka()
              , o = t.Ca()
              , _ = l(s, r.se, i, n.Cb, a, o);
            r.Ab.set(t, _),
            this.qb(t, _);
            const u = {
                Ql: Zs(_)
            };
            if (!h)
                return this.$b(t, -1, u);
            const c = {
                timeWeight: 0,
                time: r.ha,
                pointData: r,
                originalTime: ne(r.Ab)
            }
              , d = Pt(this.Nb, this.U_.key(c.time), ((t,i)=>this.U_.key(t.time) < i));
            this.Nb.splice(d, 0, c);
            for (let t = d; t < this.Nb.length; ++t)
                ee(this.Nb[t].pointData, t);
            return this.U_.fillWeightsForPoints(this.Nb, d),
            this.$b(t, d, u)
        }
        qb(t, i) {
            let n = this.Ib.get(t);
            void 0 === n && (n = [],
            this.Ib.set(t, n));
            const s = 0 !== n.length ? n[n.length - 1] : null;
            null === s || this.U_.key(i.ot) > this.U_.key(s.ot) ? Zs(i) && n.push(i) : Zs(i) ? n[n.length - 1] = i : n.splice(-1, 1),
            this.Lb.set(t, i.ot)
        }
        jb(t, i) {
            0 !== i.length ? (this.Ib.set(t, i.filter(Zs)),
            this.Lb.set(t, i[i.length - 1].ot)) : (this.Ib.delete(t),
            this.Lb.delete(t))
        }
        Wb() {
            for (const t of this.Nb)
                0 === t.pointData.Ab.size && this.Eb.delete(this.U_.key(t.time))
        }
        Hb(t) {
            let i = -1;
            for (let n = 0; n < this.Nb.length && n < t.length; ++n) {
                const s = this.Nb[n]
                  , e = t[n];
                if (this.U_.key(s.time) !== this.U_.key(e.time)) {
                    i = n;
                    break
                }
                e.timeWeight = s.timeWeight,
                ee(e.pointData, n)
            }
            if (-1 === i && this.Nb.length !== t.length && (i = Math.min(this.Nb.length, t.length)),
            -1 === i)
                return -1;
            for (let n = i; n < t.length; ++n)
                ee(t[n].pointData, n);
            return this.U_.fillWeightsForPoints(t, i),
            this.Nb = t,
            i
        }
        Yb() {
            if (0 === this.Ib.size)
                return null;
            let t = 0;
            return this.Ib.forEach((i=>{
                0 !== i.length && (t = Math.max(t, i[i.length - 1].se))
            }
            )),
            t
        }
        $b(t, i, n) {
            const s = {
                Xb: new Map,
                St: {
                    Iu: this.Yb()
                }
            };
            if (-1 !== i)
                this.Ib.forEach(((i,e)=>{
                    s.Xb.set(e, {
                        He: i,
                        Kb: e === t ? n : void 0
                    })
                }
                )),
                this.Ib.has(t) || s.Xb.set(t, {
                    He: [],
                    Kb: n
                }),
                s.St.Zb = this.Nb,
                s.St.Gb = i;
            else {
                const i = this.Ib.get(t);
                s.Xb.set(t, {
                    He: i || [],
                    Kb: n
                })
            }
            return s
        }
    }
    function ee(t, i) {
        t.se = i,
        t.Ab.forEach((t=>{
            t.se = i
        }
        ))
    }
    function re(t) {
        const i = {
            value: t.Ot[3],
            time: t.Cb
        };
        return void 0 !== t.Bb && (i.customValues = t.Bb),
        i
    }
    function he(t) {
        const i = re(t);
        return void 0 !== t.O && (i.color = t.O),
        i
    }
    function le(t) {
        const i = re(t);
        return void 0 !== t.lt && (i.lineColor = t.lt),
        void 0 !== t.Ts && (i.topColor = t.Ts),
        void 0 !== t.Ps && (i.bottomColor = t.Ps),
        i
    }
    function ae(t) {
        const i = re(t);
        return void 0 !== t.Pe && (i.topLineColor = t.Pe),
        void 0 !== t.Re && (i.bottomLineColor = t.Re),
        void 0 !== t.Se && (i.topFillColor1 = t.Se),
        void 0 !== t.ye && (i.topFillColor2 = t.ye),
        void 0 !== t.ke && (i.bottomFillColor1 = t.ke),
        void 0 !== t.Ce && (i.bottomFillColor2 = t.Ce),
        i
    }
    function oe(t) {
        const i = {
            open: t.Ot[0],
            high: t.Ot[1],
            low: t.Ot[2],
            close: t.Ot[3],
            time: t.Cb
        };
        return void 0 !== t.Bb && (i.customValues = t.Bb),
        i
    }
    function _e(t) {
        const i = oe(t);
        return void 0 !== t.O && (i.color = t.O),
        i
    }
    function ue(t) {
        const i = oe(t)
          , {O: n, Bt: s, Xh: e} = t;
        return void 0 !== n && (i.color = n),
        void 0 !== s && (i.borderColor = s),
        void 0 !== e && (i.wickColor = e),
        i
    }
    function ce(t) {
        return {
            Area: le,
            Line: he,
            Baseline: ae,
            Histogram: he,
            Bar: _e,
            Candlestick: ue,
            Custom: de
        }[t]
    }
    function de(t) {
        const i = t.Cb;
        return Object.assign(Object.assign({}, t.He), {
            time: i
        })
    }
    const fe = {
        vertLine: {
            color: "#9598A1",
            width: 1,
            style: 3,
            visible: !0,
            labelVisible: !0,
            labelBackgroundColor: "#131722"
        },
        horzLine: {
            color: "#9598A1",
            width: 1,
            style: 3,
            visible: !0,
            labelVisible: !0,
            labelBackgroundColor: "#131722"
        },
        mode: 1
    }
      , ve = {
        vertLines: {
            color: "#D6DCDE",
            style: 0,
            visible: !0
        },
        horzLines: {
            color: "#D6DCDE",
            style: 0,
            visible: !0
        }
    }
      , pe = {
        background: {
            type: "solid",
            color: "#FFFFFF"
        },
        textColor: "#191919",
        fontSize: 12,
        fontFamily: z
    }
      , me = {
        autoScale: !0,
        mode: 0,
        invertScale: !1,
        alignLabels: !0,
        borderVisible: !0,
        borderColor: "#2B2B43",
        entireTextOnly: !1,
        visible: !1,
        ticksVisible: !1,
        scaleMargins: {
            bottom: .1,
            top: .2
        },
        minimumWidth: 0
    }
      , be = {
        rightOffset: 0,
        barSpacing: 6,
        minBarSpacing: .5,
        fixLeftEdge: !1,
        fixRightEdge: !1,
        lockVisibleTimeRangeOnResize: !1,
        rightBarStaysOnScroll: !1,
        borderVisible: !0,
        borderColor: "#2B2B43",
        visible: !0,
        timeVisible: !1,
        secondsVisible: !0,
        shiftVisibleRangeOnNewBar: !0,
        allowShiftVisibleRangeOnWhitespaceReplacement: !1,
        ticksVisible: !1,
        uniformDistribution: !1,
        minimumHeight: 0,
        allowBoldLabels: !0
    }
      , we = {
        color: "rgba(0, 0, 0, 0)",
        visible: !1,
        fontSize: 48,
        fontFamily: z,
        fontStyle: "",
        text: "",
        horzAlign: "center",
        vertAlign: "center"
    };
    function ge() {
        return {
            width: 0,
            height: 0,
            autoSize: !1,
            layout: pe,
            crosshair: fe,
            grid: ve,
            overlayPriceScales: Object.assign({}, me),
            leftPriceScale: Object.assign(Object.assign({}, me), {
                visible: !1
            }),
            rightPriceScale: Object.assign(Object.assign({}, me), {
                visible: !0
            }),
            timeScale: be,
            watermark: we,
            localization: {
                locale: es ? navigator.language : "",
                dateFormat: "dd MMM 'yy"
            },
            handleScroll: {
                mouseWheel: !0,
                pressedMouseMove: !0,
                horzTouchDrag: !0,
                vertTouchDrag: !0
            },
            handleScale: {
                axisPressedMouseMove: {
                    time: !0,
                    price: !0
                },
                axisDoubleClickReset: {
                    time: !0,
                    price: !0
                },
                mouseWheel: !0,
                pinch: !0
            },
            kineticScroll: {
                mouse: !1,
                touch: !0
            },
            trackingMode: {
                exitMode: 1
            }
        }
    }
    class Me {
        constructor(t, i) {
            this.Jb = t,
            this.Qb = i
        }
        applyOptions(t) {
            this.Jb.$t().Hc(this.Qb, t)
        }
        options() {
            return this.Ii().W()
        }
        width() {
            return rt(this.Qb) ? this.Jb.ob(this.Qb) : 0
        }
        Ii() {
            return f(this.Jb.$t().$c(this.Qb)).Dt
        }
    }
    function xe(t, i, n) {
        const s = Hs(t, ["time", "originalTime"])
          , e = Object.assign({
            time: i
        }, s);
        return void 0 !== n && (e.originalTime = n),
        e
    }
    const Se = {
        color: "#FF0000",
        price: 0,
        lineStyle: 2,
        lineWidth: 1,
        lineVisible: !0,
        axisLabelVisible: !0,
        title: "",
        axisLabelColor: "",
        axisLabelTextColor: ""
    };
    class ye {
        constructor(t) {
            this.Lh = t
        }
        applyOptions(t) {
            this.Lh.Hh(t)
        }
        options() {
            return this.Lh.W()
        }
        tw() {
            return this.Lh
        }
    }
    class ke {
        constructor(t, i, n, s, e) {
            this.iw = new k,
            this.Is = t,
            this.nw = i,
            this.sw = n,
            this.U_ = e,
            this.ew = s
        }
        S() {
            this.iw.S()
        }
        priceFormatter() {
            return this.Is.ma()
        }
        priceToCoordinate(t) {
            const i = this.Is.Ct();
            return null === i ? null : this.Is.Dt().Rt(t, i.Ot)
        }
        coordinateToPrice(t) {
            const i = this.Is.Ct();
            return null === i ? null : this.Is.Dt().pn(t, i.Ot)
        }
        barsInLogicalRange(t) {
            if (null === t)
                return null;
            const i = new gn(new mn(t.from,t.to)).hu()
              , n = this.Is.Vn();
            if (n.Ni())
                return null;
            const s = n.hl(i.Os(), 1)
              , e = n.hl(i.ui(), -1)
              , r = f(n.sl())
              , h = f(n.zn());
            if (null !== s && null !== e && s.se > e.se)
                return {
                    barsBefore: t.from - r,
                    barsAfter: h - t.to
                };
            const l = {
                barsBefore: null === s || s.se === r ? t.from - r : s.se - r,
                barsAfter: null === e || e.se === h ? h - t.to : h - e.se
            };
            return null !== s && null !== e && (l.from = s.Cb,
            l.to = e.Cb),
            l
        }
        setData(t) {
            this.U_,
            this.Is.Jh(),
            this.nw.rw(this.Is, t),
            this.hw("full")
        }
        update(t) {
            this.Is.Jh(),
            this.nw.lw(this.Is, t),
            this.hw("update")
        }
        dataByIndex(t, i) {
            const n = this.Is.Vn().hl(t, i);
            if (null === n)
                return null;
            return ce(this.seriesType())(n)
        }
        data() {
            const t = ce(this.seriesType());
            return this.Is.Vn().ie().map((i=>t(i)))
        }
        subscribeDataChanged(t) {
            this.iw.l(t)
        }
        unsubscribeDataChanged(t) {
            this.iw.v(t)
        }
        setMarkers(MarkerData) {
            this.U_;
            const MarkerTimeData = MarkerData.map((t=>xe(t, this.U_.convertHorzItemToInternal(t.time), t.time)));
            this.Is.setMarkerData(MarkerTimeData)
        }
        markers() {
            return this.Is.na().map((t=>xe(t, t.originalTime, void 0)))
        }
        applyOptions(t) {
            this.Is.Hh(t)
        }
        options() {
            return O(this.Is.W())
        }
        priceScale() {
            return this.sw.priceScale(this.Is.Dt().Ta())
        }
        createPriceLine(t) {
            const i = C(O(Se), t)
              , n = this.Is.sa(i);
            return new ye(n)
        }
        removePriceLine(t) {
            this.Is.ea(t.tw())
        }
        seriesType() {
            return this.Is.Jh()
        }
        attachPrimitive(t) {
            this.Is.Sa(t),
            t.attached && t.attached({
                chart: this.ew,
                series: this,
                requestUpdate: ()=>this.Is.$t().Kl()
            })
        }
        detachPrimitive(t) {
            this.Is.ya(t),
            t.detached && t.detached()
        }
        hw(t) {
            this.iw.M() && this.iw.m(t)
        }
    }
    class Ce {
        constructor(t, i, n) {
            this.aw = new k,
            this.pu = new k,
            this.wm = new k,
            this.$i = t,
            this.yl = t.St(),
            this.Gm = i,
            this.yl.tc().l(this.ow.bind(this)),
            this.yl.nc().l(this._w.bind(this)),
            this.Gm.Tm().l(this.uw.bind(this)),
            this.U_ = n
        }
        S() {
            this.yl.tc().p(this),
            this.yl.nc().p(this),
            this.Gm.Tm().p(this),
            this.aw.S(),
            this.pu.S(),
            this.wm.S()
        }
        scrollPosition() {
            return this.yl.ju()
        }
        scrollToPosition(t, i) {
            i ? this.yl.Gu(t, 1e3) : this.$i.Jn(t)
        }
        scrollToRealTime() {
            this.yl.Zu()
        }
        getVisibleRange() {
            const t = this.yl.Du();
            return null === t ? null : {
                from: t.from.originalTime,
                to: t.to.originalTime
            }
        }
        setVisibleRange(t) {
            const i = {
                from: this.U_.convertHorzItemToInternal(t.from),
                to: this.U_.convertHorzItemToInternal(t.to)
            }
              , n = this.yl.zu(i);
            this.$i.vd(n)
        }
        getVisibleLogicalRange() {
            const t = this.yl.Ru();
            return null === t ? null : {
                from: t.Os(),
                to: t.ui()
            }
        }
        setVisibleLogicalRange(t) {
            c(t.from <= t.to, "The from index cannot be after the to index."),
            this.$i.vd(t)
        }
        resetTimeScale() {
            this.$i.Zn()
        }
        fitContent() {
            this.$i.rc()
        }
        logicalToCoordinate(t) {
            const i = this.$i.St();
            return i.Ni() ? null : i.Vt(t)
        }
        coordinateToLogical(t) {
            return this.yl.Ni() ? null : this.yl.Lu(t)
        }
        timeToCoordinate(t) {
            const i = this.U_.convertHorzItemToInternal(t)
              , n = this.yl.Da(i, !1);
            return null === n ? null : this.yl.Vt(n)
        }
        coordinateToTime(t) {
            const i = this.$i.St()
              , n = i.Lu(t)
              , s = i.Ui(n);
            return null === s ? null : s.originalTime
        }
        width() {
            return this.Gm.Gp().width
        }
        height() {
            return this.Gm.Gp().height
        }
        subscribeVisibleTimeRangeChange(t) {
            this.aw.l(t)
        }
        unsubscribeVisibleTimeRangeChange(t) {
            this.aw.v(t)
        }
        subscribeVisibleLogicalRangeChange(t) {
            this.pu.l(t)
        }
        unsubscribeVisibleLogicalRangeChange(t) {
            this.pu.v(t)
        }
        subscribeSizeChange(t) {
            this.wm.l(t)
        }
        unsubscribeSizeChange(t) {
            this.wm.v(t)
        }
        applyOptions(t) {
            this.yl.Hh(t)
        }
        options() {
            return Object.assign(Object.assign({}, O(this.yl.W())), {
                barSpacing: this.yl.he()
            })
        }
        ow() {
            this.aw.M() && this.aw.m(this.getVisibleRange())
        }
        _w() {
            this.pu.M() && this.pu.m(this.getVisibleLogicalRange())
        }
        uw(t) {
            this.wm.m(t.width, t.height)
        }
    }
    function Te(t) {
        if (void 0 === t || "custom" === t.type)
            return;
        const i = t;
        void 0 !== i.minMove && void 0 === i.precision && (i.precision = function(t) {
            if (t >= 1)
                return 0;
            let i = 0;
            for (; i < 8; i++) {
                const n = Math.round(t);
                if (Math.abs(n - t) < 1e-8)
                    return i;
                t *= 10
            }
            return i
        }(i.minMove))
    }
    function Pe(t) {
        return function(t) {
            if (D(t.handleScale)) {
                const i = t.handleScale;
                t.handleScale = {
                    axisDoubleClickReset: {
                        time: i,
                        price: i
                    },
                    axisPressedMouseMove: {
                        time: i,
                        price: i
                    },
                    mouseWheel: i,
                    pinch: i
                }
            } else if (void 0 !== t.handleScale) {
                const {axisPressedMouseMove: i, axisDoubleClickReset: n} = t.handleScale;
                D(i) && (t.handleScale.axisPressedMouseMove = {
                    time: i,
                    price: i
                }),
                D(n) && (t.handleScale.axisDoubleClickReset = {
                    time: n,
                    price: n
                })
            }
            const i = t.handleScroll;
            D(i) && (t.handleScroll = {
                horzTouchDrag: i,
                vertTouchDrag: i,
                mouseWheel: i,
                pressedMouseMove: i
            })
        }(t),
        t
    }
    class Re {
        constructor(t, i, n) {
            this.cw = new Map,
            this.dw = new Map,
            this.fw = new k,
            this.pw = new k,
            this.mw = new k,
            this.bw = new se(i);
            const s = void 0 === n ? O(ge()) : C(O(ge()), Pe(n));
            this.U_ = i,
            this.Jb = new Ws(t,s,i),
            this.Jb.Yp().l((t=>{
                this.fw.M() && this.fw.m(this.ww(t()))
            }
            ), this),
            this.Jb.Xp().l((t=>{
                this.pw.M() && this.pw.m(this.ww(t()))
            }
            ), this),
            this.Jb.Xc().l((t=>{
                this.mw.M() && this.mw.m(this.ww(t()))
            }
            ), this);
            const e = this.Jb.$t();
            this.gw = new Ce(e,this.Jb.sb(),this.U_)
        }
        remove() {
            this.Jb.Yp().p(this),
            this.Jb.Xp().p(this),
            this.Jb.Xc().p(this),
            this.gw.S(),
            this.Jb.S(),
            this.cw.clear(),
            this.dw.clear(),
            this.fw.S(),
            this.pw.S(),
            this.mw.S(),
            this.bw.S()
        }
        resize(t, i, n) {
            this.autoSizeActive() || this.Jb.Qm(t, i, n)
        }
        addCustomSeries(t, i) {
            const n = v(t)
              , s = Object.assign(Object.assign({}, h), n.defaultOptions());
            return this.Mw("Custom", s, i, n)
        }
        addAreaSeries(t) {
            return this.Mw("Area", s, t)
        }
        addBaselineSeries(t) {
            return this.Mw("Baseline", e, t)
        }
        addBarSeries(t) {
            return this.Mw("Bar", i, t)
        }
        addCandlestickSeries(i={}) {
            return function(t) {
                void 0 !== t.borderColor && (t.borderUpColor = t.borderColor,
                t.borderDownColor = t.borderColor),
                void 0 !== t.wickColor && (t.wickUpColor = t.wickColor,
                t.wickDownColor = t.wickColor)
            }(i),
            this.Mw("Candlestick", t, i)
        }
        addHistogramSeries(t) {
            return this.Mw("Histogram", r, t)
        }
        addLineSeries(t) {
            return this.Mw("Line", n, t)
        }
        removeSeries(t) {
            const i = d(this.cw.get(t))
              , n = this.bw.fd(i);
            this.Jb.$t().fd(i),
            this.xw(n),
            this.cw.delete(t),
            this.dw.delete(i)
        }
        rw(t, i) {
            this.xw(this.bw.Fb(t, i))
        }
        lw(t, i) {
            this.xw(this.bw.Ub(t, i))
        }
        subscribeClick(t) {
            this.fw.l(t)
        }
        unsubscribeClick(t) {
            this.fw.v(t)
        }
        subscribeCrosshairMove(t) {
            this.mw.l(t)
        }
        unsubscribeCrosshairMove(t) {
            this.mw.v(t)
        }
        subscribeDblClick(t) {
            this.pw.l(t)
        }
        unsubscribeDblClick(t) {
            this.pw.v(t)
        }
        priceScale(t) {
            return new Me(this.Jb,t)
        }
        timeScale() {
            return this.gw
        }
        applyOptions(t) {
            this.Jb.Hh(Pe(t))
        }
        options() {
            return this.Jb.W()
        }
        takeScreenshot() {
            return this.Jb.lb()
        }
        autoSizeActive() {
            return this.Jb.cb()
        }
        chartElement() {
            return this.Jb.fb()
        }
        paneSize() {
            const t = this.Jb.mb();
            return {
                height: t.height,
                width: t.width
            }
        }
        setCrosshairPosition(t, i, n) {
            const s = this.cw.get(n);
            if (void 0 === s)
                return;
            const e = this.Jb.$t().cr(s);
            null !== e && this.Jb.$t().ld(t, i, e)
        }
        clearCrosshairPosition() {
            this.Jb.$t().ad(!0)
        }
        Mw(t, i, n={}, s) {
            Te(n.priceFormat);
            const e = C(O(l), O(i), n)
              , r = this.Jb.$t().ud(t, e, s)
              , h = new ke(r,this,this,this,this.U_);
            return this.cw.set(h, r),
            this.dw.set(r, h),
            h
        }
        xw(t) {
            const i = this.Jb.$t();
            i.od(t.St.Iu, t.St.Zb, t.St.Gb),
            t.Xb.forEach(((t,i)=>i.J(t.He, t.Kb))),
            i.Fu()
        }
        Sw(t) {
            return d(this.dw.get(t))
        }
        ww(t) {
            const i = new Map;
            t.Rb.forEach(((t,n)=>{
                const s = n.Jh()
                  , e = ce(s)(t);
                if ("Custom" !== s)
                    c(function(t) {
                        return void 0 !== t.open || void 0 !== t.value
                    }(e));
                else {
                    const t = n.Ca();
                    c(!t || !1 === t(e))
                }
                i.set(this.Sw(n), e)
            }
            ));
            const n = void 0 !== t.Pb && this.dw.has(t.Pb) ? this.Sw(t.Pb) : void 0;
            return {
                time: t.Cb,
                logical: t.se,
                point: t.Tb,
                hoveredSeries: n,
                hoveredObjectId: t.Db,
                seriesData: i,
                sourceEvent: t.Ob
            }
        }
    }
    function De(t, i, n) {
        let s;
        if (R(t)) {
            const i = document.getElementById(t);
            c(null !== i, `Cannot find element in DOM with id=${t}`),
            s = i
        } else
            s = t;
        const e = new Re(s,i,n);
        return i.setOptions(e.options()),
        e
    }
    const Oe = Object.assign(Object.assign({}, l), h);
    var Be = Object.freeze({
        __proto__: null,
        get ColorType() {
            return Dn
        },
        get CrosshairMode() {
            return st
        },
        get LastPriceAnimationMode() {
            return Pn
        },
        get LineStyle() {
            return o
        },
        get LineType() {
            return a
        },
        get MismatchDirection() {
            return Bi
        },
        get PriceLineSource() {
            return Rn
        },
        get PriceScaleMode() {
            return un
        },
        get TickMarkType() {
            return On
        },
        get TrackingModeExitMode() {
            return Tn
        },
        createChart: function(t, i) { //t:element,i:options
            // debugger ;
            return De(t, new Zn, Zn.zd(i))
        },
        createChartEx: De,
        customSeriesDefaultOptions: Oe,
        defaultHorzScaleBehavior: function() {
            return Zn
        },
        isBusinessDay: An,
        isUTCTimestamp: zn,
        version: function() {
            return "4.1.7"
        }
    });
    window.LightweightCharts = Be
}();
