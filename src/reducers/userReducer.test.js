import * as actions from '../actions';
import userReducer from './userReducer';

describe('userReducer', () => {
  it('should return a default state', () => {
    expect(userReducer(undefined, {})).toEqual({});
  });

  it('should capture a new users information', () => {
    const mockAction = actions.captureUser({ name: 'user' });
    expect(userReducer(undefined, mockAction)).toEqual({name: 'user'});
  });

  it('should be able to forget user data on log-out', () => {
    expect(userReducer(undefined, actions.forgetUser())).toEqual({});
  });
});