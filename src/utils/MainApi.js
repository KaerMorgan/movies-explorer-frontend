import { BASE_URL } from './constants';

const checkErorr = (res) => {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject('Ошибка: ' + res.status);
};

export const register = ({ name, email, password }) => {
  return fetch(`${BASE_URL}/signup`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      name: name,
      email: email.toLowerCase(),
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
      email: email.toLowerCase(),
      password: password,
    }),
  }).then(checkErorr);
};

export const getUserInfo = () => {
  return fetch(`${BASE_URL}/users/me`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      authorization: `Bearer ${localStorage.getItem('token')}`,
    },
  }).then(checkErorr);
};

export const changeUserInfo = ({ name, email }) => {
  return fetch(`${BASE_URL}/users/me`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      authorization: `Bearer ${localStorage.getItem('token')}`,
    },
    body: JSON.stringify({
      name: name,
      email: email.toLowerCase(),
    }),
  }).then(checkErorr);
};

export const getSavedMovies = () => {
  return fetch(`${BASE_URL}/movies`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      authorization: `Bearer ${localStorage.getItem('token')}`,
    },
  }).then(checkErorr);
};

export const saveMovie = (data) => {
  return fetch(`${BASE_URL}/movies`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      authorization: `Bearer ${localStorage.getItem('token')}`,
    },
    body: JSON.stringify({
      country: data.country,
      description: data.description,
      director: data.director,
      duration: data.duration,
      image: `https://api.nomoreparties.co/${data.image.url}`,
      movieId: data.id,
      nameEN: data.nameEN,
      nameRU: data.nameRU,
      thumbnail: `https://api.nomoreparties.co/${data.thumbnail}`,
      trailerLink: data.trailerLink,
      year: data.year,
    }),
  }).then(checkErorr);
};

export const removeMovie = (movieId) => {
  return fetch(`${BASE_URL}/movies/${movieId}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      authorization: `Bearer ${localStorage.getItem('token')}`,
    },
  }).then(checkErorr);
};
