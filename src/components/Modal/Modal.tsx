import './Modal.scss';

import { FC, useEffect, useState } from 'react';
import Icon from '../Icon/';
import AuthForm from '../AuthForm';
import Trailer from '../Trailer';

import useModal from '../../hooks/useModal';
import Search from '../Search';

const Modal: FC = () => {
  const [isVisible, setIsVisible] = useState<boolean>(true);
  const [isRegister, setIsRegister] = useState<boolean>(false);

  const { handleModalClose, modalData, modalContentType } = useModal();

  useEffect((): (() => void) => {
    document.body.classList.add('stop-scroll');

    return (): void => {
      document.body.classList.remove('stop-scroll');
    };
  }, []);

  useEffect(() => {
    if (!isVisible) {
      const timer = setTimeout((): void => {
        handleModalClose();
      }, 300);
      document.querySelector('body')?.classList.remove('stop-scroll');

      return (): void => clearTimeout(timer);
    }
  }, [isVisible, handleModalClose]);

  const handleBackgroundClick = (
    event: React.MouseEvent<HTMLDivElement | HTMLButtonElement>
  ): void => {
    if ((event.target as HTMLElement).classList.contains('modal')) {
      setIsVisible(false);
    }
  };

  const ModalContent = () => {
    switch (modalContentType) {
      case 'trailer':
        return modalData ? (
          <Trailer
            title={modalData!.title}
            trailerUrl={modalData!.trailerUrl}
          />
        ) : null;
      case 'search':
        return <Search className='header__search search_long' />;
      case 'auth':
      default:
        return (
          <AuthForm isRegister={isRegister} setIsRegister={setIsRegister} />
        );
    }
  };

  return (
    <div
      className={`modal ${modalContentType === 'search' ? 'modal_top' : ''} ${
        isVisible ? 'modal_visible' : 'modal_hidden'
      }`}
      onClick={handleBackgroundClick}
    >
      <div
        className={`modal__container ${
          modalContentType === 'trailer' ? 'modal__container_stretched' : ''
        }`}
      >
        <ModalContent />
        {modalContentType !== 'search' && (
          <button
            className={`btn-reset modal__btn ${
              modalContentType === 'trailer' ? 'modal__btn_unvisible' : ''
            }`}
            onClick={(): void => setIsVisible(false)}
          >
            <Icon name='closelarge' className='modal__close'></Icon>
          </button>
        )}
      </div>
    </div>
  );
};

export default Modal;
