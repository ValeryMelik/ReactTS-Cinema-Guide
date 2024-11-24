import { useQuery, UseQueryResult } from '@tanstack/react-query';
import API from '../API';
import CustomError from '../classes/customError';

import PLACEHOLDER from '/img/fallback-image.png';

type TGenreImages = Record<string, string>;

interface IUseGenreImagesReturn {
  data: TGenreImages;
  isLoading: boolean;
  isError: boolean;
}

const useGenreImage = (genres: string[] = []): IUseGenreImagesReturn => {
  const {
    data,
    isLoading,
    isError,
  }: UseQueryResult<TGenreImages, CustomError> = useQuery({
    queryKey: ['genreImages', genres],
    queryFn: async (): Promise<TGenreImages> => {
      const results: TGenreImages = {};

      for (const genre of genres) {
        const page = Math.floor(Math.random() * 100);
        const movies = await API.getMoviesList({ count: 10, genre, page });

        let imageUrl: string | null = null;

        for (let index = 0; index < 10; index++) {
          const currentImage = movies?.[index]?.backdropUrl;

          if (currentImage) {
            imageUrl = currentImage;
            break;
          }
        }

        results[genre] = imageUrl ?? PLACEHOLDER;
      }

      return results;
    },
    enabled: genres.length > 0,
  });

  return { data: data || {}, isLoading, isError };
};

export default useGenreImage;
