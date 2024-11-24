import type { TApiPromise, TRegister } from '../../../types';
import TSuccess from '../../../types/types/TSuccess';
import httpRequest from '../../utils/httpRequest';

export default async function postRegister(
  registerCredentials: TRegister
): TApiPromise<TSuccess> {
  return httpRequest<TRegister, TSuccess>({
    httpMethod: 'POST',
    urlPath: 'register',

    reqData: registerCredentials,
    reqSchema: 'register',

    resSchema: 'success',

    isWithCredential: true,
  });
}
