import * as api from './index';
import moment from 'moment';

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
          headers: {
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

  describe('patchUserInfo', () => {
    let mockUpdatedUser;
    beforeEach(() => {
      mockUpdatedUser = {
        name: 'dude',
        id: 1
      };
      window.fetch = jest.fn().mockImplementation(() =>
        Promise.resolve({
          status: 204,
          ok: true
        })
      );
    });

    it('should call fetch with the correct params', () => {
      const expected = [
        'http://roboreport-api.herokuapp.com/api/v1/users/1',
        {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
            token: process.env.REACT_APP_ROBO_TOKEN
          },
          body: JSON.stringify(mockUpdatedUser)
        }
      ];
      api.patchUserInfo(mockUpdatedUser);
      expect(window.fetch).toHaveBeenCalledWith(...expected);
    });

    it('should return a status of 204', async () => {
      const expected = { ok: true, status: 204 };
      await expect(api.patchUserInfo(mockUpdatedUser)).resolves.toEqual(
        expected
      );
    });

    it('should return an error if response is not ok', async () => {
      window.fetch = jest.fn().mockImplementation(() =>
        Promise.resolve({
          status: 500,
          ok: false
        })
      );
      const expected = new Error(
        'patchUserInfo error: Bad response, status code: 500'
      );
      await expect(api.patchUserInfo(mockUpdatedUser)).rejects.toEqual(
        expected
      );
    });
  });

  describe('getUserComplaints', () => {
    let mockUserId;
    beforeEach(() => {
      mockUserId = 1;
      window.fetch = jest.fn().mockImplementation(() =>
        Promise.resolve({
          status: 200,
          ok: true,
          json: () =>
            Promise.resolve({
              user_id: 1,
              isSoliciting: 'Yes',
              subject: 'Nuisance caller',
              description: 'A woman wants to eliminate my credit card debt',
              callerIdNumber: '303-123-1234',
              callerIdName: 'unknown',
              date: '04/04/2018',
              time: '5:00 PM',
              typeOfSolicit: 'Credit card debt',
              doneBusinessWith: 'No',
              inquiredWith: 'No',
              householdRelation: 'Uncertain',
              permissionToCall: 'No',
              writtenPermission: 'No',
              dateOfPermission: '',
              typeOfCall: 'Prerecorded Voice',
              receivedCallerId: 'Yes',
              receivedBusinessName: 'No',
              nameAtBeginning: 'No',
              providedAdvertiserName: '',
              providedAdvertiserNumber: ''
            })
        })
      );
    });

    it('should call fetch with the correct params', () => {
      const expected = [
        `http://roboreport-api.herokuapp.com/api/v1/complaints?user_id=1`,
        {
          headers: {
            token: process.env.REACT_APP_ROBO_TOKEN
          }
        }
      ];

      api.getUserComplaints(mockUserId);
      expect(window.fetch).toHaveBeenCalledWith(...expected);
    });

    it('should return the user object if the response is ok', async () => {
      const expected = {
        user_id: 1,
        isSoliciting: 'Yes',
        subject: 'Nuisance caller',
        description: 'A woman wants to eliminate my credit card debt',
        callerIdNumber: '303-123-1234',
        callerIdName: 'unknown',
        date: '04/04/2018',
        time: '5:00 PM',
        typeOfSolicit: 'Credit card debt',
        doneBusinessWith: 'No',
        inquiredWith: 'No',
        householdRelation: 'Uncertain',
        permissionToCall: 'No',
        writtenPermission: 'No',
        dateOfPermission: '',
        typeOfCall: 'Prerecorded Voice',
        receivedCallerId: 'Yes',
        receivedBusinessName: 'No',
        nameAtBeginning: 'No',
        providedAdvertiserName: '',
        providedAdvertiserNumber: ''
      };

      await expect(api.getUserComplaints(mockUserId)).resolves.toEqual(
        expected
      );
    });

    it('should return an error if the response is not ok', async () => {
      window.fetch = jest.fn().mockImplementation(() =>
        Promise.resolve({
          status: 500,
          ok: false
        })
      );
      const expected = new Error(
        'getUserComplaints error: Bad response, status code: 500'
      );
      await expect(api.getUserComplaints(1000)).rejects.toEqual(expected);
    });
  });

  describe('getFCCData', () => {
    beforeEach(() => {
      window.fetch = jest.fn().mockImplementation(() =>
        Promise.resolve({
          status: 200,
          ok: true,
          json: () => Promise.resolve([{}])
        })
      );
    });

    it('should call fetch with the correct params', () => {
      const date = moment()
        .subtract(1, 'day')
        .format('YYYY-MM-DD');
      const issueDate = `${date}T00:00:00.000`;
      const expected =
        // eslint-disable-next-line
        `https://opendata.fcc.gov/resource/sr6c-syda.json?issue=Unwanted%20Calls&issue_date=${issueDate}`;

      api.getFCCData();
      expect(window.fetch).toHaveBeenCalledWith(expected);
    });

    it('should return an array of data objects if successful', async () => {
      const expected = [{}];
      await expect(api.getFCCData()).resolves.toEqual(expected);
    });

    it('should throw an error if a bad response is received', async () => {
      window.fetch = jest.fn().mockImplementation(() =>
        Promise.resolve({
          status: 500,
          ok: false
        })
      );
      const expected = new Error(
        'getFCCData error: Bad response, status code: 500'
      );
      await expect(api.getFCCData()).rejects.toEqual(expected);
    });
  });
});
