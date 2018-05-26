import { call, put, takeLatest } from 'redux-saga/effects';
import { listenForGetUserInfo, getUserInfoSaga } from './getUserInfoSaga';
import * as actions from '../actions';
import { getUserInfo } from '../apiCalls';

describe('listenForGetUserInfo', () => {
  let generator;
  beforeAll(() => {
    generator = listenForGetUserInfo();
  });

  it('should take the latest GET_USER_INFO action', () => {
    expect(generator.next().value).toEqual(
      takeLatest('GET_USER_INFO', getUserInfoSaga)
    );
  });

  it('should be done', () => {
    expect(generator.next().done).toBe(true);
  });
});

describe('getUserInfoSaga', () => {
  let generator, mockUserEmail, mockUser, mockAction;
  beforeAll(() => {
    mockUserEmail = 'thedude@gmail.com';
    mockUser = { phone: '404-555-5555' };
    mockAction = actions.getSavedUserInfo(mockUserEmail);
    generator = getUserInfoSaga(mockAction);
  });

  it('should call the roboReport API to get user info', () => {
    expect(generator.next().value).toEqual(call(getUserInfo, mockUserEmail));
  });

  it('should put the captureUser action on the stack', () => {
    expect(generator.next(mockUser).value).toEqual(
      put(actions.captureUser(mockUser))
    );
  });

  it('should put the captureError action on the stack with error null', () => {
    expect(generator.next().value).toEqual(put(actions.captureError(null)));
  });

  it('should be done', () => {
    expect(generator.next().done).toBe(true);
  });

  it('should throw an error if appropriate', () => {
    const generator = getUserInfoSaga(mockAction);
    const expected = put(actions.captureError('an error occured'));

    generator.next();
    expect(generator.throw(new Error('an error occured')).value).toEqual(
      expected
    );
  });
});
