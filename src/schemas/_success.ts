import { z } from 'zod';

const successSchema = z.object({
  success: z.boolean(),
});

export default successSchema;
