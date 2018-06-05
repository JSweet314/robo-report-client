import { call, put, takeLatest } from 'redux-saga/effects';
import {
  listenForUpdateUserInfo,
  updateUserInfoSaga
} from './updateUserInfoSaga';
import * as actions from '../actions';
import { patchUserInfo, getUserInfo } from '../apiCalls';

describe('listenForUpdateUserInfo', () => {
  let generator;
  beforeAll(() => {
    generator = listenForUpdateUserInfo();
  });

  it('should take the latest UPDATE_USER_INFO action', () => {
    expect(generator.next().value).toEqual(
      takeLatest('UPDATE_USER_INFO', updateUserInfoSaga)
    );
  });

  it('should be done', () => {
    expect(generator.next().done).toBe(true);
  });
});

describe('updateUserInfoSaga', () => {
  let generator, mockUpdatedUser, mockAction;
  beforeAll(() => {
    mockUpdatedUser = { name: 'dude', email: 'yo@dude.io', id: 1 };
    mockAction = actions.updateUserInfo(mockUpdatedUser);
    generator = updateUserInfoSaga(mockAction);
  });

  it("should call the roboReport API to patch a user's info", () => {
    expect(generator.next().value).toEqual(
      call(patchUserInfo, mockUpdatedUser)
    );
  });

  it('should call the roboReport API to get the updated user info', () => {
    expect(generator.next(204).value).toEqual(
      call(getUserInfo, mockUpdatedUser.email)
    );
  });

  it('should put the captureUser action on the stack', () => {
    expect(generator.next(mockUpdatedUser).value).toEqual(
      put(actions.captureUser(mockUpdatedUser))
    );
  });

  it('should put the captureError action on the stack with error null', () => {
    expect(generator.next().value).toEqual(put(actions.captureError(null)));
  });

  it('should be done', () => {
    expect(generator.next().done).toBe(true);
  });

  it('should throw an error if appropriate', () => {
    const generator = updateUserInfoSaga(mockAction);
    const expected = put(actions.captureError('an error occured'));

    generator.next();
    expect(generator.throw(new Error('an error occured')).value).toEqual(
      expected
    );
  });
});
