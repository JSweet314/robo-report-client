const reportVisibilityReducer = (state = 'ALL', action) => {
  switch (action.type) {
  case 'FILTER_REPORT_VISIBILITY':
    return action.filter;
  default:
    return state;
  }
};

export default reportVisibilityReducer;