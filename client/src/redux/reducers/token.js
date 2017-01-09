import defaultState from '../store/defaultState';
import { LOGIN_REQUESTED, LOGIN_SUCCESS, LOGIN_FAILURE } from '../actions/token';

const token = (state = defaultState.token, action) => {
    switch (action.type) {
        case LOGIN_REQUESTED:
            return Object.assign({}, state, { token: null, isFetching: true, error: '' });
        case LOGIN_SUCCESS:
            let token = action.payload;
            localStorage.setItem('sessionToken', token);
            return Object.assign({}, state, { token: token, isFetching: false, error: '' });
        case LOGIN_FAILURE:
            localStorage.removeItem('sessionToken');
            return Object.assign({}, state, { token: null, isFetching: false, error: action.payload });
        default:
            return state;
    }
};

export default token;
