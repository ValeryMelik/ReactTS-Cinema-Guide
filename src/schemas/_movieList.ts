import { z } from "zod";
import movieSchema from "./_movie";

const moviesListSchema = z.array(movieSchema);

export default moviesListSchema;
