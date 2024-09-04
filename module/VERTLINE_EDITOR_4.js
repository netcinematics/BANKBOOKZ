var _ = Object.defineProperty;
var u = (s,t,e)=>t in s ? _(s, t, {enumerable: !0,configurable: !0,writable: !0, value: e}) : s[t] = e;
var addMember = (s,t,e)=>(u(s, typeof t != "symbol" ? t + "" : t, e),e);
import {P as plugBase} from "./plugin-base.js";
// import {p as m} from "./positions.js";

class VLineDraw_Class {
    constructor(xpt, opts) {
        addMember(this, "_x", null);
        addMember(this, "_options");
        this._x = xpt;
        this._options = opts;
    }
    pointCalc(n, t, o=1, s) {
        const i = Math.round(t * n);
        const c = s ? o : Math.round(o * t);
        // const a = r(c);
        const a = Math.floor(c * .5)
        return {
            position: i - a,
            length: c
        }
    }
    draw(t) {
        t.useBitmapCoordinateSpace(e=>{
            if (this._x === null) return;
            const ctx = e.context;
            // const a = m(this._x, e.horizontalPixelRatio, this._options.width);
            const lineData = this.pointCalc(this._x, e.horizontalPixelRatio, this._options.width);
            ctx.fillStyle = this._options.color,
            ctx.fillRect(lineData.position, 0, lineData.length, e.bitmapSize.height)
        })
    }
}
class VLineRender_Class {
    constructor(t, e) {
        addMember(this, "_source");
        addMember(this, "_x", null);
        addMember(this, "_options");
        this._source = t,
        this._options = e
    }
    update() { const t = this._source._chart.timeScale();
        this._x = t.timeToCoordinate(this._source._time)
    }
    renderer() { return new VLineDraw_Class(this._x,this._options) }
}
class VLinePane_Class {// extends plugBase {
    constructor(t, e) {  // super();
        addMember(this, "_source");
        addMember(this, "_x", null);
        addMember(this, "_options");
        this._source = t,
        this._options = e
    }
    update() { const t = this._source._chart.timeScale();
        this._x = t.timeToCoordinate(this._source._time)
    }
    visible() { return this._options.showLabel }
    tickVisible() {  return this._options.showLabel }
    coordinate() { return this._x ?? 0  }
    text() { return this._options.labelText }
    textColor() {return this._options.labelTextColor }
    backColor() { return this._options.labelBackgroundColor }
}
//---------------------------------NEW VLINE EDITOR
const vline_Default_Options = {color: "green",labelText: "",width: 3,labelBackgroundColor: "green",
    labelTextColor: "steelblue",showLabel:true};
