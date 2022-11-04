import { useEffect, useState } from 'react';
import { getMovies } from '../../utils/MoviesApi';
import Footer from '../../components/Footer';
import Header from '../../components/Header';
import MoviesCardList from '../../components/MoviesCardList';
import SearchForm from '../../components/SearchForm';
import Preloader from '../../components/Preloader';
import './Movies.scss';

const Movies = () => {
  const [searchFilmValue, setSearchFilmValue] = useState(
    localStorage.getItem('searchFilmValue') ?? '',
  );
  const [shortFilmsChecked, setShortFilmsChecked] = useState(
    localStorage.getItem('searchFilmCheckbox') == 'true' ? true : false,
  );
  const [initialFilmsList, setInitialFilmsList] = useState([]);
  const [filteredFilmList, setFilteredFilmList] = useState(
    JSON.parse(localStorage.getItem('filteredFilms')) ?? [],
  );
  const [isLoading, setisLoading] = useState(false);

  const handleCheckboxSwitch = () => {
    setShortFilmsChecked(!shortFilmsChecked);
    // почему на следующей строке после установки нового стейта он всё ещё не обновлен?
    localStorage.setItem('searchFilmCheckbox', !shortFilmsChecked);
  };

  const handleFilterFilms = () => {
    setisLoading(true);
    const searchValue = localStorage.getItem('searchFilmValue');
    const filteredFilms = initialFilmsList.filter((item) => {
      return (
        item.nameRU.toLowerCase().trim().indexOf(searchValue.toLowerCase().trim()) !== -1 ||
        item.nameEN.toLowerCase().trim().indexOf(searchValue.toLowerCase().trim()) !== -1
      );
    });
    localStorage.setItem('filteredFilms', JSON.stringify(filteredFilms));
    if (!shortFilmsChecked) {
      const filteredShortFilms = filteredFilms.filter((item) => {
        return item.duration > 40;
      });
      setFilteredFilmList(filteredShortFilms);
      setisLoading(false);
    } else {
      setFilteredFilmList(filteredFilms);
      setisLoading(false);
    }
  };

  useEffect(() => {
    getMovies().then((res) => {
      setInitialFilmsList(res);
      // фильтрация фильмов при изначальной загрузке
      !shortFilmsChecked &&
        setFilteredFilmList(
          filteredFilmList.filter((item) => {
            return item.duration > 40;
          }),
        );
    });
  }, []);

  // фильтрация фильмов при каждом переключении чекбокса
  useEffect(() => {
    if (shortFilmsChecked) {
      setFilteredFilmList(JSON.parse(localStorage.getItem('filteredFilms')));
    } else {
      setFilteredFilmList(
        filteredFilmList.filter((item) => {
          return item.duration > 40;
        }),
      );
    }
  }, [shortFilmsChecked]);
  return (
    <>
      <Header isLoggedIn={true} />

      <main className='movies'>
        <SearchForm
          checked={shortFilmsChecked}
          onCheck={handleCheckboxSwitch}
          onSubmit={handleFilterFilms}
        />
        {isLoading ? (
          <Preloader />
        ) : !isLoading && filteredFilmList.length > 0 ? (
          <MoviesCardList cards={filteredFilmList} />
        ) : !isLoading && searchFilmValue ? (
          <h2 className='movies__message'>Ничего не найдено</h2>
        ) : null}
      </main>

      <Footer />
    </>
  );
};

export default Movies;
