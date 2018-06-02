import React from 'react';
import { shallow } from 'enzyme';
import Landing from './';

describe('Landing', () => {
  let wrapper;
  
  beforeEach(() => {
    wrapper = shallow(<Landing user={{}}/>);
  });

  it('should match the snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('should match the snapshot', () => {
    wrapper = shallow(<Landing user={{id: 1, firstName: 'Walter'}}/>);

    expect(wrapper).toMatchSnapshot();
  });
});