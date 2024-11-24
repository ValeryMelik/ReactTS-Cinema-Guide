import { z } from 'zod';

const movieSchema = z.object({
  id: z.number(),
  title: z.string().nonempty(),
  originalTitle: z.string().nullable().optional(),
  language: z.string().nullable().optional(),
  releaseYear: z.number().nullable().optional(),
  releaseDate: z.string().nullable().optional(),
  genres: z.array(z.string()),
  plot: z.string().nullable().optional(),
  runtime: z.number(),
  budget: z.string().nullable().optional(),
  revenue: z.string().nullable().optional(),
  homepage: z.string().nullable().optional(),
  status: z.string().nullable().optional(),
  posterUrl: z.string().nullable().optional(),
  backdropUrl: z.string().nullable().optional(),
  trailerUrl: z.string().nullable().optional(),
  trailerYoutubeId: z.string().nullable().optional(),
  tmdbRating: z.number().nullable().optional(),
  searchL: z.string().nullable().optional(),
  keywords: z.array(z.string()).nullable().optional(),
  countriesOfOrigin: z.array(z.string()).nullable().optional(),
  languages: z.array(z.string()).nullable().optional(),
  cast: z.array(z.string()).nullable().optional(),
  director: z.string().nullable().optional(),
  production: z.string().nullable().optional(),
  awardsSummary: z.string().nullable().optional(),
});

export default movieSchema;
