const errorReducer = (state = null, action) => {
  switch (action.type) {
  case 'CAPTURE_ERROR':
    return action.error;
  default:
    return state;
  }
};

export default errorReducer;