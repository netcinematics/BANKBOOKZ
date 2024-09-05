var _ = Object.defineProperty;
var u = (s,t,e)=>t in s ? _(s, t, {enumerable: !0,configurable: !0,writable: !0, value: e}) : s[t] = e;
var addMember = (s,t,e)=>(u(s, typeof t != "symbol" ? t + "" : t, e),e);
import {P as plugBase} from "./plugin-base.js";
//---------------------------------VLINE EDITOR
const vline_Default_Options = {color:"steelblue",width: 3};
//--------------------------------- VLINE DRAW Class
class VLINE_Draw_Class {  
    constructor(xPt, opts) {
        addMember(this, "_x", null);
        addMember(this, "_options");
        this._x = xPt;
        this._options = opts
    }
    centeredLine(xPt, scale, width) {
        const scalePt = Math.round(scale * xPt);
        const len = Math.round(width * scale);
        const mid = Math.floor(len * .5)
        return { position: scalePt - mid, length:len }
    }    
    draw(parent) {
        parent.useBitmapCoordinateSpace(e=>{
            if (this._x === null) return;
            const ctx = e.context;
            const lineData = this.centeredLine(this._x, e.horizontalPixelRatio, this._options.width);
            ctx.fillStyle = this._options.color,
            ctx.fillRect(lineData.position, 0, lineData.length, e.bitmapSize.height)
        })
    }
}
//---------------------------------VLINE RENDERER
class VLINE_Render_Class { 
    constructor(parent,opts) {
        addMember(this, "_source");
        addMember(this, "_x", null);
        addMember(this, "_options");
        this._source = parent;
        this._options = opts;
    }
    update() { const t = this._source._chart.timeScale();
        this._x = t.timeToCoordinate(this._source._time)
    }
    renderer() { return new VLINE_Draw_Class(this._x,this._options) }    
}
//---------------------------------VLINE CLASS
class VLINE_Base_Class extends plugBase { 
    constructor(elem, lwc, opts) { super();
        addMember(this, "_chart");
        addMember(this, "_series");
        addMember(this, "_time");
        addMember(this, "_paneViews");
        addMember(this, "_options");
        this._chart = elem;
        this._series = lwc;
        this._time = opts.time;
        this._options = { ...vline_Default_Options, ...opts };
        this._paneViews = [new VLINE_Render_Class(this,this._options)];
    }
    updateAllViews() { this._paneViews.forEach(t=>t.update()); }
    paneViews() { return this._paneViews }
}
//---------------------------------END VLINE CLASS
//--------------EDITOR CLASS--------------------
class VERTLINE_EDITOR_Class {
    constructor(chart, series, opts) {
        addMember(this, "_chart");
        addMember(this, "_series");
        addMember(this, "_vLineArray");
        addMember(this, "_options");
        addMember(this, "_clickHandler", t=>this._onClick(t));        
        const allOpts = {...vline_Default_Options,...opts };
        this._chart = chart,
        this._series = series,
        this._vLineArray = [],
        this._options = allOpts;
        this._chart.subscribeClick(this._clickHandler);
        if(!opts.tkr){ console.warn('Options need TKR attribute') }
    }
    _onClick(e) {
        if(window.SPOT_EDIT_MODE!="VLINE"){return}
        let VLINE_EDITOR_FRAME = document.getElementById('VLINE_EDITOR_FRAME')
        const mouseTime = e.time;
        //-------------------CHECK EDIT MODE--------------
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
            let editTime = editItem._time;
            let editColor = editItem._options.color;
            let editSize = editItem._options.width;
            VLINE_EDITOR_FRAME.setAttribute('edit_vline_meta','true'); //set edit state
            VLINE_EDITOR_FRAME.setAttribute('time_meta',editTime); 
            VLINE_EDITOR_FRAME.setAttribute('color_meta',editColor); 
            VLINE_EDITOR_FRAME.setAttribute('size_meta',editSize); 
        } else{
            VLINE_EDITOR_FRAME.setAttribute('edit_vline_meta',''); //set non edit state
            VLINE_EDITOR_FRAME.setAttribute('time_meta',mouseTime); 
        }
        showVERTLINE_Editor(e);
    }
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
        let maxTime = Math.round(tgtTime + (tgtTime*0.00005) );
        let minTime = Math.round(tgtTime - (tgtTime*0.00005) );
        let item;
        for(var i=0; i< this._vLineArray.length;i++){
            item = this._vLineArray[i]; 
            if(item._time<maxTime && item._time>minTime ){
                item.updateAllViews();//?
                this._series.detachPrimitive(item)
                this._vLineArray.splice(i,1);
                return true;} //FOUND MATCH
        }
        return false;
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
    VLINE_EDITOR_FRAME.style.top=e.sourceEvent.pageY+18+'px';
    VLINE_EDITOR_FRAME.style.left="7.777%";
}
export {VERTLINE_EDITOR_Class};

