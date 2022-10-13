import search from '../../images/search-button.png';
import './SearchForm.scss';

const SearchForm = () => {
  return (
    <section className='search-form'>
      <div className='search-form__search-bar'>
        <input type='text' className='search-form__input' placeholder='Фильм' />

        <button className='search-form__button'>
          <img src={search} alt='Искать' className='search-form__button-image' />
        </button>
      </div>

      <div className='search-form__switch-group'>
        <input type='checkbox' name='toggle-switch' className='search-form__switch' id='toggle' />
        <p className='search-form__switch-caption'>Короткометражки</p>
      </div>
    </section>
  );
};

export default SearchForm;
