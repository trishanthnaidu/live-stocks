import React from 'react';

class QuickViewLayout extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        const quickViewLayout = this.props.stocks.map((key, itr) => (
            <div key={itr} className="quickview-tiles">
                <span className="ticker-label-wrapper">
                    <div className="ticker-label-text">{key.name}
                    </div>
                    <div className={"ticker-label-value " + (key.isFirstUpdate ? "" : key.isInLoss ? "ticker-value-inLoss" : "ticker-value-inProfit")}>{key.value}
                    </div>
                </span>
            </div>
        ));
        return (<div className="quickview-wrapper">{quickViewLayout}</div>);
    }
}

export default QuickViewLayout;