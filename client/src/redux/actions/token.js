import { createAction } from 'redux-actions';
import ApiUtils from '../../utils/ApiUtils';

export const LOGIN_REQUESTED = 'LOGIN_REQUESTED';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILURE = 'LOGIN_FAILURE';
export const loginRequested = createAction(LOGIN_REQUESTED);
export const loginSuccess = createAction(LOGIN_SUCCESS);
export const loginFailure = createAction(LOGIN_FAILURE);

export function login(loginInfo) {
    return dispatch => {
        dispatch(loginRequested);

        let url = 'login/';
        let settings = {
            method: 'POST',
            body: JSON.stringify(loginInfo),
        };

        ApiUtils.fetchResponse(url, settings)
            .then(json => {
                dispatch(loginSuccess, json.token);
            })
            .catch(err => {
                dispatch(loginFailure, ApiUtils.parseErrorStrings(err));
            });
    };
}

export const LOGOUT_REQUESTED = 'LOGOUT_REQUESTED';
export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS';
export const LOGOUT_FAILURE = 'LOGOUT_FAILURE';
export const logoutRequested = createAction(LOGOUT_REQUESTED);
export const logoutSuccess = createAction(LOGOUT_SUCCESS);
export const logoutFailure = createAction(LOGOUT_FAILURE);

export function logout() {
    return dispatch => {
        dispatch(logoutRequested);

        let url = 'logout/';
        let settings = {
            method: 'POST',
        };

        ApiUtils.fetchResponse(url, settings)
            .then(json => {
                dispatch(logoutSuccess);
            })
            .catch(err => {
                dispatch(logoutFailure, ApiUtils.parseErrorStrings(err));
            });
    };
}