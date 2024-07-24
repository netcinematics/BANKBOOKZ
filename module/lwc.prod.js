(function() {
    const t = document.createElement("link").relList;
    if (t && t.supports && t.supports("modulepreload"))
        return;
    for (const e of document.querySelectorAll('link[rel="modulepreload"]'))
        s(e);
    new MutationObserver(e=>{
        for (const n of e)
            if (n.type === "childList")
                for (const r of n.addedNodes)
                    r.tagName === "LINK" && r.rel === "modulepreload" && s(r)
    }
    ).observe(document, {
        childList: !0,
        subtree: !0
    });
    function i(e) {
        const n = {};
        return e.integrity && (n.integrity = e.integrity),
        e.referrerPolicy && (n.referrerPolicy = e.referrerPolicy),
        e.crossOrigin === "use-credentials" ? n.credentials = "include" : e.crossOrigin === "anonymous" ? n.credentials = "omit" : n.credentials = "same-origin",
        n
    }
    function s(e) {
        if (e.ep)
            return;
        e.ep = !0;
        const n = i(e);
        fetch(e.href, n)
    }
}
)();
function M(h) {
    var t = h.width
      , i = h.height;
    if (t < 0)
        throw new Error("Negative width is not allowed for Size");
    if (i < 0)
        throw new Error("Negative height is not allowed for Size");
    return {
        width: t,
        height: i
    }
}
function A(h, t) {
    return h.width === t.width && h.height === t.height
}
var Js = function() {
    function h(t) {
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
    return h.prototype.dispose = function() {
        this._uninstallResolutionListener(),
        this._window = null
    }
    ,
    Object.defineProperty(h.prototype, "value", {
        get: function() {
            return this._window.devicePixelRatio
        },
        enumerable: !1,
        configurable: !0
    }),
    h.prototype.subscribe = function(t) {
        var i = this
          , s = {
            next: t
        };
        return this._observers.push(s),
        {
            unsubscribe: function() {
                i._observers = i._observers.filter(function(e) {
                    return e !== s
                })
            }
        }
    }
    ,
    h.prototype._installResolutionListener = function() {
        if (this._resolutionMediaQueryList !== null)
            throw new Error("Resolution listener is already installed");
        var t = this._window.devicePixelRatio;
        this._resolutionMediaQueryList = this._window.matchMedia("all and (resolution: ".concat(t, "dppx)")),
        this._resolutionMediaQueryList.addListener(this._resolutionListener)
    }
    ,
    h.prototype._uninstallResolutionListener = function() {
        this._resolutionMediaQueryList !== null && (this._resolutionMediaQueryList.removeListener(this._resolutionListener),
        this._resolutionMediaQueryList = null)
    }
    ,
    h.prototype._reinstallResolutionListener = function() {
        this._uninstallResolutionListener(),
        this._installResolutionListener()
    }
    ,
    h.prototype._onResolutionChanged = function() {
        var t = this;
        this._observers.forEach(function(i) {
            return i.next(t._window.devicePixelRatio)
        }),
        this._reinstallResolutionListener()
    }
    ,
    h
}();
function Ks(h) {
    return new Js(h)
}
var Zs = function() {
    function h(t, i, s) {
        var e;
        this._canvasElement = null,
        this._bitmapSizeChangedListeners = [],
        this._suggestedBitmapSize = null,
        this._suggestedBitmapSizeChangedListeners = [],
        this._devicePixelRatioObservable = null,
        this._canvasElementResizeObserver = null,
        this._canvasElement = t,
        this._canvasElementClientSize = M({
            width: this._canvasElement.clientWidth,
            height: this._canvasElement.clientHeight
        }),
        this._transformBitmapSize = i ?? function(n) {
            return n
        }
        ,
        this._allowResizeObserver = (e = s == null ? void 0 : s.allowResizeObserver) !== null && e !== void 0 ? e : !0,
        this._chooseAndInitObserver()
    }
    return h.prototype.dispose = function() {
        var t, i;
        if (this._canvasElement === null)
            throw new Error("Object is disposed");
        (t = this._canvasElementResizeObserver) === null || t === void 0 || t.disconnect(),
        this._canvasElementResizeObserver = null,
        (i = this._devicePixelRatioObservable) === null || i === void 0 || i.dispose(),
        this._devicePixelRatioObservable = null,
        this._suggestedBitmapSizeChangedListeners.length = 0,
        this._bitmapSizeChangedListeners.length = 0,
        this._canvasElement = null
    }
    ,
    Object.defineProperty(h.prototype, "canvasElement", {
        get: function() {
            if (this._canvasElement === null)
                throw new Error("Object is disposed");
            return this._canvasElement
        },
        enumerable: !1,
        configurable: !0
    }),
    Object.defineProperty(h.prototype, "canvasElementClientSize", {
        get: function() {
            return this._canvasElementClientSize
        },
        enumerable: !1,
        configurable: !0
    }),
    Object.defineProperty(h.prototype, "bitmapSize", {
        get: function() {
            return M({
                width: this.canvasElement.width,
                height: this.canvasElement.height
            })
        },
        enumerable: !1,
        configurable: !0
    }),
    h.prototype.resizeCanvasElement = function(t) {
        this._canvasElementClientSize = M(t),
        this.canvasElement.style.width = "".concat(this._canvasElementClientSize.width, "px"),
        this.canvasElement.style.height = "".concat(this._canvasElementClientSize.height, "px"),
        this._invalidateBitmapSize()
    }
    ,
    h.prototype.subscribeBitmapSizeChanged = function(t) {
        this._bitmapSizeChangedListeners.push(t)
    }
    ,
    h.prototype.unsubscribeBitmapSizeChanged = function(t) {
        this._bitmapSizeChangedListeners = this._bitmapSizeChangedListeners.filter(function(i) {
            return i !== t
        })
    }
    ,
    Object.defineProperty(h.prototype, "suggestedBitmapSize", {
        get: function() {
            return this._suggestedBitmapSize
        },
        enumerable: !1,
        configurable: !0
    }),
    h.prototype.subscribeSuggestedBitmapSizeChanged = function(t) {
        this._suggestedBitmapSizeChangedListeners.push(t)
    }
    ,
    h.prototype.unsubscribeSuggestedBitmapSizeChanged = function(t) {
        this._suggestedBitmapSizeChangedListeners = this._suggestedBitmapSizeChangedListeners.filter(function(i) {
            return i !== t
        })
    }
    ,
    h.prototype.applySuggestedBitmapSize = function() {
        if (this._suggestedBitmapSize !== null) {
            var t = this._suggestedBitmapSize;
            this._suggestedBitmapSize = null,
            this._resizeBitmap(t),
            this._emitSuggestedBitmapSizeChanged(t, this._suggestedBitmapSize)
        }
    }
    ,
    h.prototype._resizeBitmap = function(t) {
        var i = this.bitmapSize;
        A(i, t) || (this.canvasElement.width = t.width,
        this.canvasElement.height = t.height,
        this._emitBitmapSizeChanged(i, t))
    }
    ,
    h.prototype._emitBitmapSizeChanged = function(t, i) {
        var s = this;
        this._bitmapSizeChangedListeners.forEach(function(e) {
            return e.call(s, t, i)
        })
    }
    ,
    h.prototype._suggestNewBitmapSize = function(t) {
        var i = this._suggestedBitmapSize
          , s = M(this._transformBitmapSize(t, this._canvasElementClientSize))
          , e = A(this.bitmapSize, s) ? null : s;
        i === null && e === null || i !== null && e !== null && A(i, e) || (this._suggestedBitmapSize = e,
        this._emitSuggestedBitmapSizeChanged(i, e))
    }
    ,
    h.prototype._emitSuggestedBitmapSizeChanged = function(t, i) {
        var s = this;
        this._suggestedBitmapSizeChangedListeners.forEach(function(e) {
            return e.call(s, t, i)
        })
    }
    ,
    h.prototype._chooseAndInitObserver = function() {
        var t = this;
        if (!this._allowResizeObserver) {
            this._initDevicePixelRatioObservable();
            return
        }
        Gs().then(function(i) {
            return i ? t._initResizeObserver() : t._initDevicePixelRatioObservable()
        })
    }
    ,
    h.prototype._initDevicePixelRatioObservable = function() {
        var t = this;
        if (this._canvasElement !== null) {
            var i = Ci(this._canvasElement);
            if (i === null)
                throw new Error("No window is associated with the canvas");
            this._devicePixelRatioObservable = Ks(i),
            this._devicePixelRatioObservable.subscribe(function() {
                return t._invalidateBitmapSize()
            }),
            this._invalidateBitmapSize()
        }
    }
    ,
    h.prototype._invalidateBitmapSize = function() {
        var t, i;
        if (this._canvasElement !== null) {
            var s = Ci(this._canvasElement);
            if (s !== null) {
                var e = (i = (t = this._devicePixelRatioObservable) === null || t === void 0 ? void 0 : t.value) !== null && i !== void 0 ? i : s.devicePixelRatio
                  , n = this._canvasElement.getClientRects()
                  , r = n[0] !== void 0 ? Xs(n[0], e) : M({
                    width: this._canvasElementClientSize.width * e,
                    height: this._canvasElementClientSize.height * e
                });
                this._suggestNewBitmapSize(r)
            }
        }
    }
    ,
    h.prototype._initResizeObserver = function() {
        var t = this;
        this._canvasElement !== null && (this._canvasElementResizeObserver = new ResizeObserver(function(i) {
            var s = i.find(function(r) {
                return r.target === t._canvasElement
            });
            if (!(!s || !s.devicePixelContentBoxSize || !s.devicePixelContentBoxSize[0])) {
                var e = s.devicePixelContentBoxSize[0]
                  , n = M({
                    width: e.inlineSize,
                    height: e.blockSize
                });
                t._suggestNewBitmapSize(n)
            }
        }
        ),
        this._canvasElementResizeObserver.observe(this._canvasElement, {
            box: "device-pixel-content-box"
        }))
    }
    ,
    h
}();
function Hs(h, t) {
    if (t.type === "device-pixel-content-box")
        return new Zs(h,t.transform,t.options);
    throw new Error("Unsupported binding target")
}
function Ci(h) {
    return h.ownerDocument.defaultView
}
function Gs() {
    return new Promise(function(h) {
        var t = new ResizeObserver(function(i) {
            h(i.every(function(s) {
                return "devicePixelContentBoxSize"in s
            })),
            t.disconnect()
        }
        );
        t.observe(document.body, {
            box: "device-pixel-content-box"
        })
    }
    ).catch(function() {
        return !1
    })
}
function Xs(h, t) {
    return M({
        width: Math.round(h.left * t + h.width * t) - Math.round(h.left * t),
        height: Math.round(h.top * t + h.height * t) - Math.round(h.top * t)
    })
}
var Ys = function() {
    function h(t, i, s) {
        if (i.width === 0 || i.height === 0)
            throw new TypeError("Rendering target could only be created on a media with positive width and height");
        if (this._mediaSize = i,
        s.width === 0 || s.height === 0)
            throw new TypeError("Rendering target could only be created using a bitmap with positive integer width and height");
        this._bitmapSize = s,
        this._context = t
    }
    return h.prototype.useMediaCoordinateSpace = function(t) {
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
    h.prototype.useBitmapCoordinateSpace = function(t) {
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
    Object.defineProperty(h.prototype, "_horizontalPixelRatio", {
        get: function() {
            return this._bitmapSize.width / this._mediaSize.width
        },
        enumerable: !1,
        configurable: !0
    }),
    Object.defineProperty(h.prototype, "_verticalPixelRatio", {
        get: function() {
            return this._bitmapSize.height / this._mediaSize.height
        },
        enumerable: !1,
        configurable: !0
    }),
    h
}();
function j(h, t) {
    var i = h.canvasElementClientSize;
    if (i.width === 0 || i.height === 0)
        return null;
    var s = h.bitmapSize;
    if (s.width === 0 || s.height === 0)
        return null;
    var e = h.canvasElement.getContext("2d", t);
    return e === null ? null : new Ys(e,i,s)
}
/*!
 * @license
 * TradingView Lightweight Charts™ v4.1.8-dev+202407151430
 * Copyright (c) 2024 TradingView, Inc.
 * Licensed under Apache License 2.0 https://www.apache.org/licenses/LICENSE-2.0
 */
const Qs = {
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
  , qs = {
    upColor: "#26a69a",
    downColor: "#ef5350",
    openVisible: !0,
    thinBars: !0
}
  , te = {
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
  , ie = {
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
  , se = {
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
  , ee = {
    color: "#26a69a",
    base: 0
}
  , ws = {
    color: "#2196f3"
}
  , Ss = {
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
var zi, xi;
function U(h, t) {
    const i = {
        0: [],
        1: [h.lineWidth, h.lineWidth],
        2: [2 * h.lineWidth, 2 * h.lineWidth],
        3: [6 * h.lineWidth, 6 * h.lineWidth],
        4: [h.lineWidth, 4 * h.lineWidth]
    }[t];
    h.setLineDash(i)
}
function Ms(h, t, i, s) {
    h.beginPath();
    const e = h.lineWidth % 2 ? .5 : 0;
    h.moveTo(i, t + e),
    h.lineTo(s, t + e),
    h.stroke()
}
function I(h, t) {
    if (!h)
        throw new Error("Assertion failed" + (t ? ": " + t : ""))
}
function O(h) {
    if (h === void 0)
        throw new Error("Value is undefined");
    return h
}
function v(h) {
    if (h === null)
        throw new Error("Value is null");
    return h
}
function G(h) {
    return v(O(h))
}
(function(h) {
    h[h.Simple = 0] = "Simple",
    h[h.WithSteps = 1] = "WithSteps",
    h[h.Curved = 2] = "Curved"
}
)(zi || (zi = {})),
function(h) {
    h[h.Solid = 0] = "Solid",
    h[h.Dotted = 1] = "Dotted",
    h[h.Dashed = 2] = "Dashed",
    h[h.LargeDashed = 3] = "LargeDashed",
    h[h.SparseDotted = 4] = "SparseDotted"
}(xi || (xi = {}));
const Li = {
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
function T(h) {
    return h < 0 ? 0 : h > 255 ? 255 : Math.round(h) || 0
}
function _s(h) {
    return h <= 0 || h > 1 ? Math.min(Math.max(h, 0), 1) : Math.round(1e4 * h) / 1e4
}
const he = /^#([0-9a-f])([0-9a-f])([0-9a-f])([0-9a-f])?$/i
  , ne = /^#([0-9a-f]{2})([0-9a-f]{2})([0-9a-f]{2})([0-9a-f]{2})?$/i
  , re = /^rgb\(\s*(-?\d{1,10})\s*,\s*(-?\d{1,10})\s*,\s*(-?\d{1,10})\s*\)$/
  , oe = /^rgba\(\s*(-?\d{1,10})\s*,\s*(-?\d{1,10})\s*,\s*(-?\d{1,10})\s*,\s*(-?\d*\.?\d+)\s*\)$/;
function Ct(h) {
    (h = h.toLowerCase())in Li && (h = Li[h]);
    {
        const t = oe.exec(h) || re.exec(h);
        if (t)
            return [T(parseInt(t[1], 10)), T(parseInt(t[2], 10)), T(parseInt(t[3], 10)), _s(t.length < 5 ? 1 : parseFloat(t[4]))]
    }
    {
        const t = ne.exec(h);
        if (t)
            return [T(parseInt(t[1], 16)), T(parseInt(t[2], 16)), T(parseInt(t[3], 16)), 1]
    }
    {
        const t = he.exec(h);
        if (t)
            return [T(17 * parseInt(t[1], 16)), T(17 * parseInt(t[2], 16)), T(17 * parseInt(t[3], 16)), 1]
    }
    throw new Error(`Cannot parse color: ${h}`)
}
function Lt(h) {
    const t = Ct(h);
    return {
        t: `rgb(${t[0]}, ${t[1]}, ${t[2]})`,
        i: (i = t,
        .199 * i[0] + .687 * i[1] + .114 * i[2] > 160 ? "black" : "white")
    };
    var i
}
class y {
    constructor() {
        this.h = []
    }
    l(t, i, s) {
        const e = {
            o: t,
            _: i,
            u: s === !0
        };
        this.h.push(e)
    }
    v(t) {
        const i = this.h.findIndex(s=>t === s.o);
        i > -1 && this.h.splice(i, 1)
    }
    p(t) {
        this.h = this.h.filter(i=>i._ !== t)
    }
    m(t, i, s) {
        const e = [...this.h];
        this.h = this.h.filter(n=>!n.u),
        e.forEach(n=>n.o(t, i, s))
    }
    M() {
        return this.h.length > 0
    }
    S() {
        this.h = []
    }
}
function P(h, ...t) {
    for (const i of t)
        for (const s in i)
            i[s] !== void 0 && (typeof i[s] != "object" || h[s] === void 0 || Array.isArray(i[s]) ? h[s] = i[s] : P(h[s], i[s]));
    return h
}
function $(h) {
    return typeof h == "number" && isFinite(h)
}
function rt(h) {
    return typeof h == "number" && h % 1 == 0
}
function ut(h) {
    return typeof h == "string"
}
function ft(h) {
    return typeof h == "boolean"
}
function R(h) {
    const t = h;
    if (!t || typeof t != "object")
        return t;
    let i, s, e;
    for (s in i = Array.isArray(t) ? [] : {},
    t)
        t.hasOwnProperty(s) && (e = t[s],
        i[s] = e && typeof e == "object" ? R(e) : e);
    return i
}
function le(h) {
    return h !== null
}
function ot(h) {
    return h === null ? void 0 : h
}
const li = "-apple-system, BlinkMacSystemFont, 'Trebuchet MS', Roboto, Ubuntu, sans-serif";
function Q(h, t, i) {
    return t === void 0 && (t = li),
    `${i = i !== void 0 ? `${i} ` : ""}${h}px ${t}`
}
class ae {
    constructor(t) {
        this.k = {
            C: 1,
            T: 5,
            P: NaN,
            R: "",
            D: "",
            O: "",
            A: "",
            B: 0,
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
          , s = this.H();
        return t.P === i && t.D === s || (t.P = i,
        t.D = s,
        t.R = Q(i, s),
        t.L = 2.5 / 12 * i,
        t.B = t.L,
        t.V = i / 12 * t.T,
        t.I = i / 12 * t.T,
        t.N = 0),
        t.O = this.$(),
        t.A = this.U(),
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
class ai {
    constructor() {
        this.Y = []
    }
    X(t) {
        this.Y = t
    }
    K(t, i, s) {
        this.Y.forEach(e=>{
            e.K(t, i, s)
        }
        )
    }
}
class W {
    K(t, i, s) {
        t.useBitmapCoordinateSpace(e=>this.Z(e, i, s))
    }
}
class ue extends W {
    constructor() {
        super(...arguments),
        this.G = null
    }
    J(t) {
        this.G = t
    }
    Z({context: t, horizontalPixelRatio: i, verticalPixelRatio: s}) {
        if (this.G === null || this.G.tt === null)
            return;
        const e = this.G.tt
          , n = this.G
          , r = Math.max(1, Math.floor(i)) % 2 / 2
          , o = l=>{
            t.beginPath();
            for (let a = e.to - 1; a >= e.from; --a) {
                const u = n.it[a]
                  , c = Math.round(u.nt * i) + r
                  , d = u.st * s
                  , f = l * s + r;
                t.moveTo(c, d),
                t.arc(c, d, f, 0, 2 * Math.PI)
            }
            t.fill()
        }
        ;
        n.et > 0 && (t.fillStyle = n.rt,
        o(n.ht + n.et)),
        t.fillStyle = n.lt,
        o(n.ht)
    }
}
function ce() {
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
const de = {
    from: 0,
    to: 1
};
class fe {
    constructor(t, i) {
        this.ut = new ai,
        this.ct = [],
        this.dt = [],
        this.ft = !0,
        this.F = t,
        this.vt = i,
        this.ut.X(this.ct)
    }
    bt(t) {
        const i = this.F.wt();
        i.length !== this.ct.length && (this.dt = i.map(ce),
        this.ct = this.dt.map(s=>{
            const e = new ue;
            return e.J(s),
            e
        }
        ),
        this.ut.X(this.ct)),
        this.ft = !0
    }
    gt() {
        return this.ft && (this.Mt(),
        this.ft = !1),
        this.ut
    }
    Mt() {
        const t = this.vt.W().mode === 2
          , i = this.F.wt()
          , s = this.vt.xt()
          , e = this.F.St();
        i.forEach((n,r)=>{
            var o;
            const l = this.dt[r]
              , a = n.kt(s);
            if (t || a === null || !n.yt())
                return void (l.tt = null);
            const u = v(n.Ct());
            l.lt = a.Tt,
            l.ht = a.ht,
            l.et = a.Pt,
            l.it[0]._t = a._t,
            l.it[0].st = n.Dt().Rt(a._t, u.Ot),
            l.rt = (o = a.At) !== null && o !== void 0 ? o : this.F.Bt(l.it[0].st / n.Dt().Vt()),
            l.it[0].ot = s,
            l.it[0].nt = e.It(s),
            l.tt = de
        }
        )
    }
}
class me extends W {
    constructor(t) {
        super(),
        this.zt = t
    }
    Z({context: t, bitmapSize: i, horizontalPixelRatio: s, verticalPixelRatio: e}) {
        if (this.zt === null)
            return;
        const n = this.zt.Lt.yt
          , r = this.zt.Et.yt;
        if (!n && !r)
            return;
        const o = Math.round(this.zt.nt * s)
          , l = Math.round(this.zt.st * e);
        t.lineCap = "butt",
        n && o >= 0 && (t.lineWidth = Math.floor(this.zt.Lt.et * s),
        t.strokeStyle = this.zt.Lt.O,
        t.fillStyle = this.zt.Lt.O,
        U(t, this.zt.Lt.Nt),
        function(a, u, c, d) {
            a.beginPath();
            const f = a.lineWidth % 2 ? .5 : 0;
            a.moveTo(u + f, c),
            a.lineTo(u + f, d),
            a.stroke()
        }(t, o, 0, i.height)),
        r && l >= 0 && (t.lineWidth = Math.floor(this.zt.Et.et * e),
        t.strokeStyle = this.zt.Et.O,
        t.fillStyle = this.zt.Et.O,
        U(t, this.zt.Et.Nt),
        Ms(t, l, 0, i.width))
    }
}
class pe {
    constructor(t) {
        this.ft = !0,
        this.Ft = {
            Lt: {
                et: 1,
                Nt: 0,
                O: "",
                yt: !1
            },
            Et: {
                et: 1,
                Nt: 0,
                O: "",
                yt: !1
            },
            nt: 0,
            st: 0
        },
        this.Wt = new me(this.Ft),
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
        const t = this.jt.yt()
          , i = v(this.jt.Ht())
          , s = i.$t().W().crosshair
          , e = this.Ft;
        if (s.mode === 2)
            return e.Et.yt = !1,
            void (e.Lt.yt = !1);
        e.Et.yt = t && this.jt.Ut(i),
        e.Lt.yt = t && this.jt.qt(),
        e.Et.et = s.horzLine.width,
        e.Et.Nt = s.horzLine.style,
        e.Et.O = s.horzLine.color,
        e.Lt.et = s.vertLine.width,
        e.Lt.Nt = s.vertLine.style,
        e.Lt.O = s.vertLine.color,
        e.nt = this.jt.Yt(),
        e.st = this.jt.Xt()
    }
}
function ve(h, t, i, s, e, n) {
    h.fillRect(t + n, i, s - 2 * n, n),
    h.fillRect(t + n, i + e - n, s - 2 * n, n),
    h.fillRect(t, i, n, e),
    h.fillRect(t + s - n, i, n, e)
}
function Ot(h, t, i, s, e, n) {
    h.save(),
    h.globalCompositeOperation = "copy",
    h.fillStyle = n,
    h.fillRect(t, i, s, e),
    h.restore()
}
function Oi(h, t, i, s, e, n) {
    h.beginPath(),
    h.roundRect ? h.roundRect(t, i, s, e, n) : (h.lineTo(t + s - n[1], i),
    n[1] !== 0 && h.arcTo(t + s, i, t + s, i + n[1], n[1]),
    h.lineTo(t + s, i + e - n[2]),
    n[2] !== 0 && h.arcTo(t + s, i + e, t + s - n[2], i + e, n[2]),
    h.lineTo(t + n[3], i + e),
    n[3] !== 0 && h.arcTo(t, i + e, t, i + e - n[3], n[3]),
    h.lineTo(t, i + n[0]),
    n[0] !== 0 && h.arcTo(t, i, t + n[0], i, n[0]))
}
function ki(h, t, i, s, e, n, r=0, o=[0, 0, 0, 0], l="") {
    if (h.save(),
    !r || !l || l === n)
        return Oi(h, t, i, s, e, o),
        h.fillStyle = n,
        h.fill(),
        void h.restore();
    const a = r / 2;
    var u;
    Oi(h, t + a, i + a, s - r, e - r, (u = -a,
    o.map(c=>c === 0 ? c : c + u))),
    n !== "transparent" && (h.fillStyle = n,
    h.fill()),
    l !== "transparent" && (h.lineWidth = r,
    h.strokeStyle = l,
    h.closePath(),
    h.stroke()),
    h.restore()
}
function ys(h, t, i, s, e, n, r) {
    h.save(),
    h.globalCompositeOperation = "copy";
    const o = h.createLinearGradient(0, 0, 0, e);
    o.addColorStop(0, n),
    o.addColorStop(1, r),
    h.fillStyle = o,
    h.fillRect(t, i, s, e),
    h.restore()
}
class Ei {
    constructor(t, i) {
        this.J(t, i)
    }
    J(t, i) {
        this.zt = t,
        this.Kt = i
    }
    Vt(t, i) {
        return this.zt.yt ? t.P + t.L + t.B : 0
    }
    K(t, i, s, e) {
        if (!this.zt.yt || this.zt.Zt.length === 0)
            return;
        const n = this.zt.O
          , r = this.Kt.t
          , o = t.useBitmapCoordinateSpace(l=>{
            const a = l.context;
            a.font = i.R;
            const u = this.Gt(l, i, s, e)
              , c = u.Jt
              , d = (f,m)=>{
                u.Qt ? ki(a, c.ti, c.ii, c.ni, c.si, f, c.ei, [c.ht, 0, 0, c.ht], m) : ki(a, c.ri, c.ii, c.ni, c.si, f, c.ei, [0, c.ht, c.ht, 0], m)
            }
            ;
            return d(r, "transparent"),
            this.zt.hi && (a.fillStyle = n,
            a.fillRect(c.ri, c.li, c.ai - c.ri, c.oi)),
            d("transparent", r),
            this.zt._i && (a.fillStyle = i.A,
            a.fillRect(u.Qt ? c.ui - c.ei : 0, c.ii, c.ei, c.ci - c.ii)),
            u
        }
        );
        t.useMediaCoordinateSpace(({context: l})=>{
            const a = o.di;
            l.font = i.R,
            l.textAlign = o.Qt ? "right" : "left",
            l.textBaseline = "middle",
            l.fillStyle = n,
            l.fillText(this.zt.Zt, a.fi, (a.ii + a.ci) / 2 + a.pi)
        }
        )
    }
    Gt(t, i, s, e) {
        var n;
        const {context: r, bitmapSize: o, mediaSize: l, horizontalPixelRatio: a, verticalPixelRatio: u} = t
          , c = this.zt.hi || !this.zt.mi ? i.T : 0
          , d = this.zt.bi ? i.C : 0
          , f = i.L + this.Kt.wi
          , m = i.B + this.Kt.gi
          , p = i.V
          , b = i.I
          , g = this.zt.Zt
          , w = i.P
          , _ = s.Mi(r, g)
          , S = Math.ceil(s.xi(r, g))
          , C = w + f + m
          , E = i.C + p + b + S + c
          , L = Math.max(1, Math.floor(u));
        let x = Math.round(C * u);
        x % 2 != L % 2 && (x += 1);
        const B = d > 0 ? Math.max(1, Math.floor(d * a)) : 0
          , Z = Math.round(E * a)
          , Si = Math.round(c * a)
          , Us = (n = this.Kt.Si) !== null && n !== void 0 ? n : this.Kt.ki
          , Mi = Math.round(Us * u) - Math.floor(.5 * u)
          , Wt = Math.floor(Mi + L / 2 - x / 2)
          , _i = Wt + x
          , dt = e === "right"
          , yi = dt ? l.width - d : d
          , tt = dt ? o.width - B : B;
        let Nt, $t, Rt;
        return dt ? (Nt = tt - Z,
        $t = tt - Si,
        Rt = yi - c - p - d) : (Nt = tt + Z,
        $t = tt + Si,
        Rt = yi + c + p),
        {
            Qt: dt,
            Jt: {
                ii: Wt,
                li: Mi,
                ci: _i,
                ni: Z,
                si: x,
                ht: 2 * a,
                ei: B,
                ti: Nt,
                ri: tt,
                ai: $t,
                oi: L,
                ui: o.width
            },
            di: {
                ii: Wt / u,
                ci: _i / u,
                fi: Rt,
                pi: _
            }
        }
    }
}
class kt {
    constructor(t) {
        this.yi = {
            ki: 0,
            t: "#000",
            gi: 0,
            wi: 0
        },
        this.Ci = {
            Zt: "",
            yt: !1,
            hi: !0,
            mi: !1,
            At: "",
            O: "#FFF",
            _i: !1,
            bi: !1
        },
        this.Ti = {
            Zt: "",
            yt: !1,
            hi: !1,
            mi: !0,
            At: "",
            O: "#FFF",
            _i: !0,
            bi: !0
        },
        this.ft = !0,
        this.Pi = new (t || Ei)(this.Ci,this.yi),
        this.Ri = new (t || Ei)(this.Ti,this.yi)
    }
    Zt() {
        return this.Di(),
        this.Ci.Zt
    }
    ki() {
        return this.Di(),
        this.yi.ki
    }
    bt() {
        this.ft = !0
    }
    Vt(t, i=!1) {
        return Math.max(this.Pi.Vt(t, i), this.Ri.Vt(t, i))
    }
    Oi() {
        return this.yi.Si || 0
    }
    Ai(t) {
        this.yi.Si = t
    }
    Bi() {
        return this.Di(),
        this.Ci.yt || this.Ti.yt
    }
    Vi() {
        return this.Di(),
        this.Ci.yt
    }
    gt(t) {
        return this.Di(),
        this.Ci.hi = this.Ci.hi && t.W().ticksVisible,
        this.Ti.hi = this.Ti.hi && t.W().ticksVisible,
        this.Pi.J(this.Ci, this.yi),
        this.Ri.J(this.Ti, this.yi),
        this.Pi
    }
    Ii() {
        return this.Di(),
        this.Pi.J(this.Ci, this.yi),
        this.Ri.J(this.Ti, this.yi),
        this.Ri
    }
    Di() {
        this.ft && (this.Ci.hi = !0,
        this.Ti.hi = !1,
        this.zi(this.Ci, this.Ti, this.yi))
    }
}
class be extends kt {
    constructor(t, i, s) {
        super(),
        this.jt = t,
        this.Li = i,
        this.Ei = s
    }
    zi(t, i, s) {
        if (t.yt = !1,
        this.jt.W().mode === 2)
            return;
        const e = this.jt.W().horzLine;
        if (!e.labelVisible)
            return;
        const n = this.Li.Ct();
        if (!this.jt.yt() || this.Li.Ni() || n === null)
            return;
        const r = Lt(e.labelBackgroundColor);
        s.t = r.t,
        t.O = r.i;
        const o = 2 / 12 * this.Li.P();
        s.wi = o,
        s.gi = o;
        const l = this.Ei(this.Li);
        s.ki = l.ki,
        t.Zt = this.Li.Fi(l._t, n),
        t.yt = !0
    }
}
const ge = /[1-9]/g;
class Cs {
    constructor() {
        this.zt = null
    }
    J(t) {
        this.zt = t
    }
    K(t, i) {
        if (this.zt === null || this.zt.yt === !1 || this.zt.Zt.length === 0)
            return;
        const s = t.useMediaCoordinateSpace(({context: d})=>(d.font = i.R,
        Math.round(i.Wi.xi(d, v(this.zt).Zt, ge))));
        if (s <= 0)
            return;
        const e = i.ji
          , n = s + 2 * e
          , r = n / 2
          , o = this.zt.Hi;
        let l = this.zt.ki
          , a = Math.floor(l - r) + .5;
        a < 0 ? (l += Math.abs(0 - a),
        a = Math.floor(l - r) + .5) : a + n > o && (l -= Math.abs(o - (a + n)),
        a = Math.floor(l - r) + .5);
        const u = a + n
          , c = Math.ceil(0 + i.C + i.T + i.L + i.P + i.B);
        t.useBitmapCoordinateSpace(({context: d, horizontalPixelRatio: f, verticalPixelRatio: m})=>{
            const p = v(this.zt);
            d.fillStyle = p.t;
            const b = Math.round(a * f)
              , g = Math.round(0 * m)
              , w = Math.round(u * f)
              , _ = Math.round(c * m)
              , S = Math.round(2 * f);
            if (d.beginPath(),
            d.moveTo(b, g),
            d.lineTo(b, _ - S),
            d.arcTo(b, _, b + S, _, S),
            d.lineTo(w - S, _),
            d.arcTo(w, _, w, _ - S, S),
            d.lineTo(w, g),
            d.fill(),
            p.hi) {
                const C = Math.round(p.ki * f)
                  , E = g
                  , L = Math.round((E + i.T) * m);
                d.fillStyle = p.O;
                const x = Math.max(1, Math.floor(f))
                  , B = Math.floor(.5 * f);
                d.fillRect(C - B, E, x, L - E)
            }
        }
        ),
        t.useMediaCoordinateSpace(({context: d})=>{
            const f = v(this.zt)
              , m = 0 + i.C + i.T + i.L + i.P / 2;
            d.font = i.R,
            d.textAlign = "left",
            d.textBaseline = "middle",
            d.fillStyle = f.O;
            const p = i.Wi.Mi(d, "Apr0");
            d.translate(a + e, m + p),
            d.fillText(f.Zt, 0, 0)
        }
        )
    }
}
class we {
    constructor(t, i, s) {
        this.ft = !0,
        this.Wt = new Cs,
        this.Ft = {
            yt: !1,
            t: "#4c525e",
            O: "white",
            Zt: "",
            Hi: 0,
            ki: NaN,
            hi: !0
        },
        this.vt = t,
        this.$i = i,
        this.Ei = s
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
        if (t.yt = !1,
        this.vt.W().mode === 2)
            return;
        const i = this.vt.W().vertLine;
        if (!i.labelVisible)
            return;
        const s = this.$i.St();
        if (s.Ni())
            return;
        t.Hi = s.Hi();
        const e = this.Ei();
        if (e === null)
            return;
        t.ki = e.ki;
        const n = s.Ui(this.vt.xt());
        t.Zt = s.qi(v(n)),
        t.yt = !0;
        const r = Lt(i.labelBackgroundColor);
        t.t = r.t,
        t.O = r.i,
        t.hi = s.W().ticksVisible
    }
}
class ui {
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
    yt() {
        return !0
    }
}
var Ti;
(function(h) {
    h[h.Normal = 0] = "Normal",
    h[h.Magnet = 1] = "Magnet",
    h[h.Hidden = 2] = "Hidden"
}
)(Ti || (Ti = {}));
class Se extends ui {
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
        this.dn = new fe(t,this),
        this.fn = ((e,n)=>r=>{
            const o = n()
              , l = e();
            if (r === v(this.tn).vn())
                return {
                    _t: l,
                    ki: o
                };
            {
                const a = v(r.Ct());
                return {
                    _t: r.pn(o, a),
                    ki: o
                }
            }
        }
        )(()=>this.nn, ()=>this.an);
        const s = ((e,n)=>()=>{
            const r = this.$i.St().mn(e())
              , o = n();
            return r && Number.isFinite(o) ? {
                ot: r,
                ki: o
            } : null
        }
        )(()=>this.sn, ()=>this.Yt());
        this.bn = new we(this,t,s),
        this.wn = new pe(this)
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
    kn(t, i, s) {
        this.hn || (this.hn = !0),
        this.en = !0,
        this.yn(t, i, s)
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
    yt() {
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
        return this.tn !== null ? [this.wn, this.dn] : []
    }
    Ut(t) {
        return t === this.tn && this.cn.horzLine.visible
    }
    qt() {
        return this.cn.vertLine.visible
    }
    Rn(t, i) {
        this.en && this.tn === t || this.rn.clear();
        const s = [];
        return this.tn === t && s.push(this.Dn(this.rn, i, this.fn)),
        s
    }
    Qi() {
        return this.en ? [this.bn] : []
    }
    Ht() {
        return this.tn
    }
    On() {
        this.wn.bt(),
        this.rn.forEach(t=>t.bt()),
        this.bn.bt(),
        this.dn.bt()
    }
    An(t) {
        return t && !t.vn().Ni() ? t.vn() : null
    }
    yn(t, i, s) {
        this.Bn(t, i, s) && this.On()
    }
    Bn(t, i, s) {
        const e = this.ln
          , n = this.an
          , r = this.nn
          , o = this.sn
          , l = this.tn
          , a = this.An(s);
        this.sn = t,
        this.ln = isNaN(t) ? NaN : this.$i.St().It(t),
        this.tn = s;
        const u = a !== null ? a.Ct() : null;
        return a !== null && u !== null ? (this.nn = i,
        this.an = a.Rt(i, u)) : (this.nn = NaN,
        this.an = NaN),
        e !== this.ln || n !== this.an || o !== this.sn || r !== this.nn || l !== this.tn
    }
    Tn() {
        const t = this.$i.wt().map(s=>s.In().Vn()).filter(le)
          , i = t.length === 0 ? null : Math.max(...t);
        this.sn = i !== null ? i : NaN
    }
    Dn(t, i, s) {
        let e = t.get(i);
        return e === void 0 && (e = new be(this,i,s),
        t.set(i, e)),
        e
    }
}
function Et(h) {
    return h === "left" || h === "right"
}
class z {
    constructor(t) {
        this.zn = new Map,
        this.Ln = [],
        this.En = t
    }
    Nn(t, i) {
        const s = function(e, n) {
            return e === void 0 ? n : {
                Fn: Math.max(e.Fn, n.Fn),
                Wn: e.Wn || n.Wn
            }
        }(this.zn.get(t), i);
        this.zn.set(t, s)
    }
    jn() {
        return this.En
    }
    Hn(t) {
        const i = this.zn.get(t);
        return i === void 0 ? {
            Fn: this.En
        } : {
            Fn: Math.max(this.En, i.Fn),
            Wn: i.Wn
        }
    }
    $n() {
        this.Un(),
        this.Ln = [{
            qn: 0
        }]
    }
    Yn(t) {
        this.Un(),
        this.Ln = [{
            qn: 1,
            Ot: t
        }]
    }
    Xn(t) {
        this.Kn(),
        this.Ln.push({
            qn: 5,
            Ot: t
        })
    }
    Un() {
        this.Kn(),
        this.Ln.push({
            qn: 6
        })
    }
    Zn() {
        this.Un(),
        this.Ln = [{
            qn: 4
        }]
    }
    Gn(t) {
        this.Un(),
        this.Ln.push({
            qn: 2,
            Ot: t
        })
    }
    Jn(t) {
        this.Un(),
        this.Ln.push({
            qn: 3,
            Ot: t
        })
    }
    Qn() {
        return this.Ln
    }
    ts(t) {
        for (const i of t.Ln)
            this.ns(i);
        this.En = Math.max(this.En, t.En),
        t.zn.forEach((i,s)=>{
            this.Nn(s, i)
        }
        )
    }
    static ss() {
        return new z(2)
    }
    static es() {
        return new z(3)
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
        const t = this.Ln.findIndex(i=>i.qn === 5);
        t !== -1 && this.Ln.splice(t, 1)
    }
}
const Pi = ".";
function D(h, t) {
    if (!$(h))
        return "n/a";
    if (!rt(t))
        throw new TypeError("invalid length");
    if (t < 0 || t > 16)
        throw new TypeError("invalid length");
    return t === 0 ? h.toString() : ("0000000000000000" + h.toString()).slice(-t)
}
class Tt {
    constructor(t, i) {
        if (i || (i = 1),
        $(t) && rt(t) || (t = 100),
        t < 0)
            throw new TypeError("invalid base");
        this.Li = t,
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
        this.Li > 0 && this.rs > 0) {
            let t = this.Li;
            for (; t > 1; )
                t /= 10,
                this.os++
        }
    }
    ls(t) {
        const i = this.Li / this.rs;
        let s = Math.floor(t)
          , e = "";
        const n = this.os !== void 0 ? this.os : NaN;
        if (i > 1) {
            let r = +(Math.round(t * i) - s * i).toFixed(this.os);
            r >= i && (r -= i,
            s += 1),
            e = Pi + D(+r.toFixed(this.os) * this.rs, n)
        } else
            s = Math.round(s * i) / i,
            n > 0 && (e = Pi + D(0, n));
        return s.toFixed(0) + e
    }
}
class zs extends Tt {
    constructor(t=100) {
        super(t)
    }
    format(t) {
        return `${super.format(t)}%`
    }
}
class Me {
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
        const s = Math.pow(10, this._s);
        return i = (t = Math.round(t * s) / s) >= 1e-15 && t < 1 ? t.toFixed(this._s).replace(/\.?0+$/, "") : String(t),
        i.replace(/(\.[1-9]*)0+$/, (e,n)=>n)
    }
}
function xs(h, t, i, s, e, n, r) {
    if (t.length === 0 || s.from >= t.length || s.to <= 0)
        return;
    const {context: o, horizontalPixelRatio: l, verticalPixelRatio: a} = h
      , u = t[s.from];
    let c = n(h, u)
      , d = u;
    if (s.to - s.from < 2) {
        const f = e / 2;
        o.beginPath();
        const m = {
            nt: u.nt - f,
            st: u.st
        }
          , p = {
            nt: u.nt + f,
            st: u.st
        };
        o.moveTo(m.nt * l, m.st * a),
        o.lineTo(p.nt * l, p.st * a),
        r(h, c, m, p)
    } else {
        const f = (p,b)=>{
            r(h, c, d, b),
            o.beginPath(),
            c = p,
            d = b
        }
        ;
        let m = d;
        o.beginPath(),
        o.moveTo(u.nt * l, u.st * a);
        for (let p = s.from + 1; p < s.to; ++p) {
            m = t[p];
            const b = n(h, m);
            switch (i) {
            case 0:
                o.lineTo(m.nt * l, m.st * a);
                break;
            case 1:
                o.lineTo(m.nt * l, t[p - 1].st * a),
                b !== c && (f(b, m),
                o.lineTo(m.nt * l, t[p - 1].st * a)),
                o.lineTo(m.nt * l, m.st * a);
                break;
            case 2:
                {
                    const [g,w] = _e(t, p - 1, p);
                    o.bezierCurveTo(g.nt * l, g.st * a, w.nt * l, w.st * a, m.nt * l, m.st * a);
                    break
                }
            }
            i !== 1 && b !== c && (f(b, m),
            o.moveTo(m.nt * l, m.st * a))
        }
        (d !== m || d === m && i === 1) && r(h, c, d, m)
    }
}
const Wi = 6;
function Dt(h, t) {
    return {
        nt: h.nt - t.nt,
        st: h.st - t.st
    }
}
function Ni(h, t) {
    return {
        nt: h.nt / t,
        st: h.st / t
    }
}
function _e(h, t, i) {
    const s = Math.max(0, t - 1)
      , e = Math.min(h.length - 1, i + 1);
    var n, r;
    return [(n = h[t],
    r = Ni(Dt(h[i], h[s]), Wi),
    {
        nt: n.nt + r.nt,
        st: n.st + r.st
    }), Dt(h[i], Ni(Dt(h[e], h[t]), Wi))]
}
function ye(h, t, i, s, e) {
    const {context: n, horizontalPixelRatio: r, verticalPixelRatio: o} = t;
    n.lineTo(e.nt * r, h * o),
    n.lineTo(s.nt * r, h * o),
    n.closePath(),
    n.fillStyle = i,
    n.fill()
}
class Ls extends W {
    constructor() {
        super(...arguments),
        this.G = null
    }
    J(t) {
        this.G = t
    }
    Z(t) {
        var i;
        if (this.G === null)
            return;
        const {it: s, tt: e, cs: n, et: r, Nt: o, ds: l} = this.G
          , a = (i = this.G.fs) !== null && i !== void 0 ? i : this.G.vs ? 0 : t.mediaSize.height;
        if (e === null)
            return;
        const u = t.context;
        u.lineCap = "butt",
        u.lineJoin = "round",
        u.lineWidth = r,
        U(u, o),
        u.lineWidth = 1,
        xs(t, s, l, e, n, this.ps.bind(this), ye.bind(null, a))
    }
}
function si(h, t, i) {
    return Math.min(Math.max(h, t), i)
}
function mt(h, t, i) {
    return t - h <= i
}
function Os(h) {
    const t = Math.ceil(h);
    return t % 2 == 0 ? t - 1 : t
}
class ci {
    bs(t, i) {
        const s = this.ws
          , {gs: e, Ms: n, xs: r, Ss: o, ks: l, fs: a} = i;
        if (this.ys === void 0 || s === void 0 || s.gs !== e || s.Ms !== n || s.xs !== r || s.Ss !== o || s.fs !== a || s.ks !== l) {
            const u = t.context.createLinearGradient(0, 0, 0, l);
            if (u.addColorStop(0, e),
            a != null) {
                const c = si(a * t.verticalPixelRatio / l, 0, 1);
                u.addColorStop(c, n),
                u.addColorStop(c, r)
            }
            u.addColorStop(1, o),
            this.ys = u,
            this.ws = i
        }
        return this.ys
    }
}
class Ce extends Ls {
    constructor() {
        super(...arguments),
        this.Cs = new ci
    }
    ps(t, i) {
        return this.Cs.bs(t, {
            gs: i.Ts,
            Ms: "",
            xs: "",
            Ss: i.Ps,
            ks: t.bitmapSize.height
        })
    }
}
function ze(h, t) {
    const i = h.context;
    i.strokeStyle = t,
    i.stroke()
}
class ks extends W {
    constructor() {
        super(...arguments),
        this.G = null
    }
    J(t) {
        this.G = t
    }
    Z(t) {
        if (this.G === null)
            return;
        const {it: i, tt: s, cs: e, ds: n, et: r, Nt: o, Rs: l} = this.G;
        if (s === null)
            return;
        const a = t.context;
        a.lineCap = "butt",
        a.lineWidth = r * t.verticalPixelRatio,
        U(a, o),
        a.lineJoin = "round";
        const u = this.Ds.bind(this);
        n !== void 0 && xs(t, i, n, s, e, u, ze),
        l && function(c, d, f, m, p) {
            const {horizontalPixelRatio: b, verticalPixelRatio: g, context: w} = c;
            let _ = null;
            const S = Math.max(1, Math.floor(b)) % 2 / 2
              , C = f * g + S;
            for (let E = m.to - 1; E >= m.from; --E) {
                const L = d[E];
                if (L) {
                    const x = p(c, L);
                    x !== _ && (w.beginPath(),
                    _ !== null && w.fill(),
                    w.fillStyle = x,
                    _ = x);
                    const B = Math.round(L.nt * b) + S
                      , Z = L.st * g;
                    w.moveTo(B, Z),
                    w.arc(B, Z, C, 0, 2 * Math.PI)
                }
            }
            w.fill()
        }(t, i, l, s, u)
    }
}
class Es extends ks {
    Ds(t, i) {
        return i.lt
    }
}
function Ts(h, t, i, s, e=0, n=t.length) {
    let r = n - e;
    for (; 0 < r; ) {
        const o = r >> 1
          , l = e + o;
        s(t[l], i) === h ? (e = l + 1,
        r -= o + 1) : r = o
    }
    return e
}
const ct = Ts.bind(null, !0)
  , Ps = Ts.bind(null, !1);
function xe(h, t) {
    return h.ot < t
}
function Le(h, t) {
    return t < h.ot
}
function Ws(h, t, i) {
    const s = t.Os()
      , e = t.ui()
      , n = ct(h, s, xe)
      , r = Ps(h, e, Le);
    if (!i)
        return {
            from: n,
            to: r
        };
    let o = n
      , l = r;
    return n > 0 && n < h.length && h[n].ot >= s && (o = n - 1),
    r > 0 && r < h.length && h[r - 1].ot <= e && (l = r + 1),
    {
        from: o,
        to: l
    }
}
class di {
    constructor(t, i, s) {
        this.As = !0,
        this.Bs = !0,
        this.Vs = !0,
        this.Is = [],
        this.zs = null,
        this.Ls = t,
        this.Es = i,
        this.Ns = s
    }
    bt(t) {
        this.As = !0,
        t === "data" && (this.Bs = !0),
        t === "options" && (this.Vs = !0)
    }
    gt() {
        return this.Ls.yt() ? (this.Fs(),
        this.zs === null ? null : this.Ws) : null
    }
    js() {
        this.Is = this.Is.map(t=>Object.assign(Object.assign({}, t), this.Ls.$s().Hs(t.ot)))
    }
    Us() {
        this.zs = null
    }
    Fs() {
        this.Bs && (this.qs(),
        this.Bs = !1),
        this.Vs && (this.js(),
        this.Vs = !1),
        this.As && (this.Ys(),
        this.As = !1)
    }
    Ys() {
        const t = this.Ls.Dt()
          , i = this.Es.St();
        if (this.Us(),
        i.Ni() || t.Ni())
            return;
        const s = i.Xs();
        if (s === null || this.Ls.In().Ks() === 0)
            return;
        const e = this.Ls.Ct();
        e !== null && (this.zs = Ws(this.Is, s, this.Ns),
        this.Zs(t, i, e.Ot),
        this.Gs())
    }
}
class Pt extends di {
    constructor(t, i) {
        super(t, i, !0)
    }
    Zs(t, i, s) {
        i.Js(this.Is, ot(this.zs)),
        t.Qs(this.Is, s, ot(this.zs))
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
        const t = this.Ls.$s();
        this.Is = this.Ls.In().ie().map(i=>{
            const s = i.Ot[3];
            return this.ne(i.se, s, t)
        }
        )
    }
}
class Oe extends Pt {
    constructor(t, i) {
        super(t, i),
        this.Ws = new ai,
        this.ee = new Ce,
        this.re = new Es,
        this.Ws.X([this.ee, this.re])
    }
    ne(t, i, s) {
        return Object.assign(Object.assign({}, this.te(t, i)), s.Hs(t))
    }
    Gs() {
        const t = this.Ls.W();
        this.ee.J({
            ds: t.lineType,
            it: this.Is,
            Nt: t.lineStyle,
            et: t.lineWidth,
            fs: null,
            vs: t.invertFilledArea,
            tt: this.zs,
            cs: this.Es.St().he()
        }),
        this.re.J({
            ds: t.lineVisible ? t.lineType : void 0,
            it: this.Is,
            Nt: t.lineStyle,
            et: t.lineWidth,
            tt: this.zs,
            cs: this.Es.St().he(),
            Rs: t.pointMarkersVisible ? t.pointMarkersRadius || t.lineWidth / 2 + 2 : void 0
        })
    }
}
class ke extends W {
    constructor() {
        super(...arguments),
        this.zt = null,
        this.le = 0,
        this.ae = 0
    }
    J(t) {
        this.zt = t
    }
    Z({context: t, horizontalPixelRatio: i, verticalPixelRatio: s}) {
        if (this.zt === null || this.zt.In.length === 0 || this.zt.tt === null)
            return;
        this.le = this.oe(i),
        this.le >= 2 && Math.max(1, Math.floor(i)) % 2 != this.le % 2 && this.le--,
        this.ae = this.zt._e ? Math.min(this.le, Math.floor(i)) : this.le;
        let e = null;
        const n = this.ae <= this.le && this.zt.he >= Math.floor(1.5 * i);
        for (let r = this.zt.tt.from; r < this.zt.tt.to; ++r) {
            const o = this.zt.In[r];
            e !== o.ue && (t.fillStyle = o.ue,
            e = o.ue);
            const l = Math.floor(.5 * this.ae)
              , a = Math.round(o.nt * i)
              , u = a - l
              , c = this.ae
              , d = u + c - 1
              , f = Math.min(o.ce, o.de)
              , m = Math.max(o.ce, o.de)
              , p = Math.round(f * s) - l
              , b = Math.round(m * s) + l
              , g = Math.max(b - p, this.ae);
            t.fillRect(u, p, c, g);
            const w = Math.ceil(1.5 * this.le);
            if (n) {
                if (this.zt.fe) {
                    const E = a - w;
                    let L = Math.max(p, Math.round(o.ve * s) - l)
                      , x = L + c - 1;
                    x > p + g - 1 && (x = p + g - 1,
                    L = x - c + 1),
                    t.fillRect(E, L, u - E, x - L + 1)
                }
                const _ = a + w;
                let S = Math.max(p, Math.round(o.pe * s) - l)
                  , C = S + c - 1;
                C > p + g - 1 && (C = p + g - 1,
                S = C - c + 1),
                t.fillRect(d + 1, S, _ - d, C - S + 1)
            }
        }
    }
    oe(t) {
        const i = Math.floor(t);
        return Math.max(i, Math.floor(function(s, e) {
            return Math.floor(.3 * s * e)
        }(v(this.zt).he, t)))
    }
}
class Ns extends di {
    constructor(t, i) {
        super(t, i, !1)
    }
    Zs(t, i, s) {
        i.Js(this.Is, ot(this.zs)),
        t.me(this.Is, s, ot(this.zs))
    }
    be(t, i, s) {
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
        const t = this.Ls.$s();
        this.Is = this.Ls.In().ie().map(i=>this.ne(i.se, i, t))
    }
}
class Ee extends Ns {
    constructor() {
        super(...arguments),
        this.Ws = new ke
    }
    ne(t, i, s) {
        return Object.assign(Object.assign({}, this.be(t, i, s)), s.Hs(t))
    }
    Gs() {
        const t = this.Ls.W();
        this.Ws.J({
            In: this.Is,
            he: this.Es.St().he(),
            fe: t.openVisible,
            _e: t.thinBars,
            tt: this.zs
        })
    }
}
class Te extends Ls {
    constructor() {
        super(...arguments),
        this.Cs = new ci
    }
    ps(t, i) {
        const s = this.G;
        return this.Cs.bs(t, {
            gs: i.Se,
            Ms: i.ke,
            xs: i.ye,
            Ss: i.Ce,
            ks: t.bitmapSize.height,
            fs: s.fs
        })
    }
}
class Pe extends ks {
    constructor() {
        super(...arguments),
        this.Te = new ci
    }
    Ds(t, i) {
        const s = this.G;
        return this.Te.bs(t, {
            gs: i.Pe,
            Ms: i.Pe,
            xs: i.Re,
            Ss: i.Re,
            ks: t.bitmapSize.height,
            fs: s.fs
        })
    }
}
class We extends Pt {
    constructor(t, i) {
        super(t, i),
        this.Ws = new ai,
        this.De = new Te,
        this.Oe = new Pe,
        this.Ws.X([this.De, this.Oe])
    }
    ne(t, i, s) {
        return Object.assign(Object.assign({}, this.te(t, i)), s.Hs(t))
    }
    Gs() {
        const t = this.Ls.Ct();
        if (t === null)
            return;
        const i = this.Ls.W()
          , s = this.Ls.Dt().Rt(i.baseValue.price, t.Ot)
          , e = this.Es.St().he();
        this.De.J({
            it: this.Is,
            et: i.lineWidth,
            Nt: i.lineStyle,
            ds: i.lineType,
            fs: s,
            vs: !1,
            tt: this.zs,
            cs: e
        }),
        this.Oe.J({
            it: this.Is,
            et: i.lineWidth,
            Nt: i.lineStyle,
            ds: i.lineVisible ? i.lineType : void 0,
            Rs: i.pointMarkersVisible ? i.pointMarkersRadius || i.lineWidth / 2 + 2 : void 0,
            fs: s,
            tt: this.zs,
            cs: e
        })
    }
}
class Ne extends W {
    constructor() {
        super(...arguments),
        this.zt = null,
        this.le = 0
    }
    J(t) {
        this.zt = t
    }
    Z(t) {
        if (this.zt === null || this.zt.In.length === 0 || this.zt.tt === null)
            return;
        const {horizontalPixelRatio: i} = t;
        this.le = function(n, r) {
            if (n >= 2.5 && n <= 4)
                return Math.floor(3 * r);
            const o = 1 - .2 * Math.atan(Math.max(4, n) - 4) / (.5 * Math.PI)
              , l = Math.floor(n * o * r)
              , a = Math.floor(n * r)
              , u = Math.min(l, a);
            return Math.max(Math.floor(r), u)
        }(this.zt.he, i),
        this.le >= 2 && Math.floor(i) % 2 != this.le % 2 && this.le--;
        const s = this.zt.In;
        this.zt.Ae && this.Be(t, s, this.zt.tt),
        this.zt._i && this.Ve(t, s, this.zt.tt);
        const e = this.Ie(i);
        (!this.zt._i || this.le > 2 * e) && this.ze(t, s, this.zt.tt)
    }
    Be(t, i, s) {
        if (this.zt === null)
            return;
        const {context: e, horizontalPixelRatio: n, verticalPixelRatio: r} = t;
        let o = ""
          , l = Math.min(Math.floor(n), Math.floor(this.zt.he * n));
        l = Math.max(Math.floor(n), Math.min(l, this.le));
        const a = Math.floor(.5 * l);
        let u = null;
        for (let c = s.from; c < s.to; c++) {
            const d = i[c];
            d.Le !== o && (e.fillStyle = d.Le,
            o = d.Le);
            const f = Math.round(Math.min(d.ve, d.pe) * r)
              , m = Math.round(Math.max(d.ve, d.pe) * r)
              , p = Math.round(d.ce * r)
              , b = Math.round(d.de * r);
            let g = Math.round(n * d.nt) - a;
            const w = g + l - 1;
            u !== null && (g = Math.max(u + 1, g),
            g = Math.min(g, w));
            const _ = w - g + 1;
            e.fillRect(g, p, _, f - p),
            e.fillRect(g, m + 1, _, b - m),
            u = w
        }
    }
    Ie(t) {
        let i = Math.floor(1 * t);
        this.le <= 2 * i && (i = Math.floor(.5 * (this.le - 1)));
        const s = Math.max(Math.floor(t), i);
        return this.le <= 2 * s ? Math.max(Math.floor(t), Math.floor(1 * t)) : s
    }
    Ve(t, i, s) {
        if (this.zt === null)
            return;
        const {context: e, horizontalPixelRatio: n, verticalPixelRatio: r} = t;
        let o = "";
        const l = this.Ie(n);
        let a = null;
        for (let u = s.from; u < s.to; u++) {
            const c = i[u];
            c.Ee !== o && (e.fillStyle = c.Ee,
            o = c.Ee);
            let d = Math.round(c.nt * n) - Math.floor(.5 * this.le);
            const f = d + this.le - 1
              , m = Math.round(Math.min(c.ve, c.pe) * r)
              , p = Math.round(Math.max(c.ve, c.pe) * r);
            if (a !== null && (d = Math.max(a + 1, d),
            d = Math.min(d, f)),
            this.zt.he * n > 2 * l)
                ve(e, d, m, f - d + 1, p - m + 1, l);
            else {
                const b = f - d + 1;
                e.fillRect(d, m, b, p - m + 1)
            }
            a = f
        }
    }
    ze(t, i, s) {
        if (this.zt === null)
            return;
        const {context: e, horizontalPixelRatio: n, verticalPixelRatio: r} = t;
        let o = "";
        const l = this.Ie(n);
        for (let a = s.from; a < s.to; a++) {
            const u = i[a];
            let c = Math.round(Math.min(u.ve, u.pe) * r)
              , d = Math.round(Math.max(u.ve, u.pe) * r)
              , f = Math.round(u.nt * n) - Math.floor(.5 * this.le)
              , m = f + this.le - 1;
            if (u.ue !== o) {
                const p = u.ue;
                e.fillStyle = p,
                o = p
            }
            this.zt._i && (f += l,
            c += l,
            m -= l,
            d -= l),
            c > d || e.fillRect(f, c, m - f + 1, d - c + 1)
        }
    }
}
class $e extends Ns {
    constructor() {
        super(...arguments),
        this.Ws = new Ne
    }
    ne(t, i, s) {
        return Object.assign(Object.assign({}, this.be(t, i, s)), s.Hs(t))
    }
    Gs() {
        const t = this.Ls.W();
        this.Ws.J({
            In: this.Is,
            he: this.Es.St().he(),
            Ae: t.wickVisible,
            _i: t.borderVisible,
            tt: this.zs
        })
    }
}
class Re {
    constructor(t, i) {
        this.Ne = t,
        this.Li = i
    }
    K(t, i, s) {
        this.Ne.draw(t, this.Li, i, s)
    }
}
class Bt extends di {
    constructor(t, i, s) {
        super(t, i, !1),
        this.wn = s,
        this.Ws = new Re(this.wn.renderer(),e=>{
            const n = t.Ct();
            return n === null ? null : t.Dt().Rt(e, n.Ot)
        }
        )
    }
    Fe(t) {
        return this.wn.priceValueBuilder(t)
    }
    We(t) {
        return this.wn.isWhitespace(t)
    }
    qs() {
        const t = this.Ls.$s();
        this.Is = this.Ls.In().ie().map(i=>Object.assign(Object.assign({
            ot: i.se,
            nt: NaN
        }, t.Hs(i.se)), {
            je: i.He
        }))
    }
    Zs(t, i) {
        i.Js(this.Is, ot(this.zs))
    }
    Gs() {
        this.wn.update({
            bars: this.Is.map(De),
            barSpacing: this.Es.St().he(),
            visibleRange: this.zs
        }, this.Ls.W())
    }
}
function De(h) {
    return {
        x: h.nt,
        time: h.ot,
        originalData: h.je,
        barColor: h.ue
    }
}
class Be extends W {
    constructor() {
        super(...arguments),
        this.zt = null,
        this.$e = []
    }
    J(t) {
        this.zt = t,
        this.$e = []
    }
    Z({context: t, horizontalPixelRatio: i, verticalPixelRatio: s}) {
        if (this.zt === null || this.zt.it.length === 0 || this.zt.tt === null)
            return;
        this.$e.length || this.Ue(i);
        const e = Math.max(1, Math.floor(s))
          , n = Math.round(this.zt.qe * s) - Math.floor(e / 2)
          , r = n + e;
        for (let o = this.zt.tt.from; o < this.zt.tt.to; o++) {
            const l = this.zt.it[o]
              , a = this.$e[o - this.zt.tt.from]
              , u = Math.round(l.st * s);
            let c, d;
            t.fillStyle = l.ue,
            u <= n ? (c = u,
            d = r) : (c = n,
            d = u - Math.floor(e / 2) + e),
            t.fillRect(a.Os, c, a.ui - a.Os + 1, d - c)
        }
    }
    Ue(t) {
        if (this.zt === null || this.zt.it.length === 0 || this.zt.tt === null)
            return void (this.$e = []);
        const i = Math.ceil(this.zt.he * t) <= 1 ? 0 : Math.max(1, Math.floor(t))
          , s = Math.round(this.zt.he * t) - i;
        this.$e = new Array(this.zt.tt.to - this.zt.tt.from);
        for (let n = this.zt.tt.from; n < this.zt.tt.to; n++) {
            const r = this.zt.it[n]
              , o = Math.round(r.nt * t);
            let l, a;
            if (s % 2) {
                const u = (s - 1) / 2;
                l = o - u,
                a = o + u
            } else {
                const u = s / 2;
                l = o - u,
                a = o + u - 1
            }
            this.$e[n - this.zt.tt.from] = {
                Os: l,
                ui: a,
                Ye: o,
                Xe: r.nt * t,
                ot: r.ot
            }
        }
        for (let n = this.zt.tt.from + 1; n < this.zt.tt.to; n++) {
            const r = this.$e[n - this.zt.tt.from]
              , o = this.$e[n - this.zt.tt.from - 1];
            r.ot === o.ot + 1 && r.Os - o.ui !== i + 1 && (o.Ye > o.Xe ? o.ui = r.Os - i - 1 : r.Os = o.ui + i + 1)
        }
        let e = Math.ceil(this.zt.he * t);
        for (let n = this.zt.tt.from; n < this.zt.tt.to; n++) {
            const r = this.$e[n - this.zt.tt.from];
            r.ui < r.Os && (r.ui = r.Os);
            const o = r.ui - r.Os + 1;
            e = Math.min(o, e)
        }
        if (i > 0 && e < 4)
            for (let n = this.zt.tt.from; n < this.zt.tt.to; n++) {
                const r = this.$e[n - this.zt.tt.from];
                r.ui - r.Os + 1 > e && (r.Ye > r.Xe ? r.ui -= 1 : r.Os += 1)
            }
    }
}
class Fe extends Pt {
    constructor() {
        super(...arguments),
        this.Ws = new Be
    }
    ne(t, i, s) {
        return Object.assign(Object.assign({}, this.te(t, i)), s.Hs(t))
    }
    Gs() {
        const t = {
            it: this.Is,
            he: this.Es.St().he(),
            tt: this.zs,
            qe: this.Ls.Dt().Rt(this.Ls.W().base, v(this.Ls.Ct()).Ot)
        };
        this.Ws.J(t)
    }
}
class Ie extends Pt {
    constructor() {
        super(...arguments),
        this.Ws = new Es
    }
    ne(t, i, s) {
        return Object.assign(Object.assign({}, this.te(t, i)), s.Hs(t))
    }
    Gs() {
        const t = this.Ls.W()
          , i = {
            it: this.Is,
            Nt: t.lineStyle,
            ds: t.lineVisible ? t.lineType : void 0,
            et: t.lineWidth,
            Rs: t.pointMarkersVisible ? t.pointMarkersRadius || t.lineWidth / 2 + 2 : void 0,
            tt: this.zs,
            cs: this.Es.St().he()
        };
        this.Ws.J(i)
    }
}
const Ve = /[2-9]/g;
class lt {
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
    xi(t, i, s) {
        return this.nr(t, i, s).width
    }
    Mi(t, i, s) {
        const e = this.nr(t, i, s);
        return ((e.actualBoundingBoxAscent || 0) - (e.actualBoundingBoxDescent || 0)) / 2
    }
    nr(t, i, s) {
        const e = s || Ve
          , n = String(i).replace(e, "0");
        if (this.Qe.has(n))
            return O(this.Qe.get(n)).sr;
        if (this.Ke === this.tr) {
            const o = this.Je[this.Ge];
            delete this.Je[this.Ge],
            this.Qe.delete(o),
            this.Ge++,
            this.Ke--
        }
        t.save(),
        t.textBaseline = "middle";
        const r = t.measureText(n);
        return t.restore(),
        r.width === 0 && i.length || (this.Qe.set(n, {
            sr: r,
            er: this.Ze
        }),
        this.Je[this.Ze] = n,
        this.Ke++,
        this.Ze++),
        r
    }
}
class Ae {
    constructor(t) {
        this.rr = null,
        this.k = null,
        this.hr = "right",
        this.lr = t
    }
    ar(t, i, s) {
        this.rr = t,
        this.k = i,
        this.hr = s
    }
    K(t) {
        this.k !== null && this.rr !== null && this.rr.K(t, this.k, this.lr, this.hr)
    }
}
class $s {
    constructor(t, i, s) {
        this._r = t,
        this.lr = new lt(50),
        this.ur = i,
        this.F = s,
        this.j = -1,
        this.Wt = new Ae(this.lr)
    }
    gt() {
        const t = this.F.cr(this.ur);
        if (t === null)
            return null;
        const i = t.dr(this.ur) ? t.vr() : this.ur.Dt();
        if (i === null)
            return null;
        const s = t.pr(i);
        if (s === "overlay")
            return null;
        const e = this.F.mr();
        return e.P !== this.j && (this.j = e.P,
        this.lr.ir()),
        this.Wt.ar(this._r.Ii(), e, s),
        this.Wt
    }
}
class je extends W {
    constructor() {
        super(...arguments),
        this.zt = null
    }
    J(t) {
        this.zt = t
    }
    br(t, i) {
        var s;
        if (!(!((s = this.zt) === null || s === void 0) && s.yt))
            return null;
        const {st: e, et: n, wr: r} = this.zt;
        return i >= e - n - 7 && i <= e + n + 7 ? {
            gr: this.zt,
            wr: r
        } : null
    }
    Z({context: t, bitmapSize: i, horizontalPixelRatio: s, verticalPixelRatio: e}) {
        if (this.zt === null || this.zt.yt === !1)
            return;
        const n = Math.round(this.zt.st * e);
        n < 0 || n > i.height || (t.lineCap = "butt",
        t.strokeStyle = this.zt.O,
        t.lineWidth = Math.floor(this.zt.et * s),
        U(t, this.zt.Nt),
        Ms(t, n, 0, i.width))
    }
}
class fi {
    constructor(t) {
        this.Mr = {
            st: 0,
            O: "rgba(0, 0, 0, 0)",
            et: 1,
            Nt: 0,
            yt: !1
        },
        this.Sr = new je,
        this.ft = !0,
        this.Ls = t,
        this.Es = t.$t(),
        this.Sr.J(this.Mr)
    }
    bt() {
        this.ft = !0
    }
    gt() {
        return this.Ls.yt() ? (this.ft && (this.kr(),
        this.ft = !1),
        this.Sr) : null
    }
}
class Ue extends fi {
    constructor(t) {
        super(t)
    }
    kr() {
        this.Mr.yt = !1;
        const t = this.Ls.Dt()
          , i = t.yr().yr;
        if (i !== 2 && i !== 3)
            return;
        const s = this.Ls.W();
        if (!s.baseLineVisible || !this.Ls.yt())
            return;
        const e = this.Ls.Ct();
        e !== null && (this.Mr.yt = !0,
        this.Mr.st = t.Rt(e.Ot, e.Ot),
        this.Mr.O = s.baseLineColor,
        this.Mr.et = s.baseLineWidth,
        this.Mr.Nt = s.baseLineStyle)
    }
}
class Je extends W {
    constructor() {
        super(...arguments),
        this.zt = null
    }
    J(t) {
        this.zt = t
    }
    He() {
        return this.zt
    }
    Z({context: t, horizontalPixelRatio: i, verticalPixelRatio: s}) {
        const e = this.zt;
        if (e === null)
            return;
        const n = Math.max(1, Math.floor(i))
          , r = n % 2 / 2
          , o = Math.round(e.Xe.x * i) + r
          , l = e.Xe.y * s;
        t.fillStyle = e.Cr,
        t.beginPath();
        const a = Math.max(2, 1.5 * e.Tr) * i;
        t.arc(o, l, a, 0, 2 * Math.PI, !1),
        t.fill(),
        t.fillStyle = e.Pr,
        t.beginPath(),
        t.arc(o, l, e.ht * i, 0, 2 * Math.PI, !1),
        t.fill(),
        t.lineWidth = n,
        t.strokeStyle = e.Rr,
        t.beginPath(),
        t.arc(o, l, e.ht * i + n / 2, 0, 2 * Math.PI, !1),
        t.stroke()
    }
}
const Ke = [{
    Dr: 0,
    Or: .25,
    Ar: 4,
    Br: 10,
    Vr: .25,
    Ir: 0,
    zr: .4,
    Lr: .8
}, {
    Dr: .25,
    Or: .525,
    Ar: 10,
    Br: 14,
    Vr: 0,
    Ir: 0,
    zr: .8,
    Lr: 0
}, {
    Dr: .525,
    Or: 1,
    Ar: 14,
    Br: 14,
    Vr: 0,
    Ir: 0,
    zr: 0,
    Lr: 0
}];
function $i(h, t, i, s) {
    return function(e, n) {
        if (e === "transparent")
            return e;
        const r = Ct(e)
          , o = r[3];
        return `rgba(${r[0]}, ${r[1]}, ${r[2]}, ${n * o})`
    }(h, i + (s - i) * t)
}
function Ri(h, t) {
    const i = h % 2600 / 2600;
    let s;
    for (const l of Ke)
        if (i >= l.Dr && i <= l.Or) {
            s = l;
            break
        }
    I(s !== void 0, "Last price animation internal logic error");
    const e = (i - s.Dr) / (s.Or - s.Dr);
    return {
        Pr: $i(t, e, s.Vr, s.Ir),
        Rr: $i(t, e, s.zr, s.Lr),
        ht: (n = e,
        r = s.Ar,
        o = s.Br,
        r + (o - r) * n)
    };
    var n, r, o
}
class Ze {
    constructor(t) {
        this.Wt = new Je,
        this.ft = !0,
        this.Er = !0,
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
        this.Wr.W().lastPriceAnimation === 2) {
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
        this.Er = !0
    }
    yt() {
        return this.Wr.W().lastPriceAnimation !== 0
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
        this.Er = !1) : this.Er && (this.qr(),
        this.Er = !1),
        this.Wt
    }
    Mt() {
        this.Wt.J(null);
        const t = this.Wr.$t().St()
          , i = t.Xs()
          , s = this.Wr.Ct();
        if (i === null || s === null)
            return;
        const e = this.Wr.Yr(!0);
        if (e.Xr || !i.Kr(e.se))
            return;
        const n = {
            x: t.It(e.se),
            y: this.Wr.Dt().Rt(e._t, s.Ot)
        }
          , r = e.O
          , o = this.Wr.W().lineWidth
          , l = Ri(this.Zr(), r);
        this.Wt.J({
            Cr: r,
            Tr: o,
            Pr: l.Pr,
            Rr: l.Rr,
            ht: l.ht,
            Xe: n
        })
    }
    qr() {
        const t = this.Wt.He();
        if (t !== null) {
            const i = Ri(this.Zr(), t.Cr);
            t.Pr = i.Pr,
            t.Rr = i.Rr,
            t.ht = i.ht
        }
    }
    Zr() {
        return this.Ur() ? performance.now() - this.Nr : 2599
    }
}
function st(h, t) {
    return Os(Math.min(Math.max(h, 12), 30) * t)
}
function at(h, t) {
    switch (h) {
    case "arrowDown":
    case "arrowUp":
        return st(t, 1);
    case "circle":
        return st(t, .8);
    case "square":
        return st(t, .7)
    }
}
function Rs(h) {
    return function(t) {
        const i = Math.ceil(t);
        return i % 2 != 0 ? i - 1 : i
    }(st(h, 1))
}
function Di(h) {
    return Math.max(st(h, .1), 3)
}
function Bi(h, t, i) {
    return t ? h : i ? Math.ceil(h / 2) : 0
}
function Ds(h, t, i, s, e) {
    const n = at("square", i)
      , r = (n - 1) / 2
      , o = h - r
      , l = t - r;
    return s >= o && s <= o + n && e >= l && e <= l + n
}
function Fi(h, t, i, s) {
    const e = (at("arrowUp", s) - 1) / 2 * i.Gr
      , n = (Os(s / 2) - 1) / 2 * i.Gr;
    t.beginPath(),
    h ? (t.moveTo(i.nt - e, i.st),
    t.lineTo(i.nt, i.st - e),
    t.lineTo(i.nt + e, i.st),
    t.lineTo(i.nt + n, i.st),
    t.lineTo(i.nt + n, i.st + e),
    t.lineTo(i.nt - n, i.st + e),
    t.lineTo(i.nt - n, i.st)) : (t.moveTo(i.nt - e, i.st),
    t.lineTo(i.nt, i.st + e),
    t.lineTo(i.nt + e, i.st),
    t.lineTo(i.nt + n, i.st),
    t.lineTo(i.nt + n, i.st - e),
    t.lineTo(i.nt - n, i.st - e),
    t.lineTo(i.nt - n, i.st)),
    t.fill()
}
function He(h, t, i, s, e, n) {
    return Ds(t, i, s, e, n)
}
class Ge extends W {
    constructor() {
        super(...arguments),
        this.zt = null,
        this.lr = new lt,
        this.j = -1,
        this.H = "",
        this.Jr = ""
    }
    J(t) {
        this.zt = t
    }
    ar(t, i) {
        this.j === t && this.H === i || (this.j = t,
        this.H = i,
        this.Jr = Q(t, i),
        this.lr.ir())
    }
    br(t, i) {
        if (this.zt === null || this.zt.tt === null)
            return null;
        for (let s = this.zt.tt.from; s < this.zt.tt.to; s++) {
            const e = this.zt.it[s];
            if (Ye(e, t, i))
                return {
                    gr: e.Qr,
                    wr: e.wr
                }
        }
        return null
    }
    Z({context: t, horizontalPixelRatio: i, verticalPixelRatio: s}, e, n) {
        if (this.zt !== null && this.zt.tt !== null) {
            t.textBaseline = "middle",
            t.font = this.Jr;
            for (let r = this.zt.tt.from; r < this.zt.tt.to; r++) {
                const o = this.zt.it[r];
                o.Zt !== void 0 && (o.Zt.Hi = this.lr.xi(t, o.Zt.th),
                o.Zt.Vt = this.j,
                o.Zt.nt = o.nt - o.Zt.Hi / 2),
                Xe(o, t, i, s)
            }
        }
    }
}
function Xe(h, t, i, s) {
    t.fillStyle = h.O,
    h.Zt !== void 0 && function(e, n, r, o, l, a) {
        e.save(),
        e.scale(l, a),
        e.fillText(n, r, o),
        e.restore()
    }(t, h.Zt.th, h.Zt.nt, h.Zt.st, i, s),
    function(e, n, r) {
        if (e.Ks !== 0) {
            switch (e.ih) {
            case "arrowDown":
                return void Fi(!1, n, r, e.Ks);
            case "arrowUp":
                return void Fi(!0, n, r, e.Ks);
            case "circle":
                return void function(o, l, a) {
                    const u = (at("circle", a) - 1) / 2;
                    o.beginPath(),
                    o.arc(l.nt, l.st, u * l.Gr, 0, 2 * Math.PI, !1),
                    o.fill()
                }(n, r, e.Ks);
            case "square":
                return void function(o, l, a) {
                    const u = at("square", a)
                      , c = (u - 1) * l.Gr / 2
                      , d = l.nt - c
                      , f = l.st - c;
                    o.fillRect(d, f, u * l.Gr, u * l.Gr)
                }(n, r, e.Ks)
            }
            e.ih
        }
    }(h, t, function(e, n, r) {
        const o = Math.max(1, Math.floor(n)) % 2 / 2;
        return {
            nt: Math.round(e.nt * n) + o,
            st: e.st * r,
            Gr: n
        }
    }(h, i, s))
}
function Ye(h, t, i) {
    return !(h.Zt === void 0 || !function(s, e, n, r, o, l) {
        const a = r / 2;
        return o >= s && o <= s + n && l >= e - a && l <= e + a
    }(h.Zt.nt, h.Zt.st, h.Zt.Hi, h.Zt.Vt, t, i)) || function(s, e, n) {
        if (s.Ks === 0)
            return !1;
        switch (s.ih) {
        case "arrowDown":
        case "arrowUp":
            return He(0, s.nt, s.st, s.Ks, e, n);
        case "circle":
            return function(r, o, l, a, u) {
                const c = 2 + at("circle", l) / 2
                  , d = r - a
                  , f = o - u;
                return Math.sqrt(d * d + f * f) <= c
            }(s.nt, s.st, s.Ks, e, n);
        case "square":
            return Ds(s.nt, s.st, s.Ks, e, n)
        }
    }(h, t, i)
}
function Qe(h, t, i, s, e, n, r, o, l) {
    const a = $(i) ? i : i.xe
      , u = $(i) ? i : i.ge
      , c = $(i) ? i : i.Me
      , d = $(t.size) ? Math.max(t.size, 0) : 1
      , f = Rs(o.he()) * d
      , m = f / 2;
    switch (h.Ks = f,
    t.position) {
    case "inBar":
        return h.st = r.Rt(a, l),
        void (h.Zt !== void 0 && (h.Zt.st = h.st + m + n + .6 * e));
    case "aboveBar":
        return h.st = r.Rt(u, l) - m - s.nh,
        h.Zt !== void 0 && (h.Zt.st = h.st - m - .6 * e,
        s.nh += 1.2 * e),
        void (s.nh += f + n);
    case "belowBar":
        return h.st = r.Rt(c, l) + m + s.sh,
        h.Zt !== void 0 && (h.Zt.st = h.st + m + n + .6 * e,
        s.sh += 1.2 * e),
        void (s.sh += f + n)
    }
    t.position
}
class qe {
    constructor(t, i) {
        this.ft = !0,
        this.eh = !0,
        this.rh = !0,
        this.hh = null,
        this.ah = null,
        this.Wt = new Ge,
        this.Wr = t,
        this.$i = i,
        this.zt = {
            it: [],
            tt: null
        }
    }
    bt(t) {
        this.ft = !0,
        this.rh = !0,
        t === "data" && (this.eh = !0,
        this.ah = null)
    }
    gt(t) {
        if (!this.Wr.yt())
            return null;
        this.ft && this.oh();
        const i = this.$i.W().layout;
        return this.Wt.ar(i.fontSize, i.fontFamily),
        this.Wt.J(this.zt),
        this.Wt
    }
    _h() {
        if (this.rh) {
            if (this.Wr.uh().length > 0) {
                const t = this.$i.St().he()
                  , i = Di(t)
                  , s = 1.5 * Rs(t) + 2 * i
                  , e = this.dh();
                this.hh = {
                    above: Bi(s, e.aboveBar, e.inBar),
                    below: Bi(s, e.belowBar, e.inBar)
                }
            } else
                this.hh = null;
            this.rh = !1
        }
        return this.hh
    }
    dh() {
        return this.ah === null && (this.ah = this.Wr.uh().reduce((t,i)=>(t[i.position] || (t[i.position] = !0),
        t), {
            inBar: !1,
            aboveBar: !1,
            belowBar: !1
        })),
        this.ah
    }
    oh() {
        const t = this.Wr.Dt()
          , i = this.$i.St()
          , s = this.Wr.uh();
        this.eh && (this.zt.it = s.map(u=>({
            ot: u.time,
            nt: 0,
            st: 0,
            Ks: 0,
            ih: u.shape,
            O: u.color,
            Qr: u.Qr,
            wr: u.id,
            Zt: void 0
        })),
        this.eh = !1);
        const e = this.$i.W().layout;
        this.zt.tt = null;
        const n = i.Xs();
        if (n === null)
            return;
        const r = this.Wr.Ct();
        if (r === null || this.zt.it.length === 0)
            return;
        let o = NaN;
        const l = Di(i.he())
          , a = {
            nh: l,
            sh: l
        };
        this.zt.tt = Ws(this.zt.it, n, !0);
        for (let u = this.zt.tt.from; u < this.zt.tt.to; u++) {
            const c = s[u];
            c.time !== o && (a.nh = l,
            a.sh = l,
            o = c.time);
            const d = this.zt.it[u];
            d.nt = i.It(c.time),
            c.text !== void 0 && c.text.length > 0 && (d.Zt = {
                th: c.text,
                nt: 0,
                st: 0,
                Hi: 0,
                Vt: 0
            });
            const f = this.Wr.fh(c.time);
            f !== null && Qe(d, c, f, a, e.fontSize, l, t, i, r.Ot)
        }
        this.ft = !1
    }
}
class th extends fi {
    constructor(t) {
        super(t)
    }
    kr() {
        const t = this.Mr;
        t.yt = !1;
        const i = this.Ls.W();
        if (!i.priceLineVisible || !this.Ls.yt())
            return;
        const s = this.Ls.Yr(i.priceLineSource === 0);
        s.Xr || (t.yt = !0,
        t.st = s.ki,
        t.O = this.Ls.ph(s.O),
        t.et = i.priceLineWidth,
        t.Nt = i.priceLineStyle)
    }
}
class ih extends kt {
    constructor(t) {
        super(),
        this.jt = t
    }
    zi(t, i, s) {
        t.yt = !1,
        i.yt = !1;
        const e = this.jt;
        if (!e.yt())
            return;
        const n = e.W()
          , r = n.lastValueVisible
          , o = e.mh() !== ""
          , l = n.seriesLastValueMode === 0
          , a = e.Yr(!1);
        if (a.Xr)
            return;
        r && (t.Zt = this.bh(a, r, l),
        t.yt = t.Zt.length !== 0),
        (o || l) && (i.Zt = this.wh(a, r, o, l),
        i.yt = i.Zt.length > 0);
        const u = e.ph(a.O)
          , c = Lt(u);
        s.t = c.t,
        s.ki = a.ki,
        i.At = e.$t().Bt(a.ki / e.Dt().Vt()),
        t.At = u,
        t.O = c.i,
        i.O = c.i
    }
    wh(t, i, s, e) {
        let n = "";
        const r = this.jt.mh();
        return s && r.length !== 0 && (n += `${r} `),
        i && e && (n += this.jt.Dt().gh() ? t.Mh : t.xh),
        n.trim()
    }
    bh(t, i, s) {
        return i ? s ? this.jt.Dt().gh() ? t.xh : t.Mh : t.Zt : ""
    }
}
function Ii(h, t, i, s) {
    const e = Number.isFinite(t)
      , n = Number.isFinite(i);
    return e && n ? h(t, i) : e || n ? e ? t : i : s
}
class k {
    constructor(t, i) {
        this.Sh = t,
        this.kh = i
    }
    yh(t) {
        return t !== null && this.Sh === t.Sh && this.kh === t.kh
    }
    Ch() {
        return new k(this.Sh,this.kh)
    }
    Th() {
        return this.Sh
    }
    Ph() {
        return this.kh
    }
    Rh() {
        return this.kh - this.Sh
    }
    Ni() {
        return this.kh === this.Sh || Number.isNaN(this.kh) || Number.isNaN(this.Sh)
    }
    ts(t) {
        return t === null ? this : new k(Ii(Math.min, this.Th(), t.Th(), -1 / 0),Ii(Math.max, this.Ph(), t.Ph(), 1 / 0))
    }
    Dh(t) {
        if (!$(t) || this.kh - this.Sh === 0)
            return;
        const i = .5 * (this.kh + this.Sh);
        let s = this.kh - i
          , e = this.Sh - i;
        s *= t,
        e *= t,
        this.kh = i + s,
        this.Sh = i + e
    }
    Oh(t) {
        $(t) && (this.kh += t,
        this.Sh += t)
    }
    Ah() {
        return {
            minValue: this.Sh,
            maxValue: this.kh
        }
    }
    static Bh(t) {
        return t === null ? null : new k(t.minValue,t.maxValue)
    }
}
class zt {
    constructor(t, i) {
        this.Vh = t,
        this.Ih = i || null
    }
    zh() {
        return this.Vh
    }
    Lh() {
        return this.Ih
    }
    Ah() {
        return this.Vh === null ? null : {
            priceRange: this.Vh.Ah(),
            margins: this.Ih || void 0
        }
    }
    static Bh(t) {
        return t === null ? null : new zt(k.Bh(t.priceRange),t.margins)
    }
}
class sh extends fi {
    constructor(t, i) {
        super(t),
        this.Eh = i
    }
    kr() {
        const t = this.Mr;
        t.yt = !1;
        const i = this.Eh.W();
        if (!this.Ls.yt() || !i.lineVisible)
            return;
        const s = this.Eh.Nh();
        s !== null && (t.yt = !0,
        t.st = s,
        t.O = i.color,
        t.et = i.lineWidth,
        t.Nt = i.lineStyle,
        t.wr = this.Eh.W().id)
    }
}
class eh extends kt {
    constructor(t, i) {
        super(),
        this.Wr = t,
        this.Eh = i
    }
    zi(t, i, s) {
        t.yt = !1,
        i.yt = !1;
        const e = this.Eh.W()
          , n = e.axisLabelVisible
          , r = e.title !== ""
          , o = this.Wr;
        if (!n || !o.yt())
            return;
        const l = this.Eh.Nh();
        if (l === null)
            return;
        r && (i.Zt = e.title,
        i.yt = !0),
        i.At = o.$t().Bt(l / o.Dt().Vt()),
        t.Zt = this.Fh(e.price),
        t.yt = !0;
        const a = Lt(e.axisLabelColor || e.color);
        s.t = a.t;
        const u = e.axisLabelTextColor || a.i;
        t.O = u,
        i.O = u,
        s.ki = l
    }
    Fh(t) {
        const i = this.Wr.Ct();
        return i === null ? "" : this.Wr.Dt().Fi(t, i.Ot)
    }
}
class hh {
    constructor(t, i) {
        this.Wr = t,
        this.cn = i,
        this.Wh = new sh(t,this),
        this._r = new eh(t,this),
        this.jh = new $s(this._r,t,t.$t())
    }
    Hh(t) {
        P(this.cn, t),
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
        const s = t.Ct();
        return s === null ? null : i.Rt(this.cn.price, s.Ot)
    }
}
class nh extends ui {
    constructor(t) {
        super(),
        this.$i = t
    }
    $t() {
        return this.$i
    }
}
const rh = {
    Bar: (h,t,i,s)=>{
        var e;
        const n = t.upColor
          , r = t.downColor
          , o = v(h(i, s))
          , l = G(o.Ot[0]) <= G(o.Ot[3]);
        return {
            ue: (e = o.O) !== null && e !== void 0 ? e : l ? n : r
        }
    }
    ,
    Candlestick: (h,t,i,s)=>{
        var e, n, r;
        const o = t.upColor
          , l = t.downColor
          , a = t.borderUpColor
          , u = t.borderDownColor
          , c = t.wickUpColor
          , d = t.wickDownColor
          , f = v(h(i, s))
          , m = G(f.Ot[0]) <= G(f.Ot[3]);
        return {
            ue: (e = f.O) !== null && e !== void 0 ? e : m ? o : l,
            Ee: (n = f.At) !== null && n !== void 0 ? n : m ? a : u,
            Le: (r = f.Xh) !== null && r !== void 0 ? r : m ? c : d
        }
    }
    ,
    Custom: (h,t,i,s)=>{
        var e;
        return {
            ue: (e = v(h(i, s)).O) !== null && e !== void 0 ? e : t.color
        }
    }
    ,
    Area: (h,t,i,s)=>{
        var e, n, r, o;
        const l = v(h(i, s));
        return {
            ue: (e = l.lt) !== null && e !== void 0 ? e : t.lineColor,
            lt: (n = l.lt) !== null && n !== void 0 ? n : t.lineColor,
            Ts: (r = l.Ts) !== null && r !== void 0 ? r : t.topColor,
            Ps: (o = l.Ps) !== null && o !== void 0 ? o : t.bottomColor
        }
    }
    ,
    Baseline: (h,t,i,s)=>{
        var e, n, r, o, l, a;
        const u = v(h(i, s));
        return {
            ue: u.Ot[3] >= t.baseValue.price ? t.topLineColor : t.bottomLineColor,
            Pe: (e = u.Pe) !== null && e !== void 0 ? e : t.topLineColor,
            Re: (n = u.Re) !== null && n !== void 0 ? n : t.bottomLineColor,
            Se: (r = u.Se) !== null && r !== void 0 ? r : t.topFillColor1,
            ke: (o = u.ke) !== null && o !== void 0 ? o : t.topFillColor2,
            ye: (l = u.ye) !== null && l !== void 0 ? l : t.bottomFillColor1,
            Ce: (a = u.Ce) !== null && a !== void 0 ? a : t.bottomFillColor2
        }
    }
    ,
    Line: (h,t,i,s)=>{
        var e, n;
        const r = v(h(i, s));
        return {
            ue: (e = r.O) !== null && e !== void 0 ? e : t.color,
            lt: (n = r.O) !== null && n !== void 0 ? n : t.color
        }
    }
    ,
    Histogram: (h,t,i,s)=>{
        var e;
        return {
            ue: (e = v(h(i, s)).O) !== null && e !== void 0 ? e : t.color
        }
    }
};
class oh {
    constructor(t) {
        this.Kh = (i,s)=>s !== void 0 ? s.Ot : this.Wr.In().Zh(i),
        this.Wr = t,
        this.Gh = rh[t.Jh()]
    }
    Hs(t, i) {
        return this.Gh(this.Kh, this.Wr.W(), t, i)
    }
}
var Vi;
(function(h) {
    h[h.NearestLeft = -1] = "NearestLeft",
    h[h.None = 0] = "None",
    h[h.NearestRight = 1] = "NearestRight"
}
)(Vi || (Vi = {}));
const F = 30;
class lh {
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
    Vn() {
        return this.Ks() > 0 ? this.el(this.Qh.length - 1) : null
    }
    Ks() {
        return this.Qh.length
    }
    Ni() {
        return this.Ks() === 0
    }
    Kr(t) {
        return this.rl(t, 0) !== null
    }
    Zh(t) {
        return this.hl(t)
    }
    hl(t, i=0) {
        const s = this.rl(t, i);
        return s === null ? null : Object.assign(Object.assign({}, this.ll(s)), {
            se: this.el(s)
        })
    }
    ie() {
        return this.Qh
    }
    al(t, i, s) {
        if (this.Ni())
            return null;
        let e = null;
        for (const n of s)
            e = pt(e, this.ol(t, i, n));
        return e
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
        const s = this._l(t);
        if (s === null && i !== 0)
            switch (i) {
            case -1:
                return this.ul(t);
            case 1:
                return this.cl(t);
            default:
                throw new TypeError("Unknown search mode")
            }
        return s
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
        return ct(this.Qh, t, (i,s)=>i.se < s)
    }
    fl(t) {
        return Ps(this.Qh, t, (i,s)=>i.se > s)
    }
    vl(t, i, s) {
        let e = null;
        for (let n = t; n < i; n++) {
            const r = this.Qh[n].Ot[s];
            Number.isNaN(r) || (e === null ? e = {
                pl: r,
                ml: r
            } : (r < e.pl && (e.pl = r),
            r > e.ml && (e.ml = r)))
        }
        return e
    }
    ol(t, i, s) {
        if (this.Ni())
            return null;
        let e = null;
        const n = v(this.sl())
          , r = v(this.Vn())
          , o = Math.max(t, n)
          , l = Math.min(i, r)
          , a = Math.ceil(o / F) * F
          , u = Math.max(a, Math.floor(l / F) * F);
        {
            const d = this.dl(o)
              , f = this.fl(Math.min(l, a, i));
            e = pt(e, this.vl(d, f, s))
        }
        let c = this.tl.get(s);
        c === void 0 && (c = new Map,
        this.tl.set(s, c));
        for (let d = Math.max(a + 1, o); d < u; d += F) {
            const f = Math.floor(d / F);
            let m = c.get(f);
            if (m === void 0) {
                const p = this.dl(f * F)
                  , b = this.fl((f + 1) * F - 1);
                m = this.vl(p, b, s),
                c.set(f, m)
            }
            e = pt(e, m)
        }
        {
            const d = this.dl(u)
              , f = this.fl(l);
            e = pt(e, this.vl(d, f, s))
        }
        return e
    }
}
function pt(h, t) {
    return h === null ? t : t === null ? h : {
        pl: Math.min(h.pl, t.pl),
        ml: Math.max(h.ml, t.ml)
    }
}
class ah {
    constructor(t) {
        this.bl = t
    }
    K(t, i, s) {
        this.bl.draw(t)
    }
    wl(t, i, s) {
        var e, n;
        (n = (e = this.bl).drawBackground) === null || n === void 0 || n.call(e, t)
    }
}
class Ft {
    constructor(t) {
        this.Qe = null,
        this.wn = t
    }
    gt() {
        var t;
        const i = this.wn.renderer();
        if (i === null)
            return null;
        if (((t = this.Qe) === null || t === void 0 ? void 0 : t.gl) === i)
            return this.Qe.Ml;
        const s = new ah(i);
        return this.Qe = {
            gl: i,
            Ml: s
        },
        s
    }
    xl() {
        var t, i, s;
        return (s = (i = (t = this.wn).zOrder) === null || i === void 0 ? void 0 : i.call(t)) !== null && s !== void 0 ? s : "normal"
    }
}
function Bs(h) {
    var t, i, s, e, n;
    return {
        Zt: h.text(),
        ki: h.coordinate(),
        Si: (t = h.fixedCoordinate) === null || t === void 0 ? void 0 : t.call(h),
        O: h.textColor(),
        t: h.backColor(),
        yt: (s = (i = h.visible) === null || i === void 0 ? void 0 : i.call(h)) === null || s === void 0 || s,
        hi: (n = (e = h.tickVisible) === null || e === void 0 ? void 0 : e.call(h)) === null || n === void 0 || n
    }
}
class uh {
    constructor(t, i) {
        this.Wt = new Cs,
        this.Sl = t,
        this.kl = i
    }
    gt() {
        return this.Wt.J(Object.assign({
            Hi: this.kl.Hi()
        }, Bs(this.Sl))),
        this.Wt
    }
}
class ch extends kt {
    constructor(t, i) {
        super(),
        this.Sl = t,
        this.Li = i
    }
    zi(t, i, s) {
        const e = Bs(this.Sl);
        s.t = e.t,
        t.O = e.O;
        const n = 2 / 12 * this.Li.P();
        s.wi = n,
        s.gi = n,
        s.ki = e.ki,
        s.Si = e.Si,
        t.Zt = e.Zt,
        t.yt = e.yt,
        t.hi = e.hi
    }
}
class dh {
    constructor(t, i) {
        this.yl = null,
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
        (i = (t = this.Dl).updateAllViews) === null || i === void 0 || i.call(t)
    }
    Pn() {
        var t, i, s, e;
        const n = (s = (i = (t = this.Dl).paneViews) === null || i === void 0 ? void 0 : i.call(t)) !== null && s !== void 0 ? s : [];
        if (((e = this.yl) === null || e === void 0 ? void 0 : e.gl) === n)
            return this.yl.Ml;
        const r = n.map(o=>new Ft(o));
        return this.yl = {
            gl: n,
            Ml: r
        },
        r
    }
    Qi() {
        var t, i, s, e;
        const n = (s = (i = (t = this.Dl).timeAxisViews) === null || i === void 0 ? void 0 : i.call(t)) !== null && s !== void 0 ? s : [];
        if (((e = this.Cl) === null || e === void 0 ? void 0 : e.gl) === n)
            return this.Cl.Ml;
        const r = this.Wr.$t().St()
          , o = n.map(l=>new uh(l,r));
        return this.Cl = {
            gl: n,
            Ml: o
        },
        o
    }
    Rn() {
        var t, i, s, e;
        const n = (s = (i = (t = this.Dl).priceAxisViews) === null || i === void 0 ? void 0 : i.call(t)) !== null && s !== void 0 ? s : [];
        if (((e = this.Tl) === null || e === void 0 ? void 0 : e.gl) === n)
            return this.Tl.Ml;
        const r = this.Wr.Dt()
          , o = n.map(l=>new ch(l,r));
        return this.Tl = {
            gl: n,
            Ml: o
        },
        o
    }
    Al() {
        var t, i, s, e;
        const n = (s = (i = (t = this.Dl).priceAxisPaneViews) === null || i === void 0 ? void 0 : i.call(t)) !== null && s !== void 0 ? s : [];
        if (((e = this.Pl) === null || e === void 0 ? void 0 : e.gl) === n)
            return this.Pl.Ml;
        const r = n.map(o=>new Ft(o));
        return this.Pl = {
            gl: n,
            Ml: r
        },
        r
    }
    Bl() {
        var t, i, s, e;
        const n = (s = (i = (t = this.Dl).timeAxisPaneViews) === null || i === void 0 ? void 0 : i.call(t)) !== null && s !== void 0 ? s : [];
        if (((e = this.Rl) === null || e === void 0 ? void 0 : e.gl) === n)
            return this.Rl.Ml;
        const r = n.map(o=>new Ft(o));
        return this.Rl = {
            gl: n,
            Ml: r
        },
        r
    }
    Vl(t, i) {
        var s, e, n;
        return (n = (e = (s = this.Dl).autoscaleInfo) === null || e === void 0 ? void 0 : e.call(s, t, i)) !== null && n !== void 0 ? n : null
    }
    br(t, i) {
        var s, e, n;
        return (n = (e = (s = this.Dl).hitTest) === null || e === void 0 ? void 0 : e.call(s, t, i)) !== null && n !== void 0 ? n : null
    }
}
function It(h, t, i, s) {
    h.forEach(e=>{
        t(e).forEach(n=>{
            n.xl() === i && s.push(n)
        }
        )
    }
    )
}
function Vt(h) {
    return h.Pn()
}
function fh(h) {
    return h.Al()
}
function mh(h) {
    return h.Bl()
}
class mi extends nh {
    constructor(t, i, s, e, n) {
        super(t),
        this.zt = new lh,
        this.Wh = new th(this),
        this.Il = [],
        this.zl = new Ue(this),
        this.Ll = null,
        this.El = null,
        this.Nl = [],
        this.Fl = [],
        this.Wl = null,
        this.jl = [],
        this.cn = i,
        this.Hl = s;
        const r = new ih(this);
        this.rn = [r],
        this.jh = new $s(r,this,t),
        s !== "Area" && s !== "Line" && s !== "Baseline" || (this.Ll = new Ze(this)),
        this.$l(),
        this.Ul(n)
    }
    S() {
        this.Wl !== null && clearTimeout(this.Wl)
    }
    ph(t) {
        return this.cn.priceLineColor || t
    }
    Yr(t) {
        const i = {
            Xr: !0
        }
          , s = this.Dt();
        if (this.$t().St().Ni() || s.Ni() || this.zt.Ni())
            return i;
        const e = this.$t().St().Xs()
          , n = this.Ct();
        if (e === null || n === null)
            return i;
        let r, o;
        if (t) {
            const c = this.zt.nl();
            if (c === null)
                return i;
            r = c,
            o = c.se
        } else {
            const c = this.zt.hl(e.ui(), -1);
            if (c === null || (r = this.zt.Zh(c.se),
            r === null))
                return i;
            o = c.se
        }
        const l = r.Ot[3]
          , a = this.$s().Hs(o, {
            Ot: r
        })
          , u = s.Rt(l, n.Ot);
        return {
            Xr: !1,
            _t: l,
            Zt: s.Fi(l, n.Ot),
            Mh: s.ql(l),
            xh: s.Yl(l, n.Ot),
            O: a.ue,
            ki: u,
            se: o
        }
    }
    $s() {
        return this.El !== null || (this.El = new oh(this)),
        this.El
    }
    W() {
        return this.cn
    }
    Hh(t) {
        const i = t.priceScaleId;
        i !== void 0 && i !== this.cn.priceScaleId && this.$t().Xl(this, i),
        P(this.cn, t),
        t.priceFormat !== void 0 && (this.$l(),
        this.$t().Kl()),
        this.$t().Zl(this),
        this.$t().Gl(),
        this.wn.bt("options")
    }
    J(t, i) {
        this.zt.J(t),
        this.Jl(),
        this.wn.bt("data"),
        this.dn.bt("data"),
        this.Ll !== null && (i && i.Ql ? this.Ll.Hr() : t.length === 0 && this.Ll.jr());
        const s = this.$t().cr(this);
        this.$t().ta(s),
        this.$t().Zl(this),
        this.$t().Gl(),
        this.$t().$h()
    }
    ia(t) {
        this.Nl = t,
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
        const i = new hh(this,t);
        return this.Il.push(i),
        this.$t().Zl(this),
        i
    }
    ea(t) {
        const i = this.Il.indexOf(t);
        i !== -1 && this.Il.splice(i, 1),
        this.$t().Zl(this)
    }
    Jh() {
        return this.Hl
    }
    Ct() {
        const t = this.ra();
        return t === null ? null : {
            Ot: t.Ot[3],
            ha: t.ot
        }
    }
    ra() {
        const t = this.$t().St().Xs();
        if (t === null)
            return null;
        const i = t.Os();
        return this.zt.hl(i, 1)
    }
    In() {
        return this.zt
    }
    fh(t) {
        const i = this.zt.Zh(t);
        return i === null ? null : this.Hl === "Bar" || this.Hl === "Candlestick" || this.Hl === "Custom" ? {
            we: i.Ot[0],
            ge: i.Ot[1],
            Me: i.Ot[2],
            xe: i.Ot[3]
        } : i.Ot[3]
    }
    la(t) {
        const i = [];
        It(this.jl, Vt, "top", i);
        const s = this.Ll;
        return s !== null && s.yt() && (this.Wl === null && s.Ur() && (this.Wl = setTimeout(()=>{
            this.Wl = null,
            this.$t().aa()
        }
        , 0)),
        s.$r(),
        i.unshift(s)),
        i
    }
    Pn() {
        const t = [];
        this.oa() || t.push(this.zl),
        t.push(this.wn, this.Wh, this.dn);
        const i = this.Il.map(s=>s.Uh());
        return t.push(...i),
        It(this.jl, Vt, "normal", t),
        t
    }
    _a() {
        return this.ua(Vt, "bottom")
    }
    ca(t) {
        return this.ua(fh, t)
    }
    da(t) {
        return this.ua(mh, t)
    }
    fa(t, i) {
        return this.jl.map(s=>s.br(t, i)).filter(s=>s !== null)
    }
    Ji(t) {
        return [this.jh, ...this.Il.map(i=>i.qh())]
    }
    Rn(t, i) {
        if (i !== this.Yi && !this.oa())
            return [];
        const s = [...this.rn];
        for (const e of this.Il)
            s.push(e.Yh());
        return this.jl.forEach(e=>{
            s.push(...e.Rn())
        }
        ),
        s
    }
    Qi() {
        const t = [];
        return this.jl.forEach(i=>{
            t.push(...i.Qi())
        }
        ),
        t
    }
    Vl(t, i) {
        if (this.cn.autoscaleInfoProvider !== void 0) {
            const s = this.cn.autoscaleInfoProvider(()=>{
                const e = this.va(t, i);
                return e === null ? null : e.Ah()
            }
            );
            return zt.Bh(s)
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
        for (const i of this.rn)
            i.bt();
        for (const i of this.Il)
            i.bt();
        this.Wh.bt(),
        this.zl.bt(),
        (t = this.Ll) === null || t === void 0 || t.bt(),
        this.jl.forEach(i=>i.On())
    }
    Dt() {
        return v(super.Dt())
    }
    kt(t) {
        if (!((this.Hl === "Line" || this.Hl === "Area" || this.Hl === "Baseline") && this.cn.crosshairMarkerVisible))
            return null;
        const i = this.zt.Zh(t);
        return i === null ? null : {
            _t: i.Ot[3],
            ht: this.wa(),
            At: this.ga(),
            Pt: this.Ma(),
            Tt: this.xa(t)
        }
    }
    mh() {
        return this.cn.title
    }
    yt() {
        return this.cn.visible
    }
    Sa(t) {
        this.jl.push(new dh(t,this))
    }
    ka(t) {
        this.jl = this.jl.filter(i=>i.Ol() !== t)
    }
    ya() {
        if (this.wn instanceof Bt)
            return t=>this.wn.Fe(t)
    }
    Ca() {
        if (this.wn instanceof Bt)
            return t=>this.wn.We(t)
    }
    oa() {
        return !Et(this.Dt().Ta())
    }
    va(t, i) {
        if (!rt(t) || !rt(i) || this.zt.Ni())
            return null;
        const s = this.Hl === "Line" || this.Hl === "Area" || this.Hl === "Baseline" || this.Hl === "Histogram" ? [3] : [2, 1]
          , e = this.zt.al(t, i, s);
        let n = e !== null ? new k(e.pl,e.ml) : null;
        if (this.Jh() === "Histogram") {
            const o = this.cn.base
              , l = new k(o,o);
            n = n !== null ? n.ts(l) : l
        }
        let r = this.dn._h();
        return this.jl.forEach(o=>{
            const l = o.Vl(t, i);
            if (l != null && l.priceRange) {
                const f = new k(l.priceRange.minValue,l.priceRange.maxValue);
                n = n !== null ? n.ts(f) : f
            }
            var a, u, c, d;
            l != null && l.margins && (a = r,
            u = l.margins,
            r = {
                above: Math.max((c = a == null ? void 0 : a.above) !== null && c !== void 0 ? c : 0, u.above),
                below: Math.max((d = a == null ? void 0 : a.below) !== null && d !== void 0 ? d : 0, u.below)
            })
        }
        ),
        new zt(n,r)
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
                if (t.length !== 0)
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
                const i = this.cn.crosshairMarkerBackgroundColor;
                if (i.length !== 0)
                    return i
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
            this.ba = new Me(this.cn.priceFormat.precision);
            break;
        case "percent":
            this.ba = new zs(this.cn.priceFormat.precision);
            break;
        default:
            {
                const t = Math.pow(10, this.cn.priceFormat.precision);
                this.ba = new Tt(t,this.cn.priceFormat.minMove * t)
            }
        }
        this.Yi !== null && this.Yi.Pa()
    }
    Jl() {
        const t = this.$t().St();
        if (!t.Ra() || this.zt.Ni())
            return void (this.Fl = []);
        const i = v(this.zt.sl());
        this.Fl = this.Nl.map((s,e)=>{
            const n = v(t.Da(s.time, !0))
              , r = n < i ? 1 : -1;
            return {
                time: v(this.zt.hl(n, r)).se,
                position: s.position,
                shape: s.shape,
                color: s.color,
                id: s.id,
                Qr: e,
                text: s.text,
                size: s.size,
                originalTime: s.originalTime
            }
        }
        )
    }
    Ul(t) {
        switch (this.dn = new qe(this,this.$t()),
        this.Hl) {
        case "Bar":
            this.wn = new Ee(this,this.$t());
            break;
        case "Candlestick":
            this.wn = new $e(this,this.$t());
            break;
        case "Line":
            this.wn = new Ie(this,this.$t());
            break;
        case "Custom":
            this.wn = new Bt(this,this.$t(),O(t));
            break;
        case "Area":
            this.wn = new Oe(this,this.$t());
            break;
        case "Baseline":
            this.wn = new We(this,this.$t());
            break;
        case "Histogram":
            this.wn = new Fe(this,this.$t());
            break;
        default:
            throw Error("Unknown chart style assigned: " + this.Hl)
        }
    }
    ua(t, i) {
        const s = [];
        return It(this.jl, t, i, s),
        s
    }
}
class ph {
    constructor(t) {
        this.cn = t
    }
    Oa(t, i, s) {
        let e = t;
        if (this.cn.mode === 0)
            return e;
        const n = s.vn()
          , r = n.Ct();
        if (r === null)
            return e;
        const o = n.Rt(t, r)
          , l = s.Aa().filter(u=>u instanceof mi).reduce((u,c)=>{
            if (s.dr(c) || !c.yt())
                return u;
            const d = c.Dt()
              , f = c.In();
            if (d.Ni() || !f.Kr(i))
                return u;
            const m = f.Zh(i);
            if (m === null)
                return u;
            const p = G(c.Ct());
            return u.concat([d.Rt(m.Ot[3], p.Ot)])
        }
        , []);
        if (l.length === 0)
            return e;
        l.sort((u,c)=>Math.abs(u - o) - Math.abs(c - o));
        const a = l[0];
        return e = n.pn(a, r),
        e
    }
}
class vh extends W {
    constructor() {
        super(...arguments),
        this.zt = null
    }
    J(t) {
        this.zt = t
    }
    Z({context: t, bitmapSize: i, horizontalPixelRatio: s, verticalPixelRatio: e}) {
        if (this.zt === null)
            return;
        const n = Math.max(1, Math.floor(s));
        t.lineWidth = n,
        function(r, o) {
            r.save(),
            r.lineWidth % 2 && r.translate(.5, .5),
            o(),
            r.restore()
        }(t, ()=>{
            const r = v(this.zt);
            if (r.Ba) {
                t.strokeStyle = r.Va,
                U(t, r.Ia),
                t.beginPath();
                for (const o of r.za) {
                    const l = Math.round(o.La * s);
                    t.moveTo(l, -n),
                    t.lineTo(l, i.height + n)
                }
                t.stroke()
            }
            if (r.Ea) {
                t.strokeStyle = r.Na,
                U(t, r.Fa),
                t.beginPath();
                for (const o of r.Wa) {
                    const l = Math.round(o.La * e);
                    t.moveTo(-n, l),
                    t.lineTo(i.width + n, l)
                }
                t.stroke()
            }
        }
        )
    }
}
class bh {
    constructor(t) {
        this.Wt = new vh,
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
                Ea: t.horzLines.visible,
                Ba: t.vertLines.visible,
                Na: t.horzLines.color,
                Va: t.vertLines.color,
                Fa: t.horzLines.style,
                Ia: t.vertLines.style,
                Wa: this.tn.vn().ja(),
                za: (this.tn.$t().St().ja() || []).map(s=>({
                    La: s.coord
                }))
            };
            this.Wt.J(i),
            this.ft = !1
        }
        return this.Wt
    }
}
class gh {
    constructor(t) {
        this.wn = new bh(t)
    }
    Uh() {
        return this.wn
    }
}
const At = {
    Ha: 4,
    $a: 1e-4
};
function X(h, t) {
    const i = 100 * (h - t) / t;
    return t < 0 ? -i : i
}
function wh(h, t) {
    const i = X(h.Th(), t)
      , s = X(h.Ph(), t);
    return new k(i,s)
}
function et(h, t) {
    const i = 100 * (h - t) / t + 100;
    return t < 0 ? -i : i
}
function Sh(h, t) {
    const i = et(h.Th(), t)
      , s = et(h.Ph(), t);
    return new k(i,s)
}
function xt(h, t) {
    const i = Math.abs(h);
    if (i < 1e-15)
        return 0;
    const s = Math.log10(i + t.$a) + t.Ha;
    return h < 0 ? -s : s
}
function ht(h, t) {
    const i = Math.abs(h);
    if (i < 1e-15)
        return 0;
    const s = Math.pow(10, i - t.Ha) - t.$a;
    return h < 0 ? -s : s
}
function it(h, t) {
    if (h === null)
        return null;
    const i = xt(h.Th(), t)
      , s = xt(h.Ph(), t);
    return new k(i,s)
}
function vt(h, t) {
    if (h === null)
        return null;
    const i = ht(h.Th(), t)
      , s = ht(h.Ph(), t);
    return new k(i,s)
}
function jt(h) {
    if (h === null)
        return At;
    const t = Math.abs(h.Ph() - h.Th());
    if (t >= 1 || t < 1e-15)
        return At;
    const i = Math.ceil(Math.abs(Math.log10(t)))
      , s = At.Ha + i;
    return {
        Ha: s,
        $a: 1 / Math.pow(10, s)
    }
}
class Ut {
    constructor(t, i) {
        if (this.Ua = t,
        this.qa = i,
        function(s) {
            if (s < 0)
                return !1;
            for (let e = s; e > 1; e /= 10)
                if (e % 10 != 0)
                    return !1;
            return !0
        }(this.Ua))
            this.Ya = [2, 2.5, 2];
        else {
            this.Ya = [];
            for (let s = this.Ua; s !== 1; ) {
                if (s % 2 == 0)
                    this.Ya.push(2),
                    s /= 2;
                else {
                    if (s % 5 != 0)
                        throw new Error("unexpected base");
                    this.Ya.push(2, 2.5),
                    s /= 5
                }
                if (this.Ya.length > 100)
                    throw new Error("something wrong with base")
            }
        }
    }
    Xa(t, i, s) {
        const e = this.Ua === 0 ? 0 : 1 / this.Ua;
        let n = Math.pow(10, Math.max(0, Math.ceil(Math.log10(t - i))))
          , r = 0
          , o = this.qa[0];
        for (; ; ) {
            const c = mt(n, e, 1e-14) && n > e + 1e-14
              , d = mt(n, s * o, 1e-14)
              , f = mt(n, 1, 1e-14);
            if (!(c && d && f))
                break;
            n /= o,
            o = this.qa[++r % this.qa.length]
        }
        if (n <= e + 1e-14 && (n = e),
        n = Math.max(1, n),
        this.Ya.length > 0 && (l = n,
        a = 1,
        u = 1e-14,
        Math.abs(l - a) < u))
            for (r = 0,
            o = this.Ya[0]; mt(n, s * o, 1e-14) && n > e + 1e-14; )
                n /= o,
                o = this.Ya[++r % this.Ya.length];
        var l, a, u;
        return n
    }
}
class Ai {
    constructor(t, i, s, e) {
        this.Ka = [],
        this.Li = t,
        this.Ua = i,
        this.Za = s,
        this.Ga = e
    }
    Xa(t, i) {
        if (t < i)
            throw new Error("high < low");
        const s = this.Li.Vt()
          , e = (t - i) * this.Ja() / s
          , n = new Ut(this.Ua,[2, 2.5, 2])
          , r = new Ut(this.Ua,[2, 2, 2.5])
          , o = new Ut(this.Ua,[2.5, 2, 2])
          , l = [];
        return l.push(n.Xa(t, i, e), r.Xa(t, i, e), o.Xa(t, i, e)),
        function(a) {
            if (a.length < 1)
                throw Error("array is empty");
            let u = a[0];
            for (let c = 1; c < a.length; ++c)
                a[c] < u && (u = a[c]);
            return u
        }(l)
    }
    Qa() {
        const t = this.Li
          , i = t.Ct();
        if (i === null)
            return void (this.Ka = []);
        const s = t.Vt()
          , e = this.Za(s - 1, i)
          , n = this.Za(0, i)
          , r = this.Li.W().entireTextOnly ? this.io() / 2 : 0
          , o = r
          , l = s - 1 - r
          , a = Math.max(e, n)
          , u = Math.min(e, n);
        if (a === u)
            return void (this.Ka = []);
        let c = this.Xa(a, u)
          , d = a % c;
        d += d < 0 ? c : 0;
        const f = a >= u ? 1 : -1;
        let m = null
          , p = 0;
        for (let b = a - d; b > u; b -= c) {
            const g = this.Ga(b, i, !0);
            m !== null && Math.abs(g - m) < this.Ja() || g < o || g > l || (p < this.Ka.length ? (this.Ka[p].La = g,
            this.Ka[p].no = t.so(b)) : this.Ka.push({
                La: g,
                no: t.so(b)
            }),
            p++,
            m = g,
            t.eo() && (c = this.Xa(b * f, u)))
        }
        this.Ka.length = p
    }
    ja() {
        return this.Ka
    }
    io() {
        return this.Li.P()
    }
    Ja() {
        return Math.ceil(2.5 * this.io())
    }
}
function Fs(h) {
    return h.slice().sort((t,i)=>v(t.Ki()) - v(i.Ki()))
}
var ji;
(function(h) {
    h[h.Normal = 0] = "Normal",
    h[h.Logarithmic = 1] = "Logarithmic",
    h[h.Percentage = 2] = "Percentage",
    h[h.IndexedTo100 = 3] = "IndexedTo100"
}
)(ji || (ji = {}));
const Ui = new zs
  , Ji = new Tt(100,1);
class Mh {
    constructor(t, i, s, e) {
        this.ro = 0,
        this.ho = null,
        this.Vh = null,
        this.lo = null,
        this.ao = {
            oo: !1,
            _o: null
        },
        this.uo = 0,
        this.co = 0,
        this.do = new y,
        this.fo = new y,
        this.vo = [],
        this.po = null,
        this.mo = null,
        this.bo = null,
        this.wo = null,
        this.ba = Ji,
        this.Mo = jt(null),
        this.xo = t,
        this.cn = i,
        this.So = s,
        this.ko = e,
        this.yo = new Ai(this,100,this.Co.bind(this),this.To.bind(this))
    }
    Ta() {
        return this.xo
    }
    W() {
        return this.cn
    }
    Hh(t) {
        if (P(this.cn, t),
        this.Pa(),
        t.mode !== void 0 && this.Po({
            yr: t.mode
        }),
        t.scaleMargins !== void 0) {
            const i = O(t.scaleMargins.top)
              , s = O(t.scaleMargins.bottom);
            if (i < 0 || i > 1)
                throw new Error(`Invalid top margin - expect value between 0 and 1, given=${i}`);
            if (s < 0 || s > 1)
                throw new Error(`Invalid bottom margin - expect value between 0 and 1, given=${s}`);
            if (i + s > 1)
                throw new Error(`Invalid margins - sum of margins must be less than 1, given=${i + s}`);
            this.Ro(),
            this.mo = null
        }
    }
    Do() {
        return this.cn.autoScale
    }
    eo() {
        return this.cn.mode === 1
    }
    gh() {
        return this.cn.mode === 2
    }
    Oo() {
        return this.cn.mode === 3
    }
    yr() {
        return {
            Wn: this.cn.autoScale,
            Ao: this.cn.invertScale,
            yr: this.cn.mode
        }
    }
    Po(t) {
        const i = this.yr();
        let s = null;
        t.Wn !== void 0 && (this.cn.autoScale = t.Wn),
        t.yr !== void 0 && (this.cn.mode = t.yr,
        t.yr !== 2 && t.yr !== 3 || (this.cn.autoScale = !0),
        this.ao.oo = !1),
        i.yr === 1 && t.yr !== i.yr && (function(n, r) {
            if (n === null)
                return !1;
            const o = ht(n.Th(), r)
              , l = ht(n.Ph(), r);
            return isFinite(o) && isFinite(l)
        }(this.Vh, this.Mo) ? (s = vt(this.Vh, this.Mo),
        s !== null && this.Bo(s)) : this.cn.autoScale = !0),
        t.yr === 1 && t.yr !== i.yr && (s = it(this.Vh, this.Mo),
        s !== null && this.Bo(s));
        const e = i.yr !== this.cn.mode;
        e && (i.yr === 2 || this.gh()) && this.Pa(),
        e && (i.yr === 3 || this.Oo()) && this.Pa(),
        t.Ao !== void 0 && i.Ao !== t.Ao && (this.cn.invertScale = t.Ao,
        this.Vo()),
        this.fo.m(i, this.yr())
    }
    Io() {
        return this.fo
    }
    P() {
        return this.So.fontSize
    }
    Vt() {
        return this.ro
    }
    zo(t) {
        this.ro !== t && (this.ro = t,
        this.Ro(),
        this.mo = null)
    }
    Lo() {
        if (this.ho)
            return this.ho;
        const t = this.Vt() - this.Eo() - this.No();
        return this.ho = t,
        t
    }
    zh() {
        return this.Fo(),
        this.Vh
    }
    Bo(t, i) {
        const s = this.Vh;
        (i || s === null && t !== null || s !== null && !s.yh(t)) && (this.mo = null,
        this.Vh = t)
    }
    Ni() {
        return this.Fo(),
        this.ro === 0 || !this.Vh || this.Vh.Ni()
    }
    Wo(t) {
        return this.Ao() ? t : this.Vt() - 1 - t
    }
    Rt(t, i) {
        return this.gh() ? t = X(t, i) : this.Oo() && (t = et(t, i)),
        this.To(t, i)
    }
    Qs(t, i, s) {
        this.Fo();
        const e = this.No()
          , n = v(this.zh())
          , r = n.Th()
          , o = n.Ph()
          , l = this.Lo() - 1
          , a = this.Ao()
          , u = l / (o - r)
          , c = s === void 0 ? 0 : s.from
          , d = s === void 0 ? t.length : s.to
          , f = this.jo();
        for (let m = c; m < d; m++) {
            const p = t[m]
              , b = p._t;
            if (isNaN(b))
                continue;
            let g = b;
            f !== null && (g = f(p._t, i));
            const w = e + u * (g - r)
              , _ = a ? w : this.ro - 1 - w;
            p.st = _
        }
    }
    me(t, i, s) {
        this.Fo();
        const e = this.No()
          , n = v(this.zh())
          , r = n.Th()
          , o = n.Ph()
          , l = this.Lo() - 1
          , a = this.Ao()
          , u = l / (o - r)
          , c = s === void 0 ? 0 : s.from
          , d = s === void 0 ? t.length : s.to
          , f = this.jo();
        for (let m = c; m < d; m++) {
            const p = t[m];
            let b = p.we
              , g = p.ge
              , w = p.Me
              , _ = p.xe;
            f !== null && (b = f(p.we, i),
            g = f(p.ge, i),
            w = f(p.Me, i),
            _ = f(p.xe, i));
            let S = e + u * (b - r)
              , C = a ? S : this.ro - 1 - S;
            p.ve = C,
            S = e + u * (g - r),
            C = a ? S : this.ro - 1 - S,
            p.ce = C,
            S = e + u * (w - r),
            C = a ? S : this.ro - 1 - S,
            p.de = C,
            S = e + u * (_ - r),
            C = a ? S : this.ro - 1 - S,
            p.pe = C
        }
    }
    pn(t, i) {
        const s = this.Co(t, i);
        return this.Ho(s, i)
    }
    Ho(t, i) {
        let s = t;
        return this.gh() ? s = function(e, n) {
            return n < 0 && (e = -e),
            e / 100 * n + n
        }(s, i) : this.Oo() && (s = function(e, n) {
            return e -= 100,
            n < 0 && (e = -e),
            e / 100 * n + n
        }(s, i)),
        s
    }
    Aa() {
        return this.vo
    }
    $o() {
        if (this.po)
            return this.po;
        let t = [];
        for (let i = 0; i < this.vo.length; i++) {
            const s = this.vo[i];
            s.Ki() === null && s.Zi(i + 1),
            t.push(s)
        }
        return t = Fs(t),
        this.po = t,
        this.po
    }
    Uo(t) {
        this.vo.indexOf(t) === -1 && (this.vo.push(t),
        this.Pa(),
        this.qo())
    }
    Yo(t) {
        const i = this.vo.indexOf(t);
        if (i === -1)
            throw new Error("source is not attached to scale");
        this.vo.splice(i, 1),
        this.vo.length === 0 && (this.Po({
            Wn: !0
        }),
        this.Bo(null)),
        this.Pa(),
        this.qo()
    }
    Ct() {
        let t = null;
        for (const i of this.vo) {
            const s = i.Ct();
            s !== null && (t === null || s.ha < t.ha) && (t = s)
        }
        return t === null ? null : t.Ot
    }
    Ao() {
        return this.cn.invertScale
    }
    ja() {
        const t = this.Ct() === null;
        if (this.mo !== null && (t || this.mo.Xo === t))
            return this.mo.ja;
        this.yo.Qa();
        const i = this.yo.ja();
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
        this.gh() || this.Oo() || this.bo === null && this.lo === null && (this.Ni() || (this.bo = this.ro - t,
        this.lo = v(this.zh()).Ch()))
    }
    Go(t) {
        if (this.gh() || this.Oo() || this.bo === null)
            return;
        this.Po({
            Wn: !1
        }),
        (t = this.ro - t) < 0 && (t = 0);
        let i = (this.bo + .2 * (this.ro - 1)) / (t + .2 * (this.ro - 1));
        const s = v(this.lo).Ch();
        i = Math.max(i, .1),
        s.Dh(i),
        this.Bo(s)
    }
    Jo() {
        this.gh() || this.Oo() || (this.bo = null,
        this.lo = null)
    }
    Qo(t) {
        this.Do() || this.wo === null && this.lo === null && (this.Ni() || (this.wo = t,
        this.lo = v(this.zh()).Ch()))
    }
    t_(t) {
        if (this.Do() || this.wo === null)
            return;
        const i = v(this.zh()).Rh() / (this.Lo() - 1);
        let s = t - this.wo;
        this.Ao() && (s *= -1);
        const e = s * i
          , n = v(this.lo).Ch();
        n.Oh(e),
        this.Bo(n, !0),
        this.mo = null
    }
    i_() {
        this.Do() || this.wo !== null && (this.wo = null,
        this.lo = null)
    }
    ma() {
        return this.ba || this.Pa(),
        this.ba
    }
    Fi(t, i) {
        switch (this.cn.mode) {
        case 2:
            return this.n_(X(t, i));
        case 3:
            return this.ma().format(et(t, i));
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
        return this.Fh(t, v(this.s_()).ma())
    }
    Yl(t, i) {
        return t = X(t, i),
        this.n_(t, Ui)
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
        this.vo.forEach(t=>t.On())
    }
    Pa() {
        this.mo = null;
        const t = this.s_();
        let i = 100;
        t !== null && (i = Math.round(1 / t.pa())),
        this.ba = Ji,
        this.gh() ? (this.ba = Ui,
        i = 100) : this.Oo() ? (this.ba = new Tt(100,1),
        i = 100) : t !== null && (this.ba = t.ma()),
        this.yo = new Ai(this,i,this.Co.bind(this),this.To.bind(this)),
        this.yo.Qa()
    }
    qo() {
        this.po = null
    }
    s_() {
        return this.vo[0] || null
    }
    Eo() {
        return this.Ao() ? this.cn.scaleMargins.bottom * this.Vt() + this.co : this.cn.scaleMargins.top * this.Vt() + this.uo
    }
    No() {
        return this.Ao() ? this.cn.scaleMargins.top * this.Vt() + this.uo : this.cn.scaleMargins.bottom * this.Vt() + this.co
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
        t = this.eo() && t ? xt(t, this.Mo) : t;
        const s = v(this.zh())
          , e = this.No() + (this.Lo() - 1) * (t - s.Th()) / s.Rh();
        return this.Wo(e)
    }
    Co(t, i) {
        if (this.Fo(),
        this.Ni())
            return 0;
        const s = this.Wo(t)
          , e = v(this.zh())
          , n = e.Th() + e.Rh() * ((s - this.No()) / (this.Lo() - 1));
        return this.eo() ? ht(n, this.Mo) : n
    }
    Vo() {
        this.mo = null,
        this.yo.Qa()
    }
    h_() {
        const t = this.ao._o;
        if (t === null)
            return;
        let i = null;
        const s = this.e_();
        let e = 0
          , n = 0;
        for (const l of s) {
            if (!l.yt())
                continue;
            const a = l.Ct();
            if (a === null)
                continue;
            const u = l.Vl(t.Os(), t.ui());
            let c = u && u.zh();
            if (c !== null) {
                switch (this.cn.mode) {
                case 1:
                    c = it(c, this.Mo);
                    break;
                case 2:
                    c = wh(c, a.Ot);
                    break;
                case 3:
                    c = Sh(c, a.Ot)
                }
                if (i = i === null ? c : i.ts(v(c)),
                u !== null) {
                    const d = u.Lh();
                    d !== null && (e = Math.max(e, d.above),
                    n = Math.max(n, d.below))
                }
            }
        }
        if (e === this.uo && n === this.co || (this.uo = e,
        this.co = n,
        this.mo = null,
        this.Ro()),
        i !== null) {
            if (i.Th() === i.Ph()) {
                const l = this.s_()
                  , a = 5 * (l === null || this.gh() || this.Oo() ? 1 : l.pa());
                this.eo() && (i = vt(i, this.Mo)),
                i = new k(i.Th() - a,i.Ph() + a),
                this.eo() && (i = it(i, this.Mo))
            }
            if (this.eo()) {
                const l = vt(i, this.Mo)
                  , a = jt(l);
                if (r = a,
                o = this.Mo,
                r.Ha !== o.Ha || r.$a !== o.$a) {
                    const u = this.lo !== null ? vt(this.lo, this.Mo) : null;
                    this.Mo = a,
                    i = it(l, a),
                    u !== null && (this.lo = it(u, a))
                }
            }
            this.Bo(i)
        } else
            this.Vh === null && (this.Bo(new k(-.5,.5)),
            this.Mo = jt(null));
        var r, o;
        this.ao.oo = !0
    }
    jo() {
        return this.gh() ? X : this.Oo() ? et : this.eo() ? t=>xt(t, this.Mo) : null
    }
    l_(t, i, s) {
        return i === void 0 ? (s === void 0 && (s = this.ma()),
        s.format(t)) : i(t)
    }
    Fh(t, i) {
        return this.l_(t, this.ko.priceFormatter, i)
    }
    n_(t, i) {
        return this.l_(t, this.ko.percentageFormatter, i)
    }
}
class _h {
    constructor(t, i) {
        this.vo = [],
        this.a_ = new Map,
        this.ro = 0,
        this.o_ = 0,
        this.__ = 1e3,
        this.po = null,
        this.u_ = new y,
        this.kl = t,
        this.$i = i,
        this.c_ = new gh(this);
        const s = i.W();
        this.d_ = this.f_("left", s.leftPriceScale),
        this.v_ = this.f_("right", s.rightPriceScale),
        this.d_.Io().l(this.p_.bind(this, this.d_), this),
        this.v_.Io().l(this.p_.bind(this, this.v_), this),
        this.m_(s)
    }
    m_(t) {
        if (t.leftPriceScale && this.d_.Hh(t.leftPriceScale),
        t.rightPriceScale && this.v_.Hh(t.rightPriceScale),
        t.localization && (this.d_.Pa(),
        this.v_.Pa()),
        t.overlayPriceScales) {
            const i = Array.from(this.a_.values());
            for (const s of i) {
                const e = v(s[0].Dt());
                e.Hh(t.overlayPriceScales),
                t.localization && e.Pa()
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
        return this.a_.has(t) ? O(this.a_.get(t))[0].Dt() : null
    }
    S() {
        this.$t().w_().p(this),
        this.d_.Io().p(this),
        this.v_.Io().p(this),
        this.vo.forEach(t=>{
            t.S && t.S()
        }
        ),
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
    Vt() {
        return this.ro
    }
    x_(t) {
        this.o_ = t,
        this.S_()
    }
    zo(t) {
        this.ro = t,
        this.d_.zo(t),
        this.v_.zo(t),
        this.vo.forEach(i=>{
            if (this.dr(i)) {
                const s = i.Dt();
                s !== null && s.zo(t)
            }
        }
        ),
        this.S_()
    }
    Aa() {
        return this.vo
    }
    dr(t) {
        const i = t.Dt();
        return i === null || this.d_ !== i && this.v_ !== i
    }
    Uo(t, i, s) {
        const e = s !== void 0 ? s : this.y_().k_ + 1;
        this.C_(t, i, e)
    }
    Yo(t) {
        const i = this.vo.indexOf(t);
        I(i !== -1, "removeDataSource: invalid data source"),
        this.vo.splice(i, 1);
        const s = v(t.Dt()).Ta();
        if (this.a_.has(s)) {
            const n = O(this.a_.get(s))
              , r = n.indexOf(t);
            r !== -1 && (n.splice(r, 1),
            n.length === 0 && this.a_.delete(s))
        }
        const e = t.Dt();
        e && e.Aa().indexOf(t) >= 0 && e.Yo(t),
        e !== null && (e.qo(),
        this.T_(e)),
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
    A_(t) {
        t.Jo()
    }
    B_(t, i) {
        t.Qo(i)
    }
    V_(t, i) {
        t.t_(i),
        this.S_()
    }
    I_(t) {
        t.i_()
    }
    S_() {
        this.vo.forEach(t=>{
            t.On()
        }
        )
    }
    vn() {
        let t = null;
        return this.$i.W().rightPriceScale.visible && this.v_.Aa().length !== 0 ? t = this.v_ : this.$i.W().leftPriceScale.visible && this.d_.Aa().length !== 0 ? t = this.d_ : this.vo.length !== 0 && (t = this.vo[0].Dt()),
        t === null && (t = this.v_),
        t
    }
    vr() {
        let t = null;
        return this.$i.W().rightPriceScale.visible ? t = this.v_ : this.$i.W().leftPriceScale.visible && (t = this.d_),
        t
    }
    T_(t) {
        t !== null && t.Do() && this.z_(t)
    }
    L_(t) {
        const i = this.kl.Xs();
        t.Po({
            Wn: !0
        }),
        i !== null && t.r_(i),
        this.S_()
    }
    E_() {
        this.z_(this.d_),
        this.z_(this.v_)
    }
    N_() {
        this.T_(this.d_),
        this.T_(this.v_),
        this.vo.forEach(t=>{
            this.dr(t) && this.T_(t.Dt())
        }
        ),
        this.S_(),
        this.$i.$h()
    }
    $o() {
        return this.po === null && (this.po = Fs(this.vo)),
        this.po
    }
    F_() {
        return this.u_
    }
    W_() {
        return this.c_
    }
    z_(t) {
        const i = t.e_();
        if (i && i.length > 0 && !this.kl.Ni()) {
            const s = this.kl.Xs();
            s !== null && t.r_(s)
        }
        t.On()
    }
    y_() {
        const t = this.$o();
        if (t.length === 0)
            return {
                j_: 0,
                k_: 0
            };
        let i = 0
          , s = 0;
        for (let e = 0; e < t.length; e++) {
            const n = t[e].Ki();
            n !== null && (n < i && (i = n),
            n > s && (s = n))
        }
        return {
            j_: i,
            k_: s
        }
    }
    C_(t, i, s) {
        let e = this.b_(i);
        if (e === null && (e = this.f_(i, this.$i.W().overlayPriceScales)),
        this.vo.push(t),
        !Et(i)) {
            const n = this.a_.get(i) || [];
            n.push(t),
            this.a_.set(i, n)
        }
        e.Uo(t),
        t.Gi(e),
        t.Zi(s),
        this.T_(e),
        this.po = null
    }
    p_(t, i, s) {
        i.yr !== s.yr && this.z_(t)
    }
    f_(t, i) {
        const s = Object.assign({
            visible: !0,
            autoScale: !0
        }, R(i))
          , e = new Mh(t,s,this.$i.W().layout,this.$i.W().localization);
        return e.zo(this.Vt()),
        e
    }
}
class yh {
    constructor(t, i, s=50) {
        this.Ke = 0,
        this.Ze = 1,
        this.Ge = 1,
        this.Qe = new Map,
        this.Je = new Map,
        this.H_ = t,
        this.U_ = i,
        this.tr = s
    }
    q_(t) {
        const i = t.time
          , s = this.U_.cacheKey(i)
          , e = this.Qe.get(s);
        if (e !== void 0)
            return e.Y_;
        if (this.Ke === this.tr) {
            const r = this.Je.get(this.Ge);
            this.Je.delete(this.Ge),
            this.Qe.delete(O(r)),
            this.Ge++,
            this.Ke--
        }
        const n = this.H_(t);
        return this.Qe.set(s, {
            Y_: n,
            er: this.Ze
        }),
        this.Je.set(this.Ze, s),
        this.Ke++,
        this.Ze++,
        n
    }
}
class nt {
    constructor(t, i) {
        I(t <= i, "right should be >= left"),
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
    yh(t) {
        return this.X_ === t.Os() && this.K_ === t.ui()
    }
}
function Ki(h, t) {
    return h === null || t === null ? h === t : h.yh(t)
}
class Ch {
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
        for (let s = i; s < t.length; ++s) {
            const e = t[s];
            let n = this.G_.get(e.timeWeight);
            n === void 0 && (n = [],
            this.G_.set(e.timeWeight, n)),
            n.push({
                index: s,
                time: e.time,
                weight: e.timeWeight,
                originalTime: e.originalTime
            })
        }
    }
    nu(t, i) {
        const s = Math.ceil(i / t);
        return this.Qe !== null && this.Qe.su === s || (this.Qe = {
            ja: this.eu(s),
            su: s
        }),
        this.Qe.ja
    }
    iu(t) {
        if (t === 0)
            return void this.G_.clear();
        const i = [];
        this.G_.forEach((s,e)=>{
            t <= s[0].index ? i.push(e) : s.splice(ct(s, t, n=>n.index < t), 1 / 0)
        }
        );
        for (const s of i)
            this.G_.delete(s)
    }
    eu(t) {
        let i = [];
        for (const s of Array.from(this.G_.keys()).sort((e,n)=>n - e)) {
            if (!this.G_.get(s))
                continue;
            const e = i;
            i = [];
            const n = e.length;
            let r = 0;
            const o = O(this.G_.get(s))
              , l = o.length;
            let a = 1 / 0
              , u = -1 / 0;
            for (let c = 0; c < l; c++) {
                const d = o[c]
                  , f = d.index;
                for (; r < n; ) {
                    const m = e[r]
                      , p = m.index;
                    if (!(p < f)) {
                        a = p;
                        break
                    }
                    r++,
                    i.push(m),
                    u = p,
                    a = 1 / 0
                }
                if (a - f >= t && f - u >= t)
                    i.push(d),
                    u = f;
                else if (this.J_)
                    return e
            }
            for (; r < n; r++)
                i.push(e[r])
        }
        return i
    }
}
class Y {
    constructor(t) {
        this.ru = t
    }
    hu() {
        return this.ru === null ? null : new nt(Math.floor(this.ru.Os()),Math.ceil(this.ru.ui()))
    }
    lu() {
        return this.ru
    }
    static au() {
        return new Y(null)
    }
}
function zh(h, t) {
    return h.weight > t.weight ? h : t
}
class xh {
    constructor(t, i, s, e) {
        this.o_ = 0,
        this.ou = null,
        this._u = [],
        this.wo = null,
        this.bo = null,
        this.uu = new Ch,
        this.cu = new Map,
        this.du = Y.au(),
        this.fu = !0,
        this.vu = new y,
        this.pu = new y,
        this.mu = new y,
        this.bu = null,
        this.wu = null,
        this.gu = [],
        this.cn = i,
        this.ko = s,
        this.Mu = i.rightOffset,
        this.xu = i.barSpacing,
        this.$i = t,
        this.U_ = e,
        this.Su(),
        this.uu.Q_(i.uniformDistribution)
    }
    W() {
        return this.cn
    }
    ku(t) {
        P(this.ko, t),
        this.yu(),
        this.Su()
    }
    Hh(t, i) {
        var s;
        P(this.cn, t),
        this.cn.fixLeftEdge && this.Cu(),
        this.cn.fixRightEdge && this.Tu(),
        t.barSpacing !== void 0 && this.$i.Gn(t.barSpacing),
        t.rightOffset !== void 0 && this.$i.Jn(t.rightOffset),
        t.minBarSpacing !== void 0 && this.$i.Gn((s = t.barSpacing) !== null && s !== void 0 ? s : this.xu),
        this.yu(),
        this.Su(),
        this.mu.m()
    }
    mn(t) {
        var i, s;
        return (s = (i = this._u[t]) === null || i === void 0 ? void 0 : i.time) !== null && s !== void 0 ? s : null
    }
    Ui(t) {
        var i;
        return (i = this._u[t]) !== null && i !== void 0 ? i : null
    }
    Da(t, i) {
        if (this._u.length < 1)
            return null;
        if (this.U_.key(t) > this.U_.key(this._u[this._u.length - 1].time))
            return i ? this._u.length - 1 : null;
        const s = ct(this._u, this.U_.key(t), (e,n)=>this.U_.key(e.time) < n);
        return this.U_.key(t) < this.U_.key(this._u[s].time) ? i ? s : null : s
    }
    Ni() {
        return this.o_ === 0 || this._u.length === 0 || this.ou === null
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
        if (t === null)
            return null;
        const i = {
            from: t.Os(),
            to: t.ui()
        };
        return this.Ou(i)
    }
    Ou(t) {
        const i = Math.round(t.from)
          , s = Math.round(t.to)
          , e = v(this.Au())
          , n = v(this.Bu());
        return {
            from: v(this.Ui(Math.max(e, i))),
            to: v(this.Ui(Math.min(n, s)))
        }
    }
    Vu(t) {
        return {
            from: v(this.Da(t.from, !0)),
            to: v(this.Da(t.to, !0))
        }
    }
    Hi() {
        return this.o_
    }
    x_(t) {
        if (!isFinite(t) || t <= 0 || this.o_ === t)
            return;
        const i = this.Ru()
          , s = this.o_;
        if (this.o_ = t,
        this.fu = !0,
        this.cn.lockVisibleTimeRangeOnResize && s !== 0) {
            const e = this.xu * t / s;
            this.xu = e
        }
        if (this.cn.fixLeftEdge && i !== null && i.Os() <= 0) {
            const e = s - t;
            this.Mu -= Math.round(e / this.xu) + 1,
            this.fu = !0
        }
        this.Iu(),
        this.zu()
    }
    It(t) {
        if (this.Ni() || !rt(t))
            return 0;
        const i = this.Lu() + this.Mu - t;
        return this.o_ - (i + .5) * this.xu - 1
    }
    Js(t, i) {
        const s = this.Lu()
          , e = i === void 0 ? 0 : i.from
          , n = i === void 0 ? t.length : i.to;
        for (let r = e; r < n; r++) {
            const o = t[r].ot
              , l = s + this.Mu - o
              , a = this.o_ - (l + .5) * this.xu - 1;
            t[r].nt = a
        }
    }
    Eu(t) {
        return Math.ceil(this.Nu(t))
    }
    Jn(t) {
        this.fu = !0,
        this.Mu = t,
        this.zu(),
        this.$i.Fu(),
        this.$i.$h()
    }
    he() {
        return this.xu
    }
    Gn(t) {
        this.Wu(t),
        this.zu(),
        this.$i.Fu(),
        this.$i.$h()
    }
    ju() {
        return this.Mu
    }
    ja() {
        if (this.Ni())
            return null;
        if (this.wu !== null)
            return this.wu;
        const t = this.xu
          , i = 5 * (this.$i.W().layout.fontSize + 4) / 8 * (this.cn.tickMarkMaxCharacterLength || 8)
          , s = Math.round(i / t)
          , e = v(this.Xs())
          , n = Math.max(e.Os(), e.Os() - s)
          , r = Math.max(e.ui(), e.ui() - s)
          , o = this.uu.nu(t, i)
          , l = this.Au() + s
          , a = this.Bu() - s
          , u = this.Hu()
          , c = this.cn.fixLeftEdge || u
          , d = this.cn.fixRightEdge || u;
        let f = 0;
        for (const m of o) {
            if (!(n <= m.index && m.index <= r))
                continue;
            let p;
            f < this.gu.length ? (p = this.gu[f],
            p.coord = this.It(m.index),
            p.label = this.$u(m),
            p.weight = m.weight) : (p = {
                needAlignCoordinate: !1,
                coord: this.It(m.index),
                label: this.$u(m),
                weight: m.weight
            },
            this.gu.push(p)),
            this.xu > i / 2 && !u ? p.needAlignCoordinate = !1 : p.needAlignCoordinate = c && m.index <= l || d && m.index >= a,
            f++
        }
        return this.gu.length = f,
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
        this.zu(),
        this.Cu()
    }
    Yu(t, i) {
        const s = this.Nu(t)
          , e = this.he()
          , n = e + i * (e / 10);
        this.Gn(n),
        this.cn.rightBarStaysOnScroll || this.Jn(this.ju() + (s - this.Nu(t)))
    }
    Zo(t) {
        this.wo && this.i_(),
        this.bo === null && this.bu === null && (this.Ni() || (this.bo = t,
        this.Xu()))
    }
    Go(t) {
        if (this.bu === null)
            return;
        const i = si(this.o_ - t, 0, this.o_)
          , s = si(this.o_ - v(this.bo), 0, this.o_);
        i !== 0 && s !== 0 && this.Gn(this.bu.he * i / s)
    }
    Jo() {
        this.bo !== null && (this.bo = null,
        this.Ku())
    }
    Qo(t) {
        this.wo === null && this.bu === null && (this.Ni() || (this.wo = t,
        this.Xu()))
    }
    t_(t) {
        if (this.wo === null)
            return;
        const i = (this.wo - t) / this.he();
        this.Mu = v(this.bu).ju + i,
        this.fu = !0,
        this.zu()
    }
    i_() {
        this.wo !== null && (this.wo = null,
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
        const s = this.Mu
          , e = performance.now();
        this.$i.Xn({
            Ju: n=>(n - e) / i >= 1,
            Qu: n=>{
                const r = (n - e) / i;
                return r >= 1 ? t : s + (t - s) * r
            }
        })
    }
    bt(t, i) {
        this.fu = !0,
        this._u = t,
        this.uu.tu(t, i),
        this.zu()
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
    Lu() {
        return this.ou || 0
    }
    ec(t) {
        const i = t.Z_();
        this.Wu(this.o_ / i),
        this.Mu = t.ui() - this.Lu(),
        this.zu(),
        this.fu = !0,
        this.$i.Fu(),
        this.$i.$h()
    }
    rc() {
        const t = this.Au()
          , i = this.Bu();
        t !== null && i !== null && this.ec(new nt(t,i + this.cn.rightOffset))
    }
    hc(t) {
        const i = new nt(t.from,t.to);
        this.ec(i)
    }
    qi(t) {
        return this.ko.timeFormatter !== void 0 ? this.ko.timeFormatter(t.originalTime) : this.U_.formatHorzItem(t.time)
    }
    Hu() {
        const {handleScroll: t, handleScale: i} = this.$i.W();
        return !(t.horzTouchDrag || t.mouseWheel || t.pressedMouseMove || t.vertTouchDrag || i.axisDoubleClickReset.time || i.axisPressedMouseMove.time || i.mouseWheel || i.pinch)
    }
    Au() {
        return this._u.length === 0 ? null : 0
    }
    Bu() {
        return this._u.length === 0 ? null : this._u.length - 1
    }
    lc(t) {
        return (this.o_ - 1 - t) / this.xu
    }
    Nu(t) {
        const i = this.lc(t)
          , s = this.Lu() + this.Mu - i;
        return Math.round(1e6 * s) / 1e6
    }
    Wu(t) {
        const i = this.xu;
        this.xu = t,
        this.Iu(),
        i !== this.xu && (this.fu = !0,
        this.ac())
    }
    Pu() {
        if (!this.fu)
            return;
        if (this.fu = !1,
        this.Ni())
            return void this.oc(Y.au());
        const t = this.Lu()
          , i = this.o_ / this.xu
          , s = this.Mu + t
          , e = new nt(s - i + 1,s);
        this.oc(new Y(e))
    }
    Iu() {
        const t = this._c();
        if (this.xu < t && (this.xu = t,
        this.fu = !0),
        this.o_ !== 0) {
            const i = .5 * this.o_;
            this.xu > i && (this.xu = i,
            this.fu = !0)
        }
    }
    _c() {
        return this.cn.fixLeftEdge && this.cn.fixRightEdge && this._u.length !== 0 ? this.o_ / this._u.length : this.cn.minBarSpacing
    }
    zu() {
        const t = this.uc();
        this.Mu > t && (this.Mu = t,
        this.fu = !0);
        const i = this.cc();
        i !== null && this.Mu < i && (this.Mu = i,
        this.fu = !0)
    }
    cc() {
        const t = this.Au()
          , i = this.ou;
        return t === null || i === null ? null : t - i - 1 + (this.cn.fixLeftEdge ? this.o_ / this.xu : Math.min(2, this._u.length))
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
        return i === void 0 && (i = new yh(s=>this.dc(s),this.U_),
        this.cu.set(t.weight, i)),
        i.q_(t)
    }
    dc(t) {
        return this.U_.formatTickmark(t, this.ko)
    }
    oc(t) {
        const i = this.du;
        this.du = t,
        Ki(i.hu(), this.du.hu()) || this.vu.m(),
        Ki(i.lu(), this.du.lu()) || this.pu.m(),
        this.ac()
    }
    ac() {
        this.wu = null
    }
    yu() {
        this.ac(),
        this.cu.clear()
    }
    Su() {
        this.U_.updateFormatter(this.ko)
    }
    Cu() {
        if (!this.cn.fixLeftEdge)
            return;
        const t = this.Au();
        if (t === null)
            return;
        const i = this.Xs();
        if (i === null)
            return;
        const s = i.Os() - t;
        if (s < 0) {
            const e = this.Mu - s - 1;
            this.Jn(e)
        }
        this.Iu()
    }
    Tu() {
        this.zu(),
        this.Iu()
    }
}
class Lh {
    K(t, i, s) {
        t.useMediaCoordinateSpace(e=>this.Z(e, i, s))
    }
    wl(t, i, s) {
        t.useMediaCoordinateSpace(e=>this.fc(e, i, s))
    }
    fc(t, i, s) {}
}
class Oh extends Lh {
    constructor(t) {
        super(),
        this.vc = new Map,
        this.zt = t
    }
    Z(t) {}
    fc(t) {
        if (!this.zt.yt)
            return;
        const {context: i, mediaSize: s} = t;
        let e = 0;
        for (const r of this.zt.mc) {
            if (r.Zt.length === 0)
                continue;
            i.font = r.R;
            const o = this.bc(i, r.Zt);
            o > s.width ? r.Yu = s.width / o : r.Yu = 1,
            e += r.wc * r.Yu
        }
        let n = 0;
        switch (this.zt.gc) {
        case "top":
            n = 0;
            break;
        case "center":
            n = Math.max((s.height - e) / 2, 0);
            break;
        case "bottom":
            n = Math.max(s.height - e, 0)
        }
        i.fillStyle = this.zt.O;
        for (const r of this.zt.mc) {
            i.save();
            let o = 0;
            switch (this.zt.Mc) {
            case "left":
                i.textAlign = "left",
                o = r.wc / 2;
                break;
            case "center":
                i.textAlign = "center",
                o = s.width / 2;
                break;
            case "right":
                i.textAlign = "right",
                o = s.width - 1 - r.wc / 2
            }
            i.translate(o, n),
            i.textBaseline = "top",
            i.font = r.R,
            i.scale(r.Yu, r.Yu),
            i.fillText(r.Zt, 0, r.xc),
            i.restore(),
            n += r.wc * r.Yu
        }
    }
    bc(t, i) {
        const s = this.Sc(t.font);
        let e = s.get(i);
        return e === void 0 && (e = t.measureText(i).width,
        s.set(i, e)),
        e
    }
    Sc(t) {
        let i = this.vc.get(t);
        return i === void 0 && (i = new Map,
        this.vc.set(t, i)),
        i
    }
}
class kh {
    constructor(t) {
        this.ft = !0,
        this.Ft = {
            yt: !1,
            O: "",
            mc: [],
            gc: "center",
            Mc: "center"
        },
        this.Wt = new Oh(this.Ft),
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
        i.yt = t.visible,
        i.yt && (i.O = t.color,
        i.Mc = t.horzAlign,
        i.gc = t.vertAlign,
        i.mc = [{
            Zt: t.text,
            R: Q(t.fontSize, t.fontFamily, t.fontStyle),
            wc: 1.2 * t.fontSize,
            xc: 0,
            Yu: 0
        }])
    }
}
class Eh extends ui {
    constructor(t, i) {
        super(),
        this.cn = i,
        this.wn = new kh(this)
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
var Zi, Hi, Gi, Xi, Yi;
(function(h) {
    h[h.OnTouchEnd = 0] = "OnTouchEnd",
    h[h.OnNextTap = 1] = "OnNextTap"
}
)(Zi || (Zi = {}));
class Th {
    constructor(t, i, s) {
        this.kc = [],
        this.yc = [],
        this.o_ = 0,
        this.Cc = null,
        this.Tc = new y,
        this.Pc = new y,
        this.Rc = null,
        this.Dc = t,
        this.cn = i,
        this.U_ = s,
        this.Oc = new ae(this),
        this.kl = new xh(this,i.timeScale,this.cn.localization,s),
        this.vt = new Se(this,i.crosshair),
        this.Ac = new ph(i.crosshair),
        this.Bc = new Eh(this,i.watermark),
        this.Vc(),
        this.kc[0].M_(2e3),
        this.Ic = this.zc(0),
        this.Lc = this.zc(1)
    }
    Kl() {
        this.Ec(z.es())
    }
    $h() {
        this.Ec(z.ss())
    }
    aa() {
        this.Ec(new z(1))
    }
    Zl(t) {
        const i = this.Nc(t);
        this.Ec(i)
    }
    Fc() {
        return this.Cc
    }
    Wc(t) {
        const i = this.Cc;
        this.Cc = t,
        i !== null && this.Zl(i.jc),
        t !== null && this.Zl(t.jc)
    }
    W() {
        return this.cn
    }
    Hh(t) {
        P(this.cn, t),
        this.kc.forEach(i=>i.m_(t)),
        t.timeScale !== void 0 && this.kl.Hh(t.timeScale),
        t.localization !== void 0 && this.kl.ku(t.localization),
        (t.leftPriceScale || t.rightPriceScale) && this.Tc.m(),
        this.Ic = this.zc(0),
        this.Lc = this.zc(1),
        this.Kl()
    }
    Hc(t, i) {
        if (t === "left")
            return void this.Hh({
                leftPriceScale: i
            });
        if (t === "right")
            return void this.Hh({
                rightPriceScale: i
            });
        const s = this.$c(t);
        s !== null && (s.Dt.Hh(i),
        this.Tc.m())
    }
    $c(t) {
        for (const i of this.kc) {
            const s = i.b_(t);
            if (s !== null)
                return {
                    Ht: i,
                    Dt: s
                }
        }
        return null
    }
    St() {
        return this.kl
    }
    Uc() {
        return this.kc
    }
    qc() {
        return this.Bc
    }
    Yc() {
        return this.vt
    }
    Xc() {
        return this.Pc
    }
    Kc(t, i) {
        t.zo(i),
        this.Fu()
    }
    x_(t) {
        this.o_ = t,
        this.kl.x_(this.o_),
        this.kc.forEach(i=>i.x_(t)),
        this.Fu()
    }
    Vc(t) {
        const i = new _h(this.kl,this);
        t !== void 0 ? this.kc.splice(t, 0, i) : this.kc.push(i);
        const s = t === void 0 ? this.kc.length - 1 : t
          , e = z.es();
        return e.Nn(s, {
            Fn: 0,
            Wn: !0
        }),
        this.Ec(e),
        i
    }
    D_(t, i, s) {
        t.D_(i, s)
    }
    O_(t, i, s) {
        t.O_(i, s),
        this.Gl(),
        this.Ec(this.Zc(t, 2))
    }
    A_(t, i) {
        t.A_(i),
        this.Ec(this.Zc(t, 2))
    }
    B_(t, i, s) {
        i.Do() || t.B_(i, s)
    }
    V_(t, i, s) {
        i.Do() || (t.V_(i, s),
        this.Gl(),
        this.Ec(this.Zc(t, 2)))
    }
    I_(t, i) {
        i.Do() || (t.I_(i),
        this.Ec(this.Zc(t, 2)))
    }
    L_(t, i) {
        t.L_(i),
        this.Ec(this.Zc(t, 2))
    }
    Gc(t) {
        this.kl.Zo(t)
    }
    Jc(t, i) {
        const s = this.St();
        if (s.Ni() || i === 0)
            return;
        const e = s.Hi();
        t = Math.max(1, Math.min(t, e)),
        s.Yu(t, i),
        this.Fu()
    }
    Qc(t) {
        this.td(0),
        this.nd(t),
        this.sd()
    }
    ed(t) {
        this.kl.Go(t),
        this.Fu()
    }
    rd() {
        this.kl.Jo(),
        this.$h()
    }
    td(t) {
        this.kl.Qo(t)
    }
    nd(t) {
        this.kl.t_(t),
        this.Fu()
    }
    sd() {
        this.kl.i_(),
        this.$h()
    }
    wt() {
        return this.yc
    }
    hd(t, i, s, e, n) {
        this.vt.gn(t, i);
        let r = NaN
          , o = this.kl.Eu(t);
        const l = this.kl.Xs();
        l !== null && (o = Math.min(Math.max(l.Os(), o), l.ui()));
        const a = e.vn()
          , u = a.Ct();
        u !== null && (r = a.pn(i, u)),
        r = this.Ac.Oa(r, o, e),
        this.vt.kn(o, r, e),
        this.aa(),
        n || this.Pc.m(this.vt.xt(), {
            x: t,
            y: i
        }, s)
    }
    ld(t, i, s) {
        const e = s.vn()
          , n = e.Ct()
          , r = e.Rt(t, v(n))
          , o = this.kl.Da(i, !0)
          , l = this.kl.It(v(o));
        this.hd(l, r, null, s, !0)
    }
    ad(t) {
        this.Yc().Cn(),
        this.aa(),
        t || this.Pc.m(null, null, null)
    }
    Gl() {
        const t = this.vt.Ht();
        if (t !== null) {
            const i = this.vt.xn()
              , s = this.vt.Sn();
            this.hd(i, s, null, t)
        }
        this.vt.On()
    }
    od(t, i, s) {
        const e = this.kl.mn(0);
        i !== void 0 && s !== void 0 && this.kl.bt(i, s);
        const n = this.kl.mn(0)
          , r = this.kl.Lu()
          , o = this.kl.Xs();
        if (o !== null && e !== null && n !== null) {
            const l = o.Kr(r)
              , a = this.U_.key(e) > this.U_.key(n)
              , u = t !== null && t > r && !a
              , c = this.kl.W().allowShiftVisibleRangeOnWhitespaceReplacement
              , d = l && (s !== void 0 || c) && this.kl.W().shiftVisibleRangeOnNewBar;
            if (u && !d) {
                const f = t - r;
                this.kl.Jn(this.kl.ju() - f)
            }
        }
        this.kl.qu(t)
    }
    ta(t) {
        t !== null && t.N_()
    }
    cr(t) {
        const i = this.kc.find(s=>s.$o().includes(t));
        return i === void 0 ? null : i
    }
    Fu() {
        this.Bc.On(),
        this.kc.forEach(t=>t.N_()),
        this.Gl()
    }
    S() {
        this.kc.forEach(t=>t.S()),
        this.kc.length = 0,
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
    ud(t, i, s) {
        const e = this.kc[0]
          , n = this.dd(i, t, e, s);
        return this.yc.push(n),
        this.yc.length === 1 ? this.Kl() : this.$h(),
        n
    }
    fd(t) {
        const i = this.cr(t)
          , s = this.yc.indexOf(t);
        I(s !== -1, "Series not found"),
        this.yc.splice(s, 1),
        v(i).Yo(t),
        t.S && t.S()
    }
    Xl(t, i) {
        const s = v(this.cr(t));
        s.Yo(t);
        const e = this.$c(i);
        if (e === null) {
            const n = t.Ki();
            s.Uo(t, i, n)
        } else {
            const n = e.Ht === s ? t.Ki() : void 0;
            e.Ht.Uo(t, i, n)
        }
    }
    rc() {
        const t = z.ss();
        t.$n(),
        this.Ec(t)
    }
    vd(t) {
        const i = z.ss();
        i.Yn(t),
        this.Ec(i)
    }
    Zn() {
        const t = z.ss();
        t.Zn(),
        this.Ec(t)
    }
    Gn(t) {
        const i = z.ss();
        i.Gn(t),
        this.Ec(i)
    }
    Jn(t) {
        const i = z.ss();
        i.Jn(t),
        this.Ec(i)
    }
    Xn(t) {
        const i = z.ss();
        i.Xn(t),
        this.Ec(i)
    }
    Un() {
        const t = z.ss();
        t.Un(),
        this.Ec(t)
    }
    pd() {
        return this.cn.rightPriceScale.visible ? "right" : "left"
    }
    md() {
        return this.Lc
    }
    q() {
        return this.Ic
    }
    Bt(t) {
        const i = this.Lc
          , s = this.Ic;
        if (i === s)
            return i;
        if (t = Math.max(0, Math.min(100, Math.round(100 * t))),
        this.Rc === null || this.Rc.Ts !== s || this.Rc.Ps !== i)
            this.Rc = {
                Ts: s,
                Ps: i,
                bd: new Map
            };
        else {
            const n = this.Rc.bd.get(t);
            if (n !== void 0)
                return n
        }
        const e = function(n, r, o) {
            const [l,a,u,c] = Ct(n)
              , [d,f,m,p] = Ct(r)
              , b = [T(l + o * (d - l)), T(a + o * (f - a)), T(u + o * (m - u)), _s(c + o * (p - c))];
            return `rgba(${b[0]}, ${b[1]}, ${b[2]}, ${b[3]})`
        }(s, i, t / 100);
        return this.Rc.bd.set(t, e),
        e
    }
    Zc(t, i) {
        const s = new z(i);
        if (t !== null) {
            const e = this.kc.indexOf(t);
            s.Nn(e, {
                Fn: i
            })
        }
        return s
    }
    Nc(t, i) {
        return i === void 0 && (i = 2),
        this.Zc(this.cr(t), i)
    }
    Ec(t) {
        this.Dc && this.Dc(t),
        this.kc.forEach(i=>i.W_().Uh().bt())
    }
    dd(t, i, s, e) {
        const n = new mi(this,t,i,s,e)
          , r = t.priceScaleId !== void 0 ? t.priceScaleId : this.pd();
        return s.Uo(n, r),
        Et(r) || n.Hh(t),
        n
    }
    zc(t) {
        const i = this.cn.layout;
        return i.background.type === "gradient" ? t === 0 ? i.background.topColor : i.background.bottomColor : i.background.color
    }
}
function ei(h) {
    return !$(h) && !ut(h)
}
function Is(h) {
    return $(h)
}
(function(h) {
    h[h.Disabled = 0] = "Disabled",
    h[h.Continuous = 1] = "Continuous",
    h[h.OnDataUpdate = 2] = "OnDataUpdate"
}
)(Hi || (Hi = {})),
function(h) {
    h[h.LastBar = 0] = "LastBar",
    h[h.LastVisible = 1] = "LastVisible"
}(Gi || (Gi = {})),
function(h) {
    h.Solid = "solid",
    h.VerticalGradient = "gradient"
}(Xi || (Xi = {})),
function(h) {
    h[h.Year = 0] = "Year",
    h[h.Month = 1] = "Month",
    h[h.DayOfMonth = 2] = "DayOfMonth",
    h[h.Time = 3] = "Time",
    h[h.TimeWithSeconds = 4] = "TimeWithSeconds"
}(Yi || (Yi = {}));
const Qi = h=>h.getUTCFullYear();
function Ph(h, t, i) {
    return t.replace(/yyyy/g, (s=>D(Qi(s), 4))(h)).replace(/yy/g, (s=>D(Qi(s) % 100, 2))(h)).replace(/MMMM/g, ((s,e)=>new Date(s.getUTCFullYear(),s.getUTCMonth(),1).toLocaleString(e, {
        month: "long"
    }))(h, i)).replace(/MMM/g, ((s,e)=>new Date(s.getUTCFullYear(),s.getUTCMonth(),1).toLocaleString(e, {
        month: "short"
    }))(h, i)).replace(/MM/g, (s=>D((e=>e.getUTCMonth() + 1)(s), 2))(h)).replace(/dd/g, (s=>D((e=>e.getUTCDate())(s), 2))(h))
}
class Vs {
    constructor(t="yyyy-MM-dd", i="default") {
        this.wd = t,
        this.gd = i
    }
    q_(t) {
        return Ph(t, this.wd, this.gd)
    }
}
class Wh {
    constructor(t) {
        this.Md = t || "%h:%m:%s"
    }
    q_(t) {
        return this.Md.replace("%h", D(t.getUTCHours(), 2)).replace("%m", D(t.getUTCMinutes(), 2)).replace("%s", D(t.getUTCSeconds(), 2))
    }
}
const Nh = {
    xd: "yyyy-MM-dd",
    Sd: "%h:%m:%s",
    kd: " ",
    yd: "default"
};
class $h {
    constructor(t={}) {
        const i = Object.assign(Object.assign({}, Nh), t);
        this.Cd = new Vs(i.xd,i.yd),
        this.Td = new Wh(i.Sd),
        this.Pd = i.kd
    }
    q_(t) {
        return `${this.Cd.q_(t)}${this.Pd}${this.Td.q_(t)}`
    }
}
function bt(h) {
    return 60 * h * 60 * 1e3
}
function Jt(h) {
    return 60 * h * 1e3
}
const gt = [{
    Rd: (qi = 1,
    1e3 * qi),
    Dd: 10
}, {
    Rd: Jt(1),
    Dd: 20
}, {
    Rd: Jt(5),
    Dd: 21
}, {
    Rd: Jt(30),
    Dd: 22
}, {
    Rd: bt(1),
    Dd: 30
}, {
    Rd: bt(3),
    Dd: 31
}, {
    Rd: bt(6),
    Dd: 32
}, {
    Rd: bt(12),
    Dd: 33
}];
var qi;
function ts(h, t) {
    if (h.getUTCFullYear() !== t.getUTCFullYear())
        return 70;
    if (h.getUTCMonth() !== t.getUTCMonth())
        return 60;
    if (h.getUTCDate() !== t.getUTCDate())
        return 50;
    for (let i = gt.length - 1; i >= 0; --i)
        if (Math.floor(t.getTime() / gt[i].Rd) !== Math.floor(h.getTime() / gt[i].Rd))
            return gt[i].Dd;
    return 0
}
function Kt(h) {
    let t = h;
    if (ut(h) && (t = pi(h)),
    !ei(t))
        throw new Error("time must be of type BusinessDay");
    const i = new Date(Date.UTC(t.year, t.month - 1, t.day, 0, 0, 0, 0));
    return {
        Od: Math.round(i.getTime() / 1e3),
        Ad: t
    }
}
function is(h) {
    if (!Is(h))
        throw new Error("time must be of type isUTCTimestamp");
    return {
        Od: h
    }
}
function pi(h) {
    const t = new Date(h);
    if (isNaN(t.getTime()))
        throw new Error(`Invalid date string=${h}, expected format=yyyy-mm-dd`);
    return {
        day: t.getUTCDate(),
        month: t.getUTCMonth() + 1,
        year: t.getUTCFullYear()
    }
}
function ss(h) {
    ut(h.time) && (h.time = pi(h.time))
}
class es {
    options() {
        return this.cn
    }
    setOptions(t) {
        this.cn = t,
        this.updateFormatter(t.localization)
    }
    preprocessData(t) {
        Array.isArray(t) ? function(i) {
            i.forEach(ss)
        }(t) : ss(t)
    }
    createConverterToInternalObj(t) {
        return v(function(i) {
            return i.length === 0 ? null : ei(i[0].time) || ut(i[0].time) ? Kt : is
        }(t))
    }
    key(t) {
        return typeof t == "object" && "Od"in t ? t.Od : this.key(this.convertHorzItemToInternal(t))
    }
    cacheKey(t) {
        const i = t;
        return i.Ad === void 0 ? new Date(1e3 * i.Od).getTime() : new Date(Date.UTC(i.Ad.year, i.Ad.month - 1, i.Ad.day)).getTime()
    }
    convertHorzItemToInternal(t) {
        return Is(i = t) ? is(i) : ei(i) ? Kt(i) : Kt(pi(i));
        var i
    }
    updateFormatter(t) {
        if (!this.cn)
            return;
        const i = t.dateFormat;
        this.cn.timeScale.timeVisible ? this.Bd = new $h({
            xd: i,
            Sd: this.cn.timeScale.secondsVisible ? "%h:%m:%s" : "%h:%m",
            kd: "   ",
            yd: t.locale
        }) : this.Bd = new Vs(i,t.locale)
    }
    formatHorzItem(t) {
        const i = t;
        return this.Bd.q_(new Date(1e3 * i.Od))
    }
    formatTickmark(t, i) {
        const s = function(n, r, o) {
            switch (n) {
            case 0:
            case 10:
                return r ? o ? 4 : 3 : 2;
            case 20:
            case 21:
            case 22:
            case 30:
            case 31:
            case 32:
            case 33:
                return r ? 3 : 2;
            case 50:
                return 2;
            case 60:
                return 1;
            case 70:
                return 0
            }
        }(t.weight, this.cn.timeScale.timeVisible, this.cn.timeScale.secondsVisible)
          , e = this.cn.timeScale;
        if (e.tickMarkFormatter !== void 0) {
            const n = e.tickMarkFormatter(t.originalTime, s, i.locale);
            if (n !== null)
                return n
        }
        return function(n, r, o) {
            const l = {};
            switch (r) {
            case 0:
                l.year = "numeric";
                break;
            case 1:
                l.month = "short";
                break;
            case 2:
                l.day = "numeric";
                break;
            case 3:
                l.hour12 = !1,
                l.hour = "2-digit",
                l.minute = "2-digit";
                break;
            case 4:
                l.hour12 = !1,
                l.hour = "2-digit",
                l.minute = "2-digit",
                l.second = "2-digit"
            }
            const a = n.Ad === void 0 ? new Date(1e3 * n.Od) : new Date(Date.UTC(n.Ad.year, n.Ad.month - 1, n.Ad.day));
            return new Date(a.getUTCFullYear(),a.getUTCMonth(),a.getUTCDate(),a.getUTCHours(),a.getUTCMinutes(),a.getUTCSeconds(),a.getUTCMilliseconds()).toLocaleString(o, l)
        }(t.time, s, i.locale)
    }
    maxTickMarkWeight(t) {
        let i = t.reduce(zh, t[0]).weight;
        return i > 30 && i < 50 && (i = 30),
        i
    }
    fillWeightsForPoints(t, i) {
        (function(s, e=0) {
            if (s.length === 0)
                return;
            let n = e === 0 ? null : s[e - 1].time.Od
              , r = n !== null ? new Date(1e3 * n) : null
              , o = 0;
            for (let l = e; l < s.length; ++l) {
                const a = s[l]
                  , u = new Date(1e3 * a.time.Od);
                r !== null && (a.timeWeight = ts(u, r)),
                o += a.time.Od - (n || a.time.Od),
                n = a.time.Od,
                r = u
            }
            if (e === 0 && s.length > 1) {
                const l = Math.ceil(o / (s.length - 1))
                  , a = new Date(1e3 * (s[0].time.Od - l));
                s[0].timeWeight = ts(new Date(1e3 * s[0].time.Od), a)
            }
        }
        )(t, i)
    }
    static Vd(t) {
        return P({
            localization: {
                dateFormat: "dd MMM 'yy"
            }
        }, t ?? {})
    }
}
const q = typeof window < "u";
function hs() {
    return !!q && window.navigator.userAgent.toLowerCase().indexOf("firefox") > -1
}
function Zt() {
    return !!q && /iPhone|iPad|iPod/.test(window.navigator.platform)
}
function hi(h) {
    return h + h % 2
}
function Ht(h, t) {
    return h.Id - t.Id
}
function Gt(h, t, i) {
    const s = (h.Id - t.Id) / (h.ot - t.ot);
    return Math.sign(s) * Math.min(Math.abs(s), i)
}
class Rh {
    constructor(t, i, s, e) {
        this.zd = null,
        this.Ld = null,
        this.Ed = null,
        this.Nd = null,
        this.Fd = null,
        this.Wd = 0,
        this.jd = 0,
        this.Hd = t,
        this.$d = i,
        this.Ud = s,
        this.rs = e
    }
    qd(t, i) {
        if (this.zd !== null) {
            if (this.zd.ot === i)
                return void (this.zd.Id = t);
            if (Math.abs(this.zd.Id - t) < this.rs)
                return
        }
        this.Nd = this.Ed,
        this.Ed = this.Ld,
        this.Ld = this.zd,
        this.zd = {
            ot: i,
            Id: t
        }
    }
    Dr(t, i) {
        if (this.zd === null || this.Ld === null || i - this.zd.ot > 50)
            return;
        let s = 0;
        const e = Gt(this.zd, this.Ld, this.$d)
          , n = Ht(this.zd, this.Ld)
          , r = [e]
          , o = [n];
        if (s += n,
        this.Ed !== null) {
            const a = Gt(this.Ld, this.Ed, this.$d);
            if (Math.sign(a) === Math.sign(e)) {
                const u = Ht(this.Ld, this.Ed);
                if (r.push(a),
                o.push(u),
                s += u,
                this.Nd !== null) {
                    const c = Gt(this.Ed, this.Nd, this.$d);
                    if (Math.sign(c) === Math.sign(e)) {
                        const d = Ht(this.Ed, this.Nd);
                        r.push(c),
                        o.push(d),
                        s += d
                    }
                }
            }
        }
        let l = 0;
        for (let a = 0; a < r.length; ++a)
            l += o[a] / s * r[a];
        Math.abs(l) < this.Hd || (this.Fd = {
            Id: t,
            ot: i
        },
        this.jd = l,
        this.Wd = function(a, u) {
            const c = Math.log(u);
            return Math.log(1 * c / -a) / c
        }(Math.abs(l), this.Ud))
    }
    Qu(t) {
        const i = v(this.Fd)
          , s = t - i.ot;
        return i.Id + this.jd * (Math.pow(this.Ud, s) - 1) / Math.log(this.Ud)
    }
    Ju(t) {
        return this.Fd === null || this.Yd(t) === this.Wd
    }
    Yd(t) {
        const i = t - v(this.Fd).ot;
        return Math.min(i, this.Wd)
    }
}
function J(h, t) {
    const i = v(h.ownerDocument).createElement("canvas");
    h.appendChild(i);
    const s = Hs(i, {
        type: "device-pixel-content-box",
        options: {
            allowResizeObserver: !1
        },
        transform: (e,n)=>({
            width: Math.max(e.width, n.width),
            height: Math.max(e.height, n.height)
        })
    });
    return s.resizeCanvasElement(t),
    s
}
function K(h) {
    var t;
    h.width = 1,
    h.height = 1,
    (t = h.getContext("2d")) === null || t === void 0 || t.clearRect(0, 0, 1, 1)
}
function ni(h, t, i, s) {
    h.wl && h.wl(t, i, s)
}
function yt(h, t, i, s) {
    h.K(t, i, s)
}
function ri(h, t, i, s) {
    const e = h(i, s);
    for (const n of e) {
        const r = n.gt();
        r !== null && t(r)
    }
}
function Dh(h) {
    q && window.chrome !== void 0 && h.addEventListener("mousedown", t=>{
        if (t.button === 1)
            return t.preventDefault(),
            !1
    }
    )
}
class vi {
    constructor(t, i, s) {
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
        this.Mf = !Zt(),
        this.xf = e=>{
            this.Sf(e)
        }
        ,
        this.kf = e=>{
            if (this.yf(e)) {
                const n = this.Cf(e);
                if (++this.Gd,
                this.Jd && this.Gd > 1) {
                    const {Tf: r} = this.Pf(N(e), this.Qd);
                    r < 30 && !this.hf && this.Rf(n, this.Of.Df),
                    this.Af()
                }
            } else {
                const n = this.Cf(e);
                if (++this.Xd,
                this.Kd && this.Xd > 1) {
                    const {Tf: r} = this.Pf(N(e), this.Zd);
                    r < 5 && !this.rf && this.Bf(n, this.Of.Vf),
                    this.If()
                }
            }
        }
        ,
        this.zf = t,
        this.Of = i,
        this.cn = s,
        this.Lf()
    }
    S() {
        this.lf !== null && (this.lf(),
        this.lf = null),
        this.af !== null && (this.af(),
        this.af = null),
        this.uf !== null && (this.uf(),
        this.uf = null),
        this.cf !== null && (this.cf(),
        this.cf = null),
        this.df !== null && (this.df(),
        this.df = null),
        this._f !== null && (this._f(),
        this._f = null),
        this.Ef(),
        this.If()
    }
    Nf(t) {
        this.uf && this.uf();
        const i = this.Ff.bind(this);
        if (this.uf = ()=>{
            this.zf.removeEventListener("mousemove", i)
        }
        ,
        this.zf.addEventListener("mousemove", i),
        this.yf(t))
            return;
        const s = this.Cf(t);
        this.Bf(s, this.Of.Wf),
        this.Mf = !0
    }
    If() {
        this.Kd !== null && clearTimeout(this.Kd),
        this.Xd = 0,
        this.Kd = null,
        this.Zd = {
            nt: Number.NEGATIVE_INFINITY,
            st: Number.POSITIVE_INFINITY
        }
    }
    Af() {
        this.Jd !== null && clearTimeout(this.Jd),
        this.Gd = 0,
        this.Jd = null,
        this.Qd = {
            nt: Number.NEGATIVE_INFINITY,
            st: Number.POSITIVE_INFINITY
        }
    }
    Ff(t) {
        if (this.bf || this.sf !== null || this.yf(t))
            return;
        const i = this.Cf(t);
        this.Bf(i, this.Of.jf),
        this.Mf = !0
    }
    Hf(t) {
        const i = Xt(t.changedTouches, v(this.gf));
        if (i === null || (this.wf = wt(t),
        this.ff !== null) || this.mf)
            return;
        this.pf = !0;
        const s = this.Pf(N(i), v(this.sf))
          , {$f: e, Uf: n, Tf: r} = s;
        if (this.ef || !(r < 5)) {
            if (!this.ef) {
                const o = .5 * e
                  , l = n >= o && !this.cn.qf()
                  , a = o > n && !this.cn.Yf();
                l || a || (this.mf = !0),
                this.ef = !0,
                this.hf = !0,
                this.Ef(),
                this.Af()
            }
            if (!this.mf) {
                const o = this.Cf(t, i);
                this.Rf(o, this.Of.Xf),
                H(t)
            }
        }
    }
    Kf(t) {
        if (t.button !== 0)
            return;
        const i = this.Pf(N(t), v(this.nf))
          , {Tf: s} = i;
        if (s >= 5 && (this.rf = !0,
        this.If()),
        this.rf) {
            const e = this.Cf(t);
            this.Bf(e, this.Of.Zf)
        }
    }
    Pf(t, i) {
        const s = Math.abs(i.nt - t.nt)
          , e = Math.abs(i.st - t.st);
        return {
            $f: s,
            Uf: e,
            Tf: s + e
        }
    }
    Gf(t) {
        let i = Xt(t.changedTouches, v(this.gf));
        if (i === null && t.touches.length === 0 && (i = t.changedTouches[0]),
        i === null)
            return;
        this.gf = null,
        this.wf = wt(t),
        this.Ef(),
        this.sf = null,
        this.df && (this.df(),
        this.df = null);
        const s = this.Cf(t, i);
        if (this.Rf(s, this.Of.Jf),
        ++this.Gd,
        this.Jd && this.Gd > 1) {
            const {Tf: e} = this.Pf(N(i), this.Qd);
            e < 30 && !this.hf && this.Rf(s, this.Of.Df),
            this.Af()
        } else
            this.hf || (this.Rf(s, this.Of.Qf),
            this.Of.Qf && H(t));
        this.Gd === 0 && H(t),
        t.touches.length === 0 && this.if && (this.if = !1,
        H(t))
    }
    Sf(t) {
        if (t.button !== 0)
            return;
        const i = this.Cf(t);
        if (this.nf = null,
        this.bf = !1,
        this.cf && (this.cf(),
        this.cf = null),
        hs() && this.zf.ownerDocument.documentElement.removeEventListener("mouseleave", this.xf),
        !this.yf(t))
            if (this.Bf(i, this.Of.tv),
            ++this.Xd,
            this.Kd && this.Xd > 1) {
                const {Tf: s} = this.Pf(N(t), this.Zd);
                s < 5 && !this.rf && this.Bf(i, this.Of.Vf),
                this.If()
            } else
                this.rf || this.Bf(i, this.Of.iv)
    }
    Ef() {
        this.tf !== null && (clearTimeout(this.tf),
        this.tf = null)
    }
    nv(t) {
        if (this.gf !== null)
            return;
        const i = t.changedTouches[0];
        this.gf = i.identifier,
        this.wf = wt(t);
        const s = this.zf.ownerDocument.documentElement;
        this.hf = !1,
        this.ef = !1,
        this.mf = !1,
        this.sf = N(i),
        this.df && (this.df(),
        this.df = null);
        {
            const n = this.Hf.bind(this)
              , r = this.Gf.bind(this);
            this.df = ()=>{
                s.removeEventListener("touchmove", n),
                s.removeEventListener("touchend", r)
            }
            ,
            s.addEventListener("touchmove", n, {
                passive: !1
            }),
            s.addEventListener("touchend", r, {
                passive: !1
            }),
            this.Ef(),
            this.tf = setTimeout(this.sv.bind(this, t), 240)
        }
        const e = this.Cf(t, i);
        this.Rf(e, this.Of.ev),
        this.Jd || (this.Gd = 0,
        this.Jd = setTimeout(this.Af.bind(this), 500),
        this.Qd = N(i))
    }
    rv(t) {
        if (t.button !== 0)
            return;
        const i = this.zf.ownerDocument.documentElement;
        hs() && i.addEventListener("mouseleave", this.xf),
        this.rf = !1,
        this.nf = N(t),
        this.cf && (this.cf(),
        this.cf = null);
        {
            const e = this.Kf.bind(this)
              , n = this.Sf.bind(this);
            this.cf = ()=>{
                i.removeEventListener("mousemove", e),
                i.removeEventListener("mouseup", n)
            }
            ,
            i.addEventListener("mousemove", e),
            i.addEventListener("mouseup", n)
        }
        if (this.bf = !0,
        this.yf(t))
            return;
        const s = this.Cf(t);
        this.Bf(s, this.Of.hv),
        this.Kd || (this.Xd = 0,
        this.Kd = setTimeout(this.If.bind(this), 500),
        this.Zd = N(t))
    }
    Lf() {
        this.zf.addEventListener("mouseenter", this.Nf.bind(this)),
        this.zf.addEventListener("touchcancel", this.Ef.bind(this));
        {
            const t = this.zf.ownerDocument
              , i = s=>{
                this.Of.lv && (s.composed && this.zf.contains(s.composedPath()[0]) || s.target && this.zf.contains(s.target) || this.Of.lv())
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
        Zt() && (this._f = ()=>{
            this.zf.removeEventListener("dblclick", this.kf)
        }
        ,
        this.zf.addEventListener("dblclick", this.kf)),
        this.zf.addEventListener("mouseleave", this.av.bind(this)),
        this.zf.addEventListener("touchstart", this.nv.bind(this), {
            passive: !0
        }),
        Dh(this.zf),
        this.zf.addEventListener("mousedown", this.rv.bind(this)),
        this.ov(),
        this.zf.addEventListener("touchmove", ()=>{}
        , {
            passive: !1
        })
    }
    ov() {
        this.Of._v === void 0 && this.Of.uv === void 0 && this.Of.cv === void 0 || (this.zf.addEventListener("touchstart", t=>this.dv(t.touches), {
            passive: !0
        }),
        this.zf.addEventListener("touchmove", t=>{
            if (t.touches.length === 2 && this.ff !== null && this.Of.uv !== void 0) {
                const i = ns(t.touches[0], t.touches[1]) / this.vf;
                this.Of.uv(this.ff, i),
                H(t)
            }
        }
        , {
            passive: !1
        }),
        this.zf.addEventListener("touchend", t=>{
            this.dv(t.touches)
        }
        ))
    }
    dv(t) {
        t.length === 1 && (this.pf = !1),
        t.length !== 2 || this.pf || this.if ? this.fv() : this.vv(t)
    }
    vv(t) {
        const i = this.zf.getBoundingClientRect() || {
            left: 0,
            top: 0
        };
        this.ff = {
            nt: (t[0].clientX - i.left + (t[1].clientX - i.left)) / 2,
            st: (t[0].clientY - i.top + (t[1].clientY - i.top)) / 2
        },
        this.vf = ns(t[0], t[1]),
        this.Of._v !== void 0 && this.Of._v(),
        this.Ef()
    }
    fv() {
        this.ff !== null && (this.ff = null,
        this.Of.cv !== void 0 && this.Of.cv())
    }
    av(t) {
        if (this.uf && this.uf(),
        this.yf(t) || !this.Mf)
            return;
        const i = this.Cf(t);
        this.Bf(i, this.Of.pv),
        this.Mf = !Zt()
    }
    sv(t) {
        const i = Xt(t.touches, v(this.gf));
        if (i === null)
            return;
        const s = this.Cf(t, i);
        this.Rf(s, this.Of.mv),
        this.hf = !0,
        this.if = !0
    }
    yf(t) {
        return t.sourceCapabilities && t.sourceCapabilities.firesTouchEvents !== void 0 ? t.sourceCapabilities.firesTouchEvents : wt(t) < this.wf + 500
    }
    Rf(t, i) {
        i && i.call(this.Of, t)
    }
    Bf(t, i) {
        i && i.call(this.Of, t)
    }
    Cf(t, i) {
        const s = i || t
          , e = this.zf.getBoundingClientRect() || {
            left: 0,
            top: 0
        };
        return {
            clientX: s.clientX,
            clientY: s.clientY,
            pageX: s.pageX,
            pageY: s.pageY,
            screenX: s.screenX,
            screenY: s.screenY,
            localX: s.clientX - e.left,
            localY: s.clientY - e.top,
            ctrlKey: t.ctrlKey,
            altKey: t.altKey,
            shiftKey: t.shiftKey,
            metaKey: t.metaKey,
            bv: !t.type.startsWith("mouse") && t.type !== "contextmenu" && t.type !== "click",
            wv: t.type,
            gv: s.target,
            Mv: t.view,
            xv: ()=>{
                t.type !== "touchstart" && H(t)
            }
        }
    }
}
function ns(h, t) {
    const i = h.clientX - t.clientX
      , s = h.clientY - t.clientY;
    return Math.sqrt(i * i + s * s)
}
function H(h) {
    h.cancelable && h.preventDefault()
}
function N(h) {
    return {
        nt: h.pageX,
        st: h.pageY
    }
}
function wt(h) {
    return h.timeStamp || performance.now()
}
function Xt(h, t) {
    for (let i = 0; i < h.length; ++i)
        if (h[i].identifier === t)
            return h[i];
    return null
}
function St(h) {
    return {
        jc: h.jc,
        Sv: {
            wr: h.kv.externalId
        },
        yv: h.kv.cursorStyle
    }
}
function Bh(h, t, i) {
    for (const s of h) {
        const e = s.gt();
        if (e !== null && e.br) {
            const n = e.br(t, i);
            if (n !== null)
                return {
                    Mv: s,
                    Sv: n
                }
        }
    }
    return null
}
function Yt(h, t) {
    return i=>{
        var s, e, n, r;
        return ((e = (s = i.Dt()) === null || s === void 0 ? void 0 : s.Ta()) !== null && e !== void 0 ? e : "") !== t ? [] : (r = (n = i.ca) === null || n === void 0 ? void 0 : n.call(i, h)) !== null && r !== void 0 ? r : []
    }
}
function rs(h, t, i, s) {
    if (!h.length)
        return;
    let e = 0;
    const n = i / 2
      , r = h[0].Vt(s, !0);
    let o = t === 1 ? n - (h[0].Oi() - r / 2) : h[0].Oi() - r / 2 - n;
    o = Math.max(0, o);
    for (let l = 1; l < h.length; l++) {
        const a = h[l]
          , u = h[l - 1]
          , c = u.Vt(s, !1)
          , d = a.Oi()
          , f = u.Oi();
        if (t === 1 ? d > f - c : d < f + c) {
            const m = f - c * t;
            a.Ai(m);
            const p = m - t * c / 2;
            if ((t === 1 ? p < 0 : p > i) && o > 0) {
                const b = t === 1 ? -1 - p : p - i
                  , g = Math.min(b, o);
                for (let w = e; w < h.length; w++)
                    h[w].Ai(h[w].Oi() + t * g);
                o -= g
            }
        } else
            e = l,
            o = t === 1 ? f - c - d : d - (f + c)
    }
}
class os {
    constructor(t, i, s, e) {
        this.Li = null,
        this.Cv = null,
        this.Tv = !1,
        this.Pv = new lt(200),
        this.Jr = null,
        this.Rv = 0,
        this.Dv = !1,
        this.Ov = ()=>{
            this.Dv || this.tn.Av().$t().$h()
        }
        ,
        this.Bv = ()=>{
            this.Dv || this.tn.Av().$t().$h()
        }
        ,
        this.tn = t,
        this.cn = i,
        this.So = i.layout,
        this.Oc = s,
        this.Vv = e === "left",
        this.Iv = Yt("normal", e),
        this.zv = Yt("top", e),
        this.Lv = Yt("bottom", e),
        this.Ev = document.createElement("div"),
        this.Ev.style.height = "100%",
        this.Ev.style.overflow = "hidden",
        this.Ev.style.width = "25px",
        this.Ev.style.left = "0",
        this.Ev.style.position = "relative",
        this.Nv = J(this.Ev, M({
            width: 16,
            height: 16
        })),
        this.Nv.subscribeSuggestedBitmapSizeChanged(this.Ov);
        const n = this.Nv.canvasElement;
        n.style.position = "absolute",
        n.style.zIndex = "1",
        n.style.left = "0",
        n.style.top = "0",
        this.Fv = J(this.Ev, M({
            width: 16,
            height: 16
        })),
        this.Fv.subscribeSuggestedBitmapSizeChanged(this.Bv);
        const r = this.Fv.canvasElement;
        r.style.position = "absolute",
        r.style.zIndex = "2",
        r.style.left = "0",
        r.style.top = "0";
        const o = {
            hv: this.Wv.bind(this),
            ev: this.Wv.bind(this),
            Zf: this.jv.bind(this),
            Xf: this.jv.bind(this),
            lv: this.Hv.bind(this),
            tv: this.$v.bind(this),
            Jf: this.$v.bind(this),
            Vf: this.Uv.bind(this),
            Df: this.Uv.bind(this),
            Wf: this.qv.bind(this),
            pv: this.Yv.bind(this)
        };
        this.Xv = new vi(this.Fv.canvasElement,o,{
            qf: ()=>!this.cn.handleScroll.vertTouchDrag,
            Yf: ()=>!0
        })
    }
    S() {
        this.Xv.S(),
        this.Fv.unsubscribeSuggestedBitmapSizeChanged(this.Bv),
        K(this.Fv.canvasElement),
        this.Fv.dispose(),
        this.Nv.unsubscribeSuggestedBitmapSizeChanged(this.Ov),
        K(this.Nv.canvasElement),
        this.Nv.dispose(),
        this.Li !== null && this.Li.Ko().p(this),
        this.Li = null
    }
    Kv() {
        return this.Ev
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
        if (this.Li === null)
            return 0;
        let t = 0;
        const i = this.Zv()
          , s = v(this.Nv.canvasElement.getContext("2d"));
        s.save();
        const e = this.Li.ja();
        s.font = this.Jv(),
        e.length > 0 && (t = Math.max(this.Pv.xi(s, e[0].no), this.Pv.xi(s, e[e.length - 1].no)));
        const n = this.Qv();
        for (let l = n.length; l--; ) {
            const a = this.Pv.xi(s, n[l].Zt());
            a > t && (t = a)
        }
        const r = this.Li.Ct();
        if (r !== null && this.Cv !== null) {
            const l = this.Li.pn(1, r)
              , a = this.Li.pn(this.Cv.height - 2, r);
            t = Math.max(t, this.Pv.xi(s, this.Li.Fi(Math.floor(Math.min(l, a)) + .11111111111111, r)), this.Pv.xi(s, this.Li.Fi(Math.ceil(Math.max(l, a)) - .11111111111111, r)))
        }
        s.restore();
        const o = t || 34;
        return hi(Math.ceil(i.C + i.T + i.V + i.I + 5 + o))
    }
    tp(t) {
        this.Cv !== null && A(this.Cv, t) || (this.Cv = t,
        this.Dv = !0,
        this.Nv.resizeCanvasElement(t),
        this.Fv.resizeCanvasElement(t),
        this.Dv = !1,
        this.Ev.style.width = `${t.width}px`,
        this.Ev.style.height = `${t.height}px`)
    }
    ip() {
        return v(this.Cv).width
    }
    Gi(t) {
        this.Li !== t && (this.Li !== null && this.Li.Ko().p(this),
        this.Li = t,
        t.Ko().l(this.do.bind(this), this))
    }
    Dt() {
        return this.Li
    }
    ir() {
        const t = this.tn.np();
        this.tn.Av().$t().L_(t, v(this.Dt()))
    }
    sp(t) {
        if (this.Cv === null)
            return;
        if (t !== 1) {
            this.ep(),
            this.Nv.applySuggestedBitmapSize();
            const s = j(this.Nv);
            s !== null && (s.useBitmapCoordinateSpace(e=>{
                this.rp(e),
                this.Ve(e)
            }
            ),
            this.tn.hp(s, this.Lv),
            this.lp(s),
            this.tn.hp(s, this.Iv),
            this.ap(s))
        }
        this.Fv.applySuggestedBitmapSize();
        const i = j(this.Fv);
        i !== null && (i.useBitmapCoordinateSpace(({context: s, bitmapSize: e})=>{
            s.clearRect(0, 0, e.width, e.height)
        }
        ),
        this.op(i),
        this.tn.hp(i, this.zv))
    }
    _p() {
        return this.Nv.bitmapSize
    }
    up(t, i, s) {
        const e = this._p();
        e.width > 0 && e.height > 0 && t.drawImage(this.Nv.canvasElement, i, s)
    }
    bt() {
        var t;
        (t = this.Li) === null || t === void 0 || t.ja()
    }
    Wv(t) {
        if (this.Li === null || this.Li.Ni() || !this.cn.handleScale.axisPressedMouseMove.price)
            return;
        const i = this.tn.Av().$t()
          , s = this.tn.np();
        this.Tv = !0,
        i.D_(s, this.Li, t.localY)
    }
    jv(t) {
        if (this.Li === null || !this.cn.handleScale.axisPressedMouseMove.price)
            return;
        const i = this.tn.Av().$t()
          , s = this.tn.np()
          , e = this.Li;
        i.O_(s, e, t.localY)
    }
    Hv() {
        if (this.Li === null || !this.cn.handleScale.axisPressedMouseMove.price)
            return;
        const t = this.tn.Av().$t()
          , i = this.tn.np()
          , s = this.Li;
        this.Tv && (this.Tv = !1,
        t.A_(i, s))
    }
    $v(t) {
        if (this.Li === null || !this.cn.handleScale.axisPressedMouseMove.price)
            return;
        const i = this.tn.Av().$t()
          , s = this.tn.np();
        this.Tv = !1,
        i.A_(s, this.Li)
    }
    Uv(t) {
        this.cn.handleScale.axisDoubleClickReset.price && this.ir()
    }
    qv(t) {
        this.Li !== null && (!this.tn.Av().$t().W().handleScale.axisPressedMouseMove.price || this.Li.gh() || this.Li.Oo() || this.cp(1))
    }
    Yv(t) {
        this.cp(0)
    }
    Qv() {
        const t = []
          , i = this.Li === null ? void 0 : this.Li;
        return (s=>{
            for (let e = 0; e < s.length; ++e) {
                const n = s[e].Rn(this.tn.np(), i);
                for (let r = 0; r < n.length; r++)
                    t.push(n[r])
            }
        }
        )(this.tn.np().$o()),
        t
    }
    rp({context: t, bitmapSize: i}) {
        const {width: s, height: e} = i
          , n = this.tn.np().$t()
          , r = n.q()
          , o = n.md();
        r === o ? Ot(t, 0, 0, s, e, r) : ys(t, 0, 0, s, e, r, o)
    }
    Ve({context: t, bitmapSize: i, horizontalPixelRatio: s}) {
        if (this.Cv === null || this.Li === null || !this.Li.W().borderVisible)
            return;
        t.fillStyle = this.Li.W().borderColor;
        const e = Math.max(1, Math.floor(this.Zv().C * s));
        let n;
        n = this.Vv ? i.width - e : 0,
        t.fillRect(n, 0, e, i.height)
    }
    lp(t) {
        if (this.Cv === null || this.Li === null)
            return;
        const i = this.Li.ja()
          , s = this.Li.W()
          , e = this.Zv()
          , n = this.Vv ? this.Cv.width - e.T : 0;
        s.borderVisible && s.ticksVisible && t.useBitmapCoordinateSpace(({context: r, horizontalPixelRatio: o, verticalPixelRatio: l})=>{
            r.fillStyle = s.borderColor;
            const a = Math.max(1, Math.floor(l))
              , u = Math.floor(.5 * l)
              , c = Math.round(e.T * o);
            r.beginPath();
            for (const d of i)
                r.rect(Math.floor(n * o), Math.round(d.La * l) - u, c, a);
            r.fill()
        }
        ),
        t.useMediaCoordinateSpace(({context: r})=>{
            var o;
            r.font = this.Jv(),
            r.fillStyle = (o = s.textColor) !== null && o !== void 0 ? o : this.So.textColor,
            r.textAlign = this.Vv ? "right" : "left",
            r.textBaseline = "middle";
            const l = this.Vv ? Math.round(n - e.V) : Math.round(n + e.T + e.V)
              , a = i.map(u=>this.Pv.Mi(r, u.no));
            for (let u = i.length; u--; ) {
                const c = i[u];
                r.fillText(c.no, l, c.La + a[u])
            }
        }
        )
    }
    ep() {
        if (this.Cv === null || this.Li === null)
            return;
        const t = []
          , i = this.Li.$o().slice()
          , s = this.tn.np()
          , e = this.Zv();
        this.Li === s.vr() && this.tn.np().$o().forEach(r=>{
            s.dr(r) && i.push(r)
        }
        );
        const n = this.Li;
        i.forEach(r=>{
            r.Rn(s, n).forEach(o=>{
                o.Ai(null),
                o.Bi() && t.push(o)
            }
            )
        }
        ),
        t.forEach(r=>r.Ai(r.ki())),
        this.Li.W().alignLabels && this.dp(t, e)
    }
    dp(t, i) {
        if (this.Cv === null)
            return;
        const s = this.Cv.height / 2
          , e = t.filter(r=>r.ki() <= s)
          , n = t.filter(r=>r.ki() > s);
        e.sort((r,o)=>o.ki() - r.ki()),
        n.sort((r,o)=>r.ki() - o.ki());
        for (const r of t) {
            const o = Math.floor(r.Vt(i) / 2)
              , l = r.ki();
            l > -o && l < o && r.Ai(o),
            l > this.Cv.height - o && l < this.Cv.height + o && r.Ai(this.Cv.height - o)
        }
        rs(e, 1, this.Cv.height, i),
        rs(n, -1, this.Cv.height, i)
    }
    ap(t) {
        if (this.Cv === null)
            return;
        const i = this.Qv()
          , s = this.Zv()
          , e = this.Vv ? "right" : "left";
        i.forEach(n=>{
            n.Vi() && n.gt(v(this.Li)).K(t, s, this.Pv, e)
        }
        )
    }
    op(t) {
        if (this.Cv === null || this.Li === null)
            return;
        const i = this.tn.Av().$t()
          , s = []
          , e = this.tn.np()
          , n = i.Yc().Rn(e, this.Li);
        n.length && s.push(n);
        const r = this.Zv()
          , o = this.Vv ? "right" : "left";
        s.forEach(l=>{
            l.forEach(a=>{
                a.gt(v(this.Li)).K(t, r, this.Pv, o)
            }
            )
        }
        )
    }
    cp(t) {
        this.Ev.style.cursor = t === 1 ? "ns-resize" : "default"
    }
    do() {
        const t = this.Gv();
        this.Rv < t && this.tn.Av().$t().Kl(),
        this.Rv = t
    }
    Jv() {
        return Q(this.So.fontSize, this.So.fontFamily)
    }
}
function Fh(h, t) {
    var i, s;
    return (s = (i = h._a) === null || i === void 0 ? void 0 : i.call(h, t)) !== null && s !== void 0 ? s : []
}
function Mt(h, t) {
    var i, s;
    return (s = (i = h.Pn) === null || i === void 0 ? void 0 : i.call(h, t)) !== null && s !== void 0 ? s : []
}
function Ih(h, t) {
    var i, s;
    return (s = (i = h.Ji) === null || i === void 0 ? void 0 : i.call(h, t)) !== null && s !== void 0 ? s : []
}
function Vh(h, t) {
    var i, s;
    return (s = (i = h.la) === null || i === void 0 ? void 0 : i.call(h, t)) !== null && s !== void 0 ? s : []
}
class bi {
    constructor(t, i) {
        this.Cv = M({
            width: 0,
            height: 0
        }),
        this.fp = null,
        this.vp = null,
        this.pp = null,
        this.mp = !1,
        this.bp = new y,
        this.wp = new y,
        this.gp = 0,
        this.Mp = !1,
        this.xp = null,
        this.Sp = !1,
        this.kp = null,
        this.yp = null,
        this.Dv = !1,
        this.Ov = ()=>{
            this.Dv || this.Cp === null || this.$i().$h()
        }
        ,
        this.Bv = ()=>{
            this.Dv || this.Cp === null || this.$i().$h()
        }
        ,
        this.Tp = t,
        this.Cp = i,
        this.Cp.F_().l(this.Pp.bind(this), this, !0),
        this.Rp = document.createElement("td"),
        this.Rp.style.padding = "0",
        this.Rp.style.position = "relative";
        const s = document.createElement("div");
        s.style.width = "100%",
        s.style.height = "100%",
        s.style.position = "relative",
        s.style.overflow = "hidden",
        this.Dp = document.createElement("td"),
        this.Dp.style.padding = "0",
        this.Op = document.createElement("td"),
        this.Op.style.padding = "0",
        this.Rp.appendChild(s),
        this.Nv = J(s, M({
            width: 16,
            height: 16
        })),
        this.Nv.subscribeSuggestedBitmapSizeChanged(this.Ov);
        const e = this.Nv.canvasElement;
        e.style.position = "absolute",
        e.style.zIndex = "1",
        e.style.left = "0",
        e.style.top = "0",
        this.Fv = J(s, M({
            width: 16,
            height: 16
        })),
        this.Fv.subscribeSuggestedBitmapSizeChanged(this.Bv);
        const n = this.Fv.canvasElement;
        n.style.position = "absolute",
        n.style.zIndex = "2",
        n.style.left = "0",
        n.style.top = "0",
        this.Ap = document.createElement("tr"),
        this.Ap.appendChild(this.Dp),
        this.Ap.appendChild(this.Rp),
        this.Ap.appendChild(this.Op),
        this.Bp(),
        this.Xv = new vi(this.Fv.canvasElement,this,{
            qf: ()=>this.xp === null && !this.Tp.W().handleScroll.vertTouchDrag,
            Yf: ()=>this.xp === null && !this.Tp.W().handleScroll.horzTouchDrag
        })
    }
    S() {
        this.fp !== null && this.fp.S(),
        this.vp !== null && this.vp.S(),
        this.Fv.unsubscribeSuggestedBitmapSizeChanged(this.Bv),
        K(this.Fv.canvasElement),
        this.Fv.dispose(),
        this.Nv.unsubscribeSuggestedBitmapSizeChanged(this.Ov),
        K(this.Nv.canvasElement),
        this.Nv.dispose(),
        this.Cp !== null && this.Cp.F_().p(this),
        this.Xv.S()
    }
    np() {
        return v(this.Cp)
    }
    Vp(t) {
        this.Cp !== null && this.Cp.F_().p(this),
        this.Cp = t,
        this.Cp !== null && this.Cp.F_().l(bi.prototype.Pp.bind(this), this, !0),
        this.Bp()
    }
    Av() {
        return this.Tp
    }
    Kv() {
        return this.Ap
    }
    Bp() {
        if (this.Cp !== null && (this.Ip(),
        this.$i().wt().length !== 0)) {
            if (this.fp !== null) {
                const t = this.Cp.P_();
                this.fp.Gi(v(t))
            }
            if (this.vp !== null) {
                const t = this.Cp.R_();
                this.vp.Gi(v(t))
            }
        }
    }
    zp() {
        this.fp !== null && this.fp.bt(),
        this.vp !== null && this.vp.bt()
    }
    g_() {
        return this.Cp !== null ? this.Cp.g_() : 0
    }
    M_(t) {
        this.Cp && this.Cp.M_(t)
    }
    Wf(t) {
        if (!this.Cp)
            return;
        this.Lp();
        const i = t.localX
          , s = t.localY;
        this.Ep(i, s, t)
    }
    hv(t) {
        this.Lp(),
        this.Np(),
        this.Ep(t.localX, t.localY, t)
    }
    jf(t) {
        var i;
        if (!this.Cp)
            return;
        this.Lp();
        const s = t.localX
          , e = t.localY;
        this.Ep(s, e, t);
        const n = this.br(s, e);
        this.Tp.Fp((i = n == null ? void 0 : n.yv) !== null && i !== void 0 ? i : null),
        this.$i().Wc(n && {
            jc: n.jc,
            Sv: n.Sv
        })
    }
    iv(t) {
        this.Cp !== null && (this.Lp(),
        this.Wp(t))
    }
    Vf(t) {
        this.Cp !== null && this.jp(this.wp, t)
    }
    Df(t) {
        this.Vf(t)
    }
    Zf(t) {
        this.Lp(),
        this.Hp(t),
        this.Ep(t.localX, t.localY, t)
    }
    tv(t) {
        this.Cp !== null && (this.Lp(),
        this.Mp = !1,
        this.$p(t))
    }
    Qf(t) {
        this.Cp !== null && this.Wp(t)
    }
    mv(t) {
        if (this.Mp = !0,
        this.xp === null) {
            const i = {
                x: t.localX,
                y: t.localY
            };
            this.Up(i, i, t)
        }
    }
    pv(t) {
        this.Cp !== null && (this.Lp(),
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
        const s = 5 * (i - this.gp);
        this.gp = i,
        this.$i().Jc(t.nt, s)
    }
    ev(t) {
        this.Mp = !1,
        this.Sp = this.xp !== null,
        this.Np();
        const i = this.$i().Yc();
        this.xp !== null && i.yt() && (this.kp = {
            x: i.Yt(),
            y: i.Xt()
        },
        this.xp = {
            x: t.localX,
            y: t.localY
        })
    }
    Xf(t) {
        if (this.Cp === null)
            return;
        const i = t.localX
          , s = t.localY;
        if (this.xp === null)
            this.Hp(t);
        else {
            this.Sp = !1;
            const e = v(this.kp)
              , n = e.x + (i - this.xp.x)
              , r = e.y + (s - this.xp.y);
            this.Ep(n, r, t)
        }
    }
    Jf(t) {
        this.Av().W().trackingMode.exitMode === 0 && (this.Sp = !0),
        this.Kp(),
        this.$p(t)
    }
    br(t, i) {
        const s = this.Cp;
        return s === null ? null : function(e, n, r) {
            const o = e.$o()
              , l = function(a, u, c) {
                var d, f;
                let m, p;
                for (const w of a) {
                    const _ = (f = (d = w.fa) === null || d === void 0 ? void 0 : d.call(w, u, c)) !== null && f !== void 0 ? f : [];
                    for (const S of _)
                        b = S.zOrder,
                        (!(g = m == null ? void 0 : m.zOrder) || b === "top" && g !== "top" || b === "normal" && g === "bottom") && (m = S,
                        p = w)
                }
                var b, g;
                return m && p ? {
                    kv: m,
                    jc: p
                } : null
            }(o, n, r);
            if ((l == null ? void 0 : l.kv.zOrder) === "top")
                return St(l);
            for (const a of o) {
                if (l && l.jc === a && l.kv.zOrder !== "bottom" && !l.kv.isBackground)
                    return St(l);
                const u = Bh(a.Pn(e), n, r);
                if (u !== null)
                    return {
                        jc: a,
                        Mv: u.Mv,
                        Sv: u.Sv
                    };
                if (l && l.jc === a && l.kv.zOrder !== "bottom" && l.kv.isBackground)
                    return St(l)
            }
            return l != null && l.kv ? St(l) : null
        }(s, t, i)
    }
    Zp(t, i) {
        v(i === "left" ? this.fp : this.vp).tp(M({
            width: t,
            height: this.Cv.height
        }))
    }
    Gp() {
        return this.Cv
    }
    tp(t) {
        A(this.Cv, t) || (this.Cv = t,
        this.Dv = !0,
        this.Nv.resizeCanvasElement(t),
        this.Fv.resizeCanvasElement(t),
        this.Dv = !1,
        this.Rp.style.width = t.width + "px",
        this.Rp.style.height = t.height + "px")
    }
    Jp() {
        const t = v(this.Cp);
        t.T_(t.P_()),
        t.T_(t.R_());
        for (const i of t.Aa())
            if (t.dr(i)) {
                const s = i.Dt();
                s !== null && t.T_(s),
                i.On()
            }
    }
    _p() {
        return this.Nv.bitmapSize
    }
    up(t, i, s) {
        const e = this._p();
        e.width > 0 && e.height > 0 && t.drawImage(this.Nv.canvasElement, i, s)
    }
    sp(t) {
        if (t === 0 || this.Cp === null)
            return;
        if (t > 1 && this.Jp(),
        this.fp !== null && this.fp.sp(t),
        this.vp !== null && this.vp.sp(t),
        t !== 1) {
            this.Nv.applySuggestedBitmapSize();
            const s = j(this.Nv);
            s !== null && (s.useBitmapCoordinateSpace(e=>{
                this.rp(e)
            }
            ),
            this.Cp && (this.Qp(s, Fh),
            this.tm(s),
            this.im(s),
            this.Qp(s, Mt),
            this.Qp(s, Ih)))
        }
        this.Fv.applySuggestedBitmapSize();
        const i = j(this.Fv);
        i !== null && (i.useBitmapCoordinateSpace(({context: s, bitmapSize: e})=>{
            s.clearRect(0, 0, e.width, e.height)
        }
        ),
        this.nm(i),
        this.Qp(i, Vh))
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
        this.Cp !== null && this.Cp.F_().p(this),
        this.Cp = null
    }
    Wp(t) {
        this.jp(this.bp, t)
    }
    jp(t, i) {
        const s = i.localX
          , e = i.localY;
        t.M() && t.m(this.$i().St().Eu(s), {
            x: s,
            y: e
        }, i)
    }
    rp({context: t, bitmapSize: i}) {
        const {width: s, height: e} = i
          , n = this.$i()
          , r = n.q()
          , o = n.md();
        r === o ? Ot(t, 0, 0, s, e, o) : ys(t, 0, 0, s, e, r, o)
    }
    tm(t) {
        const i = v(this.Cp).W_().Uh().gt();
        i !== null && i.K(t, !1)
    }
    im(t) {
        const i = this.$i().qc();
        this.hm(t, Mt, ni, i),
        this.hm(t, Mt, yt, i)
    }
    nm(t) {
        this.hm(t, Mt, yt, this.$i().Yc())
    }
    Qp(t, i) {
        const s = v(this.Cp).$o();
        for (const e of s)
            this.hm(t, i, ni, e);
        for (const e of s)
            this.hm(t, i, yt, e)
    }
    hm(t, i, s, e) {
        const n = v(this.Cp)
          , r = n.$t().Fc()
          , o = r !== null && r.jc === e
          , l = r !== null && o && r.Sv !== void 0 ? r.Sv.gr : void 0;
        ri(i, a=>s(a, t, o, l), e, n)
    }
    Ip() {
        if (this.Cp === null)
            return;
        const t = this.Tp
          , i = this.Cp.P_().W().visible
          , s = this.Cp.R_().W().visible;
        i || this.fp === null || (this.Dp.removeChild(this.fp.Kv()),
        this.fp.S(),
        this.fp = null),
        s || this.vp === null || (this.Op.removeChild(this.vp.Kv()),
        this.vp.S(),
        this.vp = null);
        const e = t.$t()._d();
        i && this.fp === null && (this.fp = new os(this,t.W(),e,"left"),
        this.Dp.appendChild(this.fp.Kv())),
        s && this.vp === null && (this.vp = new os(this,t.W(),e,"right"),
        this.Op.appendChild(this.vp.Kv()))
    }
    lm(t) {
        return t.bv && this.Mp || this.xp !== null
    }
    am(t) {
        return Math.max(0, Math.min(t, this.Cv.width - 1))
    }
    om(t) {
        return Math.max(0, Math.min(t, this.Cv.height - 1))
    }
    Ep(t, i, s) {
        this.$i().hd(this.am(t), this.om(i), s, v(this.Cp))
    }
    qp() {
        this.$i().ad()
    }
    Kp() {
        this.Sp && (this.xp = null,
        this.qp())
    }
    Up(t, i, s) {
        this.xp = t,
        this.Sp = !1,
        this.Ep(i.x, i.y, s);
        const e = this.$i().Yc();
        this.kp = {
            x: e.Yt(),
            y: e.Xt()
        }
    }
    $i() {
        return this.Tp.$t()
    }
    $p(t) {
        if (!this.mp)
            return;
        const i = this.$i()
          , s = this.np();
        if (i.I_(s, s.vn()),
        this.pp = null,
        this.mp = !1,
        i.sd(),
        this.yp !== null) {
            const e = performance.now()
              , n = i.St();
            this.yp.Dr(n.ju(), e),
            this.yp.Ju(e) || i.Xn(this.yp)
        }
    }
    Lp() {
        this.xp = null
    }
    Np() {
        if (this.Cp) {
            if (this.$i().Un(),
            document.activeElement !== document.body && document.activeElement !== document.documentElement)
                v(document.activeElement).blur();
            else {
                const t = document.getSelection();
                t !== null && t.removeAllRanges()
            }
            !this.Cp.vn().Ni() && this.$i().St().Ni()
        }
    }
    Hp(t) {
        if (this.Cp === null)
            return;
        const i = this.$i()
          , s = i.St();
        if (s.Ni())
            return;
        const e = this.Tp.W()
          , n = e.handleScroll
          , r = e.kineticScroll;
        if ((!n.pressedMouseMove || t.bv) && (!n.horzTouchDrag && !n.vertTouchDrag || !t.bv))
            return;
        const o = this.Cp.vn()
          , l = performance.now();
        if (this.pp !== null || this.lm(t) || (this.pp = {
            x: t.clientX,
            y: t.clientY,
            Od: l,
            _m: t.localX,
            um: t.localY
        }),
        this.pp !== null && !this.mp && (this.pp.x !== t.clientX || this.pp.y !== t.clientY)) {
            if (t.bv && r.touch || !t.bv && r.mouse) {
                const a = s.he();
                this.yp = new Rh(.2 / a,7 / a,.997,15 / a),
                this.yp.qd(s.ju(), this.pp.Od)
            } else
                this.yp = null;
            o.Ni() || i.B_(this.Cp, o, t.localY),
            i.td(t.localX),
            this.mp = !0
        }
        this.mp && (o.Ni() || i.V_(this.Cp, o, t.localY),
        i.nd(t.localX),
        this.yp !== null && this.yp.qd(s.ju(), l))
    }
}
class ls {
    constructor(t, i, s, e, n) {
        this.ft = !0,
        this.Cv = M({
            width: 0,
            height: 0
        }),
        this.Ov = ()=>this.sp(3),
        this.Vv = t === "left",
        this.Oc = s._d,
        this.cn = i,
        this.dm = e,
        this.fm = n,
        this.Ev = document.createElement("div"),
        this.Ev.style.width = "25px",
        this.Ev.style.height = "100%",
        this.Ev.style.overflow = "hidden",
        this.Nv = J(this.Ev, M({
            width: 16,
            height: 16
        })),
        this.Nv.subscribeSuggestedBitmapSizeChanged(this.Ov)
    }
    S() {
        this.Nv.unsubscribeSuggestedBitmapSizeChanged(this.Ov),
        K(this.Nv.canvasElement),
        this.Nv.dispose()
    }
    Kv() {
        return this.Ev
    }
    Gp() {
        return this.Cv
    }
    tp(t) {
        A(this.Cv, t) || (this.Cv = t,
        this.Nv.resizeCanvasElement(t),
        this.Ev.style.width = `${t.width}px`,
        this.Ev.style.height = `${t.height}px`,
        this.ft = !0)
    }
    sp(t) {
        if (t < 3 && !this.ft || this.Cv.width === 0 || this.Cv.height === 0)
            return;
        this.ft = !1,
        this.Nv.applySuggestedBitmapSize();
        const i = j(this.Nv);
        i !== null && i.useBitmapCoordinateSpace(s=>{
            this.rp(s),
            this.Ve(s)
        }
        )
    }
    _p() {
        return this.Nv.bitmapSize
    }
    up(t, i, s) {
        const e = this._p();
        e.width > 0 && e.height > 0 && t.drawImage(this.Nv.canvasElement, i, s)
    }
    Ve({context: t, bitmapSize: i, horizontalPixelRatio: s, verticalPixelRatio: e}) {
        if (!this.dm())
            return;
        t.fillStyle = this.cn.timeScale.borderColor;
        const n = Math.floor(this.Oc.W().C * s)
          , r = Math.floor(this.Oc.W().C * e)
          , o = this.Vv ? i.width - n : 0;
        t.fillRect(o, 0, n, r)
    }
    rp({context: t, bitmapSize: i}) {
        Ot(t, 0, 0, i.width, i.height, this.fm())
    }
}
function gi(h) {
    return t=>{
        var i, s;
        return (s = (i = t.da) === null || i === void 0 ? void 0 : i.call(t, h)) !== null && s !== void 0 ? s : []
    }
}
const Ah = gi("normal")
  , jh = gi("top")
  , Uh = gi("bottom");
class Jh {
    constructor(t, i) {
        this.vm = null,
        this.pm = null,
        this.k = null,
        this.bm = !1,
        this.Cv = M({
            width: 0,
            height: 0
        }),
        this.wm = new y,
        this.Pv = new lt(5),
        this.Dv = !1,
        this.Ov = ()=>{
            this.Dv || this.Tp.$t().$h()
        }
        ,
        this.Bv = ()=>{
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
        this.Ev = document.createElement("td"),
        this.Ev.style.height = "25px",
        this.Ev.style.padding = "0",
        this.Sm = document.createElement("div"),
        this.Sm.style.width = "100%",
        this.Sm.style.height = "100%",
        this.Sm.style.position = "relative",
        this.Sm.style.overflow = "hidden",
        this.Ev.appendChild(this.Sm),
        this.Nv = J(this.Sm, M({
            width: 16,
            height: 16
        })),
        this.Nv.subscribeSuggestedBitmapSizeChanged(this.Ov);
        const s = this.Nv.canvasElement;
        s.style.position = "absolute",
        s.style.zIndex = "1",
        s.style.left = "0",
        s.style.top = "0",
        this.Fv = J(this.Sm, M({
            width: 16,
            height: 16
        })),
        this.Fv.subscribeSuggestedBitmapSizeChanged(this.Bv);
        const e = this.Fv.canvasElement;
        e.style.position = "absolute",
        e.style.zIndex = "2",
        e.style.left = "0",
        e.style.top = "0",
        this.gm.appendChild(this.Mm),
        this.gm.appendChild(this.Ev),
        this.gm.appendChild(this.xm),
        this.km(),
        this.Tp.$t().w_().l(this.km.bind(this), this),
        this.Xv = new vi(this.Fv.canvasElement,this,{
            qf: ()=>!0,
            Yf: ()=>!this.Tp.W().handleScroll.horzTouchDrag
        })
    }
    S() {
        this.Xv.S(),
        this.vm !== null && this.vm.S(),
        this.pm !== null && this.pm.S(),
        this.Fv.unsubscribeSuggestedBitmapSizeChanged(this.Bv),
        K(this.Fv.canvasElement),
        this.Fv.dispose(),
        this.Nv.unsubscribeSuggestedBitmapSizeChanged(this.Ov),
        K(this.Nv.canvasElement),
        this.Nv.dispose()
    }
    Kv() {
        return this.gm
    }
    ym() {
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
    Vf() {
        this.Tp.W().handleScale.axisDoubleClickReset.time && this.Tp.$t().Zn()
    }
    Df() {
        this.Vf()
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
    Pm(t, i, s) {
        A(this.Cv, t) || (this.Cv = t,
        this.Dv = !0,
        this.Nv.resizeCanvasElement(t),
        this.Fv.resizeCanvasElement(t),
        this.Dv = !1,
        this.Ev.style.width = `${t.width}px`,
        this.Ev.style.height = `${t.height}px`,
        this.wm.m(t)),
        this.vm !== null && this.vm.tp(M({
            width: i,
            height: t.height
        })),
        this.pm !== null && this.pm.tp(M({
            width: s,
            height: t.height
        }))
    }
    Rm() {
        const t = this.Dm();
        return Math.ceil(t.C + t.T + t.P + t.L + t.B + t.Om)
    }
    bt() {
        this.Tp.$t().St().ja()
    }
    _p() {
        return this.Nv.bitmapSize
    }
    up(t, i, s) {
        const e = this._p();
        e.width > 0 && e.height > 0 && t.drawImage(this.Nv.canvasElement, i, s)
    }
    sp(t) {
        if (t === 0)
            return;
        if (t !== 1) {
            this.Nv.applySuggestedBitmapSize();
            const s = j(this.Nv);
            s !== null && (s.useBitmapCoordinateSpace(e=>{
                this.rp(e),
                this.Ve(e),
                this.Am(s, Uh)
            }
            ),
            this.lp(s),
            this.Am(s, Ah)),
            this.vm !== null && this.vm.sp(t),
            this.pm !== null && this.pm.sp(t)
        }
        this.Fv.applySuggestedBitmapSize();
        const i = j(this.Fv);
        i !== null && (i.useBitmapCoordinateSpace(({context: s, bitmapSize: e})=>{
            s.clearRect(0, 0, e.width, e.height)
        }
        ),
        this.Bm([...this.Tp.$t().wt(), this.Tp.$t().Yc()], i),
        this.Am(i, jh))
    }
    Am(t, i) {
        const s = this.Tp.$t().wt();
        for (const e of s)
            ri(i, n=>ni(n, t, !1, void 0), e, void 0);
        for (const e of s)
            ri(i, n=>yt(n, t, !1, void 0), e, void 0)
    }
    rp({context: t, bitmapSize: i}) {
        Ot(t, 0, 0, i.width, i.height, this.Tp.$t().md())
    }
    Ve({context: t, bitmapSize: i, verticalPixelRatio: s}) {
        if (this.Tp.W().timeScale.borderVisible) {
            t.fillStyle = this.Vm();
            const e = Math.max(1, Math.floor(this.Dm().C * s));
            t.fillRect(0, 0, i.width, e)
        }
    }
    lp(t) {
        const i = this.Tp.$t().St()
          , s = i.ja();
        if (!s || s.length === 0)
            return;
        const e = this.U_.maxTickMarkWeight(s)
          , n = this.Dm()
          , r = i.W();
        r.borderVisible && r.ticksVisible && t.useBitmapCoordinateSpace(({context: o, horizontalPixelRatio: l, verticalPixelRatio: a})=>{
            o.strokeStyle = this.Vm(),
            o.fillStyle = this.Vm();
            const u = Math.max(1, Math.floor(l))
              , c = Math.floor(.5 * l);
            o.beginPath();
            const d = Math.round(n.T * a);
            for (let f = s.length; f--; ) {
                const m = Math.round(s[f].coord * l);
                o.rect(m - c, 0, u, d)
            }
            o.fill()
        }
        ),
        t.useMediaCoordinateSpace(({context: o})=>{
            const l = n.C + n.T + n.L + n.P / 2;
            o.textAlign = "center",
            o.textBaseline = "middle",
            o.fillStyle = this.$(),
            o.font = this.Jv();
            for (const a of s)
                if (a.weight < e) {
                    const u = a.needAlignCoordinate ? this.Im(o, a.coord, a.label) : a.coord;
                    o.fillText(a.label, u, l)
                }
            this.Tp.W().timeScale.allowBoldLabels && (o.font = this.zm());
            for (const a of s)
                if (a.weight >= e) {
                    const u = a.needAlignCoordinate ? this.Im(o, a.coord, a.label) : a.coord;
                    o.fillText(a.label, u, l)
                }
        }
        )
    }
    Im(t, i, s) {
        const e = this.Pv.xi(t, s)
          , n = e / 2
          , r = Math.floor(i - n) + .5;
        return r < 0 ? i += Math.abs(0 - r) : r + e > this.Cv.width && (i -= Math.abs(this.Cv.width - (r + e))),
        i
    }
    Bm(t, i) {
        const s = this.Dm();
        for (const e of t)
            for (const n of e.Qi())
                n.gt().K(i, s)
    }
    Vm() {
        return this.Tp.W().timeScale.borderColor
    }
    $() {
        return this.cn.textColor
    }
    j() {
        return this.cn.fontSize
    }
    Jv() {
        return Q(this.j(), this.cn.fontFamily)
    }
    zm() {
        return Q(this.j(), this.cn.fontFamily, "bold")
    }
    Dm() {
        this.k === null && (this.k = {
            C: 1,
            N: NaN,
            L: NaN,
            B: NaN,
            ji: NaN,
            T: 5,
            P: NaN,
            R: "",
            Wi: new lt,
            Om: 0
        });
        const t = this.k
          , i = this.Jv();
        if (t.R !== i) {
            const s = this.j();
            t.P = s,
            t.R = i,
            t.L = 3 * s / 12,
            t.B = 3 * s / 12,
            t.ji = 9 * s / 12,
            t.N = 0,
            t.Om = 4 * s / 12,
            t.Wi.ir()
        }
        return this.k
    }
    cp(t) {
        this.Ev.style.cursor = t === 1 ? "ew-resize" : "default"
    }
    km() {
        const t = this.Tp.$t()
          , i = t.W();
        i.leftPriceScale.visible || this.vm === null || (this.Mm.removeChild(this.vm.Kv()),
        this.vm.S(),
        this.vm = null),
        i.rightPriceScale.visible || this.pm === null || (this.xm.removeChild(this.pm.Kv()),
        this.pm.S(),
        this.pm = null);
        const s = {
            _d: this.Tp.$t()._d()
        }
          , e = ()=>i.leftPriceScale.borderVisible && t.St().W().borderVisible
          , n = ()=>t.md();
        i.leftPriceScale.visible && this.vm === null && (this.vm = new ls("left",i,s,e,n),
        this.Mm.appendChild(this.vm.Kv())),
        i.rightPriceScale.visible && this.pm === null && (this.pm = new ls("right",i,s,e,n),
        this.xm.appendChild(this.pm.Kv()))
    }
}
const Kh = !!q && !!navigator.userAgentData && navigator.userAgentData.brands.some(h=>h.brand.includes("Chromium")) && !!q && (!((Qt = navigator == null ? void 0 : navigator.userAgentData) === null || Qt === void 0) && Qt.platform ? navigator.userAgentData.platform === "Windows" : navigator.userAgent.toLowerCase().indexOf("win") >= 0);
var Qt;
class Zh {
    constructor(t, i, s) {
        var e;
        this.Lm = [],
        this.Em = 0,
        this.ro = 0,
        this.o_ = 0,
        this.Nm = 0,
        this.Fm = 0,
        this.Wm = null,
        this.jm = !1,
        this.bp = new y,
        this.wp = new y,
        this.Pc = new y,
        this.Hm = null,
        this.$m = null,
        this.Um = t,
        this.cn = i,
        this.U_ = s,
        this.gm = document.createElement("div"),
        this.gm.classList.add("tv-lightweight-charts"),
        this.gm.style.overflow = "hidden",
        this.gm.style.direction = "ltr",
        this.gm.style.width = "100%",
        this.gm.style.height = "100%",
        (e = this.gm).style.userSelect = "none",
        e.style.webkitUserSelect = "none",
        e.style.msUserSelect = "none",
        e.style.MozUserSelect = "none",
        e.style.webkitTapHighlightColor = "transparent",
        this.qm = document.createElement("table"),
        this.qm.setAttribute("cellspacing", "0"),
        this.gm.appendChild(this.qm),
        this.Ym = this.Xm.bind(this),
        qt(this.cn) && this.Km(!0),
        this.$i = new Th(this.Dc.bind(this),this.cn,s),
        this.$t().Xc().l(this.Zm.bind(this), this),
        this.Gm = new Jh(this,this.U_),
        this.qm.appendChild(this.Gm.Kv());
        const n = i.autoSize && this.Jm();
        let r = this.cn.width
          , o = this.cn.height;
        if (n || r === 0 || o === 0) {
            const l = t.getBoundingClientRect();
            r = r || l.width,
            o = o || l.height
        }
        this.Qm(r, o),
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
        return this.Lm
    }
    sb() {
        return this.Gm
    }
    S() {
        this.Km(!1),
        this.Em !== 0 && window.cancelAnimationFrame(this.Em),
        this.$i.Xc().p(this),
        this.$i.St().sc().p(this),
        this.$i.w_().p(this),
        this.$i.S();
        for (const t of this.Lm)
            this.qm.removeChild(t.Kv()),
            t.Yp().p(this),
            t.Xp().p(this),
            t.S();
        this.Lm = [],
        v(this.Gm).S(),
        this.gm.parentElement !== null && this.gm.parentElement.removeChild(this.gm),
        this.Pc.S(),
        this.bp.S(),
        this.wp.S(),
        this.eb()
    }
    Qm(t, i, s=!1) {
        if (this.ro === i && this.o_ === t)
            return;
        const e = function(o) {
            const l = Math.floor(o.width)
              , a = Math.floor(o.height);
            return M({
                width: l - l % 2,
                height: a - a % 2
            })
        }(M({
            width: t,
            height: i
        }));
        this.ro = e.height,
        this.o_ = e.width;
        const n = this.ro + "px"
          , r = this.o_ + "px";
        v(this.gm).style.height = n,
        v(this.gm).style.width = r,
        this.qm.style.height = n,
        this.qm.style.width = r,
        s ? this.rb(z.es(), performance.now()) : this.$i.Kl()
    }
    sp(t) {
        t === void 0 && (t = z.es());
        for (let i = 0; i < this.Lm.length; i++)
            this.Lm[i].sp(t.Hn(i).Fn);
        this.cn.timeScale.visible && this.Gm.sp(t.jn())
    }
    Hh(t) {
        const i = qt(this.cn);
        this.$i.Hh(t);
        const s = qt(this.cn);
        s !== i && this.Km(s),
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
        this.Wm !== null && (this.rb(this.Wm, performance.now()),
        this.Wm = null);
        const t = this.ab(null)
          , i = document.createElement("canvas");
        i.width = t.width,
        i.height = t.height;
        const s = v(i.getContext("2d"));
        return this.ab(s),
        i
    }
    ob(t) {
        return t === "left" && !this._b() || t === "right" && !this.ub() || this.Lm.length === 0 ? 0 : v(t === "left" ? this.Lm[0].sm() : this.Lm[0].rm()).ip()
    }
    cb() {
        return this.cn.autoSize && this.Hm !== null
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
        return O(this.Lm[0]).Gp()
    }
    hb(t) {
        (t.autoSize !== void 0 || !this.Hm || t.width === void 0 && t.height === void 0) && (t.autoSize && !this.Hm && this.Jm(),
        t.autoSize === !1 && this.Hm !== null && this.eb(),
        t.autoSize || t.width === void 0 && t.height === void 0 || this.Qm(t.width || this.o_, t.height || this.ro))
    }
    ab(t) {
        let i = 0
          , s = 0;
        const e = this.Lm[0]
          , n = (o,l)=>{
            let a = 0;
            for (let u = 0; u < this.Lm.length; u++) {
                const c = this.Lm[u]
                  , d = v(o === "left" ? c.sm() : c.rm())
                  , f = d._p();
                t !== null && d.up(t, l, a),
                a += f.height
            }
        }
        ;
        this._b() && (n("left", 0),
        i += v(e.sm())._p().width);
        for (let o = 0; o < this.Lm.length; o++) {
            const l = this.Lm[o]
              , a = l._p();
            t !== null && l.up(t, i, s),
            s += a.height
        }
        i += e._p().width,
        this.ub() && (n("right", i),
        i += v(e.rm())._p().width);
        const r = (o,l,a)=>{
            v(o === "left" ? this.Gm.ym() : this.Gm.Cm()).up(v(t), l, a)
        }
        ;
        if (this.cn.timeScale.visible) {
            const o = this.Gm._p();
            if (t !== null) {
                let l = 0;
                this._b() && (r("left", l, s),
                l = v(e.sm())._p().width),
                this.Gm.up(t, l, s),
                l += o.width,
                this.ub() && r("right", l, s)
            }
            s += o.height
        }
        return M({
            width: i,
            height: s
        })
    }
    bb() {
        let t = 0
          , i = 0
          , s = 0;
        for (const m of this.Lm)
            this._b() && (i = Math.max(i, v(m.sm()).Gv(), this.cn.leftPriceScale.minimumWidth)),
            this.ub() && (s = Math.max(s, v(m.rm()).Gv(), this.cn.rightPriceScale.minimumWidth)),
            t += m.g_();
        i = hi(i),
        s = hi(s);
        const e = this.o_
          , n = this.ro
          , r = Math.max(e - i - s, 0)
          , o = this.cn.timeScale.visible;
        let l = o ? Math.max(this.Gm.Rm(), this.cn.timeScale.minimumHeight) : 0;
        var a;
        l = (a = l) + a % 2;
        const u = 0 + l
          , c = n < u ? 0 : n - u
          , d = c / t;
        let f = 0;
        for (let m = 0; m < this.Lm.length; ++m) {
            const p = this.Lm[m];
            p.Vp(this.$i.Uc()[m]);
            let b = 0
              , g = 0;
            g = m === this.Lm.length - 1 ? c - f : Math.round(p.g_() * d),
            b = Math.max(g, 2),
            f += b,
            p.tp(M({
                width: r,
                height: b
            })),
            this._b() && p.Zp(i, "left"),
            this.ub() && p.Zp(s, "right"),
            p.np() && this.$i.Kc(p.np(), b)
        }
        this.Gm.Pm(M({
            width: o ? r : 0,
            height: l
        }), o ? i : 0, o ? s : 0),
        this.$i.x_(r),
        this.Nm !== i && (this.Nm = i),
        this.Fm !== s && (this.Fm = s)
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
        return Kh ? 1 / window.devicePixelRatio : 1
    }
    Xm(t) {
        if (!(t.deltaX !== 0 && this.cn.handleScroll.mouseWheel || t.deltaY !== 0 && this.cn.handleScale.mouseWheel))
            return;
        const i = this.wb(t)
          , s = i * t.deltaX / 100
          , e = -i * t.deltaY / 100;
        if (t.cancelable && t.preventDefault(),
        e !== 0 && this.cn.handleScale.mouseWheel) {
            const n = Math.sign(e) * Math.min(1, Math.abs(e))
              , r = t.clientX - this.gm.getBoundingClientRect().left;
            this.$t().Jc(r, n)
        }
        s !== 0 && this.cn.handleScroll.mouseWheel && this.$t().Qc(-80 * s)
    }
    rb(t, i) {
        var s;
        const e = t.jn();
        e === 3 && this.gb(),
        e !== 3 && e !== 2 || (this.Mb(t),
        this.xb(t, i),
        this.Gm.bt(),
        this.Lm.forEach(n=>{
            n.zp()
        }
        ),
        ((s = this.Wm) === null || s === void 0 ? void 0 : s.jn()) === 3 && (this.Wm.ts(t),
        this.gb(),
        this.Mb(this.Wm),
        this.xb(this.Wm, i),
        t = this.Wm,
        this.Wm = null)),
        this.sp(t)
    }
    xb(t, i) {
        for (const s of t.Qn())
            this.ns(s, i)
    }
    Mb(t) {
        const i = this.$i.Uc();
        for (let s = 0; s < i.length; s++)
            t.Hn(s).Wn && i[s].E_()
    }
    ns(t, i) {
        const s = this.$i.St();
        switch (t.qn) {
        case 0:
            s.rc();
            break;
        case 1:
            s.hc(t.Ot);
            break;
        case 2:
            s.Gn(t.Ot);
            break;
        case 3:
            s.Jn(t.Ot);
            break;
        case 4:
            s.Uu();
            break;
        case 5:
            t.Ot.Ju(i) || s.Jn(t.Ot.Qu(i))
        }
    }
    Dc(t) {
        this.Wm !== null ? this.Wm.ts(t) : this.Wm = t,
        this.jm || (this.jm = !0,
        this.Em = window.requestAnimationFrame(i=>{
            if (this.jm = !1,
            this.Em = 0,
            this.Wm !== null) {
                const s = this.Wm;
                this.Wm = null,
                this.rb(s, i);
                for (const e of s.Qn())
                    if (e.qn === 5 && !e.Ot.Ju(i)) {
                        this.$t().Xn(e.Ot);
                        break
                    }
            }
        }
        ))
    }
    gb() {
        this.tb()
    }
    tb() {
        const t = this.$i.Uc()
          , i = t.length
          , s = this.Lm.length;
        for (let e = i; e < s; e++) {
            const n = O(this.Lm.pop());
            this.qm.removeChild(n.Kv()),
            n.Yp().p(this),
            n.Xp().p(this),
            n.S()
        }
        for (let e = s; e < i; e++) {
            const n = new bi(this,t[e]);
            n.Yp().l(this.Sb.bind(this), this),
            n.Xp().l(this.kb.bind(this), this),
            this.Lm.push(n),
            this.qm.insertBefore(n.Kv(), this.Gm.Kv())
        }
        for (let e = 0; e < i; e++) {
            const n = t[e]
              , r = this.Lm[e];
            r.np() !== n ? r.Vp(n) : r.Bp()
        }
        this.ib(),
        this.bb()
    }
    yb(t, i, s) {
        var e;
        const n = new Map;
        t !== null && this.$i.wt().forEach(u=>{
            const c = u.In().hl(t);
            c !== null && n.set(u, c)
        }
        );
        let r;
        if (t !== null) {
            const u = (e = this.$i.St().Ui(t)) === null || e === void 0 ? void 0 : e.originalTime;
            u !== void 0 && (r = u)
        }
        const o = this.$t().Fc()
          , l = o !== null && o.jc instanceof mi ? o.jc : void 0
          , a = o !== null && o.Sv !== void 0 ? o.Sv.wr : void 0;
        return {
            Cb: r,
            se: t ?? void 0,
            Tb: i ?? void 0,
            Pb: l,
            Rb: n,
            Db: a,
            Ob: s ?? void 0
        }
    }
    Sb(t, i, s) {
        this.bp.m(()=>this.yb(t, i, s))
    }
    kb(t, i, s) {
        this.wp.m(()=>this.yb(t, i, s))
    }
    Zm(t, i, s) {
        this.Pc.m(()=>this.yb(t, i, s))
    }
    ib() {
        const t = this.cn.timeScale.visible ? "" : "none";
        this.Gm.Kv().style.display = t
    }
    _b() {
        return this.Lm[0].np().P_().W().visible
    }
    ub() {
        return this.Lm[0].np().R_().W().visible
    }
    Jm() {
        return "ResizeObserver"in window && (this.Hm = new ResizeObserver(t=>{
            const i = t.find(s=>s.target === this.Um);
            i && this.Qm(i.contentRect.width, i.contentRect.height)
        }
        ),
        this.Hm.observe(this.Um, {
            box: "border-box"
        }),
        !0)
    }
    eb() {
        this.Hm !== null && this.Hm.disconnect(),
        this.Hm = null
    }
}
function qt(h) {
    return !!(h.handleScroll.mouseWheel || h.handleScale.mouseWheel)
}
function As(h, t) {
    var i = {};
    for (var s in h)
        Object.prototype.hasOwnProperty.call(h, s) && t.indexOf(s) < 0 && (i[s] = h[s]);
    if (h != null && typeof Object.getOwnPropertySymbols == "function") {
        var e = 0;
        for (s = Object.getOwnPropertySymbols(h); e < s.length; e++)
            t.indexOf(s[e]) < 0 && Object.prototype.propertyIsEnumerable.call(h, s[e]) && (i[s[e]] = h[s[e]])
    }
    return i
}
function as(h, t, i, s) {
    const e = i.value
      , n = {
        se: t,
        ot: h,
        Ot: [e, e, e, e],
        Cb: s
    };
    return i.color !== void 0 && (n.O = i.color),
    n
}
function Hh(h, t, i, s) {
    const e = i.value
      , n = {
        se: t,
        ot: h,
        Ot: [e, e, e, e],
        Cb: s
    };
    return i.lineColor !== void 0 && (n.lt = i.lineColor),
    i.topColor !== void 0 && (n.Ts = i.topColor),
    i.bottomColor !== void 0 && (n.Ps = i.bottomColor),
    n
}
function Gh(h, t, i, s) {
    const e = i.value
      , n = {
        se: t,
        ot: h,
        Ot: [e, e, e, e],
        Cb: s
    };
    return i.topLineColor !== void 0 && (n.Pe = i.topLineColor),
    i.bottomLineColor !== void 0 && (n.Re = i.bottomLineColor),
    i.topFillColor1 !== void 0 && (n.Se = i.topFillColor1),
    i.topFillColor2 !== void 0 && (n.ke = i.topFillColor2),
    i.bottomFillColor1 !== void 0 && (n.ye = i.bottomFillColor1),
    i.bottomFillColor2 !== void 0 && (n.Ce = i.bottomFillColor2),
    n
}
function Xh(h, t, i, s) {
    const e = {
        se: t,
        ot: h,
        Ot: [i.open, i.high, i.low, i.close],
        Cb: s
    };
    return i.color !== void 0 && (e.O = i.color),
    e
}
function Yh(h, t, i, s) {
    const e = {
        se: t,
        ot: h,
        Ot: [i.open, i.high, i.low, i.close],
        Cb: s
    };
    return i.color !== void 0 && (e.O = i.color),
    i.borderColor !== void 0 && (e.At = i.borderColor),
    i.wickColor !== void 0 && (e.Xh = i.wickColor),
    e
}
function Qh(h, t, i, s, e) {
    const n = O(e)(i)
      , r = Math.max(...n)
      , o = Math.min(...n)
      , l = n[n.length - 1]
      , a = [l, r, o, l]
      , u = i
      , {time: c, color: d} = u;
    return {
        se: t,
        ot: h,
        Ot: a,
        Cb: s,
        He: As(u, ["time", "color"]),
        O: d
    }
}
function _t(h) {
    return h.Ot !== void 0
}
function us(h, t) {
    return t.customValues !== void 0 && (h.Ab = t.customValues),
    h
}
function V(h) {
    return (t,i,s,e,n,r)=>function(o, l) {
        return l ? l(o) : (a = o).open === void 0 && a.value === void 0;
        var a
    }(s, r) ? us({
        ot: t,
        se: i,
        Cb: e
    }, s) : us(h(t, i, s, e, n), s)
}
function cs(h) {
    return {
        Candlestick: V(Yh),
        Bar: V(Xh),
        Area: V(Hh),
        Baseline: V(Gh),
        Histogram: V(as),
        Line: V(as),
        Custom: V(Qh)
    }[h]
}
function ds(h) {
    return {
        se: 0,
        Bb: new Map,
        ha: h
    }
}
function fs(h, t) {
    if (h !== void 0 && h.length !== 0)
        return {
            Vb: t.key(h[0].ot),
            Ib: t.key(h[h.length - 1].ot)
        }
}
function ms(h) {
    let t;
    return h.forEach(i=>{
        t === void 0 && (t = i.Cb)
    }
    ),
    O(t)
}
class qh {
    constructor(t) {
        this.zb = new Map,
        this.Lb = new Map,
        this.Eb = new Map,
        this.Nb = [],
        this.U_ = t
    }
    S() {
        this.zb.clear(),
        this.Lb.clear(),
        this.Eb.clear(),
        this.Nb = []
    }
    Fb(t, i) {
        let s = this.zb.size !== 0
          , e = !1;
        const n = this.Lb.get(t);
        if (n !== void 0)
            if (this.Lb.size === 1)
                s = !1,
                e = !0,
                this.zb.clear();
            else
                for (const l of this.Nb)
                    l.pointData.Bb.delete(t) && (e = !0);
        let r = [];
        if (i.length !== 0) {
            const l = i.map(f=>f.time)
              , a = this.U_.createConverterToInternalObj(i)
              , u = cs(t.Jh())
              , c = t.ya()
              , d = t.Ca();
            r = i.map((f,m)=>{
                const p = a(f.time)
                  , b = this.U_.key(p);
                let g = this.zb.get(b);
                g === void 0 && (g = ds(p),
                this.zb.set(b, g),
                e = !0);
                const w = u(p, g.se, f, l[m], c, d);
                return g.Bb.set(t, w),
                w
            }
            )
        }
        s && this.Wb(),
        this.jb(t, r);
        let o = -1;
        if (e) {
            const l = [];
            this.zb.forEach(a=>{
                l.push({
                    timeWeight: 0,
                    time: a.ha,
                    pointData: a,
                    originalTime: ms(a.Bb)
                })
            }
            ),
            l.sort((a,u)=>this.U_.key(a.time) - this.U_.key(u.time)),
            o = this.Hb(l)
        }
        return this.$b(t, o, function(l, a, u) {
            const c = fs(l, u)
              , d = fs(a, u);
            if (c !== void 0 && d !== void 0)
                return {
                    Ql: c.Ib >= d.Ib && c.Vb >= d.Vb
                }
        }(this.Lb.get(t), n, this.U_))
    }
    fd(t) {
        return this.Fb(t, [])
    }
    Ub(t, i) {
        const s = i;
        (function(p) {
            p.Cb === void 0 && (p.Cb = p.time)
        }
        )(s),
        this.U_.preprocessData(i);
        const e = this.U_.createConverterToInternalObj([i])(i.time)
          , n = this.Eb.get(t);
        if (n !== void 0 && this.U_.key(e) < this.U_.key(n))
            throw new Error(`Cannot update oldest data, last time=${n}, new time=${e}`);
        let r = this.zb.get(this.U_.key(e));
        const o = r === void 0;
        r === void 0 && (r = ds(e),
        this.zb.set(this.U_.key(e), r));
        const l = cs(t.Jh())
          , a = t.ya()
          , u = t.Ca()
          , c = l(e, r.se, i, s.Cb, a, u);
        r.Bb.set(t, c),
        this.qb(t, c);
        const d = {
            Ql: _t(c)
        };
        if (!o)
            return this.$b(t, -1, d);
        const f = {
            timeWeight: 0,
            time: r.ha,
            pointData: r,
            originalTime: ms(r.Bb)
        }
          , m = ct(this.Nb, this.U_.key(f.time), (p,b)=>this.U_.key(p.time) < b);
        this.Nb.splice(m, 0, f);
        for (let p = m; p < this.Nb.length; ++p)
            ti(this.Nb[p].pointData, p);
        return this.U_.fillWeightsForPoints(this.Nb, m),
        this.$b(t, m, d)
    }
    qb(t, i) {
        let s = this.Lb.get(t);
        s === void 0 && (s = [],
        this.Lb.set(t, s));
        const e = s.length !== 0 ? s[s.length - 1] : null;
        e === null || this.U_.key(i.ot) > this.U_.key(e.ot) ? _t(i) && s.push(i) : _t(i) ? s[s.length - 1] = i : s.splice(-1, 1),
        this.Eb.set(t, i.ot)
    }
    jb(t, i) {
        i.length !== 0 ? (this.Lb.set(t, i.filter(_t)),
        this.Eb.set(t, i[i.length - 1].ot)) : (this.Lb.delete(t),
        this.Eb.delete(t))
    }
    Wb() {
        for (const t of this.Nb)
            t.pointData.Bb.size === 0 && this.zb.delete(this.U_.key(t.time))
    }
    Hb(t) {
        let i = -1;
        for (let s = 0; s < this.Nb.length && s < t.length; ++s) {
            const e = this.Nb[s]
              , n = t[s];
            if (this.U_.key(e.time) !== this.U_.key(n.time)) {
                i = s;
                break
            }
            n.timeWeight = e.timeWeight,
            ti(n.pointData, s)
        }
        if (i === -1 && this.Nb.length !== t.length && (i = Math.min(this.Nb.length, t.length)),
        i === -1)
            return -1;
        for (let s = i; s < t.length; ++s)
            ti(t[s].pointData, s);
        return this.U_.fillWeightsForPoints(t, i),
        this.Nb = t,
        i
    }
    Yb() {
        if (this.Lb.size === 0)
            return null;
        let t = 0;
        return this.Lb.forEach(i=>{
            i.length !== 0 && (t = Math.max(t, i[i.length - 1].se))
        }
        ),
        t
    }
    $b(t, i, s) {
        const e = {
            Xb: new Map,
            St: {
                Lu: this.Yb()
            }
        };
        if (i !== -1)
            this.Lb.forEach((n,r)=>{
                e.Xb.set(r, {
                    He: n,
                    Kb: r === t ? s : void 0
                })
            }
            ),
            this.Lb.has(t) || e.Xb.set(t, {
                He: [],
                Kb: s
            }),
            e.St.Zb = this.Nb,
            e.St.Gb = i;
        else {
            const n = this.Lb.get(t);
            e.Xb.set(t, {
                He: n || [],
                Kb: s
            })
        }
        return e
    }
}
function ti(h, t) {
    h.se = t,
    h.Bb.forEach(i=>{
        i.se = t
    }
    )
}
function wi(h) {
    const t = {
        value: h.Ot[3],
        time: h.Cb
    };
    return h.Ab !== void 0 && (t.customValues = h.Ab),
    t
}
function ps(h) {
    const t = wi(h);
    return h.O !== void 0 && (t.color = h.O),
    t
}
function tn(h) {
    const t = wi(h);
    return h.lt !== void 0 && (t.lineColor = h.lt),
    h.Ts !== void 0 && (t.topColor = h.Ts),
    h.Ps !== void 0 && (t.bottomColor = h.Ps),
    t
}
function sn(h) {
    const t = wi(h);
    return h.Pe !== void 0 && (t.topLineColor = h.Pe),
    h.Re !== void 0 && (t.bottomLineColor = h.Re),
    h.Se !== void 0 && (t.topFillColor1 = h.Se),
    h.ke !== void 0 && (t.topFillColor2 = h.ke),
    h.ye !== void 0 && (t.bottomFillColor1 = h.ye),
    h.Ce !== void 0 && (t.bottomFillColor2 = h.Ce),
    t
}
function js(h) {
    const t = {
        open: h.Ot[0],
        high: h.Ot[1],
        low: h.Ot[2],
        close: h.Ot[3],
        time: h.Cb
    };
    return h.Ab !== void 0 && (t.customValues = h.Ab),
    t
}
function en(h) {
    const t = js(h);
    return h.O !== void 0 && (t.color = h.O),
    t
}
function hn(h) {
    const t = js(h)
      , {O: i, At: s, Xh: e} = h;
    return i !== void 0 && (t.color = i),
    s !== void 0 && (t.borderColor = s),
    e !== void 0 && (t.wickColor = e),
    t
}
function oi(h) {
    return {
        Area: tn,
        Line: ps,
        Baseline: sn,
        Histogram: ps,
        Bar: en,
        Candlestick: hn,
        Custom: nn
    }[h]
}
function nn(h) {
    const t = h.Cb;
    return Object.assign(Object.assign({}, h.He), {
        time: t
    })
}
const rn = {
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
  , on = {
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
  , ln = {
    background: {
        type: "solid",
        color: "#FFFFFF"
    },
    textColor: "#191919",
    fontSize: 12,
    fontFamily: li
}
  , ii = {
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
  , an = {
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
  , un = {
    color: "rgba(0, 0, 0, 0)",
    visible: !1,
    fontSize: 48,
    fontFamily: li,
    fontStyle: "",
    text: "",
    horzAlign: "center",
    vertAlign: "center"
};
function vs() {
    return {
        width: 0,
        height: 0,
        autoSize: !1,
        layout: ln,
        crosshair: rn,
        grid: on,
        overlayPriceScales: Object.assign({}, ii),
        leftPriceScale: Object.assign(Object.assign({}, ii), {
            visible: !1
        }),
        rightPriceScale: Object.assign(Object.assign({}, ii), {
            visible: !0
        }),
        timeScale: an,
        watermark: un,
        localization: {
            locale: q ? navigator.language : "",
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
class cn {
    constructor(t, i) {
        this.Jb = t,
        this.Qb = i
    }
    applyOptions(t) {
        this.Jb.$t().Hc(this.Qb, t)
    }
    options() {
        return this.Li().W()
    }
    width() {
        return Et(this.Qb) ? this.Jb.ob(this.Qb) : 0
    }
    Li() {
        return v(this.Jb.$t().$c(this.Qb)).Dt
    }
}
function bs(h, t, i) {
    const s = As(h, ["time", "originalTime"])
      , e = Object.assign({
        time: t
    }, s);
    return i !== void 0 && (e.originalTime = i),
    e
}
const dn = {
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
class fn {
    constructor(t) {
        this.Eh = t
    }
    applyOptions(t) {
        this.Eh.Hh(t)
    }
    options() {
        return this.Eh.W()
    }
    tw() {
        return this.Eh
    }
}
class mn {
    constructor(t, i, s, e, n) {
        this.iw = new y,
        this.Ls = t,
        this.nw = i,
        this.sw = s,
        this.U_ = n,
        this.ew = e
    }
    S() {
        this.iw.S()
    }
    priceFormatter() {
        return this.Ls.ma()
    }
    priceToCoordinate(t) {
        const i = this.Ls.Ct();
        return i === null ? null : this.Ls.Dt().Rt(t, i.Ot)
    }
    coordinateToPrice(t) {
        const i = this.Ls.Ct();
        return i === null ? null : this.Ls.Dt().pn(t, i.Ot)
    }
    barsInLogicalRange(t) {
        if (t === null)
            return null;
        const i = new Y(new nt(t.from,t.to)).hu()
          , s = this.Ls.In();
        if (s.Ni())
            return null;
        const e = s.hl(i.Os(), 1)
          , n = s.hl(i.ui(), -1)
          , r = v(s.sl())
          , o = v(s.Vn());
        if (e !== null && n !== null && e.se > n.se)
            return {
                barsBefore: t.from - r,
                barsAfter: o - t.to
            };
        const l = {
            barsBefore: e === null || e.se === r ? t.from - r : e.se - r,
            barsAfter: n === null || n.se === o ? o - t.to : o - n.se
        };
        return e !== null && n !== null && (l.from = e.Cb,
        l.to = n.Cb),
        l
    }
    setData(t) {
        this.U_,
        this.Ls.Jh(),
        this.nw.rw(this.Ls, t),
        this.hw("full")
    }
    update(t) {
        this.Ls.Jh(),
        this.nw.lw(this.Ls, t),
        this.hw("update")
    }
    dataByIndex(t, i) {
        const s = this.Ls.In().hl(t, i);
        return s === null ? null : oi(this.seriesType())(s)
    }
    data() {
        const t = oi(this.seriesType());
        return this.Ls.In().ie().map(i=>t(i))
    }
    subscribeDataChanged(t) {
        this.iw.l(t)
    }
    unsubscribeDataChanged(t) {
        this.iw.v(t)
    }
    setMarkers(t) {
        this.U_;
        const i = t.map(s=>bs(s, this.U_.convertHorzItemToInternal(s.time), s.time));
        this.Ls.ia(i)
    }
    markers() {
        return this.Ls.na().map(t=>bs(t, t.originalTime, void 0))
    }
    applyOptions(t) {
        this.Ls.Hh(t)
    }
    options() {
        return R(this.Ls.W())
    }
    priceScale() {
        return this.sw.priceScale(this.Ls.Dt().Ta())
    }
    createPriceLine(t) {
        const i = P(R(dn), t)
          , s = this.Ls.sa(i);
        return new fn(s)
    }
    removePriceLine(t) {
        this.Ls.ea(t.tw())
    }
    seriesType() {
        return this.Ls.Jh()
    }
    attachPrimitive(t) {
        this.Ls.Sa(t),
        t.attached && t.attached({
            chart: this.ew,
            series: this,
            requestUpdate: ()=>this.Ls.$t().Kl()
        })
    }
    detachPrimitive(t) {
        this.Ls.ka(t),
        t.detached && t.detached()
    }
    hw(t) {
        this.iw.M() && this.iw.m(t)
    }
}
class pn {
    constructor(t, i, s) {
        this.aw = new y,
        this.pu = new y,
        this.wm = new y,
        this.$i = t,
        this.kl = t.St(),
        this.Gm = i,
        this.kl.tc().l(this.ow.bind(this)),
        this.kl.nc().l(this._w.bind(this)),
        this.Gm.Tm().l(this.uw.bind(this)),
        this.U_ = s
    }
    S() {
        this.kl.tc().p(this),
        this.kl.nc().p(this),
        this.Gm.Tm().p(this),
        this.aw.S(),
        this.pu.S(),
        this.wm.S()
    }
    scrollPosition() {
        return this.kl.ju()
    }
    scrollToPosition(t, i) {
        i ? this.kl.Gu(t, 1e3) : this.$i.Jn(t)
    }
    scrollToRealTime() {
        this.kl.Zu()
    }
    getVisibleRange() {
        const t = this.kl.Du();
        return t === null ? null : {
            from: t.from.originalTime,
            to: t.to.originalTime
        }
    }
    setVisibleRange(t) {
        const i = {
            from: this.U_.convertHorzItemToInternal(t.from),
            to: this.U_.convertHorzItemToInternal(t.to)
        }
          , s = this.kl.Vu(i);
        this.$i.vd(s)
    }
    getVisibleLogicalRange() {
        const t = this.kl.Ru();
        return t === null ? null : {
            from: t.Os(),
            to: t.ui()
        }
    }
    setVisibleLogicalRange(t) {
        I(t.from <= t.to, "The from index cannot be after the to index."),
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
        return i.Ni() ? null : i.It(t)
    }
    coordinateToLogical(t) {
        return this.kl.Ni() ? null : this.kl.Eu(t)
    }
    timeToCoordinate(t) {
        const i = this.U_.convertHorzItemToInternal(t)
          , s = this.kl.Da(i, !1);
        return s === null ? null : this.kl.It(s)
    }
    coordinateToTime(t) {
        const i = this.$i.St()
          , s = i.Eu(t)
          , e = i.Ui(s);
        return e === null ? null : e.originalTime
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
        this.kl.Hh(t)
    }
    options() {
        return Object.assign(Object.assign({}, R(this.kl.W())), {
            barSpacing: this.kl.he()
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
function vn(h) {
    if (h === void 0 || h.type === "custom")
        return;
    const t = h;
    t.minMove !== void 0 && t.precision === void 0 && (t.precision = function(i) {
        if (i >= 1)
            return 0;
        let s = 0;
        for (; s < 8; s++) {
            const e = Math.round(i);
            if (Math.abs(e - i) < 1e-8)
                return s;
            i *= 10
        }
        return s
    }(t.minMove))
}
function gs(h) {
    return function(t) {
        if (ft(t.handleScale)) {
            const s = t.handleScale;
            t.handleScale = {
                axisDoubleClickReset: {
                    time: s,
                    price: s
                },
                axisPressedMouseMove: {
                    time: s,
                    price: s
                },
                mouseWheel: s,
                pinch: s
            }
        } else if (t.handleScale !== void 0) {
            const {axisPressedMouseMove: s, axisDoubleClickReset: e} = t.handleScale;
            ft(s) && (t.handleScale.axisPressedMouseMove = {
                time: s,
                price: s
            }),
            ft(e) && (t.handleScale.axisDoubleClickReset = {
                time: e,
                price: e
            })
        }
        const i = t.handleScroll;
        ft(i) && (t.handleScroll = {
            horzTouchDrag: i,
            vertTouchDrag: i,
            mouseWheel: i,
            pressedMouseMove: i
        })
    }(h),
    h
}
class bn {
    constructor(t, i, s) {
        this.cw = new Map,
        this.dw = new Map,
        this.fw = new y,
        this.pw = new y,
        this.mw = new y,
        this.bw = new qh(i);
        const e = s === void 0 ? R(vs()) : P(R(vs()), gs(s));
        this.U_ = i,
        this.Jb = new Zh(t,e,i),
        this.Jb.Yp().l(r=>{
            this.fw.M() && this.fw.m(this.ww(r()))
        }
        , this),
        this.Jb.Xp().l(r=>{
            this.pw.M() && this.pw.m(this.ww(r()))
        }
        , this),
        this.Jb.Xc().l(r=>{
            this.mw.M() && this.mw.m(this.ww(r()))
        }
        , this);
        const n = this.Jb.$t();
        this.gw = new pn(n,this.Jb.sb(),this.U_)
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
    resize(t, i, s) {
        this.autoSizeActive() || this.Jb.Qm(t, i, s)
    }
    addCustomSeries(t, i) {
        const s = G(t)
          , e = Object.assign(Object.assign({}, ws), s.defaultOptions());
        return this.Mw("Custom", e, i, s)
    }
    addAreaSeries(t) {
        return this.Mw("Area", ie, t)
    }
    addBaselineSeries(t) {
        return this.Mw("Baseline", se, t)
    }
    addBarSeries(t) {
        return this.Mw("Bar", qs, t)
    }
    addCandlestickSeries(t={}) {
        return function(i) {
            i.borderColor !== void 0 && (i.borderUpColor = i.borderColor,
            i.borderDownColor = i.borderColor),
            i.wickColor !== void 0 && (i.wickUpColor = i.wickColor,
            i.wickDownColor = i.wickColor)
        }(t),
        this.Mw("Candlestick", Qs, t)
    }
    addHistogramSeries(t) {
        return this.Mw("Histogram", ee, t)
    }
    addLineSeries(t) {
        return this.Mw("Line", te, t)
    }
    removeSeries(t) {
        const i = O(this.cw.get(t))
          , s = this.bw.fd(i);
        this.Jb.$t().fd(i),
        this.xw(s),
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
        return new cn(this.Jb,t)
    }
    timeScale() {
        return this.gw
    }
    applyOptions(t) {
        this.Jb.Hh(gs(t))
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
    setCrosshairPosition(t, i, s) {
        const e = this.cw.get(s);
        if (e === void 0)
            return;
        const n = this.Jb.$t().cr(e);
        n !== null && this.Jb.$t().ld(t, i, n)
    }
    clearCrosshairPosition() {
        this.Jb.$t().ad(!0)
    }
    Mw(t, i, s={}, e) {
        vn(s.priceFormat);
        const n = P(R(Ss), R(i), s)
          , r = this.Jb.$t().ud(t, n, e)
          , o = new mn(r,this,this,this,this.U_);
        return this.cw.set(o, r),
        this.dw.set(r, o),
        o
    }
    xw(t) {
        const i = this.Jb.$t();
        i.od(t.St.Lu, t.St.Zb, t.St.Gb),
        t.Xb.forEach((s,e)=>e.J(s.He, s.Kb)),
        i.Fu()
    }
    Sw(t) {
        return O(this.dw.get(t))
    }
    ww(t) {
        const i = new Map;
        t.Rb.forEach((e,n)=>{
            const r = n.Jh()
              , o = oi(r)(e);
            if (r !== "Custom")
                I(function(l) {
                    return l.open !== void 0 || l.value !== void 0
                }(o));
            else {
                const l = n.Ca();
                I(!l || l(o) === !1)
            }
            i.set(this.Sw(n), o)
        }
        );
        const s = t.Pb !== void 0 && this.dw.has(t.Pb) ? this.Sw(t.Pb) : void 0;
        return {
            time: t.Cb,
            logical: t.se,
            point: t.Tb,
            hoveredSeries: s,
            hoveredObjectId: t.Db,
            seriesData: i,
            sourceEvent: t.Ob
        }
    }
}
function gn(h, t, i) {
    let s;
    if (ut(h)) {
        const n = document.getElementById(h);
        I(n !== null, `Cannot find element in DOM with id=${h}`),
        s = n
    } else
        s = h;
    const e = new bn(s,t,i);
    return t.setOptions(e.options()),
    e
}
function wn(h, t) {
    return gn(h, new es, es.Vd(t))
}
const Sn = Object.assign(Object.assign({}, Ss), ws);
export {Hi as A, Sn as D, Is as E, ei as L, wn as P, Xi as V, xi as d, Ti as l, Vi as z};
