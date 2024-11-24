import { z } from 'zod';
import Schemas from '../../schemas';

type TLoginValidation = z.infer<typeof Schemas.loginValidation>;

export default TLoginValidation;
