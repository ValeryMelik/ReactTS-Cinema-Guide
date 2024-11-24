import { z } from 'zod';

const userSchema = z.object({
  name: z.string().min(1),
  surname: z.string().min(1),
  email: z.string().email(),
  favorites: z.array(z.string()),
});

export default userSchema;
