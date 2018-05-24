const userReducer = (state = {}, action) => {
  switch (action.type) {
  case 'CAPTURE_USER':
    return action.user;
  case 'FORGET_USER':
    return {};
  default:
    return state;
  }
};

export default userReducer;