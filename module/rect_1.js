var x = Object.defineProperty;
var m = (o,t,e)=>t in o ? x(o, t, {
    enumerable: !0,
    configurable: !0,
    writable: !0,
    value: e
}) : o[t] = e;
var i = (o,t,e)=>(m(o, typeof t != "symbol" ? t + "" : t, e),
e);
import {L as v, P as f} from "./lwc.prod.js";
import {g as getMockData} from "./sample-data.js";
import {e as a, P} from "./plugin-base.js";
import {a as l} from "./positions.js";
class b {
    constructor(t, e, s) {
        i(this, "_p1");
        i(this, "_p2");
        i(this, "_fillColor");
        this._p1 = t,
        this._p2 = e,
        this._fillColor = s
    }
    draw(t) {
        t.useBitmapCoordinateSpace(e=>{
            if (this._p1.x === null || this._p1.y === null || this._p2.x === null || this._p2.y === null)
                return;
            const s = e.context
              , r = l(this._p1.x, this._p2.x, e.horizontalPixelRatio)
              , n = l(this._p1.y, this._p2.y, e.verticalPixelRatio);
            s.fillStyle = this._fillColor,
            s.fillRect(r.position, n.position, r.length, n.length)
        }
        )
    }
}
class V {
    constructor(t) {
        i(this, "_source");
        i(this, "_p1", {
            x: null,
            y: null
        });
        i(this, "_p2", {
            x: null,
            y: null
        });
        this._source = t
    }
    update() {
        const t = this._source.series
          , e = t.priceToCoordinate(this._source._p1.price)
          , s = t.priceToCoordinate(this._source._p2.price)
          , r = this._source.chart.timeScale()
          , n = r.timeToCoordinate(this._source._p1.time)
          , g = r.timeToCoordinate(this._source._p2.time);
        this._p1 = {
            x: n,
            y: e
        },
        this._p2 = {
            x: g,
            y: s
        }
    }
    renderer() {
        return new b(this._p1,this._p2,this._source._options.fillColor)
    }
}
class R {
    constructor(t, e, s, r) {
        i(this, "_p1");
        i(this, "_p2");
        i(this, "_fillColor");
        i(this, "_vertical", !1);
        this._p1 = t,
        this._p2 = e,
        this._fillColor = s,
        this._vertical = r
    }
    draw(t) {
        t.useBitmapCoordinateSpace(e=>{
            if (this._p1 === null || this._p2 === null)
                return;
            const s = e.context;
            s.globalAlpha = .5;
            const r = l(this._p1, this._p2, this._vertical ? e.verticalPixelRatio : e.horizontalPixelRatio);
            s.fillStyle = this._fillColor,
            this._vertical ? s.fillRect(0, r.position, 15, r.length) : s.fillRect(r.position, 0, r.length, 15)
        }
        )
    }
}
class _ {
    constructor(t, e) {
        i(this, "_source");
        i(this, "_p1", null);
        i(this, "_p2", null);
        i(this, "_vertical", !1);
        this._source = t,
        this._vertical = e
    }
    update() {
        [this._p1,this._p2] = this.getPoints()
    }
    renderer() {
        return new R(this._p1,this._p2,this._source._options.fillColor,this._vertical)
    }
    zOrder() {
        return "bottom"
    }
}
class y extends _ {
    getPoints() {
        const t = this._source.series
          , e = t.priceToCoordinate(this._source._p1.price)
          , s = t.priceToCoordinate(this._source._p2.price);
        return [e, s]
    }
}
class A extends _ {
    getPoints() {
        const t = this._source.chart.timeScale()
          , e = t.timeToCoordinate(this._source._p1.time)
          , s = t.timeToCoordinate(this._source._p2.time);
        return [e, s]
    }
}
class p {
    constructor(t, e) {
        i(this, "_source");
        i(this, "_p");
        i(this, "_pos", null);
        this._source = t,
        this._p = e
    }
    coordinate() {
        return this._pos ?? -1
    }
    visible() {
        return this._source._options.showLabels
    }
    tickVisible() {
        return this._source._options.showLabels
    }
    textColor() {
        return this._source._options.labelTextColor
    }
    backColor() {
        return this._source._options.labelColor
    }
    movePoint(t) {
        this._p = t,
        this.update()
    }
}
class c extends p {
    update() {
        const t = this._source.chart.timeScale();
        this._pos = t.timeToCoordinate(this._p.time)
    }
    text() {
        return this._source._options.timeLabelFormatter(this._p.time)
    }
}
class h extends p {
    update() {
        const t = this._source.series;
        this._pos = t.priceToCoordinate(this._p.price)
    }
    text() {
        return this._source._options.priceLabelFormatter(this._p.price)
    }
}
const T = {
    fillColor: "rgba(200, 50, 100, 0.75)",
    previewFillColor: "rgba(200, 50, 100, 0.25)",
    labelColor: "rgba(200, 50, 100, 1)",
    labelTextColor: "white",
    showLabels: !0,
    priceLabelFormatter: o=>o.toFixed(2),
    timeLabelFormatter: o=>typeof o == "string" ? o : (v(o) ? new Date(o.year,o.month,o.day) : new Date(o * 1e3)).toLocaleDateString()
};
class u extends P {
    constructor(e, s, r={}) {
        super();
        i(this, "_options");
        i(this, "_p1");
        i(this, "_p2");
        i(this, "_paneViews");
        i(this, "_timeAxisViews");
        i(this, "_priceAxisViews");
        i(this, "_priceAxisPaneViews");
        i(this, "_timeAxisPaneViews");
        this._p1 = e,
        this._p2 = s,
        this._options = {
            ...T,
            ...r
        },
        this._paneViews = [new V(this)],
        this._timeAxisViews = [new c(this,e), new c(this,s)],
        this._priceAxisViews = [new h(this,e), new h(this,s)],
        this._priceAxisPaneViews = [new y(this,!0)],
        this._timeAxisPaneViews = [new A(this,!1)]
    }
    updateAllViews() {
        this._paneViews.forEach(e=>e.update()),
        this._timeAxisViews.forEach(e=>e.update()),
        this._priceAxisViews.forEach(e=>e.update()),
        this._priceAxisPaneViews.forEach(e=>e.update()),
        this._timeAxisPaneViews.forEach(e=>e.update())
    }
    priceAxisViews() {
        return this._priceAxisViews
    }
    timeAxisViews() {
        return this._timeAxisViews
    }
    paneViews() {
        return this._paneViews
    }
    priceAxisPaneViews() {
        return this._priceAxisPaneViews
    }
    timeAxisPaneViews() {
        return this._timeAxisPaneViews
    }
    applyOptions(e) {
        this._options = {
            ...this._options,
            ...e
        },
        this.requestUpdate()
    }
}
class L extends u {
    constructor(t, e, s={}) {
        super(t, e, s),
        this._options.fillColor = this._options.previewFillColor
    }
    updateEndPoint(t) {
        this._p2 = t,
        this._paneViews[0].update(),
        this._timeAxisViews[1].movePoint(t),
        this._priceAxisViews[1].movePoint(t),
        this.requestUpdate()
    }
}
class DrawChart_Class {
    constructor(t, e, s, r) {
        i(this, "_chart");
        i(this, "_series");
        i(this, "_drawingsToolbarContainer");
        i(this, "_defaultOptions");
        i(this, "_rectangles");
        i(this, "_previewRectangle");
        i(this, "_points", []);
        i(this, "_drawing", !1);
        i(this, "_toolbarButton");
        i(this, "_clickHandler", t=>this._onClick(t));
        i(this, "_moveHandler", t=>this._onMouseMove(t));
        this._chart = t,
        this._series = e,
        this._drawingsToolbarContainer = s,
        this._addToolbarButton(),
        this._defaultOptions = r,
        this._rectangles = [],
        this._chart.subscribeClick(this._clickHandler),
        this._chart.subscribeCrosshairMove(this._moveHandler)
    }
    remove() {
        this.stopDrawing(),
        this._chart && (this._chart.unsubscribeClick(this._clickHandler),
        this._chart.unsubscribeCrosshairMove(this._moveHandler)),
        this._rectangles.forEach(t=>{
            this._removeRectangle(t)
        }
        ),
        this._rectangles = [],
        this._removePreviewRectangle(),
        this._chart = void 0,
        this._series = void 0,
        this._drawingsToolbarContainer = void 0
    }
    startDrawing() {
        this._drawing = !0,
        this._points = [],
        this._toolbarButton && (this._toolbarButton.style.fill = "rgb(100, 150, 250)")
    }
    stopDrawing() {
        this._drawing = !1,
        this._points = [],
        this._toolbarButton && (this._toolbarButton.style.fill = "rgb(0, 0, 0)")
    }
    isDrawing() {
        return this._drawing
    }
    _onClick(t) {
        if (!this._drawing || !t.point || !t.time || !this._series)
            return;
        const e = this._series.coordinateToPrice(t.point.y);
        e !== null && this._addPoint({
            time: t.time,
            price: e
        })
    }
    _onMouseMove(t) {
        if (!this._drawing || !t.point || !t.time || !this._series)
            return;
        const e = this._series.coordinateToPrice(t.point.y);
        e !== null && this._previewRectangle && this._previewRectangle.updateEndPoint({
            time: t.time,
            price: e
        })
    }
    _addPoint(t) {
        this._points.push(t),
        this._points.length >= 2 && (this._addNewRectangle(this._points[0], this._points[1]),
        this.stopDrawing(),
        this._removePreviewRectangle()),
        this._points.length === 1 && this._addPreviewRectangle(this._points[0])
    }
    _addNewRectangle(t, e) {
        const s = new u(t,e,{
            ...this._defaultOptions
        });
        this._rectangles.push(s),
        a(this._series).attachPrimitive(s)
    }
    _removeRectangle(t) {
        a(this._series).detachPrimitive(t)
    }
    _addPreviewRectangle(t) {
        this._previewRectangle = new L(t,t,{
            ...this._defaultOptions
        }),
        a(this._series).attachPrimitive(this._previewRectangle)
    }
    _removePreviewRectangle() {
        this._previewRectangle && (a(this._series).detachPrimitive(this._previewRectangle),
        this._previewRectangle = void 0)
    }
    _addToolbarButton() {
        if (!this._drawingsToolbarContainer)
            return;
        const t = document.createElement("div");
        t.style.width = "20px",
        t.style.height = "20px",
        t.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M315.4 15.5C309.7 5.9 299.2 0 288 0s-21.7 5.9-27.4 15.5l-96 160c-5.9 9.9-6.1 22.2-.4 32.2s16.3 16.2 27.8 16.2H384c11.5 0 22.2-6.2 27.8-16.2s5.5-22.3-.4-32.2l-96-160zM288 312V456c0 22.1 17.9 40 40 40H472c22.1 0 40-17.9 40-40V312c0-22.1-17.9-40-40-40H328c-22.1 0-40 17.9-40 40zM128 512a128 128 0 1 0 0-256 128 128 0 1 0 0 256z"/></svg>',
        t.addEventListener("click", ()=>{
            this.isDrawing() ? this.stopDrawing() : this.startDrawing()
        }
        ),
        this._drawingsToolbarContainer.appendChild(t),
        this._toolbarButton = t;
        const e = document.createElement("input");
        e.type = "color",
        e.value = "#C83264",
        e.style.width = "24px",
        e.style.height = "20px",
        e.style.border = "none",
        e.style.padding = "0px",
        e.style.backgroundColor = "transparent",
        e.addEventListener("change", ()=>{
            const s = e.value;
            this._defaultOptions.fillColor = s + "CC",
            this._defaultOptions.previewFillColor = s + "77",
            this._defaultOptions.labelColor = s
        }
        ),
        this._drawingsToolbarContainer.appendChild(e)
    }
}
const Draw_Chart_1 = f("chart", {
    autoSize: !0
})
const DrawChart_Series = Draw_Chart_1.addLineSeries()
const mockData = getMockData();
DrawChart_Series.setData(mockData);
new DrawChart_Class(Draw_Chart_1,DrawChart_Series,document.querySelector("#toolbar"),{
    showLabels: !1
});

export {DrawChart_Class as DrawChart_Class};