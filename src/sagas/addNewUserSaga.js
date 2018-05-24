import { call, put, takeLatest } from 'redux-saga/effects';
import * as actions from '../actions';
import { postNewUser } from '../apiCalls';

export function* addNewUserSaga(action) {
  try {
    const user = yield call(postNewUser, action.user);
    yield put(actions.captureUser(user));
    yield put(actions.toggleUserStatus());
  } catch (error) {
    yield put(actions.captureError(error.message));
  }
}

export function* listenForAddNewUser() {
  yield takeLatest('SUBMIT_NEW_USER', addNewUserSaga);
}