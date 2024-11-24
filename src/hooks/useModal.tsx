// useModal.ts
import { useDispatch, useSelector } from 'react-redux';
import type { RootState } from '../store';
import {
  openTrailerModal,
  openAuthModal,
  openSearchModal,
  closeModal,
} from '../store/slice/modalSlice';
import type { IModalData, TModalContent } from '../types';

interface IUseModalReturn {
  isModalOpen: boolean;

  modalContentType: TModalContent;
  modalData: IModalData | null;

  handleTrailerModalOpen: (data: IModalData) => void;
  handleAuthModalOpen: () => void;
  handleSearchModalOpen: () => void;
  handleModalClose: () => void;
}

const useModal = (): IUseModalReturn => {
  const dispatch = useDispatch();

  const isModalOpen = useSelector(
    (state: RootState): boolean => state.modal.isModalOpen
  );

  const modalContentType = useSelector(
    (state: RootState): TModalContent => state.modal.contentType
  );

  const modalData = useSelector(
    (state: RootState): IModalData | null => state.modal.data
  );

  const handleTrailerModalOpen = (data: IModalData): void => {
    dispatch(openTrailerModal(data));
  };

  const handleAuthModalOpen = (): void => {
    dispatch(openAuthModal());
  };

  const handleSearchModalOpen = (): void => {
    dispatch(openSearchModal());
  };

  const handleModalClose = (): void => {
    dispatch(closeModal());
  };

  return {
    isModalOpen,

    modalContentType,
    modalData,

    handleTrailerModalOpen,
    handleAuthModalOpen,
    handleSearchModalOpen,
    handleModalClose,
  };
};

export default useModal;
