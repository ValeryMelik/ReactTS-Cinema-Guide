import { z } from 'zod';
import Schemas from '../../schemas';

type TMoviesList = z.infer<typeof Schemas.moviesList>;

export default TMoviesList;
