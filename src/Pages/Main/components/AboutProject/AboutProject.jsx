import './AboutProject.scss';

const AboutProject = () => {
  return (
    <section className='about-project'>
      <h2 className='main__section-title'>О проекте</h2>
      <hr className='about-project__line-break' />

      <div className='about-project__text-container'>
        <div className='about-project__text-group'>
          <h3 className='about-project__title'>Дипломный проект включал 5 этапов</h3>
          <p className='about-project__text'>
            Составление плана, работу над бэкендом, вёрстку, добавление функциональности и финальные
            доработки.
          </p>
        </div>

        <div className='about-project__text-group'>
          <h3 className='about-project__title'>На выполнение диплома ушло 5 недель</h3>
          <p className='about-project__text'>
            У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было соблюдать, чтобы
            успешно защититься.
          </p>
        </div>
      </div>

      <div className='about-project__progress-bar'>
        <div className='about-project__back-end-group'>
          <div className='about-project__back-end-bar'>1 неделя</div>
          <div className='about-project__caption'>Back-end</div>
        </div>

        <div className='about-project__front-end-group'>
          <div className='about-project__front-end-bar'>4 недели</div>
          <div className='about-project__caption'>Front-end</div>
        </div>
      </div>
    </section>
  );
};

export default AboutProject;
