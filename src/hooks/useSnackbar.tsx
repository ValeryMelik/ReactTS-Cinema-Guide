// hooks/useSnackbar.ts
import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { addMessage } from '../store/slice/snackbarSlice';
import type { ISnackbarMessage } from '../types';

const useSnackbar = () => {
  const dispatch = useDispatch();

  const showMessage = useCallback(
    (options: Omit<ISnackbarMessage, 'id' | 'isVisible'>): void => {
      dispatch(addMessage(options));
    },
    [dispatch]
  );

  return { showMessage };
};

export default useSnackbar;
