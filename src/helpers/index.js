/* eslint-disable id-length */

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
    }))
    .sort((stateA, stateB) => stateA.state < stateB.state ? -1 : 1);
};

export const mapFCCDataToTypeOfCall = fccData => {
  const counts = fccData.reduce((types, complaint) => {
    !types[complaint['type_of_call_or_messge']] ? 
      types[complaint['type_of_call_or_messge']] = 1
      : types[complaint['type_of_call_or_messge']]++;
    return types;
  }, {});

  const totalReports = Object.values(counts)
    .reduce((total, value) => total + value, 0);

  return Object.keys(counts)
    .map(key => ({
      x: key,
      y: Math.round(counts[key] * 100 / totalReports),
      label: 
        `"${key}": ${counts[key]} ${counts[key] > 1 ? 'reports' : 'report'}`
    }));
};
