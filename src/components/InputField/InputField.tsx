import './InputField.scss';

import { FC } from 'react';
import Icon from '../Icon';
import { FieldError, UseFormRegisterReturn } from 'react-hook-form';

interface IInputFieldProps {
  name: string;
  placeholder: string;
  icon: string;
  register: UseFormRegisterReturn;
  error?: FieldError;
  value?: string;
}

const InputField: FC<IInputFieldProps> = ({
  name,
  placeholder,
  icon,
  register,
  error,
  value,
}) => {
  return (
    <div
      className={`input-field ${
        error ? `input-field_error` : ''
      } ${value ? `input-field_filled` : ''}`}
    >
      <Icon name={icon} className='input-field__icon' />
      <input
        type={
          name === 'password' || name === 'confirmPassword'
            ? 'password'
            : 'text'
        }
        className='margin-reset input-field__input'
        placeholder={placeholder}
        {...register}
      />
      {error && <span className='input-field__error'>{error.message}</span>}
    </div>
  );
};

export default InputField;
