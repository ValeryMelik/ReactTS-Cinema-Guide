import './Snackbar.scss';

import { FC, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../Message';
import { hideMessage, removeMessage } from '../../store/slice/snackbarSlice';
import { RootState } from '../../store';
import type { ISnackbarMessage } from '../../types';
import SnackbarMessage from '../../types/interfaces/ISnackbarMessage';

const Snackbar: FC = () => {
  const dispatch = useDispatch();
  const messages = useSelector(
    (state: RootState): ISnackbarMessage[] => state.snackbar.messages
  );

  useEffect((): void => {
    messages.forEach(({ id, isVisible }: SnackbarMessage): void => {
      if (isVisible) {
        setTimeout(() => {
          dispatch(hideMessage(id));

          setTimeout(() => {
            dispatch(removeMessage(id));
          }, 300);
        }, 4700);
      }
    });
  }, [messages, dispatch]);

  const handleClose = (id: string): void => {
    dispatch(hideMessage(id));
    setTimeout(() => {
      dispatch(removeMessage(id));
    }, 300);
  };

  return (
    <div className='snackbar'>
      {messages.map(
        ({
          id,
          type,
          message,
          statusCode,
          serverMessage,
          validationErrors,
          isVisible,
        }: ISnackbarMessage) => (
          <Message
            id={id}
            key={id}
            type={type}
            message={message}
            statusCode={statusCode}
            serverMessage={serverMessage}
            validationErrors={validationErrors}
            isVisible={isVisible}
            onClose={(): void => handleClose(id)}
          />
        )
      )}
    </div>
  );
};

export default Snackbar;
