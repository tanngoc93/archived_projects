const signinUserUrl = `http://0.0.0.0:3003/api/v1/sign_in`;

function signinApi(credentials) {
  return fetch(signinUserUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(credentials),
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

export { signinApi };