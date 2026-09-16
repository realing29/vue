export type ICurrentUser = {
  user: "admin" | "user";
  name: string;
  role: "ADMIN" | "USER";
};

export type IFormUser = {
  name: string;
  password: string;
};

export type IState = {
  currentUser: ICurrentUser | null;
  form: IFormUser;
  isInitialized: boolean;
};
