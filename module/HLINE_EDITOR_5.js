var _ = Object.defineProperty;
var u = (s,t,e)=>t in s ? _(s, t, {enumerable: !0,configurable: !0,writable: !0, value: e}) : s[t] = e;
var addMember = (s,t,e)=>(u(s, typeof t != "symbol" ? t + "" : t, e),e);
// import {P as plugBase} from "./plugin-base.js";
//---------------------------------HLINE EDITOR
const hline_Default_Options = {color:"steelblue",width: 3};
//--------------------------------- HLINE DRAW Class
// class HLINE_Draw_Class {  
//     constructor(yPt, opts) {
//         addMember(this, "_y", null);
//         addMember(this, "_options");
//         this._y = yPt;
//         this._options = opts
//     }
//     // centeredLine(xPt, scale, width) {
//     //     const scalePt = Math.round(scale * xPt);
//     //     const len = Math.round(width * scale);
//     //     const mid = Math.floor(len * .5)
//     //     return { position: scalePt - mid, length:len }
//     // }    
//     draw(parent) {
//         parent.useBitmapCoordinateSpace(e=>{
//             if (this._y === null) return;
//             // const ctx = e.context;
//             // const lineData = this.centeredLine(this._x, e.horizontalPixelRatio, this._options.width);
//             // ctx.fillStyle = this._options.color,
//             // ctx.fillRect(lineData.position, 0, lineData.length, e.bitmapSize.height)
//         })
//     }
// }
//---------------------------------HLINE RENDERER
// class HLINE_Render_Class { 
//     constructor(parent,opts) {
//         addMember(this, "_source");
//         addMember(this, "_y", null);
//         addMember(this, "_options");
//         this._source = parent;
//         this._options = opts;
//     }
//     update() { this._y=this._source._series.priceToCoordinate(this._source._price) }
//     renderer() { return new HLINE_Draw_Class(this._y,this._options) }    
// }
//---------------------------------HLINE CLASS
// class HLINE_Base_Class extends plugBase { 
//     constructor(elem, lwc, opts) { super();
//         addMember(this, "_chart");
//         addMember(this, "_series");
//         addMember(this, "_price");
//         addMember(this, "_paneViews");
//         addMember(this, "_options");
//         this._chart = elem;
//         this._series = lwc;
//         debugger;
//         this._price = opts.price;
//         this._options = { ...hline_Default_Options, ...opts };
//         this._paneViews = [new HLINE_Render_Class(this,this._options)];
//     }
//     updateAllViews() { this._paneViews.forEach(t=>t.update()); }
//     paneViews() { return this._paneViews }
// }
//---------------------------------END HLINE CLASS
//--------------EDITOR CLASS--------------------
class HLINE_EDITOR_Class {
    constructor(chart, series, opts) {
        addMember(this, "_chart");
        addMember(this, "_series");
        addMember(this, "_hLineArray");
        addMember(this, "_options");
        addMember(this, "_clickHandler", t=>this._onClick(t));        
        const allOpts = {...hline_Default_Options,...opts };
        this._chart = chart,
        this._series = series,
        this._hLineArray = [],
        this._options = allOpts;
        this._chart.subscribeClick(this._clickHandler);
        if(!opts.tkr){ console.warn('Options need TKR attribute') }
    }
    _onClick(e) {
        if(window.SPOT_EDIT_MODE!="HLINE"){return}
        let HLINE_EDITOR_FRAME = document.getElementById('HLINE_EDITOR_FRAME')
        const mousePrice = Math.round(this._series.coordinateToPrice(e.point.y));
        //-------------------CHECK EDIT MODE--------------
        let buffer = mousePrice*BUFFER_OFFSET; //todo gradient scaling?
        let maxPrice = Math.round(mousePrice + buffer  );
        let minPrice = Math.round(mousePrice - buffer );
        // console.log('SELECT BUFFER',buffer) //todo grade scaling select buffer?
        // console.log('MAX',maxPrice,'MIN',minPrice)
        let item, editItem;
        for(var idx=0; idx< this._hLineArray.length;idx++){
            item = this._hLineArray[idx]; 
            if(item.price<maxPrice && item.price>minPrice ){
                editItem = item; break;} //FOUND MATCH
        }
        //--------------------END CHECK EDIT MODE-----------
        HLINE_EDITOR_FRAME.setAttribute('tkr_meta',this._options.tkr); 
        if(editItem){
            console.log('EDITING',mousePrice,buffer,minPrice,maxPrice)
            let editOpts = editItem.line.options();
            // axisLabelColor
            // axisLabelTextColor
            // axisLabelVisible
            // color// "steelblue"
            // lineStyle 1
            // lineVisible
            // lineWidth 1
            // title
            // let editPrice = editItem._price;
            let editColor = editOpts.color;
            let editSize = editOpts.lineWidth;
            let editStyle = editOpts.lineStyle;
            HLINE_EDITOR_FRAME.setAttribute('edit_hline_meta','editing'); //set edit state
            HLINE_EDITOR_FRAME.setAttribute('price_meta',mousePrice); 
            HLINE_EDITOR_FRAME.setAttribute('color_meta',editColor); 
            HLINE_EDITOR_FRAME.setAttribute('size_meta',editSize); 
            HLINE_EDITOR_FRAME.setAttribute('style_meta',editStyle); 
        } else{
            console.log('not editing',mousePrice,buffer,minPrice,maxPrice)
            HLINE_EDITOR_FRAME.setAttribute('edit_hline_meta',''); //set non edit state
            HLINE_EDITOR_FRAME.setAttribute('price_meta',mousePrice); 
        }
        showHLINE_Editor(e);
    }
    create_HLINE(opts){
        let widthSelect = opts.width || 1;
        let styleSelect = opts.style || '';
        if(styleSelect==='solid'){ //USE AS REFERENCE...
            styleSelect = LightweightCharts.LineStyle.Solid;
        } else if(styleSelect==='dot'){
            styleSelect = LightweightCharts.LineStyle.Dotted;
        } else if(styleSelect==='dash'){
            styleSelect = LightweightCharts.LineStyle.Dashed;
        } else if(styleSelect==='xlrg'){
            styleSelect = LightweightCharts.LineStyle.LargeDashed;
        } else { //'xsml'
            styleSelect = LightweightCharts.LineStyle.SparseDotted;
        } // LightweightCharts.LineStyle:0:"Solid",1:"Dotted",2:"Dashed"3:"LargeDashed"4:"SparseDotted"
        let newPrice = parseInt(opts.price);
        let newLine = this._series.createPriceLine({
            price:newPrice, color: opts.color, 
            lineStyle:styleSelect, 
            lineWidth:widthSelect,
        });
        this._hLineArray.push({price:newPrice,line:newLine})
    }
    update_HLINE(opts){
        let editItem = this.find_HLINE(opts.price);
        let styleSelect=(!opts.style || opts.style==='solid')?0:(opts.style==='dot')?1:(opts.style==='dash')?2:(opts.style==='xlrg')?3:4;
        if(editItem){
            let newOpts = {};
            if(opts.width){newOpts.lineWidth=parseInt(opts.width)}
            console.log("style",opts.style)
            newOpts.lineStyle=styleSelect;
            if(opts.color){newOpts.color=opts.color}
            editItem.line.applyOptions(newOpts)
        }
    }
    delete_HLINE(tgtPrice){
        let maxPrice = Math.round(tgtPrice + (tgtPrice*BUFFER_OFFSET) );
        let minPrice = Math.round(tgtPrice - (tgtPrice*BUFFER_OFFSET) );
        let item;
        for(var i=0; i< this._hLineArray.length;i++){
            item = this._hLineArray[i]; 
            if(item.price<maxPrice && item.price>minPrice ){
                this._series.removePriceLine(item.line)
                this._hLineArray.splice(i,1);
                return true;} //FOUND MATCH
        }
        return false;
    }
    find_HLINE(tgtPrice){ //detemine line to edit.
        let maxPrice = Math.round(tgtPrice + (tgtPrice*BUFFER_OFFSET) );
        let minPrice = Math.round(tgtPrice - (tgtPrice*BUFFER_OFFSET) );
        let item;
        for(var idx=0; idx< this._hLineArray.length;idx++){
            item = this._hLineArray[idx]; 
            if(item.price<maxPrice && item.price>minPrice ){
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
let BUFFER_OFFSET = 0.02; //important for selection of edit or not.
export {HLINE_EDITOR_Class};

