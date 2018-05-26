import React from 'react';
import { shallow } from 'enzyme';
import { NewComplaintContainer } from './index';

describe('NewComplaintContainer', () => {
  let wrapper, mockUser, mockHistory;
  
  beforeEach(() => {
    mockUser = {};
    mockHistory = { push: jest.fn() };
    wrapper = shallow(
      <NewComplaintContainer 
        history={mockHistory}
        user={mockUser}
      />
    );
  });

  it('should match a snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  });
});