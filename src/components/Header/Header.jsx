import React, { useState } from 'react';
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom';
import logo from '../../images/logo.png';
import burger from '../../images/burger.png';
import close from '../../images/close.png';
import profileImage from '../../images/profile-image.png';
import cn from 'classnames';
import './Header.scss';

const Header = ({ isLoggedIn }) => {
  const [isBurgerMenuActive, setIsBurgerMenuActive] = useState(false);

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
            <NavLink
              activeClassName='header__link_active'
              className='header__link'
              to='/saved-movies'
              replace
            >
              Сохранённые фильмы
            </NavLink>
          </nav>

          <Link className='header__link_type-profile' to='/profile' replace>
            <span>Аккаунт</span>
            <button className='header__profile-button' type='button'>
              <img src={profileImage} alt='Аккаунт' />
            </button>
          </Link>

          <button
            className='header__burger-button'
            type='button'
            onClick={() => {
              setIsBurgerMenuActive(true);
            }}
          >
            <img src={burger} alt='Меню' className='header__burger-icon' />
          </button>
        </>
      ) : (
        <div className='header__button-group'>
          <button
            type='button'
            className='header__register-button'
            onClick={() => {
              navigate('/signup', { replace: true });
            }}
          >
            Регистрация
          </button>
          <button
            type='button'
            className='header__login-button'
            onClick={() => {
              navigate('/signin', { replace: true });
            }}
          >
            Войти
          </button>
        </div>
      )}
      <div className={cn('burger-menu', { 'burger-menu_opened': isBurgerMenuActive })}>
        <nav className='burger-menu__navbar'>
          <button
            type='button'
            className='burger-menu__close-button'
            onClick={() => {
              setIsBurgerMenuActive(false);
            }}
          >
            <img src={close} alt='Закрыть меню' className='burger-menu__close-icon' />
          </button>
          <NavLink
            exact
            activeClassName='burger-menu__link_active'
            className='burger-menu__link'
            to='/'
            replace
          >
            Главная
          </NavLink>
          <NavLink
            activeClassName='burger-menu__link_active'
            className='burger-menu__link'
            to='/movies'
            replace
          >
            Фильмы
          </NavLink>
          <NavLink
            activeClassName='burger-menu__link_active'
            className='burger-menu__link'
            to='/saved-movies'
            replace
          >
            Сохранённые фильмы
          </NavLink>
        </nav>
        <Link className='burger-menu__link_type-profile' to='/profile' replace>
          <span>Аккаунт</span>
          <button type='button' className='burger-menu__profile-button'>
            <img src={profileImage} alt='Аккаунт' />
          </button>
        </Link>
      </div>
    </header>
  );
};

export default Header;
