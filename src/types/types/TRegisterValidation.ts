import { z } from 'zod';
import Schemas from '../../schemas';

type TRegisterValidation = z.infer<typeof Schemas.registerValidation>;

export default TRegisterValidation;
