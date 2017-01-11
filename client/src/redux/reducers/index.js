import login from './login';
import user from './user';
import accounts from './accounts';
import { combineReducers } from 'redux';

const rootReducer = combineReducers({
    login, 
    user,
    accounts,
});

export default rootReducer;