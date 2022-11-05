import cn from 'classnames';
import search from '../../images/search-button.png';
import './SearchForm.scss';

const SearchForm = ({ onSubmit, onCheckboxSwitch, checked, inputValue, onInputChange }) => {
  return (
    <form
      className='search-form'
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit(e);
      }}
    >
      <fieldset className='search-form__search-bar'>
        <input
          type='text'
          maxLength={30}
          className='search-form__input'
          placeholder='Фильм'
          value={inputValue}
          onChange={(e) => {
            e.preventDefault();
            onInputChange(e.target.value);
          }}
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
            onCheckboxSwitch();
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
