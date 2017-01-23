import login from './login';
import userData from './userData';
import accountDetails from './accountDetails';
import instruments from './instruments';
import quotes from './quotes';
import { combineReducers } from 'redux';

const rootReducer = combineReducers({
    login, 
    userData,
    accountDetails,
    instruments,
    quotes,
});

export default rootReducer;