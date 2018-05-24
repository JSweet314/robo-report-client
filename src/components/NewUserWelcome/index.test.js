import React from 'react';
import { shallow } from 'enzyme';
import NewUserWelcome from './index';

describe('NewUserWelcome', () => {
  let wrapper;
  const mockToggleWelcome = jest.fn();

  beforeEach(() => {
    wrapper = shallow(<NewUserWelcome toggleWelcome={mockToggleWelcome}/>);
  });

  it('should match a snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('should call toggleWelcome when the get started button is pressed', () => {
    const button = wrapper.find('button');
    button.simulate('click');
    expect(mockToggleWelcome).toHaveBeenCalled();
  });
});