import fccDataReducer from './fccDataReducer';
import * as actions from '../actions';

describe('fccDataReducer', () => {
  it('should return a default state', () => {
    expect(fccDataReducer(undefined, {})).toEqual([]);
  });

  it('should store an array of FCC data', () => {
    expect(fccDataReducer(undefined, actions.captureFCCData([{}])))
      .toEqual([{}]);
  });
});