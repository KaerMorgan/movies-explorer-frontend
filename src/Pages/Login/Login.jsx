import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useFormValidation } from '../../hooks/useFormValidation';
import { login } from '../../utils/MainApi';
import Popup from '../../components/Popup';
import logo from '../../images/logo.png';
import './Login.scss';

const Login = ({ onLogin }) => {
  const [popupErrorMessage, setPopupErrorMessage] = useState('');
  const [requestPending, setRequestPending] = useState(false);
  const { values, handleChange, errors, isValid, setValues, setIsValid } = useFormValidation();

  const navigate = useNavigate();

  const onPopupClose = () => {
    setPopupErrorMessage('');
  };

  const formSubmitHandler = async (e) => {
    e.preventDefault();
    setRequestPending(true);
    try {
      const token = await login(values);

      localStorage.setItem('token', token.token);
      setValues({});
      setIsValid(false);
      await onLogin();
      navigate('/movies');
    } catch (error) {
      setIsValid(false);

      if (error.indexOf('401') != -1) {
        setPopupErrorMessage('Вы ввели неправильный логин или пароль.');
      } else if (error.indexOf('500') != -1) {
        setPopupErrorMessage('На сервере произошла ошибка.');
      } else {
        setPopupErrorMessage('При регистрации пользователя произошла ошибка.');
      }
      console.log(error);
    }
    setRequestPending(false);
  };

  return (
    <main className='login'>
      <form className='login__form' onSubmit={formSubmitHandler}>
        <img
          src={logo}
          alt='Логотип'
          className='login__logo'
          onClick={() => {
            navigate('/');
          }}
        />
        <h1 className='login__title'>Рады видеть!</h1>
        <label className='login__input-label'>
          <p className='login__input-caption'>E-mail</p>
          <input type='email' className='login__input' onChange={handleChange} name='email' />
        </label>
        <label className='login__input-label'>
          <p className='login__input-caption'>Пароль</p>
          <input type='password' className='login__input' onChange={handleChange} name='password' />
        </label>
        {errors && <span className='login__error'>{errors.email || errors.password}</span>}
        <div className='login__bottom-group'>
          <button
            type='submit'
            className='login__submit'
            disabled={
              !isValid ||
              !values.email ||
              !values.password ||
              requestPending ||
              errors.password ||
              errors.email
            }
          >
            Войти
          </button>
          <p className='login__caption'>
            Ещё не зарегистрированы?
            <Link className='login__link' to='/signup' replace>
              Регистрация
            </Link>
          </p>
        </div>
      </form>
      <Popup ErrorMessage={popupErrorMessage} onClose={onPopupClose} />
    </main>
  );
};

export default Login;
