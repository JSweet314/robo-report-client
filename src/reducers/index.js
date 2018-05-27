import { combineReducers } from 'redux';
import userReducer from './userReducer';
import errorReducer from './errorReducer';
import complaintsReducer from './complaintsReducer';

const rootReducer = combineReducers({
  user: userReducer,
  error: errorReducer,
  complaints: complaintsReducer
});

export default rootReducer;