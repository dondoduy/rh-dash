import React, { Component } from 'react';
import './App.css';
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
