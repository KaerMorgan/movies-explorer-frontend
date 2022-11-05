const checkErorr = (res) => {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject('Ошибка в промисе: ' + res.status);
};

export const getMovies = () => {
  return fetch('https://api.nomoreparties.co/beatfilm-movies', {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  }).then(checkErorr);
};
