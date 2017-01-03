import React, { Component } from 'react';
import './App.css';
import ApiUtils from './utils/ApiUtils';
import Login from './components/Login';
import Header from './components/Header';
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
    this.setState({ user: { name: user.name }, error: null });
    localStorage.setItem("sessionToken", token);
    this.forceUpdate();
    return;
  }

  handleLogout = () => {
    let _this = this;
    let url = 'http://localhost:8080/api/logout/';
    let settings = {
      method: 'POST'
    };

    return ApiUtils.fetchResponse(url, settings)
      .then(json => {
        _this.setState({ user: null, error: null });
        localStorage.removeItem("sessionToken");
      })
      .catch(error => {
        var key;
        let errors = '';
        for (key in error) {
          if (error.hasOwnProperty(key)) {
            errors = errors + key + ' = ' + error[key];
          }
        }
        _this.setState({ error: errors });
      });

  }


  render() {
    return (
      <div className="App">
        {this.state.user &&
          <Header logout={this.handleLogout} />
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
