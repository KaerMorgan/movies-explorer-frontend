import './Portfolio.scss';

const Portfolio = () => {
  return (
    <section className='portfolio'>
      <p className='portfolio__list-header'>Портфолио</p>
      <ul className='portfolio__list'>
        <li className='portfolio__list-item'>
          <a href='https://github.com/KaerMorgan/how-to-learn' className='portfolio__list-link'>
            <p>Статичный сайт</p>
            <p className='portfolio__arrow'>↗</p>
          </a>
        </li>
        <li className='portfolio__list-item'>
          <a href='https://github.com/KaerMorgan/russian-travel' className='portfolio__list-link'>
            <p>Адаптивный сайт</p>
            <p className='portfolio__arrow'>↗</p>
          </a>
        </li>
        <li className='portfolio__list-item'>
          <a href='https://github.com/KaerMorgan/mesto-react' className='portfolio__list-link'>
            <p>Одностраничное приложение</p>
            <p className='portfolio__arrow'>↗</p>
          </a>
        </li>
      </ul>
    </section>
  );
};

export default Portfolio;
