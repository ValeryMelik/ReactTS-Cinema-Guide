import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { TUser } from '../../types';

interface IAuthState {
  isAuthorized: boolean;
  userProfile: TUser | null;
}

const initialState: IAuthState = {
  isAuthorized: false,
  userProfile: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAuthorization: (state, action: PayloadAction<TUser | null>) => {
      state.isAuthorized = !!action.payload;
      state.userProfile = action.payload;
    },
    resetAuthorization: (state) => {
      state.isAuthorized = false;
      state.userProfile = null;
    },
  },
});

export const { setAuthorization, resetAuthorization } = authSlice.actions;

export default authSlice.reducer;