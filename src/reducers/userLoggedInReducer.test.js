import * as actions from '../actions';
import userLoggedInReducer from './userLoggedInReducer';

describe('userLoggedInReducer', () => {
  it('should return default state', () => {
    expect(userLoggedInReducer(undefined, {})).toBe(false);
  });

  it('should return toggled state', () => {
    const mockAction = actions.toggleUserStatus();
    expect(userLoggedInReducer(undefined, mockAction)).toBe(true);
  });
});