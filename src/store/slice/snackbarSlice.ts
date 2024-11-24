import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { ISnackbarMessage } from '../../types';

interface ISnackbarState {
  messages: ISnackbarMessage[];
}

const initialState: ISnackbarState = {
  messages: [],
};

const snackbarSlice = createSlice({
  name: 'snackbar',
  initialState,
  reducers: {
    addMessage: (
      state,
      action: PayloadAction<Omit<ISnackbarMessage, 'id' | 'isVisible'>>
    ): void => {
      const id = new Date().toISOString();
      state.messages.unshift({ id, isVisible: true, ...action.payload });
    },
    hideMessage: (state, action: PayloadAction<string>) => {
      const message = state.messages.find((msg) => msg.id === action.payload);
      if (message) {
        message.isVisible = false;
      }
    },
    removeMessage: (state, action: PayloadAction<string>) => {
      state.messages = state.messages.filter(
        (msg) => msg.id !== action.payload
      );
    },
  },
});

export const { addMessage, removeMessage, hideMessage } = snackbarSlice.actions;
export default snackbarSlice.reducer;
