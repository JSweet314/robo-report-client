import * as actions from '../actions';
import complaintsReducer from './complaintsReducer';

describe('complaintsReducer', () => {
  it('should return a default state', () => {
    expect(complaintsReducer(undefined, {})).toEqual([]);
  });

  it('should capture a new complaint', () => {
    const mockAction = actions.captureComplaint({});
    expect(complaintsReducer(undefined, mockAction)).toEqual([{}]);
  });
});