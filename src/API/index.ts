import getLogout from './methods/auth/getLogout';
import postLogin from './methods/auth/postLogin';
import postRegister from './methods/auth/postRegister';

import deleteFavorites from './methods/favorites/deleteFavorites';
import getFavorites from './methods/favorites/getFavorites';
import postFavorites from './methods/favorites/postFavorites';

import getGenresList from './methods/genres/getGenresList';

import getMovie from './methods/movie/getMovie';
import getMoviesList from './methods/movie/getMoviesList';
import getRandomMovie from './methods/movie/getRandomMovie';
import getTop10Movies from './methods/movie/getTop10Movies';
import getUser from './methods/user/getUser';

const API = {
  postLogin,
  postRegister,
  getLogout,

  deleteFavorites,
  getFavorites,
  postFavorites,

  getGenresList,

  getMovie,
  getMoviesList,
  getRandomMovie,
  getTop10Movies,

  getUser,
};

export default API;
