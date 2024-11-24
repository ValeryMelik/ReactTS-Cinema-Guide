import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { IModalData, TModalContent } from '../../types';

interface ModalState {
  isModalOpen: boolean;
  contentType: TModalContent;
  data: IModalData | null;
}

const initialState: ModalState = {
  isModalOpen: false,
  contentType: null,
  data: null,
};

const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    openTrailerModal: (state, action: PayloadAction<IModalData>) => {
      state.isModalOpen = true;
      state.contentType = 'trailer';
      state.data = action.payload;
    },
    openAuthModal: (state): void => {
      state.isModalOpen = true;
      state.contentType = 'auth';
      state.data = null;
    },
    openSearchModal: (state): void => {
      state.isModalOpen = true;
      state.contentType = 'search';
      state.data = null;
    },
    closeModal: (state): void => {
      state.isModalOpen = false;
      state.contentType = null;
      state.data = null;
    },
  },
});

export const { openTrailerModal, openAuthModal, openSearchModal, closeModal } =
  modalSlice.actions;
export default modalSlice.reducer;
