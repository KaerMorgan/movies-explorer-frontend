import { Link } from 'react-router-dom';
import './NavTab.scss';

const NavTab = () => {
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
      <button className='nav-tab__button'>
        <Link to='/movies'>Узнать больше</Link>
      </button>
    </div>
  );
};

export default NavTab;
