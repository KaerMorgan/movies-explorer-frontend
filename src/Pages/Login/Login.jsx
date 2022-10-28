import { Link } from 'react-router-dom';
import logo from '../../images/logo.png';
import './Login.scss';

const Login = () => {
  const error = false;

  return (
    <main className='login'>
      <form className='login__form'>
        <img src={logo} alt='Логотип' className='login__logo' />
        <h1 className='login__title'>Рады видеть!</h1>
        <label className='login__input-label'>
          <p className='login__input-caption'>E-mail</p>
          <input type='text' className='login__input' />
        </label>
        <label className='login__input-label'>
          <p className='login__input-caption'>Пароль</p>
          <input type='text' className='login__input' />
        </label>
        {error && <span className='login__error'>Что-то пошло не так...</span>}
        <div className='login__bottom-group'>
          <button
            type='submit'
            className='login__submit'
            onClick={(e) => {
              e.preventDefault();
            }}
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
    </main>
  );
};

export default Login;
