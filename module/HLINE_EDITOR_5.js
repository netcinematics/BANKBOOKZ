var _ = Object.defineProperty;
var u = (s,t,e)=>t in s ? _(s, t, {enumerable: !0,configurable: !0,writable: !0, value: e}) : s[t] = e;
var addMember = (s,t,e)=>(u(s, typeof t != "symbol" ? t + "" : t, e),e);
// import {P as plugBase} from "./plugin-base.js";
//---------------------------------HLINE EDITOR
const hline_Default_Options = {color:"steelblue",width: 3};
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
        let selectBuffer = mousePrice*BUFFER_OFFSET; 
        if(selectBuffer<5){selectBuffer=5} //minimum size
        let maxPrice = Math.round(mousePrice + selectBuffer  );
        let minPrice = Math.round(mousePrice - selectBuffer );
        // console.log('SELECT BUFFER',selectBuffer) //todo grade scaling select buffer?
        // console.log('MAX',maxPrice,'MIN',minPrice,'mouse',mousePrice)
        let item, editItem;
        for(var idx=0; idx< this._hLineArray.length;idx++){
            item = this._hLineArray[idx]; 
            // console.log('item',item.price)
            if(item.price<maxPrice && item.price>minPrice ){
                console.log('found item')
                editItem = item; break;} //FOUND MATCH
        }
        //--------------------END CHECK EDIT MODE-----------
        HLINE_EDITOR_FRAME.setAttribute('tkr_meta',this._options.tkr); 
        if(editItem){
            // console.log('Edit1')
            let editOpts = editItem.line.options();
            let editColor = editOpts.color;
            if(editColor.indexOf('#')<0){editColor = '#4682b4'};//steelblue as hex. required.
            let hlineColorInput = document.getElementById('hlineColorInput')
            hlineColorInput.value = editColor; //SYNCH edit line color to UI.            
            let editSize=(!editOpts.lineWidth||editOpts.lineWidth===1)?'sml':(editOpts.lineWidth===2)?'med':'lrg';
            let editStyle=(!editOpts.lineStyle)?'solid':(editOpts.lineStyle===1)?'dot':(editOpts.lineStyle===2)?'dash':(editOpts.lineStyle===3)?'xlrg':'xsml'
            HLINE_EDITOR_FRAME.setAttribute('edit_hline_meta','editing'); //set edit state
            console.log('set editing')
            HLINE_EDITOR_FRAME.setAttribute('price_meta',mousePrice); 
            HLINE_EDITOR_FRAME.setAttribute('color_meta',editColor); 
            HLINE_EDITOR_FRAME.setAttribute('size_meta',editSize); 
            HLINE_EDITOR_FRAME.setAttribute('style_meta',editStyle); 
        } else{
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
        let selectBuffer = tgtPrice*BUFFER_OFFSET; 
        if(selectBuffer<5){selectBuffer=5} //minimum size
        let maxPrice = Math.round(tgtPrice + selectBuffer  );
        let minPrice = Math.round(tgtPrice - selectBuffer );
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
        let selectBuffer = tgtPrice*BUFFER_OFFSET; 
        if(selectBuffer<5){selectBuffer=5} //minimum size
        let maxPrice = Math.round(tgtPrice + selectBuffer  );
        let minPrice = Math.round(tgtPrice - selectBuffer );
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

