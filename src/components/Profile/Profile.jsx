import Header from '../Header';
import './Profile.scss';
const Profile = () => {
  const user = {
    name: 'Данил',
    email: 'subdante@gmail.com',
  };

  const editMode = false;

  return (
    <>
      <Header />
      <main className='profile'>
        <h1 className='profile__title'>{`Привет, ${user.name}`}</h1>
        <div className='profile__info'>
          <div className='profile__text-group'>
            <p className='profile__name'>Имя</p>
            <p>user.name</p>
          </div>
          <hr className='profile__line-break' />
          <div className='profile__text-group'>
            <p className='profile__email'>E-mail</p>
            <p>user.email</p>
          </div>
        </div>
        <button className='profile__button'>Редактировать</button>
        <button className='profile__button'>Выйти из аккаунта</button>
      </main>
    </>
  );
};

export default Profile;
