export type ICurrentUser = {
  user: "admin" | "user";
  name: string;
  role: "ADMIN" | "USER";
};

export type IUser = ICurrentUser & { password: string };

export type IAuthForm = {
  name: string;
  password: string;
};

export type IState = {
  currentUser: ICurrentUser | null;
  form: IAuthForm;
  isInitialized: boolean;
};
