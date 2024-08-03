var v = Object.defineProperty;
var P = (r,t,i)=>t in r ? v(r, t, {enumerable: !0,configurable: !0,writable: !0,value: i}) : r[t] = i;
var addMember = (r,t,i)=>(P(r, typeof t != "symbol" ? t + "" : t, i),i);
// import {a as b, d as m, V as C} from "./lightweight-charts.production-7ee7078d.js";
// import {g as f} from "./sample-data-c7d89ab8.js";
// import {P as w} from "./plugin-base-a12dadc8.js";
// import {a as g, p as L} from "./positions-0a54307c.js";
import {d as b, z as m, P as lwcprod} from "./lwc.prod.js";
import {g as getMockData} from "./sample-data.js";
import {P as plugBase} from "./plugin-base.js";
import {a as g, p as L} from "./positions.js";
const h = 21
const x = "M7.5,7.5 m -7,0 a 7,7 0 1,0 14,0 a 7,7 0 1,0 -14,0 M4 7.5H11 M7.5 4V11"
const S = new Path2D(x)
const M = 15;
class PriceLineUpdate_Class {
    constructor(t) {
        addMember(this, "_y", 0);
        addMember(this, "_data");
        this._data = t
    }
    update(t, i) {
        if (this._data = t,
        !this._data.price) {
            this._y = -1e4;
            return
        }
        this._y = i.priceToCoordinate(this._data.price) ?? -1e4
    }
}
class PriceLineDraw_Class {
    constructor(t) {
        addMember(this, "_data");
        this._data = t
    }
    draw(t) {
        this._data.visible && t.useBitmapCoordinateSpace(i=>{
            const ctx = i.context
            const n = h
            const u = n + 1
            const o = g(this._data.rightX - u, this._data.rightX - 1, i.horizontalPixelRatio)
            const a = L(this._data.y, i.verticalPixelRatio, n);
            ctx.fillStyle = this._data.color;
            const l = [5, 0, 0, 5].map(p=>p * i.horizontalPixelRatio);
            ctx.beginPath(),
            ctx.roundRect(o.position, a.position, o.length, a.length, l),
            ctx.fill(),
            this._data.hovered && (ctx.fillStyle = this._data.hoverColor,
            ctx.beginPath(),
            ctx.roundRect(o.position, a.position, o.length, a.length, l),
            ctx.fill()),
            ctx.translate(o.position + 3 * i.horizontalPixelRatio, a.position + 3 * i.verticalPixelRatio),
            ctx.scale(i.horizontalPixelRatio, i.verticalPixelRatio);
            const c = 15 / M;
            ctx.scale(c, c),
            ctx.strokeStyle = this._data.textColor,
            ctx.lineWidth = 1,
            ctx.stroke(S)
        }
        )
    }
}
class PriceLineRenderer_Class extends PriceLineUpdate_Class {
    renderer() {
        const t = this._data.crosshairColor;
        return new PriceLineDraw_Class({visible: this._data.visible,y: this._y,color: t,
            textColor: this._data.crosshairLabelColor,rightX: this._data.timeScaleWidth,
            hoverColor: this._data.hoverColor,hovered: this._data.hovered ?? !1
        })
    }
    zOrder() {
        return "top"
    }
}
class PriceLinePane_Class extends plugBase {
    constructor(i) {
        super();
        addMember(this, "_paneViews");
        addMember(this, "_data", {visible: !1,hovered: !1,timeScaleWidth: 0,
            crosshairLabelColor: "#000000",crosshairColor: "#ffffff",
            lineColor: "#000000",hoverColor: "#777777"
        });
        addMember(this, "_source");
        this._paneViews = [new PriceLineRenderer_Class(this._data)],
        this._source = i
    }
    updateAllViews() {
        this._paneViews.forEach(i=>i.update(this._data, this.series))
    }
    priceAxisViews() {
        return []
    }
    paneViews() {
        return this._paneViews
    }
    showAddLabel(i, e) {
        const n = this.chart.options().crosshair.horzLine.labelBackgroundColor;
        this._data = {visible: !0,price: i,hovered: e,
            timeScaleWidth: this.chart.timeScale().width(),
            crosshairColor: n, crosshairLabelColor: "#FFFFFF",
            lineColor: this._source.currentLineColor(),
            hoverColor: this._source.currentHoverColor()
        },
        this.updateAllViews(),
        this.requestUpdate()
    }
    hideAddLabel() {
        this._data.visible = !1,
        this.updateAllViews(),
        this.requestUpdate()
    }
}
const priceline_Default_Options = {color: "#000000",hoverColor: "#777777",limitToOne:!0};
class SetPriceLine_Class {
    constructor(t, i, e) {
        addMember(this, "_chart");
        addMember(this, "_series");
        addMember(this, "_options");
        addMember(this, "_labelButtonPrimitive");
        addMember(this, "_clickHandler", t=>this._onClick(t));
        addMember(this, "_moveHandler", t=>this._onMouseMove(t));
        this._chart = t,
        this._series = i,
        this._options = {
            ...priceline_Default_Options,
            ...e
        },
        this._chart.subscribeClick(this._clickHandler),
        this._chart.subscribeCrosshairMove(this._moveHandler),
        this._labelButtonPrimitive = new PriceLinePane_Class(this),
        i.attachPrimitive(this._labelButtonPrimitive),
        this._setCrosshairMode()
    }
    currentLineColor() { return this._options.color }
    currentHoverColor() { return this._options.hoverColor }
    _setCrosshairMode() {
        if (!this._chart)
            throw new Error("Unable to change crosshair mode because the chart instance is undefined");
        this._chart.applyOptions({ crosshair: { mode: b.Normal}  })
    }
    remove() {
        this._chart && (this._chart.unsubscribeClick(this._clickHandler),
        this._chart.unsubscribeCrosshairMove(this._moveHandler)),
        this._series && this._labelButtonPrimitive && this._series.detachPrimitive(this._labelButtonPrimitive),
        this._chart = void 0,
        this._series = void 0
    }
    _onClick(t) {
        const i = this._getMousePrice(t)
        const e = this._distanceFromRightScale(t);
        i === null || e === null || e > h || !this._series || this._series.createPriceLine({
            price: i,
            color: this._options.color,
            lineStyle: m.Dashed
        })
    }
    _onMouseMove(t) {
        const i = this._getMousePrice(t)
          , e = this._distanceFromRightScale(t);
        if (i === null || e === null || e > h * 2) {
            this._labelButtonPrimitive.hideAddLabel();
            return
        }
        this._labelButtonPrimitive.showAddLabel(i, e < h)
    }
    _getMousePrice(t) {
        return !t.point || !this._series ? null : this._series.coordinateToPrice(t.point.y)
    }
    _distanceFromRightScale(t) {
        if (!t.point || !this._chart)
            return null;
        const i = this._chart.timeScale().width();
        return Math.abs(i - t.point.x)
    }
}

export {SetPriceLine_Class as SetPriceLine_Class};

// const priceChart = lwcprod("chart", { autoSize: !0 })
// const priceSeries = priceChart.addLineSeries()
// const data = getMockData();
// priceSeries.setData(data);
// new SetPriceLine_Class(priceChart,priceSeries,{ color: "steelblue"});
