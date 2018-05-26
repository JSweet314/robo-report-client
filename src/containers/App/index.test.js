import React from 'react';
import { shallow } from 'enzyme';
import { App, mapStateToProps, mapDispatchToProps } from './index';
import * as actions from '../../actions';

describe('App', () => {
  let wrapper;
  const mockHistory = {
    push: jest.fn()
  };
  const mockGetSavedUserInfo = jest.fn();

  beforeEach(() => {
    wrapper = shallow(
      <App
        getSavedUserInfo={mockGetSavedUserInfo}
        history={mockHistory}
        isLoggedIn={true}
      />
    );
  });

  it('should match a snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  });

  describe('mapStateToProps', () => {
    const mockState = { isLoggedIn: false };
    const mapped = mapStateToProps(mockState);

    it('should return isLoggedIn from the state', () => {
      expect(mapped).toHaveProperty('isLoggedIn', false);
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
  });
});
