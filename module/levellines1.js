
var x = Object.defineProperty;
// debugger;
var D = (a,t,i)=>t in a ? x(a, t, {
    enumerable: !0,
    configurable: !0,
    writable: !0,
    value: i
}) : a[t] = i;
var o = (a,t,i)=>(D(a, typeof t != "symbol" ? t + "" : t, i),
i);
import {z as p, P as S, A as P} from "./lwc.prod.js";
import {P as lwc_base} from "./plugin-base.js";
import {p as lwc_pos} from "./positions.js";
const C = {
    interval: 60 * 60 * 24,
    clearTimeout: 3e3
}
  , f = new Path2D("M5.22 14.78a.75.75 0 001.06 0l7.22-7.22v5.69a.75.75 0 001.5 0v-7.5a.75.75 0 00-.75-.75h-7.5a.75.75 0 000 1.5h5.69l-7.22 7.22a.75.75 0 000 1.06z")
  , I = new Path2D("M6.28 5.22a.75.75 0 00-1.06 1.06l7.22 7.22H6.75a.75.75 0 000 1.5h7.5a.747.747 0 00.75-.75v-7.5a.75.75 0 00-1.5 0v5.69L6.28 5.22z")
  , m = new Path2D("M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z")
  , w = new Path2D("M10 18a8 8 0 100-16 8 8 0 000 16zM8.28 7.22a.75.75 0 00-1.06 1.06L8.94 10l-1.72 1.72a.75.75 0 101.06 1.06L10 11.06l1.72 1.72a.75.75 0 101.06-1.06L11.06 10l1.72-1.72a.75.75 0 00-1.06-1.06L10 8.94 8.28 7.22z")
  , L = 20;
class b {
    constructor() {
        o(this, "_data", [])
    }
    draw(t) {
        let i = 1;
        t.useBitmapCoordinateSpace(s=>{
            i = s.verticalPixelRatio
        }
        ),
        t.useMediaCoordinateSpace(s=>{
            // debugger;
            const ctx = s.context;
            ctx.lineWidth = 2;
            this._data.forEach(alertRecord=>{  //DRAW ALERT ON CTX
                const pos = lwc_pos(alertRecord.priceY, i, ctx.lineWidth)
                  , l = (pos.position + pos.length / 2) / i;
                ctx.fillStyle = alertRecord.color,
                ctx.strokeStyle = alertRecord.color,
                ctx.lineDashOffset = 0,
                ctx.globalAlpha = alertRecord.fade ? .5 : 1,
                ctx.beginPath(),
                ctx.moveTo(alertRecord.startX + 4, l),
                ctx.lineTo(alertRecord.endX - 4, l),
                ctx.stroke(),
                ctx.beginPath(),
                ctx.setLineDash([3, 6]),
                ctx.lineCap = "round",
                ctx.moveTo(alertRecord.startX - 30, l),
                ctx.lineTo(s.mediaSize.width, l),
                ctx.stroke(),
                ctx.setLineDash([]),
                ctx.beginPath(),
                ctx.arc(alertRecord.startX, l, 4, 0, 2 * Math.PI),
                ctx.arc(alertRecord.endX, l, 4, 0, 2 * Math.PI),
                ctx.fill(),
                ctx.font = "10px sans-serif";
                const h = ctx.measureText(alertRecord.text);
                ctx.beginPath(),
                ctx.roundRect(alertRecord.startX - 30 - 20 - h.width, l - 7, h.width + 20, 14, 4),
                ctx.fill(),
                ctx.fillStyle = "#FFFFFF",
                ctx.fillText(alertRecord.text, alertRecord.startX - 30 - 15 - h.width, l + 3),
                ctx.save(),
                ctx.translate(alertRecord.startX - 30 - 14, l - 6);
                const d = 12 / L;
                ctx.scale(d, d),
                ctx.fill(alertRecord.icon, "evenodd"),
                ctx.restore()
            }
            )
        }
        )
    }
    update(t) {
        this._data = t
    }
}
class T {
    constructor(t) {
        o(this, "_source");
        o(this, "_renderer");
        this._source = t,
        this._renderer = new b
    }
    renderer() {
        return this._renderer
    }
    update() {
        // debugger;
        var s;
        const Alert_Data = []
          , i = (s = this._source._chart) == null ? void 0 : s.timeScale();
        if (i)
            for (const e of this._source._alerts.values()) {
                const r = this._source._series.priceToCoordinate(e.price);
                if (r === null)
                    continue;
                let c = i.timeToCoordinate(e.start)
                  , l = i.timeToCoordinate(e.end);
                if (c === null && l === null)
                    continue;
                c || (c = 0),
                l || (l = i.width());
                let h = "#000000"
                  , d = f;
                e.parameters.crossingDirection === "up" ? (h = e.crossed ? "#386D2E" : e.expired ? "#30472C" : "#64C750",
                d = e.crossed ? m : e.expired ? w : f) : e.parameters.crossingDirection === "down" && (h = e.crossed ? "#7C1F3E" : e.expired ? "#4A2D37" : "#C83264",
                d = e.crossed ? m : e.expired ? w : I),
                Alert_Data.push({
                    priceY: r,
                    startX: c,
                    endX: l,
                    icon: d,
                    color: h,
                    text: e.parameters.title,
                    fade: e.expired
                })
                // debugger;
            }
        this._renderer.update(Alert_Data)
    }
}
class V extends lwc_base {
    constructor(i) {
        super();
        o(this, "_source");
        o(this, "_views");
        this._source = i,
        this._views = [new T(this._source)]
    }
    requestUpdate() {
        super.requestUpdate()
    }
    updateAllViews() {
        this._views.forEach(i=>i.update())
    }
    paneViews() {
        return this._views
    }
    autoscaleInfo() {
        let i = 1 / 0
          , s = -1 / 0;
        for (const e of this._source._alerts.values())
            e.price < i && (i = e.price),
            e.price > s && (s = e.price);
        return i > s ? null : {
            priceRange: {
                maxValue: s,
                minValue: i
            }
        }
    }
}
function M(a) {
    return a.value !== void 0
}
class LevelLine_Class {
    constructor(t, i) {
        o(this, "_options");
        o(this, "_chart", null);
        o(this, "_series");
        o(this, "_primitive");
        o(this, "_whitespaceSeriesStart", null);
        o(this, "_whitespaceSeriesEnd", null);
        o(this, "_whitespaceSeries");
        o(this, "_alerts", new Map);
        o(this, "_dataChangedHandler");
        o(this, "_lastValue");
        this._series = t,
        this._options = {
            ...C,
            ...i
        },
        this._primitive = new V(this),
        this._series.attachPrimitive(this._primitive),
        this._dataChangedHandler = this._dataChanged.bind(this),
        this._series.subscribeDataChanged(this._dataChangedHandler);
        const s = this._series.dataByIndex(1e4, p.NearestLeft);
        s && this.checkedCrossed(s),
        this._chart = this._primitive.chart,
        this._whitespaceSeries = this._chart.addLineSeries()
    }
    destroy() {
        this._series.unsubscribeDataChanged(this._dataChangedHandler),
        this._series.detachPrimitive(this._primitive)
    }
    alerts() {
        return this._alerts
    }
    chart() {
        return this._chart
    }
    series() {
        return this._series
    }
    addExpiringAlert(t, i, s, e) {
        // debugger;
        let r = (Math.random() * 1e5).toFixed();
        for (; this._alerts.has(r); )
            r = (Math.random() * 1e5).toFixed();
        return this._alerts.set(r, 
            { price: t, start: i, end: s, parameters: e, crossed: !1, expired: !1 }),
             this._update(), r
    }

