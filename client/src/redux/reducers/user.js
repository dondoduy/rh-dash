import defaultState from '../store/defaultState';
import * as userActions from '../actions/user';
import { LOGOUT_REQUESTED } from '../actions/login';

const initialState = defaultState.user;

const user = (state = initialState, action) => {
    switch (action.type) {
        case userActions.FETCH_USER_REQUESTED:
            return Object.assign({}, state, { isFetching: true, error: '' });
        case userActions.FETCH_USER_SUCCESS:
            return Object.assign({}, action.payload, { isFetching: false, error: '' });
        case userActions.FETCH_USER_FAILURE:
            return Object.assign({}, state, { isFetching: false, error: action.payload });
        case LOGOUT_REQUESTED:
            return initialState;
        default:
            return state;
    }
};

export default user;
