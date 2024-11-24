import { z } from 'zod';
import Schemas from '../../schemas';

type TUser = z.infer<typeof Schemas.user>;

export default TUser;
