import { z } from 'zod';
import Schemas from '../../schemas';

type TSuccessResult = z.infer<typeof Schemas.successResult>;

export default TSuccessResult;
