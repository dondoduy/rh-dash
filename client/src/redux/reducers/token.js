import defaultState from '../store/defaultState';
import { LOGIN_REQUESTED, LOGIN_SUCCESS, LOGIN_FAILURE } from '../actions/token';

const token = (state = defaultState.token, action) => {
    switch (action.type) {
        case LOGIN_REQUESTED:
        console.log(LOGIN_REQUESTED);
            return Object.assign({}, state, { token: null, isFetching: true, error: '' });
        case LOGIN_SUCCESS:
        console.log(LOGIN_SUCCESS);
            //let token = action.payload;
            localStorage.setItem('sessionToken', action.payload);
            return Object.assign({}, state, { token: action.payload, isFetching: false, error: '' });
        case LOGIN_FAILURE:
        console.log(LOGIN_FAILURE);
            localStorage.removeItem('sessionToken');
            return Object.assign({}, state, { token: null, isFetching: false, error: action.payload });
        default:
            return state;
    }
};

export default token;
