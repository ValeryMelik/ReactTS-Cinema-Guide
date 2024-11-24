import './AuthForm.scss';

import { FC } from 'react';

import Login from '../Login/';
import Register from '../Register/';

interface IAuthFormProps {
  isRegister: boolean;
  setIsRegister: (prev: boolean) => void;
}

const AuthForm: FC<IAuthFormProps> = ({ isRegister, setIsRegister }) => {
  return isRegister ? (
    <Register onToggle={() => setIsRegister(false)} />
  ) : (
    <Login onToggle={() => setIsRegister(true)} />
  );
};

export default AuthForm;
