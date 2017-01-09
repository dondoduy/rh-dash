import React, { Component } from 'react';
import ApiUtils from '../utils/ApiUtils';

class Header extends Component {
    constructor() {
        super();
        this.state = {
            user: {
                name: 'test'
            }
        };
    }

    componentDidMount() {
        if (this.props.token) {
            this.getUser();
        }
    }

    getUser = () => {
        let _this = this;
        let url = 'http://localhost:8080/api/user/';
        let settings = {
            method: 'GET'
        };

        ApiUtils.fetchResponse(url, settings)
            .then(json => {
                _this.setState({ user: { name: json.first_name + ' ' + json.last_name } });
            })
            .catch(error => {
                let errors = ApiUtils.parseErrorStrings(error);
                _this.setState({ error: errors });
            });
    }



    render() {
        return (
            <div className="App-header">
                <div>
                    <h2>Welcome</h2>
                </div>
                <div>
                    <a onClick={this.props.handleLogout}>Logout</a>
                </div>
            </div>
        );
    }
}

export default Header;