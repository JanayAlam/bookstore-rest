export interface IErrorResponse {
  timestamp: string;
  error: string;
  code: number;
  message: string;
}

export interface IBadRequestData {
  field: string;
  messages: string[];
}

export interface IBadRequestErrorResponse extends IErrorResponse {
  in: string;
  data: IBadRequestData[];
}
