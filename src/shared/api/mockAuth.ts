import axios from "axios";

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
  const { data } = await axios.get<IUser[]>("http://localhost:3000/users");
  const users = data;
  const findedUser = users.find(
    (user) => user.user === name && user.password === password,
  );

  const isSuccessAuth = !!findedUser;
  if (isSuccessAuth) {
    const { password, ...user } = findedUser;
    return user;
  }
};
