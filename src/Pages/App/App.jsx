import { useEffect, useLayoutEffect, useState } from 'react';
import { UserContext } from '../../contexts/UserContext';
import { Navigate, Route, Routes, useNavigate } from 'react-router-dom';
import { getMovies } from '../../utils/MoviesApi';
import Main from '../Main';
import Movies from '../Movies';
import SavedMovies from '../SavedMovies';
import Profile from '../../components/Profile';
import Login from '../Login';
import Register from '../Register';
import NotFoundPage from '../NotFoundPage/NotFoundPage';
import ProtectedRoute from '../../components/ProtectedRoute';
import { getSavedMovies, getUserInfo, removeMovie, saveMovie } from '../../utils/MainApi';
import { SHORT_FILM_DURATION } from '../../utils/constants';

const App = () => {
  const token = localStorage.getItem('token');
  const navigate = useNavigate();

  const [userInfo, setUserInfo] = useState({});

  const [allSavedFilms, setAllSavedFilms] = useState(
    JSON.parse(localStorage.getItem('savedFilms')) ?? [],
  );
  const [allFilms, setAllFilms] = useState(JSON.parse(localStorage.getItem('allFilms')) ?? []);
  const [filteredSavedFilmsList, setFilteredSavedFilmsList] = useState(allSavedFilms);
  const [filteredFilmsList, setFilteredFilmsList] = useState(
    JSON.parse(localStorage.getItem('filteredFilms')) ?? [],
  );

  const [searchFilmValue, setSearchFilmValue] = useState(
    localStorage.getItem('searchFilmValue') ?? '',
  );
  const [searchSavedFilmValue, setSearchSavedFilmValue] = useState('');

  const [shortFilmsChecked, setShortFilmsChecked] = useState(
    localStorage.getItem('filmsCheckbox') === 'true' ? true : false,
  );
  const [shortSavedFilmsChecked, setShortSavedFilmsChecked] = useState(
    localStorage.getItem('savedFilmsCheckbox') == 'true' ? true : false,
  );

  const [isLoading, setIsLoading] = useState(false);

  const clearSavedQuery = () => {
    setSearchSavedFilmValue('');
    const switchedInitialist = switchFilmsType(allSavedFilms, shortSavedFilmsChecked);
    setFilteredSavedFilmsList(switchedInitialist);
  };

  const switchFilmsType = (films, checkState) => {
    if (checkState) {
      const shortFilms = films.filter((item) => {
        return item.duration < SHORT_FILM_DURATION;
      });
      return shortFilms;
    } else {
      const featureFilms = films.filter((item) => {
        return item.duration > SHORT_FILM_DURATION;
      });
      return featureFilms;
    }
  };

  const filterFilms = (films, filterValue) => {
    return films.filter((item) => {
      return (
        item.nameRU.toLowerCase().trim().indexOf(filterValue.toLowerCase().trim()) !== -1 ||
        item.nameEN.toLowerCase().trim().indexOf(filterValue.toLowerCase().trim()) !== -1
      );
    });
  };

  const onUserInfoChange = (values) => {
    setUserInfo(values);
  };

  const onLogin = async () => {
    // это должно справиться с проверкой токена
    try {
      const user = await getUserInfo();
      setUserInfo(user);
      localStorage.setItem('isLogged', true);
    } catch (error) {
      localStorage.clear();
      navigate('/');
    }
  };

  const onLogout = () => {
    localStorage.clear();
    setAllSavedFilms([]);
    setFilteredSavedFilmsList([]);
    setFilteredFilmsList([]);
    setSearchFilmValue('');
    setSearchSavedFilmValue('');
    setShortFilmsChecked(false);
    setShortSavedFilmsChecked(false);
    setIsLoading(false);
    navigate('/');
  };

  const onInputChange = (target) => {
    if (target.classList.contains('saved-films')) {
      setSearchSavedFilmValue(target.value);
    } else {
      setSearchFilmValue(target.value);
    }
  };

  const onCheckboxSwitch = (target) => {
    if (target.classList.contains('saved-films')) {
      localStorage.setItem('savedFilmsCheckbox', !shortSavedFilmsChecked);
      setShortSavedFilmsChecked(!shortSavedFilmsChecked);
      if (searchSavedFilmValue) {
        const filteredSavedFilms = filterFilms(allSavedFilms, searchSavedFilmValue);
        const switchedSavedFilms = switchFilmsType(filteredSavedFilms, !shortSavedFilmsChecked);
        setFilteredSavedFilmsList(switchedSavedFilms);
      } else {
        const switchedSavedFilms = switchFilmsType(allSavedFilms, !shortSavedFilmsChecked);
        setFilteredSavedFilmsList(switchedSavedFilms);
      }
    } else {
      localStorage.setItem('filmsCheckbox', !shortFilmsChecked);
      setShortFilmsChecked(!shortFilmsChecked);

      if (allFilms.length > 0 && searchFilmValue) {
        const filteredFilms = filterFilms(allFilms, searchFilmValue);
        const switchedFilms = switchFilmsType(filteredFilms, !shortFilmsChecked);
        setFilteredFilmsList(switchedFilms);
        localStorage.setItem('filteredFilms', JSON.stringify(switchedFilms));
      }
    }
  };

  const onFormSubmit = async (target) => {
    let fetchedMovies = JSON.parse(localStorage.getItem('allFilms'));

    if (!fetchedMovies || fetchedMovies.length == 0) {
      try {
        fetchedMovies = await getMovies();
        localStorage.setItem('allFilms', JSON.stringify(fetchedMovies));
        setAllFilms(fetchedMovies);
      } catch (error) {
        console.log('Ошибка при получении списка фильмов с BeatFilms', error);
      }
    }

    if (target.classList.contains('saved-films')) {
      const savedMovies = JSON.parse(localStorage.getItem('savedFilms'));

      const filteredSavedFilms = filterFilms(savedMovies, searchSavedFilmValue);

      const switchedSavedFilms = switchFilmsType(filteredSavedFilms, shortSavedFilmsChecked);

      setFilteredSavedFilmsList(switchedSavedFilms);
    } else {
      setIsLoading(true);
      localStorage.setItem('searchFilmValue', searchFilmValue);

      const filteredFilms = filterFilms(
        allFilms.length > 0 ? allFilms : fetchedMovies,
        searchFilmValue,
      );

      const switchedFilms = switchFilmsType(filteredFilms, shortFilmsChecked);

      setFilteredFilmsList(switchedFilms);

      localStorage.setItem('filteredFilms', JSON.stringify(switchedFilms));

      setIsLoading(false);
    }
  };

  const onLike = async (card) => {
    const movieIsSaved =
      (allSavedFilms?.length > 0 &&
        allSavedFilms.some((item) => {
          return item.nameRU == card.nameRU;
        })) ||
      false;

    if (movieIsSaved) {
      const cardToDelete = allSavedFilms.find((item) => {
        return item.nameRU == card.nameRU;
      });

      try {
        await removeMovie(cardToDelete._id);
        const newSavedMovies = allSavedFilms.filter((item) => item._id != cardToDelete._id);
        setAllSavedFilms(newSavedMovies);
        localStorage.setItem('savedFilms', JSON.stringify(newSavedMovies));

        const filteredSavedFilms = filterFilms(newSavedMovies, searchSavedFilmValue);

        const switchedSavedFilms = switchFilmsType(filteredSavedFilms, shortSavedFilmsChecked);
        setFilteredSavedFilmsList(switchedSavedFilms);
      } catch (error) {
        // TODO обработка ошибок
        console.log('Ошибка при удалении карточки: ', error);
      }
    } else {
      try {
        const savedCard = await saveMovie(card);
        localStorage.setItem('savedFilms', JSON.stringify([savedCard, ...allSavedFilms]));
        setAllSavedFilms([savedCard, ...allSavedFilms]);
        setFilteredSavedFilmsList([savedCard, ...filteredSavedFilmsList]);
      } catch (error) {
        // TODO обработка ошибок
        console.log('Ошибка при сохранении карточки: ', error);
      }
    }
  };

  useEffect(() => {
    (async () => {
      try {
        await onLogin();
      } catch (error) {
        console.log('Ошибка при запросе данных о пользователе', error);
      }
      try {
        setIsLoading(true);
        const savedFilms = await getSavedMovies();
        setAllSavedFilms(savedFilms);
        const switchedSavedFilms = switchFilmsType(savedFilms, shortSavedFilmsChecked);
        setFilteredSavedFilmsList(switchedSavedFilms);
        localStorage.setItem('savedFilms', JSON.stringify(savedFilms));
        setIsLoading(false);
      } catch (error) {
        console.log('Ошибка при запросе сохранённых фильмов', error);
      }
    })();
  }, [token]);

  return (
    <UserContext.Provider value={userInfo}>
      <Routes>
        <Route path='/' element={<Main />} />
        <Route
          path='/movies'
          element={
            <ProtectedRoute>
              <Movies
                cards={filteredFilmsList}
                isLoading={isLoading}
                checked={shortFilmsChecked}
                inputValue={searchFilmValue}
                onInputChange={onInputChange}
                onCheckboxSwitch={onCheckboxSwitch}
                onFormSubmit={onFormSubmit}
                onLike={onLike}
              />
            </ProtectedRoute>
          }
        />
        <Route
          path='/saved-movies'
          element={
            <ProtectedRoute>
              <SavedMovies
                cards={filteredSavedFilmsList}
                isLoading={isLoading}
                checked={shortSavedFilmsChecked}
                inputValue={searchSavedFilmValue}
                onCleanUp={clearSavedQuery}
                onInputChange={onInputChange}
                onCheckboxSwitch={onCheckboxSwitch}
                onFormSubmit={onFormSubmit}
                onLike={onLike}
              />
            </ProtectedRoute>
          }
        />
        <Route
          path='/profile'
          element={
            <ProtectedRoute>
              <Profile onUserInfoChange={onUserInfoChange} onLogout={onLogout} />
            </ProtectedRoute>
          }
        />
        <Route path='/signin' element={token ? <Navigate to='/' /> : <Login onLogin={onLogin} />} />
        <Route
          path='/signup'
          element={token ? <Navigate to='/' /> : <Register onLogin={onLogin} />}
        />
        <Route path='*' element={<NotFoundPage />} />
      </Routes>
    </UserContext.Provider>
  );
};

export default App;
