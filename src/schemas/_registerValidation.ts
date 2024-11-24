import { z } from 'zod';

const registerValidationSchema = z
  .object({
    email: z.string().email('*Введите корректный адрес электронной почты'),
    name: z
      .string()
      .min(1, '*Имя должно содержать минимум 1 символ')
      .regex(
        /^[A-Za-zА-Яа-яёЁ\s-]+$/,
        '*Имя не должно содержать цифры и спецсимволы'
      ),
    surname: z
      .string()
      .min(1, '*Фамилия должна содержать минимум 1 символ')
      .regex(
        /^[A-Za-zА-Яа-яёЁ\s-]+$/,
        '*Фамилия не должна содержать цифры и спецсимволы'
      ),
    password: z.string().min(6, '*Пароль должен содержать минимум 6 символов'),
    confirmPassword: z
      .string()
      .min(6, '*Пароль должен содержать минимум 6 символов'),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Пароли должны совпадать',
    path: ['confirmPassword'],
  });

export default registerValidationSchema;
