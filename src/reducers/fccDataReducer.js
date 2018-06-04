const fccDataReducer = (state = [], action) => {
  switch (action.type) {
  case 'CAPTURE_FCC_DATA':
    return action.fccData;
  default:
    return state;
  }
};

export default fccDataReducer;