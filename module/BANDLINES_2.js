var w = Object.defineProperty;
var I = (a,t,e)=>t in a ? w(a, t, {
    enumerable: !0,
    configurable: !0,
    writable: !0,
    value: e
}) : a[t] = e;
var addMember = (a,t,e)=>(I(a, typeof t != "symbol" ? t + "" : t, e),
e);
// import {V as x} from "./lightweight-charts.production-7ee7078d.js";
// import {g as T} from "./sample-data-c7d89ab8.js";
// import {P as g} from "./plugin-base-a12dadc8.js";
import {P as createChart} from "./lwc.prod.js";
import {g as getMockData} from "./sample-data.js";
import {P as plugBase} from "./plugin-base.js";

class TimeIdx_Class {
    constructor(t) {
        addMember(this, "numbers");
        addMember(this, "cache");
        this.numbers = t,
        this.cache = new Map
    }
    findClosestIndex(t, e) {
        const s = `${t}:${e}`;
        if (this.cache.has(s))
            return this.cache.get(s);
        const i = this._performSearch(t, e);
        return this.cache.set(s, i),
        i
    }
    _performSearch(t, e) {
        let s = 0
          , i = this.numbers.length - 1;
        if (t <= this.numbers[0].time)
            return 0;
        if (t >= this.numbers[i].time)
            return i;
        for (; s <= i; ) {
            const n = Math.floor((s + i) / 2)
              , o = this.numbers[n].time;
            if (o === t)
                return n;
            o > t ? i = n - 1 : s = n + 1
        }
        return e === "left" ? s : i
    }
}
class BandData_Class {
    constructor(bandData, chunks=10) {
        addMember(this, "_arr");
        addMember(this, "_chunkSize");
        addMember(this, "_cache");
        this._arr = bandData,
        this._chunkSize = chunks,
        this._cache = new Map
    }
    getMinMax(t, e) {
        const s = `${t}:${e}`;
        if (s in this._cache)
            return this._cache.get(s);
        const i = {
            lower: 1 / 0,
            upper: -1 / 0
        }
        const n = Math.floor(t / this._chunkSize)
        const o = Math.floor(e / this._chunkSize);
        for (let h = n; h <= o; h++) {
            const c = h * this._chunkSize
              , l = Math.min((h + 1) * this._chunkSize - 1, this._arr.length - 1)
              , d = `${c}:${l}`;
            if (d in this._cache.keys()) {
                const u = this._cache.get(s);
                this._check(u, i)
            } else {
                const u = {
                    lower: 1 / 0,
                    upper: -1 / 0
                };
                for (let _ = c; _ <= l; _++)
                    this._check(this._arr[_], u);
                this._cache.set(d, u),
                this._check(u, i)
            }
        }
        return this._cache.set(s, i), i
    }
    _check(t, e) {
        t.lower < e.lower && (e.lower = t.lower),
        t.upper > e.upper && (e.upper = t.upper)
    }
}
class BandsDraw_Class {
    constructor(t) {
        addMember(this, "_viewData");
        this._viewData = t
    }
    draw() {}
    drawBackground(t) {
        const e = this._viewData.data;
        t.useBitmapCoordinateSpace(s=>{
            const ctx = s.context;
            ctx.scale(s.horizontalPixelRatio, s.verticalPixelRatio),
            ctx.strokeStyle = this._viewData.options.lineColor,
            ctx.lineWidth = this._viewData.options.lineWidth,
            ctx.beginPath();
            const area = new Path2D;
            const outline = new Path2D;
            area.moveTo(e[0].x, e[0].upper),
            outline.moveTo(e[0].x, e[0].upper);
            for (const c of e)
                area.lineTo(c.x, c.upper),
                outline.lineTo(c.x, c.upper);
            const h = e.length - 1;
            area.lineTo(e[h].x, e[h].lower),
            outline.moveTo(e[h].x, e[h].lower);
            for (let c = e.length - 2; c >= 0; c--)
                area.lineTo(e[c].x, e[c].lower),
                outline.lineTo(e[c].x, e[c].lower);
            area.lineTo(e[0].x, e[0].upper),
            area.closePath(),
            ctx.stroke(outline),
            ctx.fillStyle = this._viewData.options.fillColor;
            ctx.fill(area);
        } )
    }
}
class BandsRenderer_Class {
    constructor(t) {
        addMember(this, "_source");
        addMember(this, "_data");
        this._source = t,
        this._data = { data: [], options: this._source._options }
    }
    update() {
        const t = this._source.series;
        const e = this._source.chart.timeScale();
        this._data.data = this._source._bandsData.map(s=>({
            x: e.timeToCoordinate(s.time) ?? -100,
            upper: t.priceToCoordinate(s.upper) ?? -100,
            lower: t.priceToCoordinate(s.lower) ?? -100
        }))
    }
    renderer() { return new BandsDraw_Class(this._data) }
}
const default_BAND_Options={lineColor:"rgb(5, 200, 100)",fillColor:"rgba(25, 200, 100, 0.25)",lineWidth: 1};
class BandsChart_Class extends plugBase {
    constructor(e={}) {
        super();
        addMember(this, "_paneViews");
        addMember(this, "_seriesData", []);
        addMember(this, "_bandsData", []);
        addMember(this, "_options");
        addMember(this, "_timeIndices");
        addMember(this, "_upperLower");
        addMember(this, "_minValue", Number.POSITIVE_INFINITY);
        addMember(this, "_maxValue", Number.NEGATIVE_INFINITY);
        this._options = {
            ...default_BAND_Options,
            ...e
        },
        this._paneViews = [new BandsRenderer_Class(this)],
        this._timeIndices = new TimeIdx_Class([]),
        this.ultData = new BandData_Class([])
    }
    updateAllViews() {
        this._paneViews.forEach(e=>e.update())
    }
    paneViews() {
        return this._paneViews
    }
    attached(e) {
        super.attached(e),
        this.dataUpdated()
    }
    dataUpdated() {
        this._seriesData = JSON.parse(JSON.stringify(this.series.data()));
        this.calculateBands();
        this._timeIndices = new TimeIdx_Class(this._seriesData)
    }
    calculateBands() {
        const ultSet = new Array(this._seriesData.length);
        let idx = 0,displayVal,upperNUM,lowerNUM;
        this._minValue = Number.POSITIVE_INFINITY;
        this._maxValue = Number.NEGATIVE_INFINITY;
        this._seriesData.forEach(i=>{
            displayVal = (i.close)?i.close:(i.value)?i.value:0;
            if(!displayVal){return}
            upperNUM = displayVal * 1.1;
            lowerNUM = displayVal * .9;
            if(upperNUM > this._maxValue){ (this._maxValue = upperNUM) }
            if(lowerNUM < this._minValue){ (this._minValue = lowerNUM) }
            ultSet[idx] = {
                upper: upperNUM,
                lower: lowerNUM,
                time: i.time
            };
            console.log(`diff:${Math.round(upperNUM-lowerNUM)}, u:${Math.round(upperNUM)}, 
                l:${Math.round(lowerNUM)}`);// ,t:${i.time} `)
            idx += 1;
        });
        ultSet.length = idx;
        this._bandsData = ultSet;
        this.ultData = new BandData_Class(this._bandsData,4)//4chunks
    }
    autoscaleInfo(e, s) {
        const tScale = this.chart.timeScale()
        const n = tScale.coordinateToTime(tScale.logicalToCoordinate(e) ?? 0) ?? 0
        const o = tScale.coordinateToTime(tScale.logicalToCoordinate(s) ?? 5e9) ?? 5e9
        const h = this._timeIndices.findClosestIndex(n, "left")
        const c = this._timeIndices.findClosestIndex(o, "right")
        const ult = this.ultData.getMinMax(h, c);
        return { priceRange: { minValue: ult.lower, maxValue: ult.upper } }
    }
}

export {BandsChart_Class as BandsChart_Class};

// const BandsChart = createChart("bands_chart", { autoSize:!0, 
//     layout: {textColor:'steelblue',background: { type: 'solid', color: '#000000' }},
//     grid: { vertLines: { color: "#080808" }, horzLines: { color: "#080808" } },
//     allowShiftVisibleRangeOnWhitespaceReplacement:!0
// })
// const f = BandsChart.addLineSeries()
// const v = getMockData();
// f.setData(v);
// const y = new BandsChart_Class;
// f.attachPrimitive(y);
