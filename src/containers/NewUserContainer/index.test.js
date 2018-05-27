import React from 'react';
import { shallow } from 'enzyme';
import { NewUserContainer, mapDispatchToProps, mapStateToProps } from './index';
import * as actions from '../../actions';

describe('NewUserContainer', () => {
  let wrapper, mockSubmitNewUser, mockLocation, mockUser;

  beforeEach(() => {
    mockSubmitNewUser = jest.fn();
    mockLocation = { state: { name: 'Bob Odin', email: 'bob@aol.com' } };
    mockUser = { id: 1 };

    wrapper = shallow(
      <NewUserContainer
        user={mockUser}
        submitNewUser={mockSubmitNewUser}
        location={mockLocation}
      />
    );
  });

  it('should match a snapshot with an instructions prompt', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('should match a snapshot with the form itself', () => {
    wrapper.setState({ welcomeDisplayed: false });
    expect(wrapper).toMatchSnapshot();
  });

  describe('handleOnChange', () => {
    it('should handle the change of form inputs', () => {
      expect(wrapper.state('values')).toHaveProperty('phone', '');
      const mockEvent = { target: { id: 'phone', value: '999-888-1111' } };
      wrapper.instance().handleOnChange(mockEvent);
      expect(wrapper.state('values')).toHaveProperty('phone', '999-888-1111');
    });
  });

  describe('handleOnSubmit', () => {
    it('should handle the submission of the form', () => {
      const mockEvent = { preventDefault: jest.fn() };
      wrapper.instance().handleOnSubmit(mockEvent);
      const mockUser = wrapper.state('values');
      expect(mockSubmitNewUser).toHaveBeenCalledWith(mockUser);
    });
  });

  describe('toggleWelcome', () => {
    it('should toggle whether the user is prompted with instructions', () => {
      expect(wrapper.state('welcomeDisplayed')).toEqual(true);
      wrapper.instance().toggleWelcome();
      expect(wrapper.state('welcomeDisplayed')).toEqual(false);
    });
  });

  describe('captureRedirectedCredentials', () => {
    it('should set the redirected credentials in state', () => {
      const wrapper = shallow(
        <NewUserContainer
          user={mockUser}
          submitNewUser={mockSubmitNewUser}
          location={mockLocation}
        />,
        { disableLifecycleMethods: true }
      );
      const { email, firstName, lastName } = wrapper.state('values');
      [email, firstName, lastName].forEach(value => expect(value).toEqual(''));

      wrapper.instance().captureRedirectedCredentials();

      expect(wrapper.state('values')).toHaveProperty('firstName', 'Bob');
      expect(wrapper.state('values')).toHaveProperty('lastName', 'Odin');
      expect(wrapper.state('values')).toHaveProperty('email', 'bob@aol.com');
    });
  });

  describe('mapDispatchToProps', () => {
    const mockDispatch = jest.fn();

    it('should map an action submitNewUser', () => {
      const mapped = mapDispatchToProps(mockDispatch);
      const mockUser = { name: 'user' };
      mapped.submitNewUser(mockUser);
      expect(mockDispatch).toHaveBeenCalledWith(
        actions.submitNewUser(mockUser)
      );
    });
  });

  describe('mapStateToProps', () => {
    it('should map user from state to formCompleted as prop', () => {
      const mapped = mapStateToProps({ user: { id: 1 } });
      expect(mapped).toHaveProperty('user', { id: 1 });
    });

    it('should map error from state to error as a prop', () => {
      const mapped = mapStateToProps({ error: 'message' });
      expect(mapped).toHaveProperty('error', 'message');
    });
  });
});
