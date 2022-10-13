import { Link } from 'react-router-dom';
import logo from '../../images/logo.png';
import './Register.scss';

const Register = () => {
  const error = true;

  return (
    <main className='register'>
      <form className='register__form'>
        <img src={logo} alt='Логотип' className='register__logo' />
        <h1 className='register__title'>Добро пожаловать!</h1>
        <label className='register__input-label'>
          <p className='register__input-caption'>Имя</p>
          <input type='text' className='register__input' />
        </label>
        <label className='register__input-label'>
          <p className='register__input-caption'>E-mail</p>
          <input type='text' className='register__input' />
        </label>
        <label className='register__input-label'>
          <p className='register__input-caption'>Пароль</p>
          <input type='text' className='register__input' />
        </label>
        {error && <span className='register__error'>Что-то пошло не так...</span>}
        <div className='register__bottom-group'>
          <button className='register__submit'>Зарегистрироваться</button>
          <p className='register__caption'>
            Уже зарегистрированы?
            <Link to='signin' className='register__link'>
              Войти
            </Link>
          </p>
        </div>
      </form>
    </main>
  );
};

export default Register;
