import { z } from 'zod';
import Schemas from '../../schemas';

type TErrorResponse = z.infer<typeof Schemas.errorResult>;

export default TErrorResponse;
