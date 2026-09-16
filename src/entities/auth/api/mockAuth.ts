import { http } from "@shared/api";

export type IUser = {
  password: string;
  user: "admin" | "user";
  name: string;
  role: "ADMIN" | "USER";
};

type TMockAuth = {
  name: string;
  password: string;
};

export const mockAuth = async ({ name, password }: TMockAuth) => {
  const { data: users } = await http.get<IUser[]>("/users");
  const foundedUser = users.find(
    (user) => user.user === name && user.password === password,
  );

  const isSuccessAuth = !!foundedUser;
  if (isSuccessAuth) {
    const { password: _password, ...user } = foundedUser;
    return user;
  }
};
