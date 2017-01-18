import React, { Component } from 'react';
import { connect } from 'react-redux';
import './App.css';
import * as userDataActions from './redux/actions/userData';
import * as accountDetailsActions from './redux/actions/accountDetails';
import Header from './components/header/header';
import Login from './components/login/login';
import Dashboard from './components/dashboard/dashboard';
import defaultState from './redux/store/defaultState';

class App extends Component {
    constructor(props){
        super(props);
        this.state = defaultState;
    }

  // try to fetch user data on initial load if an existing token is still in localStorage
  componentDidMount() {
    if (this.props.login.token) {
      this.props.dispatch(userDataActions.getUserData());
    }
  }

  // fetch user data after login
  componentWillReceiveProps(newProps) {
    if (newProps.login.token && newProps.login.token !== this.props.login.token) {
      this.props.dispatch(userDataActions.getUserData());
    }
  }

  // update all portfolio and position data
  refreshData = () => {
    let account_number = this.props.userData.selectedAccount;
    if(!account_number) { return; }

    this.props.dispatch(accountDetailsActions.getAccountDetails(account_number));
  }

  render() {
    const isLoggedIn = this.props.login.token;
    return (
      <div className="App">
        <Header />
        {!isLoggedIn && <Login />}
        {isLoggedIn && <Dashboard accountDetails={this.props.accountDetails}/>}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    login: state.login,
    userData: state.userData,
    accountDetails: state.accountDetails,
  }
}

export default connect(mapStateToProps)(App);