    removeExpiringAlert(t) {
        this._alerts.delete(t),
        this._update()
    }
    toggleCrossed(t) {
        const i = this._alerts.get(t);
        i && (i.crossed = !0,
        setTimeout(()=>{
            this.removeExpiringAlert(t)
        }
        , this._options.clearTimeout),
        this._update())
    }
    checkExpired(t) {
        for (const [i,s] of this._alerts.entries())
            s.end <= t && (s.expired = !0,
            setTimeout(()=>{
                this.removeExpiringAlert(i)
            }
            , this._options.clearTimeout));
        this._update()
    }
    checkedCrossed(t) {
        if (M(t)) {
            if (this._lastValue !== void 0)
                for (const [i,s] of this._alerts.entries()) {
                    let e = !1;
                    s.parameters.crossingDirection === "up" ? this._lastValue <= s.price && t.value > s.price && (e = !0) : s.parameters.crossingDirection === "down" && this._lastValue >= s.price && t.value < s.price && (e = !0),
                    e && this.toggleCrossed(i)
                }
            this._lastValue = t.value
        }
    }
    _update() {
        var e;
        let t = 1 / 0
          , i = 0;
        const s = this._alerts.size > 0;
        for (const [r,c] of this._alerts.entries())
            c.end > i && (i = c.end),
            c.start < t && (t = c.start);
        if (s || (t = null,
        i = null),
        t) {
            const r = ((e = this._series.dataByIndex(1e6, p.NearestLeft)) == null ? void 0 : e.time) ?? t;
            r < t && (t = r)
        }
        (this._whitespaceSeriesStart !== t || this._whitespaceSeriesEnd !== i) && (this._whitespaceSeriesStart = t,
        this._whitespaceSeriesEnd = i,
        !this._whitespaceSeriesStart || !this._whitespaceSeriesEnd ? this._whitespaceSeries.setData([]) : this._whitespaceSeries.setData(this._buildWhitespace(this._whitespaceSeriesStart, this._whitespaceSeriesEnd))),
        this._primitive.requestUpdate()
    }
    _buildWhitespace(t, i) {
        const s = [];
        for (let e = t; e <= i; e += this._options.interval)
            s.push({ time: e });
        return s
    }
    _dataChanged() {
        const t = this._series.dataByIndex(1e5, p.NearestLeft);
        t && (this.checkedCrossed(t),
        this.checkExpired(t.time))
    }
}

export {LevelLine_Class as LevelLine_Class};