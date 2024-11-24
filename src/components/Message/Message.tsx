import { ISnackbarMessage, IValidationError } from '../../types';
import './Message.scss';
import { FC } from 'react';

interface MessageProps extends ISnackbarMessage {
  onClose: () => void;
  isVisible: boolean;
}

const Message: FC<MessageProps> = ({
  id,
  type,
  message,
  statusCode,
  serverMessage,
  validationErrors,
  onClose,
  isVisible,
}) => {
  const formattedDate = new Date(id).toLocaleString('ru-RU', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });
  const formattedTime = new Date(id).toLocaleString('ru-RU', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  });

  return (
    <div
      className={`message message_${type} ${isVisible ? '' : 'message_hide'}`}
      id={id}
    >
      <div className='message__block'>
        <span className='message__text'>{message}</span>
        {statusCode && (
          <span className='message__text'>Код состояния: {statusCode}</span>
        )}
        {serverMessage && typeof serverMessage === 'string' && (
          <span className='message__text'>
            Сообщение сервера: {serverMessage}
          </span>
        )}
        {validationErrors && validationErrors.length > 0 && (
          <ul className='list-reset message__text'>
            {validationErrors.map((error: IValidationError, index: number) => (
              <li key={index}>
                <span className='message__text'>{error.path} {error.message}.</span> 
              </li>
            ))}
          </ul>
        )}
      </div>

      <time className='message__timestamp' dateTime={id}>
        {formattedDate} {formattedTime}
      </time>
      <button className='message__close-btn' onClick={onClose}>
        <svg viewBox='0 0 24 24' className='message__close-icon'>
          <path d='M18.36 5.64a1 1 0 00-1.41 0L12 10.59 7.05 5.64A1 1 0 005.64 7.05L10.59 12l-4.95 4.95a 1 1 0 001.41 1.41L12 13.41l4.95 4.95a 1 1 0 001.41-1.41L13.41 12l4.95-4.95a 1 1 0 000-1.41z' />
        </svg>
      </button>
    </div>
  );
};

export default Message;
