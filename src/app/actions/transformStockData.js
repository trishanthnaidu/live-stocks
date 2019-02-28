import { appState } from 'rootz';
import {
    getDate,
    getMonthShort,
    getTime12HR
} from '../constants';

/**
 * Constant Declarations
 */
const aDay = 1000 * 60 * 60 * 24;
const anHour = 1000 * 60 * 60;
const aMin = 1000 * 60;
const aSec = 1000;
let timeStamp;

/**
 * function for setting up lastupdated text value
 * @param: lastUpdatedTimeStamp, currentTimeStamp
 */ 
const generateLastUpdatedText = (lastUpdatedTimeStamp, currentTimeStamp) => {
    const diff = currentTimeStamp - lastUpdatedTimeStamp;
    if ((diff / aDay) > 1) {
        return `${getDate(diff)} ${getMonthShort(diff)}, ${getTime12HR(diff)}`;
    } else if ((diff / aMin) > 1 || (diff / anHour) > 1) {
        return `${getTime12HR(diff)}`;
    } else {
        return "A few seconds ago";
    }
}

/**
 * function for transforming and updating rootz 
 * {$liveUpdates} components stocks and maintaining stockHash maps 
 * @param: liveUpdates : updates fetched from WSocket
 */
const updateStocks = liveUpdates => {
    const stocks = appState.get("$liveUpdates").stocks;
    const stockHash = appState.get("stockHash") || {};
    timeStamp = new Date().getTime();

    for (const obj of liveUpdates) {
        const stockName = obj[0];
        const stockValue = obj[1];
        
        if (stockHash.hasOwnProperty(stockName)) {
            const stockObj = stocks.filter(key => (key.name === stockName))[0];
            stockObj.isInLoss = stockObj.value > stockValue;
            stockObj.name = stockName;
            stockObj.value = parseFloat(stockValue).toFixed(2);
            stockObj.lastUpdatedText = generateLastUpdatedText(stocks.lastUpdated, timeStamp);
            stockObj.lastUpdated = timeStamp;
            stockObj.isFirstUpdate = false
        } else {
            stockHash[stockName] = undefined;
            stocks.push({
                "name": stockName,
                "value": parseFloat(stockValue).toFixed(2),
                "lastUpdated": timeStamp,
                "lastUpdatedText": "First Update",// generateLastUpdatedText(timeStamp, timeStamp),
                "isFirstUpdate": true,
                "isInLoss": false
            });
        }
    }
    appState.set("stockHash", stockHash);
    return stocks;
};

export {
    updateStocks
}