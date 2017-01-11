import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as loginActions from '../../redux/actions/login';
import './index.css';

class Header extends Component {
    isLoggedIn = () => {
        return this.props.login && this.props.login.token;
    }

    handleLogout = () => {
        return this.props.dispatch(loginActions.logout());
    }

    renderUser = () => {
        if(!this.isLoggedIn()){
            return null;
        }

        return ( 
            <div className="header-name">
                <div className="row"><h3>Welcome {this.props.user.first_name}</h3></div>
                <div className="row"><div>Account #:</div><div className="val">{this.props.accounts[0].account_number}</div></div>
                <div className="row"><a onClick={this.handleLogout}>Logout</a></div>
            </div>
        );
    }

    renderAccounts = () => {
        if(!this.props.accounts || this.props.accounts.portfolioUrl){
            return null;
        }

        return (
            <div className="header-cash">
                <div className="row"><div>Cash:</div><div className="val">{this.props.accounts[0].cash}</div></div>
                <div className="row">Cash Available For Withdrawal:<div className="val">{this.props.accounts[0].cash_available_for_withdrawal}</div></div>
                <div className="row">Uncleared Deposits:<div className="val">{this.props.accounts[0].uncleared_deposits}</div></div>
                <div className="row">Unsettled Funds:<div className="val">{this.props.accounts[0].unsettled_funds}</div></div>
                <div className="row">Buying Power:<div className="val">{this.props.accounts[0].buying_power}</div></div>
            </div>
        );
    }

    renderPortfolio = () => {
        if(!this.props.portfolio || this.props.portfolio.length <= 0){
            return null;
        }

        return (
            <div className="header-portfolio">
                <div className="row">Market Value:<div className="val">{this.props.portfolio.market_value}</div></div>
                <div className="row">Equity:<div className="val">{this.props.portfolio.equity}</div></div>
                <div className="row">Extended Hours Market Value:<div className="val">{this.props.portfolio.extended_hours_market_value}</div></div>
            </div>
        );
    }

    render() {
        return (
            <div className="App-header">
                {this.isLoggedIn() && this.renderUser()}
                {this.isLoggedIn() && this.renderAccounts()}
                {this.isLoggedIn() && this.renderPortfolio()}
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        login: state.login,
        user: state.user,
        accounts: state.accounts,
        portfolio: state.portfolio,
    }
}

export default connect(mapStateToProps)(Header);