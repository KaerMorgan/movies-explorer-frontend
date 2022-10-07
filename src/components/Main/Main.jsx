import React from 'react';
import Header from '../Header';
import globe from '../../images/globe.png';
import './Main.scss';

const Main = () => {
  console.log(window.screen.width);
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
      </main>
    </>
  );
};

export default Main;
