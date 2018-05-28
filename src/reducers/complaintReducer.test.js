import * as actions from '../actions';
import complaintsReducer from './complaintsReducer';

describe('complaintsReducer', () => {
  it('should return a default state', () => {
    expect(complaintsReducer(undefined, {})).toEqual([]);
  });

  it('should capture and array of complaints', () => {
    const mockAction = actions.captureDbComplaints([{}]);
    expect(complaintsReducer(undefined, mockAction)).toEqual([{}]);
  });

  it('should capture a new complaint', () => {
    const mockAction = actions.captureComplaint({});
    expect(complaintsReducer([{}], mockAction)).toEqual([{}, {}]);
  });
});