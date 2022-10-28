import Footer from '../../components/Footer';
import Header from '../../components/Header';
import MoviesCard from '../../components/MoviesCard';
import MoviesCardList from '../../components/MoviesCardList';
import SearchForm from '../../components/SearchForm';

const SavedMovies = () => {
  const cards = [1, 1, 1];

  return (
    <>
      <Header isLoggedIn={true} />
      <SearchForm />
      {/* {isLoading ? (
      <Preloader />
    ) : ( */}
      <MoviesCardList>
        {/* {cards.map((card) => {
          return <Card data={card} />;
        })} */}
        {cards.map((card, index) => {
          return <MoviesCard key={index} saved={true} />;
        })}
      </MoviesCardList>
      {/* )} */}
      <Footer />
    </>
  );
};

export default SavedMovies;
