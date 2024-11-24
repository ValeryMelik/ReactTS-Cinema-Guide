import './Login.scss';

import Icon from '../Icon/';
import Button from '../Button/';

import { FC } from 'react';
import { useForm } from 'react-hook-form';

import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import type { TLogin, TSuccessResult, TLoginValidation } from '../../types';
import API from '../../API';
import queryClient from '../../API/_queryClient';
import Schemas from '../../schemas';

import CustomError from '../../classes/customError';
import useModal from '../../hooks/useModal';
import useSnackbar from '../../hooks/useSnackbar';
import InputField from '../InputField';

interface ILoginProps {
  onToggle: () => void;
}

const Login: FC<ILoginProps> = ({ onToggle }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<TLoginValidation>({
    resolver: zodResolver(Schemas.loginValidation),
  });

  const emailValue = watch('email');
  const passwordValue = watch('password');

  const { handleModalClose } = useModal();
  const { showMessage } = useSnackbar();

  const { mutate, isPending } = useMutation<
    TSuccessResult,
    CustomError,
    TLogin
  >({
    mutationFn: API.postLogin,
    onSuccess: (): void => {
      queryClient.invalidateQueries({ queryKey: ['profile'] });
      handleModalClose();

      // showMessage({
      //   type: 'success',
      //   message: 'Вход успешно выполнен!',
      // });
    },
    onError: (err: CustomError): void => {
      showMessage({
        type: 'error',
        ...err,
      });
    },
  });

  const onSubmit = (data: TLoginValidation): void => {
    mutate(data);
  };

  return (
    <form action='' className='login' onSubmit={handleSubmit(onSubmit)}>
      <div className='login__container'>
        <Icon name='logo' className='login__logo' />
        <InputField
          name='email'
          placeholder='Электронная почта'
          icon='mail'
          register={register('email')}
          error={errors.email}
          value={emailValue}
        />
        <InputField
          name='password'
          placeholder='Пароль'
          icon='key'
          register={register('password')}
          error={errors.password}
          value={passwordValue}
        />
        <Button type='submit' className='login__btn' isLoading={isPending}>
          Войти
        </Button>
        <button
          type='button'
          className='btn-reset login__toggle'
          onClick={onToggle}
        >
          Регистрация
        </button>
      </div>
    </form>
  );
};

export default Login;
