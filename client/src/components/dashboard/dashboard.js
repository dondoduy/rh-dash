import React, { Component } from 'react';
import Position from '../position/position';

class Dashboard extends Component {
  renderPositions = () => {
  if (!this.props.positions) { return null; }

  let positions = this.props.positions.map((p) => {
    <Position position={p} />
  });

  return (positions);
}

render() {
  return (
    <div className="Dashboard">
      {this.renderPositions}
      {this.props.positions.map((p) => {
    <Position position={p} />
  })}
    </div>
  );
}
}

export default Dashboard;
