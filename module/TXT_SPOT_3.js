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
const marginOffset = 21 //todo remove
const rawSymbol1 = "M7.5,7.5 m -7,0 a 7,7 0 1,0 14,0 a 7,7 0 1,0 -14,0 M4 7.5H11 M7.5 4V11"
const symbol1 = new Path2D(rawSymbol1)
// const magicToken15 = 15;
class PriceLineUpdate_Class {
    constructor(data) {
        addMember(this, "_y", 0);
        addMember(this, "_data");
        this._data = data
    }
    update(data, i) {
        if (this._data = data,
        !this._data.price) {
            this._y = -1e4;
            return
        }
        this._y = i.priceToCoordinate(this._data.price) ?? -1e4
    }
}
class PriceLineDraw_Class {
    constructor(data) {
        addMember(this, "_data");
        this._data = data
    }
    draw(t) {
        if(this._data.visible ){
            t.useBitmapCoordinateSpace(i=>{
                const ctx = i.context
                //BTN1
                const btnW = g(this._data.leftX + marginOffset + 1, this._data.leftX + 1, i.horizontalPixelRatio)
                const btnH = L(this._data.y, i.verticalPixelRatio, marginOffset);
                ctx.fillStyle = "crimson";//this._data.color;
                const roundEdges = [3, 6, 6, 3].map(p=>p * i.horizontalPixelRatio);
                ctx.beginPath();
                ctx.roundRect(btnW.position, btnH.position, btnW.length, btnH.length, roundEdges);
                ctx.fill();

                // if(this._data.hovered){

                // } else if ctx.fillStyle = this._data.hoverColor,
                // if(this._data.hovered && this._data.visibleDel){
                //   ctx.fillStyle = "red";
                // } else if(this._data.hovered){
                //   ctx.fillStyle = this._data.hoverColor;
                //   ctx.beginPath();
                //   ctx.roundRect(o.position, a.position, o.length, a.length, l)
                //   ctx.fill();
                // }

                if(this._data.visibleDel){
                    // ctx.fillStyle = "crimson";
                    //BTN2
                    const btnW2 = g(this._data.leftX + marginOffset + 1, this._data.leftX + 1, i.horizontalPixelRatio)
                    const btnH2 = L(this._data.y, i.verticalPixelRatio, marginOffset);
                    ctx.fillStyle = "steelblue";//this._data.color;
                    const roundEdges2 = [3, 6, 6, 3].map(p=>p * i.horizontalPixelRatio);
                    ctx.beginPath();
                    ctx.roundRect(btnW2.position+marginOffset, btnH2.position, btnW2.length, btnH2.length, roundEdges2);
                    ctx.fill();                    
                } else {
                    // ctx.fillStyle = this._data.hoverColor;
                    ctx.fillStyle = "#04013e";
                    ctx.beginPath();
                    ctx.roundRect(btnW.position, btnH.position, btnW.length, btnH.length, roundEdges)
                    ctx.fill();
                }

                // ctx.beginPath();
                // ctx.roundRect(o.position, a.position, o.length, a.length, l)
                // ctx.fill();

            // }
                ctx.translate(btnW.position + 3 * i.horizontalPixelRatio, btnH.position + 3 * i.verticalPixelRatio),
                ctx.scale(i.horizontalPixelRatio, i.verticalPixelRatio);
                // const c = 15 / magicToken15;
                // const c = 15 / 15;
                // ctx.scale(c, c),
                ctx.scale(1, 1),
                ctx.strokeStyle = this._data.textColor,
                ctx.lineWidth = 1;
                if(this._data.visibleDel){//Draw X BTN.
                    ctx.beginPath();
                    ctx.moveTo(2, 2);
                    ctx.lineTo(12, 12);
                    ctx.moveTo(2, 12);
                    ctx.lineTo(12, 2);
                    ctx.stroke();
                    //BTN2
                    ctx.beginPath();
                    ctx.moveTo(23, 2);
                    ctx.lineTo(23, 12);
                    ctx.lineTo(35, 12);
                    ctx.lineTo(35, 2);
                    ctx.lineTo(23, 2);
                    ctx.stroke();
                }else {
                    ctx.stroke(symbol1)
                }
            })
        }
    }
}
class EditBtnRenderer_Class extends PriceLineUpdate_Class {
    renderer() {
        const t = this._data.crosshairColor;
        return new PriceLineDraw_Class({visible: this._data.visible,y: this._y,color: t,
            textColor: this._data.crosshairLabelColor,
            leftX: 0, // rightX: this._data.timeScaleWidth,
            visibleDel:this._data.visibleDel,
            // hoverColor: this._data.hoverColor,hovered: this._data.hovered ?? !1
        })
    }
    zOrder() { return "top" }
}
class EditBtn_Class extends plugBase {
    constructor(i) {
        super();
        addMember(this, "_paneViews");
        addMember(this, "_data", {visible:!1,
            // hovered:!1,
            timeScaleWidth:0,
            crosshairLabelColor: "#020202",crosshairColor: "#ffffff",
            lineColor: "#090909",
            // hoverColor: "#777777",
            visibleDel:false
        });
        addMember(this, "_source");
        this._paneViews = [new EditBtnRenderer_Class(this._data)],
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
        this._data = {visible:!0,price: i,visibleDel:false,
            // hovered: e,
            timeScaleWidth: this.chart.timeScale().width(),
            crosshairColor: n, crosshairLabelColor: "#FFFFFF",
            lineColor: this._source.currentLineColor(),
            // hoverColor: this._source.currentHoverColor()
        },
        this.updateAllViews(),
        this.requestUpdate()
    }
    showDeleteLabel(i, e) {
        const n = this.chart.options().crosshair.horzLine.labelBackgroundColor;
        this._data = {visible:!0,price: i,visibleDel:true,
            // hovered: e,
            timeScaleWidth: this.chart.timeScale().width(),
            crosshairColor: n, crosshairLabelColor: "#FFFFFF",
            lineColor: this._source.currentLineColor(),
            // hoverColor: this._source.currentHoverColor()
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
        if(this._data.visibleDel){ return true; }//delete priceline
        return false
    }
}
//---------------------------------END LINE EDIT CLASSES
//--------------TXT SPOT CLASSES------------------

class PointDraw_Class {  //TODO TXTSPOT Draw Class
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
            if (this._p1.x === null || this._p1.y === null){ return; }
            const ctx = el.context
            let p1x = Math.round(this._p1.x * el.horizontalPixelRatio)
            let p1y = Math.round(this._p1.y * el.verticalPixelRatio)
            el.context.font = "12px Verdana",
            el.context.beginPath();
            const padLeft = 10 * el.horizontalPixelRatio;
            const txtPad = padLeft/2;
            let txtMetrics = el.context.measureText(this._txt)
            el.context.fillStyle = this._options.labelBackgroundColor;
            el.context.roundRect(p1x - padLeft, p1y - padLeft, txtMetrics.width + padLeft, 20, 15);
            el.context.fill();
            el.context.beginPath();
            el.context.fillStyle = this._options.color;
            el.context.fillText(this._txt, p1x - txtPad, p1y+txtPad);
        })
    }
}

