import { configureStore } from '@reduxjs/toolkit';

import authReducer from './slice/authSlice';
import modalReducer from './slice/modalSlice';
import snackbarReducer from './slice/snackbarSlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    modal: modalReducer,
    snackbar: snackbarReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;