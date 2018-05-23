import * as actions from '../actions';
import userLoggedInReducer from './userLoggedInReducer';

describe('userLoggedInReducer', () => {
  it('should return default state', () => {
    expect(userLoggedInReducer(undefined, {})).toBe(false);
  });

  it('should return toggled state', () => {
    expect(userLoggedInReducer(undefined, actions.toggleUserStatus())).toBe(true);
  });
});