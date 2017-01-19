import defaultState from '../store/defaultState';
import * as instrumentActions from '../actions/instruments';
import { LOGOUT_REQUESTED } from '../actions/login';

const initialState = defaultState.instruments;

const instruments = (state = initialState, action) => {
    switch (action.type) {
        
        case instrumentActions.FETCH_INSTRUMENTS_REQUESTED:
            return Object.assign({}, state, { isFetching: true, error: '' });

        case instrumentActions.FETCH_INSTRUMENTS_SUCCESS:
            return Object.assign({}, action.payload, { isFetching: false, error: '' });

        case instrumentActions.FETCH_INSTRUMENTS_FAILURE:
            return Object.assign({}, state, { isFetching: false, error: action.payload });

        case LOGOUT_REQUESTED:
            return initialState;

        default:
            return state;
    }
};

export default instruments;
