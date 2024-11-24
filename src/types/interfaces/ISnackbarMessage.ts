import type TMessage from '../types/TMessage';
import type IValidationError from './IValidationError';

export default interface SnackbarMessage {
  id: string;
  type: TMessage;
  message: string;
  statusCode?: number;
  serverMessage?: string | null;
  validationErrors?: IValidationError[];
  isVisible: boolean;
}
