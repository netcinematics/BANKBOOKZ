function generateFakeData(startDate, endDate) {
    // ... generate fake data based on start and end dates
    // For simplicity, let's generate a basic example
    const data = [
        { time: 1680000000000, open: 100, high: 110, low: 90, close: 105 },
        // ... more data points
    ];
    return data;
}

function calculateHeikinAshi(data) {
    const heikinAshiData = [];
    let prevClose = null;
    let prevOpen = null;

    data.forEach((candle, index) => {
        const open = index === 0 ? candle.open : (prevOpen + prevClose) / 2;
        const close = (candle.open + candle.high + candle.low + candle.close) / 4;
        const high = Math.max(candle.high, (open + close) / 2);
        const low = Math.min(candle.low, (open + close) / 2);

        heikinAshiData.push({ time: candle.time, open, high, low, close });

        prevClose = close;
        prevOpen = open;
    });

    return heikinAshiData;
}


const data = generateFakeData(new Date('2023-11-01'), new Date('2023-11-30'));
const heikinAshiData = calculateHeikinAshi(data);

Highcharts.chart('container', {
    series: [{
        type: 'candlestick',
        data: heikinAshiData,
        name: 'AAA',
        dataGrouping: {
            enabled: false
        }
    }]
});


//---------------------------------------------------------------

function generateFakeData(startDate, endDate) {
    // Replace this with your actual data generation logic
    const data = [];
    const timeStep = 24 * 60 * 60 * 1000; // One day in milliseconds
    let currentTime = startDate.getTime();
  
    while (currentTime <= endDate.getTime()) {
      const open = Math.random() * 100 + 50;
      const high = open + Math.random() * 10;
      const low = open - Math.random() * 10;
      const close = open + (Math.random() - 0.5) * 20;
  
      data.push({
        time: currentTime,
        open,
        high,
        low,
        close
      });
  
      currentTime += timeStep;
    }
  
    return data;
  }

  function calculateHeikinAshi(data) {
    const heikinAshiData = [];
    let prevClose = null;
    let prevOpen = null;
  
    data.forEach((candle, index) => {
      const open = index === 0 ? candle.open : (prevOpen + prevClose) / 2;
      const close = (candle.open + candle.high + candle.low + candle.close) / 4;
      const high = Math.max(candle.high, (open + close) / 2);
      const low = Math.min(candle.low, (open + close) / 2);
  
      heikinAshiData.push({
        time: candle.time,
        open,
        high,
        low,
        close
      });
  
      prevClose = close;
      prevOpen = open;
    });
  
    return heikinAshiData;
  }

  
  const chart = LightweightCharts.createChart(document.getElementById('chart'), {
    width: 800,
    height: 400,
    layout: {
      backgroundColor: '#ffffff'
    }
  });
  
  const heikinAshiSeries = chart.addLineSeries({
    priceLineVisible: true,
    priceFormat: {
      type: 'price',
      precision: 2
    }
  });
  
  const data = generateFakeData(new Date('2023-11-01'), new Date('2023-11-30'));
  const heikinAshiData = calculateHeikinAshi(data);
  
  heikinAshiSeries.setData(heikinAshiData);
  