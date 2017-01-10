import React, { Component } from 'react';
import { connect } from 'react-redux';
import './App.css';
import Header from './components/header/header';
import Login from './components/Login';
import Dashboard from './components/Dashboard';

class App extends Component {
  render() {
    const isLoggedIn = this.props.login.token;
    return (
      <div className="App">
        <Header />
        {!isLoggedIn && <Login />}
        {isLoggedIn && <Dashboard />}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    login: state.login
  }
}

export default connect(mapStateToProps)(App);
