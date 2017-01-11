import { createAction } from 'redux-actions';
import ApiUtils from '../../utils/ApiUtils';

export const FETCH_ACCOUNTS_REQUESTED = 'ACCOUNTS_REQUESTED';
export const FETCH_ACCOUNTS_SUCCESS = 'ACCOUNTS_SUCCESS';
export const FETCH_ACCOUNTS_FAILURE = 'ACCOUNTS_FAILURE';
export const fetchAccountsRequested = createAction(FETCH_ACCOUNTS_REQUESTED);
export const fetchAccountsSuccess = createAction(FETCH_ACCOUNTS_SUCCESS);
export const fetchAccountsFailure = createAction(FETCH_ACCOUNTS_FAILURE);

export function getAccounts() {
    return dispatch => {
        dispatch(fetchAccountsRequested());

        let url = 'accounts';
        let settings = {
            method: 'GET',
        };

        return ApiUtils.fetchResponse(url, settings, dispatch)
            .then(json => {
               return dispatch(fetchAccountsSuccess(json));
            })
            .catch(err => {
                return dispatch(fetchAccountsFailure(err));
            });
    };
}
