var d = Object.defineProperty;
var h = (t,e,s)=>e in t ? d(t, e, {
    enumerable: !0,
    configurable: !0,
    writable: !0,
    value: s
}) : t[e] = s;
var i = (t,e,s)=>(h(t, typeof e != "symbol" ? e + "" : e, s),
s);
function a(t) {
    if (t === void 0)
        throw new Error("Value is undefined");
    return t
}
class u {
    constructor() {
        i(this, "_chart");
        i(this, "_series");
        i(this, "_requestUpdate");
        i(this, "_fireDataUpdated", e=>{
            this.dataUpdated && this.dataUpdated(e)
        }
        )
    }
    requestUpdate() {
        this._requestUpdate && this._requestUpdate()
    }
    attached({chart: e, series: s, requestUpdate: r}) {
        this._chart = e,
        this._series = s,
        this._series.subscribeDataChanged(this._fireDataUpdated),
        this._requestUpdate = r,
        this.requestUpdate()
    }
    detached() {
        var e;
        (e = this._series) == null || e.unsubscribeDataChanged(this._fireDataUpdated),
        this._chart = void 0,
        this._series = void 0,
        this._requestUpdate = void 0
    }
    get chart() {
        return a(this._chart)
    }
    get series() {
        return a(this._series)
    }
}
export {u as P, a as e};
