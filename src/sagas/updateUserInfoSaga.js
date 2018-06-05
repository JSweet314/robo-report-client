import { call, put, takeLatest } from 'redux-saga/effects';
import * as actions from '../actions';
import { patchUserInfo, getUserInfo } from '../apiCalls';

export function* updateUserInfoSaga(action) {
  try {
    const status = yield call(patchUserInfo, action.user);
    if (status === 204) {
      const updatedUser = yield call(getUserInfo, action.user.email);
      yield put(actions.captureUser(updatedUser));
    }
    yield put(actions.captureError(null));
  } catch (error) {
    yield put(actions.captureError(error.message));
  }
}

export function* listenForUpdateUserInfo() {
  yield takeLatest('UPDATE_USER_INFO', updateUserInfoSaga);
}