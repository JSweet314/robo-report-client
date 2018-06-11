import React from 'react';
import { shallow } from 'enzyme';
import ProgressMeter from './index';

describe('PrgressMeter', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<ProgressMeter blockIndex={0} min={-1} max={5}/>);
  });

  it('should match a snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  });
});