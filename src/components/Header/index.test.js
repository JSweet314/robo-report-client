import React from 'react';
import { shallow } from 'enzyme';
import Header from './';

describe('Header', () => {
  let wrapper;
  
  beforeEach(() => {
    wrapper = shallow(<Header isLoggedIn={false}/>);
  });

  it('should match the snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  });
});