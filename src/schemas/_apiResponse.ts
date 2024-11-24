import { z } from 'zod';

const apiResponseSchema = z.object({
  code: z.number().int(),
  type: z.string(),
  message: z.string(),
});

export default apiResponseSchema;
