import { put, takeLatest } from 'redux-saga/effects';
import * as actions from '../actions';

export function* addNewUserSaga(action) {
  try {
    yield put(actions.captureUser(action.user));
    yield put(actions.toggleUserStatus());
  } catch (error) {
    yield put(actions.captureError(error.message));
  }
}

export function* listenForAddNewUser() {
  yield takeLatest('SUBMIT_NEW_USER', addNewUserSaga);
}