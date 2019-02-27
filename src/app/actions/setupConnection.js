import { appState } from 'rootz';
import { publish } from 'react-rootz';
import { updateStocks } from './transformStockData';

const setLiveUpdates = socket => (
    socket.onmessage = evt => {
        appState.set("$liveUpdates", { "stocks": updateStocks(JSON.parse(evt.data)) });
        setTimeout(() => publish("$liveUpdates"), 3000);
    }
);

export {
    setLiveUpdates
}