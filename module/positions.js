function r(n) {
    return Math.floor(n * .5)
}
function u(n, t, o=1, s) {
    const i = Math.round(t * n)
      , c = s ? o : Math.round(o * t)
      , a = r(c);
    return {
        position: i - a,
        length: c
    }
}
function h(n, t, o) {
    const s = Math.round(o * n)
      , i = Math.round(o * t);
    return {
        position: Math.min(s, i),
        length: Math.abs(i - s) + 1
    }
}
export {h as a, u as p};
