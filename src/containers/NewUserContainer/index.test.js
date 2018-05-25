import React from 'react';
import { shallow } from 'enzyme';
import { NewUserContainer, mapDispatchToProps } from './index';
import * as actions from '../../actions';

describe('NewUserContainer', () => {
  let wrapper;
  const mockSubmitNewUser = jest.fn();
  const mockLocation = { state: { name: 'Bob Odin', email: 'bob@aol.com' } };

  beforeEach(() => {
    wrapper = shallow(
      <NewUserContainer
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
      expect(wrapper.state('phone')).toEqual('');
      const mockEvent = { target: { id: 'phone', value: '999-888-1111' } };
      wrapper.instance().handleOnChange(mockEvent);
      expect(wrapper.state('phone')).toEqual('999-888-1111');
    });
  });

  describe('handleOnSubmit', () => {
    it('should handle the submission of the form', () => {
      const mockEvent = { preventDefault: jest.fn() };
      wrapper.instance().handleOnSubmit(mockEvent);
      const mockUser = wrapper.state();
      delete mockUser.welcomeDisplayed;
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
    const wrapper = shallow(
      <NewUserContainer
        submitNewUser={mockSubmitNewUser}
        location={mockLocation}
      />,
      { disableLifecycleMethods: true }
    );

    it('should set the redirected credentials in state', () => {
      const { email, firstName, lastName } = wrapper.state();
      [email, firstName, lastName].forEach(value => expect(value).toEqual(''));

      wrapper.instance().captureRedirectedCredentials();
      
      expect(wrapper.state('firstName')).toEqual('Bob');
      expect(wrapper.state('lastName')).toEqual('Odin');
      expect(wrapper.state('email')).toEqual('bob@aol.com');
    });
  });

  describe('mapDispatchToProps', () => {
    const mockDispatch = jest.fn();

    it('should map an action submitNewUser', () => {
      const mapped = mapDispatchToProps(mockDispatch);
      const mockUser = { name: 'user' };
      mapped.submitNewUser(mockUser);
      expect(mockDispatch).toHaveBeenCalledWith(
        actions.submitNewUser(mockUser),
      );
    });
  });
});
