export const mapFCCDataToStateNumbers = fccData => {
  const counts = fccData.reduce((states, complaint) => {
    !states[complaint.state] ? states[complaint.state] = 1
      : states[complaint.state]++;
    return states;
  }, {});
  return Object.keys(counts)
    .map(key => ({  
      state: key, 
      numberOfReports: counts[key],
      label: `${key}: ${counts[key]} ${counts[key] > 1 ? 'reports' : 'report'}`
    }));
};
  