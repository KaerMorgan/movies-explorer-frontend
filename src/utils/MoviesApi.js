import { BEATFILMS } from './constants';

const checkErorr = (res) => {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject('Ошибка в промисе: ' + res.status);
};

export const getMovies = () => {
  return fetch(BEATFILMS, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  }).then(checkErorr);
};
