import React, { Component } from 'react';
import $ from 'jquery';
import './App.css';
import Login from './components/Login';
import Dashboard from './components/Dashboard';

const apiBase = 'http://localhost:8080/api/';

class App extends Component {
  constructor() {
    super();
    this.state = {
      user: null,
      error: null
    };
  }

  handleLogin = (username, password) => {
    let _this = this;
    let url = apiBase + 'login';

    $.ajax({
      type: "POST",
      url: url,
      dataType: 'json',
      data: { username: username, password: password },
      complete: function (data) {
        if (data.status === 200) {
          let token = data.responseJSON.token;
          _this.setState({ user: { name: username, token: token }, error: null });
          localStorage.setItem("sessionToken", token);
          return;
        } else if (data.status === 400) {
          let errors = data.responseJSON.non_field_errors;
          _this.setState({ error: errors[0] });
          return;
        } else {
          _this.setState({ error: "login failed" });
        }
      },
      fail: function () {
        _this.setState({ error: "login failed" });
      }
    });
  };

  render() {
    return (
      <div className="App">
        {this.state.user &&
          <div className="App-header">
            <h2>Welcome {this.state.user.name} - {this.state.user.password}</h2>
          </div>
        }
        {this.state.user && <Dashboard />}
        {!this.state.user &&
          <Login handleClick={this.handleLogin} error={this.state.error} />
        }
      </div>
    );
  }
}

export default App;
