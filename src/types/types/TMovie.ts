import { z } from 'zod';
import Schemas from '../../schemas';

type TMovie = z.infer<typeof Schemas.movie>;

export default TMovie;
