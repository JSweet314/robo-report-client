export const toggleUserStatus = () => ({
  type: 'TOGGLE_USER_STATUS'
});

export const submitNewUser = user => ({
  type: 'SUBMIT_NEW_USER',
  user
});

export const captureUser = user => ({
  type: 'CAPTURE_USER',
  user
});

export const forgetUser = () => ({
  type: 'FORGET_USER'
});

export const captureError = error => ({
  type: 'CAPTURE_ERROR',
  error
});
