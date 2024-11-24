import { useDispatch, useSelector } from 'react-redux';
import { setAuthorization, resetAuthorization } from '../store/slice/authSlice';
import type { RootState } from '../store';
import { useQuery, UseQueryResult } from '@tanstack/react-query';
import API from '../API';
import { useEffect } from 'react';

import CustomError from '../classes/customError';
import type { TUser } from '../types';

interface IUseAuth {
  isAuthorized: boolean;
  userProfile: TUser | null;
  isUserLoading: boolean;
  isUserSuccess: boolean;
  isUserError: boolean;
  userStatus: 'success' | 'error' | 'pending';
}

const useAuth = (): IUseAuth => {
  const dispatch = useDispatch();
  const isAuthorized = useSelector(
    (state: RootState): boolean => state.auth.isAuthorized
  );
  const userProfile = useSelector(
    (state: RootState): TUser | null => state.auth.userProfile
  );

  const {
    data,
    isSuccess: isUserSuccess,
    isError: isUserError,
    isPending: isUserLoading,
    status: userStatus,
  }: UseQueryResult<TUser, CustomError> = useQuery({
    queryFn: API.getUser,
    queryKey: ['profile'],
    retry: false,
  });

  useEffect(() => {
    if (isUserSuccess) {
      dispatch(setAuthorization(data));
    } else if (isUserError) {
      dispatch(resetAuthorization());
    }
  }, [isUserSuccess, isUserError, data, dispatch]);

  return {
    isAuthorized,
    userProfile,
    isUserLoading,
    isUserError,
    isUserSuccess,
    userStatus,
  };
};

export default useAuth;
