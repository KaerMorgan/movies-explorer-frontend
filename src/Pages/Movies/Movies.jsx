import Footer from '../../components/Footer';
import Header from '../../components/Header';
import MoviesCard from '../../components/MoviesCard';
import MoviesCardList from '../../components/MoviesCardList';
import SearchForm from '../../components/SearchForm';
import Preloader from '../../components/Preloader';

const Movies = () => {
  const cards = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1];
  const isLoading = false;
  return (
    <>
      <Header isLoggedIn={true} />

      <main className='movies'>
        <SearchForm />
        {isLoading ? (
          <Preloader />
        ) : (
          <MoviesCardList>
            {/* {cards.map((card) => {
            return <Card data={card} />;
          })} */}
            {cards.map((card, index) => {
              return <MoviesCard key={index} />;
            })}
          </MoviesCardList>
        )}
      </main>

      <Footer />
    </>
  );
};

export default Movies;
