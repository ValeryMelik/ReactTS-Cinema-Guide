import { z } from 'zod';

const loginValidationSchema = z.object({
  email: z.string().email('*Введите корректный email'),
  password: z.string().min(6, '*Минимум 6 символов'),
});

export default loginValidationSchema;
