import React from 'react';
import './Footer.scss';

const Footer = () => {
  return (
    <footer className='footer'>
      <p className='footer__hint'>Учебный проект Яндекс.Практикум х BeatFilm.</p>
      <hr className='footer__line-break' />
      <div className='footer__text-group'>
        <p className='footer__copyright'>© {new Date().getFullYear()}</p>

        <nav className='footer__links'>
          <a href='' className='footer__link'>
            Яндекс.Практикум
          </a>
          <a href='' className='footer__link'>
            Github
          </a>
        </nav>
      </div>
    </footer>
  );
};

export default Footer;
