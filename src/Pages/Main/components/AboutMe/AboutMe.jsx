import me from '../../../../images/me.jpg';
import './AboutMe.scss';

const AboutMe = () => {
  return (
    <section className='main__section about-me'>
      <h2 className='main__section-title'>Студент</h2>
      <hr className='about-me__line-break' />

      <div className='about-me__text-group'>
        <h3 className='about-me__title'>Данил</h3>
        <p className='about-me__subtitle'>Фронт-енд разработчик, 24 года</p>
        <p className='about-me__text'>
          Я родом из Крыма. Люблю музыку и кино. Слушаю много подкастов и играю на гитаре. Работаю в
          компании "Крэлком" фронтэнд-разработчиком. Курс практикума помог внести структуру в моё
          обучение и заново научил меня писать код, только лучше и осмысленнее.
        </p>
        <a href='https://github.com/KaerMorgan' className='about-me__link'>
          Github
        </a>
      </div>

      <img src={me} alt='Данил' className='about-me__photo' />
    </section>
  );
};

export default AboutMe;
