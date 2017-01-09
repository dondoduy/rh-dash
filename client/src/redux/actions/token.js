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

    let url = `${process.env.API_BASE}/login/`;
    let settings = {
      method: 'POST',
      body: JSON.stringify({ username: loginInfo.username, password: loginInfo.password }),
    };

    ApiUtils.fetchResponse(url, settings)
      .then(json => {
        dispatch(loginSuccess, json.token);
      })
      .catch(err => {
        dispatch(loginFailure, ApiUtils.parseErrorStrings(err));
      });
  };


// export const loginRequested = (loginInfo) => {
//     console.log(LOGIN_REQUESTED);
//     return {
//         type: LOGIN_REQUESTED,
//         loginInfo
//     };
// };
// export const loginSuccess = (token) => {
//     console.log(LOGIN_SUCCESS);
//     localStorage.setItem('sessionToken', token);
//     return {
//         type: LOGIN_SUCCESS,
//         token
//     };
// };
// export const loginFailure = (error) => {
//     console.log(LOGIN_FAILURE);
//     return {
//         type: LOGIN_FAILURE,
//         error
//     };
// };

}
