import { call, put, takeLatest } from 'redux-saga/effects';
import * as actions from '../actions';
import { getUserInfo } from '../apiCalls';

export function* getUserInfoSaga(action) {
  try {
    const userObj = yield call(getUserInfo, action.userEmail);
    yield put(actions.captureUser(userObj));
    yield put(actions.captureError(null));
  } catch (error) {
    yield put(actions.captureError(error.message));
  }
}

export function* listenForGetUserInfo() {
  yield takeLatest('GET_USER_INFO', getUserInfoSaga);
}
