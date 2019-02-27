import React from 'react';
import ReactDataGrid from "react-data-grid";
import {
    formatCellFonts
} from '../actions';
import {
    getCellTemplateForAll
} from '../constants.js';

class GridLayout extends React.Component {
    constructor(props) {
        super(props);
        this.state = {refresh: true}
    }
    getColumnDefs() {
        // Due to an existing issue/bug in react-data grid i had to dynamically generate columns (getColumnDefs)
        // with hash having new value everytime so that the rows get updated dynamically as soon as the 
        // live data is fetched
        // source : https://github.com/adazzle/react-data-grid/issues/709 
        return [{ name: "Ticker", key: "name", formatter: getCellTemplateForAll, hash: (new Date).getTime() },
                { name: "Price", key: "value", formatter: formatCellFonts, hash: (new Date).getTime() },
                { name: "Last Update", key: "lastUpdatedText", formatter: getCellTemplateForAll, hash: (new Date).getTime() }
                ];
    }
    render() {
        return (
            <div>
                <ReactDataGrid
                    columns={this.getColumnDefs()}
                    rowGetter={i => this.props.stocks[i]}
                    rowsCount={this.props.stocks.length}
                    enableCellSelect={false}
                />
            </div>
        );
    }
}

export default GridLayout;