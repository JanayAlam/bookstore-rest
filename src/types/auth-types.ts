export interface IRegisterUserRequestBody {
  username: string;
  password: string;
  confirmPassword: string;
}

export interface ILoginUserRequestBody {
  username: string;
  password: string;
}
