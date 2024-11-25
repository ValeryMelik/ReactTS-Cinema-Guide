import { z } from 'zod';

const registerValidationSchema = z
  .object({
    email: z.string().email('*Введите корректный email'),
    name: z
      .string()
      .min(1, '*Минимум 1 символ')
      .regex(
        /^[A-Za-zА-Яа-яёЁ\s-]+$/,
        '*Недопустимы цифры и спецсимволы'
      ),
    surname: z
      .string()
      .min(1, '*Минимум 1 символ')
      .regex(
        /^[A-Za-zА-Яа-яёЁ\s-]+$/,
        '*Недопустимы цифры и спецсимволы'
      ),
    password: z.string().min(6, '*Минимум 6 символов'),
    confirmPassword: z
      .string()
      .min(6, '*Минимум 6 символов'),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Пароли должны совпадать',
    path: ['confirmPassword'],
  });

export default registerValidationSchema;
