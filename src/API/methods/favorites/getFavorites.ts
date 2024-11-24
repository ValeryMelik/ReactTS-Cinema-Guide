import type { TApiPromise, TMoviesList } from '../../../types';
import httpRequest from '../../utils/httpRequest';

export default async function getFavorites(): TApiPromise<TMoviesList> {
  return httpRequest<void, TMoviesList>({
    httpMethod: 'GET',
    urlPath: 'favorites',

    resSchema: 'moviesList',

    isWithCredential: true,
  });
}
