import './Portfolio.scss';

const Portfolio = () => {
  return (
    <section className='main__section portfolio'>
      <p className='portfolio__list-header'>Портфолио</p>
      <ul className='portfolio__list'>
        <li className='portfolio__list-item'>
          <a href='https://github.com/KaerMorgan/how-to-learn' className='portfolio__list-link'>
            Статичный сайт
          </a>
          <p className='portfolio__arrow'>↗</p>
        </li>
        <li className='portfolio__list-item'>
          <a href='https://github.com/KaerMorgan/russian-travel' className='portfolio__list-link'>
            Адаптивный сайт
          </a>
          <p className='portfolio__arrow'>↗</p>
        </li>
        <li className='portfolio__list-item'>
          <a href='https://github.com/KaerMorgan/mesto-react' className='portfolio__list-link'>
            Одностраничное приложение
          </a>
          <p className='portfolio__arrow'>↗</p>
        </li>
      </ul>
    </section>
  );
};

export default Portfolio;
