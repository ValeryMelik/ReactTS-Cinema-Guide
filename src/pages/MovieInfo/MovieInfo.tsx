import './MovieInfo.scss';

import { FC } from 'react';
import { useParams } from 'react-router-dom';
import { UseQueryResult, useQuery } from '@tanstack/react-query';

import Hero from '../../components/Hero';

import About from '../../components/About';
import Loader from '../../components/Loader';
import type { TApiPromise, TMovie } from '../../types';
import API from '../../API';
import Error from '../../components/Error';

const Movie: FC = () => {
  const { movie } = useParams<{ movie: string }>();

  if (!movie) return <div>Ошибка: ID фильма не найден</div>;

  const movieId = { id: movie };

  const {
    data: movieData,
    isPending,
    isError,
    isSuccess,
    error,
    refetch,
  }: UseQueryResult<TMovie> = useQuery({
    queryKey: ['movie', movieId],
    queryFn: (): TApiPromise<TMovie> => API.getMovie(movieId),
  });

  return (
    <>
      {isPending && <Loader size='large' />}
      {isError && <Error err={error} refetch={refetch} />}
      {isSuccess && (
        <div className='movie-info'>
          <Hero movie={movieData} />
          <About movie={movieData} />
        </div>
      )}
    </>
  );
};

export default Movie;
