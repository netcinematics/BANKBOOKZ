var objprops = Object.defineProperty;
var typeset = (a,t,i)=>t in a ? objprops(a, t, {
    enumerable: !0, configurable: !0, writable: !0, value: i}) : a[t] = i;
var makeMember = (a,t,i)=>(typeset(a, typeof t != "symbol" ? t + "" : t, i),i);
import {P as lwcprod} from "./lwc.prod.js";
import {g as getRandomDataSet} from "./sample-data.js";
class PointDraw_Class {
    constructor(p1, type, txt1, opts) {
        makeMember(this, "_p1");
        makeMember(this, "_type");
        makeMember(this, "_text1");
        // makeMember(this, "_text2");
        makeMember(this, "_options");
        this._p1 = p1,
        this._type = type,
        this._text1 = txt1,
        // this._text2 = txt2,
        this._options = opts
    }
    draw(parent) {
        parent.useBitmapCoordinateSpace(i=>{
            // if (this._p1.x === null || this._p1.y === null || this._p2.x === null || this._p2.y === null)
            if (this._p1.x === null || this._p1.y === null){ return; }
            const ctx = i.context
            let p1x = Math.round(this._p1.x * i.horizontalPixelRatio)
            let p1y = Math.round(this._p1.y * i.verticalPixelRatio)
            // let p2x = Math.round(this._p2.x * i.horizontalPixelRatio)
            // let p2y = Math.round(this._p2.y * i.verticalPixelRatio);
            ctx.lineWidth = this._options.width;
            ctx.strokeStyle = this._options.lineColor;
            // ctx.lineDashOffset = 0;
            // debugger;
            
            // ctx.setLineDash([6, 8])
            // ctx.strokeStyle = "rgb(88, 1, 144)"; //Deeppurple
            if(this._type==='+'){  //sml, big, lrg
                //----------------------------//DRAW-PLUS sign
                ctx.beginPath();
                ctx.lineCap = "round";
                ctx.moveTo(p1x+4, p1y);        
                ctx.lineTo(p1x-4, p1y);
                ctx.moveTo(p1x, p1y+4);        
                ctx.lineTo(p1x, p1y-4);
                ctx.stroke();
            }
            else if (this._type==='X'){
                //------------------------------   //DRAW-X
                ctx.beginPath();
                ctx.strokeStyle = this._options.lineColor;
                ctx.moveTo(p1x+4, p1y+4);     
                ctx.lineTo(p1x-4, p1y-4);
                ctx.moveTo(p1x+4, p1y-4);
                ctx.lineTo(p1x-4, p1y+4);
                ctx.stroke();
            }
            else{
                console.log('no type found')
                //------------------------------   //DRAW-SQUARE
                ctx.beginPath();
                ctx.strokeStyle = this._options.lineColor;
                ctx.moveTo(p1x+4, p1y+4);     
                ctx.lineTo(p1x+4, p1y-4);
                ctx.lineTo(p1x-4, p1y-4);
                ctx.lineTo(p1x-4, p1y+4);
                ctx.lineTo(p1x+4, p1y+4);
                ctx.stroke();                
            }
            // this._options.showLabels && (this._drawTextLabel(i, this._text1, p1x, p1y, !0),
            // this._drawTextLabel(i, this._text2, p2x, p2y, !1))
        })
    }
    _drawTextLabel(t, i, e, o, s) {
        t.context.font = "12px Verdana",
        t.context.beginPath();
        const r = 5 * t.horizontalPixelRatio
        let h = t.context.measureText(i)
        let p = s ? h.width + r * 4 : 0;
        t.context.fillStyle = this._options.labelBackgroundColor,
        // t.context.roundRect(e + r - p, o - 24, h.width + r * 2, 24 + r, 5),
        t.context.roundRect(e + r - p, o-15, h.width + r * 2, 20, 5),
        t.context.fill(),
        t.context.beginPath(),
        t.context.fillStyle = this._options.labelTextColor,
        t.context.fillText(i, e + r * 2 - p, o)
    }
}
class PointRender_Class {
    constructor(parent) {
        makeMember(this, "_source");
        makeMember(this, "_p1", { x: null,  y: null });
        makeMember(this, "_type","");
        this._source = parent
    }
    update() {
        const aSeries = this._source._series
        let yPT1 = aSeries.priceToCoordinate(this._source._p1.price)
        // let yPT2 = aSeries.priceToCoordinate(this._source._p2.price)
        let timeScale = this._source._chart.timeScale()
        let xPT1 = timeScale.timeToCoordinate(this._source._p1.time)
        // let xPT2 = timeScale.timeToCoordinate(this._source._p2.time);
        this._p1 = { x: xPT1,  y: yPT1  };

        this._type = this._source._type;
        // this._p2 = { x: xPT2,  y: yPT2  }
    }
    renderer() {
        return new PointDraw_Class(this._p1,this._type,"" + this._source._p1.price.toFixed(1),this._source._options)
        // return new PointDraw_Class(this._p1,this._p2,"" + this._source._p1.price.toFixed(1),"" + this._source._p2.price.toFixed(1),this._source._options)
    }
}
const PointOptions = {width:2,showLabels:true,lineColor:'steelblue', //
    labelBackgroundColor: "rgba(0, 0, 55, 0.85)", labelTextColor: "steelblue"
};
class TradeSpot_Class { //chartElem,lwc,EndPoint,StartPoint
    constructor(elem, lwc, strtpt, type,  opts) {
        makeMember(this, "_chart");
        makeMember(this, "_series");
        makeMember(this, "_p1");
        makeMember(this, "_type");
        makeMember(this, "_paneViews");
        makeMember(this, "_options");
        makeMember(this, "_minPrice");
        makeMember(this, "_maxPrice");
        this._chart = elem,
        this._series = lwc,
        this._p1 = strtpt,
        this._type = type,
        this._minPrice = Math.min(this._p1.price),
        this._maxPrice = Math.max(this._p1.price),
        // this._minPrice = Math.min(this._p1.price, this._p2.price),
        // this._maxPrice = Math.max(this._p1.price, this._p2.price),
        this._options = { ...PointOptions, ...opts },
        this._paneViews = [new PointRender_Class(this)]
    }
    autoscaleInfo(t, i) {
        const P1 = this._pointIndex(this._p1)
        // let o = this._pointIndex(this._p2);
        // return P1 === null || o === null || i < P1 || t > o ? null : {
        return P1 === null || i < P1 || P1 ? null : {
            priceRange: { minValue: this._minPrice, maxValue: this._maxPrice }
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

export {TradeSpot_Class as TradeSpot_Class};