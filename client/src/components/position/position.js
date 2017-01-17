import React, { Component } from 'react';
import './index.css';

export default class Position extends Component {

    render() {
        return (
            <div className="position">
                <div className="pos-instrument">{this.props.instrument}</div>
                <div className="pos-quantity">{this.props.quantity}</div>
                <div className="pos-buy-price">{this.props.average_buy_price}</div>
            </div>
        );
    }
}