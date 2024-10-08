var v = Object.defineProperty;
var P = (r,t,i)=>t in r ? v(r, t, {enumerable: !0,configurable: !0,writable: !0,value: i}) : r[t] = i;
var addMember = (r,t,i)=>(P(r, typeof t != "symbol" ? t + "" : t, i),i);
// import {a as b, d as m, V as C} from "./lightweight-charts.production-7ee7078d.js";
// import {g as f} from "./sample-data-c7d89ab8.js";
// import {P as w} from "./plugin-base-a12dadc8.js";
// import {a as g, p as L} from "./positions-0a54307c.js";
// import {d as b, z as m, P as lwcprod} from "./lwc.prod.js";
import {g as getMockData} from "./sample-data.js";
import {P as plugBase} from "./plugin-base.js";
import {a as g, p as L} from "./positions.js";
const h = 21
const rawSymbol1 = "M7.5,7.5 m -7,0 a 7,7 0 1,0 14,0 a 7,7 0 1,0 -14,0 M4 7.5H11 M7.5 4V11"
const rawSymbol2 = "M7.5,7.5 m -7,0 a 7,7 0 1,0 14,0 a 7,7 0 1,0 -14,0 M4 7.5H10 M7.5 4V11"
// const symbol1 = new Path2D(rawSymbol1)
const symbol1 = new Path2D(rawSymbol2)
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
        if(this._data.visible ){
            t.useBitmapCoordinateSpace(i=>{
                const ctx = i.context
                const n = h
                const u = n + 1
                const o = g(this._data.rightX - u, this._data.rightX - 1, i.horizontalPixelRatio)
                const a = L(this._data.y, i.verticalPixelRatio, n);
                ctx.fillStyle = this._data.color;
                const l = [5, 0, 0, 5].map(p=>p * i.horizontalPixelRatio);
                ctx.beginPath();
                ctx.roundRect(o.position, a.position, o.length, a.length, l);
                ctx.fill();

                // if(this._data.hovered){

                // } else if ctx.fillStyle = this._data.hoverColor,
                if(this._data.hovered && this._data.visibleDel){
                  ctx.fillStyle = "red";
                } else if(this._data.hovered){
                  ctx.fillStyle = this._data.hoverColor;
                  ctx.beginPath();
                  ctx.roundRect(o.position, a.position, o.length, a.length, l)
                  ctx.fill();
                }

                // ctx.beginPath();
                // ctx.roundRect(o.position, a.position, o.length, a.length, l)
                // ctx.fill();

            // }
                ctx.translate(o.position + 3 * i.horizontalPixelRatio, a.position + 3 * i.verticalPixelRatio),
                ctx.scale(i.horizontalPixelRatio, i.verticalPixelRatio);
                const c = 15 / M;
                ctx.scale(c, c),
                ctx.strokeStyle = this._data.textColor,
                ctx.lineWidth = 1;
                if(this._data.visibleDel){// Draw the X
                    ctx.beginPath();
                    ctx.moveTo(2, 2);
                    ctx.lineTo(12, 12);
                    ctx.moveTo(2, 12);
                    ctx.lineTo(12, 2);
                    ctx.stroke();
                }else {
                    ctx.stroke(symbol1)
                }
            })
        }
    }
}
class PriceLineRenderer_Class extends PriceLineUpdate_Class {
    renderer() {
        const t = this._data.crosshairColor;
        return new PriceLineDraw_Class({visible: this._data.visible,y: this._y,color: t,
            textColor: this._data.crosshairLabelColor,rightX: this._data.timeScaleWidth,
            visibleDel:this._data.visibleDel,
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
        addMember(this, "_data", {visible:!1,hovered:!1,timeScaleWidth:0,
            crosshairLabelColor: "#020202",crosshairColor: "#ffffff",
            lineColor: "#090909",hoverColor: "#777777",visibleDel:false
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
        this._data = {visible:!0,price: i,visibleDel:false,hovered: e,
            timeScaleWidth: this.chart.timeScale().width(),
            crosshairColor: n, crosshairLabelColor: "#FFFFFF",
            lineColor: this._source.currentLineColor(),
            hoverColor: this._source.currentHoverColor()
        },
        this.updateAllViews(),
        this.requestUpdate()
    }
    showDeleteLabel(i, e) {
        const n = this.chart.options().crosshair.horzLine.labelBackgroundColor;
        this._data = {visible:!0,price: i,visibleDel:true,hovered: e,
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
        this._data.visibleDel = !1,
        this.updateAllViews(),
        this.requestUpdate()
    }
    _deleteLineCheck(){
        if(this._data.visibleDel){ //delete priceline
            return true;
        }
        return false
    }
}
const priceline_Default_Options = {color: "#888888",hoverColor: "#777777",limitToOne:!0};
class SetPriceLine_Class {
    constructor(chart, series, opts) {
        addMember(this, "_chart");
        addMember(this, "_series");
        addMember(this, "_options");
        addMember(this, "_pricelines");
        addMember(this, "_labelButtonPrimitive");
        addMember(this, "_clickHandler", t=>this._onClick(t));
        addMember(this, "_moveHandler", t=>this._onMouseMove(t));
        this._chart = chart,
        this._series = series,
        this._pricelines = [],
        this._options = {
            ...priceline_Default_Options,
            ...opts
        },
        this._chart.subscribeClick(this._clickHandler),
        this._chart.subscribeCrosshairMove(this._moveHandler),
        this._labelButtonPrimitive = new PriceLinePane_Class(this),
        series.attachPrimitive(this._labelButtonPrimitive),
        this._setCrosshairMode()
    }
    currentLineColor() { return this._options.color }
    currentHoverColor() { return this._options.hoverColor }
    _setCrosshairMode() {
        if (!this._chart)
            throw new Error("Unable to change crosshair mode because the chart instance is undefined");
        this._chart.applyOptions({ crosshair: { mode: "Dashed" /*2Dashed*/}  })
    }
    remove() {
        this._chart && (this._chart.unsubscribeClick(this._clickHandler),
        this._chart.unsubscribeCrosshairMove(this._moveHandler)),
        this._series && this._labelButtonPrimitive && this._series.detachPrimitive(this._labelButtonPrimitive),
        this._chart = void 0,
        this._series = void 0
    }
    _onClick(t) {
        const mousePrice = this._getMousePrice(t)
        const rightMargin = this._distanceFromRightScale(t);
        let line;
        if(mousePrice === null || rightMargin === null || rightMargin > h || !this._series){return}
        if(this._labelButtonPrimitive._deleteLineCheck()){

            for(var i=0;i<this._pricelines.length;i++){
                line = this._pricelines[i];
                if(Math.round(line.price)===Math.round(mousePrice)//with buffer
                || Math.round(line.price) < Math.round(mousePrice+12)
                && Math.round(line.price) > Math.round(mousePrice-12)
                ){
                    this._series.removePriceLine(this._pricelines[i].line)
                    this._pricelines.splice(i,1);
                    break;
                }
            }    
            this._labelButtonPrimitive.hideAddLabel();
        } else { //New priceline
            let newLine = this._series.createPriceLine({price: mousePrice, color: this._options.color, lineStyle: 2/*Dashed*/ // lineStyle: m.Dashed
            })
            this._pricelines.push({price:Math.round(mousePrice),line:newLine})

        }
        // this._pricelines.push({price:Math.round(mousePrice)})
        // this._series.createPriceLine({price: mousePrice, color: this._options.color, lineStyle: 2/*Dashed*/ // lineStyle: m.Dashed
        // })
    }
    _onMouseMove(t) {
        const mousePrice = this._getMousePrice(t)
        const rMargin = this._distanceFromRightScale(t);
        const showZone = 18;
        if (mousePrice === null || rMargin === null || rMargin > h * showZone) {
            // this._labelButtonPrimitive.hideAddLabel(); //No need to hide.
            return
        }
        if(this.hoverLine(mousePrice)){
            this._labelButtonPrimitive.showDeleteLabel(mousePrice, rMargin < h)
        }else{
            this._labelButtonPrimitive.showAddLabel(mousePrice, rMargin < h)
        }
        // this._labelButtonPrimitive.showAddLabel(i, e < h) //original
    }
    hoverLine(mousePrice){
        let item;
        for(var i=0; i< this._pricelines.length;i++){
            item = this._pricelines[i];
            if( Math.round(item.price) === Math.round(mousePrice) //with buffer
                || Math.round(item.price) < Math.round(mousePrice+12)
                && Math.round(item.price) > Math.round(mousePrice-12)
            ){  return true; } //found line
        }    
        return false;
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
    setPricelines(priceLineArr){
        try{ this._pricelines.push(...priceLineArr)
        } catch (e){ console.log('Param expects array')  }
    }
}

export {SetPriceLine_Class as SetPriceLine_Class};

// const priceChart = lwcprod("chart", { autoSize: !0 })
// const priceSeries = priceChart.addLineSeries()
// const data = getMockData();
// priceSeries.setData(data);
// new SetPriceLine_Class(priceChart,priceSeries,{ color: "steelblue"});
