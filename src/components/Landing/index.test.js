import React from 'react';
import { shallow } from 'enzyme';
import Landing from './';

describe('Landing', () => {
  let wrapper;
  
  beforeEach(() => {
    wrapper = shallow(<Landing isLoggedIn={false}/>);
  })

  it('should match the snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('should match the snapshot', () => {
    wrapper = shallow(<Landing isLoggedIn={true}/>);

    expect(wrapper).toMatchSnapshot();
  });
});