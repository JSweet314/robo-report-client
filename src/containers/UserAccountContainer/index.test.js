import React from 'react';
import { shallow } from 'enzyme';
import { UserAccountContainer, mapStateToProps, mapDispatchToProps } from './';
import { updateUserInfo } from '../../actions';

describe('UserAccountContainer', () => {
  let wrapper;
  const mockHandleOAuthSignOut = jest.fn();
  const mockUpdateUserInfo = jest.fn();

  beforeEach(() => {
    wrapper = shallow(
      <UserAccountContainer
        user={{
          firstName: 'Jerry',
          lastName: 'Senderson',
          email: 'jer@sendit.org',
          phone: '111-222-3333',
          phoneType: 'Wireless (cell phone/other mobile device)',
          phoneLocation: 'Residential/Personal',
          address: '1 main st',
          city: 'breck',
          state: 'Colorado',
          zipcode: '80111'
        }}
        handleOAuthSignOut={mockHandleOAuthSignOut}
        updateUserInfo={mockUpdateUserInfo}
        location={{ pathname: '/myAccount' }}
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

  describe('toggleEdit', () => {
    it('should toggle isEditing in state', () => {
      expect(wrapper.state('isEditing')).toBe(false);
      wrapper.instance().toggleEdit();
      expect(wrapper.state('isEditing')).toBe(true);
    });

    it('should change the rendered component', () => {
      wrapper.instance().toggleEdit();
      expect(wrapper).toMatchSnapshot();
    });
  });

  describe('mapStateToProps', () => {
    it('should map user from state to props', () => {
      const mockState = { user: { firstName: 'Jill' } };
      const mapped = mapStateToProps(mockState);

      expect(mapped).toHaveProperty('user', { firstName: 'Jill' });
    });
  });

  describe('mapDispatchToProps', () => {
    const mockDispatch = jest.fn();

    it('should map an action updateUserInfo', () => {
      const mapped = mapDispatchToProps(mockDispatch);
      mapped.updateUserInfo({ phone: '999-999-9999' });
      expect(mockDispatch).toHaveBeenCalledWith(
        updateUserInfo({ phone: '999-999-9999' })
      );
    });
  });
});
