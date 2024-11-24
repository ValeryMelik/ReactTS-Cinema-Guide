import type { TApiPromise } from '../../../types';
import httpRequest from '../../utils/httpRequest';

export default async function getLogout(): TApiPromise {
  return httpRequest({
    httpMethod: 'GET',
    urlPath: 'logout',

    isWithCredential: true,
  });
}
