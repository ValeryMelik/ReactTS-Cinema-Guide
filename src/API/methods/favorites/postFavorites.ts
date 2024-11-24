import type { TApiPromise, TMovieId } from '../../../types';
import httpRequest from '../../utils/httpRequest';

export default async function postFavorites(
  favoriteMovieId: TMovieId
): TApiPromise {
  return httpRequest<TMovieId>({
    httpMethod: 'POST',
    urlPath: 'favorites',

    reqData: favoriteMovieId,
    reqSchema: 'movieId',

    isWithCredential: true,
  });
}
