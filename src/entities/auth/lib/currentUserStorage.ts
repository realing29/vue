import type { ICurrentUser } from "../type/type";

const CURRENT_USER_KEY = "currentUser";

export const currentUserStorage = {
  get(): ICurrentUser | null {
    const raw = localStorage.getItem(CURRENT_USER_KEY);
    if (!raw) {
      return null;
    }

    return JSON.parse(raw) as ICurrentUser;
  },
  set(user: ICurrentUser): void {
    localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(user));
  },
  remove(): void {
    localStorage.removeItem(CURRENT_USER_KEY);
  },
};
