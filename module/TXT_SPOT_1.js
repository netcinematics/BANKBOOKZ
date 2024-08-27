var objprops = Object.defineProperty;
var typeset = (a,t,i)=>t in a ? objprops(a, t, {
    enumerable: !0, configurable: !0, writable: !0, value: i}) : a[t] = i;
var addMember = (a,t,i)=>(typeset(a, typeof t != "symbol" ? t + "" : t, i),i);
import {P as lwcprod} from "./lwc.prod.js";
import {g as getRandomDataSet} from "./sample-data.js";
class PointDraw_Class {
    constructor(p1, txt, txt1, opts) {
        addMember(this, "_p1");
        addMember(this, "_txt");
        addMember(this, "_text1");
        // makeMember(this, "_text2");
        addMember(this, "_options");
        this._p1 = p1,
        this._txt = txt,
        this._text1 = txt1,
        // this._text2 = txt2,
        this._options = opts
    }
    draw(parent) {
        parent.useBitmapCoordinateSpace(el=>{
            // if (this._p1.x === null || this._p1.y === null || this._p2.x === null || this._p2.y === null)
            if (this._p1.x === null || this._p1.y === null){ return; }
            const ctx = el.context
            let p1x = Math.round(this._p1.x * el.horizontalPixelRatio)
            let p1y = Math.round(this._p1.y * el.verticalPixelRatio)
            // let p2x = Math.round(this._p2.x * i.horizontalPixelRatio)
            // let p2y = Math.round(this._p2.y * i.verticalPixelRatio);
            ctx.lineWidth = this._options.width;
            ctx.strokeStyle = this._options.lineColor;
            // ctx.lineDashOffset = 0;
            // debugger;
            this._drawTextLabel(el, this._txt, p1x, p1y, true)
            // parent.update();
            // ctx.setLineDash([6, 8])
            // ctx.strokeStyle = "rgb(88, 1, 144)"; //Deeppurple
            // let scale = 0;
            // if(this._type==='+'){  //sml, big, lrg
            //     //----------------------------//DRAW-PLUS sign
            //     ctx.beginPath();
            //     ctx.lineCap = "round";
            //     ctx.moveTo(p1x+4+scale, p1y);        
            //     ctx.lineTo(p1x-4+scale, p1y);
            //     ctx.moveTo(p1x, p1y+4+scale);        
            //     ctx.lineTo(p1x, p1y-4+scale);
            //     ctx.stroke();
            // }
            // else if (this._type==='X'){
            //     //------------------------------   //DRAW-X
            //     ctx.beginPath();
            //     ctx.strokeStyle = this._options.lineColor;
            //     ctx.moveTo(p1x+4+scale, p1y+4+scale);     
            //     ctx.lineTo(p1x-4+scale, p1y-4+scale);
            //     ctx.moveTo(p1x+4+scale, p1y-4+scale);
            //     ctx.lineTo(p1x-4+scale, p1y+4+scale);
            //     ctx.stroke();
            // }
            // else{
            //     // console.log('no type found')
            //     //------------------------------   //DRAW-SQUARE
            //     ctx.beginPath();
            //     ctx.strokeStyle = this._options.lineColor;
            //     ctx.moveTo(p1x+4, p1y+4);     
            //     ctx.lineTo(p1x+4, p1y-4);
            //     ctx.lineTo(p1x-4, p1y-4);
            //     ctx.lineTo(p1x-4, p1y+4);
            //     ctx.lineTo(p1x+4, p1y+4);
                // ctx.stroke();                
            // }
            // this._options.showLabels && (this._drawTextLabel(el, this._text1, p1x, p1y, !0),
            // if(this._options.showLabels){
            //     this._drawTextLabel(el, this._text1, p1x, p1y, true)
            // }
        })
    }
    _drawTextLabel(el, txt, p1x, p1y, s) {
        el.context.font = "12px Verdana",
        el.context.beginPath();
        const r = 5 * el.horizontalPixelRatio
        let h = el.context.measureText(txt)
        let p = s ? h.width + r * 4 : 0; //true is left, right is false.
        el.context.fillStyle = this._options.labelBackgroundColor,
        // t.context.roundRect(e + r - p, o - 24, h.width + r * 2, 24 + r, 5),
        el.context.roundRect(p1x + r - p, p1y-15, h.width + r * 2, 20, 5),
        el.context.fill(),
        el.context.beginPath(),
        el.context.fillStyle = this._options.labelTextColor,
        el.context.fillText(txt, p1x + r * 2 - p, p1y)
    }
}
class PointRender_Class {
    constructor(parent) {
        addMember(this, "_source");
        addMember(this, "_p1", { x: null,  y: null });
        addMember(this, "_txt","");
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

        this._txt = this._source._txt;
        // this._p2 = { x: xPT2,  y: yPT2  }
    }
    renderer() {
        return new PointDraw_Class(this._p1,this._txt,"" + this._source._p1.price.toFixed(1),this._source._options)
        // return new PointDraw_Class(this._p1,this._p2,"" + this._source._p1.price.toFixed(1),"" + this._source._p2.price.toFixed(1),this._source._options)
    }
}
const PointOptions = {width:2,showLabels:true,lineColor:'steelblue', //
    labelBackgroundColor: "rgba(0, 0, 55, 0.85)", labelTextColor: "steelblue"
};
class TXTSpot_Class { //chartElem,lwc,EndPoint,StartPoint
    constructor(elem, lwc, strtpt, txt,  opts) {
        addMember(this, "_chart");
        addMember(this, "_series");
        addMember(this, "_p1");
        addMember(this, "_txt");
        addMember(this, "_paneViews");
        addMember(this, "_options");
        addMember(this, "_minPrice");
        addMember(this, "_maxPrice");
        addMember(this, "_clickHandler", t=>this._onClick(t));
        this._chart = elem,
        this._series = lwc,
        this._p1 = strtpt,
        this._txt = txt,
        this._minPrice = Math.min(this._p1.price),
        this._maxPrice = Math.max(this._p1.price),
        // this._minPrice = Math.min(this._p1.price, this._p2.price),
        // this._maxPrice = Math.max(this._p1.price, this._p2.price),
        this._options = { ...PointOptions, ...opts },
        this._chart.subscribeClick(this._clickHandler),
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
    remove() {
        debugger;
        if(this._chart){
            this._chart.unsubscribeClick(this._clickHandler)
        }
    }
    _onClick(e) {
        if(window.settingTXTPoint){window.settingTXTPoint=false;}
        if(window.editingTXT){window.editingTXT=false;}
        // const mousePrice = this._getMousePrice(t)
        // !e.point || !this._series ? null :
        const mousePrice = this._series.coordinateToPrice(e.point.y) 
        const timePoint = e.time;//Math.abs(e.point.x)
        
        // if (!t.point || !this._chart){ return null; }
        showTXTEditor(e,mousePrice,timePoint);
    }
}

function showTXTEditor(e, mousePrice,timePoint){
    const txtPointEditor = document.getElementById('txtPointEditor')
    txtPointEditor.setAttribute('pricePT',Math.round(mousePrice) ); //set editor state
    txtPointEditor.setAttribute('timePT',timePoint ); //set editor state
    txtPointEditor.style.visibility='visible';
    txtPointEditor.style.top=e.sourceEvent.pageY+18+'px';
    txtPointEditor.style.left= "10%";//e.sourceEvent.pageX-28+'px';
}
// window.editingTXT=true;
export {TXTSpot_Class as TXTSpot_Class};