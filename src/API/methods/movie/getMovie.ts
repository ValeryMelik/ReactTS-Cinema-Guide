import type { TApiPromise, TMovie, TMovieId } from '../../../types';
import httpRequest from '../../utils/httpRequest';

export default async function getMovie(movieId: TMovieId): TApiPromise<TMovie> {
  return httpRequest<TMovieId, TMovie>({
    httpMethod: 'GET',
    urlPath: 'movie',

    reqData: movieId,
    reqSchema: 'movieId',

    resSchema: 'movie',
  });
}
