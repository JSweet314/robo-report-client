import { call, put, takeLatest } from 'redux-saga/effects';
import { listenForAddNewUser, addNewUserSaga } from './addNewUserSaga';
import * as actions from '../actions';
import { postNewUser } from '../apiCalls';

describe('listenForAddNewUser', () => {
  let generator;
  beforeAll(() => {
    generator = listenForAddNewUser();
  });

  it('should take the latest SUBMIT_NEW_USER action', () => {
    expect(generator.next().value)
      .toEqual(takeLatest('SUBMIT_NEW_USER', addNewUserSaga));
  });

  it('should be done', () => {
    expect(generator.next().done).toBe(true);
  });
});

describe('addNewUserSaga', () => {
  let generator, mockUser, mockAction;
  beforeAll(() => {
    mockUser = { name: 'user' };
    mockAction = actions.captureUser(mockUser);
    generator = addNewUserSaga(mockAction);
  });

  it('should call the roboReport API to post a new user', () => {
    expect(generator.next().value)
      .toEqual(call(postNewUser, mockUser));
  });

  it('should put the captureUser action on the stack', () => {
    const mockId = { id: 1 };
    expect(generator.next(mockId).value)
      .toEqual(put(actions.captureUser({ ...mockUser, ...mockId})));
  });

  it('should put the toggleUserStatus action on the stack', () => {
    expect(generator.next().value)
      .toEqual(put(actions.toggleUserStatus()));
  });

  it('should be done', () => {
    expect(generator.next().done).toBe(true);
  });

  it('should throw an error if appropriate', () => {
    const generator = addNewUserSaga(mockAction);
    const expected = put(actions.captureError('an error occured'));

    generator.next();
    expect(generator.throw(new Error('an error occured')).value)
      .toEqual(expected);
  });
});
