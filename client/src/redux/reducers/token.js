import defaultState from '../store/defaultState';
import * as tokenActions from '../actions/token';

const token = (state = defaultState, action) => {
    switch (action.type) {
        case tokenActions.LOGIN_REQUESTED:
            console.log(tokenActions.LOGIN_REQUESTED);
            return Object.assign({}, state, { token: null, isFetching: true, error: '' });
        case tokenActions.LOGIN_SUCCESS:
            console.log(tokenActions.LOGIN_SUCCESS);
            return Object.assign({}, state, { token: action.payload, isFetching: false, error: '' });
        case tokenActions.LOGIN_FAILURE:
            console.log(tokenActions.LOGIN_FAILURE);
            return Object.assign({}, state, { token: null, isFetching: false, error: action.payload });
        case tokenActions.LOGOUT_REQUESTED:
            console.log(tokenActions.LOGOUT_REQUESTED);
            return Object.assign({}, state, { isFetching: true, error: '' });
        case tokenActions.LOGOUT_SUCCESS:
            console.log(tokenActions.LOGOUT_SUCCESS);
            return Object.assign({}, state, { token: null, isFetching: false, error: '' });
        case tokenActions.LOGOUT_FAILURE:
            console.log(tokenActions.LOGOUT_FAILURE);
            return Object.assign({}, state, { token: null, isFetching: false, error: action.payload });
        default:
            console.log(tokenActions.LOGIN_FAILURE);
            console.log('returning default state. action.type=' + action.type);
            return state;
    }
};

export default token;
