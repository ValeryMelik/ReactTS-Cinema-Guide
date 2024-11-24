import { FC } from 'react';
import './Loader.scss';
import Icon from '../Icon';

interface LoaderProps {
  type?: 'points' | 'spinner';
  size?: 'large' | 'small';
}

export const Loader: FC<LoaderProps> = ({
  type = 'points',
  size = 'small',
}) => (
  <div className={`loader loader_${size}`}>
    {type === 'points' && (
      <div className='points'>
        <div className='points__item'></div>
        <div className='points__item'></div>
        <div className='points__item'></div>
      </div>
    )}
    {type === 'spinner' && (
      <div className='spinner'>
        <Icon name='loader' className='spinner__icon' />
      </div>
    )}
  </div>
);
