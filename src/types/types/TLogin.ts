import { z } from 'zod';
import Schemas from '../../schemas';

type TLogin = z.infer<typeof Schemas.login>;

export default TLogin;
