import * as actions from './index';

describe('actions', () => {
  describe('submitNewUser', () => {
    it('should return an action of type: SUBMIT_NEW_USER', () => {
      const expected = {
        type: 'SUBMIT_NEW_USER',
        user: { name: 'user' }
      };
      expect(actions.submitNewUser({ name: 'user' })).toEqual(expected);
    });
  });

  describe('getSavedUserInfo', () => {
    it('should return an actions of type: GET_USER_INFO', () => {
      const expected = {
        type: 'GET_USER_INFO',
        userEmail: 'thedude@gmail.com'
      };
      expect(actions.getSavedUserInfo('thedude@gmail.com')).toEqual(expected);
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
