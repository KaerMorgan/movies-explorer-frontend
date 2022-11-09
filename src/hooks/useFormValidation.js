import { useState } from 'react';
import isEmail from 'validator/lib/isEmail';

//хук управления формой и валидации формы
export function useFormValidation() {
  const [values, setValues] = useState({});
  const [errors, setErrors] = useState({});
  const [isValid, setIsValid] = useState(false);

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;

    setValues({ ...values, [name]: value });
    setErrors({ ...errors, [name]: event.target.validationMessage });
    if (!isEmail(event.target.value)) {
      setErrors({ ...errors, email: 'Некорректная почта.' });
    }
    setIsValid(event.target.closest('form').checkValidity());
  };
  return { values, handleChange, errors, isValid, setValues, setIsValid };
}
