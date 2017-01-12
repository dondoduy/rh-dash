import defaultState from '../store/defaultState';
import * as userDataActions from '../actions/userData';
import { LOGOUT_REQUESTED } from '../actions/login';

const initialState = defaultState.userData;

const userData = (state = initialState, action) => {
    switch (action.type) {
        case userDataActions.FETCH_USERDATA_REQUESTED:
            return Object.assign({}, state, { isFetching: true, error: '' });
        case userDataActions.FETCH_USERDATA_SUCCESS:
            let selectedAccount = (action.payload.accounts.length >= 1) ? action.payload.accounts[0].account_number : null;
            return Object.assign({}, action.payload, { selectedAccount: selectedAccount, isFetching: false, error: '' });
        case userDataActions.FETCH_USERDATA_FAILURE:
            return Object.assign({}, state, { isFetching: false, error: action.payload });
        case userDataActions.CHANGE_ACCOUNT:
            return Object.assign({}, state, { selectedAccount: action.payload });
        case LOGOUT_REQUESTED:
            return initialState;
        default:
            return state;
    }
};

export default userData;
