import login from './login';
import userData from './userData';
import accountDetails from './accountDetails';
import { combineReducers } from 'redux';

const rootReducer = combineReducers({
    login, 
    userData,
    accountDetails,
});

export default rootReducer;