export const submitNewUser = user => ({
  type: 'SUBMIT_NEW_USER',
  user
});

export const getSavedUserInfo = userEmail => ({
  type: 'GET_USER_INFO',
  userEmail
});

export const captureUser = user => ({
  type: 'CAPTURE_USER',
  user
});

export const captureError = error => ({
  type: 'CAPTURE_ERROR',
  error
});
