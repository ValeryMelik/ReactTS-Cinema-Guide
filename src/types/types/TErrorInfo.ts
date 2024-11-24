interface INetworkErrorDetails {
  statusCode?: number;
  serverMessage?: string | null;
}

interface IValidationErrorDetails {
  validationErrors: Array<{ path: string; message: string }>;
}

type TErrorInfo = {
  message: string;
  details?: INetworkErrorDetails | IValidationErrorDetails;
};

export default TErrorInfo;
