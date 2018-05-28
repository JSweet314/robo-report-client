export const postNewUser = async user => {
  try {
    const response = await fetch(
      'http://roboreport-api.herokuapp.com/api/v1/users',
      {
        method: 'POST',
        headers: {
          // eslint-disable-next-line
          token: process.env.REACT_APP_ROBO_TOKEN,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
      }
    );
    if (response.ok) {
      return await response.json();
    }
    throw new Error(`Bad response, status code: ${response.status}`);
  } catch (error) {
    throw new Error(`postNewUser error: ${error.message}`);
  }
};

export const getUserInfo = async userEmail => {
  try {
    const response = await fetch(
      `http://roboreport-api.herokuapp.com/api/v1/users?email=${userEmail}`,
      {
        headers: {
          // eslint-disable-next-line
          token: process.env.REACT_APP_ROBO_TOKEN
        }
      }
    );
    if (response.ok) {
      return await response.json();
    }
    throw new Error(`Bad response, status code: ${response.status}`);
  } catch (error) {
    throw new Error(`getUserInfo error: ${error.message}`);
  }
};

export const postNewComplaint = async complaint => {
  try {
    const response = await fetch(
      'http://roboreport-api.herokuapp.com/api/v1/complaints',
      {
        method: 'POST',
        headers: {
          // eslint-disable-next-line
          token: process.env.REACT_APP_ROBO_TOKEN,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(complaint)
      }
    );

    if (response.ok) {
      return await response.json();
    }
    throw new Error(`Bad response, status code: ${response.status}`);
  } catch (error) {
    throw new Error(`postNewComplaint error: ${error.message}`);
  }
};

export const getUserComplaints = async userId => {
  try {
    const response = await fetch(
      `http://roboreport-api.herokuapp.com/api/v1/complaints?user_id=${userId}`,
      {
        headers: {
          token: process.env.REACT_APP_ROBO_TOKEN
        }
      }
    );
    if (response.ok) {
      return await response.json();
    }
    throw new Error(`Bad response, status code: ${response.status}`);
  } catch (error) {
    throw new Error(`getUserComplaints error: ${error.message}`);
  }
};
