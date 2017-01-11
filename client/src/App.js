import React, { Component } from 'react';
import { connect } from 'react-redux';
import './App.css';
import * as userActions from './redux/actions/user';
import * as accountsActions from './redux/actions/accounts';
import Header from './components/header/header';
import Login from './components/Login';
import Dashboard from './components/Dashboard';

class App extends Component {
  componentWillReceiveProps(newProps) {
    if (newProps.login.token && newProps.login.token !== this.props.login.token) {
      this.getUserInfo();
    }
  }

  componentDidMount() {
    if (this.props.login.token) {
      this.getUserInfo();
    }
  }

  getUserInfo = () => {
    this.props.dispatch(userActions.getUser());
    this.props.dispatch(accountsActions.getAccounts());
  }

  refreshData = () => {
  }

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
