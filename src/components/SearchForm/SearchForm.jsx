import cn from 'classnames';
import { useState } from 'react';
import search from '../../images/search-button.png';
import './SearchForm.scss';

const SearchForm = ({ onSubmit, onCheck, checked }) => {
  const [inputValue, setInputValue] = useState(localStorage.getItem('searchFilmValue') ?? '');

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    localStorage.setItem('searchFilmValue', inputValue);
    onSubmit();
  };

  return (
    <form className='search-form' onSubmit={handleFormSubmit}>
      <fieldset className='search-form__search-bar'>
        <input
          type='text'
          maxLength={30}
          className='search-form__input'
          placeholder='Фильм'
          value={inputValue}
          onChange={handleInputChange}
          required
        />

        <button type='submit' className='search-form__submit'>
          <img src={search} alt='Искать' className='search-form__button-image' />
        </button>
      </fieldset>

      <fieldset className='search-form__switch-group'>
        <input
          type='checkbox'
          name='toggle-switch'
          className={cn('search-form__switch', {
            'search-form__switch_checked': checked,
          })}
          checked={checked}
          id='toggle'
          onChange={() => {
            onCheck();
          }}
        />
        <label htmlFor='toggle' className='search-form__switch-caption'>
          Короткометражки
        </label>
      </fieldset>
    </form>
  );
};

export default SearchForm;
