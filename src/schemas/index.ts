import apiResponseSchema from './_apiResponse';
import loginSchema from './_login';
import errorResultSchema from './_errorResult';
import movieIdSchema from './_movieId';
import genresListSchema from './_genresList';
import movieSchema from './_movie';
import moviesListSchema from './_movieList';
import registerSchema from './_register';
import successResultSchema from './_successResult';
import userSchema from './_user';
import loginValidationSchema from './_loginValidation';
import registerValidationSchema from './_registerValidation';
import successSchema from './_success';

export const Schemas = {
  user: userSchema,
  login: loginSchema,
  loginValidation: loginValidationSchema,
  successResult: successResultSchema,
  success: successSchema,
  errorResult: errorResultSchema,
  register: registerSchema,
  registerValidation: registerValidationSchema,
  movie: movieSchema,
  moviesList: moviesListSchema,
  apiResponse: apiResponseSchema,
  movieId: movieIdSchema,
  genresList: genresListSchema,
};

export default Schemas;
