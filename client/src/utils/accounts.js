export function getSelectedAccount(accountsList, selectedAccountNumber) {
    if (!accountsList || accountsList.length <= 0 || !selectedAccountNumber) { return null; }

    let account = accountsList.filter(function(acct){
        return acct.account_number === selectedAccountNumber;
    })[0];

    return account;
}