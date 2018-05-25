import { all } from 'redux-saga/effects';
import { listenForSubmitNewUser } from './submitNewUserSaga';

export default function* rootSaga() {
  yield all([
    listenForSubmitNewUser()
  ]);
}
