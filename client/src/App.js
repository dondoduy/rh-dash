import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as tokenActions from './redux/actions/token';
import './App.css';
import ApiUtils from './utils/ApiUtils';
import Header from './components/Header';
import Login from './components/Login';
import Dashboard from './components/Dashboard';

class App extends Component {

  handleLogin = (user, token) => {
    localStorage.setItem("sessionToken", token);
    this.props.dispatch(tokenActions.loginRequested);
    //this.setState({ user: { name: user.name }, error: null });
  }

  handleLogout = () => {
    localStorage.removeItem("sessionToken");

    let _this = this;
    let url = 'http://localhost:8080/api/logout/';
    let settings = {
      method: 'POST'
    };
    return ApiUtils.fetchResponse(url, settings)
      .then(json => {
        _this.setState({ user: null, error: null });
      })
      .catch(error => {
        let errors = ApiUtils.parseErrorStrings(error);
        _this.setState({ user: null, error: errors });
      });

  }

  render() {
    return (
      <div className="App">
        <Header handleLogout={this.handleLogout} />
        {this.props.token && <Dashboard />}
        {this.props.token !== '' &&
          <Login handleLogin={this.handleLogin} />
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
