import './MoviesList.scss';

import { FC, useState } from 'react';
import fallbackImage from '/img/fallback-image.png';

import Icon from '../Icon';
import Loader from '../Loader';
import type { TMovie } from '../../types';

import { Swiper, SwiperSlide } from 'swiper/react';

type TMovieShort = Pick<TMovie, 'id' | 'title' | 'posterUrl'>;

interface IMoviesListProps {
  movies: TMovieShort[];
  onMovieClick: (id: number) => void;

  onRemove?: (id: number) => void;
  showNumber?: boolean;
  showRemoveButton?: boolean;

  isSwiper?: boolean;
}

const MoviesList: FC<IMoviesListProps> = ({
  movies,
  onMovieClick,
  onRemove,
  showNumber = false,
  showRemoveButton = false,
  isSwiper = false,
}) => {
  const [loadingImages, setLoadingImages] = useState<Record<number, boolean>>(
    movies.reduce((acc, { id }) => {
      acc[id] = true;
      return acc;
    }, {} as Record<number, boolean>)
  );

  const handleImageLoad = (id: number): void => {
    setLoadingImages((prev) => ({ ...prev, [id]: false }));
  };

  const handleImageError = (id: number): void => {
    setLoadingImages((prev) => ({ ...prev, [id]: false }));
  };

  const renderMovieItem = (
    { id, title, posterUrl }: TMovieShort,
    num: number
  ) => {
    return (
      <>
        {loadingImages[id] && (
          <div className='movies-list__center'>
            <Loader />
          </div>
        )}
        <img
          src={posterUrl ?? fallbackImage}
          alt={title}
          className={`img-reset movies-list__img ${
            loadingImages[id] ? 'movies-list__img_hidden' : ''
          }`}
          onLoad={(): void => handleImageLoad(id)}
          onError={(): void => handleImageError(id)}
        />
        {showNumber && <div className='movies-list__number'>{++num}</div>}
        {showRemoveButton && onRemove && (
          <button
            className='btn-reset movies-list__remove'
            onClick={(
              e: React.MouseEvent<HTMLButtonElement, MouseEvent>
            ): void => {
              e.stopPropagation();
              onRemove(id);
            }}
          >
            <Icon name='closesmall' className='movies-list__close' />
          </button>
        )}
      </>
    );
  };

  return isSwiper ? (
    <Swiper spaceBetween={40} slidesPerView={1.5}>
      {movies.map((movieShort: TMovieShort, num: number) => (
        <SwiperSlide
          className='movies-list__item'
          key={movieShort.id}
          onClick={(): void => onMovieClick(movieShort.id)}
        >
          {renderMovieItem(movieShort, num)}
        </SwiperSlide>
      ))}
    </Swiper>
  ) : (
    <ul className='list-reset movies-list'>
      {movies.map((movieShort: TMovieShort, num: number) => (
        <li
          className='movies-list__item'
          key={movieShort.id}
          onClick={(): void => onMovieClick(movieShort.id)}
        >
          {renderMovieItem(movieShort, num)}
        </li>
      ))}
    </ul>
  );

  // return (
  //   <ul className='list-reset movies-list'>
  //     {movies.map(({ id, title, posterUrl }: TMovieShort, num: number) => (
  //       <li
  //         className='movies-list__item'
  //         key={id}
  //         onClick={(): void => onMovieClick(id)}
  //       >
  //         {loadingImages[id] && (
  //           <div className='movies-list__center'>
  //             <Loader />
  //           </div>
  //         )}
  //         <img
  //           src={posterUrl ?? fallbackImage}
  //           alt={title}
  //           className={`img-reset movies-list__img ${
  //             loadingImages[id] ? 'movies-list__img_hidden' : ''
  //           }`}
  //           onLoad={(): void => handleImageLoad(id)}
  //           onError={(): void => handleImageError(id)}
  //         />
  //         {showNumber && <div className='movies-list__number'>{++num}</div>}
  //         {showRemoveButton && onRemove && (
  //           <button
  //             className='btn-reset movies-list__remove'
  //             onClick={(
  //               e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  //             ): void => {
  //               e.stopPropagation();
  //               onRemove(id);
  //             }}
  //           >
  //             <Icon name='closesmall' className='movies-list__close' />
  //           </button>
  //         )}
  //       </li>
  //     ))}
  //   </ul>
  // );
};

export default MoviesList;
