const userReducer = (state = {}, action) => {
  switch (action.type) {
  case 'CAPTURE_USER':
    return action.user;
  default:
    return state;
  }
};

export default userReducer;