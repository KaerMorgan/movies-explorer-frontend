import cn from 'classnames';
import registrationFail from '../../images/registration-fail.png';
import registrationSuccess from '../../images/registration-success.png';
import buttonClose from '../../images/button_close.svg';
import './Popup.scss';

import { useEffect } from 'react';

const Popup = ({ ErrorMessage, onClose }) => {
  useEffect(() => {
    if (!ErrorMessage) {
      return;
    }
    const closeByEscape = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', closeByEscape);
    return () => document.removeEventListener('keydown', closeByEscape);
  }, [ErrorMessage, onClose]);

  const handleOverlay = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      className={cn('popup', 'popup_type_tooltip', { popup_opened: ErrorMessage })}
      onClick={handleOverlay}
    >
      <div className='popup__container'>
        <img
          src={ErrorMessage == 'Данные успешно изменены.' ? registrationSuccess : registrationFail}
          alt='Ошибка'
          className='popup__image'
        />
        <h3 className='popup__heading'>{ErrorMessage}</h3>
        <button type='button' className='popup__close' onClick={onClose}>
          <img className='popup__close-icon' src={buttonClose} alt='Закрыть форму' />
        </button>
      </div>
    </div>
  );
};

export default Popup;
