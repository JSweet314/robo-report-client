import React from 'react';
import { shallow } from 'enzyme';
import { UserAccountContainer, mapStateToProps } from './';

describe('UserAccountContainer', () => {
  let wrapper;
  const mockHandleOAuthSignOut = jest.fn();

  beforeEach(() => {
    wrapper = shallow(
      <UserAccountContainer
        user={{ firstName: 'Jerry' }}
        handleOAuthSignOut={mockHandleOAuthSignOut}
      />
    );
  });

  it('should match the snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  });

  describe('mapStateToProps', () => {
    it('should map user from state to props', () => {
      const mockState = { user: { firstName: 'Jill' } };
      const mapped = mapStateToProps(mockState);

      expect(mapped).toHaveProperty('user', { firstName: 'Jill' });
    });
  });
});
