import React from 'react';
import { shallow } from 'enzyme';
import { UserAccountContainer } from './';

describe('UserAccountContainer', () => {
  let wrapper;
  const mockCaptureUser = jest.fn();

  beforeEach(() => {
    wrapper = shallow(
      <UserAccountContainer user={{}} captureUser={mockCaptureUser} />
    );
  });

  it('should match the snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
