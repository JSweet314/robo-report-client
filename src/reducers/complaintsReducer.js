const complaintsReducer = (state = [], action) => {
  switch (action.type) {
  case 'CAPTURE_COMPLAINT':
    return [...state, action.complaint];
  case 'CAPTURE_DB_COMPLAINTS':
    return action.complaints;
  default:
    return state;
  }
};

export default complaintsReducer;