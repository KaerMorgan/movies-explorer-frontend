import React from 'react';
import Header from '../Header';
import globe from '../../images/globe.png';
import me from '../../images/main__photo.jpg';
import './Main.scss';

const Main = () => {
  return (
    <>
      <Header />

      <main className='main'>
        <section className='main__section main__welcome-screen'>
          <div className='main__welcome-screen-text-group'>
            <h1 className='main__welcome-screen-title'>
              Учебный проект студента факультета
              <br />
              Веб-разработки.
            </h1>
            <p className='main__welcome-screen-subtitle'>
              Листайте ниже, чтобы узнать больше про этот проект и его создателя.
            </p>
            <button className='main__button'>Узнать больше</button>
          </div>
          <img src={globe} alt="Планета из слова 'веб'" className='main__globe' />
        </section>

        <section className='main__section main__about'>
          <h2 className='main__section-title'>О проекте</h2>
          <hr className='main__line-break' />

          <div className='main__about-text-group'>
            <h3 className='main__about-title'>Дипломный проект включал 5 этапов</h3>
            <p className='main__about-text'>
              Составление плана, работу над бэкендом, вёрстку, добавление функциональности и
              финальные доработки.
            </p>
          </div>

          <div className='main__about-text-group'>
            <h3 className='main__about-title'>На выполнение диплома ушло 5 недель</h3>
            <p className='main__about-text'>
              У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было соблюдать, чтобы
              успешно защититься.
            </p>
          </div>

          <div className='main__about-progress-bar'>
            <div className='back-end-group'>
              <div className='back-end-bar'>1 неделя</div>
              <div className='back-end-caption'>Back-end</div>
            </div>

            <div className='front-end-group'>
              <div className='front-end-bar'>4 недели</div>
              <div className='front-end-caption'>Front-end</div>
            </div>
          </div>
        </section>

        <section className='main__section main__technologies'>
          <h2 className='main__section-title'>Технологии</h2>
          <hr className='main__line-break main__technologies-line-break' />
          <h3 className='main__technologies-title'>7 технологий</h3>
          <p className='main__technologies-text'>
            На курсе веб-разработки мы освоили технологии, которые применили в дипломном проекте.
          </p>
          <ul className='main__technologies-list'>
            <li className='main__technologies-list-item'>HTML</li>
            <li className='main__technologies-list-item'>CSS</li>
            <li className='main__technologies-list-item'>JS</li>
            <li className='main__technologies-list-item'>React</li>
            <li className='main__technologies-list-item'>Git</li>
            <li className='main__technologies-list-item'>Express.js</li>
            <li className='main__technologies-list-item'>mongoDB</li>
          </ul>
        </section>

        <section className='main__section main__student'>
          <h2 className='main__section-title'>Студент</h2>
          <hr className='main__line-break main__student-line-break' />

          <div className='main__student-text-group'>
            <h3 className='main__student-title'>Данил</h3>
            <p className='main__student-subtitle'>Фронт-енд разработчик, 24 года</p>
            <p className='main__student-text'>
              Я родом из Крыма. Люблю музыку и кино. Слушаю много подкастов и играю на гитаре.
              Работаю в компании "Крэлком" фронтэнд-разработчиком. Курс практикума помог внести
              структуру в моё обучение и заново научил меня писать код, только лучше и осмысленнее.
            </p>
            <a href='https://github.com/KaerMorgan' className='main__student-link'>
              Github
            </a>
          </div>

          <img src={me} alt='Данил' className='main__student-photo' />

          <p className='main__student-list-header'>Портфолио</p>
          <ul className='main__student-list'>
            <li className='main__student-list-item'>
              <a
                href='https://github.com/KaerMorgan/how-to-learn'
                className='main__student-list-link'
              >
                Статичный сайт
              </a>
              <p className='main__arrow'>↗</p>
            </li>
            <li className='main__student-list-item'>
              <a
                href='https://github.com/KaerMorgan/russian-travel'
                className='main__student-list-link'
              >
                Адаптивный сайт
              </a>
              <p className='main__arrow'>↗</p>
            </li>
            <li className='main__student-list-item'>
              <a
                href='https://github.com/KaerMorgan/mesto-react'
                className='main__student-list-link'
              >
                Одностраничное приложение
              </a>
              <p className='main__arrow'>↗</p>
            </li>
          </ul>
        </section>
      </main>
    </>
  );
};

export default Main;
