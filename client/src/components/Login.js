import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as tokenActions from '../redux/actions/token';

class Login extends Component {
    constructor(props){
        super(props);
        this.state = {
        }
    }
    handleClick = () => {
        let loginInfo = {
            username: this.refs.uname.value,
            password: this.refs.pword.value
        };

        return this.props.dispatch(tokenActions.login(loginInfo));
    }

    render() {
        return (
            <div className="Login">
                Username:
        <input type="text" ref="uname" />
                Password:
        <input type="password" ref="pword" />
                <button onClick={this.handleClick}>Login</button>
                <br />
                {this.state.error}
            </div>
        );
    }
}

function mapStateToProps(state) {
    let { token, isFetching, error, user } = state;

    return {
        token,
        isFetching,
        error,
        user: user,
    }
}

export default connect(mapStateToProps)(Login);
