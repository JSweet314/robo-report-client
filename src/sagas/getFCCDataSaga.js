import { put, call, takeLatest } from 'redux-saga/effects';
import * as actions from '../actions';
import { getFCCData } from '../apiCalls';

export function* getFCCDataSaga() {
  try {
    const response = yield call(getFCCData);
    yield put(actions.captureFCCData(response));
    yield put(actions.captureError(null));
  } catch (error) {
    yield put(actions.captureError(error.message));
  }
}

export function* listenForGetFCCData() {
  yield takeLatest('GET_FCC_DATA', getFCCDataSaga);
}
