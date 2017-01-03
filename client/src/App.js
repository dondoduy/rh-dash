import React, { Component } from 'react';
import './App.css';
import ApiUtils from './utils/ApiUtils';
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
    this.setState({ user: { name: user.name }, error: null });
    localStorage.setItem("sessionToken", token);
    this.getUser();
  }

    getUser = () => {
        let _this = this;
        let url = 'http://localhost:8080/api/user/';
        let settings = {
            method: 'GET'
        };

        ApiUtils.fetchResponse(url, settings)
            .then(json => {
                _this.setState({user: {name: json.first_name}});
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
          <div className="App-header">
            <h2>Welcome {this.state.user.name} - {this.state.user.password}</h2>
          </div>
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
