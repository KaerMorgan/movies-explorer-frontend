import search from '../../images/search-button.png';
import './SearchForm.scss';

const SearchForm = () => {
  return (
    <form className='search-form'>
      <fieldset className='search-form__search-bar'>
        <input type='text' className='search-form__input' placeholder='Фильм' required />

        <button
          type='submit'
          className='search-form__submit'
          onClick={(e) => {
            e.preventDefault();
          }}
        >
          <img src={search} alt='Искать' className='search-form__button-image' />
        </button>
      </fieldset>

      <fieldset className='search-form__switch-group'>
        <input type='checkbox' name='toggle-switch' className='search-form__switch' id='toggle' />
        <label htmlFor='toggle' className='search-form__switch-caption'>
          Короткометражки
        </label>
      </fieldset>
    </form>
  );
};

export default SearchForm;
