import { z } from 'zod';

const genresListSchema = z.array(z.string());

export default genresListSchema;
