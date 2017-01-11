import defaultState from '../store/defaultState';
import * as accountsActions from '../actions/accounts';
import { LOGOUT_REQUESTED } from '../actions/login';

const initialState = defaultState.accounts;

const accounts = (state = initialState, action) => {
    switch (action.type) {
        case accountsActions.FETCH_ACCOUNTS_REQUESTED:
            return Object.assign({}, state, { isFetching: true, error: '' });
        case accountsActions.FETCH_ACCOUNTS_SUCCESS:
            return Object.assign({}, action.payload.results, { isFetching: false, error: '' });
        case accountsActions.FETCH_ACCOUNTS_FAILURE:
            return Object.assign({}, state, { isFetching: false, error: action.payload });
        case LOGOUT_REQUESTED:
            return initialState;
        default:
            return state;
    }
};

export default accounts;
