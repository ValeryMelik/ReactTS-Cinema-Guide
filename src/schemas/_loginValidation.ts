import { z } from 'zod';

const loginValidationSchema = z.object({
  email: z.string().email('*Введите корректный адрес электронной почты'),
  password: z.string().min(6, '*Пароль должен содержать минимум 6 символов'),
});

export default loginValidationSchema;
