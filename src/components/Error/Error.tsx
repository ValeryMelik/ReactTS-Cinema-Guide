import './Error.scss';

import { FC } from 'react';
import Button from '../Button';
import useSnackbar from '../../hooks/useSnackbar';
import CustomError from '../../classes/customError';

interface IErrorProps {
  err: CustomError;
  refetch: () => void;
}

const Error: FC<IErrorProps> = ({ err, refetch }) => {
  const { showMessage } = useSnackbar();

  showMessage({
    type: 'error',
    ...err,
  });

  return (
    <div className='error'>
      <div className='error__block'>
        {' '}
        <h2 className='title-reset error__title'>Что-то пошло не так...</h2>
        <Button className='error__btn' onClick={() => refetch()}>Попробовать ещё раз</Button>
      </div>
    </div>
  );
};

export default Error;
