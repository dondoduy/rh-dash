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
        console.log('dispatching login requested');
        dispatch(loginRequested);

        let url = 'login';
        let settings = {
            method: 'POST',
            body: JSON.stringify(loginInfo),
        };

        return ApiUtils.fetchResponse(url, settings)
            .then(json => {
                console.log('dispatching login success, token: ' + json.token);
                localStorage.setItem('sessionToken', json.token);
                return dispatch(loginSuccess, json.token);
            })
            .catch(err => {
                console.log('dispatching login failure, error: ' + ApiUtils.parseErrorStrings(err));
                localStorage.removeItem('sessionToken');
                return dispatch(loginFailure, ApiUtils.parseErrorStrings(err));
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
        console.log('dispatching logout requested');
        dispatch(logoutRequested);

        let url = 'logout';
        let settings = { method: 'POST', };

        return ApiUtils.fetchResponse(url, settings)
            .then(json => {
                console.log('dispatching logout success');
                localStorage.removeItem('sessionToken');
                return dispatch(logoutSuccess);
            })
            .catch(err => {
                console.log('dispatching logout failure');
                localStorage.removeItem('sessionToken');
                return dispatch(logoutFailure, ApiUtils.parseErrorStrings(err));
            });
    };
}