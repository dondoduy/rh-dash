import { createAction } from 'redux-actions';
import ApiUtils from '../../utils/ApiUtils';

export const FETCH_QUOTES_REQUESTED = ' QUOTES_REQUESTED';
export const FETCH_QUOTES_SUCCESS = ' QUOTES_SUCCESS';
export const FETCH_QUOTES_FAILURE = ' QUOTES_FAILURE';
export const fetchQuotesRequested = createAction(FETCH_QUOTES_REQUESTED);
export const fetchQuotesSuccess = createAction(FETCH_QUOTES_SUCCESS);
export const fetchQuotesFailure = createAction(FETCH_QUOTES_FAILURE);
export function getQuotes(instruments) {
    return dispatch => {
        dispatch(fetchQuotesRequested());

        let symbols = instruments.map(inst => {
            return inst.symbol;
        }).join(',');

        let url = `quotes?symbols=${symbols}`;
        let settings = {
            method: 'GET'
        };

        return ApiUtils.fetchResponse(url, settings, dispatch)
            .then(json => {
                dispatch(fetchQuotesSuccess(json.results));
            })
            .catch(err => {
                return dispatch(fetchQuotesFailure(err));
            });
    };
}
