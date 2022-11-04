import { useContext } from 'react';
import { FilmsContext } from '../../contexts/FilmsContext';
import Footer from '../../components/Footer';
import Header from '../../components/Header';
import MoviesCard from '../../components/MoviesCard';
import MoviesCardList from '../../components/MoviesCardList';
import SearchForm from '../../components/SearchForm';
import Preloader from '../../components/Preloader';

const Movies = () => {
  const filmsList = useContext(FilmsContext);

  const isLoading = filmsList.length == 0;
  return (
    <>
      <Header isLoggedIn={true} />

      <main className='movies'>
        <SearchForm />
        {isLoading ? (
          <Preloader />
        ) : (
          <MoviesCardList>
            {filmsList.map((card, index) => {
              return <MoviesCard data={card} key={index} />;
            })}
          </MoviesCardList>
        )}
      </main>

      <Footer />
    </>
  );
};

export default Movies;
