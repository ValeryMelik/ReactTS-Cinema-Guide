import './Profile.scss';

import { FC } from 'react';
import Icon from '../Icon';
import Button from '../Button';

import useAuth from '../../hooks/useAuth';
import useSnackbar from '../../hooks/useSnackbar';
import CustomError from '../../classes/customError';

import API from '../../API';
import { useMutation } from '@tanstack/react-query';

import type { TSuccessResult } from '../../types';

const Profile: FC = () => {
  const { showMessage } = useSnackbar();

  const { mutate: logout, isPending } = useMutation<
    TSuccessResult,
    CustomError,
    void
  >({
    mutationFn: API.getLogout,
    onSuccess: () => {
      window.location.href = '/home';
    },
    onError: (err: CustomError): void => {
      showMessage({
        type: 'error',
        message: err.message || 'Не удалось выйти из аккаунта',
      });
    },
  });

  const { userProfile } = useAuth();

  if (!userProfile) {
    return <div className='profile'>Профиль пользователя не найден</div>;
  }

  const { name, surname, email } = userProfile;

  const initials =
    name.charAt(0).toUpperCase() + surname.charAt(0).toUpperCase();

  return (
    <div className='profile'>
      <div className='profile__block'>
        <div className='profile__circle'>{initials}</div>
        <div className='profile__info'>
          <div className='profile__head'>Имя Фамилия</div>
          <div className='profile__body'>{`${name} ${surname}`}</div>
        </div>
      </div>
      <div className='profile__block'>
        <div className='profile__circle'>
          <Icon name='mail' className='profile__mail' />
        </div>
        <div className='profile__info'>
          <div className='profile__head'>Электронная почта</div>
          <div className='profile__body'>{email}</div>
        </div>
      </div>

      <Button
        className='profile__btn'
        isLoading={isPending}
        onClick={(): void => logout()}
      >
        Выйти из аккаунта
      </Button>
    </div>
  );
};

export default Profile;
