import like from '../../images/like.png';
import liked from '../../images/liked.png';
import cross from '../../images/cross.png';
import './MoviesCard.scss';

const MoviesCard = ({ data = {}, onLike = () => void 0 }) => {
  const { nameRU, nameEN, image, duration, description } = data;

  const savedMovies = JSON.parse(localStorage.getItem('savedFilms'));

  const savedMoviesPageOpened = window.location.href.indexOf('saved-movies') != -1;
  const movieSaved =
    (savedMovies?.length > 0 &&
      savedMovies.some((item) => {
        return item.nameRU == nameRU;
      })) ||
    false;

  const transformedDuration = () => {
    const hours = Math.trunc(duration / 60);
    const minutes = duration % 60;
    if (hours == 0) {
      return `${minutes}м`;
    } else {
      return `${hours}ч ${minutes}м`;
    }
  };

  return (
    <li className='card'>
      <img
        src={savedMoviesPageOpened ? data.image : `https://api.nomoreparties.co/${image.url}`}
        alt={description}
        className='card__image'
        onClick={() => {
          window.open(data.trailerLink);
        }}
      />
      <div className='card__text-group'>
        <h3 className='card__title'>{nameRU || nameEN}</h3>
        <button
          type='button'
          className='card__like'
          onClick={() => {
            onLike(data);
          }}
        >
          <img
            src={savedMoviesPageOpened ? cross : movieSaved ? liked : like}
            alt={
              ((movieSaved || savedMoviesPageOpened === true) && 'Убрать из сохранённых') ||
              (!movieSaved && 'Сохранить')
            }
            className='card__like-image'
          />
        </button>
      </div>
      <p className='card__caption'>{transformedDuration()}</p>
    </li>
  );
};

export default MoviesCard;
