const errorReducer = (state = null, action) => {
  switch (action.type) {
  case 'CAPTURE_ERROR':
    return action.error;
  case 'CLEAR_ERROR':
    return null;
  default:
    return state;
  }
};

export default errorReducer;