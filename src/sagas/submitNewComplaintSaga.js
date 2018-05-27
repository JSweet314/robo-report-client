import { call, put, takeLatest } from 'redux-saga/effects';
import * as actions from '../actions';
import { postNewComplaint } from '../apiCalls';

export function* submitNewComplaintSaga(action) {
  try {
    const complaintId = yield call(postNewComplaint, action.complaint);
    yield put(actions.captureComplaint({...action.complaint, ...complaintId}));
    yield put(actions.captureError(null));
  } catch (error) {
    yield put(actions.captureError(error.message));
  }
}

export function* listenForSubmitNewComplaint() {
  yield takeLatest('SUBMIT_NEW_COMPLAINT', submitNewComplaintSaga);
}