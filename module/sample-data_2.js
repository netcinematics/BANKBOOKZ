let l = 25 + Math.random() * 25;
const r = e=>e * (.5 + Math.sin(e / 10) * .2 + Math.sin(e / 20) * .4 + Math.sin(e / l) * .8 + Math.sin(e / 500) * .5) + 200;
function c(e=500) {
    l = 25 + Math.random() * 25;
    const n = []
      , a = new Date(Date.UTC(2023, 0, 1, 12, 0, 0, 0));
    for (let o = 0; o < e; ++o) {
        const t = a.getTime() / 1e3
          , s = r(o);
        n.push({
            time: t,
            value: s
        }),
        a.setUTCDate(a.getUTCDate() + 1)
    }
    return n
}
function i(e, n) {
    return Math.random() * (n - e) + e
}
function u(e) {
    const n = +i(e * .95, e * 1.05).toFixed(2)
      , a = +i(n * .95, n * 1.05).toFixed(2)
      , o = +i(Math.max(n, a), Math.max(n, a) * 1.1).toFixed(2)
      , t = +i(Math.min(n, a) * .9, Math.min(n, a)).toFixed(2);
    return {
        open: n,
        high: o,
        low: t,
        close: a
    }
}
function d(e=250) {
    const n = c(e);
    let a = n[0].value;
    return n.map(o=>{
        const t = u(a);
        return a = t.close,
        {
            time: o.time,
            low: t.low,
            high: t.high,
            open: t.open,
            close: t.close
        }
    }
    )
}
function p(e, n) {
    const a = e.length
      , o = e.map(t=>t.time);
    for (let t = 0; t < a; t++) {
        const s = Math.floor(Math.random() * (Math.min(a - 1, t + n) - t + 1)) + t;
        [e[t],e[s]] = [e[s], e[t]]
    }
    return e.forEach((t,s)=>{
        t.time = o[s]
    }
    ),
    e
}
function M(e, n) {
    const a = []
      , o = e.length;
    let t = 0;
    for (; t < o; )
        a.push(e.slice(t, t + n)),
        t += n;
    return a
}
function f(e, n, a=0) {
    const o = c(e * n).map(s=>({
        ...s,
        value: Math.max(s.value, 0)
    }));
    let t = M(o, n);
    return a > 0 && (t = t.map(s=>p(s, a))),
    t[0].map((s,m)=>({
        time: s.time,
        values: t.map(h=>h[m].value)
    }))
}
export {d as a, c as g, f as m, p as s};
