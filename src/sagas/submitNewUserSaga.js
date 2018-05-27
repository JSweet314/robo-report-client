import { call, put, takeLatest } from 'redux-saga/effects';
import * as actions from '../actions';
import { postNewUser } from '../apiCalls';

export function* submitNewUserSaga(action) {
  try {
    const idObj = yield call(postNewUser, action.user);
    yield put(actions.captureUser({...action.user, ...idObj}));
    yield put(actions.captureError(null));
  } catch (error) {
    yield put(actions.captureError(error.message));
  }
}

export function* listenForSubmitNewUser() {
  yield takeLatest('SUBMIT_NEW_USER', submitNewUserSaga);
}