//---------------------------------NEW VLINE DRAW Class
class VLINE_Draw_Class {  
    constructor(xPt, opts) {
        // addMember(this, "_p1");
        // addMember(this, "_txt");
        // addMember(this, "_text1");
        addMember(this, "_x", null);
        addMember(this, "_options");
        // this._p1 = p1,
        // this._txt = txt,
        // this._text1 = txt1,
        this._x = xPt;
        this._options = opts
    }
    buildLine(xPt,scale, one=1, s) {
        const scalePt = Math.round(scale * xPt);
        const c = s ? one : Math.round(one * scale);
        // const a = r(c);
        const a = Math.floor(c * .5)
        return {
            position: scalePt - a,
            length: c
        }
    }    
    draw(parent) {
        parent.useBitmapCoordinateSpace(e=>{
            if (this._x === null) return;
            const ctx = e.context;
            // const a = m(this._x, e.horizontalPixelRatio, this._options.width);
            const lineData = this.buildLine(this._x, e.horizontalPixelRatio, this._options.width);
            ctx.fillStyle = this._options.color,
            ctx.fillRect(lineData.position, 0, lineData.length, e.bitmapSize.height)
        })
    }
}
//---------------------------------NEW VLINE RENDERER
class VLINE_Render_Class { 
    constructor(parent,opts) {
        addMember(this, "_source");
        addMember(this, "_p1", { x: null,  y: null });
        addMember(this, "_x", null);
        addMember(this, "_options");
        // addMember(this, "_txt","");
        this._source = parent;
        this._options = opts;
    }
    update() { const t = this._source._chart.timeScale();
        this._x = t.timeToCoordinate(this._source._time)
    }
    renderer() { 
        return new VLINE_Draw_Class(this._x,this._options) 
        // return new VLINE_Draw_Class(this._p1,this._source._options)
    }    
    // update() {
    //     const aSeries = this._source._series
    //     let yPT1 = aSeries.priceToCoordinate(this._source._p1.price)
    //     let timeScale = this._source._chart.timeScale()
    //     let xPT1 = timeScale.timeToCoordinate(this._source._p1.time)
    //     this._p1 = { x: xPT1,  y: yPT1  };
    //     // this._txt = this._source._txt;
    // }
    // renderer() {
    //     return new VLINE_Draw_Class(this._p1,this._source._options)
    // }
}
//---------------------------------NEW VLINE CLASS
class VLINE_Base_Class extends plugBase { //chartElem,lwc,EndPoint,StartPoint
    // constructor(elem, lwc, strtpt, txt,  opts) {
    constructor(elem, lwc, opts) { super();
        addMember(this, "_chart");
        addMember(this, "_series");
        addMember(this, "_p1"); //todo remove
        addMember(this, "_time");
        // addMember(this, "_txt");
        addMember(this, "_paneViews");
        addMember(this, "_options");
        // addMember(this, "_minPrice");
        // addMember(this, "_maxPrice");
        this._chart = elem;
        this._series = lwc;
        this._p1 = {time:opts.time,price:opts.price};
        this._time = opts.time;
        // this._txt = opts.txt;
        this._minPrice = Math.min(this._p1.price);
        this._maxPrice = Math.max(this._p1.price);
        this._options = { ...vline_Default_Options, ...opts };
        this._paneViews = [new VLINE_Render_Class(this,this._options)];
    }
    // autoscaleInfo(t, i) { const P1 = this._pointIndex(this._p1)
    //     return P1 === null || i < P1 || P1 ? null : {
    //         priceRange: { minValue: this._minPrice, maxValue: this._maxPrice }
    //     }
    // }
    // updateAllViews() { this._paneViews.forEach(t=>t.update())
    //     this.requestUpdate()
    // }
    // paneViews() { return this._paneViews }
    // _pointIndex(t) { const i = this._chart.timeScale().timeToCoordinate(t.time);
    //     return i === null ? null : this._chart.timeScale().coordinateToLogical(i)
    // }
    updateAllViews() { 
        this._paneViews.forEach(t=>t.update());
        // this._timeAxisViews.forEach(t=>t.update())
    }
    // timeAxisViews() { return this._timeAxisViews  }
    paneViews() { return this._paneViews }
}
//---------------------------------END VLINE CLASS
//--------------EDITOR CLASS--------------------
class VERTLINE_EDITOR_Class {
    constructor(chart, series, opts) {
        addMember(this, "_chart");
        addMember(this, "_series");
        addMember(this, "_vLineArray");
        // addMember(this, "_time");
        addMember(this, "_options");
        // addMember(this, "_paneViews");
        // addMember(this, "_timeAxisViews");
        addMember(this, "_clickHandler", t=>this._onClick(t));        
        const allOpts = {...vline_Default_Options,...opts };
        this._chart = chart,
        this._series = series,
        // this._time = time,
        this._vLineArray = [],
        this._options = allOpts;
        // this._paneViews = [new VLineRender_Class(this,allOpts)],
        // this._timeAxisViews = [new VLinePane_Class(this,allOpts)]
        this._chart.subscribeClick(this._clickHandler);
        if(!opts.tkr){ console.warn('Options need TKR attribute') }
    }
    _onClick(e) {
        if(window.SPOT_EDIT_MODE!="VLINE"){return}
        // const mousePrice = this._series.coordinateToPrice(e.point.y) 
        let VLINE_EDITOR_FRAME = document.getElementById('VLINE_EDITOR_FRAME')
        const mouseTime = e.time;
        //-------------------CHECK EDIT MODE--------------
        // let editItem = this.find_VLINE(mouseTime)
        // debugger;
        let maxTime = Math.round(mouseTime + (mouseTime*0.00005) );
        let minTime = Math.round(mouseTime - (mouseTime*0.00005) );
        let item, editItem;
        for(var idx=0; idx< this._vLineArray.length;idx++){
            item = this._vLineArray[idx]; 
            if(item._time<maxTime && item._time>minTime ){
                editItem = item; break;} //FOUND MATCH
        }
        //--------------------END CHECK EDIT MODE-----------
        VLINE_EDITOR_FRAME.setAttribute('tkr_meta',this._options.tkr); 
        if(editItem){
            // debugger;
            let editTime = editItem._time;
            let editColor = editItem._options.color;
            let editSize = editItem._options.width;
            VLINE_EDITOR_FRAME.setAttribute('edit_meta','true'); //set index of item
            VLINE_EDITOR_FRAME.setAttribute('time_meta',editTime); //set editor state
            VLINE_EDITOR_FRAME.setAttribute('color_meta',editColor); //set editor state
            VLINE_EDITOR_FRAME.setAttribute('size_meta',editSize); //set editor state
        } else{
            VLINE_EDITOR_FRAME.setAttribute('edit_meta',''); //set index of item.
            VLINE_EDITOR_FRAME.setAttribute('time_meta',mouseTime); //set editor state
        }
        showVERTLINE_Editor(e);
    }
    // lineBetweenBuffer(mouseTime){
    //     let maxTime = Math.round(mouseTime + (mouseTime*0.05) );
    //     let minTime = Math.round(mouseTime - (mouseTime*0.05) );
    //     let item, editItem;
    //     for(var i=0; i< window.DRAW_VLINE_SET.length;i++){
    //         item = window.DRAW_VLINE_SET[i];
    //         if(item._time<maxTime && item._time>minTime ){
    //         editItem = item; break;}
    //     }
    //     return editItem;
    // }
    // updateAllViews() { this._paneViews.forEach(t=>t.update()),
    //     this._timeAxisViews.forEach(t=>t.update())
    // }
    // timeAxisViews() { return this._timeAxisViews  }
    // paneViews() { return this._paneViews }
    create_VLINE(opts){
        const vLINE_New = new VLINE_Base_Class(this._chart,this._series,opts);
        this._series.attachPrimitive(vLINE_New);
        this._vLineArray.push(vLINE_New)
        vLINE_New.updateAllViews();
        return vLINE_New;
    }
    update_VLINE(opts){
        let editItem = this.find_VLINE(opts.time);
        if(editItem){
            editItem._options.width = opts.width;
            editItem._options.color = opts.color
        }
    }
    delete_VLINE(tgtTime){
        debugger;
        // let editItem = this.find_VLINE(time);
        // if(editItem){ //FOUND ITEM to DELETE.

        let maxTime = Math.round(tgtTime + (tgtTime*0.00005) );
        let minTime = Math.round(tgtTime - (tgtTime*0.00005) );
        let item;
        for(var i=0; i< this._vLineArray.length;i++){
            item = this._vLineArray[i]; 
            if(item._time<maxTime && item._time>minTime ){
                this._series.detachPrimitive(item)
                this._vLineArray.splice(i,1);
                return true;} //FOUND MATCH
        }
        return false;
        // }
    }
    find_VLINE(tgtTime){ //detemine line to edit.
        let maxTime = Math.round(tgtTime + (tgtTime*0.00005) );
        let minTime = Math.round(tgtTime - (tgtTime*0.00005) );
        let item;
        for(var idx=0; idx< this._vLineArray.length;idx++){
            item = this._vLineArray[idx]; 
            if(item._time<maxTime && item._time>minTime ){
                return item;} //FOUND MATCH
        }
        return null;
    }
}
function showVERTLINE_Editor(e){
    const VLINE_EDITOR_FRAME = document.getElementById('VLINE_EDITOR_FRAME')
    VLINE_EDITOR_FRAME.style.visibility='visible';//show editor
    // VLINE_EDITOR_FRAME.setAttribute('time_meta',mouseTime); //set editor state
    
    VLINE_EDITOR_FRAME.style.top=e.sourceEvent.pageY+18+'px';
    VLINE_EDITOR_FRAME.style.left="10%";//e.sourceEvent.pageX-28+'px';
}
export {VERTLINE_EDITOR_Class};

