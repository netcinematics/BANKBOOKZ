var objprops = Object.defineProperty;
var typeset = (a,t,i)=>t in a ? objprops(a, t, {
    enumerable: !0, configurable: !0, writable: !0, value: i}) : a[t] = i;
var makeMember = (a,t,i)=>(typeset(a, typeof t != "symbol" ? t + "" : t, i),i);
import {P as lwcprod} from "./lwc.prod.js";
import {g as getRandomDataSet} from "./sample-data.js";
class LineClass {
    constructor(p1, p2, txt1, txt2, opts) {
        makeMember(this, "_p1");
        makeMember(this, "_p2");
        makeMember(this, "_text1");
        makeMember(this, "_text2");
        makeMember(this, "_options");
        this._p1 = p1,
        this._p2 = p2,
        this._text1 = txt1,
        this._text2 = txt2,
        this._options = opts
    }
    draw(parent) {
        parent.useBitmapCoordinateSpace(i=>{
            if (this._p1.x === null || this._p1.y === null || this._p2.x === null || this._p2.y === null)
                return;
            const e = i.context
              , o = Math.round(this._p1.x * i.horizontalPixelRatio)
              , s = Math.round(this._p1.y * i.verticalPixelRatio)
              , r = Math.round(this._p2.x * i.horizontalPixelRatio)
              , h = Math.round(this._p2.y * i.verticalPixelRatio);
            e.lineWidth = this._options.width,
            e.strokeStyle = this._options.lineColor,
            e.beginPath(),
            e.moveTo(o, s),
            e.lineTo(r, h),
            e.stroke(),
            this._options.showLabels && (this._drawTextLabel(i, this._text1, o, s, !0),
            this._drawTextLabel(i, this._text2, r, h, !1))
        })
    }
    _drawTextLabel(t, i, e, o, s) {
        t.context.font = "12px Verdana",
        t.context.beginPath();
        const r = 5 * t.horizontalPixelRatio
          , h = t.context.measureText(i)
          , p = s ? h.width + r * 4 : 0;
        t.context.fillStyle = this._options.labelBackgroundColor,
        t.context.roundRect(e + r - p, o - 24, h.width + r * 2, 24 + r, 5),
        t.context.fill(),
        t.context.beginPath(),
        t.context.fillStyle = this._options.labelTextColor,
        t.context.fillText(i, e + r * 2 - p, o)
    }
}
class PaneViews {
    constructor(parent) {
        makeMember(this, "_source");
        makeMember(this, "_p1", { x: null,  y: null });
        makeMember(this, "_p2", { x: null,  y: null });
        this._source = parent
    }
    update() {
        const t = this._source._series
          , i = t.priceToCoordinate(this._source._p1.price)
          , e = t.priceToCoordinate(this._source._p2.price)
          , o = this._source._chart.timeScale()
          , s = o.timeToCoordinate(this._source._p1.time)
          , r = o.timeToCoordinate(this._source._p2.time);
        this._p1 = { x: s,  y: i  },
        this._p2 = { x: r,  y: e  }
    }
    renderer() {
        return new LineClass(this._p1,this._p2,"" + this._source._p1.price.toFixed(1),"" + this._source._p2.price.toFixed(1),this._source._options)
    }
}
const lineOptions = {width:1,showLabels:true,lineColor:"rgb(0, 0, 0.88)",
    labelBackgroundColor: "rgba(255, 255, 255, 0.85)", labelTextColor: "rgb(0, 0, 1)"
};
class TrendLine_ChartClass { //chartElem,lwc,EndPoint,StartPoint
    constructor(elem, lwc, endpt, strtpt, s) {
        makeMember(this, "_chart");
        makeMember(this, "_series");
        makeMember(this, "_p1");
        makeMember(this, "_p2");
        makeMember(this, "_paneViews");
        makeMember(this, "_options");
        makeMember(this, "_minPrice");
        makeMember(this, "_maxPrice");
        this._chart = elem,
        this._series = lwc,
        this._p1 = endpt,
        this._p2 = strtpt,
        this._minPrice = Math.min(this._p1.price, this._p2.price),
        this._maxPrice = Math.max(this._p1.price, this._p2.price),
        this._options = {
            ...lineOptions,
            ...s
        },
        this._paneViews = [new PaneViews(this)]
    }
    autoscaleInfo(t, i) {
        const e = this._pointIndex(this._p1)
          , o = this._pointIndex(this._p2);
        return e === null || o === null || i < e || t > o ? null : {
            priceRange: {
                minValue: this._minPrice,
                maxValue: this._maxPrice
            }
        }
    }
    updateAllViews() {
        this._paneViews.forEach(t=>t.update())
    }
    paneViews() {
        return this._paneViews
    }
    _pointIndex(t) {
        const i = this._chart.timeScale().timeToCoordinate(t.time);
        return i === null ? null : this._chart.timeScale().coordinateToLogical(i)
    }
}
const chartElem = window.chart = lwcprod("chart", {
    autoSize: !0
})
const lwc_lineSeries = chartElem.addLineSeries()
const  dataSet = getRandomDataSet();
// debugger;
lwc_lineSeries.setData(dataSet);
const len = dataSet.length;
const EndPoint = {
    time: dataSet[len - 50].time,
    price: dataSet[len - 50].value * .9
}
const StartPoint = {
    time: dataSet[len - 5].time,
    price: dataSet[len - 5].value * 1.1
}

const trendLine1 = new TrendLine_ChartClass(chartElem,lwc_lineSeries,EndPoint,StartPoint);
lwc_lineSeries.attachPrimitive(trendLine1);
let topEND={},topSTART={};
topEND.time = EndPoint.time;
topEND.price = EndPoint.price+10;
topSTART.time = StartPoint.time;
topSTART.price = StartPoint.price+200;
const trendLineTOP = new TrendLine_ChartClass(chartElem,lwc_lineSeries,topEND,topSTART);
lwc_lineSeries.attachPrimitive(trendLineTOP);
let midEND={},midSTART={};
midEND.time = EndPoint.time;
midEND.price = EndPoint.price-10;
midSTART.time = StartPoint.time;
midSTART.price = StartPoint.price-10;
const trendLinemid = new TrendLine_ChartClass(chartElem,lwc_lineSeries,midEND,midSTART);
lwc_lineSeries.attachPrimitive(trendLinemid);
let btmEND={},btmSTART={};
btmEND.time = EndPoint.time;
btmEND.price = EndPoint.price-10;
btmSTART.time = StartPoint.time;
btmSTART.price = StartPoint.price-200;
const trendLinebtm = new TrendLine_ChartClass(chartElem,lwc_lineSeries,btmEND,btmSTART);
lwc_lineSeries.attachPrimitive(trendLinebtm);