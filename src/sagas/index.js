import { all } from 'redux-saga/effects';
import { listenForAddNewUser } from './addNewUserSaga';

export default function* rootSaga() {
  yield all([
    listenForAddNewUser()
  ]);
}
