import axios from 'axios';
import { ZodError, ZodIssue } from 'zod';
import CustomError from '../../classes/customError';

export default function handleError(error: unknown): never {
  let message = 'Произошла неизвестная ошибка.';
  let statusCode: number | undefined;
  let serverMessage: string | null = null;
  let validationErrors: Array<{ path: string; message: string }> | undefined;

  if (axios.isAxiosError(error)) {
    statusCode = error.response?.status;
    message = 'Произошла ошибка. Попробуйте позже.';
    serverMessage =
      'error' in error.response?.data
        ? error.response?.data.error
        : error.response?.data;

    if (statusCode) {
      switch (statusCode) {
        case 400:
          message = 'Произошла ошибка - некорректный запрос.';
          break;
        case 401:
          message = 'Произошла ошибка - необходима авторизация.';
          break;
        case 403:
          message = 'Произошла ошибка - нет доступа к ресурсу.';
          break;
        case 404:
          message = 'Произошла ошибка - ресурс не найден.';
          break;
        case 500:
          message = 'Произошла внутренняя ошибка сервера';
          break;
        default:
          message = `HTTP ошибка ${statusCode}`;
      }
    } else if (
      error.code === 'ECONNABORTED' ||
      error.message.includes('Network Error')
    ) {
      message = 'Сервер недоступен. Проверьте подключение.';
    }

    console.error('Ошибка запроса:', { statusCode, message, serverMessage });
    throw new CustomError(message, statusCode, serverMessage);
  }

  if (error instanceof ZodError) {
    message = 'Ошибка валидации данных.';
    validationErrors = error.errors.map((err: ZodIssue) => ({
      path: err.path.join('.'),
      message: err.message,
    }));
    console.error('Ошибка валидации:', validationErrors);
    throw new CustomError(message, undefined, null, validationErrors);
  }

  if (error instanceof Error) {
    console.error(`Unexpected error: ${error.message}`);
    throw new CustomError(error.message);
  }

  console.error('Неизвестная ошибка:', error);
  throw new CustomError(message);
}
