import { combineReducers } from 'redux';
import userLoggedInReducer from './userLoggedInReducer';
import userReducer from './userReducer';
import errorReducer from './errorReducer';

const rootReducer = combineReducers({
  isLoggedIn: userLoggedInReducer,
  user: userReducer,
  error: errorReducer
});

export default rootReducer;