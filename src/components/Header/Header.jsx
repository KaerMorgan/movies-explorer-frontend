import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../../images/logo.png';
import profileImage from '../../images/profile-image.png';
import cn from 'classnames';
import './Header.scss';

const Header = () => {
  const isLogged = true;

  return (
    <header className={cn('header', { header_type_intro: !isLogged })}>
      <img src={logo} alt='Логотип' className='header__logo' />
      {isLogged ? (
        <>
          <nav className='header__navbar'>
            <Link className='header__link header__link_active' to='movies'>
              Фильмы
            </Link>
            <Link className='header__link' to='saved-movies'>
              Сохранённые фильмы
            </Link>
          </nav>

          <Link to='profile' className='header__link_type-profile'>
            <span>Аккаунт</span>
            <button className='header__profile-button'>
              <img src={profileImage} alt='Аккаунт' />
            </button>
          </Link>
        </>
      ) : (
        <div className='header__button-group'>
          <button className='header__register-button'>Регистрация</button>
          <button className='header__login-button'>Войти</button>
        </div>
      )}
    </header>
  );
};

export default Header;
