import reportVisibilityReducer from './reportVisibilityReducer';
import * as actions from '../actions';

describe('reportVisibilityReducer', () => {
  it('should return a default state', () => {
    expect(reportVisibilityReducer(undefined, {})).toEqual('ALL');
  });

  it('should set a visibility filter in state', () => {
    const mockAction = actions.filterReports('REPORTED');
    expect(reportVisibilityReducer(undefined, mockAction)).toEqual('REPORTED');
  });
});