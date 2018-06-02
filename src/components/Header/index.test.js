import React from 'react';
import { shallow } from 'enzyme';
import Header from './';

describe('Header', () => {
  let wrapper;
  const mockHandleOAuthSignIn = jest.fn();
  
  beforeEach(() => {
    wrapper = shallow(
      <Header 
        user={{}}
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
        user={{id: 1}}
        handleOAuthSignIn={mockHandleOAuthSignIn}
      />
    );
    
    expect(wrapper).toMatchSnapshot();
  });
});