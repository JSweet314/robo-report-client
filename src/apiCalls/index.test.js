/* eslint-disable camelcase */
import * as api from './index';

describe('apiCalls', () => {
  describe('postNewUser', () => {
    let mockNewUser;
    beforeEach(() => {
      mockNewUser = {
        name: 'user'
      };
      window.fetch = jest.fn().mockImplementation(() =>
        Promise.resolve({
          status: 201,
          ok: true,
          json: () => Promise.resolve({ id: 1 })
        })
      );
    });

    it('should call fetch with the correct params', () => {
      const expected = [
        'http://roboreport-api.herokuapp.com/api/v1/users',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
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
      window.fetch = jest.fn().mockImplementation(() =>
        Promise.resolve({
          status: 500,
          ok: false
        })
      );
      const expected = new Error(
        'postNewUser error: Bad response, status code: 500'
      );
      await expect(api.postNewUser(mockNewUser)).rejects.toEqual(expected);
    });
  });

  describe('getUserInfo', () => {
    let mockUserEmail;
    beforeEach(() => {
      mockUserEmail = 'thedude@gmail.com';
      window.fetch = jest.fn().mockImplementation(() =>
        Promise.resolve({
          status: 200,
          ok: true,
          json: () =>
            Promise.resolve({
              id: 1,
              email: 'thedude@gmail.com',
              phone: '404-555-5555',
              phoneType: 'Wireless',
              firstName: 'Jeffery',
              lastName: 'Lebowski',
              address: '1091 S Mesa Dr',
              city: 'Los Angeles',
              state: 'CA',
              zipcode: '90210',
              created_at: '2018-05-16T15:19:58.885Z',
              updated_at: '2018-05-16T15:19:58.885Z',
              phoneLocation: null
            })
        })
      );
    });

    it('should call fetch with the correct params', () => {
      const expected = [
        //eslint-disable-next-line
        `http://roboreport-api.herokuapp.com/api/v1/users?email=thedude@gmail.com`,
        {
          method: 'GET',
          headers: {
            // eslint-disable-next-line
            token: process.env.REACT_APP_ROBO_TOKEN
          }
        }
      ];

      api.getUserInfo(mockUserEmail);
      expect(window.fetch).toHaveBeenCalledWith(...expected);
    });

    it('should return the user object if the response is ok', async () => {
      const expected = {
        id: 1,
        email: 'thedude@gmail.com',
        phone: '404-555-5555',
        phoneType: 'Wireless',
        firstName: 'Jeffery',
        lastName: 'Lebowski',
        address: '1091 S Mesa Dr',
        city: 'Los Angeles',
        state: 'CA',
        zipcode: '90210',
        created_at: '2018-05-16T15:19:58.885Z',
        updated_at: '2018-05-16T15:19:58.885Z',
        phoneLocation: null
      };

      await expect(api.getUserInfo(mockUserEmail)).resolves.toEqual(expected);
    });

    it('should return an error if the response is not ok', async () => {
      window.fetch = jest.fn().mockImplementation(() =>
        Promise.resolve({
          status: 500,
          ok: false
        })
      );
      const expected = new Error(
        'getUserInfo error: Bad response, status code: 500'
      );
      await expect(api.getUserInfo('wrong@email.com')).rejects.toEqual(
        expected
      );
    });
  });
});
