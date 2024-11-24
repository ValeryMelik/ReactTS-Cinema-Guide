import type { TApiPromise, TLogin } from '../../../types';
import httpRequest from '../../utils/httpRequest';

export default async function postLogin(loginCredentials: TLogin): TApiPromise {
  return httpRequest<TLogin>({
    httpMethod: 'POST',
    urlPath: 'login',

    reqData: loginCredentials,
    reqSchema: 'login',

    isWithCredential: true,
  });
}
