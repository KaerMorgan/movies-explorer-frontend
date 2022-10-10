import Header from '../Header';
import Promo from './components/Promo';
import NavTab from './components/NavTab';
import AboutProject from './components/AboutProject';
import Techs from './components/Techs';
import AboutMe from './components/AboutMe/AboutMe';
import Portfolio from './components/Portfolio/Portfolio';
import './Main.scss';

const Main = () => {
  return (
    <>
      <Header />

      <main className='main'>
        <Promo>
          <NavTab />
        </Promo>

        <AboutProject />

        <Techs />

        <AboutMe />

        <Portfolio />
      </main>
    </>
  );
};

export default Main;
