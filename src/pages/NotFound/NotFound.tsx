import './NotFound.scss';

import { FC } from 'react';

const NotFound: FC = () => {
  return (
    <div className='not-found'>
      <h1 className='title-reset not-found__title'>
        Данной страницы не существует
      </h1>
    </div>
  );
};

export default NotFound;
