import React, { Component } from 'react';
import './App.css';
import ApiUtils from './utils/ApiUtils';
import Header from './components/Header';
import Login from './components/Login';
import Dashboard from './components/Dashboard';

class App extends Component {
  constructor() {
    super();
    this.state = {
      user: null,
      error: null
    };
  }

  handleLogin = (user, token) => {
    localStorage.setItem("sessionToken", token);
    this.setState({ user: { name: user.name }, error: null });
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
          <Header handleLogout={this.handleLogout} />
        }
        {this.state.user && <Dashboard />}
        {!this.state.user &&
          <Login handleLogin={this.handleLogin} />
        }
      </div>
    );
  }
}

export default App;
