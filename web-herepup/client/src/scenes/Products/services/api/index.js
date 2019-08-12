const newProductUrl = `http://0.0.0.0:3003/api/v1/products`;

function newProductApi(product) {
  return fetch(newProductUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Token ${localStorage.getItem('auth_token')}`
    },
    body: JSON.stringify(product),
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

export { newProductApi };
