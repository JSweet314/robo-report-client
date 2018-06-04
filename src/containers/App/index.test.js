import React from 'react';
import { shallow } from 'enzyme';
import { App, mapStateToProps, mapDispatchToProps } from './index';
import * as actions from '../../actions';

describe('App', () => {
  let wrapper;
  const mockHistory = {
    push: jest.fn()
  };
  const mockUser = { id: 1, name: 'Walter', email: 'walt@aol.com' };
  const mockGetSavedUserInfo = jest.fn();
  const mockCaptureUser = jest.fn();
  const mockGetUserComplaints = jest.fn();
  const mockCaptureDbComplaints = jest.fn();
  const mockGetFCCData = jest.fn();

  beforeEach(() => {
    wrapper = shallow(
      <App
        user={mockUser}
        fccData={[]}
        getFCCData={mockGetFCCData}
        getSavedUserInfo={mockGetSavedUserInfo}
        history={mockHistory}
        captureUser={mockCaptureUser}
        getUserComplaints={mockGetUserComplaints}
        captureDbComplaints={mockCaptureDbComplaints}
      />,
      { disableLifecycleMethods: true }
    );
  });

  it('should match a snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  });

  describe('mapStateToProps', () => {
    const mockState = { user: { id: 1 } };
    const mapped = mapStateToProps(mockState);

    it('should return user from the state', () => {
      expect(mapped).toHaveProperty('user', { id: 1 });
    });
  });

  describe('mapDispatchToProps', () => {
    const mockDispatch = jest.fn();

    it('should map an action getSavedUserInfo to props', () => {
      const mapped = mapDispatchToProps(mockDispatch);
      mapped.getSavedUserInfo('email');
      expect(mockDispatch).toHaveBeenCalledWith(
        actions.getSavedUserInfo('email')
      );
    });

    it('should map an action captureUser to props', () => {
      const mapped = mapDispatchToProps(mockDispatch);
      mapped.captureUser({});
      expect(mockDispatch).toHaveBeenCalledWith(
        actions.captureUser({})
      );
    });

    it('should map an action getUserComplaints to props', () => {
      const mapped = mapDispatchToProps(mockDispatch);
      mapped.getUserComplaints(1);
      expect(mockDispatch).toHaveBeenCalledWith(
        actions.getUserComplaints(1)
      );
    });

    it('should map an action captureDbComplaints to props', () => {
      const mapped = mapDispatchToProps(mockDispatch);
      mapped.captureDbComplaints([]);
      expect(mockDispatch).toHaveBeenCalledWith(
        actions.captureDbComplaints([])
      );
    });
  });
});
