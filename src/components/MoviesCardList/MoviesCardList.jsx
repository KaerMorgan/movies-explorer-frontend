import { useEffect, useState } from 'react';
import MoviesCard from '../../components/MoviesCard';
import './MoviesCardList.scss';

const MoviesCardList = ({ cards, onLike }) => {
  const [width, setWidth] = useState(0);
  const [endofArray, setEndofArray] = useState(0);

  const handleResize = () => {
    setTimeout(() => {
      setWidth(window.innerWidth);
    }, 1000);
  };

  const handleMoreClick = () => {
    if (width >= 1280) {
      setEndofArray(endofArray + 3);
    } else if (width >= 768) {
      setEndofArray(endofArray + 2);
    } else {
      setEndofArray(endofArray + 2);
    }
  };

  useEffect(() => {
    window.addEventListener('resize', handleResize);
    setWidth(window.innerWidth);
    if (width >= 1280) {
      setEndofArray(11);
    } else if (width >= 768) {
      setEndofArray(7);
    } else {
      setEndofArray(4);
    }
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [width]);

  return (
    <section className='card-list'>
      <ul className='card-list__container'>
        {cards.map((card, index) => {
          return (
            index <= endofArray && (
              <MoviesCard data={card} key={index + card.nameRU} onLike={onLike} />
            )
          );
        })}
      </ul>
      {endofArray >= cards.length - 1 ? null : (
        <button type='button' className='card-list__button' onClick={handleMoreClick}>
          Ещё
        </button>
      )}
    </section>
  );
};

export default MoviesCardList;
