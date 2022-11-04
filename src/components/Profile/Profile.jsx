import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../../contexts/UserContext';
import { useFormValidation } from '../../hooks/useFormValidation';
import { changeUserInfo } from '../../utils/MainApi';
import Header from '../Header';
import Popup from '../Popup';
import './Profile.scss';

const Profile = ({ onUserInfoChange }) => {
  const [isEditMode, setIsEditMode] = useState(false);
  const [popupMessage, setPopupMessage] = useState('');

  const userInfo = useContext(UserContext);

  const { values, handleChange, errors, isValid, setIsValid } = useFormValidation();
  const navigate = useNavigate();

  const formSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      const changedInfo = await changeUserInfo(values);
      setIsEditMode(false);
      onUserInfoChange(changedInfo);
      setPopupMessage('Данные успешно изменены.');
    } catch (error) {
      setIsValid(false);
      if (error.indexOf('500') != -1) {
        setPopupMessage('Пользователь с таким email уже существует.');
      } else if (error.indexOf('409') != -1) {
        setPopupMessage('На сервере произошла ошибка.');
      } else {
        setPopupMessage('При обновлении профиля произошла ошибка.');
      }
    }
  };

  const onPopupClose = () => {
    setPopupMessage('');
  };

  return (
    <>
      <Header isLoggedIn={true} />
      <main className='profile'>
        <form className='profile__form' onSubmit={formSubmitHandler}>
          <h1 className='profile__title'>{`Привет, ${userInfo.name}!`}</h1>
          <div className='profile__info'>
            <label className='profile__input-group'>
              <p className='profile__name'>Имя</p>
              {isEditMode ? (
                <input
                  className='profile__input'
                  type='text'
                  placeholder={values.name}
                  onChange={handleChange}
                  name='name'
                />
              ) : (
                <div className='profile__input'>{userInfo.name}</div>
              )}
            </label>
            <hr className='profile__line-break' />
            <label className='profile__input-group'>
              <p className='profile__email'>E-mail</p>
              {isEditMode ? (
                <input
                  className='profile__input'
                  type='email'
                  placeholder={values.email}
                  onChange={handleChange}
                  name='email'
                />
              ) : (
                <div className='profile__input'>{userInfo.email}</div>
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
                  localStorage.removeItem('token');
                  localStorage.removeItem('isLogged');
                  navigate('/signin');
                }}
              >
                Выйти из аккаунта
              </button>
            </div>
          ) : (
            <>
              {errors && <span className='register__error'>{errors.name || errors.email}</span>}
              <button
                type='submit'
                className='profile__submit'
                disabled={
                  !isValid ||
                  !values.name ||
                  !values.email ||
                  (values.name == userInfo.name && userInfo.email == values.email)
                }
              >
                Сохранить
              </button>
            </>
          )}
        </form>
        <Popup ErrorMessage={popupMessage} onClose={onPopupClose} />
      </main>
    </>
  );
};

export default Profile;
