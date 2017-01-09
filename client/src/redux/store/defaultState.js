const defaultValues = () => {
  return {
    token: localStorage.getItem('sessionToken') || null,
    isFetching: false,
    error: '',
    user: {
      id: null,
      username: null,
      firstName: null,
      lastName: null,
    },
    accounts: [{
      accountNumber: null,
      cash: null,
      cashAvailableForWithdrawal: null,
      unclearedDeposits: null,
      unsettledFunds: null,
      buyingPower: null,
    }],
    portfolio: {
      marketValue: null,
      equity: null,
      extendedHoursMarketValue: null,
    },
  };
};

export default defaultValues();
