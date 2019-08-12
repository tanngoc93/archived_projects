const profileUrl = `http://0.0.0.0:3003/api/v1/users`;
const signupUserUrl = `http://0.0.0.0:3003/api/v1/sign_up`;

function signupApi(user) {
  return fetch(signupUserUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(user),
  })
    .then(response => response.json())
    .then((data) => {
      if (data.status === 'error') {
        throw Error(data.message)
      }
      return data;
    })
    .catch((error) => { throw error })
}

function getProfileApi() {
  return fetch(profileUrl, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Token ${localStorage.getItem('auth_token')}`
    }
  })
    .then(response => response.json())
    .then((data) => {
      if (data.status === 'error') {
        throw Error(data.message)
      }
      return data;
    })
    .catch((error) => { throw error })
}

function updateProfileApi(user) {
  return fetch(profileUrl, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Token ${localStorage.getItem('auth_token')}`
    },
    body: JSON.stringify(user),
  })
    .then(response => response.json())
    .then((data) => {
      if (data.status === 'error') {
        throw Error(data.message)
      }
      return data;
    })
    .catch((error) => { throw error })
}

export { signupApi, getProfileApi, updateProfileApi };