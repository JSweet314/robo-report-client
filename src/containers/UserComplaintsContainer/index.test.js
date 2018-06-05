import React from 'react';
import { shallow } from 'enzyme';
import { UserComplaintsContainer, mapStateToProps } from './index';

describe('UserComplaintsContainer', () => {
  let wrapper;
  const mockComplaints = [{ subject: 'Nuisance Caller', id: 1 }];

  beforeEach(() => {
    wrapper = shallow(<UserComplaintsContainer complaints={mockComplaints} />);
  });

  it('should match the snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('should match the snapshot if no complaints', () => {
    wrapper = shallow(<UserComplaintsContainer complaints={[]} />);
    expect(wrapper).toMatchSnapshot();
  });

  describe('mapStateToProps', () => {
    const mockState = { complaints: mockComplaints};
    const mapped = mapStateToProps(mockState);

    it('should return complaints from the state', () => {
      expect(mapped)
        .toHaveProperty('complaints', mockComplaints);
    });
  });
});
