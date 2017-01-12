import { createAction } from 'redux-actions';
import ApiUtils from '../../utils/ApiUtils';
import * as accountDetailsActions from './accountDetails';

export const FETCH_USERDATA_REQUESTED = ' USERDATA_REQUESTED';
export const FETCH_USERDATA_SUCCESS = ' USERDATA_SUCCESS';
export const FETCH_USERDATA_FAILURE = ' USERDATA_FAILURE';
export const fetchUserDataRequested = createAction(FETCH_USERDATA_REQUESTED);
export const fetchUserDataSuccess = createAction(FETCH_USERDATA_SUCCESS);
export const fetchUserDataFailure = createAction(FETCH_USERDATA_FAILURE);
export function getUserData() {
    return dispatch => {
        dispatch(fetchUserDataRequested());

        let url = 'userData';
        let settings = {
            method: 'GET',
        };

        return ApiUtils.fetchResponse(url, settings, dispatch)
            .then(json => {
                return dispatch(fetchUserDataSuccess(json));
            })
            .catch(err => {
                return dispatch(fetchUserDataFailure(err));
            });
    };
}

export const CHANGE_ACCOUNT = ' CHANGE_ACCOUNT';
export const changeAccount = createAction(CHANGE_ACCOUNT);
export function selectNewAccount(account_number) {
    return dispatch => {
        if (!account_number) { return; }
        dispatch(changeAccount(account_number));
        dispatch(accountDetailsActions.getAccountDetails(account_number));
    }
}
