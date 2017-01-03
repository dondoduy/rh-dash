import React, { Component } from 'react';

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: ''
        }
    }

    handleUsernameChange = (e) => {
        this.setState({ username: e.target.value });
    }

    handlePasswordChange = (e) => {
        this.setState({ password: e.target.value });
    }

    render() {
        return (
            <div className="Login">
                Username:
        <input type="text" onChange={this.handleUsernameChange} value={this.state.username}/>
                Password:
        <input type="password" onChange={this.handlePasswordChange} value={this.state.password}/>
                <button onClick={() => this.props.handleClick(this.state.username, this.state.password)}>Login</button>
            {this.props.error}
            </div>
        );
    }
}

export default Login;
