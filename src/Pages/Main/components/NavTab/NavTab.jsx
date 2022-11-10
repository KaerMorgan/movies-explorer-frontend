import { Link } from 'react-router-dom';
import './NavTab.scss';

const NavTab = () => {
  const isLoggedIn = localStorage.getItem('isLogged');

  return (
    <div className='nav-tab__text-group'>
      <h1 className='nav-tab__title'>
        Учебный проект студента факультета
        <br />
        Веб-разработки.
      </h1>
      <p className='nav-tab__subtitle'>
        Листайте ниже, чтобы узнать больше про этот проект и его создателя.
      </p>
      <button type='button' className='nav-tab__button'>
        <Link to={isLoggedIn ? '/movies' : '/signup'}>Узнать больше</Link>
      </button>
    </div>
  );
};

export default NavTab;
