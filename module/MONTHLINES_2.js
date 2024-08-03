var _ = Object.defineProperty;
var u = (s,t,e)=>t in s ? _(s, t, {
    enumerable: !0,
    configurable: !0,
    writable: !0,
    value: e
}) : s[t] = e;
var addMember = (s,t,e)=>(u(s, typeof t != "symbol" ? t + "" : t, e),
e);
// import {V as p} from "./lightweight-charts.production-7ee7078d.js";
// import {g as w} from "./sample-data-c7d89ab8.js";
// import {p as m} from "./positions-0a54307c.js";
import {P as lwcprod} from "./lwc.prod.js";
import {g as getMockData} from "./sample-data.js";
import {p as m} from "./positions.js";

class VLineDraw_Class {
    constructor(x,y,e) {
        addMember(this, "_x", null);
        addMember(this, "_y", null);
        addMember(this, "_options");
        this._x = x,
        this._y = y,
        this._options = e
    }
    draw(t) {
        t.useBitmapCoordinateSpace(e=>{
            if (this._x === null){ return; }
            // debugger;
            // if (this._y === null){ return; }
            const ctx = e.context
            // const rect = m(this._x, e.horizontalPixelRatio, this._options.width);
            // ctx.fillStyle = this._options.color,
            // ctx.fillRect(rect.position, 0, rect.length, e.bitmapSize.height)
            // ******************************DRAW MONTH LINES****************
            const p1x = this._x;
            const p1y = 1;
            const p2x = this._x;
            const p2y = e.bitmapSize.height;
            ctx.lineWidth = 1;//this._options.width,
            ctx.strokeStyle = "steelblue";//this._options.lineColor,
            ctx.lineDashOffset = 0;
            ctx.beginPath();
            ctx.setLineDash([2,5]); //Dotted
            ctx.lineCap = "round";
            ctx.moveTo(p1x, p1y);
            ctx.lineTo(p2x, p2y);
            ctx.stroke();
            // ******************************END MONTH LINES****************
            // ******************************DRAW TOP LINES****************
            const top1x = this._x;
            const top1y = this._y;
            const top2x = this._x+166;
            const top2y = this._y-166;//e.bitmapSize.height;
            ctx.lineWidth = 1;//this._options.width,
            ctx.strokeStyle = "limegreen";//this._options.lineColor,
            ctx.lineDashOffset = 0;
            ctx.beginPath();
            ctx.setLineDash([2,5]); //Dotted
            ctx.lineCap = "round";
            ctx.moveTo(top1x, top1y);
            ctx.lineTo(top2x, top2y);
            ctx.stroke();
            // ******************************END TOP LINES****************
            // ******************************DRAW MID LINES****************
            const mid1x = this._x;
            const mid1y = this._y;
            const mid2x = this._x+180;
            const mid2y = this._y;//e.bitmapSize.height;
            ctx.lineWidth = 1;//this._options.width,
            ctx.strokeStyle = "steelblue";//this._options.lineColor,
            ctx.lineDashOffset = 0;
            ctx.beginPath();
            ctx.setLineDash([2,5]); //Dotted
            ctx.lineCap = "round";
            ctx.moveTo(mid1x, mid1y);
            ctx.lineTo(mid2x, mid2y);
            ctx.stroke();
            // ******************************END MID LINES****************
            // ******************************DRAW BTM LINES****************
            const btm2x = this._x;
            const btm2y = this._y;
            const btm1x = this._x+166;
            let btm1y = this._y+166;//this._y-e.bitmapSize.height;
            ctx.lineWidth = 1;//this._options.width,
            ctx.strokeStyle = "red";//this._options.lineColor,
            ctx.lineDashOffset = 0;
            ctx.beginPath();
            ctx.setLineDash([2,5]); //Dotted
            ctx.lineCap = "round";
            ctx.moveTo(btm1x, btm1y);
            ctx.lineTo(btm2x, btm2y);
            ctx.stroke();
            // ******************************END BTM LINES****************            
        })
    }
}
class VLineRender_Class {
    constructor(t, e) {
        addMember(this, "_source");
        addMember(this, "_x", null);
        addMember(this, "_y", null);
        addMember(this, "_options");
        this._source = t,
        this._options = e
    }
    update() {
        const t = this._source._chart.timeScale();
        this._x = t.timeToCoordinate(this._source._time)
        this._y = this._source._series.priceToCoordinate(this._source._price);
    }
    renderer() {
        return new VLineDraw_Class(this._x,this._y,this._options)
    }
}
class VLinePane_Class {
    constructor(t, e) {
        addMember(this, "_source");
        addMember(this, "_x", null);
        addMember(this, "_options");
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
class MonthTrendLines_Class {
    constructor(chart, series, timeVal, priceVal, usrOpts) {
        addMember(this, "_chart");
        addMember(this, "_series");
        addMember(this, "_time");
        addMember(this, "_price");
        addMember(this, "_paneViews");
        addMember(this, "_timeAxisViews");
        const opts = {...vline_Default_Options,...usrOpts};
        this._chart = chart,
        this._series = series,
        this._time = timeVal,
        this._price = priceVal,
        this._paneViews = [new VLineRender_Class(this,opts)],
        this._timeAxisViews = [new VLinePane_Class(this,opts)]
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

export {MonthTrendLines_Class as MonthTrendLines_Class};

// const lineChart = lwcprod("chart", {autoSize: !0})
// const lineSeries = lineChart.addLineSeries()
// const data = getMockData();
// lineSeries.setData(data);
// const vl1 = new MonthTrendLines_Class(lineChart,lineSeries,data[data.length - 50].time,{
//     showLabel: !0, labelText: "1"});
// lineSeries.attachPrimitive(vl1);
// const vl2 = new MonthTrendLines_Class(lineChart,lineSeries,data[data.length - 25].time,{
//     showLabel: !1,color: "red",width: 2
// });
// lineSeries.attachPrimitive(vl2);
