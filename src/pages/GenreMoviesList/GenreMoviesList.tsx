import './GenreMoviesList.scss';

import { FC, useEffect, useRef, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useQuery, UseQueryResult } from '@tanstack/react-query';

import Loader from '../../components/Loader';
import Button from '../../components/Button';
import Icon from '../../components/Icon';
import formatGenreName from '../../utils/formatGenre';
import API from '../../API';
import type { TMoviesList } from '../../types';
import CustomError from '../../classes/customError';
import MoviesList from '../../components/MoviesList';
import Error from '../../components/Error';

const GenreMoviesList: FC = () => {
  const { genre } = useParams<{ genre: string }>();
  const navigate = useNavigate();

  const handleBackClick = (): void => {
    navigate('/genres');
  };

  const [count, setCount] = useState<number>(15);
  const [hasMore, setHasMore] = useState<boolean>(true);

  const {
    data: moviesList,
    status,
    isPending,
    isError,
    isSuccess,
    error,
    refetch,
  }: UseQueryResult<TMoviesList, CustomError> = useQuery({
    queryKey: ['moviesList', genre, count],
    queryFn: () => API.getMoviesList({ count, genre }),
  });

  useEffect(() => {
    if (moviesList && moviesList.length < count) {
      setHasMore(false);
    }
  }, [moviesList, count]);

  const scrollPositionRef = useRef<number>(0);

  const handleLoadMore = (): void => {
    scrollPositionRef.current = window.scrollY;
    setCount((prevCount) => prevCount + 10);
  };

  useEffect(() => {
    if (status === 'success') {
      window.scrollTo(0, scrollPositionRef.current);
    }
  }, [status]);

  const handleMovieClick = (id: number) => {
    navigate(`/genres/${genre}/${id}`);
  };

  return (
    <section className='genre-movies'>
      <div className='genre-movies__container container'>
        <h2
          onClick={handleBackClick}
          className='margin-reset genre-movies__title'
        >
          <Icon name='chevron'></Icon>
          <span>{formatGenreName(genre!)}</span>
        </h2>
        {isPending && <Loader />}
        {isError && <Error err={error} refetch={refetch} />}
        {isSuccess && (
          <>
            <MoviesList movies={moviesList!} onMovieClick={handleMovieClick} />
            {hasMore && (
              <Button onClick={handleLoadMore} className='genre-movies__btn'>
                Показать ещё
              </Button>
            )}
          </>
        )}
      </div>
    </section>
  );
};

export default GenreMoviesList;
