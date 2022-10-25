import { useState } from 'react';
import Header from '../../components/Header';
import Promo from './components/Promo';
import NavTab from './components/NavTab';
import AboutProject from './components/AboutProject';
import Techs from './components/Techs';
import AboutMe from './components/AboutMe/AboutMe';
import Portfolio from './components/Portfolio/Portfolio';
import Footer from '../../components/Footer';
import './Main.scss';

const Main = () => {
  const [isLoggedIn, setIsLogged] = useState(false);

  return (
    <>
      <Header isLoggedIn={isLoggedIn} />
      <main className='main'>
        <Promo>
          <NavTab />
        </Promo>

        <AboutProject />

        <Techs />

        <AboutMe />

        <Portfolio />
      </main>
      <Footer />
    </>
  );
};

export default Main;
