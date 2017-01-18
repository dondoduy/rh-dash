import React, { Component } from 'react';
import './index.css';

export default class Position extends Component {
    render() {
        return (
            <div className="position">
                <div className="pos-symbol">{this.props.quote.symbol}</div>
                <div className="pos-buy-price">{this.props.position.average_buy_price}</div>
                <div className="pos-quantity">{this.props.position.quantity}</div>
                <div className="pos-previous-close">{this.props.quote.previous_close}</div>
                <div className="pos-price">{this.props.quote.last_trade_price}</div>
            </div>
        );
    }
}