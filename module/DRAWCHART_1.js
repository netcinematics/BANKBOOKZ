var x = Object.defineProperty;
var m = (o,t,e)=>t in o ? x(o, t, {
    enumerable: !0,
    configurable: !0,
    writable: !0,
    value: e
}) : o[t] = e;
var makeMember = (o,t,e)=>(m(o, typeof t != "symbol" ? t + "" : t, e),e);
import {L as v, P as f} from "./lwc.prod.js";
import {g as getMockData} from "./sample-data.js";
import {e as pluginBase, P as plugBase2} from "./plugin-base.js";
import {a as l} from "./positions.js";
import {DrawLine_Class as DrawLine_Class} from "./DRAWLINES_1.js";
class Fill_Rect_Class {
    constructor(t, e, s) {
        makeMember(this, "_p1");
        makeMember(this, "_p2");
        makeMember(this, "_fillColor");
        this._p1 = t,
        this._p2 = e,
        this._fillColor = s
    }
    draw(t) {
        t.useBitmapCoordinateSpace(e=>{
            if (this._p1.x === null || this._p1.y === null || this._p2.x === null || this._p2.y === null)
                return;
            const ctx = e.context
              , r = l(this._p1.x, this._p2.x, e.horizontalPixelRatio)
              , n = l(this._p1.y, this._p2.y, e.verticalPixelRatio);
            ctx.fillStyle = this._fillColor,
            ctx.fillRect(r.position, n.position, r.length, n.length)
        }
        )
    }
}
class RectRender_Class {
    constructor(t) {
        makeMember(this, "_source");
        makeMember(this, "_p1", {
            x: null,
            y: null
        });
        makeMember(this, "_p2", {
            x: null,
            y: null
        });
        this._source = t
    }
    update() {
        const t = this._source.series
        const e = t.priceToCoordinate(this._source._p1.price)
        const s = t.priceToCoordinate(this._source._p2.price)
        const r = this._source.chart.timeScale()
        const n = r.timeToCoordinate(this._source._p1.time)
        const g = r.timeToCoordinate(this._source._p2.time);
        this._p1 = { x: n, y: e },
        this._p2 = { x: g, y: s }
    }
    renderer() {
        return new Fill_Rect_Class(this._p1,this._p2,this._source._options.fillColor)
    }
}
class RectDraw_Class {
    constructor(t, e, s, r) {
        makeMember(this, "_p1");
        makeMember(this, "_p2");
        makeMember(this, "_fillColor");
        makeMember(this, "_vertical", !1);
        this._p1 = t,
        this._p2 = e,
        this._fillColor = s,
        this._vertical = r
    }
    draw(t) {
        t.useBitmapCoordinateSpace(e=>{ //console.log('runtime draw')
            if (this._p1 === null || this._p2 === null)
                return;
            const ctx = e.context;
            ctx.globalAlpha = .5;
            const r = l(this._p1, this._p2, this._vertical ? e.verticalPixelRatio : e.horizontalPixelRatio);
            ctx.fillStyle = this._fillColor,
            this._vertical ? ctx.fillRect(0, r.position, 15, r.length) : ctx.fillRect(r.position, 0, r.length, 15)
        }
        )
    }
}
class Runtime_Renderer_Class {
    constructor(t, e) {
        makeMember(this, "_source");
        makeMember(this, "_p1", null);
        makeMember(this, "_p2", null);
        makeMember(this, "_vertical", !1);
        this._source = t,
        this._vertical = e
    }
    update() {
        [this._p1,this._p2] = this.getPoints()
    }
    renderer() {
        return new RectDraw_Class(this._p1,this._p2,this._source._options.fillColor,this._vertical)
    }
    zOrder() {
        return "bottom"
    }
}
class y extends Runtime_Renderer_Class {
    getPoints() {
        const t = this._source.series
          , e = t.priceToCoordinate(this._source._p1.price)
          , s = t.priceToCoordinate(this._source._p2.price);
        return [e, s]
    }
}
class A extends Runtime_Renderer_Class {
    getPoints() {
        const t = this._source.chart.timeScale()
          , e = t.timeToCoordinate(this._source._p1.time)
          , s = t.timeToCoordinate(this._source._p2.time);
        return [e, s]
    }
}
class p {
    constructor(t, e) {
        makeMember(this, "_source");
        makeMember(this, "_p");
        makeMember(this, "_pos", null);
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
const defaultRectOptions = {
    fillColor: "rgba(10, 50, 200, 0.75)",
    previewFillColor: "rgba(10, 50, 200, 0.25)",
    labelColor: "rgba(10, 50, 200, 1)",
    labelTextColor: "white",
    showLabels: !0,
    priceLabelFormatter: o=>o.toFixed(2),
    timeLabelFormatter: o=>typeof o == "string" ? o : (v(o) ? new Date(o.year,o.month,o.day) : new Date(o * 1e3)).toLocaleDateString()
};
class Rect_View extends plugBase2 {
    constructor(e, s, r={}) {
        super();
        makeMember(this, "_options");
        makeMember(this, "_p1");
        makeMember(this, "_p2");
        makeMember(this, "_paneViews");
        makeMember(this, "_timeAxisViews");
        makeMember(this, "_priceAxisViews");
        makeMember(this, "_priceAxisPaneViews");
        makeMember(this, "_timeAxisPaneViews");
        this._p1 = e,
        this._p2 = s,
        this._options = {
            ...defaultRectOptions,
            ...r
        },
        this._paneViews = [new RectRender_Class(this)],
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
class L extends Rect_View {
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
        makeMember(this, "_chart");
        makeMember(this, "_series");
        makeMember(this, "_drawingsToolbarContainer");
        makeMember(this, "_defaultOptions");
        makeMember(this, "_rectangles");
        makeMember(this, "_vertlines");
        makeMember(this, "_horzlines");
        makeMember(this, "_previewRectangle");
        makeMember(this, "_points", []);
        makeMember(this, "_drawing", !1);
        makeMember(this, "_drawVert", !1);
        makeMember(this, "_drawHorz", !1);
        makeMember(this, "_toolbarButton");
        makeMember(this, "_clickHandler", t=>this._onClick(t));
        makeMember(this, "_moveHandler", t=>this._onMouseMove(t));
        this._chart = t,
        this._series = e,
        this._drawingsToolbarContainer = s,
        this._addToolbarButton(),
        this._defaultRectOptions = r,
        this._rectangles = [],
        this._vertlines = [],
        this._horzlines = [],
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
    drawVertLine(event){
        debugger;
        let startPt = {price:0,time:event.time};//{x:event.point.x,y:event.point.y+100}
        let endPt = {price:0,time:event.time};//{x:event.point.x,y:event.point.y-10}
        event.seriesData.forEach((e)=>{
            startPt.price = e.value+100;
            endPt.price = e.value-100;
        })
        // const lineOptions_BTM = {width:2,showLabels:true,lineColor:"rgb(255, 0, 88)",
        //     labelBackgroundColor: "rgba(0, 0, 0, 0.85)", labelTextColor: "steelblue"
        // };        
        // const newVert = new DrawLine_Class(this._chart,this._series,
        //     startPt,endPt,lineOptions_BTM);
        // this._vertlines.push(newVert),
        // pluginBase(this._series).attachPrimitive(newVert) 

        // function drawLineOnChart(chart, price1, price2, time1, time2, lineColor) {
            // Get the price scale instance
            // const priceScale = this._chart.priceScale();
          
            // // Convert prices to pixel coordinates
            // const price1Pixel = priceScale.priceToCoordinate(startPt.price);
            // const price2Pixel = priceScale.priceToCoordinate(endPt.price);
          
            // // Assuming time1 and time2 are timestamps
            // const time1Pixel = this._chart.timeScale().indexToCoordinate(this._chart.timeScale().indexOf(event.time));
            // const time2Pixel = this._chart.timeScale().indexToCoordinate(this._chart.timeScale().indexOf(event.time));
          
            // // Access the chart's canvas context
            // const canvas = this._chart.chartElement();
            // const ctx = canvas.getContext('2d');
          
            // // Draw the line
            // ctx.beginPath();
            // ctx.strokeStyle = lineColor || 'red'; // Default color to red
            // ctx.moveTo(time1Pixel, price1Pixel);
            // ctx.lineTo(time2Pixel, price2Pixel);
            // ctx.stroke();
        //   }



    }
    drawHorzLine(event){
        debugger;
    }
    _onClick(event) {  //Anytime CHART IS CLICKED.   console.log('Clicked Chart')
        if(this._drawVert){
            this.drawVertLine(event);
            this._drawVert = false;
        }
        if(this._drawHorz){
            this.drawHorzLine();
            this._drawVert = false;
        }
        if (!this._drawing || !event.point || !event.time || !this._series){ return; }
        const e = this._series.coordinateToPrice(event.point.y);
        e !== null && this._addPoint({
            time: event.time,
            price: e
        })
    }
    _onMouseMove(t) {
        if (!this._drawing || !t.point || !t.time || !this._series)
            return;
        const pricePt = this._series.coordinateToPrice(t.point.y);
        // console.log(`Coordinate ${t.point.y} to Price ${pricePt}`)
        pricePt !== null && this._previewRectangle && this._previewRectangle.updateEndPoint({
            time: t.time,
            price: pricePt
        })
    }
    _addPoint(t) { //Add Start Point, and End Point of Rectangle.
        this._points.push(t),
        this._points.length >= 2 && (this._addNewRectangle(this._points[0], this._points[1]),
        this.stopDrawing(),
        this._removePreviewRectangle()),
        this._points.length === 1 && this._addPreviewRectangle(this._points[0])
    }
    _addNewRectangle(startPt, endPt) { //after click draw RECT on chart
        const newRect = new Rect_View(startPt,endPt,{...this._defaultRectOptions});
        this._rectangles.push(newRect),
        pluginBase(this._series).attachPrimitive(newRect)
    }
    _removeRectangle(t) {
        pluginBase(this._series).detachPrimitive(t)
    }
    _addPreviewRectangle(t) {
        this._previewRectangle = new L(t,t,{
            ...this._defaultRectOptions
        }),
        pluginBase(this._series).attachPrimitive(this._previewRectangle)
    }
    _removePreviewRectangle() {
        this._previewRectangle && (pluginBase(this._series).detachPrimitive(this._previewRectangle),
        this._previewRectangle = void 0)
    }
    _addToolbarButton() {
        if (!this._drawingsToolbarContainer)
            return;
        //*******************************BEGIN EDIT BTN */
        const EditBtn = document.createElement("div");
        EditBtn.style.width = "20px",
        EditBtn.style.height = "20px",
        EditBtn.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M315.4 15.5C309.7 5.9 299.2 0 288 0s-21.7 5.9-27.4 15.5l-96 160c-5.9 9.9-6.1 22.2-.4 32.2s16.3 16.2 27.8 16.2H384c11.5 0 22.2-6.2 27.8-16.2s5.5-22.3-.4-32.2l-96-160zM288 312V456c0 22.1 17.9 40 40 40H472c22.1 0 40-17.9 40-40V312c0-22.1-17.9-40-40-40H328c-22.1 0-40 17.9-40 40zM128 512a128 128 0 1 0 0-256 128 128 0 1 0 0 256z"/></svg>',
        EditBtn.addEventListener("click", ()=>{
            this.isDrawing() ? this.stopDrawing() : this.startDrawing()
        });
        this._drawingsToolbarContainer.appendChild(EditBtn);
        //**********************************END EDIT BTN */
        this._toolbarButton = EditBtn;
        const colorPick = document.createElement("input");
        colorPick.type = "color",
        colorPick.value = "#305BC0",
        colorPick.style.width = "24px",
        colorPick.style.height = "20px",
        colorPick.style.border = "none",
        colorPick.style.padding = "0px",
        colorPick.style.backgroundColor = "transparent",
        colorPick.addEventListener("change", ()=>{
            const s = colorPick.value;
            this._defaultRectOptions.fillColor = s + "CC",
            this._defaultRectOptions.previewFillColor = s + "77",
            this._defaultRectOptions.labelColor = s
        });
        this._drawingsToolbarContainer.appendChild(colorPick);
        //*******************************BEGIN VERT BTN */
        const VertLineBtn = document.createElement("div");
        VertLineBtn.style.width = "20px";
        VertLineBtn.style.height = "20px";
        VertLineBtn.innerHTML = '|';
        VertLineBtn.addEventListener("click", ()=>{
            // this.isDrawing() ? this.stopDrawing() : this.startDrawing()
            // debugger;
            this._drawVert = true;
        });
        this._drawingsToolbarContainer.appendChild(VertLineBtn);
        //**********************************END VERT BTN */
        //*******************************BEGIN HORZ BTN */
        const HorzLineBtn = document.createElement("div");
        HorzLineBtn.style.width = "20px";
        HorzLineBtn.style.height = "20px";
        HorzLineBtn.innerHTML = '---';
        HorzLineBtn.addEventListener("click", ()=>{
            // this.isDrawing() ? this.stopDrawing() : this.startDrawing()
            // debugger;
            this._drawHorz = true;
        });
        this._drawingsToolbarContainer.appendChild(HorzLineBtn);
        //**********************************END HORZ BTN */
    }
}
// const Draw_Chart_1 = f("chart", {  autoSize: !0 })
// const DrawChart_Series = Draw_Chart_1.addLineSeries()
// const mockData = getMockData();
// DrawChart_Series.setData(mockData);
// new DrawChart_Class(Draw_Chart_1,DrawChart_Series,document.querySelector("#toolbar"),{
//     showLabels: !1
// });

export {DrawChart_Class as DrawChart_Class};