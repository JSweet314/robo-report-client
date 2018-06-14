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

export const getUserComplaints = userId => ({
  type: 'GET_USER_COMPLAINTS',
  userId
});

export const captureDbComplaints = complaints => ({
  type: 'CAPTURE_DB_COMPLAINTS',
  complaints
});

export const updateUserInfo = user => ({
  type: 'UPDATE_USER_INFO',
  user
});

export const captureError = error => ({
  type: 'CAPTURE_ERROR',
  error
});

export const getFCCData = () => ({
  type: 'GET_FCC_DATA'
});

export const captureFCCData = fccData => ({
  type: 'CAPTURE_FCC_DATA',
  fccData
});

export const filterReports = filter => ({
  type: 'FILTER_REPORT_VISIBILITY',
  filter
});