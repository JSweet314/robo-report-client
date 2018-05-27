import { call, put, takeLatest } from 'redux-saga/effects';
import { 
  listenForSubmitNewComplaint, 
  submitNewComplaintSaga
} from './submitNewComplaintSaga';
import * as actions from '../actions';
import { postNewComplaint } from '../apiCalls';

describe('listenForSubmitNewComplaint', () => {
  let generator;
  beforeAll(() => {
    generator = listenForSubmitNewComplaint();
  });

  it('should take the latest SUBMIT_NEW_COMPLAINT action', () => {
    expect(generator.next().value)
      .toEqual(takeLatest('SUBMIT_NEW_COMPLAINT', submitNewComplaintSaga));
  });

  it('should be done', () => {
    expect(generator.next().done).toBe(true);
  });
});

describe('submitNewComplaintSaga', () => {
  let generator, mockAction, mockComplaint;
  beforeAll(() => {
    mockComplaint = { subject: 'Nuisance caller' };
    mockAction = actions.captureComplaint(mockComplaint);
    generator = submitNewComplaintSaga(mockAction);
  });

  it('should call the roboReport API to post a new complaint', () => {
    expect(generator.next().value)
      .toEqual(call(postNewComplaint, mockComplaint));
  });

  it('should put captureComplaint action on the stack', () => {
    const mockId = { id: 1 };
    expect(generator.next(mockId).value)
      .toEqual(put(actions.captureComplaint({...mockComplaint, ...mockId })));
  });

  it('should put captureError action on the state with error null', () => {
    expect(generator.next().value).toEqual(put(actions.captureError(null)));
  });

  it('should be done', () => {
    expect(generator.next().done).toBe(true);
  });

  it('should throw an error if appropriate', () => {
    const generator = submitNewComplaintSaga(mockAction);
    const expected = put(actions.captureError('an error occured'));

    generator.next();
    expect(generator.throw(new Error('an error occured')).value)
      .toEqual(expected);
  });
});