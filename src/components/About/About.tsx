import './About.scss';
import formatCurrency from '../../utils/formatCurrency';
import formatLanguage from '../../utils/formatLanguage';

import { FC } from 'react';
import type { TMovie } from '../../types';

interface IAboutProps {
  movie: TMovie;
}

const formatData = (data: string | undefined | null): string =>
  data ?? 'Неизвестно';

const About: FC<IAboutProps> = ({ movie }) => {
  const { language, budget, revenue, director, production, awardsSummary } =
    movie;
  return (
    <section className='about'>
      <div className='about__container container'>
        <h2 className='title-reset about__title'>О&nbsp;фильме</h2>
        <ul className='list-reset about__list'>
          <li className='about__item'>
            <div className='about__block'>
              <span className='about__name'>Язык&nbsp;оригинала</span>
              <span className='about__bottom'></span>
            </div>
            <span className='about__value'>
              {formatLanguage(language!)}
            </span>
          </li>
          <li className='about__item'>
            <div className='about__block'>
              <span className='about__name'>Бюджет</span>
              <span className='about__bottom'></span>
            </div>
            <span className='about__value'>{formatCurrency(budget)}</span>
          </li>
          <li className='about__item'>
            <div className='about__block'>
              <span className='about__name'>Выручка</span>
              <span className='about__bottom'></span>
            </div>
            <span className='about__value'>{formatCurrency(revenue)}</span>
          </li>
          <li className='about__item'>
            <div className='about__block'>
              <span className='about__name'>Режиссёр</span>
              <span className='about__bottom'></span>
            </div>
            <span className='about__value'>{formatData(director)}</span>
          </li>
          <li className='about__item'>
            <div className='about__block'>
              <span className='about__name'>Продакшен</span>
              <span className='about__bottom'></span>
            </div>
            <span className='about__value'>{formatData(production)}</span>
          </li>
          <li className='about__item'>
            <div className='about__block'>
              <span className='about__name'>Награды</span>
              <span className='about__bottom'></span>
            </div>
            <span className='about__value'>{formatData(awardsSummary)}</span>
          </li>
        </ul>
      </div>
    </section>
  );
};

export default About;
