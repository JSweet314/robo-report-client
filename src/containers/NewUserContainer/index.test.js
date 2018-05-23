import React from 'react';
import { shallow } from 'enzyme';
import UserForm from './index';

describe('UserForm', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<UserForm />);
  });

  it('should match a snapshot with an instructions prompt', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('should match a snapshot with the form itself', () => {
    wrapper.setState({ isPrompted: false });
    expect(wrapper).toMatchSnapshot();
  });

  it('should handle the change of form inputs', () => {
    expect(wrapper.state('email')).toEqual('');

    const mockEvent = { target: { id: 'email', value: 'test' }};
    
    wrapper.instance().handleOnChange(mockEvent);

    expect(wrapper.state('email')).toEqual('test');
  });

  it('should toggle whether the user is prompted with instructions', () => {
    expect(wrapper.state('welcomeDisplayed')).toEqual(true);

    wrapper.instance().toggleWelcome();

    expect(wrapper.state('welcomeDisplayed')).toEqual(false);
  });
});