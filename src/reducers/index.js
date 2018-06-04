import { combineReducers } from 'redux';
import userReducer from './userReducer';
import errorReducer from './errorReducer';
import complaintsReducer from './complaintsReducer';
import fccDataReducer from './fccDataReducer';

const rootReducer = combineReducers({
  user: userReducer,
  error: errorReducer,
  complaints: complaintsReducer,
  fccData: fccDataReducer
});

export default rootReducer;