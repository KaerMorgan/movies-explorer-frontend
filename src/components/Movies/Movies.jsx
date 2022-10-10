import Header from '../Header';
import MoviesCard from './components/MoviesCard';
import MoviesCardList from './components/MoviesCardList';
import SearchForm from './components/SearchForm';

const Movies = () => {
  const cards = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1];

  return (
    <>
      <Header />
      <SearchForm />
      {/* {isLoading ? (
        <Preloader />
      ) : ( */}
      <MoviesCardList>
        {/* {cards.map((card) => {
            return <Card data={card} />;
          })} */}
        {cards.map((card) => {
          return <MoviesCard />;
        })}
      </MoviesCardList>
      {/* )} */}
    </>
  );
};

export default Movies;
