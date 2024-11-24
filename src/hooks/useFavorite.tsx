import {
  useMutation,
  useQuery,
  UseMutationResult,
  UseQueryResult,
} from '@tanstack/react-query';
import type { TMovie, TMovieId, TMoviesList, TSuccessResult } from '../types';
import API from '../API';
import CustomError from '../classes/customError';
import useSnackbar from './useSnackbar';
import useAuth from './useAuth';

type UseFavoriteReturn = {
  favorites: TMoviesList | undefined;
  toggleFavorite: (id: number) => void;
  isFavorite: (id: number) => boolean;
  isFavoriteLoading: boolean;
};

const useFavorite = (): UseFavoriteReturn => {
  const { showMessage } = useSnackbar();
  const { isAuthorized } = useAuth();

  const {
    data: favorites,
    isLoading: isLoadingFavorites,
    refetch: refetchFavorites,
  }: UseQueryResult<TMoviesList, CustomError> = useQuery({
    queryFn: API.getFavorites,
    queryKey: ['moviesList', 'favoritesList'],
    enabled: isAuthorized,
  });

  const {
    mutate: addFavorite,
    isPending: isAdding,
  }: UseMutationResult<TSuccessResult, CustomError, TMovieId> = useMutation({
    mutationFn: API.postFavorites,
    onSuccess: (): void => {
      // showMessage({
      //   type: 'success',
      //   message: 'Фильм успешно добавлен в избранное!',
      // });
      refetchFavorites();
    },
    onError: (err: CustomError): void => {
      showMessage({
        type: 'error',
        ...err,
      });
    },
  });

  const {
    mutate: removeFavorite,
    isPending: isRemoving,
  }: UseMutationResult<TSuccessResult, CustomError, TMovieId> = useMutation({
    mutationFn: API.deleteFavorites,
    onSuccess: (): void => {
      // showMessage({
      //   type: 'success',
      //   message: 'Фильм успешно удалён из избранного!',
      // });
      refetchFavorites();
    },
    onError: (err: CustomError): void => {
      showMessage({
        type: 'error',
        ...err,
      });
    },
  });

  const isFavorite = (id: number): boolean => {
    return (
      (Array.isArray(favorites) &&
        favorites?.some((movie: TMovie): boolean => movie.id === id)) ||
      false
    );
  };

  const toggleFavorite = (id: number): void => {
    const favoriteAction = isFavorite(id) ? removeFavorite : addFavorite;
    favoriteAction({ id: String(id) });
  };

  const isFavoriteLoading = isAdding || isRemoving || isLoadingFavorites;

  return {
    favorites,
    toggleFavorite,
    isFavorite,
    isFavoriteLoading,
  };
};

export default useFavorite;
