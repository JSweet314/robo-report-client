import React from 'react';
import { shallow } from 'enzyme';
import { NewComplaintContainer, mapStateToProps } from './index';

describe('NewComplaintContainer', () => {
  let wrapper, mockUser, mockHistory, mockHistoryPush, mockHistoryGoBack;

  beforeEach(() => {
    mockUser = {};
    mockHistoryPush = jest.fn();
    mockHistoryGoBack = jest.fn();
    mockHistory = { push: mockHistoryPush, goBack: mockHistoryGoBack };
    wrapper = shallow(
      <NewComplaintContainer
        history={mockHistory}
        user={mockUser}
      />
    );
  });

  describe('Snapshots', () => {
    it('should match question block 0', () => {
      expect(wrapper).toMatchSnapshot();
    });

    it('should match question block 1', () => {
      wrapper.setState({ blockIndex: 1 });
      expect(wrapper).toMatchSnapshot();
    });

    it('should match question block 2', () => {
      wrapper.setState({ blockIndex: 2 });
      expect(wrapper).toMatchSnapshot();
    });

    it('should match question block 3', () => {
      wrapper.setState({ blockIndex: 3 });
      expect(wrapper).toMatchSnapshot();
    });
  });

  describe('handleOnChange', () => {
    it('should update a property of the values object in local state', () => {
      const mockEvent = { target: { id: 'subject', value: 'Nuisance caller' } };
      wrapper.instance().handleOnChange(mockEvent);
      expect(wrapper.state('values'))
        .toHaveProperty('subject', 'Nuisance caller');
    });
  });

  describe('handleQuestionBlockNavigation', () => {
    let mockEvent;
    beforeEach(() => {
      mockEvent = { target: { name: 'next' } };
    });

    it('should increment the blockIndex in local state', () => {
      wrapper.instance().handleQuestionBlockNavigation(mockEvent);
      expect(wrapper.state('blockIndex')).toEqual(1);
    });

    it('should push to a new route if there are no more questions', () => {
      wrapper.instance().handleQuestionBlockNavigation(mockEvent);
      wrapper.instance().handleQuestionBlockNavigation(mockEvent);
      wrapper.instance().handleQuestionBlockNavigation(mockEvent);
      wrapper.instance().handleQuestionBlockNavigation(mockEvent);
      expect(mockHistoryPush).toHaveBeenCalledWith('/');
    });

    it('should decrement the blockIndex in local state', () => {
      mockEvent.target.name = 'back';
      wrapper.setState({ blockIndex: 3 });
      wrapper.instance().handleQuestionBlockNavigation(mockEvent);
      expect(wrapper.state('blockIndex')).toEqual(2);
    });

    it('should goBack to home if back is clicked on first question', () => {
      mockEvent.target.name = 'back';
      wrapper.instance().handleQuestionBlockNavigation(mockEvent);
      expect(mockHistoryGoBack).toHaveBeenCalledTimes(1);
    });
  });

  describe('mapStateToProps', () => {
    it('should map user from state to props', () => {
      const mockState = { user: { name: 'Jerry' } };
      const mapped = mapStateToProps(mockState);
      expect(mapped).toHaveProperty('user', { name: 'Jerry' });
    });
  });
});