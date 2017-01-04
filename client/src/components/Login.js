import React, { Component } from 'react';
import ApiUtils from '../utils/ApiUtils';

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            fname: 'none',
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
            body: JSON.stringify({ username: username, password: password })
        };

        ApiUtils.fetchResponse(url, settings)
            .then(json => {
                _this.props.handleLogin({ name: username }, json.token);
            })
            .catch(error => {
                let errors = ApiUtils.parseErrorStrings(error);
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
                {this.state.error} - {this.state.fname}
            </div>
        );
    }
}

export default Login;
