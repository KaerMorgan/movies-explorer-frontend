const BASE_URL = `${window.location.protocol}//api.movies-explorer.nomoredomains.sbs`;

function checkErorr(res) {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject('Ошибка: ' + res.status);
}

export const register = ({ name, email, password }) => {
  return fetch(`${BASE_URL}/signup`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      name: name,
      email: email,
      password: password,
    }),
  }).then(checkErorr);
};

export const login = ({ email, password }) => {
  return fetch(`${BASE_URL}/signin`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      email: email,
      password: password,
    }),
  }).then(checkErorr);
};

export const getUserInfo = () => {
  return fetch(`${BASE_URL}/users/me`, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json', authorization: _getToken() },
  }).then(checkErorr);
};

export const changeUserInfo = ({ name, email }) => {
  return fetch(`${BASE_URL}/users/me`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json', authorization: _getToken() },
    body: JSON.stringify({
      name: name,
      email: email,
    }),
  }).then(checkErorr);
};

const _getToken = () => {
  return `Bearer ${localStorage.getItem('token')}`;
};