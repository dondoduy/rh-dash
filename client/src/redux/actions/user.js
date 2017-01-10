import { createAction } from 'redux-actions';
import ApiUtils from '../../utils/ApiUtils';

export const FETCH_USER_REQUESTED = 'USER_REQUESTED';
export const FETCH_USER_SUCCESS = 'USER_SUCCESS';
export const FETCH_USER_FAILURE = 'USER_FAILURE';
export const fetchUserRequested = createAction(FETCH_USER_REQUESTED);
export const fetchUserSuccess = createAction(FETCH_USER_SUCCESS);
export const fetchUserFailure = createAction(FETCH_USER_FAILURE);

export function getUser() {
    return dispatch => {
        dispatch(fetchUserRequested());

        let url = 'user';
        let settings = {
            method: 'GET',
        };

        return ApiUtils.fetchResponse(url, settings)
            .then(json => {
               return dispatch(fetchUserSuccess(json));
            })
            .catch(err => {
                return dispatch(fetchUserFailure(ApiUtils.parseErrorStrings(err)));
            });
    };
}
