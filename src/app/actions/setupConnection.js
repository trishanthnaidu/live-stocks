import { appState } from 'rootz';
import { publish } from 'react-rootz';
import { updateStocks } from './transformStockData';

/**
 * function to setup connection and update maintained stock list in rootz
 * @param {*} socket : socket object from new Socket declaration
 */
const setLiveUpdates = socket => (
    socket.onmessage = evt => {
        appState.set("$liveUpdates", { "stocks": updateStocks(JSON.parse(evt.data)) });
        setTimeout(() => publish("$liveUpdates"), 3000);
    }
);

export {
    setLiveUpdates
}