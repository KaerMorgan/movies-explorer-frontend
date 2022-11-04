import { useState } from 'react';
import { useFormValidation } from '../../hooks/useFormValidation';
import { login, register } from '../../utils/MainApi';
import { Link, useNavigate } from 'react-router-dom';
import Popup from '../../components/Popup';
import logo from '../../images/logo.png';
import '../Login/Login.scss';

const Register = () => {
  const [popupErrorMessage, setPopupErrorMessage] = useState('');
  const { values, handleChange, errors, isValid, setValues, setIsValid } = useFormValidation();
  const navigate = useNavigate();

  const formSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      const user = await register(values);
      const token = await login(values.email, values.password);

      localStorage.setItem('token', token.token);
      localStorage.setItem('isLogged', true);
      setValues({});
      setIsValid(false);
      navigate('/');
    } catch (error) {
      setIsValid(false);

      if (error.indexOf('409') != -1) {
        setPopupErrorMessage('Пользователь с таким email уже существует.');
      } else if (error.indexOf('500') != -1) {
        setPopupErrorMessage('На сервере произошла ошибка.');
      } else {
        setPopupErrorMessage('При регистрации пользователя произошла ошибка.');
      }
      console.log(error);
    }
  };

  const onPopupClose = () => {
    setPopupErrorMessage('');
  };

  return (
    <main className='register'>
      <form className='register__form' onSubmit={formSubmitHandler}>
        <img src={logo} alt='Логотип' className='register__logo' />
        <h1 className='register__title'>Добро пожаловать!</h1>
        <label className='register__input-label'>
          <p className='register__input-caption'>Имя</p>
          <input
            type='text'
            minLength='2'
            maxLength='30'
            className='register__input'
            onChange={handleChange}
            name='name'
          />
        </label>
        <label className='register__input-label'>
          <p className='register__input-caption'>E-mail</p>
          <input type='email' className='register__input' onChange={handleChange} name='email' />
        </label>
        <label className='register__input-label'>
          <p className='register__input-caption'>Пароль</p>
          <input
            type='password'
            className='register__input'
            onChange={handleChange}
            name='password'
          />
        </label>
        {errors && (
          <span className='register__error'>{errors.name || errors.email || errors.password}</span>
        )}
        <div className='register__bottom-group'>
          <button
            type='submit'
            className='register__submit'
            disabled={!isValid || !values.name || !values.email || !values.password}
          >
            Зарегистрироваться
          </button>
          <p className='register__caption'>
            Уже зарегистрированы?
            <Link className='register__link' to='/signin' replace>
              Войти
            </Link>
          </p>
        </div>
      </form>
      <Popup ErrorMessage={popupErrorMessage} onClose={onPopupClose} />
    </main>
  );
};

export default Register;
