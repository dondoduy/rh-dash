import defaultState from '../store/defaultState';
import * as userActions from '../actions/user';

const user = (state = defaultState.user, action) => {
    switch (action.type) {
        case userActions.FETCH_USER_REQUESTED:
            return Object.assign({}, state, { isFetching: true, error: '' });
        case userActions.FETCH_USER_SUCCESS:
            return Object.assign({}, action.payload, { isFetching: false, error: '' });
        case userActions.FETCH_USER_FAILURE:
            return Object.assign({}, state, { isFetching: false, error: action.payload });
       default:
            return state;
    }
};

export default user;
