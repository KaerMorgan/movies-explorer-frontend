import React from 'react';
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom';
import logo from '../../images/logo.png';
import profileImage from '../../images/profile-image.png';
import cn from 'classnames';
import './Header.scss';

const Header = ({ isLoggedIn }) => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <header className={cn('header', { header_type_intro: location.pathname === '/' })}>
      <img
        src={logo}
        alt='Логотип'
        className='header__logo'
        onClick={() => {
          navigate('/');
        }}
      />
      {isLoggedIn ? (
        <>
          <nav className='header__navbar'>
            <NavLink
              activeClassName='header__link_active'
              className='header__link'
              to='/movies'
              replace
            >
              Фильмы
            </NavLink>
            <NavLink className='header__link' to='/saved-movies' replace>
              Сохранённые фильмы
            </NavLink>
          </nav>

          <Link className='header__link_type-profile' to='/profile' replace>
            <span>Аккаунт</span>
            <button className='header__profile-button'>
              <img src={profileImage} alt='Аккаунт' />
            </button>
          </Link>
        </>
      ) : (
        <div className='header__button-group'>
          <button
            className='header__register-button'
            onClick={() => {
              navigate('/signup', { replace: true });
            }}
          >
            Регистрация
          </button>
          <button
            className='header__login-button'
            onClick={() => {
              navigate('/signin', { replace: true });
            }}
          >
            Войти
          </button>
        </div>
      )}
    </header>
  );
};

export default Header;
