import { combineReducers } from 'redux';
import userLoggedInReducer from './userLoggedInReducer';

const rootReducer = combineReducers({
  isLoggedIn: userLoggedInReducer
});

export default rootReducer;