import React from 'react';
import { Link } from 'react-router-dom';
import './NotFoundPage.scss';

const NotFoundPage = () => {
  return (
    <main className='not-found'>
      <h1 className='not-found__title'>404</h1>
      <h2 className='not-found__subtitle'>Страница не найдена</h2>
      <Link className='not-found__link' to={-1}>
        Назад
      </Link>
    </main>
  );
};

export default NotFoundPage;
