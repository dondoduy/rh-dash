import React, { Component } from 'react';
import './App.css';
import ApiUtils from './utils/ApiUtils';
import Header from './components/header/Header';
import Login from './components/Login';
import Dashboard from './components/Dashboard';

class App extends Component {
  constructor() {
    super();
    this.state = {
      token: null,
      user: null,
      accounts: null,
      portfolio: null,
      error: null
    };
  }

  handleLogin = (token) => {
    //localStorage.setItem("sessionToken", token);
    this.setState({ token: token, error: null });
    this.getUserInfo();
  }

  getUserInfo = () => {
    let _this = this;
    let url = 'http://localhost:8080/api/userInfo/';
    let settings = {
      method: 'GET'
    };

    ApiUtils.fetchResponse(url, settings)
      .then(json => {
        _this.setState({ user: json.user, accounts: json.accounts });
      })
      .catch(error => {
        let errors = ApiUtils.parseErrorStrings(error);
        _this.setState({ error: errors });
      });
  }

  getPortfolioInfo = () => {
    let accountId = this.state.accounts.account_number;
    if(!accountId) { return; }

    let _this = this;
    let url = 'http://localhost:8080/api/portfolio/';
    let settings = {
      method: 'GET',
      headers: new Headers({'accountId': accountId})
    };

    ApiUtils.fetchResponse(url, settings)
      .then(json => {
        _this.setState({ portfolio: json.portfolio });
      })
      .catch(error => {
        let errors = ApiUtils.parseErrorStrings(error);
        _this.setState({ error: errors });
      });

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
        {this.state.user &&
          <Header handleLogout={this.handleLogout} user={this.state.user} accounts={this.state.accounts} portfolio={this.state.portfolio}/>
        }
        {!this.state.user && <Header handleLogout={this.handleLogout} />}
        {this.state.user && <Dashboard />}
        {!this.state.user &&
          <Login handleLogin={this.handleLogin} />
        }
      </div>
    );
  }
}

export default App;
