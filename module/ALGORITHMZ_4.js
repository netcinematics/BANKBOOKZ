
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

function calcBuySellAVG_Lines(trades){
    debugger;
    // const buySellBrev = {buy:0,sell:0,brev:0};
    let buyAMT=0,buyCNT=0,buyAVG=0,sellAMT=0,sellCNT=0,sellAVG=0,brev=0;
    for(let trade of trades){
        if(trade.type==='BUY'){ buyCNT++;
            buyAMT += trade.price;
        } else if(trade.type==='SELL'){ sellCNT++;
            sellAMT += trade.price;
        }
    }
    if(sellAMT && sellCNT){ sellAVG = Math.round(sellAMT/sellCNT)}
    if(buyAMT && buyCNT){ buyAVG = Math.round(buyAMT/buyCNT)}
    if(buyAVG && sellAVG){ brev = Math.round(buyAVG+sellAVG/2)}
    return {buy:buyAVG,sell:sellAVG,brev:brev};

}

export {calcMA,calcBuySellAVG_Lines};

