import React, { Component } from 'react';
import ApiUtils from '../utils/ApiUtils';

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            error: null
        }
    }

    handleClick = (e) => {
        let _this = this;
        let username = this.refs.uname.value;
        let password = this.refs.pword.value;
        let url = 'http://localhost:8080/api/login/';
        let settings = {
            method: 'POST',
            headers: new Headers({
                'Content-Type': 'application/json'
            }),
            body: JSON.stringify({ username: username, password: password })
        };

        ApiUtils.fetchResponse(url, settings)
            .then(json => {
                this.props.handleLogin({ name: username }, json.token);
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
            <div className="Login">
                Username:
        <input type="text" ref="uname" />
                Password:
        <input type="password" ref="pword" />
                <button onClick={this.handleClick}>Login</button>
                {this.state.error}
            </div>
        );
    }
}

export default Login;
