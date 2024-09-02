var _ = Object.defineProperty;
var u = (s,t,e)=>t in s ? _(s, t, {enumerable: !0,configurable: !0,writable: !0, value: e}) : s[t] = e;
var addMember = (s,t,e)=>(u(s, typeof t != "symbol" ? t + "" : t, e),e);
// import {V as p} from "./lightweight-charts.production-7ee7078d.js";
// import {g as w} from "./sample-data-c7d89ab8.js";
// import {p as m} from "./positions-0a54307c.js";
// import {P as lwcprod} from "./lwc.prod.js";
// import {g as w} from "./sample-data.js";
import {P as plugBase} from "./plugin-base.js";
import {p as m} from "./positions.js";

class VLineDraw_Class {
    constructor(t, e) {
        addMember(this, "_x", null);
        addMember(this, "_options");
        this._x = t,
        this._options = e
    }
    draw(t) {
        t.useBitmapCoordinateSpace(e=>{
            if (this._x === null)
                return;
            const n = e.context
              , a = m(this._x, e.horizontalPixelRatio, this._options.width);
            n.fillStyle = this._options.color,
            n.fillRect(a.position, 0, a.length, e.bitmapSize.height)
        }
        )
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
    update() {
        const t = this._source._chart.timeScale();
        this._x = t.timeToCoordinate(this._source._time)
    }
    renderer() {
        return new VLineDraw_Class(this._x,this._options)
    }
}
class VLinePane_Class {// extends plugBase {
    constructor(t, e) {
        // super();
        addMember(this, "_source");
        addMember(this, "_x", null);
        addMember(this, "_options");
        this._source = t,
        this._options = e
    }
    update() {
        const t = this._source._chart.timeScale();
        this._x = t.timeToCoordinate(this._source._time)
    }
    visible() {
        return this._options.showLabel
    }
    tickVisible() {
        return this._options.showLabel
    }
    coordinate() {
        return this._x ?? 0
    }
    text() {
        return this._options.labelText
    }
    textColor() {
        return this._options.labelTextColor
    }
    backColor() {
        return this._options.labelBackgroundColor
    }
}
const vline_Default_Options = {
    color: "green",labelText: "",width: 3,labelBackgroundColor: "green",labelTextColor: "white",
    showLabel: !1
};
class VERTLINE_EDITOR_Class {
    constructor(chart, series, time, opts) {
        addMember(this, "_chart");
        addMember(this, "_series");
        addMember(this, "_time");
        addMember(this, "_options");
        addMember(this, "_paneViews");
        addMember(this, "_timeAxisViews");
        addMember(this, "_clickHandler", t=>this._onClick(t));        
        const allOpts = {...vline_Default_Options,...opts };
        this._chart = chart,
        this._series = series,
        this._time = time,
        this._options = allOpts;
        this._paneViews = [new VLineRender_Class(this,allOpts)],
        this._timeAxisViews = [new VLinePane_Class(this,allOpts)]
        this._chart.subscribeClick(this._clickHandler);
    }
    _onClick(e) {
        if(window.SPOT_EDIT_MODE!="VLINE"){return}
        // const mousePrice = this._series.coordinateToPrice(e.point.y) 
        let VLINE_EDITOR_FRAME = document.getElementById('VLINE_EDITOR_FRAME')
        const mouseTime = e.time;
        let maxTime = Math.round(mouseTime + (mouseTime*0.00005) );
        let minTime = Math.round(mouseTime - (mouseTime*0.00005) );
        let item, editItem;
        for(var idx=0; idx< window.DRAW_VLINE_SET.length;idx++){
            item = window.DRAW_VLINE_SET[idx];
            if(item._time<maxTime && item._time>minTime ){
            editItem = item; break;}
        }

        if(editItem){
            let editTime = editItem._time;
            let editColor = editItem._options.color;
            let editSize = editItem._options.width;
            VLINE_EDITOR_FRAME.setAttribute('edit_meta',idx); //set index of item
            VLINE_EDITOR_FRAME.setAttribute('time_meta',editTime); //set editor state
            VLINE_EDITOR_FRAME.setAttribute('color_meta',editColor); //set editor state
            VLINE_EDITOR_FRAME.setAttribute('size_meta',editSize); //set editor state
        } else{
            VLINE_EDITOR_FRAME.setAttribute('edit_meta',-1); //set index of item.
        }


        // const mousePrice = this._series.coordinateToPrice(e.point.y) 
        showVERTLINE_Editor(e,mouseTime);
    }
    lineBetweenBuffer(mouseTime){
        let maxTime = Math.round(mouseTime + (mouseTime*0.05) );
        let minTime = Math.round(mouseTime - (mouseTime*0.05) );
        let item, editItem;
        for(var i=0; i< window.DRAW_VLINE_SET.length;i++){
            item = window.DRAW_VLINE_SET[i];
            if(item._time<maxTime && item._time>minTime ){
            editItem = item; break;}
        }
        return editItem;
    }   

    updateAllViews() {
        this._paneViews.forEach(t=>t.update()),
        this._timeAxisViews.forEach(t=>t.update())
    }
    timeAxisViews() {
        return this._timeAxisViews
    }
    paneViews() {
        return this._paneViews
    }
}

function showVERTLINE_Editor(e, mouseTime){
    const VLINE_EDITOR_FRAME = document.getElementById('VLINE_EDITOR_FRAME')
    VLINE_EDITOR_FRAME.style.visibility='visible';//show editor
    VLINE_EDITOR_FRAME.setAttribute('time_meta',mouseTime); //set editor state
    VLINE_EDITOR_FRAME.style.top=e.sourceEvent.pageY+18+'px';
    VLINE_EDITOR_FRAME.style.left="10%";//e.sourceEvent.pageX-28+'px';
}

export {VERTLINE_EDITOR_Class as VERTLINE_EDITOR};

// const l = lwcprod("chart", {autoSize: !0})
// const r = l.addLineSeries()
// const o = w();
// r.setData(o);
// const L = new VERTLINE_Class(l,r,o[o.length - 50].time,{
//     showLabel: !0, labelText: "1"});
// r.attachPrimitive(L);
// const f = new VERTLINE_Class(l,r,o[o.length - 25].time,{
//     showLabel: !1,color: "red",width: 2
// });
// r.attachPrimitive(f);
