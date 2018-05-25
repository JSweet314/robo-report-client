import errorReducer from './errorReducer';
import * as actions from '../actions';

describe('errorReducer', () => {
  it('should return a default state', () => {
    expect(errorReducer(undefined, {})).toEqual(null);
  });

  it('should store an error message', () => {
    expect(errorReducer(undefined, actions.captureError('error')))
      .toEqual('error');
  });
});