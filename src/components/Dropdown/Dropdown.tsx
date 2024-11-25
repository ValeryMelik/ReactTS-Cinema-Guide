import './Dropdown.scss';

import { FC } from 'react';

import { UseQueryResult, useQuery } from '@tanstack/react-query';

import Rating from '../Rating/Rating';
import formatGenreName from '../../utils/formatGenre';
import formatTime from '../../utils/formatTime';

import fallbackImage from '/img/fallback-image.png';
import { useNavigate } from 'react-router-dom';
import type { TMovie, TMoviesList } from '../../types';
import API from '../../API';
import CustomError from '../../classes/customError';
import useModal from '../../hooks/useModal';
import useMediaPoints from '../../hooks/useMediaPoints';
import { Swiper, SwiperSlide } from 'swiper/react';

type TDropdownItem = Pick<
  TMovie,
  'posterUrl' | 'title' | 'tmdbRating' | 'releaseYear' | 'genres' | 'runtime'
>;

interface IDropdownProps {
  searchedMovie: string;
}

const Dropdown: FC<IDropdownProps> = ({ searchedMovie }) => {
  const navigate = useNavigate();

  const { handleModalClose } = useModal();

  const handleMovieClick = (id: number): void => {
    handleModalClose();
    navigate(`/home/${id}`);
  };

  const { data: movies, isSuccess }: UseQueryResult<TMoviesList, CustomError> =
    useQuery({
      queryKey: ['moviesList', searchedMovie],
      queryFn: () => API.getMoviesList({ title: searchedMovie, count: 5 }),
      enabled: !!searchedMovie,
    });

  const { isMobile } = useMediaPoints();

  const renderDropdownItem = ({
    posterUrl,
    title,
    tmdbRating,
    releaseYear,
    genres,
    runtime,
  }: TDropdownItem) => {
    return (
      <>
        <img
          src={posterUrl ?? fallbackImage}
          alt={title}
          className='img-reset dropdown__img'
        />
        <div className='dropdown__content'>
          <div className='dropdown__top'>
            <Rating score={tmdbRating ?? 0} size={'small'} />
            <span className='dropdown__year'>{releaseYear ?? '-'}</span>
            <span className='dropdown__genre'>
              {genres.map((genre: string): string =>
                formatGenreName(genre)
              )[0] ?? '-'}
            </span>
            <span className='dropdown__durating'>{formatTime(runtime)}</span>
          </div>
          <h3 className='margin-reset dropdown__name'>{title}</h3>
        </div>
      </>
    );
  };

  if (isSuccess && movies.length !== 0)
    return (
      <div className='search__dropdown dropdown'>
        <div className='dropdown__container'>
          {isMobile ? (
            <Swiper spaceBetween={40} slidesPerView={1.5}>
              {movies.map((item: TMovie) => (
                <SwiperSlide
                  className='dropdown__slider'
                  key={item.id}
                  onClick={(): void => handleMovieClick(item.id)}
                >
                  {renderDropdownItem(item)}
                </SwiperSlide>
              ))}
            </Swiper>
          ) : (
            <ul className='list-reset dropdown__list'>
              {movies?.map((item: TMovie) => (
                <li
                  className='dropdown__item'
                  key={item.id}
                  onClick={() => handleMovieClick(item.id)}
                >
                  {renderDropdownItem(item)}
                  {/* <img
          src={posterUrl ?? fallbackImage}
          alt={title}
          className='img-reset dropdown__img'
        />
        <div className='dropdown__content'>
          <div className='dropdown__top'>
            <Rating score={tmdbRating ?? 0} size={'small'} />
            <span className='dropdown__year'>
              {releaseYear ?? '-'}
            </span>
            <span className='dropdown__genre'>
              {genres.map((genre: string): string =>
                formatGenreName(genre)
              )[0] ?? '-'}
            </span>
            <span className='dropdown__durating'>
              {formatTime(runtime)}
            </span>
          </div>
          <h3 className='margin-reset dropdown__name'>{title}</h3>
        </div> */}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    );
};

export default Dropdown;
