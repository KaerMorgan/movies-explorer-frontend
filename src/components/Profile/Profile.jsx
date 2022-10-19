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
        <h1 className='profile__title'>{`Привет, ${name}!`}</h1>
        <form>
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
            <>
              <button
                className='profile__button'
                onClick={() => {
                  setIsEditMode(true);
                }}
              >
                Редактировать
              </button>
              <button
                className='profile__button'
                onClick={() => {
                  navigate('/signin');
                }}
              >
                Выйти из аккаунта
              </button>
            </>
          ) : (
            <>
              {errors && <p className='profile__error'>При обновлении профиля произошла ошибка.</p>}
              <button
                className='profile__submit'
                disabled={errors}
                onClick={() => {
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
