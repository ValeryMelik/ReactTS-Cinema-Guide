import type { TApiPromise, TMoviesList } from '../../../types';
import httpRequest from '../../utils/httpRequest';

export default async function getTop10Movies(): TApiPromise<TMoviesList> {
  return httpRequest<void, TMoviesList>({
    httpMethod: 'GET',
    urlPath: 'top10',

    resSchema: 'moviesList',
  });
}
