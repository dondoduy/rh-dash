const defaultState = () => {
  return {
    login: {
      token: localStorage.getItem('sessionToken') || null,
      isFetching: false,
      error: '',
    },
    userData: {
      user: {
        id: null,
        username: null,
        first_name: null,
        last_name: null,
      },
      accounts: [{
        account_number: null,
      }],
      selectedAccount: null,
      isFetching: false,
      error: '',
    },
    accountDetails: {
      account: {
        account_number: null,
        cash: null,
        cash_available_for_withdrawal: null,
        uncleared_deposits: null,
        unsettled_funds: null,
        buying_power: null,
      },
      portfolio: {
        excess_maintenance_with_uncleared_deposits: null,
        excess_maintenance: null,
        market_value: null,
        withdrawable_amount: null,
        last_core_market_value: null,
        unwithdrawable_deposits: null,
        extended_hours_equity: null,
        excess_margin: null,
        excess_margin_with_uncleared_deposits: null,
        equity: null,
        last_core_equity: null,
        adjusted_equity_previous_close: null,
        equity_previous_close: null,
        start_date: null,
        extended_hours_market_value: null,
      },
      positions: [{
        account: null,
        intraday_quantity: null,
        intraday_average_buy_price: null,
        url: null,
        created_at: null,
        updated_at: null,
        shares_held_for_buys: null,
        average_buy_price: null,
        instrument: null,
        shares_held_for_sells: null,
        quantity: null,
      }],
      isFetching: false,
      error: '',
    },
  };
};

export default defaultState();
