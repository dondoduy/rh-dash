import React, { Component } from 'react';
import './index.css';

export default class Position extends Component {
    render() {
        return (
            <div className="position">
            <div>test</div>
                <div className="pos-instrument">{this.props.position.instrument}</div>
                <div className="pos-quantity">{this.props.position.quantity}</div>
                <div className="pos-buy-price">{this.props.position.average_buy_price}</div>
            </div>
        );
    }
}