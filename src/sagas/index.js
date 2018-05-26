import { all } from 'redux-saga/effects';
import { listenForSubmitNewUser } from './submitNewUserSaga';
import { listenForGetUserInfo } from './getUserInfoSaga';

export default function* rootSaga() {
  yield all([
    listenForSubmitNewUser(),
    listenForGetUserInfo()
  ]);
}
