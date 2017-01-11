import React, { Component } from 'react';
import { connect } from 'react-redux';
import './App.css';
import * as userActions from './redux/actions/user';
import Header from './components/header/header';
import Login from './components/Login';
import Dashboard from './components/Dashboard';

class App extends Component {

  componentDidMount(){
    if(this.props.login.token){
      this.props.dispatch(userActions.getUser());
    }
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
