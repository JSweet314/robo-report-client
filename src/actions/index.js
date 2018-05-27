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

export const submitNewComplaint = complaint => ({
  type: 'SUBMIT_NEW_COMPLAINT',
  complaint
});

export const captureComplaint = complaint => ({
  type: 'CAPTURE_COMPLAINT',
  complaint
});

export const captureError = error => ({
  type: 'CAPTURE_ERROR',
  error
});
