import * as actions from './index';

describe('actions', () => {
  describe('toggleUserStatus', () => {
    it('should return an action of type: TOGGLE_USER_STATUS', () => {
      const expected = {
        type: 'TOGGLE_USER_STATUS'
      }

      expect(actions.toggleUserStatus()).toEqual(expected);
    });
  });
});