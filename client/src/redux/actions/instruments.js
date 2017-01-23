import { createAction } from 'redux-actions';
import ApiUtils from '../../utils/ApiUtils';
import {getQuotes} from './quotes';

export const FETCH_INSTRUMENTS_REQUESTED = ' INSTRUMENTS_REQUESTED';
export const FETCH_INSTRUMENTS_SUCCESS = ' INSTRUMENTS_SUCCESS';
export const FETCH_INSTRUMENTS_FAILURE = ' INSTRUMENTS_FAILURE';
export const fetchInstrumentsRequested = createAction(FETCH_INSTRUMENTS_REQUESTED);
export const fetchInstrumentsSuccess = createAction(FETCH_INSTRUMENTS_SUCCESS);
export const fetchInstrumentsFailure = createAction(FETCH_INSTRUMENTS_FAILURE);
export function getInstruments(url_list) {
    return dispatch => {
        dispatch(fetchInstrumentsRequested());

        //todo: check local storage

        let url = 'instruments';
        let settings = {
            method: 'GET',
            headers: new Headers({'url_list': JSON.stringify(url_list)}),
        };

        return ApiUtils.fetchResponse(url, settings, dispatch)
            .then(json => {
                //todo: add to local storage
                localStorage.setItem('instruments', JSON.stringify(json));
                 dispatch(fetchInstrumentsSuccess(json));
                 dispatch(getQuotes(json));
            })
            .catch(err => {
                return dispatch(fetchInstrumentsFailure(err));
            });
    };
}
