import React from 'react';
import { shallow } from 'enzyme';
import UserInfo from './';

describe('UserInfo', () => {
  let wrapper;
  const mockHandleOAuthSignOut = jest.fn();
  const mockToggleEdit = jest.fn();

  beforeEach(() => {
    wrapper = shallow(
      <UserInfo
        user={{ firstName: 'Jerry', phone: '111-222-3333' }}
        handleOAuthSignOut={mockHandleOAuthSignOut}
        toggleEdit={mockToggleEdit}
      />
    );
  });

  it('should match the snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
