export const fetchWrapper = {
  get,
  post,
  patch,
  delete: _delete,
};

const token = localStorage.getItem('accessToken') || '';
// const bearer = 'Bearer ' + token;

function get(url) {
  const requestOptions = {
    method: 'GET',
    headers: {
      'auth-token': token,
    },
  };
  return fetch(url, requestOptions).then(handleResponse);
}

function post(url, body) {
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'auth-token': token },
    body: JSON.stringify(body),
  };
  return fetch(url, requestOptions).then(handleResponse);
}

function patch(url, body) {
  const requestOptions = {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json', 'auth-token': token  },
    body: JSON.stringify(body),
  };
  return fetch(url, requestOptions).then(handleResponse);
}

// prefixed with underscored because delete is a reserved word in javascript
function _delete(url) {
  const requestOptions = {
    method: 'DELETE',
    headers: {
        'auth-token': token 
    }
  };
  return fetch(url, requestOptions).then(handleResponse);
}

// helper functions

function handleResponse(response) {
  return response.text().then((text) => {
    const data = text && JSON.parse(text);

    if (!response.ok) {
      const error = (data && data.message) || response.statusText;
      return Promise.reject(error);
    }

    return data;
  });
}
