import { call, put, takeLatest } from 'redux-saga/effects';
import * as actions from '../actions';
import { getUserComplaints } from '../apiCalls';

export function* getUserComplaintsSaga(action) {
  try {
    const complaintsArr = yield call(getUserComplaints, action.userId);
    yield put(actions.captureDbComplaints(complaintsArr));
    yield put(actions.captureError(null));
  } catch (error) {
    yield put(actions.captureError(error.message));
  }
}

export function* listenForGetUserComplaints() {
  yield takeLatest('GET_USER_COMPLAINTS', getUserComplaintsSaga);
}
