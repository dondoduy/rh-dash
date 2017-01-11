import defaultState from '../store/defaultState';
import * as loginActions from '../actions/login';

const login = (state = defaultState.login, action) => {
    switch (action.type) {
        case loginActions.LOGIN_REQUESTED:
            return Object.assign({}, state, { token: null, isFetching: true, error: '' });
        case loginActions.LOGIN_SUCCESS:
            return Object.assign({}, state, { token: action.payload, isFetching: false, error: '' });
        case loginActions.LOGIN_FAILURE:
            return Object.assign({}, state, { token: null, isFetching: false, error: action.payload });
        
        case loginActions.LOGOUT_REQUESTED:
            return Object.assign({}, state, { token: null, isFetching: true, error: '' });
        case loginActions.LOGOUT_SUCCESS:
            return Object.assign({}, state, { token: null, isFetching: false, error: '' });
        case loginActions.LOGOUT_FAILURE:
            return Object.assign({}, state, { token: null, isFetching: false, error: action.payload });
        
        default:
            return state;
    }
};

export default login;
