import './FavoriteMovies.scss';

import { FC } from 'react';

import { useNavigate } from 'react-router-dom';

import useFavorite from '../../hooks/useFavorite';
import MoviesList from '../MoviesList';
import useMediaPoints from '../../hooks/useMediaPoints';

const FavoriteMovies: FC = () => {
  const navigate = useNavigate();

  const handleMovieClick = (id: number): void => {
    navigate(`/home/${id}`);
  };

  const { favorites, toggleFavorite } = useFavorite();
  const { isMobile } = useMediaPoints();

  return (
    <div className='favorite-movies'>
      {favorites?.length ? (
        <MoviesList
          movies={favorites}
          onMovieClick={handleMovieClick}
          onRemove={toggleFavorite}
          showRemoveButton
          isSwiper={isMobile}
        />
      ) : (
        <div className='favorite-movies__empty'>Пока здесь пусто...</div>
      )}
    </div>
  );
};

export default FavoriteMovies;
