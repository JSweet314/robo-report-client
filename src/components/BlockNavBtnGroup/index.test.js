import React from 'react';
import { shallow } from 'enzyme';
import BlockNavBtnGroup from './index';

describe('BlockNavBtnGroup', () => {
  let wrapper, 
    mockHandleQuestionBlockNavigation, 
    mockIsNextBtnDisabled, 
    mockBlockIndex;

  beforeEach(() => {
    mockHandleQuestionBlockNavigation = jest.fn();
    mockIsNextBtnDisabled = true;
    mockBlockIndex = 0;
    wrapper = shallow(
      <BlockNavBtnGroup
        blockIndex={mockBlockIndex}
        handleQuestionBlockNavigation={mockHandleQuestionBlockNavigation}
        isNextBtnDisabled={mockIsNextBtnDisabled}
      />
    );
  });

  it('should match a snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  });
});