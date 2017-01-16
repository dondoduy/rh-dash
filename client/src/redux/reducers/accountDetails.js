import defaultState from '../store/defaultState';
import * as accountDetailsActions from '../actions/accountDetails';
import { LOGOUT_REQUESTED } from '../actions/login';

const initialState = defaultState.accountDetails;

const accountDetails = (state = initialState, action) => {
    switch (action.type) {
        
        case accountDetailsActions.FETCH_ACCOUNTDETAILS_REQUESTED:
            return Object.assign({}, state, { isFetching: true, error: '' });

        case accountDetailsActions.FETCH_ACCOUNTDETAILS_SUCCESS:
            return Object.assign({}, action.payload, { isFetching: false, error: '' });

        case accountDetailsActions.FETCH_ACCOUNTDETAILS_FAILURE:
            return Object.assign({}, state, { isFetching: false, error: action.payload });

        case LOGOUT_REQUESTED:
            return initialState;

        default:
            return state;
    }
};

export default accountDetails;
