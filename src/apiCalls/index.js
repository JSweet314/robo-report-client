export const postNewUser = async user => {
  try {
    const response = await fetch(
      'http://roboreport-api.herokuapp.com/api/v1/users',
      {
        method: 'POST',
        headers: {
          // eslint-disable-next-line
          token:  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhcHBOYW1lIjoicm9iby1yZXBvcnQtY2xpZW50IiwiZW1haWwiOiJqb25AdHVyaW5nLmlvIiwiYWRtaW4iOnRydWUsImlhdCI6MTUyNzE3MTU0NH0.YuGND82AJldmEJdjxt00hI8SXaPU48YjCg7-usMNc5w',
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
