import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as tokenActions from '../redux/actions/token';

class Header extends Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }

    handleLogoutClick = () => {
        return this.props.dispatch(tokenActions.logout());
    }

    render() {
        return (
            <div className="App-header">
                <div>
                    <h2>Welcome</h2>
                </div>
                <div>
                    <a onClick={this.handleLogoutClick}>Logout</a>
                </div>
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

export default connect(mapStateToProps)(Header);