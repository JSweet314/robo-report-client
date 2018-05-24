import React from 'react';
import { shallow } from 'enzyme';
import { NewUserContainer, mapDispatchToProps } from './index';
import * as actions from '../../actions';

describe('NewUserContainer', () => {
  let wrapper;
  const mockSubmitNewUser = jest.fn();

  beforeEach(() => {
    wrapper = shallow(<NewUserContainer submitNewUser={mockSubmitNewUser}/>);
  });

  it('should match a snapshot with an instructions prompt', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('should match a snapshot with the form itself', () => {
    wrapper.setState({ welcomeDisplayed: false });
    expect(wrapper).toMatchSnapshot();
  });

  it('should handle the change of form inputs', () => {
    expect(wrapper.state('email')).toEqual('');
    const mockEvent = { target: { id: 'email', value: 'test' } };
    wrapper.instance().handleOnChange(mockEvent);
    expect(wrapper.state('email')).toEqual('test');
  });

  it('should handle the submission of the form', () => {
    const mockEvent = { preventDefault: jest.fn() };
    wrapper.instance().handleOnSubmit(mockEvent);
    const mockUser = wrapper.state();
    delete mockUser.welcomeDisplayed;
    expect(mockSubmitNewUser).toHaveBeenCalledWith(mockUser);
  });

  it('should toggle whether the user is prompted with instructions', () => {
    expect(wrapper.state('welcomeDisplayed')).toEqual(true);
    wrapper.instance().toggleWelcome();
    expect(wrapper.state('welcomeDisplayed')).toEqual(false);
  });

  describe('mapDispatchToProps', () => {
    const mockDispatch = jest.fn();

    it('should map an action submitNewUser', () => {
      const mapped = mapDispatchToProps(mockDispatch);
      const mockUser = { name: 'user' };
      mapped.submitNewUser(mockUser);
      expect(mockDispatch)
        .toHaveBeenCalledWith(actions.submitNewUser(mockUser));
    });
  });
});