import { useNavigate } from 'react-router-dom';
import './NavTab.scss';

const NavTab = () => {
  const navigation = useNavigate();
  return (
    <div className='promo__text-group'>
      <h1 className='promo__title'>
        Учебный проект студента факультета
        <br />
        Веб-разработки.
      </h1>
      <p className='promo__subtitle'>
        Листайте ниже, чтобы узнать больше про этот проект и его создателя.
      </p>
      <button className='promo__button'>
        <a href='https://github.com/KaerMorgan'>Узнать больше</a>
      </button>
    </div>
  );
};

export default NavTab;
