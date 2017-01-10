import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as loginActions from '../redux/actions/login';

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }

    handleClick = () => {
        let loginInfo = {
            username: this.uname.value,
            password: this.pword.value
        };

        return this.props.dispatch(loginActions.login(loginInfo));
    }


    render() {
        return (
            <div className="Login">
                Username:
        <input type="text" ref={(uname) => (this.uname = uname)} />
                Password:
        <input type="password" ref={(pword) => (this.pword = pword)} />
                <button onClick={this.handleClick}>Login</button>
                <br />
                {this.state.error}
            </div>
        );
    }
}

function mapStateToProps(state) {
    let { login } = state;

    return {
        login,
    }
}

export default connect(mapStateToProps)(Login);
