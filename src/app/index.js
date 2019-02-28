import React from 'react';
import { appState } from 'rootz';
import { subscribe } from 'react-rootz';
import { setLiveUpdates } from './actions';
import GridLayout from './components/gridLayout';
import QuickViewLayout from './components/quickViewLayout';
import VisualisationLayout from './components/visualisationLayout';

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
                <div className="banner-container">
                    <div className="app-title"></div>
                    <div className="banner-content-wrapper">
                        <div className="banner-content-highlight">
                            <div className="content-text">
                                Realtime Stock Updates
                            </div>
                        </div>
                        <div className="banner-content-highlight">
                            <div className="content-subtext">
                                Provides better data comparisons with our own Visualisations, Data Grids & Quick Views
                            </div>
                        </div>
                    </div>
                </div>
                <div className="quickview-container">
                    {rtx.stocks.length > 0 ?
                        <QuickViewLayout {...{ stocks: rtx.stocks }} />
                        :
                        <div className="quickview-watermark"></div>
                    }
                </div>
                <div className="visualisation-container">
                    <div className="visualisation-title">Visualisations</div>
                    <div className="visualisation-wrapper">
                        {rtx.stocks.length > 0 ?
                            <VisualisationLayout {...{ stocks: rtx.stocks }}/>
                            :
                            <div className="visualisation-watermark"></div>
                        }
                    </div>
                </div>
                <div className="grid-container">
                    <div className="grid-title">Data Grids</div>
                    <div className="grid-wrapper">
                        {rtx.stocks.length > 0 ?
                            <GridLayout {...{ stocks: rtx.stocks }} />
                             :
                            <div className="datagrid-watermark"></div>
                        }
                    </div>
                </div>
            </div>
        );
    }
}

export default liveStockApp