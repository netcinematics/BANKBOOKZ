let randomFactor = 25 + Math.random() * 25;
const samplePoint = i => i * (0.5 + Math.sin(i / 10) * 0.2 + Math.sin(i / 20) * 0.4 +
            Math.sin(i / randomFactor) * 0.8 +
            Math.sin(i / 500) * 0.5) + 200;

function generateLineData(numberOfPoints = 500, endDate) {
    randomFactor = 25 + Math.random() * 25;
    const res = [];
    const date = endDate || new Date(Date.UTC(2018, 0, 1, 12, 0, 0, 0));
    date.setUTCDate(date.getUTCDate() - numberOfPoints - 1);
    for (let i = 0; i < numberOfPoints; ++i) {
        const time = date.getTime() / 1000;
        const value = samplePoint(i);
        res.push({ time, value });
        date.setUTCDate(date.getUTCDate() + 1);
    }
    return res;
}

function randomNumber(min, max) {
    return Math.random() * (max - min) + min;
}

function randomBar(lastClose) {
    const open = +randomNumber(lastClose * 0.95, lastClose * 1.05).toFixed(2);
    const close = +randomNumber(open * 0.95, open * 1.05).toFixed(2);
    const high = +randomNumber(
        Math.max(open, close),
        Math.max(open, close) * 1.1
    ).toFixed(2);
    const low = +randomNumber(
        Math.min(open, close) * 0.9,
        Math.min(open, close)
    ).toFixed(2);
    return { open, high, low, close };
}
function getFakeData(numberOfPoints = 250, endDate) {
    const lineData = generateLineData(numberOfPoints, endDate);
    let lastClose = lineData[0].value;
    return lineData.map(d => {
        const candle = randomBar(lastClose);
        lastClose = candle.close;
        return {
            time: d.time,
            low: candle.low,
            high: candle.high,
            open: candle.open,
            close: candle.close,
        };
    });
}

function calcMA(candleData, maLength) {
    const maData = [];
    for (let i = 0; i < candleData.length; i++) {
        if (i < maLength) { // Provide whitespace data points until the MA can be calculated
            maData.push({ time: candleData[i].time });
        } else {// Calculate the moving average, slow but simple way
            let sum = 0;
            for (let j = 0; j < maLength; j++) {
                sum += candleData[i - j].close;
            }
            const maValue = sum / maLength;
            maData.push({ time: candleData[i].time, value: maValue });
        }
    }
    return maData;
}

export {calcMA,getFakeData};

// EXAMPLE 
// const chartOptions={layout:{textColor: 'white',background:{ type:'solid',color:'black' } } };
// /** @type {import('lightweight-charts').IChartApi} */
// const chart = LightweightCharts.createChart(document.getElementById('chart'), chartOptions);
// const barData = generateCandleData(500);
