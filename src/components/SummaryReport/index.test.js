import React from 'react';
import { shallow } from 'enzyme';
import SummaryReport from './index';
import questionBlocks 
  from '../../containers/NewComplaintContainer/complaintQuestions';

describe('SummaryReport', () => {
  let wrapper;
  const mockHistory = {};
  beforeEach(() => {
    wrapper = shallow(
      <SummaryReport 
        values={{}}
        questionBlocks={questionBlocks}
        history={mockHistory}
      />
    );
  });

  it('should match a snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  });
});