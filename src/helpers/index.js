/* eslint-disable id-length */

export const mapFCCDataToStateNumbers = fccData => {
  const counts = fccData.reduce((states, complaint) => {
    if (complaint.state) {
      if (!states[complaint.state]) {
        states[complaint.state] = 0;
      }
      states[complaint.state]++;
    }
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
    if (complaint['type_of_call_or_messge']){
      !types[complaint['type_of_call_or_messge']] ? 
        types[complaint['type_of_call_or_messge']] = 1
        : types[complaint['type_of_call_or_messge']]++;
    }
    return types;
  }, {});

  const totalReports = Object.values(counts)
    .reduce((total, value) => total + value, 0);

  return Object.keys(counts)
    .map(key => {
      const percentage = Math.round(counts[key] * 100 / totalReports);
      return {
        x: key,
        y: percentage,
        label: `${percentage}%\n${key}`
      };
    });
};

export const states = [
  "Alabama", 
  "Alaska", 
  "American Samoa", 
  "Arizona", 
  "Arkansas", 
  "California", 
  "Colorado", 
  "Connecticut", 
  "Delaware", 
  "District of Columbia", 
  "Florida", 
  "Georgia", 
  "Guam", 
  "Hawaii", 
  "Idaho", 
  "Illinois", 
  "Indiana", 
  "Iowa", 
  "Kansas", 
  "Kentucky", 
  "Louisiana", 
  "Maine", 
  "Maryland", 
  "Massachusetts", 
  "Michigan", 
  "Minnesota", 
  "Mississippi", 
  "Missouri", 
  "Montana", 
  "Nebraska", 
  "Nevada", 
  "New Hampshire", 
  "New Jersey", 
  "New Mexico", 
  "New York", 
  "North Carolina", 
  "North Dakota", 
  "Northern Mariana Islands", 
  "Ohio", 
  "Oklahoma", 
  "Oregon", 
  "Pennsylvania", 
  "Puerto Rico", 
  "Rhode Island", 
  "South Carolina", 
  "South Dakota", 
  "Tennessee", 
  "Texas", 
  "U.S. Virgin Islands", 
  "Utah", 
  "Vermont", 
  "Virginia", 
  "Washington", 
  "West Virginia", 
  "Wisconsin", 
  "Wyoming" 
];
