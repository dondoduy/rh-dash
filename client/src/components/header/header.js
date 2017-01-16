import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as loginActions from '../../redux/actions/login';
import * as userDataActions from '../../redux/actions/userData';
import * as accountDetailsActions from '../../redux/actions/accountDetails';
import defaultState from '../../redux/store/defaultState';
import dollar from '../../utils/dollar';
import './index.css';

class Header extends Component {
    constructor(props) {
        super(props);
        this.state = defaultState;
    }

    componentWillReceiveProps(newProps) {
        if (newProps.userData.selectedAccount && newProps.userData.selectedAccount !== this.props.userData.selectedAccount) {
            this.props.dispatch(accountDetailsActions.getAccountDetails(newProps.userData.selectedAccount));
        }
    }

    isLoggedIn = () => {
        return this.props.login && this.props.login.token;
    }

    handleAccountChange = (e) => {
        this.props.dispatch(userDataActions.changeAccount(e.target.value));
    }

    handleLogout = () => {
        return this.props.dispatch(loginActions.logout());
    }

    renderUserDetails = () => {
        if (!this.isLoggedIn()) { return null; }
        if (!this.props.userData || !this.props.userData.accounts || this.props.userData.accounts.length <= 0) { return null; }
        let selectedAccount = this.props.userData.selectedAccount ? this.props.userData.selectedAccount : '';
        return (
            <div className="header-user">
                <div className="row end">
                    <h3 className="max">Welcome {this.props.userData.user.first_name}</h3>
                    <a className="max" onClick={this.handleLogout}>Logout</a>
                </div>
                <div className="row end">
                    <div className="max">Select Account:</div>
                    <div className="max">
                        <select value={selectedAccount} onChange={this.handleAccountChange}>
                            {this.props.userData.accounts.map(acct => {
                                return <option key={acct.account_number}>{acct.account_number}</option>
                            })}
                        </select>
                    </div>
                </div>
            </div>
        );
    }

    renderAccountDetails = () => {
        if (!this.props.accountDetails || !this.props.accountDetails.account) {
            return null;
        }

        //TODO: ADD FETCHING SPINNER

        return (
            <div className="header-cash">
                <div className="row end"><div>Cash:</div><div className="val">{dollar(this.props.accountDetails.account.cash)}</div></div>
                <div className="row end">Available For Withdrawal:<div className="val">{dollar(this.props.accountDetails.account.cash_available_for_withdrawal)}</div></div>
                <div className="row end">Uncleared Deposits:<div className="val">{dollar(this.props.accountDetails.account.uncleared_deposits)}</div></div>
                <div className="row end">Unsettled Funds:<div className="val">{dollar(this.props.accountDetails.account.unsettled_funds)}</div></div>
                <div className="row end">Buying Power:<div className="val">{dollar(this.props.accountDetails.account.buying_power)}</div></div>
            </div>
        );
    }

    renderPortfolioDetails = () => {
        if (!this.props.accountDetails.portfolio) {
            return null;
        }

        //TODO: ADD FETCHING SPINNER

        return (
            <div className="header-portfolio">
                <div className="row center">
                    <h1>{dollar(this.props.accountDetails.portfolio.equity)}</h1>
                </div>
                <div className="row space-around">
                    <div className="no-wrap">
                        Stocks: {dollar(this.props.accountDetails.portfolio.market_value)}
                    </div>
                    <div className="no-wrap">
                        Cash: {dollar(this.props.accountDetails.account.cash)}
                    </div>
                </div>
            </div>
        );
    }

    render() {
        return (
            <div className="App-header">
                {this.isLoggedIn() && this.renderUserDetails()}
                {this.isLoggedIn() && this.renderPortfolioDetails()}
                {this.isLoggedIn() && this.renderAccountDetails()}
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        login: state.login,
        userData: state.userData,
        accountDetails: state.accountDetails,
    }
}

export default connect(mapStateToProps)(Header);