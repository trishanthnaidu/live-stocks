import React from 'react';
import { appState } from 'rootz';
import { subscribe } from 'react-rootz';
import { setLiveUpdates } from './actions';
import GridLayout from './components/gridLayout';
import QuickViewLayout from './components/quickViewLayout';

class liveStockApp extends React.Component {
    constructor(props) {
        super(props);
        subscribe({
            name: "liveUpdates",
            scope: this,
            state: {
                "stocks": []
            }
        });
    }
    componentDidMount() {
        const socket = new WebSocket('ws://stocks.mnet.website');
        setLiveUpdates(socket);
    }
    render() {
        const rtx = appState.get("$liveUpdates");

        return (
            <div className="App">
                <div className="title-bar-wrapper">
                    <div className="app-title">Live Stocks</div>
                </div>
                {rtx.stocks.length > 0 && 
                    <div className="body-wrapper">
                        <QuickViewLayout {...{ stocks: rtx.stocks }} />
                        <GridLayout {...{ stocks: rtx.stocks }} />
                    </div>
                }
            </div>
        );
    }
}

export default liveStockApp