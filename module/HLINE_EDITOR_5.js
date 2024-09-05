var _ = Object.defineProperty;
var u = (s,t,e)=>t in s ? _(s, t, {enumerable: !0,configurable: !0,writable: !0, value: e}) : s[t] = e;
var addMember = (s,t,e)=>(u(s, typeof t != "symbol" ? t + "" : t, e),e);
import {P as plugBase} from "./plugin-base.js";
//---------------------------------HLINE EDITOR
const hline_Default_Options = {color:"steelblue",width: 3};
//--------------------------------- HLINE DRAW Class
class HLINE_Draw_Class {  
    constructor(yPt, opts) {
        addMember(this, "_y", null);
        addMember(this, "_options");
        this._y = yPt;
        this._options = opts
    }
    // centeredLine(xPt, scale, width) {
    //     const scalePt = Math.round(scale * xPt);
    //     const len = Math.round(width * scale);
    //     const mid = Math.floor(len * .5)
    //     return { position: scalePt - mid, length:len }
    // }    
    draw(parent) {
        parent.useBitmapCoordinateSpace(e=>{
            if (this._y === null) return;
            // const ctx = e.context;
            // const lineData = this.centeredLine(this._x, e.horizontalPixelRatio, this._options.width);
            // ctx.fillStyle = this._options.color,
            // ctx.fillRect(lineData.position, 0, lineData.length, e.bitmapSize.height)
        })
    }
}
//---------------------------------HLINE RENDERER
class HLINE_Render_Class { 
    constructor(parent,opts) {
        addMember(this, "_source");
        addMember(this, "_y", null);
        addMember(this, "_options");
        this._source = parent;
        this._options = opts;
    }
    update() { this._y=this._source._series.priceToCoordinate(this._source._price) }
    renderer() { return new HLINE_Draw_Class(this._y,this._options) }    
}
//---------------------------------HLINE CLASS
class HLINE_Base_Class extends plugBase { 
    constructor(elem, lwc, opts) { super();
        addMember(this, "_chart");
        addMember(this, "_series");
        addMember(this, "_price");
        addMember(this, "_paneViews");
        addMember(this, "_options");
        this._chart = elem;
        this._series = lwc;
        debugger;
        this._price = opts.price;
        this._options = { ...hline_Default_Options, ...opts };
        this._paneViews = [new HLINE_Render_Class(this,this._options)];
    }
    updateAllViews() { this._paneViews.forEach(t=>t.update()); }
    paneViews() { return this._paneViews }
}
//---------------------------------END HLINE CLASS
//--------------EDITOR CLASS--------------------
class HLINE_EDITOR_Class {
    constructor(chart, series, opts) {
        addMember(this, "_chart");
        addMember(this, "_series");
        addMember(this, "_vLineArray");
        addMember(this, "_options");
        addMember(this, "_clickHandler", t=>this._onClick(t));        
        const allOpts = {...hline_Default_Options,...opts };
        this._chart = chart,
        this._series = series,
        this._vLineArray = [],
        this._options = allOpts;
        this._chart.subscribeClick(this._clickHandler);
        if(!opts.tkr){ console.warn('Options need TKR attribute') }
    }
    _onClick(e) {
        if(window.SPOT_EDIT_MODE!="HLINE"){return}
        let HLINE_EDITOR_FRAME = document.getElementById('HLINE_EDITOR_FRAME')
        // const mouseTime = e.time;
        const mousePrice = this._series.coordinateToPrice(e.point.y)
        //-------------------CHECK EDIT MODE--------------
        // let maxTime = Math.round(mouseTime + (mouseTime*0.00005) );
        // let minTime = Math.round(mouseTime - (mouseTime*0.00005) );
        let item, editItem;
        // for(var idx=0; idx< this._vLineArray.length;idx++){
        //     item = this._vLineArray[idx]; 
        //     if(item._time<maxTime && item._time>minTime ){
        //         editItem = item; break;} //FOUND MATCH
        // }
        //--------------------END CHECK EDIT MODE-----------
        HLINE_EDITOR_FRAME.setAttribute('tkr_meta',this._options.tkr); 
        if(editItem){
            let editTime = editItem._time;
            let editColor = editItem._options.color;
            let editSize = editItem._options.width;
            HLINE_EDITOR_FRAME.setAttribute('edit_hline_meta','true'); //set edit state
            HLINE_EDITOR_FRAME.setAttribute('time_meta',editTime); 
            HLINE_EDITOR_FRAME.setAttribute('color_meta',editColor); 
            HLINE_EDITOR_FRAME.setAttribute('size_meta',editSize); 
        } else{
            HLINE_EDITOR_FRAME.setAttribute('edit_hline_meta',''); //set non edit state
            HLINE_EDITOR_FRAME.setAttribute('price_meta',mousePrice); 
        }
        showHLINE_Editor(e);
    }
    create_HLINE(opts){
        debugger;
        let newPrice = parseInt(opts.price);
        let newLine = this._series.createPriceLine({
        price:newPrice, color: this._options.color, 
        lineStyle:LightweightCharts.LineStyle.Dotted, 
        lineSize:1}) 
        this._vLineArray.push({price:newPrice,line:newLine})
            
            // const hLINE_New = new HLINE_Base_Class(this._chart,this._series,opts);
            // this._series.attachPrimitive(hLINE_New);
            // this._pricelines.push({price:newPrice,line:newLine})
        // this._vLineArray.push(hLINE_New)
        // hLINE_New.updateAllViews();
        // return hLINE_New;
    }
    update_HLINE(opts){
        let editItem = this.find_HLINE(opts.time);
        if(editItem){
            editItem._options.width = opts.width;
            editItem._options.color = opts.color
        }
    }
    delete_HLINE(tgtTime){
        let maxTime = Math.round(tgtTime + (tgtTime*0.00005) );
        let minTime = Math.round(tgtTime - (tgtTime*0.00005) );
        let item;
        for(var i=0; i< this._vLineArray.length;i++){
            item = this._vLineArray[i]; 
            if(item._time<maxTime && item._time>minTime ){
                item.updateAllViews();//?
                this._series.detachPrimitive(item);
                this._vLineArray.splice(i,1);
                return true;} //FOUND MATCH
        }
        return false;
    }
    find_HLINE(tgtTime){ //detemine line to edit.
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
function showHLINE_Editor(e){
    const HLINE_EDITOR_FRAME = document.getElementById('HLINE_EDITOR_FRAME')
    HLINE_EDITOR_FRAME.style.visibility='visible';//show editor
    HLINE_EDITOR_FRAME.style.top=e.sourceEvent.pageY+18+'px';
    HLINE_EDITOR_FRAME.style.left="7.777%";
}
export {HLINE_EDITOR_Class};

