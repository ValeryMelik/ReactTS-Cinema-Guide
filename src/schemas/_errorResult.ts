import { z } from 'zod';

const errorResultSchema = z.object({
  error: z.string(),
});

export default errorResultSchema;
