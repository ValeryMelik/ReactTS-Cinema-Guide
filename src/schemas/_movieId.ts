import { z } from 'zod';

const movieIdSchema = z.object({
  id: z.string(),
});

export default movieIdSchema;
