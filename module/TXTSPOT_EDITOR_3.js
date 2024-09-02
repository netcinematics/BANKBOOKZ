var v = Object.defineProperty;
var P = (r,t,i)=>t in r ? v(r, t, {enumerable: !0,configurable: !0,writable: !0,value: i}) : r[t] = i;
var addMember = (r,t,i)=>(P(r, typeof t != "symbol" ? t + "" : t, i),i);
import {P as plugBase} from "./plugin-base.js";
//--------------TXT SPOT CLASSES------------------
class TXTSPOT_Draw_Class {  //TODO TXTSPOT Draw Class
    constructor(p1, txt, txt1, opts) {
        addMember(this, "_p1");
        addMember(this, "_txt");
        addMember(this, "_text1");
        addMember(this, "_options");
        this._p1 = p1,
        this._txt = txt,
        this._text1 = txt1,
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
            el.context.fillStyle = this._options.txtColor;
            el.context.fillText(this._txt, p1x - txtPad, p1y+txtPad);
        })
    }
}
class SpotTXTRender_Class { 
    constructor(parent) {
        addMember(this, "_source");
        addMember(this, "_p1", { x: null,  y: null });
        addMember(this, "_txt","");
        this._source = parent;
    }
    update() {
        const aSeries = this._source._series
        let yPT1 = aSeries.priceToCoordinate(this._source._p1.price)
        let timeScale = this._source._chart.timeScale()
        let xPT1 = timeScale.timeToCoordinate(this._source._p1.time)
        this._p1 = { x: xPT1,  y: yPT1  };
        this._txt = this._source._txt;
    }
    renderer() {
        return new TXTSPOT_Draw_Class(this._p1,this._txt,"" + this._source._p1.price.toFixed(1),this._source._options)
    }
}
const default_Spot_Options = {
    txtColor:'steelblue',labelBackgroundColor:"rgba(0, 0, 55, 0.85)",labelTextColor:"steelblue"
};
//------------TXT SPOT
class TXTSpot_Class extends plugBase { //chartElem,lwc,EndPoint,StartPoint
    // constructor(elem, lwc, strtpt, txt,  opts) {
    constructor(elem, lwc, opts) {
        super();
        addMember(this, "_chart");
        addMember(this, "_series");
        addMember(this, "_p1");
        addMember(this, "_txt");
        addMember(this, "_paneViews");
        addMember(this, "_options");
        addMember(this, "_minPrice");
        addMember(this, "_maxPrice");
        this._chart = elem;
        this._series = lwc;
        this._p1 = {time:opts.time,price:opts.price};
        this._txt = opts.txt;
        this._minPrice = Math.min(this._p1.price);
        this._maxPrice = Math.max(this._p1.price);
        this._options = { ...default_Spot_Options, ...opts };
        this._paneViews = [new SpotTXTRender_Class(this)];
    }
    autoscaleInfo(t, i) {
        const P1 = this._pointIndex(this._p1)
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
class TXT_EDITOR_Class {
    constructor(chart, series, opts) {
        addMember(this, "_chart");
        addMember(this, "_series");
        addMember(this, "_options");
        addMember(this, "_pricelines");
        addMember(this, "_spotTXTArray");
        addMember(this, "_clickHandler", t=>this._onClick(t));
        // addMember(this, "_spotWithinBoundary", e=>this._spotWithinBoundary(e));
        this._chart = chart,
        this._series = series,
        this._pricelines = [],
        this._spotTXTArray = [],
        this._options = {...priceline_Default_Options,...opts },
        this._chart.subscribeClick(this._clickHandler);
        if(!opts.tkr){ console.warn('Class needs TKR attribute') }
    }
    _onClick(e) {
        if(window.SPOT_EDIT_MODE!="TXT"){return}
        const mouseTime = e.time;//Math.abs(e.point.x)
        const mousePrice = this._series.coordinateToPrice(e.point.y); 
        let editMode_Item = this._spotWithinBoundary(mouseTime,mousePrice);
        const TXT_EDITOR_FRAME = document.getElementById('TXT_EDITOR_FRAME')
        if(editMode_Item){
            let editTXT = document.getElementById('txtEditInput')
            editTXT.value = editMode_Item._txt;
            TXT_EDITOR_FRAME.setAttribute('txtEditID','SPY'+'-'+Math.round(editMode_Item._p1.price)+'-'+editMode_Item._p1.time ); //set editor state
        }else{
            let editTXTElem = document.getElementById('txtEditInput');
            editTXTElem.value = '';
            let TXT_EDITOR_FRAME = document.getElementById('TXT_EDITOR_FRAME') 
            TXT_EDITOR_FRAME.setAttribute('txtEditID','');
        }
        TXT_EDITOR_FRAME.setAttribute('TKR_TXT_META',this._options.tkr ); //set editor state
        TXT_EDITOR_FRAME.setAttribute('pricePT',Math.round(mousePrice) ); //set editor state
        TXT_EDITOR_FRAME.setAttribute('timePT', mouseTime ); //set editor state
        TXT_EDITOR_FRAME.style.visibility='visible';
        TXT_EDITOR_FRAME.style.top=e.sourceEvent.pageY+66+'px';
        TXT_EDITOR_FRAME.style.left= "10%";//e.sourceEvent.pageX-28+'px';
    }
    _spotWithinBoundary(mouseTime,mousePrice){
        let maxTop = Math.round(mousePrice + (mousePrice*0.05) );
        let maxBtm = Math.round(mousePrice - (mousePrice*0.05) );
        let maxLft = Math.round(mouseTime + (mouseTime*0.0001) );
        let maxRgt = Math.round(mouseTime - (mouseTime*0.00044) );
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
        return editItem;
    }   
    createSpotTXT(spotTXTOps){
        const TXTSPOT_Mark_New = new TXTSpot_Class(this._chart,this._series,spotTXTOps);
        this._series.attachPrimitive(TXTSPOT_Mark_New);
        this._spotTXTArray.push(TXTSPOT_Mark_New)
        TXTSPOT_Mark_New.updateAllViews();
        return TXTSPOT_Mark_New;
    }      
    updateSpotTXT(spotID,opts){
        let item;
        let spotDataArr = spotID.split('-');
        for(var i=0;i<this._spotTXTArray.length;i++){
            item = this._spotTXTArray[i];
            if(spotDataArr[0]==='SPY'             //TODO
                && item._p1.price === parseFloat(spotDataArr[1])
                && item._p1.time === parseInt(spotDataArr[2]) ){ //FOUND ITEM to UPDATE.
                    item._txt = opts.txt;
                    item._options.txtColor = opts.txtColor
                break; //TODO also need to update in DB_bankbookz
            }
        }          
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
}

export {TXT_EDITOR_Class};

