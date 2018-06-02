import React from 'react';
import { shallow } from 'enzyme';
import ComplaintSubmitPrompt from './index';

describe('ComplaintSubmitPrompt', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<ComplaintSubmitPrompt />);
  });

  it('should match a snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  });
});