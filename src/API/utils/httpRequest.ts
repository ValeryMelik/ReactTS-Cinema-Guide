import axios from 'axios';
import type { TApiPromise, TMovieId, TSuccessResult } from '../../types';
import handleError from './handleError';

import BASE_URL from '../_baseURL';
import Schemas from '../../schemas';
import URLs from '../_URLs';

interface IHttpRequest<T, P> {
  httpMethod: 'GET' | 'POST' | 'DELETE';
  urlPath: keyof typeof URLs;

  reqData?: T;
  reqParams?: P;
  reqSchema?: keyof typeof Schemas;

  resSchema?: keyof typeof Schemas;

  isWithCredential?: boolean;
}

export default async function httpRequest<
  T = void,
  U = TSuccessResult,
  P = void
>({
  httpMethod,
  urlPath,

  reqData,
  reqSchema,
  reqParams,

  resSchema = 'successResult',

  isWithCredential = false,
}: IHttpRequest<T, P>): TApiPromise<U> {
  const axiosInstance = axios.create({
    baseURL: BASE_URL,
    headers: {
      'Content-Type': 'application/json',
    },
    withCredentials: isWithCredential,
  });

  try {
    if (reqData && reqSchema) Schemas[reqSchema].parse(reqData);

    let requestUrl = URLs[urlPath];
    if (
      reqData &&
      Schemas.movieId.safeParse(reqData).success &&
      httpMethod !== 'POST'
    )
      requestUrl += (reqData as unknown as TMovieId).id;

    const response = await axiosInstance.request({
      method: httpMethod,
      data: reqData,
      url: requestUrl,
      params: reqParams,
    });

    return Schemas[resSchema].parse(response.data) as U;
  } catch (error) {
    handleError(error);
  }
}
