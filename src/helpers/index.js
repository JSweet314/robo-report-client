/* eslint-disable id-length */

export const mapFCCDataToStateNumbers = fccData => {
  const counts = fccData.reduce((states, complaint) => {
    if (complaint.state) {
      if (states[complaint.state] === undefined) {
        states[complaint.state] = 0;
      }
      states[complaint.state]++;
    }
    return states;
  }, {
    "AL": 0,
    "AK": 0,
    "AS": 0,
    "AZ": 0,
    "AR": 0,
    "CA": 0,
    "CO": 0,
    "CT": 0,
    "DE": 0,
    "DC": 0,
    "FL": 0,
    "GA": 0,
    "HI": 0,
    "ID": 0,
    "IL": 0,
    "IN": 0,
    "IA": 0,
    "KS": 0,
    "KY": 0,
    "LA": 0,
    "ME": 0,
    "MD": 0,
    "MA": 0,
    "MI": 0,
    "MN": 0,
    "MS": 0,
    "MO": 0,
    "MT": 0,
    "NE": 0,
    "NV": 0,
    "NH": 0,
    "NJ": 0,
    "NM": 0,
    "NY": 0,
    "NC": 0,
    "ND": 0,
    "OH": 0,
    "OK": 0,
    "OR": 0,
    "PA": 0,
    "PR": 0,
    "RI": 0,
    "SC": 0,
    "SD": 0,
    "TN": 0,
    "TX": 0,
    "UT": 0,
    "VT": 0,
    "VA": 0,
    "WA": 0,
    "WV": 0,
    "WI": 0,
    "WY": 0
  });
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
