import type { TApiPromise, TGenresList } from '../../../types';
import httpRequest from '../../utils/httpRequest';

export default async function getGenresList(): TApiPromise<TGenresList> {
  return httpRequest<void, TGenresList>({
    httpMethod: 'GET',
    urlPath: 'genres',

    resSchema: 'genresList',
  });
}
