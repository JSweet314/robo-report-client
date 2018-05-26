import React from 'react';
import { shallow } from 'enzyme';
import { NewComplaintContainer } from './index';

describe('NewComplaintContainer', () => {
  let wrapper, mockUser;
  
  beforeEach(() => {
    mockUser = {};
    wrapper = shallow(<NewComplaintContainer user={mockUser} />);
  });

  it('should match a snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  });
});