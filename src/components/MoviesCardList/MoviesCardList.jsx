import './MoviesCardList.scss';

const MoviesCardList = ({ children }) => {
  return (
    <section className='card-list'>
      <ul className='card-list__container'>{children}</ul>
      <button type='button' className='card-list__button'>
        Ещё
      </button>
    </section>
  );
};

export default MoviesCardList;
