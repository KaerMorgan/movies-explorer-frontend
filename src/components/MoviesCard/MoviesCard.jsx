import filler from '../../images/filler.png';
import like from '../../images/like.png';
import liked from '../../images/liked.png';
import cross from '../../images/cross.png';
import './MoviesCard.scss';

const MoviesCard = ({ data = {}, saved = false }) => {
  const { name, image, duration } = data;
  const isLiked = true;

  return (
    <article className='card'>
      <img src={image || filler} alt='Кадр из трейлера' className='card__image' />
      <div className='card__group'>
        <h3 className='card__title'>{name || '33 слова о дизайне'}</h3>
        <button className='card__like'>
          <img
            src={(isLiked && !saved && liked) || (!isLiked && like) || (saved === true && cross)}
            alt={
              ((isLiked || saved === true) && 'Убрать из сохранённых') || (!isLiked && 'Сохранить')
            }
            className='card__like-image'
          />
        </button>
      </div>
      <p className='card__caption'>{duration || '1ч 47м'}</p>
    </article>
  );
};

export default MoviesCard;
