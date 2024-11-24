import { z } from 'zod';
import Schemas from '../../schemas';

type TApiResponse = z.infer<typeof Schemas.apiResponse>;

export default TApiResponse;
