import './GenresList.scss';

import { FC } from 'react';
import { Link } from 'react-router-dom';

import { useQuery, UseQueryResult } from '@tanstack/react-query';
import Loader from '../../components/Loader';

import formatGenreName from '../../utils/formatGenre';
import type { TGenresList } from '../../types';
import API from '../../API';
import Error from '../../components/Error';
import useGenreImage from '../../hooks/useGenreImage';

const Genres: FC = () => {
  const {
    data: genresList,
    isPending,
    isError,
    isSuccess,
    error,
    refetch,
  }: UseQueryResult<TGenresList> = useQuery({
    queryKey: ['genresList'],
    queryFn: API.getGenresList,
  });

  const { data: genreImages, isLoading: isImagesLoading } =
    useGenreImage(genresList);

  return (
    <section className='genres'>
      <div className='genres__container container'>
        <h2 className='title-reset genres__title'>Жанры фильмов</h2>
        <ul className='list-reset genres__grid'>
          {isPending && <Loader size='large' />}
          {isError && <Error err={error} refetch={refetch} />}
          {isSuccess &&
            genresList?.map((genre: string) => (
              <li className='genres__cell' key={genre}>
                <Link className='link-reset' to={`/genres/${genre}`}>
                  {isImagesLoading ? (
                    <div className='genres__center'>
                      <Loader />
                    </div>
                  ) : (
                    <img
                      src={genreImages[genre]}
                      alt={genre}
                      className='img-reset genres__img'
                    />
                  )}

                  <h3 className='margin-reset genres__name'>
                    {formatGenreName(genre)}
                  </h3>
                </Link>
              </li>
            ))}
        </ul>
      </div>
    </section>
  );
};

export default Genres;
