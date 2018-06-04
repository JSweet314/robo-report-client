import React from 'react';
import { shallow } from 'enzyme';
import { UserAccountContainer, mapStateToProps } from './';

describe('UserAccountContainer', () => {
  let wrapper;
  const mockHandleOAuthSignOut = jest.fn();
  const mockUpdateUserInfo = jest.fn();

  beforeEach(() => {
    wrapper = shallow(
      <UserAccountContainer
        user={{ firstName: 'Jerry', phone: '111-222-3333' }}
        handleOAuthSignOut={mockHandleOAuthSignOut}
        updateUserInfo={mockUpdateUserInfo}
      />
    );
  });

  it('should match the snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  });

  describe('handleOnChange', () => {
    it('should handle the change of form inputs', () => {
      expect(wrapper.state('userInfo')).toHaveProperty('phone', '111-222-3333');
      const mockEvent = { target: { id: 'phone', value: '999-888-7777' } };
      wrapper.instance().handleOnChange(mockEvent);
      expect(wrapper.state('userInfo')).toHaveProperty('phone', '999-888-7777');
    });
  });

  describe('handleOnSubmit', () => {
    it('should handle the submission of the form', () => {
      const mockEvent = { preventDefault: jest.fn() };
      wrapper.instance().handleOnSubmit(mockEvent);
      const mockUser = wrapper.state('userInfo');
      expect(mockUpdateUserInfo).toHaveBeenCalledWith(mockUser);
    });
  });


  describe('mapStateToProps', () => {
    it('should map user from state to props', () => {
      const mockState = { user: { firstName: 'Jill' } };
      const mapped = mapStateToProps(mockState);

      expect(mapped).toHaveProperty('user', { firstName: 'Jill' });
    });
  });
});
