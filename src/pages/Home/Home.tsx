import './Home.scss'

import { FC } from 'react';

import Hero from '../../components/Hero/';
import Top10 from '../../components/Top10/';

import { UseQueryResult, useQuery } from '@tanstack/react-query';
import API from '../../API';

import type { TMovie } from '../../types';
import Error from '../../components/Error';
import Loader from '../../components/Loader';

const Home: FC = () => {
  const {
    data: movieData,
    isPending,
    isError,
    isSuccess,
    error,
    refetch,
  }: UseQueryResult<TMovie> = useQuery({
    queryKey: ['movie', 'random'],
    queryFn: API.getRandomMovie,
  });

  return (
    <>
      {isPending && <Loader size='large' />}
      {isError && <Error err={error} refetch={refetch} />}
      {isSuccess && (
        <div className='home'>
          <Hero movie={movieData} random={true} onRefetch={refetch} />
          <Top10 />
        </div>
      )}
    </>
  );
};

export default Home;
