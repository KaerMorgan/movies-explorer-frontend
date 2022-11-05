import Footer from '../../components/Footer';
import Header from '../../components/Header';
import MoviesCardList from '../../components/MoviesCardList';
import SearchForm from '../../components/SearchForm';
import Preloader from '../../components/Preloader';
import './Movies.scss';

const Movies = ({
  cards,
  isLoading,
  checked,
  inputValue,
  onInputChange,
  onCheckboxSwitch,
  onFormSubmit,
  onLike,
}) => {
  const savedInputValue = localStorage.getItem('searchFilmValue');

  return (
    <>
      <Header isLoggedIn={true} />

      <main className='movies'>
        <SearchForm
          checked={checked}
          onCheckboxSwitch={onCheckboxSwitch}
          onSubmit={onFormSubmit}
          inputValue={inputValue}
          onInputChange={onInputChange}
        />
        {isLoading ? (
          <Preloader />
        ) : !isLoading && savedInputValue && cards.length > 0 ? (
          <MoviesCardList cards={cards} onLike={onLike} />
        ) : !isLoading && savedInputValue ? (
          <h2 className='movies__message'>Ничего не найдено</h2>
        ) : null}
      </main>

      <Footer />
    </>
  );
};

export default Movies;
