var _ = Object.defineProperty;
var u = (s,t,e)=>t in s ? _(s, t, {
    enumerable: !0,
    configurable: !0,
    writable: !0,
    value: e
}) : s[t] = e;
var i = (s,t,e)=>(u(s, typeof t != "symbol" ? t + "" : t, e),
e);
// import {V as p} from "./lightweight-charts.production-7ee7078d.js";
// import {g as w} from "./sample-data-c7d89ab8.js";
// import {p as m} from "./positions-0a54307c.js";
import {P as lwcprod} from "./lwc.prod.js";
import {g as w} from "./sample-data.js";
import {p as m} from "./positions.js";

class VLineDraw_Class {
    constructor(t, e) {
        i(this, "_x", null);
        i(this, "_options");
        this._x = t,
        this._options = e
    }
    draw(t) {
        t.useBitmapCoordinateSpace(e=>{
            if (this._x === null)
                return;
            const n = e.context
              , a = m(this._x, e.horizontalPixelRatio, this._options.width);
            n.fillStyle = this._options.color,
            n.fillRect(a.position, 0, a.length, e.bitmapSize.height)
        }
        )
    }
}
class VLineRender_Class {
    constructor(t, e) {
        i(this, "_source");
        i(this, "_x", null);
        i(this, "_options");
        this._source = t,
        this._options = e
    }
    update() {
        const t = this._source._chart.timeScale();
        this._x = t.timeToCoordinate(this._source._time)
    }
    renderer() {
        return new VLineDraw_Class(this._x,this._options)
    }
}
class VLinePane_Class {
    constructor(t, e) {
        i(this, "_source");
        i(this, "_x", null);
        i(this, "_options");
        this._source = t,
        this._options = e
    }
    update() {
        const t = this._source._chart.timeScale();
        this._x = t.timeToCoordinate(this._source._time)
    }
    visible() {
        return this._options.showLabel
    }
    tickVisible() {
        return this._options.showLabel
    }
    coordinate() {
        return this._x ?? 0
    }
    text() {
        return this._options.labelText
    }
    textColor() {
        return this._options.labelTextColor
    }
    backColor() {
        return this._options.labelBackgroundColor
    }
}
const vline_Default_Options = {
    color: "green",labelText: "",width: 3,labelBackgroundColor: "green",labelTextColor: "white",
    showLabel: !1
};
class VLineOverlay_Class {
    constructor(t, e, n, a) {
        i(this, "_chart");
        i(this, "_series");
        i(this, "_time");
        i(this, "_paneViews");
        i(this, "_timeAxisViews");
        const h = {
            ...vline_Default_Options,
            ...a
        };
        this._chart = t,
        this._series = e,
        this._time = n,
        this._paneViews = [new VLineRender_Class(this,h)],
        this._timeAxisViews = [new VLinePane_Class(this,h)]
    }
    updateAllViews() {
        this._paneViews.forEach(t=>t.update()),
        this._timeAxisViews.forEach(t=>t.update())
    }
    timeAxisViews() {
        return this._timeAxisViews
    }
    paneViews() {
        return this._paneViews
    }
}


// const l = lwcprod("chart", {autoSize: !0})
// const r = l.addLineSeries()
// const o = w();
// r.setData(o);
// const L = new VLineOverlay_Class(l,r,o[o.length - 50].time,{
//     showLabel: !0, labelText: "1"});
// r.attachPrimitive(L);
// const f = new VLineOverlay_Class(l,r,o[o.length - 25].time,{
//     showLabel: !1,color: "red",width: 2
// });
// r.attachPrimitive(f);
