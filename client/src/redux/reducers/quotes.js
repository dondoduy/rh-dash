import defaultState from '../store/defaultState';
import * as quoteActions from '../actions/quotes';
import { LOGOUT_REQUESTED } from '../actions/login';

const initialState = defaultState.quotes;

const quotes = (state = initialState, action) => {
    switch (action.type) {
        
        case quoteActions.FETCH_QUOTES_REQUESTED:
            return Object.assign({}, state, { isFetching: true, error: '' });

        case quoteActions.FETCH_QUOTES_SUCCESS:
            return Object.assign({}, state, action.payload, { isFetching: false, error: '' });

        case quoteActions.FETCH_QUOTES_FAILURE:
            return Object.assign({}, state, { isFetching: false, error: action.payload });

        case LOGOUT_REQUESTED:
            return initialState;

        default:
            return state;
    }
};

export default quotes;
