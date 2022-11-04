import { useState } from 'react';
import filler from '../../images/filler.png';
import like from '../../images/like.png';
import liked from '../../images/liked.png';
import cross from '../../images/cross.png';
import './MoviesCard.scss';

const MoviesCard = ({ data = {}, saved = false }) => {
  const { nameRU, image, duration } = data;

  const [isLiked, setIsLiked] = useState(false);

  function likeClickHandler() {
    setIsLiked(!isLiked);
  }

  return (
    <li className='card'>
      <img
        src={`https://api.nomoreparties.co/${image.url}` || filler}
        alt={`Кадр из трейлера фильма ${nameRU}`}
        className='card__image'
      />
      <div className='card__text-group'>
        <h3 className='card__title'>{nameRU || '33 слова о дизайне'}</h3>
        <button type='button' className='card__like' onClick={likeClickHandler}>
          <img
            src={
              (isLiked && !saved && liked) ||
              (!isLiked && !saved && like) ||
              (saved === true && cross)
            }
            alt={
              ((isLiked || saved === true) && 'Убрать из сохранённых') || (!isLiked && 'Сохранить')
            }
            className='card__like-image'
          />
        </button>
      </div>
      <p className='card__caption'>{duration || '1ч 47м'}</p>
    </li>
  );
};

export default MoviesCard;
