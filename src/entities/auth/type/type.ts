export const USER_KIND = {
  ADMIN: "admin",
  USER: "user",
} as const;

export const USER_ROLE = {
  ADMIN: "ADMIN",
  USER: "USER",
} as const;

export type UserKind = (typeof USER_KIND)[keyof typeof USER_KIND];
export type UserRole = (typeof USER_ROLE)[keyof typeof USER_ROLE];

export type ICurrentUser = {
  user: UserKind;
  name: string;
  role: UserRole;
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
