import cn from 'classnames';
import search from '../../images/search-button.png';
import './SearchForm.scss';

const SearchForm = ({
  onSubmit,
  onCheckboxSwitch,
  checked,
  inputValue,
  onInputChange,
  addClasses,
  isLoading,
}) => {
  return (
    <form
      className={cn('search-form', addClasses)}
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit(e.target);
      }}
    >
      <fieldset className='search-form__search-bar'>
        <input
          type='text'
          maxLength={30}
          className={cn('search-form__input', addClasses)}
          placeholder='Фильм'
          value={inputValue ?? ''}
          onChange={(e) => {
            e.preventDefault();
            onInputChange(e.target);
          }}
          required
        />

        <button type='submit' className='search-form__submit' disabled={isLoading}>
          <img src={search} alt='Искать' className='search-form__button-image' />
        </button>
      </fieldset>

      <fieldset className='search-form__switch-group'>
        <input
          type='checkbox'
          name='toggle-switch'
          className={cn('search-form__switch', addClasses, {
            'search-form__switch_checked': checked,
          })}
          id='toggle'
          onChange={(e) => {
            onCheckboxSwitch(e.target);
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
