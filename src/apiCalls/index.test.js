import * as api from './index';

describe('apiCalls', () => {
  describe('postNewUser', () => {
    let mockNewUser;
    beforeEach(() => {
      mockNewUser = {
        name: 'user'
      };
      window.fetch = jest.fn().mockImplementation(() => Promise.resolve({
        status: 200,
        ok: true,
        json: () => Promise.resolve({ id: 1 })
      }));
    });

    it('should call fetch with the correct params', () => {
      const expected = [
        'http://roboreport-api.herokuapp.com/api/v1/users',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            // eslint-disable-next-line
            token: process.env.REACT_APP_ROBO_TOKEN
          },
          body: JSON.stringify(mockNewUser)
        }
      ];
      api.postNewUser(mockNewUser);
      expect(window.fetch).toHaveBeenCalledWith(...expected);
    });

    it('should return an object if the response is ok', async () => {
      const expected = { id: 1 };
      await expect(api.postNewUser(mockNewUser)).resolves.toEqual(expected);
    });

    it('should return an error if response is not ok', async () => {
      window.fetch = jest.fn().mockImplementation(() => Promise.resolve({
        status: 500,
        ok: false
      }));
      const expected = new Error(
        'postNewUser error: Bad response, status code: 500'
      );
      await expect(api.postNewUser(mockNewUser)).rejects.toEqual(expected);
    });
  });
});