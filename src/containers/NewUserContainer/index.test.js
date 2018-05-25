import React from 'react';
import { shallow } from 'enzyme';
import { NewUserContainer, mapDispatchToProps, mapStateToProps } from './index';
import * as actions from '../../actions';

describe('NewUserContainer', () => {
  let wrapper, mockSubmitNewUser, mockLocation;

  beforeEach(() => {
    mockSubmitNewUser = jest.fn();
    mockLocation = { state: { name: 'Bob Odin', email: 'bob@aol.com' } };
    wrapper = shallow(
      <NewUserContainer
        isLoggedIn={false}
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
      const mockUser = { ...wrapper.state() };
      delete mockUser.welcomeDisplayed;
      delete mockUser.isLoading;
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
          isLoggedIn={false}
          submitNewUser={mockSubmitNewUser}
          location={mockLocation}
        />,
        { disableLifecycleMethods: true }
      );
      const { email, firstName, lastName } = wrapper.state();
      [email, firstName, lastName].forEach(value => expect(value).toEqual(''));

      wrapper.instance().captureRedirectedCredentials();

      expect(wrapper.state('firstName')).toEqual('Bob');
      expect(wrapper.state('lastName')).toEqual('Odin');
      expect(wrapper.state('email')).toEqual('bob@aol.com');
    });
  });

  describe('filterFormValuesFromState', () => {
    it('should return only controlled form values held in state', () => {
      const expected = {
        email: 'bob@aol.com',
        phone: '',
        phoneType: '-',
        phoneLocation: '-',
        firstName: 'Bob',
        lastName: 'Odin',
        address: '',
        city: '',
        state: '',
        zipcode: ''
      };
      const values = wrapper.instance().filterFormValuesFromState();
      expect(values).toEqual(expected);
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

  describe('mapStateToProps', () => {
    it('should map isLoggedIn from state to formCompleted as prop', () => {
      const mapped = mapStateToProps({isLoggedIn: true });
      expect(mapped).toHaveProperty('isLoggedIn', true);
    });

    it('should map error from state to error as a prop', () => {
      const mapped = mapStateToProps({error: 'message' });
      expect(mapped).toHaveProperty('error', 'message');
    });
  });
});
