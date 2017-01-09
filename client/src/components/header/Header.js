import React, { Component } from 'react';
import ApiUtils from '../../utils/ApiUtils';
import './Header.css';

class Header extends Component {
    constructor() {
        super();
        this.state = {
            user: {
                id: null,
                username: null,
                first_name: null,
                last_name: null
            },
            accounts: [{
                account_number: null,
                cash: null,
                cash_available_for_withdrawal: null,
                uncleared_deposits: null,
                unsettled_funds: null,
                buying_power: null
            }],
            portfolio: {
                market_value: null,
                equity: null,
                extended_hours_market_value: null
            }
        };
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.user !== nextProps.user) { this.setState({ user: nextProps.user }); }
        if (this.props.accounts !== nextProps.accounts) { this.setState({ accounts: nextProps.accounts }); }
        if (this.props.portfolio !== nextProps.portfolio) { this.setState({ portfolio: nextProps.portfolio }); }
    }

    // componentDidMount() {
    //     this.getUser();
    // }

    // getUser = () => {
    //     let _this = this;
    //     let url = 'http://localhost:8080/api/headerInfo/';
    //     let settings = {
    //         method: 'GET'
    //     };

    //     ApiUtils.fetchResponse(url, settings)
    //         .then(json => {
    //             _this.setState({ user: json.user, accounts: json.accounts });
    //         })
    //         .catch(error => {
    //             let errors = ApiUtils.parseErrorStrings(error);
    //             _this.setState({ error: errors });
    //         });
    // }

    render() {
        return (
            <div className="App-header">
                <div className="header-cash">
                    <div className="row"><div>Cash:</div><div className="val">{this.state.accounts.cash}</div></div>
                    <div className="row">Cash Available For Withdrawal:<div className="val">{this.state.accounts.cash_available_for_withdrawal}</div></div>
                    <div className="row">Uncleared Deposits:<div className="val">{this.state.accounts.uncleared_deposits}</div></div>
                    <div className="row">Unsettled Funds:<div className="val">{this.state.accounts.unsettled_funds}</div></div>
                    <div className="row">Buying Power:<div className="val">{this.state.accounts.buying_power}</div></div>
                </div>
                <div className="header-name">
                    <h2>Welcome {this.state.user.name}</h2>
                    <a onClick={this.props.handleLogout}>Logout</a>
                </div>
                <div className="header-portfolio">
                    <div className="row">Market Value:<div className="val">{this.state.portfolio.market_value}</div></div>
                    <div className="row">Equity:<div className="val">{this.state.portfolio.equity}</div></div>
                    <div className="row">Extended Hours Market Value:<div className="val">{this.state.portfolio.extended_hours_market_value}</div></div>
                </div>
            </div>
        );
    }
}

export default Header;
