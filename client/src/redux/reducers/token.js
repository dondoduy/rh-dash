import defaultState from '../store/defaultState';
import * as tokenActions from '../actions/token';

const token = (state = defaultState.token, action) => {
    switch (action.type) {
        case tokenActions.LOGIN_REQUESTED:
            console.log(tokenActions.LOGIN_REQUESTED);
            return Object.assign({}, state, { token: null });
        case tokenActions.LOGIN_SUCCESS:
            console.log(tokenActions.LOGIN_SUCCESS);
            return Object.assign({}, state, { token: action.payload });
        case tokenActions.LOGIN_FAILURE:
            console.log(tokenActions.LOGIN_FAILURE);
            return Object.assign({}, state, { token: null });
        case tokenActions.LOGOUT_REQUESTED:
            console.log(tokenActions.LOGOUT_REQUESTED);
            return Object.assign({}, state, { token: null });
        case tokenActions.LOGOUT_SUCCESS:
            console.log(tokenActions.LOGOUT_SUCCESS);
            return Object.assign({}, state, { token: null });
        case tokenActions.LOGOUT_FAILURE:
            console.log(tokenActions.LOGOUT_FAILURE);
            return Object.assign({}, state, { token: null });
        default:
            console.log('returning default state. action.type=' + action.type);
            return state;
    }
};

export default token;
