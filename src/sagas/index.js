import { all } from 'redux-saga/effects';
import { listenForSubmitNewUser } from './submitNewUserSaga';
import { listenForGetUserInfo } from './getUserInfoSaga';
import { listenForSubmitNewComplaint } from './submitNewComplaintSaga';
import { listenForGetUserComplaints } from './getUserComplaintsSaga';
import { listenForGetFCCData } from './getFCCDataSaga';
import { listenForUpdateUserInfo } from './updateUserInfoSaga';

export default function* rootSaga() {
  yield all([
    listenForSubmitNewUser(),
    listenForGetUserInfo(),
    listenForUpdateUserInfo(),
    listenForSubmitNewComplaint(),
    listenForGetUserComplaints(),
    listenForGetFCCData()
  ]);
}
