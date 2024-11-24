import type { TApiPromise, TUser } from '../../../types';
import httpRequest from '../../utils/httpRequest';

export default async function getUser(): TApiPromise<TUser> {
  return httpRequest<void, TUser>({
    httpMethod: 'GET',
    urlPath: 'profile',

    resSchema: 'user',
    isWithCredential: true,
  });
}
