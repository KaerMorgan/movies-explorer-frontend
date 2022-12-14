import { useContext, useEffect, useState } from 'react';
import { UserContext } from '../../contexts/UserContext';
import { useFormValidation } from '../../hooks/useFormValidation';
import { changeUserInfo } from '../../utils/MainApi';
import Header from '../Header';
import Popup from '../Popup';
import './Profile.scss';

const Profile = ({ onUserInfoChange, onLogout }) => {
  const [isEditMode, setIsEditMode] = useState(false);
  const [popupMessage, setPopupMessage] = useState('');
  const [requestPending, setRequestPending] = useState(false);

  const userInfo = useContext(UserContext);

  const { values, setValues, handleChange, errors, isValid, setIsValid } = useFormValidation();

  const formSubmitHandler = async (e) => {
    e.preventDefault();
    setRequestPending(true);
    try {
      const changedInfo = await changeUserInfo({
        name: values.name ?? userInfo.name,
        email: values.email ?? userInfo.email,
      });
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
    setRequestPending(false);
  };

  const onPopupClose = () => {
    setPopupMessage('');
  };

  const errorCases =
    !isValid ||
    (values.name === userInfo.name && values.email.toLowerCase() === userInfo.email) ||
    (!values.name && !values.email) ||
    errors.name ||
    errors.email ||
    requestPending;

  useEffect(() => {
    setValues({ name: userInfo.name, email: userInfo.email });
  }, [userInfo]);
  console.log(values.name, userInfo.name, values.email, userInfo.email);
  console.log(errors);

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
                  value={values.name ?? userInfo.name}
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
                  value={values.email ?? userInfo.email}
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
              <button type='button' className='profile__button' onClick={onLogout}>
                Выйти из аккаунта
              </button>
            </div>
          ) : (
            <>
              <button type='submit' className='profile__submit' disabled={errorCases}>
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
