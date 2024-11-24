import './Rating.scss';

import Icon from '../Icon/';
import { FC } from 'react';

interface IRatingProps {
  score: number;
  size?: 'large' | 'small';
}

const Rating: FC<IRatingProps> = ({ score = 0, size = 'large' }) => {
  const roundedScore = score.toFixed(1);
  const [integerPart, decimalPart] = roundedScore.split('.');

  let modifiedClassName: string = `rating rating_${size} rating_`;

  if (score >= 8) modifiedClassName += 'excellent';
  else if (score >= 7) modifiedClassName += 'good';
  else if (score >= 6) modifiedClassName += 'poor';
  else modifiedClassName += 'bullshit';

  return (
    <div className={modifiedClassName}>
      <Icon name='star' className='rating__star'></Icon>
      <span className='rating__capture'>{`${integerPart},${decimalPart}`}</span>
    </div>
  );
};

export default Rating;
