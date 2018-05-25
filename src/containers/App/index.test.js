import React from "react";
import { shallow } from 'enzyme';
import { App, mapStateToProps } from './index';

describe('App', () => {
  let wrapper;
  const mockHistory = {
    push: jest.fn()
  };

  beforeEach(() => {
    wrapper = shallow(
      <App 
        history={mockHistory} 
        isLoggedIn={true} 
      />
    );
  });

  it('should match a snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  });

  describe('mapStateToProps', () => {
    const mockState = { isLoggedIn: false };
    const mapped = mapStateToProps(mockState);

    it('should return isLoggedIn from the state', () => {
      expect(mapped).toHaveProperty('isLoggedIn', false);
    });
  });
});