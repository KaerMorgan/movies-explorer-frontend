import Footer from '../../components/Footer';
import Header from '../../components/Header';
import MoviesCardList from '../../components/MoviesCardList';
import SearchForm from '../../components/SearchForm';
import Preloader from '../../components/Preloader';
import '../Movies/Movies.scss';
import { useEffect } from 'react';

const SavedMovies = ({
  cards,
  isLoading,
  checked,
  inputValue,
  onCleanUp,
  onInputChange,
  onCheckboxSwitch,
  onFormSubmit,
  onLike,
}) => {
  useEffect(() => {
    return () => {
      onCleanUp();
    };
  }, []);

  return (
    <>
      <Header isLoggedIn={true} />
      <SearchForm
        checked={checked}
        onCheckboxSwitch={onCheckboxSwitch}
        onSubmit={onFormSubmit}
        inputValue={inputValue}
        onInputChange={onInputChange}
        isLoading={isLoading}
        addClasses='saved-films'
      />
      {isLoading ? (
        <Preloader />
      ) : !isLoading && cards.length > 0 ? (
        <MoviesCardList cards={cards} onLike={onLike} />
      ) : !isLoading && cards.length < 1 ? (
        <h2 className='movies__message'>Нет сохранённых фильмов</h2>
      ) : null}
      <Footer />
    </>
  );
};

export default SavedMovies;