class PointRender_Class {  //TXT SPOT todo
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

const default_Spot_Options = {width:2,showLabels:true,txtColor:'steelblue', //todo
    labelBackgroundColor: "rgba(0, 0, 55, 0.85)", labelTextColor: "steelblue"
};
//------------TXT SPOT
class TXTSpot_Class   extends plugBase { //chartElem,lwc,EndPoint,StartPoint
    // constructor(elem, lwc, strtpt, txt,  opts) {
    constructor(elem, lwc, opts) {
        super();
        // debugger;
        addMember(this, "_chart");
        addMember(this, "_series");
        addMember(this, "_p1");
        addMember(this, "_txt");
        addMember(this, "_paneViews");
        addMember(this, "_options");
        // addMember(this, "_spotTXTArray");
        addMember(this, "_minPrice");
        addMember(this, "_maxPrice");
        // addMember(this, "_clickHandler", e=>this._onClick(e));
        this._chart = elem;
        this._series = lwc;
        // this._p1 = strtpt,
        this._p1 = {time:opts.time,price:opts.price};
        this._txt = opts.txt;
        // this._txt = txt,
        // this._spotTXTArray =[],
        this._minPrice = Math.min(this._p1.price);
        this._maxPrice = Math.max(this._p1.price);
        // this._minPrice = Math.min(this._p1.price, this._p2.price),
        // this._maxPrice = Math.max(this._p1.price, this._p2.price),
        this._options = { ...default_Spot_Options, ...opts };
        // this._chart.subscribeClick(this._clickHandler),
        this._paneViews = [new PointRender_Class(this)];
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
        this.requestUpdate()
    }
    paneViews() {
        return this._paneViews
    }
    _pointIndex(t) {
        const i = this._chart.timeScale().timeToCoordinate(t.time);
        return i === null ? null : this._chart.timeScale().coordinateToLogical(i)
    }

}    
//------------END TXT SPOT


const priceline_Default_Options = {color: "#888888", limitToOne:!0};
class TXT_SPOT_FACTORY {
    constructor(chart, series, opts) {
        addMember(this, "_chart");
        addMember(this, "_series");
        addMember(this, "_options");
        addMember(this, "_pricelines");
        addMember(this, "_spotTXTArray");
        addMember(this, "_labelButtonPrimitive");
        addMember(this, "_clickHandler", t=>this._onClick(t));
        addMember(this, "_moveHandler", t=>this._onMouseMove(t));
        addMember(this, "_spotWithinBoundary", e=>this._spotWithinBoundary(e));
        // addMember(this, "_showLineEditPane", t=>this._showLineEditPane(t));
        this._chart = chart,
        this._series = series,
        this._pricelines = [],
        this._spotTXTArray = [],
        this._options = {
            ...priceline_Default_Options,
            ...opts
        },
        this._chart.subscribeClick(this._clickHandler),
        this._chart.subscribeCrosshairMove(this._moveHandler),
        this._labelButtonPrimitive = new EditBtn_Class(this),
        series.attachPrimitive(this._labelButtonPrimitive),
        this._setCrosshairMode()
    }
    currentLineColor() { return this._options.color }
    // currentHoverColor() { return this._options.hoverColor }
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
    _onClick(e) {
        if(window.settingTXTPoint){window.settingTXTPoint=false;}
        if(window.editingTXT){window.editingTXT=false;}

        // const mousePrice = this._getMousePrice(t)
        // !e.point || !this._series ? null :
        const mouseTime = e.time;//Math.abs(e.point.x)
        const mousePrice = this._series.coordinateToPrice(e.point.y) 
        let editMode_Item = this.spotWithinBoundary(mouseTime,mousePrice);
        const txtPointEditor = document.getElementById('txtPointEditor')
        if(editMode_Item){
            let editTXT = document.getElementById('txtEditInput')
            editTXT.value = editMode_Item._txt;
            txtPointEditor.setAttribute('txtEditID','SPY'+'-'+Math.round(editMode_Item._p1.price)+'-'+editMode_Item._p1.time ); //set editor state
        }else{
            let editTXTElem = document.getElementById('txtEditInput');
            editTXTElem.value = '';
            let txtPointEditor = document.getElementById('txtPointEditor') 
            txtPointEditor.setAttribute('txtEditID','');
        }
       
        txtPointEditor.setAttribute('pricePT',Math.round(mousePrice) ); //set editor state
        txtPointEditor.setAttribute('timePT', mouseTime ); //set editor state
        txtPointEditor.style.visibility='visible';
        txtPointEditor.style.top=e.sourceEvent.pageY+66+'px';
        txtPointEditor.style.left= "10%";//e.sourceEvent.pageX-28+'px';

        // //todo this._spotTXTArray
        // const mousePrice = this._getMousePrice(t)
        // const aMargin = this._distanceFromLeftScale(t);
        // if(aMargin>=marginOffset){ //*********************CLICK EDIT LINE */
        //     showLineEditMenu(t,mousePrice);
        //     return;
        // }
        // let line;
        // if(mousePrice === null || aMargin === null || !this._series){return}
        // if(this._labelButtonPrimitive._deleteLineCheck()){
        //     for(var i=0;i<this._pricelines.length;i++){
        //         line = this._pricelines[i];
        //         if( priceWithinBuffer(line.price,mousePrice)
        //         ){ //FOUND ITEM WITH BUFFER and DELETE.
        //             this._series.removePriceLine(this._pricelines[i].line)
        //             this._pricelines.splice(i,1);
        //             break;
        //         }
        //     }    
        //     this._labelButtonPrimitive.hideAddLabel();
        // } else { //New priceline
        //     let newLine = this._series.createPriceLine({price: mousePrice, color: this._options.color, 
        //         lineStyle:LightweightCharts.LineStyle.Dotted, lineSize:1}) 
        //     this._pricelines.push({price:Math.round(mousePrice),line:newLine})
        // }
    }
    spotWithinBoundary(mouseTime,mousePrice){
        let maxTop = Math.round(mousePrice + (mousePrice*0.04) );
        let maxBtm = Math.round(mousePrice - (mousePrice*0.04) );
        let maxLft = Math.round(mouseTime + (mouseTime*0.0001) );
        let maxRgt = Math.round(mouseTime - (mouseTime*0.00035) );
      
        let editItem;
        let item,itemTime,itemPrice;
        for(var i=0; i<this._spotTXTArray.length;i++){
            item = this._spotTXTArray[i];
            itemPrice = item._p1.price;
            itemTime = item._p1.time;
            if(itemPrice<maxTop && itemPrice>maxBtm 
                &&  itemTime>maxRgt && itemTime<maxLft 
            ){editItem=item;break;}            
        }


        // if(mousePrice<maxTop && mousePrice>maxBtm 
        //     &&  mousePrice>maxLft && mousePrice<maxRgt 
        // ){foundItem=true;}
        return editItem;
    }   
    deleteSpot_TXT(spotID){
        let item;
        let spotDataArr = spotID.split('-');
        for(var i=0;i<this._spotTXTArray.length;i++){
            item = this._spotTXTArray[i];
            if(spotDataArr[0]==='SPY'             //TODO
                && item._p1.price === parseFloat(spotDataArr[1])
                && item._p1.time === parseInt(spotDataArr[2]) ){ //FOUND ITEM to DELETE.
                this._series.detachPrimitive(item)
                this._spotTXTArray.splice(i,1);
                break; //TODO also need to remove from DB_bankbookz
            }
        }  
    } 
    _onMouseMove(e) { }
    // _getMousePrice(t) {
    //     return !t.point || !this._series ? null : this._series.coordinateToPrice(t.point.y)
    // }
    _distanceFromLeftScale(t) {
        if (!t.point || !this._chart){ return null; }
        return Math.abs(t.point.x)
    }
    setPricelines(priceLineArr){
        try{ this._pricelines.push(...priceLineArr)
        } catch (e){ console.log('Param expects array')  }
    }
    createSpotTXT(spotTXTOps){
        const TXTSPOT_Mark_New = new TXTSpot_Class(this._chart,this._series,spotTXTOps);
        this._series.attachPrimitive(TXTSPOT_Mark_New);
        this._spotTXTArray.push(TXTSPOT_Mark_New)
        TXTSPOT_Mark_New.updateAllViews();
        return TXTSPOT_Mark_New;
    }        

    editPriceLine(config){
        //todo this._spotTXTArray
        let item,opts={},lw=1,ls=LightweightCharts.LineStyle.Dotted;
        for(var i=0;i<this._pricelines.length;i++){
            item = this._pricelines[i];
            if( priceWithinBuffer(item.price,config.price)
            ){  //found price to edit with selection buffer;
                opts.price = Math.round(item.price);
                if(config.size){
                    if(config.size==='lrg'){ lw=2;
                        ls=LightweightCharts.LineStyle.Dashed;
                    }else if (config.size==='med'){ lw=1;
                        ls=LightweightCharts.LineStyle.Dashed;
                    }else{ lw=1;
                        ls=LightweightCharts.LineStyle.Dotted;
                    } //'sml' default.
                    if(item.line){ //UPDATE LINE attributes
                        item.line.applyOptions({ lineWidth: lw, lineStyle: ls });
                    } 
                }
                if(config.color){
                    if(item.line){ //UPDATE LINE attributes
                        item.line.applyOptions({ color:config.color });
                    } 
                }
            } else{
                console.log('NOT FOUND',config.price)
            }
        }
    }
}

export {TXT_SPOT_FACTORY as TXT_SPOT_FACTORY};

