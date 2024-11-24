import { z } from 'zod';

const successResultSchema = z.object({
  result: z.boolean(),
});

export default successResultSchema;
