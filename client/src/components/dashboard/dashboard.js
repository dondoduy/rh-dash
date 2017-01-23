require('./index.css');
import React, { Component } from 'react';
import Position from '../position/position';

class Dashboard extends Component {
  renderPositions = () => {
    if (!this.props.accountDetails || !this.props.accountDetails.positions) { return null; }
    if (!this.props.instruments || this.props.instruments.length <= 0) { console.log('inst'); return null; }
    if (!this.props.quotes || this.props.quotes.length <= 0) { return null; }

    this.props.accountDetails.positions.map(position => {
      console.log(position.instrument);

      let instrument = this.props.instruments.filter((instrument) => {
        console.log(instrument.url + '===' + position.instrument);
        return instrument.url === position.instrument;
      })[0];

    if (!instrument) { return null; }

      let quote = this.props.quotes.filter((quote) => {
        return quote.symbol === instrument.symbol;
      })[0];

      return (<Position key={instrument.id} position={position} quote={quote} />);
    });
  }

  render() {
    return (
      <div className="Dashboard">
        {this.renderPositions()}
      </div>
    );
  }
}

export default Dashboard;
