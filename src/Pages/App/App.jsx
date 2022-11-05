import { useEffect, useState } from 'react';
import { UserContext } from '../../contexts/UserContext';
import { Route, Routes } from 'react-router-dom';
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

const App = () => {
  const savedMoviesPageOpened = window.location.href.indexOf('saved-movies') != -1;
  const token = localStorage.getItem('token');

  const [userInfo, setUserInfo] = useState({});

  const [allSavedFilms, setAllSavedFilms] = useState(
    JSON.parse(localStorage.getItem('savedFilms')) ?? [],
  );
  const [filteredSavedFilmsList, setFilteredSavedFilmsList] = useState(allSavedFilms);
  const [filteredFilmsList, setFilteredFilmsList] = useState(
    JSON.parse(localStorage.getItem('filteredFilms')) ?? [],
  );

  const [searchFilmValue, setSearchFilmValue] = useState(
    localStorage.getItem('searchFilmValue') ?? '',
  );
  const [searchSavedFilmValue, setSearchSavedFilmValue] = useState('');

  const [shortFilmsChecked, setShortFilmsChecked] = useState(
    localStorage.getItem('filmsCheckbox') == 'true' ? true : false,
  );
  const [shortSavedFilmsChecked, setShortSavedFilmsChecked] = useState(
    localStorage.getItem('savedFilmsCheckbox') == 'true' ? true : false,
  );

  const [isLoading, setIsLoading] = useState(false);

  const switchFilmsType = (films, checkState) => {
    if (checkState) {
      const shortFilms = films.filter((item) => {
        return item.duration < 40;
      });
      return shortFilms;
    } else {
      const featureFilms = films.filter((item) => {
        return item.duration > 40;
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
    const user = await getUserInfo();
    setUserInfo(user);
  };

  const onInputChange = (value) => {
    if (savedMoviesPageOpened) {
      setSearchSavedFilmValue(value);
    } else {
      setSearchFilmValue(value);
    }
  };

  const onCheckboxSwitch = () => {
    if (savedMoviesPageOpened) {
      localStorage.setItem('savedFilmsCheckbox', !shortSavedFilmsChecked);
      setShortSavedFilmsChecked(!shortSavedFilmsChecked);
      // почему на следующей строке после установки нового стейта он всё ещё не обновлен?
    } else {
      localStorage.setItem('filmsCheckbox', !shortFilmsChecked);
      setShortFilmsChecked(!shortFilmsChecked);
    }
  };

  const onFormSubmit = async () => {
    if (savedMoviesPageOpened) {
      const savedMovies = JSON.parse(localStorage.getItem('savedFilms'));

      const filteredSavedFilms = filterFilms(savedMovies, searchSavedFilmValue);

      const switchedSavedFilms = switchFilmsType(filteredSavedFilms, shortSavedFilmsChecked);

      setFilteredSavedFilmsList(switchedSavedFilms);
    } else {
      try {
        setIsLoading(true);
        localStorage.setItem('searchFilmValue', searchFilmValue);

        const allMovies = await getMovies();

        const filteredFilms = filterFilms(allMovies, searchFilmValue);

        const switchedFilms = switchFilmsType(filteredFilms, shortFilmsChecked);

        setFilteredFilmsList(switchedFilms);

        localStorage.setItem('filteredFilms', JSON.stringify(switchedFilms));

        setIsLoading(false);
      } catch (error) {
        // TODO обработка ошибок
        console.log('Ошибка при получении фильмов: ', error);
      }
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
        setFilteredSavedFilmsList(newSavedMovies);
        localStorage.setItem('savedFilms', JSON.stringify(newSavedMovies));
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
      onLogin();
      setIsLoading(true);
      const savedFilms = await getSavedMovies();
      setAllSavedFilms(savedFilms);
      const switchedSavedFilms = switchFilmsType(savedFilms, shortSavedFilmsChecked);
      setFilteredSavedFilmsList(switchedSavedFilms);
      localStorage.setItem('savedFilms', JSON.stringify(savedFilms));
      setIsLoading(false);
    })();
  }, [token]);

  // фильтрация фильмов при каждом переключении чекбокса
  useEffect(() => {
    onFormSubmit();
  }, [shortFilmsChecked, shortSavedFilmsChecked]);

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
              <Profile onUserInfoChange={onUserInfoChange} />
            </ProtectedRoute>
          }
        />
        <Route path='/signin' element={<Login onLogin={onLogin} />} />
        <Route path='/signup' element={<Register onLogin={onLogin} />} />
        <Route path='*' element={<NotFoundPage />} />
      </Routes>
    </UserContext.Provider>
  );
};

export default App;
