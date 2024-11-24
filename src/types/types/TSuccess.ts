import { z } from 'zod';
import Schemas from '../../schemas';

type TSuccess = z.infer<typeof Schemas.success>;

export default TSuccess;
