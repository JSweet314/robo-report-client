import React from 'react';
import { shallow } from 'enzyme';
import Instructions from "./index";

describe('Instructions', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<Instructions />);
  });

  it('should match a snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  });
});