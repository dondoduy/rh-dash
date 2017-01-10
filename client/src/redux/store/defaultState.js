const defaultState = () => {
  return {
    login: {
      token: localStorage.getItem('sessionToken') || null,
      isFetching: false,
      error: '',
    },
    user: {
      id: null,
      username: null,
      first_name: null,
      last_name: null,
      isFetching: false,
      error: '',
    },
    accounts: [{
      accountNumber: null,
      cash: null,
      cashAvailableForWithdrawal: null,
      unclearedDeposits: null,
      unsettledFunds: null,
      buyingPower: null,
      isFetching: false,
      error: '',
    }],
    portfolio: {
      portfolioUrl: null,
      positionsUrl: null,
      marketValue: null,
      equity: null,
      extendedHoursMarketValue: null,
      isFetching: false,
      error: '',
    },
  };
};

export default defaultState();
