import React from 'react';
import { shallow } from 'enzyme';
import Header from './';

describe('Header', () => {
  let wrapper;
  const mockHandleOAuthSignIn = jest.fn();
  
  beforeEach(() => {
    wrapper = shallow(
      <Header 
        isLoggedIn={false}
        handleOAuthSignIn={mockHandleOAuthSignIn}
      />
    );
  });

  it('should match the snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('should match the snapshot', () => {
    wrapper = shallow(
      <Header 
        isLoggedIn={true}
        handleOAuthSignIn={mockHandleOAuthSignIn}
      />
    );
    
    expect(wrapper).toMatchSnapshot();
  });
});