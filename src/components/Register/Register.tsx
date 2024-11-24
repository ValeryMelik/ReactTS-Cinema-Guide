import './Register.scss';

import Icon from '../Icon/';
import Button from '../Button/';

import { FC, useState } from 'react';
import { useForm } from 'react-hook-form';

import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { TRegisterValidation, TSuccessResult } from '../../types';
import Schemas from '../../schemas';
import API from '../../API';
import queryClient from '../../API/_queryClient';
import formatName from '../../utils/formatName';
import InputField from '../InputField';
import CustomError from '../../classes/customError';
import useSnackbar from '../../hooks/useSnackbar';
import TSuccess from '../../types/types/TSuccess';
import useModal from '../../hooks/useModal';

type TRegisterData = Omit<TRegisterValidation, 'confirmPassword'>;
type TAuthInfo = Pick<TRegisterValidation, 'email' | 'password'>;

interface RegisterProps {
  onToggle: () => void;
}

const Register: FC<RegisterProps> = ({ onToggle }) => {
  const [registrationSuccess, setRegistrationSuccess] =
    useState<boolean>(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
  } = useForm<TRegisterValidation>({
    resolver: zodResolver(Schemas.registerValidation),
  });

  const emailValue = watch('email');
  const nameValue = watch('name');
  const surnameValue = watch('surname');
  const passwordValue = watch('password');
  const confirmPasswordValue = watch('confirmPassword');

  const { showMessage } = useSnackbar();
  const { handleModalClose } = useModal();

  const { mutate: registerMutate, isPending: isRegisterPending } = useMutation<
    TSuccess,
    CustomError,
    TRegisterData
  >({
    mutationFn: API.postRegister,
    onSuccess: (): void => {
      setRegistrationSuccess(true);
      // showMessage({
      //   type: 'success',
      //   message: 'Регистрация успешно выполнена!',
      // });
    },
    onError: (err: CustomError): void => {
      showMessage({
        type: 'error',
        ...err,
      });
    },
  });

  const onRegisterSubmit = (data: TRegisterValidation): void => {
    const { confirmPassword, ...registerData } = data;
    registerMutate(registerData);
  };

  const { mutate: loginMutate, isPending: isLoginPending } = useMutation<
    TSuccessResult,
    CustomError,
    TAuthInfo
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

  const onLoginSubmit = (): void => {
    const credential = {
      email: emailValue,
      password: passwordValue,
    };
    loginMutate(credential);
  };

  return (
    <form
      className='register'
      onSubmit={
        registrationSuccess
          ? (e) => {
              e.preventDefault();
              onLoginSubmit();
            }
          : handleSubmit(onRegisterSubmit)
      }
    >
      <div className='register__container'>
        <Icon name='logo' className='register__logo' />
        {registrationSuccess ? (
          <>
            <h2 className='margin-reset register__title'>
              Регистрация завершена
            </h2>
            <p className='margin-reset register__capture'>
              Используйте вашу электронную почту для&nbsp;входа
            </p>
            <Button
              type='submit'
              className='register__btn'
              isLoading={isLoginPending}
            >
              Войти
            </Button>
          </>
        ) : (
          <>
            <h2 className='margin-reset register__title'>Регистрация</h2>
            <InputField
              name='email'
              placeholder='Электронная почта'
              icon='mail'
              register={register('email')}
              error={errors.email}
              value={emailValue}
            />
            <InputField
              name='name'
              placeholder='Имя'
              icon='user'
              register={{
                ...register('name', {
                  onChange: (e) => {
                    const formattedValue = formatName(e.target.value);
                    setValue('name', formattedValue);
                  },
                }),
              }}
              error={errors.name}
              value={nameValue}
            />
            <InputField
              name='surname'
              placeholder='Фамилия'
              icon='user'
              register={{
                ...register('surname', {
                  onChange: (e) => {
                    const formattedValue = formatName(e.target.value);
                    setValue('surname', formattedValue);
                  },
                }),
              }}
              error={errors.surname}
              value={surnameValue}
            />
            <InputField
              name='password'
              placeholder='Пароль'
              icon='key'
              register={register('password')}
              error={errors.password}
              value={passwordValue}
            />
            <InputField
              name='confirmPassword'
              placeholder='Повторите пароль'
              icon='key'
              register={register('confirmPassword')}
              error={errors.confirmPassword}
              value={confirmPasswordValue}
            />
            <Button
              type='submit'
              className='register__btn'
              isLoading={isRegisterPending}
            >
              Создать аккаунт
            </Button>
          </>
        )}
        {!registrationSuccess && (
          <button
            type='button'
            className='btn-reset register__toggle'
            onClick={onToggle}
          >
            У меня есть пароль
          </button>
        )}
      </div>
    </form>
  );
};

export default Register;
