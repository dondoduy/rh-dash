require('./index.css');
import React, { Component } from 'react';
import Position from '../position/position';

class Dashboard extends Component {
  renderPositions = () => {
    if (!this.props.accountDetails || !this.props.accountDetails.positions) { return null; }

    let positions = this.props.accountDetails.positions.map((p) => {

      let quote = {};
      if (this.props.accountDetails.quotes) {
        quote = this.props.accountDetails.quotes.filter(function(q){
          return q.instrument === p.instrument;
        })[0];
      //  quote = this.props.accountDetails.quotes.find(q => q.instrument === p.instrument);
        }
      

      return (<Position key={p.instrument} position={p} quote={quote} />);
    });

    return (positions);
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
