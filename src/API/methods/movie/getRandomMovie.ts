import type { TApiPromise, TMovie } from '../../../types';
import httpRequest from '../../utils/httpRequest';

export default async function getRandomMovie(): TApiPromise<TMovie> {
  return httpRequest<void, TMovie>({
    httpMethod: 'GET',
    urlPath: 'random',

    resSchema: 'movie',
  });
}
