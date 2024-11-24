import type { TApiPromise, TMoviesList } from '../../../types';
import httpRequest from '../../utils/httpRequest';

interface IMoviesListParams {
  count?: number;
  page?: number;
  title?: string;
  genre?: string;
}

export default async function getMoviesList(
  params?: IMoviesListParams
): TApiPromise<TMoviesList> {
  return httpRequest<void, TMoviesList, IMoviesListParams>({
    httpMethod: 'GET',
    urlPath: 'movie',

    reqParams: params,

    resSchema: 'moviesList',
  });
}
