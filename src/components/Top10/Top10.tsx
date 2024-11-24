import './Top10.scss';

import { FC } from 'react';

import { useNavigate } from 'react-router-dom';
import { useQuery, UseQueryResult } from '@tanstack/react-query';
import API from '../../API';

import Loader from '../Loader';
import MoviesList from '../MoviesList';

import type { TMoviesList } from '../../types';
import Error from '../Error';
import CustomError from '../../classes/customError';
import useMediaPoints from '../../hooks/useMediaPoints';

const Top10: FC = () => {
  const navigate = useNavigate();

  const handleMovieClick = (id: number) => {
    navigate(`/home/${id}`);
  };

  const {
    data: moviesList,
    isPending,
    isError,
    isSuccess,
    error,
    refetch,
  }: UseQueryResult<TMoviesList, CustomError> = useQuery({
    queryKey: ['moviesList', 'top10'],
    queryFn: API.getTop10Movies,
  });

  const { isMobile } = useMediaPoints();

  return (
    <section className='top10'>
      <div className='top10__container container'>
        <h2 className='title-reset top10__title'>Топ 10 фильмов</h2>
        {isPending && <Loader />}
        {isError && <Error err={error} refetch={refetch} />}
        {isSuccess && (
          <MoviesList
            movies={moviesList!}
            onMovieClick={handleMovieClick}
            showNumber
            isSwiper={isMobile}
          />
        )}
      </div>
    </section>
  );
};

export default Top10;
