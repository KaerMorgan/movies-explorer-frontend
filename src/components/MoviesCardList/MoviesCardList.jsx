import { useEffect, useState } from 'react';
import MoviesCard from '../../components/MoviesCard';
import {
  LAPTOP_ADD_CARDS_NUMBER,
  LAPTOP_BREAKPOINT,
  LAPTOP_CARDS_ARRAY_LENGTH,
  MOBILE_ADD_CARDS_NUMBER,
  MOBILE_CARDS_ARRAY_LENGTH,
  TABLET_ADD_CARDS_NUMBER,
  TABLET_BREAKPOINT,
  TABLET_CARDS_ARRAY_LENGTH,
} from '../../utils/constants';
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
    if (width >= LAPTOP_BREAKPOINT) {
      setEndofArray(endofArray + LAPTOP_ADD_CARDS_NUMBER);
    } else if (width >= TABLET_BREAKPOINT) {
      setEndofArray(endofArray + TABLET_ADD_CARDS_NUMBER);
    } else {
      setEndofArray(endofArray + MOBILE_ADD_CARDS_NUMBER);
    }
  };

  useEffect(() => {
    window.addEventListener('resize', handleResize);
    setWidth(window.innerWidth);
    if (width >= LAPTOP_BREAKPOINT) {
      setEndofArray(LAPTOP_CARDS_ARRAY_LENGTH);
    } else if (width >= TABLET_BREAKPOINT) {
      setEndofArray(TABLET_CARDS_ARRAY_LENGTH);
    } else {
      setEndofArray(MOBILE_CARDS_ARRAY_LENGTH);
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
