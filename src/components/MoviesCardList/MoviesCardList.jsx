import './MoviesCardList.scss';

const MoviesCardList = ({ children }) => {
  return (
    <section className='card-list'>
      {children}
      <button className='card-list__button'>Ещё</button>
    </section>
  );
};

export default MoviesCardList;
