import * as actions from './index';

describe('actions', () => {
  describe('toggleUserStatus', () => {
    it('should return an action of type: TOGGLE_USER_STATUS', () => {
      const expected = { type: 'TOGGLE_USER_STATUS' };
      expect(actions.toggleUserStatus()).toEqual(expected);
    });
  });

  describe('submitNewUser', () => {
    it('should return an action of type: SUBMIT_NEW_USER', () => {
      const expected = {
        type: 'SUBMIT_NEW_USER',
        user: { name: 'user' }
      };
      expect(actions.submitNewUser({ name: 'user' })).toEqual(expected);
    });
  });

  describe('captureUser', () => {
    it('should return an action of type: CAPTURE_USER', () => {
      const expected = {
        type: 'CAPTURE_USER',
        user: { name: 'user' }
      };
      expect(actions.captureUser({ name: 'user' })).toEqual(expected);
    });
  });

  describe('forgetUser', () => {
    it('should return an action of type: FORGET_USER', () => {
      const expected = { type: 'FORGET_USER' };
      expect(actions.forgetUser()).toEqual(expected);
    });
  });

  describe('captureError', () => {
    it('should return an action of type: CAPTURE_ERROR', () => {
      const expected = {
        type: 'CAPTURE_ERROR',
        error: 'error message'
      };
      expect(actions.captureError('error message')).toEqual(expected);
    });
  });
});