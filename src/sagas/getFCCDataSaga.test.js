import { getFCCDataSaga, listenForGetFCCData } from './getFCCDataSaga';
import { put, call, takeLatest } from 'redux-saga/effects';
import { getFCCData } from '../apiCalls';
import * as actions from '../actions';

describe('listenForGetFCCData', () => {
  let generator;
  beforeAll(() => {
    generator = listenForGetFCCData();
  });

  it('should take the latest GET_FCC_DATA', () => {
    const expected = takeLatest('GET_FCC_DATA', getFCCDataSaga);
    expect(generator.next().value).toEqual(expected);
  });

  it('should be done', () => {
    expect(generator.next().done).toBe(true);
  });
});

describe('getFCCDataSaga', () => {
  let generator;
  beforeAll(() => {
    generator = getFCCDataSaga();
  });

  it('should call the FCC data api', () => {
    const expected = call(getFCCData);
    expect(generator.next().value).toEqual(expected);
  });

  it('should put captureFCCData on the stack', () => {
    const expected = put(actions.captureFCCData([{}]));
    expect(generator.next([{}]).value).toEqual(expected);
  });

  it('should clear an error if present', () => {
    const expected = put(actions.captureError(null));
    expect(generator.next().value).toEqual(expected);
  });

  it('should be done', () => {
    expect(generator.next().done).toBe(true);
  });

  it('should throw an error if appropriate', () => {
    const generator = getFCCDataSaga();
    const expected = put(actions.captureError('an error occured'));

    generator.next();
    expect(generator.throw(new Error('an error occured')).value)
      .toEqual(expected);
  });
});