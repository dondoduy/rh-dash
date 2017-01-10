import React, { Component } from 'react';
import { connect } from 'react-redux';
import './App.css';
import Header from './components/Header';
import Login from './components/Login';
import Dashboard from './components/Dashboard';

class App extends Component {
  render() {
    const isLoggedIn = this.props.token;
    return (
      <div className="App">
        <Header handleLogout={this.handleLogout} />
        {isLoggedIn && <Dashboard />}
        {!isLoggedIn && <Login handleLogin={this.handleLogin} />
        }
      </div>
    );
  }
}

function mapStateToProps(state) {
  let { token, isFetching, error, user } = state;

  return {
    token,
    isFetching,
    error,
    user: user,
  }
}

export default connect(mapStateToProps)(App);
