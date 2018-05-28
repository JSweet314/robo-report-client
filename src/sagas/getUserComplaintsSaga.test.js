import { call, put, takeLatest } from 'redux-saga/effects';
import * as actions from '../actions';
import { getUserComplaints } from '../apiCalls';
import { 
  getUserComplaintsSaga, 
  listenForGetUserComplaints
} from './getUserComplaintsSaga';

describe('listenForGetUserComplaints', () => {
  let generator;
  beforeAll(() => {
    generator = listenForGetUserComplaints();
  });
  
  it('should take the latest GET_USER_COMPLAINTS action', () => {
    expect(generator.next().value)
      .toEqual(takeLatest('GET_USER_COMPLAINTS', getUserComplaintsSaga));
  });

  it('should be done', () => {
    expect(generator.next().done).toBe(true);
  });
});

describe('getUserComplaintsSaga', () => {
  let generator;
  const mockAction = { userId: 1 };

  beforeAll(() => {
    generator = getUserComplaintsSaga(mockAction);
  });

  it('should call the api for a user\'s complaints', () => {
    expect(generator.next().value)
      .toEqual(call(getUserComplaints, mockAction.userId));
  });

  it('should put captureDbComplaints on the stack', () => {
    expect(generator.next([{}]).value)
      .toEqual(put(actions.captureDbComplaints([{}])));
  });

  it('should put captureError on the stack', () => {
    expect(generator.next().value)
      .toEqual(put(actions.captureError(null)));
  });

  it('should be done', () => {
    expect(generator.next().done).toBe(true);
  });

  it('should throw an error if appropriate', () => {
    const generator = getUserComplaintsSaga(mockAction);
    const expected = put(actions.captureError('an error occured'));

    generator.next();
    expect(generator.throw(new Error('an error occured')).value)
      .toEqual(expected);
  });
});