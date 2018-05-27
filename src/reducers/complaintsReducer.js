const complaintsReducer = (state = [], action) => {
  switch (action.type) {
  case 'CAPTURE_COMPLAINT':
    return [...state, action.complaint];  
  default:
    return state;
  }
};

export default complaintsReducer;