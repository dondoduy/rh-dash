import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as tokenActions from '../redux/actions/token';

class Header extends Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }

    // componentDidMount() {
    //     if (this.props.token) {
    //         this.getUser();
    //     }
    // }

    // getUser = () => {
    //     let _this = this;
    //     let url = 'http://localhost:8080/api/user/';
    //     let settings = {
    //         method: 'GET'
    //     };

    //     ApiUtils.fetchResponse(url, settings)
    //         .then(json => {
    //             _this.setState({ user: { name: json.first_name + ' ' + json.last_name } });
    //         })
    //         .catch(error => {
    //             let errors = ApiUtils.parseErrorStrings(error);
    //             _this.setState({ error: errors });
    //         });
    // }

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