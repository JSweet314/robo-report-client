import React from 'react';
import { shallow } from 'enzyme';
import { UserComplaintsContainer, mapStateToProps } from './index';

describe('UserComplaintsContainer', () => {
  let wrapper;
  const mockComplaints = [{ subject: 'Nuisance Caller' }];

  beforeEach(() => {
    wrapper = shallow(<UserComplaintsContainer complaints={mockComplaints} />);
  });

  it('should match the snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  });

  describe('mapStateToProps', () => {
    const mockState = { complaints: mockComplaints};
    const mapped = mapStateToProps(mockState);

    it('should return complaints from the state', () => {
      expect(mapped)
        .toHaveProperty('complaints', [{ subject: 'Nuisance Caller' }]);
    });
  });
});
