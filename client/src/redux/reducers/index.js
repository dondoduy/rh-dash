import login from './login';
import user from './user';
import { combineReducers } from 'redux';

const rootReducer = combineReducers({
    login, 
    user,
});

export default rootReducer;