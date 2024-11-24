import { z } from 'zod';
import Schemas from '../../schemas';

type TMovieId = z.infer<typeof Schemas.movieId>;

export default TMovieId;
