import type { TApiPromise, TMovieId } from '../../../types';
import httpRequest from '../../utils/httpRequest';

export default async function deleteFavorites(
  favoriteMovieId: TMovieId
): TApiPromise {
  return httpRequest<TMovieId>({
    httpMethod: 'DELETE',
    urlPath: 'favorites',

    reqData: favoriteMovieId,
    reqSchema: 'movieId',

    isWithCredential: true,
  });
}
