import React from 'react';
import { shallow } from 'enzyme';
import Loading from './index';

describe('Loading', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<Loading />);
  });

  it('should match a snapshot', () => {
    expect(wrapper).toMatchSnapshot();  
  });
});