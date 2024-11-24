import { z } from 'zod';
import Schemas from '../../schemas';

type TRegister = z.infer<typeof Schemas.register>;

export default TRegister;
