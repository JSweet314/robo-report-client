const userLoggedInReducer = (state = false, action) => {
  switch (action.type) {
    case 'TOGGLE_USER_STATUS':
      return !state;
    default:
      return state;
  }
};

export default userLoggedInReducer;
