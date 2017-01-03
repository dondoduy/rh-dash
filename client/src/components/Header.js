import React, { Component } from 'react';

class Header extends Component {
    render() {
        return (
            <div className="App-header">
                <div>
                    <h2>Welcome {this.state.user.name}</h2>
                </div>
                <div>
                    <h6>Logout</h6>
                </div>
            </div>
        );
    }
}

export default Header;
