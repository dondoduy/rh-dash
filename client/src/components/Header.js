import React, { Component } from 'react';
import ApiUtils from '../utils/ApiUtils';

class Header extends Component {
    constructor(){
        super();
        this.state = {};
    }

    componentDidMount() {
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
        _this.setState({ user: { name: json.first_name + ' ' + json.last_name } });
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
            <div className="App-header">
                <div>
                    <h2>Welcome {this.state.user.name}</h2>
                </div>
                <div>
                    <h6 onClick={() => this.props.Logout}>Logout</h6>
                </div>
            </div>
        );
    }
}

export default Header;
