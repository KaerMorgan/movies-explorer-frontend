import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../Header';
import './Profile.scss';

const Profile = () => {
  const [isEditMode, setIsEditMode] = useState(false);

  const navigate = useNavigate();

  const [name, setName] = useState('Данил');
  const [email, setEmail] = useState('subdante@gmail.com');
  const errors = false;

  return (
    <>
      <Header isLoggedIn={true} />
      <main className='profile'>
        <form className='profile__form'>
          <h1 className='profile__title'>{`Привет, ${name}!`}</h1>
          <div className='profile__info'>
            <label className='profile__input-group'>
              <p className='profile__name'>Имя</p>
              {isEditMode ? (
                <input className='profile__input' value={name} />
              ) : (
                <div className='profile__input'>{name}</div>
              )}
            </label>
            <hr className='profile__line-break' />
            <label className='profile__input-group'>
              <p className='profile__email'>E-mail</p>
              {isEditMode ? (
                <input className='profile__input' value={email} />
              ) : (
                <div className='profile__input'>{email}</div>
              )}
            </label>
          </div>
          {!isEditMode ? (
            <div className='profile__button-group'>
              <button
                type='button'
                className='profile__button'
                onClick={() => {
                  setIsEditMode(true);
                }}
              >
                Редактировать
              </button>
              <button
                type='button'
                className='profile__button'
                onClick={() => {
                  navigate('/signin');
                }}
              >
                Выйти из аккаунта
              </button>
            </div>
          ) : (
            <>
              {errors && <p className='profile__error'>При обновлении профиля произошла ошибка.</p>}
              <button
                type='submit'
                className='profile__submit'
                disabled={errors}
                onClick={(e) => {
                  e.preventDefault();
                  setIsEditMode(false);
                }}
              >
                Сохранить
              </button>
            </>
          )}
        </form>
      </main>
    </>
  );
};

export default Profile;
