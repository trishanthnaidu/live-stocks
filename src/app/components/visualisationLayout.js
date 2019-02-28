import React from 'react';
import NVD3Chart from "react-nvd3";

import '../../visualisation.scss';

let datum = [];
class VisualisationLayout extends React.Component {
    constructor(props) {
        super(props);
        datum = [{
            key: "Stock Visualisation",
            values: this.props.stocks
        }]
    }

    render() {
        return (
            <NVD3Chart id="barChart" type="discreteBarChart" datum={datum} x="name" y="value" />
        );
    }
}

export default VisualisationLayout;