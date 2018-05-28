import { all } from 'redux-saga/effects';
import { listenForSubmitNewUser } from './submitNewUserSaga';
import { listenForGetUserInfo } from './getUserInfoSaga';
import { listenForSubmitNewComplaint } from './submitNewComplaintSaga';
import { listenForGetUserComplaints } from './getUserComplaintsSaga';

export default function* rootSaga() {
  yield all([
    listenForSubmitNewUser(),
    listenForGetUserInfo(),
    listenForSubmitNewComplaint(),
    listenForGetUserComplaints()
  ]);
}
