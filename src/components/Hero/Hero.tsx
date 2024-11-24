import './Hero.scss';

import formatTime from '../../utils/formatTime';

import Rating from '../Rating/';
import Button from '../Button/';
import Icon from '../Icon/';

import { FC } from 'react';

import fallbackImage from '/img/fallback-image.png';
import { useNavigate } from 'react-router-dom';
import formatGenreName from '../../utils/formatGenre';
import useFavorite from '../../hooks/useFavorite';
import type { TMovie } from '../../types';

import useAuth from '../../hooks/useAuth';
import useModal from '../../hooks/useModal';

interface IHeroProps {
  movie: TMovie;
  random?: boolean;
  onRefetch?: () => void;
}

const Hero: FC<IHeroProps> = ({ movie, random, onRefetch }) => {
  const navigate = useNavigate();

  const { toggleFavorite, isFavorite, isFavoriteLoading } = useFavorite();

  const { isAuthorized } = useAuth();
  const { handleTrailerModalOpen, handleAuthModalOpen } = useModal();

  const handleFavoriteClick = (id: number): void => {
    isAuthorized ? toggleFavorite(id) : handleAuthModalOpen();
  };

  const handleMovieClick = (id: number) => {
    navigate(`/home/${id}`);
  };

  if (!movie) {
    return <div>Фильм не найден</div>;
  }

  const {
    id,
    title,
    releaseYear,
    posterUrl,
    backdropUrl,
    genres,
    runtime,
    plot,
    tmdbRating,
    trailerUrl,
  } = movie;

  return (
    <section className='hero'>
      <div className='hero__container container'>
        <div className='hero__img'>
          <img
            src={backdropUrl ?? posterUrl ?? fallbackImage}
            alt={title}
            className='img-reset'
          />
        </div>
        <div className='hero__block'>
          <div className='hero__top'>
            <Rating score={tmdbRating ?? 0} />
            <span className='hero__year'>{releaseYear ?? '-'}</span>
            <span className='hero__genre'>
              {genres
                .map((genre: string): string => formatGenreName(genre))
                .join(', ') ?? '-'}
            </span>
            <span className='hero__durating'>{formatTime(runtime)}</span>
          </div>
          <h2 className='title-reset hero__title'>{title}</h2>
          <p className='margin-reset hero__capture'>{plot}</p>
          <div className={`hero__btns ${!random ? 'hero__btns_norandom' : ''}`}>
            <Button
              className='hero__trailer'
              onClick={() => {
                if (trailerUrl) handleTrailerModalOpen({ title, trailerUrl });
              }}
            >
              Трейлер
            </Button>
            {random && (
              <Button
                className='hero__about'
                data-kind='secondary'
                onClick={() => handleMovieClick(id)}
              >
                О&nbsp;фильме
              </Button>
            )}
            <Button
              className={`hero__like ${
                isFavorite(id) ? 'hero__like_active' : ''
              }
                `}
              data-kind='secondary'
              onClick={() => handleFavoriteClick(id)}
              isLoading={isFavoriteLoading}
              loader='spinner'
            >
              <Icon
                name={isFavorite(id) ? 'likefilled' : 'like'}
                className='hero__svg'
              />
            </Button>
            {random && (
              <Button
                className='hero__reload'
                data-kind='secondary'
                onClick={onRefetch}
              >
                <Icon name='reload' className='hero__svg' />
              </Button>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
