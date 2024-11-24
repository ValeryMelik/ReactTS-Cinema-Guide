export default class CustomError {
  message: string;
  statusCode?: number;
  serverMessage?: string | null;
  validationErrors?: Array<{ path: string; message: string }>;

  constructor(
    message: string,
    statusCode?: number,
    serverMessage?: string | null,
    validationErrors?: Array<{ path: string; message: string }>
  ) {
    this.message = message;
    this.statusCode = statusCode;
    this.serverMessage = serverMessage;
    this.validationErrors = validationErrors;
  }
}
