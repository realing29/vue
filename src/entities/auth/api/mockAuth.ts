import { http, USERS_ENDPOINT } from "@shared/api";
import type { IUser } from "../type/type";

type TMockAuth = {
  name: string;
  password: string;
};

export const mockAuth = async ({ name, password }: TMockAuth) => {
  const { data: users } = await http.get<IUser[]>(USERS_ENDPOINT);
  const foundedUser = users.find(
    (user) => user.user === name && user.password === password,
  );

  const isSuccessAuth = !!foundedUser;
  if (isSuccessAuth) {
    const { password: _password, ...user } = foundedUser;
    return user;
  }
};
