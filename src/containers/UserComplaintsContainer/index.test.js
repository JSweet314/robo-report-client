import React from 'react';
import { shallow } from 'enzyme';
import { 
  UserComplaintsContainer, 
  mapStateToProps, 
  mapDispatchToProps 
} from './index';
import * as actions from '../../actions';

describe('UserComplaintsContainer', () => {
  let wrapper;
  const mockComplaints = [{ subject: 'Nuisance Caller', id: 1 }];
  const mockFilterReports = jest.fn();
  const mockHistory = {};
  beforeEach(() => {
    wrapper = shallow(
      <UserComplaintsContainer 
        complaints={mockComplaints} 
        reportFilter={'ALL'}
        filterReports={mockFilterReports}
        history={mockHistory}
      />
    );
  });

  it('should match the snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('should match the snapshot if no complaints', () => {
    wrapper = shallow(
      <UserComplaintsContainer 
        complaints={[]} 
        reportFilter={'ALL'}
        filterReports={mockFilterReports}
        history={mockHistory}
      />
    );
    expect(wrapper).toMatchSnapshot();
  });

  describe('mapStateToProps', () => {
    const mockState = { complaints: mockComplaints, reportFilter: 'ALL'};
    const mapped = mapStateToProps(mockState);

    it('should return complaints from the state', () => {
      expect(mapped)
        .toHaveProperty('complaints', mockComplaints);
    });

    it('should return reportFilter from the state', () => {
      expect(mapped)
        .toHaveProperty('reportFilter', 'ALL');
    });
  });

  describe('mapDispatchToProps', () => {
    const mockDispatch = jest.fn();
    const mapped = mapDispatchToProps(mockDispatch);
    
    it('should map filterReports action to props', () => {
      mapped.filterReports('ALL');
      expect(mockDispatch).toHaveBeenCalledWith(actions.filterReports('ALL'));
    });
  });
});
