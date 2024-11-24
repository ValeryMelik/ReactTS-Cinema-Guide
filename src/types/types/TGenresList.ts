import { z } from 'zod';
import Schemas from '../../schemas';

type TGenresList = z.infer<typeof Schemas.genresList>;

export default TGenresList;
