import React from 'react';
import { shallow } from 'enzyme';
import Accordion from './';

describe('Accordion', () => {
  let wrapper;
  const mockContent = [<p key={1}>Content</p>, <p key={2}>Moar Content</p>];
  const mockHeadingText = 'Robo Calls 2018-06-02 555-555-5555';

  beforeEach(() => {
    wrapper = shallow(
      <Accordion content={mockContent} headingText={mockHeadingText} />
    );
  });

  it('should match the snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('should match the snapshot', () => {
    wrapper.instance().handleClick();

    expect(wrapper).toMatchSnapshot();
  });
});
